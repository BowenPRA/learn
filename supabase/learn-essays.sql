-- PRA Learn timed writing: every essay a student writes, kept (src/lib/essays.js,
-- unit/app/writing/). Run in The Current's Supabase project (SQL editor), after
-- supabase/learn-schema.sql and supabase/learn-units.sql. Safe to run again.
--
-- One row per attempt; nothing is overwritten, so a student's writing can be read back
-- over months. The row is made the moment the student starts (status 'draft') and the
-- server's clock is the one that counts: once the time allowed (plus 90 seconds for a
-- slow connection) has passed, the text can no longer change and the essay is handed in
-- as it was last saved.
--
--   draft      being written; saved every few seconds
--   submitted  handed in, waiting for the marker
--   marked     the AI marker's report is in (`report`, `score`)
--   error      the marker failed; the student can send it again
--
-- Students write only through learn_essay_save and learn_essay_revise. The mark is
-- written by the learn-grade-essay Edge Function with the service role, never by the
-- browser. Staff read the essays of the classes they teach and add their own mark and
-- note through learn_essay_note.

create table if not exists learn_essays (
  id uuid primary key,
  student_id uuid not null references adm_students(id) on delete cascade,
  class_key text not null,                      -- e.g. 'english:Upper Secondary'
  unit_key text not null,                       -- '<TRACK>/<UNIT>', e.g. 'UPPER_ENG/U01'
  task_id text not null,                        -- the unit's task, e.g. 'writing'
  prompt_id text not null,                      -- the prompt in the unit's bank, e.g. 'w1'
  prompt jsonb not null,                        -- { title, task, guidelines, type, focus, minWords, paragraphs }
  status text not null default 'draft' check (status in ('draft', 'submitted', 'marked', 'error')),
  body text not null default '',
  plan jsonb,
  minutes_allowed integer not null check (minutes_allowed between 5 and 120),
  seconds_used integer,
  word_count integer not null default 0,
  flags jsonb not null default '{}'::jsonb,     -- { pasteTries, tabAways, secondsAway, bigInserts, timedOut, late }
  report jsonb,                                 -- the marker's report (supabase/functions/learn-grade-essay/marking.js)
  score integer check (score between 0 and 12),
  revision jsonb,                               -- { fixed, total, revisedText }
  teacher_score integer check (teacher_score between 0 and 12),
  teacher_note text check (length(teacher_note) <= 4000),
  teacher_by text,
  teacher_at timestamptz,
  grade_tries integer not null default 0,
  error text,
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  marked_at timestamptz,
  updated_at timestamptz not null default now()
);
create index if not exists learn_essays_student on learn_essays (student_id, started_at desc);
create index if not exists learn_essays_class on learn_essays (class_key, unit_key, prompt_id);

alter table learn_essays enable row level security;
revoke all on learn_essays from public, anon, authenticated;
grant select on learn_essays to authenticated;

drop policy if exists own_read on learn_essays;
create policy own_read on learn_essays for select to authenticated using (student_id = learn_me());
drop policy if exists staff_read on learn_essays;
create policy staff_read on learn_essays for select to authenticated
  using (learn_can_teach(class_key) or learn_is_operator());

-- Start, save or hand in the signed-in student's essay. The first call makes the row
-- (the clock starts then); later calls change the text while time is left. With
-- p_submit the essay is handed in. After the deadline the text is not changed and the
-- essay is handed in as last saved, marked late. Returns the row.
create or replace function learn_essay_save(
  p_id uuid, p_unit text, p_task text, p_class text, p_prompt_id text, p_prompt jsonb,
  p_minutes integer, p_body text, p_plan jsonb, p_flags jsonb, p_submit boolean)
returns learn_essays
language plpgsql security definer set search_path = public as $$
declare
  me uuid := learn_me();
  r learn_essays;
  deadline timestamptz;
  wc integer := coalesce(array_length(regexp_split_to_array(btrim(coalesce(p_body, '')), '\s+'), 1), 0);
begin
  if me is null then return null; end if;
  if btrim(coalesce(p_body, '')) = '' then wc := 0; end if;
  if length(coalesce(p_body, '')) > 30000 then raise exception 'This essay is too long to save.'; end if;
  select * into r from learn_essays where id = p_id;

  if not found then
    if p_unit !~ '^[A-Z0-9_]+/[A-Za-z0-9_]+$' then raise exception 'Not a unit: %', p_unit; end if;
    if p_task !~ '^[a-z][a-z0-9_]{0,39}$' then raise exception 'Not a task: %', p_task; end if;
    if p_prompt_id !~ '^[A-Za-z0-9_-]{1,40}$' then raise exception 'Not a prompt: %', p_prompt_id; end if;
    if p_class is null or not learn_in_class(p_class) then raise exception 'This unit is not for your class.'; end if;
    if length(coalesce(p_prompt::text, '')) > 20000 then raise exception 'The task is too long to save.'; end if;
    insert into learn_essays (id, student_id, class_key, unit_key, task_id, prompt_id, prompt, minutes_allowed, body, plan, word_count, flags)
    values (p_id, me, p_class, p_unit, p_task, p_prompt_id, coalesce(p_prompt, '{}'::jsonb), greatest(5, least(120, coalesce(p_minutes, 30))),
            coalesce(p_body, ''), p_plan, wc, coalesce(p_flags, '{}'::jsonb))
    returning * into r;
  elsif r.student_id <> me then
    raise exception 'Not your essay.';
  elsif r.status <> 'draft' then
    return r;
  else
    deadline := r.started_at + make_interval(mins => r.minutes_allowed) + interval '90 seconds';
    if now() > deadline then
      update learn_essays set status = 'submitted', submitted_at = now(),
        seconds_used = r.minutes_allowed * 60,
        flags = r.flags || coalesce(p_flags, '{}'::jsonb) || jsonb_build_object('late', true, 'timedOut', true),
        updated_at = now()
      where id = p_id returning * into r;
      return r;
    end if;
    update learn_essays set body = coalesce(p_body, ''), plan = coalesce(p_plan, plan), word_count = wc,
      flags = r.flags || coalesce(p_flags, '{}'::jsonb), updated_at = now()
    where id = p_id returning * into r;
  end if;

  if p_submit then
    update learn_essays set status = 'submitted', submitted_at = now(),
      seconds_used = least(minutes_allowed * 60, greatest(0, extract(epoch from now() - started_at)::integer)),
      updated_at = now()
    where id = p_id returning * into r;
  end if;
  return r;
end $$;

revoke all on function learn_essay_save(uuid, text, text, text, text, jsonb, integer, text, jsonb, jsonb, boolean) from public, anon;
grant execute on function learn_essay_save(uuid, text, text, text, text, jsonb, integer, text, jsonb, jsonb, boolean) to authenticated, service_role;

-- The student's corrections after the mark (the revision workshop): { fixed, total, revisedText }.
create or replace function learn_essay_revise(p_id uuid, p_revision jsonb)
returns learn_essays
language plpgsql security definer set search_path = public as $$
declare
  me uuid := learn_me();
  r learn_essays;
begin
  if me is null then return null; end if;
  if length(coalesce(p_revision::text, '')) > 40000 then raise exception 'The revision is too long to save.'; end if;
  update learn_essays set revision = p_revision, updated_at = now()
  where id = p_id and student_id = me and status = 'marked'
  returning * into r;
  if not found then raise exception 'That essay cannot be revised.'; end if;
  return r;
end $$;

revoke all on function learn_essay_revise(uuid, jsonb) from public, anon;
grant execute on function learn_essay_revise(uuid, jsonb) to authenticated;

-- A teacher's own mark (0-12, or null to use the AI's) and note on an essay of a class they teach.
create or replace function learn_essay_note(p_id uuid, p_score integer, p_note text)
returns learn_essays
language plpgsql security definer set search_path = public as $$
declare
  r learn_essays;
begin
  select * into r from learn_essays where id = p_id;
  if not found then raise exception 'No such essay.'; end if;
  if not (learn_can_teach(r.class_key) or learn_is_operator()) then raise exception 'Only a teacher of this class can mark it.'; end if;
  if p_score is not null and (p_score < 0 or p_score > 12) then raise exception 'A mark is 0 to 12.'; end if;
  update learn_essays set teacher_score = p_score, teacher_note = nullif(btrim(coalesce(p_note, '')), ''),
    teacher_by = learn_who(), teacher_at = now(), updated_at = now()
  where id = p_id returning * into r;
  return r;
end $$;

revoke all on function learn_essay_note(uuid, integer, text) from public, anon;
grant execute on function learn_essay_note(uuid, integer, text) to authenticated;

-- PRA Learn units: a student's progress part by part (src/data/units.js,
-- src/lib/unitProgress.js). Run once in The Current's Supabase project (SQL editor),
-- after supabase/learn-schema.sql, before units go live. Safe to run again.
--
-- One row per student, unit and part. XP is not stored: the site works it out from
-- `best` (0..1) and `bonus`, so changing a part's XP never needs a migration.
-- Students write only through learn_unit_save (their own rows, scores 0..1, a bonus
-- once earned is kept); staff read the rows of the classes they can teach.

create table if not exists learn_unit_progress (
  student_id uuid not null references adm_students(id) on delete cascade,
  unit_key text not null,                          -- '<TRACK>/<UNIT>', e.g. 'Y7_SCI/U03_4'
  class_key text not null,                         -- the unit's class, e.g. 'science:Year 7'
  part text not null check (part in ('lesson', 'words', 'practice', 'workbook', 'quiz')),
  best numeric(5, 4) not null default 0 check (best between 0 and 1),
  last numeric(5, 4) check (last between 0 and 1),
  runs integer not null default 0,                 -- finished runs
  bonus boolean not null default false,            -- the part's bonus, once earned
  saved jsonb,                                     -- the task's own resume blob
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (student_id, unit_key, part)
);
create index if not exists learn_unit_progress_class on learn_unit_progress (class_key);

alter table learn_unit_progress enable row level security;
revoke all on learn_unit_progress from public, anon, authenticated;
grant select on learn_unit_progress to authenticated;

drop policy if exists own_read on learn_unit_progress;
create policy own_read on learn_unit_progress for select to authenticated using (student_id = learn_me());
drop policy if exists staff_read on learn_unit_progress;
create policy staff_read on learn_unit_progress for select to authenticated
  using (learn_can_teach(class_key) or learn_is_operator());

-- Save one part for the signed-in student. A staff login (previewing a unit) saves
-- nothing and gets null back. The class is the unit's (p_class), checked against the
-- student's own classes, so a student cannot write progress for another class's unit.
create or replace function learn_unit_save(
  p_unit text, p_part text, p_score numeric, p_finished boolean, p_bonus boolean, p_saved jsonb,
  p_class text default null)
returns learn_unit_progress
language plpgsql security definer set search_path = public as $$
declare
  me uuid := learn_me();
  sc numeric := case when p_score is null then null else greatest(0, least(1, p_score)) end;
  r learn_unit_progress;
begin
  if me is null then return null; end if;
  if p_unit !~ '^[A-Z0-9_]+/[A-Za-z0-9_]+$' then raise exception 'Not a unit: %', p_unit; end if;
  if p_part not in ('lesson', 'words', 'practice', 'workbook', 'quiz') then raise exception 'Not a part: %', p_part; end if;
  if p_class is null or not learn_in_class(p_class) then raise exception 'This unit is not for your class.'; end if;
  if p_saved is not null and length(p_saved::text) > 200000 then raise exception 'Saved work is too large.'; end if;
  insert into learn_unit_progress as u (student_id, unit_key, class_key, part, best, last, runs, bonus, saved)
  values (me, p_unit, p_class, p_part, coalesce(sc, 0), sc, case when p_finished then 1 else 0 end, coalesce(p_bonus, false), p_saved)
  on conflict (student_id, unit_key, part) do update set
    best = greatest(u.best, coalesce(excluded.last, u.best)),
    last = coalesce(excluded.last, u.last),
    runs = u.runs + case when p_finished then 1 else 0 end,
    bonus = u.bonus or coalesce(p_bonus, false),
    saved = coalesce(p_saved, u.saved),
    updated_at = now()
  returning * into r;
  return r;
end $$;

revoke all on function learn_unit_save(text, text, numeric, boolean, boolean, jsonb, text) from public, anon;
grant execute on function learn_unit_save(text, text, numeric, boolean, boolean, jsonb, text) to authenticated, service_role;

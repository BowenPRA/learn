-- PRA Learn (learn.pra.edu.vn): student logins, lesson packs and progress.
-- RUN 6 November 2026 in The Current's Supabase project (SQL Editor), AFTER
-- current-hardening.sql. Safe to run again. Design: docs/DESIGN.md.
--
-- Three tables, beside The Current's adm_* tables:
--   learn_accounts   one row per student login: auth user <-> adm_students row, username
--   learn_packs      one row per lesson pack (review slides + practice sets, as JSON)
--   learn_progress   one row per student, pack and part (review / practice)
-- One private bucket: learn-packs (pictures in packs, at <pack id>/<file>).
--
-- Who can do what:
--   a student login       reads its own account row, its class's published packs (from
--                         their opening date) and its own progress; saves progress only
--                         through learn_save(). Nothing in adm_*.
--   a teacher             reads the packs, logins and progress of the classes on their
--                         Teachers row ('math:Year 5'); opens, hides and dates those packs
--   office, head          every class; head teachers delete packs
--   triage                the operator's script account: adds and changes packs and their pictures
--   service role          the learn-accounts Edge Function: makes and resets logins
--
-- Needs from The Current: adm_students, adm_teachers, adm_role(), adm_email(),
-- adm_is_staff(), adm_is_head(). Links packs to adm_lesson_requests when that table exists.
-- Rules kept: every UPDATE/DELETE has a WHERE; grants are explicit; every security
-- definer function sets search_path and checks the caller itself.

-- ================================================================
-- 1. The tables
-- ================================================================

create table if not exists learn_accounts (
  user_id uuid primary key,                     -- auth.users.id
  student_id uuid not null unique references adm_students(id) on delete cascade,
  username text not null unique,                -- the nickname, folded: 'goku', 'nam' (lib.js foldName; changed 6 Nov 2026)
  extra_classes text[] not null default '{}',   -- classes outside the student's own year group: 'math:Year 6'
  active boolean not null default true,         -- false = blocked by the learn-accounts function
  created_at timestamptz not null default now(),
  created_by text,                              -- a name ("Mr. David"), not an email
  pin_set_at timestamptz not null default now(),
  pin_set_by text,
  updated_at timestamptz
);
alter table learn_accounts drop constraint if exists learn_accounts_username_check;
alter table learn_accounts add constraint learn_accounts_username_check check (username ~ '^[a-z0-9]{2,20}$');
alter table learn_accounts drop constraint if exists learn_accounts_classes_check;
alter table learn_accounts add constraint learn_accounts_classes_check check (cardinality(extra_classes) <= 20);
-- Deferrable, so the test at the end can use a made-up user and roll it back
-- without writing to auth.users.
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'learn_accounts_user_fk') then
    alter table learn_accounts add constraint learn_accounts_user_fk foreign key (user_id)
      references auth.users(id) on delete cascade deferrable initially immediate;
  end if;
end $$;

create table if not exists learn_packs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,                    -- the link: learn.pra.edu.vn/#/p/<slug>
  class_key text not null,                      -- 'math:Year 5', as on the Teachers page
  title text not null,
  title_vn text,
  content jsonb not null,                       -- the pack: docs/DESIGN.md section 7
  version integer not null default 1,           -- goes up each time the content changes
  status text not null default 'draft',         -- draft | published | hidden
  opens_on date,                                -- students see it from this Vietnam date
  due_on date,
  request_id uuid,                              -- adm_lesson_requests.id
  source jsonb not null default '{}'::jsonb,    -- where it was built from: deck, commit, problem bank
  created_at timestamptz not null default now(),
  created_by text,
  updated_at timestamptz,
  updated_by text,
  published_at timestamptz,
  published_by text
);
alter table learn_packs drop constraint if exists learn_packs_slug_check;
alter table learn_packs add constraint learn_packs_slug_check check (slug ~ '^[a-z0-9][a-z0-9-]{2,79}$');
alter table learn_packs drop constraint if exists learn_packs_class_check;
alter table learn_packs add constraint learn_packs_class_check check (class_key ~ '^[a-z_]+:[A-Za-z0-9 ]+$');
alter table learn_packs drop constraint if exists learn_packs_status_check;
alter table learn_packs add constraint learn_packs_status_check check (status in ('draft', 'published', 'hidden'));
alter table learn_packs drop constraint if exists learn_packs_content_check;
alter table learn_packs add constraint learn_packs_content_check check (
  content ->> 'format' = 'pra-learn-pack/1'
  and jsonb_typeof(content -> 'parts') = 'array'
  and octet_length(content::text) <= 1500000);
create index if not exists learn_packs_class on learn_packs (class_key);
create index if not exists learn_packs_request on learn_packs (request_id) where request_id is not null;

-- The Lessons request a pack was made for, when The Current has the Lessons tab.
do $$
begin
  if to_regclass('public.adm_lesson_requests') is not null
     and not exists (select 1 from pg_constraint where conname = 'learn_packs_request_fk') then
    alter table learn_packs add constraint learn_packs_request_fk foreign key (request_id)
      references adm_lesson_requests(id) on delete set null;
  end if;
end $$;

create table if not exists learn_progress (
  student_id uuid not null references adm_students(id) on delete cascade,
  pack_id uuid not null references learn_packs(id) on delete cascade,
  part text not null,                           -- the part's id in the pack: 'review', 'practice'
  pack_version integer,
  items jsonb not null default '{}'::jsonb,     -- this run: { <id>: { ok, tries, hints, shown, slips } }
  first_items jsonb,                            -- the first finished run, for the teacher
  done boolean not null default false,          -- finished at least once
  run_open boolean not null default true,       -- the current run is not finished yet
  score numeric(5, 4),                          -- this run: right first time / items in the part
  first_score numeric(5, 4),
  best_score numeric(5, 4),
  runs integer not null default 0,              -- finished runs
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (student_id, pack_id, part)
);
alter table learn_progress drop constraint if exists learn_progress_part_check;
alter table learn_progress add constraint learn_progress_part_check check (part ~ '^[A-Za-z0-9_-]{1,40}$');
create index if not exists learn_progress_pack on learn_progress (pack_id);

-- ================================================================
-- 2. Who is who (read as the definer, so policies never recurse)
-- ================================================================

-- Also in current-hardening.sql. A login that may count as staff at all: one of the
-- staff roles, or no role (teachers made with Teachers > Create login), and an email
-- that is not a student's (adm_email() is '' for students after the hardening; the
-- domain test covers a database where the hardening has not been run).
create or replace function learn_staff_login() returns boolean
language sql stable as $$
  select adm_role() in ('super_admin', 'head', 'admin', 'teacher', '')
     and adm_email() <> ''
     and adm_email() not like '%@learn.pra.edu.vn'
$$;

-- Today in Hội An.
create or replace function learn_today() returns date
language sql stable as $$ select (now() at time zone 'Asia/Ho_Chi_Minh')::date $$;

-- Office accounts and head teachers: every class.
create or replace function learn_is_office() returns boolean
language sql stable security definer set search_path = public as $$
  select learn_staff_login() and (adm_is_staff() or adm_is_head())
$$;

-- The operator's script (the triage account), office and head teachers: add and change packs.
create or replace function learn_is_operator() returns boolean
language sql stable security definer set search_path = public as $$
  select adm_role() = 'triage' or learn_is_office()
$$;

-- Whether the signed-in staff member teaches this class ('math:Year 5' on their Teachers row).
create or replace function learn_teaches(p_class text) returns boolean
language sql stable security definer set search_path = public as $$
  select learn_staff_login() and exists (
    select 1 from adm_teachers t
     where lower(t.email) = adm_email() and coalesce(t.active, true)
       and p_class = any(coalesce(t.subjects, '{}')))
$$;

create or replace function learn_can_teach(p_class text) returns boolean
language sql stable security definer set search_path = public as $$
  select learn_is_office() or learn_teaches(p_class)
$$;

-- The student row of the signed-in student login, while the login is active and the
-- student is enrolled (Pending trial students count; Inactive do not).
create or replace function learn_me() returns uuid
language sql stable security definer set search_path = public as $$
  select a.student_id
    from learn_accounts a join adm_students s on s.id = a.student_id
   where a.user_id = auth.uid() and a.active
     and coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'student'
     and coalesce(s.status, case when s.active is false then 'inactive' else 'active' end) <> 'inactive'
$$;

-- Whether the signed-in student is in this class: their year group, or an extra class.
create or replace function learn_in_class(p_class text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from learn_accounts a join adm_students s on s.id = a.student_id
     where a.user_id = auth.uid() and a.active
       and coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'student'
       and coalesce(s.status, case when s.active is false then 'inactive' else 'active' end) <> 'inactive'
       and (s.level = split_part(p_class, ':', 2) or p_class = any(a.extra_classes)))
$$;

-- Whether the signed-in login may see a pack: its class's staff, the operator, or a
-- student in the class once the pack is published and open.
create or replace function learn_can_see(p_class text, p_status text, p_opens date) returns boolean
language sql stable security definer set search_path = public as $$
  select learn_can_teach(p_class) or learn_is_operator()
      or (p_status = 'published' and (p_opens is null or p_opens <= learn_today()) and learn_in_class(p_class))
$$;

create or replace function learn_pack_class(p_pack uuid) returns text
language sql stable security definer set search_path = public as $$
  select class_key from learn_packs where id = p_pack
$$;

-- For the learn-accounts function, asked as the caller: may they make logins for this
-- class, or reset this student's PIN?
create or replace function learn_can_manage_class(p_class text) returns boolean
language sql stable security definer set search_path = public as $$
  select learn_can_teach(p_class)
$$;

create or replace function learn_can_manage_student(p_student uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select learn_is_office() or (learn_staff_login() and exists (
    select 1
      from adm_students s
      left join learn_accounts a on a.student_id = s.id
      join adm_teachers t on lower(t.email) = adm_email() and coalesce(t.active, true)
      cross join lateral unnest(coalesce(t.subjects, '{}')) k
     where s.id = p_student
       and (split_part(k, ':', 2) = s.level or k = any(coalesce(a.extra_classes, '{}')))))
$$;

-- The name written on a pack or a login: "Mr. David", "Lesson builder", "PRA".
create or replace function learn_who() returns text
language sql stable security definer set search_path = public as $$
  select case
    when adm_role() = 'triage' then 'Lesson builder'
    when not learn_staff_login() then 'PRA'
    else coalesce(
      (select nullif(trim(concat_ws(' ', nullif(trim(t.title), ''), t.name)), '') from adm_teachers t
        where lower(t.email) = adm_email() order by coalesce(t.active, true) desc limit 1),
      nullif(initcap(split_part(split_part(adm_email(), '@', 1), '.', 1)), ''),
      'PRA')
  end
$$;

-- The name a child sees and a card prints: nickname, else first name, else the full name.
create or replace function learn_display_name(p_nick text, p_first text, p_full text) returns text
language sql immutable as $$
  select coalesce(nullif(trim(p_nick), ''), nullif(trim(p_first), ''), nullif(trim(p_full), ''), '?')
$$;

-- The ids a part is scored on: the review's check ids, or the practice set's item ids.
create or replace function learn_part_ids(p_content jsonb, p_part text) returns text[]
language sql immutable as $$
  select coalesce(array_agg(x.id order by x.n), '{}') from (
    select s.value -> 'check' ->> 'id' as id, s.ordinality as n
      from jsonb_array_elements(case when jsonb_typeof(p_content -> 'parts') = 'array' then p_content -> 'parts' else '[]'::jsonb end) p
     cross join lateral jsonb_array_elements(case when p.value ->> 'kind' = 'review' and jsonb_typeof(p.value -> 'slides') = 'array'
                                                  then p.value -> 'slides' else '[]'::jsonb end) with ordinality s
     where p.value ->> 'id' = p_part and coalesce(s.value -> 'check' ->> 'id', '') <> ''
    union all
    select i.value ->> 'id', i.ordinality
      from jsonb_array_elements(case when jsonb_typeof(p_content -> 'parts') = 'array' then p_content -> 'parts' else '[]'::jsonb end) p
     cross join lateral jsonb_array_elements(case when p.value ->> 'kind' = 'practice' and jsonb_typeof(p.value -> 'set' -> 'items') = 'array'
                                                  then p.value -> 'set' -> 'items' else '[]'::jsonb end) with ordinality i
     where p.value ->> 'id' = p_part and coalesce(i.value ->> 'id', '') <> ''
  ) x
$$;

-- The pack's parts with how many items each is scored on.
create or replace function learn_pack_parts(p_content jsonb) returns jsonb
language sql immutable as $$
  select coalesce(jsonb_agg(jsonb_build_object(
           'id', x.value ->> 'id', 'kind', x.value ->> 'kind',
           'total', cardinality(learn_part_ids(p_content, x.value ->> 'id'))) order by x.ordinality), '[]'::jsonb)
    from jsonb_array_elements(case when jsonb_typeof(p_content -> 'parts') = 'array' then p_content -> 'parts' else '[]'::jsonb end) with ordinality x
$$;

-- ================================================================
-- 3. Stamps: names, versions, and what a teacher may change on a pack
-- ================================================================
-- The operator, office and head change anything. A teacher of the class may only open
-- or hide the pack and set its dates; the content stays as the operator made it.
-- The SQL editor and the service role count as the operator.
create or replace function learn_packs_stamp() returns trigger
language plpgsql as $$
declare
  full_access boolean := learn_is_operator() or current_user in ('postgres', 'service_role', 'supabase_admin');
begin
  if tg_op = 'INSERT' then
    new.version := 1;
    new.created_at := now();
    new.created_by := learn_who();
    new.published_at := null;
    new.published_by := null;
  else
    new.id := old.id;
    new.created_at := old.created_at;
    new.created_by := old.created_by;
    new.published_at := old.published_at;
    new.published_by := old.published_by;
    if not full_access then
      new.slug := old.slug;
      new.class_key := old.class_key;
      new.title := old.title;
      new.title_vn := old.title_vn;
      new.content := old.content;
      new.request_id := old.request_id;
      new.source := old.source;
    end if;
    new.version := old.version + case when new.content is distinct from old.content then 1 else 0 end;
  end if;
  new.source := coalesce(new.source, '{}'::jsonb);
  if new.status = 'published' and (tg_op = 'INSERT' or old.status is distinct from 'published') then
    new.published_at := now();
    new.published_by := learn_who();
  end if;
  new.updated_at := now();
  new.updated_by := learn_who();
  return new;
end $$;

drop trigger if exists learn_packs_stamp on learn_packs;
create trigger learn_packs_stamp before insert or update on learn_packs
  for each row execute function learn_packs_stamp();

-- ================================================================
-- 4. Saving progress (students)
-- ================================================================
-- The only way a student writes anything. Keeps only the ids that are in the part,
-- only right/wrong, tries, hints, "show me" and which slip messages were hit (never
-- what was typed), and works out the score here. `p_done` ends a run: the first
-- finished run is kept for the teacher, and the best score.
create or replace function learn_save(p_pack uuid, p_part text, p_items jsonb, p_done boolean default false)
returns learn_progress
language plpgsql security definer set search_path = public as $$
declare
  me uuid := learn_me();
  pk learn_packs;
  ids text[];
  clean jsonb := '{}'::jsonb;
  k text;
  v jsonb;
  right_first integer := 0;
  sc numeric;
  r learn_progress;
begin
  if me is null then raise exception 'Only a student login can save progress.'; end if;
  select * into pk from learn_packs where id = p_pack;
  if pk.id is null or pk.status <> 'published' or (pk.opens_on is not null and pk.opens_on > learn_today())
     or not learn_in_class(pk.class_key) then
    raise exception 'This lesson is not open for your class.';
  end if;
  ids := learn_part_ids(pk.content, p_part);
  if cardinality(ids) = 0 then raise exception 'This lesson has no part called "%".', p_part; end if;
  if p_items is null or jsonb_typeof(p_items) <> 'object' or octet_length(p_items::text) > 200000 then
    raise exception 'The progress is not in the right shape.';
  end if;

  for k, v in select e.key, e.value from jsonb_each(p_items) e loop
    continue when not (k = any(ids)) or jsonb_typeof(v) <> 'object';
    clean := clean || jsonb_build_object(k, jsonb_build_object(
      'ok', coalesce(v -> 'ok' = 'true'::jsonb, false),
      'tries', case when jsonb_typeof(v -> 'tries') = 'number' then least(greatest((v ->> 'tries')::numeric, 0), 99)::int else 0 end,
      'hints', case when jsonb_typeof(v -> 'hints') = 'number' then least(greatest((v ->> 'hints')::numeric, 0), 99)::int else 0 end,
      'shown', coalesce(v -> 'shown' = 'true'::jsonb, false),
      -- Slip keys only ('c2:1', 'neg-sign'): a value that is not key-shaped is dropped, so
      -- nothing a child types (or sends by hand) reaches the teacher's "common misses".
      'slips', case when jsonb_typeof(v -> 'slips') = 'array'
                    then coalesce((select jsonb_agg(t.s) from (
                                     select x.s from jsonb_array_elements_text(v -> 'slips') x(s)
                                      where x.s ~ '^[A-Za-z0-9_.:-]{1,40}$' limit 10) t), '[]'::jsonb)
                    else '[]'::jsonb end));
    if v -> 'ok' = 'true'::jsonb then right_first := right_first + 1; end if;
  end loop;
  sc := round(right_first::numeric / cardinality(ids), 4);

  insert into learn_progress as lp (student_id, pack_id, part, pack_version, items, done, run_open, score, runs,
                                    first_items, first_score, best_score, started_at, finished_at, updated_at)
  values (me, p_pack, p_part, pk.version, clean, p_done, not p_done, sc, case when p_done then 1 else 0 end,
          case when p_done then clean end, case when p_done then sc end, case when p_done then sc end,
          now(), case when p_done then now() end, now())
  on conflict (student_id, pack_id, part) do update set
    pack_version = excluded.pack_version,
    items = excluded.items,
    score = excluded.score,
    done = lp.done or p_done,
    runs = lp.runs + case when p_done and lp.run_open then 1 else 0 end,
    first_items = case when lp.first_items is null and p_done then excluded.items else lp.first_items end,
    first_score = case when lp.first_score is null and p_done then excluded.score else lp.first_score end,
    best_score = case when p_done and lp.run_open then greatest(coalesce(lp.best_score, 0), excluded.score) else lp.best_score end,
    finished_at = case when p_done and lp.run_open then now() else lp.finished_at end,
    run_open = not p_done,
    updated_at = now()
  returning * into r;
  return r;
end $$;

-- ================================================================
-- 5. What the portal asks for
-- ================================================================

-- The signed-in student: name, year group, username, extra classes. Null for anyone else.
create or replace function learn_me_info() returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
           'student_id', s.id,
           'name', learn_display_name(s.nickname, s.first_name, s.full_name),
           'year_group', s.level,
           'username', a.username,
           'extra_classes', to_jsonb(a.extra_classes))
    from learn_accounts a join adm_students s on s.id = a.student_id
   where s.id = learn_me() and a.user_id = auth.uid()
$$;

-- The classes a staff member sees: the classes on their Teachers row, or every class
-- for office and head teachers, with how many packs, students and logins each has.
create or replace function learn_my_classes() returns jsonb
language sql stable security definer set search_path = public as $$
  with mine as (
    select distinct k as class_key
      from adm_teachers t cross join lateral unnest(coalesce(t.subjects, '{}')) k
     where coalesce(t.active, true) and position(':' in k) > 0
       and learn_staff_login()
       and (learn_is_office() or lower(t.email) = adm_email())
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'class_key', m.class_key,
           'packs', (select count(*) from learn_packs p where p.class_key = m.class_key),
           'students', (select count(*) from adm_students s
                         where s.level = split_part(m.class_key, ':', 2)
                           and coalesce(s.status, case when s.active is false then 'inactive' else 'active' end) <> 'inactive'),
           'logins', (select count(*) from learn_accounts a join adm_students s on s.id = a.student_id
                       where a.active and (s.level = split_part(m.class_key, ':', 2) or m.class_key = any(a.extra_classes))))
         order by split_part(m.class_key, ':', 2), m.class_key), '[]'::jsonb)
    from mine m
$$;

-- A class page: its students (with their login and when they last signed in), its
-- packs, and every progress row. Office, head teachers and the class's teachers.
create or replace function learn_class_overview(p_class text) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  yg text := split_part(p_class, ':', 2);
begin
  if not learn_can_teach(p_class) then raise exception 'Your account does not teach this class.'; end if;
  return jsonb_build_object(
    'class_key', p_class,
    'students', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', s.id,
               'name', learn_display_name(s.nickname, s.first_name, s.full_name),
               'full_name', s.full_name,
               'username', a.username,
               'login', case when a.user_id is null then 'none' when a.active then 'on' else 'off' end,
               'last_seen', u.last_sign_in_at) order by s.full_name)
        from adm_students s
        left join learn_accounts a on a.student_id = s.id
        left join auth.users u on u.id = a.user_id
       where coalesce(s.status, case when s.active is false then 'inactive' else 'active' end) <> 'inactive'
         and (s.level = yg or p_class = any(coalesce(a.extra_classes, '{}')))), '[]'::jsonb),
    'packs', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', p.id, 'slug', p.slug, 'title', p.title, 'title_vn', p.title_vn, 'status', p.status,
               'opens_on', p.opens_on, 'due_on', p.due_on, 'version', p.version, 'request_id', p.request_id,
               'published_at', p.published_at, 'parts', learn_pack_parts(p.content))
             order by coalesce(p.published_at, p.created_at) desc)
        from learn_packs p where p.class_key = p_class), '[]'::jsonb),
    'progress', coalesce((
      select jsonb_agg(jsonb_build_object(
               'student_id', g.student_id, 'pack_id', g.pack_id, 'part', g.part, 'done', g.done,
               'score', g.score, 'first_score', g.first_score, 'best_score', g.best_score,
               'runs', g.runs, 'updated_at', g.updated_at))
        from learn_progress g join learn_packs p on p.id = g.pack_id
       where p.class_key = p_class), '[]'::jsonb));
end $$;

-- Common misses on a pack: for each part, each check or item with how many children
-- answered it in their first finished run (or their current run, if not finished),
-- how many got it wrong the first time, the slip keys they hit (slips: { key: count })
-- and which children hit each one (slip_who: { key: [student_id, ...] }), so the class
-- page can say "4 children added instead of subtracting" and name them. Slip keys are
-- what learn_save kept: key-shaped only, never what a child typed.
create or replace function learn_pack_misses(p_pack uuid) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  cls text := learn_pack_class(p_pack);
begin
  if cls is null or not (learn_can_teach(cls) or learn_is_operator()) then
    raise exception 'Your account cannot see the results of this lesson.';
  end if;
  return coalesce((
    select jsonb_agg(jsonb_build_object('part', q.part, 'id', q.id, 'asked', q.asked, 'wrong_first', q.wrong_first,
                                        'slips', q.slips, 'slip_who', q.slip_who)
                     order by q.part, q.wrong_first desc, q.id)
      from (
        select g.part, e.key as id, count(*) as asked,
               count(*) filter (where not coalesce(e.value -> 'ok' = 'true'::jsonb, false)) as wrong_first,
               coalesce((select jsonb_object_agg(sl.s, sl.n) from (
                  select x.s, count(distinct g2.student_id) as n
                    from learn_progress g2
                    cross join lateral jsonb_each(coalesce(g2.first_items, g2.items)) e2
                    cross join lateral jsonb_array_elements_text(case when jsonb_typeof(e2.value -> 'slips') = 'array' then e2.value -> 'slips' else '[]'::jsonb end) x(s)
                   where g2.pack_id = p_pack and g2.part = g.part and e2.key = e.key
                   group by x.s) sl), '{}'::jsonb) as slips,
               coalesce((select jsonb_object_agg(sw.s, sw.who) from (
                  select x.s, jsonb_agg(distinct g2.student_id) as who
                    from learn_progress g2
                    cross join lateral jsonb_each(coalesce(g2.first_items, g2.items)) e2
                    cross join lateral jsonb_array_elements_text(case when jsonb_typeof(e2.value -> 'slips') = 'array' then e2.value -> 'slips' else '[]'::jsonb end) x(s)
                   where g2.pack_id = p_pack and g2.part = g.part and e2.key = e.key
                   group by x.s) sw), '{}'::jsonb) as slip_who
          from learn_progress g
          cross join lateral jsonb_each(coalesce(g.first_items, g.items)) e
         where g.pack_id = p_pack
         group by g.part, e.key) q), '[]'::jsonb);
end $$;

-- Results for a Lessons request in The Current: each pack made for it that the caller
-- may see, with the class size, logins, who started and finished each part, the
-- average first score and the five most-missed items. For The Current's Lessons tab
-- and the operator's script.
create or replace function learn_request_results(p_request uuid) returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object('request_id', p_request, 'packs', coalesce(jsonb_agg(jsonb_build_object(
           'id', p.id, 'slug', p.slug, 'title', p.title, 'class_key', p.class_key, 'status', p.status,
           'due_on', p.due_on, 'version', p.version,
           'links', jsonb_build_object(
             'pack', 'https://learn.pra.edu.vn/#/p/' || p.slug,
             'review', 'https://learn.pra.edu.vn/#/p/' || p.slug || '/review',
             'practice', 'https://learn.pra.edu.vn/#/p/' || p.slug || '/practice'),
           'students', (select count(*) from adm_students s
                         where s.level = split_part(p.class_key, ':', 2)
                           and coalesce(s.status, case when s.active is false then 'inactive' else 'active' end) <> 'inactive'),
           'logins', (select count(*) from learn_accounts a join adm_students s on s.id = a.student_id
                       where a.active and (s.level = split_part(p.class_key, ':', 2) or p.class_key = any(a.extra_classes))),
           'parts', (select coalesce(jsonb_agg(jsonb_build_object(
                       'id', pt ->> 'id', 'kind', pt ->> 'kind', 'total', (pt ->> 'total')::int,
                       'started', (select count(*) from learn_progress g where g.pack_id = p.id and g.part = pt ->> 'id'),
                       'finished', (select count(*) from learn_progress g where g.pack_id = p.id and g.part = pt ->> 'id' and g.done),
                       'avg_first_score', (select round(avg(g.first_score), 2) from learn_progress g
                                            where g.pack_id = p.id and g.part = pt ->> 'id' and g.first_score is not null))), '[]'::jsonb)
                       from jsonb_array_elements(learn_pack_parts(p.content)) pt),
           'misses', (select coalesce(jsonb_agg(m order by (m ->> 'wrong_first')::int desc), '[]'::jsonb)
                        from (select m from jsonb_array_elements(learn_pack_misses(p.id)) m
                               where (m ->> 'wrong_first')::int > 0
                               order by (m ->> 'wrong_first')::int desc limit 5) top))
         order by p.created_at), '[]'::jsonb))
    from learn_packs p
   where p.request_id = p_request and (learn_can_teach(p.class_key) or learn_is_operator())
$$;

-- For the learn-accounts function (service role only): the enrolled students of a
-- class with their login, if any.
create or replace function learn_class_students(p_class text) returns table (student_id uuid, name text, username text, active boolean)
language sql stable security definer set search_path = public as $$
  select s.id, learn_display_name(s.nickname, s.first_name, s.full_name), a.username, a.active
    from adm_students s
    left join learn_accounts a on a.student_id = s.id
   where coalesce(s.status, case when s.active is false then 'inactive' else 'active' end) <> 'inactive'
     and (s.level = split_part(p_class, ':', 2) or p_class = any(coalesce(a.extra_classes, '{}')))
   order by s.full_name
$$;

-- ================================================================
-- 6. Row level security and grants
-- ================================================================

alter table learn_accounts enable row level security;
alter table learn_packs enable row level security;
alter table learn_progress enable row level security;

revoke all on learn_accounts, learn_packs, learn_progress from public, anon, authenticated;
grant select on learn_accounts, learn_progress to authenticated;
grant select, insert, update, delete on learn_packs to authenticated;
grant all on learn_accounts, learn_packs, learn_progress to service_role;

do $$
declare
  f text;
begin
  foreach f in array array[
    'learn_staff_login()', 'learn_today()', 'learn_is_office()', 'learn_is_operator()', 'learn_teaches(text)',
    'learn_can_teach(text)', 'learn_me()', 'learn_in_class(text)', 'learn_can_see(text, text, date)',
    'learn_pack_class(uuid)', 'learn_can_manage_class(text)', 'learn_can_manage_student(uuid)', 'learn_who()',
    'learn_display_name(text, text, text)', 'learn_part_ids(jsonb, text)', 'learn_pack_parts(jsonb)',
    'learn_save(uuid, text, jsonb, boolean)', 'learn_me_info()', 'learn_my_classes()',
    'learn_class_overview(text)', 'learn_pack_misses(uuid)', 'learn_request_results(uuid)'
  ] loop
    execute format('revoke all on function %s from public, anon', f);
    execute format('grant execute on function %s to authenticated, service_role', f);
  end loop;
end $$;
revoke all on function learn_class_students(text) from public, anon, authenticated;
grant execute on function learn_class_students(text) to service_role;
revoke all on function learn_packs_stamp() from public, anon;

-- Logins: the student reads their own row; staff read the rows of students they teach.
-- Nobody writes here but the learn-accounts function (service role, no policy needed).
drop policy if exists own_read on learn_accounts;
create policy own_read on learn_accounts for select to authenticated using (user_id = auth.uid());
drop policy if exists staff_read on learn_accounts;
create policy staff_read on learn_accounts for select to authenticated using (learn_can_manage_student(student_id));

-- Packs
drop policy if exists packs_read on learn_packs;
create policy packs_read on learn_packs for select to authenticated
  using (learn_can_see(class_key, status, opens_on));
drop policy if exists packs_add on learn_packs;
create policy packs_add on learn_packs for insert to authenticated
  with check (learn_is_operator());
drop policy if exists packs_change on learn_packs;
create policy packs_change on learn_packs for update to authenticated
  using (learn_is_operator() or learn_teaches(class_key))
  with check (learn_is_operator() or learn_teaches(class_key));
drop policy if exists packs_remove on learn_packs;
create policy packs_remove on learn_packs for delete to authenticated
  using (learn_staff_login() and adm_is_head());

-- Progress: the student reads their own; the class's staff read the class's.
drop policy if exists own_read on learn_progress;
create policy own_read on learn_progress for select to authenticated using (student_id = learn_me());
drop policy if exists staff_read on learn_progress;
create policy staff_read on learn_progress for select to authenticated
  using (learn_can_teach(learn_pack_class(pack_id)) or learn_is_operator());

-- ================================================================
-- 7. Pictures in packs
-- ================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('learn-packs', 'learn-packs', false, 5242880, array['image/png', 'image/jpeg', 'image/webp', 'image/gif'])
on conflict (id) do update
  set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

-- A folder is a pack id: whoever may see the pack may read its pictures.
create or replace function learn_can_see_folder(p_folder text) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select learn_can_see(p.class_key, p.status, p.opens_on) from learn_packs p where p.id::text = p_folder), false)
$$;
revoke all on function learn_can_see_folder(text) from public, anon;
grant execute on function learn_can_see_folder(text) to authenticated, service_role;

drop policy if exists learn_packs_files_read on storage.objects;
create policy learn_packs_files_read on storage.objects for select to authenticated
  using (bucket_id = 'learn-packs' and learn_can_see_folder((storage.foldername(name))[1]));
drop policy if exists learn_packs_files_add on storage.objects;
create policy learn_packs_files_add on storage.objects for insert to authenticated
  with check (bucket_id = 'learn-packs' and learn_is_operator());
drop policy if exists learn_packs_files_change on storage.objects;
create policy learn_packs_files_change on storage.objects for update to authenticated
  using (bucket_id = 'learn-packs' and learn_is_operator())
  with check (bucket_id = 'learn-packs' and learn_is_operator());
drop policy if exists learn_packs_files_remove on storage.objects;
create policy learn_packs_files_remove on storage.objects for delete to authenticated
  using (bucket_id = 'learn-packs' and learn_is_operator());

notify pgrst, 'reload schema';

-- ================================================================
-- 8. The test (everything it adds is undone when the block ends)
-- ================================================================
-- A made-up Year 5 and Year 6 student, a made-up teacher of 'selftest:Year 5', and a
-- pack for that class. Then, through row level security: a draft is hidden from the
-- class; once published the Year 5 student sees it and saves progress, the Year 6
-- student sees nothing and cannot save; the teacher sees the class and can set a due
-- date but not change the content; a stranger sees nothing.
do $$
declare
  s5 uuid; s6 uuid;
  u5 uuid := gen_random_uuid();
  u6 uuid := gen_random_uuid();
  pk uuid;
  n integer;
  r learn_progress;
  j jsonb;
  refused boolean;
  teacher_email text := 'selftest-teacher@pra-selftest.invalid';
  pack_json jsonb := '{"format": "pra-learn-pack/1", "parts": [
    {"id": "review", "kind": "review", "slides": [
      {"layout": "statement", "text": "One", "check": {"id": "c1", "q": "?", "options": [{"val": "A", "text": "a"}], "correct": "A"}},
      {"layout": "statement", "text": "Two", "check": {"id": "c2", "q": "?", "options": [{"val": "A", "text": "a"}], "correct": "A"}}]},
    {"id": "practice", "kind": "practice", "set": {"items": [{"id": "p1", "level": "focus", "steps": []}]}}]}';
begin
  insert into adm_students (full_name, nickname, level, status, active)
  values ('Selftest Learner Five', 'Five', 'Year 5', 'active', true) returning id into s5;
  insert into adm_students (full_name, nickname, level, status, active)
  values ('Selftest Learner Six', 'Six', 'Year 6', 'active', true) returning id into s6;
  insert into adm_teachers (email, name, title, role, subjects, homeroom_groups, active)
  values (teacher_email, 'Selftest', 'Mr.', 'teacher', array['selftest:Year 5'], array[]::text[], true);
  execute 'set constraints learn_accounts_user_fk deferred';
  insert into learn_accounts (user_id, student_id, username) values (u5, s5, 'selftestaa01'), (u6, s6, 'selftestab02');
  insert into learn_packs (slug, class_key, title, content) values ('selftest-pack', 'selftest:Year 5', 'Self-test', pack_json)
  returning id into pk;

  -- The Year 5 student, while the pack is a draft.
  perform set_config('request.jwt.claims', json_build_object('sub', u5, 'role', 'authenticated', 'email', 'selftestaa01@learn.pra.edu.vn',
    'app_metadata', json_build_object('role', 'student', 'student_id', s5))::text, true);
  execute 'set local role authenticated';
  select count(*) into n from learn_packs where id = pk;
  if n <> 0 then raise exception 'a student can see a draft'; end if;
  execute 'reset role';
  update learn_packs set status = 'published' where id = pk;

  -- Published: the Year 5 student sees it and saves progress.
  execute 'set local role authenticated';
  select count(*) into n from learn_packs where id = pk;
  if n <> 1 then raise exception 'a student cannot see their class''s published pack'; end if;
  r := learn_save(pk, 'review', '{"c1": {"ok": true, "tries": 1}, "c2": {"ok": false, "tries": 2, "slips": ["c2:1"]}, "zz": {"ok": true}}', true);
  if r.score <> 0.5 or r.runs <> 1 or r.first_score <> 0.5 or r.items ? 'zz' then
    raise exception 'progress was not saved as expected (score %, runs %)', r.score, r.runs;
  end if;
  r := learn_save(pk, 'review', '{"c1": {"ok": true}, "c2": {"ok": true}}', true);
  if r.runs <> 1 or r.best_score <> 0.5 then raise exception 'a save after finishing counted as a new run'; end if;
  r := learn_save(pk, 'review', '{"c1": {"ok": true}}', false);
  r := learn_save(pk, 'review', '{"c1": {"ok": true}, "c2": {"ok": true}}', true);
  if r.runs <> 2 or r.best_score <> 1 or r.first_score <> 0.5 then raise exception 'a second run was not counted'; end if;
  select count(*) into n from adm_students;
  if n <> 0 then raise exception 'a student login can read adm_students'; end if;
  if learn_me_info() ->> 'name' <> 'Five' then raise exception 'learn_me_info did not return the student''s name'; end if;
  refused := false;
  begin perform learn_class_overview('selftest:Year 5'); exception when others then refused := true; end;
  if not refused then raise exception 'a student could read the class page'; end if;
  refused := false;
  begin update learn_packs set due_on = date '2030-01-01' where id = pk; get diagnostics n = row_count; refused := n = 0;
  exception when others then refused := true; end;
  if not refused then raise exception 'a student could change a pack'; end if;
  execute 'reset role';

  -- The Year 6 student: not in the class.
  perform set_config('request.jwt.claims', json_build_object('sub', u6, 'role', 'authenticated', 'email', 'selftestab02@learn.pra.edu.vn',
    'app_metadata', json_build_object('role', 'student', 'student_id', s6))::text, true);
  execute 'set local role authenticated';
  select count(*) into n from learn_packs where id = pk;
  if n <> 0 then raise exception 'a student can see another class''s pack'; end if;
  select count(*) into n from learn_progress;
  if n <> 0 then raise exception 'a student can see another student''s progress'; end if;
  refused := false;
  begin perform learn_save(pk, 'review', '{"c1": {"ok": true}}', true); exception when others then refused := true; end;
  if not refused then raise exception 'a student saved progress on another class''s pack'; end if;
  execute 'reset role';

  -- The class's teacher.
  perform set_config('request.jwt.claims', json_build_object('sub', gen_random_uuid(), 'role', 'authenticated', 'email', teacher_email,
    'app_metadata', json_build_object('role', 'teacher'))::text, true);
  execute 'set local role authenticated';
  j := learn_class_overview('selftest:Year 5');
  if jsonb_array_length(j -> 'packs') <> 1 or jsonb_array_length(j -> 'progress') <> 1 then
    raise exception 'the teacher''s class page is missing the pack or the progress';
  end if;
  if (select count(*) from jsonb_array_elements(j -> 'students') x where x ->> 'username' = 'selftestaa01') <> 1 then
    raise exception 'the teacher''s class page is missing the student';
  end if;
  update learn_packs set due_on = date '2030-01-01', content = '{"format": "pra-learn-pack/1", "parts": []}' where id = pk;
  select count(*) into n from learn_packs where id = pk and due_on = date '2030-01-01' and jsonb_array_length(content -> 'parts') = 2;
  if n <> 1 then raise exception 'a teacher could not set the due date, or could change the content'; end if;
  j := learn_pack_misses(pk);
  if (select (x ->> 'wrong_first')::int from jsonb_array_elements(j) x where x ->> 'id' = 'c2') <> 1 then
    raise exception 'common misses did not count the first run';
  end if;
  if learn_can_manage_student(s5) is not true or learn_can_manage_student(s6) is not false then
    raise exception 'the teacher can manage the wrong students';
  end if;
  execute 'reset role';

  -- A stranger from an open sign-up.
  perform set_config('request.jwt.claims', json_build_object('sub', gen_random_uuid(), 'role', 'authenticated', 'email', 'someone@gmail.invalid',
    'app_metadata', json_build_object())::text, true);
  execute 'set local role authenticated';
  select count(*) into n from learn_packs;
  if n <> 0 then raise exception 'a stranger can see packs'; end if;
  select count(*) into n from learn_accounts;
  if n <> 0 then raise exception 'a stranger can see logins'; end if;
  if learn_my_classes() <> '[]'::jsonb then raise exception 'a stranger has classes'; end if;
  execute 'reset role';

  raise exception 'PRA_LEARN_TEST_OK';
exception when others then
  if sqlerrm <> 'PRA_LEARN_TEST_OK' then
    raise exception 'PRA Learn does not work yet: %', sqlerrm;
  end if;
end $$;

select 'PRA Learn is set up: ' || (select count(*) from learn_packs) || ' packs, '
    || (select count(*) from learn_accounts) || ' student logins.' as result;

-- ================================================================
-- 9. Signing a student login out everywhere (security review 5 Nov 2026, finding 8)
-- ================================================================
-- Called by the learn-accounts function (service role only) after it resets a PIN or
-- blocks a login, so a device that is already signed in is signed out. Supabase's admin
-- API can only sign a user out with that user's own token, so this deletes the login's
-- rows in Supabase's auth tables instead: its refresh tokens and its sessions. With them
-- gone the device cannot refresh; the access token it holds still works until it expires
-- (one hour by default), and for a blocked login learn_accounts.active already shuts it
-- out at once.
-- Assumes Supabase's auth schema as of November 2026: auth.sessions (id uuid, user_id
-- uuid) and auth.refresh_tokens (user_id varchar holding the user's id as text,
-- session_id referencing auth.sessions), and that the role running this file (postgres)
-- may delete from both. Only a PRA Learn student login (a learn_accounts row) can be
-- signed out here, never a staff login. Returns the number of sessions ended.
create or replace function learn_end_sessions(p_user uuid) returns integer
language plpgsql volatile security definer set search_path = '' as $$
declare
  n integer := 0;
begin
  if p_user is null or not exists (select 1 from public.learn_accounts a where a.user_id = p_user) then
    raise exception 'Only a PRA Learn student login can be signed out here.';
  end if;
  delete from auth.refresh_tokens where user_id = p_user::text;
  delete from auth.sessions where user_id = p_user;
  get diagnostics n = row_count;
  return n;
end $$;

revoke all on function learn_end_sessions(uuid) from public, anon, authenticated;
grant execute on function learn_end_sessions(uuid) to service_role;

-- The SQL Editor shows the last result only, so this repeats the line above.
select 'PRA Learn is set up: ' || (select count(*) from learn_packs) || ' packs, '
    || (select count(*) from learn_accounts) || ' student logins. Sign-out: auth.sessions '
    || case when to_regclass('auth.sessions') is null then 'NOT FOUND' else 'found' end || ', auth.refresh_tokens '
    || case when to_regclass('auth.refresh_tokens') is null then 'NOT FOUND' else 'found' end || '.' as result;

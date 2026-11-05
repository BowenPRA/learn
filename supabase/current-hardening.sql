-- PRA Learn, step 1: harden The Current's database before any student login exists.
-- NOT RUN YET. Run once in The Current's Supabase project > SQL Editor, BEFORE
-- learn-schema.sql and before the first student login is made. Safe to run again.
-- Why: docs/DESIGN.md section 6 (C:\Users\sbowe\learn\docs\DESIGN.md).
--
-- Student logins are ordinary signed-in users with app_metadata.role = 'student'
-- and an email ending @learn.pra.edu.vn. Today every staff check in The Current
-- that is not about a role rests on one test: does the login's email equal an
-- active adm_teachers row? This file makes sure a student login can never pass
-- that test, whatever is typed on the Teachers page, without changing anything
-- for any account that exists today:
--
--   1. adm_email() returns '' for a student login, so every email match in every
--      policy and function (reports, students, attendance, photos, incidents,
--      newsletters, ECAs, lessons ...) fails for it. Nobody has role 'student' or a
--      @learn.pra.edu.vn address today, so no current login is affected.
--   2. adm_teachers can no longer hold a @learn.pra.edu.vn address or an empty one.
--   3. The teachers list (staff emails, names, classes) is readable by staff and the
--      triage account only, instead of by every login.
--   4. The yes/no helpers can no longer be called without signing in (anon).
--
-- Every UPDATE/DELETE here has a WHERE (there are none). Nothing reads or changes
-- student, family or report rows. The test at the end changes nothing it keeps.

-- ================================================================
-- 1. The login's email, for every staff check: never a student's
-- ================================================================
-- Before: select lower(coalesce(auth.jwt() ->> 'email', ''))
create or replace function adm_email() returns text
language sql stable as $$
  select case
    when coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'student' then ''
    when lower(coalesce(auth.jwt() ->> 'email', '')) like '%@learn.pra.edu.vn' then ''
    else lower(coalesce(auth.jwt() ->> 'email', ''))
  end
$$;

-- PRA Learn's own staff test (learn-schema.sql defines the same): a login that may
-- count as staff at all. Teachers made with Teachers > Create login have no role,
-- so "no role" is allowed until that button sets one (DESIGN.md 6.4).
create or replace function learn_staff_login() returns boolean
language sql stable as $$
  select adm_role() in ('super_admin', 'head', 'admin', 'teacher', '')
     and adm_email() <> ''
$$;

-- ================================================================
-- 2. No student address (and no blank address) on the Teachers page
-- ================================================================
-- NOT VALID: rows already there are not re-checked (none should match), new and
-- changed rows are.
alter table adm_teachers drop constraint if exists adm_teachers_email_not_learner;
alter table adm_teachers add constraint adm_teachers_email_not_learner
  check (trim(email) <> '' and lower(email) not like '%@learn.pra.edu.vn') not valid;

-- ================================================================
-- 3. The teachers list: staff and the triage account only
-- ================================================================
-- Before: using (true). The Current reads this list to find the signed-in person's
-- own row; every person with a row is report staff, so that still works.
drop policy if exists staff_read on adm_teachers;
create policy staff_read on adm_teachers for select to authenticated
  using (adm_is_report_staff() or adm_role() = 'triage');

-- ================================================================
-- 4. Helpers: not callable without signing in
-- ================================================================
-- Each helper answers only about the caller, but none needs to be reachable by
-- anon. Policies run them as the signed-in user, so authenticated keeps them.
-- A helper from a file that was never run is skipped.
do $$
declare
  f text;
begin
  foreach f in array array[
    'adm_role()', 'adm_email()', 'adm_is_staff()', 'adm_is_head()', 'adm_is_report_staff()',
    'adm_can_homeroom(text)', 'adm_can_subject(text, text)', 'adm_can_subject_in_report(text, uuid)',
    'adm_can_attendance(text)', 'adm_can_travel(uuid)', 'adm_newsletter_office()',
    'adm_newsletter_can_edit(text, jsonb)', 'adm_newsletter_groups(text)', 'adm_can_eca(uuid)',
    'adm_can_signature(text)', 'adm_can_send_lang()', 'adm_can_upper_secondary()',
    'adm_can_incident(text, text, uuid[])', 'adm_can_incident_folder(text)',
    'adm_lessons_manager()', 'adm_teaches(text)', 'adm_lesson_mine(text, text)',
    'learn_staff_login()'
  ] loop
    if to_regprocedure(f) is not null then
      execute format('revoke execute on function %s from public, anon', f);
      execute format('grant execute on function %s to authenticated, service_role', f);
    end if;
  end loop;
end $$;

notify pgrst, 'reload schema';

-- ================================================================
-- 5. The test (everything it adds is undone when the block ends)
-- ================================================================
-- A made-up teacher row; then the same email signed in three ways: as a teacher,
-- with no role (a Create-login teacher), and as a student. Then a student login
-- reads the teachers list and the student list through row level security.
do $$
declare
  n integer;
  refused boolean;
  teacher_email text := 'selftest-teacher@pra-selftest.invalid';
begin
  insert into adm_teachers (email, name, title, role, subjects, homeroom_groups, active)
  values (teacher_email, 'Selftest', 'Mr.', 'teacher', array['math:Year 5'], array['Year 5'], true);

  perform set_config('request.jwt.claims', json_build_object('email', teacher_email, 'app_metadata', json_build_object('role', 'teacher'))::text, true);
  if not adm_is_report_staff() or not adm_can_subject('math', 'Year 5') or not adm_can_homeroom('Year 5') then
    raise exception 'a teacher lost their rights';
  end if;

  perform set_config('request.jwt.claims', json_build_object('email', teacher_email, 'app_metadata', json_build_object())::text, true);
  if not adm_is_report_staff() then raise exception 'a teacher login with no role lost its rights'; end if;

  perform set_config('request.jwt.claims', json_build_object('email', teacher_email, 'app_metadata', json_build_object('role', 'student'))::text, true);
  if adm_email() <> '' or adm_is_report_staff() or adm_can_subject('math', 'Year 5') or adm_can_attendance('Year 5') or adm_is_head() then
    raise exception 'a student login passed a staff check';
  end if;

  perform set_config('request.jwt.claims', json_build_object('email', 'otter27@learn.pra.edu.vn', 'app_metadata', json_build_object())::text, true);
  if adm_email() <> '' or adm_is_report_staff() then raise exception 'a @learn.pra.edu.vn login passed a staff check'; end if;

  refused := false;
  begin
    insert into adm_teachers (email, name) values ('otter27@learn.pra.edu.vn', 'Not a teacher');
  exception when check_violation then refused := true;
  end;
  if not refused then raise exception 'a @learn.pra.edu.vn address was accepted on the Teachers page'; end if;

  -- Row level security, as a signed-in student.
  perform set_config('request.jwt.claims', json_build_object('sub', gen_random_uuid(), 'role', 'authenticated', 'email', 'otter27@learn.pra.edu.vn',
    'app_metadata', json_build_object('role', 'student'))::text, true);
  execute 'set local role authenticated';
  select count(*) into n from adm_teachers;
  if n > 0 then raise exception 'a student login can read the teachers list'; end if;
  select count(*) into n from adm_students;
  if n > 0 then raise exception 'a student login can read the student list'; end if;
  execute 'reset role';

  raise exception 'PRA_HARDENING_TEST_OK';
exception when others then
  if sqlerrm <> 'PRA_HARDENING_TEST_OK' then
    raise exception 'Hardening test failed: %', sqlerrm;
  end if;
end $$;

select 'Hardening is in place: student logins pass no staff check, and the teachers list is staff only.' as result;

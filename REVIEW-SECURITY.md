# PRA Learn: security and correctness review

5 November 2026, an independent review of PRA Learn's database work, the proposed
hardening of The Current's live database, and one fix for a live problem. Bowen was
away; every decision below is written down so he can change it. Nothing was run
against the live database, deployed, pushed or emailed.

Files reviewed:

- `C:\Users\sbowe\learn\supabase\current-hardening.sql` (changes live helpers)
- `C:\Users\sbowe\learn\supabase\learn-schema.sql`
- `C:\Users\sbowe\learn\supabase\functions\learn-accounts\` (index.ts, lib.js)
- `C:\Users\sbowe\learn\docs\DESIGN.md` sections 6, 13, 14
- The Current's SQL history `C:\Users\sbowe\admin\supabase\*.sql`, in the README order

## How it was tested

A harness in `C:\Users\sbowe\learn\tests\review\` loads **every real SQL file of The
Current** into PGlite, in order, on top of stand-ins for Supabase (anon,
authenticated and service_role roles, Supabase's default grants, `auth.jwt()`,
`storage.objects`), seeds made-up rows in all 39 `adm_*` tables and every bucket, and
signs in as each kind of caller. It needs `C:\Users\sbowe\admin` beside it, so it is
not part of `npm test`. Run from `C:\Users\sbowe\learn`:

| Command | What it checks | Result |
|---|---|---|
| `node tests/review/test-hardening.mjs` | The same 135 checks (160 with the incidents and lessons files) for 16 callers, BEFORE and AFTER the hardening | 36 / 36 |
| `node tests/review/test-learn.mjs` | learn-schema.sql on the real schema: students, teachers, office, head, operator, strangers, anon, `learn_save` abuse | 85 / 85 |
| `node tests/review/fn/test-function.mjs` | The real learn-accounts `index.ts`, run in Node with a fake Supabase client on the real schema | 29 / 29 |
| `node tests/review/test-enrollment-guard.mjs` | The enrollment guard, against the same cases on a database without it (`HARDENED=1` runs the hardening first) | 41 / 41 |
| `node tests/review/test-extra.mjs` | A table owner that is not a superuser (as on Supabase); the incidents numbering (now fixed) | 4 / 4 |
| `node tests/review/test-incidents-number.mjs` | Finding 3 fix: a teacher after an office-only incident, two in one go, the lock, a chosen number, office imports, stranger / student / anon refused | 15 / 15 |
| `node tests/review/fn/test-sessions.mjs` | Finding 8 fix: reset and disable end the student's sessions and refresh tokens (stand-in auth tables), not other users'; the helper is service-role and student-only; a failed sign-out still returns the PIN with a warning | 20 / 20 |
| `npm test` | The repo's own tests (one added for slips) | 33 / 33 |

Callers: super admin (Bowen), head (Seth), office (Hien), office who teaches (Duyen),
teacher with a role (Kiu, David), teacher made with Create login (no role, Tham V),
the triage login, anon (the website and the mailer key), a stranger from open
sign-up, a student, a student whose address was typed on the Teachers page, a
teacher row marked inactive, an outsider's address typed on the Teachers page, an
outsider named as an ECA's teacher. Areas: The Current's own sign-in lookup
(`adm_teachers`), every table read, students, teachers (incl. the `no-login:chien`
row), reports and sections (subject, homeroom, published), course notes,
attendance, travel, settings, invoices, To-Do (add, note, delete), leads, website
messages, enrollments (check, Add pending student, delete), parent lists, photos,
newsletter (class corner, setting, schedule, test, retry, mailer status, templates),
drive links, ECAs, EY answers, signatures, Upper Secondary, report send, incidents,
lessons, every bucket (read, add, remove), the website forms and the mailer
functions, and the two forms committed as anon so their deferred email triggers run.

## Findings, by severity

| # | Sev. | What | Where | State |
|---|---|---|---|---|
| 1 | High (live) | The website enrollment form, open to anyone, fills blank fields of an existing Pending student (parent email, phone, address, allergies, start date), adds a made-up child to a real family by a parent's email, links it to a real lead and moves the lead to Enrolled. Shown in PGlite on today's functions. | `adm_enrollment_place`, `updates-2026-10-02-student-dates-onboarding.sql` | **Fixed** in a new file, not run: `C:\Users\sbowe\admin\supabase\updates-2026-11-05-enrollment-guard.sql` |
| 2 | Medium (live) | Staff rights rest on an email match: any login whose address is on an active Teachers row is that teacher, role or not. An outsider's address typed there reads students, reports, attendance, and (with PRA Learn) makes and resets that class's logins. The hardening closes this for student logins only. | `adm_is_report_staff` and friends; `learn_teaches`, `learn_can_manage_*` | Open. Plan written below ("Plan: teacher logins carry a role"); not built. |
| 3 | Medium (file not run) | Incidents: a teacher cannot file a student incident once an office-only (staff) incident holds the highest number. The number is `max(number) + 1` counted under the teacher's row rules, so it repeats a number they cannot see: "duplicate key". | `adm_incidents_stamp`, `updates-2026-11-03-incidents.sql` | **Fixed** in that file (not run): `adm_incident_next_number()`, security definer, advisory lock, staff only (the SQL Editor too); a teacher can no longer choose the number; office may still bring one. Nothing else in the file changed. |
| 4 | Medium (live) | Thank-you emails carry a stranger's text from the form's name fields, with links made clickable; site-wide form limits can be filled by one person. | DESIGN 6.2 #4, #5 | Open (confirmed by reading; not changed). |
| 5 | Low (fixed) | `learn_save` stored any text a child sent as "slips" (10 x 40 characters), shown to teachers as "common misses". | learn-schema.sql | **Fixed**: only key-shaped slips (`c2:1`, `neg-sign`) are kept. |
| 6 | Low (fixed) | The hardening revoked `adm_newsletter_office()` from anon. The newsletter-build function asks it as the caller, so a caller with no login would get a 503 "not set up in the database" instead of its 403. | current-hardening.sql | **Fixed**: that helper stays callable by anon (it says false). |
| 7 | Low (fixed) | learn-accounts: two `make` calls at once returned a raw database error to the teacher for each child; a username taken in the same race stopped instead of trying another. | index.ts | **Fixed**: the second call skips a child the first one made; a taken username tries another. No duplicate logins or orphan users either way. |
| 8 | Low (fixed) | Reset PIN kept sessions already open on other devices; enable after disable let an old device back in. | learn-accounts | **Fixed**: reset and disable call `learn_end_sessions` (learn-schema.sql section 9, service role only, student logins only), which deletes the login's `auth.refresh_tokens` and `auth.sessions` rows. An access token already issued still works until it expires (1 hour) after a reset. Assumes Supabase's auth table shapes and that `postgres` may delete from them (check in the function's README). |
| 9 | Low (open) | An outsider named as an ECA's teacher changes its members and register. | `adm_can_eca`, `updates-2026-10-21-ecas.sql` | Open (DESIGN 6.2 #6). |
| 10 | Low (improved) | The hardening's new rule on Teachers rows is NOT VALID: a row already holding a blank or student address could not be saved again. | current-hardening.sql | The result line now counts such rows. |
| 11 | Info | The contact form un-archives a lead found by email (anon). By design (a returning family). | `adm_web_submit` | Left as is. |

Checked and fine: student logins read nothing in any `adm_*` table or bucket (also
with no role, and with no `learn_accounts` row); a student sees only their own login
row, their own progress, and their class's published packs from the opening date;
`learn_save` writes only the caller's own row (the student id comes from the login,
never from the request), drops unknown ids, caps tries and hints, refuses drafts,
hidden or later packs, other classes, inactive students and blocked logins; a forged
all-correct save scores at most 1, which the design accepts because answers are
checked in the browser. Teachers see only their classes; they can open, hide and
date a pack but not change its content, class or title; only a head deletes. The
operator (triage) adds and re-publishes packs on their slug, uploads pictures, writes
the links on the request, and still reads no student list. The function checks every
caller as that caller (401 without a login; 403 for a student, a stranger, triage, a
teacher of another class), keeps usernames unique (also against an address already in
auth), logs counts only (no PIN or username in any log line), and calling it twice
makes nothing new. The hardened `adm_teachers` rule does not recurse with a table
owner that is not a superuser, which is the Supabase case.

## Before and after the hardening

- Super admin, head, office, office who teaches, teachers with and without a role,
  the triage login: **identical** on all 135 / 160 checks, except the intended new
  rule: a blank or `@learn.pra.edu.vn` address can no longer be saved on the
  Teachers page (its email box is already `required`).
- The website (contact form, enrollment form, upload check, newsletter list and view
  counter) and the mailer (`adm_mailer_ok`, `_due`, `_claim`, `_done`, `_build`, wrong
  key): **identical**, and the committed forms write the same emails.
- Anon: can no longer call the yes/no helpers directly (permission denied).
- Stranger, ECA outsider, an inactive teacher, a student: no longer read the teachers
  list. A student whose address was typed on the Teachers page loses 36 (49) accesses
  it had before. An outsider typed on the Teachers page is unchanged (finding 2).

## The enrollment guard, in plain words (for Bowen and the office)

Before: when a family sent the form on pra.edu.vn, The Current matched it to what it
already had and changed those records by itself. Anyone can send that form, so a
stranger who knew a child's name and birthday could put their own email address on
that child's record.

After: a form from a family The Current does not know still adds the child as a
Pending student straight away, as now. A form that matches anything already there
(a child with the same name and birthday, a family or a lead with a parent's email)
is saved, but nothing else changes: on Enrollments it shows **No student yet**. The
office opens it, checks it is genuine, and presses **Add pending student**. That one
click does exactly what the form used to do by itself: it links the form to the child
already on the list and fills in that record's blanks, or adds the child to the right
family, links the lead and moves it to Enrolled. Tested to give the same result as
before for every case.

What the office will notice: most forms come from families already on Leads, so most
forms will need that one click. The office alert email already says "In The Current:
not linked to a student yet" for them.

For whoever next works on The Current (not done here; these are its files):

- `src/handbook/05-students-and-enrollment.md`, "What happens when a form arrives":
  say that a form from a family already known (by a child's name and birthday, or a
  parent's email on a family or a lead) waits with **No student yet** until the office
  presses **Add pending student**, which then links it and moves the lead to Enrolled;
  a form from a new family adds the Pending student by itself. Step 3 of the chapter's
  opening list says the form "moves the lead to Enrolled": that now happens on the
  office's click.
- `src/lib/i18n.jsx` `enSubtitle` says "Each one adds the child as a pending student".
- The button label **Add pending student** does not say it may link to an existing
  child and fill its blanks; consider "Add or link student" and a line in the form
  window naming the record it will link to.

## Go / no-go

| File | Verdict | Notes |
|---|---|---|
| `C:\Users\sbowe\admin\supabase\updates-2026-11-05-enrollment-guard.sql` | **Go** | Fixes a live problem; independent of PRA Learn; the office workflow change above. |
| `C:\Users\sbowe\learn\supabase\current-hardening.sql` | **Go** | After the read-only checks in DESIGN.md section 14 (steps 1 and 2). Staff, website and mailer unchanged. |
| `C:\Users\sbowe\learn\supabase\learn-schema.sql` | **Go**, after the hardening | Run after `updates-2026-11-05-lessons.sql` if the Lessons tab goes ahead, so packs get their link to requests (or run it again later; it is safe to re-run). |

Safe order:

1. `updates-2026-11-05-enrollment-guard.sql` (any time; the sooner the better).
2. `updates-2026-11-05-lessons.sql`, if the Lessons tab is going live, and
   `updates-2026-11-03-incidents.sql` (finding 3 is fixed in it).
3. `current-hardening.sql`.
4. `learn-schema.sql`.
5. Deploy `learn-accounts` (its README), then the portal.

## For the DESIGN.md owner

- 6.2 #3: the fix proposed there (`and adm_is_staff()` on four lines) still let the
  form link itself to an existing student and lead, and "Make student" cannot link a
  form that already has a student. The guard file does it differently (above).
- 6.2 #7 is already fixed in the lessons file (`adm_lesson_mine` requires staff).
- 6.2 #9 says the hardening revokes `adm_newsletter_groups` from authenticated; the
  file keeps authenticated (harmless: it returns two fixed addresses).
- 6.2 #10: `adm_newsletter_office()` is now left callable by anon (finding 6).
- 6.3 / 8.1: slips are now key-shaped only.
- The Current's `src/lib/learn.js` already calls `learn_class_overview` and
  `learn_request_results`; until learn-schema.sql is run those calls fail.

## What Bowen decides

1. Run the enrollment guard now, accepting one click per known family's form (or ask
   for the stricter version: the website never adds students at all).
2. ~~Who fixes the incidents numbering~~: fixed in the file (finding 3); it can be run.
3. When to give teacher logins a role and require it (finding 2); until then, keep the
   Teachers page to PRA addresses.
4. ~~Whether reset PIN must end open sessions~~: built (finding 8). Before deploying
   learn-accounts, run the read-only privilege check in its README.

## Plan: teacher logins carry a role (finding 2), not built

Written 5 November 2026. Nothing below is implemented. Today every staff check ends in
"is this login's email on an active Teachers row?", whatever the login's role. A login
made with Teachers > Create login has no role at all (it uses `signUp` from the
browser), so the checks cannot simply ask for a role yet. The plan gives every teacher
login `app_metadata.role = 'teacher'`, then makes the email match count only for a
login with a staff role.

### Step 1. Create login moves into an Edge Function

New function in The Current's project, `staff-login` (service role, Verify JWT off,
checks the caller itself like `learn-accounts`):

- Caller: asked as the caller, `adm_is_head()` must be true (the people who can save
  the Teachers page). Anyone else: 403.
- Body `{ email, password }`. The email must be on an **active Teachers row**, must not
  be blank, `no-login:…` or `@learn.pra.edu.vn`. Password at least 6 characters (as the
  page asks now).
- `auth.admin.createUser({ email, password, email_confirm: true, app_metadata: { role:
  'teacher' }, user_metadata: { name } })`. No confirmation email; the head gives the
  temporary password as now.
- If a login with that address already exists: with no role, it answers "exists, no
  role" and does nothing unless the body also has `adopt: true` (the head confirms on
  the page that the address is the teacher's), then sets `role: 'teacher'` with
  `updateUserById`; with any role, it changes nothing and says which role.
- Logs counts only, never the address or the password.

Files:

- `C:\Users\sbowe\admin\supabase\functions\staff-login\index.ts` and `README.md` (new;
  model: `C:\Users\sbowe\learn\supabase\functions\learn-accounts\index.ts`).
- `C:\Users\sbowe\admin\src\pages\reports\Teachers.jsx`: `createLogin` (around line
  285) calls `supabase.functions.invoke('staff-login', …)` instead of
  `signupClient().auth.signUp`; drop the "requires email confirmation" branch; add the
  "exists, no role: give it the teacher role?" question.
- `C:\Users\sbowe\admin\src\handbook\03-the-current.md` ("A login made this way
  carries no role") and the handbook checker run.
- Test: a new `C:\Users\sbowe\learn\tests\review\fn\test-staff-login.mjs` on the
  same fake client as `test-function.mjs` (head yes; office, teacher, stranger 403;
  address not on Teachers refused; `@learn` refused; existing login adopted only with
  `adopt`).

### Step 2. Backfill the existing teacher logins

New file `C:\Users\sbowe\admin\supabase\updates-YYYY-MM-DD-teacher-roles.sql`:

1. Read-only first part (run alone, Bowen reads the list): every `auth.users` row
   with no `app_metadata.role` and its address on an `adm_teachers` row, with the row's
   name and `active`; and every role-less login NOT on the Teachers list (strangers from
   open sign-up; left alone, they will lose nothing they have today).
2. The change: `update auth.users set raw_app_meta_data = coalesce(raw_app_meta_data,
   '{}') || '{"role": "teacher"}' where (raw_app_meta_data ->> 'role') is null and
   lower(email) in (select lower(email) from adm_teachers where coalesce(active, true)
   and email like '%@%' and email not like '%@learn.pra.edu.vn')`. A WHERE on the
   update (Supabase's pg-safeupdate rule). Ends by printing how many changed and how
   many role-less Teachers addresses are left (should be 0).
3. A teacher's new role reaches their token at the next refresh (within an hour) or
   sign-in. Nothing changes for them until step 4, so there is no rush.

### Step 3. Turn off open sign-ups

Supabase > Authentication > Sign In / Providers > "Allow new users to sign up": off.
Only after step 1 is live (Create login no longer needs it). Logins made with the
service role (the scripts, `learn-accounts`, `staff-login`) keep working.

### Step 4. The helpers require a staff role

New file `C:\Users\sbowe\admin\supabase\updates-YYYY-MM-DD-staff-role-required.sql`,
run after `C:\Users\sbowe\learn\supabase\current-hardening.sql` (it replaces that
file's `adm_email()`):

- `adm_email()` returns `''` unless `adm_role() in ('super_admin', 'head', 'admin',
  'teacher', 'triage')` (and still `''` for role `student` and `@learn.pra.edu.vn`).
  Every email-match check goes through it, so one change covers them all:
  `adm_is_head`, `adm_is_report_staff`, `adm_can_homeroom`, `adm_can_subject`,
  `adm_can_attendance` (`updates-2026-09-15.sql`), `adm_can_subject_in_report`
  (`updates-2026-10-26-report-sent.sql`), `adm_newsletter_can_edit`
  (`updates-2026-10-16-newsletter.sql`), the `adm_email()` matches in
  `updates-2026-10-22-mail.sql`, `adm_can_eca` (`updates-2026-10-21-ecas.sql`, closing finding 9 as well),
  `adm_can_incident` (`updates-2026-11-03-incidents.sql`), `adm_teaches` /
  `adm_lesson_mine` (`updates-2026-11-05-lessons.sql`, `updates-2026-11-05-lessons-mail.sql`)
  and the `created_by` / `teacher_email` matches on To-Do, signatures and the outbox.
- `learn_staff_login()` drops the `''` (no role) case, in
  `C:\Users\sbowe\learn\supabase\current-hardening.sql` and
  `C:\Users\sbowe\learn\supabase\learn-schema.sql` (DESIGN.md 6.4 step 4).
- The file starts with a guard that stops (raises) if any login on an active Teachers
  row still has no role, so it cannot lock a teacher out by being run too early.
- Test: `test-hardening.mjs` gains an AFTER-ROLE pass: Tham V (no role) loses every
  staff access until backfilled, then matches Kiu; the outsider typed on Teachers and
  the ECA outsider read nothing; every other caller unchanged.

### Safe order

1. Deploy `staff-login`; deploy The Current with the new Create login (from a clean
   copy if other chats have work in the folder). Old role-less logins still work.
2. Run the read-only part of the backfill; Bowen checks the list; run the backfill.
3. Wait a day (every teacher's token refreshed). Re-run the read-only part: 0
   role-less Teachers addresses.
4. Turn off open sign-ups.
5. Run `updates-…-staff-role-required.sql` (its guard re-checks step 3). Check one
   teacher (Tham V) can still open their reports and attendance.
6. Undo, if a teacher is locked out: give that login the role (step 2's update for one
   address), or re-run `current-hardening.sql` section 1 to restore the old
   `adm_email()`.

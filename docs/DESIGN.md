# PRA Learn: design

PRA Learn is the student and teacher portal at **learn.pra.edu.vn**. A student
signs in, sees the lessons their class has opened this week, goes back through the
slides answering check questions (the guided review) and works through
step-by-step practice. Their teacher sees who did what and which questions most of
the class got wrong. The lessons come from the Lessons tab in The Current: a
teacher asks for a lesson, the operator builds it with Claude, and the review and
practice parts are published here as data, with no deploy.

Written 5 November 2026 while Bowen was away. Every decision below was made
without him and is listed again under [Open decisions](#13-open-decisions-for-bowen).
Nothing here has been run, deployed or pushed.

Contents

1. Decisions at a glance
2. Identity: which Supabase project
3. Student sign-in
4. Staff sign-in
5. Making and resetting logins
6. Security: what student logins must not reach
7. Content: lesson packs
8. Progress and results
9. Pages
10. Look and language
11. Domain and hosting
12. Phases
13. Open decisions for Bowen
14. What only Bowen can do

---

## 1. Decisions at a glance

| Question | Decision | Section |
|---|---|---|
| Where accounts and data live | The Current's Supabase project. Portal tables are `learn_*` beside the `adm_*` ones. | 2 |
| How students sign in | Since 6 Nov 2026, as on the old Dashboard: the nickname (folded: `goku`) and a 3-digit secret code, the student number (S0024 -> `024`), printed on a login card by the teacher. No class list on the sign-in page. | 3 |
| How staff sign in | Their Current login (email + password), same accounts. | 4 |
| Who makes student logins | Office, head teachers, or a teacher of that class, through the Edge Function `learn-accounts` (service role). | 5 |
| What a student account can read | Its own name, its class's published packs, its own progress. Nothing in `adm_*`. | 6 |
| Before the first student login | Run `supabase/current-hardening.sql` (a student login can never pass an email-based staff check; the teachers list stops being readable by every login). | 6 |
| Open sign-ups | Stay on for now because Teachers > Create login uses them; turn off once that button moves to an Edge Function. | 6.4 |
| Lesson content | One JSON "pack" per lesson in `learn_packs`: review slides (classroom layouts, checks), practice sets (the step-practice schema), images in a private bucket. | 7 |
| Publishing | The operator's script upserts the pack; no build or deploy. | 7.6 |
| Results on the Lessons request | `learn_request_results(request_id)`; the request's `outputs.review` and `outputs.practice` hold the portal links. | 8.4 |
| Hosting | GitHub Pages, `public/CNAME` = `learn.pra.edu.vn`, Vite `base: '/'`, hash routes. | 11 |

## 2. Identity: which Supabase project

### 2.1 What exists today

- **The Current** has its own Supabase project. Staff sign in with email and
  password. Roles are in `app_metadata.role` (super_admin, head, admin, teacher, triage),
  set by `scripts/create-staff-accounts.mjs`; a login made with Teachers > Create
  login has no role and counts as a teacher because its email matches an
  `adm_teachers` row. The roster is `adm_students` (year group in `level`).
- **The Dashboard** is on a **different** Supabase project (checked on 5 November
  by comparing the two project URLs without printing them; the code comment in The
  Current's `db.js` that says they share one is out of date). Students sign in
  with a first name and PIN mapped to `<name>@science.local`; their progress is one
  JSON blob per student; teacher actions go through a Vercel backend holding that
  project's service key.

### 2.2 The three options

| | A. The Current's project (chosen) | B. A new, separate project | C. Inside the Dashboard |
|---|---|---|---|
| Roster | One: logins point at `adm_students` rows. | A second copy of children's names to keep in step with The Current, through a sync job that holds a service key. | A third roster (`students` in the Dashboard project), keyed by first name. |
| Staff accounts | The Current's logins work as they are. | A second account and password per teacher. | Dashboard teacher logins, today Bowen only. |
| Results on the Lessons request | A database function joins packs to `adm_lesson_requests` directly. | Needs a sync or a cross-project call. | Needs the Vercel backend to write into The Current. |
| Supabase free plan | No new project. | A third project. The free plan allows two active free projects per account, and PRA already has two (if both are free; the plan was never confirmed). | No new project. |
| Blast radius of a mistake | A wrong policy could expose family data to a student login. This is the real cost; section 6 deals with it. | A portal bug cannot reach family data. | A portal bug cannot reach family data, but can reach every Dashboard student's progress blob. |
| Upkeep after Bowen | One project, one set of rules, one backup (`backup-database.ps1` already copies it daily). | Two projects, two backups, a sync. | A large personal app (GED, Year 7, arcade) with its own backend and deploy habits. |

**Choice: A.** One roster, one set of staff accounts, no third project, and
results can reach the Lessons request without any copying. Its one real risk,
children's logins in the project that holds families' data, is handled by the
audit and fixes in section 6, by giving student logins a role (`student`) and an
email domain (`@learn.pra.edu.vn`) that no staff check accepts, and by tests that
sign in as a student and try to read every `adm_*` table.

B was the safer-looking option but doubles the roster, which is the thing PRA has
been careful about since 22 September (children's data in one place, behind staff
logins). C was ruled out by Bowen's own words ("prob gonna want to make this a new
project") and by the Dashboard's first-name logins.

The portal's tables use the `learn_` prefix in the `public` schema, like `adm_`.
A separate Postgres schema would be tidier but needs "Exposed schemas" changed in
the Supabase dashboard; not worth it.

## 3. Student sign-in

> **Changed 6 November 2026 (Bowen):** logins now work like the old Dashboard's. The
> login name is the student's nickname folded to plain lower-case letters and digits
> (`foldName` in `supabase/functions/learn-accounts/lib.js`: no accents, spaces or
> punctuation; else the first name), and the secret code is the student number
> padded to 3 digits (`codeFor`: S0024 -> 024). Password `<code>-learn`, email
> `<name>@learn.pra.edu.vn`, as before. A clash (two nicknames that fold the same)
> is reported, not renamed. Reset sets the code back to the student number and signs
> the login out. The trade-off below still holds: the code is the student number,
> on invoices and in the student's Google address, so anyone who knows a child's
> nickname and number can sign in as them; a student login reaches only that
> student's own packs and progress. The rest of this section describes the first
> design (random word + digits, 4-digit PIN) and is kept for the reasoning.

PRA's younger learners are 8 to 12 and are learning English, so the sign-in screen
has two boxes, big type, an icon on each, and almost no words.

- **Username**: a short English word and two digits, chosen at random when the
  login is made: `otter27`, `mango41`, `rocket08`. Lower case, no spaces. It is not
  the child's name and not their student code, so a username on a lost card or a
  screenshot says nothing about who it belongs to, and usernames cannot be counted
  through (`s0001`, `s0002` ...). The words are picked from a list of easy nouns
  (animals, fruit, weather, space) so children can read and spell them.
- **PIN**: 4 digits, random, never `1234`-style or all one digit. Shown once,
  when the login is made or reset, for the teacher to print. Never stored in a
  readable form.
- **The stored password** is the PIN plus a fixed suffix (`-learn`), only because
  Supabase wants at least 6 characters. The suffix is public; the PIN is the secret.
- **Login email**: `<username>@learn.pra.edu.vn`. Children never see or type it.
  The address can never receive mail (no MX record), so nothing can be confirmed or
  reset through it, and it never matches a staff address.
- **Login cards**: the class page has "Print login cards": one card per child with
  their first name, username, PIN and the address learn.pra.edu.vn.
  The teacher keeps the cards in class. Cards are printed straight after logins are
  made or reset, since that is the only time the PINs are known.
- **No class list** on the sign-in page, ever (no picture grid of names). A
  stranger who opens learn.pra.edu.vn sees two empty boxes.
- **Shared computers**: a "This is a shared computer" box keeps the sign-in for the
  open tab only (sessionStorage); otherwise the device stays signed in, so most
  children type their PIN once per device.
- **Forgotten PIN**: the teacher resets it from the class page (a new PIN, a new
  card). There is no self-service reset.
- **Guessing**: with a known username a 4-digit PIN is 10,000 tries; Supabase
  limits sign-in attempts per IP address (30 per 5 minutes by default), about 28
  hours of trying from one address for one child, for an account that can read one
  child's lesson scores. Without the username the odds are far longer
  (about 150 words x 100 numbers). If Bowen prefers 6 digits, it is one setting in
  the Edge Function (`PIN_LENGTH`).
- **One class, one Wi-Fi**: the same per-IP limit applies to a whole class signing
  in from PRA's Wi-Fi, together with staff signing in to The Current. Twenty
  children and a few typos can hit 30 in five minutes. Raise "Rate limit for sign
  ups and sign ins" in Supabase > Authentication > Rate Limits (to 150, say) before
  the first lesson. See section 14.
- **Later: Google sign-in.** Students already have PRA Google accounts
  (`s0024@pra.edu.vn`). Phase 3 can add "Sign in with Google": the student's
  login email becomes their PRA Google address and Supabase links the Google
  identity to that existing user. This needs open sign-ups turned off first (or
  any Google user could make an account) and the Google provider set up in
  Supabase. Usernames and PINs stay for the youngest.

## 4. Staff sign-in

Teachers and office staff sign in with their Current login: the same email and
password, the same Supabase user. The sign-in form accepts a short name the way
The Current does (mapped to `<name>@science.local` with the `-y8s` suffix), so an
account that works in The Current works here. Sessions are per website, so someone
signed in to current.pra.edu.vn signs in once more on learn.pra.edu.vn.

What a staff member sees is decided in the database, from the rules The Current
already has:

- **Office and head teachers** (`adm_is_staff()` or `adm_is_head()`): every class.
- **A teacher**: the classes on their Teachers row (`math:Year 5` in `subjects`).
- **The triage account** (the operator's script): reads and writes packs.

## 5. Making and resetting logins

Student logins can only be made with the service role, which never reaches a
browser. The Edge Function `supabase/functions/learn-accounts` does it. It is
called by the portal's class page today and by The Current later (a "PRA Learn
logins" panel on the class), with the caller's own sign-in.

| Action | Body | Who may call | Does |
|---|---|---|---|
| `make` | `{ class_key, student_ids? }` | office, head, or a teacher of that class | Makes logins for the class's enrolled students who have none (or the ones listed). Returns `[{ student_id, name, username, pin }]` once, for the cards. |
| `reset` | `{ student_id }` | office, head, or a teacher of any class in that student's year group | New PIN, same username. Returns `{ username, pin }` once. |
| `disable` | `{ student_id }` | same as reset | Signs the login out everywhere and blocks it (`ban_duration`); `learn_accounts.active = false`. |
| `enable` | `{ student_id }` | same as reset | Undoes `disable`. |

How it decides who may call: it reads the caller's JWT with `auth.getUser`, then
asks the database **as the caller** (`learn_can_manage_class` /
`learn_can_manage_student`), so the rule lives in one place, the same SQL the
policies use. A student, a stranger or a teacher of another class gets 403.

Details:

- A class is `subject:Year group` (`math:Year 5`), as on the Teachers page. Its
  students are the enrolled `adm_students` rows whose `level` is that year group
  (Pending trial students included), plus anyone given the class in
  `learn_accounts.extra_classes` (a student taught with another year group).
- `make` refuses more than 60 at once and never touches a student who already has
  a login.
- A new auth user gets `email_confirm: true` (no email is sent),
  `app_metadata: { role: 'student', student_id }` and no `user_metadata` (no name
  is stored in the auth tables).
- Usernames are checked against `learn_accounts` and against existing auth
  emails; a clash picks another.
- PINs come from `crypto.getRandomValues`.
- The function logs nothing but counts (no usernames, no PINs).
- CORS: `https://learn.pra.edu.vn`, `https://current.pra.edu.vn` and
  `http://localhost:5201`.
- Deployed with Verify JWT off, like The Current's functions; it checks every
  caller itself. Setup steps are in the function's README.

## 6. Security: what student logins must not reach

Today every signed-in user of The Current's project is staff, except anyone who
used the open sign-up. Student logins change that: dozens of non-staff
`authenticated` users. Every policy and function in
`C:\Users\sbowe\admin\supabase\*.sql` and the three Edge Functions were read on
5 November 2026 for anything a signed-in non-staff user would pass.

### 6.1 Summary

Nothing found lets a student login (or an open-sign-up stranger) read children's,
families', money or report data today. All 40 tables have row level security on;
there are no views; every adm bucket is private and its policies call a staff
helper; the three Edge Functions refuse anyone but office (or, for
newsletter-build, office or the mailer key).

The weak points are checks that rest on an email match alone, one table readable
by every login, and the anonymous website-form functions (which any student could
call, like anyone on the internet).

### 6.2 Findings and fixes

Severity: **High** = could read or change children's, families', money or staff
data; **Medium** = staff names and emails, internal data, or spam; **Low** = tidy-up.
Fixes marked **(H)** are in `supabase/current-hardening.sql` (not run). The others
are changes to The Current's own files, for whoever works on it next.

> **Review, 5 Nov 2026** (`REVIEW-SECURITY.md`, tests in `tests/review/`): all three
> SQL files are a go. #3 is fixed differently from the table's suggestion, in
> `C:\Users\sbowe\admin\supabase\updates-2026-11-05-enrollment-guard.sql`: forms that
> match anything known wait as "No student yet" for the office's one click. #7 is fixed
> in the lessons file. The hardening keeps `adm_newsletter_groups` for authenticated
> (#9) and leaves `adm_newsletter_office()` callable by anon (#10). Practice slips are
> stored only when key-shaped (6.3 / 8.1). Still open: #1 needs teacher logins to carry
> a role; #4, #5 and #6 unchanged.

| # | Where | What a non-staff login can do | Sev. | Fix |
|---|---|---|---|---|
| 1 | `updates-2026-09-15.sql` `adm_is_head`, `adm_is_report_staff`, `adm_can_homeroom`, `adm_can_subject`, `adm_can_attendance`; `updates-2026-10-26-report-sent.sql` `adm_can_subject_in_report`; `updates-2026-10-16-newsletter.sql` `adm_newsletter_can_edit`; `updates-2026-10-21-ecas.sql` `adm_can_eca`; `updates-2026-11-05-lessons.sql` `adm_teaches`, `adm_lesson_mine` | Each grants staff rights to **any login whose email equals an active `adm_teachers` row**, whatever its role: `exists (select 1 from adm_teachers t where t.email = adm_email() and coalesce(t.active, true))`. Students cannot pass today (their emails are `@learn.pra.edu.vn`). But this one check guards students' birthdays, allergies, addresses, parents' contacts, reports, attendance, photos, incidents and transcripts, and a wrong row (a coach's gmail typed on the Teachers page, a reused mailbox) would hand all of it to whoever holds that address. | Medium (High impact if hit) | **(H)** At the root: `adm_email()`, which every one of these checks uses, returns `''` for a login with role `student` or an `@learn.pra.edu.vn` address, so no student can match any Teachers row, whatever is typed there. No current login has that role or domain, so nobody else is affected. Plus a CHECK on `adm_teachers.email` refusing `@learn.pra.edu.vn` and blank addresses. Later (6.4): give every teacher login `role: 'teacher'` and require a staff role in these helpers, which also closes the open-sign-up case. |
| 2 | `reports.sql:170` `create policy staff_read on adm_teachers for select to authenticated using (true)` | Any login reads every staff email, name, title, role, subjects and homeroom. | Medium | **(H)** `using (adm_is_report_staff() or adm_role() = 'triage')`. The Current's own lookup of the signed-in person still works: staff are report staff. |
| 3 | `updates-2026-10-02-student-dates-onboarding.sql:115` `adm_enrollment_place`, reached through `adm_enroll_submit` (`grant execute ... to anon, authenticated`, `updates-2026-10-01-enrollment-schools-documents.sql:159`) | Anyone (signed in or not) sending the website enrollment form can fill blank fields on an existing Pending student when they know the child's name and birthday, attach a made-up child to a real family by giving a parent's email, and move that family's lead to "enrolled". Not new with student logins. | High (needs knowledge of the family) | In The Current: on the anonymous path, never touch existing rows. Lines 234, 237, 289 and 310 each gain `and adm_is_staff()` (form-only submissions then always make a new pending child and family, and the office's "Make student" links them). |
| 4 | `updates-2026-10-22-mail.sql:435` `adm_mail_web_message`, `:333` `adm_mail_enrollment` | Anyone can make admin@ send a thank-you to any address (once per address per day) carrying their own text in the name fields; `adm_mail_paras` turns an https link in that text into a clickable link. A phishing route from PRA's real address. Not new. | Medium | In The Current: strip names to letters, spaces, `'.-` and 60 characters; skip the thank-you when a name contains `://` or `www.`. |
| 5 | `updates-2026-09-30-website-forms.sql:122` (40 messages an hour), `updates-2026-10-01-enrollment-schools-documents.sql:56` (30 forms an hour), `updates-2026-09-30-enrollments.sql:134` policy `adm_enrollment_upload ... to anon, authenticated` (300 files an hour, 10 MB each) | One person can keep the site-wide limits full (real families refused), fill Leads and Students with junk, and grow storage by about 3 GB an hour. Not new. | Medium | A CAPTCHA (Cloudflare Turnstile) checked by an Edge Function that calls the form functions with the service key and hands out signed upload links; then revoke the anon grants and drop the anon upload policy. Short of that, lower the file limit. |
| 6 | `updates-2026-10-21-ecas.sql:101` `adm_can_eca` | A login whose email is an activity's `teacher_email` can add or remove members and take that activity's register, with no staff check. Only matters if the office types an outsider's address. | Low | **(H)** covered by #1 for students. For strangers: add `adm_is_report_staff() and` in front of the email match. |
| 7 | `updates-2026-11-05-lessons.sql` (not yet run) `lessons_read`, `lessons_change`, `adm_lesson_add_update`, `adm_can_lesson_folder` accept `adm_lesson_mine()` (email only); `adm_lesson_next_number` is callable by every login | A non-staff login reaches a request only if someone sets its address as `teacher_email`. Any login can learn how many requests exist. | Low | Before that file is run: `(adm_is_report_staff() and adm_lesson_mine(...))` in those four places. Students are already covered by #1; this is for strangers. Reported to the coordinating session for the Lessons-tab work. |
| 8 | `updates-2026-10-16-newsletter.sql:271` `adm_newsletter_seen` (granted to anon) | Inflate view counts of published issues. | Low | Accept, or count once per browser. |
| 9 | `updates-2026-10-22-mail.sql:543` `adm_newsletter_groups` (no revoke) | Read the parents_all@ / parents_ey@ group addresses (already in the public repo). Matters only if those Google Groups accept outside posts. | Low | **(H)** revoke from public, anon, authenticated. Check the groups are members-only. |
| 10 | Yes/no helpers (`adm_is_head`, `adm_is_report_staff`, `adm_can_*`, `adm_newsletter_office`, ...) have no revoke, so anon can call them | Each answers only about the caller and says false for non-staff. | Low | **(H)** revoke from public and anon; keep authenticated (policies need it). |

Checked and safe (no change needed): families, invoices, payments, settings,
students, reports, sections, course notes, attendance, travel, todos, leads, web
messages, event photos, newsletters, drive docs, ECA terms/activities, EY answers,
report send, signatures, Upper Secondary, incidents, mail outbox and templates, the
mailer key table; buckets adm-photos, adm-receipts, adm-event-photos,
adm-enrollment (read), adm-todo, adm-newsletter, adm-transcripts, adm-incidents,
adm-lessons; the security-definer functions that write (each checks office, head,
approver, super admin or the mailer key, or is revoked from public). The public
`newsletter` bucket is public on purpose and only office can write to it.

Not covered: anything made in the Supabase dashboard rather than these files. The
queries in section 14 list it.

### 6.3 What a student login can reach after the hardening

- `learn_accounts`: its own row.
- `learn_packs`: published packs of its classes, from their opening date.
- `learn_progress`: its own rows; writes only through `learn_save()`, which checks
  the pack is published and open to its class.
- Bucket `learn-packs`: images of packs it can see.
- Functions: `learn_me()`, `learn_save()`. Every other `learn_*` function says no.
- Everything in `adm_*`: nothing. Every adm helper returns false (no Teachers row,
  role `student`), so every adm policy returns no rows.
- Edge Functions: The Current's three answer 403; `learn-accounts` answers 403.
- The website form functions: the same as anyone on the internet (findings 3 to 5).

`tests/pg.test.mjs` signs in as a student (in PGlite, with stand-ins for The
Current's tables and helpers) and checks this list, and checks that a teacher
still reads their class and an office account reads everything.

### 6.4 Open sign-ups

Supabase sign-up is open (`disable_signup: false`, email confirmation on): anyone
can make a confirmed login with a mailbox they own. Such a login has no role and
no Teachers row, so it reads nothing, but it is a non-staff account in the project
that holds families' data, and finding 1 shows how little stands between it and
staff rights if a Teachers row ever carries the wrong address.

It cannot simply be switched off today: **Teachers > Create login in The Current
uses `signUp`** from the browser (handbook 03: "A login made this way carries no
role"). So:

1. Now: leave sign-up on; run the hardening, which makes student logins and
   strangers fail every staff check whatever happens to the Teachers list.
2. Phase 2: move Create login into an Edge Function in The Current (service role,
   head only, sets `app_metadata.role = 'teacher'` and confirms the email), and
   give the existing role-less teacher logins `role: 'teacher'`.
3. Then turn sign-up off (Authentication > Sign In / Providers > "Allow new users
   to sign up"). Logins made with the service role (scripts, both Edge Functions)
   keep working.
4. Then tighten `learn_staff_login()` to drop the "no role" case.

## 7. Content: lesson packs

### 7.1 What a pack is

One lesson's student material, as one JSON document in `learn_packs.content`:
a **review** part (slides with check questions) and one or more **practice**
parts (step-by-step problems). The portal draws it; nothing about a lesson is in
the portal's code, so a new lesson needs no build or deploy.

```json
{
  "format": "pra-learn-pack/1",
  "slug": "y5-math-u5-negatives",
  "class_key": "math:Year 5",
  "title": "Adding and subtracting with negative numbers",
  "titleVn": "Cộng và trừ với số âm",
  "teacher": "Mr. David",
  "unit": "Unit 5",
  "langs": ["en", "vn"],
  "request_id": null,
  "from": { "deck": "classroom@f42113c:content/y5-math/U05_L3", "bank": "pra-triage/lessons/..." },
  "parts": [
    { "id": "review", "kind": "review", "title": "Review", "titleVn": "Ôn bài", "slides": [ ... ] },
    { "id": "practice", "kind": "practice", "title": "Practice", "titleVn": "Luyện tập", "set": { "signed": true, "items": [ ... ] } }
  ],
  "assets": { "lift.webp": { "alt": "A lift's buttons from 3 down to B2", "altVn": "...", "w": 960, "h": 720 } }
}
```

Rules (checked by `src/pack/validate.js`, which the portal runs before drawing a
pack and the operator runs with `npm run check:pack <file>` before publishing):

- `slug`: lower case, digits and hyphens, unique; it is the link
  (`/#/p/<slug>`). `class_key` must be `subject:Year group`.
- Every text field may have a `…Vn` twin; a missing twin falls back to English.
  `…Fr` twins are allowed and kept but the portal shows EN and VI only for now.
- Text markup, as in the classroom decks: `**bold**`, `*italic*`, a line starting
  with `>` is a "write this down" note, a blank line is a gap. `$…$` maths is drawn
  with KaTeX (through the step engine's text renderer, which also gives slides the
  `{{given}}` / `[[find]]` / `<<found>>` colours); `$$…$$` blocks are not (the
  validator warns).
- `id`s of checks and practice items are unique within their part and stay the
  same when a pack is re-published, so results carry over.
- Size: at most 1.5 MB of JSON (inline SVG included).

### 7.2 Review slides (from a classroom deck)

A review slide is a classroom slide (`C:\Users\sbowe\code\classroom\README.md`,
"Slide schema") with three changes:

| Classroom deck | Pack |
|---|---|
| `layout`: hero, statement, split, showcase, compare, stack, steps, callout, gallery | The same nine. |
| `layout: 'game'` | Dropped. |
| `widget` (a React component) | Replaced by the operator with **an image** (`image: "asset:<file>"`, a 1280x720 screenshot of the widget's settled state, with `alt`) **or a check question** that asks what the widget showed. |
| `inlineSvg` from `diagrams.js` | The SVG string itself. The portal cleans it before drawing (no `<script>`, `<foreignObject>`, `on…` attributes or outside links). |
| `image` (an imported file) | `"asset:<file>"`, uploaded to the `learn-packs` bucket at `<pack id>/<file>`; listed in `assets` with `alt`. |
| `reveal` | Kept: a "Show me" box. |
| `notes` (write, task, plant, homework, theory, info) | Kept. |
| `drawThis`, speaker-only fields, `plan` | Dropped (the plan is for the teacher and stays with the classroom deck). |
| (none) | `check`: the question the review asks on that slide. |

A `check` is the Dashboard's shape, so decks move between the Dashboard and the
portal unchanged:

```json
{ "id": "c3", "q": "The temperature is −2 °C. It rises 5 degrees. What is it now?",
  "qVn": "Nhiệt độ là −2 °C. Nhiệt độ tăng 5 độ. Bây giờ là bao nhiêu?",
  "options": [ { "val": "A", "text": "3 °C" }, { "val": "B", "text": "−7 °C" }, { "val": "C", "text": "7 °C" } ],
  "correct": "A",
  "exp": "From −2, 2 jumps reach 0 and 3 more reach 3.", "expVn": "..." }
```

The review asks a check on most slides (at least three in a pack). A child must
answer before moving on; a wrong first answer shows the explanation, then lets
them pick again. "Right first time" is what is scored.

### 7.3 Practice sets (from a problem bank)

A practice part's `set` is exactly the Dashboard's `unit.stepPractice` (the
step-practice engine on branch `feat/step-practice`, `docs/step-practice.md`
there), so the same problem bank feeds the Dashboard and the portal:

- `set`: `{ title?, titleVn?, big?, signed?, items: [...] }`, passed unchanged
  (after cleaning, below) as the `set` prop of the engine's `StepPracticeSet`.
  `parts[i].id` is the progress key (`learn_progress.part`); item ids are the keys
  inside `items`.
- Each item: `{ id, level: focus | practice | challenge, prompt, promptVn,
  inlineSvg?, steps: [...] }`. Prompt markup: `{{−3 °C}}` a given number,
  `[[How many degrees did it rise?]]` the question, `<<3>>` an earlier answer.
- Each step: `{ id?, title, input, key?, hint, why?, line?, slips?: [{ value, step?,
  msg }] }`, with Vn twins.
- `input.type`: number, text, choice, multi, order, gap or tap, with that type's
  answer fields.
- Levels decide how much of the method is asked: focus asks every step, practice
  only the key steps, challenge only the answer (a wrong answer opens the steps).
- Figures must be inline SVG strings (the operator runs the figure helpers when
  building the pack), never function calls.

The engine's portable core is copied, unchanged, into `src/stepPractice/` (plus
`src/utils/mathEquivalence.js`) from commit `0c18ffb4`; `src/stepPractice/SOURCE.md`
says how to take later fixes. The portal's host is `src/pages/PracticePlayer.jsx`:

- Before the set reaches the engine, every inline SVG (item `inlineSvg…`, option
  `svg`) is cleaned like a slide's, and `"asset:<file>"` pictures become signed links.
- The engine's `saved` blob (`{ id: 1 }` for items finished without help) is
  rebuilt from the child's `learn_progress.items`, so they pick up where they
  stopped on any device. It is fixed for the sitting (the engine's queue depends on it).
- Each finished item (the engine's `onSave`) is saved through `learn_save` as
  `{ ok: !helped, shown: helped, tries: helped ? 2 : 1 }`; `onFinish` ends the run
  (`p_done`). For practice, `ok` therefore means "finished without help": a wrong
  turn the child put right still counts, as in the engine's own blob.
- The engine does not yet report which slip messages a child hit, so practice
  `slips` stay empty. A small addition upstream (`resultOf` returning the slip keys)
  would let "most missed" name the misconception for practice too.

### 7.4 Images

Private bucket `learn-packs`, path `<pack id>/<file>`, PNG, JPEG, WebP or GIF up
to 5 MB. No SVG files in storage (SVG goes inline and is cleaned). Read: whoever
can see the pack (signed links, an hour). Write: the operator and office.

### 7.5 Who sees a pack

`learn_packs.status`:

- `draft`: staff of that class, office and the operator.
- `published`: also the class's students, from `opens_on` (Vietnam date) if set.
- `hidden`: staff only again; progress is kept.

A teacher of the class can publish, hide and set `opens_on` / `due_on`, but cannot
change the content (a trigger keeps it). The operator and office can change
everything. Only a head teacher can delete a pack.

### 7.6 Publishing (the operator, no deploy)

The operator's script in pra-triage (being written by another agent) does, after
building a request's pack:

1. `npm --prefix C:/Users/sbowe/learn run check:pack <pack.json>`; stop on errors.
2. Sign in as the triage account and upsert `learn_packs` on `slug` with
   `class_key`, `title`, `title_vn`, `content`, `request_id`, `source`,
   `status = 'draft'`, then upload the assets to `learn-packs/<pack id>/`.
3. Write the links on the request: `outputs.review =
   https://learn.pra.edu.vn/#/p/<slug>/review`, `outputs.practice =
   https://learn.pra.edu.vn/#/p/<slug>/practice`.
4. The teacher checks the pack on the portal (drafts show to them) and presses
   "Open for the class", or the operator publishes it when the teacher asked for
   that on the request.

## 8. Progress and results

### 8.1 What is stored per student

One `learn_progress` row per student, pack and part:

| Field | Holds |
|---|---|
| `items` | The current run, by check or item id: `{ ok, tries, slips, hints, shown }`. `ok` = right the first time (review) or finished without help (practice, see 7.3); `slips` = the slip messages the child hit (review: none; practice: once the engine reports them); `hints` = hints opened; `shown` = used "Show me" or had a step filled in. |
| `first_items`, `first_score` | The first finished run, kept for the teacher. |
| `score`, `best_score`, `runs`, `done` | Latest score (right first time / items in the part, worked out in the database from the pack), best, finished runs, ever finished. |
| `pack_version`, `started_at`, `finished_at`, `updated_at` | When. |

Students write only through `learn_save(pack, part, items, done)`. It checks the
login is a student in that class, the pack is published and open, the part
exists; keeps only ids that are in the part; caps the size; works out the score.
Nothing the child types is stored, only right/wrong, tries and which slip.

### 8.2 What teachers see

- **Class page**: a grid of the class's students against the class's packs: not
  started, started, done, with the first score; last seen; whether the child has a
  login. Login buttons (make, print cards, reset PIN).
- **Common misses** for a pack: the review checks most often wrong the first time,
  the practice items most often wrong, and the slip messages most often hit
  ("5 children counted the number, not the jumps").
- Office sees every class.

### 8.3 What students see

Their own packs with a ring for each part, and a "My results" page: for each pack,
done or not and stars for the score. No class ranking.

### 8.4 Results on the Lessons request in The Current

- `learn_packs.request_id` points at `adm_lesson_requests.id` (a foreign key is
  added when that table exists).
- The request's `outputs.review` and `outputs.practice` hold the portal links
  (7.6, step 3).
- `learn_request_results(request_id)` returns, for each pack made for the request:
  the class size, logins, started and finished per part, the average first score
  and the top misses. Callable by office, head, the operator and the class's
  teachers. The Current's Lessons tab can show it on the request (Phase 2); the
  operator's script can read it when the teacher asks for a follow-up lesson.

## 9. Pages

Hash routes (`/#/...`), because GitHub Pages has no server rewrites.

| Route | Who | What |
|---|---|---|
| `/#/` | anyone | Sign-in: "I'm a student" (username + PIN) or "I'm a teacher" (email + password). Demo buttons in demo mode. |
| `/#/` (signed in) | student | Home: hello and their name; **This week** (open packs, newest first, due dates); **My classes**. |
| `/#/p/:slug` | student, staff | A pack: two big buttons, Review and Practice, each with its ring. |
| `/#/p/:slug/review` | student, staff | Review player: one slide at a time, the check under it, big Next once answered. Staff can preview without saving. |
| `/#/p/:slug/practice` | student, staff | Practice player: the step engine (focus, practice, challenge levels; hints, Show me, the working to copy). |
| `/#/me` | student | My results. |
| `/#/t` (signed in) | staff | My classes (office: all), with how many packs and logins. |
| `/#/t/:class` | staff | Class page (8.2), pack controls (open, hide, dates), login buttons. |
| `/#/t/:class/cards` | staff | Login cards to print, only straight after make/reset. |

Office has no separate pages yet: the same class pages for every class.

## 10. Look and language

- PRA's website palette: blue `#116DFF` and green `#48971D`; small white text on
  deep green `#2F7D14`; sun, coral and violet only as small accents (ring colours,
  badges). Poppins for English, Be Vietnam Pro for Vietnamese (the website's fonts,
  self-hosted).
- For children: buttons at least 56 px high, one main action per screen, an icon
  beside every label, few words, no timers, no scoreboard.
- English with a Vietnamese switch (EN / VI, remembered on the device). Vietnamese
  follows `pra-website/VIETNAMESE.md`: "học viên" or "các em", never "học sinh" or
  "trường"; written as a Vietnamese member of staff would say it. Staff must read
  it before it goes live.
- Never "school", "report card" or "grades" anywhere.

## 11. Domain and hosting

From the Dashboard-domain agent's notes (`C:\Users\sbowe\code\wt-portal\PROGRESS.md`):

1. **DNS** at P.A Vietnam (pavietnam.vn, Bowen's login): add `learn` CNAME
   `bowenpra.github.io.` (TTL 3600, like `current`). Touch nothing else (apex A/AAAA,
   MX, SPF, google-site-verification TXT, `current`). Check:
   `curl -s "https://dns.google/resolve?name=learn.pra.edu.vn&type=CNAME"`.
2. Optional: verify pra.edu.vn for BowenPRA in GitHub (Settings > Pages > Verified
   domains; a `_github-pages-challenge-BowenPRA` TXT record) so no other GitHub
   account can claim a pra.edu.vn subdomain.
3. **Repo**: create `BowenPRA/learn` and push this folder. `public/CNAME` holds
   `learn.pra.edu.vn`; `vite.config.js` has `base: '/'`. Keep the two together.
4. **Deploy**: `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`
   (The Current's values, from Supabase > Project Settings > API), then
   `npm --prefix C:/Users/sbowe/learn run deploy` (gh-pages). `predeploy` refuses to
   build without `.env`, so the live site can never fall back to demo mode.
5. GitHub repo > Settings > Pages: source gh-pages, custom domain
   `learn.pra.edu.vn`; wait for the certificate, then tick **Enforce HTTPS**.
6. Order: DNS resolving first, then deploy, then Enforce HTTPS. Outside class hours.
7. The parked Dashboard branch `feat/learn-domain` (worktree `wt-portal`) also
   carries a `learn.pra.edu.vn` CNAME: it must not be deployed.
8. Supabase: password sign-in needs no URL settings. If Google sign-in or emails
   are added later, add `https://learn.pra.edu.vn/**` to Authentication > URL
   Configuration > Redirect URLs (leave the Site URL alone; The Current may rely on
   it).

The repo can be public like The Current's: it holds no student names, photos or
keys (demo data uses "Learner A" to "Learner L" and made-up usernames).

## 12. Phases

**Phase 0, before any student login (Bowen, about 30 minutes)**
- Run `supabase/current-hardening.sql`; run the checks in section 14.
- Raise the sign-in rate limit.

**Phase 1, the pilot: Year 5 Maths, Mr. David, Unit 5**
- Run `supabase/learn-schema.sql`; deploy `learn-accounts`.
- Create the repo, add the DNS record, deploy the portal.
- The operator publishes the Unit 5 pack (review from the classroom deck on
  `feat/y5-math-pilot`, practice from the step-practice samples).
- Mr. David makes the logins, prints cards, opens the pack; the class does the
  review in class and the practice as homework.
- Results on the class page; Bowen reads `learn_request_results` for the request.

**Phase 2, more classes**
- Carry later step-engine fixes over (`src/stepPractice/SOURCE.md`); report slip
  keys from the engine so practice misses name the misconception.
- The Current: a "PRA Learn logins" panel on the class and results on the Lessons
  request; Create login moved to an Edge Function; open sign-ups off.
- `$$…$$` block maths on slides, for packs beyond Year 5.
- The handbook chapter for The Current (how logins, cards and packs work).

**Phase 3**
- Google sign-in with PRA accounts for older students.
- Due-date reminders on the home page; packs that open on a date.
- A teacher's own short packs (a check-only quiz) made in The Current.

## 13. Open decisions for Bowen

Each was decided as written so the work could go on; any can be changed.

1. **The Current's project** for PRA Learn (2.2), rather than a separate project.
2. **Usernames** were a word and two digits. Changed 6 Nov 2026 (Bowen): the nickname,
   as on the old Dashboard (section 3).
3. **Secret code**: was a random 4-digit PIN. Changed 6 Nov 2026 (Bowen): the student
   number padded to 3 digits.
4. **Who makes logins**: office, head teachers and the class's teachers.
5. **Name shown to the child**: nickname if set, else first name.
6. **Pending (trial) students** can have logins.
7. **Open sign-ups**: off only after Create login moves to an Edge Function (6.4).
8. **Repo**: public `BowenPRA/learn`, like The Current. (Private needs GitHub Pro
   for Pages.)
9. **Redoing**: a child can redo a review or practice as often as they like; the
   teacher sees the first finished run and the best.
10. **Who publishes**: the operator saves packs as drafts; the teacher opens them
    for the class. (The other way: the operator publishes directly.)
11. **Vietnamese** on the portal needs a staff read before it goes live.

## 14. What only Bowen can do

In this order. Nothing here was done by Claude.

1. Check who has which role (SQL editor, read only):
   `select email, raw_app_meta_data->>'role' as role, last_sign_in_at from auth.users order by email;`
   Note any login that is not staff, and any teacher with no role.
2. Check for anything made outside the SQL files:
   ```sql
   select tablename from pg_tables where schemaname = 'public' and not rowsecurity;
   select tablename, policyname, roles, cmd, qual, with_check from pg_policies where qual = 'true' or with_check = 'true';
   select p.proname from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.prosecdef and has_function_privilege('anon', p.oid, 'execute');
   select id, public from storage.buckets;
   ```
   Expected: no table without RLS; only `adm_teachers.staff_read` with `true`
   (gone after the hardening).
3. Run `C:\Users\sbowe\learn\supabase\current-hardening.sql`. It ends with a
   self-test that rolls back, then prints "Hardening is in place".
4. Supabase > Authentication > Rate Limits: raise sign-ups and sign-ins per 5
   minutes per IP to about 150.
5. Run `C:\Users\sbowe\learn\supabase\learn-schema.sql` (self-test, rolls back).
6. Deploy the Edge Function (`supabase/functions/learn-accounts/README.md`).
7. Create the GitHub repo, add the DNS record, deploy (section 11).
8. Have a Vietnamese member of staff read the portal's Vietnamese.

# PRA Learn and The Current: what they share

PRA Learn (this repo) and The Current (the admin app, `C:\Users\sbowe\admin`,
current.pra.edu.vn) are worked on in two separate Claude environments since
13 November 2026. Lesson work is done from this folder. Admin work (invoices, reports,
attendance, the website, the inbox) is done from `C:\Users\sbowe\Desktop\Admin Email`.

This page lists every place where the two touch. A change on one side of a line below
needs the other side checked in the same piece of work.

## One database

Both apps use The Current's Supabase project. PRA Learn has no project of its own.

| Owned by | Names | Defined in |
|---|---|---|
| The Current | every `adm_*` table and function (students, teachers, roles, lesson requests, book list) | `C:\Users\sbowe\admin\supabase\` |
| PRA Learn | `learn_accounts`, `learn_packs`, `learn_progress`, `learn_unit_progress`, `learn_arcade_wallet`, `learn_arcade_scores`, every `learn_*` function, the `learn-packs` bucket | `supabase\*.sql` here |
| PRA Learn | the `learn-accounts` Edge Function (makes, resets and blocks student logins) | `supabase\functions\learn-accounts\` |

- PRA Learn reads `adm_students` and `adm_teachers` through its own functions; it never
  writes an `adm_*` table.
- `supabase\current-hardening.sql` here changes functions that belong to The Current
  (`adm_email()` and the staff checks), so that a student login can never pass a staff
  check. Anything that edits those functions on the admin side must keep that.
- SQL is run by Bowen in the Supabase editor, never by a deploy. A file being in the
  repo does not mean it has run: ask.

## Logins

- Staff sign in to both apps with the same PRA account.
- A student login is a nickname and a 3-digit code (the student number). It is made
  from PRA Learn's teacher pages or from The Current (Lessons > Student logins, and the
  PRA Learn login line in the student window). Both call the same `learn-accounts`
  function. The Current's copy of the login screens is in
  `C:\Users\sbowe\admin\src\components\learn\`: a change to the login scheme changes
  both.
- The function's "Verify JWT" switch stays off (it checks callers itself).

## Which classes

English, Maths, Science and Technology, from Year 1 up. The rule is written twice:
`isLearnClass` in `src\data\subjects.js` here and `isLessonClass` in
`C:\Users\sbowe\admin\src\lib\lessons.js`. Change both together.

## Teachers' lesson requests

| Step | Where | Environment |
|---|---|---|
| The teacher fills in the request (Lessons tab, book picker) | The Current: `src\pages\Lessons.jsx`, `src\components\lessons\`, handbook chapter 20, table `adm_lesson_requests`, book list `adm_sources` | Admin |
| The operator reads and updates the queue | `C:\Users\sbowe\pra-triage\the_current_lessons.py`, book scripts in `C:\Users\sbowe\pra-triage\lessons\`, the `teacher-lessons` skill | Lessons |
| The pack is built and published | `scripts\deck-to-pack.mjs`, `src\pack\`, `learn_packs`; `the_current_lessons.py publish` | Lessons |
| The request shows links and class results | The Current reads `learn_request_results` and `learn_class_overview` | Admin |

The pack format (`docs\PACKS.md`) and those two functions are the contract. If a pack
field or a function's result changes here, The Current's `src\lib\learn.js` must
follow.

## Hosting

Each app is its own GitHub Pages site with its own `npm run deploy`: BowenPRA/learn to
learn.pra.edu.vn, BowenPRA/admin to current.pra.edu.vn. Deploying one never deploys
the other. `.env` here was made from The Current's; it is never committed.

## Where to look on the other side

- What The Current can do: `C:\Users\sbowe\admin\FEATURES.md`, then its handbook
  (`src\handbook\`, chapter 20 is Lessons).
- What PRA Learn can do: `docs\FEATURES.md` here.

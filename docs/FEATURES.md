# PRA Learn: feature map

What PRA Learn already has, one line a feature: the name the page or the code uses,
what it does, its main files and its address. Written 13 November 2026 from the code
at commit f0d3ddf.

**Before building or saying something is missing:** search this file, then grep the
repo, then read `docs/NOT-MOVED.md` (what stayed in the old classroom repo). Add a line
here in the same change as any new feature, and run `npm run check:features`.

Paths in backticks are from the repo root; `<x>` stands for any folder. Addresses start
with `/`: `/` is PRA Learn itself, `/classroom/` the decks, `/unit/` the units. All three
are hash routes (`/#/...`), because GitHub Pages has no server rewrites.

## 1. Student pages

- **Sign-in**: two boxes, name and secret code; Pip waves; EN/VI switch. `src/pages/SignIn.jsx` · `/`
- **This is a shared computer**: sign-in kept for the open tab only (sessionStorage). `src/lib/supabase.js`
- **Student home**: welcome card with one Start button, XP card, then every list below. `src/pages/StudentHome.jsx` · `/`
- **Late / This week / Coming up / Done**: lesson packs sorted by due date. `src/pages/StudentHome.jsx`
- **My courses**: the student's units as cards with XP and "n of N done". `src/components/UnitCards.jsx`
- **Arcade banner**: the way into the Arcade from the home page. `src/pages/StudentHome.jsx`
- **Lessons from class**: the year group's classroom decks, newest 3 per subject, then all by unit. `src/components/ClassroomLessons.jsx`
- **Lesson page**: one card per part (Review, Practice) with progress and the next part marked. `src/pages/PackPage.jsx` · `/p/:slug`
- **Guided review**: back through the lesson's slides, a check question to go on. `src/pages/ReviewPlayer.jsx`, `src/pack/Slide.jsx`, `src/pack/Check.jsx` · `/p/:slug/review`
- **Step-by-step practice**: practice items on the step engine, hints, Show me, slips. `src/pages/PracticePlayer.jsx`, `src/stepPractice/` · `/p/:slug/practice`
- **Done screen**: Pip cheering, stars for first-try answers, the next thing to do. `src/components/DoneScreen.jsx`
- **Listen**: reads slide and question text aloud with the browser's own voices. `src/components/Listen.jsx`
- **My results**: the student's own stars per part, no class ranking. `src/pages/MyResults.jsx` · `/me`
- **Language switch (EN/VI)**: the portal's own words; content carries its own `…Vn` twins. `src/lib/i18n.jsx`, `src/components/ui.jsx`
- **Pip the otter**: mascot with moods (happy, calm, sad, surprised, dizzy, asleep). `src/components/Pip.jsx`, `src/components/pip/storyCharacter.js`
- **Demo mode**: sample Year 5 class and four packs in the browser; no .env, or `?demo`. `src/lib/api.js`, `src/lib/demo/backend.js`, `src/lib/demo/packY5Negatives.js`
- **Demo band**: strip on every page in demo mode, with a reset. `src/components/ui.jsx`
- **Classes PRA Learn is for**: English, Maths, Science, Technology, Year 1 up; others hidden. `src/data/subjects.js`

## 2. Teacher / staff pages

- **Staff sign-in**: The Current login, email + password (a short name maps to the old Dashboard form). `src/pages/SignIn.jsx`, `src/lib/live.js`
- **Who is signed in**: student, staff with classes, or neither (turned away). `src/lib/auth.jsx`, `src/App.jsx`
- **My classes (teacher home)**: classes by year group, with students, logins, packs, decks. `src/pages/TeacherHome.jsx` · `/`
- **Units (teacher home)**: every unit, for staff to open. `src/pages/TeacherHome.jsx`, `src/components/UnitCards.jsx`
- **Lessons from class (staff)**: every deck with its class, folded by unit, with Plan links. `src/components/ClassroomLessons.jsx`
- **Classroom games**: staff-only list of games (Jeopardy). `src/components/ClassroomLessons.jsx`, `src/data/classroomLessons.js`
- **Class page**: one class's packs, results, logins, unit XP and decks. `src/pages/ClassView.jsx` · `/t/:classKey`
- **Open / Hide / Due date**: staff publish, hide and date a pack for the class. `src/pages/ClassView.jsx`, `src/lib/live.js`
- **Most missed + Common slips**: the questions most of the class got wrong, slips and who hit them. `src/pages/ClassView.jsx`, `src/stepPractice/model.js`
- **Who did what**: per student first score, runs, stars, started. `src/pages/ClassView.jsx`
- **Logins on the class page**: make logins, Reset code, Block / Unblock, last seen. `src/pages/ClassView.jsx`
- **Login cards**: print name, login name, secret code and address; Done forgets them. `src/pages/LoginCards.jsx`, `src/lib/cards.js` · `/t/:classKey/cards`
- **Unit XP table**: a class's XP task by task, one table a unit. `src/components/UnitXPTable.jsx`
- **Class gate**: a class page for a non-PRA Learn class goes home. `src/App.jsx`
- **Teacher's plan**: staff-only printable plan of a deck (one A4 page). `classroom/src/pages/Plan.jsx` · `/classroom/#/plan/<course>/<slug>`

## 3. Classroom decks and the player

- **Classroom page**: plays Mr Bowen's decks exactly as taught, after a PRA Learn sign-in. `classroom/main.jsx`, `classroom/index.html` · `/classroom/#/lesson/<course>/<slug>`
- **Lesson list**: what can be opened and where it is listed, in teaching order. `src/data/classroomLessons.js`
- **Hidden lesson**: `hidden: true` keeps a deck off every list; its address still opens it. `src/data/classroomLessons.js`
- **Courses**: `y7-math`, `y7-science`, `games`, with colours and unit names. `classroom/content/courses.js`
- **Lesson folder**: an index.js exporting meta, slides, plan, plus its files. `classroom/content/<course>/<slug>/`
- **One lesson at a time**: lazy registry, each deck its own download. `classroom/content/registry.js`
- **Viewer**: out, student, staff or other; only staff get plans and games. `classroom/viewer.js`
- **Deck player**: slides, reveals, arrow keys, toolbars, zoom. `classroom/src/components/Deck.jsx`, `classroom/src/components/DeckChrome.jsx`
- **Slide layouts**: callout, compare, gallery, game, hero, showcase, split, stack, statement, steps. `classroom/src/components/layouts/`
- **Widgets**: a slide's interactive React component, given `lang`. `classroom/src/components/WidgetRenderer.jsx`
- **Project mode (display mode)**: full screen, no toolbars, type about 40% larger. `classroom/src/lib/useDisplayMode.js`
- **Dark mode**: light/dark switch, kept in localStorage. `classroom/src/lib/useDarkMode.js`
- **Languages EN / VN / FR / EN+FR**: twin fields `…Vn`, `…Fr`; `tr()` and `field()`. `classroom/src/lib/lang.js`
- **Phone remote**: QR + 4-character room code; the phone turns slides, opens answers, presses buttons. `classroom/src/remote/DeckRemote.jsx`, `classroom/src/components/RemotePanel.jsx` · `/classroom/#/remote/<room>`
- **Remote transport**: BroadcastChannel on one laptop, Supabase realtime broadcast to a phone. `classroom/src/lib/remote/bus.js`, `classroom/src/lib/remote/room.js`, `classroom/src/lib/remote/client.js`
- **Slide buttons on the phone**: answer box and widget buttons reachable from the remote. `classroom/src/lib/deckControls.js`
- **Plan notes on the phone**: the plan cut up slide by slide; staff only. `classroom/src/remote/planNotes.js`
- **Blank screen and countdown**: the phone remote can call them up on the projector. `classroom/src/components/DeckChrome.jsx`
- **Random student (Pick)**: draws a name; roster kept on this device only. `classroom/src/components/RandomStudent.jsx`, `classroom/src/lib/useStudentPicker.js`
- **Maths in slides**: `$…$` drawn with KaTeX. `classroom/src/lib/SafeMath.jsx`
- **Mr Bowen cartoon**: one SVG for story strips, widgets and diagrams. `classroom/src/lib/mrBowen.js`
- **Jeopardy**: 14 boards, staff only, EN+FR setting, phone screen, sounds and pictures. `classroom/content/games/G02_jeopardy/` · `/classroom/#/lesson/games/G02_jeopardy`
- **Jeopardy boards**: the boards' categories, clues and answers. `classroom/content/games/G02_jeopardy/boards.js`
- **Game phone screen**: shared pieces for a game's remote screen. `classroom/src/remote/GamePanel.jsx`, `classroom/content/games/G02_jeopardy/remote.jsx`
- **Games inside a deck**: a slide with `layout: 'game'`. `classroom/src/components/layouts/GameLayout.jsx`
- **Image credits**: a CREDITS.json beside each lesson's pictures, with source and licence. `classroom/content/y7-math/U01_1/images/CREDITS.json`
- **Dashboard link (unused)**: kept in the player; the page always passes no link. `classroom/src/lib/dashboardLink.js`
- **Lesson-writing kit**: method, traps, field reference. `CLAUDE.md`, `docs/LESSON-PLAYBOOK.md`, `docs/TRAPS.md`, `docs/DECK-REFERENCE.md`
- **teacher-lessons skill**: works teachers' requests from The Current's Lessons tab (written 5 Nov 2026, waiting for a redo; see `docs/THE-CURRENT.md`). `.claude/skills/teacher-lessons/SKILL.md`
- **new-lesson skill**: step-by-step run for a new deck, the quality bar, check scripts. `.claude/skills/new-lesson/SKILL.md`, `.claude/skills/new-lesson/STANDARD.md`
- **Classroom page notes**: how the page is built, adding a lesson, plan rules. `classroom/README.md`

## 4. Units, XP, gold and the Arcade

- **Units list and XP rules**: UNITS, task XP, 100 cap, done at 100 or 80 with quiz. `src/data/units.js`
- **What to do next**: half-done task, then first unopened, then most XP left. `src/data/units.js`
- **Unit page**: subject banner, XP bar, Next button, task tiles under Learn / Practice / Quiz. `unit/app/UnitHome.jsx`, `unit/main.jsx` · `/unit/#/<TRACK>/<UNIT>`
- **A task**: opens one task of a unit. `unit/main.jsx` · `/unit/#/<TRACK>/<UNIT>/<task>`
- **Course page**: XP across a course's units, carry-on banner, unit cards, Arcade banner. `unit/app/CourseHome.jsx` · `/unit/#/<TRACK>`
- **Task look**: each task's name, icon and colour from its kind. `unit/app/taskLook.js`, `unit/app/theme.js`
- **Task kind notes (Lesson)**: self-study deck with scored checks. `unit/src/tasks/Notes.jsx`, `unit/src/components/notes/`
- **Task kind words (Key words)**: word cards with audio, then a vocab quiz. `unit/app/Words.jsx`
- **Task kind engine**: interactive screens listed in ENGINES. `unit/app/engines.js`
- **Tide Lab**: Science 3.4 river tide task. `unit/src/tasks/TideLab.jsx`
- **Protractor**: drag and turn a protractor onto 8 angles, read and type the size. `unit/app/tasks/ProtractorTask.jsx`
- **Quadrilaterals (QuadCheck)**: draw from a sketch, fourth angle, 360° check. `unit/src/tasks/ZeroLine.jsx`
- **Task kind steps (Workbook)**: fresh Workbook-style problems on the step engine. `unit/app/Workbook.jsx`, `unit/content/<TRACK>/<UNIT>/`
- **Task kind quiz**: end-of-unit quiz. `unit/src/tasks/Assessment.jsx`
- **Fix N / Fix my mistakes**: redo only the wrong answers of a finished lesson. `unit/src/utils/notesReview.js`
- **Unit data**: a unit's meta, notes, words, quiz and engine pools. `unit/src/data/<TRACK>/<UNIT>/data.js`
- **Unit audio and pictures**: recordings and images by track and unit. `public/audio/`, `public/images/`
- **Saving unit progress**: best, last, runs and resume blob per task. `src/lib/unitProgress.js`
- **Gold**: 1 XP = 1 gold, a game costs 25, free play at all done or 80% XP. `unit/app/arcade/economy.js`
- **Arcade**: hub, level picker and leaderboard; quizzes the units' key words. `unit/app/Arcade.jsx`, `unit/src/components/arcade/ArcadeHub.jsx` · `/unit/#/arcade`
- **Tower Defense**: Arcade game. `unit/src/tasks/games/TowerDefense.jsx`, `unit/src/components/towerdefense/`
- **Swarm Survivor**: Arcade game. `unit/src/tasks/games/Survivor.jsx`, `unit/src/components/survivor/`
- **Leaderboard and gold spent**: top ten of the student's year group per game and level. `src/lib/arcade.js`
- **Unit notes**: rules, kinds, adding a unit, what was not brought over. `unit/README.md`

## 5. Lesson packs for teachers' requests

- **Pack format**: review slides + practice parts as JSON, stored as data (no deploy). `docs/DESIGN.md`, `src/pack/model.js`
- **Pack validator**: errors stop a pack; practice checked by the engine's rules. `src/pack/validate.js`
- **SVG cleaner**: strips scripts, styles and outside links from pack drawings. `src/pack/sanitizeSvg.js`
- **Slide and check renderers**: pack slide layouts, check questions, rich text. `src/pack/Slide.jsx`, `src/pack/Check.jsx`, `src/pack/Rich.jsx`
- **Step engine**: copied from the Dashboard at a fixed commit; do not edit here. `src/stepPractice/`, `src/stepPractice/SOURCE.md`
- **Step engine samples**: Year 5 Maths, Science and English practice sets. `src/stepPractice/samples/`
- **Deck-to-pack**: turns a classroom lesson folder into a pack, with a per-lesson overlay. `scripts/deck-to-pack.mjs`, `scripts/lib/load-deck.mjs`
- **Pack overlay**: the operator's checks, rewrites and practice parts for one lesson. `packs/y5-math-u5-below-zero/overlay.mjs`
- **Year 5 Maths pack "Below Zero in Words"**: the one converted pack, used in the demo. `packs/y5-math-u5-below-zero/pack.json`
- **Pack how-to**: operator steps, overlay, limits of the converter. `docs/PACKS.md`
- **Pack pictures**: private bucket learn-packs, one folder per pack. `supabase/learn-schema.sql`
- **Results on the Lessons request**: `learn_request_results` for The Current's Lessons tab. `supabase/learn-schema.sql`
- **Publishing a pack**: done by the operator's command in PRA's triage tools, outside this repo. `docs/DESIGN.md`

## 6. Logins and the learn-accounts function

- **Student login**: nickname folded to a-z0-9 (else first name) + 3-digit student number. `supabase/functions/learn-accounts/lib.js`
- **Login email and password**: `<name>@learn.pra.edu.vn`, password the code plus `-learn`. `supabase/functions/learn-accounts/lib.js`
- **learn-accounts function**: make, reset, disable, enable logins; office, heads, class teachers. `supabase/functions/learn-accounts/index.ts`, `supabase/functions/learn-accounts/README.md`
- **Make logins**: for a class, or listed students (60 at most); clashes reported. `supabase/functions/learn-accounts/index.ts`
- **Reset code**: code back to the student number, every device signed out. `supabase/functions/learn-accounts/index.ts`
- **Block / Unblock**: login blocked and signed out at once. `supabase/functions/learn-accounts/index.ts`
- **Student sign-in call**: `signInStudent`, then `learn_me` for name and year group. `src/lib/live.js`
- **Demo login**: Learner A, code 901; "Try as a student" / "Try as Mr. David". `src/lib/demo/backend.js`, `src/pages/SignIn.jsx`
- **Login cards waiting**: cards kept in sessionStorage between making and printing. `src/lib/cards.js`
- **The Current's side**: Lessons tab and Student logins live in The Current's repo, not here. `docs/DESIGN.md`

## 7. Database

All in The Current's Supabase project. A database change is a new file here that Bowen
runs; nothing in this repo runs SQL against the live database.

- **current-hardening.sql**: student logins never pass a staff check (`adm_email`, `learn_staff_login`, teachers staff-read). `supabase/current-hardening.sql`
- **learn-schema.sql**: learn_accounts, learn_packs, learn_progress, bucket learn-packs, RLS, the portal's `learn_*` functions. `supabase/learn-schema.sql`
- **learn-names-2026-11-06.sql**: login name rule `^[a-z0-9]{2,20}$` (nicknames). `supabase/learn-names-2026-11-06.sql`
- **learn-units.sql**: learn_unit_progress, `learn_unit_save`, `learn_unit_progress_class`; upgrades the 6 Nov version. `supabase/learn-units.sql`
- **learn-arcade.sql**: learn_arcade_wallet, learn_arcade_scores, `learn_arcade_spend`, `learn_arcade_score`, `learn_arcade_board`. `supabase/learn-arcade.sql`
- **Test stand-ins**: fake Supabase and The Current for PGlite; first units version. `tests/sql/stubs.sql`, `tests/sql/learn-units-v1.sql`

Order: hardening, then schema, then names, then units and arcade (each after the schema).
Which files have run on the live database is not tracked in this repo; ask Bowen.

## 8. Check and build scripts

npm scripts (`package.json`):

- **dev**: Vite dev server on port 5201. `vite.config.js`
- **build**: builds the three pages (main, classroom, unit). `vite.config.js`
- **lint**: ESLint; still skips `classroom/src`, `classroom/content` and `unit/src`. `eslint.config.js`
- **preview**: serves the build on 5201.
- **test**: `node --test` on every `tests/*.test.mjs` (accounts, arcade, lessons, pack, pg, slips, units). `tests/`
- **check:pack**: validates one pack JSON before publishing. `scripts/check-pack.mjs`
- **check:env**: refuses a build without the Supabase settings; prints names only. `scripts/check-env.mjs`
- **check:lessons**: lesson list and deck folders agree (also in `npm test`). `scripts/check-lessons.mjs`
- **audit:svg**: SVG label text overflowing its box or frame. `scripts/svg-audit.mjs`
- **check:deck**: walks a deck in headless Chrome for overflow and broken pictures. `scripts/deck-check.mjs`
- **check:features**: every path named in this file exists (not in `npm test`). `scripts/check-features.mjs`
- **predeploy / deploy**: check-env + production build, then gh-pages to BowenPRA/learn. `scripts/check-env.mjs`

Other scripts:

- **deck-to-pack.mjs**: classroom lesson folder to a pack (section 5). `scripts/deck-to-pack.mjs`
- **demo-flow.mjs**: walks the demo as a child in headless Chrome, checks saves. `scripts/demo-flow.mjs`
- **pack-walk.mjs**: walks one pack as student and teacher at two sizes. `scripts/pack-walk.mjs`
- **shots.mjs**: screenshots of every page at 1280x800 and 390x844. `scripts/shots.mjs`
- **cdp.mjs / load-deck.mjs**: headless Chrome helper; loads a deck in Node as data. `scripts/lib/cdp.mjs`, `scripts/lib/load-deck.mjs`
- **project-check.mjs**: overflow check in project mode, every language. `.claude/skills/new-lesson/scripts/project-check.mjs`
- **deck-shots.mjs**: screenshot of every slide as the class sees it. `.claude/skills/new-lesson/scripts/deck-shots.mjs`
- **slides-lint.mjs**: static checks on a deck's slides.js. `.claude/skills/new-lesson/scripts/slides-lint.mjs`
- **Security review harness**: The Current's SQL in PGlite; not part of `npm test`. `tests/review/`

## 9. What exists per course

Classroom decks (`src/data/classroomLessons.js`, 13 November 2026):

- **y7-math**: 24 decks: Units 1 to 6 plus tasks T1 Formula Machine, T2 Girl Math, T3 The Maths Poster. `classroom/content/y7-math/`
- **y7-science**: 34 decks: Units 1 to 4 (to 4.3), labs, models; Day 1 hidden. `classroom/content/y7-science/`
- **games**: 1, Jeopardy (staff only, `CLASSROOM_GAMES`). `classroom/content/games/`
- **Unit headings**: Maths units 1–5 and Science 1–3 have names; Maths 6 and Science 4 show a number only. `src/data/classroomLessons.js`

Units (`src/data/units.js`), in order:

- **Science 3.4 Tides**: Lesson 20, Key words 10, Tide Lab 30, Workbook 20, Quiz 20. `unit/src/data/Y7_SCI/U03_4/data.js`
- **Maths 5.3 Drawing Lines and Quadrilaterals**: Lesson 25, Protractor 30, Workbook 25, Quadrilaterals 20. `unit/src/data/Y7_MATH/U05_3/data.js`
- **Science 5.2 Comparing Metals and Non-metals** (hidden): Key words 20, Metal or non-metal? 20, Test it 15, Mystery 25, Quiz 20. `unit/src/data/Y7_SCI/U05_2/data.js`

Lesson packs: one converted pack (Year 5 Maths, `packs/`) and three hand-made demo packs
on negative numbers (`src/lib/demo/packY5Negatives.js`).

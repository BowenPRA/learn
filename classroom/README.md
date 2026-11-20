# The classroom page

Mr. Bowen's classroom decks, shown in PRA Learn exactly as he teaches them: every
slide, layout, widget, reveal, photo and film, the EN/VN/FR switch, dark mode and full
screen. Bowen, 6 November 2026: "the full, high quality classroom experience", not a
review pack.

These files are PRA Learn's own. The deck player and every Year 7 Maths and Science
lesson moved here from BowenPRA/classroom (commit 50586cc) on 10 November 2026, and
they are edited here from now on. The old classroom repo is frozen: nothing is copied
from it any more, and there is no sync script to run.

It is its own page, `/classroom/#/lesson/<course>/<slug>` (`classroom/index.html`, a
second Vite input in `vite.config.js`), so the decks keep the classroom's own CSS and
Tailwind theme and never mix with PRA Learn's.

| Path | What |
|---|---|
| `content/<course>/<slug>/` | One lesson: `index.js` (meta, slides, plan) and the files it imports (slides, diagrams, widgets, pictures, film). Some lessons import shared kits from another lesson's folder; that is fine. |
| `content/courses.js` | The courses: `y7-math`, `y7-science` and `upper-english` (English only, from 20 Nov 2026), with their colours and unit names. |
| `content/registry.js` | Finds the lesson folders and loads one lesson's code when it is opened. |
| `src/` | The deck player: `components/Deck.jsx`, layouts, chrome, the phone remote (`remote/`) and the teacher's plan page (`pages/Plan.jsx`). |
| `tailwind.config.js` | The classroom's Tailwind theme. |
| `index.html`, `main.jsx` | The page: open to anyone with a deck's link, no sign-in needed; only the lessons listed in `src/data/classroomLessons.js`, Back goes to the PRA Learn home, no old Dashboard link. |
| `viewer.js` | Who has the page open: a student, staff, or nobody signed in. |
| `deck.css`, `tailwind.deck.js` | The classroom's `src/index.css` built with its theme, scanning this folder only. |
| `SOURCE.json` | Where these files came from (BowenPRA/classroom 50586cc, 10 Nov 2026). |

Icons come from `lucide-react-classroom`, an alias pinned to lucide-react 1.28.0, the
classroom's version (`vite.config.js` points this folder's imports at it): newer
versions draw some icons differently.

`npm run lint` does not look at `src/` and `content/` yet (`eslint.config.js` still
leaves them out, from when they were copies).

## Adding a lesson

1. Make the folder `classroom/content/<course>/<slug>/` with an `index.js` that
   default-exports `{ meta, slides, plan }`, as the other lessons do. `meta` has at
   least `course`, `unit`, `id` and `title` (and `subtitle` if it has one). Name the
   folder like the others: `U05_3` for Unit 5.3.
2. Add a line for it to `src/data/classroomLessons.js`: course, slug, PRA Learn class
   (`'science:Year 7'`), unit, teacher, and the title and subtitle exactly as in the
   deck's meta. Keep the list in teaching order.
3. `npm run check:lessons` (also part of `npm test`) fails when a folder has no line
   in the list, a line has no folder, or a line's unit, title or subtitle differs
   from the deck's meta. Change one, change the other.
4. Run the dev server and open the lesson: `/classroom/?demo#/lesson/<course>/<slug>`
   (demo mode; sign in as the student or as Mr. David first on the PRA Learn page).

A new course also needs an entry in `content/courses.js` (its `id` is the folder name).

Students see a new lesson or a change to a deck after the next deploy.

## One lesson at a time

`content/registry.js` finds the lessons with a lazy `import.meta.glob`, so each
lesson's `index.js` and what it imports is its own chunk, downloaded only when that
lesson is opened (a short "Loading the lesson…" screen shows meanwhile). Opening
Tides downloads Tides, not the other 55 decks.

## The teacher's plan

A lesson's `plan` (timings, notes and the answer key) is for staff only.

- **Staff** (a PRA Learn staff login, or "Try as Mr. David" in the demo) see the
  deck's plan button, which opens `/classroom/#/plan/<course>/<slug>`, a page they
  can print. The phone remote shows the plan's notes for each slide.
- **Students** never get it: the deck has no plan button, the plan address sends them
  to the PRA Learn home, and the phone remote shows no notes.

The plan is hidden on screen, not on the network: it is part of the lesson's code,
so someone reading the downloaded JavaScript could still find it. Moving the plans
out of the lesson's code would close that.

## Who can open them

Bowen, 20 November 2026: a link to his slides works for anyone. So a deck opens with
no sign-in, as a student sees it, minus the Phone remote button. The rest still needs
one:

- **Games** (Jeopardy, Guess Who, Guess the Teacher's TV screen): staff only, because
  each holds its answers. Guess the Teacher's phone page (`#/play/<room>`) stays open
  to anyone, as before.
- **The teacher's plan**: staff only (below).
- **The Phone remote button**: anyone signed in. The phone page itself
  (`#/remote/<room>`) needs no sign-in and shows the plan's notes to staff only.
- **Units** (`/unit/`, the 7.1 unit included): a sign-in, as always, since they save
  progress and XP.

Science 1.1 and 1.2 show five Learner's Book crops (their `CREDITS.json` says not
openly licensed); Bowen chose to open those decks too.

## Where people find them

- **Students**: "Lessons from class" on their home page, newest first, for their year
  group (the class key's year group against the student's level). With no review
  pack waiting, the welcome card's big button opens the newest one. Their class also
  appears under "My classes". A lesson marked `staffOnly: true` is never on a
  student's home: the Upper Secondary English class decks, whose class follows along
  on the unit's own notes instead.
- **Staff**: "Lessons from class" at the foot of My classes (every lesson, with its
  class), "N from class" on that class's card, and the class page lists its own under
  Lessons ("always open, nothing to set"). Lessons from class have no due dates,
  hiding or results: they are always open.

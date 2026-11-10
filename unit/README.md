# Units

A unit works the way it does on Mr. Bowen's Dashboard (10 November 2026): it is a list
of tasks chosen for that unit, each worth its own XP. The page shows the unit's XP out
of 100, the one task to do next, and each task as a coloured tile with the XP it holds
out of the XP it is worth.

- A task's XP is its best score times the XP it is worth.
- The tasks may offer more than 100 XP between them; the unit's XP stops at 100.
- A unit is finished at 100 XP, or at 80 XP with its quiz done (80 alone when it has no quiz).
- Nothing is locked. There is no bonus XP, no arcade and no AI marking.

The first version (6 November 2026) gave every unit the same five parts. That is gone;
Tides keeps its five as five tasks, with the same ids, so progress saved before still counts.

## Where a task can come from

A task's `kind` in `src/data/units.js`:

| Kind | What | Lives in |
|---|---|---|
| `notes` | The self-study lesson deck, with check questions and small activities | `src/data/<TRACK>/<UNIT>/notes.js`, played by `src/tasks/Notes.jsx` |
| `words` | The unit's key words: review cards, then a vocab quiz | `realWords` in the unit's `data.js`, played by `app/Words.jsx` |
| `engine` | An interactive task with its own screen | `app/engines.js` (one entry a task) |
| `steps` | Step-by-step problems in the Workbook's question types, all new | `content/<TRACK>/<UNIT>/<set>.js`, played by `src/stepPractice/` |
| `quiz` | The end-of-unit quiz | `assessment` in the unit's `data.js`, played by `src/tasks/Assessment.jsx` |

The classroom deck is not a task: it stays exactly as taught, and the unit page links to
it ("From the classroom").

## The units so far

| Unit | Tasks (XP) |
|---|---|
| Science 3.4 Tides | Lesson 20, Key words 10, Tide Lab 30, Workbook 20, Quiz 20 |
| Maths 5.3 Drawing Lines and Quadrilaterals | Lesson 25, Protractor 30, Workbook 25, Quadrilaterals 20 |
| Science 5.2 Comparing Metals and Non-metals (`hidden`: no lesson yet) | Key words 20, Metal or non-metal? 20, Test it 15, Mystery substances 25, Quiz 20 |

Maths 5.3:

- **Lesson**: the self-study deck (21 slides, 14 scored), not the classroom deck, which
  is written for a teacher at a projector (votes, pairs, "in your book").
- **Protractor** (`app/tasks/ProtractorTask.jsx`): the student drags the protractor onto
  each of 8 angles, turns it, reads it and types the size. It clicks into place near the
  corner and near an arm. A wrong answer is named (the other scale, the inside of a
  reflex angle, not in place) and tried once more.
- **Workbook** (`content/Y7_MATH/U05_3/workbook.js`): 7 problems in the question types of
  Workbook Exercise 5.3, with new shapes and numbers. `figures.js` works every drawing
  out from its numbers, with a ruler on the line to be measured and a close-up of the
  ruler's end, so the student reads a real length.
- **Quadrilaterals** (`src/tasks/ZeroLine.jsx`, the unit's `quads`): draw a quadrilateral
  from a sketch, measure its fourth angle, check the four add up to 360°; then a square
  and a quadrilateral on paper, which can be skipped.

Science 5.2 has no classroom deck yet, so it has no Lesson task and stays `hidden`.
Its three step-practice sets (`content/Y7_SCI/U05_2/`) follow the Workbook's 5.2
exercises with new lists, statements and substances: mark a sorted list and read a bar
chart; the circuit that tests for conducting, and true or false; six substances to
name from their properties.

## How it is built

It is its own page, `/unit/#/<TRACK>/<UNIT>[/<task>]` (`unit/index.html`, a Vite input),
with its own CSS and Tailwind theme (the Dashboard's), so the tasks look as they did there.

| Path | What |
|---|---|
| `../src/data/units.js` | The units and their tasks, the XP rules, what to do next |
| `../src/lib/unitProgress.js` | Saving: demo mode in the browser, live in `learn_unit_progress` |
| `main.jsx` | The page: sign-in, the route, handing each task its data and saving its score |
| `app/UnitHome.jsx`, `app/taskLook.js` | The unit page and each task's picture and colour |
| `app/engines.js`, `app/tasks/` | The interactive tasks and PRA Learn's own task screens |
| `app/Words.jsx`, `app/Workbook.jsx` | The key words task and the host of a step-practice set |
| `content/<TRACK>/<UNIT>/` | A unit's step-practice sets and the drawings they use |
| `src/` | The lesson deck, quiz, step engine, task engines and each unit's data |
| `SOURCE.json` | Where `src/` came from |

**All of it is PRA Learn's own.** `src/`, `tailwind.config.js` and the audio and
pictures in `public/audio` and `public/images` were copied from BowenPRA/Dashboard
(commit in `SOURCE.json`); since 10 November 2026 they are edited here and nothing is
copied any more. `npm run sync:dashboard` is gone: it emptied `unit/src` on every run,
so nothing in a task could be improved here, and Bowen is moving off the Dashboard.
Much of `src/` is code the lesson deck imports for activities no unit here uses yet;
it can be cut down later. `npm run lint` does not look at `unit/src` yet
(`eslint.config.js` still leaves it out, from when it was a copy).

Pictures in `public/images/<TRACK>/<UNIT>/` are listed with their sources and licences
in the Dashboard's `docs/credits.md` (the three tool photos of 5.3: protractor CC BY-SA
4.0, set square CC BY 3.0, try square CC BY-SA 2.0 ca).

Icons come from `lucide-react-dashboard`, an alias pinned to the Dashboard's
lucide-react version (`vite.config.js`).

## Saving

`src/lib/unitProgress.js` keeps one record a task: `{ best, last, runs, saved }`, under
the task's id. Demo mode keeps it in the browser. The live site keeps it in
`learn_unit_progress`, set up by `supabase/learn-units.sql`: one file, safe to run again.
The live database ran its first version on 6 November, which allowed only five task
names (lesson, words, practice, workbook, quiz). Until the current version is run there,
a task with any other id (5.3's `protractor` and `quads`, 5.2's `sort`, `test` and
`mystery`) cannot be saved on the live site, and the unit page says so.
`tests/units.test.mjs` checks the upgrade keeps what was saved.

## Adding a unit

1. Make `src/data/<TRACK>/<UNIT>/data.js` exporting `<UNIT>_DATA` (`meta`, and what its
   tasks need: `notes`, `realWords`, `assessment`, an engine's pool). Set
   `meta.vietnamese: false` for an English and French unit, `meta.audio: false` when
   there are no recordings.
2. Add the unit to `UNITS` in `../src/data/units.js` with its tasks, in order, each with
   an `id`, a `kind` and its `xp`. Never change an id once students have used it.
   `hidden: true` keeps a unit off every page while it is being built.
3. A new interactive task: write its screen in `app/tasks/` and add one entry to
   `ENGINES` in `app/engines.js`. It is handed `{ pool, savedData, onProgress, onComplete,
   onQuit, langs }` and reports a score out of `nativeMax`.
4. A step-practice set: write `content/<TRACK>/<UNIT>/<set>.js` and check it:
   `checkStepPractice(set, { fr: true })` from `src/stepPractice/check.js` must report
   nothing but warnings. Fresh problems only; never a Workbook page or its numbers.
5. Open `/unit/?demo#/<TRACK>/<UNIT>` on the dev server and do every task as a student,
   at laptop and phone width, in each language.

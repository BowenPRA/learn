# Units

Mr. Bowen's Dashboard idea, streamlined (6 November 2026): every unit has the same
five parts and is worth 100 XP, with up to 20 bonus XP for doing parts very well.
A unit counts as finished at 80 XP with the quiz done.

| Part | What | XP | Bonus |
|---|---|---|---|
| Lesson | The interactive lesson with its check questions (the Dashboard's Notes deck) | 20 | |
| Words | Review cards (meaning, example, French, audio), then a vocab quiz on every word, untimed or timed | 10 | +5: timed, 80% or more |
| Practice | The unit's main interactive task (3.4: Tide Lab) | 30 | +5: full marks |
| Workbook | Step-by-step problems in the style of the Workbook pages, all new | 20 | +5: every problem without help |
| Quiz | The end-of-unit quiz | 20 | +5: full marks the first time |

A part's XP is its best score times its XP. Nothing is locked; the first part not
finished is "Up next". The XP values live in `src/data/units.js` (`UNIT_PARTS`).

## How it is built

It is its own page, `/unit/#/<TRACK>/<UNIT>` (`unit/index.html`, a Vite input), with the
Dashboard's own CSS and Tailwind theme, so its tasks look exactly as on the Dashboard.

| Path | Whose | What |
|---|---|---|
| `src/`, `tailwind.config.js` | **copied** | The Dashboard's Notes, Assessment, step engine, each unit's data and main task, with everything they import, byte for byte. Never edit them here. |
| `public/audio/<TRACK>/<UNIT>/`, `public/images/<TRACK>/<UNIT>/` | **copied** | Each unit's recorded audio and pictures. The Dashboard lists every picture's source and licence in its `docs/credits.md`; the 3.4 pictures are the classroom deck's own photos, byte for byte, credited in `classroom/content/y7-science/U03_4/images/CREDITS.json` and `U03_tidelab/images/CREDITS.json`. |
| `SOURCE.json` | generated | The Dashboard commit and the files copied. |
| `main.jsx`, `app/` | PRA Learn | The unit page, the Words part, the Workbook host, the hand-off to the Dashboard tasks (`app/engines.js`), saving. |
| `content/<TRACK>/<UNIT>/workbook.js` | PRA Learn | The Workbook part's problems (step-practice schema). |
| `unit.css`, `tailwind.unit.js` | PRA Learn | The Dashboard's `index.css` built with its theme, scanning this folder only. |

Icons come from `lucide-react-dashboard`, an alias pinned to the Dashboard's
lucide-react version (`vite.config.js`).

Progress: `src/lib/unitProgress.js`. Demo mode keeps it in the browser. The live site
needs `supabase/learn-units.sql` run once (table `learn_unit_progress`, function
`learn_unit_save`); until then a live unit says its XP cannot be saved yet.

## Adding a unit

1. Add it to `UNITS` in `src/data/units.js` (track, unit, class, label, title, `engine` =
   the main task's component name in the Dashboard's `src/tasks/`).
2. If its main task is new to PRA Learn, add one entry to `ENGINES` in `app/engines.js`
   (copy `nativeMax`, the pool and the props from the Dashboard's `taskRegistry.js`).
3. Write `content/<TRACK>/<UNIT>/workbook.js` and check it:
   `checkStepPractice(workbook, { fr: true })` from `src/stepPractice/check.js` must report no problems.
4. `npm run sync:dashboard` (from `C:\Users\sbowe\Dashboard` at `origin/main`; `git fetch` there first).
5. Open `/unit/?demo#/<TRACK>/<UNIT>` on the dev server and try every part.

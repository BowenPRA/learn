# Units

A unit works the way it does on Mr. Bowen's Dashboard (10 November 2026): it is a list
of tasks chosen for that unit, each worth its own XP.

The page is laid out like the Dashboard's track page and unit card. A top bar has the
class in its subject's colour (maths orange, science green) and the unit's XP. A banner
in that colour shows the unit, its XP bar and one big button for the task to do next,
with Pip the otter. Under it the tasks are coloured tiles grouped into numbered steps
(Learn, Practice, Quiz), each tile with what is in it ("8 angles") and the XP it holds
out of the XP it is worth. Coming back from a task, the XP just won pops up ("+12 XP").

- A task's XP is its best score times the XP it is worth.
- The tasks may offer more than 100 XP between them; the unit's XP stops at 100.
- A unit is finished at 100 XP, or at 80 XP with its quiz done (80 alone when it has no quiz).
  A unit with `mustFinish: ['quiz', 'writing']` is finished only at 80 XP with each of those
  tasks done, however much XP it holds (Upper Secondary English, from 20 November 2026).
- Nothing is locked. There is no bonus XP. The one thing the AI marks is timed writing (below).

The first version (6 November 2026) gave every unit the same five parts. That is gone;
Tides keeps its five as five tasks, with the same ids, so progress saved before still counts.

## The course page, gold and the Arcade

Brought over from the Dashboard on 10 November 2026:

- **Course page** (`/unit/#/<TRACK>`, `app/CourseHome.jsx`): the XP held across the
  course's units, a banner for the unit to carry on with (one button into its next
  task), the units as cards with an XP ring, and the way into the Arcade. A unit page's
  back button goes here.
- **Gold** (`app/arcade/economy.js`): every XP a student holds in their units is one
  gold coin; gold earned is never stored. A game costs 25 gold. Play is free once the
  student has finished every unit or holds 80% of all the XP on offer.
- **Arcade** (`/unit/#/arcade`, `app/Arcade.jsx`): Tower Defense and Swarm Survivor
  (`src/tasks/games/`, `src/components/towerdefense/`, `src/components/survivor/`), six
  levels, and a leaderboard for each game and level. The games quiz the student on the
  key words of the units they are working on. Saved through `../src/lib/arcade.js`:
  the gold spent and the best score a level and game. The leaderboard shows the top ten
  of the student's own year group by login-card name. The live site needs
  `supabase/learn-arcade.sql` run once (`tests/arcade.test.mjs`).
- **Fix N**: a finished lesson that is not at full marks shows how many mistakes are
  left on its tile; opening it goes to its results, where "Fix my mistakes" redoes
  only those.
- **Teachers** see a class's XP, task by task, on the class page
  (`../src/components/UnitXPTable.jsx`).

Not brought over: steps that lock until XP is earned, the daily plan, AI-marked short
answers.

## Where a task can come from

A task's `kind` in `src/data/units.js`:

| Kind | What | Lives in |
|---|---|---|
| `notes` | The self-study lesson deck, with check questions and small activities | `src/data/<TRACK>/<UNIT>/notes.js`, played by `src/tasks/Notes.jsx` |
| `words` | The unit's key words: review cards, then a vocab quiz | `realWords` in the unit's `data.js`, played by `app/Words.jsx` |
| `engine` | An interactive task with its own screen | `app/engines.js` (one entry a task) |
| `steps` | Step-by-step problems in the Workbook's question types, all new | `content/<TRACK>/<UNIT>/<set>.js`, played by `src/stepPractice/` |
| `quiz` | The end-of-unit quiz | `assessment` in the unit's `data.js`, played by `src/tasks/Assessment.jsx` |
| `writing` | Timed writing, AI-marked, then the corrections; kept in My Writing | `writing` in the unit's `data.js`, played by `app/writing/WritingTask.jsx` |

The classroom deck is not a task: it stays exactly as taught, and the unit page links to
it ("From the classroom").

## The units so far

| Unit | Tasks (XP) |
|---|---|
| Science 3.4 Tides | Lesson 20, Key words 10, Tide Lab 30, Workbook 20, Quiz 20 |
| Maths 5.3 Drawing Lines and Quadrilaterals | Lesson 25, Protractor 30, Workbook 25, Quadrilaterals 20 |
| Science 5.2 Comparing Metals and Non-metals (`hidden`: no lesson yet) | Key words 20, Metal or non-metal? 20, Test it 15, Mystery substances 25, Quiz 20 |
| Upper Secondary English 1 Complete Sentences | Lesson 15, Key words 10, Grammar edit 20, Find & Fix 15, Fix it your way 15, Quiz 15, Timed writing 30; finished only with the quiz and the timed writing done |
| Maths 7.1 Ordering Fractions | Lesson 25, Mixed ↔ improper 20, Which is bigger? 20, Fractions to decimals 25, Quiz 20 (110 on offer) |
| Upper Secondary English 2 The Verb in Every Sentence | Lesson 15, Key words 10, Grammar edit 20, Find & Fix 15, Fix it your way 15, Reading 10, Quiz 15, Timed writing 30 (130 on offer); finished only with the quiz and the timed writing done |

Maths 7.1 (20 November 2026, built on the Workbook's Exercise 7.1 at Mr. Bowen's request;
every number is new):

- **Lesson** (`src/data/Y7_MATH/U07_1/notes.js`): 20 slides written for working alone, in
  the style of English 1's notes: 8 numbered "Write this down" boxes, red and green
  example strips for the two traps (adding to the top and the bottom; a big top read as a
  big fraction), 15 questions. Five are typed (Mr. Bowen, 20 November 2026: "some of the
  slides should be questions for the students to fill in the answers"): the `fill`
  activity (`src/components/notes/FillActivity.jsx`, `src/utils/fracFill.js`) shows
  fraction sentences with boxes, such as `23/6 = [3] [5]/6` or `5/6 {>} 7/9`, marks them
  with one Check, hints after a first mistake and then shows the answers; the validator
  proves every line true. Slide 14 is the bus stop how-to ("give instructions how to do
  the division towards the end"): his five steps on 3 ÷ 4 beside a numbered picture
  (`busstopHow.js`), then the student's own 9 ÷ 4. It covers the Part 1 classroom deck
  (`U07_1a`) and what Part 2 will teach: which is bigger, a common denominator, the
  division method, order of size. The pictures are the classroom deck's own
  `diagrams.js`, imported; Cut Every Piece and Slice by Slice are copies in the unit
  folder (`cut.jsx`, `slices.jsx`, with a plain button in `ui.jsx`), since the unit's CSS
  only sees `unit/src`.
- **Mixed ↔ improper** (`content/Y7_MATH/U07_1/mixed.js`): Workbook Q4 both ways, 10
  problems built from their numbers: divide, the remainder, then the mixed number; or
  multiply, add, then the improper fraction.
- **Which is bigger?** (`content/Y7_MATH/U07_1/bigger.js`): Q5 and Q8–10 and order of
  size, 10 problems. The student changes each improper fraction to a mixed number as a
  step of its own; the same whole number then needs a common denominator and an
  equivalent fraction for each part before the sign.
- **Fractions to decimals** (engine `BusStop`, `src/tasks/ShortDivision.jsx`, the unit's
  `shortDiv`): the Dashboard's Bus Stop task (Maths 3.2), copied 20 November 2026 and
  redesigned the same day (Mr. Bowen: "I don't like the initial intros as they will just
  do spam clicks. it looks over scaffolded"). The worked examples, the times table stage
  and the column-at-a-time guide are gone (with `shortDivExtras`). The whole bus stop is
  open from the first problem, as on paper: the student types every digit and remainder,
  presses +0 for a zero, and types the answer underneath (rounded, for a `dp` item). One
  Check marks up to the first mistake, which turns red with a hint that never states the
  digit; an empty box or a missing zero is pointed out without counting. Hint and Show
  me only on request; a second wrong Check at a box fills that column in; a problem with
  anything filled in pays half. `fraction: true` asks "Write 13/8 as a decimal", with
  13/8 = 13 ÷ 8 under it. Three levels, 10 problems: the top smaller than the bottom,
  bigger tops, and two that never stop, rounded to 3 d.p. The whole fraction is divided
  (13 ÷ 8 = 1.625), not split into a mixed number first as the Workbook does (Mr. Bowen,
  20 November 2026).
- **Quiz**: 10 questions, two typed and one put in order; the questions are in English
  (the quiz has no French question text), every explanation has its French twin.

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

English 1 (XP set by Mr. Bowen on 20 November 2026, 120 on offer):

- **Fix it your way** (`app/tasks/RewriteTask.jsx`, engine `Rewrite`, the unit's `rewrite`):
  11 faulty sentences (comma splices, run-ons, fragments, a missing verb). The box starts
  with the faulty sentence and the student changes it. The checker (`app/tasks/rewrite.js`,
  rules, no AI) judges only the join: it accepts every correct one it can name (full stop,
  semicolon, comma + FANBOYS, a subordinator, "; however,"), checks the joining word against
  the meaning and the order of the ideas ("A, so B" is "B, for A"), and names each wrong
  join. A correct but weaker word ("and" for a result) passes with a note naming the better
  one. An item's `accept` lists whole sentences that are right though the rules cannot see
  why. Right first time 1, after a hint ½, after "Show me" 0. `tests/rewrite.test.mjs`.
- **Quiz**: q8 is typed (a joining word that fits a contrast) and q9 a sort (fragment,
  run-on, comma splice; drag or tap). The other eight are multiple choice.

English 2, The Verb in Every Sentence (21 November 2026, plan approved by Mr. Bowen first;
`docs/UPPER-ENGLISH-PLAN.md`, Stage 1 item 2): "be" and leaving it out, the present and past
simple, the -s of he / she / it, does / didn't + the base verb, "there is / there are".

- **A quarter from Unit 1**: from Unit 2 on, about a quarter of each unit's practice comes
  from earlier units (5 of 20 Grammar edit blanks, 5 of 25 Find & Fix mistakes, 3 of 12
  Fix it your way sentences, 2 of 10 quiz questions). Each says so in a comment.
- **Fix it your way**: nine verb sentences (`kind: 'exact'`: the right sentence or any in
  `accept`; `ask` replaces the line over the box) and three Unit 1 joins, one of them
  "Although …, but …", which the checker names ("both join the two ideas"). In every unit a
  contraction counts as its long form (`longForm` in `app/tasks/rewrite.js`): "She's" =
  "She is", "didn't" = "did not".
- **Reading** (engine `Reading`, the unit's `reading.js`, shaped like `assessment`): one
  passage written for PRA Learn (How Bees Make Honey, about 260 words) and six questions,
  two each on what it says, its words and how it is built. Untimed (`timeLimit: 0`), 10 XP,
  not needed to finish. It runs on the quiz screen, which takes `labels` for its own words.
- **Quiz**: q7 and q8 are typed (a past form; "There are"), q9 a sort of four verb
  mistakes; q5 and q10 are from Unit 1.
- **Timed writing**: one prompt, `u2w1` "A place I know well" (description: what is
  there, a normal day, one visit).
- **Class deck**: `classroom/content/upper-english/U02/`, 16 slides, staff only like Unit 1's.

## Timed writing and My Writing

Added 14 November 2026 for the Upper Secondary English track (`UPPER_ENG`, class
`english:Upper Secondary`), from the Dashboard's GED essay task. Every English unit ends
with one.

- **The task** (`app/writing/WritingTask.jsx`): the unit's one prompt, about 5
  minutes to plan with the questions for that kind of writing, then the writing box with
  sentence frames beside it. 30 minutes at the least (`writing.minutes`). Paste, cut, copy
  and drag are blocked and spell check is off; leaving the page, paste tries and big
  blocks of text arriving at once are counted and shown with the essay. The clock is the
  server's: it starts when the essay starts and keeps going if the student leaves; at
  0:00 the writing is handed in as it is, and a save after the deadline hands in what was
  last saved.
- **The mark**: the `learn-grade-essay` Edge Function (Gemini), three parts 0-4 (ideas,
  organisation, language), 12 in all, with the code caps in its `marking.js`. Each report
  also counts the mistakes in the unit's own grammar (`writing.focus`).
- **The corrections** (`app/writing/RevisionWorkshop.jsx`): one sentence at a time, the
  student retypes it until it matches. The task's XP is 8 parts the mark and 2 parts the
  corrections.
- **My Writing** (`/unit/#/writing`, `app/writing/MyWriting.jsx`): the marks as a line
  over time, the mistakes that keep coming back, unfinished writing and the best essay for
  each unit with its report and the teacher's note. The student home page has a card for it.
- **Best piece only** (Bowen, 20 November 2026; `../src/lib/essays.js` `shownEssays`): a
  student may write a unit's task more than once, and English 1 offered three prompts
  until then. Of each student's marked writing for one task only the best piece is shown
  (the higher mark, the teacher's if they gave one; the later on a tie), on the task, in
  My Writing, on the home card and to teachers. Drafts and writing waiting to be marked
  still show, so they can be finished. Writing from a task taken off its unit (English 1's
  One paragraph) is shown to nobody. Nothing is deleted.
- **Saved** in `learn_essays` (`supabase/learn-essays.sql`), one row an attempt, through
  `../src/lib/essays.js`. Demo mode keeps essays in the browser, marks them with a
  stand-in that finds a few mistakes by rule, and starts with three sample essays.
- **Teachers** see a class's writing on the class page (`../src/components/ClassWriting.jsx`):
  a row a student, a column a writing task, each cell the student's best piece and "×n"
  for how many they handed in, flags and notes marked, "Needs a look" and "No note yet"
  filters. A cell opens the reader (`/unit/#/writing/class/<class>/<essay>`,
  `app/writing/ClassReader.jsx`): the essay and report, the teacher's own mark (0-12, or the
  AI's) and a note the student reads in My Writing, and Previous / Next through each
  student's best piece for the same task. A student's name opens their writing over time
  (`.../student/<id>`). Saved through `learn_essay_note`.

A unit's `writing` in its `data.js`:

```js
writing: {
  type: 'narrative',            // narrative, descriptive, explanatory, argument, letter, summary, paragraph (app/writing/frames.js)
  minutes: 30, minWords: 150, paragraphs: 3,
  focus: { label: 'Complete sentences', look: 'fragments, run-on sentences and comma splices' },
  frames: [],                   // optional extra frames { stage, text }
  prompt: { id: 'u1w1', title, task, guidelines: [], plan: {} },   // plan: example answers for the plan
}
```

One prompt a unit (Bowen, 20 November 2026: three prompts read as three assignments). A
prompt's `id` is saved with every essay: never change it once used. Writing begun on an
earlier prompt is finished from the prompt saved with it.

**A practice write** is a second writing task in the same unit: a task
`{ id: 'paragraph', kind: 'writing', writing: 'paragraph', xp, title, note }` in
`../src/data/units.js` reads `paragraph` from the unit's `data.js` instead of `writing`.
With `practice: true` it may be shorter than 30 minutes (5 at the least), plans for about 2
minutes, tells the marker it is one paragraph (`rubric.js`; live only once
`learn-grade-essay` is redeployed), and is left out of the marks-over-time line and the
home card's latest mark (`essays.js` `markedOldestFirst`); its mistakes still count in
"what keeps coming back". No unit has one since 20 November 2026 (Bowen took English 1's off;
the pieces written for it are kept and shown to nobody).

The English track is English only (15 November 2026): no `…Vn` twins, no language
switch (`unit/main.jsx` gives `UPPER_ENG` English alone), and examples that do not lean on
where the students are from. It is a freshman English class, not one adapted for
second-language learners.

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
`mystery`, English 1's `edit`, `findfix`, `rewrite`, `paragraph` and `writing`) cannot be
saved on the live site, and the unit page says so.
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

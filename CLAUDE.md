# CLAUDE.md

PRA Learn is the student and teacher portal of Palm River Academy, an English language
center in Hội An: https://learn.pra.edu.vn, from the public GitHub repo BowenPRA/learn.
Students sign in with a name and a code from a login card, go back through a lesson's
slides answering check questions, and work through step-by-step practice. Teachers see who
did what and which questions most of the class missed. It shares The Current's Supabase
project (current.pra.edu.vn) for sign-in and data.

One Vite build, three pages:

| Page | Folder | Read first |
|---|---|---|
| PRA Learn itself, `/` | `src/`, `supabase/`, `tests/` | `README.md`, `docs/DESIGN.md`, `PROGRESS.md` |
| Mr Bowen's classroom decks, `/classroom/#/lesson/<course>/<slug>` | `classroom/` | `classroom/README.md`, then the lesson rules below |
| Units (the Dashboard idea, streamlined), `/unit/` | `unit/` | `unit/README.md` |

## Rules for the whole repo

- **The repo is public.** No student's name or photo, no book page, Workbook exercise,
  test or answer key, no login, key or `.env` value. Student data reaches the portal only
  from the database, after sign-in.
- **PRA is a language center.** Never "school" in anything students, families or staff
  read; in Vietnamese never "trường" or "học sinh" (students are "học viên").
- **Commit, push and deploy only when Bowen asks.** `npm run deploy` publishes to
  BowenPRA/learn; its predeploy refuses to build without `.env`, which keeps the live site
  out of demo mode. `public/CNAME` and `base: '/'` in `vite.config.js` belong together.
- **Other sessions often work in this folder.** Touch only the files your task owns. Never
  edit, stage, revert or commit someone else's uncommitted changes, and never kill a server
  or a Chrome you did not start.
- Write plainly: say it once, then the concrete detail. No closing flourishes.

## Writing a classroom lesson

The decks are Cambridge Lower Secondary Year 7 Maths and Science lessons, taught from a
projector to Vietnamese ESL students and then opened by the students on PRA Learn. Their
arithmetic is fine; the barrier is the English of the question. Write for that.

### Before authoring or editing a lesson

Read **`docs/LESSON-PLAYBOOK.md` end to end.** It is the method: build order, house style,
and every trap that has already cost time. `docs/DECK-REFERENCE.md` is the field-and-layout
reference. Neither is optional, and neither is a substitute for the other. The
`new-lesson` skill (`.claude/skills/new-lesson/`) is the step-by-step run with its check
scripts.

A lesson is a folder, `classroom/content/<course>/<slug>/index.js`, default-exporting
`{ meta, slides, plan }`, **plus one line in `src/data/classroomLessons.js`**. A folder
with no line does not open; `npm run check:lessons` catches a missing or drifted line.

**The bar is `.claude/skills/new-lesson/STANDARD.md` and the decks it names** (Coffee,
Carbon and Stars; 3.4 Tides; 3.5 and 3.6 Energy; Maths 5.2 and 5.3): its 12-step flow, its
pictures, film and widgets, and its clarity pass. Read it and at least two of those decks
before building. **Science 2.5 (`classroom/content/y7-science/U02_5/`) and Maths 2.3
(`classroom/content/y7-math/U02_3/`) still set how few words a slide carries.** Older decks
are over-written: borrow ideas from them, never wording. **Science 4.1
(`classroom/content/y7-science/U04_1/`) is not an exemplar**: read it for what the class
met last, never as a model.

**`docs/TRAPS.md`** lists what goes wrong while lint, build and every check pass. Read it
before your first deck and whenever something "isn't applying".

Printed homework packets, the weekly plan, games, teacher courses and the Dashboard links
stayed in the old classroom repo: `docs/NOT-MOVED.md`.

### Think before building

Surface the assumption instead of quietly picking one. If a request has two readings that
would produce different decks, say so and ask. A question before you start costs a minute;
the wrong deck costs the lesson.

### Write less, and make it easy to read

Every extra word on a slide is one more thing between an ESL student and the idea. One hook
line or no body text; short sentences with everyday words; never repeat what the write
note, a label or a caption already says; cut any sentence that explains why the slide
exists (that goes in `plan.js`). Keep all the content: move words into a label, caption,
reveal or another slide rather than deleting ideas. On a problem slide the maths is the
biggest thing on it. When the class votes between two answers: left hand A, right hand B,
all at once (LESSON-PLAYBOOK §1, "Vote slides").

### Prefer the plain slide

**This is the failure that recurs most: building something clever where something simple
was wanted.**

- A widget must do one thing a static slide cannot. If it does not, it is a note or a
  bumper. No sliders, no gimmicks, no interaction for its own sake.
- If a slide needs a scrollbar on a projector, it is two slides. Splitting is free; a
  cut-off definition is not.
- Ask the question on its own slide, with no numbers on it, before the slide that answers
  it.

### Non-negotiables

- Copy-down content goes in a `write` note or an orange `>` bumper. **Nothing else.** A
  definition that looks like discussion prose does not get copied.
- **Year 7 decks are English and French** (every deck since 15 October 2026). Every
  user-facing string needs a `…Fr` twin and **no** `…Vn` twin, written inline from the
  start, including widget interface text, which receives the deck's `lang` prop
  (`tr(lang, en, null, fr)` from `classroom/src/lib/lang.js`). Set `meta.french: true` and
  `meta.vietnamese: false`, so the switch reads EN / FR. Older decks keep their `…Vn` twins
  and EN / VN / FR; don't strip them. The Year 7 maths tasks (`T*` folders) are EN/VN only.
- Never put a `$` in prose. `parseInlineText` turns any two of them into a maths span and
  eats the words between. Write "20 dollars".
- Write SVG label `<text>` out literally. `svg-audit` cannot see text emitted from a
  `${helper(...)}` call, so it will report zero overflows while measuring nothing.
- **Never copy a book page into the repo.** Book scans are copyrighted and the repo is
  public. Every image needs a `CREDITS.json` entry with an honest licence; a book crop, used
  only when Bowen asks for that exact figure, says it is not openly licensed.
- Use **Mr Bowen** in worked examples, never invented student names.

### Verification: nothing ships until all of these are clean

```bash
npx eslint --no-ignore classroom/content/<course>/<slug>
npm run check:lessons
npm run build
node scripts/svg-audit.mjs <course>
node scripts/deck-check.mjs "http://localhost:5201/classroom/?demo#/lesson/<course>/<slug>"
```

`npm run lint` does not look at the lesson folders yet, hence the `eslint` line. `npm run
dev` serves on 5201; beside other sessions start your own with
`npx vite --port <port> --strictPort`. The check scripts sign in to the demo themselves.

`deck-check` walks the deck **windowed at 1440×900, in English** (it takes `dark`, and `fr`
or `vn` to walk it in that language). Project mode is full screen with roughly 40% larger
type, and it is what the class actually sees: check it separately with the skill's
`project-check.mjs`, in every language the deck offers, at the room's real resolution, and
once with `REVEALS=1` so the answer boxes are open. See LESSON-PLAYBOOK §6 for why that
check is awkward to automate.

When Bowen asks to ship it: commit your own paths, `npm run deploy` (from a clean worktree
if anyone else's work is in the folder: TRAPS.md, "Deploy"), and confirm
https://learn.pra.edu.vn/classroom/ is serving the new bundle before calling it done.

---
name: new-lesson
description: >-
  Build or revise one of Mr Bowen's Year 7 Cambridge Maths or Science classroom decks in
  PRA Learn (classroom/content/<course>/<slug>/, opened at
  /classroom/#/lesson/<course>/<slug>) from Learner's Book or Workbook pages. Use this
  whenever the user wants a lesson, a deck, or slides for a Year 7 unit, including
  phrasings like "make Monday's maths lesson", "do 4.2", "build a deck from these pages",
  or when they attach a Learner's Book PDF, screenshots of book pages, or point at the
  Y7Books folder. Use it for revisions too ("the widget is overdesigned", "add a slide
  about X"), because the checks are identical. Covers the whole run: reading the book
  pages, the beat sheet, sourcing and crediting images, authoring diagrams, writing
  English and French slides, the teacher's plan, listing the lesson, verification
  including project mode and the clarity pass, and the deploy when Bowen asks for it.
---

# Building a lesson

`docs/LESSON-PLAYBOOK.md` is the **design** authority: house style, layouts, and why each
rule exists. Read it before you author anything; this file will not repeat it. What follows
is the **sequence** and the tooling, in the order that works. `docs/DECK-REFERENCE.md` has
every field and layout; `docs/TRAPS.md` has what goes wrong while every check passes.

The lesson is taught by Mr Bowen on a projector to Vietnamese ESL Year 7 students, and the
students open the same deck on PRA Learn afterwards. They can do the arithmetic; what stops
them is the English of the question. That fact shapes every slide.

All commands run from `C:\Users\sbowe\learn`. A lesson is the folder
`classroom/content/<course>/<slug>/` (`y7-math` or `y7-science`; slug like `U04_2` for
section 4.2) plus one line in `src/data/classroomLessons.js`.

**The repo is public.** No book page, Workbook exercise, test or answer key goes into it,
and no student's name or photo. Book images, screenshots and contact sheets stay in your
scratchpad.

## 0 · Establish the facts before you build

Get these pinned down first; guessing any of them wastes the whole run.

- **Which unit, and which book pages.** Bowen usually attaches the pages or says where they
  are. Known places (read them there, never copy them into the repo):
  `C:\Users\sbowe\Desktop\Y7Books\` holds per-section Science PDFs for Unit 1
  (`Y7Science1.2.pdf`), one file for Science Unit 2 (`Y7Science2_pp28-71.pdf`, PDF index =
  book page − 30), and *whole-unit* Maths files (`Y7MathUnit01.pdf` covers 1.1–1.6; Unit 2
  is the Workbook only, `Y7MathWBUnit02_v2.pdf`). For maths you must find the section inside
  the file; do not assume the file is the section. The Maths Workbook print edition is
  `C:\Users\sbowe\Downloads\Mathematics Workbook 7 - print edition.pdf` (PDF page = book
  page); the Teacher Resources are in `C:\Users\sbowe\Downloads\`
  (`LS_Maths_7_Teacher_Resource`, `Lower_Secondary_Science_7_Teacher_Resource`). Later
  Science units came as screenshots (Unit 3 in `C:\Users\sbowe\Desktop\Screenshots`,
  Unit 4 in `C:\Users\sbowe\Pictures\Screenshots`). If the pages are not where you expect,
  ask; do not hunt across the drive.
- **The teaching date**, if Bowen gives one, for the hero's `date` field. Otherwise leave
  the hero undated.
- **The standard and its decks.** Read `STANDARD.md` beside this file: the flow, the clarity
  pass and the rules for working beside other sessions that the decks from Coffee, Carbon
  and Stars onward are judged by. Then read `slides.js`, `plan.js` and one widget from at
  least two of the decks it names (Coffee, Carbon and Stars; 3.4 Tides; 3.5 and 3.6 Energy;
  Maths 5.2 and 5.3). They are the bar. **Science 4.1 (`classroom/content/y7-science/U04_1`)
  is not one of them and is never a model.**
- **How few words.** Science 2.5 (`classroom/content/y7-science/U02_5/`) and Maths 2.3
  (`classroom/content/y7-math/U02_3/`) still set how much English a slide can carry. Decks
  older than these are over-written; do not copy their wording.
- **Continuity.** Then read the most recent deck in the course you are building, for
  continuity of content only: what the class had last lesson, the key words it already
  knows, the story so far. It is not a model for style, flow or widgets unless it is one of
  the exemplars. (For Science today the most recent deck is 4.1, which is not.)
- **The traps.** Read `docs/TRAPS.md`.

## 1 · Read the book pages

The PDFs are image-only scans with no text layer, roughly **115 dpi** (955×1351 px per A4
page; Science Unit 2 is about 72 dpi). PyMuPDF is installed.

```python
import fitz
d = fitz.open(path)
d[i].get_pixmap(dpi=200).save(scratch + '/pg.png')   # to read the page yourself
d.extract_image(d[i].get_images(full=True)[0][0])    # native pixels
```

Save page images to your scratchpad, never inside the repo.

That resolution ceiling decides what you can use: **line art redraws well as SVG;
photographs printed in the book do not project at all.** A micrograph occupying a fifth of
a page is ~250 px wide, too soft to project. Source an openly-licensed equivalent instead
and tell the class it is the same figure as the book's. Illustrations that overlap body
text cannot be cropped cleanly anyway; draw those. A crop of a book figure goes into the
deck only when Bowen asks for that exact figure (playbook §4).

Read every page before planning. Note the section's **Key words** (often only one or two),
the worked example, the exercise structure, and the questions: the questions are usually
the best classroom activities already written for you (rewrite them with your own numbers).

## 2 · Write the beat sheet first

One line per slide, in teaching order, before any code. Mark which slides are questions,
which are copy-down, and which are Draw This. Follow the 12-step flow in `STANDARD.md`.

This is where the lesson is actually designed, and it is cheap to change. Structural
mistakes found here cost a minute; found in `slides.js` they cost an hour. Show it to Bowen
if the shape is at all uncertain.

The shape that works, from the decks that have taught well:

- Open with a starter the class can do while settling.
- **Ask before you tell.** The question gets its own slide with no numbers on it. The gap
  between their guess and the answer is the lesson; showing the working first throws that
  away.
- Pair every drawn diagram with the real thing photographed.
- Stop for the English wherever a word is doing more work than it looks (*similar* ≠ *the
  same*; a *stain* on your shirt versus in a lab).
- End with a recap checklist that names the count ("your notebook should now have 7
  written items and 1 labelled drawing" turns a vague instruction into a checkable one),
  then the exit question. No homework slide.

For **maths** specifically, language is the spine: teach the vocabulary of change and
comparison, drill sentence → calculation in both directions, use **Mr Bowen** in worked
examples rather than invented student names, and close with word problems that get
increasingly silly, presented completely deadpan, never flagged as jokes.

## 3 · Source images, crediting as you go

Everything lives in the lesson's `images/` and is **imported** in `slides.js`
(`import x from './images/x.jpg'`) so Vite hashes it and it works on the live site. Never
hand-write a `/public/...` path.

Wikimedia Commons, via the API: check the licence **before** downloading, send a real
User-Agent, sleep about 1.5 s between calls, pull a standard size with `iiurlwidth=960`
rather than the original, then downscale to ≤1200 px at quality ~80. For a plain object,
the lead image of the English Wikipedia article is often the best start.

```
https://commons.wikimedia.org/w/api.php?action=query&format=json
  &list=search&srsearch=<terms>&srnamespace=6
https://commons.wikimedia.org/w/api.php?action=query&format=json
  &prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=960&titles=File:<name>
```

**Look at every image before you commit to it.** Search titles lie often enough to matter:
a promising "blood smear" turns out to be a photograph of the glass slide, "leaf epidermis"
turns out to be a scanning-electron image, and "potato starch" turns out to be starch
grains rather than cells. Roughly a third of candidates get rejected on sight. Stage
candidates in your scratchpad, make a contact sheet, and copy only the keepers into
`images/`.

Every file gets an entry in `images/CREDITS.json` with `name`, `title`, `descUrl`,
`license`, `artist`. If a book crop is used at Bowen's request, say so explicitly in the
entry, licence `"(c) <publisher> - NOT openly licensed"` plus a `usage` note. Do not bury it.

## 4 · Author the diagrams

House style is in the playbook §5. The two rules that bite:

- **Open with a white plate** covering the viewBox, so artwork reads on a light *or* dark
  slide.
- **Write label `<text>` out literally**, inside an UPPER_CASE `KEY: \`…\`` entry in
  `diagrams.js`. `svg-audit` extracts those template blocks and regexes for `<text>`;
  anything emitted from a `${helper(...)}` call is invisible to it, so the audit will
  cheerfully report "0 overflows" while measuring nothing. Use helpers for shapes and
  leader lines only.

Then **render a contact sheet and look at it** before wiring anything into slides. Two
gotchas: headless Chrome needs `--user-data-dir` or the screenshot silently fails with
"Access is denied", and the SVGs carry Tailwind classes (`w-full h-full`) that do nothing in
a bare HTML page, so set `svg { width: 100% !important; height: auto !important }` or every
diagram renders thumbnail-sized.

Label leader lines are the thing you will get wrong: dots land inside the shape, or point
at the membrane when they mean the cytoplasm. Only the contact sheet shows this.

## 5 · Write `slides.js`, in English and French from the start

**Every Year 7 deck built since 15 October 2026 is English and French only.** Every string
gets its `…Fr` twin inline and no `…Vn` twin, and `index.js` sets `meta.french: true` and
`meta.vietnamese: false` (the switch then reads EN / FR). Older decks keep their
Vietnamese; don't strip it. Retro-fitting twins is worse than writing them inline: you end
up re-reading every slide. French runs longer than English and overflows different slides,
so writing it late hides layout problems until the end. Maths 4.1–4.4 (`U04_1_4`, Decimals)
is the first EN/FR maths deck.

French conventions, so every deck reads alike: short everyday French; `tu` (*Recopie*,
*Calcule*); **M. Bowen**; maths and decimal points exactly as the English (the class works
from the English book); a no-break space before `? ! : ;` and inside « » (in a template
literal write it as `\u00a0`: eslint rejects the literal character there, and TRAPS.md has
the ways the Write and Edit tools mangle it); where a slide teaches English wording, the
French keeps the English phrase beside its own. Widgets use `tr(lang, en, null, fr)` from
`classroom/src/lib/lang.js`; diagrams stay English. French and Vietnamese both write 3,25
and say "vingt-cinq" / "hai mươi lăm" for it; a decimal lesson should say so (`U04_1_4`
slide 3).

The non-negotiables are in `CLAUDE.md`. The one worth restating because it is the whole
point of the deck: **anything a student must copy goes in a `write` note or an orange `>`
bumper, and nothing else does.** A definition that looks like discussion prose does not get
copied into a notebook.

**Write less than feels natural.** One hook line or no body text; short sentences; nothing
the note, a label or the caption already says; no sentence about why the slide exists (that
is the plan's job). Then reread each slide and cut again: the first draft is always too
long. On a problem slide the maths is the biggest thing on it, and a two-answer vote is left
hand A / right hand B (playbook §1).

Prefer the plain slide. A widget must do one thing a static slide cannot; otherwise it is a
note. This is the failure that recurs most; when in doubt, build the simpler thing and offer
the widget as a follow-up.

## 6 · Write `plan.js` and list the lesson

The teacher's one-pager: duration, objective, materials, vocab, timeline, answers, notes
(field names in `docs/DECK-REFERENCE.md`, "Teacher's plan"). A stale timeline is worse than
none. Put the real answers in, including the arithmetic for anything the deck asks the class
to estimate, so the teacher is not caught out at the board. The plan is shown to staff only,
but it ships inside the lesson's code: nothing secret goes in it.

Then add the lesson's line to `src/data/classroomLessons.js` (course, slug, class
`'math:Year 7'` or `'science:Year 7'`, unit, teacher `'Mr. Bowen'`, title and subtitle
exactly as in `meta`), in teaching order, and run `npm run check:lessons`. Without the line
the deck does not open.

## 7 · Verify

Start a dev server on a free port (`npm run dev` is 5201; beside other sessions use your
own: `npx vite --port 5223 --strictPort`). In the commands below `<lesson-url>` is
`"http://localhost:<port>/classroom/?demo#/lesson/<course>/<slug>"`, quoted. The Chrome
scripts sign in to PRA Learn's demo by themselves (as the demo teacher, so the plan button
shows as it does on the classroom laptop; `AS=student` for the student's view).

```bash
npx eslint --no-ignore classroom/content/<course>/<slug>
npm run check:lessons
npm run build
node scripts/svg-audit.mjs <course>
node scripts/deck-check.mjs <lesson-url>
node scripts/deck-check.mjs <lesson-url> dark
node scripts/deck-check.mjs <lesson-url> fr
node .claude/skills/new-lesson/scripts/slides-lint.mjs classroom/content/<course>/<slug>/slides.js --no-vn
```

`npm run lint` skips the lesson folders for now, hence the `eslint --no-ignore` line.
`slides-lint.mjs` catches what eslint cannot: a user-facing string with no `…Fr` twin (and,
without `--no-vn`, no `…Vn` twin; with it, a stray `…Vn`), a French twin whose `$…$` maths
differs from the English, and an unpaired `$` (balanced `$…$` pairs are real KaTeX and are
left alone). Pass `--no-fr` for a maths task deck, which is EN/VN only.

If a check says "The page left the deck", the lesson's line is missing from
`src/data/classroomLessons.js` or the URL lacks `?demo`.

Then **project mode**, which is what the class actually sees and which `deck-check` does not
test (it measures windowed, 1440×900):

```bash
node .claude/skills/new-lesson/scripts/project-check.mjs <lesson-url>
node .claude/skills/new-lesson/scripts/project-check.mjs <lesson-url> fr
WSIZE=1366,768 node .claude/skills/new-lesson/scripts/project-check.mjs <lesson-url>
WSIZE=1366,768 node .claude/skills/new-lesson/scripts/project-check.mjs <lesson-url> fr
REVEALS=1 WSIZE=1366,768 node .claude/skills/new-lesson/scripts/project-check.mjs <lesson-url>
REVEALS=1 WSIZE=1366,768 node .claude/skills/new-lesson/scripts/project-check.mjs <lesson-url> fr
```

(Add `vn` runs for a deck that still offers Vietnamese.) `REVEALS=1` opens every reveal box
before measuring, whatever its label; every other check walks with them shut, and an open
answer is the commonest overflow. A `reveal.prompt` does not keep line breaks: separate
items with commas. Headless Chrome 157 refuses real fullscreen, so the scripts accept the
deck's display mode instead (the log then says "windowed: this Chrome refused fullscreen");
it lays out the same at the emulated size.

Full screen swaps every layout to `clamp()` type ~40% larger, so a deck that is spotless
windowed can scroll on a third of its slides on the projector. Expect to trim. Shortening
prose is usually the fix; when a slide is over by more than about 60 px, split it or move a
note elsewhere rather than compressing until it is terse.

Finally, look at it: screenshot the changed slides in **light and dark**, and open any
widget in each of its states. `deck-shots.mjs` walks the deck in project mode and saves one
JPEG per slide plus 2×2 contact sheets; read the sheets for the overview, single slides for
detail. Put the output in your scratchpad, never in the repo:

```bash
WSIZE=1366,768 node .claude/skills/new-lesson/scripts/deck-shots.mjs <lesson-url> <scratch>/shots-fr-dark fr dark
REVEALS=1 WSIZE=1366,768 node .claude/skills/new-lesson/scripts/deck-shots.mjs <lesson-url> <scratch>/shots-fr-open fr
```

Open the teacher's plan as the demo teacher (`/classroom/?demo#/plan/<course>/<slug>`) and
check it matches the deck.

All three Chrome-driving scripts and `deck-check` take `PORT` (the Chrome debugging port),
so several can run at once without fighting over one Chrome. The reasoning here cannot be
automated: a widget can pass every check and still say "a an animal cell".

Then do **the clarity pass** in `STANDARD.md`: Wrong / Unclear / Fine as is, everything
under the first two fixed.

## 8 · Ship (only when Bowen asks)

Commit only your own paths (`STANDARD.md`, "Working beside other sessions"), then deploy.
`npm run deploy` checks `.env`, builds the production site and publishes `dist/` to
BowenPRA/learn's `gh-pages` branch, which serves https://learn.pra.edu.vn. When anyone
else's uncommitted work is in the folder, deploy from a clean worktree instead
(`docs/TRAPS.md`, "Deploy").

Then confirm the live site is serving the new bundle before calling it done:

```bash
grep -o 'assets/classroom-[A-Za-z0-9_-]*\.js' dist/classroom/index.html
curl -s https://learn.pra.edu.vn/classroom/ | grep -o 'assets/classroom-[A-Za-z0-9_-]*\.js'
```

GitHub Pages lags several minutes behind the `gh-pages` push, and the push itself sometimes
hangs: wrap it in `timeout` and check the result rather than assuming it landed. Poll until
the hashes match, then run `deck-check` against
`https://learn.pra.edu.vn/classroom/?demo#/lesson/<course>/<slug>`. Images come off the
network there, so let them settle before judging broken-image counts. Students see the
lesson on their home page ("Lessons from class") once it is live.

# Lesson Playbook

How to build a classroom lesson deck in PRA Learn that actually works in front of a class.

The decks are Mr Bowen's Year 7 Cambridge Lower Secondary Maths and Science lessons,
taught from a projector to Vietnamese ESL students and opened by the students themselves
on PRA Learn's classroom page (`/classroom/#/lesson/<course>/<slug>`). Their arithmetic is
fine; the barrier is the English of the question.

[DECK-REFERENCE.md](DECK-REFERENCE.md) is the **reference**: every field, every layout.
This is the **method**: what makes a deck good, the order to build it in, and the traps
that have already cost time. [TRAPS.md](TRAPS.md) is the full list of things that go wrong
while every check passes.

> **Book scans are copyrighted, and this repo is public** (BowenPRA/learn, served at
> learn.pra.edu.vn). Never copy a book page, a Workbook exercise, a test or an answer key
> into it, not even into a lesson folder "for reference". Read the books in their own
> folders (new-lesson `SKILL.md` §1), write original numbers and wording, and keep
> page images, screenshots and contact sheets in your scratchpad.

### The exemplars

The bar every new lesson is measured against is
[`STANDARD.md`](../.claude/skills/new-lesson/STANDARD.md) and the decks it names: Coffee,
Carbon and Stars (`classroom/content/y7-science/U03_coffee/`), 3.4 Tides (`U03_4`), 3.5 and
3.6 Energy (`U03_5`, `U03_6`), Maths 5.2 (`classroom/content/y7-math/U05_2/`) and 5.3
(`U05_3`). They set the flow, the mix of photographs, film and widgets, and the clarity
pass. Read `slides.js`, `plan.js` and one widget from at least two of them before building.

**Science 4.1, Characteristics of living organisms (`classroom/content/y7-science/U04_1/`),
is not an exemplar** (Bowen, 10 November 2026). It is the newest Science deck, so read it
to know what the class met last lesson, but never take its style, flow or widgets as a
model.

Two older decks still set how few words a slide carries:

- **Science 2.5**: `classroom/content/y7-science/U02_5/` (Atoms, elements and the Periodic Table)
- **Maths 2.3**: `classroom/content/y7-math/U02_3/` (Collecting like terms)

Older decks (1.1–2.2 in both subjects) teach well but are **over-written**: their slides
carry two or three sentences where one would do. Borrow their ideas, never their wording.

---

## 1. The design principles

### Write less. Make it easy to read.
The class reads English slowly. Every extra word on a slide is one more thing between them
and the idea. This is the rule Mr Bowen has asked for most often.

- **One hook line, or no body text at all.** If a `write` note, a diagram label or a
  caption already says it, the slide does not say it again.
- **Short sentences, one idea each, everyday words.** *"7s is right. The letter never
  disappears."*, not *"Last lesson we stopped writing it, and nothing about that has
  changed; the only new thing is…"*
- **Cut the commentary.** Sentences that explain why the slide exists (*"Nobody in this
  room finds that hard"*, *"That is the whole point"*) belong in the teacher's plan, not on
  the projector.
- **Put words on the picture.** A label on the diagram beats a sentence beside it.
- **Eyebrows 2–5 words, captions one sentence, titles name the thing.**
- **The maths is the biggest thing on a problem slide.** Never leave the question in an
  eyebrow or a caption, where the back row cannot read it.
- **Keep all the content.** Tighter is not shorter-on-ideas: move a sentence into a label,
  a caption, a reveal or another slide rather than deleting it.

The plan (`plan.js`) is for the teacher and can say more. The slide cannot.

### Vote slides: left hand, right hand
When the class must choose between two answers, everyone votes **at once with one hand**:
left hand for A, right hand for B. It is quicker than two rounds of hands up, nobody can
copy a neighbour's vote after seeing it, and the split is visible in one glance.

The shape (Maths 2.3 slides 11 and 17):

- `layout: 'compare'` with **`text`**: the problem, printed as big as a statement slide
  (`text: 'Simplify $8s − s$'`).
- Column headings **`A · left hand up`** / **`B · right hand up`**, icon `Hand`, blue for A
  and orange for B.
- Each column is **one answer card and nothing else**: an `inlineSvg` with the answer huge
  beside a drawn hand (`ANS_*` in 2.3's `diagrams.js`: a left hand seen from behind on A, a
  right hand on B). No quotes, no captions.
- No answer anywhere on the slide. The next slide settles it.

### Mimic the Cambridge Learner's Book
Students have the book open next to them. When a slide uses the same visual language as
the page, they don't have to translate between two systems.

- **Solid colour header strip over a tinted body**: that's the book's box. Teal for
  sections, purple for activities, red for homework, green for plant-only, orange for the
  things they copy.
- **Key words in the book's orange**, printed bold inside the sentence, exactly where the
  book prints them.
- **Flat line art on white**, dark ink outlines, pale flat fills. No gradients, no drop
  shadows, no 3D.
- The palette lives in `CAMBRIDGE` and `NOTE_TONES` in
  `classroom/src/components/layouts/helpers.jsx`. Use those tokens; don't invent new hexes
  per lesson.

### Accent everything they have to write down
This is the single most important rule for the decks. A definition that looks like
discussion prose does not get copied into a notebook.

- Copy-down content goes in a **`write` note** (orange "Write This Down" panel) or an
  **orange `>` bumper**. Nothing else does.
- Discussion, context and narration stay as plain body text.
- Write the term as `**Term:** definition`: bold runs inside a note pick up that tone's
  key-word colour automatically.
- End the deck by telling them the count: *"your notebook should now have 13 definitions
  and 2 labelled drawings."* It turns a vague instruction into a checkable one.

### Don't overcrowd: prefer another slide
If a slide needs a scrollbar on a projector, it is two slides. Splitting is free; a cut-off
definition is not.

Concretely, in 1.1 the five plant-only organelles were one dense gallery. Split into *"What
holds a plant up"* and *"How a plant feeds itself"*, each gets a reason to exist and room
for a real micrograph. The deck went 17 → 22 slides and got easier to teach, not longer.

### Ask before you tell
Put the question on its own slide, with **no numbers on it**, before any slide that works it
out.

Slide 2 of Science 1.1 is only: *imagine one average cell in Mr Bowen's body magnified to
the size of a soda can: how big would Mr Bowen be?* plus his height. Pairs, no calculators.
Guesses go on the board. Slide 3 has the numbers. The gap between their guess and 10.68 km
**is** the lesson; showing the working first throws that away.

### Reveal a calculation one step at a time
Multi-step arithmetic on a slide is either spoiled (all visible) or unusable (all hidden).
Use a stepper widget: one line of the calculation per press, big numbers, teacher-paced, so
the class does each step on paper first.

See `ScaleChallengeWidget` in `classroom/content/y7-science/U01_1/widgets.jsx`: four
steps, a Back button, and nothing else to fiddle with. The current models are Science 2.5's
`HalvingWidget` and Maths 2.3's `Collect` (find → move → collect, one press each, with the
class saying the step before it is pressed).

### Three sources of imagery, each with a job

| Source | Use it for | How |
|---|---|---|
| **Authored SVG** (`diagrams.js`) | Teaching diagrams where you control exactly what is emphasised (isolates, light paths, process diagrams), and the book's own figures, redrawn | House style, §5 |
| **Openly-licensed photos** | The real phenomenon: what a cell actually looks like, the real instrument, the real place | Wikimedia Commons, PD/CC0/CC-BY/CC-BY-SA (§4) |
| **A crop of one book figure** | Only when Mr Bowen asks for the exact figure in the book (a Draw This target) | Crop the figure, never the page; credit it as not openly licensed (§4) |

Pair them where you can. A drawn chloroplast next to a photograph of real chloroplasts
teaches more than either alone. When a slide needs the book's figure, redraw it as SVG
first: it projects more sharply than a ~115 dpi scan, and it is ours to publish.

### Widgets: simple and useful, not clever
A widget earns its place by doing one thing a static slide cannot.

- No sliders, emoji or gimmicks unless the fiddling *is* the learning.
- **Highlighting must be unmissable.** In `CellExplorerWidget` the selected organelle
  keeps its colour and gains a halo plus a heavy outline while *everything else drops to
  flat grey*, and the part is named on the picture. A slightly thicker outline is not
  enough on a projector at the back of a room.
- Never hide the picture behind the interaction: the whole cell stays readable at all
  times.

---

## 2. Which layout for which teaching move

| Teaching move | Layout |
|---|---|
| Open the lesson; set the starter task | `hero` |
| Pose a question and stop | `statement` |
| Vote between two answers (left hand / right hand) | `compare` + `text` + one answer card per column (§1) |
| Explain with a diagram / run a widget beside the text | `split` |
| One big figure, especially a Draw This | `showcase` |
| Several photographs side by side | `showcase` with a wide SVG panel of `<image>`s (a `gallery` makes them thumbnails) |
| A vs B (animal vs plant, model vs real, word vs word) | `compare` |
| Quick-fire recall for the whole room | `game` (Symbol Snap in Maths 2.3, Like or Not?) |
| A set of terms, one picture each | `gallery` |
| Recap checklist | `stack` + `variant: 'checklist'` |
| Aside, cross-curricular link | `callout` |

---

## 3. Build order

1. **Read** [DECK-REFERENCE.md](DECK-REFERENCE.md), `STANDARD.md` and at least two of its
   decks, then Science 2.5 and Maths 2.3 for how few words a slide carries. Match their
   patterns and their density; don't invent parallel ones.
2. **Write the beat sheet first**: one line per slide, in teaching order, before any code.
   Mark which slides are questions, which are copy-down, and which are Draw This.
3. **Source the images** (§4) and record every one in `images/CREDITS.json` as you go, not
   afterwards.
4. **Author the diagrams** (§5).
5. **Write `slides.js`**, in every language from the start. Every Year 7 deck built since
   15 October 2026 is **English and French**: every string gets its `…Fr` twin inline and
   no `…Vn`, and `index.js` sets `meta.french: true` and `meta.vietnamese: false`. Decks
   built earlier keep their `…Vn` twins. Retro-fitting twins is worse than writing them
   inline.
6. **Write `plan.js`** so the teacher's plan matches the deck. A stale timeline is worse
   than none.
7. **List the lesson**: its line in `src/data/classroomLessons.js` (DECK-REFERENCE, "Add a
   lesson"), then `npm run check:lessons`. Without the line the deck does not open.
8. **Verify** (§6). Fix. Re-verify.
9. **Ship when Bowen asks**: commit only your own paths, deploy with `npm run deploy` (from
   a clean worktree when anyone else's work is in the folder: TRAPS.md, "Deploy"), and
   confirm the live site is serving the new bundle before calling it done.

---

## 4. Sourcing images

Everything goes in the lesson's `images/` folder and is **imported** in `slides.js`
(`import x from './images/x.jpg'`) so Vite hashes it and it works on the live site. Never
hand-write a `/public/...` path.

### Cropping a book figure

Only at Mr Bowen's instruction, and only the *figure*, never the page (see the box at the
top). Crop from the scan in its own folder and save only the crop into `images/`. On
Windows, `System.Drawing` is enough, no extra tooling:

```powershell
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile($Src)
$bmp = New-Object System.Drawing.Bitmap $W, $H
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = 'HighQualityBicubic'
$g.DrawImage($img, (New-Object System.Drawing.Rectangle 0,0,$W,$H),
             (New-Object System.Drawing.Rectangle $X,$Y,$W,$H), 'Pixel')
$bmp.Save($Dst, $codec, $ep)   # jpeg encoder, quality ~90
```

Crop, look at the result, adjust. Two passes is normal.

### Finding an openly-licensed photo

Search the Commons API, check the licence **before** downloading, and pull a sane size via
`iiurlwidth` rather than the full-resolution original:

```
https://commons.wikimedia.org/w/api.php?action=query&format=json
  &list=search&srsearch=<terms>&srnamespace=6

https://commons.wikimedia.org/w/api.php?action=query&format=json
  &prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=960&titles=File:<name>
```

Send a real `User-Agent`, and sleep about 1.5 s between calls: the API rate-limits fast and
returns HTML, not JSON, when it does (TRAPS.md, "Wikimedia returns HTTP 429").

Then downscale to ≤1200 px and re-encode at quality ~80. A detailed engraving at quality 92
can be 700 kB; the same image at 900 px/78 is 255 kB and looks identical on a projector.

### Licence hygiene

Every file gets an entry in `images/CREDITS.json` with `name`, `title`, `descUrl`,
`license`, `artist`. Prefer PD / CC0 / CC-BY / CC-BY-SA.

A crop from a book is copyrighted. Say so **explicitly** in its entry, licence
`"(c) <publisher> - NOT openly licensed"` plus a `usage` note, so a future reader knows it
needs replacing. Don't bury it. Five such crops came over with the older decks (Science 1.1
and 1.2, `lb-*.jpg`); they are candidates for redrawing.

---

## 5. Drawing diagrams

House style, all enforced by eye plus `node scripts/svg-audit.mjs`:

- **Open with a white plate** covering the viewBox. Then the artwork reads on a light *or*
  dark slide and never depends on the page's text colour.
- Dark ink outlines (`#2b2b2b`), pale flat fills, **labels in the book's orange
  (`#c25e12`) out in the margins** on thin leader lines with a dot on the end.
- Never put label text on top of the drawing.
- **Write `<text>` literally**: see the trap in §7.
- For "where is this part?" isolates: draw the whole cell ghost-grey and ink in only the
  named part. Students learn the location, not just the shape.

Render a contact sheet of every diagram and *look at it* before wiring them into slides.
Headless Chrome will do it (keep the sheet in your scratchpad):

```bash
chrome --headless=new --user-data-dir=<scratch>/chrome --screenshot=sheet.png --window-size=1500,1700 file:///<scratch>/sheet.html
```

This is how the ER labels-over-the-cell and the sideways microscope arrowheads were
caught; both passed the audit.

---

## 6. Verification

Nothing ships until all of these are clean (dev server running; `npm run dev` is port
5201):

```bash
npx eslint --no-ignore classroom/content/<course>/<slug>     # zero warnings
npm run check:lessons
npm run build
node scripts/svg-audit.mjs <course>     # diagram text fits its boxes and frame
node scripts/deck-check.mjs "http://localhost:5201/classroom/?demo#/lesson/<course>/<slug>"
```

`npm run lint` does not look at the lesson folders yet (TRAPS.md), hence the `eslint` line.

`deck-check` (`scripts/deck-check.mjs`) walks every slide in headless Chrome and reports
what the others cannot see: content overflowing a slide, images that failed to load, and
errors thrown while rendering. It found three real bugs that lint and build were happy
with.

### deck-check does not test the mode you teach in

`deck-check` measures the deck **windowed, at 1440×900**. The lesson is taught **full
screen, in project mode**, where every layout swaps to `clamp()` type that is roughly 40%
larger. A deck can be spotless in `deck-check` and still scroll on nine slides in front of
the class.

Check project mode separately, at the resolution the room actually has (1.2 was clean at
1920×1080 while still overflowing seven slides at 1366×768), and in **every language** the
deck offers: Vietnamese and French both run longer than English and fail different slides.
`deck-check` and the skill's `project-check.mjs` take `vn` or `fr` to walk the deck in that
language.

Three things make that harder than it looks:

- Project mode calls `requestFullscreen()`, which needs a **trusted user gesture**.
  `element.click()` from injected JS is not one: drive it with CDP
  `Input.dispatchMouseEvent` on the button's coordinates.
- Headless Chrome **ignores `--window-size`** for this; it reports 800×600 and every slide
  looks broken. Set the viewport with `Emulation.setDeviceMetricsOverride`, and set it
  **again after** entering full screen, which resets the override.
- Headless Chrome 157 **refuses fullscreen** even after that trusted click. The deck
  switches to display mode before it asks, so the skill's scripts accept
  `data-display-mode="on"` on the deck's root instead and say so in their log; at the
  emulated size the layout is the same.

Get a baseline from a deck that already teaches well before assuming a number is bad: 1.1
overflows one slide by 96 px at 1366×768 and is fine in the room.

Then check by eye, because these are visual artefacts:

- [ ] **Dark mode**, not just light: especially any text on a *fixed*-colour surface
- [ ] **French** (and Vietnamese on an older deck): toggle each and read a dense slide; both run longer than EN
- [ ] **Project mode** on the biggest slides (the **Full screen** button, or `F`)
- [ ] Every **Draw This** slide is actually drawable in the time you'd allow
- [ ] The **teacher's plan** matches the deck you just built (open it as the demo teacher)

When checking the **live** site (`https://learn.pra.edu.vn/classroom/?demo#/lesson/…`), let
images settle before judging: sample too early and every slide reports broken images that
are merely still downloading.

---

## 7. Traps that have already bitten

Each of these passed lint *and* build while being visibly broken. TRAPS.md has the full,
current list; these are the ones every deck meets.

**Tailwind only scanned the player.**
Lesson data carries Tailwind classes too (`color: 'bg-[#5c2483]'`), so the class was never
generated and the hero rendered white-on-white. The lesson folders are in the classroom
page's Tailwind glob now (`classroom/tailwind.deck.js`), and `HeroLayout` paints from an
inline style so it cannot fail silently again. → *If a colour "isn't applying", check which
directory the string lives in before debugging the component.*

**`svg-audit` only sees literal text.**
Labels emitted from a `${label(...)}` helper are invisible to it, so the audit reported "0
overflows" while checking **zero labels**. → *Write label `<text>` out literally; use helpers
only for shapes and leader lines.*

**`fill="currentColor"` in dark mode.**
Inherited near-black, on a dark panel. Invisible. → *Give diagrams their own white plate and
explicit fills; set an explicit text colour on any inline-SVG container.*

**Bold text on a surface that doesn't follow the theme.**
The hero's callout card is *always* white, but `parseInlineText` defaults bold to
`dark:text-slate-100`, so in dark mode the emphasised words went white-on-white. → *When the
surface is a fixed colour, pin the emphasis colour to the surface, not to the theme.*
`HeroLayout` now passes explicit `STRONG_ON_CARD` / `STRONG_ON_FIELD`.

**Layout heuristics keyed off the wrong number.**
The gallery chose its compact card by *item count*, so four cards in two columns still
overflowed. → *Key off what actually causes the overflow: rows.*

**Text that only renders sometimes.**
`compare` captions and `stack` checklist items printed literal `**asterisks**` because they
weren't passed through `parseInlineText`. → *Any author-facing string field must go through
it.*

**A `$` in body text ate the sentence.**
`parseInlineText` splits on `/(\$[\s\S]+?\$)/` to find KaTeX, so *any* two dollar signs on a
line become a maths span. Writing a currency amount, even the escaped `$\$20$`, printed a
stray backslash and swallowed the words between. → *Never put a `$` in prose. Write "20
dollars", and keep `$…$` for real maths.* Related: a lone signed number reads better as
plain text with a Unicode minus (`−5`) than as `$-5$`; save KaTeX for expressions that
actually have operators.

**Slide index carried across lessons.**
Navigating from one lesson URL straight to another kept the index, landing mid-deck and
crashing when the second deck was shorter. Fixed with a `key` on `<Deck>`.

**Runs of spaces collapse.**
`$4x + x = 5x$     $8s − s = 7s$` in a note, or `a   3x` in SVG `<text>`, renders as one
run-together line. → *Join with "and" or a comma. One answer per line in a reveal avoids it
but costs height: five lines pushed a reveal 73 px off the slide in project mode.*

**A `callout` prints `content` above its notes.**
A practice question in `content` appears before the rule it depends on. → *Put the question
in `reveal.prompt`, which renders above the reveal button.*

**A check that stops at a game slide and never opens a reveal** looks like a pass. → *Walk
the deck by clicking the last `<button>` (the deck's own Next) and open every reveal before
measuring, as `project-check.mjs` and `deck-shots.mjs` do with `REVEALS=1`. Maths 2.3 hid two
overflowing reveals this way.*

---

## 8. Definition of done

- [ ] `eslint` on the lesson folder, `check:lessons`, `build`, `svg-audit`, `deck-check` all clean
- [ ] Project mode clean at 1366×768 in every language, with and without `REVEALS=1`
- [ ] Every user-facing string has its `…Fr` twin (and a `…Vn` twin on a deck from before 15 October 2026); `slides-lint.mjs` is clean (`--no-vn` for an EN/FR deck), and `meta.french: true` (plus `meta.vietnamese: false` on a new deck) is set
- [ ] Light **and** dark checked by eye
- [ ] Read every slide against the exemplars: no sentence the class does not need
- [ ] Every copy-down item is in a `write` note or an orange bumper
- [ ] Every image is in `CREDITS.json` with an honest licence, and no book page is in the repo
- [ ] `plan.js` matches the deck, checked on the plan page
- [ ] The lesson's line is in `src/data/classroomLessons.js`
- [ ] When Bowen asks: committed (your paths only); deployed; **live bundle confirmed**

The Dashboard twin that this playbook used to describe (old §9) did not move: see
[NOT-MOVED.md](NOT-MOVED.md).

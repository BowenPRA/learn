# Deck reference

The field-and-layout reference for the classroom decks: every layout, every field,
the notes, the widgets and the plan. A deck is a folder of **data files** that the
deck player in `classroom/src/` turns into a projected slide deck with a language
switch (EN/FR, or EN/VN/FR on the older decks), KaTeX maths, interactive widgets,
clean SVG diagrams, a **Full screen** projector mode, dark mode and a printable
teacher's plan.

Adding a lesson means adding one folder of data and one line in a list. It inherits
all the polish.

**Writing a lesson?** Read [LESSON-PLAYBOOK.md](LESSON-PLAYBOOK.md) first: the design
principles, the build order and the traps. This file is the field reference; that one
is the method. [TRAPS.md](TRAPS.md) lists what goes wrong while every check passes.
How the classroom page itself is built (sign-in, the lesson list, lazy loading, the
plan page) is in [classroom/README.md](../classroom/README.md).

## Run it

```bash
npm install
npm run dev        # http://localhost:5201/  (another port: npx vite --port 5223 --strictPort)
npm run build      # all three pages (PRA Learn, /classroom/, /unit/) into dist/
npm run check:lessons
                   # the lesson list and the lesson folders agree (also in npm test)
node scripts/svg-audit.mjs [course]
                   # every diagram's text fits its boxes (npm run audit:svg)
node scripts/deck-check.mjs "http://localhost:5201/classroom/?demo#/lesson/y7-science/U03_4"
                   # walk every slide: overflow, broken images, errors
                   # (add `fr` or `vn` to walk it in that language, `dark` for dark mode)
                   # (npm run check:deck -- "<url>")
```

A deck opens at `/classroom/#/lesson/<course>/<slug>`, behind a PRA Learn sign-in.
On the dev server add `?demo` before the `#`:
`http://localhost:5201/classroom/?demo#/lesson/y7-science/U03_4`. In a browser you
then sign in to the demo on the PRA Learn page first ("Try as a student" or "Try as
Mr. David"); the check scripts do that themselves.

## How it is organised

```
classroom/
  content/
    courses.js              the courses (y7-math, y7-science): colour, icon, unit names
    registry.js             finds the lesson folders; loads one lesson when it is opened
    <course>/<slug>/
      index.js              default-exports { meta, slides, plan }
      slides.js             the deck (an array of slide objects)
      diagrams.js           inline SVG diagrams, referenced by key
      widgets.jsx           interactive React widgets for this lesson (any file names)
      plan.js               the teacher's plan (staff only)
      images/               photos, crops and film, with CREDITS.json
  src/
    components/Deck.jsx     the slide renderer (schema below)
    components/layouts/     one component per layout; helpers.jsx holds the palette
    components/RandomStudent.jsx
                            the one-press Pick button and the class list
    lib/lang.js             tr, field, deckLangs: the language switch
    lib/deckControls.js     widget buttons on the phone remote
    lib/mrBowen.js          the shared Mr Bowen cartoon for story strips
    lib/useDeckRemote.js    the laptop's end of the phone remote
    lib/remote/             bus, room code, QR and phone pieces
    remote/DeckRemote.jsx   the phone's screen, #/remote/<room>
    pages/Plan.jsx          the teacher's plan page, #/plan/<course>/<slug>
src/data/classroomLessons.js
                            the lessons PRA Learn shows (one line each)
```

## Add a lesson

1. Create `classroom/content/<course>/<slug>/index.js`. Name the folder like the
   others: `U05_3` for section 5.3.

   ```js
   import { slides } from './slides.js'
   import { plan } from './plan.js'

   export default {
     meta: { course: 'y7-math', unit: '5.3', id: 'U05_3',
             title: 'Drawing Lines and Quadrilaterals', order: 3,
             french: true, vietnamese: false },
     slides,
     plan,
   }
   ```

2. Add its line to `src/data/classroomLessons.js`, in teaching order: course, slug,
   PRA Learn class (`'math:Year 7'`, `'science:Year 7'`), unit, teacher
   (`'Mr. Bowen'`), and the title and subtitle exactly as in the deck's `meta`. A
   lesson with no line does not open: the classroom page sends the visitor to the PRA
   Learn home. `npm run check:lessons` fails when the list and the folders disagree.

3. Open it on the dev server: `/classroom/?demo#/lesson/<course>/<slug>`.

`french: true` adds FR to the deck's switch. Set it once every string in the lesson,
widgets included, has its `…Fr` twin. `vietnamese: false` takes VN off the switch.
Every Year 7 deck built since 15 October 2026 (Maths from Unit 4, Science from Unit 3)
sets `french: true, vietnamese: false` and writes no `…Vn` twins; the decks before it
keep EN / VN / FR. (`deckLangs` in `classroom/src/lib/lang.js` decides the switch.)
The Year 7 maths tasks (`T*` folders) are EN/VN only.

`classroom/content/registry.js` passes on only the `meta` fields it names. A new
`meta.foo` is dropped before the deck sees it (see TRAPS.md).

A new course also needs an entry in `classroom/content/courses.js`. Its `id` must match
the folder under `content/` and each lesson's `meta.course`; `units` names the textbook
units.

## Slide schema (`slides.js`)

Each slide is a plain object. Set **`layout`** to pick a shape. (A slide written
before `layout` existed carries a `type` instead (`intro`, `concept`, `warmup`,
`summary`) and is mapped onto the layout that replaced it: hero, split, split, hero.
A slide with neither renders a red "no layout" notice, not a blank card.)

### The layouts

| `layout` | Shape | Key fields |
|---|---|---|
| `hero` | Full-colour opener/closer | `color` (`bg-[#hex]`), `brand`, `eyebrow`, `date`, `icon`, `title`, `objective` **or** `subtitle`, `card` (white callout: `{icon,badge,text}`), `reveal` |
| `statement` | Big centred definition on a theme canvas | `accent` (hex), `eyebrow`, `title`, `label` (chip), `text` (the big line), `sub`, `reveal`, `notes` |
| `split` | Text + media panel | `accent`, `icon`, `title`, `content`, `notes`, `example`+`exampleLabel`, media (`widget`/`inlineSvg`/`image`), `side` (`'left'`\|`'right'`), `ratio` (40/45/50/55/60), `reveal`, `drawThis` |
| `showcase` | One media, edge-to-edge | `accent`, `icon`, `title`, `eyebrow`, media, `caption`, `drawThis` |
| `compare` | Two (or three) themeable columns | `title`, `text` (optional big problem line above the columns: use it on vote slides), `columns: [{heading, accent, icon, content, notes, inlineSvg\|image, caption}]` |
| `stack` | Grid of note cards / checklist | `accent`, `icon`, `title`, `content`, `columns` (1\|2), `notes`, or `variant:'checklist'` + `items` |
| `steps` | Numbered sequence | `accent`, `icon`, `title`, `content`, `steps: [{text}]`, optional side media, `reveal` |
| `callout` | Single accent "glass" card | `accent`, `icon`, `eyebrow`, `title`, `content`, `notes`, `reveal` |
| `game` | Full-bleed game board: no header, no padding | `widget` (gets `lang` **and** `isDisplayMode`) |
| `gallery` | Grid of picture + key word cards | `accent`, `icon`, `title`, `eyebrow`, `content`, `tone`, `columns` (2\|3\|4), `copy`/`copyLabel`, `items: [{inlineSvg\|image, term, text, tag}]` |

Not every layout reads every field: `showcase`, `compare` and `steps` drop a slide's
`notes`, and `showcase` and `compare` drop `reveal`, without an error. TRAPS.md
("Layouts and fields") has the full list.

Any field can be suffixed `…Vn` for the Vietnamese version and `…Fr` for the French
(e.g. `titleVn` / `titleFr`, `contentVn` / `contentFr`, and inside
`notes`/`columns`/`card`/`reveal`: `textVn`, `headingFr`, `answerVn`, …). A missing
twin falls back to English. The choosing is done by `tr` and `field` in
`classroom/src/lib/lang.js`.

### Shared pieces

- **`accent`**: a raw hex (e.g. `'#14b8a6'`) used for chips, borders and icons;
  theme-safe on light and dark. (`hero`/`showcase` title bars can also take a
  `color` like `'bg-[#hex]'`.)
- **`notes`**: typed "copy this" cards, drawn as Learner's Book panels (a solid
  colour header strip over a tinted body): `{ tone, text, badge?, icon? }`.
  Tones: `write` (orange: the copy-this-down panel), `task` (purple), `plant`
  (green), `homework` (red), `theory` (blue), `info` (teal). `badge: false` hides
  the strip. **Bold** runs inside a note pick up that tone's key-word colour, so
  writing `**Cell:** the smallest…` prints the term the way the book does.
- **`reveal`**: a click-to-reveal answer box: `{ label, prompt?, answer }`.
- **widgets**: a `widget` component is rendered with the deck's current language as
  a prop (`({ lang }) => …`, `'en' | 'vn' | 'fr'`), so its own buttons and labels
  follow the deck's language like the rest of the slide:
  `import { tr } from '../../../src/lib/lang.js'`, then `tr(lang, 'Back', null, 'Retour')`
  on an EN/FR deck (`tr(lang, 'Back', 'Lùi', 'Retour')` on an older EN/VN/FR one).
  Every widget also receives `isDisplayMode` for HTML type sizes. Ignore the props if
  the widget has no text of its own.
- **media**: `inlineSvg` (from `diagrams.js`), `widget` (a component), or `image`
  (import a file from the lesson's `images/` folder so Vite hashes it and it works on
  the live site; never hand-write a `/public` path). `drawThis` adds the amber "Draw
  This" badge; a caption sits under `showcase`/`compare` media.
- **`icon`**: a lucide name: `BookOpen`, `Microscope`, `Leaf`, `Boxes`, `Layers`,
  `Target`, `Scale`, `Users`, `Equal`, `AlertTriangle`, `ShieldCheck`, `Zap`,
  `Sparkles`, `CheckCircle2`, `GraduationCap`, `Telescope`, `ScanEye`, … Only the
  names in the `ICONS` map in `classroom/src/components/layouts/primitives.jsx` work;
  any other name silently becomes an info circle.

**Body markdown-lite** (`content`, note/step/reveal text): `**bold**`, `$inline$`
KaTeX maths, a line starting with `>` becomes an amber "write this down" note, blank
line = spacer. There is no italic.

> **`$$block$$` maths, `>` bumpers and blank-line spacers only work in a slide's
> `content`.** That field goes through `renderContent`, which understands them; note,
> step and reveal text go through `parseInlineText`, which does **not**: a `$$…$$`
> formula there prints as raw LaTeX on the slide, and none of the checks will notice.
> Use single `$…$` inside notes.

Real photos live in the lesson's `images/` folder with a `CREDITS.json` recording each
source and licence (see `classroom/content/y7-science/U01_1/images/`).

### Keys in a deck

| Key | Does |
|---|---|
| `→` `Enter` `PageDown` `Space` | next slide (a presenter clicker sends PageDown) |
| `←` `PageUp` | previous slide |
| `F` | full screen on / off; the **Full screen** button does the same |
| `R` | draw a random student (opens the class list if there is none yet) |
| `B` | blank the screen ("Eyes on Mr Bowen"); any key or a click brings the slide back |
| `Esc` | close an expanded picture, or leave full screen |

Full screen is what the class sees: no toolbars, type about 40% larger, the cursor
hidden after three idle seconds. Where a browser has no fullscreen API (an iPhone) the
same view opens windowed instead of doing nothing. Next on the last slide, and Back,
go to the PRA Learn home.

The class list behind `R` is kept in that browser only (per device); it never reaches
the repo or the database.

### Phone remote

**Phone remote** (the phone icon in the bottom bar or the projector dock) shows a QR
code and a four-letter room code. Scan it, and the phone
(`/classroom/#/remote/<room>`) turns the slides; swiping works too. It also switches
Full screen on and off. That is display mode only: a browser grants real fullscreen to
a click or key on the laptop and nothing else, so press **F11** on the laptop once (its
browser's own full screen) and display mode then fills the screen; the pairing panel
says so. It also jumps to any slide, opens and closes the answer box, switches the
language, picks a student (the name shows on the phone), blanks the screen, starts a
countdown in the corner of the projector, and presses the slide's widget buttons. For
staff it shows the slide's lines from `plan.js` as well: any timeline sentence that
starts "Slide 9:" and any answer whose `q` starts "Slide 9 —". A student's phone shows
no plan notes.

- **Widget buttons** reach the phone through the shared `Btn` and `GlassButton`
  (`classroom/content/y7-science/U03_models/ui.jsx`), which register with the slide
  (`classroom/src/lib/deckControls.js`). A widget with its own `<button>`s stays
  laptop-only; switching it to `Btn` is all it takes.
- **The connection** is Supabase realtime on The Current's project (free plan, shared
  with The Current), plus BroadcastChannel between windows of one browser. A deck
  opens nothing until the button is pressed, and loads the realtime code only then. It
  then stays on in that tab until the tab closes. The room code is kept in the
  laptop's localStorage, so one phone link works every lesson; **New code** locks out
  any phone holding the old one.
- **Budget:** the phone says hello every 10 seconds while its screen is on, and the
  laptop answers with the state: about 2,000 messages a lesson, roughly 90,000 a month
  at two lessons a day, under 5% of the free 2 million. The phone goes quiet when it
  locks and pauses after 20 minutes without a tap. Keep messages to ids, indexes and
  short strings.
- The laptop owns all the state (`classroom/src/lib/useDeckRemote.js`); the phone only
  asks (`classroom/src/remote/DeckRemote.jsx`). Staying awake, going quiet when locked
  or idle (`classroom/src/lib/remote/phone.js`) and the bottom sheet (`Sheet.jsx`) are
  shared pieces in `classroom/src/lib/remote/`.

Installing the remote on a phone's home screen as an app of its own, and the games'
phone screens, did not move: see [NOT-MOVED.md](NOT-MOVED.md).

### Games inside a deck

A `layout: 'game'` slide hands the whole slide to a widget (Symbol Snap in Maths 2.3,
for example). On a game slide the deck's Enter/arrow navigation is switched off, so
the keyboard belongs to the game; leave with the on-screen Next or Back. The separate
games course (Jeopardy, Word Wall, Around the World, Guess Who) and its question banks
did not move.

### Drawing diagrams

House style (see `classroom/content/y7-science/U01_1/diagrams.js`): open every diagram
with a white plate `<rect>` so it stays legible on light *and* dark slides, outline
shapes in dark ink with flat pale fills, and set labels in the book's orange
(`#c25e12`) out in the margins on a thin leader line.

Write label `<text>` **literally** in the template string, and keep every diagram with
text as an UPPER_CASE `KEY: \`…\`` entry in `diagrams.js` (or an `inlineSvg:` block in
`slides.js`). The audit only sees raw text in those blocks: anything produced by a
`${helper(...)}` call is invisible to it, so a helper that emits `<text>` silently opts
out of checking.

Run `node scripts/svg-audit.mjs <course>` after editing any diagram. A lesson is not
done until it is clean. Its last line says how many labels it measured; a count far
below the diagram count means it is not seeing your text.

## Teacher's plan (`plan.js`)

The teacher's one-pager, for staff only. Staff (a PRA Learn staff login, or "Try as
Mr. David" in the demo) see the deck's plan button, which opens
`/classroom/#/plan/<course>/<slug>`, a page they can print
(`classroom/src/pages/Plan.jsx`). Students never get the button, and the plan address
sends them to the PRA Learn home. It is hidden on screen, not on the network: the plan
is part of the lesson's code, so never put anything in it that must stay secret.

The shape, as in `classroom/content/y7-science/U02_5/plan.js`: `duration`,
`objective`, `materials[]`, `vocab: [{ term, def }]`, `timeline: [{ time, phase,
detail }]`, `answers: [{ q, a }]`, `notes`, and optionally `print: [{ label, href,
note }]` (files to print for the lesson, each imported with `?url` so Vite
fingerprints it; links on screen, hidden on the printed sheet). Other field names print
blank sections, and no deck check opens the plan: open it yourself before shipping.
The printed homework packets that `print` used to link to did not move
([NOT-MOVED.md](NOT-MOVED.md)).

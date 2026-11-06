# Making a PRA Learn pack from a classroom lesson

For the operator (Claude in pra-triage, or whoever builds a teacher's lesson). A pack is
one lesson's student material: a **review** (the deck's slides, with check questions) and
**practice** parts (step-by-step problems on the step engine). The format is in
[DESIGN.md](DESIGN.md) section 7. This page is how to make one.

Worked example: Mr. David's Year 5 Maths lesson *Below Zero in Words* →
`packs/y5-math-u5-below-zero/` (the overlay is the input; `pack.json`, `assets/` and
`convert-log.txt` are what the script made). It is the fourth pack in demo mode.

## 1. What you need

- The lesson folder in a classroom repo: `content/<course>/<unit>/` with `index.js`,
  `slides.js`, `diagrams.js`, `images/CREDITS.json`, and ideally `problem-bank.md`.
- The classroom app running from **the same commit**, for widget stills. Either pass
  `--server <url>` (for example the y5 worktree on `http://localhost:5197/classroom/`), or
  leave it out and the script starts `npx vite --port 5203 --strictPort` in the deck's
  repo and stops it at the end.
- Chrome (`C:/Program Files/Google/Chrome/Application/chrome.exe`, or set `CHROME`).
  Headless, its own profile, debugging port 9497 (`CDP_PORT` to change).

## 2. Commands

```sh
# 1. A first run with no overlay: see what converts and what needs a hand
node scripts/deck-to-pack.mjs <lesson folder> --out <scratch folder> --server <url>

# 2. Write packs/<slug>/overlay.mjs (section 3), then build the pack
node scripts/deck-to-pack.mjs <lesson folder> --overlay packs/<slug>/overlay.mjs --server <url>

# 3. The portal's own check (the script runs it too; the publisher runs it again)
npm run check:pack packs/<slug>/pack.json

# 4. Look at it as a child and as the teacher (demo mode; section 5)
npm run dev                                   # port 5201
node scripts/pack-walk.mjs <slug> [outDir]    # screenshots + checks, default shots/<slug>
```

The Year 5 example:

```sh
node scripts/deck-to-pack.mjs C:/Users/sbowe/code/wt-y5eng/content/y5-math/U05_L3 \
  --overlay packs/y5-math-u5-below-zero/overlay.mjs --server http://localhost:5197/classroom/
```

The script prints one line per slide (kept, dropped, what changed), then **Did not
convert** and **For the operator to look at**. The same text is saved as
`convert-log.txt` beside the pack. It exits 1 if the pack has errors.

## 3. What the script does by itself

| In the deck | In the pack |
|---|---|
| The nine layouts, text, notes, inline SVG from `diagrams.js` | Kept as they are. |
| `layout: 'game'` | Dropped (listed under "Did not convert"). |
| `drawThis`, `plan`, speaker fields, `color`, `brand`, `date` | Dropped. |
| An inline SVG with photos in it (`<image href>`) | Drawn in headless Chrome to one JPEG (`sNN-photo.jpg`); the portal's SVG cleaner would remove `<image>`. Credits from `CREDITS.json`, shown under the picture. |
| `image` (a file) | Copied into `assets/` with its credit. |
| `widget` | A PNG of its **first state**, cropped to its drawing (`sNN-<widget>.png`). |
| A vote: a compare slide with columns "A · …", "B · …", and the next slide says "Answer: X" | A check question. Options are the columns' words; the right answer is the deck's; the explanation is the next slide's "X is wrong" note, or its write note. When the two answers are drawings with the same words, the drawings stay on the slide as "Picture A" / "Picture B". |
| Eyebrows for the class: "Vote with one hand", "Whiteboards", "Talk to your partner", "Say it first", "A game · everyone stands", "Exit question", "Before you leave", "Today" | "Choose", (the rest of the line) or "Your turn", "Think", "Watch", "Think", "Last question", "Before you finish", "This lesson". |
| `reveal` on a slide with no check | Kept as a "Show me" box (not scored). |
| `reveal` on a slide that gets a check | Dropped (its answer goes in the check's explanation), unless `keepReveal`. |

Pack defaults: slug `<course>-<unit>`, class from the course (`y5-math` → `math:Year 5`),
title from the deck, `langs: ["en"]`, `request_id: null`, `from.deck` =
`classroom@<commit>:<folder>` (`+changes` when the folder has uncommitted edits).

## 4. The overlay (`packs/<slug>/overlay.mjs`)

A JavaScript module, so practice items can draw figures with the engine's helpers.

```js
import { SAMPLE_SETS } from '../../src/stepPractice/samples/index.js'
import { numberLine } from '../../src/stepPractice/samples/figures.js'
export default {
  slug: 'y5-math-u5-below-zero', class_key: 'math:Year 5', title: 'Below Zero in Words',
  teacher: 'Mr. David', unit: 'Unit 5', langs: ['en'], request_id: null,
  slides: {                       // keyed by the DECK's slide number (1 = first)
    3: { widget: 'image', alt: '…', patch: { caption: '…' },
         check: { q: '…?', options: ['2', '*−2', '−10'], exp: '…' } },   // * marks the right one
    4: { drop: 'why it goes' },
    7: { check: { merge: true, exp: '…' } },     // edit a vote's automatic check
    9: { keepReveal: true, patch: { reveal: { label: 'Check b and c', answer: '…' } }, check: { … } },
    13: { widget: 'check', patch: { layout: 'callout', … }, check: { … } },
  },
  practice: [
    { id: 'practice', title: '…', titleVn: '…', set: SAMPLE_SETS.y5maths },
    { id: 'words', title: '…', set: { title: '…', signed: true, items: [ … ] } },
  ],
}
```

- `patch` replaces fields (deep for objects); `null` removes one.
- `widget`: `'image'` (default, the first-state still), `'check'` (no picture; the slide
  becomes what `patch` and `check` say), `'drop'`.
- `alt` is the picture's alt text (widget still or photo); `alts: [..]` for columns.
- Check ids are `c<deck slide number>`, so they stay the same when you rebuild. If the deck
  gains or loses slides before a pack is re-published, give `check.id` by hand to keep
  children's results attached.
- Practice items are the step-practice schema (DESIGN.md 7.3, `docs/step-practice.md` on
  the engine branch). The script runs the engine's checker on them.

### Writing the checks

- **6 to 10 checks**, on the slides where the class was asked something (votes, reveals,
  the starter, the exit question). Use the deck's own questions and answers (its reveals,
  the plan's answer list).
- Wrong options are the real slips the deck or the problem bank names: the minus sign
  dropped, the gap instead of the answer, adding when the word means down. Never silly
  options.
- Simple English: short sentences, one idea each, the lesson's own words. The English is
  these children's barrier, not the maths.
- `exp` is shown after a right answer and after a wrong one, so write it as the reason the
  right answer is right (and, if useful, why the usual wrong one is wrong).
- Rewrite anything that only works in the room: whiteboards, partners, standing, "say it",
  "the class". The script lists the words it still finds.
- A check's `q` should make sense alone: the teacher sees it without the slide under
  "Most missed".

## 5. What to check by eye

`pack-walk.mjs` answers every check (one wrong first), solves every practice item from the
pack's own answers (one slip typed on purpose), opens every Show me box, and takes
screenshots at 1280×800 and 390×844 of every slide, the practice screens, My results, the
class page and Most missed. It fails on sideways scroll, SVG text under 9 px, a picture
that did not load or has no alt, a wrong answer marked right, or a page error. Then look:

- [ ] Every widget still: does the first state make sense to a child alone? (A story
      widget's first panel with three empty "?" panels does not; use `widget: 'check'`.)
- [ ] Photo text on the phone: words inside a photo SVG are small at 390 px; the caption
      or the check must not depend on reading them.
- [ ] Each check: the right answer is right, the explanation reads well after a wrong
      answer, the question makes sense alone.
- [ ] No class instructions left (whiteboards, partners, "everyone stands").
- [ ] Practice: the first item of each level, a slip message, the done card.
- [ ] The class page: part names ("Practice 1", "Practice 2") and Most missed.
- [ ] No student names or photos of students anywhere in the pack.

## 6. Known limits of the converter

- Widgets are pictures of their first state only. Steppers, stories and games lose what
  made them worth a widget; a still with "Say it first" or "Arms up" in it needs a
  check instead.
- A check has text options only. Picture answers are kept on the slide and named
  "Picture A / B".
- Activities for the room (rulers held by three students, whiteboards, standing games) are
  listed, not rewritten: the overlay must rewrite or drop them.
- Reveals with several answers (a, b, c) become one check plus a Show me box for the rest.
- French twins (`…Fr`) are kept but the portal shows English and Vietnamese only.
  Vietnamese twins are carried over when the deck has them.
- `$$…$$` maths is not drawn by the portal (the script lists it).
- Widgets inside columns or gallery items are removed (listed).
- The icons the portal knows are in `src/components/ui.jsx` (`ICONS`); an unknown name
  draws a sparkle.
- The pack is built from the files on disk. If the deck's folder has uncommitted changes,
  `from.deck` says `+changes`: rebuild once the deck is committed.

### Second test: Year 7 Maths `content/y7-math/U05_2` (no overlay)

26 slides in, 26 out, 2 automatic checks (both votes with picture answers), 7 assets
(4 widget stills, 3 photo SVGs), passes the checks with one warning (fewer than 3 checks).
Not converted well: the ShelfStory still is one panel and three empty ones; the EqualOrNot
still says "Everyone answers at once. Wrong? Sit down."; slides 12 and 23 have tasks for
groups of students; slides 3, 13 and 16 keep "press", "Say the", "Arms up"; there is no
practice part (no problem bank in that folder). An overlay like the Year 5 one would fix
all of these.

## 7. Then

Publishing is the operator's script (DESIGN.md 7.6): `check:pack`, upsert `learn_packs`
as a draft, upload `assets/*` to `learn-packs/<pack id>/`, write the links on the
request. In demo mode a pack is shown by importing its `pack.json` in
`src/lib/demo/backend.js` (its `assets/` are picked up from `packs/*/assets/`).

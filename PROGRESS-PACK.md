# PRA Learn: lesson pack from a classroom deck (progress)

Started 2026-11-05 (Claude, Bowen away). Brief: turn Mr. David's Year 5 Maths lesson
(classroom `content/y5-math/U05_L3`, branch feat/y5-math-pilot) into a PRA Learn pack,
make it repeatable (`scripts/deck-to-pack.mjs`), show it in demo mode, write docs/PACKS.md.
Local only: no push, deploy, SQL or email. The y5 worktree is read only.

## Decisions (for Bowen)
- English only (`langs: ["en"]`): the Year 5 Maths course is `bilingual: false` and the
  English of the questions is what the lesson teaches. The players show an English-only
  pack in English whatever the child's switch says (the 12 engine items keep their Vn
  twins in the data, unused).
- The converter is mechanical plus a per-lesson **overlay** (`packs/<slug>/overlay.mjs`)
  that the operator writes: check questions on reveal slides, rewrites of teacher-only
  words, which slides to drop, alt text, and the practice parts. Votes whose next slide
  says "Answer: X" become checks automatically, with the deck's own answer and its
  "X is wrong" note as the explanation.
- Inline SVGs that hold photos (`<image href>`) are drawn in headless Chrome to one JPEG
  asset each (the portal's SVG cleaner removes `<image>`), with the photos' credits.
- Two practice parts, not one long one: the engine's 12-item set ("Step by step") and
  9 new items from the problem bank ("Word problems"). The engine's own guide says 9-12
  items a set; 21 in one sitting is too long for a 10-year-old.
- Added as a fourth demo pack (the hand-made one stays: tests import it).

## Log (5 Nov 2026)
- [x] Loader: Vite SSR with stubs (scripts/lib/load-deck.mjs); widgets become markers,
      pictures asset-file: paths. Headless Chrome helper scripts/lib/cdp.mjs (port 9497).
- [x] scripts/deck-to-pack.mjs + packs/y5-math-u5-below-zero/overlay.mjs: 22 slides from
      23, 10 checks, 3 assets (lift still, two photo SVGs drawn to JPEG), 126 kB.
- [x] 9 new practice items (problem bank T1, T2, T3; 3 focus, 3 practice, 3 challenge),
      engine checker passing; part "words" beside the 12-item set (part "practice").
- [x] Portal: reveals on hero, statement, split, steps; statement notes; photo credits and
      alt text from the pack's assets list (alt was always empty before); English-only
      packs shown in English without the switch; 49 more deck icons; class page names
      "Practice 1 / 2" and previews open the right part; wide minus sign (Poppins draws
      U+2212 as short as a hyphen); demo pack 4 with its pictures.
- [x] scripts/pack-walk.mjs: review (every slide, every check, Show me boxes), both
      practice parts solved from the pack's answers + one slip, My results, class page,
      Most missed, at 1280x800 and 390x844. Passes; screenshots looked at and fixed
      (a.m. split, minus, photo spacing on phones, Show me after the table, wording).
- [x] Second test y7-math U05_2: 26/26 slides, 2 picture votes -> checks, 7 assets;
      limits in docs/PACKS.md section 6.
- [x] docs/PACKS.md; lint, build, test (30) pass; scripts/demo-flow.mjs still passes.

## Left
- [ ] Bowen/Mr. David: read the 10 checks and 9 new items (simple English, right answers).
- [ ] Rebuild the pack when the y5 deck is final (built from b90a8d0 with the other
      agent's plan.js edits on disk; plan.js is not read).
- [ ] The demo pack JSON is in the main bundle (+~30 kB gzip): lazy-load demo mode later.
- [ ] Year 7 deck: an overlay if Bowen wants that pack.

// content/y7-science/U01_4/diagrams.js
// Teaching diagrams for 1.4 Cells, tissues and organs — same house style as
// 1.1-1.3 so the whole unit reads as one book: flat line art on paper-white, a
// thin ink outline on every shape, pale flat fills, and key words set in the
// Learner's Book orange out in the margin on a hairline leader line.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so artwork is legible on a light
//    OR dark slide and never depends on the page's text colour;
//  · label <text> is written out literally (never built by a helper) so
//    `npm run audit:svg` can actually measure it;
//  · label text lives in the margins, never on top of the drawing.
//
// The organelle colours are the ones from 1.1-1.3: purple nuclei, orange cell
// walls, pale blue cytoplasm, green chloroplasts. A ciliated cell drawn here is
// the same ciliated cell they met last lesson, in the same colours — that
// recognition is what carries the class from ONE cell to a SHEET of them.

const INK = '#2b2b2b'
const KEY = '#c25e12' // the book's key-word orange
const LEAD = '#7c8a95'
const GHOST = '#dfe5ea' // the greyed-out body, when only one system is inked in
const GHOST_S = '#c2ccd4'

const WALL_F = '#f9dcc4', WALL_S = '#e07b39'
const CYTO_F = '#eaf0f8', MEMB_S = '#8fa6c4'
const NUC_F = '#9b7fc4', NUC_S = '#6f52a0'
const CHL_F = '#5aab4e', CHL_S = '#3a7d31'
const SPONGE_F = '#f3e6c8', SPONGE_S = '#c8a555'
const SKIN_F = '#f6e3d5', SKIN_S = '#c99a7a'
const LUNG_F = '#f2c9d2', LUNG_S = '#c2185b'
const HEART_F = '#e8747f', HEART_S = '#a3122b'
const GUT_F = '#f4d9a8', GUT_S = '#c07a1e'
const BRAIN_F = '#d9c4ea', BRAIN_S = '#8c6bb1'
const AIR = '#3d8fc4' // the air passages of the respiratory system

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A leader line from a label to the thing, ending in a small dot. */
const lead = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${LEAD}" stroke-width="1.6"/>
    <circle cx="${x2}" cy="${y2}" r="3.2" fill="${LEAD}"/>`

/** One ciliated cell: a tall box, a purple nucleus, a fringe of cilia on top. */
const ciliatedCell = (x, y, w, h, fill = CYTO_F, stroke = MEMB_S) => {
  let hairs = ''
  for (let i = 0; i < 6; i++) {
    const hx = x + 5 + (i * (w - 10)) / 5
    hairs += `<path d="M ${hx} ${y} l ${(i - 2.5) * 2.4} -${18 + (i % 2) * 5}" fill="none" stroke="${stroke}" stroke-width="2.6" stroke-linecap="round"/>`
  }
  return `${hairs}<path d="M ${x} ${y} q ${w / 2} -6 ${w} 0 l 0 ${h} q -${w / 2} 6 -${w} 0 Z" fill="${fill}" stroke="${stroke}" stroke-width="2.6"/>
    <ellipse cx="${x + w / 2}" cy="${y + h * 0.6}" rx="${w * 0.22}" ry="${h * 0.16}" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2"/>`
}

/** A chloroplast: green oval with two darker grana bands. */
const chloro = (x, y, r = 7) =>
  `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.5}" fill="${CHL_F}" stroke="${CHL_S}" stroke-width="1.6"/>`

/**
 * The head-and-torso silhouette every human diagram is built on: centred on
 * x=200, head at y≈16-108, torso from y=126 down to y=396. Long enough that the
 * five organs of the starter answer (brain, lungs, heart, stomach, intestines)
 * each get their own band instead of piling up in the chest — the first draft
 * stopped at y=344 and the gut had 28px to live in.
 */
const bodyOutline = (fill, stroke, sw = 3) =>
  `<ellipse cx="200" cy="62" rx="40" ry="46" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>
    <path d="M 186 100 h 28 v 26 q 48 6 54 48 l 4 66 l -14 156 q -58 14 -116 0 l -14 -156 l 4 -66 q 6 -42 54 -48 v -26 Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`

/** The pair of lungs, sitting inside that torso. Drawn once, used three times. */
const lungs = (sw = 3) =>
  `<path d="M 194 176 q -30 6 -34 44 q -4 42 16 48 q 16 4 18 -20 Z" fill="${LUNG_F}" stroke="${LUNG_S}" stroke-width="${sw}"/>
    <path d="M 206 176 q 30 6 34 44 q 4 42 -16 48 q -16 4 -18 -20 Z" fill="${LUNG_F}" stroke="${LUNG_S}" stroke-width="${sw}"/>`

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // The starter's answer sheet. The Learner's Book "Getting started" on p.22
  // asks the class to draw a body outline and label brain, heart, stomach,
  // intestine and lungs — this is what a good one looks like, shown only AFTER
  // they have had a go. Head and torso only: with legs on it, the organs would
  // be too small to read from the back of the room.
  // ───────────────────────────────────────────────────────────────────────────
  HUMAN_ORGANS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 420" class="w-full h-full">
    ${plate(700, 420)}

    <g transform="translate(150,0)">
      ${bodyOutline(SKIN_F, SKIN_S)}

      <path d="M 170 60 q -10 -22 10 -26 q 8 -14 20 -6 q 12 -8 20 6 q 20 4 10 26 q 6 18 -12 22 q -14 8 -18 -2 q -4 10 -18 2 q -18 -4 -12 -22 Z" fill="${BRAIN_F}" stroke="${BRAIN_S}" stroke-width="2.4"/>
      <path d="M 200 36 v 48 M 184 46 q 10 8 0 16 M 216 46 q -10 8 0 16" fill="none" stroke="${BRAIN_S}" stroke-width="1.8"/>

      ${lungs(2.6)}

      <path d="M 210 262 q -22 -14 -22 -30 q 0 -12 11 -12 q 8 0 11 8 q 3 -8 11 -8 q 11 0 11 12 q 0 16 -22 30 Z" fill="${HEART_F}" stroke="${HEART_S}" stroke-width="2.4"/>

      <path d="M 200 278 q -26 2 -30 24 q -4 24 12 32 q 20 8 30 -8 q 8 -14 2 -26 q -6 -14 -14 -22 Z" fill="${GUT_F}" stroke="${GUT_S}" stroke-width="2.6"/>

      <path d="M 164 388 v -42 q 0 -12 12 -12 h 48 q 12 0 12 12 v 42" fill="none" stroke="${GUT_S}" stroke-width="10" stroke-linecap="round"/>
      <path d="M 178 354 q 12 -8 22 2 q 10 10 22 2 M 178 370 q 12 -8 22 2 q 10 10 22 2 M 178 386 q 12 -8 22 2 q 10 10 22 2" fill="none" stroke="${GUT_S}" stroke-width="5" stroke-linecap="round"/>
    </g>

    ${lead(262, 58, 322, 58)}
    ${lead(262, 214, 328, 220)}
    ${lead(262, 298, 332, 300)}
    ${lead(448, 250, 358, 254)}
    ${lead(448, 368, 392, 368)}

    <text x="254" y="64" font-family="${FONT}" font-size="18" font-weight="bold" fill="${KEY}" text-anchor="end">brain</text>
    <text x="254" y="220" font-family="${FONT}" font-size="18" font-weight="bold" fill="${KEY}" text-anchor="end">lungs</text>
    <text x="254" y="304" font-family="${FONT}" font-size="18" font-weight="bold" fill="${KEY}" text-anchor="end">stomach</text>
    <text x="458" y="256" font-family="${FONT}" font-size="18" font-weight="bold" fill="${KEY}" text-anchor="start">heart</text>
    <text x="458" y="374" font-family="${FONT}" font-size="18" font-weight="bold" fill="${KEY}" text-anchor="start">intestines</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The hook. ONE ciliated cell, alone in a very large empty field — the class
  // met this exact cell last lesson, so they recognise it instantly. There is no
  // text on it at all, because the question ("would one of these keep your lungs
  // clean?") is on the slide and the answer must not be anywhere near it. The
  // emptiness IS the argument.
  // ───────────────────────────────────────────────────────────────────────────
  ONE_CILIATED_CELL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 280" class="w-full h-full">
    ${plate(700, 280)}
    ${ciliatedCell(316, 70, 68, 164)}
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Ciliated epithelium (Learner's Book p.23) — the animal tissue. The same cell
  // as the hook slide, now repeated eight times, shoulder to shoulder, every
  // cilium leaning the same way. That is the whole definition of a tissue in one
  // picture: many cells of the SAME kind, joined together, doing ONE job.
  // ───────────────────────────────────────────────────────────────────────────
  CILIATED_EPITHELIUM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" class="w-full h-full">
    ${plate(700, 320)}

    ${ciliatedCell(60, 110, 48, 150)}
    ${ciliatedCell(108, 110, 48, 150)}
    ${ciliatedCell(156, 110, 48, 150)}
    ${ciliatedCell(204, 110, 48, 150)}
    ${ciliatedCell(252, 110, 48, 150)}
    ${ciliatedCell(300, 110, 48, 150)}
    ${ciliatedCell(348, 110, 48, 150)}
    ${ciliatedCell(396, 110, 48, 150)}

    ${lead(500, 74, 300, 88)}
    ${lead(500, 158, 330, 150)}
    ${lead(500, 216, 372, 200)}
    ${lead(280, 296, 180, 240)}

    <text x="514" y="80" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">cilia (tiny hairs)</text>
    <text x="514" y="164" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">cytoplasm</text>
    <text x="514" y="222" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">nucleus</text>
    <text x="290" y="302" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">one cell — and there are millions</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Onion epidermis (Learner's Book p.23) — the plant tissue, so the class sees
  // that "tissue" is not a human word. Thick orange cell walls, pale cytoplasm,
  // one purple nucleus per cell, packed edge to edge with no gaps: this is the
  // thin skin covering each layer inside an onion.
  // ───────────────────────────────────────────────────────────────────────────
  ONION_EPIDERMIS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 320" class="w-full h-full">
    ${plate(700, 320)}

    <path d="M 40 46 h 424 v 226 h -424 Z" fill="${WALL_F}" stroke="${WALL_S}" stroke-width="3"/>

    <path d="M 52 60 q 58 -5 116 1 q 5 26 -1 52 q -58 5 -116 -1 q -5 -26 1 -52 Z" fill="${CYTO_F}" stroke="${WALL_S}" stroke-width="2.2"/>
    <path d="M 180 62 q 64 -6 128 0 q 6 25 0 50 q -64 6 -128 0 q -6 -25 0 -50 Z" fill="${CYTO_F}" stroke="${WALL_S}" stroke-width="2.2"/>
    <path d="M 320 58 q 66 -4 132 2 q 4 27 -2 54 q -66 4 -132 -2 q -4 -27 2 -54 Z" fill="${CYTO_F}" stroke="${WALL_S}" stroke-width="2.2"/>

    <path d="M 52 128 q 71 -6 142 0 q 6 27 0 54 q -71 6 -142 0 q -6 -27 0 -54 Z" fill="${CYTO_F}" stroke="${WALL_S}" stroke-width="2.2"/>
    <path d="M 206 130 q 58 -5 116 1 q 5 26 -1 52 q -58 5 -116 -1 q -5 -26 1 -52 Z" fill="${CYTO_F}" stroke="${WALL_S}" stroke-width="2.2"/>
    <path d="M 334 126 q 59 -4 118 2 q 4 27 -2 54 q -59 4 -118 -2 q -4 -27 2 -54 Z" fill="${CYTO_F}" stroke="${WALL_S}" stroke-width="2.2"/>

    <path d="M 52 198 q 64 -5 128 1 q 5 25 -1 50 q -64 5 -128 -1 q -5 -25 1 -50 Z" fill="${CYTO_F}" stroke="${WALL_S}" stroke-width="2.2"/>
    <path d="M 192 200 q 67 -6 134 0 q 6 26 0 52 q -67 6 -134 0 q -6 -26 0 -52 Z" fill="${CYTO_F}" stroke="${WALL_S}" stroke-width="2.2"/>
    <path d="M 338 196 q 57 -4 114 2 q 4 26 -2 52 q -57 4 -114 -2 q -4 -26 2 -52 Z" fill="${CYTO_F}" stroke="${WALL_S}" stroke-width="2.2"/>

    <ellipse cx="105" cy="86" rx="15" ry="12" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2"/>
    <ellipse cx="240" cy="84" rx="15" ry="12" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2"/>
    <ellipse cx="390" cy="88" rx="15" ry="12" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2"/>
    <ellipse cx="118" cy="156" rx="15" ry="12" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2"/>
    <ellipse cx="260" cy="158" rx="15" ry="12" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2"/>
    <ellipse cx="393" cy="152" rx="15" ry="12" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2"/>
    <ellipse cx="112" cy="224" rx="15" ry="12" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2"/>
    <ellipse cx="256" cy="226" rx="15" ry="12" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2"/>
    <ellipse cx="392" cy="222" rx="15" ry="12" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2"/>

    ${lead(500, 70, 458, 90)}
    ${lead(500, 152, 400, 154)}
    ${lead(500, 228, 428, 232)}

    <text x="514" y="76" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">cell wall</text>
    <text x="514" y="158" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">nucleus</text>
    <text x="514" y="234" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">cytoplasm</text>
    <text x="245" y="300" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">every cell the same kind, joined edge to edge</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // A leaf, cut open (Learner's Book p.24) — the ORGAN slide's picture. Four
  // different tissues stacked in one organ, and they must look different from
  // each other or the point is lost: flat brick epidermis top and bottom, tall
  // green columns for the palisade layer, loose round cells with air gaps for
  // the spongy layer. The palisade cells are the ones they drew last lesson.
  // ───────────────────────────────────────────────────────────────────────────
  LEAF_SECTION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 380" class="w-full h-full">
    ${plate(720, 380)}

    <path d="M 40 46 h 420 v 42 h -420 Z" fill="${CYTO_F}" stroke="${MEMB_S}" stroke-width="2.6"/>
    <path d="M 100 46 v 42 M 160 46 v 42 M 220 46 v 42 M 280 46 v 42 M 340 46 v 42 M 400 46 v 42" fill="none" stroke="${MEMB_S}" stroke-width="2"/>

    <path d="M 40 88 h 420 v 116 h -420 Z" fill="${WALL_F}" stroke="${WALL_S}" stroke-width="2.6"/>
    <path d="M 92 88 v 116 M 144 88 v 116 M 196 88 v 116 M 248 88 v 116 M 300 88 v 116 M 352 88 v 116 M 404 88 v 116" fill="none" stroke="${WALL_S}" stroke-width="2.2"/>
    ${chloro(66, 112)}${chloro(66, 156)}${chloro(66, 190)}
    ${chloro(118, 116)}${chloro(118, 160)}${chloro(118, 192)}
    ${chloro(170, 110)}${chloro(170, 154)}${chloro(170, 190)}
    ${chloro(222, 118)}${chloro(222, 158)}${chloro(222, 192)}
    ${chloro(274, 112)}${chloro(274, 152)}${chloro(274, 190)}
    ${chloro(326, 116)}${chloro(326, 160)}${chloro(326, 192)}
    ${chloro(378, 110)}${chloro(378, 156)}${chloro(378, 190)}
    ${chloro(430, 118)}${chloro(430, 154)}${chloro(430, 192)}

    <path d="M 40 204 h 420 v 106 h -420 Z" fill="#ffffff" stroke="${SPONGE_S}" stroke-width="2.6"/>
    <ellipse cx="76" cy="234" rx="28" ry="20" fill="${SPONGE_F}" stroke="${SPONGE_S}" stroke-width="2.2"/>
    <ellipse cx="150" cy="226" rx="26" ry="19" fill="${SPONGE_F}" stroke="${SPONGE_S}" stroke-width="2.2"/>
    <ellipse cx="228" cy="238" rx="30" ry="21" fill="${SPONGE_F}" stroke="${SPONGE_S}" stroke-width="2.2"/>
    <ellipse cx="308" cy="226" rx="26" ry="19" fill="${SPONGE_F}" stroke="${SPONGE_S}" stroke-width="2.2"/>
    <ellipse cx="386" cy="236" rx="29" ry="20" fill="${SPONGE_F}" stroke="${SPONGE_S}" stroke-width="2.2"/>
    <ellipse cx="110" cy="286" rx="27" ry="19" fill="${SPONGE_F}" stroke="${SPONGE_S}" stroke-width="2.2"/>
    <ellipse cx="190" cy="292" rx="25" ry="18" fill="${SPONGE_F}" stroke="${SPONGE_S}" stroke-width="2.2"/>
    <ellipse cx="268" cy="284" rx="28" ry="20" fill="${SPONGE_F}" stroke="${SPONGE_S}" stroke-width="2.2"/>
    <ellipse cx="348" cy="292" rx="26" ry="18" fill="${SPONGE_F}" stroke="${SPONGE_S}" stroke-width="2.2"/>
    <ellipse cx="424" cy="282" rx="27" ry="19" fill="${SPONGE_F}" stroke="${SPONGE_S}" stroke-width="2.2"/>

    <path d="M 40 310 h 420 v 42 h -420 Z" fill="${CYTO_F}" stroke="${MEMB_S}" stroke-width="2.6"/>
    <path d="M 100 310 v 42 M 160 310 v 42 M 220 310 v 42 M 280 310 v 42 M 340 310 v 42 M 400 310 v 42" fill="none" stroke="${MEMB_S}" stroke-width="2"/>

    ${lead(500, 60, 462, 66)}
    ${lead(500, 140, 462, 146)}
    ${lead(500, 250, 462, 256)}
    ${lead(500, 330, 462, 332)}

    <text x="514" y="66" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">upper epidermis</text>
    <text x="514" y="146" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">palisade layer</text>
    <text x="514" y="256" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">spongy layer</text>
    <text x="514" y="336" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">lower epidermis</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The Draw This, and the spine of the whole lesson: one real example climbing
  // all five levels, left to right, with an arrow between each pair. It is drawn
  // as five equal panels on purpose — that is the shape a Year 7 can rule up and
  // copy in four minutes, which a fancier "ladder" is not.
  //
  // The five level names stay in English inside the panels because they are the
  // key words being learned; the sentence that explains the picture lives on the
  // slide, where it has a Vietnamese twin.
  // ───────────────────────────────────────────────────────────────────────────
  LEVELS_LADDER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 325" class="w-full h-full">
    ${plate(820, 325)}

    <rect x="14" y="40" width="140" height="240" rx="14" fill="#f8fafc" stroke="${LEAD}" stroke-width="2"/>
    <rect x="178" y="40" width="140" height="240" rx="14" fill="#f8fafc" stroke="${LEAD}" stroke-width="2"/>
    <rect x="342" y="40" width="140" height="240" rx="14" fill="#f8fafc" stroke="${LEAD}" stroke-width="2"/>
    <rect x="506" y="40" width="140" height="240" rx="14" fill="#f8fafc" stroke="${LEAD}" stroke-width="2"/>
    <rect x="670" y="40" width="140" height="240" rx="14" fill="#f8fafc" stroke="${LEAD}" stroke-width="2"/>

    <path d="M 158 146 h 16" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M 174 146 l -7 -5 M 174 146 l -7 5" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 322 146 h 16" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M 338 146 l -7 -5 M 338 146 l -7 5" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 486 146 h 16" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M 502 146 l -7 -5 M 502 146 l -7 5" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 650 146 h 16" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M 666 146 l -7 -5 M 666 146 l -7 5" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>

    ${ciliatedCell(66, 92, 36, 76)}

    ${ciliatedCell(196, 108, 26, 58)}
    ${ciliatedCell(222, 108, 26, 58)}
    ${ciliatedCell(248, 108, 26, 58)}
    ${ciliatedCell(274, 108, 26, 58)}

    <path d="M 400 92 q -32 4 -36 44 q -4 38 18 44 q 20 4 22 -22 Z" fill="${LUNG_F}" stroke="${LUNG_S}" stroke-width="2.6"/>

    <path d="M 576 82 v 26" fill="none" stroke="${AIR}" stroke-width="5" stroke-linecap="round"/>
    <path d="M 576 108 l -22 16 M 576 108 l 22 16" fill="none" stroke="${AIR}" stroke-width="5" stroke-linecap="round"/>
    <path d="M 556 120 q -22 6 -24 36 q -2 28 14 32 q 14 2 16 -18 Z" fill="${LUNG_F}" stroke="${LUNG_S}" stroke-width="2.4"/>
    <path d="M 596 120 q 22 6 24 36 q 2 28 -14 32 q -14 2 -16 -18 Z" fill="${LUNG_F}" stroke="${LUNG_S}" stroke-width="2.4"/>

    <ellipse cx="740" cy="96" rx="17" ry="19" fill="${SKIN_F}" stroke="${SKIN_S}" stroke-width="2.4"/>
    <path d="M 722 126 q 18 -8 36 0 l 8 14 l -6 46 h -40 l -6 -46 Z" fill="${SKIN_F}" stroke="${SKIN_S}" stroke-width="2.4"/>

    <text x="84" y="212" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">cell</text>
    <text x="248" y="212" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">tissue</text>
    <text x="412" y="212" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">organ</text>
    <text x="576" y="212" font-family="${FONT}" font-size="18" font-weight="bold" fill="${KEY}" text-anchor="middle">organ system</text>
    <text x="740" y="212" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">organism</text>

    <text x="84" y="240" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">a ciliated cell</text>
    <text x="248" y="240" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">ciliated</text>
    <text x="248" y="258" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">epithelium</text>
    <text x="412" y="240" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">a lung</text>
    <text x="576" y="240" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">the breathing</text>
    <text x="576" y="258" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">system</text>
    <text x="740" y="240" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">you</text>

    <text x="410" y="306" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Each level is built out of the one before it.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Two organ systems, drawn to the SAME viewBox so they can sit side by side in
  // a `compare` and be read at one scale. Both use the trick from 1.1: the body
  // is ghost-grey and only the named system is inked in, so the class learns
  // where the system is, not just what it looks like.
  // ───────────────────────────────────────────────────────────────────────────
  RESPIRATORY_SYSTEM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 420" class="w-full h-full">
    ${plate(440, 420)}
    ${bodyOutline(GHOST, GHOST_S, 2.5)}

    <ellipse cx="200" cy="84" rx="15" ry="8" fill="${AIR}"/>
    <path d="M 200 90 v 82" fill="none" stroke="${AIR}" stroke-width="9" stroke-linecap="round"/>
    <path d="M 200 172 l -24 22 M 200 172 l 24 22" fill="none" stroke="${AIR}" stroke-width="8" stroke-linecap="round"/>

    ${lungs(3)}

    ${lead(292, 86, 216, 84)}
    ${lead(292, 140, 206, 140)}
    ${lead(292, 226, 242, 224)}

    <text x="302" y="92" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">nose and mouth</text>
    <text x="302" y="146" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">windpipe</text>
    <text x="302" y="232" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">lungs</text>
  </svg>`,

  DIGESTIVE_SYSTEM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 420" class="w-full h-full">
    ${plate(440, 420)}
    ${bodyOutline(GHOST, GHOST_S, 2.5)}

    <ellipse cx="200" cy="84" rx="16" ry="9" fill="${GUT_F}" stroke="${GUT_S}" stroke-width="2.6"/>
    <path d="M 200 92 v 92" fill="none" stroke="${GUT_S}" stroke-width="8" stroke-linecap="round"/>

    <path d="M 200 182 q -28 2 -34 26 q -6 26 12 36 q 22 10 34 -8 q 10 -16 4 -30 q -6 -16 -16 -24 Z" fill="${GUT_F}" stroke="${GUT_S}" stroke-width="3"/>

    <path d="M 164 388 v -108 q 0 -12 12 -12 h 48 q 12 0 12 12 v 108" fill="none" stroke="${GUT_S}" stroke-width="11" stroke-linecap="round"/>
    <path d="M 178 300 q 12 -8 22 2 q 10 10 22 2 M 178 326 q 12 -8 22 2 q 10 10 22 2 M 178 352 q 12 -8 22 2 q 10 10 22 2 M 178 378 q 12 -8 22 2 q 10 10 22 2" fill="none" stroke="${GUT_S}" stroke-width="5.5" stroke-linecap="round"/>

    ${lead(292, 86, 218, 84)}
    ${lead(292, 140, 206, 140)}
    ${lead(292, 212, 232, 208)}
    ${lead(292, 330, 242, 330)}

    <text x="302" y="92" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">mouth</text>
    <text x="302" y="146" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">gullet</text>
    <text x="302" y="218" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">stomach</text>
    <text x="302" y="336" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="start">intestines</text>
  </svg>`,
}

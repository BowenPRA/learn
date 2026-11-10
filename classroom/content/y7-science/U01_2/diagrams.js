// content/y7-science/U01_2/diagrams.js
// Teaching diagrams for 1.2 Animal Cells, drawn in the same house style as 1.1
// so the two decks read as one book: flat line art on paper-white, a thin ink
// outline on every shape, pale flat fills, and key words set in the Learner's
// Book orange sitting in the margin on a hairline leader line.
//
// House rules (see docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so artwork is legible on a light
//    OR dark slide and never depends on the page's text colour;
//  · label <text> is written out literally (not built by a helper) so
//    `npm run audit:svg` can actually measure it — anything interpolated is
//    invisible to the audit;
//  · label text lives in the margins, never on top of the drawing.
//
// The BLANK cell pair is deliberately unlabelled: it is the "spot the
// difference" slide, and labels would answer the question for them.

const INK = '#2b2b2b'
const KEY = '#c25e12' // the book's key-word orange
const LEAD = '#7c8a95'

// Shape palette, carried over from 1.1 so an organelle keeps its colour across
// both lessons: orange wall, blue vacuole, purple nucleus, green chloroplast,
// crimson animal membrane.
const WALL_F = '#f9dcc4', WALL_S = '#e07b39'
const CYTO_F = '#eaf0f8', MEMB_S = '#8fa6c4'
const VAC_F = '#dbeafe', VAC_S = '#7ba7d4'
const NUC_F = '#9b7fc4', NUC_S = '#6f52a0'
const CHL_F = '#5aab4e', CHL_S = '#3a7d31'
const AMEM_S = '#c2185b'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A leader line from the label to the thing, ending in a small dot. */
const lead = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${LEAD}" stroke-width="1.6"/>
    <circle cx="${x2}" cy="${y2}" r="3.2" fill="${LEAD}"/>`

/** A mitochondrion: white oval with the folded inner membrane drawn in. */
const mito = (x, y, rx = 14, ry = 9) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <path d="M ${x - rx + 3} ${y} q ${(rx - 3) / 2} -${ry} ${rx - 3} 0 q ${(rx - 3) / 2} ${ry} ${rx - 3} 0" fill="none" stroke="${INK}" stroke-width="1.5"/>`

/** A chloroplast: green oval with two darker grana bands. */
const chloro = (x, y, vertical = true) => {
  const [rx, ry] = vertical ? [12, 19] : [19, 12]
  return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${CHL_F}" stroke="${CHL_S}" stroke-width="2"/>
    <line x1="${x - rx * 0.45}" y1="${y - ry * 0.3}" x2="${x + rx * 0.45}" y2="${y - ry * 0.3}" stroke="${CHL_S}" stroke-width="1.6"/>
    <line x1="${x - rx * 0.45}" y1="${y + ry * 0.25}" x2="${x + rx * 0.45}" y2="${y + ry * 0.25}" stroke="${CHL_S}" stroke-width="1.6"/>`
}

// ───────────────────────────────────────────────────────────────────────────
// "Where is it?" isolates for the plant-only gallery. The whole plant cell is
// drawn ghost-grey and only the named part is inked in, so students see what
// the part is AND where it sits. No text — the gallery card supplies it.
// ───────────────────────────────────────────────────────────────────────────
const G_F = '#f1f5f9', G_S = '#cbd5e1'
const pick = (on, colour) => (on ? colour : G_S)
const pickF = (on, colour) => (on ? colour : G_F)
const halo = (on, shape) => (on ? shape : '')

/** 240×180 plant cell with one part highlighted. */
const plantIsolate = (part) => {
  const is = (p) => part === p
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180" class="w-full h-full">
    ${plate(240, 180)}
    ${halo(is('wall'), `<rect x="63" y="11" width="114" height="158" rx="22" fill="#fdf1e3"/>`)}
    <rect x="70" y="18" width="100" height="144" rx="17" fill="${pickF(is('wall'), WALL_F)}" stroke="${pick(is('wall'), WALL_S)}" stroke-width="${is('wall') ? 5 : 2.5}"/>
    <rect x="77" y="25" width="86" height="130" rx="12" fill="${G_F}" stroke="${G_S}" stroke-width="2"/>
    <rect x="97" y="45" width="46" height="90" rx="17" fill="${pickF(is('vacuole'), VAC_F)}" stroke="${pick(is('vacuole'), VAC_S)}" stroke-width="${is('vacuole') ? 4 : 2}"/>
    ${is('chloroplast')
      ? [[88, 52], [88, 88], [152, 52], [152, 92], [152, 128]].map(([x, y]) => chloro(x, y)).join('')
      : [[88, 52], [88, 88], [152, 52], [152, 92], [152, 128]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="14" fill="${G_F}" stroke="${G_S}" stroke-width="2"/>`).join('')}
    <ellipse cx="90" cy="127" rx="13" ry="17" fill="${G_F}" stroke="${G_S}" stroke-width="2"/>
    <ellipse cx="120" cy="148" rx="13" ry="8" fill="${G_F}" stroke="${G_S}" stroke-width="2"/>
  </svg>`
}

export const DIAGRAMS = {
  // ─────────────────────────────────────────────────────────────────────────
  // The animal cell, drawn the way the Learner's Book draws it on page 14: a
  // soft irregular blob with no straight edges, five mitochondria scattered
  // through the cytoplasm, one solid purple nucleus, and all four labels
  // stacked down the right-hand margin.
  // ─────────────────────────────────────────────────────────────────────────
  ANIMAL_CELL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 430" class="w-full h-full">
    <rect x="0" y="0" width="760" height="430" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="758.5" height="428.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

    <path d="M 62 216 C 62 116, 168 58, 296 58 C 428 58, 486 120, 486 212 C 486 310, 412 374, 288 374 C 158 374, 62 316, 62 216 Z" fill="${CYTO_F}" stroke="${AMEM_S}" stroke-width="4"/>
    ${mito(190, 128, 17, 10)}${mito(286, 108, 17, 10)}${mito(140, 240, 17, 10)}${mito(238, 304, 17, 10)}${mito(410, 196, 17, 10)}
    <ellipse cx="336" cy="286" rx="54" ry="34" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2.5"/>

    ${lead(606, 94, 424, 92)}
    ${lead(645, 174, 370, 175)}
    ${lead(606, 246, 428, 200)}
    ${lead(664, 324, 392, 292)}

    <text x="744" y="100" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="end">cell membrane</text>
    <text x="744" y="180" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="end">cytoplasm</text>
    <text x="744" y="252" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="end">mitochondrion</text>
    <text x="744" y="330" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="end">nucleus</text>
  </svg>`,

  // ─────────────────────────────────────────────────────────────────────────
  // "Spot the difference": both cells in one picture, every organelle label
  // stripped off. Only the two cell types are named, at the bottom — labelling
  // the parts would answer the question before the class has looked.
  // ─────────────────────────────────────────────────────────────────────────
  SPOT_THE_DIFFERENCE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420" class="w-full h-full">
    <rect x="0" y="0" width="900" height="420" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="898.5" height="418.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

    <line x1="450" y1="34" x2="450" y2="386" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6 6"/>

    <rect x="110" y="40" width="160" height="340" rx="30" fill="${WALL_F}" stroke="${WALL_S}" stroke-width="5"/>
    <rect x="119" y="49" width="142" height="322" rx="24" fill="${CYTO_F}" stroke="${MEMB_S}" stroke-width="2.5"/>
    <rect x="153" y="82" width="74" height="248" rx="28" fill="${VAC_F}" stroke="${VAC_S}" stroke-width="2.5"/>
    ${chloro(136, 98)}${chloro(136, 352)}${chloro(244, 98)}${chloro(244, 180)}${chloro(244, 290)}${chloro(244, 352)}
    ${mito(136, 172)}${mito(244, 240)}
    <ellipse cx="145" cy="268" rx="21" ry="29" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2.5"/>

    <path d="M 470 220 C 470 124, 570 66, 690 66 C 812 66, 862 124, 862 216 C 862 308, 792 366, 674 366 C 552 366, 470 312, 470 220 Z" fill="${CYTO_F}" stroke="${AMEM_S}" stroke-width="4"/>
    ${mito(580, 140, 17, 10)}${mito(672, 116, 17, 10)}${mito(536, 246, 17, 10)}${mito(628, 306, 17, 10)}${mito(786, 204, 17, 10)}
    <ellipse cx="722" cy="290" rx="50" ry="32" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2.5"/>

    <text x="190" y="404" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">a plant cell</text>
    <text x="666" y="404" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">an animal cell</text>
  </svg>`,

  // ─────────────────────────────────────────────────────────────────────────
  // Why the missing wall matters. Left: the same stiff box three times over.
  // Right: one animal cell drawn three ways, because nothing is holding it in
  // a shape. This is the answer to "so what if it has no wall?".
  // ─────────────────────────────────────────────────────────────────────────
  SHAPE_FREEDOM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 300" class="w-full h-full">
    <rect x="0" y="0" width="700" height="300" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="698.5" height="298.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

    <line x1="350" y1="30" x2="350" y2="272" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6 6"/>

    <rect x="45" y="80" width="74" height="140" rx="14" fill="${WALL_F}" stroke="${WALL_S}" stroke-width="4"/>
    <rect x="53" y="88" width="58" height="124" rx="9" fill="${CYTO_F}" stroke="${MEMB_S}" stroke-width="1.8"/>
    <rect x="140" y="80" width="74" height="140" rx="14" fill="${WALL_F}" stroke="${WALL_S}" stroke-width="4"/>
    <rect x="148" y="88" width="58" height="124" rx="9" fill="${CYTO_F}" stroke="${MEMB_S}" stroke-width="1.8"/>
    <rect x="235" y="80" width="74" height="140" rx="14" fill="${WALL_F}" stroke="${WALL_S}" stroke-width="4"/>
    <rect x="243" y="88" width="58" height="124" rx="9" fill="${CYTO_F}" stroke="${MEMB_S}" stroke-width="1.8"/>

    <ellipse cx="425" cy="122" rx="45" ry="36" fill="${CYTO_F}" stroke="${AMEM_S}" stroke-width="3"/>
    <circle cx="437" cy="114" r="13" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2"/>
    <ellipse cx="574" cy="112" rx="62" ry="26" fill="${CYTO_F}" stroke="${AMEM_S}" stroke-width="3"/>
    <circle cx="592" cy="110" r="13" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2"/>
    <path d="M 400 200 C 400 172, 430 156, 462 164 C 494 172, 520 156, 546 172 C 574 190, 560 220, 518 223 C 466 226, 400 228, 400 200 Z" fill="${CYTO_F}" stroke="${AMEM_S}" stroke-width="3"/>
    <circle cx="486" cy="196" r="13" fill="${NUC_F}" stroke="${NUC_S}" stroke-width="2"/>

    <text x="30" y="48" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">with a cell wall</text>
    <text x="670" y="48" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="end">no cell wall</text>
    <text x="177" y="258" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">always the same box</text>
    <text x="520" y="258" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">one cell, any shape</text>
  </svg>`,

  // ─────────────────────────────────────────────────────────────────────────
  // Making a slide of your own cheek cells, in four pictures — the order of
  // Learner's Book steps 1–4. The stain is drawn blue because methylene blue
  // is what turns an invisible smear into something worth looking at.
  // ─────────────────────────────────────────────────────────────────────────
  SLIDE_PREP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 240" class="w-full h-full">
    <rect x="0" y="0" width="760" height="240" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="758.5" height="238.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

    <rect x="14" y="20" width="180" height="160" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
    <rect x="200" y="20" width="180" height="160" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
    <rect x="386" y="20" width="180" height="160" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
    <rect x="572" y="20" width="180" height="160" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

    <defs><marker id="sp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker></defs>

    <line x1="62" y1="146" x2="146" y2="64" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
    <circle cx="62" cy="146" r="13" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <circle cx="146" cy="64" r="13" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <ellipse cx="46" cy="132" rx="7" ry="5" fill="#dbe6f2" stroke="#8fa6c4" stroke-width="1.5"/>
    <ellipse cx="70" cy="163" rx="7" ry="5" fill="#dbe6f2" stroke="#8fa6c4" stroke-width="1.5"/>
    <ellipse cx="49" cy="158" rx="7" ry="5" fill="#dbe6f2" stroke="#8fa6c4" stroke-width="1.5"/>

    <rect x="220" y="104" width="140" height="40" rx="4" fill="#eef5f9" stroke="#7ba7d4" stroke-width="2.5"/>
    <ellipse cx="290" cy="124" rx="30" ry="13" fill="#e2e8f0"/>
    <line x1="290" y1="88" x2="346" y2="44" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
    <circle cx="290" cy="88" r="11" fill="#ffffff" stroke="${INK}" stroke-width="2"/>

    <rect x="406" y="112" width="140" height="40" rx="4" fill="#eef5f9" stroke="#7ba7d4" stroke-width="2.5"/>
    <ellipse cx="476" cy="132" rx="30" ry="13" fill="#cfe3f2"/>
    <circle cx="476" cy="44" r="15" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 466 56 L 486 56 L 480 86 L 472 86 Z" fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M 476 90 C 487 102, 491 111, 476 114 C 461 111, 465 102, 476 90 Z" fill="${VAC_S}"/>

    <rect x="592" y="112" width="140" height="40" rx="4" fill="#eef5f9" stroke="#7ba7d4" stroke-width="2.5"/>
    <ellipse cx="662" cy="132" rx="28" ry="12" fill="#cfe3f2"/>
    <line x1="610" y1="110" x2="714" y2="66" stroke="#7ba7d4" stroke-width="5" stroke-linecap="round"/>
    <path d="M 724 62 Q 744 84, 722 104" fill="none" stroke="${INK}" stroke-width="2.5" marker-end="url(#sp-arrow)"/>

    <text x="104" y="212" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">1 · rub your cheek</text>
    <text x="290" y="212" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">2 · rub the slide</text>
    <text x="476" y="212" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">3 · add the stain</text>
    <text x="662" y="212" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">4 · cover slip</text>
  </svg>`,

  // ── Gallery isolates: the three parts an animal cell has NOT got ──────────
  ORG_WALL: plantIsolate('wall'),
  ORG_CHLOROPLAST: plantIsolate('chloroplast'),
  ORG_VACUOLE: plantIsolate('vacuole'),
}

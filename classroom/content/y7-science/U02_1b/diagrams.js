// content/y7-science/U02_1b/diagrams.js
// Teaching diagrams for 2.1b Particle theory — same house style as Unit 1 and
// as 2.1a: flat line art on paper-white, thin ink outlines, pale flat fills,
// key words in the Learner's Book orange out in the margins, and label <text>
// written out literally so `npm run audit:svg` can measure it.
//
// TWO DECISIONS WORTH KNOWING BEFORE YOU EDIT THESE.
//
// 1. THE PARTICLES ARE ALWAYS THE SAME BLUE, in every diagram, exactly as they
//    are in the Learner's Book. The state is carried by the ARRANGEMENT, never
//    by the colour of a particle — which is the whole claim of the theory. The
//    state colours from 2.1a (stone, water-blue, violet) survive only in the
//    label text, so a student still reads "violet means gas" the same way.
//
// 2. ALL THREE STATES ARE DRAWN IN THE SAME BEAKER. The book draws them as
//    three free-floating clumps, which shows the packing but hides the payoff:
//    a solid keeps its own shape and does not touch the walls, a liquid finds a
//    level and touches both walls, a gas fills every corner. Put them in one
//    container and pages 31 and 33 become the same picture — the arrangement
//    and the property, side by side. That is the point of the lesson.

const INK = '#2b2b2b'
const KEY = '#c25e12' // the book's key-word orange
const LEAD = '#7c8a95'
const GLASS_S = '#9aa8b4'

const SOLID_S = '#8a7f68'
const LIQ_S = '#2f7fb0'
const GAS_S = '#8b6bb1'

const PART_F = '#6f9ed4'
const PART_S = '#2f5f96'
const MOVE = '#3f8f46' // the book's green motion arrows

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A leader line from a label to the thing, ending in a small dot. */
const lead = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${LEAD}" stroke-width="1.6"/>
    <circle cx="${x2}" cy="${y2}" r="3.2" fill="${LEAD}"/>`

/** One particle. */
const p = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${PART_F}" stroke="${PART_S}" stroke-width="2"/>`

/** A beaker: open at the top, square-ish at the bottom, drawn in glass grey. */
const beaker = (x, y, w, h) =>
  `<path d="M ${x} ${y} v ${h - 14} q 0 14 14 14 h ${w - 28} q 14 0 14 -14 v -${h - 14}" fill="none" stroke="${GLASS_S}" stroke-width="3.4" stroke-linecap="round"/>`

/** Vibration ticks: three short curved strokes on the left and right of a particle. */
const buzz = (x, y, r) =>
  `<path d="M ${x - r - 6} ${y - 7} q -5 7 0 14 M ${x - r - 12} ${y - 10} q -7 10 0 20" fill="none" stroke="${PART_S}" stroke-width="1.8" stroke-linecap="round" opacity="0.75"/>
   <path d="M ${x + r + 6} ${y - 7} q 5 7 0 14 M ${x + r + 12} ${y - 10} q 7 10 0 20" fill="none" stroke="${PART_S}" stroke-width="1.8" stroke-linecap="round" opacity="0.75"/>`

/** A motion arrow: a short line with a solid head, drawn so the head keeps its
 *  size whatever the line length (arrowheads that scale with stroke-width are a
 *  known trap in this repo). */
const arrow = (x, y, dx, dy) => {
  const len = Math.hypot(dx, dy)
  const ux = dx / len, uy = dy / len
  const tipX = x + dx, tipY = y + dy
  const bx = tipX - ux * 9, by = tipY - uy * 9
  const px = -uy * 5, py = ux * 5
  return `<line x1="${x}" y1="${y}" x2="${bx}" y2="${by}" stroke="${MOVE}" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M ${tipX} ${tipY} L ${bx + px} ${by + py} L ${bx - px} ${by - py} Z" fill="${MOVE}"/>`
}

/** A regular block of touching particles, w x h of them, top-left at (x, y). */
const block = (x, y, cols, rows, r) => {
  let out = ''
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) out += p(x + r + i * 2 * r, y + r + j * 2 * r, r)
  }
  return out
}

/** A jumbled raft of touching particles: rows with a staggered, uneven offset. */
const raft = (rows, r) => {
  const OFF = [0, 14, -9, 20, -5, 11]
  let out = ''
  rows.forEach(([x0, y, n], k) => {
    for (let i = 0; i < n; i++) out += p(x0 + OFF[(k + i) % OFF.length] * 0.55 + i * (2 * r - 3), y + ((i % 3) - 1) * 4, r)
  })
  return out
}

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // A SOLID in the beaker. Two things the class has to see and neither is the
  // packing: the block does not touch the walls (a solid keeps its OWN shape),
  // and every particle is buzzing on the spot (vibrate, but stay in place).
  // ───────────────────────────────────────────────────────────────────────────
  PARTICLES_SOLID: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 470" class="w-full h-full">
    ${plate(760, 470)}
    ${beaker(190, 60, 380, 300)}

    ${block(260, 160, 6, 5, 20)}
    ${buzz(280, 180, 20)}
    ${buzz(480, 180, 20)}
    ${buzz(280, 340, 20)}
    ${buzz(480, 340, 20)}

    ${lead(170, 130, 266, 168)}
    <text x="30" y="124" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}">fixed pattern</text>

    ${lead(636, 300, 504, 300)}
    <text x="730" y="294" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="end">vibrating</text>

    <text x="380" y="416" font-family="${FONT}" font-size="24" font-weight="bold" fill="${SOLID_S}" text-anchor="middle">SOLID</text>
    <text x="380" y="446" font-family="${FONT}" font-size="17" fill="${INK}" text-anchor="middle">Packed tight, held strongly, never swapping places.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // A LIQUID in the same beaker. The particles still touch — that is why a
  // liquid cannot be squashed — but the rows are ragged and every one of them
  // has somewhere to go. The flat level line at the top is doing real work: it
  // is the shape of the CONTAINER, not the shape of the liquid.
  // ───────────────────────────────────────────────────────────────────────────
  PARTICLES_LIQUID: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 470" class="w-full h-full">
    ${plate(760, 470)}
    ${beaker(190, 60, 380, 300)}

    ${raft([[214, 236, 12], [210, 268, 12], [216, 300, 12], [212, 332, 12]], 16)}

    ${arrow(268, 254, 32, -10)}
    ${arrow(400, 288, -28, 14)}
    ${arrow(492, 250, 14, 28)}
    ${arrow(320, 328, 30, 8)}
    ${arrow(520, 322, -24, -18)}

    <path d="M 194 214 h 372" stroke="${LIQ_S}" stroke-width="2.6" stroke-dasharray="9 7"/>
    ${lead(628, 208, 548, 214)}
    <text x="734" y="202" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="end">a flat top</text>

    ${lead(170, 186, 254, 248)}
    <text x="30" y="180" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}">still touching</text>

    <text x="380" y="416" font-family="${FONT}" font-size="24" font-weight="bold" fill="${LIQ_S}" text-anchor="middle">LIQUID</text>
    <text x="380" y="446" font-family="${FONT}" font-size="17" fill="${INK}" text-anchor="middle">Touching, held weakly, sliding past one another.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // A GAS in the same beaker. Far apart, no arrangement at all, and — the thing
  // the class must notice — spread into every corner including the top, which is
  // where the liquid's flat surface used to be.
  // ───────────────────────────────────────────────────────────────────────────
  PARTICLES_GAS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 470" class="w-full h-full">
    ${plate(760, 470)}
    ${beaker(190, 60, 380, 300)}

    ${p(230, 110, 15)}${p(330, 88, 15)}${p(432, 116, 15)}${p(532, 94, 15)}
    ${p(262, 180, 15)}${p(372, 166, 15)}${p(488, 192, 15)}
    ${p(218, 254, 15)}${p(320, 240, 15)}${p(432, 268, 15)}${p(534, 246, 15)}
    ${p(258, 326, 15)}${p(370, 336, 15)}${p(482, 318, 15)}

    ${arrow(248, 102, 34, -16)}
    ${arrow(344, 102, 12, 34)}
    ${arrow(418, 128, -34, 16)}
    ${arrow(278, 190, 30, 22)}
    ${arrow(386, 154, 28, -24)}
    ${arrow(502, 204, -28, 22)}
    ${arrow(206, 240, -12, -32)}
    ${arrow(334, 228, 32, -18)}
    ${arrow(446, 280, 28, 20)}
    ${arrow(272, 316, 32, -14)}
    ${arrow(384, 326, 24, -28)}
    ${arrow(496, 330, 26, 18)}

    <text x="380" y="416" font-family="${FONT}" font-size="24" font-weight="bold" fill="${GAS_S}" text-anchor="middle">GAS</text>
    <text x="380" y="446" font-family="${FONT}" font-size="17" fill="${INK}" text-anchor="middle">Far apart, nothing holding them, filling every corner.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // THE DRAW THIS, and the Learner's Book Activity on p.34: three labelled
  // squares with the particles drawn inside. Small boxes on purpose — this is
  // what a notebook version can realistically look like in four minutes.
  // ───────────────────────────────────────────────────────────────────────────
  THREE_ARRANGEMENTS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 360" class="w-full h-full">
    ${plate(900, 360)}

    <rect x="40" y="66" width="240" height="200" fill="none" stroke="${INK}" stroke-width="2.6"/>
    <rect x="330" y="66" width="240" height="200" fill="none" stroke="${INK}" stroke-width="2.6"/>
    <rect x="620" y="66" width="240" height="200" fill="none" stroke="${INK}" stroke-width="2.6"/>

    ${block(58, 81, 6, 5, 17)}

    ${raft([[352, 130, 7], [348, 166, 7], [354, 202, 7], [350, 238, 7]], 15)}

    ${p(654, 100, 13)}${p(752, 92, 13)}${p(830, 116, 13)}
    ${p(690, 160, 13)}${p(786, 152, 13)}
    ${p(648, 216, 13)}${p(744, 226, 13)}${p(832, 200, 13)}
    ${p(692, 248, 13)}${p(790, 244, 13)}

    <text x="160" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${SOLID_S}" text-anchor="middle">Solid</text>
    <text x="450" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${LIQ_S}" text-anchor="middle">Liquid</text>
    <text x="740" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${GAS_S}" text-anchor="middle">Gas</text>

    <text x="160" y="302" font-family="${FONT}" font-size="17" fill="${INK}" text-anchor="middle">a fixed pattern</text>
    <text x="450" y="302" font-family="${FONT}" font-size="17" fill="${INK}" text-anchor="middle">touching, no pattern</text>
    <text x="740" y="302" font-family="${FONT}" font-size="17" fill="${INK}" text-anchor="middle">far apart, no pattern</text>

    <text x="450" y="344" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="middle">Write the properties of each state in the space around its box.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Why the air syringe from Monday moved and the water one did not. The same
  // particles, the same number of them, and the only thing that changed is the
  // gaps — which is exactly what "compress" means and exactly what a liquid has
  // none of to give.
  // ───────────────────────────────────────────────────────────────────────────
  COMPRESSING_GAS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 380" class="w-full h-full">
    ${plate(820, 380)}

    <rect x="70" y="86" width="230" height="220" rx="6" fill="none" stroke="${GLASS_S}" stroke-width="3.2"/>
    <rect x="73" y="89" width="224" height="16" rx="4" fill="${INK}" opacity="0.5"/>
    ${p(112, 140, 15)}${p(212, 128, 15)}${p(272, 168, 15)}
    ${p(150, 196, 15)}${p(244, 216, 15)}
    ${p(104, 248, 15)}${p(196, 268, 15)}${p(268, 260, 15)}

    <rect x="520" y="86" width="230" height="220" rx="6" fill="none" stroke="${GLASS_S}" stroke-width="3.2"/>
    <rect x="523" y="199" width="224" height="16" rx="4" fill="${INK}" opacity="0.5"/>
    ${p(552, 242, 15)}${p(612, 248, 15)}${p(676, 240, 15)}${p(732, 246, 15)}
    ${p(562, 282, 15)}${p(620, 276, 15)}${p(684, 284, 15)}${p(728, 278, 15)}

    ${arrow(390, 196, 60, 0)}
    <text x="410" y="176" font-family="${FONT}" font-size="18" font-weight="bold" fill="${KEY}" text-anchor="middle">push</text>

    <text x="185" y="66" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">eight particles, big gaps</text>
    <text x="635" y="66" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle">eight particles, small gaps</text>

    <text x="185" y="344" font-family="${FONT}" font-size="17" fill="${INK}" text-anchor="middle">Nothing is lost.</text>
    <text x="635" y="344" font-family="${FONT}" font-size="17" fill="${INK}" text-anchor="middle">Only the space between them shrank.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // A vacuum. The point is not "empty of air" — students hear that as "full of
  // nothing-in-particular". It is a box with NO PARTICLES AT ALL, which is why
  // the diagram has to be shown next to a box that has some.
  // ───────────────────────────────────────────────────────────────────────────
  VACUUM_BOX: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 330" class="w-full h-full">
    ${plate(820, 330)}

    <rect x="60" y="76" width="290" height="180" rx="8" fill="none" stroke="${INK}" stroke-width="3"/>
    ${p(106, 118, 14)}${p(212, 106, 14)}${p(300, 132, 14)}
    ${p(148, 178, 14)}${p(256, 190, 14)}
    ${p(96, 224, 14)}${p(196, 232, 14)}${p(310, 214, 14)}

    <rect x="470" y="76" width="290" height="180" rx="8" fill="none" stroke="${INK}" stroke-width="3"/>

    <text x="205" y="56" font-family="${FONT}" font-size="20" font-weight="bold" fill="${GAS_S}" text-anchor="middle">a box of gas</text>
    <text x="615" y="56" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">a vacuum</text>

    <text x="205" y="296" font-family="${FONT}" font-size="17" fill="${INK}" text-anchor="middle">Mostly space — but there are particles in it.</text>
    <text x="615" y="296" font-family="${FONT}" font-size="17" fill="${INK}" text-anchor="middle">No particles at all. Nothing.</text>
  </svg>`,
}

// content/y7-science/U02_1a/diagrams.js
// Teaching diagrams for 2.1a Solids, liquids and gases — same house style as
// Unit 1: flat line art on paper-white, thin ink outlines, pale flat fills, and
// key words set in the Learner's Book orange out in the margin.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so artwork is legible on a light
//    OR dark slide and never depends on the page's text colour;
//  · label <text> is written out literally (never built by a helper) so
//    `npm run audit:svg` can actually measure it;
//  · label text lives in the margins, never on top of the drawing.
//
// One extra rule this unit adds, and 2.1b depends on it: THE THREE STATES KEEP
// THE SAME THREE COLOURS EVERYWHERE. Stone-brown is a solid, water-blue is a
// liquid, pale violet is a gas — in this deck, in 2.1b, and in the particle
// diagrams. A student who has learned "violet means gas" on Monday should not
// have to learn it again on Wednesday.

const INK = '#2b2b2b'
const KEY = '#c25e12' // the book's key-word orange
const LEAD = '#7c8a95'
const RULE = '#b6c1c9'
const YES = '#4a8b23'
const NO = '#c8102e'

const SOLID_F = '#ded7c6', SOLID_S = '#8a7f68'
const LIQ_F = '#bfe0f2', LIQ_S = '#2f7fb0'
const GAS_F = '#ece1f6', GAS_S = '#8b6bb1'
const GLASS_S = '#9aa8b4'
const TINT = '#f3f6f8' // header strips inside a table

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** A leader line from a label to the thing, ending in a small dot. */
const lead = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${LEAD}" stroke-width="1.6"/>
    <circle cx="${x2}" cy="${y2}" r="3.2" fill="${LEAD}"/>`

/** A green tick, drawn as strokes so it never depends on a font. */
const tick = (cx, cy, s = 1) =>
  `<path d="M ${cx - 11 * s} ${cy} l ${7 * s} ${8 * s} l ${14 * s} -${17 * s}" fill="none" stroke="${YES}" stroke-width="${4.4 * s}" stroke-linecap="round" stroke-linejoin="round"/>`

/** A red cross, drawn as strokes for the same reason. */
const cross = (cx, cy, s = 1) =>
  `<path d="M ${cx - 10 * s} ${cy - 10 * s} l ${20 * s} ${20 * s} M ${cx + 10 * s} ${cy - 10 * s} l -${20 * s} ${20 * s}" fill="none" stroke="${NO}" stroke-width="${4.4 * s}" stroke-linecap="round"/>`

/** One horizontal rule across a table. */
const rule = (x1, x2, y) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${RULE}" stroke-width="1.6"/>`

/** One vertical rule down a table. */
const vrule = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${RULE}" stroke-width="1.6"/>`

/** A glass vessel outline: open at the top, rounded at the bottom. */
const glass = (x, y, w, h, r = 10) =>
  `<path d="M ${x} ${y} v ${h - r} q 0 ${r} ${r} ${r} h ${w - 2 * r} q ${r} 0 ${r} -${r} v -${h - r}" fill="none" stroke="${GLASS_S}" stroke-width="3" stroke-linecap="round"/>`

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // The Learner's Book "Getting started" table on p.28, redrawn so the class can
  // rule it into a notebook straight off the projector. The example row is
  // filled in exactly as the book fills it in; the rest is left empty on
  // purpose, because the empty rows ARE the task.
  // ───────────────────────────────────────────────────────────────────────────
  SORTING_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 340" class="w-full h-full">
    ${plate(760, 340)}

    <rect x="40" y="46" width="220" height="54" fill="${TINT}" stroke="${RULE}" stroke-width="1.6"/>
    <rect x="260" y="46" width="230" height="54" fill="${TINT}" stroke="${RULE}" stroke-width="1.6"/>
    <rect x="490" y="46" width="230" height="54" fill="${TINT}" stroke="${RULE}" stroke-width="1.6"/>

    <text x="150" y="79" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Substance</text>
    <text x="375" y="79" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">Solid, liquid or gas</text>
    <text x="605" y="79" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">I know this because…</text>

    ${rule(40, 720, 152)}
    ${rule(40, 720, 204)}
    ${rule(40, 720, 256)}
    ${rule(40, 720, 308)}
    ${vrule(40, 100, 308)}
    ${vrule(260, 100, 308)}
    ${vrule(490, 100, 308)}
    ${vrule(720, 100, 308)}

    <text x="58" y="133" font-family="${FONT}" font-size="16" fill="${INK}">Example: tap water</text>
    <text x="278" y="133" font-family="${FONT}" font-size="16" fill="${INK}">liquid</text>
    <text x="508" y="133" font-family="${FONT}" font-size="16" fill="${INK}">I can pour it.</text>

    <text x="380" y="332" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">three more rows — your own substances</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The p.29 figure: the same 50 cm³ of liquid poured between three completely
  // different containers. Redrawn rather than cropped, because the book's
  // version is small and the whole point is the LEVEL LINE — the shape changes,
  // the amount does not. The dish is deliberately wide and shallow so the class
  // can see that "spread out flat" is still the same 50 cm³.
  // ───────────────────────────────────────────────────────────────────────────
  SAME_LIQUID: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" class="w-full h-full">
    ${plate(760, 400)}

    ${glass(110, 66, 62, 244, 10)}
    <path d="M 113 137 v 163 q 0 7 7 7 h 42 q 7 0 7 -7 v -163 Z" fill="${LIQ_F}" stroke="${LIQ_S}" stroke-width="2.4"/>
    <path d="M 172 100 h -14 M 172 137 h -24 M 172 174 h -14 M 172 211 h -14 M 172 248 h -14" stroke="${GLASS_S}" stroke-width="2" stroke-linecap="round"/>

    ${glass(300, 240, 194, 70, 24)}
    <path d="M 303 261 v 25 q 0 21 21 21 h 146 q 21 0 21 -21 v -25 Z" fill="${LIQ_F}" stroke="${LIQ_S}" stroke-width="2.4"/>

    ${glass(586, 190, 122, 120, 12)}
    <path d="M 589 224 v 74 q 0 9 9 9 h 98 q 9 0 9 -9 v -74 Z" fill="${LIQ_F}" stroke="${LIQ_S}" stroke-width="2.4"/>

    <text x="141" y="126" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="middle">50 cm³</text>
    <text x="397" y="250" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="middle">50 cm³</text>
    <text x="647" y="213" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="middle">50 cm³</text>

    <text x="141" y="344" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">tall and narrow</text>
    <text x="397" y="344" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">wide and flat</text>
    <text x="647" y="344" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">short and round</text>

    <text x="380" y="42" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">The same water, poured into three containers</text>
    <text x="380" y="382" font-family="${FONT}" font-size="18" fill="${INK}" text-anchor="middle">The shape changes. The volume does not.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The syringe test, which is the one practical the room has kit for. Two
  // syringes, both filled to the 40 mark, both with the nozzle blocked by a
  // thumb. Push each as hard as you can. Drawn as a before/after pair so the
  // result is a picture, not a sentence — the plunger that moved is the answer.
  // ───────────────────────────────────────────────────────────────────────────
  SYRINGES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 440" class="w-full h-full">
    ${plate(760, 440)}

    <text x="200" y="52" font-family="${FONT}" font-size="20" font-weight="bold" fill="${LIQ_S}" text-anchor="middle">a syringe of water</text>
    <text x="560" y="52" font-family="${FONT}" font-size="20" font-weight="bold" fill="${GAS_S}" text-anchor="middle">a syringe of air</text>

    <rect x="150" y="80" width="100" height="220" rx="8" fill="none" stroke="${GLASS_S}" stroke-width="3"/>
    <rect x="153" y="140" width="94" height="157" fill="${LIQ_F}"/>
    <rect x="153" y="130" width="94" height="16" rx="4" fill="${INK}" opacity="0.55"/>
    <line x1="200" y1="80" x2="200" y2="132" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
    <path d="M 176 74 h 48" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
    <path d="M 184 300 h 32 v 22 h -32 Z" fill="none" stroke="${GLASS_S}" stroke-width="3"/>
    <path d="M 182 330 q 18 -16 36 0 q 8 14 -6 20 h -24 q -14 -6 -6 -20 Z" fill="${SOLID_F}" stroke="${SOLID_S}" stroke-width="2.6"/>

    <rect x="510" y="80" width="100" height="220" rx="8" fill="none" stroke="${GLASS_S}" stroke-width="3"/>
    <rect x="513" y="140" width="94" height="157" fill="${GAS_F}"/>
    <rect x="513" y="130" width="94" height="16" rx="4" fill="${INK}" opacity="0.55"/>
    <line x1="560" y1="80" x2="560" y2="132" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
    <path d="M 536 74 h 48" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
    <path d="M 544 300 h 32 v 22 h -32 Z" fill="none" stroke="${GLASS_S}" stroke-width="3"/>
    <path d="M 542 330 q 18 -16 36 0 q 8 14 -6 20 h -24 q -14 -6 -6 -20 Z" fill="${SOLID_F}" stroke="${SOLID_S}" stroke-width="2.6"/>

    ${lead(300, 100, 254, 128)}
    ${lead(300, 344, 226, 340)}
    <text x="310" y="106" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}">plunger</text>
    <text x="310" y="350" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}">thumb over the hole</text>

    ${cross(200, 396, 1.05)}
    ${tick(560, 396, 1.05)}
    <text x="200" y="432" font-family="${FONT}" font-size="18" font-weight="bold" fill="${NO}" text-anchor="middle">will not move</text>
    <text x="560" y="432" font-family="${FONT}" font-size="18" font-weight="bold" fill="${YES}" text-anchor="middle">slides in easily</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // THE DRAW THIS. Four yes/no questions against the three states — the whole of
  // pages 28 and 29 on one grid, and the sheet the class will keep using for the
  // rest of Unit 2. Ticks and crosses are drawn as strokes rather than typed as
  // characters, so they carry no language at all and cannot fall back to a
  // missing glyph on the classroom machine.
  // ───────────────────────────────────────────────────────────────────────────
  STATES_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" class="w-full h-full">
    ${plate(900, 400)}

    <rect x="380" y="40" width="166" height="56" fill="${SOLID_F}" stroke="${SOLID_S}" stroke-width="2"/>
    <rect x="546" y="40" width="166" height="56" fill="${LIQ_F}" stroke="${LIQ_S}" stroke-width="2"/>
    <rect x="712" y="40" width="166" height="56" fill="${GAS_F}" stroke="${GAS_S}" stroke-width="2"/>

    <text x="463" y="78" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Solid</text>
    <text x="629" y="78" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Liquid</text>
    <text x="795" y="78" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Gas</text>

    ${rule(22, 878, 96)}
    ${rule(22, 878, 172)}
    ${rule(22, 878, 248)}
    ${rule(22, 878, 324)}
    ${rule(22, 878, 380)}
    ${vrule(380, 40, 380)}
    ${vrule(546, 40, 380)}
    ${vrule(712, 40, 380)}

    <text x="34" y="140" font-family="${FONT}" font-size="19" fill="${INK}">Does it keep its own shape?</text>
    <text x="34" y="216" font-family="${FONT}" font-size="19" fill="${INK}">Does it keep the same volume?</text>
    <text x="34" y="292" font-family="${FONT}" font-size="19" fill="${INK}">Can you pour it?</text>
    <text x="34" y="360" font-family="${FONT}" font-size="19" fill="${INK}">Can you compress it?</text>

    ${tick(463, 132)} ${cross(629, 134)} ${cross(795, 134)}
    ${tick(463, 208)} ${tick(629, 208)} ${cross(795, 210)}
    ${cross(463, 286)} ${tick(629, 284)} ${tick(795, 284)}
    ${cross(463, 352)} ${cross(629, 352)} ${tick(795, 350)}
  </svg>`,
}

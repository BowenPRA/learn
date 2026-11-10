// content/y7-math/U05_1/diagrams.js
// Teaching diagrams for 5.1 A sum of 360°, drawn to match 2.3 and 4.5.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes only, because
//    `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · `split` diagrams are 840×560; `showcase` diagrams are 1120×440 strips.
//
// Angle labels sit where calc'd by hand from each corner's bisector, so the
// numbers can be literal. Diagrams are not drawn to scale, like the book's.
//
//   FACTS      right angle, straight line, full turn, triangle (the starter)
//   LINE       130° and a on a straight line
//   PIZZA      a real pizza in 8 slices, and 8 × 45° = 360°
//   POINT      100°, 120° and b round a point
//   SUM_SOME   sum and some sound the same
//   QUADS      six quadrilaterals, named
//   CORNERS    tear off the four corners; they make a full turn
//   QUAD_TRI   a quadrilateral is two triangles: 180° + 180°
//   WORKED     70°, 95°, 120° and d
//   PHRASES    the Workbook's question words, and what they mean
//   PRACTICE   three whiteboard questions: x, y, z
//   PARA       a parallelogram with one angle given
//   TILES      two squares and an equilateral triangle meet at a point
//   ANS_*      the answer cards on the two vote slides

import pizza from './images/pizza.jpg'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'
const TEAL_T = '#e2f2f6'
const PURPLE_T = '#f2ecf7'
const GREEN_T = '#eef6e6'
const ORANGE_T = '#fdf1e3'
const SLATE_T = '#eef1f4'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const rad = (d) => (d * Math.PI) / 180
// A point at distance r from (cx, cy), at angle d degrees anticlockwise from east.
const at = (cx, cy, r, d) => [cx + r * Math.cos(rad(d)), cy - r * Math.sin(rad(d))]
const f = (n) => n.toFixed(1)

// A filled wedge from angle a1 to a2 (anticlockwise, degrees).
const wedge = (cx, cy, r, a1, a2, fill, stroke = INK) => {
  const [x1, y1] = at(cx, cy, r, a1)
  const [x2, y2] = at(cx, cy, r, a2)
  const large = a2 - a1 > 180 ? 1 : 0
  return `<path d="M ${cx} ${cy} L ${f(x1)} ${f(y1)} A ${r} ${r} 0 ${large} 0 ${f(x2)} ${f(y2)} Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`
}

// Where the interior angle at corner P (neighbours A and B) starts, and how wide it is.
const span = (P, A, B) => {
  const ang = (Q) => (Math.atan2(-(Q[1] - P[1]), Q[0] - P[0]) * 180) / Math.PI
  let a1 = ang(A)
  let d = (ang(B) - a1 + 360) % 360
  if (d > 180) {
    a1 = ang(B)
    d = 360 - d
  }
  return { a1, d }
}

// The interior wedge at corner P of a convex polygon, between its neighbours A and B.
const corner = (P, A, B, r, fill) => {
  const { a1, d } = span(P, A, B)
  return wedge(P[0], P[1], r, a1, a1 + d, fill)
}

// Each corner pulled 30 units out of the shape, with a dashed tear line left behind.
const tornCorners = (Q, r, fills) =>
  Q.map((P, i) => {
    const { a1, d } = span(P, Q[(i + 3) % 4], Q[(i + 1) % 4])
    const [ox, oy] = at(0, 0, -30, a1 + d / 2)
    const [x1, y1] = at(P[0], P[1], r, a1)
    const [x2, y2] = at(P[0], P[1], r, a1 + d)
    return `<path d="M ${f(x1)} ${f(y1)} A ${r} ${r} 0 0 0 ${f(x2)} ${f(y2)}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="7 6"/>
      <g transform="translate(${f(ox)} ${f(oy)})">${wedge(P[0], P[1], r, a1, a1 + d, fills[i])}</g>`
  }).join('\n      ')

// The four torn corners (78.8°, 98°, 90°, 93.2°) lying near a point, not yet joined.
const scattered = (cx, cy, fills) =>
  [78.8, 98, 90, 93.2]
    .map((d, i) => {
      const dir = 45 + 90 * i
      const [vx, vy] = at(cx, cy, 34, dir)
      return wedge(Math.round(vx), Math.round(vy), 58, dir - d / 2, dir + d / 2, fills[i])
    })
    .join('\n    ')

const poly = (pts, fill = SLATE_T) =>
  `<polygon points="${pts.map((p) => p.join(',')).join(' ')}" fill="${fill}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`

const ray = (x1, y1, x2, y2) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`

// A right-angle box at P, with its arms along unit directions u and v.
const box = (P, u, v, s = 22) =>
  `<path d="M ${P[0] + u[0] * s} ${P[1] + u[1] * s} L ${P[0] + (u[0] + v[0]) * s} ${P[1] + (u[1] + v[1]) * s} L ${P[0] + v[0] * s} ${P[1] + v[1] * s}" fill="none" stroke="${INK}" stroke-width="2.5"/>`

const HAND_PATHS = `<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>`
const leftHand = `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${BLUE}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = `<g transform="translate(528 76) scale(7)" fill="none" stroke="${KEY}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`

const CQ = [[90, 350], [170, 90], [420, 130], [380, 380]]
const WQ = [[120, 450], [230, 130], [650, 160], [720, 450]]
const PQ = [[150, 420], [300, 150], [720, 150], [570, 420]]
const ZQ = [[200, 540], [200, 400], [620, 287.5], [620, 540]]
const wedges = (Q, r, fills) => Q.map((p, i) => corner(p, Q[(i + 3) % 4], Q[(i + 1) % 4], r, fills[i])).join('\n    ')

export const DIAGRAMS = {
  FACTS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${wedge(80, 300, 70, 0, 90, TEAL_T)}
    ${ray(80, 300, 230, 300)}
    ${ray(80, 300, 80, 130)}
    ${box([80, 300], [1, 0], [0, -1], 30)}
    <text x="140" y="390" font-family="${FONT}" font-size="30" font-weight="bold" fill="${TEAL}" text-anchor="middle">90°</text>
    <text x="140" y="80" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">a right angle</text>
    ${wedge(410, 300, 70, 0, 180, PURPLE_T)}
    ${ray(300, 300, 520, 300)}
    <circle cx="410" cy="300" r="5" fill="${INK}"/>
    <text x="410" y="390" font-family="${FONT}" font-size="30" font-weight="bold" fill="${PURPLE}" text-anchor="middle">180°</text>
    <text x="410" y="80" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">a straight line</text>
    ${wedge(690, 250, 85, 0, 359.9, ORANGE_T)}
    ${ray(690, 250, 775, 250)}
    <circle cx="690" cy="250" r="5" fill="${INK}"/>
    <text x="690" y="390" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">360°</text>
    <text x="690" y="80" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">a full turn</text>
    ${poly([[870, 320], [1060, 320], [940, 140]], GREEN_T)}
    <text x="965" y="390" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="middle">180°</text>
    <text x="965" y="80" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">a triangle</text>
  </svg>`,

  LINE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${wedge(420, 380, 80, 0, 50, ORANGE_T)}
    ${wedge(420, 380, 62, 50, 180, TEAL_T)}
    ${ray(80, 380, 760, 380)}
    ${ray(420, 380, 612.8, 150.2)}
    <circle cx="420" cy="380" r="6" fill="${INK}"/>
    <text x="530" y="352" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">a</text>
    <text x="368" y="296" font-family="${FONT}" font-size="40" font-weight="bold" fill="${TEAL}" text-anchor="middle">130°</text>
    <text x="420" y="470" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">a straight line</text>
  </svg>`,

  PIZZA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <image href="${pizza}" x="30" y="25" width="520" height="390" preserveAspectRatio="xMidYMid meet"/>
    ${[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => wedge(840, 205, 165, a, a + 45, i === 0 ? ORANGE_T : '#ffffff')).join('\n    ')}
    <text x="940" y="186" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">45°</text>
    <text x="840" y="420" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">8 × 45° = 360°</text>
  </svg>`,

  POINT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${wedge(420, 290, 62, 20, 120, TEAL_T)}
    ${wedge(420, 290, 62, 120, 240, PURPLE_T)}
    ${wedge(420, 290, 80, 240, 380, ORANGE_T)}
    ${ray(420, 290, 626.7, 214.8)}
    ${ray(420, 290, 310, 99.5)}
    ${ray(420, 290, 310, 480.5)}
    <circle cx="420" cy="290" r="6" fill="${INK}"/>
    <text x="458" y="200" font-family="${FONT}" font-size="36" font-weight="bold" fill="${TEAL}" text-anchor="middle">100°</text>
    <text x="300" y="302" font-family="${FONT}" font-size="36" font-weight="bold" fill="${PURPLE}" text-anchor="middle">120°</text>
    <text x="490" y="375" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">b</text>
    <text x="640" y="470" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">round a point</text>
  </svg>`,

  SUM_SOME: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="420" y="66" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">They sound the same.</text>
    <rect x="50" y="110" width="740" height="180" rx="16" fill="${SLATE_T}" stroke="${MUTED}" stroke-width="2"/>
    <text x="90" y="200" font-family="${FONT}" font-size="64" font-weight="bold" fill="${MUTED}">some</text>
    <text x="290" y="192" font-family="${FONT}" font-size="32" fill="${INK}">Can I have some rice?</text>
    <text x="290" y="240" font-family="${FONT}" font-size="24" fill="${MUTED}">everyday English</text>
    <rect x="50" y="330" width="740" height="180" rx="16" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2"/>
    <text x="90" y="420" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}">sum</text>
    <text x="290" y="412" font-family="${FONT}" font-size="32" fill="${INK}">The sum of 3, 4 and 5 is 12.</text>
    <text x="290" y="460" font-family="${FONT}" font-size="24" fill="${KEY}">maths: add them all</text>
  </svg>`,

  QUADS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${poly([[80, 80], [220, 80], [220, 220], [80, 220]], TEAL_T)}
    <text x="150" y="262" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">square</text>
    ${poly([[320, 95], [520, 95], [520, 205], [320, 205]], TEAL_T)}
    <text x="420" y="262" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">rectangle</text>
    ${poly([[610, 205], [650, 95], [800, 95], [760, 205]], PURPLE_T)}
    <text x="705" y="262" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">parallelogram</text>
    ${poly([[150, 310], [80, 370], [150, 480], [220, 370]], GREEN_T)}
    <text x="150" y="522" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">kite</text>
    ${poly([[330, 470], [370, 340], [470, 340], [510, 470]], ORANGE_T)}
    <text x="420" y="522" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">trapezium</text>
    ${poly([[620, 460], [650, 345], [790, 325], [760, 480]], SLATE_T)}
    <text x="705" y="522" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">any 4 sides</text>
  </svg>`,

  CORNERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${poly(CQ)}
    ${wedges(CQ, 48, [TEAL_T, PURPLE_T, ORANGE_T, GREEN_T])}
    <text x="150" y="320" font-family="${FONT}" font-size="34" font-weight="bold" fill="${TEAL}" text-anchor="middle">a</text>
    <text x="208" y="161" font-family="${FONT}" font-size="34" font-weight="bold" fill="${PURPLE}" text-anchor="middle">b</text>
    <text x="362" y="182" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">c</text>
    <text x="336" y="333" font-family="${FONT}" font-size="34" font-weight="bold" fill="${GREEN}" text-anchor="middle">d</text>
    <line x1="480" y1="225" x2="650" y2="225" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    <path d="M 650 210 L 676 225 L 650 240 Z" fill="${INK}"/>
    <text x="575" y="200" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="middle">tear off</text>
    ${wedge(880, 210, 140, 0, 78.8, TEAL_T)}
    ${wedge(880, 210, 140, 78.8, 176.8, PURPLE_T)}
    ${wedge(880, 210, 140, 176.8, 266.8, ORANGE_T)}
    ${wedge(880, 210, 140, 266.8, 360, GREEN_T)}
    <text x="946" y="166" font-family="${FONT}" font-size="34" font-weight="bold" fill="${TEAL}" text-anchor="middle">a</text>
    <text x="828" y="153" font-family="${FONT}" font-size="34" font-weight="bold" fill="${PURPLE}" text-anchor="middle">b</text>
    <text x="817" y="277" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">c</text>
    <text x="938" y="282" font-family="${FONT}" font-size="34" font-weight="bold" fill="${GREEN}" text-anchor="middle">d</text>
    <text x="880" y="410" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">a + b + c + d = 360°</text>
  </svg>`,

  QUAD_TRI: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${poly([[120, 420], [200, 120], [720, 430]], TEAL_T)}
    ${poly([[200, 120], [640, 90], [720, 430]], PURPLE_T)}
    <text x="345" y="335" font-family="${FONT}" font-size="40" font-weight="bold" fill="${TEAL}" text-anchor="middle">180°</text>
    <text x="525" y="225" font-family="${FONT}" font-size="40" font-weight="bold" fill="${PURPLE}" text-anchor="middle">180°</text>
    <text x="420" y="515" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">180° + 180° = 360°</text>
  </svg>`,

  WORKED: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${poly(WQ)}
    ${wedges(WQ, 50, [TEAL_T, TEAL_T, TEAL_T, ORANGE_T])}
    <text x="198" y="414" font-family="${FONT}" font-size="34" font-weight="bold" fill="${TEAL}" text-anchor="middle">70°</text>
    <text x="292" y="218" font-family="${FONT}" font-size="34" font-weight="bold" fill="${TEAL}" text-anchor="middle">95°</text>
    <text x="582" y="244" font-family="${FONT}" font-size="34" font-weight="bold" fill="${TEAL}" text-anchor="middle">120°</text>
    <text x="660" y="418" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">d</text>
  </svg>`,

  PHRASES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <text x="40" y="52" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">The question says…</text>
    <text x="700" y="52" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">It means…</text>
    <line x1="30" y1="72" x2="1090" y2="72" stroke="#cfd8dc" stroke-width="2"/>
    <text x="40" y="118" font-family="${FONT}" font-size="25" fill="${INK}">Calculate the value of a.</text>
    <text x="700" y="118" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Find the number a.</text>
    <text x="40" y="186" font-family="${FONT}" font-size="25" fill="${INK}">Work out the size of the angles that have a letter.</text>
    <text x="700" y="186" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Find every lettered angle.</text>
    <text x="40" y="254" font-family="${FONT}" font-size="25" fill="${INK}">AB is a straight line.</text>
    <text x="700" y="254" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Use 180°.</text>
    <text x="40" y="322" font-family="${FONT}" font-size="25" fill="${INK}">The other angles are the same size.</text>
    <text x="700" y="322" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">They are equal.</text>
    <text x="40" y="390" font-family="${FONT}" font-size="25" fill="${INK}">Give a reason.</text>
    <text x="700" y="390" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Say which fact you used.</text>
  </svg>`,

  PRACTICE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <circle cx="44" cy="52" r="22" fill="${INK}"/>
    <text x="44" y="61" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    ${wedge(210, 200, 70, 0, 35, ORANGE_T)}
    ${wedge(210, 200, 52, 35, 180, TEAL_T)}
    ${ray(40, 200, 380, 200)}
    ${ray(210, 200, 349.3, 102.5)}
    <text x="290" y="190" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">x</text>
    <text x="176" y="140" font-family="${FONT}" font-size="30" font-weight="bold" fill="${TEAL}" text-anchor="middle">145°</text>
    <circle cx="470" cy="52" r="22" fill="${INK}"/>
    <text x="470" y="61" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    ${wedge(640, 160, 38, 0, 150, TEAL_T)}
    ${wedge(640, 160, 38, 150, 235, PURPLE_T)}
    ${wedge(640, 160, 46, 235, 360, ORANGE_T)}
    ${ray(640, 160, 780, 160)}
    ${ray(640, 160, 536, 100)}
    ${ray(640, 160, 571, 258)}
    <text x="664" y="98" font-family="${FONT}" font-size="30" font-weight="bold" fill="${TEAL}" text-anchor="middle">150°</text>
    <text x="560" y="194" font-family="${FONT}" font-size="30" font-weight="bold" fill="${PURPLE}" text-anchor="middle">85°</text>
    <text x="680" y="250" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">y</text>
    <circle cx="80" cy="400" r="22" fill="${INK}"/>
    <text x="80" y="409" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">3</text>
    ${poly(ZQ)}
    ${corner(ZQ[1], ZQ[0], ZQ[2], 46, TEAL_T)}
    ${corner(ZQ[2], ZQ[1], ZQ[3], 46, ORANGE_T)}
    ${box(ZQ[0], [0, -1], [1, 0], 24)}
    ${box(ZQ[3], [0, -1], [-1, 0], 24)}
    <text x="262" y="458" font-family="${FONT}" font-size="30" font-weight="bold" fill="${TEAL}" text-anchor="middle">105°</text>
    <text x="574" y="356" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">z</text>
  </svg>`,

  PARA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${poly(PQ)}
    ${wedges(PQ, 50, [TEAL_T, ORANGE_T, TEAL_T, ORANGE_T])}
    <text x="234" y="384" font-family="${FONT}" font-size="34" font-weight="bold" fill="${TEAL}" text-anchor="middle">65°</text>
    <text x="337" y="222" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">p</text>
    <text x="638" y="217" font-family="${FONT}" font-size="38" font-weight="bold" fill="${TEAL}" text-anchor="middle">q</text>
    <text x="533" y="368" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">r</text>
    <text x="420" y="505" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="middle">a parallelogram</text>
  </svg>`,

  TILES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${poly([[420, 280], [420, 130], [270, 130], [270, 280]], TEAL_T)}
    ${poly([[420, 280], [270, 280], [270, 430], [420, 430]], TEAL_T)}
    ${poly([[420, 280], [420, 430], [549.9, 355]], PURPLE_T)}
    ${box([420, 280], [0, -1], [-1, 0], 24)}
    ${box([420, 280], [-1, 0], [0, 1], 24)}
    ${wedge(420, 280, 80, 330, 450, ORANGE_T)}
    <text x="345" y="214" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">square</text>
    <text x="345" y="364" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">square</text>
    <text x="448" y="368" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PURPLE}" text-anchor="middle">60°</text>
    <text x="466" y="268" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">y</text>
    <text x="640" y="470" font-family="${FONT}" font-size="26" fill="${PURPLE}" text-anchor="middle">equilateral triangle</text>
  </svg>`,

  READ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${wedge(60, 270, 70, 0, 60, TEAL_T)}
    ${ray(60, 270, 250, 270)}
    ${ray(60, 270, 155, 105.5)}
    <text x="150" y="238" font-family="${FONT}" font-size="36" font-weight="bold" fill="${TEAL}" text-anchor="middle">60°</text>
    <text x="150" y="350" font-family="${FONT}" font-size="26" font-weight="bold" fill="${TEAL}" text-anchor="middle">a number</text>
    <text x="150" y="390" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">We know this angle.</text>
    ${wedge(340, 270, 70, 0, 60, ORANGE_T)}
    ${ray(340, 270, 530, 270)}
    ${ray(340, 270, 435, 105.5)}
    <text x="425" y="240" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">a</text>
    <text x="430" y="350" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">a letter</text>
    <text x="430" y="390" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">Find this angle.</text>
    ${ray(640, 270, 820, 270)}
    ${ray(640, 270, 640, 100)}
    ${box([640, 270], [1, 0], [0, -1], 34)}
    <text x="715" y="350" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PURPLE}" text-anchor="middle">a small square</text>
    <text x="715" y="390" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">This angle is 90°.</text>
    <text x="975" y="250" font-family="${FONT}" font-size="110" font-weight="bold" fill="${GREEN}" text-anchor="middle">°</text>
    <text x="975" y="350" font-family="${FONT}" font-size="26" font-weight="bold" fill="${GREEN}" text-anchor="middle">degrees</text>
    <text x="975" y="390" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">60° = 60 degrees</text>
  </svg>`,

  PIZZA_Q: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <image href="${pizza}" x="25" y="90" width="400" height="380" preserveAspectRatio="xMidYMid meet"/>
    ${[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => wedge(630, 260, 170, a, a + 45, i === 0 ? ORANGE_T : '#ffffff')).join('\n    ')}
    <text x="732" y="232" font-family="${FONT}" font-size="48" font-weight="bold" fill="${KEY}" text-anchor="middle">?</text>
    <text x="630" y="490" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">8 equal slices</text>
  </svg>`,

  TEAR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <g transform="translate(-4 24) scale(0.75)">
      ${poly(CQ)}
      ${wedges(CQ, 48, [TEAL_T, PURPLE_T, ORANGE_T, GREEN_T])}
    </g>
    <text x="109" y="264" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TEAL}" text-anchor="middle">a</text>
    <text x="152" y="145" font-family="${FONT}" font-size="28" font-weight="bold" fill="${PURPLE}" text-anchor="middle">b</text>
    <text x="268" y="161" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">c</text>
    <text x="248" y="274" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">d</text>
    <g transform="translate(369 24) scale(0.75)">
      ${poly(CQ, '#ffffff')}
      ${tornCorners(CQ, 48, [TEAL_T, PURPLE_T, ORANGE_T, GREEN_T])}
    </g>
    ${scattered(933, 200, [TEAL_T, PURPLE_T, ORANGE_T, GREEN_T])}
    <circle cx="933" cy="200" r="6" fill="${INK}"/>
    <text x="933" y="325" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">?</text>
    <circle cx="40" cy="44" r="22" fill="${INK}"/>
    <text x="40" y="53" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    <circle cx="413" cy="44" r="22" fill="${INK}"/>
    <text x="413" y="53" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    <circle cx="786" cy="44" r="22" fill="${INK}"/>
    <text x="786" y="53" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">3</text>
    <text x="187" y="395" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">Draw. Mark the corners.</text>
    <text x="560" y="395" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">Tear off the corners.</text>
    <text x="933" y="395" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">Put the points together.</text>
  </svg>`,

  ANS_YES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand}
    <text x="440" y="214" font-family="${FONT}" font-size="140" font-weight="bold" fill="${BLUE}" text-anchor="middle">Yes</text>
  </svg>`,

  ANS_NO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand}
    <text x="280" y="214" font-family="${FONT}" font-size="140" font-weight="bold" fill="${KEY}" text-anchor="middle">No</text>
  </svg>`,

  ANS_SOME: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand}
    <text x="460" y="150" font-family="${FONT}" font-size="64" font-weight="bold" fill="${BLUE}" text-anchor="middle">Only</text>
    <text x="460" y="230" font-family="${FONT}" font-size="64" font-weight="bold" fill="${BLUE}" text-anchor="middle">some</text>
  </svg>`,

  ANS_ALL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand}
    <text x="260" y="150" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}" text-anchor="middle">Every</text>
    <text x="260" y="230" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}" text-anchor="middle">one</text>
  </svg>`,
}

// The goals slide's pictures: the same three diagrams, with a ? where the
// letter was (slide 4 teaches what a letter means).
DIAGRAMS.PIC_LINE = DIAGRAMS.LINE.replace('>a</text>', '>?</text>')
DIAGRAMS.PIC_POINT = DIAGRAMS.POINT.replace('>b</text>', '>?</text>')
DIAGRAMS.PIC_QUAD = DIAGRAMS.WORKED.replace('>d</text>', '>?</text>')

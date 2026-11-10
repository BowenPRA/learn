// content/y7-math/U05_2/diagrams.js
// Teaching diagrams for 5.2 Intersecting lines, drawn to match 5.1.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes only, because
//    `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · `split` diagrams are 840×560, `showcase` ones 1120×440, vote cards 720×320.
//
// Label positions were worked out from each angle's bisector, so the numbers
// can be literal. Like the book's, the diagrams are not drawn to scale, and
// they stay in English.
//
//   The goals    PIC_X · PIC_TRACKS · PIC_ROAD — one picture each, no words
//   Two lines    SCISSORS_PHOTO  real scissors: two straight lines, the same
//                                angle at the blades and at the handles
//                SAY_WHY         the answer, because, the reason
//                TRACKS_PHOTO    a level crossing from above: the rails are
//                                parallel, the road is perpendicular to them
//                READ            a number, a letter, a small square, arrows
//                CROSS_Q         115° and a, b, c where two lines cross
//   Parallel     ANS_F_A / ANS_F_B   vote: which angle is also 70°?
//                SLIDE_DOWN      corresponding angles: slide the top crossing
//                                down the line and it fits (an upright F)
//                ANS_Z_A / ANS_Z_B   vote: between the lines, which is 70°?
//                Z_PROOF         alternate angles: the same place
//                                (corresponding), then opposite that
//                                (vertically opposite), so the Z angles are equal
//                XFZ             put it together: X, F and Z (Draw This). The F
//                                stands upright and the Z is not mirrored, so
//                                each one looks like its letter
//   The book     PHRASES         the Workbook's question words
//                PRACTICE        48°, 75° and x, y, z between parallel lines
//                SHELVES         Mr Bowen's shelves: 90°, 82°, 90°
//                STATEMENTS      65° and x on two lines with no arrows
//                LADDER          the painters' ladder (a real photo)
//                PIZZA           two straight cuts, one slice 50°

import scissorsPhoto from './images/scissors.jpg'
import crossingPhoto from './images/crossing-above.jpg'
import paintersPhoto from './images/painters.jpg'

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
const BLUE_T = '#e3eef9'
const STEEL = '#e3e8ee'
const WOOD = '#c8955c'
const WOOD_EDGE = '#8a5d2e'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const rad = (d) => (d * Math.PI) / 180
// A point at distance r from (cx, cy), at angle d degrees anticlockwise from east.
const at = (cx, cy, r, d) => [cx + r * Math.cos(rad(d)), cy - r * Math.sin(rad(d))]
const f = (n) => n.toFixed(1)

// A filled sector from angle a1 round to a2 (anticlockwise, degrees).
const wedge = (cx, cy, r, a1, a2, fill, stroke = INK, sw = 2.5) => {
  const [x1, y1] = at(cx, cy, r, a1)
  const [x2, y2] = at(cx, cy, r, a2)
  const large = a2 - a1 > 180 ? 1 : 0
  return `<path d="M ${f(cx)} ${f(cy)} L ${f(x1)} ${f(y1)} A ${r} ${r} 0 ${large} 0 ${f(x2)} ${f(y2)} Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`
}

const seg = (x1, y1, x2, y2, w = 5, color = INK) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`

// The open arrowhead that marks a pair of parallel lines, tip at (x, y), pointing along d.
const chevron = (x, y, d, color = INK, s = 16, w = 4) => {
  const [ax, ay] = at(x, y, s, d + 148)
  const [bx, by] = at(x, y, s, d - 148)
  return `<path d="M ${f(ax)} ${f(ay)} L ${f(x)} ${f(y)} L ${f(bx)} ${f(by)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`
}

// A right-angle box at (x, y) between directions d and d + 90.
const box = (x, y, d, s = 24, color = INK) => {
  const [ax, ay] = at(x, y, s, d)
  const [bx, by] = at(x, y, s * Math.SQRT2, d + 45)
  const [cx, cy] = at(x, y, s, d + 90)
  return `<path d="M ${f(ax)} ${f(ay)} L ${f(bx)} ${f(by)} L ${f(cx)} ${f(cy)}" fill="none" stroke="${color}" stroke-width="3"/>`
}

// The X, F or Z traced thick and pale under the lines.
const glow = (pts, color = KEY, w = 18) =>
  `<polyline points="${pts.map((p) => p.map(f).join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="${w}" stroke-opacity="0.3" stroke-linecap="round" stroke-linejoin="round"/>`

const dot = (x, y, color = INK, r = 5) => `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${color}"/>`

const leader = (x1, y1, x2, y2, color = KEY) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${color}" stroke-width="2.5"/><circle cx="${f(x2)}" cy="${f(y2)}" r="5" fill="${color}"/>`

// A white backing for a label printed over a photograph.
const pill = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#ffffff" fill-opacity="0.92" stroke="#cbd5e1" stroke-width="1.5"/>`

const photo = (id, href, x, y, w, h, fit = 'slice') => `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid ${fit}" clip-path="url(#${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="#cbd5e1" stroke-width="2"/>`

// Railway sleepers under a pair of rails (top-down), from x1 to x2.
const sleepers = (x1, x2, yTop, yBot, step = 34) => {
  let s = ''
  for (let x = x1; x <= x2; x += step) s += `<rect x="${x}" y="${yTop}" width="14" height="${yBot - yTop}" rx="2" fill="#b98a5a" stroke="#7a5532" stroke-width="1.5"/>`
  return s
}

// The voting hands from 2.3 and 5.1.
const HAND_PATHS = `<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>`
const leftHand = `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${BLUE}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = `<g transform="translate(528 76) scale(7)" fill="none" stroke="${KEY}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`

// A blade of the drawn scissors, from the pivot (x, y) along d.
const blade = (x, y, d, len) => {
  const [tx, ty] = at(x, y, len, d)
  const [ax, ay] = at(x, y, 9, d + 90)
  const [bx, by] = at(x, y, 9, d - 90)
  return `<path d="M ${f(ax)} ${f(ay)} L ${f(tx)} ${f(ty)} L ${f(bx)} ${f(by)} Z" fill="${STEEL}" stroke="#7d8a97" stroke-width="2.5" stroke-linejoin="round"/>`
}
// A handle of the drawn scissors: a shaft and a ring, along d.
const handle = (x, y, d, len) => {
  const [hx, hy] = at(x, y, len - 36, d)
  const [rx, ry] = at(x, y, len, d)
  return `<line x1="${x}" y1="${y}" x2="${f(hx)}" y2="${f(hy)}" stroke="#d83a2e" stroke-width="13" stroke-linecap="round"/>
    <ellipse cx="${f(rx)}" cy="${f(ry)}" rx="36" ry="24" transform="rotate(${f(-d)} ${f(rx)} ${f(ry)})" fill="none" stroke="#d83a2e" stroke-width="11"/>`
}

const parallelPair = (x1, x2, y1, y2, arrowX) => `${seg(x1, y1, x2, y1)}
    ${seg(x1, y2, x2, y2)}
    ${chevron(arrowX, y1, 0)}
    ${chevron(arrowX, y2, 0)}`

export const DIAGRAMS = {
  // ── The goals ─────────────────────────────────────────────────────────────
  PIC_X: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${wedge(262, 150, 140, -20, 20, TEAL_T, TEAL, 3)}
    ${wedge(262, 150, 140, 160, 200, TEAL_T, TEAL, 3)}
    ${wedge(262, 150, 40, 20, 160, PURPLE_T, PURPLE, 3)}
    ${wedge(262, 150, 40, 200, 340, PURPLE_T, PURPLE, 3)}
    ${blade(262, 150, 20, 205)}
    ${blade(262, 150, -20, 205)}
    ${handle(262, 150, 200, 150)}
    ${handle(262, 150, 160, 150)}
    ${dot(262, 150, '#9aa5b1', 9)}
  </svg>`,

  PIC_TRACKS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    <rect x="20" y="96" width="440" height="108" fill="#d9d2c4"/>
    ${sleepers(30, 440, 104, 196)}
    ${seg(20, 122, 460, 122, 8, '#6b7580')}
    ${seg(20, 178, 460, 178, 8, '#6b7580')}
  </svg>`,

  PIC_ROAD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${seg(169.6, 282.4, 310.4, 17.6, 30, '#9aa3ad')}
    <line x1="169.6" y1="282.4" x2="310.4" y2="17.6" stroke="#ffffff" stroke-width="3" stroke-dasharray="12 10"/>
    ${wedge(266.6, 100, 46, 0, 62, ORANGE_T, KEY, 3)}
    ${seg(30, 100, 450, 100, 6)}
    ${seg(30, 200, 450, 200, 6)}
  </svg>`,

  // ── Two lines cross ───────────────────────────────────────────────────────
  SCISSORS_PHOTO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('sc-photo', scissorsPhoto, 20, 30, 800, 313)}
    ${wedge(372.7, 150.7, 130, 159.8, 183.6, '#f6b26b', KEY, 3)}
    ${wedge(372.7, 150.7, 130, -20.2, 3.6, '#f6b26b', KEY, 3)}
    <line x1="121.2" y1="58.1" x2="813.8" y2="313" stroke="${TEAL}" stroke-width="4" stroke-dasharray="14 10"/>
    <line x1="23.4" y1="172.6" x2="816.8" y2="122.7" stroke="${TEAL}" stroke-width="4" stroke-dasharray="14 10"/>
    ${dot(372.7, 150.7, INK, 6)}
    ${leader(190, 400, 244, 132)}
    ${leader(650, 400, 501, 169)}
    <text x="190" y="438" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">the blades</text>
    <text x="650" y="438" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">the handles</text>
    <text x="420" y="510" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">the same angle</text>
    <text x="420" y="400" font-family="${FONT}" font-size="22" fill="${TEAL}" text-anchor="middle">two straight lines</text>
  </svg>`,

  SAY_WHY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${wedge(200, 230, 62, -20, 20, TEAL_T, TEAL, 3)}
    ${wedge(200, 230, 62, 160, 200, ORANGE_T, KEY, 3)}
    ${wedge(200, 230, 52, 20, 160, ORANGE_T, KEY, 3)}
    ${seg(35.6, 289.9, 364.4, 170.1)}
    ${seg(35.6, 170.1, 364.4, 289.9)}
    ${dot(200, 230, INK, 6)}
    <text x="300" y="242" font-family="${FONT}" font-size="34" font-weight="bold" fill="${TEAL}" text-anchor="middle">40°</text>
    <text x="100" y="245" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">a</text>
    <text x="200" y="153" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">b</text>
    <text x="420" y="62" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}">the answer</text>
    <text x="760" y="62" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}">the reason</text>
    <line x1="400" y1="80" x2="1090" y2="80" stroke="#cfd8dc" stroke-width="2"/>
    <rect x="400" y="100" width="690" height="128" rx="14" fill="${ORANGE_T}"/>
    <text x="420" y="178" font-family="${FONT}" font-size="38" font-weight="bold" fill="${BLUE}">a = 40°</text>
    <text x="600" y="176" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}">because</text>
    <text x="760" y="156" font-family="${FONT}" font-size="26" fill="${INK}">they are vertically</text>
    <text x="760" y="194" font-family="${FONT}" font-size="26" fill="${INK}">opposite angles.</text>
    <rect x="400" y="248" width="690" height="128" rx="14" fill="${ORANGE_T}"/>
    <text x="420" y="326" font-family="${FONT}" font-size="38" font-weight="bold" fill="${BLUE}">b = 140°</text>
    <text x="600" y="324" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}">because</text>
    <text x="760" y="304" font-family="${FONT}" font-size="26" fill="${INK}">angles on a straight</text>
    <text x="760" y="342" font-family="${FONT}" font-size="26" fill="${INK}">line add up to 180°.</text>
    <text x="745" y="414" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">180° − 40° = 140°</text>
  </svg>`,

  TRACKS_PHOTO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('tr-photo', crossingPhoto, 40, 10, 760, 540)}
    <line x1="404.5" y1="12" x2="417.6" y2="246" stroke="${KEY}" stroke-width="6" stroke-linecap="round"/>
    <line x1="422.8" y1="12" x2="437.2" y2="246" stroke="${KEY}" stroke-width="6" stroke-linecap="round"/>
    ${chevron(407, 58, -86.8, KEY, 15, 4)}
    ${chevron(425.6, 58, -86.8, KEY, 15, 4)}
    <line x1="251" y1="314" x2="631" y2="314" stroke="${BLUE}" stroke-width="6" stroke-linecap="round"/>
    ${box(421.4, 314, 90, 22, BLUE)}
    ${pill(150, 74, 196, 50)}
    <text x="248" y="109" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">parallel</text>
    ${leader(346, 99, 408, 99)}
    ${pill(470, 196, 256, 50)}
    <text x="598" y="231" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">perpendicular</text>
    ${leader(520, 246, 432, 300, BLUE)}
    ${pill(60, 474, 420, 46)}
    <text x="270" y="505" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">a railway and a road, from above</text>
  </svg>`,

  READ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${wedge(70, 280, 76, 0, 65, TEAL_T, TEAL, 3)}
    ${seg(70, 280, 250, 280, 4)}
    ${seg(70, 280, 150.3, 107.8, 4)}
    <text x="158" y="237" font-family="${FONT}" font-size="36" font-weight="bold" fill="${TEAL}" text-anchor="middle">65°</text>
    <text x="150" y="352" font-family="${FONT}" font-size="26" font-weight="bold" fill="${TEAL}" text-anchor="middle">a number</text>
    <text x="150" y="392" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">We know this angle.</text>
    ${wedge(350, 280, 76, 0, 65, ORANGE_T, KEY, 3)}
    ${seg(350, 280, 530, 280, 4)}
    ${seg(350, 280, 430.3, 107.8, 4)}
    <text x="438" y="240" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">a</text>
    <text x="430" y="352" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">a letter</text>
    <text x="430" y="392" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">Find this angle.</text>
    ${seg(640, 280, 820, 280, 4)}
    ${seg(640, 280, 640, 110, 4)}
    ${box(640, 280, 0, 34)}
    <text x="715" y="352" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PURPLE}" text-anchor="middle">a small square</text>
    <text x="715" y="392" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">This angle is 90°.</text>
    ${seg(880, 180, 1080, 140, 4)}
    ${seg(880, 262, 1080, 222, 4)}
    ${chevron(992, 157.6, 11.3, GREEN, 18, 4)}
    ${chevron(992, 239.6, 11.3, GREEN, 18, 4)}
    <text x="980" y="352" font-family="${FONT}" font-size="26" font-weight="bold" fill="${GREEN}" text-anchor="middle">arrows</text>
    <text x="980" y="392" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">They are parallel.</text>
  </svg>`,

  CROSS_Q: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${wedge(420, 290, 62, 25, 140, TEAL_T, TEAL, 3)}
    ${wedge(420, 290, 62, 140, 205, ORANGE_T, KEY, 3)}
    ${wedge(420, 290, 62, 205, 320, ORANGE_T, KEY, 3)}
    ${wedge(420, 290, 62, 320, 385, ORANGE_T, KEY, 3)}
    ${seg(120.9, 429.5, 719.1, 150.5)}
    ${seg(167.2, 77.9, 672.8, 502.1)}
    ${dot(420, 290, INK, 6)}
    <text x="433" y="204" font-family="${FONT}" font-size="38" font-weight="bold" fill="${TEAL}" text-anchor="middle">115°</text>
    <text x="321" y="292" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">b</text>
    <text x="407" y="404" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">a</text>
    <text x="519" y="318" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">c</text>
    <text x="420" y="540" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">two straight lines</text>
  </svg>`,

  // ── A line across two parallel lines ──────────────────────────────────────
  // The F stands upright: the line across leans back (110°), the top arm sits
  // at the top of the stem, the middle arm lower down, and the equal angles
  // sit under each arm.
  ANS_F_A: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand}
    ${wedge(430, 100, 42, 290, 360, ORANGE_T, KEY, 3)}
    ${wedge(477.3, 230, 42, 290, 360, BLUE_T, BLUE, 3)}
    ${parallelPair(250, 700, 100, 230, 660)}
    ${seg(504.7, 305.2, 402.6, 24.8)}
    <text x="482" y="147" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">70°</text>
    <text x="526" y="277" font-family="${FONT}" font-size="38" font-weight="bold" fill="${BLUE}" text-anchor="middle">?</text>
  </svg>`,

  ANS_F_B: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand}
    ${wedge(200, 100, 42, 290, 360, ORANGE_T, KEY, 3)}
    ${wedge(247.3, 230, 42, 0, 110, BLUE_T, BLUE, 3)}
    ${parallelPair(20, 470, 100, 230, 430)}
    ${seg(274.7, 305.2, 172.6, 24.8)}
    <text x="252" y="147" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">70°</text>
    <text x="282" y="194" font-family="${FONT}" font-size="38" font-weight="bold" fill="${BLUE}" text-anchor="middle">?</text>
  </svg>`,

  SLIDE_DOWN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${glow([[570, 130], [360, 130], [469.2, 430]])}
    ${glow([[432.8, 330], [642.8, 330]])}
    ${wedge(360, 130, 56, 290, 360, ORANGE_T, KEY, 3)}
    ${wedge(432.8, 330, 56, 290, 360, ORANGE_T, KEY, 3)}
    ${parallelPair(60, 800, 130, 330, 750)}
    ${seg(338.2, 70, 472.8, 440)}
    ${dot(360, 130)}
    ${dot(432.8, 330)}
    <text x="427" y="188" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">70°</text>
    <text x="500" y="388" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">70°</text>
    <path d="M 320.5 167.8 L 374.2 315.2" fill="none" stroke="${BLUE}" stroke-width="5" stroke-dasharray="12 9" stroke-linecap="round"/>
    <path d="M 380.4 332.1 L 365.7 318.3 L 382.7 312.1 Z" fill="${BLUE}"/>
    <text x="318" y="236" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="end">slide it</text>
    <text x="318" y="268" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="end">down</text>
    <text x="640" y="226" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">the same place</text>
    <text x="640" y="262" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">on each line</text>
    <text x="420" y="500" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">It fits: the angles are the same.</text>
    <text x="420" y="540" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">an F shape</text>
  </svg>`,

  // A true Z: the line across leans forward (70°), the top arm goes left, the
  // bottom arm goes right, and the equal angles sit inside the two corners.
  ANS_Z_A: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand}
    ${wedge(500, 100, 42, 180, 250, ORANGE_T, KEY, 3)}
    ${wedge(452.7, 230, 42, 0, 70, BLUE_T, BLUE, 3)}
    ${parallelPair(250, 700, 100, 230, 660)}
    ${seg(425.3, 305.2, 527.4, 24.8)}
    <text x="448" y="147" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">70°</text>
    <text x="502" y="208" font-family="${FONT}" font-size="38" font-weight="bold" fill="${BLUE}" text-anchor="middle">?</text>
  </svg>`,

  ANS_Z_B: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand}
    ${wedge(270, 100, 42, 180, 250, ORANGE_T, KEY, 3)}
    ${wedge(222.7, 230, 42, 70, 180, BLUE_T, BLUE, 3)}
    ${parallelPair(20, 470, 100, 230, 430)}
    ${seg(195.3, 305.2, 297.4, 24.8)}
    <text x="218" y="147" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">70°</text>
    <text x="188" y="200" font-family="${FONT}" font-size="38" font-weight="bold" fill="${BLUE}" text-anchor="middle">?</text>
  </svg>`,

  Z_PROOF: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${glow([[202.8, 96], [402.8, 96], [330, 296], [530, 296]])}
    ${wedge(402.8, 96, 56, 180, 250, ORANGE_T, KEY, 3)}
    ${wedge(330, 296, 56, 180, 250, '#ffffff', MUTED, 2.5)}
    ${wedge(330, 296, 56, 0, 70, ORANGE_T, KEY, 3)}
    ${parallelPair(40, 800, 96, 296, 750)}
    ${seg(295.8, 390, 433.6, 11.4)}
    ${dot(402.8, 96)}
    ${dot(330, 296)}
    <text x="336" y="154" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">70°</text>
    <text x="263" y="353" font-family="${FONT}" font-size="30" font-weight="bold" fill="${MUTED}" text-anchor="middle">70°</text>
    <text x="397" y="260" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">70°</text>
    <circle cx="208" cy="344" r="17" fill="${MUTED}"/>
    <text x="208" y="352" font-family="${FONT}" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    <circle cx="452" cy="250" r="17" fill="${KEY}"/>
    <text x="452" y="258" font-family="${FONT}" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    <text x="40" y="444" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">1. The same place: 70° (corresponding)</text>
    <text x="40" y="484" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">2. Opposite that: 70° (vertically opposite)</text>
    <text x="40" y="530" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">So the two angles in the Z are equal.</text>
  </svg>`,

  XFZ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 748" class="w-full h-full">
    ${plate(840, 748)}
    <rect x="20" y="16" width="800" height="228" rx="18" fill="${TEAL_T}"/>
    ${wedge(175, 132, 46, -30, 30, ORANGE_T, KEY, 3)}
    ${wedge(175, 132, 46, 150, 210, ORANGE_T, KEY, 3)}
    ${seg(53.8, 202, 296.2, 62)}
    ${seg(53.8, 62, 296.2, 202)}
    ${dot(175, 132)}
    <text x="340" y="104" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}">X</text>
    <text x="420" y="104" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}">vertically opposite</text>
    <text x="420" y="152" font-family="${FONT}" font-size="30" fill="${INK}">angles are equal</text>

    <rect x="20" y="260" width="800" height="228" rx="18" fill="${PURPLE_T}"/>
    ${glow([[290, 300], [150, 300], [211.9, 470]], KEY, 16)}
    ${glow([[186.4, 400], [290, 400]], KEY, 16)}
    ${wedge(150, 300, 38, 290, 360, ORANGE_T, KEY, 3)}
    ${wedge(186.4, 400, 38, 290, 360, ORANGE_T, KEY, 3)}
    ${seg(40, 300, 310, 300)}
    ${seg(40, 400, 310, 400)}
    ${chevron(80, 300, 0)}
    ${chevron(80, 400, 0)}
    ${seg(139.8, 272, 215.5, 480)}
    <text x="340" y="350" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}">F</text>
    <text x="420" y="350" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}">corresponding</text>
    <text x="420" y="398" font-family="${FONT}" font-size="30" fill="${INK}">angles are equal</text>

    <rect x="20" y="504" width="800" height="228" rx="18" fill="${GREEN_T}"/>
    ${glow([[60, 548], [205, 548], [157.7, 678], [300, 678]], KEY, 16)}
    ${wedge(205, 548, 38, 180, 250, ORANGE_T, KEY, 3)}
    ${wedge(157.7, 678, 38, 0, 70, ORANGE_T, KEY, 3)}
    ${seg(40, 548, 310, 548)}
    ${seg(40, 678, 310, 678)}
    ${chevron(270, 548, 0)}
    ${chevron(270, 678, 0)}
    ${seg(144.6, 714, 216.6, 516)}
    <text x="340" y="596" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}">Z</text>
    <text x="420" y="596" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}">alternate</text>
    <text x="420" y="644" font-family="${FONT}" font-size="30" fill="${INK}">angles are equal</text>
  </svg>`,

  // ── The Workbook ──────────────────────────────────────────────────────────
  PHRASES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <text x="40" y="52" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">The question says…</text>
    <text x="680" y="52" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">It means…</text>
    <line x1="30" y1="72" x2="1090" y2="72" stroke="#cfd8dc" stroke-width="2"/>
    <text x="40" y="118" font-family="${FONT}" font-size="25" fill="${INK}">Calculate the value of x.</text>
    <text x="680" y="118" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Find x.</text>
    <text x="40" y="186" font-family="${FONT}" font-size="25" fill="${INK}">Give a reason.</text>
    <text x="680" y="186" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Say the fact, after because.</text>
    <text x="40" y="254" font-family="${FONT}" font-size="25" fill="${INK}">Explain why…</text>
    <text x="680" y="254" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Show each step, and say why.</text>
    <text x="40" y="322" font-family="${FONT}" font-size="25" fill="${INK}">Which statement, A, B or C, is correct?</text>
    <text x="680" y="322" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Choose one, then say why.</text>
    <text x="40" y="390" font-family="${FONT}" font-size="25" fill="${INK}">You need more information.</text>
    <text x="680" y="390" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">The picture does not tell you.</text>
  </svg>`,

  PRACTICE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${wedge(380, 150, 58, 180, 228, TEAL_T, TEAL, 3)}
    ${wedge(380, 150, 50, 228, 303, TEAL_T, TEAL, 3)}
    ${wedge(380, 150, 58, 303, 360, ORANGE_T, KEY, 3)}
    ${wedge(145.9, 410, 52, 0, 48, ORANGE_T, KEY, 3)}
    ${wedge(548.8, 410, 52, 123, 180, ORANGE_T, KEY, 3)}
    ${parallelPair(40, 800, 150, 410, 760)}
    ${seg(115.1, 444.2, 380, 150)}
    ${seg(573.9, 448.6, 380, 150)}
    ${dot(380, 150)}
    <text x="312" y="191" font-family="${FONT}" font-size="30" font-weight="bold" fill="${TEAL}" text-anchor="middle">48°</text>
    <text x="373" y="244" font-family="${FONT}" font-size="30" font-weight="bold" fill="${TEAL}" text-anchor="middle">75°</text>
    <text x="445" y="199" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">x</text>
    <text x="210" y="395" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">y</text>
    <text x="487" y="390" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">z</text>
  </svg>`,

  SHELVES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="124" y="60" width="26" height="460" fill="${WOOD}" stroke="${WOOD_EDGE}" stroke-width="3"/>
    ${box(150, 162, 270, 26, INK)}
    ${wedge(150, 302, 52, 270, 352, ORANGE_T, KEY, 3)}
    ${box(150, 442, 270, 26, INK)}
    <rect x="150" y="150" width="560" height="12" fill="${WOOD}" stroke="${WOOD_EDGE}" stroke-width="3"/>
    <rect x="150" y="290" width="560" height="12" fill="${WOOD}" stroke="${WOOD_EDGE}" stroke-width="3" transform="rotate(8 150 302)"/>
    <rect x="150" y="430" width="560" height="12" fill="${WOOD}" stroke="${WOOD_EDGE}" stroke-width="3"/>
    <text x="216" y="210" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">90°</text>
    <text x="214" y="356" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">82°</text>
    <text x="216" y="490" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">90°</text>
    <text x="745" y="166" font-family="${FONT}" font-size="40" font-weight="bold" fill="${BLUE}" text-anchor="middle">A</text>
    <text x="745" y="390" font-family="${FONT}" font-size="40" font-weight="bold" fill="${BLUE}" text-anchor="middle">B</text>
    <text x="745" y="446" font-family="${FONT}" font-size="40" font-weight="bold" fill="${BLUE}" text-anchor="middle">C</text>
    <text x="137" y="34" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">the side</text>
  </svg>`,

  STATEMENTS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${wedge(440, 150, 56, 0, 65, TEAL_T, TEAL, 3)}
    ${wedge(323.4, 400, 56, 0, 65, ORANGE_T, KEY, 3)}
    ${seg(60, 150, 780, 150)}
    ${seg(60, 400, 780, 400)}
    ${seg(276.9, 499.7, 486.5, 50.3)}
    ${dot(440, 150)}
    ${dot(323.4, 400)}
    <text x="507" y="118" font-family="${FONT}" font-size="32" font-weight="bold" fill="${TEAL}" text-anchor="middle">65°</text>
    <text x="391" y="372" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">x</text>
    <text x="640" y="276" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">no arrows</text>
  </svg>`,

  LADDER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('ld-photo', paintersPhoto, 80, 10, 681, 540)}
    ${pill(270, 30, 300, 50)}
    <text x="420" y="65" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">Mr Bowen’s ladder</text>
    ${leader(270, 55, 190, 110)}
  </svg>`,

  PIZZA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <circle cx="420" cy="280" r="225" fill="#e8b46a" stroke="${INK}" stroke-width="3"/>
    <circle cx="420" cy="280" r="196" fill="#d9472b"/>
    <circle cx="420" cy="280" r="190" fill="#f3d27a"/>
    <circle cx="350" cy="190" r="16" fill="#c0392b"/><circle cx="500" cy="210" r="16" fill="#c0392b"/>
    <circle cx="330" cy="350" r="16" fill="#c0392b"/><circle cx="470" cy="380" r="16" fill="#c0392b"/>
    <circle cx="420" cy="150" r="16" fill="#c0392b"/><circle cx="270" cy="270" r="16" fill="#c0392b"/>
    ${wedge(420, 280, 110, -25, 25, ORANGE_T, KEY, 3)}
    ${seg(225.1, 370.9, 614.9, 189.1, 6)}
    ${seg(225.1, 189.1, 614.9, 370.9, 6)}
    ${dot(420, 280, INK, 6)}
    ${pill(522, 254, 96, 52)}
    <text x="570" y="294" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">50°</text>
  </svg>`,
}


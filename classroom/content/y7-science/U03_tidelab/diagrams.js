// content/y7-science/U03_tidelab/diagrams.js
// Teaching diagrams for the River Tide Lab.
//
//   The goals
//     PIC_POLE / PIC_TABLE / PIC_GRAPH   one picture per goal, no words
//   Reading the pole
//     POLE_READ     three poles, A B C, the water at 60, 130 and 85 cm (the
//                   last halfway between two marks): whiteboards, then reveal
//     METHOD        eyes level with the water, and the middle of the waves
//   The plan
//     CALENDAR      the two weeks, a dot for every reading: 11 days × 4
//     TABLE_BLANK   Draw This: the results table, days across, times down,
//                   the unit in the heading
//   The graph
//     AXES_BLANK    empty axes for the class's guess at today's graph
//     COMING_IN     a tide curve read left to right: coming in, going out
//     LINE_GRAPH    how to draw it: one example day (not our data), crosses
//                   joined with a ruler
//   The predictions
//     ANS_SAME / ANS_LATER    vote: high tide tomorrow, the same time or later?
//     ANS_WEEK1 / ANS_WEEK2   vote: which week has the biggest tides?
//     CALENDAR_MOON the same two weeks with the Moon: full moon Mon 26 Oct,
//                   half moon Mon 2 Nov, new moon Mon 9 Nov (computed, Meeus)
//
// Split diagrams are 840×560, the showcase table 1120×440, vote cards 720×320,
// goal pictures 480×300 — the shapes those layouts give a picture (as in 3.4).
// The drawn pole is marked every 10 cm and numbered every 20 cm.
// Label <text> is written out literally so `npm run audit:svg` can measure it;
// the helpers below draw shapes only. Diagrams stay in English (house rule).

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const BLUE = '#1a5fa8'
const RULE = '#d5dbe1'
const SEA = '#cfe6f5'
const SEA_EDGE = '#5b9bd5'
const MUD = '#d9c7a3'
const BAMBOO = '#dcb862'
const NODE = '#a07d2e'
const MOON = '#d9dde3'
const DARK_MOON = '#4b5563'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const f1 = (n) => Number(n.toFixed(1))

const arrow = (x1, y1, x2, y2, color, w = 5, head = 18) => {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const hx = x2 - head * Math.cos(a), hy = y2 - head * Math.sin(a)
  const px = head * 0.55 * Math.sin(a), py = -head * 0.55 * Math.cos(a)
  return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(hx)}" y2="${f1(hy)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M ${f1(x2)} ${f1(y2)} L ${f1(hx + px)} ${f1(hy + py)} L ${f1(hx - px)} ${f1(hy - py)} Z" fill="${color}"/>`
}

const leader = (x1, y1, x2, y2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${KEY}" stroke-width="2"/><circle cx="${x2}" cy="${y2}" r="4.5" fill="${KEY}"/>`

// A bamboo pole from `top` to `bottom`, centre x, with a node every `node` px.
const bamboo = (x, top, bottom, w, node = 90) => {
  let s = `<rect x="${f1(x - w / 2)}" y="${top}" width="${w}" height="${bottom - top}" rx="${f1(w / 3)}" fill="${BAMBOO}" stroke="${INK}" stroke-width="2.5"/>`
  for (let y = top + node * 0.6; y < bottom - 10; y += node) {
    s += `<line x1="${f1(x - w / 2)}" y1="${f1(y)}" x2="${f1(x + w / 2)}" y2="${f1(y)}" stroke="${NODE}" stroke-width="3"/>`
  }
  return s
}

// Tick marks on a pole: every 10 cm, the 20s long. y0 = the 0 cm mark,
// k = px per cm, from `lo` to `hi` cm.
const ticks = (x, w, y0, k, lo, hi) => {
  let s = ''
  for (let v = lo; v <= hi; v += 10) {
    const y = f1(y0 - (v - lo) * k)
    const long = v % 20 === 0
    s += `<line x1="${f1(x - w / 2)}" y1="${y}" x2="${f1(long ? x + w / 2 : x)}" y2="${y}" stroke="${INK}" stroke-width="${long ? 3 : 2.5}"/>`
  }
  return s
}

// Water up to `y` in a box, the part of the pole under it tinted, and the line
// where the water touches the pole.
const river = (x1, x2, y, floor) => `<rect x="${x1}" y="${f1(y)}" width="${x2 - x1}" height="${f1(floor - y)}" fill="${SEA}"/>`
const underwater = (poleX, poleW, y, floor) => `<rect x="${f1(poleX - poleW / 2)}" y="${f1(y)}" width="${poleW}" height="${f1(floor - y)}" fill="${SEA}" opacity="0.62"/>`
const waterline = (x1, x2, y) => `<line x1="${x1}" y1="${f1(y)}" x2="${x2}" y2="${f1(y)}" stroke="${SEA_EDGE}" stroke-width="4"/>`

// A clock face with both hands.
const clock = (cx, cy, r, h, m) => {
  let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="${INK}" stroke-width="5"/>`
  for (let k = 0; k < 12; k++) {
    const a = (k * 30 * Math.PI) / 180
    const r1 = k % 3 === 0 ? r * 0.78 : r * 0.86
    s += `<line x1="${f1(cx + r1 * Math.sin(a))}" y1="${f1(cy - r1 * Math.cos(a))}" x2="${f1(cx + r * 0.94 * Math.sin(a))}" y2="${f1(cy - r * 0.94 * Math.cos(a))}" stroke="${INK}" stroke-width="${k % 3 === 0 ? 4 : 2.5}"/>`
  }
  const ha = (((h % 12) + m / 60) * 30 * Math.PI) / 180
  const ma = (m * 6 * Math.PI) / 180
  s += `<line x1="${cx}" y1="${cy}" x2="${f1(cx + r * 0.5 * Math.sin(ha))}" y2="${f1(cy - r * 0.5 * Math.cos(ha))}" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`
  s += `<line x1="${cx}" y1="${cy}" x2="${f1(cx + r * 0.74 * Math.sin(ma))}" y2="${f1(cy - r * 0.74 * Math.cos(ma))}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`
  return `${s}<circle cx="${cx}" cy="${cy}" r="6" fill="${INK}"/>`
}

// The Moon: full (grey, craters), half (the left half lit, as the last quarter
// looks from Vietnam in the morning sky), new (dark).
const fullMoon = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${MOON}" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="${f1(cx - r * 0.35)}" cy="${f1(cy - r * 0.3)}" r="${f1(r * 0.2)}" fill="#c3c9d1"/>
    <circle cx="${f1(cx + r * 0.3)}" cy="${f1(cy + r * 0.25)}" r="${f1(r * 0.26)}" fill="#c3c9d1"/>`
const halfMoon = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${DARK_MOON}"/>
    <path d="M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} Z" fill="${MOON}"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="2.5"/>`
const newMoon = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${DARK_MOON}" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${cy}" r="${f1(r * 0.82)}" fill="none" stroke="#6b7684" stroke-width="2"/>`

// The voting hands from 3.1 and 3.4.
const HAND_PATHS = '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'
const leftHand = (color) => `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = (color) => `<g transform="translate(528 76) scale(7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`

// The calendar grid of the two weeks: Mon–Fri, three rows (26 Oct, 2 Nov,
// 9 Nov). `off` = cells outside the lab (26–28 Oct, 13 Nov).
const CAL = { x0: 30, y0: 76, w: 100, h: 116, gap: 8 }
const cellX = (c) => CAL.x0 + c * (CAL.w + CAL.gap)
const cellY = (r) => CAL.y0 + r * (CAL.h + CAL.gap)
const OFF = ['0,0', '0,1', '0,2', '2,4']
const calCells = (edge) => {
  let s = ''
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 5; c++) {
      const off = OFF.includes(`${r},${c}`)
      const ends = edge && ((r === 0 && c === 3) || (r === 2 && c === 3))
      s += `<rect x="${cellX(c)}" y="${cellY(r)}" width="${CAL.w}" height="${CAL.h}" rx="12" fill="${off ? '#f1f5f9' : '#ffffff'}" stroke="${ends ? KEY : off ? '#e2e8f0' : RULE}" stroke-width="${ends ? 5 : 2.5}"/>`
    }
  }
  return s
}
// Four dots in a cell: the four readings of the day.
const dots = (r, c) => [0, 1, 2, 3].map((k) => `<circle cx="${f1(cellX(c) + 50 + (k - 1.5) * 20)}" cy="${cellY(r) + 88}" r="7" fill="${KEY}"/>`).join('')
const LAB_CELLS = [[0, 3], [0, 4], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [2, 0], [2, 1], [2, 2], [2, 3]]

// The empty axes of the sketch and the line graph.
const axes = (x0, y0, x1, y1) => `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="${INK}" stroke-width="3.5"/>
    <line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1}" stroke="${INK}" stroke-width="3.5"/>`

// The tide curve for COMING_IN: low at x 190, high at x 470, low at x 750.
const tideY = (x) => 270 + 140 * Math.cos((2 * Math.PI * (x - 190)) / 560)
const tideCurve = (from, to, color, w) => {
  const pts = []
  for (let x = from; x <= to + 0.01; x += 5) pts.push(`${x},${f1(tideY(x))}`)
  return `<polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`
}

// A cross, for the readings on the line graph.
const cross = (x, y, s = 12) => `<path d="M ${x - s} ${f1(y - s)} L ${x + s} ${f1(y + s)} M ${x + s} ${f1(y - s)} L ${x - s} ${f1(y + s)}" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>`
// LINE_GRAPH's scale: 0 cm at y 470, 140 cm at y 90.
const lgY = (v) => f1(470 - (v * 380) / 140)

export const DIAGRAMS = {
  // ── The goals ─────────────────────────────────────────────────────────────
  PIC_POLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    <rect x="30" y="268" width="420" height="20" rx="6" fill="${MUD}"/>
    ${river(30, 450, 168, 268)}
    <path d="M 30 168 q 21 -10 42 0 t 42 0 t 42 0 t 42 0 t 42 0 t 42 0 t 42 0 t 42 0 t 42 0 t 42 0" fill="none" stroke="${SEA_EDGE}" stroke-width="4" stroke-linecap="round"/>
    ${bamboo(240, 22, 286, 34, 70)}
    ${ticks(240, 34, 258, 2.2, 0, 100)}
    ${underwater(240, 34, 168, 268)}
    <circle cx="240" cy="168" r="30" fill="none" stroke="${KEY}" stroke-width="5"/>
  </svg>`,

  PIC_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    <rect x="50" y="40" width="330" height="48" fill="#e2f2f6"/>
    <rect x="50" y="40" width="70" height="220" fill="#e2f2f6"/>
    <rect x="50" y="40" width="330" height="220" fill="none" stroke="${INK}" stroke-width="4"/>
    <path d="M 50 88 H 380 M 50 131 H 380 M 50 174 H 380 M 50 217 H 380 M 120 40 V 260 M 185 40 V 260 M 250 40 V 260 M 315 40 V 260" stroke="${INK}" stroke-width="2.5"/>
    <g transform="rotate(-38 360 214)">
      <rect x="300" y="200" width="120" height="28" fill="#f2c94c" stroke="${INK}" stroke-width="3"/>
      <rect x="420" y="200" width="22" height="28" fill="#f4a3a8" stroke="${INK}" stroke-width="3"/>
      <path d="M 300 200 L 270 214 L 300 228 Z" fill="#f6e3c1" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M 278 210 L 270 214 L 278 218 Z" fill="${INK}"/>
    </g>
  </svg>`,

  PIC_GRAPH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${axes(70, 250, 440, 34)}
    <polyline points="100,200 145,132 190,96 235,124 280,190 325,226 370,186 415,120" fill="none" stroke="${BLUE}" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="100" cy="200" r="8" fill="${KEY}"/><circle cx="145" cy="132" r="8" fill="${KEY}"/><circle cx="190" cy="96" r="8" fill="${KEY}"/>
    <circle cx="235" cy="124" r="8" fill="${KEY}"/><circle cx="280" cy="190" r="8" fill="${KEY}"/><circle cx="325" cy="226" r="8" fill="${KEY}"/>
    <circle cx="370" cy="186" r="8" fill="${KEY}"/><circle cx="415" cy="120" r="8" fill="${KEY}"/>
  </svg>`,

  // ── Reading the pole ──────────────────────────────────────────────────────
  // 0 cm at y 492, 2.5 px a cm, so 160 cm at y 92. Water: A 60, B 130, C 85.
  POLE_READ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="40" y="492" width="220" height="44" fill="${MUD}"/>
    <rect x="310" y="492" width="220" height="44" fill="${MUD}"/>
    <rect x="580" y="492" width="220" height="44" fill="${MUD}"/>
    ${river(40, 260, 342, 492)}
    ${river(310, 530, 167, 492)}
    ${river(580, 800, 279.5, 492)}
    ${bamboo(170, 74, 528, 30)}
    ${bamboo(440, 74, 528, 30)}
    ${bamboo(710, 74, 528, 30)}
    ${ticks(170, 30, 492, 2.5, 0, 160)}
    ${ticks(440, 30, 492, 2.5, 0, 160)}
    ${ticks(710, 30, 492, 2.5, 0, 160)}
    ${underwater(170, 30, 342, 492)}
    ${underwater(440, 30, 167, 492)}
    ${underwater(710, 30, 279.5, 492)}
    ${waterline(40, 260, 342)}
    ${waterline(310, 530, 167)}
    ${waterline(580, 800, 279.5)}
    <text x="146" y="500" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">0</text>
    <text x="146" y="450" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">20</text>
    <text x="146" y="400" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">40</text>
    <text x="146" y="350" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">60</text>
    <text x="146" y="300" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">80</text>
    <text x="146" y="250" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">100</text>
    <text x="146" y="200" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">120</text>
    <text x="146" y="150" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">140</text>
    <text x="146" y="100" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">160</text>
    <text x="416" y="500" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">0</text>
    <text x="416" y="450" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">20</text>
    <text x="416" y="400" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">40</text>
    <text x="416" y="350" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">60</text>
    <text x="416" y="300" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">80</text>
    <text x="416" y="250" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">100</text>
    <text x="416" y="200" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">120</text>
    <text x="416" y="150" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">140</text>
    <text x="416" y="100" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">160</text>
    <text x="686" y="500" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">0</text>
    <text x="686" y="450" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">20</text>
    <text x="686" y="400" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">40</text>
    <text x="686" y="350" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">60</text>
    <text x="686" y="300" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">80</text>
    <text x="686" y="250" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">100</text>
    <text x="686" y="200" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">120</text>
    <text x="686" y="150" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">140</text>
    <text x="686" y="100" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">160</text>
    <text x="146" y="58" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="end">cm</text>
    <text x="416" y="58" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="end">cm</text>
    <text x="686" y="58" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="end">cm</text>
    <text x="222" y="120" font-family="${FONT}" font-size="46" font-weight="bold" fill="${BLUE}" text-anchor="middle">A</text>
    <text x="492" y="120" font-family="${FONT}" font-size="46" font-weight="bold" fill="${BLUE}" text-anchor="middle">B</text>
    <text x="762" y="120" font-family="${FONT}" font-size="46" font-weight="bold" fill="${BLUE}" text-anchor="middle">C</text>
  </svg>`,

  // The pole's face from 60 cm (y 440) to 160 cm (y 90), 3.5 px a cm; the
  // waves go 10 cm above and below 100 cm.
  METHOD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <path d="M 30 300 q 55 -70 110 0 t 110 0 t 110 0 t 110 0 t 110 0 L 580 540 L 30 540 Z" fill="${SEA}"/>
    <path d="M 30 300 q 55 -70 110 0 t 110 0 t 110 0 t 110 0 t 110 0" fill="none" stroke="${SEA_EDGE}" stroke-width="4"/>
    ${bamboo(470, 40, 540, 60, 150)}
    ${ticks(470, 60, 440, 3.5, 60, 170)}
    ${underwater(470, 60, 300, 540)}
    <text x="476" y="426" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">60</text>
    <text x="476" y="356" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">80</text>
    <text x="476" y="286" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">100</text>
    <text x="476" y="216" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">120</text>
    <text x="476" y="146" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">140</text>
    <text x="476" y="76" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">160</text>
    <line x1="420" y1="265" x2="594" y2="265" stroke="${MUTED}" stroke-width="3" stroke-dasharray="9 7"/>
    <line x1="420" y1="335" x2="594" y2="335" stroke="${MUTED}" stroke-width="3" stroke-dasharray="9 7"/>
    <line x1="430" y1="300" x2="594" y2="300" stroke="${KEY}" stroke-width="5"/>
    <text x="604" y="256" font-family="${FONT}" font-size="23" fill="${MUTED}">top of the wave</text>
    <text x="604" y="358" font-family="${FONT}" font-size="23" fill="${MUTED}">bottom of the wave</text>
    <text x="604" y="296" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">read the middle:</text>
    <text x="604" y="326" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">100 cm</text>
    <path d="M 92 300 Q 140 262 188 300 Q 140 338 92 300 Z" fill="#ffffff" stroke="${INK}" stroke-width="4"/>
    <circle cx="146" cy="300" r="15" fill="${BLUE}"/>
    <circle cx="146" cy="300" r="6.5" fill="${INK}"/>
    <line x1="196" y1="300" x2="426" y2="300" stroke="${KEY}" stroke-width="3" stroke-dasharray="10 8"/>
    <text x="140" y="190" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">eyes level</text>
    <text x="140" y="222" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">with the water</text>
    ${leader(140, 232, 140, 270)}
  </svg>`,

  // ── The plan ──────────────────────────────────────────────────────────────
  CALENDAR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="80" y="56" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mon</text>
    <text x="188" y="56" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">Tue</text>
    <text x="296" y="56" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">Wed</text>
    <text x="404" y="56" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">Thu</text>
    <text x="512" y="56" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">Fri</text>
    ${calCells(true)}
    ${LAB_CELLS.map(([r, c]) => dots(r, c)).join('')}
    <text x="80" y="118" font-family="${FONT}" font-size="24" font-weight="bold" fill="#a7b6bd" text-anchor="middle">26 Oct</text>
    <text x="188" y="118" font-family="${FONT}" font-size="24" font-weight="bold" fill="#a7b6bd" text-anchor="middle">27 Oct</text>
    <text x="296" y="118" font-family="${FONT}" font-size="24" font-weight="bold" fill="#a7b6bd" text-anchor="middle">28 Oct</text>
    <text x="404" y="118" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">29 Oct</text>
    <text x="512" y="118" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">30 Oct</text>
    <text x="80" y="242" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">2 Nov</text>
    <text x="188" y="242" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">3 Nov</text>
    <text x="296" y="242" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">4 Nov</text>
    <text x="404" y="242" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">5 Nov</text>
    <text x="512" y="242" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">6 Nov</text>
    <text x="80" y="366" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">9 Nov</text>
    <text x="188" y="366" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">10 Nov</text>
    <text x="296" y="366" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">11 Nov</text>
    <text x="404" y="366" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">12 Nov</text>
    <text x="512" y="366" font-family="${FONT}" font-size="24" font-weight="bold" fill="#a7b6bd" text-anchor="middle">13 Nov</text>
    <text x="600" y="112" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">start:</text>
    <text x="600" y="144" font-family="${FONT}" font-size="25" fill="${INK}">Thu 29 Oct</text>
    <text x="600" y="210" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">end:</text>
    <text x="600" y="242" font-family="${FONT}" font-size="25" fill="${INK}">Thu 12 Nov</text>
    <circle cx="610" cy="320" r="9" fill="${KEY}"/>
    <text x="628" y="328" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">one reading</text>
    <text x="600" y="372" font-family="${FONT}" font-size="24" fill="${INK}">8:30, 10:30,</text>
    <text x="600" y="404" font-family="${FONT}" font-size="24" fill="${INK}">12:30, 2:30</text>
    <text x="30" y="500" font-family="${FONT}" font-size="22" fill="${MUTED}">No readings at the weekend.</text>
  </svg>`,

  // Days across, times down: the unit in the heading. Day columns 86.4 wide
  // from x 150; thick lines at each weekend.
  TABLE_BLANK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <rect x="20" y="62" width="1080" height="118" fill="#e2f2f6"/>
    <rect x="20" y="62" width="130" height="370" fill="#e2f2f6"/>
    <rect x="20" y="62" width="1080" height="370" fill="none" stroke="${INK}" stroke-width="4"/>
    <path d="M 150 110 H 1100 M 20 180 H 1100 M 20 243 H 1100 M 20 306 H 1100 M 20 369 H 1100 M 150 62 V 432" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 236.4 110 V 432 M 409.1 110 V 432 M 495.5 110 V 432 M 581.8 110 V 432 M 668.2 110 V 432 M 841 110 V 432 M 927.3 110 V 432 M 1013.6 110 V 432" stroke="${INK}" stroke-width="2"/>
    <path d="M 322.7 110 V 432 M 754.5 110 V 432" stroke="${INK}" stroke-width="5"/>
    <text x="85" y="130" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Time</text>
    <text x="625" y="95" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Water level (cm)</text>
    <text x="193.2" y="140" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Thu</text>
    <text x="279.5" y="140" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Fri</text>
    <text x="365.9" y="140" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Mon</text>
    <text x="452.3" y="140" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Tue</text>
    <text x="538.6" y="140" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Wed</text>
    <text x="625" y="140" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Thu</text>
    <text x="711.4" y="140" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Fri</text>
    <text x="797.7" y="140" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Mon</text>
    <text x="884.1" y="140" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Tue</text>
    <text x="970.5" y="140" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Wed</text>
    <text x="1056.8" y="140" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Thu</text>
    <text x="193.2" y="167" font-family="${FONT}" font-size="19" fill="${INK}" text-anchor="middle">29 Oct</text>
    <text x="279.5" y="167" font-family="${FONT}" font-size="19" fill="${INK}" text-anchor="middle">30 Oct</text>
    <text x="365.9" y="167" font-family="${FONT}" font-size="19" fill="${INK}" text-anchor="middle">2 Nov</text>
    <text x="452.3" y="167" font-family="${FONT}" font-size="19" fill="${INK}" text-anchor="middle">3 Nov</text>
    <text x="538.6" y="167" font-family="${FONT}" font-size="19" fill="${INK}" text-anchor="middle">4 Nov</text>
    <text x="625" y="167" font-family="${FONT}" font-size="19" fill="${INK}" text-anchor="middle">5 Nov</text>
    <text x="711.4" y="167" font-family="${FONT}" font-size="19" fill="${INK}" text-anchor="middle">6 Nov</text>
    <text x="797.7" y="167" font-family="${FONT}" font-size="19" fill="${INK}" text-anchor="middle">9 Nov</text>
    <text x="884.1" y="167" font-family="${FONT}" font-size="19" fill="${INK}" text-anchor="middle">10 Nov</text>
    <text x="970.5" y="167" font-family="${FONT}" font-size="19" fill="${INK}" text-anchor="middle">11 Nov</text>
    <text x="1056.8" y="167" font-family="${FONT}" font-size="19" fill="${INK}" text-anchor="middle">12 Nov</text>
    <text x="85" y="220" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">8:30</text>
    <text x="85" y="283" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">10:30</text>
    <text x="85" y="346" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">12:30</text>
    <text x="85" y="409" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">2:30</text>
    <text x="730" y="36" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">the unit goes in the heading</text>
    ${leader(742, 44, 718, 78)}
  </svg>`,

  // ── The graph ─────────────────────────────────────────────────────────────
  AXES_BLANK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <path d="M 230 470 V 90 M 410 470 V 90 M 590 470 V 90 M 770 470 V 90" stroke="${RULE}" stroke-width="2.5" stroke-dasharray="8 8"/>
    <text x="490" y="330" font-family="${FONT}" font-size="170" font-weight="bold" fill="#eef1f4" text-anchor="middle">?</text>
    ${axes(140, 470, 810, 70)}
    <path d="M 230 470 v 12 M 410 470 v 12 M 590 470 v 12 M 770 470 v 12" stroke="${INK}" stroke-width="3"/>
    <text x="230" y="510" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">8:30</text>
    <text x="410" y="510" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">10:30</text>
    <text x="590" y="510" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">12:30</text>
    <text x="770" y="510" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">2:30</text>
    <text x="475" y="548" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}" text-anchor="middle">time</text>
    <text x="30" y="50" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}">water level (cm)</text>
  </svg>`,

  COMING_IN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${axes(120, 480, 810, 70)}
    ${tideCurve(130, 190, MUTED, 5)}
    ${tideCurve(190, 470, BLUE, 7)}
    ${tideCurve(470, 750, KEY, 7)}
    ${tideCurve(750, 800, MUTED, 5)}
    ${arrow(220, 352, 330, 196, BLUE, 5, 20)}
    ${arrow(610, 196, 720, 352, KEY, 5, 20)}
    <text x="150" y="148" font-family="${FONT}" font-size="25" font-weight="bold" fill="${BLUE}">the tide is</text>
    <text x="150" y="180" font-family="${FONT}" font-size="28" font-weight="bold" fill="${BLUE}">coming in</text>
    <text x="800" y="148" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="end">the tide is</text>
    <text x="800" y="180" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="end">going out</text>
    <circle cx="470" cy="130" r="9" fill="${INK}"/>
    <circle cx="190" cy="410" r="9" fill="${INK}"/>
    <circle cx="750" cy="410" r="9" fill="${INK}"/>
    <text x="470" y="108" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}" text-anchor="middle">high tide</text>
    <text x="190" y="452" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}" text-anchor="middle">low tide</text>
    <text x="750" y="452" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}" text-anchor="middle">low tide</text>
    <text x="465" y="526" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}" text-anchor="middle">time</text>
    <text x="30" y="50" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}">water level</text>
  </svg>`,

  // One example day (not the class's data): 40, 90, 120, 100 cm.
  LINE_GRAPH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <path d="M 150 ${lgY(20)} H 800 M 150 ${lgY(40)} H 800 M 150 ${lgY(60)} H 800 M 150 ${lgY(80)} H 800 M 150 ${lgY(100)} H 800 M 150 ${lgY(120)} H 800 M 150 ${lgY(140)} H 800" stroke="#eef1f4" stroke-width="2"/>
    ${axes(150, 470, 810, 70)}
    <path d="M 230 470 v 12 M 410 470 v 12 M 590 470 v 12 M 770 470 v 12" stroke="${INK}" stroke-width="3"/>
    <text x="138" y="478" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">0</text>
    <text x="138" y="423.7" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">20</text>
    <text x="138" y="369.4" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">40</text>
    <text x="138" y="315.1" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">60</text>
    <text x="138" y="260.9" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">80</text>
    <text x="138" y="206.6" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">100</text>
    <text x="138" y="152.3" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">120</text>
    <text x="138" y="98" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">140</text>
    <polyline points="230,${lgY(40)} 410,${lgY(90)} 590,${lgY(120)} 770,${lgY(100)}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linejoin="round"/>
    ${cross(230, lgY(40))}
    ${cross(410, lgY(90))}
    ${cross(590, lgY(120))}
    ${cross(770, lgY(100))}
    <text x="230" y="510" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">8:30</text>
    <text x="410" y="510" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">10:30</text>
    <text x="590" y="510" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">12:30</text>
    <text x="770" y="510" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">2:30</text>
    <text x="480" y="548" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}" text-anchor="middle">time</text>
    <text x="30" y="50" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}">water level (cm)</text>
    <text x="810" y="50" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">an example day</text>
    ${cross(282, 421, 9)}
    <text x="302" y="430" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">= one reading</text>
    ${leader(266, 410, 240, 376)}
    <text x="610" y="330" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">join the crosses</text>
    <text x="610" y="362" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">with a ruler</text>
    ${leader(680, 304, 680, lgY(110))}
  </svg>`,

  // ── The predictions ───────────────────────────────────────────────────────
  ANS_SAME: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    ${clock(440, 130, 96, 11, 0)}
    <text x="440" y="296" font-family="${FONT}" font-size="40" font-weight="bold" fill="${BLUE}" text-anchor="middle">11:00 again</text>
  </svg>`,

  ANS_LATER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    ${clock(280, 130, 96, 11, 50)}
    <text x="280" y="296" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">about 11:50</text>
  </svg>`,

  ANS_WEEK1: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    ${halfMoon(440, 112, 82)}
    <text x="440" y="250" font-family="${FONT}" font-size="38" font-weight="bold" fill="${BLUE}" text-anchor="middle">2–6 November</text>
    <text x="440" y="296" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">half moon</text>
  </svg>`,

  ANS_WEEK2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    ${newMoon(280, 112, 82)}
    <text x="280" y="250" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">9–12 November</text>
    <text x="280" y="296" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">new moon</text>
  </svg>`,

  CALENDAR_MOON: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="20" y="196" width="800" height="124" rx="16" fill="#e9f1fa"/>
    <rect x="20" y="320" width="800" height="124" rx="16" fill="#fdf1e3"/>
    <text x="80" y="56" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mon</text>
    <text x="188" y="56" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">Tue</text>
    <text x="296" y="56" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">Wed</text>
    <text x="404" y="56" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">Thu</text>
    <text x="512" y="56" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">Fri</text>
    ${calCells(false)}
    ${fullMoon(80, 160, 26)}
    ${halfMoon(80, 284, 26)}
    ${newMoon(80, 408, 26)}
    <text x="80" y="118" font-family="${FONT}" font-size="24" font-weight="bold" fill="#a7b6bd" text-anchor="middle">26 Oct</text>
    <text x="188" y="118" font-family="${FONT}" font-size="24" font-weight="bold" fill="#a7b6bd" text-anchor="middle">27 Oct</text>
    <text x="296" y="118" font-family="${FONT}" font-size="24" font-weight="bold" fill="#a7b6bd" text-anchor="middle">28 Oct</text>
    <text x="404" y="118" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">29 Oct</text>
    <text x="512" y="118" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">30 Oct</text>
    <text x="80" y="242" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">2 Nov</text>
    <text x="188" y="242" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">3 Nov</text>
    <text x="296" y="242" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">4 Nov</text>
    <text x="404" y="242" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">5 Nov</text>
    <text x="512" y="242" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">6 Nov</text>
    <text x="80" y="366" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">9 Nov</text>
    <text x="188" y="366" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">10 Nov</text>
    <text x="296" y="366" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">11 Nov</text>
    <text x="404" y="366" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">12 Nov</text>
    <text x="512" y="366" font-family="${FONT}" font-size="24" font-weight="bold" fill="#a7b6bd" text-anchor="middle">13 Nov</text>
    <text x="590" y="126" font-family="${FONT}" font-size="25" font-weight="bold" fill="${MUTED}">big tides,</text>
    <text x="590" y="158" font-family="${FONT}" font-size="25" font-weight="bold" fill="${MUTED}">getting smaller</text>
    <text x="590" y="266" font-family="${FONT}" font-size="28" font-weight="bold" fill="${BLUE}">small tides</text>
    <text x="590" y="390" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">big tides</text>
    ${fullMoon(44, 500, 16)}
    <text x="68" y="508" font-family="${FONT}" font-size="22" fill="${INK}">full moon</text>
    ${halfMoon(254, 500, 16)}
    <text x="278" y="508" font-family="${FONT}" font-size="22" fill="${INK}">half moon</text>
    ${newMoon(464, 500, 16)}
    <text x="488" y="508" font-family="${FONT}" font-size="22" fill="${INK}">new moon</text>
  </svg>`,
}

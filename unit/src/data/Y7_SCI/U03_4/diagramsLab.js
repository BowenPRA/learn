// src/data/Y7_SCI/U03_4/diagramsLab.js
// The River Tide Lab's teaching drawings, ported from the classroom deck
// (content/y7-science/U03_tidelab/diagrams.js) for the "our river" slides of
// 3.4. The lab's goal pictures, calendar, table, sketch axes, line graph and
// vote cards stay there: their work is Tide Lab's (utils/tideLab.js).
//
//     POLE_READ     three poles, A B C, the water at 60, 130 and 85 cm (the last
//                   halfway between two marks)
//     METHOD        eyes level with the water, and the middle of the waves
//     COMING_IN     a tide curve read left to right: coming in, going out
//
// 840×560, the split shape. The drawn pole is marked every 10 cm and numbered
// every 20 cm, like Tide Lab's. Label <text> is written out literally so
// `npm run audit:svg` can measure it; the helpers draw shapes only.

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const BLUE = '#1a5fa8'
const SEA = '#cfe6f5'
const SEA_EDGE = '#5b9bd5'
const MUD = '#d9c7a3'
const BAMBOO = '#dcb862'
const NODE = '#a07d2e'
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

export const DIAGRAMS_LAB = {
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
}

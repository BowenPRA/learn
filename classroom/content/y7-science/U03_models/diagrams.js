// content/y7-science/U03_models/diagrams.js
// Teaching diagrams for "Models: Space".
//
//   What a model is
//     MODEL_TWO     the two meanings from 3.2: a model represents something
//                   (a globe, the football Sun, a particle drawing); a model
//                   uses maths to work out what we cannot see (÷ 6.3 billion,
//                   W = m × 10)
//     GLOBE         a globe on its stand — "what does it get wrong?"
//   The Solar System
//     ANS_TENNIS / ANS_PIN   vote: the Sun is a football, so the Earth is …
//     ORBIT         the Sun, a planet, its orbit — and a "?" for 3.3 (why
//                   doesn't it fall in?), so no arrows give the answer away
//     ANS_BALL / ANS_PLATE   vote (a 3.2 review): are the orbits a ball or a plate?
//   How it formed
//     SPIN_FLAT     arms in, spin faster (the skater); spinning dough goes flat
//     NEBULA_STEPS  Draw This: cloud → shrinking ball → disc → Sun and planets
//     ROCKY / GIANT near the Sun only rock and metal; far out, ice too, then gas
//     HL_TAU        a young star's disc with gaps, drawn from ALMA's 2014 image
//
// The time diagrams moved with the time decks: half-life and carbon dating to
// U03_coffee (Coffee, Carbon and Stars), the clocks and the Earth's age to
// U03_earth (How Old Is the Earth?).
//
// Split diagrams are drawn at 840×560, showcase ones at 1120×440, vote cards
// at 720×320 — the shapes those layouts give a picture (as in 3.1).
// Label <text> is written out literally so `npm run audit:svg` can measure it.
// Helpers below draw shapes only. Diagrams stay in English (house rule).

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const TEAL = '#0087a8'
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const GREEN = '#4a8b23'
const PURPLE = '#5c2483'
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

// A curved arrow along a circle, from angle a0 to a1 (degrees, screen).
const arcArrow = (cx, cy, rx, ry, a0, a1, color, w = 4, head = 16) => {
  const P = (a) => [cx + rx * Math.cos((a * Math.PI) / 180), cy + ry * Math.sin((a * Math.PI) / 180)]
  const [x0, y0] = P(a0)
  const [x1, y1] = P(a1)
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0
  const sweep = a1 > a0 ? 1 : 0
  const [xb, yb] = P(a1 - (a1 > a0 ? 6 : -6))
  const ang = Math.atan2(y1 - yb, x1 - xb)
  const px = head * 0.55 * Math.sin(ang), py = -head * 0.55 * Math.cos(ang)
  const hx = x1 - head * Math.cos(ang), hy = y1 - head * Math.sin(ang)
  return `<path d="M ${f1(x0)} ${f1(y0)} A ${rx} ${ry} 0 ${large} ${sweep} ${f1(hx)} ${f1(hy)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M ${f1(x1)} ${f1(y1)} L ${f1(hx + px)} ${f1(hy + py)} L ${f1(hx - px)} ${f1(hy - py)} Z" fill="${color}"/>`
}

const leader = (x1, y1, x2, y2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${KEY}" stroke-width="2"/><circle cx="${x2}" cy="${y2}" r="4.5" fill="${KEY}"/>`

// A drawn Sun: flat pale disc and short rays.
const sun = (cx, cy, r) => {
  let rays = ''
  for (let k = 0; k < 12; k++) {
    const a = (k * 30 * Math.PI) / 180
    rays += `<line x1="${f1(cx + (r + 6) * Math.cos(a))}" y1="${f1(cy + (r + 6) * Math.sin(a))}" x2="${f1(cx + (r + 18) * Math.cos(a))}" y2="${f1(cy + (r + 18) * Math.sin(a))}" stroke="#e8a317" stroke-width="4" stroke-linecap="round"/>`
  }
  return `${rays}<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffd45c" stroke="${INK}" stroke-width="3"/>`
}

// A planet: flat fill, ink outline.
const planet = (cx, cy, r, fill) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${INK}" stroke-width="2.5"/>`

// The voting hands from 3.1.
const HAND_PATHS = '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'
const leftHand = (color) => `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = (color) => `<g transform="translate(528 76) scale(7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`

// A football, drawn.
const football = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <path d="M ${cx} ${f1(cy - r * 0.42)} l ${f1(r * 0.4)} ${f1(r * 0.29)} l ${f1(-r * 0.15)} ${f1(r * 0.47)} l ${f1(-r * 0.5)} 0 l ${f1(-r * 0.15)} ${f1(-r * 0.47)} z" fill="${INK}"/>`


// Rows of dots for atoms in a crystal.
const dots = (x0, y0, cols, rows, gap, r, fillFor) => {
  let out = ''
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const k = j * cols + i
    out += `<circle cx="${x0 + i * gap}" cy="${y0 + j * gap}" r="${r}" fill="${fillFor(k)}" stroke="${INK}" stroke-width="1.2"/>`
  }
  return out
}

export const DIAGRAMS = {
  // ── What a model is ───────────────────────────────────────────────────────
  MODEL_TWO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="24" y="24" width="384" height="512" rx="16" fill="#e2f2f6" stroke="${RULE}" stroke-width="2"/>
    <rect x="432" y="24" width="384" height="512" rx="16" fill="#eef6e6" stroke="${RULE}" stroke-width="2"/>
    <text x="216" y="66" font-family="${FONT}" font-size="27" font-weight="bold" fill="${TEAL}" text-anchor="middle">1 · It represents</text>
    <text x="624" y="66" font-family="${FONT}" font-size="27" font-weight="bold" fill="${GREEN}" text-anchor="middle">2 · It uses maths</text>
    <circle cx="140" cy="160" r="56" fill="#9fd0ff" stroke="${INK}" stroke-width="3"/>
    <path d="M 108 128 q 24 -10 32 8 q 5 19 -16 27 q -19 -3 -16 -35 z M 152 158 q 21 -5 24 14 q -3 19 -21 21 q -11 -14 -3 -35 z" fill="#7cc36a" stroke="${INK}" stroke-width="2"/>
    <path d="M 140 216 v 18 M 108 238 h 64" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    <text x="140" y="276" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">a globe</text>
    ${football(300, 160, 50)}
    <circle cx="300" cy="236" r="3" fill="${BLUE}"/>
    <text x="300" y="276" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">a football Sun</text>
    ${dots(150, 330, 6, 3, 26, 10, () => '#f2b880')}
    <text x="216" y="440" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">a particle drawing</text>
    <text x="216" y="500" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">shows what is hard to see</text>
    <text x="624" y="170" font-family="${FONT}" font-size="34" font-weight="bold" fill="${GREEN}" text-anchor="middle">12 756 km</text>
    <text x="624" y="214" font-family="${FONT}" font-size="34" font-weight="bold" fill="${GREEN}" text-anchor="middle">÷ 6 300 000 000</text>
    <text x="624" y="258" font-family="${FONT}" font-size="34" font-weight="bold" fill="${GREEN}" text-anchor="middle">= 2 mm</text>
    <text x="624" y="296" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">the pinhead Earth</text>
    <text x="624" y="400" font-family="${FONT}" font-size="46" font-weight="bold" fill="${GREEN}" text-anchor="middle">W = m × 10</text>
    <text x="624" y="440" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">your weight on any planet (3.1)</text>
    <text x="624" y="500" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">works out what we cannot see</text>
  </svg>`,

  GLOBE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <g transform="rotate(-23 420 250)">
      <circle cx="420" cy="250" r="190" fill="#bfe1ff" stroke="${INK}" stroke-width="4"/>
      <path d="M 320 120 q 70 -40 110 10 q 20 50 -30 90 q -40 30 -20 80 q -40 20 -70 -30 q -30 -60 10 -150 z" fill="#9bd18a" stroke="${INK}" stroke-width="2.5"/>
      <path d="M 470 170 q 60 -20 90 30 q 10 60 -30 100 q -40 40 -70 10 q -10 -50 10 -140 z" fill="#9bd18a" stroke="${INK}" stroke-width="2.5"/>
      <ellipse cx="420" cy="250" rx="190" ry="40" fill="none" stroke="${MUTED}" stroke-width="2" stroke-dasharray="6 6"/>
      <line x1="420" y1="40" x2="420" y2="460" stroke="${INK}" stroke-width="5"/>
    </g>
    <path d="M 250 140 A 190 190 0 0 0 330 450" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
    <path d="M 420 470 v 40 M 330 520 h 180" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
    <text x="640" y="540" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}">a model Earth</text>
  </svg>`,

  // ── Votes: the football Sun ───────────────────────────────────────────────
  ANS_TENNIS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    ${football(390, 96, 50)}
    <circle cx="520" cy="122" r="24" fill="#d8ec4f" stroke="${INK}" stroke-width="3"/>
    <path d="M 501 109 q 19 13 38 0 M 501 135 q 19 -13 38 0" fill="none" stroke="#ffffff" stroke-width="3"/>
    <text x="452" y="250" font-family="${FONT}" font-size="48" font-weight="bold" fill="${BLUE}" text-anchor="middle">a tennis ball</text>
  </svg>`,

  ANS_PIN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    ${football(200, 96, 50)}
    <circle cx="300" cy="140" r="3" fill="${BLUE}"/>
    <text x="260" y="250" font-family="${FONT}" font-size="48" font-weight="bold" fill="${KEY}" text-anchor="middle">a pinhead</text>
  </svg>`,

  ORBIT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <ellipse cx="400" cy="290" rx="300" ry="190" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="10 8"/>
    ${sun(400, 290, 52)}
    ${planet(640, 176, 26, '#9fd0ff')}
    <text x="720" y="150" font-family="${FONT}" font-size="64" font-weight="bold" fill="${PURPLE}" text-anchor="middle">?</text>
    ${leader(250, 520, 250, 445)}
    <text x="262" y="534" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">orbit</text>
    <text x="400" y="390" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">the Sun</text>
    <text x="640" y="134" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">a planet</text>
  </svg>`,

  ANS_BALL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    ${sun(452, 98, 16)}
    <ellipse cx="452" cy="98" rx="80" ry="30" fill="none" stroke="${BLUE}" stroke-width="2.5" transform="rotate(35 452 98)"/>
    <ellipse cx="452" cy="98" rx="80" ry="30" fill="none" stroke="${BLUE}" stroke-width="2.5" transform="rotate(-35 452 98)"/>
    <ellipse cx="452" cy="98" rx="30" ry="80" fill="none" stroke="${BLUE}" stroke-width="2.5"/>
    <text x="452" y="236" font-family="${FONT}" font-size="44" font-weight="bold" fill="${BLUE}" text-anchor="middle">all around,</text>
    <text x="452" y="290" font-family="${FONT}" font-size="44" font-weight="bold" fill="${BLUE}" text-anchor="middle">like a ball</text>
  </svg>`,

  ANS_PLATE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    ${sun(260, 98, 16)}
    <ellipse cx="260" cy="98" rx="150" ry="14" fill="none" stroke="${KEY}" stroke-width="2.5"/>
    <ellipse cx="260" cy="98" rx="100" ry="9" fill="none" stroke="${KEY}" stroke-width="2.5"/>
    <ellipse cx="260" cy="98" rx="60" ry="6" fill="none" stroke="${KEY}" stroke-width="2.5"/>
    <text x="260" y="236" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">flat,</text>
    <text x="260" y="290" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">like a plate</text>
  </svg>`,

  // ── How it formed ─────────────────────────────────────────────────────────
  SPIN_FLAT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <circle cx="150" cy="120" r="22" fill="#f2c9a5" stroke="${INK}" stroke-width="3"/>
    <line x1="150" y1="142" x2="150" y2="250" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <line x1="150" y1="170" x2="60" y2="200" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <line x1="150" y1="170" x2="240" y2="200" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <line x1="150" y1="250" x2="150" y2="320" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    ${arcArrow(150, 330, 70, 18, 20, 160, BLUE, 3, 12)}
    <text x="150" y="386" font-family="${FONT}" font-size="24" font-weight="bold" fill="${BLUE}" text-anchor="middle">arms out: slow</text>
    <circle cx="420" cy="120" r="22" fill="#f2c9a5" stroke="${INK}" stroke-width="3"/>
    <line x1="420" y1="142" x2="420" y2="250" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <path d="M 420 168 l -16 22 l 16 18 M 420 168 l 16 22 l -16 18" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="420" y1="250" x2="420" y2="320" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    ${arcArrow(420, 330, 40, 12, 20, 160, RED, 3, 12)}
    ${arcArrow(420, 330, 40, 12, 200, 340, RED, 3, 12)}
    ${arcArrow(420, 200, 46, 14, 200, 340, RED, 3, 12)}
    <text x="420" y="386" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}" text-anchor="middle">arms in: FAST</text>
    <line x1="560" y1="40" x2="560" y2="400" stroke="${RULE}" stroke-width="2"/>
    <circle cx="690" cy="200" r="60" fill="#f6e3b8" stroke="${INK}" stroke-width="3"/>
    <text x="690" y="300" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}" text-anchor="middle">a ball of dough</text>
    ${arrow(770, 200, 840, 200, MUTED, 4, 16)}
    <ellipse cx="970" cy="200" rx="120" ry="26" fill="#f6e3b8" stroke="${INK}" stroke-width="3"/>
    ${arcArrow(970, 200, 140, 40, 200, 340, RED, 3, 14)}
    <text x="970" y="300" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">spin it: it goes flat</text>
  </svg>`,

  NEBULA_STEPS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="40" y="52" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">1</text>
    <path d="M 120 150 q -40 -60 30 -80 q 40 -40 90 0 q 70 0 60 60 q 40 50 -20 90 q -40 40 -100 10 q -80 0 -60 -80 z" fill="#efe3f7" stroke="${INK}" stroke-width="3"/>
    <circle cx="160" cy="130" r="3" fill="${INK}"/><circle cx="210" cy="110" r="3" fill="${INK}"/><circle cx="250" cy="160" r="3" fill="${INK}"/><circle cx="180" cy="190" r="3" fill="${INK}"/><circle cx="230" cy="210" r="3" fill="${INK}"/><circle cx="140" cy="180" r="3" fill="${INK}"/>
    <text x="200" y="268" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">a cloud (nebula)</text>
    <text x="460" y="52" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">2</text>
    <circle cx="620" cy="150" r="70" fill="#efe3f7" stroke="${INK}" stroke-width="3"/>
    ${arrow(520, 150, 556, 150, RED, 4, 14)}
    ${arrow(720, 150, 684, 150, RED, 4, 14)}
    ${arrow(620, 50, 620, 86, RED, 4, 14)}
    ${arrow(620, 250, 620, 214, RED, 4, 14)}
    <text x="620" y="268" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">gravity pulls it in</text>
    <line x1="30" y1="290" x2="810" y2="290" stroke="${RULE}" stroke-width="2"/>
    <line x1="420" y1="30" x2="420" y2="530" stroke="${RULE}" stroke-width="2"/>
    <text x="40" y="330" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">3</text>
    <ellipse cx="210" cy="420" rx="160" ry="34" fill="#efe3f7" stroke="${INK}" stroke-width="3"/>
    <circle cx="210" cy="420" r="16" fill="#ffd45c" stroke="${INK}" stroke-width="2.5"/>
    ${arcArrow(210, 420, 180, 50, 200, 340, BLUE, 3, 14)}
    <text x="210" y="510" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">a spinning disc</text>
    <text x="460" y="330" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">4</text>
    <ellipse cx="620" cy="420" rx="160" ry="34" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/>
    <ellipse cx="620" cy="420" rx="100" ry="21" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/>
    ${sun(620, 420, 18)}
    ${planet(720, 420, 8, '#9fd0ff')}
    ${planet(510, 430, 14, '#e2a76f')}
    ${planet(760, 404, 11, '#e3cc94')}
    <text x="620" y="510" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">the Sun and planets</text>
  </svg>`,

  ROCKY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" class="w-full h-full">
    ${plate(600, 380)}
    ${sun(70, 190, 40)}
    <circle cx="350" cy="190" r="110" fill="#d9a27a" stroke="${INK}" stroke-width="3"/>
    <circle cx="350" cy="190" r="52" fill="#8b5a3c" stroke="${INK}" stroke-width="2.5"/>
    ${leader(520, 110, 420, 140)}
    <text x="500" y="98" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">rock</text>
    ${leader(520, 300, 380, 210)}
    <text x="470" y="330" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">metal core</text>
    <text x="70" y="270" font-family="${FONT}" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">hot</text>
  </svg>`,

  GIANT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" class="w-full h-full">
    ${plate(600, 380)}
    <circle cx="250" cy="190" r="150" fill="#f1dfc1" stroke="${INK}" stroke-width="3"/>
    <path d="M 108 140 h 284 M 102 196 h 296 M 116 252 h 268" stroke="#d6b88e" stroke-width="14"/>
    <circle cx="250" cy="190" r="46" fill="#cfe8ff" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="250" cy="190" r="21" fill="#8b5a3c" stroke="${INK}" stroke-width="2"/>
    ${leader(430, 76, 350, 104)}
    <text x="420" y="50" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}">huge gas</text>
    <text x="420" y="74" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}">layer</text>
    ${leader(430, 300, 282, 214)}
    <text x="420" y="326" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}">ice and rock</text>
    <text x="420" y="350" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}">core</text>
    <text x="60" y="360" font-family="${FONT}" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">cold</text>
  </svg>`,

  HL_TAU: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="40" y="40" width="760" height="420" rx="16" fill="#0a0d1c"/>
    <ellipse cx="420" cy="250" rx="330" ry="190" fill="#ff8a2a" opacity="0.18"/>
    <ellipse cx="420" cy="250" rx="300" ry="172" fill="none" stroke="#ff9d3a" stroke-width="22" opacity="0.55"/>
    <ellipse cx="420" cy="250" rx="250" ry="143" fill="none" stroke="#ffb35a" stroke-width="20" opacity="0.7"/>
    <ellipse cx="420" cy="250" rx="196" ry="112" fill="none" stroke="#ffc46e" stroke-width="22" opacity="0.8"/>
    <ellipse cx="420" cy="250" rx="140" ry="80" fill="none" stroke="#ffd690" stroke-width="22" opacity="0.85"/>
    <ellipse cx="420" cy="250" rx="80" ry="46" fill="#ffe2a8" opacity="0.9"/>
    <circle cx="420" cy="250" r="16" fill="#fffbe8"/>
    ${leader(660, 500, 560, 372)}
    <text x="560" y="514" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">a dark gap</text>
    ${leader(180, 500, 420, 250)}
    <text x="40" y="514" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">a young star</text>
    <text x="420" y="545" font-family="${FONT}" font-size="17" fill="${MUTED}" text-anchor="middle">drawn from the ALMA telescope's photo, 2014</text>
  </svg>`,
}

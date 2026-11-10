// content/y7-science/U03_coffee/diagrams.js
// Teaching diagrams for "Coffee, Carbon and Stars".
//
//   The goals and the links
//     PIC_COFFEE / PIC_CARBON / PIC_SUN   one picture per part of the lesson,
//                   no words: the goals slide and the two-clocks slide
//     THREE_CLOCKS  caffeine, carbon-14 and the Sun's hydrogen: each disappears
//                   at a rate maths can model — different speeds, the same maths
//                   (measure what is left, work out how long)
//   Half-life and carbon dating
//     HALVING       100 → 50 → 25 → 12.5: each step is one half-life
//     CARBON_TWO    ordinary carbon, and carbon-14, which one day becomes nitrogen
//     C14_CYCLE     from the air, into a coffee plant, into Mr Bowen
//     DECAY_CURVE   Draw This: the carbon-14 curve, with the half-lives marked
//     ANS_DINO_YES / ANS_DINO_NO   vote: can carbon dating date a dinosaur?
//     TOO_OLD       after 9 half-lives almost nothing is left to measure
//
// Split diagrams are drawn at 840×560, showcase ones at 1120×440, vote cards
// at 720×320 — the shapes those layouts give a picture (as in 3.1).
// Label <text> is written out literally so `npm run audit:svg` can measure it.
// Helpers below draw shapes only. Diagrams stay in English (house rule).

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const TEAL = '#0087a8'
const BLUE = '#1a5fa8'
const GREEN = '#4a8b23'
const C14 = '#e07a1f'
const N14 = '#7f9bb8'
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

// A drawn Sun: flat pale disc and short rays.
const sun = (cx, cy, r) => {
  let rays = ''
  for (let k = 0; k < 12; k++) {
    const a = (k * 30 * Math.PI) / 180
    rays += `<line x1="${f1(cx + (r + 6) * Math.cos(a))}" y1="${f1(cy + (r + 6) * Math.sin(a))}" x2="${f1(cx + (r + 18) * Math.cos(a))}" y2="${f1(cy + (r + 18) * Math.sin(a))}" stroke="#e8a317" stroke-width="4" stroke-linecap="round"/>`
  }
  return `${rays}<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffd45c" stroke="${INK}" stroke-width="3"/>`
}

// The voting hands from 3.1.
const HAND_PATHS = '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'
const leftHand = (color) => `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = (color) => `<g transform="translate(528 76) scale(7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`

export const DIAGRAMS = {
  // ── Half-life and carbon dating ───────────────────────────────────────────
  HALVING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <line x1="70" y1="440" x2="800" y2="440" stroke="${INK}" stroke-width="3"/>
    <rect x="100" y="80" width="120" height="360" rx="8" fill="${KEY}"/>
    <rect x="280" y="260" width="120" height="180" rx="8" fill="${KEY}" opacity="0.85"/>
    <rect x="460" y="350" width="120" height="90" rx="8" fill="${KEY}" opacity="0.7"/>
    <rect x="640" y="395" width="120" height="45" rx="8" fill="${KEY}" opacity="0.55"/>
    <text x="160" y="66" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">100</text>
    <text x="340" y="246" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">50</text>
    <text x="520" y="336" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">25</text>
    <text x="700" y="381" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">12.5</text>
    <text x="160" y="480" font-family="${FONT}" font-size="21" fill="${MUTED}" text-anchor="middle">start</text>
    <text x="340" y="480" font-family="${FONT}" font-size="21" fill="${MUTED}" text-anchor="middle">1 half-life</text>
    <text x="520" y="480" font-family="${FONT}" font-size="21" fill="${MUTED}" text-anchor="middle">2 half-lives</text>
    <text x="700" y="480" font-family="${FONT}" font-size="21" fill="${MUTED}" text-anchor="middle">3 half-lives</text>
    <text x="420" y="530" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">each step: half of what was left</text>
  </svg>`,

  CARBON_TWO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <circle cx="190" cy="200" r="90" fill="#eef1f4" stroke="${INK}" stroke-width="3"/>
    <text x="190" y="218" font-family="${FONT}" font-size="54" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="190" y="340" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}" text-anchor="middle">ordinary carbon</text>
    <text x="190" y="372" font-family="${FONT}" font-size="21" fill="${MUTED}" text-anchor="middle">stays the same</text>
    <text x="190" y="400" font-family="${FONT}" font-size="21" fill="${MUTED}" text-anchor="middle">for ever</text>
    <circle cx="540" cy="200" r="98" fill="#fbe1c8" stroke="${C14}" stroke-width="4"/>
    <text x="540" y="218" font-family="${FONT}" font-size="54" font-weight="bold" fill="${C14}" text-anchor="middle">C</text>
    <text x="582" y="182" font-family="${FONT}" font-size="22" font-weight="bold" fill="${C14}">14</text>
    <path d="M 432 150 l -14 -8 M 440 120 l -12 -14 M 650 150 l 14 -8 M 642 120 l 12 -14" stroke="${C14}" stroke-width="3" stroke-linecap="round"/>
    <text x="540" y="340" font-family="${FONT}" font-size="25" font-weight="bold" fill="${C14}" text-anchor="middle">carbon-14</text>
    <text x="540" y="372" font-family="${FONT}" font-size="21" fill="${MUTED}" text-anchor="middle">heavier and unstable</text>
    ${arrow(650, 250, 720, 300, MUTED, 4, 16)}
    <circle cx="760" cy="350" r="46" fill="#e4ecf4" stroke="${N14}" stroke-width="3"/>
    <text x="760" y="366" font-family="${FONT}" font-size="40" font-weight="bold" fill="${N14}" text-anchor="middle">N</text>
    <text x="760" y="432" font-family="${FONT}" font-size="21" font-weight="bold" fill="${N14}" text-anchor="middle">nitrogen</text>
    <text x="610" y="470" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">one day, at a random moment,</text>
    <text x="610" y="498" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">it breaks down</text>
  </svg>`,

  C14_CYCLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <rect x="24" y="24" width="1072" height="150" rx="14" fill="#e9f1fa"/>
    <text x="44" y="58" font-family="${FONT}" font-size="20" font-weight="bold" fill="${BLUE}">HIGH IN THE AIR</text>
    ${sun(90, 120, 26)}
    ${arrow(130, 112, 230, 112, '#e8a317', 4, 16)}
    <text x="180" y="150" font-family="${FONT}" font-size="17" fill="${MUTED}" text-anchor="middle">rays from space</text>
    <circle cx="275" cy="112" r="30" fill="#e4ecf4" stroke="${N14}" stroke-width="3"/>
    <text x="275" y="126" font-family="${FONT}" font-size="34" font-weight="bold" fill="${N14}" text-anchor="middle">N</text>
    ${arrow(315, 112, 395, 112, INK, 4, 16)}
    <circle cx="440" cy="112" r="32" fill="#fbe1c8" stroke="${C14}" stroke-width="3"/>
    <text x="440" y="126" font-family="${FONT}" font-size="34" font-weight="bold" fill="${C14}" text-anchor="middle">C</text>
    <text x="440" y="164" font-family="${FONT}" font-size="17" fill="${MUTED}" text-anchor="middle">carbon-14 is made</text>
    ${arrow(482, 112, 560, 112, INK, 4, 16)}
    <text x="660" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">carbon dioxide</text>
    <text x="660" y="132" font-family="${FONT}" font-size="17" fill="${MUTED}" text-anchor="middle">a little has carbon-14 in it</text>
    ${arrow(760, 112, 840, 112, INK, 4, 16)}
    <text x="960" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${GREEN}" text-anchor="middle">into plants</text>
    <text x="960" y="132" font-family="${FONT}" font-size="17" fill="${MUTED}" text-anchor="middle">they take in the gas</text>
    ${arrow(960, 180, 960, 236, INK, 4, 16)}
    <path d="M 930 380 q -10 -60 30 -110 q 40 50 30 110 z" fill="#7cc36a" stroke="${INK}" stroke-width="2.5"/>
    <line x1="960" y1="380" x2="960" y2="410" stroke="${INK}" stroke-width="5"/>
    <circle cx="944" cy="320" r="7" fill="#b3261e"/><circle cx="972" cy="336" r="7" fill="#b3261e"/>
    <text x="960" y="260" font-family="${FONT}" font-size="20" font-weight="bold" fill="${GREEN}" text-anchor="middle">a coffee plant</text>
    ${arrow(900, 340, 780, 340, INK, 4, 16)}
    <path d="M 690 316 h 64 l -8 54 q -2 10 -12 10 h -24 q -10 0 -12 -10 z" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <rect x="696" y="322" width="52" height="12" fill="#6b3d1f"/>
    <text x="722" y="410" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">food and coffee</text>
    ${arrow(660, 340, 540, 340, INK, 4, 16)}
    <circle cx="440" cy="290" r="32" fill="#f2c9a5" stroke="${INK}" stroke-width="3"/>
    <rect x="404" y="324" width="72" height="80" rx="20" fill="${BLUE}" stroke="${INK}" stroke-width="2.5"/>
    <text x="440" y="428" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Mr Bowen</text>
    <text x="200" y="290" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">Every living thing:</text>
    <text x="200" y="322" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">1 carbon-14</text>
    <text x="200" y="354" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">in every trillion</text>
    <text x="200" y="386" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">carbon atoms</text>
  </svg>`,

  DECAY_CURVE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <line x1="110" y1="460" x2="800" y2="460" stroke="${INK}" stroke-width="3"/>
    <line x1="110" y1="460" x2="110" y2="50" stroke="${INK}" stroke-width="3"/>
    <path d="M 110 80 C 220 290 330 380 440 412 S 680 452 790 457" fill="none" stroke="${C14}" stroke-width="5"/>
    <line x1="110" y1="270" x2="275" y2="270" stroke="${MUTED}" stroke-width="2" stroke-dasharray="6 6"/>
    <line x1="275" y1="270" x2="275" y2="460" stroke="${MUTED}" stroke-width="2" stroke-dasharray="6 6"/>
    <line x1="110" y1="365" x2="440" y2="365" stroke="${MUTED}" stroke-width="2" stroke-dasharray="6 6"/>
    <line x1="440" y1="365" x2="440" y2="460" stroke="${MUTED}" stroke-width="2" stroke-dasharray="6 6"/>
    <text x="96" y="88" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="end">100%</text>
    <text x="96" y="278" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="end">50%</text>
    <text x="96" y="373" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="end">25%</text>
    <text x="275" y="492" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">5 700</text>
    <text x="440" y="492" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">11 400</text>
    <text x="800" y="530" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="end">years since it died</text>
    <text x="130" y="40" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}">carbon-14 left</text>
    ${leader(520, 230, 300, 284)}
    <text x="532" y="228" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">1 half-life</text>
  </svg>`,

  ANS_DINO_YES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    <text x="452" y="130" font-family="${FONT}" font-size="96" font-weight="bold" fill="${BLUE}" text-anchor="middle">YES</text>
    <text x="452" y="236" font-family="${FONT}" font-size="34" font-weight="bold" fill="${BLUE}" text-anchor="middle">carbon dating</text>
    <text x="452" y="284" font-family="${FONT}" font-size="34" font-weight="bold" fill="${BLUE}" text-anchor="middle">works on it</text>
  </svg>`,

  ANS_DINO_NO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    <text x="260" y="130" font-family="${FONT}" font-size="96" font-weight="bold" fill="${KEY}" text-anchor="middle">NO</text>
    <text x="260" y="236" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">it does not</text>
    <text x="260" y="284" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">work</text>
  </svg>`,

  TOO_OLD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <line x1="60" y1="420" x2="800" y2="420" stroke="${INK}" stroke-width="3"/>
    <rect x="70" y="80" width="56" height="340" rx="6" fill="${C14}"/>
    <rect x="148" y="250" width="56" height="170" rx="6" fill="${C14}"/>
    <rect x="226" y="335" width="56" height="85" rx="6" fill="${C14}"/>
    <rect x="304" y="378" width="56" height="42" rx="6" fill="${C14}"/>
    <rect x="382" y="399" width="56" height="21" rx="4" fill="${C14}"/>
    <rect x="460" y="409" width="56" height="11" rx="3" fill="${C14}"/>
    <rect x="538" y="415" width="56" height="5" rx="2" fill="${C14}"/>
    <rect x="616" y="417" width="56" height="3" rx="1" fill="${C14}"/>
    <rect x="694" y="418" width="56" height="2" rx="1" fill="${C14}"/>
    <text x="98" y="452" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">0</text>
    <text x="176" y="452" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">1</text>
    <text x="254" y="452" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">2</text>
    <text x="332" y="452" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">3</text>
    <text x="410" y="452" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">4</text>
    <text x="488" y="452" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">5</text>
    <text x="566" y="452" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">6</text>
    <text x="644" y="452" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">7</text>
    <text x="722" y="452" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">8</text>
    <text x="430" y="490" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">half-lives</text>
    <text x="136" y="98" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">100%</text>
    ${leader(640, 300, 722, 412)}
    <text x="560" y="250" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">0.4% left</text>
    <text x="560" y="280" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">45 600 years</text>
    <text x="430" y="530" font-family="${FONT}" font-size="21" fill="${MUTED}" text-anchor="middle">too little to measure after about 50 000 years</text>
  </svg>`,
  // ── The goals and the links ───────────────────────────────────────────────
  // One picture per part of the lesson. No words, so they read the same in
  // English and French; the column headings say what they are.
  PIC_COFFEE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    <g transform="translate(173 104)">
      <path d="M 30 -16 q -10 -15 0 -30 q 10 -15 0 -30 M 67 -16 q -10 -15 0 -30 q 10 -15 0 -30 M 104 -16 q -10 -15 0 -30 q 10 -15 0 -30" fill="none" stroke="#aab4be" stroke-width="5" stroke-linecap="round"/>
      <path d="M 130 34 q 44 0 40 44 q -4 40 -46 40" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
      <path d="M 0 0 L 10 152 Q 12 168 28 168 L 106 168 Q 122 168 124 152 L 134 0 Z" fill="#f4efe9" stroke="${INK}" stroke-width="4"/>
      <ellipse cx="67" cy="6" rx="62" ry="10" fill="#6b3d1f"/>
    </g>
  </svg>`,

  PIC_CARBON: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    <circle cx="240" cy="150" r="104" fill="#fbe1c8" stroke="${C14}" stroke-width="5"/>
    <text x="232" y="182" font-family="${FONT}" font-size="96" font-weight="bold" fill="${C14}" text-anchor="middle">C</text>
    <text x="284" y="126" font-family="${FONT}" font-size="34" font-weight="bold" fill="${C14}">14</text>
    <path d="M 124 96 l -18 -10 M 134 62 l -14 -18 M 356 96 l 18 -10 M 346 62 l 14 -18" stroke="${C14}" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  PIC_SUN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${sun(240, 150, 92)}
  </svg>`,

  THREE_CLOCKS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 800" class="w-full h-full">
    ${plate(840, 800)}
    <rect x="24" y="20" width="792" height="220" rx="18" fill="#fdf1e3"/>
    <g transform="translate(63 66) scale(0.7)">
      <path d="M 130 34 q 44 0 40 44 q -4 40 -46 40" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
      <path d="M 0 0 L 10 152 Q 12 168 28 168 L 106 168 Q 122 168 124 152 L 134 0 Z" fill="#f4efe9" stroke="${INK}" stroke-width="5"/>
      <ellipse cx="67" cy="6" rx="62" ry="10" fill="#6b3d1f"/>
    </g>
    <text x="220" y="95" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}">Caffeine</text>
    <text x="220" y="140" font-family="${FONT}" font-size="29" fill="${INK}">half gone every 5 hours</text>
    <text x="220" y="182" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}">measured in hours</text>

    <rect x="24" y="256" width="792" height="220" rx="18" fill="#e2f2f6"/>
    <circle cx="110" cy="366" r="60" fill="#fbe1c8" stroke="${C14}" stroke-width="5"/>
    <text x="104" y="386" font-family="${FONT}" font-size="56" font-weight="bold" fill="${C14}" text-anchor="middle">C</text>
    <text x="134" y="352" font-family="${FONT}" font-size="22" font-weight="bold" fill="${C14}">14</text>
    <text x="220" y="331" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}">Carbon-14</text>
    <text x="220" y="376" font-family="${FONT}" font-size="29" fill="${INK}">half gone every 5 700 years</text>
    <text x="220" y="418" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}">measured in thousands of years</text>

    <rect x="24" y="492" width="792" height="220" rx="18" fill="#f2ecf7"/>
    ${sun(110, 602, 46)}
    <text x="220" y="567" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}">Hydrogen in the Sun's core</text>
    <text x="220" y="612" font-family="${FONT}" font-size="29" fill="${INK}">about half gone in 4.6 billion years</text>
    <text x="220" y="654" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}">measured in billions of years</text>

    <rect x="24" y="728" width="792" height="56" rx="14" fill="${TEAL}"/>
    <text x="420" y="767" font-family="${FONT}" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">Measure what is left. Work out how long.</text>
  </svg>`,
}

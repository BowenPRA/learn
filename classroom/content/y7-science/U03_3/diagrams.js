// content/y7-science/U03_3/diagrams.js
// Teaching diagrams for 3.3 Movement in space (Learner's Book pp. 91–96).
//
//   The planets
//     PLANET_ROW    — the eight planets in order, real photographs, with the
//                     mnemonic word under each one and the Moon under the Earth
//   What keeps them in orbit
//     STRING_DEMO   — Mr Bowen's ball on a string, from the side and from above
//     ANS_OUT / ANS_ON — the vote: when he lets go, away from the centre, or
//                     straight on the way it was going?
//     ORBIT_DRAW    — Draw This: the book's p.92 diagram, gravity towards the
//                     Sun and the direction of orbit, plus the dashed straight
//                     line the planet would take with no gravity (the planet
//                     sits at 3 o'clock so that line runs clear of the orbit)
//   Speed
//     SPEED_TABLE   — the book's Activity table, with axes ready to draw on
//     SPEED_GRAPH   — the finished bar graph, to check against
//     SPEED_PULL    — close to the Sun: a strong pull and fast; far: weak and slow
//   Discovering Neptune (Think like a scientist, pp. 95–96)
//     NEPTUNE_STORY — 1781 Uranus, 1821 Bouvard's predictions, 1846 Neptune
//     WORDS3        — observation, prediction, conclusion
//
// Split diagrams are drawn at about 1.4:1 (840×560), showcase ones at about
// 2.5:1 (1120×440), and the vote cards at 720×320, as in 3.1.
//
// Label <text> is written out literally so `npm run audit:svg` can measure it.
// Helpers below draw shapes only. Every planet orbits ANTICLOCKWISE seen from
// above, as in the book's diagram and the orbit widget.

import mercury from './images/mercury.jpg'
import venus from './images/venus.jpg'
import earth from './images/earth.jpg'
import mars from './images/mars.jpg'
import jupiter from './images/jupiter.jpg'
import saturn from './images/saturn.jpg'
import uranus from './images/uranus.jpg'
import neptune from './images/neptune.jpg'
import moon from './images/moon.jpg'
import bouvard from './images/bouvard.jpg'
import leverrier from './images/leverrier.jpg'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const TEAL = '#0087a8'
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const TEAL_T = '#e2f2f6'
const ORANGE_T = '#fdf1e3'
const SUN_FILL = '#fde58a'
const SUN_RIM = '#c99a06'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const f1 = (n) => Number(n.toFixed(1))

// A straight arrow with a drawn head (not a marker, so every head is the same
// size whatever the line width).
const arrow = (x1, y1, x2, y2, color, w = 6, head = 20) => {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const hx = x2 - head * Math.cos(a), hy = y2 - head * Math.sin(a)
  const px = head * 0.55 * Math.sin(a), py = -head * 0.55 * Math.cos(a)
  return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(hx)}" y2="${f1(hy)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M ${f1(x2)} ${f1(y2)} L ${f1(hx + px)} ${f1(hy + py)} L ${f1(hx - px)} ${f1(hy - py)} Z" fill="${color}"/>`
}

// A thin leader line ending in a dot on the thing it names.
const leader = (x1, y1, x2, y2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${KEY}" stroke-width="2"/><circle cx="${x2}" cy="${y2}" r="4.5" fill="${KEY}"/>`

// A photo in a rounded frame.
const photo = (id, href, x, y, w, h, fit = 'xMidYMid slice') => `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath></defs>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="${fit}" clip-path="url(#${id})"/>`

// A planet photo on a black tile (space is black; the plate stays white).
const tile = (id, href, x, y, s, zoom = 1) => {
  const z = s * zoom
  return `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${s}" height="${s}" rx="10"/></clipPath></defs>
    <rect x="${x}" y="${y}" width="${s}" height="${s}" rx="10" fill="#05070a"/>
    <image href="${href}" x="${f1(x - (z - s) / 2)}" y="${f1(y - (z - s) / 2)}" width="${f1(z)}" height="${f1(z)}" preserveAspectRatio="xMidYMid meet" clip-path="url(#${id})"/>`
}

const sun = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${SUN_FILL}" stroke="${SUN_RIM}" stroke-width="3"/>`
const dot = (cx, cy, r, fill, stroke = INK) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>`

// Small arrowheads sitting on a circle, pointing anticlockwise (seen from above).
const anticlockwiseTicks = (cx, cy, r, degs, color = MUTED) =>
  degs.map((d) => {
    const a = (d * Math.PI) / 180
    const x = cx + r * Math.cos(a), y = cy - r * Math.sin(a)
    const tx = -Math.sin(a), ty = -Math.cos(a) // direction of travel on screen
    const nx = -ty, ny = tx
    const s = 11
    return `<path d="M ${f1(x + tx * s)} ${f1(y + ty * s)} L ${f1(x - tx * s * 0.6 + nx * s * 0.7)} ${f1(y - ty * s * 0.6 + ny * s * 0.7)} L ${f1(x - tx * s * 0.6 - nx * s * 0.7)} ${f1(y - ty * s * 0.6 - ny * s * 0.7)} Z" fill="${color}"/>`
  }).join('\n    ')

// The lucide Hand outline, as on Maths 2.3's and Science 3.1's vote cards. A
// left hand is the same drawing mirrored: seen from behind, thumb on the right.
const HAND_PATHS = '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'
const leftHand = (color) => `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = (color) => `<g transform="translate(528 76) scale(7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`

// The ball on a string seen from above, with the ball at the top of its circle
// (moving left, anticlockwise). Used by both vote cards.
const fromAbove = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${MUTED}" stroke-width="3" stroke-dasharray="9 8"/>
    ${anticlockwiseTicks(cx, cy, r, [0, 180, 270])}
    <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r + 14}" stroke="${INK}" stroke-width="3"/>
    <circle cx="${cx}" cy="${cy}" r="9" fill="#f1c9a5" stroke="${INK}" stroke-width="2.5"/>
    ${dot(cx, cy - r, 15, '#f08b82', RED)}`

export const DIAGRAMS = {
  // ── The planets ───────────────────────────────────────────────────────────
  PLANET_ROW: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 400" class="w-full h-full">
    ${plate(1120, 400)}
    <text x="24" y="36" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">closest to the Sun</text>
    <text x="1096" y="36" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="end">furthest from the Sun</text>
    ${arrow(266, 29, 816, 29, MUTED, 3, 14)}

    ${tile('u33-row-1', mercury, 24, 54, 124)}
    ${tile('u33-row-2', venus, 158, 54, 124)}
    ${tile('u33-row-3', earth, 292, 54, 124)}
    ${tile('u33-row-4', mars, 426, 54, 124)}
    ${tile('u33-row-5', jupiter, 560, 54, 124)}
    ${tile('u33-row-6', saturn, 694, 54, 124, 1.25)}
    ${tile('u33-row-7', uranus, 828, 54, 124)}
    ${tile('u33-row-8', neptune, 962, 54, 124)}

    <text x="86" y="212" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Mercury</text>
    <text x="220" y="212" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Venus</text>
    <text x="354" y="212" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Earth</text>
    <text x="488" y="212" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Mars</text>
    <text x="622" y="212" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Jupiter</text>
    <text x="756" y="212" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Saturn</text>
    <text x="890" y="212" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Uranus</text>
    <text x="1024" y="212" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Neptune</text>

    <text x="86" y="248" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">My</text>
    <text x="220" y="248" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">Very</text>
    <text x="354" y="248" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">Easy</text>
    <text x="488" y="248" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">Method</text>
    <text x="622" y="248" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">Just</text>
    <text x="756" y="248" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">Speeds</text>
    <text x="890" y="248" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">Up</text>
    <text x="1024" y="248" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">Naming</text>

    ${tile('u33-row-moon', moon, 309, 272, 90)}
    <text x="414" y="310" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">the Moon</text>
    <text x="414" y="342" font-family="${FONT}" font-size="24" fill="${INK}">orbits the Earth</text>
    <text x="1096" y="384" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="end">photographs from space · sizes not to scale</text>
  </svg>`,

  // ── What keeps them in orbit ──────────────────────────────────────────────
  STRING_DEMO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="16" y="16" width="300" height="528" rx="14" fill="#fbfcfd" stroke="${RULE}" stroke-width="2"/>
    <text x="166" y="58" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Mr Bowen</text>
    <ellipse cx="192" cy="176" rx="106" ry="30" fill="none" stroke="${MUTED}" stroke-width="3" stroke-dasharray="9 8"/>
    <g fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="132" cy="312" r="24" fill="#ffffff"/>
      <path d="M 132 336 L 132 430 M 132 430 L 104 512 M 132 430 L 160 512 M 132 370 L 96 420 M 132 370 L 196 324 L 192 196"/>
    </g>
    <line x1="192" y1="194" x2="280" y2="192" stroke="${INK}" stroke-width="3"/>
    ${dot(286, 190, 14, '#f08b82', RED)}
    <text x="166" y="102" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">swings a ball round</text>
    <text x="166" y="128" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">over his head</text>

    <rect x="332" y="16" width="492" height="528" rx="14" fill="#fbfcfd" stroke="${RULE}" stroke-width="2"/>
    <text x="578" y="58" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Seen from above</text>
    ${fromAbove(540, 300, 120)}
    ${arrow(562, 200, 562, 272, RED, 6, 18)}
    ${arrow(520, 180, 418, 180, BLUE, 6, 18)}
    <text x="678" y="226" font-family="${FONT}" font-size="22" font-weight="bold" fill="${RED}">the string</text>
    <text x="678" y="254" font-family="${FONT}" font-size="22" font-weight="bold" fill="${RED}">pulls it in</text>
    ${leader(672, 234, 570, 236)}
    <text x="350" y="124" font-family="${FONT}" font-size="22" font-weight="bold" fill="${BLUE}">the ball is moving</text>
    ${leader(420, 132, 448, 176)}
    <text x="578" y="506" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">the string = the Sun’s gravity</text>
  </svg>`,

  // Vote cards. The ball is at the top of its circle, moving left.
  ANS_OUT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    ${fromAbove(356, 214, 82)}
    ${arrow(356, 112, 356, 18, BLUE, 8, 24)}
    <text x="596" y="160" font-family="${FONT}" font-size="36" font-weight="bold" fill="${BLUE}" text-anchor="middle">away from</text>
    <text x="596" y="206" font-family="${FONT}" font-size="36" font-weight="bold" fill="${BLUE}" text-anchor="middle">the centre</text>
  </svg>`,

  ANS_ON: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    ${fromAbove(232, 214, 82)}
    ${arrow(214, 132, 28, 132, KEY, 8, 24)}
    <text x="414" y="160" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">the way it</text>
    <text x="414" y="206" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">was going</text>
  </svg>`,

  // Draw This: the book's p.92 diagram.
  ORBIT_DRAW: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <circle cx="290" cy="300" r="210" fill="none" stroke="${INK}" stroke-width="3"/>
    ${sun(290, 300, 36)}
    <line x1="500" y1="188" x2="500" y2="34" stroke="${MUTED}" stroke-width="4" stroke-dasharray="11 9" stroke-linecap="round"/>
    ${dot(500, 300, 15, '#8ec5e8')}
    ${arrow(482, 300, 372, 300, RED, 6, 20)}
    ${arrow(500, 282, 500, 186, BLUE, 6, 20)}

    <text x="560" y="58" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}">no gravity:</text>
    <text x="560" y="88" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}">straight on</text>
    ${leader(552, 70, 506, 70)}
    <text x="560" y="214" font-family="${FONT}" font-size="24" font-weight="bold" fill="${BLUE}">direction</text>
    <text x="560" y="244" font-family="${FONT}" font-size="24" font-weight="bold" fill="${BLUE}">of orbit</text>
    ${leader(552, 224, 506, 236)}
    <text x="560" y="318" font-family="${FONT}" font-size="24" fill="${KEY}">planet</text>
    ${leader(552, 310, 517, 300)}
    <text x="560" y="398" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}">force from the</text>
    <text x="560" y="428" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}">Sun’s gravity</text>
    ${leader(552, 406, 430, 304)}
    <text x="290" y="550" font-family="${FONT}" font-size="24" fill="${KEY}" text-anchor="middle">Sun</text>
    ${leader(290, 530, 290, 338)}
    <text x="824" y="548" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="end">not to scale</text>
  </svg>`,

  // ── Speed ─────────────────────────────────────────────────────────────────
  // The book's table, and axes ready to draw on (1 km/s = 6.4 px).
  SPEED_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <rect x="24" y="18" width="400" height="48" rx="6" fill="${TEAL}"/>
    <text x="124" y="50" font-family="${FONT}" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">Name of planet</text>
    <text x="324" y="50" font-family="${FONT}" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">Speed in km/s</text>
    <rect x="24" y="66" width="400" height="44" fill="#f7f9fa"/>
    <rect x="24" y="110" width="400" height="44" fill="#ffffff"/>
    <rect x="24" y="154" width="400" height="44" fill="#f7f9fa"/>
    <rect x="24" y="198" width="400" height="44" fill="#ffffff"/>
    <rect x="24" y="242" width="400" height="44" fill="#f7f9fa"/>
    <rect x="24" y="286" width="400" height="44" fill="#ffffff"/>
    <rect x="24" y="330" width="400" height="44" fill="#f7f9fa"/>
    <rect x="24" y="374" width="400" height="44" fill="#ffffff"/>
    <line x1="224" y1="66" x2="224" y2="418" stroke="${RULE}" stroke-width="2"/>
    <rect x="24" y="18" width="400" height="400" rx="6" fill="none" stroke="${RULE}" stroke-width="2"/>
    <text x="124" y="96" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">Mercury</text>
    <text x="324" y="97" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">48</text>
    <text x="124" y="140" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">Venus</text>
    <text x="324" y="141" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">35</text>
    <text x="124" y="184" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">Earth</text>
    <text x="324" y="185" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">30</text>
    <text x="124" y="228" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">Mars</text>
    <text x="324" y="229" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">24</text>
    <text x="124" y="272" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">Jupiter</text>
    <text x="324" y="273" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">13</text>
    <text x="124" y="316" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">Saturn</text>
    <text x="324" y="317" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">10</text>
    <text x="124" y="360" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">Uranus</text>
    <text x="324" y="361" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">7</text>
    <text x="124" y="404" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">Neptune</text>
    <text x="324" y="405" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">5</text>

    <text x="536" y="214" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle" transform="rotate(-90 536 214)">speed of orbit in km/s</text>
    <line x1="600" y1="308" x2="1096" y2="308" stroke="#e6ebef" stroke-width="1.5"/>
    <line x1="600" y1="244" x2="1096" y2="244" stroke="#e6ebef" stroke-width="1.5"/>
    <line x1="600" y1="180" x2="1096" y2="180" stroke="#e6ebef" stroke-width="1.5"/>
    <line x1="600" y1="116" x2="1096" y2="116" stroke="#e6ebef" stroke-width="1.5"/>
    <line x1="600" y1="52" x2="1096" y2="52" stroke="#e6ebef" stroke-width="1.5"/>
    <text x="588" y="378" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="end">0</text>
    <text x="588" y="314" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="end">10</text>
    <text x="588" y="250" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="end">20</text>
    <text x="588" y="186" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="end">30</text>
    <text x="588" y="122" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="end">40</text>
    <text x="588" y="58" font-family="${FONT}" font-size="18" fill="${MUTED}" text-anchor="end">50</text>
    <rect x="611" y="64.8" width="40" height="307.2" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5" stroke-dasharray="7 5"/>
    <text x="631" y="56" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">48</text>
    <text x="680" y="100" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}">Up the side: 1 cm = 5 km/s</text>
    <text x="680" y="134" font-family="${FONT}" font-size="20" fill="${MUTED}">Mercury: 48 km/s = 9.6 cm, done for you.</text>
    <text x="680" y="164" font-family="${FONT}" font-size="20" fill="${MUTED}">Bars 1 cm wide. Not touching.</text>
    <line x1="600" y1="40" x2="600" y2="372" stroke="${INK}" stroke-width="3"/>
    <line x1="600" y1="372" x2="1100" y2="372" stroke="${INK}" stroke-width="3"/>
    <text x="637" y="392" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="end" transform="rotate(-35 637 392)">Mercury</text>
    <text x="699" y="392" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="end" transform="rotate(-35 699 392)">Venus</text>
    <text x="761" y="392" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="end" transform="rotate(-35 761 392)">Earth</text>
    <text x="823" y="392" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="end" transform="rotate(-35 823 392)">Mars</text>
    <text x="885" y="392" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="end" transform="rotate(-35 885 392)">Jupiter</text>
    <text x="947" y="392" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="end" transform="rotate(-35 947 392)">Saturn</text>
    <text x="1009" y="392" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="end" transform="rotate(-35 1009 392)">Uranus</text>
    <text x="1071" y="392" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="end" transform="rotate(-35 1071 392)">Neptune</text>
  </svg>`,

  // The finished graph (1 km/s = 6.4 px; zero at y = 370).
  SPEED_GRAPH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <text x="62" y="210" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle" transform="rotate(-90 62 210)">speed of orbit in km/s</text>
    <line x1="150" y1="306" x2="1100" y2="306" stroke="#e6ebef" stroke-width="1.5"/>
    <line x1="150" y1="242" x2="1100" y2="242" stroke="#e6ebef" stroke-width="1.5"/>
    <line x1="150" y1="178" x2="1100" y2="178" stroke="#e6ebef" stroke-width="1.5"/>
    <line x1="150" y1="114" x2="1100" y2="114" stroke="#e6ebef" stroke-width="1.5"/>
    <line x1="150" y1="50" x2="1100" y2="50" stroke="#e6ebef" stroke-width="1.5"/>
    <text x="138" y="377" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="end">0</text>
    <text x="138" y="313" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="end">10</text>
    <text x="138" y="249" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="end">20</text>
    <text x="138" y="185" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="end">30</text>
    <text x="138" y="121" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="end">40</text>
    <text x="138" y="57" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="end">50</text>

    <rect x="174" y="62.8" width="70" height="307.2" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <rect x="293" y="146" width="70" height="224" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <rect x="412" y="178" width="70" height="192" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <rect x="530" y="216.4" width="70" height="153.6" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <rect x="649" y="286.8" width="70" height="83.2" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <rect x="768" y="306" width="70" height="64" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <rect x="887" y="325.2" width="70" height="44.8" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <rect x="1006" y="338" width="70" height="32" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <text x="209" y="52" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">48</text>
    <text x="328" y="135" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">35</text>
    <text x="447" y="167" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">30</text>
    <text x="565" y="205" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">24</text>
    <text x="684" y="276" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">13</text>
    <text x="803" y="295" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">10</text>
    <text x="922" y="314" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">7</text>
    <text x="1041" y="327" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">5</text>

    <line x1="150" y1="38" x2="150" y2="370" stroke="${INK}" stroke-width="3"/>
    <line x1="150" y1="370" x2="1100" y2="370" stroke="${INK}" stroke-width="3"/>
    <text x="209" y="400" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Mercury</text>
    <text x="328" y="400" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Venus</text>
    <text x="447" y="400" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Earth</text>
    <text x="565" y="400" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Mars</text>
    <text x="684" y="400" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Jupiter</text>
    <text x="803" y="400" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Saturn</text>
    <text x="922" y="400" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Uranus</text>
    <text x="1041" y="400" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Neptune</text>
    <text x="625" y="430" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">planet, in order from the Sun</text>

    <rect x="620" y="30" width="480" height="150" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="640" y="74" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">As the distance from the Sun</text>
    <text x="640" y="112" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">increases, the speed of orbit</text>
    <text x="640" y="150" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">of the planets</text>
    <line x1="826" y1="152" x2="996" y2="152" stroke="${KEY}" stroke-width="4" stroke-linecap="round"/>
    <text x="1004" y="150" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">.</text>
  </svg>`,

  SPEED_PULL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${arrow(40, 56, 112, 56, RED, 7, 20)}
    <text x="128" y="65" font-family="${FONT}" font-size="26" fill="${INK}">= the pull of the Sun’s gravity</text>

    <path d="M 0 136 A 136 136 0 0 1 0 408 Z" fill="${SUN_FILL}" stroke="${SUN_RIM}" stroke-width="3"/>
    <text x="44" y="452" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Sun</text>

    <text x="250" y="196" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Mercury</text>
    ${dot(250, 272, 16, '#b5b5b5')}
    ${arrow(228, 272, 150, 272, RED, 10, 26)}
    <text x="250" y="354" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">48 km/s</text>
    <text x="250" y="396" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">strongest pull</text>

    <text x="446" y="196" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Earth</text>
    ${dot(446, 272, 21, '#4f8fbf')}
    ${arrow(418, 272, 360, 272, RED, 8, 22)}
    <text x="446" y="354" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">30 km/s</text>

    <text x="578" y="282" font-family="${FONT}" font-size="36" font-weight="bold" fill="${MUTED}" text-anchor="middle">· · ·</text>

    <text x="728" y="196" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Neptune</text>
    ${dot(728, 272, 27, '#4a6fd1')}
    ${arrow(696, 272, 664, 272, RED, 5, 16)}
    <text x="728" y="354" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">5 km/s</text>
    <text x="728" y="396" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">weakest pull</text>
    <text x="728" y="452" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">30 times further</text>
    <text x="728" y="480" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">from the Sun</text>
    <text x="728" y="508" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">than the Earth</text>
    <text x="40" y="540" font-family="${FONT}" font-size="18" fill="${MUTED}">not to scale</text>
  </svg>`,

  // ── Discovering Neptune ───────────────────────────────────────────────────
  NEPTUNE_STORY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <rect x="20" y="16" width="350" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    ${tile('u33-story-u', uranus, 95, 32, 200)}
    <text x="195" y="282" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">1781</text>
    <text x="195" y="324" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Uranus is found.</text>
    <text x="195" y="358" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">Is it the last planet?</text>

    <rect x="385" y="16" width="350" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    ${photo('u33-story-b', bouvard, 445, 32, 230, 200, 'xMidYMin slice')}
    <text x="560" y="282" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">1821</text>
    <text x="560" y="324" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Bouvard calculates</text>
    <text x="560" y="358" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">where Uranus will be.</text>
    <text x="560" y="398" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">Uranus is not there!</text>

    <rect x="750" y="16" width="350" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    ${photo('u33-story-l', leverrier, 772, 32, 158, 200, 'xMidYMin slice')}
    ${tile('u33-story-n', neptune, 940, 56, 150)}
    <text x="925" y="282" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">1846</text>
    <text x="925" y="324" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Le Verrier predicts</text>
    <text x="925" y="358" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">where a new planet is.</text>
    <text x="925" y="398" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">Neptune is there!</text>
  </svg>`,

  // Drawn nearly square (640×600): on a split slide in full screen the media
  // panel is about square, and a wider drawing would come out small.
  WORDS3: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 600" class="w-full h-full">
    ${plate(640, 600)}

    <rect x="16" y="16" width="608" height="182" rx="14" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="2"/>
    <g fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 30 107 Q 80 55 130 107 Q 80 159 30 107 Z" fill="#ffffff"/>
      <circle cx="80" cy="107" r="18" fill="${TEAL}"/>
    </g>
    <text x="156" y="80" font-family="${FONT}" font-size="46" font-weight="bold" fill="${KEY}">observation</text>
    <text x="156" y="128" font-family="${FONT}" font-size="30" fill="${INK}">what you see,</text>
    <text x="156" y="166" font-family="${FONT}" font-size="30" fill="${INK}">measure and record</text>

    <rect x="16" y="209" width="608" height="182" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2"/>
    <g fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="80" cy="300" r="46" fill="#ffffff"/>
      <path d="M 80 300 L 80 270 M 80 300 L 102 312"/>
    </g>
    <text x="156" y="273" font-family="${FONT}" font-size="46" font-weight="bold" fill="${KEY}">prediction</text>
    <text x="156" y="321" font-family="${FONT}" font-size="30" fill="${INK}">what you think</text>
    <text x="156" y="359" font-family="${FONT}" font-size="30" fill="${INK}">will happen</text>

    <rect x="16" y="402" width="608" height="182" rx="14" fill="#eef6e8" stroke="#4a8b23" stroke-width="2"/>
    <g fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 60 498 Q 40 468 52 446 Q 80 410 108 446 Q 120 468 100 498 Z" fill="#fff3a6"/>
      <path d="M 64 514 L 96 514 M 68 528 L 92 528"/>
    </g>
    <text x="156" y="466" font-family="${FONT}" font-size="46" font-weight="bold" fill="${KEY}">conclusion</text>
    <text x="156" y="514" font-family="${FONT}" font-size="30" fill="${INK}">what you decide</text>
    <text x="156" y="552" font-family="${FONT}" font-size="30" fill="${INK}">from the results</text>
  </svg>`,
}

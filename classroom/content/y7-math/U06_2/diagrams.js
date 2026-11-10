// content/y7-math/U06_2/diagrams.js
// Teaching diagrams for 6.2 Taking a sample, drawn to match 6.1.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes only, because
//    `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · `split` diagrams are 840×560, `showcase` ones 1120×440, vote cards 720×320.
//
//   The goals    PIC_SOME · PIC_FAIR · PIC_MORE — one picture each, no words
//   Words        SCHOOL       200 students, 20 of them asked
//                EVERYDAY     a free sample, a blood sample, a sample of students
//                NAME_THEM    two situations: name the population, sample, size
//   Fair         STIR_IT      the phở, and a pot stirred or not
//                ANS_LIST / ANS_GATE   vote: which sample is fair?
//                RANDOM       names from a hat; every 10th name on the list
//   Size         ENOUGH       5 students, 50 students, all 200
//                CLASS_TABLE  the class's own samples, filled in on the board
//   The book     PHRASES      the Workbook's sample words
//                ZOO          is this a good way to choose a sample?
//                DICE         three samples of dice rolls and their means
//                POP_SAMPLE   population → sample → back (Draw This)
//
// Like the book's, the diagrams stay in English.

import freeSamplePhoto from './images/freesample.jpg'
import bloodPhoto from './images/blood.jpg'
import phoPhoto from './images/pho.jpg'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const PURPLE = '#5c2483'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'
const RED = '#c8102e'
const BLUE_T = '#e3eef9'
const GREEN_T = '#eef6e6'
const ORANGE_T = '#fdf1e3'
const RULE = '#cfd8dc'
const DOT = '#c3ccd5'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const f = (n) => n.toFixed(1)
const seg = (x1, y1, x2, y2, w = 5, color = INK) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`
const photo = (id, href, x, y, w, h, fit = 'slice') => `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid ${fit}" clip-path="url(#${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="#cbd5e1" stroke-width="2"/>`
const arrow = (x1, y1, x2, y2, color = INK, w = 4, head = 16) => {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const p = (d, r) => [x2 - r * Math.cos(a + d), y2 - r * Math.sin(a + d)]
  const [lx, ly] = p(0.45, head)
  const [rx, ry] = p(-0.45, head)
  const [bx, by] = p(0, head * 0.7)
  return `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(bx)}" y2="${f(by)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M ${f(x2)} ${f(y2)} L ${f(lx)} ${f(ly)} L ${f(rx)} ${f(ry)} Z" fill="${color}"/>`
}
const tick = (x, y, s = 1, color = GREEN) => `<path d="M ${x - 14 * s} ${y} L ${x - 4 * s} ${y + 11 * s} L ${x + 16 * s} ${y - 13 * s}" fill="none" stroke="${color}" stroke-width="${7 * s}" stroke-linecap="round" stroke-linejoin="round"/>`
const cross = (x, y, s = 1, color = RED) => `<path d="M ${x - 13 * s} ${y - 13 * s} L ${x + 13 * s} ${y + 13 * s} M ${x + 13 * s} ${y - 13 * s} L ${x - 13 * s} ${y + 13 * s}" fill="none" stroke="${color}" stroke-width="${7 * s}" stroke-linecap="round"/>`

// A fixed scatter: the same "random" choice every time the page loads.
const lcg = (seed) => () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648)
// A grid of students as dots; `on` is a set of indices drawn as the sample.
const grid = (x0, y0, cols, rows, pitch, r, on = new Set(), onColor = KEY, pitchY = pitch) => {
  let s = ''
  for (let i = 0; i < cols * rows; i++) {
    const cx = x0 + (i % cols) * pitch
    const cy = y0 + Math.floor(i / cols) * pitchY
    s += on.has(i)
      ? `<circle cx="${f(cx)}" cy="${f(cy)}" r="${r + 2}" fill="${onColor}" stroke="#ffffff" stroke-width="2"/>`
      : `<circle cx="${f(cx)}" cy="${f(cy)}" r="${r}" fill="${DOT}"/>`
  }
  return s
}
// `per` students from each pair of rows (one year group), at fixed random places.
const spread = (cols, rows, per, seed) => {
  const rnd = lcg(seed)
  const on = new Set()
  for (let g = 0; g < rows / 2; g++) {
    while ([...on].filter((i) => Math.floor(i / cols / 2) === g).length < per) {
      on.add(g * 2 * cols + Math.floor(rnd() * cols * 2))
    }
  }
  return on
}
const SCHOOL_SAMPLE = spread(20, 10, 4, 7)

// A pot of soup, its rim at (x, y), w wide; `salt` 'top' or 'mixed'.
const pot = (x, y, w, salt) => {
  const h = w * 0.62
  let s = `<path d="M ${x} ${y} L ${x + w * 0.06} ${y + h} Q ${x + w / 2} ${y + h + 14} ${x + w * 0.94} ${y + h} L ${x + w} ${y} Z" fill="#9aa5b1" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="${x + w / 2}" cy="${y}" rx="${w / 2}" ry="${w * 0.1}" fill="#e8c88a" stroke="${INK}" stroke-width="3"/>
    <rect x="${x - 18}" y="${y + 14}" width="20" height="10" rx="4" fill="${INK}"/><rect x="${x + w - 2}" y="${y + 14}" width="20" height="10" rx="4" fill="${INK}"/>`
  const rnd = lcg(salt === 'top' ? 3 : 11)
  for (let i = 0; i < 22; i++) {
    const sx = x + w * (0.12 + 0.76 * rnd())
    const sy = salt === 'top' ? y - w * 0.04 + w * 0.06 * rnd() : y + 12 + (h - 24) * rnd()
    s += `<rect x="${f(sx)}" y="${f(sy)}" width="7" height="7" fill="#ffffff" stroke="${MUTED}" stroke-width="1"/>`
  }
  return s
}
// A spoon dipping in at (x, y).
const spoon = (x, y) => `<line x1="${x + 70}" y1="${y - 70}" x2="${x + 8}" y2="${y - 8}" stroke="#8a6a3c" stroke-width="8" stroke-linecap="round"/><ellipse cx="${x}" cy="${y}" rx="16" ry="11" fill="#c9ced4" stroke="${INK}" stroke-width="2.5"/>`

// A hat with folded names in it, its brim centred at (x, y).
const hat = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-34" y="-38" width="22" height="30" rx="2" fill="#ffffff" stroke="${INK}" stroke-width="2" transform="rotate(-14 -23 -23)"/>
    <rect x="-6" y="-46" width="22" height="30" rx="2" fill="#fdf1e3" stroke="${INK}" stroke-width="2" transform="rotate(8 5 -31)"/>
    <rect x="18" y="-36" width="22" height="30" rx="2" fill="#ffffff" stroke="${INK}" stroke-width="2" transform="rotate(20 29 -21)"/>
    <path d="M -58 -10 L -48 70 L 48 70 L 58 -10 Z" fill="#3d4652" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="0" cy="-10" rx="62" ry="14" fill="#59636e" stroke="${INK}" stroke-width="3"/>
    <rect x="-49" y="36" width="98" height="14" fill="${KEY}"/>
  </g>`
// A list of names as grey bars; every 10th line highlighted. Top-left (x, y).
const nameList = (x, y, n = 22, pitch = 16, w = 150, ticks = true) => {
  let s = `<rect x="${x}" y="${y}" width="${w + 40}" height="${n * pitch + 24}" rx="6" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>`
  for (let i = 0; i < n; i++) {
    const ly = y + 18 + i * pitch
    const on = i % 10 === 4
    s += `<rect x="${x + 14}" y="${ly - 5}" width="${w * (0.55 + 0.4 * ((i * 37) % 10) / 10)}" height="8" rx="4" fill="${on ? KEY : '#d5dbe1'}"/>`
    if (on && ticks) s += tick(x + w + 22, ly - 1, 0.55, GREEN)
  }
  return s
}

// The voting hands from 2.3 and Unit 5.
const HAND_PATHS = `<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>`
const leftHand = `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${BLUE}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = `<g transform="translate(528 76) scale(7)" fill="none" stroke="${KEY}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`

// Dots on a line for PIC_MORE: [x positions], at height y.
const dots = (xs, y, color) => xs.map((x) => `<circle cx="${x}" cy="${y}" r="11" fill="${color}" stroke="#ffffff" stroke-width="2"/>`).join('')

export const DIAGRAMS = {
  // ── The goals ─────────────────────────────────────────────────────────────
  PIC_SOME: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${pot(120, 130, 240, 'mixed')}
    ${spoon(250, 128)}
  </svg>`,

  PIC_FAIR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${hat(170, 170, 1.25)}
    ${nameList(300, 40, 12, 18, 110)}
  </svg>`,

  PIC_MORE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${seg(40, 120, 440, 120, 4)}
    ${seg(40, 240, 440, 240, 4)}
    ${dots([70, 150, 230, 330, 410], 100, KEY)}
    ${dots([215, 238, 250, 262, 285], 220, BLUE)}
  </svg>`,

  // ── Population and sample ────────────────────────────────────────────────
  SCHOOL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="420" y="44" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Mr Bowen’s school: 200 students</text>
    <rect x="96" y="70" width="700" height="356" rx="16" fill="#f7f9fb" stroke="${RULE}" stroke-width="2"/>
    ${grid(126, 98, 20, 10, 34, 9, SCHOOL_SAMPLE)}
    <text x="80" y="124" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="end">Y7</text>
    <text x="80" y="192" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="end">Y8</text>
    <text x="80" y="260" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="end">Y9</text>
    <text x="80" y="328" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="end">Y10</text>
    <text x="80" y="396" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="end">Y11</text>
    <circle cx="120" cy="472" r="11" fill="${DOT}"/>
    <text x="142" y="481" font-family="${FONT}" font-size="26" fill="${INK}">all 200: the population</text>
    <circle cx="120" cy="518" r="13" fill="${KEY}"/>
    <text x="142" y="527" font-family="${FONT}" font-size="26" fill="${INK}">the 20 he asks: the sample</text>
    <rect x="566" y="456" width="230" height="84" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="681" y="490" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">sample size</text>
    <text x="681" y="526" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">20</text>
  </svg>`,

  EVERYDAY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${photo('ev-tin', freeSamplePhoto, 24, 20, 330, 350)}
    ${photo('ev-blood', bloodPhoto, 380, 20, 350, 350)}
    <rect x="756" y="20" width="340" height="350" rx="12" fill="#f7f9fb" stroke="#cbd5e1" stroke-width="2"/>
    ${grid(790, 70, 8, 8, 38, 9, new Set([3, 9, 20, 30, 37, 44, 50, 61]))}
    <text x="189" y="414" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">a free sample</text>
    <text x="555" y="414" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">a blood sample</text>
    <text x="926" y="414" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">a sample of students</text>
  </svg>`,

  NAME_THEM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="24" y="24" width="792" height="240" rx="16" fill="#f7f9fb" stroke="${RULE}" stroke-width="2"/>
    <circle cx="66" cy="66" r="24" fill="${PURPLE}"/>
    <text x="66" y="75" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">a</text>
    <text x="108" y="76" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">How do Year 7 students come to school?</text>
    ${grid(70, 128, 15, 4, 24, 7, new Set([2, 7, 11, 16, 19, 24, 28, 33, 37, 41, 45, 50, 53, 58]))}
    <text x="440" y="152" font-family="${FONT}" font-size="25" fill="${INK}">Year 7: 120 students</text>
    <text x="440" y="198" font-family="${FONT}" font-size="25" fill="${INK}">Mr Bowen asks 30 of them.</text>
    <rect x="24" y="296" width="792" height="240" rx="16" fill="#f7f9fb" stroke="${RULE}" stroke-width="2"/>
    <circle cx="66" cy="338" r="24" fill="${PURPLE}"/>
    <text x="66" y="347" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">b</text>
    <text x="108" y="348" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">Do the new phones work?</text>
    <rect x="70" y="392" width="34" height="58" rx="6" fill="#3d4652" stroke="${INK}" stroke-width="2"/>
    <rect x="114" y="392" width="34" height="58" rx="6" fill="#3d4652" stroke="${INK}" stroke-width="2"/>
    <rect x="158" y="392" width="34" height="58" rx="6" fill="${KEY}" stroke="${INK}" stroke-width="2"/>
    <rect x="202" y="392" width="34" height="58" rx="6" fill="#3d4652" stroke="${INK}" stroke-width="2"/>
    <rect x="246" y="392" width="34" height="58" rx="6" fill="#3d4652" stroke="${INK}" stroke-width="2"/>
    <rect x="290" y="392" width="34" height="58" rx="6" fill="${KEY}" stroke="${INK}" stroke-width="2"/>
    <rect x="334" y="392" width="34" height="58" rx="6" fill="#3d4652" stroke="${INK}" stroke-width="2"/>
    <text x="440" y="424" font-family="${FONT}" font-size="25" fill="${INK}">A factory makes 5000</text>
    <text x="440" y="458" font-family="${FONT}" font-size="25" fill="${INK}">phones a day. It tests 50.</text>
  </svg>`,

  // ── A fair sample ─────────────────────────────────────────────────────────
  STIR_IT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('st-pho', phoPhoto, 24, 24, 792, 236)}
    <rect x="24" y="284" width="380" height="252" rx="16" fill="#fbe9ec"/>
    <rect x="436" y="284" width="380" height="252" rx="16" fill="${GREEN_T}"/>
    ${pot(104, 380, 200, 'top')}
    ${spoon(252, 384)}
    ${pot(516, 380, 200, 'mixed')}
    ${spoon(626, 400)}
    <text x="214" y="326" font-family="${FONT}" font-size="28" font-weight="bold" fill="${RED}" text-anchor="middle">not stirred</text>
    <text x="626" y="326" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">stirred</text>
    ${cross(360, 320, 0.8)}
    ${tick(772, 320, 0.8)}
  </svg>`,

  ANS_LIST: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand}
    ${nameList(250, 40, 14, 16, 100, false)}
    <text x="560" y="148" font-family="${FONT}" font-size="40" font-weight="bold" fill="${BLUE}" text-anchor="middle">every 10th</text>
    <text x="560" y="196" font-family="${FONT}" font-size="40" font-weight="bold" fill="${BLUE}" text-anchor="middle">name</text>
  </svg>`,

  ANS_GATE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand}
    <rect x="300" y="60" width="16" height="200" fill="#59636e"/>
    <rect x="440" y="60" width="16" height="200" fill="#59636e"/>
    ${seg(316, 100, 440, 100, 5, '#59636e')}${seg(316, 220, 440, 220, 5, '#59636e')}
    ${seg(340, 100, 340, 220, 4, '#59636e')}${seg(364, 100, 364, 220, 4, '#59636e')}${seg(388, 100, 388, 220, 4, '#59636e')}${seg(412, 100, 412, 220, 4, '#59636e')}
    <circle cx="378" cy="40" r="26" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    ${seg(378, 40, 378, 22, 3)}${seg(378, 40, 393, 48, 3)}
    <text x="160" y="148" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">the first 30</text>
    <text x="160" y="196" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">at the gate</text>
  </svg>`,

  RANDOM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="24" y="24" width="380" height="512" rx="16" fill="#f7f9fb"/>
    <rect x="436" y="24" width="380" height="512" rx="16" fill="#f7f9fb"/>
    ${hat(214, 260, 1.6)}
    ${nameList(536, 70, 22, 16, 150)}
    <text x="214" y="484" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">names from a hat</text>
    <text x="626" y="484" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">every 10th name</text>
  </svg>`,

  // ── How many? ─────────────────────────────────────────────────────────────
  ENOUGH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="24" y="24" width="252" height="512" rx="16" fill="#fbe9ec"/>
    <rect x="294" y="24" width="252" height="512" rx="16" fill="${GREEN_T}"/>
    <rect x="564" y="24" width="252" height="512" rx="16" fill="${BLUE_T}"/>
    <text x="150" y="86" font-family="${FONT}" font-size="48" font-weight="bold" fill="${RED}" text-anchor="middle">5</text>
    <text x="420" y="86" font-family="${FONT}" font-size="48" font-weight="bold" fill="${GREEN}" text-anchor="middle">50</text>
    <text x="690" y="86" font-family="${FONT}" font-size="48" font-weight="bold" fill="${BLUE}" text-anchor="middle">all 200</text>
    ${grid(62, 150, 5, 1, 44, 12, new Set([0, 1, 2, 3, 4]), RED)}
    ${grid(332, 140, 10, 5, 19.5, 7, new Set(Array.from({ length: 50 }, (_, i) => i)), GREEN)}
    ${grid(609, 128, 10, 20, 18, 5, new Set(Array.from({ length: 200 }, (_, i) => i)), BLUE, 12.5)}
    <text x="150" y="420" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">too small:</text>
    <text x="150" y="456" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">the answer</text>
    <text x="150" y="490" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">jumps about</text>
    <text x="420" y="420" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">big enough</text>
    <text x="690" y="420" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">too slow:</text>
    <text x="690" y="456" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">every class,</text>
    <text x="690" y="490" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">every day</text>
    ${cross(150, 262, 1.2)}
    ${tick(420, 262, 1.2)}
  </svg>`,

  CLASS_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="420" y="58" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Do you have a pet?</text>
    <rect x="40" y="90" width="760" height="64" fill="${GREEN}"/>
    <text x="160" y="132" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">Sample</text>
    <text x="400" y="132" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">Sample size</text>
    <text x="650" y="132" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">Yes</text>
    <rect x="40" y="154" width="760" height="360" fill="#ffffff" stroke="${GREEN}" stroke-width="2"/>
    ${seg(40, 244, 800, 244, 1.5, RULE)}${seg(40, 334, 800, 334, 1.5, RULE)}${seg(40, 424, 800, 424, 1.5, RULE)}
    ${seg(280, 90, 280, 514, 2, GREEN)}${seg(520, 90, 520, 514, 2, GREEN)}
    <text x="160" y="210" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">A</text>
    <text x="160" y="300" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>
    <text x="160" y="390" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="160" y="480" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">everyone</text>
    <text x="400" y="210" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">4</text>
    <text x="400" y="300" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">4</text>
    <text x="400" y="390" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">12</text>
    <text x="650" y="210" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">__ out of 4</text>
    <text x="650" y="300" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">__ out of 4</text>
    <text x="650" y="390" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">__ out of 12</text>
    <text x="650" y="480" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">__ out of __</text>
  </svg>`,

  // ── The Workbook ──────────────────────────────────────────────────────────
  PHRASES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <text x="40" y="52" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">The question says…</text>
    <text x="620" y="52" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">It means…</text>
    <line x1="30" y1="72" x2="1090" y2="72" stroke="${RULE}" stroke-width="2"/>
    <text x="40" y="118" font-family="${FONT}" font-size="25" fill="${INK}">What is the sample size?</text>
    <text x="620" y="118" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">How many were asked?</text>
    <text x="40" y="186" font-family="${FONT}" font-size="25" fill="${INK}">Is this a good way to choose a sample?</text>
    <text x="620" y="186" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Is it fair? Is it big enough?</text>
    <text x="40" y="254" font-family="${FONT}" font-size="25" fill="${INK}">Explain why 20 is not large enough.</text>
    <text x="620" y="254" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Too few: the answer jumps about.</text>
    <text x="40" y="322" font-family="${FONT}" font-size="25" fill="${INK}">Make your sample representative.</text>
    <text x="620" y="322" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Make it fair: like the population.</text>
    <text x="40" y="390" font-family="${FONT}" font-size="25" fill="${INK}">Would 1000 be a good sample size?</text>
    <text x="620" y="390" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Big enough? Too slow?</text>
  </svg>`,

  ZOO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="40" y="30" width="760" height="140" rx="16" fill="${GREEN}"/>
    <text x="420" y="92" font-family="${FONT}" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle">CITY ZOO</text>
    <text x="420" y="140" font-family="${FONT}" font-size="28" fill="#ffffff" text-anchor="middle">Sunday: 3000 visitors</text>
    <rect x="40" y="200" width="760" height="320" rx="16" fill="#f7f9fb" stroke="${RULE}" stroke-width="2"/>
    <text x="70" y="252" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">At 10:00, the zoo asks the first 15 visitors:</text>
    <text x="70" y="314" font-family="${FONT}" font-size="28" fill="${INK}">“Was your ticket good value?</text>
    <text x="70" y="356" font-family="${FONT}" font-size="28" fill="${INK}">Choose one number.”</text>
    <text x="70" y="438" font-family="${FONT}" font-size="24" fill="${MUTED}">Bad value</text>
    <text x="250" y="440" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="330" y="440" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="410" y="440" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="490" y="440" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="570" y="440" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="620" y="438" font-family="${FONT}" font-size="24" fill="${MUTED}">Great value</text>
  </svg>`,

  DICE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="420" y="54" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Mr Bowen rolls a dice. Three samples:</text>
    <rect x="30" y="86" width="780" height="120" rx="14" fill="#f7f9fb" stroke="${RULE}" stroke-width="2"/>
    <text x="56" y="140" font-family="${FONT}" font-size="30" font-weight="bold" fill="${PURPLE}">A</text>
    <text x="56" y="180" font-family="${FONT}" font-size="22" fill="${MUTED}">4 rolls</text>
    <text x="200" y="164" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">6</text>
    <text x="270" y="164" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">1</text>
    <text x="340" y="164" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">6</text>
    <text x="410" y="164" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">5</text>
    <rect x="30" y="226" width="780" height="120" rx="14" fill="#f7f9fb" stroke="${RULE}" stroke-width="2"/>
    <text x="56" y="280" font-family="${FONT}" font-size="30" font-weight="bold" fill="${PURPLE}">B</text>
    <text x="56" y="320" font-family="${FONT}" font-size="22" fill="${MUTED}">4 rolls</text>
    <text x="200" y="304" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">2</text>
    <text x="270" y="304" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">1</text>
    <text x="340" y="304" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">3</text>
    <text x="410" y="304" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">2</text>
    <rect x="30" y="366" width="780" height="166" rx="14" fill="#f7f9fb" stroke="${RULE}" stroke-width="2"/>
    <text x="56" y="420" font-family="${FONT}" font-size="30" font-weight="bold" fill="${PURPLE}">C</text>
    <text x="56" y="460" font-family="${FONT}" font-size="22" fill="${MUTED}">12 rolls</text>
    <text x="200" y="440" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">4</text>
    <text x="270" y="440" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">2</text>
    <text x="340" y="440" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">6</text>
    <text x="410" y="440" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">3</text>
    <text x="480" y="440" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">1</text>
    <text x="550" y="440" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">5</text>
    <text x="200" y="500" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">3</text>
    <text x="270" y="500" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">4</text>
    <text x="340" y="500" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">6</text>
    <text x="410" y="500" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">2</text>
    <text x="480" y="500" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">3</text>
    <text x="550" y="500" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">5</text>
  </svg>`,

  POP_SAMPLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="30" y="90" width="400" height="330" rx="40" fill="#f7f9fb" stroke="${INK}" stroke-width="4"/>
    ${grid(80, 140, 10, 7, 34, 8, new Set([3, 12, 25, 31, 46, 52, 67]))}
    <text x="230" y="64" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">Population</text>
    <text x="230" y="466" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">everyone</text>
    <rect x="590" y="190" width="200" height="140" rx="30" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="4"/>
    ${grid(628, 226, 4, 2, 42, 11, new Set([0, 1, 2, 3, 4, 5, 6, 7]))}
    <text x="690" y="164" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">Sample</text>
    <text x="690" y="370" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">the ones we ask</text>
    ${arrow(440, 190, 576, 230, GREEN, 5, 20)}
    <text x="508" y="168" font-family="${FONT}" font-size="24" font-weight="bold" fill="${GREEN}" text-anchor="middle">at random</text>
    ${arrow(576, 304, 440, 344, BLUE, 5, 20)}
    <text x="510" y="388" font-family="${FONT}" font-size="22" font-weight="bold" fill="${BLUE}" text-anchor="middle">tells us about</text>
    <text x="420" y="530" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">Big enough? Fair? Then ask.</text>
  </svg>`,
}

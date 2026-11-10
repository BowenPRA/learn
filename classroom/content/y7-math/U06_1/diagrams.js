// content/y7-math/U06_1/diagrams.js
// Teaching diagrams for 6.1 Conducting an investigation, drawn to match 5.2
// and 5.3.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes only, because
//    `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · `split` diagrams are 840×560, `showcase` ones 1120×440, vote cards 720×320.
//
// The three kinds of data keep one colour each, here and in the widgets:
// categorical purple, discrete blue, continuous green.
//
//   The goals    PIC_KINDS · PIC_FORM · PIC_CHART — one picture each, no words
//   Data         KINDS        Mr Bowen's bag, sorted into the three kinds
//                ANS_DISCRETE / ANS_CONTINUOUS   vote: a shoe size
//                STAIRS_RAMP  the photo, then shoe sizes on stairs and a foot on a ramp
//   Questions    GIVE_CHOICES the canteen question with boxes, and its 30 answers
//                ANS_GOOD / ANS_BAD   vote: 0–2, 2–4, 4–6
//                WHAT_WRONG   the boxes on a number line: 2 and 4 twice, 7 and 8 never
//                PHRASES      the Workbook's question words
//                CRITIQUE_Q   two questions to critique
//   Our data     HAND_SPAN    thumb to little finger, on a ruler
//                SCHOOL_RUN   Hanoi motorbikes and a bus (photo)
//                GROUP_IT     12 hand spans: one bar each, or a grouped table
//                LIBRARY      a 1–5 question and its frequency table
//                INVESTIGATE  the five steps (Draw This)
//                JOKES        Mr Bowen's joke survey
//
// Like the book's, the diagrams stay in English.

import { mrBowenSvg } from '../../../src/lib/mrBowen.js'
import rampPhoto from './images/ramp.jpg'
import hanoiPhoto from './images/hanoi.jpg'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const PURPLE = '#5c2483'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'
const RED = '#c8102e'
const PURPLE_T = '#f2ecf7'
const BLUE_T = '#e3eef9'
const GREEN_T = '#eef6e6'
const ORANGE_T = '#fdf1e3'
const RULE = '#cfd8dc'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const f = (n) => n.toFixed(1)
const seg = (x1, y1, x2, y2, w = 5, color = INK) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`
const leader = (x1, y1, x2, y2, color = KEY) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${color}" stroke-width="2.5"/><circle cx="${f(x2)}" cy="${f(y2)}" r="5" fill="${color}"/>`
const photo = (id, href, x, y, w, h, fit = 'slice') => `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid ${fit}" clip-path="url(#${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="#cbd5e1" stroke-width="2"/>`
// A tick box on a form, its top-left corner at (x, y); `on` ticks it.
const tickBox = (x, y, s = 28, on = false) => `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="4" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>${
  on ? `<path d="M ${x + s * 0.2} ${y + s * 0.52} L ${x + s * 0.42} ${y + s * 0.76} L ${x + s * 0.84} ${y + s * 0.22}" fill="none" stroke="${KEY}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` : ''}`
// Tally marks: four strokes and a gate, at (x, y), h tall.
const tally5 = (x, y, h, color = INK, w = 5) => {
  let s = ''
  for (let i = 0; i < 4; i++) s += seg(x + i * h * 0.28, y, x + i * h * 0.28, y + h, w, color)
  return s + seg(x - h * 0.14, y + h * 0.8, x + h * 0.98, y + h * 0.2, w, color)
}
// A ruler: a strip with centimetre ticks every `cm` px from x0.
const ruler = (x, y, w, h, x0, cm) => {
  let t = ''
  for (let i = 0; x0 + i * cm <= x + w - 6; i++) {
    const tx = x0 + i * cm
    t += `<line x1="${f(tx)}" y1="${y}" x2="${f(tx)}" y2="${y + (i % 5 === 0 ? 20 : 11)}" stroke="#8a6d12" stroke-width="${i % 5 === 0 ? 2.2 : 1.3}"/>`
  }
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#fbe7a1" stroke="#c9a227" stroke-width="2"/>${t}`
}
// An arrow from a to b, its head drawn as a path (no markers: they scale).
const arrow = (x1, y1, x2, y2, color = INK, w = 4, head = 16) => {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const p = (d, r) => [x2 - r * Math.cos(a + d), y2 - r * Math.sin(a + d)]
  const [lx, ly] = p(0.45, head)
  const [rx, ry] = p(-0.45, head)
  const [bx, by] = p(0, head * 0.7)
  return `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(bx)}" y2="${f(by)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M ${f(x2)} ${f(y2)} L ${f(lx)} ${f(ly)} L ${f(rx)} ${f(ry)} Z" fill="${color}"/>`
}
// A finger (or thumb): a capsule, drawn twice — the outline pass, then the skin.
const SKIN = '#f2c9a5'
const finger = (a, b, pass) => pass === 0
  ? `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${INK}" stroke-width="51" stroke-linecap="round"/>`
  : `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${SKIN}" stroke-width="45" stroke-linecap="round"/>`

// The voting hands from 2.3 and Unit 5.
const HAND_PATHS = `<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>`
const leftHand = `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${BLUE}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = `<g transform="translate(528 76) scale(7)" fill="none" stroke="${KEY}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`

// The five steps of an investigation, round a circle (INVESTIGATE).
const STEP = [[420, 105], [605.5, 239.7], [534.6, 457.8], [305.4, 457.8], [234.5, 239.7]]
const stepArrows = () => STEP.map((p, i) => {
  const q = STEP[(i + 1) % 5]
  const d = Math.hypot(q[0] - p[0], q[1] - p[1])
  const ux = (q[0] - p[0]) / d, uy = (q[1] - p[1]) / d
  return arrow(p[0] + ux * 58, p[1] + uy * 58, q[0] - ux * 58, q[1] - uy * 58, MUTED, 4, 18)
}).join('')
const stepRing = (i, color) => `<circle cx="${STEP[i][0]}" cy="${STEP[i][1]}" r="46" fill="#ffffff" stroke="${color}" stroke-width="4"/>`

export const DIAGRAMS = {
  // ── The goals ─────────────────────────────────────────────────────────────
  PIC_KINDS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    <circle cx="86" cy="96" r="30" fill="#7fb2e5" stroke="${INK}" stroke-width="3"/>
    <circle cx="146" cy="96" r="30" fill="#f2a65a" stroke="${INK}" stroke-width="3"/>
    <circle cx="116" cy="148" r="30" fill="#9ccc65" stroke="${INK}" stroke-width="3"/>
    ${tally5(296, 66, 110, BLUE, 7)}
    ${ruler(50, 214, 380, 52, 66, 25)}
  </svg>`,

  PIC_FORM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    <rect x="140" y="30" width="200" height="252" rx="14" fill="#c8955c" stroke="#8a5d2e" stroke-width="3"/>
    <rect x="158" y="56" width="164" height="210" rx="4" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="198" y="20" width="84" height="26" rx="6" fill="#9aa5b1" stroke="${INK}" stroke-width="2.5"/>
    <rect x="174" y="76" width="132" height="12" rx="6" fill="#b0bec5"/>
    ${tickBox(176, 110, 26, true)}
    <rect x="214" y="117" width="84" height="11" rx="5" fill="#d5dbe1"/>
    ${tickBox(176, 158, 26)}
    <rect x="214" y="165" width="70" height="11" rx="5" fill="#d5dbe1"/>
    ${tickBox(176, 206, 26)}
    <rect x="214" y="213" width="90" height="11" rx="5" fill="#d5dbe1"/>
  </svg>`,

  PIC_CHART: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${seg(70, 260, 410, 260, 4)}
    ${seg(70, 260, 70, 40, 4)}
    <rect x="95" y="190" width="54" height="70" fill="#9fc3e8" stroke="${INK}" stroke-width="2.5"/>
    <rect x="170" y="90" width="54" height="170" fill="${KEY}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="245" y="150" width="54" height="110" fill="#9fc3e8" stroke="${INK}" stroke-width="2.5"/>
    <rect x="320" y="215" width="54" height="45" fill="#9fc3e8" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="380" cy="80" r="38" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="4"/>
    <path d="M 362 80 L 375 94 L 400 64" fill="none" stroke="${GREEN}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // ── Three kinds of data ───────────────────────────────────────────────────
  KINDS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="420" y="38" font-family="${FONT}" font-size="28" font-weight="bold" fill="${MUTED}" text-anchor="middle">Mr Bowen’s bag, sorted</text>
    <rect x="24" y="72" width="252" height="464" rx="16" fill="${PURPLE_T}" stroke="${PURPLE}" stroke-width="3"/>
    <rect x="294" y="72" width="252" height="464" rx="16" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="3"/>
    <rect x="564" y="72" width="252" height="464" rx="16" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="150" y="116" font-family="${FONT}" font-size="30" font-weight="bold" fill="${PURPLE}" text-anchor="middle">Categorical</text>
    <text x="420" y="116" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">Discrete</text>
    <text x="690" y="116" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="middle">Continuous</text>
    <circle cx="126" cy="178" r="24" fill="#7fb2e5" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="174" cy="178" r="24" fill="#f2a65a" stroke="${INK}" stroke-width="2.5"/>
    ${tally5(386, 152, 54, BLUE, 5)}
    ${ruler(600, 160, 180, 40, 612, 15)}
    <rect x="48" y="236" width="204" height="110" rx="12" fill="#ffffff" stroke="${PURPLE}" stroke-width="2"/>
    <text x="150" y="272" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">colour?</text>
    <text x="150" y="320" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">blue</text>
    <rect x="48" y="370" width="204" height="110" rx="12" fill="#ffffff" stroke="${PURPLE}" stroke-width="2"/>
    <text x="150" y="406" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">fruit?</text>
    <text x="150" y="454" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">a banana</text>
    <rect x="318" y="236" width="204" height="110" rx="12" fill="#ffffff" stroke="${BLUE}" stroke-width="2"/>
    <text x="420" y="272" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">pens?</text>
    <text x="420" y="320" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">7</text>
    <rect x="318" y="370" width="204" height="110" rx="12" fill="#ffffff" stroke="${BLUE}" stroke-width="2"/>
    <text x="420" y="406" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">books?</text>
    <text x="420" y="454" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <rect x="588" y="236" width="204" height="110" rx="12" fill="#ffffff" stroke="${GREEN}" stroke-width="2"/>
    <text x="690" y="272" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">mass?</text>
    <text x="690" y="320" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">2.35 kg</text>
    <rect x="588" y="370" width="204" height="110" rx="12" fill="#ffffff" stroke="${GREEN}" stroke-width="2"/>
    <text x="690" y="406" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">banana length?</text>
    <text x="690" y="454" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">18.6 cm</text>
  </svg>`,

  ANS_DISCRETE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand}
    <text x="460" y="186" font-family="${FONT}" font-size="76" font-weight="bold" fill="${BLUE}" text-anchor="middle">discrete</text>
  </svg>`,

  ANS_CONTINUOUS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand}
    <text x="256" y="186" font-family="${FONT}" font-size="70" font-weight="bold" fill="${KEY}" text-anchor="middle">continuous</text>
  </svg>`,

  STAIRS_RAMP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${photo('sr-ramp', rampPhoto, 20, 20, 500, 400)}
    ${leader(110, 338, 182, 252, '#ffffff')}
    ${leader(450, 338, 440, 252, '#ffffff')}
    <rect x="44" y="336" width="132" height="50" rx="12" fill="${GREEN}"/>
    <text x="110" y="370" font-family="${FONT}" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">ramp</text>
    <rect x="378" y="336" width="132" height="50" rx="12" fill="${BLUE}"/>
    <text x="444" y="370" font-family="${FONT}" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">stairs</text>
    <rect x="540" y="20" width="560" height="192" rx="14" fill="${BLUE_T}"/>
    <path d="M 570 190 L 570 160 L 640 160 L 640 130 L 710 130 L 710 100 L 780 100 L 780 70 L 850 70 L 850 190 Z" fill="#ffffff" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="675" cy="116" r="8" fill="${BLUE}"/>
    <text x="605" y="185" font-family="${FONT}" font-size="22" font-weight="bold" fill="${BLUE}" text-anchor="middle">36</text>
    <text x="675" y="155" font-family="${FONT}" font-size="22" font-weight="bold" fill="${BLUE}" text-anchor="middle">37</text>
    <text x="745" y="125" font-family="${FONT}" font-size="22" font-weight="bold" fill="${BLUE}" text-anchor="middle">38</text>
    <text x="815" y="95" font-family="${FONT}" font-size="22" font-weight="bold" fill="${BLUE}" text-anchor="middle">39</text>
    <text x="874" y="78" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}">Discrete</text>
    <text x="874" y="118" font-family="${FONT}" font-size="24" fill="${INK}">shoe size</text>
    <text x="874" y="156" font-family="${FONT}" font-size="22" fill="${MUTED}">nothing between</text>
    <rect x="540" y="228" width="560" height="192" rx="14" fill="${GREEN_T}"/>
    <path d="M 570 398 L 850 278 L 850 398 Z" fill="#ffffff" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="738.5" cy="325.8" r="8" fill="${GREEN}"/>
    ${leader(705, 380, 736, 334, GREEN)}
    <text x="660" y="390" font-family="${FONT}" font-size="22" font-weight="bold" fill="${GREEN}" text-anchor="middle">23.7 cm</text>
    <text x="874" y="286" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}">Continuous</text>
    <text x="874" y="326" font-family="${FONT}" font-size="24" fill="${INK}">foot length</text>
    <text x="874" y="364" font-family="${FONT}" font-size="22" fill="${MUTED}">any value</text>
  </svg>`,

  // ── A good question ───────────────────────────────────────────────────────
  GIVE_CHOICES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="40" y="60" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">The canteen food is:</text>
    <text x="800" y="60" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="end">30 students</text>
    ${tickBox(40, 98)}
    <text x="84" y="122" font-family="${FONT}" font-size="26" fill="${INK}">very good</text>
    ${tickBox(40, 172)}
    <text x="84" y="196" font-family="${FONT}" font-size="26" fill="${INK}">good</text>
    ${tickBox(40, 246)}
    <text x="84" y="270" font-family="${FONT}" font-size="26" fill="${INK}">OK</text>
    ${tickBox(40, 320)}
    <text x="84" y="344" font-family="${FONT}" font-size="26" fill="${INK}">bad</text>
    ${tickBox(40, 394)}
    <text x="84" y="418" font-family="${FONT}" font-size="26" fill="${INK}">very bad</text>
    ${seg(262, 90, 262, 440, 3)}
    <rect x="262" y="96" width="238" height="32" fill="${PURPLE}" opacity="0.85"/>
    <rect x="262" y="170" width="374" height="32" fill="${PURPLE}" opacity="0.85"/>
    <rect x="262" y="244" width="272" height="32" fill="${PURPLE}" opacity="0.85"/>
    <rect x="262" y="318" width="102" height="32" fill="${PURPLE}" opacity="0.85"/>
    <rect x="262" y="392" width="34" height="32" fill="${PURPLE}" opacity="0.85"/>
    <text x="514" y="122" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PURPLE}">7</text>
    <text x="650" y="196" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PURPLE}">11</text>
    <text x="548" y="270" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PURPLE}">8</text>
    <text x="378" y="344" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PURPLE}">3</text>
    <text x="310" y="418" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PURPLE}">1</text>
    <rect x="40" y="466" width="760" height="64" rx="12" fill="${ORANGE_T}"/>
    <text x="420" y="508" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">Or: “Score it from 1 (very bad) to 5 (very good).”</text>
  </svg>`,

  ANS_GOOD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand}
    <text x="430" y="196" font-family="${FONT}" font-size="96" font-weight="bold" fill="${BLUE}" text-anchor="middle">Good</text>
    <path d="M 572 150 L 600 180 L 652 116" fill="none" stroke="${BLUE}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  ANS_BAD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand}
    <text x="232" y="196" font-family="${FONT}" font-size="96" font-weight="bold" fill="${KEY}" text-anchor="middle">Bad</text>
    <path d="M 368 120 L 424 176 M 424 120 L 368 176" fill="none" stroke="${KEY}" stroke-width="12" stroke-linecap="round"/>
  </svg>`,

  WHAT_WRONG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="30" y="24" width="780" height="176" rx="14" fill="#f7f9fb" stroke="${RULE}" stroke-width="2"/>
    <text x="56" y="70" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}">How many times a week do you play sport?</text>
    ${tickBox(56, 122, 32)}
    <text x="100" y="148" font-family="${FONT}" font-size="30" fill="${INK}">0–2</text>
    ${tickBox(256, 122, 32)}
    <text x="300" y="148" font-family="${FONT}" font-size="30" fill="${INK}">2–4</text>
    ${tickBox(456, 122, 32)}
    <text x="500" y="148" font-family="${FONT}" font-size="30" fill="${INK}">4–6</text>
    <path d="M 80 330 L 80 318 L 250 318 L 250 330" fill="none" stroke="${BLUE}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M 250 300 L 250 286 L 420 286 L 420 300" fill="none" stroke="${PURPLE}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M 420 330 L 420 318 L 590 318 L 590 330" fill="none" stroke="${GREEN}" stroke-width="5" stroke-linejoin="round"/>
    <text x="165" y="306" font-family="${FONT}" font-size="28" font-weight="bold" fill="${BLUE}" text-anchor="middle">0–2</text>
    <text x="335" y="274" font-family="${FONT}" font-size="28" font-weight="bold" fill="${PURPLE}" text-anchor="middle">2–4</text>
    <text x="505" y="306" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">4–6</text>
    ${seg(60, 380, 790, 380, 4)}
    ${seg(80, 370, 80, 390, 3)}${seg(165, 370, 165, 390, 3)}${seg(250, 370, 250, 390, 3)}${seg(335, 370, 335, 390, 3)}${seg(420, 370, 420, 390, 3)}
    ${seg(505, 370, 505, 390, 3)}${seg(590, 370, 590, 390, 3)}${seg(675, 370, 675, 390, 3)}${seg(760, 370, 760, 390, 3)}
    <text x="80" y="428" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">0</text>
    <text x="165" y="428" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="250" y="428" font-family="${FONT}" font-size="32" font-weight="bold" fill="${RED}" text-anchor="middle">2</text>
    <text x="335" y="428" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="420" y="428" font-family="${FONT}" font-size="32" font-weight="bold" fill="${RED}" text-anchor="middle">4</text>
    <text x="505" y="428" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="590" y="428" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
    <text x="675" y="428" font-family="${FONT}" font-size="32" font-weight="bold" fill="${RED}" text-anchor="middle">7</text>
    <text x="760" y="428" font-family="${FONT}" font-size="32" font-weight="bold" fill="${RED}" text-anchor="middle">8</text>
    <circle cx="250" cy="380" r="15" fill="none" stroke="${RED}" stroke-width="4"/>
    <circle cx="420" cy="380" r="15" fill="none" stroke="${RED}" stroke-width="4"/>
    <circle cx="675" cy="380" r="15" fill="none" stroke="${RED}" stroke-width="4" stroke-dasharray="6 5"/>
    <circle cx="760" cy="380" r="15" fill="none" stroke="${RED}" stroke-width="4" stroke-dasharray="6 5"/>
    <text x="335" y="482" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}" text-anchor="middle">2 and 4: two boxes</text>
    <text x="712" y="482" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}" text-anchor="middle">7, 8: no box</text>
    <text x="420" y="530" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">times a week</text>
  </svg>`,

  // ── The Workbook ──────────────────────────────────────────────────────────
  PHRASES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <text x="40" y="52" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">The question says…</text>
    <text x="560" y="52" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">It means…</text>
    <line x1="30" y1="72" x2="1090" y2="72" stroke="${RULE}" stroke-width="2"/>
    <text x="40" y="118" font-family="${FONT}" font-size="25" fill="${INK}">Write down the type of data.</text>
    <text x="560" y="118" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Categorical, discrete or continuous?</text>
    <text x="40" y="186" font-family="${FONT}" font-size="25" fill="${INK}">Critique the question.</text>
    <text x="560" y="186" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Say what is wrong, and why.</text>
    <text x="40" y="254" font-family="${FONT}" font-size="25" fill="${INK}">Suggest a way to improve it.</text>
    <text x="560" y="254" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Write a better question.</text>
    <text x="40" y="322" font-family="${FONT}" font-size="25" fill="${INK}">Is there evidence that…?</text>
    <text x="560" y="322" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Do the numbers show it?</text>
    <text x="40" y="390" font-family="${FONT}" font-size="25" fill="${INK}">Give a reason for your answer.</text>
    <text x="560" y="390" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Say why. Use the numbers.</text>
  </svg>`,

  CRITIQUE_Q: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="30" y="28" width="780" height="220" rx="14" fill="#f7f9fb" stroke="${RULE}" stroke-width="2"/>
    <circle cx="74" cy="72" r="24" fill="${PURPLE}"/>
    <text x="74" y="81" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">a</text>
    <text x="116" y="82" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">How often do you eat phở?</text>
    <line x1="116" y1="186" x2="560" y2="186" stroke="${MUTED}" stroke-width="3" stroke-dasharray="4 8"/>
    <rect x="30" y="284" width="780" height="248" rx="14" fill="#f7f9fb" stroke="${RULE}" stroke-width="2"/>
    <circle cx="74" cy="328" r="24" fill="${PURPLE}"/>
    <text x="74" y="337" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">b</text>
    <text x="116" y="338" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">Do you agree that maths</text>
    <text x="116" y="380" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">is the best subject?</text>
    ${tickBox(116, 438, 34)}
    <text x="164" y="466" font-family="${FONT}" font-size="30" fill="${INK}">Yes</text>
    ${tickBox(296, 438, 34)}
    <text x="344" y="466" font-family="${FONT}" font-size="30" fill="${INK}">No</text>
  </svg>`,

  // ── Our data ──────────────────────────────────────────────────────────────
  HAND_SPAN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${ruler(130, 300, 600, 64, 175, 25)}
    <ellipse cx="400" cy="440" rx="120" ry="92" fill="${INK}"/>
    <path d="M 318 490 L 312 560 L 492 560 L 486 490 Z" fill="${INK}"/>
    ${finger([300, 410], [195, 345], 0)}${finger([338, 380], [300, 160], 0)}${finger([400, 372], [405, 130], 0)}
    ${finger([458, 380], [505, 165], 0)}${finger([500, 400], [600, 345], 0)}
    <ellipse cx="400" cy="440" rx="117" ry="89" fill="${SKIN}"/>
    <path d="M 321 492 L 315 560 L 489 560 L 483 492 Z" fill="${SKIN}"/>
    ${finger([300, 410], [195, 345], 1)}${finger([338, 380], [300, 160], 1)}${finger([400, 372], [405, 130], 1)}
    ${finger([458, 380], [505, 165], 1)}${finger([500, 400], [600, 345], 1)}
    <line x1="175" y1="76" x2="175" y2="324" stroke="${KEY}" stroke-width="3" stroke-dasharray="9 7"/>
    <line x1="621" y1="76" x2="621" y2="326" stroke="${KEY}" stroke-width="3" stroke-dasharray="9 7"/>
    ${arrow(398, 76, 179, 76, KEY, 4, 18)}
    ${arrow(398, 76, 617, 76, KEY, 4, 18)}
    <text x="398" y="56" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">hand span</text>
    ${leader(110, 238, 176, 330)}
    <text x="40" y="226" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">thumb</text>
    ${leader(714, 238, 620, 331)}
    <text x="800" y="226" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="end">little finger</text>
    ${leader(756, 420, 712, 350)}
    <text x="800" y="452" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="end">ruler</text>
  </svg>`,

  SCHOOL_RUN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('sr-hanoi', hanoiPhoto, 20, 20, 800, 520)}
  </svg>`,

  GROUP_IT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="30" y="58" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">12 hand</text>
    <text x="30" y="92" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">spans (cm)</text>
    <text x="250" y="58" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">17.4</text>
    <text x="354" y="58" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">16.8</text>
    <text x="458" y="58" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">18.1</text>
    <text x="562" y="58" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">16.9</text>
    <text x="666" y="58" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">17.0</text>
    <text x="770" y="58" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">19.2</text>
    <text x="250" y="102" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">15.6</text>
    <text x="354" y="102" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">17.7</text>
    <text x="458" y="102" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">18.4</text>
    <text x="562" y="102" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">16.2</text>
    <text x="666" y="102" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">17.3</text>
    <text x="770" y="102" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">18.9</text>
    <rect x="24" y="136" width="370" height="400" rx="14" fill="#fbe9ec"/>
    <text x="209" y="178" font-family="${FONT}" font-size="28" font-weight="bold" fill="${RED}" text-anchor="middle">One bar for each</text>
    <path d="M 176 236 L 242 302 M 242 236 L 176 302" fill="none" stroke="${RED}" stroke-width="10" stroke-linecap="round"/>
    ${seg(40, 446, 370, 446, 3)}
    <rect x="50" y="400" width="18" height="46" fill="${GREEN}"/><rect x="76" y="400" width="18" height="46" fill="${GREEN}"/><rect x="102" y="400" width="18" height="46" fill="${GREEN}"/><rect x="128" y="400" width="18" height="46" fill="${GREEN}"/><rect x="154" y="400" width="18" height="46" fill="${GREEN}"/><rect x="180" y="400" width="18" height="46" fill="${GREEN}"/><rect x="206" y="400" width="18" height="46" fill="${GREEN}"/><rect x="232" y="400" width="18" height="46" fill="${GREEN}"/><rect x="258" y="400" width="18" height="46" fill="${GREEN}"/><rect x="284" y="400" width="18" height="46" fill="${GREEN}"/><rect x="310" y="400" width="18" height="46" fill="${GREEN}"/><rect x="336" y="400" width="18" height="46" fill="${GREEN}"/>
    <text x="209" y="494" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">every bar is 1</text>
    <rect x="414" y="136" width="402" height="400" rx="14" fill="${GREEN_T}"/>
    <text x="615" y="178" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">In equal groups</text>
    <rect x="432" y="200" width="366" height="56" fill="${GREEN}"/>
    <text x="533" y="237" font-family="${FONT}" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">Hand span (cm)</text>
    <text x="715" y="237" font-family="${FONT}" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">Frequency</text>
    <rect x="432" y="256" width="366" height="250" fill="#ffffff" stroke="${GREEN}" stroke-width="2"/>
    ${seg(634, 200, 634, 506, 2, GREEN)}
    ${seg(432, 306, 798, 306, 1.5, RULE)}${seg(432, 356, 798, 356, 1.5, RULE)}${seg(432, 406, 798, 406, 1.5, RULE)}${seg(432, 456, 798, 456, 1.5, RULE)}
    <text x="537" y="291" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="middle">15.0–15.9</text>
    <text x="537" y="341" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="middle">16.0–16.9</text>
    <text x="537" y="391" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="middle">17.0–17.9</text>
    <text x="537" y="441" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="middle">18.0–18.9</text>
    <text x="537" y="491" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="middle">19.0–19.9</text>
    <text x="712" y="291" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="712" y="341" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="712" y="391" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="712" y="441" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="712" y="491" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
  </svg>`,

  LIBRARY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="30" y="24" width="780" height="226" rx="14" fill="#f7f9fb" stroke="${RULE}" stroke-width="2"/>
    <text x="56" y="72" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">How much do you like the new library?</text>
    <text x="56" y="116" font-family="${FONT}" font-size="24" fill="${INK}">Choose one number.</text>
    <text x="56" y="200" font-family="${FONT}" font-size="26" fill="${MUTED}">Not at all</text>
    <text x="230" y="202" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="320" y="202" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="410" y="202" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="500" y="202" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="590" y="202" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="650" y="200" font-family="${FONT}" font-size="26" fill="${MUTED}">Very much</text>
    <rect x="50" y="300" width="740" height="180" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <rect x="50" y="300" width="220" height="180" fill="#e9edf1" stroke="${INK}" stroke-width="2.5"/>
    ${seg(50, 390, 790, 390, 2.5)}
    ${seg(374, 300, 374, 480, 2)}${seg(478, 300, 478, 480, 2)}${seg(582, 300, 582, 480, 2)}${seg(686, 300, 686, 480, 2)}
    <text x="70" y="357" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">Score</text>
    <text x="70" y="447" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">Frequency</text>
    <text x="322" y="358" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">1</text>
    <text x="426" y="358" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">2</text>
    <text x="530" y="358" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">3</text>
    <text x="634" y="358" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">4</text>
    <text x="738" y="358" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">5</text>
    <text x="322" y="448" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="426" y="448" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="530" y="448" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
    <text x="634" y="448" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">14</text>
    <text x="738" y="448" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">10</text>
  </svg>`,

  INVESTIGATE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${stepArrows()}
    ${stepRing(0, PURPLE)}${stepRing(1, BLUE)}${stepRing(2, GREEN)}${stepRing(3, KEY)}${stepRing(4, PURPLE)}
    <text x="420" y="124" font-family="${FONT}" font-size="54" font-weight="bold" fill="${PURPLE}" text-anchor="middle">?</text>
    <circle cx="594" cy="236" r="16" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="3"/>
    <circle cx="617" cy="230" r="13" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="3"/>
    <circle cx="608" cy="252" r="12" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="3"/>
    <circle cx="582" cy="262" r="5" fill="${BLUE}"/>
    <circle cx="573" cy="273" r="3.5" fill="${BLUE}"/>
    <rect x="514" y="430" width="42" height="54" rx="5" fill="#ffffff" stroke="${GREEN}" stroke-width="3"/>
    ${tickBox(521, 440, 12, true)}
    ${tickBox(521, 462, 12)}
    <rect x="537" y="444" width="13" height="4" fill="${GREEN}"/>
    <rect x="537" y="466" width="13" height="4" fill="${GREEN}"/>
    ${seg(282, 482, 330, 482, 3)}
    <rect x="287" y="458" width="10" height="24" fill="${KEY}"/>
    <rect x="301" y="440" width="10" height="42" fill="${KEY}"/>
    <rect x="315" y="450" width="10" height="32" fill="${KEY}"/>
    <path d="M 210 240 L 224 256 L 248 226" fill="none" stroke="${GREEN}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 238 246 L 258 266 M 258 246 L 238 266" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" transform="translate(4 -2)"/>
    <text x="420" y="40" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">1 Ask a question</text>
    <text x="664" y="248" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}">2 Predict</text>
    <text x="560" y="536" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">3 Collect data</text>
    <text x="280" y="536" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">4 Table or chart</text>
    <text x="176" y="232" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="end">5 Test the</text>
    <text x="176" y="266" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="end">prediction</text>
  </svg>`,

  JOKES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="24" y="40" width="580" height="400" rx="14" fill="#f7f9fb" stroke="${RULE}" stroke-width="2"/>
    <text x="50" y="94" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">How funny are Mr Bowen’s jokes?</text>
    <text x="50" y="140" font-family="${FONT}" font-size="24" fill="${MUTED}">Tick one.</text>
    ${tickBox(50, 184, 32)}
    <text x="98" y="211" font-family="${FONT}" font-size="28" fill="${INK}">very funny</text>
    ${tickBox(50, 260, 32)}
    <text x="98" y="287" font-family="${FONT}" font-size="28" fill="${INK}">extremely funny</text>
    ${tickBox(50, 336, 32)}
    <text x="98" y="363" font-family="${FONT}" font-size="28" fill="${INK}">the funniest jokes in Vietnam</text>
    <rect x="610" y="296" width="62" height="80" rx="6" fill="#c8955c" stroke="#8a5d2e" stroke-width="2.5"/>
    <rect x="618" y="308" width="46" height="60" rx="2" fill="#ffffff"/>
    ${mrBowenSvg({ x: 718, y: 270, scale: 0.98, handLeft: [-70, 80] })}
  </svg>`,
}

// content/y7-math/U05_3/diagrams.js
// Teaching diagrams for 5.3 Drawing lines and quadrilaterals, drawn to match
// 5.1 and 5.2.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes only, because
//    `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · `split` diagrams are 840×560, `showcase` ones 1120×440, vote cards 720×320.
//
//   The goals    PIC_RIGHT · PIC_PARALLEL · PIC_QUAD — one picture each, no words
//   Tools        TOOLS        a protractor, a set square, a carpenter's square
//                ANS_40 / ANS_140   vote: the protractor shows both numbers
//                ANGLE_HOW    centre on the point, 0 on the line, count up, mark, join
//   Squares      SQUARE_RHOMBUS   the same four sides; only one has right angles
//   Perpendicular ANS_PERP_A / ANS_PERP_B   vote: the perpendicular from C
//                PERP_POINT   the perpendicular is the shortest way to the line
//                DRAW_PERP    the task: AB 7 cm, 60°, BC 4 cm
//   Parallel     PARALLEL_HOW the four steps, numbered on the drawing: a line
//                             through P, measure its angle, copy it at P, draw
//   Checking     CHECK_360    80° + 110° + 64° + 106° = 360°
//                PHRASES      the Workbook's drawing words
//                PRACTICE_WB  PQ, R, the perpendicular at R, S, and PS
//                TABLE        Mr Bowen measures the outside of a corner (the
//                             picture does not print either answer)
//
// Like the book's, the diagrams are not drawn to scale unless they say so, and
// they stay in English.

import protractorPhoto from './images/protractor.jpg'
import setSquarePhoto from './images/setsquare.jpg'
import trySquarePhoto from './images/trysquare.jpg'

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
const PROT = '#e6f1fa'
const PROT_EDGE = '#5f87ab'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const rad = (d) => (d * Math.PI) / 180
const at = (cx, cy, r, d) => [cx + r * Math.cos(rad(d)), cy - r * Math.sin(rad(d))]
const f = (n) => n.toFixed(1)

const wedge = (cx, cy, r, a1, a2, fill, stroke = INK, sw = 2.5) => {
  const [x1, y1] = at(cx, cy, r, a1)
  const [x2, y2] = at(cx, cy, r, a2)
  return `<path d="M ${f(cx)} ${f(cy)} L ${f(x1)} ${f(y1)} A ${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${f(x2)} ${f(y2)} Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`
}
const seg = (x1, y1, x2, y2, w = 5, color = INK) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`
const dot = (x, y, color = INK, r = 6) => `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${color}"/>`
const box = (x, y, d, s = 24, color = INK) => {
  const [ax, ay] = at(x, y, s, d)
  const [bx, by] = at(x, y, s * Math.SQRT2, d + 45)
  const [cx, cy] = at(x, y, s, d + 90)
  return `<path d="M ${f(ax)} ${f(ay)} L ${f(bx)} ${f(by)} L ${f(cx)} ${f(cy)}" fill="none" stroke="${color}" stroke-width="3"/>`
}
const chevron = (x, y, d, color = INK, s = 16) => {
  const [ax, ay] = at(x, y, s, d + 148)
  const [bx, by] = at(x, y, s, d - 148)
  return `<path d="M ${f(ax)} ${f(ay)} L ${f(x)} ${f(y)} L ${f(bx)} ${f(by)}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`
}
const leader = (x1, y1, x2, y2, color = KEY) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${color}" stroke-width="2.5"/><circle cx="${f(x2)}" cy="${f(y2)}" r="5" fill="${color}"/>`
// A numbered step on a drawing: the disc only (its number is literal text).
const badge = (x, y, color) => `<circle cx="${f(x)}" cy="${f(y)}" r="16" fill="${color}"/>`
const photo = (id, href, x, y, w, h, fit = 'slice') => `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid ${fit}" clip-path="url(#${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="#cbd5e1" stroke-width="2"/>`

// A protractor, straight edge level, centre (cx, cy): ticks only — the few
// numbers a diagram needs are written beside it as literal text.
const protractor = (cx, cy, r) => {
  let ticks = ''
  for (let d = 0; d <= 180; d += 5) {
    const len = d % 10 === 0 ? r * 0.1 : r * 0.06
    const [x1, y1] = at(cx, cy, r, d)
    const [x2, y2] = at(cx, cy, r - len, d)
    ticks += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${PROT_EDGE}" stroke-width="${d % 10 === 0 ? 2 : 1.3}"/>`
  }
  return `<path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z" fill="${PROT}" fill-opacity="0.9" stroke="${PROT_EDGE}" stroke-width="3"/>
    <path d="M ${f(cx - r * 0.55)} ${cy} A ${f(r * 0.55)} ${f(r * 0.55)} 0 0 1 ${f(cx + r * 0.55)} ${cy}" fill="none" stroke="${PROT_EDGE}" stroke-width="1.5" opacity="0.6"/>
    ${ticks}
    <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${f(cy - r * 0.16)}" stroke="${PROT_EDGE}" stroke-width="2"/>`
}

// A ruler lying along the bottom of a drawing: a strip with centimetre ticks.
const ruler = (x, y, w) => {
  let t = ''
  for (let i = 0; i * 26 <= w - 20; i++) t += `<line x1="${x + 12 + i * 26}" y1="${y}" x2="${x + 12 + i * 26}" y2="${y + (i % 5 === 0 ? 18 : 10)}" stroke="#8a6d12" stroke-width="${i % 5 === 0 ? 2 : 1}"/>`
  return `<rect x="${x}" y="${y}" width="${w}" height="44" rx="6" fill="#fbe7a1" stroke="#c9a227" stroke-width="2"/>${t}`
}

// The voting hands from 2.3, 5.1 and 5.2.
const HAND_PATHS = `<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>`
const leftHand = `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${BLUE}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = `<g transform="translate(528 76) scale(7)" fill="none" stroke="${KEY}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`

export const DIAGRAMS = {
  // ── The goals ─────────────────────────────────────────────────────────────
  PIC_RIGHT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    <path d="M 170 250 L 170 70 L 280 250 Z" fill="#bfe0f2" fill-opacity="0.8" stroke="#3f7fa6" stroke-width="3" stroke-linejoin="round"/>
    ${seg(60, 250, 420, 250, 6)}
    ${seg(170, 250, 170, 40, 6, KEY)}
    ${box(170, 250, 0, 30, KEY)}
  </svg>`,

  PIC_PARALLEL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${seg(170, 230, 70, 57, 5)}
    ${seg(290, 230, 190, 57, 5)}
    ${ruler(50, 232, 390)}
    <path d="M 330 230 L 410 230 L 330 92 Z" fill="#bfe0f2" fill-opacity="0.75" stroke="#3f7fa6" stroke-width="3" stroke-linejoin="round"/>
    <line x1="410" y1="230" x2="310" y2="57" stroke="${KEY}" stroke-width="4" stroke-dasharray="10 8"/>
  </svg>`,

  PIC_QUAD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${wedge(110, 250, 34, 0, 80, ORANGE_T, KEY, 2.5)}
    ${wedge(330, 250, 34, 70, 180, ORANGE_T, KEY, 2.5)}
    ${wedge(392.7, 77.7, 30, 186.2, 250, GREEN_T, GREEN, 2.5)}
    ${wedge(135.5, 105.5, 30, 260, 366.2, GREEN_T, GREEN, 2.5)}
    <polygon points="110,250 330,250 392.7,77.7 135.5,105.5" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    ${ruler(90, 262, 260)}
  </svg>`,

  // ── Tools ─────────────────────────────────────────────────────────────────
  TOOLS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${photo('tl-pro', protractorPhoto, 20, 16, 420, 290)}
    ${photo('tl-set', setSquarePhoto, 460, 16, 200, 290, 'meet')}
    ${photo('tl-try', trySquarePhoto, 680, 16, 420, 290)}
    <text x="230" y="352" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">protractor</text>
    <text x="230" y="390" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">measures angles</text>
    <text x="560" y="352" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">set square</text>
    <text x="560" y="390" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">right angles</text>
    <text x="890" y="352" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">a builder's square</text>
    <text x="890" y="390" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">a big right angle, for wood</text>
  </svg>`,

  ANS_40: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand}
    ${protractor(500, 282, 150)}
    ${seg(500, 282, 690, 282, 5)}
    ${seg(500, 282, 657, 150.2, 5)}
    ${dot(500, 282)}
    <text x="587" y="196" font-family="${FONT}" font-size="22" font-weight="bold" fill="#24486b" text-anchor="middle">40</text>
    <text x="569" y="215" font-family="${FONT}" font-size="18" fill="${PROT_EDGE}" text-anchor="middle">140</text>
    <text x="628" y="276" font-family="${FONT}" font-size="20" font-weight="bold" fill="#24486b" text-anchor="middle">0</text>
    <text x="399" y="278" font-family="${FONT}" font-size="17" fill="${PROT_EDGE}" text-anchor="middle">0</text>
    <text x="500" y="112" font-family="${FONT}" font-size="80" font-weight="bold" fill="${BLUE}" text-anchor="middle">40°</text>
  </svg>`,

  ANS_140: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand}
    ${protractor(240, 282, 150)}
    ${seg(240, 282, 430, 282, 5)}
    ${seg(240, 282, 397, 150.2, 5)}
    ${dot(240, 282)}
    <text x="327" y="196" font-family="${FONT}" font-size="22" font-weight="bold" fill="#24486b" text-anchor="middle">40</text>
    <text x="309" y="215" font-family="${FONT}" font-size="18" fill="${PROT_EDGE}" text-anchor="middle">140</text>
    <text x="368" y="276" font-family="${FONT}" font-size="20" font-weight="bold" fill="#24486b" text-anchor="middle">0</text>
    <text x="139" y="278" font-family="${FONT}" font-size="17" fill="${PROT_EDGE}" text-anchor="middle">0</text>
    <text x="240" y="112" font-family="${FONT}" font-size="80" font-weight="bold" fill="${KEY}" text-anchor="middle">140°</text>
  </svg>`,

  ANGLE_HOW: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${protractor(420, 450, 300)}
    <path d="M 769.1 425.6 A 350 350 0 0 0 605.5 153.2" fill="none" stroke="${KEY}" stroke-width="5" stroke-dasharray="12 9" stroke-linecap="round"/>
    <path d="M 590.2 143.7 L 599.7 162.5 L 611.3 143.9 Z" fill="${KEY}"/>
    ${seg(60, 450, 790, 450, 6)}
    ${seg(420, 450, 575.5, 116.5, 6, BLUE)}
    ${dot(554.4, 161.8, KEY, 10)}
    ${dot(420, 450, INK, 8)}
    <text x="682" y="442" font-family="${FONT}" font-size="26" font-weight="bold" fill="#24486b" text-anchor="middle">0</text>
    <text x="647" y="327" font-family="${FONT}" font-size="26" font-weight="bold" fill="#24486b" text-anchor="middle">30</text>
    <text x="551" y="231" font-family="${FONT}" font-size="26" font-weight="bold" fill="#24486b" text-anchor="middle">60</text>
    <text x="420" y="196" font-family="${FONT}" font-size="26" font-weight="bold" fill="#24486b" text-anchor="middle">90</text>
    <text x="289" y="231" font-family="${FONT}" font-size="26" font-weight="bold" fill="#24486b" text-anchor="middle">120</text>
    <text x="193" y="327" font-family="${FONT}" font-size="26" font-weight="bold" fill="#24486b" text-anchor="middle">150</text>
    <text x="158" y="442" font-family="${FONT}" font-size="26" font-weight="bold" fill="#24486b" text-anchor="middle">180</text>
    <text x="490" y="132" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="end">65°</text>
    <text x="630" y="118" font-family="${FONT}" font-size="23" font-weight="bold" fill="${KEY}">count up from 0</text>
    ${leader(250, 505, 414, 456, INK)}
    <text x="40" y="530" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">centre on the point</text>
    ${leader(690, 505, 690, 458, INK)}
    <text x="800" y="530" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="end">0 on the line</text>
    <text x="604" y="64" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}">mark, then join</text>
    ${leader(612, 76, 560, 152, BLUE)}
  </svg>`,

  // ── Squares ───────────────────────────────────────────────────────────────
  SQUARE_RHOMBUS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="420" y="58" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">The same four sides: 40 cm</text>
    <rect x="60" y="180" width="230" height="230" fill="${TEAL_T}" stroke="${INK}" stroke-width="5"/>
    ${box(60, 410, 0, 26)}
    ${box(290, 410, 90, 26)}
    ${box(290, 180, 180, 26)}
    ${box(60, 180, 270, 26)}
    ${wedge(450, 410, 50, 0, 60, ORANGE_T, KEY, 2.5)}
    ${wedge(680, 410, 44, 60, 180, PURPLE_T, PURPLE, 2.5)}
    <polygon points="450,410 680,410 795,210.8 565,210.8" fill="${PURPLE_T}" fill-opacity="0.5" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <text x="175" y="302" font-family="${FONT}" font-size="30" font-weight="bold" fill="${TEAL}" text-anchor="middle">90°</text>
    <text x="512" y="398" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">60°</text>
    <text x="640" y="380" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PURPLE}" text-anchor="middle">120°</text>
    <text x="175" y="462" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">a square</text>
    <text x="175" y="500" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">four right angles</text>
    <text x="622" y="462" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">not a square</text>
    <text x="622" y="500" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">no right angles</text>
  </svg>`,

  // ── The perpendicular from a point ────────────────────────────────────────
  ANS_PERP_A: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand}
    ${seg(240, 250, 690, 250, 5)}
    ${seg(560, 74, 560, 250, 6, BLUE)}
    ${box(560, 250, 90, 22, BLUE)}
    ${dot(560, 74, INK, 8)}
    <text x="590" y="70" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">C</text>
    <text x="240" y="292" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">A</text>
    <text x="690" y="292" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="end">B</text>
  </svg>`,

  ANS_PERP_B: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand}
    ${seg(30, 250, 480, 250, 5)}
    ${seg(330, 74, 255, 250, 6, KEY)}
    ${dot(330, 74, INK, 8)}
    ${dot(255, 250, KEY, 7)}
    <text x="360" y="70" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">C</text>
    <text x="30" y="292" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">A</text>
    <text x="480" y="292" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="end">B</text>
    <text x="255" y="292" font-family="${FONT}" font-size="22" fill="${KEY}" text-anchor="middle">the middle</text>
  </svg>`,

  PERP_POINT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${seg(430, 180, 250, 420, 4, '#9aa5b1')}
    ${seg(430, 180, 650, 420, 4, '#9aa5b1')}
    ${seg(430, 180, 430, 420, 7, BLUE)}
    ${seg(70, 420, 780, 420, 6)}
    ${box(430, 420, 90, 26, BLUE)}
    ${dot(430, 180, INK, 8)}
    <text x="430" y="154" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="440" y="470" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">D</text>
    <text x="70" y="470" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">A</text>
    <text x="780" y="470" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="end">B</text>
    <text x="446" y="318" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}">3.0 cm</text>
    <text x="300" y="300" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="end">3.8 cm</text>
    <text x="560" y="276" font-family="${FONT}" font-size="26" fill="${MUTED}">4.1 cm</text>
    <text x="800" y="60" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">drawn to scale</text>
  </svg>`,

  DRAW_PERP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${wedge(690, 440, 56, 120, 180, ORANGE_T, KEY, 2.5)}
    ${seg(130, 440, 690, 440, 6)}
    ${seg(690, 440, 530, 162.9, 6)}
    ${dot(130, 440)}
    ${dot(690, 440)}
    ${dot(530, 162.9)}
    <text x="410" y="490" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">7 cm</text>
    <text x="634" y="280" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}">4 cm</text>
    <text x="616" y="414" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">60°</text>
    <text x="110" y="490" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">A</text>
    <text x="712" y="490" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>
    <text x="530" y="136" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="60" y="60" font-family="${FONT}" font-size="22" fill="${MUTED}">a sketch: draw it accurately</text>
  </svg>`,

  // ── Parallel ──────────────────────────────────────────────────────────────
  PARALLEL_HOW: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${wedge(480, 430, 60, 120, 180, ORANGE_T, KEY, 3)}
    ${wedge(330, 170, 60, 120, 180, ORANGE_T, KEY, 3)}
    ${seg(70, 430, 780, 430, 6)}
    ${seg(70, 170, 780, 170, 6, BLUE)}
    ${seg(480, 430, 280, 83.4, 4, MUTED)}
    ${chevron(700, 430, 0)}
    ${chevron(700, 170, 0, BLUE)}
    ${dot(330, 170, BLUE, 8)}
    ${dot(480, 430)}
    <text x="420" y="404" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">60°</text>
    <text x="270" y="144" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">60°</text>
    <text x="352" y="214" font-family="${FONT}" font-size="32" font-weight="bold" fill="${BLUE}">P</text>
    <text x="70" y="480" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">A</text>
    <text x="780" y="480" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="end">B</text>
    ${badge(380.1, 257, '#7d8a97')}
    <text x="380.1" y="265" font-family="${FONT}" font-size="21" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    ${badge(372, 398, KEY)}
    <text x="372" y="406" font-family="${FONT}" font-size="21" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    ${badge(222, 140, KEY)}
    <text x="222" y="148" font-family="${FONT}" font-size="21" font-weight="bold" fill="#ffffff" text-anchor="middle">3</text>
    ${badge(620, 170, BLUE)}
    <text x="620" y="178" font-family="${FONT}" font-size="21" font-weight="bold" fill="#ffffff" text-anchor="middle">4</text>
    <text x="540" y="268" font-family="${FONT}" font-size="25" font-weight="bold" fill="${MUTED}">1. a line through P</text>
    <text x="540" y="304" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">2. measure its angle</text>
    <text x="540" y="340" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">3. copy it at P</text>
    <text x="540" y="376" font-family="${FONT}" font-size="25" font-weight="bold" fill="${BLUE}">4. draw the line</text>
  </svg>`,

  // ── Checking ──────────────────────────────────────────────────────────────
  CHECK_360: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${wedge(160, 470, 46, 0, 80, ORANGE_T, KEY, 2.5)}
    ${wedge(520, 470, 46, 70, 180, ORANGE_T, KEY, 2.5)}
    ${wedge(622.6, 188.1, 42, 186.2, 250, GREEN_T, GREEN, 2.5)}
    ${wedge(201.7, 233.6, 42, 260, 366.2, GREEN_T, GREEN, 2.5)}
    <polygon points="160,470 520,470 622.6,188.1 201.7,233.6" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <text x="215" y="433" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">80°</text>
    <text x="479" y="421" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">110°</text>
    <text x="571" y="239" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">64°</text>
    <text x="247" y="292" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">106°</text>
    <text x="140" y="500" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">A</text>
    <text x="540" y="500" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>
    <text x="646" y="180" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="180" y="222" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">D</text>
    <rect x="80" y="20" width="680" height="64" rx="14" fill="${GREEN_T}"/>
    <text x="420" y="63" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="middle">80° + 110° + 64° + 106° = 360°</text>
    <text x="720" y="530" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">orange: given · green: measured</text>
  </svg>`,

  PHRASES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <text x="40" y="52" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">The question says…</text>
    <text x="700" y="52" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">It means…</text>
    <line x1="30" y1="72" x2="1090" y2="72" stroke="#cfd8dc" stroke-width="2"/>
    <text x="40" y="118" font-family="${FONT}" font-size="25" fill="${INK}">Draw the line through B perpendicular to AB.</text>
    <text x="700" y="118" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">It passes B, at 90° to AB.</text>
    <text x="40" y="186" font-family="${FONT}" font-size="25" fill="${INK}">Draw a perpendicular line from C to AB.</text>
    <text x="700" y="186" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Start at C. Meet AB at 90°.</text>
    <text x="40" y="254" font-family="${FONT}" font-size="25" fill="${INK}">Mark the point D.</text>
    <text x="700" y="254" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Make a small cross. Write D.</text>
    <text x="40" y="322" font-family="${FONT}" font-size="25" fill="${INK}">Measure the length of AD.</text>
    <text x="700" y="322" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Ruler: to the nearest mm.</text>
    <text x="40" y="390" font-family="${FONT}" font-size="25" fill="${INK}">How can you check that your answer is correct?</text>
    <text x="700" y="390" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">Use a fact, like 360°.</text>
  </svg>`,

  PRACTICE_WB: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${seg(120, 440, 680, 440, 6)}
    ${seg(440, 440, 440, 200, 6, BLUE)}
    ${box(440, 440, 90, 24, BLUE)}
    <line x1="120" y1="440" x2="440" y2="200" stroke="${KEY}" stroke-width="5" stroke-dasharray="14 10"/>
    ${dot(120, 440)}
    ${dot(680, 440)}
    ${dot(440, 440)}
    ${dot(440, 200, BLUE)}
    <text x="100" y="488" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">P</text>
    <text x="700" y="488" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">Q</text>
    <text x="440" y="488" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">R</text>
    <text x="440" y="176" font-family="${FONT}" font-size="32" font-weight="bold" fill="${BLUE}" text-anchor="middle">S</text>
    <text x="280" y="476" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="middle">4 cm</text>
    <text x="460" y="330" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}">3 cm</text>
    <text x="250" y="300" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="end">?</text>
  </svg>`,

  TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="160" y="170" width="330" height="330" rx="6" fill="#d9b98f" stroke="${INK}" stroke-width="5"/>
    ${wedge(490, 170, 70, 270, 540, ORANGE_T, KEY, 3)}
    <rect x="160" y="170" width="330" height="330" rx="6" fill="none" stroke="${INK}" stroke-width="5"/>
    <text x="640" y="110" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}">270°</text>
    ${leader(630, 98, 556, 146)}
    <text x="325" y="380" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">Mr Bowen’s table,</text>
    <text x="325" y="414" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">seen from above</text>
  </svg>`,
}

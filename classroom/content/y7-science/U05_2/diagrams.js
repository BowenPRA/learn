// content/y7-science/U05_2/diagrams.js
// Inline SVG for 5.2 Comparing metals and non-metals. House style: a white
// plate first, dark ink, pale flat fills, names and labels in the book's
// orange. Diagrams stay in English.
//
//   The goals
//     PIC_COMPARE, PIC_TEST, PIC_CLUES   three pictures, no words
//   Compare
//     CARTOONS      back to the starter: malleable, ductile, sonorous, brittle
//     WHEREAS       shiny metals, whereas dull non-metals
//     MARKET        the market (Question 1)
//   Test
//     EXAMINE       a hand lens over the things on a desk
//     TABLE         the record table of Investigating materials (page 159)
//     CONTACT       check first: the two clips touching, the lamp on
//     CIRCUIT       draw this: the test circuit and its four labels
//     GRAPHITE      pencil leads and a lump of graphite
//     ODD_ONES      mercury and graphite, the two odd ones out
//   Clues
//     MELT_BOIL     water on a thermometer: 0 °C and 100 °C
//     MYSTERY       two mystery substances and a word bank
//
// Split diagrams are drawn at 840×560, showcase panels at 1120×440 and goal
// pictures at 480×300. Label <text> is written out literally so
// `npm run audit:svg` can measure it; the helpers in art.js draw shapes only.

import {
  INK, KEY, MUTED, TEAL, BLUE, FONT, RULE, GRAPHITE, plate, leader, arrow, waves,
  copper, iron, sulfur, hammer, circuit, GAP, LAMP, CELL, paperClip, eraser, coin, pencil, key,
  cube, drop, cloud, thermo, lens, mark,
} from './art.js'
import market from './images/market.jpg'
import leads from './images/pencil-leads.jpg'
import graphiteLump from './images/graphite.jpg'
import mercury from '../U05_1/images/mercury.jpg'

// A photograph cropped to its cell, with rounded corners.
const photo = (id, href, x, y, w, h, align = 'xMidYMid', r = 12) => `<clipPath id="m52-${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="${align} slice" clip-path="url(#m52-${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="none" stroke="#cbd5e1" stroke-width="2"/>`

// A pale panel behind a drawing.
const panel = (x, y, w, h, fill = '#f7fafc', stroke = '#cbd5e1') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

// A bell, mouth down, about 120 wide; for "sonorous".
const bell = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M -10 -78 H 10 V -64 H -10 Z" fill="#c9a227" stroke="${INK}" stroke-width="4"/>
    <path d="M -46 30 Q -44 -64 0 -66 Q 44 -64 46 30 Q 56 36 58 44 H -58 Q -56 36 -46 30 Z" fill="#e8c35a" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="0" cy="54" r="11" fill="#c9a227" stroke="${INK}" stroke-width="4"/>
    <path d="M -24 -40 Q -32 -6 -30 26" stroke="#fff3c4" stroke-width="7" fill="none" stroke-linecap="round"/>
  </g>`

export const DIAGRAMS = {
  // ── The goals ─────────────────────────────────────────────────────────────
  // Compare: a shiny copper bar beside a dull lump of sulfur.
  PIC_COMPARE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${copper(126, 150, 0.95, { shiny: true })}
    <line x1="240" y1="40" x2="240" y2="260" stroke="${RULE}" stroke-width="5" stroke-dasharray="12 10"/>
    ${sulfur(360, 150, 1.05)}
  </svg>`,

  // Test: the circuit, a paper clip in the gap, the lamp on.
  PIC_TEST: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${circuit(28, 10, 0.66, { lit: true })}
    ${paperClip(28 + GAP.x * 0.66, 10 + GAP.y * 0.66, 0.66)}
  </svg>`,

  // Clues: a thermometer, and a hand lens over a mystery card.
  PIC_CLUES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${thermo(96, 40, 222, 92)}
    <rect x="186" y="60" width="160" height="196" rx="14" fill="#fdf1e7" stroke="${KEY}" stroke-width="4"/>
    <text x="266" y="198" font-family="${FONT}" font-size="120" font-weight="bold" fill="${KEY}" text-anchor="middle">?</text>
    ${lens(330, 120, 0.82)}
  </svg>`,

  // ── Compare ───────────────────────────────────────────────────────────────
  // Back to the starter: the four words, a cartoon each.
  CARTOONS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${panel(12, 12, 263, 336)}
    ${panel(291, 12, 263, 336)}
    ${panel(566, 12, 263, 336)}
    ${panel(845, 12, 263, 336)}
    ${hammer(160, 160, 0.72, -24)}
    ${iron(140, 284, 0.82, { flat: true })}
    <path d="M 60 252 l -14 -10 M 60 268 l -18 0 M 220 252 l 14 -10 M 220 268 l 18 0" stroke="${MUTED}" stroke-width="4" stroke-linecap="round"/>
    ${copper(372, 120, 0.5)}
    <path d="M 418 120 C 470 122 486 150 470 176 C 452 206 352 196 350 232 C 348 268 470 252 490 290 C 500 310 470 326 430 322" fill="none" stroke="#d9824a" stroke-width="6" stroke-linecap="round"/>
    ${arrow(450, 70, 520, 70, MUTED, 5, 18)}
    ${bell(698, 172, 1.1)}
    ${waves(782, 170, 1.2)}
    <g transform="translate(614 170) scale(-1 1)">${waves(0, 0, 1.2)}</g>
    ${hammer(1000, 120, 0.62, -30)}
    ${sulfur(980, 284, 1.05, { broken: true })}
    <text x="143" y="398" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">malleable</text>
    <text x="422" y="398" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">ductile</text>
    <text x="697" y="398" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">sonorous</text>
    <text x="976" y="398" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">brittle</text>
  </svg>`,

  // Whereas: shiny metals, dull non-metals.
  WHEREAS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${panel(16, 16, 360, 400, '#e2f2f6', TEAL)}
    ${panel(464, 16, 360, 400, '#fdf6dc', '#b08a12')}
    <text x="196" y="70" font-family="${FONT}" font-size="34" font-weight="bold" fill="${TEAL}" text-anchor="middle">metals</text>
    <text x="644" y="70" font-family="${FONT}" font-size="34" font-weight="bold" fill="#8a6a00" text-anchor="middle">non-metals</text>
    ${copper(196, 236, 1.15, { shiny: true })}
    ${sulfur(644, 236, 1.35)}
    <text x="196" y="384" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">shiny</text>
    <text x="644" y="384" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">dull</text>
    <rect x="270" y="448" width="300" height="84" rx="42" fill="#fdf1e7" stroke="${KEY}" stroke-width="4"/>
    <text x="420" y="504" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">whereas</text>
  </svg>`,

  // Question 1: a market. What is metal, what is not?
  MARKET: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${photo('market', market, 12, 12, 1096, 416, 'xMidYMax')}
  </svg>`,

  // ── Test ──────────────────────────────────────────────────────────────────
  // Examine: a hand lens over the things on a desk.
  EXAMINE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="16" y="16" width="808" height="528" rx="14" fill="#f3e3cc" stroke="#c9a77c" stroke-width="3"/>
    <path d="M 16 150 H 824 M 16 300 H 824 M 16 450 H 824" stroke="#e6cfae" stroke-width="4"/>
    ${pencil(180, 110, 1.6)}
    ${eraser(620, 120, 1.3)}
    ${paperClip(170, 430, 1.4)}
    ${key(640, 440, 1.3)}
    ${coin(400, 300, 1.25)}
    ${lens(390, 290, 1.25)}
  </svg>`,

  // Think like a scientist (page 159): the record table, one row done.
  TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <rect x="12" y="12" width="1096" height="78" rx="10" fill="#5c2483"/>
    <text x="28" y="60" font-family="${FONT}" font-size="26" font-weight="bold" fill="#ffffff">Material</text>
    <text x="283" y="46" font-family="${FONT}" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">Shiny or</text>
    <text x="283" y="76" font-family="${FONT}" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">dull?</text>
    <text x="429" y="60" font-family="${FONT}" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">Rings?</text>
    <text x="575" y="46" font-family="${FONT}" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">Bends or</text>
    <text x="575" y="76" font-family="${FONT}" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">breaks?</text>
    <text x="721" y="46" font-family="${FONT}" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">Feels</text>
    <text x="721" y="76" font-family="${FONT}" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">cold?</text>
    <text x="867" y="46" font-family="${FONT}" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">Lamp</text>
    <text x="867" y="76" font-family="${FONT}" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">on?</text>
    <text x="1029" y="46" font-family="${FONT}" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">Metal or</text>
    <text x="1029" y="76" font-family="${FONT}" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">non-metal?</text>
    <rect x="12" y="90" width="1096" height="338" fill="#ffffff" stroke="#5c2483" stroke-width="3"/>
    <path d="M 210 90 V 428 M 356 90 V 428 M 502 90 V 428 M 648 90 V 428 M 794 90 V 428 M 940 90 V 428 M 12 158 H 1108 M 12 226 H 1108 M 12 294 H 1108 M 12 362 H 1108" stroke="#5c2483" stroke-width="2"/>
    <text x="28" y="134" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">a spoon</text>
    <text x="283" y="134" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">shiny</text>
    <text x="429" y="134" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">yes</text>
    <text x="575" y="134" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">bends</text>
    <text x="721" y="134" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">yes</text>
    <text x="867" y="134" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">later</text>
    <text x="1029" y="134" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">metal</text>
    <text x="28" y="204" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RULE}">1</text>
    <text x="28" y="272" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RULE}">2</text>
    <text x="28" y="340" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RULE}">3</text>
    <text x="28" y="408" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RULE}">4</text>
  </svg>`,

  // Contact: check first. The two clips touching, and the lamp lights.
  CONTACT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${circuit(34, 60, 1.2, { lit: true, clipsTouch: true })}
    <circle cx="${34 + GAP.x * 1.2}" cy="${60 + GAP.y * 1.2}" r="62" fill="none" stroke="${KEY}" stroke-width="5" stroke-dasharray="14 10"/>
    ${mark(34 + GAP.x * 1.2 + 70, 60 + GAP.y * 1.2 - 62, true, 1.2)}
  </svg>`,

  // Draw this: the test circuit and its four labels (page 159).
  CIRCUIT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${circuit(34, 70, 1.2)}
    <rect x="${34 + (GAP.x - 50) * 1.2}" y="${70 + (GAP.y - 12) * 1.2}" width="120" height="29" rx="6" fill="#e2e8f0" stroke="${INK}" stroke-width="4"/>
    ${leader(560, 54, 34 + (CELL.x + 50) * 1.2, 70 + (CELL.y - 20) * 1.2)}
    <text x="580" y="62" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}">cell</text>
    ${leader(220, 500, 34 + LAMP.x * 1.2, 70 + (LAMP.y + 12) * 1.2)}
    <text x="220" y="536" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">lamp</text>
    ${leader(580, 344, 34 + (GAP.x + 62) * 1.2, 70 + (GAP.y - 6) * 1.2)}
    <text x="580" y="332" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">crocodile clips</text>
    ${leader(560, 500, 34 + GAP.x * 1.2, 70 + (GAP.y + 12) * 1.2)}
    <text x="560" y="536" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">material to test</text>
  </svg>`,

  // Graphite: the leads of a pencil, and a lump of the mineral.
  GRAPHITE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('leads', leads, 16, 16, 400, 470)}
    ${photo('lump', graphiteLump, 424, 16, 400, 470)}
    <text x="216" y="532" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">pencil leads</text>
    <text x="624" y="532" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">graphite</text>
  </svg>`,

  // The two odd ones out: mercury, and graphite lighting the lamp.
  ODD_ONES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('mercury', mercury, 16, 16, 400, 470, 'xMidYMax')}
    ${panel(424, 16, 400, 470)}
    ${circuit(432, 120, 0.6, { lit: true })}
    <rect x="${432 + (GAP.x - 60) * 0.6}" y="${120 + GAP.y * 0.6 - 6}" width="${120 * 0.6}" height="12" rx="5" fill="${GRAPHITE}" stroke="${INK}" stroke-width="2.5"/>
    <text x="216" y="532" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">mercury</text>
    <text x="624" y="532" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">graphite</text>
  </svg>`,

  // ── Clues ─────────────────────────────────────────────────────────────────
  // Water on a thermometer: ice melts at 0 °C, water boils at 100 °C.
  MELT_BOIL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${thermo(330, 50, 460, 318)}
    <path d="M 300 130 H 360 M 300 380 H 360 M 306 405 H 354" stroke="${INK}" stroke-width="4"/>
    <path d="M 306 180 H 354 M 306 230 H 354 M 306 280 H 354 M 306 330 H 354 M 306 430 H 354" stroke="${MUTED}" stroke-width="2.5"/>
    <text x="284" y="141" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="end">100 °C</text>
    <text x="284" y="391" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="end">0 °C</text>
    <text x="284" y="418" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="end">−10 °C</text>
    ${cloud(470, 130, 0.9)}
    ${drop(470, 255, 0.9)}
    ${cube(470, 380, 0.85, '#d9eef8')}
    <text x="540" y="141" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}">water boils</text>
    <text x="540" y="266" font-family="${FONT}" font-size="30" font-weight="bold" fill="${MUTED}">water</text>
    <text x="540" y="391" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}">ice melts</text>
  </svg>`,

  // Put it together: two mystery substances and a word bank.
  MYSTERY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="16" y="16" width="396" height="420" rx="14" fill="#fdf1e7" stroke="${KEY}" stroke-width="3"/>
    <rect x="428" y="16" width="396" height="420" rx="14" fill="#fdf1e7" stroke="${KEY}" stroke-width="3"/>
    <text x="214" y="66" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">Substance P</text>
    <text x="626" y="66" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">Substance Q</text>
    <text x="36" y="128" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">a shiny, white solid</text>
    <text x="36" y="188" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">bends, does not break</text>
    <text x="36" y="248" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">conducts electricity</text>
    <text x="36" y="308" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">melts at 962 °C</text>
    <text x="448" y="128" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">a gas, no colour</text>
    <text x="448" y="188" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">melts at −249 °C</text>
    <text x="448" y="248" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">boils at −246 °C</text>
    <text x="448" y="308" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">does not conduct</text>
    <text x="448" y="368" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">glows red in signs</text>
    <rect x="16" y="456" width="808" height="88" rx="14" fill="#e2f2f6" stroke="${TEAL}" stroke-width="3"/>
    <text x="420" y="512" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">copper · neon · silver · sulfur</text>
  </svg>`,
}

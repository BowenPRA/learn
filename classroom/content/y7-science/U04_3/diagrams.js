// content/y7-science/U04_3/diagrams.js
// Teaching diagrams for 4.3 What is a species?
//
//   The goals
//     PIC_COMPARE / PIC_NAME / PIC_TEST   one picture per part of the lesson,
//                   no words (the column headings say what they are)
//   Compare
//     SPECIES_VN    an Indian elephant in Vietnam (Yok Đôn, Đắk Lắk)
//     PIC_IDENTICAL / PIC_SIMILAR   the English: two Mr Bowens exactly the
//                   same; two nearly the same
//     BUDGIES       four budgerigars, four colours, one species (page 134)
//   Test
//     ANS_LOOK / ANS_OFFSPRING   vote: how can scientists be sure?
//     OFFSPRING     a parent and its offspring (real photo)
//     MULE_PHOTOS   a horse, a donkey and their offspring, a mule
//     LIGER         the book's three photos (page 136): lion, tiger, liger
//     ANS_SAME / ANS_DIFFERENT   vote: are lions and tigers one species?
//     NO_OFFSPRING  lion + tiger → liger; liger + liger → nothing
//   Use it
//     SPECIMENS     two leaves of two species (Think like a scientist, p. 137)
//     DRAW_SPECIES  Draw this: the two tests in boxes
//
// Split diagrams are drawn at 840×560, vote cards at 720×320, goal pictures at
// 480×300 and the showcase panel at 1120×440 — the shapes those layouts give a
// picture. Label <text> is written out literally so `npm run audit:svg` can
// measure it. The pictures in art.js carry no text. Diagrams stay in English.

import { mrBowenSvg } from '../../../src/lib/mrBowen.js'
import { INK, KEY, RED, FONT, plate, arrow, mark, magnifier, egg, conicalHat, tag, leafSmooth, leafToothed, box } from './art.js'
import indian from './images/elephant-indian.jpg'
import african from './images/elephant-african.jpg'
import yokdon from './images/elephant-yokdon.jpg'
import calf from './images/elephant-calf.jpg'
import budgies from './images/budgies-four.jpg'
import lion from './images/lion.jpg'
import tiger from './images/tiger.jpg'
import liger from './images/liger.jpg'
import horse from './images/horse.jpg'
import donkey from './images/donkey.jpg'
import mule from './images/mule.jpg'

// The voting hands from 3.1, 4.1 and 4.2.
const HAND_PATHS = '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'
const leftHand = (color) => `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = (color) => `<g transform="translate(528 76) scale(7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const BLUE_VOTE = '#1a5fa8'
const RULE = '#d5dbe1'

// A photograph cropped to its cell, with rounded corners.
const photo = (id, href, x, y, w, h, align = 'xMidYMid') => `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="${align} slice" clip-path="url(#${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="#cbd5e1" stroke-width="2"/>`

// An orange leader line from a label to a dot on the picture.
const leaderDot = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${KEY}" stroke-width="3"/><circle cx="${x2}" cy="${y2}" r="7" fill="${KEY}" stroke="#ffffff" stroke-width="2"/>`

// A plus sign, its centre at (x, y).
const plus = (x, y, r = 16, color = INK) => `<path d="M ${x - r} ${y} h ${2 * r} M ${x} ${y - r} v ${2 * r}" stroke="${color}" stroke-width="7" stroke-linecap="round"/>`

// An empty dashed box with a red cross: nothing here.
const nothing = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#fafbfc" stroke="#9aa5ae" stroke-width="3" stroke-dasharray="10 8"/>
    ${mark(x + w / 2, y + h / 2, 'no', 1.7)}`

// Mr Bowen for the English check: 0.78 of his size, his soles at y = 275.
const bowen = (x, extra = {}) => mrBowenSvg({ x, y: 66, scale: 0.78, ...extra })

export const DIAGRAMS = {
  // ── The goals ─────────────────────────────────────────────────────────────
  PIC_COMPARE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${photo('goal-ind', indian, 12, 16, 222, 268, 'xMinYMid')}
    ${photo('goal-afr', african, 246, 16, 222, 268, 'xMinYMid')}
    ${magnifier(232, 142, 1.15)}
  </svg>`,

  PIC_NAME: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${photo('goal-name', yokdon, 12, 16, 456, 268)}
    ${tag(376, 224, 0.95)}
  </svg>`,

  PIC_TEST: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${photo('goal-lion', lion, 12, 16, 222, 268)}
    ${photo('goal-tiger', tiger, 246, 16, 222, 268)}
    <circle cx="240" cy="150" r="50" fill="#ffffff" stroke="${RULE}" stroke-width="3"/>
    ${mark(240, 128, 'yes', 0.95)}
    ${mark(240, 172, 'no', 0.95)}
  </svg>`,

  // ── Compare ───────────────────────────────────────────────────────────────
  // The elephants of Đắk Lắk are Indian elephants, the species of the book's
  // left-hand photo (page 135).
  SPECIES_VN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('vn-elephant', yokdon, 92, 16, 656, 470)}
    <text x="92" y="530" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}">an Indian elephant in Đắk Lắk, Vietnam</text>
  </svg>`,

  // The English: identical is exactly the same.
  PIC_IDENTICAL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    <line x1="30" y1="275" x2="450" y2="275" stroke="${RULE}" stroke-width="3"/>
    ${bowen(150)}
    ${bowen(330)}
  </svg>`,

  // Similar is nearly the same: the same man, a hat and a wave.
  PIC_SIMILAR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    <line x1="30" y1="275" x2="450" y2="275" stroke="${RULE}" stroke-width="3"/>
    ${bowen(150)}
    ${bowen(330, { handRight: [92, 34] })}
    ${conicalHat(330, 54, 0.78)}
  </svg>`,

  // Page 134's birds, as a real photograph: one species, many colours.
  BUDGIES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('budgies-four', budgies, 16, 16, 808, 470)}
    <text x="24" y="530" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}">four budgerigars, one species</text>
  </svg>`,

  // ── Test ──────────────────────────────────────────────────────────────────
  ANS_LOOK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE_VOTE)}
    ${magnifier(300, 146, 1.25)}
    <text x="420" y="148" font-family="${FONT}" font-size="42" font-weight="bold" fill="${BLUE_VOTE}">look more</text>
    <text x="420" y="204" font-family="${FONT}" font-size="42" font-weight="bold" fill="${BLUE_VOTE}">closely</text>
  </svg>`,

  ANS_OFFSPRING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    ${egg(110, 160, 1.25)}
    <text x="216" y="122" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}">see if they</text>
    <text x="216" y="178" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}">can have</text>
    <text x="216" y="234" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}">babies</text>
  </svg>`,

  // A parent and its offspring.
  OFFSPRING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('calf', calf, 70, 14, 700, 467)}
    ${leaderDot(150, 502, 300, 210)}
    <text x="74" y="538" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}">a parent</text>
    ${leaderDot(600, 502, 590, 330)}
    <text x="410" y="538" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}">its offspring (a calf)</text>
  </svg>`,

  // A mule's mother is a horse and its father is a donkey.
  MULE_PHOTOS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('eq-horse', horse, 16, 14, 372, 204, 'xMidYMin')}
    ${photo('eq-donkey', donkey, 452, 14, 372, 204, 'xMidYMin')}
    ${plus(420, 116)}
    <text x="202" y="256" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}" text-anchor="middle">a horse: the mother</text>
    <text x="638" y="256" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}" text-anchor="middle">a donkey: the father</text>
    ${arrow(420, 236, 420, 284, INK, 7, 20)}
    ${photo('eq-mule', mule, 234, 294, 372, 204, 'xMidYMin')}
    <text x="420" y="538" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}" text-anchor="middle">a mule: their offspring</text>
  </svg>`,

  // Page 136: a male lion, a female tiger, a liger.
  LIGER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${photo('lg-lion', lion, 20, 20, 310, 340)}
    ${photo('lg-tiger', tiger, 400, 20, 310, 340)}
    ${photo('lg-liger', liger, 790, 20, 310, 340)}
    ${plus(365, 190, 20)}
    ${arrow(722, 190, 780, 190, INK, 8, 24)}
    <text x="175" y="408" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">a male lion</text>
    <text x="555" y="408" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">a female tiger</text>
    <text x="945" y="408" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">a liger</text>
  </svg>`,

  ANS_SAME: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE_VOTE)}
    <text x="250" y="150" font-family="${FONT}" font-size="54" font-weight="bold" fill="${BLUE_VOTE}">the same</text>
    <text x="250" y="218" font-family="${FONT}" font-size="54" font-weight="bold" fill="${BLUE_VOTE}">species</text>
  </svg>`,

  ANS_DIFFERENT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    <text x="60" y="150" font-family="${FONT}" font-size="54" font-weight="bold" fill="${KEY}">different</text>
    <text x="60" y="218" font-family="${FONT}" font-size="54" font-weight="bold" fill="${KEY}">species</text>
  </svg>`,

  // The answer: a liger has no offspring.
  NO_OFFSPRING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('no-lion', lion, 16, 16, 216, 190)}
    ${photo('no-tiger', tiger, 300, 16, 216, 190)}
    ${photo('no-liger', liger, 608, 16, 216, 190)}
    ${plus(266, 111)}
    ${arrow(530, 111, 596, 111, INK, 7, 20)}
    <text x="124" y="246" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}" text-anchor="middle">lion</text>
    <text x="408" y="246" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}" text-anchor="middle">tiger</text>
    <text x="716" y="246" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}" text-anchor="middle">liger</text>
    <line x1="20" y1="272" x2="820" y2="272" stroke="${RULE}" stroke-width="2"/>
    ${photo('no-liger-a', liger, 16, 298, 216, 190)}
    <g transform="translate(816 0) scale(-1 1)">${photo('no-liger-b', liger, 300, 298, 216, 190)}</g>
    ${plus(266, 393)}
    ${arrow(530, 393, 596, 393, INK, 7, 20)}
    ${nothing(608, 298, 216, 190)}
    <text x="124" y="528" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}" text-anchor="middle">liger</text>
    <text x="408" y="528" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}" text-anchor="middle">liger</text>
    <text x="716" y="528" font-family="${FONT}" font-size="31" font-weight="bold" fill="${RED}" text-anchor="middle">no offspring</text>
  </svg>`,

  // ── Use it ────────────────────────────────────────────────────────────────
  // Think like a scientist (page 137): two specimens of two similar species.
  SPECIMENS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${leafSmooth(240, 232, 1.4)}
    ${leafToothed(600, 236, 1.36)}
    <text x="240" y="520" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">specimen A</text>
    <text x="600" y="520" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">specimen B</text>
  </svg>`,

  // Draw this: the test, twice. Six boxes and two lines of words.
  DRAW_SPECIES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${box(20, 40, 196, 104)}
    <text x="118" y="84" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Indian</text>
    <text x="118" y="120" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">elephant</text>
    ${plus(246, 92)}
    ${box(276, 40, 196, 104)}
    <text x="374" y="84" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Indian</text>
    <text x="374" y="120" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">elephant</text>
    ${arrow(486, 92, 548, 92, INK, 7, 20)}
    ${box(562, 40, 196, 104, '#3d731c', '#eef6e6')}
    <text x="660" y="84" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">calf:</text>
    <text x="660" y="120" font-family="${FONT}" font-size="28" font-weight="bold" fill="#3d731c" text-anchor="middle">fertile</text>
    ${mark(798, 92, 'yes', 1.3)}
    <text x="420" y="204" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">the same species</text>
    <line x1="20" y1="252" x2="820" y2="252" stroke="${RULE}" stroke-width="2"/>
    ${box(20, 300, 196, 104)}
    <text x="118" y="364" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">lion</text>
    ${plus(246, 352)}
    ${box(276, 300, 196, 104)}
    <text x="374" y="364" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">tiger</text>
    ${arrow(486, 352, 548, 352, INK, 7, 20)}
    ${box(562, 300, 196, 104, RED, '#fdeeee')}
    <text x="660" y="344" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">liger:</text>
    <text x="660" y="380" font-family="${FONT}" font-size="28" font-weight="bold" fill="${RED}" text-anchor="middle">infertile</text>
    ${mark(798, 352, 'no', 1.3)}
    <text x="420" y="464" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">different species</text>
  </svg>`,
}

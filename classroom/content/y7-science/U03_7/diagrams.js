// content/y7-science/U03_7/diagrams.js
// Teaching diagrams for 3.7 Where does energy go?
//
//   The goals
//     PIC_SORT_IT / PIC_COUNT_IT / PIC_CHASE_IT   one picture per part of the
//                   lesson, no words (the column headings say what they are)
//   Sort it
//     MOTO_PUMP     the book's motorbike (page 118): motorbikes at a petrol shop
//                   in Hà Nội, and their energy-change diagram underneath — a
//                   green arrow to the useful energy, a red one to the wasted
//   Count it
//     ANS_LAMP_A / ANS_LAMP_B   vote: the book's two lamps, the same light,
//                   photographed
//     HEAT_CAMERA   the answer, seen: the two lamps through a heat camera
//     LAMPS         Draw This: the two lamps' energy-change diagrams, a green
//                   arrow to the useful light and a red one to the wasted
//                   heat, with the book's percentages (page 118)
//   Chase it
//     ANS_SPREADS / ANS_STORED  vote: what does "dissipated" mean? (Question 1)
//     SPREAD        heat in one place → spread out → gathered back? never
//     WOOD_FIRE     the book's pot on a wood fire (page 119), photographed:
//                   bánh chưng pots in Ninh Bình at Tết, the water labelled
//                   useful; where else the heat goes is the question
//     ALWAYS        put it together: the ball and the candle from 3.6 and the
//                   motorbike — some energy dissipated every time
//
// Split diagrams are drawn at 840×560, the showcase at 1120×440, vote cards
// at 720×320, goal pictures at 480×300 — the shapes those layouts give a picture (as in 3.5 and 3.6).
// Label <text> is written out literally so `npm run audit:svg` can measure it.
// The pictures come from art.js and carry no text. Diagrams stay in English.
// Useful is green and wasted is red throughout.

import {
  INK, KEY, MUTED, GREEN, RED, FONT,
  plate, arrow, leader, motorbike, squiggles, filament, twisty, mug, candle, tennisBall,
} from './art.js'
import petrolShopPhoto from './images/petrol-shop.jpg'
import woodFirePhoto from './images/wood-fire.jpg'
import lampFilamentPhoto from './images/lamp-filament.jpg'
import lampTwistyPhoto from './images/lamp-twisty.jpg'
import heatFilamentPhoto from './images/heat-filament.jpg'
import heatTwistyPhoto from './images/heat-twisty.jpg'

// The voting hands from 3.1.
const HAND_PATHS = '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'
const leftHand = (color) => `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = (color) => `<g transform="translate(528 76) scale(7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const BLUE_VOTE = '#1a5fa8'

// A box of the energy-change diagrams: white, thin dark outline (as in 3.6).
const box = (x, y, w, h = 60, stroke = INK) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>`

// A photograph cropped to its cell, with rounded corners (as in 3.6).
const photo = (id, href, x, y, w, h) => `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="#cbd5e1" stroke-width="2"/>`

// A whole object photographed on white: fitted, not cropped, no frame.
const cutout = (href, x, y, w, h) => `<image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/>`

// Red dots of heat at fixed places (a picture, so no text in it).
const dots = (pts, r = 7) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${RED}" stroke="#ffffff" stroke-width="1.5"/>`).join('')
const SCATTER = [[34, 30], [96, 52], [160, 24], [206, 70], [52, 96], [128, 112], [190, 138], [24, 160], [88, 176], [150, 196], [214, 210], [60, 236], [118, 252], [182, 266], [30, 290]]
const scatterIn = (x, y) => dots(SCATTER.map(([a, b]) => [x + a, y + b]))

export const DIAGRAMS = {
  // ── The goals ─────────────────────────────────────────────────────────────
  PIC_SORT_IT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    <line x1="20" y1="262" x2="460" y2="262" stroke="${INK}" stroke-width="4"/>
    ${motorbike(220, 192, 0.76)}
    ${squiggles(222, 196, 3, 20, 2, RED, 5)}
    ${squiggles(66, 232, 2, 18, 2, RED, 5)}
    ${arrow(352, 146, 452, 146, GREEN, 9, 30)}
  </svg>`,

  PIC_COUNT_IT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${filament(130, 176, 0.86)}
    ${squiggles(130, 120, 5, 22, 2, RED, 5)}
    ${twisty(352, 184, 1.02)}
    ${squiggles(352, 60, 1, 22, 1, RED, 5)}
  </svg>`,

  PIC_CHASE_IT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${mug(240, 186, 0.62, false)}
    ${dots([[226, 158], [246, 166], [232, 182], [62, 60], [136, 40], [330, 46], [420, 76], [44, 170], [100, 236], [392, 214], [440, 150], [160, 120], [326, 128], [60, 270], [430, 266]])}
    ${arrow(196, 140, 132, 92, MUTED, 4, 14)}
    ${arrow(284, 140, 350, 92, MUTED, 4, 14)}
    ${arrow(186, 186, 110, 196, MUTED, 4, 14)}
    ${arrow(296, 186, 372, 196, MUTED, 4, 14)}
  </svg>`,

  // ── Sort it ───────────────────────────────────────────────────────────────
  MOTO_PUMP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('mp-photo', petrolShopPhoto, 20, 20, 800, 355)}
    <rect x="514" y="331" width="296" height="34" rx="8" fill="#ffffff" opacity="0.9"/>
    <text x="798" y="356" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">a petrol shop in Hà Nội</text>
    ${box(30, 430, 190, 64)}
    <text x="125" y="472" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">chemical</text>
    <text x="125" y="526" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">in the petrol</text>
    ${box(452, 392, 190, 60, GREEN)}${box(452, 484, 280, 60, RED)}
    ${arrow(228, 452, 444, 422, GREEN, 6, 22)}
    ${arrow(228, 474, 444, 514, RED, 6, 22)}
    <text x="547" y="432" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">kinetic</text>
    <text x="592" y="524" font-family="${FONT}" font-size="28" font-weight="bold" fill="${RED}" text-anchor="middle">thermal, sound</text>
    <text x="654" y="434" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}">25%</text>
    <text x="744" y="526" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}">75%</text>
    <text x="330" y="416" font-family="${FONT}" font-size="24" font-weight="bold" fill="${GREEN}" text-anchor="middle">useful</text>
    <text x="330" y="544" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}" text-anchor="middle">wasted</text>
  </svg>`,

  // ── Count it ──────────────────────────────────────────────────────────────
  ANS_LAMP_A: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE_VOTE)}
    ${cutout(lampFilamentPhoto, 340, 14, 200, 292)}
    <text x="640" y="80" font-family="${FONT}" font-size="64" font-weight="bold" fill="${BLUE_VOTE}" text-anchor="middle">A</text>
  </svg>`,

  ANS_LAMP_B: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    ${cutout(lampTwistyPhoto, 180, 14, 200, 292)}
    <text x="80" y="80" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}" text-anchor="middle">B</text>
  </svg>`,

  HEAT_CAMERA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <defs><linearGradient id="hc-key" x1="0" x2="1"><stop offset="0" stop-color="#1b2a8f"/><stop offset="0.35" stop-color="#2fd0e0"/><stop offset="0.6" stop-color="#f4e43a"/><stop offset="0.8" stop-color="#f08a24"/><stop offset="1" stop-color="#e0283a"/></linearGradient></defs>
    <text x="36" y="70" font-family="${FONT}" font-size="54" font-weight="bold" fill="${INK}">A</text>
    ${cutout(lampFilamentPhoto, 30, 96, 110, 200)}
    ${photo('hc-a', heatFilamentPhoto, 156, 20, 378, 286)}
    <text x="345" y="350" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}" text-anchor="middle">hottest: about 175 °C</text>
    <text x="596" y="70" font-family="${FONT}" font-size="54" font-weight="bold" fill="${INK}">B</text>
    ${cutout(lampTwistyPhoto, 590, 96, 110, 200)}
    ${photo('hc-b', heatTwistyPhoto, 716, 20, 384, 286)}
    <text x="908" y="350" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">hottest: about 96 °C</text>
    <rect x="360" y="386" width="400" height="26" rx="6" fill="url(#hc-key)"/>
    <text x="346" y="408" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="end">cool</text>
    <text x="774" y="408" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">hot</text>
  </svg>`,

  LAMPS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="36" y="58" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">A</text>
    ${filament(120, 160, 0.78)}
    ${box(236, 128, 196, 64)}
    ${box(560, 52, 170, 64, GREEN)}${box(560, 206, 170, 64, RED)}
    ${arrow(440, 150, 552, 92, GREEN, 6, 22)}
    ${arrow(440, 172, 552, 230, RED, 6, 22)}
    <text x="334" y="170" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">electrical</text>
    <text x="645" y="94" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">light</text>
    <text x="645" y="248" font-family="${FONT}" font-size="28" font-weight="bold" fill="${RED}" text-anchor="middle">thermal</text>
    <text x="742" y="96" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}">15%</text>
    <text x="742" y="250" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}">85%</text>
    <text x="474" y="102" font-family="${FONT}" font-size="24" font-weight="bold" fill="${GREEN}" text-anchor="middle">useful</text>
    <text x="474" y="240" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}" text-anchor="middle">wasted</text>
    <line x1="30" y1="290" x2="810" y2="290" stroke="#e2e8f0" stroke-width="2"/>
    <text x="36" y="342" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}">B</text>
    ${twisty(120, 444, 0.9)}
    ${box(236, 404, 196, 64)}
    ${box(560, 328, 170, 64, GREEN)}${box(560, 482, 170, 64, RED)}
    ${arrow(440, 426, 552, 368, GREEN, 6, 22)}
    ${arrow(440, 448, 552, 506, RED, 6, 22)}
    <text x="334" y="446" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">electrical</text>
    <text x="645" y="370" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">light</text>
    <text x="645" y="524" font-family="${FONT}" font-size="28" font-weight="bold" fill="${RED}" text-anchor="middle">thermal</text>
    <text x="742" y="372" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}">50%</text>
    <text x="742" y="526" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}">50%</text>
    <text x="474" y="378" font-family="${FONT}" font-size="24" font-weight="bold" fill="${GREEN}" text-anchor="middle">useful</text>
    <text x="474" y="516" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}" text-anchor="middle">wasted</text>
  </svg>`,

  // ── Chase it ──────────────────────────────────────────────────────────────
  ANS_SPREADS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE_VOTE)}
    ${dots([[300, 160], [262, 112], [346, 104], [236, 196], [362, 214], [296, 250], [380, 156], [226, 150]])}
    ${arrow(286, 146, 252, 118, MUTED, 3, 11)}${arrow(314, 146, 340, 116, MUTED, 3, 11)}${arrow(300, 176, 298, 232, MUTED, 3, 11)}
    <text x="420" y="148" font-family="${FONT}" font-size="38" font-weight="bold" fill="${BLUE_VOTE}">spreads out,</text>
    <text x="420" y="200" font-family="${FONT}" font-size="38" font-weight="bold" fill="${BLUE_VOTE}">less useful</text>
  </svg>`,

  ANS_STORED: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    <rect x="40" y="96" width="120" height="120" rx="12" fill="#f7f9fb" stroke="${INK}" stroke-width="4"/>
    ${dots([[70, 126], [100, 130], [130, 124], [76, 160], [108, 164], [134, 158], [70, 190], [104, 192], [132, 188]])}
    <text x="184" y="148" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}">not useful,</text>
    <text x="184" y="200" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}">can be stored</text>
  </svg>`,

  SPREAD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="20" y="40" width="236" height="330" rx="14" fill="#f7fafc" stroke="${MUTED}" stroke-width="2.5"/>
    ${mug(132, 238, 0.86)}
    ${dots([[104, 214], [126, 214], [148, 214], [110, 236], [132, 236], [154, 236], [104, 258], [126, 258], [148, 258], [116, 280], [138, 280]])}
    ${arrow(262, 205, 298, 205, INK, 6, 20)}
    <rect x="302" y="40" width="236" height="330" rx="14" fill="#f7fafc" stroke="${MUTED}" stroke-width="2.5"/>
    ${mug(420, 316, 0.5, false)}
    ${scatterIn(300, 52)}
    <rect x="584" y="40" width="236" height="330" rx="14" fill="#f7fafc" stroke="${MUTED}" stroke-width="2.5"/>
    ${mug(702, 316, 0.5, false)}
    ${scatterIn(582, 52)}
    <path d="M 616 110 Q 630 230 664 262" fill="none" stroke="${MUTED}" stroke-width="5" stroke-dasharray="10 8"/>
    ${arrow(660, 258, 678, 274, MUTED, 5, 18)}
    <path d="M 662 170 L 742 250 M 742 170 L 662 250" stroke="${RED}" stroke-width="12" stroke-linecap="round"/>
    <text x="138" y="420" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">in one place</text>
    <text x="138" y="460" font-family="${FONT}" font-size="27" font-weight="bold" fill="${GREEN}" text-anchor="middle">useful</text>
    <text x="420" y="420" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">spread out</text>
    <text x="420" y="460" font-family="${FONT}" font-size="27" font-weight="bold" fill="${RED}" text-anchor="middle">dissipated</text>
    <text x="702" y="420" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">gathered back?</text>
    <text x="702" y="460" font-family="${FONT}" font-size="27" font-weight="bold" fill="${RED}" text-anchor="middle">never</text>
    <text x="420" y="526" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">a red dot = some heat</text>
  </svg>`,

  WOOD_FIRE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('wf-photo', woodFirePhoto, 20, 20, 800, 520)}
    <rect x="34" y="34" width="414" height="46" rx="10" fill="#ffffff" opacity="0.93"/>
    <text x="50" y="66" font-family="${FONT}" font-size="26" font-weight="bold" fill="${GREEN}">useful: the water in a pot</text>
    ${leader(180, 80, 236, 330, GREEN)}
    <rect x="566" y="494" width="240" height="32" rx="8" fill="#ffffff" opacity="0.9"/>
    <text x="796" y="518" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="end">Ninh Bình, Tết 2024</text>
  </svg>`,

  ALWAYS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="340" y="50" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">useful</text>
    <text x="640" y="50" font-family="${FONT}" font-size="28" font-weight="bold" fill="${RED}" text-anchor="middle">dissipated</text>
    ${tennisBall(96, 118, 34)}
    <path d="M 70 172 H 122" stroke="${INK}" stroke-width="4"/>
    <text x="96" y="200" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">the ball</text>
    ${box(200, 78, 280, 96, GREEN)}${box(500, 78, 280, 96, RED)}
    <text x="340" y="116" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">bounces back up</text>
    <text x="340" y="156" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="middle">55%</text>
    <text x="640" y="116" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">sound and heat</text>
    <text x="640" y="156" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}" text-anchor="middle">45%</text>
    ${candle(96, 288, 0.5)}
    <text x="96" y="364" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">the candle</text>
    ${box(200, 238, 280, 96, GREEN)}${box(500, 238, 280, 96, RED)}
    <text x="340" y="276" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">heats the oil</text>
    <text x="340" y="316" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="middle">a little</text>
    <text x="640" y="276" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">glass, tripod, air</text>
    <text x="640" y="316" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}" text-anchor="middle">most</text>
    ${motorbike(100, 440, 0.44)}
    <text x="96" y="530" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">the motorbike</text>
    ${box(200, 398, 280, 96, GREEN)}${box(500, 398, 280, 96, RED)}
    <text x="340" y="436" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">moves the bike</text>
    <text x="340" y="476" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="middle">25%</text>
    <text x="640" y="436" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">heat and sound</text>
    <text x="640" y="476" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}" text-anchor="middle">75%</text>
  </svg>`,
}

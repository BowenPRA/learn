// content/y7-science/U04_2/diagrams.js
// Teaching diagrams for 4.2 Viruses.
//
//   The goals
//     PIC_LOOK / PIC_FOLLOW / PIC_DECIDE   one picture per part of the lesson,
//                   no words (the column headings say what they are)
//   Look inside
//     SEVEN_ICONS   Getting started: the seven icons from 4.1, only respiration
//                   named (the reveal names the rest)
//     EM_PHOTOS     an electron microscope, and what it sees (page 131)
//     ANS_CELLS / ANS_NO_CELLS   vote: is a virus made of cells?
//     REAL_FLU      a cell, named, and a real flu virus: none of those parts
//     DRAW_VIRUS    Draw this: the protein coat, the pegs, the RNA (page 131)
//   Follow it
//     ANS_CELL / ANS_VIRUS   vote: who makes the new viruses? (A is the cell)
//     BE_THE_CELL   act it out: the virus brings its instructions, the cell
//                   copies, the cell dies and the copies go on
//     REPLICATION   real viruses coming out of a cell (page 132)
//     COVID         SARS-CoV-2: the CDC drawing (the book's page 133) and a
//                   real photograph
//   Decide
//     ACTIVITY      Activity 4.2.1: three real viruses, and the seven to test
//
// Split diagrams are drawn at 840×560, vote cards at 720×320, goal pictures at
// 480×300 — the shapes those layouts give a picture (as in 4.1). Label <text>
// is written out literally so `npm run audit:svg` can measure it. The pictures
// come from art.js and carry no text. Diagrams stay in English.

import { mrBowenSvg } from '../../../src/lib/mrBowen.js'
import {
  INK, KEY, RED, FONT,
  plate, arrow, SEVEN, mark, virus, cellBlob, student, paper,
} from './art.js'
import emPhoto from './images/electron-microscope.jpg'
import fluInCells from './images/flu-in-cells.jpg'
import fluVirus from './images/flu-virus.jpg'
import leavingCell from './images/covid-leaving-cell.jpg'
import covidDrawing from './images/covid-drawing.jpg'
import covidPhoto from './images/covid-photo.jpg'
import mosaicLeaf from './images/mosaic-leaf.jpg'

// The voting hands from 3.1 and 4.1.
const HAND_PATHS = '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'
const leftHand = (color) => `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = (color) => `<g transform="translate(528 76) scale(7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const BLUE_VOTE = '#1a5fa8'
const TEAL = '#0087a8'

// A photograph cropped to its cell, with rounded corners (as in 4.1).
const photo = (id, href, x, y, w, h, align = 'xMidYMid') => `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="${align} slice" clip-path="url(#${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="#cbd5e1" stroke-width="2"/>`

// An orange leader line from a label to a dot on the picture.
const leaderDot = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${KEY}" stroke-width="3"/><circle cx="${x2}" cy="${y2}" r="7" fill="${KEY}" stroke="#ffffff" stroke-width="2"/>`

// A numbered disc (the number is written out where it is used).
const disc = (cx, cy, r = 26) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${TEAL}"/>`

// A desk seen from the front: the top edge at y.
const desk = (x, y, w = 210) => `<rect x="${x}" y="${y}" width="${w}" height="16" rx="4" fill="#d9b98f" stroke="${INK}" stroke-width="3"/>
    <path d="M ${x + 16} ${y + 16} v 40 M ${x + w - 16} ${y + 16} v 40" stroke="${INK}" stroke-width="4"/>`

export const DIAGRAMS = {
  // ── The goals ─────────────────────────────────────────────────────────────
  PIC_LOOK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${virus(240, 150, 2.3)}
  </svg>`,

  PIC_FOLLOW: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${cellBlob(308, 160, 1.3)}
    ${virus(82, 86, 0.8)}
    ${arrow(140, 112, 196, 140, KEY, 6, 20)}
  </svg>`,

  PIC_DECIDE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${virus(240, 150, 1.7)}
    ${mark(86, 150, 'yes', 1.9)}
    ${mark(394, 150, 'no', 1.9)}
  </svg>`,

  // ── Look inside ───────────────────────────────────────────────────────────
  // Getting started (page 130): the seven from 4.1. Only respiration is named.
  SEVEN_ICONS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <circle cx="320" cy="150" r="78" fill="#fff4e8" stroke="${KEY}" stroke-width="5"/>
    ${SEVEN.slice(0, 4).map((draw, i) => draw(120 + i * 200, 150, 1.05)).join('')}
    ${SEVEN.slice(4).map((draw, i) => draw(220 + i * 200, 410, 1.05)).join('')}
    <text x="320" y="282" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">respiration</text>
  </svg>`,

  // Page 131: the microscope that can see a virus, and what it sees.
  EM_PHOTOS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <clipPath id="em-cut"><rect x="16" y="16" width="460" height="388" rx="12"/></clipPath>
    <g clip-path="url(#em-cut)"><svg x="16" y="16" width="460" height="388" viewBox="240 0 660 557"><image href="${emPhoto}" x="0" y="0" width="960" height="557"/></svg></g>
    <rect x="16" y="16" width="460" height="388" rx="12" fill="none" stroke="#cbd5e1" stroke-width="2"/>
    ${photo('em-flu', fluInCells, 492, 16, 332, 388)}
    ${leaderDot(110, 436, 132, 300)}
    <text x="16" y="470" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}">an electron microscope</text>
    <text x="492" y="450" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}">flu viruses (gold)</text>
    <text x="492" y="490" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}">in a cell (green)</text>
  </svg>`,

  ANS_CELLS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE_VOTE)}
    ${cellBlob(318, 160, 0.95)}
    <text x="440" y="148" font-family="${FONT}" font-size="40" font-weight="bold" fill="${BLUE_VOTE}">yes: it is</text>
    <text x="440" y="200" font-family="${FONT}" font-size="40" font-weight="bold" fill="${BLUE_VOTE}">made of</text>
    <text x="440" y="252" font-family="${FONT}" font-size="40" font-weight="bold" fill="${BLUE_VOTE}">cells</text>
  </svg>`,

  ANS_NO_CELLS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    ${cellBlob(112, 160, 0.95)}
    <path d="M 40 90 L 184 230 M 184 90 L 40 230" stroke="${RED}" stroke-width="12" stroke-linecap="round"/>
    <text x="236" y="148" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}">no: it is</text>
    <text x="236" y="200" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}">not made</text>
    <text x="236" y="252" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}">of cells</text>
  </svg>`,

  // A cell, its parts named, zoomed to a real flu virus (page 131): a virus
  // has none of those parts.
  REAL_FLU: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${cellBlob(232, 290, 2.0)}
    <rect x="420" y="271" width="8" height="8" fill="none" stroke="${KEY}" stroke-width="3"/>
    <path d="M 428 271 L 516 58 M 428 279 L 516 474" stroke="${KEY}" stroke-width="3" stroke-dasharray="10 8"/>
    ${photo('flu-real', fluVirus, 516, 58, 308, 416)}
    ${leaderDot(150, 82, 116, 152)}
    <text x="24" y="70" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}">cell membrane</text>
    ${leaderDot(300, 82, 222, 264)}
    <text x="270" y="70" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}">nucleus</text>
    ${leaderDot(110, 488, 150, 372)}
    <text x="24" y="526" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}">cytoplasm</text>
    <text x="516" y="522" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}">a real flu virus</text>
  </svg>`,

  // Draw this (page 131): the book's three parts. Coat blue-green and RNA
  // orange, as in the book's photograph.
  DRAW_VIRUS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${virus(282, 288, 3.5)}
    ${leaderDot(546, 96, 398, 156)}
    <text x="556" y="106" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}">pegs</text>
    ${leaderDot(546, 262, 410, 282)}
    <text x="556" y="272" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}">protein coat</text>
    ${leaderDot(546, 410, 330, 310)}
    <text x="556" y="420" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}">RNA:</text>
    <text x="556" y="460" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">instructions to</text>
    <text x="556" y="494" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">make more viruses</text>
  </svg>`,

  // ── Follow it ─────────────────────────────────────────────────────────────
  ANS_CELL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE_VOTE)}
    ${cellBlob(330, 160, 1.0)}
    <text x="460" y="178" font-family="${FONT}" font-size="46" font-weight="bold" fill="${BLUE_VOTE}">the cell</text>
  </svg>`,

  ANS_VIRUS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    ${virus(106, 160, 1.45)}
    <text x="216" y="178" font-family="${FONT}" font-size="46" font-weight="bold" fill="${KEY}">the virus</text>
  </svg>`,

  // Act it out: three rows, numbered; the rules are in the slide's own words.
  BE_THE_CELL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <line x1="20" y1="186" x2="820" y2="186" stroke="#d5dbe1" stroke-width="2"/>
    <line x1="20" y1="372" x2="820" y2="372" stroke="#d5dbe1" stroke-width="2"/>
    ${disc(52, 94)}<text x="52" y="106" font-family="${FONT}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    ${mrBowenSvg({ x: 190, y: 20, scale: 0.58, handRight: [96, 70] })}
    ${paper(262, 72, 1.0, 12)}
    ${arrow(300, 96, 440, 104, KEY, 5, 16)}
    ${student(560, 128, 1.0, '#1a5fa8')}${student(660, 128, 1.0, '#4a8b23')}
    ${desk(500, 128)}
    ${disc(52, 280)}<text x="52" y="292" font-family="${FONT}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    ${student(250, 314, 1.0, '#1a5fa8')}${student(350, 314, 1.0, '#4a8b23')}
    ${desk(190, 314)}
    ${paper(470, 270, 0.95, -8)}${paper(530, 280, 0.95, 6)}${paper(590, 268, 0.95, -4)}${paper(650, 282, 0.95, 10)}${paper(710, 270, 0.95, -6)}
    ${disc(52, 466)}<text x="52" y="478" font-family="${FONT}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">3</text>
    ${student(250, 498, 1.0, '#9aa5ae', true)}${student(350, 498, 1.0, '#9aa5ae', true)}
    ${desk(190, 498)}
    ${paper(500, 436, 0.85, -8)}${paper(580, 432, 0.85, 8)}
    ${arrow(430, 478, 640, 478, KEY, 5, 16)}
    ${student(710, 498, 0.85, '#c25e12')}${student(780, 498, 0.85, '#5c2483')}
    ${desk(666, 498, 160)}
  </svg>`,

  // Page 132: real viruses coming out of a cell.
  REPLICATION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('rep-out', leavingCell, 16, 16, 808, 456)}
    ${leaderDot(150, 512, 196, 300)}
    <text x="24" y="540" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}">new coronaviruses (gold)</text>
    ${leaderDot(560, 512, 520, 250)}
    <text x="500" y="540" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}">the cell</text>
  </svg>`,

  // Page 133: the CDC drawing (the book's) beside a real photograph.
  COVID: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <image href="${covidDrawing}" x="12" y="40" width="440" height="442" preserveAspectRatio="xMidYMid meet"/>
    ${photo('covid-real', covidPhoto, 470, 150, 354, 276)}
    ${leaderDot(488, 92, 426, 196)}
    <text x="480" y="74" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}">spike protein</text>
    <text x="40" y="530" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}">a drawing</text>
    <text x="470" y="470" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}">a real photo</text>
  </svg>`,

  // ── Decide ────────────────────────────────────────────────────────────────
  // Activity 4.2.1: three real viruses, and the seven to test them against.
  ACTIVITY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('act-flu', fluVirus, 16, 16, 256, 290)}
    ${photo('act-covid', covidPhoto, 292, 16, 256, 290)}
    ${photo('act-leaf', mosaicLeaf, 568, 16, 256, 290)}
    <text x="144" y="350" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}" text-anchor="middle">flu</text>
    <text x="420" y="350" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}" text-anchor="middle">SARS-CoV-2</text>
    <text x="696" y="342" font-family="${FONT}" font-size="29" font-weight="bold" fill="${KEY}" text-anchor="middle">a leaf with</text>
    <text x="696" y="376" font-family="${FONT}" font-size="29" font-weight="bold" fill="${KEY}" text-anchor="middle">a virus</text>
    <line x1="20" y1="394" x2="820" y2="394" stroke="#d5dbe1" stroke-width="2"/>
    ${SEVEN.map((draw, i) => draw(84 + i * 112, 456, 0.6)).join('')}
    <text x="84" y="540" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">M</text>
    <text x="196" y="540" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">R</text>
    <text x="308" y="540" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">S</text>
    <text x="420" y="540" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">G</text>
    <text x="532" y="540" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">R</text>
    <text x="644" y="540" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">E</text>
    <text x="756" y="540" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">N</text>
  </svg>`,
}


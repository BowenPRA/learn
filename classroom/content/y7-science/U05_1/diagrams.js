// content/y7-science/U05_1/diagrams.js
// Inline SVG for 5.1 Metals and non-metals. House style: a white plate first,
// dark ink, pale flat fills, names and labels in the book's orange. Diagrams
// stay in English.
//
//   The goals
//     PIC_METALS, PIC_NONMETALS, PIC_JOB   three pictures, no words
//   Metals
//     BRIDGE        the Dragon Bridge, Đà Nẵng (back to the starter)
//     HAMMER_WIRE   a blacksmith's hot iron; copper wire (malleable, ductile)
//     RING_GONG     a gold ring; Central Highlands gongs (shiny, sonorous)
//     ANS_YES / ANS_NO          vote: a glass bottle rings. Is it a metal?
//     ONE_CLUE      the book's three warnings: glass rings, old iron is dull,
//                   a big beam will not bend
//     CONDUCT       a wok on a flame; a wire, copper inside, plastic outside
//     ENGLISH       act → an actor, conduct → a conductor, insulate → an insulator
//     ANS_CAN_YES / ANS_CAN_NO  vote: will a magnet pick up an aluminium can?
//     MAGNET_MELT   a steel can picked up, an aluminium can left behind;
//                   molten iron; mercury, the liquid metal
//   Non-metals
//     SULFUR        a lump of sulfur; the pieces after one hit
//     NONMETALS     six non-metals at work
//     ANS_LEFT / ANS_RIGHT      vote: metals on the left or the right?
//   The right job
//     TABLE         Item | Metal | Useful property, with a word bank
//     SUMMARY       metals beside non-metals, in pictures
//
// Split diagrams are drawn at 840×560, showcase panels at 1120×440, vote cards
// at 720×320 and goal pictures at 480×300.
// Label <text> is written out literally so `npm run audit:svg` can measure it;
// the helpers in art.js draw shapes only.

import {
  INK, KEY, MUTED, TEAL, PURPLE, BLUE, FONT, RULE, COPPER, f1, plate, leader, arrow, bulb,
  copper, iron, sulfur, waves, magnet, drinkCan, foodCan, bottle, spoon, hammer, pan, bulbOff, beam, mark,
} from './art.js'
import dragonBridge from './images/dragon-bridge.jpg'
import longBien from './images/long-bien.jpg'
import blacksmith from './images/blacksmith.jpg'
import copperWire from './images/copper-wire.jpg'
import goldRing from './images/gold-ring.jpg'
import gongs from './images/gongs.jpg'
import wok from './images/wok.jpg'
import moltenIron from './images/molten-iron.jpg'
import mercury from './images/mercury.jpg'
import sulfurPic from './images/sulfur.jpg'
import oxygen from './images/oxygen.jpg'
import balloons from './images/balloons.jpg'
import pool from './images/pool.jpg'
import charcoal from './images/charcoal.jpg'
import chips from './images/chips.jpg'

// The voting hands from 3.1 and 4.1–4.5.
const HAND_PATHS = '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'
const leftHand = (color) => `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = (color) => `<g transform="translate(528 76) scale(7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`

// A photograph cropped to its cell, with rounded corners.
const photo = (id, href, x, y, w, h, align = 'xMidYMid', r = 12) => `<clipPath id="m51-${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="${align} slice" clip-path="url(#m51-${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="none" stroke="#cbd5e1" stroke-width="2"/>`

// A balloon on a string, its knot at (x, y).
const balloon = (x, y, s = 1, fill = '#f29a9a') => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M 0 0 Q -10 40 6 80 Q 18 110 0 140" fill="none" stroke="${MUTED}" stroke-width="3"/>
    <ellipse cx="0" cy="-52" rx="44" ry="54" fill="${fill}" stroke="${INK}" stroke-width="4"/>
    <path d="M -6 0 L 0 -6 L 6 0 Z" fill="${fill}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M -22 -78 Q -28 -60 -24 -46" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
  </g>`

// A wire, cut open: plastic outside, copper strands fanning out of its end.
const cable = (x, y) => `<rect x="${x}" y="${y - 34}" width="230" height="68" rx="30" fill="#eef3f7" stroke="${INK}" stroke-width="4"/>
    <path d="M ${x + 14} ${y - 16} H ${x + 200}" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>
    ${[-26, -16, -6, 4, 14, 24].map((dy, i) => `<path d="M ${x + 222} ${y + dy * 0.6} Q ${x + 270} ${y + dy * 0.9} ${x + 316} ${f1(y + dy * 2.1 + (i % 2) * 4)}" fill="none" stroke="${COPPER}" stroke-width="6" stroke-linecap="round"/>`).join('')}
    <ellipse cx="${x + 228}" cy="${y}" rx="10" ry="30" fill="#d4dde5" stroke="${INK}" stroke-width="3"/>`

export const DIAGRAMS = {
  // ── The goals ─────────────────────────────────────────────────────────────
  // Metals: a polished copper bar that rings.
  PIC_METALS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${copper(200, 160, 1.15, { shiny: true })}
    ${waves(336, 160, 1.5)}
  </svg>`,

  // Non-metals: sulfur in pieces, and a balloon of gas.
  PIC_NONMETALS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${sulfur(170, 220, 1.2, { broken: true })}
    ${balloon(372, 150, 0.95)}
  </svg>`,

  // The right job: a metal pan with a wooden handle, ticked.
  PIC_JOB: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${pan(150, 200, 1.05, 'wood')}
    ${mark(410, 76, true, 1.6)}
  </svg>`,

  // ── Metals ────────────────────────────────────────────────────────────────
  // Back to the starter: the Dragon Bridge.
  BRIDGE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('bridge', dragonBridge, 16, 16, 808, 480)}
    <text x="420" y="538" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">The Dragon Bridge, Đà Nẵng: steel</text>
  </svg>`,

  // Malleable and ductile: hot iron under a hammer; copper wire.
  HAMMER_WIRE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('smith', blacksmith, 16, 16, 400, 470)}
    ${photo('wire', copperWire, 424, 16, 400, 470)}
    <text x="216" y="532" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">hot iron and a hammer</text>
    <text x="624" y="532" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">copper wire</text>
  </svg>`,

  // Shiny and sonorous: a gold ring; Central Highlands gongs.
  RING_GONG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('ring', goldRing, 16, 16, 400, 470)}
    ${photo('gongs', gongs, 424, 16, 400, 470)}
    <text x="216" y="532" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">a gold ring</text>
    <text x="624" y="532" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">gongs, Central Highlands</text>
  </svg>`,

  // Vote: a glass bottle rings when you tap it. Is it a metal?
  ANS_YES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    <text x="470" y="210" font-family="${FONT}" font-size="150" font-weight="bold" fill="${BLUE}" text-anchor="middle">yes</text>
  </svg>`,

  ANS_NO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    <text x="240" y="210" font-family="${FONT}" font-size="150" font-weight="bold" fill="${KEY}" text-anchor="middle">no</text>
  </svg>`,

  // One clue is not enough: the book's three warnings.
  ONE_CLUE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="16" y="16" width="260" height="400" rx="12" fill="#f7fafc" stroke="#cbd5e1" stroke-width="2"/>
    ${bottle(120, 236, 1.2)}
    ${spoon(206, 190, 0.9, 40)}
    ${waves(176, 140, 1.1)}
    ${photo('oldiron', longBien, 290, 16, 260, 400)}
    <rect x="564" y="16" width="260" height="400" rx="12" fill="#f7fafc" stroke="#cbd5e1" stroke-width="2"/>
    ${beam(694, 230, 1.3)}
    ${mark(140, 370, false, 1.3)}
    ${mark(420, 370, true, 1.3)}
    ${mark(694, 370, true, 1.3)}
    <text x="146" y="464" font-family="${FONT}" font-size="29" font-weight="bold" fill="${KEY}" text-anchor="middle">glass rings too</text>
    <text x="146" y="502" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">not a metal</text>
    <text x="420" y="464" font-family="${FONT}" font-size="29" font-weight="bold" fill="${KEY}" text-anchor="middle">old iron is dull</text>
    <text x="420" y="502" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">still a metal</text>
    <text x="694" y="464" font-family="${FONT}" font-size="29" font-weight="bold" fill="${KEY}" text-anchor="middle">too big to bend</text>
    <text x="694" y="502" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="middle">still a metal</text>
  </svg>`,

  // Conductors and insulators: a wok on a flame; a wire, cut open.
  CONDUCT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('wok', wok, 16, 16, 400, 470, 'xMinYMid')}
    <text x="216" y="532" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">a wok on a flame</text>
    <rect x="432" y="16" width="392" height="470" rx="12" fill="#f7fafc" stroke="#cbd5e1" stroke-width="2"/>
    ${cable(454, 262)}
    ${leader(730, 130, 742, 222)}
    <text x="730" y="118" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">copper</text>
    ${leader(560, 380, 560, 292)}
    <text x="560" y="414" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">plastic</text>
    <text x="628" y="532" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">a wire, cut open</text>
  </svg>`,

  // English: the ending -or means the person or thing that does it.
  ENGLISH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="60" y="66" font-family="${FONT}" font-size="28" font-weight="bold" fill="${MUTED}">what it does</text>
    <text x="500" y="66" font-family="${FONT}" font-size="28" font-weight="bold" fill="${MUTED}">what it is</text>
    <line x1="30" y1="92" x2="810" y2="92" stroke="${RULE}" stroke-width="3"/>
    <text x="60" y="170" font-family="${FONT}" font-size="44" font-weight="bold" fill="${MUTED}">act</text>
    ${arrow(330, 156, 420, 156, MUTED, 5, 18)}
    <text x="640" y="170" font-family="${FONT}" font-size="44" font-weight="bold" fill="${MUTED}" text-anchor="end">an act</text>
    <text x="640" y="170" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}">or</text>
    <line x1="30" y1="214" x2="810" y2="214" stroke="${RULE}" stroke-width="2"/>
    <text x="60" y="296" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}">conduct</text>
    ${arrow(330, 282, 420, 282, TEAL, 5, 18)}
    <text x="640" y="296" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="end">a conduct</text>
    <text x="640" y="296" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}">or</text>
    <line x1="30" y1="340" x2="810" y2="340" stroke="${RULE}" stroke-width="2"/>
    <text x="60" y="422" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}">insulate</text>
    ${arrow(330, 408, 420, 408, TEAL, 5, 18)}
    <text x="640" y="422" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="end">an insulat</text>
    <text x="640" y="422" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}">or</text>
    <rect x="30" y="468" width="780" height="70" rx="14" fill="#fdf1e7" stroke="${KEY}" stroke-width="3"/>
    <text x="420" y="514" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">-or: the person or thing that does it</text>
  </svg>`,

  // Vote: in the Periodic Table, are the metals on the left or the right?
  ANS_LEFT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    <text x="470" y="210" font-family="${FONT}" font-size="140" font-weight="bold" fill="${BLUE}" text-anchor="middle">left</text>
  </svg>`,

  ANS_RIGHT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    <text x="250" y="210" font-family="${FONT}" font-size="140" font-weight="bold" fill="${KEY}" text-anchor="middle">right</text>
  </svg>`,

  // Vote: will a magnet pick up an aluminium can?
  ANS_CAN_YES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    ${magnet(350, 92, 0.75)}
    ${drinkCan(350, 204, 0.8)}
    <text x="580" y="200" font-family="${FONT}" font-size="120" font-weight="bold" fill="${BLUE}" text-anchor="middle">yes</text>
  </svg>`,

  ANS_CAN_NO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    ${magnet(140, 70, 0.62)}
    ${drinkCan(140, 238, 0.8)}
    <line x1="60" y1="292" x2="220" y2="292" stroke="${MUTED}" stroke-width="4"/>
    <text x="370" y="200" font-family="${FONT}" font-size="120" font-weight="bold" fill="${KEY}" text-anchor="middle">no</text>
  </svg>`,

  // Magnetic, and hard to melt: a steel can picked up and an aluminium can
  // left behind; molten iron; mercury, the liquid metal.
  MAGNET_MELT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="16" y="16" width="400" height="528" rx="12" fill="#f7fafc" stroke="#cbd5e1" stroke-width="2"/>
    ${magnet(120, 104, 0.95)}
    ${foodCan(120, 232, 1)}
    ${drinkCan(306, 400, 1)}
    <line x1="36" y1="468" x2="396" y2="468" stroke="${MUTED}" stroke-width="4"/>
    ${mark(196, 232, true, 1.1)}
    ${mark(376, 330, false, 1.1)}
    <text x="120" y="516" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">steel</text>
    <text x="306" y="516" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">aluminium</text>
    ${photo('molten', moltenIron, 432, 16, 392, 214)}
    <text x="628" y="266" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">molten iron</text>
    ${photo('mercury', mercury, 432, 288, 392, 214, 'xMidYMax')}
    <text x="628" y="538" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">mercury</text>
  </svg>`,

  // ── Non-metals ────────────────────────────────────────────────────────────
  // Brittle: a lump of sulfur, and the pieces after one hit.
  SULFUR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('sulfur', sulfurPic, 16, 16, 400, 470)}
    <rect x="432" y="16" width="392" height="470" rx="12" fill="#f7fafc" stroke="#cbd5e1" stroke-width="2"/>
    ${hammer(640, 200, 1, -28)}
    ${sulfur(628, 380, 1.45, { broken: true })}
    <text x="216" y="532" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">sulfur</text>
    <text x="628" y="532" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">after one hit</text>
  </svg>`,

  // Six non-metals at work (pages 155–156).
  NONMETALS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${photo('nm1', sulfurPic, 12, 12, 176, 300)}
    ${photo('nm2', oxygen, 196, 12, 176, 300, 'xMidYMin')}
    ${photo('nm3', balloons, 380, 12, 176, 300, 'xMidYMin')}
    ${photo('nm4', pool, 564, 12, 176, 300)}
    ${photo('nm5', charcoal, 748, 12, 176, 300)}
    ${photo('nm6', chips, 932, 12, 176, 300)}
    <text x="100" y="356" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">sulfur</text>
    <text x="284" y="356" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">oxygen</text>
    <text x="468" y="356" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">helium</text>
    <text x="652" y="356" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">chlorine</text>
    <text x="836" y="356" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">carbon</text>
    <text x="1020" y="356" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">silicon</text>
    <text x="100" y="398" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">hardens rubber</text>
    <text x="284" y="398" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">in hospitals</text>
    <text x="468" y="398" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">in balloons</text>
    <text x="652" y="398" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">cleans pools</text>
    <text x="836" y="398" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">cleans water</text>
    <text x="1020" y="398" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">computer chips</text>
  </svg>`,

  // ── The right job ─────────────────────────────────────────────────────────
  // Think like a scientist (page 154): the table, one row done, a word bank.
  TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <rect x="16" y="16" width="760" height="64" rx="10" fill="${PURPLE}"/>
    <text x="36" y="58" font-family="${FONT}" font-size="30" font-weight="bold" fill="#ffffff">Item</text>
    <text x="246" y="58" font-family="${FONT}" font-size="30" font-weight="bold" fill="#ffffff">Metal</text>
    <text x="456" y="58" font-family="${FONT}" font-size="30" font-weight="bold" fill="#ffffff">Useful property</text>
    <rect x="16" y="80" width="760" height="344" fill="#ffffff" stroke="${PURPLE}" stroke-width="3"/>
    <path d="M 226 80 V 424 M 436 80 V 424 M 16 160 H 776 M 16 248 H 776 M 16 336 H 776" stroke="${PURPLE}" stroke-width="2.5"/>
    <text x="36" y="132" font-family="${FONT}" font-size="28" font-weight="bold" fill="${MUTED}">cooking pot</text>
    <text x="246" y="132" font-family="${FONT}" font-size="28" font-weight="bold" fill="${MUTED}">aluminium</text>
    <text x="456" y="132" font-family="${FONT}" font-size="28" font-weight="bold" fill="${MUTED}">It conducts heat.</text>
    <text x="36" y="216" font-family="${FONT}" font-size="34" font-weight="bold" fill="${RULE}">1</text>
    <text x="36" y="304" font-family="${FONT}" font-size="34" font-weight="bold" fill="${RULE}">2</text>
    <text x="36" y="392" font-family="${FONT}" font-size="34" font-weight="bold" fill="${RULE}">3</text>
    <rect x="800" y="16" width="304" height="132" rx="12" fill="#e2f2f6" stroke="${TEAL}" stroke-width="3"/>
    <text x="820" y="54" font-family="${FONT}" font-size="26" font-weight="bold" fill="${TEAL}">Metals</text>
    <text x="820" y="92" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">iron, steel, copper,</text>
    <text x="820" y="128" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">aluminium, gold</text>
    <rect x="800" y="164" width="304" height="260" rx="12" fill="#fdf1e7" stroke="${KEY}" stroke-width="3"/>
    <text x="820" y="202" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">Properties</text>
    <text x="820" y="240" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">strong, shiny,</text>
    <text x="820" y="276" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">malleable, ductile,</text>
    <text x="820" y="312" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">sonorous, magnetic,</text>
    <text x="820" y="348" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">conducts heat,</text>
    <text x="820" y="384" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">conducts electricity</text>
  </svg>`,

  // Put it together: metals beside non-metals, in pictures.
  SUMMARY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="16" y="16" width="396" height="528" rx="14" fill="#e2f2f6" stroke="${TEAL}" stroke-width="3"/>
    <rect x="428" y="16" width="396" height="528" rx="14" fill="#fdf6dc" stroke="#b08a12" stroke-width="3"/>
    <text x="214" y="62" font-family="${FONT}" font-size="34" font-weight="bold" fill="${TEAL}" text-anchor="middle">metals</text>
    <text x="626" y="62" font-family="${FONT}" font-size="34" font-weight="bold" fill="#8a6a00" text-anchor="middle">non-metals</text>
    ${copper(214, 134, 0.85, { shiny: true })}
    ${sulfur(626, 138, 0.95)}
    ${iron(214, 238, 0.85, { flat: true })}
    ${sulfur(626, 232, 0.95, { broken: true })}
    ${bulb(214, 372, 0.6)}
    ${bulbOff(626, 372, 0.6)}
    ${magnet(160, 462, 0.45)}
    ${foodCan(160, 506, 0.32)}
    ${waves(250, 486, 0.95)}
    ${balloon(626, 500, 0.6, '#bfe3f2')}
  </svg>`,
}


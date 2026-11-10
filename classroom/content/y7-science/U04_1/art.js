// content/y7-science/U04_1/art.js
// The pictures of 4.1 Characteristics of living organisms, as SVG strings, in
// the style of 3.5–3.7's art.js (whose colours and helpers this re-exports).
// Flat pale fills, dark ink outlines, NO text: labels are written out
// literally where a picture is used, so `npm run audit:svg` can measure them.
//
// Each picture is drawn about its own centre (0, 0) in a box roughly
// 120 × 120 and placed with (x, y, s).
//
//   The seven (one small picture each, the same everywhere in the deck)
//     paws        Movement      a trail of paw prints
//     cell        Respiration   a cell with food inside, energy coming out
//     eye         Sensitivity   an eye
//     sprouts     Growth        three seedlings, small to tall
//     egg         Reproduction  an egg hatching
//     breath      Excretion     a head breathing out a puff of gas
//     bowl        Nutrition     a bowl of rice with chopsticks
//   Mr Bowen's pet rock
//     rock, calendar
//   The goals
//     plant, magnifier

import { INK, KEY, MUTED, RED, GOLD, BLUE, GREEN, f1 } from '../U03_7/art.js'

export { INK, KEY, MUTED, RED, GOLD, BLUE, GREEN, f1 }
export { plate, arrow, leader, clock, FONT } from '../U03_7/art.js'

const at = (x, y, s, body) => `<g transform="translate(${x} ${y}) scale(${s})">${body}</g>`
const PALE_GREEN = '#dcefcf'
const LEAF = '#5f9e35'
const SOIL = '#a8784f'

/** Movement: a trail of four paw prints, walking up to the right. */
export const paws = (x, y, s = 1) => {
  const paw = (px, py, r) => at(px, py, 1, `<g transform="rotate(${r})">
    <ellipse cx="0" cy="6" rx="11" ry="9" fill="${INK}"/>
    <circle cx="-11" cy="-8" r="4.5" fill="${INK}"/><circle cx="-4" cy="-13" r="4.5" fill="${INK}"/>
    <circle cx="4" cy="-13" r="4.5" fill="${INK}"/><circle cx="11" cy="-8" r="4.5" fill="${INK}"/></g>`)
  return at(x, y, s, `${paw(-44, 40, 35)}${paw(-18, 4, 35)}${paw(18, 26, 35)}${paw(44, -12, 35)}`)
}

/** Respiration: a cell (nucleus inside) with a piece of food, and energy out. */
export const cell = (x, y, s = 1) => at(x, y, s, `
  <ellipse cx="-8" cy="4" rx="46" ry="40" fill="#fdf1dc" stroke="${INK}" stroke-width="4"/>
  <circle cx="-22" cy="-6" r="12" fill="#e7c9ef" stroke="${INK}" stroke-width="3"/>
  <circle cx="2" cy="18" r="10" fill="${KEY}" stroke="${INK}" stroke-width="2.5"/>
  <path d="M 4 10 q 4 -8 10 -8" fill="none" stroke="${LEAF}" stroke-width="3" stroke-linecap="round"/>
  <path d="M 46 -40 L 30 -6 L 44 -6 L 30 26 L 62 -14 L 48 -14 L 60 -40 Z" fill="${GOLD}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`)

/** Sensitivity: an eye. */
export const eye = (x, y, s = 1) => at(x, y, s, `
  <path d="M -52 0 Q 0 -44 52 0 Q 0 44 -52 0 Z" fill="#ffffff" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <circle cx="0" cy="0" r="20" fill="${BLUE}" stroke="${INK}" stroke-width="3"/>
  <circle cx="0" cy="0" r="9" fill="${INK}"/>
  <circle cx="6" cy="-7" r="4" fill="#ffffff"/>
  <path d="M -40 -30 l -8 -12 M -14 -40 l -3 -14 M 14 -40 l 3 -14 M 40 -30 l 8 -12" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`)

/** Growth: three seedlings in a row, small, middle, tall, on one line of soil. */
export const sprouts = (x, y, s = 1) => {
  const one = (px, h) => `<path d="M ${px} 40 L ${px} ${40 - h}" stroke="${LEAF}" stroke-width="4" stroke-linecap="round"/>
    <path d="M ${px} ${40 - h * 0.55} q -${h * 0.35} -${h * 0.05} -${h * 0.42} -${h * 0.32} q ${h * 0.3} -${h * 0.02} ${h * 0.42} ${h * 0.32} Z" fill="${PALE_GREEN}" stroke="${LEAF}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M ${px} ${40 - h * 0.85} q ${h * 0.35} -${h * 0.05} ${h * 0.42} -${h * 0.32} q -${h * 0.3} -${h * 0.02} -${h * 0.42} ${h * 0.32} Z" fill="${PALE_GREEN}" stroke="${LEAF}" stroke-width="3" stroke-linejoin="round"/>`
  return at(x, y, s, `<rect x="-58" y="38" width="116" height="10" rx="4" fill="${SOIL}" stroke="${INK}" stroke-width="2.5"/>
    ${one(-38, 24)}${one(0, 50)}${one(38, 78)}`)
}

/** Reproduction: an egg, cracked open, a chick looking out. */
export const egg = (x, y, s = 1) => at(x, y, s, `
  <path d="M -38 2 C -38 36 -20 50 0 50 C 20 50 38 36 38 2 L 26 10 L 14 -2 L 2 10 L -10 -2 L -22 10 Z" fill="#fbf4e6" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <circle cx="0" cy="-14" r="24" fill="#ffd95a" stroke="${INK}" stroke-width="4"/>
  <circle cx="-8" cy="-20" r="3.5" fill="${INK}"/><circle cx="10" cy="-20" r="3.5" fill="${INK}"/>
  <path d="M -2 -12 L 14 -8 L -2 -4 Z" fill="${KEY}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
  <path d="M -36 -36 L 36 -44" fill="none" stroke="none"/>
  <path d="M -24 -56 C -16 -44 16 -44 26 -58 L 14 -48 L 4 -60 L -6 -48 L -16 -60 Z" fill="#fbf4e6" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`)

/** Excretion: a head in profile, facing right, breathing out a grey puff. */
export const breath = (x, y, s = 1) => at(x, y, s, `
  <path d="M -30 -42 C 6 -46 18 -26 18 -10 L 26 2 L 18 6 C 18 18 14 26 2 26 L -6 26 L -6 44 L -44 44 L -44 14 C -58 -4 -56 -38 -30 -42 Z" fill="#f2c9a5" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <circle cx="2" cy="-16" r="4" fill="${INK}"/>
  <path d="M 12 14 l 8 0" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="40" cy="12" r="10" fill="#e3e7ea" stroke="${MUTED}" stroke-width="3"/>
  <circle cx="58" cy="2" r="13" fill="#e3e7ea" stroke="${MUTED}" stroke-width="3"/>
  <circle cx="58" cy="24" r="11" fill="#e3e7ea" stroke="${MUTED}" stroke-width="3"/>
  <circle cx="74" cy="13" r="12" fill="#e3e7ea" stroke="${MUTED}" stroke-width="3"/>`)

/** Nutrition: a bowl of rice and a pair of chopsticks. */
export const bowl = (x, y, s = 1) => at(x, y, s, `
  <path d="M -40 -40 L 34 6" stroke="#9c6a3c" stroke-width="5" stroke-linecap="round"/>
  <path d="M -30 -48 L 40 0" stroke="#9c6a3c" stroke-width="5" stroke-linecap="round"/>
  <path d="M -42 -2 C -40 -26 40 -26 42 -2 Z" fill="#ffffff" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M -24 -12 l 4 -2 M -8 -16 l 4 -2 M 8 -14 l 4 -2 M 22 -10 l 4 -2 M -14 -6 l 4 -2 M 4 -6 l 4 -2" stroke="#c9c2b2" stroke-width="3" stroke-linecap="round"/>
  <path d="M -50 -2 L 50 -2 C 46 30 26 40 0 40 C -26 40 -46 30 -50 -2 Z" fill="#cfe6f5" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -40 12 L 40 12" stroke="${BLUE}" stroke-width="3"/>
  <rect x="-16" y="40" width="32" height="8" rx="3" fill="#cfe6f5" stroke="${INK}" stroke-width="3"/>`)

/** The seven, in MRS GREN order, so a row of them is always the same row. */
export const SEVEN = [paws, cell, eye, sprouts, egg, breath, bowl]

/** A plain grey rock (Mr Bowen's pet). */
export const rock = (x, y, s = 1) => at(x, y, s, `
  <path d="M -52 30 C -60 6 -44 -26 -14 -32 C 10 -38 40 -28 52 -6 C 62 12 56 30 40 34 L -40 36 C -46 36 -50 34 -52 30 Z" fill="#b9bfc4" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -26 -16 C -14 -24 4 -24 14 -20" fill="none" stroke="#e3e7ea" stroke-width="5" stroke-linecap="round"/>
  <path d="M 18 12 l 10 -6 M -20 16 l 8 4" stroke="#8d959b" stroke-width="3" stroke-linecap="round"/>`)

/** A wall calendar with a red top and two rings (the date is written beside it). */
export const calendar = (x, y, s = 1) => at(x, y, s, `
  <rect x="-40" y="-36" width="80" height="78" rx="8" fill="#ffffff" stroke="${INK}" stroke-width="4"/>
  <path d="M -40 -28 a 8 8 0 0 1 8 -8 L 32 -36 a 8 8 0 0 1 8 8 L 40 -12 L -40 -12 Z" fill="${RED}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <rect x="-24" y="-46" width="8" height="18" rx="3" fill="${MUTED}" stroke="${INK}" stroke-width="2"/>
  <rect x="16" y="-46" width="8" height="18" rx="3" fill="${MUTED}" stroke="${INK}" stroke-width="2"/>
  ${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${-30 + c * 16}" y="${-4 + r * 14}" width="10" height="8" rx="2" fill="#e3e7ea"/>`).join('')).join('')}`)

/** A small plant in a pot (alive). */
export const plant = (x, y, s = 1) => at(x, y, s, `
  <path d="M 0 10 L 0 -46" stroke="${LEAF}" stroke-width="5" stroke-linecap="round"/>
  <path d="M 0 -10 q -30 -2 -40 -28 q 28 -2 40 28 Z" fill="${PALE_GREEN}" stroke="${LEAF}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M 0 -26 q 30 -2 40 -28 q -28 -2 -40 28 Z" fill="${PALE_GREEN}" stroke="${LEAF}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M 0 -42 q -16 -4 -20 -22 q 16 0 20 22 Z" fill="${PALE_GREEN}" stroke="${LEAF}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M -32 8 L 32 8 L 24 52 L -24 52 Z" fill="#d9825b" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <rect x="-36" y="2" width="72" height="12" rx="3" fill="#c96f49" stroke="${INK}" stroke-width="3.5"/>`)

/** A magnifying glass, handle down to the right. */
export const magnifier = (x, y, s = 1) => at(x, y, s, `
  <line x1="24" y1="24" x2="58" y2="58" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
  <circle cx="0" cy="0" r="36" fill="#eaf6fb" fill-opacity="0.55" stroke="${INK}" stroke-width="8"/>
  <path d="M -18 -16 a 24 24 0 0 1 16 -10" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>`)

/** A tick in a green circle, or a cross in a red one, or a wavy "sort of". */
export const mark = (x, y, kind, s = 1) => {
  if (kind === 'yes') return at(x, y, s, `<circle r="20" fill="${GREEN}"/><path d="M -9 0 l 6 7 l 12 -14" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`)
  if (kind === 'no') return at(x, y, s, `<circle r="20" fill="${RED}"/><path d="M -8 -8 l 16 16 M 8 -8 l -16 16" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>`)
  return at(x, y, s, `<circle r="20" fill="${GOLD}"/><path d="M -11 2 q 5.5 -9 11 0 q 5.5 9 11 0" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>`)
}

export const LEAF_GREEN = LEAF
export { f1 as round1 }

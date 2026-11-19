// content/y7-science/U05_1/art.js
// The pictures of 5.1 Metals and non-metals, as SVG strings, in the style of
// the art.js files of 3.5 onwards (whose colours and helpers this re-exports).
// Flat pale fills, dark ink outlines, NO text: labels are written out
// literally where a picture is used, so `npm run audit:svg` can measure them.
//
// Each object is drawn about its own centre (0, 0) and placed with (x, y, s).
//
//   copper, iron   a bar of metal; { shiny, flat } after polishing / hammering
//   sulfur         a dull yellow lump; { broken } after the hammer
//   sparkle        a four-point glint
//   waves          three sound arcs (a ring), opening to the right
//   magnet         a horseshoe magnet, its poles pointing down
//   drinkCan       an aluminium drink can (blue band)
//   foodCan        a steel food can (ridges, a paper label)
//   bottle         a glass bottle
//   spoon          a metal spoon, bowl at the top
//   hammer         a hammer, head at the top
//   pan            a frying pan side-on, handle to the right; handle 'metal' | 'wood'
//   egg            a fried egg seen from above
//   mitt           an oven glove
//   bulbOff        a light bulb, switched off
//   beam           a steel I-beam, end-on

import { INK, KEY, MUTED, RED, GOLD, BLUE, GREEN, TEAL, PURPLE, f1, arrow, leader, plate, FONT, bulb, clock } from '../U03_5/art.js'
import { flame, burner } from '../U03_6/art.js'

export { INK, KEY, MUTED, RED, GOLD, BLUE, GREEN, TEAL, PURPLE, f1, arrow, leader, plate, FONT, bulb, clock, flame, burner }
export const RULE = '#d5dbe1'
export const COPPER = '#d9824a'
export const COPPER_DARK = '#a95a2a'
export const IRON = '#a3acb4'
export const SULFUR = '#f2d33a'
export const SULFUR_DARK = '#c9a81a'
export const STEEL = '#c3c9d1'

const at = (x, y, s, body) => `<g transform="translate(${x} ${y}) scale(${s})">${body}</g>`
export { at }

/** A four-point glint, centre (x, y), radius r. */
export const sparkle = (x, y, r = 16) => `<path d="M ${x} ${y - r} Q ${x + r * 0.18} ${y - r * 0.18} ${x + r} ${y} Q ${x + r * 0.18} ${y + r * 0.18} ${x} ${y + r} Q ${x - r * 0.18} ${y + r * 0.18} ${x - r} ${y} Q ${x - r * 0.18} ${y - r * 0.18} ${x} ${y - r} Z" fill="#fff6c8" stroke="${GOLD}" stroke-width="2.5" stroke-linejoin="round"/>`

// A bar of metal: rounded block, or hammered flat (wider, thinner).
const bar = (fill, edge, { shiny = false, flat = false } = {}) => {
  const body = flat
    ? `<path d="M -128 -10 Q -136 0 -128 12 L 128 12 Q 136 0 128 -10 Z" fill="${fill}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
       <path d="M -120 6 H 120" stroke="${edge}" stroke-width="4" opacity="0.6"/>`
    : `<rect x="-92" y="-28" width="184" height="56" rx="10" fill="${fill}" stroke="${INK}" stroke-width="4"/>
       <path d="M -84 18 H 84" stroke="${edge}" stroke-width="5" opacity="0.6"/>`
  const glint = shiny
    ? (flat
      ? `<path d="M -90 -2 H -40 M -20 -2 H 0" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>`
      : `<path d="M -70 -14 H -20 M 0 -14 H 18" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>`) +
      sparkle(flat ? 108 : 78, flat ? -30 : -40, 18) + sparkle(flat ? -112 : -84, flat ? 28 : 40, 11)
    : ''
  return body + glint
}
export const copper = (x, y, s = 1, opts = {}) => at(x, y, s, bar(COPPER, COPPER_DARK, opts))
export const iron = (x, y, s = 1, opts = {}) => at(x, y, s, bar(IRON, '#6f7a84', opts))

/** A dull yellow lump of sulfur, or (broken) the pieces after one hit. */
export const sulfur = (x, y, s = 1, { broken = false } = {}) => at(x, y, s, broken
  ? `<path d="M -96 22 L -84 4 L -62 10 L -66 26 Z" fill="${SULFUR}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
     <path d="M -50 26 L -40 -2 L -12 -8 L -6 18 Z" fill="${SULFUR}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
     <path d="M 4 24 L 14 6 L 36 2 L 42 22 Z" fill="${SULFUR}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
     <path d="M 52 26 L 60 12 L 80 14 L 78 28 Z" fill="${SULFUR}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
     <path d="M 90 26 L 98 16 L 112 22 L 106 30 Z" fill="${SULFUR}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
     <path d="M -24 -30 L -16 -42 L -4 -36 L -10 -26 Z" fill="${SULFUR}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
     <path d="M 30 -24 L 40 -34 L 50 -26 L 42 -18 Z" fill="${SULFUR}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
     ${[[-110, 30], [-30, 30], [-20, 32], [48, 32], [86, 32], [-76, 32], [20, 31], [118, 31]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="3" fill="${SULFUR_DARK}"/>`).join('')}`
  : `<path d="M -78 26 L -88 -4 L -60 -34 L -14 -42 L 30 -32 L 70 -38 L 90 -6 L 72 24 L 10 32 Z" fill="${SULFUR}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
     ${[[-50, -6], [-20, 10], [12, -14], [44, 6], [62, -18], [-64, 12]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="4.5" fill="${SULFUR_DARK}"/>`).join('')}`)

/** Three sound arcs opening to the right, from (x, y). */
export const waves = (x, y, s = 1, color = BLUE) => at(x, y, s, [18, 34, 50].map((r) =>
  `<path d="M ${f1(r * Math.cos(-0.8))} ${f1(r * Math.sin(-0.8))} A ${r} ${r} 0 0 1 ${f1(r * Math.cos(0.8))} ${f1(r * Math.sin(0.8))}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>`).join(''))

/** A horseshoe magnet, poles pointing down; about 150 wide, 150 tall. */
export const magnet = (x, y, s = 1) => at(x, y, s, `
  <path d="M -50 66 V 0 A 50 50 0 0 1 50 0 V 66" fill="none" stroke="${INK}" stroke-width="42"/>
  <path d="M -50 66 V 0 A 50 50 0 0 1 50 0 V 66" fill="none" stroke="${RED}" stroke-width="34"/>
  <rect x="-68" y="46" width="36" height="30" fill="${STEEL}" stroke="${INK}" stroke-width="4"/>
  <rect x="32" y="46" width="36" height="30" fill="${STEEL}" stroke="${INK}" stroke-width="4"/>`)

/** An aluminium drink can, about 76 wide and 130 tall. */
export const drinkCan = (x, y, s = 1) => at(x, y, s, `
  <path d="M -36 -54 Q -38 -64 -28 -66 H 28 Q 38 -64 36 -54 V 54 Q 38 64 28 66 H -28 Q -38 64 -36 54 Z" fill="#dfe4e8" stroke="${INK}" stroke-width="4"/>
  <rect x="-36" y="-30" width="72" height="56" fill="${BLUE}"/>
  <path d="M -36 -30 H 36 M -36 26 H 36" stroke="${INK}" stroke-width="3"/>
  <path d="M -22 -50 V 50" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.8"/>
  <ellipse cx="0" cy="-62" rx="26" ry="4" fill="none" stroke="${MUTED}" stroke-width="2.5"/>`)

/** A steel food can, about 84 wide and 110 tall. */
export const foodCan = (x, y, s = 1) => at(x, y, s, `
  <rect x="-42" y="-55" width="84" height="110" rx="6" fill="${IRON}" stroke="${INK}" stroke-width="4"/>
  <rect x="-42" y="-30" width="84" height="60" fill="#f2b632" stroke="${INK}" stroke-width="3"/>
  <path d="M -42 -44 H 42 M -42 44 H 42" stroke="#6f7a84" stroke-width="3"/>
  <circle cx="0" cy="0" r="14" fill="${RED}" stroke="${INK}" stroke-width="2.5"/>`)

/** A glass bottle, about 70 wide and 230 tall, its base at y = 115. */
export const bottle = (x, y, s = 1) => at(x, y, s, `
  <path d="M -12 -115 H 12 V -70 Q 12 -54 30 -38 Q 36 -30 36 -14 V 105 Q 36 115 26 115 H -26 Q -36 115 -36 105 V -14 Q -36 -30 -30 -38 Q -12 -54 -12 -70 Z" fill="#d6efe0" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <rect x="-14" y="-122" width="28" height="12" rx="3" fill="#8fc7a5" stroke="${INK}" stroke-width="3"/>
  <path d="M -22 -14 V 90" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>`)

/** A metal spoon, bowl at the top; about 40 wide and 170 tall. */
export const spoon = (x, y, s = 1, rot = 0) => at(x, y, s, `<g transform="rotate(${rot})">
  <ellipse cx="0" cy="-58" rx="22" ry="30" fill="${STEEL}" stroke="${INK}" stroke-width="4"/>
  <path d="M -5 -30 L -7 82 Q 0 90 7 82 L 5 -30 Z" fill="${STEEL}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -10 -70 Q -8 -80 0 -82" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round"/></g>`)

/** A hammer, head at the top, handle down; about 120 wide and 200 tall. */
export const hammer = (x, y, s = 1, rot = 0) => at(x, y, s, `<g transform="rotate(${rot})">
  <rect x="-10" y="-60" width="20" height="160" rx="8" fill="#b5835a" stroke="${INK}" stroke-width="4"/>
  <path d="M -60 -96 H 50 Q 62 -96 62 -84 V -60 Q 62 -48 50 -48 H -60 Q -66 -72 -60 -96 Z" fill="${MUTED}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -48 -86 H 44" stroke="#9aa5ae" stroke-width="5" stroke-linecap="round"/></g>`)

/** A frying pan side-on, handle to the right. Origin: the middle of the pan's base. */
export const pan = (x, y, s = 1, handle = 'metal', rot = 0) => at(x, y, s, `<g transform="rotate(${rot})">
  <path d="M -96 -34 H 96 L 80 0 Q 76 6 68 6 H -68 Q -76 6 -80 0 Z" fill="${STEEL}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -80 -18 H 80" stroke="#9aa5ae" stroke-width="4"/>
  <path d="M 92 -26 L 196 -48 Q 206 -50 207 -40 Q 208 -32 198 -30 L 96 -14 Z" fill="${handle === 'wood' ? '#b5835a' : STEEL}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/></g>`)

/** A fried egg from above, about 90 wide. */
export const egg = (x, y, s = 1) => at(x, y, s, `
  <path d="M -44 0 Q -46 -24 -18 -26 Q 6 -38 28 -22 Q 50 -12 42 10 Q 34 30 4 28 Q -38 30 -44 0 Z" fill="#ffffff" stroke="${INK}" stroke-width="3.5"/>
  <circle cx="0" cy="0" r="14" fill="#f2b632" stroke="${INK}" stroke-width="3"/>`)

/** An oven glove, cuff at the bottom; about 70 wide and 100 tall. */
export const mitt = (x, y, s = 1, rot = 0) => at(x, y, s, `<g transform="rotate(${rot})">
  <path d="M -26 46 V -20 Q -26 -50 4 -50 Q 32 -50 32 -20 V 46 Z" fill="${RED}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -26 0 Q -50 -4 -46 -22 Q -42 -34 -26 -26" fill="${RED}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <rect x="-30" y="34" width="66" height="22" rx="5" fill="#ffffff" stroke="${INK}" stroke-width="4"/>
  <path d="M -10 -30 V 20 M 12 -30 V 20" stroke="#f5b7b1" stroke-width="5" stroke-linecap="round"/></g>`)

/** A light bulb, switched off (the shape of 3.5's bulb, without its rays). */
export const bulbOff = (x, y, s = 1) => at(x, y, s, `
  <path d="M 0 -84 C -48 -84 -60 -34 -36 -4 C -26 10 -22 20 -22 34 L 22 34 C 22 20 26 10 36 -4 C 60 -34 48 -84 0 -84 Z" fill="#eef1f4" stroke="${INK}" stroke-width="4"/>
  <path d="M -12 30 L -12 -12 L -4 -26 L 4 -12 L 12 -26 L 12 30" fill="none" stroke="${MUTED}" stroke-width="3.5" stroke-linejoin="round"/>
  <rect x="-24" y="34" width="48" height="34" rx="5" fill="#c3c9d1" stroke="${INK}" stroke-width="3.5"/>
  <path d="M -24 46 H 24 M -24 56 H 24" stroke="${INK}" stroke-width="2.5"/>`)

/** A steel I-beam end-on, about 120 wide and 140 tall. */
export const beam = (x, y, s = 1) => at(x, y, s, `
  <path d="M -60 -70 H 60 V -48 H 14 V 48 H 60 V 70 H -60 V 48 H -14 V -48 H -60 Z" fill="${IRON}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -52 -60 H 52" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.8"/>`)

/** A tick or a cross in a circle. */
export const mark = (x, y, ok, s = 1) => at(x, y, s, ok
  ? `<circle cx="0" cy="0" r="22" fill="${GREEN}"/><path d="M -10 1 l 7 8 l 14 -16" stroke="#ffffff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
  : `<circle cx="0" cy="0" r="22" fill="${RED}"/><path d="M -8 -8 l 16 16 M 8 -8 l -16 16" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>`)

// content/y7-science/U04_2/art.js
// The pictures of 4.2 Viruses, as SVG strings, in the style of 4.1's art.js
// (whose colours, helpers and the seven icons this re-exports). Flat pale
// fills, dark ink outlines, NO text: labels are written out literally where a
// picture is used, so `npm run audit:svg` can measure them.
//
// Each picture is drawn about its own centre (0, 0) and placed with (x, y, s).
//
//   virus        a flu virus cut open, in the colours of the book's photo
//                (page 131): a blue-green protein coat, pegs on the outside,
//                orange RNA inside. Coat radius 42, pegs out to 59.
//   cellBlob     one animal cell: membrane, cytoplasm, nucleus
//   jar          a glass jar with a lid and a blank label (Mr Bowen's pet)
//   spottedPlant 4.1's plant with the pale patches of a plant virus
//   student      a student at a desk, from the front (Be the cell)
//   paper        a sheet with a small virus drawn on it

import { INK, KEY, MUTED, RED, GOLD, BLUE, GREEN, f1, SEVEN, mark, magnifier, plant, bowl, calendar } from '../U04_1/art.js'

export { INK, KEY, MUTED, RED, GOLD, BLUE, GREEN, f1, SEVEN, mark, magnifier, plant, bowl, calendar }
export { plate, arrow, leader, FONT } from '../U04_1/art.js'

const at = (x, y, s, body) => `<g transform="translate(${x} ${y}) scale(${s})">${body}</g>`

// The book's photograph (page 131): blue-green coat, orange RNA inside.
export const COAT = '#2f9a8c'
export const COAT_FILL = '#9fd8cf'
export const RNA = '#e8792b'
export const CYTO = '#fdf1dc'
export const NUCLEUS = '#e7c9ef'
const INSIDE = '#fffaf2'
const LEAF = '#5f9e35'
const SPOT = '#f3df3c'
const SICK_LEAF = '#a9d18e'

/** The pegs: `n` short stalks with a knob, round a coat of radius r. */
export const pegs = (n = 14, r = 42, len = 13, turn = 0) => Array.from({ length: n }, (_, i) => {
  const a = ((i / n) * 360 + turn) * Math.PI / 180
  const c = Math.cos(a), s = Math.sin(a)
  return `<line x1="${f1(r * c)}" y1="${f1(r * s)}" x2="${f1((r + len) * c)}" y2="${f1((r + len) * s)}" stroke="${COAT}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="${f1((r + len + 3) * c)}" cy="${f1((r + len + 3) * s)}" r="5.5" fill="${COAT}" stroke="${INK}" stroke-width="1.5"/>`
}).join('')

/** Pegs on part of the coat only, from angle `from` to `to` (degrees). */
export const pegArc = (from, to, n, r = 42, len = 13) => Array.from({ length: n }, (_, i) => {
  const a = (from + ((to - from) * i) / Math.max(1, n - 1)) * Math.PI / 180
  const c = Math.cos(a), s = Math.sin(a)
  return `<line x1="${f1(r * c)}" y1="${f1(r * s)}" x2="${f1((r + len) * c)}" y2="${f1((r + len) * s)}" stroke="${COAT}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="${f1((r + len + 3) * c)}" cy="${f1((r + len + 3) * s)}" r="5.5" fill="${COAT}" stroke="${INK}" stroke-width="1.5"/>`
}).join('')

/** The RNA inside: three orange threads. */
export const rnaThreads = (color = RNA) => `
  <path d="M -20 -12 q 6 -10 12 0 t 12 0 t 12 0" fill="none" stroke="${color}" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M -22 4 q 6 -10 12 0 t 12 0 t 12 0 t 10 -2" fill="none" stroke="${color}" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M -14 19 q 6 -10 12 0 t 12 0 t 10 0" fill="none" stroke="${color}" stroke-width="4.5" stroke-linecap="round"/>`

/** A flu virus, cut open: pegs, a blue-green protein coat, orange RNA. */
export const virus = (x, y, s = 1, turn = 0) => at(x, y, s, `
  ${pegs(14, 42, 13, turn)}
  <circle r="42" fill="${COAT_FILL}" stroke="${INK}" stroke-width="3.5"/>
  <circle r="31" fill="${INSIDE}" stroke="${INK}" stroke-width="3"/>
  ${rnaThreads()}`)

/** One animal cell: membrane, cytoplasm and a nucleus. */
export const cellBlob = (x, y, s = 1) => at(x, y, s, `
  <path d="M -96 -10 C -100 -62 -40 -84 10 -78 C 66 -72 104 -40 98 6 C 92 58 40 82 -12 78 C -64 74 -92 40 -96 -10 Z" fill="${CYTO}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <circle cx="-14" cy="-4" r="28" fill="${NUCLEUS}" stroke="${INK}" stroke-width="4"/>
  <circle cx="-6" cy="-10" r="7" fill="#c9a2d6"/>`)

/** A glass jar with a lid (and a blank label unless label = false); its bottom is at y = 56. */
export const jar = (x, y, s = 1, label = true) => at(x, y, s, `
  <rect x="-46" y="-58" width="92" height="114" rx="16" fill="#eaf6fb" stroke="${INK}" stroke-width="4"/>
  <rect x="-40" y="-76" width="80" height="20" rx="5" fill="#9aa5ae" stroke="${INK}" stroke-width="3"/>
  <path d="M -32 -44 v 82" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>
  ${label ? `<rect x="-28" y="-18" width="62" height="34" rx="4" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>` : ''}`)

/** 4.1's plant in a pot, its leaves blotched pale by a plant virus. */
export const spottedPlant = (x, y, s = 1) => at(x, y, s, `
  <path d="M 0 10 L 0 -46" stroke="${LEAF}" stroke-width="5" stroke-linecap="round"/>
  <path d="M 0 -10 q -30 -2 -40 -28 q 28 -2 40 28 Z" fill="${SICK_LEAF}" stroke="${LEAF}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M 0 -26 q 30 -2 40 -28 q -28 -2 -40 28 Z" fill="${SICK_LEAF}" stroke="${LEAF}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M 0 -42 q -16 -4 -20 -22 q 16 0 20 22 Z" fill="${SICK_LEAF}" stroke="${LEAF}" stroke-width="3" stroke-linejoin="round"/>
  <ellipse cx="-26" cy="-27" rx="9" ry="6" fill="${SPOT}" stroke="#a88f12" stroke-width="1.5" transform="rotate(35 -26 -27)"/>
  <ellipse cx="-12" cy="-16" rx="6" ry="5" fill="${SPOT}" stroke="#a88f12" stroke-width="1.5"/>
  <ellipse cx="24" cy="-43" rx="9" ry="6" fill="${SPOT}" stroke="#a88f12" stroke-width="1.5" transform="rotate(-35 24 -43)"/>
  <ellipse cx="11" cy="-32" rx="6" ry="5" fill="${SPOT}" stroke="#a88f12" stroke-width="1.5"/>
  <ellipse cx="-11" cy="-55" rx="5" ry="4" fill="${SPOT}" stroke="#a88f12" stroke-width="1.5"/>
  <path d="M -32 8 L 32 8 L 24 52 L -24 52 Z" fill="#d9825b" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <rect x="-36" y="2" width="72" height="12" rx="3" fill="#c96f49" stroke="${INK}" stroke-width="3.5"/>`)

/** A student at a desk, seen from the front, writing (or head down, asleep). */
export const student = (x, y, s = 1, shirt = BLUE, down = false) => at(x, y, s, down ? `
  <path d="M -34 6 C -34 -24 34 -24 34 6 Z" fill="${shirt}" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="0" cy="0" rx="22" ry="17" fill="#2f2420" stroke="${INK}" stroke-width="3"/>
  <path d="M -44 4 h 88" stroke="${INK}" stroke-width="3"/>` : `
  <path d="M -34 6 C -34 -26 34 -26 34 6 Z" fill="${shirt}" stroke="${INK}" stroke-width="3"/>
  <circle cx="0" cy="-36" r="17" fill="#f2c9a5" stroke="${INK}" stroke-width="3"/>
  <path d="M -17 -40 C -16 -58 16 -58 17 -40 C 8 -48 -8 -48 -17 -40 Z" fill="#2f2420"/>
  <circle cx="-6" cy="-34" r="2.5" fill="${INK}"/><circle cx="6" cy="-34" r="2.5" fill="${INK}"/>`)

/** A sheet of paper with a small virus drawn on it. */
export const paper = (x, y, s = 1, r = 0) => at(x, y, s, `<g transform="rotate(${r})">
  <rect x="-22" y="-26" width="44" height="52" rx="3" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
  ${virus(0, 0, 0.3)}</g>`)

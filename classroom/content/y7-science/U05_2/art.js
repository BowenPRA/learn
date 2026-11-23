// content/y7-science/U05_2/art.js
// The pictures of 5.2 Comparing metals and non-metals, as SVG strings. It
// re-exports 5.1's art (copper, iron, sulfur, the hammer, the bulbs, …) and
// adds the test circuit and the things on a student's desk. Flat pale fills,
// dark ink outlines, NO text: labels are written out literally where a
// picture is used, so `npm run audit:svg` can measure them.
//
// Each object is drawn about its own centre (0, 0) and placed with (x, y, s).
//
//   cell           a 1.5 V cell lying on its side, + end on the right
//   clip           a crocodile clip, jaws pointing right (dir 1) or left (-1)
//   circuit        the whole test circuit of page 159, in a 640 × 380 frame:
//                  cell at the top, lamp bottom left, two clips and a gap
//                  bottom right. GAP is where a test material sits.
//   paperClip, eraser, coin, ruler, foilStrip, pencil, pencilLead, key,
//   nail, spoonFlat  the things tested in the circuit, lying flat, about
//                  110 wide, so the two clips bite their ends
//   cube, drop, cloud  a solid, a liquid and a gas
//   thermo         a thermometer, bulb at the bottom
//   lens           a magnifying glass, handle down to the right

import {
  INK, KEY, MUTED, RED, GOLD, BLUE, GREEN, TEAL, PURPLE, f1, arrow, leader, plate, FONT, bulb, clock,
  flame, burner, RULE, COPPER, COPPER_DARK, IRON, SULFUR, SULFUR_DARK, STEEL, at,
  sparkle, copper, iron, sulfur, waves, magnet, drinkCan, foodCan, bottle, spoon, hammer, pan, egg, mitt, bulbOff, beam, mark,
} from '../U05_1/art.js'

export {
  INK, KEY, MUTED, RED, GOLD, BLUE, GREEN, TEAL, PURPLE, f1, arrow, leader, plate, FONT, bulb, clock,
  flame, burner, RULE, COPPER, COPPER_DARK, IRON, SULFUR, SULFUR_DARK, STEEL, at,
  sparkle, copper, iron, sulfur, waves, magnet, drinkCan, foodCan, bottle, spoon, hammer, pan, egg, mitt, bulbOff, beam, mark,
}

export const WIRE = '#d83a2e'
export const GRAPHITE = '#4a4f55'

/** A 1.5 V cell on its side, + end on the right; about 150 wide, 56 tall. */
export const cell = (x, y, s = 1) => at(x, y, s, `
  <rect x="-72" y="-26" width="136" height="52" rx="8" fill="${BLUE}" stroke="${INK}" stroke-width="4"/>
  <rect x="-72" y="-26" width="38" height="52" rx="8" fill="${GOLD}" stroke="${INK}" stroke-width="4"/>
  <rect x="64" y="-11" width="12" height="22" rx="3" fill="${STEEL}" stroke="${INK}" stroke-width="3.5"/>
  <path d="M 10 -14 V 14 M -4 0 H 24" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity="0.9"/>
  <path d="M -26 -14 H 54" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.35"/>`)

/** A crocodile clip, about 74 long, its jaws' tip at (0, 0) pointing in `dir`. */
export const clip = (x, y, s = 1, dir = 1) => at(x, y, s, `<g transform="scale(${dir} 1)">
  <path d="M -74 -12 H -34 L 0 -4 L -2 2 L -34 2 H -74 Z" fill="#9aa5ae" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M -74 4 H -34 L -2 6 L 0 12 L -34 16 H -74 Z" fill="#9aa5ae" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M -24 -6 l 4 6 l 4 -6 l 4 6 l 4 -6 M -24 10 l 4 -6 l 4 6 l 4 -6 l 4 6" fill="none" stroke="${INK}" stroke-width="2"/>
  <rect x="-96" y="-14" width="26" height="32" rx="6" fill="${WIRE}" stroke="${INK}" stroke-width="3.5"/></g>`)

// The test circuit's frame (640 × 380) and where its parts sit in it.
export const CIRCUIT_W = 640
export const CIRCUIT_H = 380
export const GAP = { x: 390, y: 300 } // the middle of the gap between the clips
export const LAMP = { x: 170, y: 300 } // the lamp's base, on the bottom wire
export const CELL = { x: 320, y: 64 }

/**
 * The test circuit of page 159, its top-left corner at (x, y), scaled by s.
 * `lit` lights the lamp. `clipsTouch` closes the gap (the clips on each
 * other, the "check the lamp first" picture). The test material is drawn by
 * the caller, centred on GAP.
 */
export const circuit = (x, y, s = 1, { lit = false, clipsTouch = false } = {}) => {
  const L = 54, R = 586, T = CELL.y, B = 300, r = 46
  const tipA = clipsTouch ? GAP.x - 2 : GAP.x - 44
  const tipB = clipsTouch ? GAP.x + 2 : GAP.x + 44
  const lampW = 22 // half the lamp holder's width
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M ${CELL.x - 66} ${T} H ${L + r} Q ${L} ${T} ${L} ${T + r} V ${B - r} Q ${L} ${B} ${L + r} ${B} H ${LAMP.x - lampW}" fill="none" stroke="${WIRE}" stroke-width="7" stroke-linecap="round"/>
    <path d="M ${LAMP.x + lampW} ${B} H ${tipA - 96}" fill="none" stroke="${WIRE}" stroke-width="7" stroke-linecap="round"/>
    <path d="M ${tipB + 96} ${B} H ${R - r} Q ${R} ${B} ${R} ${B - r} V ${T + r} Q ${R} ${T} ${R - r} ${T} H ${CELL.x + 70}" fill="none" stroke="${WIRE}" stroke-width="7" stroke-linecap="round"/>
    ${cell(CELL.x, T, 1)}
    <rect x="${LAMP.x - 30}" y="${B - 12}" width="60" height="24" rx="6" fill="#dfe4e8" stroke="${INK}" stroke-width="3.5"/>
    ${lit ? bulb(LAMP.x, B - 58, 0.62) : bulbOff(LAMP.x, B - 58, 0.62)}
    ${clip(tipA, B, 1, 1)}
    ${clip(tipB, B, 1, -1)}
  </g>`
}

/* ── the things on a desk, lying flat, about 110 wide ───────────────────── */

export const paperClip = (x, y, s = 1) => at(x, y, s, `
  <path d="M -40 10 H 44 A 14 14 0 0 0 44 -18 H -50 A 18 18 0 0 0 -50 18 H 36 A 8 8 0 0 0 36 2 H -34" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M -40 10 H 44 A 14 14 0 0 0 44 -18 H -50 A 18 18 0 0 0 -50 18 H 36 A 8 8 0 0 0 36 2 H -34" fill="none" stroke="#b8c2cb" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`)

export const eraser = (x, y, s = 1) => at(x, y, s, `
  <rect x="-52" y="-20" width="104" height="40" rx="8" fill="#f6a7b8" stroke="${INK}" stroke-width="4"/>
  <rect x="-18" y="-20" width="70" height="40" rx="2" fill="#7fb8e0" stroke="${INK}" stroke-width="3"/>
  <path d="M -44 -10 H -26" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.8"/>`)

export const coin = (x, y, s = 1) => at(x, y, s, `
  <circle cx="0" cy="0" r="44" fill="#e9c46a" stroke="${INK}" stroke-width="4"/>
  <circle cx="0" cy="0" r="32" fill="none" stroke="#b88a1e" stroke-width="3"/>
  <path d="M -16 -22 Q -6 -30 6 -28" stroke="#ffffff" stroke-width="5" fill="none" stroke-linecap="round"/>`)

export const ruler = (x, y, s = 1) => at(x, y, s, `
  <rect x="-62" y="-18" width="124" height="36" rx="4" fill="#bfe3f2" fill-opacity="0.9" stroke="${INK}" stroke-width="4"/>
  ${[-50, -38, -26, -14, -2, 10, 22, 34, 46].map((dx, i) => `<line x1="${dx}" y1="-18" x2="${dx}" y2="${i % 2 ? -8 : -2}" stroke="${INK}" stroke-width="2.5"/>`).join('')}`)

export const foilStrip = (x, y, s = 1) => at(x, y, s, `
  <path d="M -58 -14 L -40 -20 L -24 -12 L -6 -20 L 12 -12 L 30 -19 L 50 -13 L 58 -2 L 52 14 L 32 20 L 14 12 L -4 20 L -22 13 L -40 20 L -56 12 Z" fill="#dfe4e8" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M -40 -6 L -24 0 L -6 -8 M 12 2 L 30 -6 L 44 0" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
  <path d="M -22 8 L -6 4 M 22 8 L 38 4" fill="none" stroke="#9aa5ae" stroke-width="2.5" stroke-linecap="round"/>`)

/** A wooden pencil, painted yellow, point to the right. */
export const pencil = (x, y, s = 1) => at(x, y, s, `
  <rect x="-62" y="-12" width="22" height="24" rx="3" fill="#f6a7b8" stroke="${INK}" stroke-width="3"/>
  <rect x="-42" y="-12" width="14" height="24" fill="#c3c9d1" stroke="${INK}" stroke-width="3"/>
  <path d="M -28 -12 H 40 L 62 0 L 40 12 H -28 Z" fill="#f2c230" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M 40 -12 L 62 0 L 40 12 Z" fill="#e6c89a" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M 54 -4 L 62 0 L 54 4 Z" fill="${GRAPHITE}"/>
  <path d="M -26 -3 H 36" stroke="#d9a514" stroke-width="3"/>`)

/** A stick of pencil lead (graphite), as from a mechanical pencil. */
export const pencilLead = (x, y, s = 1) => at(x, y, s, `
  <rect x="-60" y="-7" width="120" height="14" rx="7" fill="${GRAPHITE}" stroke="${INK}" stroke-width="3"/>
  <path d="M -50 -2 H 40" stroke="#8a9098" stroke-width="3" stroke-linecap="round"/>`)

/** A brass key, bow on the left. */
export const key = (x, y, s = 1) => at(x, y, s, `
  <circle cx="-36" cy="0" r="24" fill="#e0b04a" stroke="${INK}" stroke-width="4"/>
  <circle cx="-36" cy="0" r="9" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
  <path d="M -14 -7 H 58 V 7 H 46 V 18 H 38 V 7 H 30 V 15 H 22 V 7 H -14 Z" fill="#e0b04a" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`)

/** An iron nail, head on the left. */
export const nail = (x, y, s = 1) => at(x, y, s, `
  <rect x="-58" y="-16" width="10" height="32" rx="3" fill="${IRON}" stroke="${INK}" stroke-width="3.5"/>
  <path d="M -48 -6 H 44 L 60 0 L 44 6 H -48 Z" fill="${IRON}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M -42 -2 H 36" stroke="#ffffff" stroke-width="2.5" opacity="0.8"/>`)

/** A metal spoon lying flat, bowl on the left. */
export const spoonFlat = (x, y, s = 1) => at(x, y, s, `
  <ellipse cx="-36" cy="0" rx="26" ry="18" fill="${STEEL}" stroke="${INK}" stroke-width="4"/>
  <path d="M -10 -4 L 60 -5 Q 66 0 60 5 L -10 4 Z" fill="${STEEL}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M -50 -6 Q -40 -12 -28 -10" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round"/>`)

/* ── solid, liquid, gas ──────────────────────────────────────────────────── */

/** A solid: a block. About 80 across. */
export const cube = (x, y, s = 1, fill = '#c3c9d1') => at(x, y, s, `
  <path d="M -36 -18 L 0 -36 L 36 -18 L 36 22 L 0 40 L -36 22 Z" fill="${fill}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -36 -18 L 0 0 L 36 -18 M 0 0 V 40" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`)

/** A liquid: a drop. About 60 wide, 84 tall. */
export const drop = (x, y, s = 1, fill = '#9fd3ee') => at(x, y, s, `
  <path d="M 0 -44 C 12 -24 30 -6 30 14 A 30 30 0 0 1 -30 14 C -30 -6 -12 -24 0 -44 Z" fill="${fill}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -14 8 Q -16 22 -6 30" stroke="#ffffff" stroke-width="5" fill="none" stroke-linecap="round"/>`)

/** A gas: a cloud of particles. About 100 wide. */
export const cloud = (x, y, s = 1, fill = '#e6eef5') => at(x, y, s, `
  <path d="M -40 18 A 22 22 0 0 1 -34 -16 A 26 26 0 0 1 10 -30 A 24 24 0 0 1 46 -6 A 20 20 0 0 1 40 24 Z" fill="${fill}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  ${[[-18, 2], [6, -12], [22, 8], [-2, 14]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="5" fill="${MUTED}"/>`).join('')}`)

/** A thermometer, bulb at the bottom, from (x, top) to (x, bottom). `level` is the y of the red line's top. */
export const thermo = (x, top, bottom, level) => `
  <rect x="${x - 16}" y="${top}" width="32" height="${bottom - top}" rx="16" fill="#ffffff" stroke="${INK}" stroke-width="4"/>
  <circle cx="${x}" cy="${bottom + 14}" r="26" fill="${RED}" stroke="${INK}" stroke-width="4"/>
  <rect x="${x - 7}" y="${level}" width="14" height="${bottom + 4 - level}" fill="${RED}"/>`

/** A magnifying glass, its lens centred at (x, y), handle down to the right. */
export const lens = (x, y, s = 1) => at(x, y, s, `
  <path d="M 44 44 L 96 96" stroke="#7a5233" stroke-width="20" stroke-linecap="round"/>
  <path d="M 44 44 L 96 96" stroke="#b5835a" stroke-width="13" stroke-linecap="round"/>
  <circle cx="0" cy="0" r="58" fill="#e8f4fb" fill-opacity="0.55" stroke="${INK}" stroke-width="10"/>
  <circle cx="0" cy="0" r="58" fill="none" stroke="#9aa5ae" stroke-width="5"/>
  <path d="M -30 -26 Q -20 -40 -2 -42" stroke="#ffffff" stroke-width="7" fill="none" stroke-linecap="round"/>`)

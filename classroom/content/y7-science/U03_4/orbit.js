// content/y7-science/U03_4/orbit.js
// The arithmetic behind the three top-view tide models (SpinEarth, HighOrLow,
// LineThemUp). Angles are degrees measured ANTICLOCKWISE on the screen from
// "towards the right": seen from above the North Pole, that is the way the
// Earth spins and the Moon goes round.
//
// The tide here is the simplest model there is (the book's): two bulges of
// water, one towards the Moon and one on the far side, with a bulge half that
// size for the Sun. Mr Bowen's harbour has a 4 m range on an ordinary day
// (6 m deep at high tide, 2 m at low tide), 6 m when the Sun and the Moon are
// in line and 2 m when they are at right angles. Real coasts differ (plan.js).

export const SEA = '#cfe6f5'
export const SEA_EDGE = '#5b9bd5'

export const rad = (deg) => (deg * Math.PI) / 180

/** A point at distance r from (cx, cy), `deg` anticlockwise from the right. */
export function at(cx, cy, r, deg) {
  return [cx + r * Math.cos(rad(deg)), cy - r * Math.sin(rad(deg))]
}

/** The ocean's edge: radius R plus a bulge of `amp` towards each pull's
 *  direction and the opposite side. pulls = [{ deg, amp }]. */
export function oceanPath(cx, cy, R, pulls) {
  const pts = []
  for (let a = 0; a < 360; a += 3) {
    const r = R + pulls.reduce((s, p) => s + p.amp * Math.cos(2 * rad(a - p.deg)), 0)
    const [x, y] = at(cx, cy, r, a)
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return `M ${pts.join(' L ')} Z`
}

/** Depth at Mr Bowen's harbour, in metres, when it is `deg` from the Moon. */
export const harbourDepth = (deg) => 4 + 2 * Math.cos(2 * rad(deg))

/** The tidal range at Mr Bowen's harbour when the Moon is `elong` degrees
 *  from the Sun: the Moon's tide plus a Sun's tide half its size. 6 m in line,
 *  2 m at right angles. */
export const monthRange = (elong) => 4 * Math.sqrt(1.25 + Math.cos(2 * rad(elong)))

export const SYNODIC = 29.53 // days from one new moon to the next

/** The lit part of the Moon as seen from Earth, `elong` degrees from the Sun
 *  (0 new, 90 half, 180 full): an SVG path for the bright side. Lit on the
 *  right while it grows (as seen from Vietnam), on the left as it shrinks. */
export function phasePath(cx, cy, r, elong) {
  const e = ((elong % 360) + 360) % 360
  const rx = Math.abs(Math.cos(rad(e))) * r
  const top = `${cx} ${(cy - r).toFixed(1)}`
  const bottom = `${cx} ${(cy + r).toFixed(1)}`
  if (e <= 180) {
    // growing: the right limb, then the terminator back up
    const sweep = e < 90 ? 0 : 1
    return `M ${top} A ${r} ${r} 0 0 1 ${bottom} A ${rx.toFixed(1)} ${r} 0 0 ${sweep} ${top} Z`
  }
  // shrinking: the left limb, then the terminator back up
  const sweep = e > 270 ? 1 : 0
  return `M ${top} A ${r} ${r} 0 0 0 ${bottom} A ${rx.toFixed(1)} ${r} 0 0 ${sweep} ${top} Z`
}

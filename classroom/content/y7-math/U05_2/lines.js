// content/y7-math/U05_2/lines.js
// The geometry the two line models share (tracks.jsx). Angles are degrees,
// measured anticlockwise from east, on a screen whose y runs down.
export const rad = (d) => (d * Math.PI) / 180
export const at = (P, r, d) => [P[0] + r * Math.cos(rad(d)), P[1] - r * Math.sin(rad(d))]
export const f1 = (n) => n.toFixed(1)
export const norm = (d) => ((d % 360) + 360) % 360

/** Where the line through P along d meets the line through Q along e. */
export function meet(P, d, Q, e) {
  const ux = Math.cos(rad(d)), uy = -Math.sin(rad(d))
  const vx = Math.cos(rad(e)), vy = -Math.sin(rad(e))
  const s = ((Q[0] - P[0]) * vy - (Q[1] - P[1]) * vx) / (ux * vy - uy * vx)
  return [P[0] + s * ux, P[1] + s * uy]
}

/** A filled sector at P from a1 round to a2. */
export function sector(P, r, a1, a2) {
  const [x1, y1] = at(P, r, a1)
  const [x2, y2] = at(P, r, a2)
  const large = norm(a2 - a1) > 180 ? 1 : 0
  return `M ${f1(P[0])} ${f1(P[1])} L ${f1(x1)} ${f1(y1)} A ${r} ${r} 0 ${large} 0 ${f1(x2)} ${f1(y2)} Z`
}

/** How far out a number must sit to fit inside a sector `size` degrees wide. */
export const labelR = (size, half = 30, lo = 80, hi = 125) => Math.max(lo, Math.min(hi, half / Math.sin(rad(size / 2))))

/** The open arrowhead that marks a pair of parallel lines, tip at (x, y). */
export function chevron(x, y, d, s = 16) {
  const [ax, ay] = at([x, y], s, d + 148)
  const [bx, by] = at([x, y], s, d - 148)
  return `M ${f1(ax)} ${f1(ay)} L ${f1(x)} ${f1(y)} L ${f1(bx)} ${f1(by)}`
}

/** A line drawn `r` either side of P along d. */
export function through(P, r, d) {
  const [x1, y1] = at(P, r, d + 180)
  const [x2, y2] = at(P, r, d)
  return { x1: f1(x1), y1: f1(y1), x2: f1(x2), y2: f1(y2) }
}

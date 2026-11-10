// Year 7 Maths 5.3: the drawings for the Workbook-style problems (workbook.js).
//
// Every drawing is worked out from its numbers, in centimetres, so it is accurate:
// a 65° angle is drawn at 65°, a 7 cm side is 7 cm at the drawing's scale, and the
// ruler is marked at the same scale. Points are [x, y] in cm with y going up.
// A drawing can carry a ruler along one of its lines; under the drawing, the end of
// that line is shown again, three times bigger, so the reading is clear on a phone.
// Only letters and units are written on a drawing, so one drawing serves English
// and French.

const S = 46 // pixels to a centimetre
const Z = 138 // pixels to a centimetre in the close-up
const INK = '#1e293b'
const MUTED = '#64748b'
const BLUE = '#1a5fa8'
const FONT = 'font-family="Inter, ui-sans-serif, system-ui, sans-serif"'
const f = (n) => (Math.round(n * 10) / 10).toString()
const rad = (d) => (d * Math.PI) / 180
export const dist = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1])
/** The point `r` cm from p in direction d (degrees anticlockwise from east). */
export const polar = (p, r, d) => [p[0] + r * Math.cos(rad(d)), p[1] + r * Math.sin(rad(d))]
/** Where the line through p along d meets the line through q along e. */
export function meet(p, d, q, e) {
  const [ux, uy] = [Math.cos(rad(d)), Math.sin(rad(d))]
  const [vx, vy] = [Math.cos(rad(e)), Math.sin(rad(e))]
  const s = ((q[0] - p[0]) * vy - (q[1] - p[1]) * vx) / (ux * vy - uy * vx)
  return [p[0] + s * ux, p[1] + s * uy]
}
const COMPASS = { n: [0, 1], s: [0, -1], e: [1, 0], w: [-1, 0], ne: [0.7, 0.7], nw: [-0.7, 0.7], se: [0.7, -0.7], sw: [-0.7, -0.7] }

/**
 * A drawing.
 *   pts     { A: [x, y], … } in cm
 *   solid   [['A', 'B'], …] lines drawn in ink
 *   dashed  [['A', 'B'], …] construction lines
 *   names   { A: 'sw', … } where each letter sits beside its point
 *   lens    [['A', 'B', '6 cm', 1 | -1], …] a length written beside a line (which side)
 *   rights  [['B', d1], …] a right-angle square at B, between directions d1 and d1 + 90
 *   arcs    [['A', d1, d2, '65°'], …] an angle arc at A from d1 round to d2, with its label
 *   ruler   ['D', 'C'] a ruler along DC with its 0 at D (and the close-up under the drawing)
 *   alt     what the drawing shows, for a screen reader
 */
export function drawing({ pts, solid = [], dashed = [], names = {}, lens = [], rights = [], arcs = [], ruler = null, alt }) {
  const all = Object.values(pts)
  const centre = [all.reduce((s, p) => s + p[0], 0) / all.length, all.reduce((s, p) => s + p[1], 0) / all.length]
  const extra = []
  let rule = null
  if (ruler) {
    const [a, b] = [pts[ruler[0]], pts[ruler[1]]]
    const len = dist(a, b)
    const u = [(b[0] - a[0]) / len, (b[1] - a[1]) / len]
    // The ruler lies on the side of the line away from the middle of the drawing.
    let n = [-u[1], u[0]]
    const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
    if ((centre[0] - mid[0]) * n[0] + (centre[1] - mid[1]) * n[1] > 0) n = [-n[0], -n[1]]
    const cm = Math.ceil(len) + 1
    const along = (t, w = 0) => [a[0] + t * u[0] + w * n[0], a[1] + t * u[1] + w * n[1]]
    rule = { len, u, n, cm, along }
    extra.push(along(-0.4, 0), along(cm + 0.3, 0), along(-0.4, 1), along(cm + 0.3, 1))
  }
  const xs = [...all, ...extra].map((p) => p[0])
  const ys = [...all, ...extra].map((p) => p[1])
  const pad = 0.9
  const [x0, x1, y0, y1] = [Math.min(...xs) - pad, Math.max(...xs) + pad, Math.min(...ys) - pad, Math.max(...ys) + pad]
  const w = Math.max((x1 - x0) * S, 3 * Z + 110)
  const shift = (w - (x1 - x0) * S) / 2
  const hMain = (y1 - y0) * S
  const h = hMain + (rule ? 150 : 0)
  const px = (p) => [shift + (p[0] - x0) * S, (y1 - p[1]) * S]
  const out = []
  const seg = (a, b, attrs) => { const [p, q] = [px(a), px(b)]; out.push(`<line x1="${f(p[0])}" y1="${f(p[1])}" x2="${f(q[0])}" y2="${f(q[1])}" ${attrs}/>`) }
  const text = (p, s, attrs = '') => out.push(`<text x="${f(p[0])}" y="${f(p[1])}" ${FONT} text-anchor="middle" ${attrs}>${s}</text>`)

  if (rule) {
    const { u, n, cm, along } = rule
    const c = [along(-0.4, 0), along(cm + 0.3, 0), along(cm + 0.3, 1), along(-0.4, 1)].map(px)
    out.push(`<polygon points="${c.map((p) => `${f(p[0])},${f(p[1])}`).join(' ')}" fill="#fbe7a1" fill-opacity="0.9" stroke="#c9a227" stroke-width="1.5"/>`)
    for (let mm = 0; mm <= cm * 10; mm++) {
      const long = mm % 10 === 0 ? 0.36 : mm % 5 === 0 ? 0.26 : 0.16
      seg(along(mm / 10, 0), along(mm / 10, long), `stroke="#8a6d12" stroke-width="${mm % 10 === 0 ? 1.5 : 0.9}"`)
    }
    const turn = (-Math.atan2(u[1], u[0]) * 180) / Math.PI
    // Numbers read the right way up whichever side the ruler lies on.
    const below = n[1] < 0 || (n[1] === 0 && n[0] > 0)
    for (let k = 0; k <= cm; k++) {
      const p = px(along(k, 0.66))
      out.push(`<text x="${f(p[0])}" y="${f(p[1])}" ${FONT} font-size="13" font-weight="700" fill="#6b5410" text-anchor="middle" transform="rotate(${f(turn)} ${f(p[0])} ${f(p[1])}) translate(0 ${below ? 5 : 4})">${k}</text>`)
    }
  }
  for (const [a, b] of dashed) seg(pts[a], pts[b], `stroke="${BLUE}" stroke-width="2.5" stroke-dasharray="8 6" stroke-linecap="round"`)
  for (const [v, d1, d2, label] of arcs) {
    const r = 0.75
    const [p1, p2] = [px(polar(pts[v], r, d1)), px(polar(pts[v], r, d2))]
    const sweep = (((d2 - d1) % 360) + 360) % 360
    out.push(`<path d="M ${f(p1[0])} ${f(p1[1])} A ${f(r * S)} ${f(r * S)} 0 ${sweep > 180 ? 1 : 0} 0 ${f(p2[0])} ${f(p2[1])}" fill="none" stroke="${BLUE}" stroke-width="2"/>`)
    const at = px(polar(pts[v], sweep > 180 ? 1.35 : sweep < 45 ? 1.75 : 1.4, d1 + sweep / 2))
    text([at[0], at[1] + 6], label, `font-size="17" font-weight="800" fill="${BLUE}"`)
  }
  for (const [v, d] of rights) {
    const k = 0.34
    const c = [polar(pts[v], k, d), polar(polar(pts[v], k, d), k, d + 90), polar(pts[v], k, d + 90)].map(px)
    out.push(`<polyline points="${c.map((p) => `${f(p[0])},${f(p[1])}`).join(' ')}" fill="none" stroke="${INK}" stroke-width="2"/>`)
  }
  for (const [a, b] of solid) seg(pts[a], pts[b], `stroke="${INK}" stroke-width="3.2" stroke-linecap="round"`)
  for (const [a, b, label, side = 1] of lens) {
    const [p, q] = [pts[a], pts[b]]
    const len = dist(p, q)
    const nrm = [(-(q[1] - p[1]) / len) * side, ((q[0] - p[0]) / len) * side]
    // A label beside an upright line needs room for half its own width.
    const off = 0.42 + Math.abs(nrm[0]) * label.length * 0.1
    const at = px([(p[0] + q[0]) / 2 + nrm[0] * off, (p[1] + q[1]) / 2 + nrm[1] * off])
    text([at[0], at[1] + 6], label, `font-size="17" font-weight="700" fill="${MUTED}"`)
  }
  for (const [name, where] of Object.entries(names)) {
    const [p, c] = [px(pts[name]), COMPASS[where]]
    out.push(`<circle cx="${f(p[0])}" cy="${f(p[1])}" r="4" fill="${INK}"/>`)
    text([p[0] + c[0] * 22, p[1] - c[1] * 22 + 7], name, `font-size="21" font-weight="800" font-style="italic" fill="${INK}"`)
  }

  if (rule) {
    // The close-up: the ruler from `from` cm to `from + 3` cm, with the line ending on it.
    const from = Math.max(0, Math.floor(rule.len) - 1)
    const [left, top] = [(w - 3 * Z) / 2, hMain + 34]
    const x = (cmAt) => left + (cmAt - from) * Z
    out.push(`<rect x="${f(left - 40)}" y="${f(hMain + 6)}" width="${f(3 * Z + 80)}" height="136" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>`)
    out.push(`<rect x="${f(left - 22)}" y="${f(top + 26)}" width="${f(3 * Z + 44)}" height="64" rx="5" fill="#fbe7a1" stroke="#c9a227" stroke-width="1.5"/>`)
    for (let mm = 0; mm <= 30; mm++) {
      const long = mm % 10 === 0 ? 26 : mm % 5 === 0 ? 19 : 12
      out.push(`<line x1="${f(x(from + mm / 10))}" y1="${f(top + 26)}" x2="${f(x(from + mm / 10))}" y2="${f(top + 26 + long)}" stroke="#8a6d12" stroke-width="${mm % 10 === 0 ? 2.2 : 1.4}"/>`)
    }
    for (let k = 0; k <= 3; k++) text([x(from + k), top + 78], String(from + k), 'font-size="22" font-weight="800" fill="#6b5410"')
    out.push(`<line x1="${f(left - 22)}" y1="${f(top + 24)}" x2="${f(x(rule.len))}" y2="${f(top + 24)}" stroke="${INK}" stroke-width="4"/>`)
    out.push(`<circle cx="${f(x(rule.len))}" cy="${f(top + 24)}" r="6" fill="${INK}"/>`)
    text([x(rule.len), top + 8], ruler[1], `font-size="21" font-weight="800" font-style="italic" fill="${INK}"`)
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(w)} ${f(h)}" role="img" aria-label="${alt}"><rect width="${f(w)}" height="${f(h)}" fill="#ffffff"/>${out.join('')}</svg>`
}

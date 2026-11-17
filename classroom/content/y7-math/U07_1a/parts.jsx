// content/y7-math/U07_1a/parts.jsx
// The drawing pieces this lesson's widgets share, in the picture language of
// diagrams.js: a BAR is one whole cut into equal parts (teal = shaded), a PIE is
// a pizza or a shaded circle, and a fraction is always written stacked.
//
//   Frac   a stacked fraction centred on x; y is the fraction line
//   Mixed  a mixed number (whole number, then a smaller stacked fraction)
//   Bar    one whole as a bar of n equal parts; the first k shaded
//   Pie    one whole as a circle of n slices from 12 o'clock; the first k filled
//   Btn    re-exported from the Models deck, so every widget imports one place
import { r1, fracWidth } from './measure.js'

export { Btn } from '../../y7-science/U03_models/ui.jsx'

export const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
export const INK = '#2b2b2b'
export const MUTED = '#5b6770'
export const RULE = '#cfd8dc'
export const KEY = '#c25e12'
export const TEAL = '#0087a8'
export const BLUE = '#1a5fa8'
export const GREEN = '#4a8b23'
export const GREEN_DARK = '#2f6b12'
export const RED = '#c8102e'
export const PURPLE = '#5c2483'
export const SHADE = '#6cbfd4'
export const ORANGE_T = '#fdf1e3'
export const BLUE_T = '#dce9f7'
export const GREEN_T = '#e4f1da'
export const CRUST = '#d9963f'
export const CHEESE = '#ffd66e'
export const SAUCE = '#c8442f'

const rad = (d) => (d * Math.PI) / 180

/** A stacked fraction. `size` is the digit size; y is the line between them. */
export function Frac({ x, y, top, bottom, size = 80, fill = INK, weight = 900 }) {
  const w = fracWidth(top, bottom, size)
  return (
    <g>
      <text x={x} y={y - size * 0.22} fontFamily={FONT} fontSize={size} fontWeight={weight} fill={fill} textAnchor="middle">{top}</text>
      <line x1={r1(x - w / 2)} y1={y} x2={r1(x + w / 2)} y2={y} stroke={fill} strokeWidth={Math.max(3, size / 14)} strokeLinecap="round" />
      <text x={x} y={y + size * 0.86} fontFamily={FONT} fontSize={size} fontWeight={weight} fill={fill} textAnchor="middle">{bottom}</text>
    </g>
  )
}

/** A mixed number: the whole number starts at x; the fraction follows at 55% size. */
export function Mixed({ x, y, whole, top, bottom, size = 80, fill = INK }) {
  const big = size * 1.45
  const wholeW = String(whole).length * big * 0.6
  const small = size * 0.62
  const fx = x + wholeW + fracWidth(top, bottom, small) / 2 + size * 0.04
  return (
    <g>
      <text x={x} y={y + big * 0.36} fontFamily={FONT} fontSize={big} fontWeight="900" fill={fill}>{whole}</text>
      <Frac x={fx} y={y} top={top} bottom={bottom} size={small} fill={fill} />
    </g>
  )
}

/**
 * A bar of n equal parts; the first k are filled with `fill`.
 * `cuts` draws extra thin lines inside each of `groups` equal groups (the
 * stepper's new cuts), coloured `cutColour`.
 */
export function Bar({ x, y, w, h, n, k, fill = SHADE, groups = 0, cutColour = KEY, strong = 5 }) {
  const pw = w / n
  const per = groups ? n / groups : 0
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <rect key={`p${i}`} x={r1(x + i * pw)} y={y} width={r1(pw)} height={h} fill={i < k ? fill : '#ffffff'} />
      ))}
      {Array.from({ length: n - 1 }, (_, j) => {
        const i = j + 1
        const isGroup = per && i % per === 0
        return (
          <line key={`l${i}`} x1={r1(x + i * pw)} y1={y} x2={r1(x + i * pw)} y2={y + h}
            stroke={per && !isGroup ? cutColour : INK} strokeWidth={per && !isGroup ? 3.5 : strong * 0.8} />
        )
      })}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={INK} strokeWidth={strong} />
    </g>
  )
}

function wedge(cx, cy, r, a0, a1) {
  const p = (d) => `${r1(cx + r * Math.cos(rad(d)))} ${r1(cy + r * Math.sin(rad(d)))}`
  return `M ${cx} ${cy} L ${p(a0)} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${p(a1)} Z`
}

/**
 * A circle of n slices from 12 o'clock, clockwise; the first k filled.
 * style 'shade': teal parts, ink lines. style 'pizza': filled slices are pizza,
 * empty slices a dashed outline. `groups` marks every (n / groups)-th line as a
 * strong line and the others as the stepper's thin new cuts.
 */
export function Pie({ cx, cy, r, n, k, style = 'shade', groups = 0, cutColour = KEY }) {
  const step = 360 / n
  const per = groups ? n / groups : 0
  const slices = Array.from({ length: n }, (_, i) => {
    const a0 = -90 + i * step
    const a1 = a0 + step
    const mid = (a0 + a1) / 2
    if (style === 'pizza') {
      return i < k ? (
        <g key={i}>
          <path d={wedge(cx, cy, r, a0, a1)} fill={CRUST} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d={wedge(cx, cy, r * 0.84, a0 + 1, a1 - 1)} fill={CHEESE} />
          <circle cx={r1(cx + r * 0.52 * Math.cos(rad(mid)))} cy={r1(cy + r * 0.52 * Math.sin(rad(mid)))} r={r1(r * 0.11)} fill={SAUCE} />
        </g>
      ) : (
        <path key={i} d={wedge(cx, cy, r, a0, a1)} fill="#f6f7f8" stroke="#9aa5b1" strokeWidth="2.5" strokeDasharray="7 6" strokeLinejoin="round" />
      )
    }
    return <path key={i} d={wedge(cx, cy, r, a0, a1)} fill={i < k ? SHADE : '#ffffff'} />
  })
  if (style === 'pizza') return <g>{slices}</g>
  return (
    <g>
      {slices}
      {Array.from({ length: n }, (_, i) => {
        const a = -90 + i * step
        const isGroup = !per || i % per === 0
        return (
          <line key={`c${i}`} x1={cx} y1={cy} x2={r1(cx + r * Math.cos(rad(a)))} y2={r1(cy + r * Math.sin(rad(a)))}
            stroke={isGroup ? INK : cutColour} strokeWidth={isGroup ? 5 : 3.5} strokeLinecap="round" />
        )
      })}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={INK} strokeWidth="5" />
    </g>
  )
}

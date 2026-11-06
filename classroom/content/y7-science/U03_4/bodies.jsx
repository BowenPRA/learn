// content/y7-science/U03_4/bodies.jsx
// The drawn Earth and Moon shared by the three top-view tide models, in the
// style of the diagrams: flat pale fills, dark ink outlines. The ocean is drawn
// separately (oceanPath in orbit.js) so each model decides its bulges.
import { at } from './orbit.js'

const INK = '#2b2b2b'
const LAND = '#a8d08d'
const LAND_DARK = '#86ba69'
const MOON = '#d9dde3'
const CRATER = '#c3c9d1'

// A few patches of darker land, in units of the Earth's radius, so the spin is
// easy to see. Not a map: from above the North Pole a real map would be mostly
// the Arctic.
const PATCHES = [
  'M 0.18 -0.78 Q 0.55 -0.66 0.52 -0.32 Q 0.32 -0.2 0.14 -0.42 Z',
  'M -0.72 -0.18 Q -0.58 -0.56 -0.3 -0.46 Q -0.24 -0.12 -0.5 0.06 Z',
  'M -0.36 0.44 Q -0.04 0.34 0.06 0.66 Q -0.2 0.82 -0.42 0.7 Z',
  'M 0.44 0.18 Q 0.76 0.14 0.7 0.46 Q 0.5 0.6 0.38 0.4 Z',
]

/** The Earth from above the North Pole, turned `spin` degrees anticlockwise. */
export function Globe({ cx, cy, r, spin = 0 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={LAND} stroke={INK} strokeWidth="3" />
      <g transform={`translate(${cx} ${cy}) rotate(${-spin}) scale(${r})`}>
        {PATCHES.map((d) => <path key={d} d={d} fill={LAND_DARK} />)}
      </g>
      <circle cx={cx} cy={cy} r="5" fill={INK} />
    </g>
  )
}

/** The Moon. With `sunDeg`, the half facing away from the Sun is in shadow. */
export function MoonBall({ x, y, r, sunDeg = null }) {
  const shade = sunDeg === null ? null : (() => {
    // the dark half: a semicircle on the side away from the Sun
    const [ax, ay] = at(x, y, r, sunDeg + 90)
    const [bx, by] = at(x, y, r, sunDeg - 90)
    return `M ${ax.toFixed(1)} ${ay.toFixed(1)} A ${r} ${r} 0 0 0 ${bx.toFixed(1)} ${by.toFixed(1)} Z`
  })()
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={MOON} stroke={INK} strokeWidth="2.5" />
      <circle cx={x - r * 0.35} cy={y - r * 0.3} r={r * 0.2} fill={CRATER} />
      <circle cx={x + r * 0.3} cy={y + r * 0.25} r={r * 0.26} fill={CRATER} />
      <circle cx={x + r * 0.38} cy={y - r * 0.4} r={r * 0.12} fill={CRATER} />
      {shade && <path d={shade} fill="#5b6470" opacity="0.75" />}
      {shade && <circle cx={x} cy={y} r={r} fill="none" stroke={INK} strokeWidth="2.5" />}
    </g>
  )
}

/** A stick figure with its arms up (high tide) or down (low tide). */
export function ArmsFigure({ x, y, up, color = INK, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={color} strokeWidth="6" strokeLinecap="round" fill="none">
      <circle cx="0" cy="-58" r="14" fill={color} stroke="none" />
      <line x1="0" y1="-42" x2="0" y2="8" />
      <line x1="0" y1="8" x2="-16" y2="44" />
      <line x1="0" y1="8" x2="16" y2="44" />
      {up ? (
        <>
          <line x1="0" y1="-30" x2="-22" y2="-66" />
          <line x1="0" y1="-30" x2="22" y2="-66" />
        </>
      ) : (
        <>
          <line x1="0" y1="-30" x2="-16" y2="6" />
          <line x1="0" y1="-30" x2="16" y2="6" />
        </>
      )}
    </g>
  )
}

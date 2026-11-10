// content/y7-math/U05_2/scissors.jsx
// SAY IT FIRST — Mr Bowen's scissors, the stepper the class talks over before
// anything is named. One press opens them 15° wider: 15°, 30° (the starter's
// number), 45°, 60°, 75°, 90°. Before each press the class says the handles
// and each side. Two straight lines crossing make four angles: the handles
// copy the blades (vertically opposite, slide 5) and a blade and a side make a
// straight line, 180° (5.1). At 90° all four are right angles: the first sight
// of perpendicular, which slide 7 names.
//
// The numbers sit on the left, the picture on the right, joined by colour:
// teal for the blades and the handles, purple for the sides (the harbour clock
// in Tides is the model). One SVG stage, because a showcase gives a short,
// wide box; the buttons are the house Btn from the Models deck.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../../y7-science/U03_models/ui.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', MUTED = '#5b6770', KEY = '#c25e12', TEAL = '#0087a8', PURPLE = '#5c2483'
const TEAL_T = '#d4edf3', PURPLE_T = '#ebe0f3', ORANGE_T = '#fdf1e3'
const STEEL = '#e6eaef', STEEL_EDGE = '#7d8a97', HANDLE = '#d83a2e'

const STEPS = [15, 30, 45, 60, 75, 90]
const PX = 1020, PY = 262 // the pivot
const BLADE = 300 // pivot to the tip of a blade
const RING = 250 // pivot to the middle of a finger ring
const ARC = 130 // the radius of all four angle marks

const rad = (d) => (d * Math.PI) / 180
const at = (r, d) => [PX + r * Math.cos(rad(d)), PY - r * Math.sin(rad(d))]
const f = (n) => n.toFixed(1)

function wedge(r, a1, a2) {
  const [x1, y1] = at(r, a1)
  const [x2, y2] = at(r, a2)
  return `M ${PX} ${PY} L ${f(x1)} ${f(y1)} A ${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${f(x2)} ${f(y2)} Z`
}

// The curved edge alone, drawn again over the scissors so a narrow angle
// still shows where the blades cover its wedge.
function arc(r, a1, a2) {
  const [x1, y1] = at(r, a1)
  const [x2, y2] = at(r, a2)
  return `M ${f(x1)} ${f(y1)} A ${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${f(x2)} ${f(y2)}`
}

// One half of the scissors: a blade along `d` and its handle along d + 180.
// The thin ink line through both is the straight line the maths is about.
function Half({ d }) {
  const [tx, ty] = at(BLADE, d)
  const [ax, ay] = at(11, d + 90)
  const [bx, by] = at(11, d - 90)
  const [hx, hy] = at(RING - 44, d + 180)
  const [rx, ry] = at(RING, d + 180)
  return (
    <g>
      <path d={`M ${f(ax)} ${f(ay)} L ${f(tx)} ${f(ty)} L ${f(bx)} ${f(by)} Z`} fill={STEEL} stroke={STEEL_EDGE} strokeWidth="2.5" strokeLinejoin="round" />
      <line x1={PX} y1={PY} x2={f(hx)} y2={f(hy)} stroke={HANDLE} strokeWidth="16" strokeLinecap="round" />
      <ellipse cx={f(rx)} cy={f(ry)} rx="44" ry="29" transform={`rotate(${f(-d)} ${f(rx)} ${f(ry)})`} fill="none" stroke={HANDLE} strokeWidth="13" />
      <line x1={f(rx)} y1={f(ry)} x2={f(tx)} y2={f(ty)} stroke={INK} strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

// A right-angle box in the corner between directions d1 and d2 (d2 = d1 + 90).
function corner(d1, s = 26) {
  const [ax, ay] = at(s, d1)
  const [bx, by] = at(s * Math.SQRT2, d1 + 45)
  const [cx, cy] = at(s, d1 + 90)
  return `M ${f(ax)} ${f(ay)} L ${f(bx)} ${f(by)} L ${f(cx)} ${f(cy)}`
}

export function ScissorsStepper({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0)
  const big = isDisplayMode
  const a = STEPS[k] // the blades, and the handles
  const side = 180 - a
  const last = STEPS.length - 1
  const right = a === 90
  const h = a / 2

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />

          {/* the numbers: say each one before the press shows it */}
          <rect x="40" y="48" width="24" height="24" rx="6" fill={TEAL_T} stroke={TEAL} strokeWidth="3" />
          <text x="78" y="70" fontFamily={FONT} fontSize="28" fontWeight="800" fill={MUTED}>{t(lang, 'The blades', 'Les lames')}</text>
          <text x="40" y="146" fontFamily={FONT} fontSize="72" fontWeight="900" fill={TEAL}>{a}°</text>
          <rect x="40" y="186" width="24" height="24" rx="6" fill={TEAL_T} stroke={TEAL} strokeWidth="3" />
          <text x="78" y="208" fontFamily={FONT} fontSize="28" fontWeight="800" fill={MUTED}>{t(lang, 'The handles', 'Les poignées')}</text>
          <text x="40" y="284" fontFamily={FONT} fontSize="72" fontWeight="900" fill={TEAL}>{a}°</text>
          {k >= 2 && <text x="214" y="282" fontFamily={FONT} fontSize="28" fontWeight="700" fill={MUTED}>{t(lang, '(the same)', '(pareil)')}</text>}
          <rect x="40" y="324" width="24" height="24" rx="6" fill={PURPLE_T} stroke={PURPLE} strokeWidth="3" />
          <text x="78" y="346" fontFamily={FONT} fontSize="28" fontWeight="800" fill={MUTED}>{t(lang, 'Each side', 'Chaque côté')}</text>
          <text x="40" y="422" fontFamily={FONT} fontSize="72" fontWeight="900" fill={PURPLE}>{side}°</text>
          {k >= 2 && <text x="214" y="420" fontFamily={FONT} fontSize="28" fontWeight="700" fill={MUTED}>= 180° − {a}°</text>}
          {(k >= 2 || right) && (
            <g>
              <rect x="40" y="448" width="500" height="56" rx="14" fill={ORANGE_T} stroke={KEY} strokeWidth="2.5" />
              <text x="290" y="485" fontFamily={FONT} fontSize="27" fontWeight="900" fill={KEY} textAnchor="middle">
                {right ? t(lang, 'All four are 90°!', 'Les quatre font 90° !') : t(lang, 'Opposite angles are equal.', 'Les angles opposés sont égaux.')}
              </text>
            </g>
          )}

          {/* the four angles, under the scissors, all drawn the same size so
              that at 90° the four look equal as well as being equal */}
          <path d={wedge(ARC, -h, h)} fill={TEAL_T} stroke={TEAL} strokeWidth="3" />
          <path d={wedge(ARC, 180 - h, 180 + h)} fill={TEAL_T} stroke={TEAL} strokeWidth="3" />
          <path d={wedge(ARC, h, 180 - h)} fill={PURPLE_T} stroke={PURPLE} strokeWidth="3" />
          <path d={wedge(ARC, 180 + h, 360 - h)} fill={PURPLE_T} stroke={PURPLE} strokeWidth="3" />

          {/* the scissors: two straight lines that cross at the screw */}
          <Half d={-h} />
          <Half d={h} />
          <path d={arc(ARC, -h, h)} fill="none" stroke={TEAL} strokeWidth="5" />
          <path d={arc(ARC, 180 - h, 180 + h)} fill="none" stroke={TEAL} strokeWidth="5" />
          <path d={arc(ARC, h, 180 - h)} fill="none" stroke={PURPLE} strokeWidth="5" />
          <path d={arc(ARC, 180 + h, 360 - h)} fill="none" stroke={PURPLE} strokeWidth="5" />
          <circle cx={PX} cy={PY} r="11" fill="#b8c2cc" stroke={INK} strokeWidth="3" />
          {right && [-45, 45, 135, 225].map((d) => (
            <path key={d} d={corner(d)} fill="none" stroke={INK} strokeWidth="3" />
          ))}
          <text x={PX + BLADE + 26} y={PY + 9} fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, 'blades', 'lames')}</text>
          <text x={PX - RING - 70} y={PY + 9} fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED} textAnchor="end">{t(lang, 'handles', 'poignées')}</text>
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === last} onClick={() => setK((v) => Math.min(last, v + 1))}>{t(lang, '15° wider', '15° de plus')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

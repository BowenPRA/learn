// content/y7-math/U05_3/parallel.jsx
// SLIDE THE SET SQUARE — the model the class predicts before each press.
// A ruler lies still; a set square rests on it. Draw along the set square's
// long edge, slide it along the ruler, draw again: every line meets the ruler
// at the same angle (60°), so every line is parallel — 5.2's corresponding
// angles, used to draw. Turn the set square off the ruler (one corner lifts)
// and the next line meets it at a different angle, 70°: not parallel any more.
//
// One SVG stage, buttons in HTML (the house Btn). EN/FR via tr.
import { useState } from 'react'
import { ChevronRight, RotateCw, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../../y7-science/U03_models/ui.jsx'
import { at, f1, sector, chevron } from '../U05_2/lines.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', KEY = '#c25e12', MUTED = '#5b6770', GREEN_DARK = '#3d731c', RED = '#c8102e', PURPLE = '#5c2483'
const ORANGE_T = '#fdf1e3', PURPLE_T = '#f2ecf7'

const RULER_Y = 430 // the ruler's top edge
const START = 610 // the set square's right-angle corner, first position
const STEP = 150 // one slide
const LEG_UP = 250 // the set square's upright edge
const LEG_RUN = 144 // its edge along the ruler (so the long edge is at 60°)
const MAX = 5 // lines

// Turn point q about c by d degrees anticlockwise (y runs down the screen).
function turn(q, c, d) {
  const r = (d * Math.PI) / 180
  const dx = q[0] - c[0], dy = q[1] - c[1]
  return [c[0] + dx * Math.cos(r) + dy * Math.sin(r), c[1] - dx * Math.sin(r) + dy * Math.cos(r)]
}

export function SetSquareSlide({ lang = 'en', isDisplayMode = false }) {
  const [lines, setLines] = useState([]) // each line: [foot x on the ruler, angle]
  const [turned, setTurned] = useState(false)
  const big = isDisplayMode
  const k = lines.length
  const x0 = START + STEP * k // where the set square stands now
  const angle = turned ? 70 : 60
  const parallel = lines.every(([, a]) => a === lines[0]?.[1])
  const foot = x0 + LEG_RUN // where the long edge meets the ruler

  // the set square: right angle at (x0, RULER_Y), long edge from the foot to
  // the top; turned 10° clockwise about the foot, its other corner lifts off
  // the ruler (it never sinks into it) and the long edge stands at 70°
  const corner = [foot, RULER_Y]
  const spin = (q) => (turned ? turn(q, corner, -10) : q)
  const base = spin([x0, RULER_Y])
  const top = spin([x0, RULER_Y - LEG_UP])

  const draw = () => setLines((ls) => [...ls, [foot, angle]])

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />

          {/* the read-out */}
          <text x="40" y="66" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, 'Lines drawn', 'Droites tracées')}</text>
          <text x="40" y="140" fontFamily={FONT} fontSize="72" fontWeight="900" fill={INK}>{k}</text>
          {k >= 2 && (
            <g>
              <text x="40" y="216" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, 'The lines are', 'Les droites sont')}</text>
              <text x="40" y="268" fontFamily={FONT} fontSize={parallel ? 44 : 36} fontWeight="900" fill={parallel ? GREEN_DARK : RED}>
                {parallel ? t(lang, 'PARALLEL', 'PARALLÈLES') : t(lang, 'NOT PARALLEL', 'PAS PARALLÈLES')}
              </text>
              <text x="40" y="314" fontFamily={FONT} fontSize="24" fontWeight="800" fill={INK}>
                {parallel ? t(lang, 'The same angle each time.', 'Le même angle à chaque fois.') : t(lang, 'The angle changed.', 'L’angle a changé.')}
              </text>
            </g>
          )}

          {/* the lines drawn so far, each with its angle to the ruler */}
          {lines.map(([fx, a], i) => {
            const end = at([fx, RULER_Y], 420, 180 - a)
            const odd = a !== lines[0][1]
            const [lx, ly] = at([fx, RULER_Y], 66, 180 - a / 2)
            const mid = at([fx, RULER_Y], 300, 180 - a)
            return (
              <g key={i}>
                <line x1={fx} y1={RULER_Y} x2={f1(end[0])} y2={f1(end[1])} stroke={odd ? PURPLE : INK} strokeWidth="5" strokeLinecap="round" />
                <path d={sector([fx, RULER_Y], 40, 180 - a, 180)} fill={odd ? PURPLE_T : ORANGE_T} stroke={odd ? PURPLE : KEY} strokeWidth="2.5" />
                <text x={f1(lx)} y={f1(ly + 8)} fontFamily={FONT} fontSize="23" fontWeight="900" fill={odd ? PURPLE : KEY} textAnchor="middle">{a}°</text>
                {parallel && k >= 2 && <path d={chevron(mid[0], mid[1], 180 - a, 15)} fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
              </g>
            )
          })}

          {/* the ruler */}
          <rect x="540" y={RULER_Y} width="930" height="50" rx="6" fill="#fbe7a1" stroke="#c9a227" strokeWidth="2" />
          {Array.from({ length: 47 }, (_, i) => (
            <line key={i} x1={560 + i * 19.6} y1={RULER_Y} x2={560 + i * 19.6} y2={RULER_Y + (i % 5 === 0 ? 18 : 10)} stroke="#8a6d12" strokeWidth={i % 5 === 0 ? 2 : 1} />
          ))}
          <text x="1460" y={RULER_Y + 40} fontFamily={FONT} fontSize="18" fontWeight="800" fill="#6b5410" textAnchor="end">{t(lang, 'ruler: it does not move', 'règle : elle ne bouge pas')}</text>

          {/* the set square, ready to draw along its long edge */}
          {k < MAX && (
            <g>
              <path d={`M ${f1(base[0])} ${f1(base[1])} L ${f1(corner[0])} ${f1(corner[1])} L ${f1(top[0])} ${f1(top[1])} Z`}
                fill="#bfe0f2" fillOpacity="0.72" stroke="#3f7fa6" strokeWidth="3" strokeLinejoin="round" />
              <line x1={f1(corner[0])} y1={f1(corner[1])} x2={f1(top[0])} y2={f1(top[1])} stroke={KEY} strokeWidth="5" strokeDasharray="10 8" />
              <text x={f1((corner[0] + top[0]) / 2 + 22)} y={f1((corner[1] + top[1]) / 2)} fontFamily={FONT} fontSize="20" fontWeight="800" fill={KEY}>{t(lang, 'draw here', 'trace ici')}</text>
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k >= MAX} onClick={draw}>{t(lang, 'Draw, then slide', 'Trace, puis glisse')}</Btn>
        <Btn big={big} tone="purple" icon={RotateCw} disabled={k >= MAX} onClick={() => setTurned((v) => !v)}>
          {turned ? t(lang, 'Put it back on the ruler', 'Remets-la sur la règle') : t(lang, 'Turn the set square', 'Tourne l’équerre')}
        </Btn>
        <Btn big={big} tone="slate" icon={RotateCcw} disabled={k === 0 && !turned} onClick={() => { setLines([]); setTurned(false) }}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

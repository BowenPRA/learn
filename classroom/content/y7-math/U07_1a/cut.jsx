// content/y7-math/U07_1a/cut.jsx
// SAY IT FIRST — Cut Every Piece, the stepper for the starter. Mr Bowen eats 3
// pieces of 4: three quarters, shaded on a bar and on a pizza. One press cuts
// EACH QUARTER into one more piece (2, 3, 4, 5), in orange, so the picture
// shows 6/8, 9/12, 12/16, 15/20 while the shaded amount never moves. The class
// says the new fraction before each press: how many pieces now, how many
// shaded. The arrows show the rule the next slides name: the top and the bottom
// are multiplied by the same number.
//
// One SVG stage (a showcase gives a short, wide box); the buttons are the house
// Btn, so the phone remote can press them.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn, Frac, Bar, Pie, FONT, INK, KEY, MUTED, TEAL } from './parts.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const LAST = 5 // each quarter cut into 1 … 5 pieces

// A curved arrow from (x1, y) to (x2, y), bulging by `bend` (negative = up).
function curve(x1, x2, y, bend) {
  const mx = (x1 + x2) / 2
  return `M ${x1} ${y} Q ${mx} ${y + bend * 2} ${x2} ${y}`
}

export function CutEveryPiece({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(1)
  const big = isDisplayMode
  const top = 3 * k
  const bottom = 4 * k
  const cut = k > 1

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />
          <defs>
            <marker id="cut-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={KEY} />
            </marker>
          </defs>

          {/* the fractions: three quarters, and what the cuts make of it */}
          <Frac x={140} y={196} top={3} bottom={4} size={120} />
          {cut && (
            <g>
              <text x={292} y={232} fontFamily={FONT} fontSize="110" fontWeight="900" fill={INK} textAnchor="middle">=</text>
              <Frac x={470} y={196} top={top} bottom={bottom} size={120} fill={TEAL} />
              <path d={curve(176, 430, 74, -22)} fill="none" stroke={KEY} strokeWidth="5" markerEnd="url(#cut-arrow)" />
              <text x={303} y={40} fontFamily={FONT} fontSize="34" fontWeight="900" fill={KEY} textAnchor="middle">× {k}</text>
              <path d={curve(176, 430, 354, 20)} fill="none" stroke={KEY} strokeWidth="5" markerEnd="url(#cut-arrow)" />
              <text x={303} y={418} fontFamily={FONT} fontSize="34" fontWeight="900" fill={KEY} textAnchor="middle">× {k}</text>
            </g>
          )}
          {!cut && (
            <text x={300} y={214} fontFamily={FONT} fontSize="32" fontWeight="800" fill={MUTED}>
              {t(lang, '3 pieces of 4', '3 morceaux sur 4')}
            </text>
          )}

          {/* the pizza: quarters in ink, the new cuts in orange */}
          <Pie cx={1250} cy={214} r={180} n={bottom} k={top} groups={4} />

          {/* the bar, the whole width */}
          <Bar x={60} y={440} w={1380} h={62} n={bottom} k={top} groups={4} />
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 1} onClick={() => setK((v) => Math.max(1, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>
          {t(lang, `Cut each quarter into ${Math.min(LAST, k + 1)}`, `Coupe chaque quart en ${Math.min(LAST, k + 1)}`)}
        </Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 1} onClick={() => setK(1)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

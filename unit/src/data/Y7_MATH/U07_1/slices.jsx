// unit/src/data/Y7_MATH/U07_1/slices.jsx — copied from classroom/content/y7-math/U07_1a on 20 November 2026 for the self-study notes; edited here since.
// SLICE BY SLICE — the answer to Mr Bowen's party, one press at a time. The 11
// slices he ate are put back together into pizzas: one quarter a press, from
// 1/4 to 11/4. The class says the next one before each press, in two ways:
// "five quarters" and "one and a quarter". Every 4 slices make a whole pizza
// (labelled), and a marker walks along a number line from 0 to 3, so 2¾ sits
// between 2 and 3: the first sight of a mixed number, which the next slide names.
//
// Never shows the next value early: the press changes the picture and the
// numbers together.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../utils/lang.js'
import { Btn, Frac, Mixed, Pie, FONT, INK, KEY, MUTED, TEAL, BLUE } from './parts.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const LAST = 11
const EN = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven']
const FR = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze']
const X0 = 120 // the number line: 0 at X0, a whole every UNIT
const UNIT = 440
const LINE_Y = 440

function said(lang, n) {
  const q = Math.floor(n / 4)
  const r = n % 4
  const first = t(lang, `${EN[n]} ${n === 1 ? 'quarter' : 'quarters'}`, `${FR[n]} ${n === 1 ? 'quart' : 'quarts'}`)
  if (n < 4) return [first, null]
  if (r === 0) return [first, t(lang, q === 1 ? '= one whole pizza' : '= two whole pizzas', q === 1 ? '= une pizza entière' : '= deux pizzas entières')]
  return [first, t(lang, `= ${EN[q]} and ${r === 1 ? 'a quarter' : `${EN[r]} quarters`}`, `= ${FR[q]} et ${FR[r]} ${r === 1 ? 'quart' : 'quarts'}`)]
}

export function SliceBySlice({ lang = 'en', isDisplayMode = false }) {
  const [n, setN] = useState(1)
  const big = isDisplayMode
  const q = Math.floor(n / 4)
  const r = n % 4
  const [line1, line2] = said(lang, n)
  const mx = X0 + (UNIT * n) / 4

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />

          {/* the numbers, and how to say them */}
          <Frac x={120} y={168} top={n} bottom={4} size={110} />
          {n >= 4 && (
            <g>
              <text x={256} y={204} fontFamily={FONT} fontSize="96" fontWeight="900" fill={INK} textAnchor="middle">=</text>
              {r === 0 ? (
                <text x={316} y={226} fontFamily={FONT} fontSize="160" fontWeight="900" fill={TEAL}>{q}</text>
              ) : (
                <Mixed x={316} y={168} whole={q} top={r} bottom={4} size={110} fill={TEAL} />
              )}
            </g>
          )}
          <text x={40} y={330} fontFamily={FONT} fontSize="32" fontWeight="800" fill={MUTED}>{line1}</text>
          {line2 && <text x={40} y={374} fontFamily={FONT} fontSize="32" fontWeight="900" fill={TEAL}>{line2}</text>}

          {/* the slices put back together */}
          {[0, 1, 2].map((i) => {
            const k = Math.max(0, Math.min(4, n - 4 * i))
            return (
              <g key={i}>
                <Pie cx={760 + i * 270} cy={168} r={116} n={4} k={k} style="pizza" />
                {k === 4 && (
                  <text x={760 + i * 270} y={322} fontFamily={FONT} fontSize="26" fontWeight="900" fill={TEAL} textAnchor="middle">
                    {t(lang, '1 whole', '1 entière')}
                  </text>
                )}
              </g>
            )
          })}

          {/* the number line, 0 to 3, a tick every quarter */}
          <rect x={X0} y={LINE_Y - 9} width={mx - X0} height="18" fill={BLUE} opacity="0.22" />
          <line x1={X0 - 14} y1={LINE_Y} x2={X0 + UNIT * 3 + 14} y2={LINE_Y} stroke={INK} strokeWidth="5" strokeLinecap="round" />
          {Array.from({ length: 13 }, (_, j) => {
            const x = X0 + (UNIT * j) / 4
            const whole = j % 4 === 0
            return <line key={j} x1={x} y1={LINE_Y - (whole ? 24 : 12)} x2={x} y2={LINE_Y + (whole ? 24 : 12)} stroke={INK} strokeWidth={whole ? 5 : 3} />
          })}
          {[0, 1, 2, 3].map((w) => (
            <text key={w} x={X0 + UNIT * w} y={LINE_Y + 62} fontFamily={FONT} fontSize="36" fontWeight="900" fill={INK} textAnchor="middle">{w}</text>
          ))}
          <circle cx={mx} cy={LINE_Y} r="15" fill={KEY} stroke="#ffffff" strokeWidth="3" />
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={n === 1} onClick={() => setN((v) => Math.max(1, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={n === LAST} onClick={() => setN((v) => Math.min(LAST, v + 1))}>{t(lang, 'One more slice', 'Une part de plus')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={n === 1} onClick={() => setN(1)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

// content/y7-math/U07_1a/wall.jsx
// THE FRACTION WALL — one whole, then the same whole cut into halves, thirds,
// quarters, sixths, eighths and twelfths. The class finds every fraction equal
// to 1/2 first (pairs, a minute, by counting bricks); then a press draws the
// line at 1/2: the rows it meets exactly turn teal up to the line, every other
// row goes grey, and the equal fractions are listed on the right. The same for
// 1/3, 2/3 and 3/4. One state at a time: the wall itself is always readable.
import { useState } from 'react'
import { Eraser } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn, Frac, FONT, INK, KEY, MUTED, SHADE } from './parts.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)

const ROWS = [
  [1, 'one whole', 'un entier'],
  [2, 'halves', 'demis'],
  [3, 'thirds', 'tiers'],
  [4, 'quarters', 'quarts'],
  [6, 'sixths', 'sixièmes'],
  [8, 'eighths', 'huitièmes'],
  [12, 'twelfths', 'douzièmes'],
]
const LINES = [[1, 2], [1, 3], [2, 3], [3, 4]] // the four buttons
const X0 = 230
const W = 900
const Y0 = 26
const RH = 62 // row height
const GAP = 6

export function FractionWall({ lang = 'en', isDisplayMode = false }) {
  const [line, setLine] = useState(null) // index into LINES, or null
  const big = isDisplayMode
  const target = line == null ? null : LINES[line]
  const hits = target ? ROWS.filter(([n]) => n % target[1] === 0) : []

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />

          {ROWS.map(([n, en, fr], r) => {
            const y = Y0 + r * (RH + GAP)
            const hit = target && n % target[1] === 0
            const upTo = hit ? (n / target[1]) * target[0] : 0
            const grey = target && !hit
            const pw = W / n
            return (
              <g key={n}>
                <text x={X0 - 18} y={y + RH / 2 + 10} fontFamily={FONT} fontSize="28" fontWeight="800" fill={grey ? '#a7b1ba' : MUTED} textAnchor="end">{t(lang, en, fr)}</text>
                {Array.from({ length: n }, (_, i) => (
                  <rect key={i} x={X0 + i * pw} y={y} width={pw} height={RH}
                    fill={i < upTo ? SHADE : grey ? '#f1f3f5' : '#ffffff'}
                    stroke={grey ? '#c9d1d8' : INK} strokeWidth={grey ? 2 : 3} />
                ))}
              </g>
            )
          })}

          {target && (
            <line x1={X0 + (W * target[0]) / target[1]} y1={Y0 - 14} x2={X0 + (W * target[0]) / target[1]} y2={Y0 + ROWS.length * (RH + GAP) + 4}
              stroke={KEY} strokeWidth="6" strokeDasharray="14 9" />
          )}

          {/* the list: every fraction the line meets exactly */}
          <rect x="1180" y="26" width="296" height="468" rx="18" fill="#f8fafb" stroke="#dfe5ea" strokeWidth="2" />
          {!target && (
            <g>
              <text x="1328" y="236" fontFamily={FONT} fontSize="30" fontWeight="900" fill={MUTED} textAnchor="middle">{t(lang, 'Find them', 'Trouve-les')}</text>
              <text x="1328" y="276" fontFamily={FONT} fontSize="30" fontWeight="900" fill={MUTED} textAnchor="middle">{t(lang, 'first.', 'd’abord.')}</text>
            </g>
          )}
          {target && hits.filter(([n]) => n !== target[1]).map(([n], i) => {
            const top = (n / target[1]) * target[0]
            const col = i % 2
            const row = Math.floor(i / 2)
            return <Frac key={n} x={1265 + col * 128} y={232 + row * 132} top={top} bottom={n} size={52} />
          })}
          {target && (
            <g>
              <Frac x={1278} y={102} top={target[0]} bottom={target[1]} size={52} fill={KEY} />
              <text x="1340" y="118" fontFamily={FONT} fontSize="52" fontWeight="900" fill={KEY}>=</text>
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        {LINES.map(([a, b], i) => (
          <Btn key={i} big={big} tone={line === i ? 'orange' : 'blue'} onClick={() => setLine(i)}>
            {t(lang, `Line at ${a}/${b}`, `Ligne à ${a}/${b}`)}
          </Btn>
        ))}
        <Btn big={big} tone="slate" icon={Eraser} disabled={line == null} onClick={() => setLine(null)}>{t(lang, 'Clear', 'Effacer')}</Btn>
      </div>
    </div>
  )
}

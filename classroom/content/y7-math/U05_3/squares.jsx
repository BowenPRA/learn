// content/y7-math/U05_3/squares.jsx
// OUR SQUARES — the class's own measurements, graphed together (the Our
// Trials slide in Coffee, Carbon and Stars is the model). Everyone has drawn
// a square with sides of 5 cm and measured its diagonal. Mr Bowen taps the
// number line once for each answer called out, and a dot plot builds up.
// Most dots land on 7.0–7.2 cm; Show the exact length draws 7.07 cm through
// them. A dot far away is a drawing to check (usually a corner that is not
// 90°). The dots are kept in this browser for 12 hours, so leaving the slide
// and coming back does not lose them; Clear all empties it.
import { useState, useEffect } from 'react'
import { Undo2, Eye, Trash2 } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../../y7-science/U03_models/ui.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', KEY = '#c25e12', MUTED = '#5b6770', BLUE = '#1a5fa8'

const STORE = 'classroom:y7-math:U05_3:diagonals'
const KEEP_MS = 12 * 60 * 60 * 1000
const LO = 60 // tenths of a centimetre: 6.0 cm
const HI = 80 // 8.0 cm
const X0 = 500
const GAP = 46
const AXIS = 420
const xOf = (tenths) => X0 + (tenths - LO) * GAP
const EXACT = 70.71 // 5 × √2 = 7.071 cm, in tenths

function load() {
  try {
    const raw = JSON.parse(window.localStorage.getItem(STORE) || 'null')
    if (raw && Array.isArray(raw.v) && Date.now() - raw.at < KEEP_MS) return raw.v
  } catch { /* storage blocked or empty */ }
  return []
}

export function OurSquares({ lang = 'en', isDisplayMode = false }) {
  const [vals, setVals] = useState(load)
  const [exact, setExact] = useState(false)
  const big = isDisplayMode
  useEffect(() => {
    try { window.localStorage.setItem(STORE, JSON.stringify({ v: vals, at: Date.now() })) } catch { /* best effort */ }
  }, [vals])

  const counts = {}
  vals.forEach((v) => { counts[v] = (counts[v] || 0) + 1 })
  const most = Object.keys(counts).map(Number).sort((a, b) => counts[b] - counts[a] || Math.abs(a - EXACT) - Math.abs(b - EXACT))[0]
  const cm = (tenths) => (tenths / 10).toFixed(1)

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />

          {/* the read-out */}
          <text x="40" y="66" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, 'Our squares', 'Nos carrés')}</text>
          <text x="40" y="142" fontFamily={FONT} fontSize="72" fontWeight="900" fill={INK}>{vals.length}</text>
          <text x="40" y="186" fontFamily={FONT} fontSize="24" fontWeight="700" fill={MUTED}>{t(lang, 'Tap the number line:', 'Touche la ligne :')}</text>
          <text x="40" y="218" fontFamily={FONT} fontSize="24" fontWeight="700" fill={MUTED}>{t(lang, 'one dot for each square.', 'un point par carré.')}</text>
          {most !== undefined && (
            <g>
              <text x="40" y="290" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, 'Most of us:', 'Le plus souvent :')}</text>
              <text x="40" y="340" fontFamily={FONT} fontSize="44" fontWeight="900" fill={BLUE}>{cm(most)} cm</text>
            </g>
          )}
          {exact && (
            <g>
              <text x="40" y="404" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, 'Exact:', 'Exactement :')}</text>
              <text x="40" y="454" fontFamily={FONT} fontSize="44" fontWeight="900" fill={KEY}>7.07 cm</text>
            </g>
          )}

          {/* the number line, one tap target per tenth */}
          <line x1={xOf(LO) - 20} y1={AXIS} x2={xOf(HI) + 20} y2={AXIS} stroke={INK} strokeWidth="3" />
          {Array.from({ length: HI - LO + 1 }, (_, i) => LO + i).map((v) => {
            const x = xOf(v)
            const n = counts[v] || 0
            return (
              <g key={v}>
                <line x1={x} y1={AXIS} x2={x} y2={AXIS + (v % 5 === 0 ? 16 : 9)} stroke={INK} strokeWidth={v % 5 === 0 ? 2.5 : 1.5} />
                {v % 5 === 0 && <text x={x} y={AXIS + 44} fontFamily={FONT} fontSize="24" fontWeight="800" fill={INK} textAnchor="middle">{cm(v)}</text>}
                {Array.from({ length: Math.min(n, 18) }, (_, j) => (
                  <circle key={j} cx={x} cy={AXIS - 18 - j * 19} r="8.5" fill={BLUE} stroke="#ffffff" strokeWidth="2" />
                ))}
                {n > 18 && <text x={x} y={AXIS - 18 - 18 * 19} fontFamily={FONT} fontSize="18" fontWeight="900" fill={BLUE} textAnchor="middle">+{n - 18}</text>}
                <rect x={x - GAP / 2} y="30" width={GAP} height={AXIS + 30 - 30} fill="#ffffff" fillOpacity="0" style={{ cursor: 'pointer' }}
                  onClick={() => setVals((vs) => [...vs, v])} />
              </g>
            )
          })}
          <text x={xOf(HI) + 20} y={AXIS + 82} fontFamily={FONT} fontSize="21" fontWeight="700" fill={MUTED} textAnchor="end">{t(lang, 'the diagonal AC (cm)', 'la diagonale AC (cm)')}</text>
          {exact && (
            <g pointerEvents="none">
              <line x1={xOf(EXACT)} y1="52" x2={xOf(EXACT)} y2={AXIS} stroke={KEY} strokeWidth="4" strokeDasharray="12 9" />
              <rect x={xOf(EXACT) - 70} y="14" width="140" height="40" rx="10" fill="#fdf1e3" stroke={KEY} strokeWidth="2" />
              <text x={xOf(EXACT)} y="42" fontFamily={FONT} fontSize="24" fontWeight="900" fill={KEY} textAnchor="middle">7.07 cm</text>
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={vals.length === 0} onClick={() => setVals((vs) => vs.slice(0, -1))}>{t(lang, 'Undo', 'Annuler')}</Btn>
        <Btn big={big} tone="orange" icon={Eye} disabled={exact} onClick={() => setExact(true)}>{t(lang, 'Show the exact length', 'Montrer la longueur exacte')}</Btn>
        <Btn big={big} tone="slate" icon={Trash2} disabled={vals.length === 0 && !exact} onClick={() => { setVals([]); setExact(false) }}>{t(lang, 'Clear all', 'Tout effacer')}</Btn>
      </div>
    </div>
  )
}

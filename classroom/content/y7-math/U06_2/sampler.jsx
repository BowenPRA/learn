// content/y7-math/U06_2/sampler.jsx
// SMALL SAMPLE, BIG SAMPLE — the model a static slide cannot be. Mr Bowen's
// school has 200 students; 120 of them like the new canteen menu (60%), but
// nobody knows that until Ask everyone. Each press asks a NEW random sample:
//
//   Ask 5 students    lights 5 students (green yes, red no), says "3 out of
//                     5 = 60%", and drops a dot on the top line
//   Ask 50 students   the same with 50, on the bottom line
//   Ask everyone      colours all 200 and draws the true 60% across both lines
//
// After a few presses the top line's dots are spread from about 20% to 100%
// and the bottom line's sit close together near 60%: a small sample's answer
// jumps about; a large one settles. Each line shows its own spread, "from …
// to …". Buttons only; the random draws are real, so no two lessons match.
//
// One wide SVG stage; the buttons are the house Btn. EN/FR through tr().
import { useState } from 'react'
import { Users, UsersRound, School, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../../y7-science/U03_models/ui.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', MUTED = '#5b6770', DOT = '#d0d7de', KEY = '#c25e12', BLUE = '#1a5fa8'
const YES = '#4a8b23', NO = '#c8102e', GREEN_DARK = '#3d731c'

const N = 200
const LIKE = 120 // 60%
// Who likes the menu: fixed for the lesson (a seeded shuffle), unknown to the class.
const LIKES = (() => {
  const a = Array.from({ length: N }, (_, i) => i < LIKE)
  let s = 20261028
  for (let i = N - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) % 2147483648
    const j = s % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
})()
const pickSample = (n) => {
  const idx = Array.from({ length: N }, (_, i) => i)
  for (let i = N - 1; i > N - 1 - n; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[idx[i], idx[j]] = [idx[j], idx[i]]
  }
  return idx.slice(N - n)
}

// the school, left
const COLS = 20, PITCH = 30, GX = 50, GY = 130
// the two lines, right
const LX0 = 780, LX1 = 1440
const lx = (pct) => LX0 + (pct / 100) * (LX1 - LX0)
const ROWS = [{ n: 5, y: 250, color: KEY }, { n: 50, y: 450, color: BLUE }]

export function SampleSizes({ lang = 'en', isDisplayMode = false }) {
  const [last, setLast] = useState(null) // { n, picked: [i…], yes }
  const [results, setResults] = useState({ 5: [], 50: [] }) // percentages
  const [everyone, setEveryone] = useState(false)
  const big = isDisplayMode

  const ask = (n) => {
    const picked = pickSample(n)
    const yes = picked.filter((i) => LIKES[i]).length
    setLast({ n, picked, yes })
    setResults((r) => ({ ...r, [n]: [...r[n], Math.round((100 * yes) / n)] }))
  }
  const reset = () => { setLast(null); setResults({ 5: [], 50: [] }); setEveryone(false) }
  const asked = new Set(last ? last.picked : [])

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 560" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="560" rx="16" fill="#ffffff" />

          {/* the question and the school */}
          <text x="40" y="56" fontFamily={FONT} fontSize="30" fontWeight="900" fill={INK}>{t(lang, 'Do you like the new canteen menu?', 'Aimes-tu le nouveau menu de la cantine ?')}</text>
          <text x="40" y="96" fontFamily={FONT} fontSize="24" fontWeight="800" fill={MUTED}>{t(lang, 'Mr Bowen’s school: 200 students', 'L’école de M. Bowen : 200 élèves')}</text>
          {LIKES.map((like, i) => {
            const on = everyone || asked.has(i)
            return (
              <circle key={i} cx={GX + (i % COLS) * PITCH} cy={GY + Math.floor(i / COLS) * PITCH} r={asked.has(i) ? 11 : 9}
                fill={on ? (like ? YES : NO) : DOT} stroke={asked.has(i) ? INK : 'none'} strokeWidth="2" />
            )
          })}
          {last && !everyone && (
            <g>
              <text x="40" y="474" fontFamily={FONT} fontSize="28" fontWeight="900" fill={INK}>
                {t(lang, `Sample of ${last.n}: ${last.yes} said yes`, `Échantillon de ${last.n}\u00a0: ${last.yes} ont dit oui`)}
              </text>
              <text x="40" y="526" fontFamily={FONT} fontSize="40" fontWeight="900" fill={last.n === 5 ? KEY : BLUE}>
                {`${last.yes} ${t(lang, 'out of', 'sur')} ${last.n} = ${Math.round((100 * last.yes) / last.n)}%`}
              </text>
            </g>
          )}
          {everyone && (
            <g>
              <text x="40" y="474" fontFamily={FONT} fontSize="28" fontWeight="900" fill={INK}>{t(lang, 'Everyone: 120 said yes', 'Tout le monde : 120 ont dit oui')}</text>
              <text x="40" y="526" fontFamily={FONT} fontSize="40" fontWeight="900" fill={GREEN_DARK}>{t(lang, '120 out of 200 = 60%', '120 sur 200 = 60%')}</text>
            </g>
          )}
          {!last && !everyone && (
            <text x="40" y="500" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, 'Nobody has been asked yet.', 'Personne n’a encore répondu.')}</text>
          )}

          {/* the two lines: one dot per sample */}
          {ROWS.map((row) => {
            const vals = results[row.n]
            const counts = {}
            const lo = vals.length ? Math.min(...vals) : null
            const hi = vals.length ? Math.max(...vals) : null
            return (
              <g key={row.n}>
                <text x={LX0} y={row.y - 120} fontFamily={FONT} fontSize="26" fontWeight="900" fill={row.color}>
                  {row.n === 5 ? t(lang, 'Samples of 5', 'Échantillons de 5') : t(lang, 'Samples of 50', 'Échantillons de 50')}
                </text>
                <line x1={LX0} y1={row.y} x2={LX1} y2={row.y} stroke={INK} strokeWidth="3" />
                {[0, 20, 40, 60, 80, 100].map((p) => (
                  <g key={p}>
                    <line x1={lx(p)} y1={row.y} x2={lx(p)} y2={row.y + 12} stroke={INK} strokeWidth="2.5" />
                    <text x={lx(p)} y={row.y + 34} fontFamily={FONT} fontSize="22" fontWeight="800" fill={INK} textAnchor="middle">{p}%</text>
                  </g>
                ))}
                {vals.map((v, j) => {
                  counts[v] = (counts[v] || 0) + 1
                  const newest = j === vals.length - 1 && last && last.n === row.n
                  return <circle key={j} cx={lx(v)} cy={row.y - 14 - Math.min(counts[v] - 1, 4) * 20} r={newest ? 11 : 9} fill={row.color} stroke={newest ? INK : '#ffffff'} strokeWidth="2" />
                })}
                {vals.length >= 2 && (
                  <g>
                    <rect x={lx(lo) - 6} y={row.y + 42} width={lx(hi) - lx(lo) + 12} height="9" rx="5" fill={row.color} opacity="0.35" />
                    <text x={LX1} y={row.y - 120} fontFamily={FONT} fontSize="24" fontWeight="900" fill={row.color} textAnchor="end">
                      {t(lang, `from ${lo}% to ${hi}%`, `de ${lo}% à ${hi}%`)}
                    </text>
                  </g>
                )}
              </g>
            )
          })}
          {everyone && (
            <g>
              <line x1={lx(60)} y1="96" x2={lx(60)} y2="528" stroke={GREEN_DARK} strokeWidth="4" strokeDasharray="12 9" />
              <rect x={lx(60) - 92} y="512" width="184" height="40" rx="10" fill="#eef6e6" stroke={GREEN_DARK} strokeWidth="2" />
              <text x={lx(60)} y="540" fontFamily={FONT} fontSize="24" fontWeight="900" fill={GREEN_DARK} textAnchor="middle">{t(lang, 'everyone: 60%', 'tous : 60%')}</text>
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="orange" icon={Users} onClick={() => ask(5)}>{t(lang, 'Ask 5 students', 'Demander à 5 élèves')}</Btn>
        <Btn big={big} tone="blue" icon={UsersRound} onClick={() => ask(50)}>{t(lang, 'Ask 50 students', 'Demander à 50 élèves')}</Btn>
        <Btn big={big} tone="green" icon={School} disabled={everyone} onClick={() => setEveryone(true)}>{t(lang, 'Ask everyone', 'Demander à tous')}</Btn>
        <Btn big={big} tone="slate" icon={RotateCcw} disabled={!last && !everyone} onClick={reset}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

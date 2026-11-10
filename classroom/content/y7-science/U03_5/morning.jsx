// content/y7-science/U03_5/morning.jsx
// MR BOWEN'S MORNING — the stepper the class answers before each press.
//
// The book's three numbers sit across the top (page 106): 2 000 J for a floor
// of stairs, 200 J for every metre you run, 400 000 J to boil a litre of
// water. The next thing Mr Bowen does is always on the screen with "? J"; the
// class works out the joules, says them, and the press shows the answer and
// its bar, and asks the next one:
//
//   1  He climbs 3 floors to the staff room.        3 × 2 000 =   6 000 J
//   2  He is late. He runs 50 m to his class.        50 × 200 =  10 000 J
//   3  He forgot his mug. He runs 100 m back.        100 × 200 = 20 000 J
//   4  He boils 1 litre of water for his coffee.               400 000 J
//
// The last press makes the chart zoom out: the kettle needs 11 times as much
// as all his climbing and running put together (400 000 J against 36 000 J). A
// shaded strip marks the old chart, 0 to 20 000 J, so the class can see where
// bars 1 to 3 went. The starter's question (how many floors is one kettle?) is
// the next slide, so 200 floors is never shown here.
import { useState } from 'react'
import { Undo2, RotateCcw, ChevronRight } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { INK, KEY, MUTED, FONT, kettle } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const BLUE = '#1a5fa8'
const RULE = '#d5dbe1'

// [English lines, French lines], the sum, the joules
const STEPS = [
  { en: ['He climbs 3 floors', 'to the staff room.'], fr: ['Il monte 3 étages jusqu’à', 'la salle des profs.'], sum: '3 × 2 000', j: 6000 },
  { en: ['He is late. He runs', '50 m to his class.'], fr: ['Il est en retard. Il court', '50 m jusqu’à sa classe.'], sum: '50 × 200', j: 10000 },
  { en: ['He forgot his mug. He', 'runs 100 m back to get it.'], fr: ['Il a oublié sa tasse. Il court', '100 m pour aller la chercher.'], sum: '100 × 200', j: 20000 },
  { en: ['He boils 1 litre of', 'water for his coffee.'], fr: ['Il fait bouillir 1 litre', 'd’eau pour son café.'], sum: '', j: 400000 },
]
const RATES = [
  ['1 floor of stairs: 2 000 J', '1 étage d’escalier : 2 000 J'],
  ['Run 1 metre: 200 J', 'Courir 1 mètre : 200 J'],
  ['Boil 1 litre: 400 000 J', 'Bouillir 1 litre : 400 000 J'],
]
const fmtJ = (n) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} J`

// the chart: before the kettle it goes up to 20 000 J, after it to 400 000 J
const C = { x0: 800, x1: 1470, y0: 468, y1: 150 }
const BAR_W = 116
const barX = (i) => C.x0 + 36 + i * 162
const SMALL = { max: 20000, ticks: [0, 5000, 10000, 15000, 20000] }
const BIG = { max: 400000, ticks: [0, 100000, 200000, 300000, 400000] }
const rowY = (i) => 168 + i * 78

export function MorningJoules({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0) // answers shown
  const big = isDisplayMode
  const L = (s) => (lang === 'fr' ? s.fr : s.en)
  const scale = k >= 4 ? BIG : SMALL
  const H = C.y0 - C.y1
  const done = k >= STEPS.length

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />

          {/* the book's numbers, always on the screen */}
          {RATES.map((r, i) => (
            <g key={i}>
              <rect x={30 + i * 484} y="18" width="468" height="58" rx="14" fill="#fdf1e3" stroke={KEY} strokeWidth="2.5" />
              <text x={30 + i * 484 + 234} y="57" fontFamily={FONT} fontSize="27" fontWeight="900" fill={KEY} textAnchor="middle">{lang === 'fr' ? r[1] : r[0]}</text>
            </g>
          ))}

          {/* the morning, one row at a time; the next one asks */}
          {STEPS.map((s, i) => {
            if (i > k) return null
            const asked = i === k
            const y = rowY(i)
            return (
              <g key={i}>
                <rect x="24" y={y - 6} width="656" height="70" rx="12" fill={asked ? '#e9f1fa' : '#f7fafc'} stroke={asked ? BLUE : RULE} strokeWidth={asked ? 3 : 1.5} />
                <circle cx="56" cy={y + 29} r="19" fill={asked ? BLUE : MUTED} />
                <text x="56" y={y + 37} fontFamily={FONT} fontSize="22" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
                <text x="90" y={y + 23} fontFamily={FONT} fontSize="24" fontWeight="800" fill={INK}>{L(s)[0]}</text>
                <text x="90" y={y + 51} fontFamily={FONT} fontSize="24" fontWeight="800" fill={INK}>{L(s)[1]}</text>
                {asked ? (
                  <text x="666" y={y + 44} fontFamily={FONT} fontSize="36" fontWeight="900" fill={BLUE} textAnchor="end">? J</text>
                ) : (
                  <g>
                    <text x="666" y={s.sum ? y + 32 : y + 44} fontFamily={FONT} fontSize="32" fontWeight="900" fill={KEY} textAnchor="end">{fmtJ(s.j)}</text>
                    {s.sum && <text x="666" y={y + 58} fontFamily={FONT} fontSize="19" fontWeight="700" fill={MUTED} textAnchor="end">{s.sum}</text>}
                  </g>
                )}
              </g>
            )
          })}

          {/* the chart */}
          {scale.ticks.map((v) => (
            <g key={`${scale.max}-${v}`}>
              <line x1={C.x0} y1={C.y0 - (v / scale.max) * H} x2={C.x1} y2={C.y0 - (v / scale.max) * H} stroke={v ? '#eef1f4' : INK} strokeWidth={v ? 1.5 : 2.5} />
              <text x={C.x0 - 10} y={C.y0 - (v / scale.max) * H + 7} fontFamily={FONT} fontSize="19" fill={MUTED} textAnchor="end">{String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</text>
            </g>
          ))}
          <line x1={C.x0} y1={C.y0} x2={C.x0} y2={C.y1 - 6} stroke={INK} strokeWidth="2.5" />
          <text x={C.x0 - 60} y="128" fontFamily={FONT} fontSize="21" fontWeight="700" fill={MUTED}>{t(lang, 'joules (J)', 'joules (J)')}</text>
          {/* drawn behind the bars */}
          {done && (
            <g>
              {/* the old chart, 0 to 20 000 J, is now this thin strip at the bottom */}
              <rect x={C.x0} y={C.y0 - (SMALL.max / BIG.max) * H} width={barX(3) - C.x0 - 14} height={(SMALL.max / BIG.max) * H} fill="#fdf1e3" />
              <line x1={C.x0} y1={C.y0 - (SMALL.max / BIG.max) * H} x2={barX(3) - 14} y2={C.y0 - (SMALL.max / BIG.max) * H} stroke={KEY} strokeWidth="2.5" strokeDasharray="8 6" />
            </g>
          )}
          {STEPS.map((s, i) => {
            const shown = i < k
            const h = shown ? Math.min(1, s.j / scale.max) : 0
            return (
              <g key={i}>
                <rect x={barX(i)} y={C.y1} width={BAR_W} height={H} rx="6" fill={i === 3 ? '#d83a2e' : KEY}
                  style={{ transform: `scaleY(${h})`, transformOrigin: `0px ${C.y0}px`, transition: 'transform 1.1s cubic-bezier(.4,0,.2,1)' }} />
                <circle cx={barX(i) + BAR_W / 2} cy={C.y0 + 30} r="17" fill={shown ? MUTED : RULE} />
                <text x={barX(i) + BAR_W / 2} y={C.y0 + 37} fontFamily={FONT} fontSize="20" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
              </g>
            )
          })}
          {done && (
            <g>
              <text x={C.x0 + 16} y={C.y0 - (SMALL.max / BIG.max) * H - 14} fontFamily={FONT} fontSize="21" fontWeight="800" fill={KEY}>{t(lang, 'the old chart: 0 to 20 000 J', 'l’ancien graphique : 0 à 20 000 J')}</text>
              <g dangerouslySetInnerHTML={{ __html: kettle(barX(3) + BAR_W / 2, C.y1 + 70, 0.42) }} />
              <rect x={C.x0 + 20} y={C.y1 + 4} width="470" height="86" rx="12" fill="#fdecee" stroke="#d83a2e" strokeWidth="2.5" />
              <text x={C.x0 + 255} y={C.y1 + 40} fontFamily={FONT} fontSize="24" fontWeight="900" fill="#d83a2e" textAnchor="middle">{t(lang, 'Zoom out! The kettle needs', 'On dézoome ! La bouilloire demande')}</text>
              <text x={C.x0 + 255} y={C.y1 + 72} fontFamily={FONT} fontSize="24" fontWeight="900" fill="#d83a2e" textAnchor="middle">{t(lang, '11 times as much as all the rest.', '11 fois plus que tout le reste.')}</text>
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={done} onClick={() => setK((v) => Math.min(STEPS.length, v + 1))}>{t(lang, 'Show the joules', 'Voir les joules')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

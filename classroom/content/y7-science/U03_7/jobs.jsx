// content/y7-science/U03_7/jobs.jsx
// THREE PROCESSES — the book's Getting started (page 117), for pairs: burning wood
// to cook, walking up stairs, cycling on a flat road. Each is drawn with its
// energy-change diagram underneath: a box for where the energy comes FROM,
// a green arrow to the USEFUL energy and a red arrow to the WASTED energy.
// One press fills one row in all three, so pairs say it first:
//
//   1  from     chemical, chemical, chemical  (wood, food, food: all three!)
//   2  useful   thermal · gravitational potential · kinetic
//   3  wasted   light and thermal · thermal · thermal and sound
//
// The book asks only "from" and "useful"; the third row is this lesson.
// "Level road" in the book is "flat road" here: no climbing, so no
// gravitational potential.
import { useState } from 'react'
import { Undo2, RotateCcw, ChevronRight } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { INK, MUTED, FONT, USEFUL, WASTED, potFire, stairs, cyclist, arrow } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const RULE = '#d5dbe1'
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

// [picture, name EN, name FR, from, hint EN, hint FR, useful lines, wasted lines]
const JOBS = [
  [(x) => potFire(x, 112, 0.72), 'Burning wood to cook', 'Brûler du bois pour cuisiner', 'chemical', 'in the wood', 'dans le bois', ['thermal'], ['light,', 'thermal']],
  [(x) => stairs(x, 116, 0.6), 'Walking up stairs', 'Monter un escalier', 'chemical', 'in food', 'dans la nourriture', ['gravitational', 'potential'], ['thermal']],
  [(x) => cyclist(x, 118, 0.62), 'Cycling on a flat road', 'Rouler à vélo sur du plat', 'chemical', 'in food', 'dans la nourriture', ['kinetic'], ['thermal,', 'sound']],
]
const COL_W = 470
const colX = (i) => 30 + i * (COL_W + 10)
const FROM = { w: 230, y: 250, h: 72 }
const LOW = { w: 200, y: 392, h: 82 }

function Box({ x, y, w, h, lines, color, shown, hint }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={shown ? '#ffffff' : '#f7fafc'} stroke={shown ? color : RULE} strokeWidth={shown ? 4 : 3} strokeDasharray={shown ? undefined : '10 8'} />
      {shown ? (
        <g>
          {lines.map((line, j) => (
            <text key={j} x={x + w / 2} y={y + h / 2 + (j - (lines.length - 1) / 2) * 30 + (hint ? -2 : 9)} fontFamily={FONT} fontSize={lines.length > 1 ? 24 : 28} fontWeight="900" fill={color} textAnchor="middle">{line}</text>
          ))}
          {hint && <text x={x + w / 2} y={y + h - 12} fontFamily={FONT} fontSize="20" fontWeight="700" fill={MUTED} textAnchor="middle">{hint}</text>}
        </g>
      ) : (
        <text x={x + w / 2} y={y + h / 2 + 17} fontFamily={FONT} fontSize="48" fontWeight="900" fill={RULE} textAnchor="middle">?</text>
      )}
    </g>
  )
}

export function ThreeProcesses({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0) // rows shown: 0 none, 1 from, 2 + useful, 3 + wasted
  const big = isDisplayMode
  const fr = lang === 'fr'
  const NEXT = [
    t(lang, 'Where does the energy come from?', 'D’où vient l’énergie ?'),
    t(lang, 'What useful energy do we get?', 'Quelle énergie utile obtient-on ?'),
    t(lang, 'What energy is wasted?', 'Quelle énergie est gaspillée ?'),
  ]

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 540" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="540" rx="16" fill="#ffffff" />
          {JOBS.map(([pic, nameEn, nameFr, from, hintEn, hintFr, useful, wasted], i) => {
            const x0 = colX(i)
            const cx = x0 + COL_W / 2
            const ux = x0 + 20, wx = x0 + COL_W - 20 - LOW.w
            return (
              <g key={i}>
                <rect x={x0} y="12" width={COL_W} height="476" rx="18" fill="#fbfdff" stroke="#e2e8f0" strokeWidth="2" />
                <Pic svg={pic(cx)} />
                <text x={cx} y="226" fontFamily={FONT} fontSize="25" fontWeight="900" fill={INK} textAnchor="middle">{fr ? nameFr : nameEn}</text>
                <Box x={cx - FROM.w / 2} y={FROM.y} w={FROM.w} h={FROM.h} lines={[from]} color={INK} shown={k >= 1} hint={fr ? hintFr : hintEn} />
                <Pic svg={arrow(cx - 30, FROM.y + FROM.h + 6, ux + LOW.w / 2 + 20, LOW.y - 8, k >= 2 ? USEFUL : RULE, 6, 22)} />
                <Pic svg={arrow(cx + 30, FROM.y + FROM.h + 6, wx + LOW.w / 2 - 20, LOW.y - 8, k >= 3 ? WASTED : RULE, 6, 22)} />
                <Box x={ux} y={LOW.y} w={LOW.w} h={LOW.h} lines={useful} color={USEFUL} shown={k >= 2} />
                <Box x={wx} y={LOW.y} w={LOW.w} h={LOW.h} lines={wasted} color={WASTED} shown={k >= 3} />
              </g>
            )
          })}
          {/* the arrows' key, under the columns */}
          <text x="750" y="524" fontFamily={FONT} fontSize="24" fontWeight="800" fill={MUTED} textAnchor="middle">
            {k < 3 ? <>{t(lang, 'Next: ', 'Ensuite : ')}<tspan fill={INK}>{NEXT[k]}</tspan></> : t(lang, 'Every process wastes some energy.', 'Chaque processus gaspille de l’énergie.')}
          </text>
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === 3} onClick={() => setK((v) => Math.min(3, v + 1))}>{t(lang, 'Show', 'Afficher')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

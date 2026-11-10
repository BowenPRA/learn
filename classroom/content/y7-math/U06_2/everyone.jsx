// content/y7-math/U06_2/everyone.jsx
// EVERYONE OR A SAMPLE? — the say-it-first stepper that opens 6.2. Six
// situations on cards; before each press the class says "ask everyone" or
// "take a sample", and why. One press turns one card. The next slide names the
// words: population, sample, sample size.
//
// One wide SVG stage (a showcase gives a short, wide box); the buttons are the
// house Btn. EN/FR through tr().
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../../y7-science/U03_models/ui.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', MUTED = '#5b6770', RULE = '#d5dbe1', KEY = '#c25e12', TEAL = '#0087a8'

const CARDS = [
  { lines: [['Our class of 27:', 'how do you get here?'], ['Notre classe de 27 :', 'comment viens-tu ?']], all: true,
    why: ['Only 27: it is quick.', 'Seulement 27 : c’est rapide.'], icon: 'class' },
  { lines: [['A doctor checks', 'your blood.'], ['Le médecin vérifie', 'ton sang.']], all: false,
    why: ['Not all of it!', 'Pas tout !'], icon: 'blood' },
  { lines: [['2000 workers: is the', 'canteen food good?'], ['2000 employés :', 'la cantine, c’est bon ?']], all: false,
    why: ['Too many to ask.', 'Trop de monde.'], icon: 'bowl' },
  { lines: [['Do these 500', 'matches work?'], ['Ces 500 allumettes', 'marchent-elles ?']], all: false,
    why: ['Testing burns them.', 'Les tester les brûle.'], icon: 'match' },
  { lines: [['100 million people:', 'favourite fruit?'], ['100 millions de gens :', 'fruit préféré ?']], all: false,
    why: ['Far too many.', 'Bien trop nombreux.'], icon: 'globe' },
  { lines: [['Exam results:', 'each student’s mark'], ['Examen : la note', 'de chaque élève']], all: true,
    why: ['Every mark matters.', 'Chaque note compte.'], icon: 'exam' },
]

const CW = 460, CH = 230
const cx = (i) => 30 + (i % 3) * (CW + 20)
const cy = (i) => 20 + Math.floor(i / 3) * (CH + 20)

function Icon({ kind, x, y }) {
  const s = { stroke: INK, strokeWidth: 3 }
  switch (kind) {
    case 'class': return (
      <g>
        {[-30, 0, 30].map((dx, i) => (
          <g key={i}>
            <rect x={x + dx - 13} y={y + (i === 1 ? -6 : 4)} width="26" height="40" rx="9" fill={['#1a5fa8', '#4a8b23', '#5c2483'][i]} {...s} />
            <circle cx={x + dx} cy={y + (i === 1 ? -18 : -8)} r="12" fill="#e8b98f" {...s} />
          </g>
        ))}
      </g>
    )
    case 'blood': return (
      <g>
        <rect x={x - 14} y={y - 44} width="28" height="88" rx="12" fill="#ffffff" {...s} />
        <rect x={x - 11} y={y - 4} width="22" height="45" rx="9" fill="#c8102e" />
        <rect x={x - 18} y={y - 52} width="36" height="14" rx="4" fill="#9aa5b1" {...s} />
      </g>
    )
    case 'bowl': return (
      <g>
        <path d={`M ${x - 40} ${y} h 80 q -6 38 -40 38 q -34 0 -40 -38 z`} fill="#ffffff" {...s} />
        <line x1={x - 10} y1={y - 44} x2={x + 6} y2={y + 6} stroke="#8a6a3c" strokeWidth="5" strokeLinecap="round" />
        <line x1={x + 4} y1={y - 46} x2={x + 16} y2={y + 6} stroke="#8a6a3c" strokeWidth="5" strokeLinecap="round" />
      </g>
    )
    case 'match': return (
      <g>
        <rect x={x - 38} y={y - 6} width="76" height="44" rx="5" fill="#e8c23a" {...s} />
        <rect x={x - 38} y={y + 8} width="76" height="10" fill="#8a5d2e" />
        <line x1={x - 6} y1={y - 8} x2={x + 22} y2={y - 44} stroke="#c8955c" strokeWidth="6" strokeLinecap="round" />
        <path d={`M ${x + 24} ${y - 46} q -10 -14 4 -26 q 10 14 -4 26 z`} fill="#f2a65a" stroke="#c25e12" strokeWidth="2" />
      </g>
    )
    case 'globe': return (
      <g>
        <circle cx={x} cy={y} r="42" fill="#cfe6f5" {...s} />
        <path d={`M ${x - 22} ${y - 30} q 18 6 12 24 q -14 10 -4 28 M ${x + 10} ${y - 38} q 14 20 26 18`} fill="none" stroke="#4a8b23" strokeWidth="7" strokeLinecap="round" />
        <ellipse cx={x} cy={y} rx="18" ry="42" fill="none" stroke={MUTED} strokeWidth="1.5" />
      </g>
    )
    case 'exam': return (
      <g>
        <rect x={x - 32} y={y - 44} width="64" height="88" rx="4" fill="#ffffff" {...s} />
        {[-26, -12, 2, 16].map((dy) => <line key={dy} x1={x - 22} y1={y + dy} x2={x + 6} y2={y + dy} stroke={RULE} strokeWidth="4" />)}
        <circle cx={x + 16} cy={y + 26} r="15" fill="none" stroke="#c8102e" strokeWidth="3" />
        <text x={x + 16} y={y + 33} fontFamily={FONT} fontSize="20" fontWeight="900" fill="#c8102e" textAnchor="middle">A</text>
      </g>
    )
    default: return null
  }
}

export function EveryoneOrSample({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0) // cards 0..k-1 are turned
  const big = isDisplayMode
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />
          {CARDS.map((c, i) => {
            const x = cx(i), y = cy(i)
            const shown = i < k
            const next = i === k
            const color = c.all ? TEAL : KEY
            const lines = L(c.lines)
            return (
              <g key={i}>
                <rect x={x} y={y} width={CW} height={CH} rx="18" fill={next ? '#fdf1e3' : '#f7f9fb'} stroke={next ? KEY : RULE} strokeWidth={next ? 4 : 2.5} />
                <Icon kind={c.icon} x={x + 70} y={y + 82} />
                <text x={x + 136} y={y + 66} fontFamily={FONT} fontSize={lines[0].length > 20 ? 22 : 25} fontWeight="900" fill={INK}>{lines[0]}</text>
                <text x={x + 136} y={y + 100} fontFamily={FONT} fontSize={lines[1].length > 20 ? 22 : 25} fontWeight="900" fill={INK}>{lines[1]}</text>
                <rect x={x + 24} y={y + 146} width={CW - 48} height="44" rx="22" fill={shown ? color : '#ffffff'} stroke={shown ? color : RULE} strokeWidth="2.5" strokeDasharray={shown ? undefined : '8 6'} />
                <text x={x + CW / 2} y={y + 176} fontFamily={FONT} fontSize="24" fontWeight="900" fill={shown ? '#ffffff' : RULE} textAnchor="middle">
                  {shown ? (c.all ? t(lang, 'Ask everyone', 'Demander à tous') : t(lang, 'Take a sample', 'Prendre un échantillon')) : '?'}
                </text>
                {shown && <text x={x + CW / 2} y={y + 216} fontFamily={FONT} fontSize="22" fontWeight="800" fill={MUTED} textAnchor="middle">{L(c.why)}</text>}
              </g>
            )
          })}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === CARDS.length} onClick={() => setK((v) => Math.min(CARDS.length, v + 1))}>
          {t(lang, 'Show the answer', 'Montrer la réponse')}
        </Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

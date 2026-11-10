// content/y7-math/U06_1/bag.jsx
// MR BOWEN'S BAG — the say-it-first stepper that opens the lesson. Six
// questions about his bag; before each press the class guesses the answer
// and says what kind of answer it will be: a word, a number you count, or a
// number you measure. One press shows one row's answer and its kind. The
// next slide names the three kinds (categorical, discrete, continuous), and
// its diagram (KINDS) sorts these same six facts.
//
// One wide SVG stage (a showcase gives a short, wide box); the buttons are the
// house Btn. Mr Bowen is the shared cartoon. EN/FR through tr().
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../../y7-science/U03_models/ui.jsx'
import { MrBowen } from '../../y7-science/U03_coffee/dating.jsx'
import { KINDS } from './kinds.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', MUTED = '#5b6770', RULE = '#d5dbe1', KEY = '#c25e12'

const ROWS = [
  { q: ['What colour is it?', 'De quelle couleur est-il ?'], a: ['blue', 'bleu'], kind: 'word' },
  { q: ['How many pens are in it?', 'Combien de stylos dedans ?'], a: ['7', '7'], kind: 'count' },
  { q: ['How heavy is it?', 'Combien pèse-t-il ?'], a: ['2.35 kg', '2.35 kg'], kind: 'measure' },
  { q: ['What fruit is in it?', 'Quel fruit dedans ?'], a: ['a banana', 'une banane'], kind: 'word' },
  { q: ['How many books are in it?', 'Combien de livres dedans ?'], a: ['3', '3'], kind: 'count' },
  { q: ['How long is the banana?', 'Longueur de la banane ?'], a: ['18.6 cm', '18.6 cm'], kind: 'measure' },
]

const Y0 = 52 // top of the first row
const PITCH = 74
const ROW_H = 64

// The bag, drawn about its handle: blue, two pens and a banana showing.
function Bag({ x, y }) {
  return (
    <g>
      <path d={`M ${x - 22} ${y + 28} Q ${x - 22} ${y} ${x} ${y} Q ${x + 22} ${y} ${x + 22} ${y + 28}`} fill="none" stroke={INK} strokeWidth="7" />
      <line x1={x - 30} y1={y + 6} x2={x - 40} y2={y + 46} stroke="#c8102e" strokeWidth="8" strokeLinecap="round" />
      <line x1={x - 16} y1={y + 2} x2={x - 22} y2={y + 46} stroke="#1a5fa8" strokeWidth="8" strokeLinecap="round" />
      <path d={`M ${x + 18} ${y + 40} Q ${x + 40} ${y - 6} ${x + 64} ${y + 10}`} fill="none" stroke="#e8c23a" strokeWidth="14" strokeLinecap="round" />
      <rect x={x - 62} y={y + 34} width="124" height="124" rx="20" fill="#3f7fc4" stroke={INK} strokeWidth="3" />
      <rect x={x - 40} y={y + 86} width="80" height="48" rx="10" fill="#5f97d3" stroke={INK} strokeWidth="2.5" />
    </g>
  )
}

export function BagStepper({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0) // rows 0..k-1 are answered
  const big = isDisplayMode
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />

          {/* Mr Bowen and his bag; the bag first, so his hand closes over the handle */}
          <rect x="20" y="20" width="380" height="480" rx="20" fill="#f6f1e7" />
          <rect x="20" y="448" width="380" height="52" fill="#e4d6c1" />
          <Bag x={258} y={280} />
          <MrBowen x={150} y={448 - 268 * 0.92} scale={0.92} handRight={[117, 90]} />

          {/* the column heads */}
          <text x="470" y="34" fontFamily={FONT} fontSize="22" fontWeight="800" fill={MUTED}>{t(lang, 'Question', 'Question')}</text>
          <text x="1010" y="34" fontFamily={FONT} fontSize="22" fontWeight="800" fill={MUTED} textAnchor="middle">{t(lang, 'Answer', 'Réponse')}</text>
          <text x="1320" y="34" fontFamily={FONT} fontSize="22" fontWeight="800" fill={MUTED} textAnchor="middle">{t(lang, 'What kind?', 'Quel genre ?')}</text>

          {ROWS.map((r, i) => {
            const y = Y0 + i * PITCH
            const shown = i < k
            const next = i === k
            const kind = KINDS[r.kind]
            return (
              <g key={i}>
                <rect x="430" y={y} width="1050" height={ROW_H} rx="14"
                  fill={shown ? kind.tint : next ? '#fdf1e3' : '#f7f9fb'}
                  stroke={shown ? kind.color : next ? KEY : RULE} strokeWidth={next ? 4 : 2.5} />
                <text x="458" y={y + 42} fontFamily={FONT} fontSize="27" fontWeight="800" fill={shown || next ? INK : MUTED}>{L(r.q)}</text>
                <text x="1010" y={y + 45} fontFamily={FONT} fontSize="34" fontWeight="900" fill={shown ? INK : RULE} textAnchor="middle">{shown ? L(r.a) : '?'}</text>
                <rect x="1170" y={y + 10} width="296" height={ROW_H - 20} rx="22" fill={shown ? kind.color : '#ffffff'} stroke={shown ? kind.color : RULE} strokeWidth="2.5" strokeDasharray={shown ? undefined : '8 6'} />
                <text x="1318" y={y + 41} fontFamily={FONT} fontSize="24" fontWeight="900" fill={shown ? '#ffffff' : RULE} textAnchor="middle">
                  {shown ? t(lang, kind.en, kind.fr) : '?'}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === ROWS.length} onClick={() => setK((v) => Math.min(ROWS.length, v + 1))}>
          {t(lang, 'Show the answer', 'Montrer la réponse')}
        </Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

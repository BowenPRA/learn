// content/y7-math/U06_1/story.jsx
// WHAT HAPPENS NEXT? — Mr Bowen's canteen survey, a four-panel strip, one
// panel per press, so the class predicts each step before it is shown.
// Deadpan, never flagged as a joke:
//
//   1  Mr Bowen wants to know: is the canteen food good?
//   2  He asks 30 students: "What do you think of the food?"   (the set-up)
//   3  He gets 30 answers. They are all different.
//   4  He makes a bar chart: 30 bars, each one 1.
//   then the question the next slide answers — why is his chart no use? —
//   and the clue: look at his question.
//
// Mr Bowen is the shared cartoon, as in 5.2 and 5.3.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../../y7-science/U03_models/ui.jsx'
import { MrBowen } from '../../y7-science/U03_coffee/dating.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', RULE = '#d5dbe1', TEAL = '#0087a8', BLUE = '#1a5fa8', PURPLE = '#5c2483'
const WALL = '#f6f1e7'

const PANEL_W = 380
const PANEL_H = 400
const TOP = 20
const px = (i) => 30 + i * (PANEL_W + 20)
const FLOOR = TOP + PANEL_H - 25 // 395
const BOWEN = 0.5

// [English lines, French lines] under each panel
const CAPTIONS = [
  [['Mr Bowen wants to know:', 'is the canteen food good?'], ['M. Bowen veut savoir :', 'la cantine, c’est bon ?']],
  [['He asks 30 students.', 'He writes down every answer.'], ['Il demande à 30 élèves.', 'Il note chaque réponse.']],
  [['He gets 30 answers.', 'They are all different.'], ['Il a 30 réponses.', 'Toutes différentes.']],
  [['He makes a bar chart.', '30 bars. Each one is 1.'], ['Il fait un diagramme.', '30 barres. Chacune vaut 1.']],
]
const LAST = 4

function Bowen({ x, mood = 'happy', dx = 0, clipboard = false, hand }) {
  const bx = x + 300 + dx
  const by = FLOOR - 268 * BOWEN
  return (
    <g>
      {clipboard && (
        <g>
          <rect x={bx - 58} y={by + 22} width="34" height="44" rx="4" fill="#c8955c" stroke="#8a5d2e" strokeWidth="2" />
          <rect x={bx - 53} y={by + 30} width="24" height="31" fill="#ffffff" />
        </g>
      )}
      <MrBowen x={bx} y={by} scale={BOWEN} mood={mood} handLeft={clipboard ? [-80, 84] : hand} />
    </g>
  )
}

// A student, seen from the front: no face, no name.
function Student({ x, color }) {
  return (
    <g>
      <rect x={x - 18} y={FLOOR - 70} width="36" height="70" rx="12" fill={color} stroke={INK} strokeWidth="2" />
      <circle cx={x} cy={FLOOR - 86} r="15" fill="#e8b98f" stroke={INK} strokeWidth="2" />
      <path d={`M ${x - 15} ${FLOOR - 90} Q ${x} ${FLOOR - 108} ${x + 15} ${FLOOR - 90}`} fill="#2f2420" />
    </g>
  )
}

// A speech bubble with its tail pointing down-right or down-left.
function Bubble({ x, y, w, h = 44, text, size = 21, tail = 'left' }) {
  const tx = tail === 'left' ? x + 18 : x + w - 18
  const dir = tail === 'left' ? -1 : 1
  return (
    <g>
      <path d={`M ${tx - 8} ${y + h - 2} L ${tx + dir * 14} ${y + h + 16} L ${tx + 8} ${y + h - 2} Z`} fill="#ffffff" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <rect x={x} y={y} width={w} height={h} rx="14" fill="#ffffff" stroke={INK} strokeWidth="2" />
      <rect x={tx - 6} y={y + h - 4} width="12" height="5" fill="#ffffff" />
      <text x={x + w / 2} y={y + h / 2 + size * 0.36} fontFamily={FONT} fontSize={size} fontWeight="800" fill={INK} textAnchor="middle">{text}</text>
    </g>
  )
}

/* ── the four panels ── */
function Wants({ x, lang }) {
  return (
    <g>
      <rect x={x + 30} y={TOP + 56} width="150" height="44" rx="8" fill={TEAL} />
      <text x={x + 105} y={TOP + 86} fontFamily={FONT} fontSize="22" fontWeight="900" fill="#ffffff" textAnchor="middle">{t(lang, 'Canteen', 'Cantine')}</text>
      <rect x={x + 16} y={FLOOR - 96} width="210" height="96" fill="#d9c3a3" stroke={INK} strokeWidth="2.5" />
      <rect x={x + 10} y={FLOOR - 108} width="222" height="16" rx="4" fill="#b98f62" stroke={INK} strokeWidth="2.5" />
      <path d={`M ${x + 50} ${FLOOR - 108} q 4 -30 30 -30 q 26 0 30 30 z`} fill="#ffffff" stroke={INK} strokeWidth="2.5" />
      <path d={`M ${x + 120} ${FLOOR - 108} q 4 -30 30 -30 q 26 0 30 30 z`} fill="#ffffff" stroke={INK} strokeWidth="2.5" />
      <path d={`M ${x + 70} ${FLOOR - 150} q -8 -10 0 -20 M ${x + 90} ${FLOOR - 150} q -8 -10 0 -20 M ${x + 160} ${FLOOR - 150} q -8 -10 0 -20`} fill="none" stroke="#9aa5b1" strokeWidth="3" strokeLinecap="round" />
      <Bowen x={x} clipboard />
    </g>
  )
}

function Asks({ x, lang }) {
  return (
    <g>
      <Student x={x + 50} color={BLUE} />
      <Student x={x + 105} color="#ffffff" />
      <Student x={x + 160} color={BLUE} />
      <Bubble x={x + 120} y={TOP + 60} w={242} h={72} text="" tail="right" />
      <text x={x + 241} y={TOP + 90} fontFamily={FONT} fontSize="21" fontWeight="800" fill={INK} textAnchor="middle">{t(lang, 'What do you think', 'Que penses-tu')}</text>
      <text x={x + 241} y={TOP + 118} fontFamily={FONT} fontSize="21" fontWeight="800" fill={INK} textAnchor="middle">{t(lang, 'of the food?', 'de la cantine ?')}</text>
      <Bowen x={x} clipboard />
    </g>
  )
}

function Answers({ x, lang }) {
  const B = [
    [16, 54, 70, 'OK', 'OK'], [100, 54, 110, 'Rice!', 'Du riz !'], [228, 62, 140, 'Too spicy', 'Trop épicé'],
    [24, 134, 52, '7', '7'], [96, 140, 100, 'Hmm…', 'Bof…'], [214, 136, 80, 'Yes', 'Oui'],
    [20, 212, 110, 'Nice', 'Pas mal'], [148, 214, 140, 'More fish', 'Du poisson !'],
  ]
  return (
    <g>
      {B.map(([bx, by, w, en, fr], i) => (
        <Bubble key={i} x={x + bx} y={TOP + by} w={w} text={t(lang, en, fr)} tail={i % 2 ? 'right' : 'left'} />
      ))}
      <Bowen x={x} mood="dizzy" dx={20} clipboard />
    </g>
  )
}

function Chart({ x }) {
  const bars = Array.from({ length: 30 }, (_, i) => i)
  return (
    <g>
      <rect x={x + 18} y={TOP + 60} width="240" height="210" rx="6" fill="#ffffff" stroke={INK} strokeWidth="2.5" />
      <line x1={x + 34} y1={TOP + 246} x2={x + 248} y2={TOP + 246} stroke={INK} strokeWidth="2.5" />
      <line x1={x + 34} y1={TOP + 246} x2={x + 34} y2={TOP + 80} stroke={INK} strokeWidth="2.5" />
      <text x={x + 28} y={TOP + 220} fontFamily={FONT} fontSize="16" fontWeight="800" fill={INK} textAnchor="end">1</text>
      {bars.map((i) => (
        <rect key={i} x={x + 39 + i * 7} y={TOP + 214} width="5" height="32" fill={PURPLE} />
      ))}
      <line x1={x + 120} y1={TOP + 270} x2={x + 108} y2={FLOOR} stroke="#8a6a3c" strokeWidth="6" />
      <line x1={x + 160} y1={TOP + 270} x2={x + 172} y2={FLOOR} stroke="#8a6a3c" strokeWidth="6" />
      <Bowen x={x} dx={10} hand={[-90, 30]} />
    </g>
  )
}

const PANELS = [Wants, Asks, Answers, Chart]

export function SurveyStory({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0) // panels 0..k are shown; k = 4 adds the clue
  const big = isDisplayMode
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])
  const asked = k >= 3

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1640 610" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1640" height="610" rx="16" fill="#ffffff" />
          <defs>
            {PANELS.map((_, i) => (
              <clipPath key={i} id={`survey-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
            ))}
          </defs>
          {PANELS.map((Panel, i) => {
            const x = px(i)
            const shown = i <= k
            return (
              <g key={i}>
                <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill={shown ? WALL : '#f4f6f8'}
                  stroke={shown ? '#c9d3dc' : RULE} strokeWidth="3" strokeDasharray={shown ? undefined : '10 8'} />
                {shown ? (
                  <g clipPath={`url(#survey-p${i})`}>
                    <rect x={x} y={FLOOR} width={PANEL_W} height={TOP + PANEL_H - FLOOR} fill="#e4d6c1" />
                    <line x1={x} y1={FLOOR} x2={x + PANEL_W} y2={FLOOR} stroke="#b9a68a" strokeWidth="3" />
                    <Panel x={x} lang={lang} />
                  </g>
                ) : (
                  <text x={x + PANEL_W / 2} y={TOP + 250} fontFamily={FONT} fontSize="150" fontWeight="900" fill={RULE} textAnchor="middle">?</text>
                )}
                <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill="none" stroke={shown ? '#c9d3dc' : RULE} strokeWidth="3" strokeDasharray={shown ? undefined : '10 8'} />
                <circle cx={x + 30} cy={TOP + 30} r="19" fill={shown ? BLUE : RULE} />
                <text x={x + 30} y={TOP + 38} fontFamily={FONT} fontSize="22" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
                {shown && (
                  <g>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 38} fontFamily={FONT} fontSize="22" fontWeight="900" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[0]}</text>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 68} fontFamily={FONT} fontSize="22" fontWeight="700" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[1]}</text>
                  </g>
                )}
              </g>
            )
          })}
          {asked && (
            <g>
              <rect x="30" y="514" width="1580" height="88" rx="16" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
              <text x="820" y={k >= LAST ? 550 : 568} fontFamily={FONT} fontSize="28" fontWeight="900" fill={INK} textAnchor="middle">
                {t(lang, 'Why is his chart no use?', 'Pourquoi son diagramme ne sert-il à rien ?')}
              </text>
              {k >= LAST && (
                <text x="820" y="586" fontFamily={FONT} fontSize="25" fontWeight="900" fill={TEAL} textAnchor="middle">
                  {t(lang, 'A clue: look at his question in panel 2.', 'Un indice : regarde sa question, case 2.')}
                </text>
              )}
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>
          {k === LAST - 1 ? t(lang, 'A clue', 'Un indice') : t(lang, 'What happens next?', 'Et ensuite ?')}
        </Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

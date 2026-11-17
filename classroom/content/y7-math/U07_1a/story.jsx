// content/y7-math/U07_1a/story.jsx
// WHAT HAPPENS NEXT? — Mr Bowen's party, a four-panel strip, one panel per
// press, so the class predicts each step before it is shown. Deadpan, never
// flagged as a joke:
//
//   1  Mr Bowen has a party. He orders 3 pizzas.
//   2  Each pizza: 4 slices. (He counts them.)
//   3  Nobody comes. (He waits 3 hours.)
//   4  He eats 11 slices. (Not very hungry.)   (one slice is left)
//   then the question the next stepper answers — how many pizzas did he eat? —
//   and the clue: 4 slices make 1 whole pizza.
//
// Mr Bowen is the shared cartoon (src/lib/mrBowen.js), as in 5.2's bookshelf.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { MrBowen } from '../../y7-science/U03_coffee/dating.jsx'
import { Btn, Pie, FONT, INK, RULE, TEAL, BLUE, CRUST, SAUCE } from './parts.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)

const PANEL_W = 380
const PANEL_H = 400
const TOP = 20
const px = (i) => 30 + i * (PANEL_W + 20)
const FLOOR = TOP + PANEL_H - 25 // 395
const WALL = '#f6f1e7'
const BOX = '#e9d3a6'
const BOX_EDGE = '#a9864f'
const BOWEN = 0.5

// [English lines, French lines] under each panel
const CAPTIONS = [
  [['Mr Bowen has a party.', 'He orders 3 pizzas.'], ['M. Bowen fait une fête.', 'Il commande 3 pizzas.']],
  [['Each pizza: 4 slices.', '(He counts them.)'], ['Chaque pizza : 4 parts.', '(Il les compte.)']],
  [['Nobody comes.', '(He waits 3 hours.)'], ['Personne ne vient.', '(Il attend 3 heures.)']],
  [['He eats 11 slices.', '(Not very hungry.)'], ['Il mange 11 parts.', '(Pas très faim.)']],
]
const LAST = 4 // panels 0-3, then the clue

/* ── the pieces ── */
function Table({ x }) {
  const ty = FLOOR - 104
  return (
    <g>
      <rect x={x + 34} y={ty} width="200" height="14" rx="3" fill="#b07a45" stroke="#6f4a25" strokeWidth="3" />
      <line x1={x + 50} y1={ty + 14} x2={x + 50} y2={FLOOR} stroke="#6f4a25" strokeWidth="8" />
      <line x1={x + 218} y1={ty + 14} x2={x + 218} y2={FLOOR} stroke="#6f4a25" strokeWidth="8" />
    </g>
  )
}

// Three closed pizza boxes, stacked on the table.
function Boxes({ x }) {
  const ty = FLOOR - 104
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={x + 62} y={ty - 24 * (i + 1)} width="144" height="22" rx="3" fill={BOX} stroke={BOX_EDGE} strokeWidth="3" />
          <circle cx={x + 134} cy={ty - 24 * (i + 1) + 11} r="6" fill={SAUCE} />
        </g>
      ))}
    </g>
  )
}

function Balloons({ x }) {
  return (
    <g>
      <line x1={x + 70} y1={TOP + 112} x2={x + 52} y2={FLOOR - 104} stroke="#8a95a0" strokeWidth="2" />
      <line x1={x + 116} y1={TOP + 98} x2={x + 60} y2={FLOOR - 104} stroke="#8a95a0" strokeWidth="2" />
      <ellipse cx={x + 70} cy={TOP + 84} rx="24" ry="30" fill="#e0474c" stroke={INK} strokeWidth="2.5" />
      <ellipse cx={x + 116} cy={TOP + 70} rx="24" ry="30" fill="#3d8be0" stroke={INK} strokeWidth="2.5" />
    </g>
  )
}

function Bowen({ x, mood = 'happy', handLeft, handRight }) {
  return <MrBowen x={x + 318} y={FLOOR - 268 * BOWEN} scale={BOWEN} mood={mood} handLeft={handLeft} handRight={handRight} />
}

// An open pizza box seen from above; `slices` of 4 still in it.
function OpenBox({ cx, cy, slices }) {
  return (
    <g>
      <rect x={cx - 46} y={cy - 46} width="92" height="92" rx="4" fill={BOX} stroke={BOX_EDGE} strokeWidth="3" />
      <rect x={cx - 38} y={cy - 38} width="76" height="76" rx="3" fill="#f6ead0" />
      {slices > 0 ? (
        <Pie cx={cx} cy={cy} r={34} n={4} k={slices} style="pizza" />
      ) : (
        [[-12, -8], [9, 6], [-4, 14], [14, -12]].map(([dx, dy], i) => <circle key={i} cx={cx + dx} cy={cy + dy} r="2.6" fill={CRUST} />)
      )}
    </g>
  )
}

/* ── the four panels ── */
function Order({ x }) {
  return (
    <g>
      <Balloons x={x} />
      <Table x={x} />
      <Boxes x={x} />
      <Bowen x={x} />
    </g>
  )
}

function FourSlices({ x }) {
  return (
    <g>
      <Pie cx={x + 140} cy={TOP + 170} r={96} n={4} k={4} style="pizza" />
      {[[1, 50, -50], [2, 50, 50], [3, -50, 50], [4, -50, -50]].map(([n, dx, dy]) => (
        <g key={n}>
          <circle cx={x + 140 + dx} cy={TOP + 170 + dy} r="17" fill="#ffffff" stroke={INK} strokeWidth="2.5" />
          <text x={x + 140 + dx} y={TOP + 177 + dy} fontFamily={FONT} fontSize="20" fontWeight="900" fill={INK} textAnchor="middle">{n}</text>
        </g>
      ))}
      <Bowen x={x} handLeft={[-112, 66]} />
    </g>
  )
}

function Waiting({ x }) {
  const cx = x + 96
  const cy = TOP + 86
  return (
    <g>
      <circle cx={cx} cy={cy} r="38" fill="#ffffff" stroke={INK} strokeWidth="4" />
      <line x1={cx} y1={cy} x2={cx} y2={cy - 26} stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + 20} y2={cy + 8} stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <Table x={x} />
      <Boxes x={x} />
      <Bowen x={x} mood="sad" />
    </g>
  )
}

function Eaten({ x }) {
  return (
    <g>
      <OpenBox cx={x + 76} cy={TOP + 92} slices={0} />
      <OpenBox cx={x + 186} cy={TOP + 92} slices={0} />
      <OpenBox cx={x + 131} cy={TOP + 200} slices={1} />
      <Bowen x={x} handRight={[-6, 140]} />
    </g>
  )
}

const PANELS = [Order, FourSlices, Waiting, Eaten]

export function PartyStory({ lang = 'en', isDisplayMode = false }) {
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
              <clipPath key={i} id={`party-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
            ))}
          </defs>
          {PANELS.map((Panel, i) => {
            const x = px(i)
            const shown = i <= k
            return (
              <g key={i}>
                <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill={shown ? WALL : '#f4f6f8'} />
                {shown ? (
                  <g clipPath={`url(#party-p${i})`}>
                    <rect x={x} y={FLOOR} width={PANEL_W} height={TOP + PANEL_H - FLOOR} fill="#e4d6c1" />
                    <line x1={x} y1={FLOOR} x2={x + PANEL_W} y2={FLOOR} stroke="#b9a68a" strokeWidth="3" />
                    <Panel x={x} />
                  </g>
                ) : (
                  <text x={x + PANEL_W / 2} y={TOP + 250} fontFamily={FONT} fontSize="150" fontWeight="900" fill={RULE} textAnchor="middle">?</text>
                )}
                <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill="none" stroke={shown ? '#c9d3dc' : RULE} strokeWidth="3" strokeDasharray={shown ? undefined : '10 8'} />
                <circle cx={x + 32} cy={TOP + 32} r="22" fill={shown ? BLUE : RULE} />
                <text x={x + 32} y={TOP + 41} fontFamily={FONT} fontSize="26" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
                {shown && (
                  <g>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 40} fontFamily={FONT} fontSize="28" fontWeight="900" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[0]}</text>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 74} fontFamily={FONT} fontSize="28" fontWeight="700" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[1]}</text>
                  </g>
                )}
              </g>
            )
          })}
          {asked && (
            <g>
              <rect x="30" y="510" width="1580" height="94" rx="16" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
              <text x="820" y={k >= LAST ? 548 : 568} fontFamily={FONT} fontSize="32" fontWeight="900" fill={INK} textAnchor="middle">
                {t(lang, 'How many pizzas did Mr Bowen eat?', 'Combien de pizzas M. Bowen a-t-il mangées ?')}
              </text>
              {k >= LAST && (
                <text x="820" y="590" fontFamily={FONT} fontSize="30" fontWeight="900" fill={TEAL} textAnchor="middle">
                  {t(lang, 'A clue: 4 slices make 1 whole pizza.', 'Un indice : 4 parts font 1 pizza entière.')}
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

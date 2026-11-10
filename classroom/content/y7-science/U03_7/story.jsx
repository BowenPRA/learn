// content/y7-science/U03_7/story.jsx
// WHAT HAPPENS NEXT? — Mr Bowen's bag of heat, a four-panel strip, one panel
// per press, so the class predicts each step before it is shown. Deadpan,
// never flagged as a joke. It opens the last part of the lesson (where the
// wasted energy goes, and why it cannot be recovered):
//
//   1  7 a.m. He rides to school. The engine is very hot.
//   2  He has an idea. He catches the heat in a bag.
//   3  10 a.m. His coffee is cold. He opens the bag.
//   4  Nothing. The bag is cold too. (He drinks it anyway.)
//   then the question — where did the heat go, and can he get it back? —
//   and the clue from 3.6: heat moves from hotter things to colder things.
//
// Mr Bowen is the shared cartoon; his coffee went cold in 3.5 too.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { MrBowen } from '../U03_coffee/dating.jsx'
import { mug, clock, motorbike, bag, squiggles } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', RULE = '#d5dbe1', TEAL = '#0087a8', BLUE = '#1a5fa8', RED = '#d83a2e'

const PANEL_W = 380
const PANEL_H = 400
const TOP = 20
const px = (i) => 30 + i * (PANEL_W + 20)
const FLOOR = TOP + PANEL_H - 22
const DESK = FLOOR - 112 // the top of the desk
const MS = 0.6 // the motorbike's scale
const MOTO_Y = FLOOR - 92 * MS
const BOWEN = 0.82
const BOWEN_Y = FLOOR - 268 * BOWEN

// [English lines, French lines] under each panel
const CAPTIONS = [
  [['7 a.m. Mr Bowen rides to', 'school. The engine is hot.'], ['7 h. M. Bowen va à l’école', 'à moto. Le moteur est chaud.']],
  [['He has an idea. He catches', 'the heat in a bag.'], ['Il a une idée. Il attrape', 'la chaleur dans un sac.']],
  [['10 a.m. His coffee is cold.', 'He opens the bag.'], ['10 h. Son café est froid.', 'Il ouvre le sac.']],
  [['Nothing. The bag is cold too.', '(He drinks it anyway.)'], ['Rien. Le sac est froid aussi.', '(Il le boit quand même.)']],
]
const LAST = 4 // panels 0-3, then the clue
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

/* ── the pieces ── */
function Desk({ x }) {
  return (
    <g>
      <rect x={x + 176} y={DESK} width="204" height="16" rx="4" fill="#b5835a" stroke={INK} strokeWidth="3" />
      <rect x={x + 192} y={DESK + 16} width="14" height={FLOOR - DESK - 16} fill="#8a5a2b" />
      <rect x={x + 352} y={DESK + 16} width="14" height={FLOOR - DESK - 16} fill="#8a5a2b" />
    </g>
  )
}

/* ── the four panels ── */
function HotEngine({ x }) {
  return (
    <g>
      <MrBowen x={x + 82} y={BOWEN_Y} scale={BOWEN} />
      <Pic svg={motorbike(x + 262, MOTO_Y, MS)} />
      <Pic svg={squiggles(x + 262, MOTO_Y + 6, 3, 22, 2, RED, 5)} />
      <Pic svg={clock(x + 326, TOP + 56, 7)} />
    </g>
  )
}

// He holds the bag over the engine; the heat goes up into it.
const BAG_HAND = [118, 64] // in his own frame: out to the side, at his chest
function CatchIt({ x }) {
  const hx = x + 120 + BAG_HAND[0] * BOWEN, hy = BOWEN_Y + BAG_HAND[1] * BOWEN
  return (
    <g>
      <MrBowen x={x + 120} y={BOWEN_Y} scale={BOWEN} handRight={BAG_HAND} />
      <Pic svg={motorbike(x + 270, MOTO_Y, MS)} />
      <Pic svg={squiggles(x + 262, MOTO_Y - 10, 3, 18, 1, RED, 5)} />
      <Pic svg={bag(hx + 16, hy + 44, 0.62, true)} />
      <Pic svg={clock(x + 326, TOP + 56, 7)} />
    </g>
  )
}

// At his desk, the bag held over his cold coffee.
const MUG_HAND = [112, 58]
function OpenIt({ x }) {
  const hx = x + 110 + MUG_HAND[0] * BOWEN, hy = BOWEN_Y + MUG_HAND[1] * BOWEN
  return (
    <g>
      <Desk x={x} />
      <Pic svg={mug(x + 300, DESK - 28, 0.4, false)} />
      <MrBowen x={x + 110} y={BOWEN_Y} scale={BOWEN} handRight={MUG_HAND} />
      <Pic svg={bag(hx + 24, hy + 40, 0.56, true)} />
      <Pic svg={clock(x + 326, TOP + 56, 10)} />
    </g>
  )
}

function Nothing({ x }) {
  return (
    <g>
      <Desk x={x} />
      <Pic svg={mug(x + 236, DESK - 28, 0.4, false)} />
      <Pic svg={bag(x + 318, DESK - 40, 0.5, false)} />
      <MrBowen x={x + 110} y={BOWEN_Y} scale={BOWEN} mood="sad" />
      <Pic svg={clock(x + 326, TOP + 56, 10)} />
    </g>
  )
}

const PANELS = [HotEngine, CatchIt, OpenIt, Nothing]

export function BagStory({ lang = 'en', isDisplayMode = false }) {
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
              <clipPath key={i} id={`bag-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
            ))}
          </defs>
          {PANELS.map((Panel, i) => {
            const x = px(i)
            const shown = i <= k
            return (
              <g key={i}>
                <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill={shown ? '#fbfdff' : '#f4f6f8'}
                  stroke={shown ? '#c9d3dc' : RULE} strokeWidth="3" strokeDasharray={shown ? undefined : '10 8'} />
                {shown ? (
                  <g clipPath={`url(#bag-p${i})`}>
                    <line x1={x} y1={FLOOR} x2={x + PANEL_W} y2={FLOOR} stroke={RULE} strokeWidth="3" />
                    <Panel x={x} />
                  </g>
                ) : (
                  <text x={x + PANEL_W / 2} y={TOP + 250} fontFamily={FONT} fontSize="150" fontWeight="900" fill={RULE} textAnchor="middle">?</text>
                )}
                <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill="none" stroke={shown ? '#c9d3dc' : RULE} strokeWidth="3" strokeDasharray={shown ? undefined : '10 8'} />
                <circle cx={x + 30} cy={TOP + 30} r="19" fill={shown ? BLUE : RULE} />
                <text x={x + 30} y={TOP + 38} fontFamily={FONT} fontSize="22" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
                {shown && (
                  <g>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 38} fontFamily={FONT} fontSize="23" fontWeight="900" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[0]}</text>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 68} fontFamily={FONT} fontSize="23" fontWeight="700" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[1]}</text>
                  </g>
                )}
              </g>
            )
          })}
          {asked && (
            <g>
              <rect x="30" y="514" width="1580" height="88" rx="16" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
              <text x="820" y={k >= LAST ? 550 : 568} fontFamily={FONT} fontSize="28" fontWeight="900" fill={INK} textAnchor="middle">
                {t(lang, 'Where did the heat go? Can he get it back?', 'Où est partie la chaleur ? Peut-il la récupérer ?')}
              </text>
              {k >= LAST && (
                <text x="820" y="586" fontFamily={FONT} fontSize="25" fontWeight="900" fill={TEAL} textAnchor="middle">
                  {t(lang, 'A clue: heat moves from hotter things to colder things.', 'Un indice : la chaleur va des choses chaudes vers les choses froides.')}
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

// content/y7-science/U03_5/story.jsx
// WHAT HAPPENS NEXT? — Mr Bowen's coffee, a four-panel strip, one panel per
// press, so the class predicts each step before it is shown. Deadpan, never
// flagged as a joke. It opens the last part of the lesson (storing energy):
//
//   1  7 a.m. He makes a coffee. Very hot.        (the mug in his hand, the
//                                                  kettle on the desk; 80 °C)
//   2  A student has a question. He puts it down. (one hand up)
//   3  29 more students have questions.           (hands everywhere; dizzy)
//   4  12 noon. His coffee is cold. (He drinks it anyway.)
//   then the question the last part answers — where did the energy go, and
//   can energy be kept for later? — and the clue: some stores last for
//   years, some for an hour. It is also the book's Question 4.
//
// Mr Bowen is the cartoon from Coffee, Carbon and Stars.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { MrBowen } from '../U03_coffee/dating.jsx'
import { mug, clock, thermometer, kettle } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', RULE = '#d5dbe1', TEAL = '#0087a8', BLUE = '#1a5fa8', RED = '#d83a2e'
const SKIN = '#f2c9a5'

const PANEL_W = 380
const PANEL_H = 400
const TOP = 20
const px = (i) => 30 + i * (PANEL_W + 20)
const FLOOR = TOP + PANEL_H - 22
const DESK = FLOOR - 112 // the top of the desk

// [English lines, French lines] under each panel
const CAPTIONS = [
  [['7 a.m. Mr Bowen makes', 'a coffee. Very hot.'], ['7 h. M. Bowen se fait', 'un café. Très chaud.']],
  [['A student has a question.', 'He puts his coffee down.'], ['Un élève a une question.', 'Il pose son café.']],
  [['29 more students', 'have questions.'], ['29 autres élèves', 'ont des questions.']],
  [['12 noon. His coffee is cold.', '(He drinks it anyway.)'], ['Midi. Son café est froid.', '(Il le boit quand même.)']],
]
const LAST = 4 // panels 0-3, then the clue
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

/* ── the pieces ── */
function Desk({ x }) {
  return (
    <g>
      <rect x={x + 214} y={DESK} width="170" height="16" rx="4" fill="#b5835a" stroke={INK} strokeWidth="3" />
      <rect x={x + 232} y={DESK + 16} width="14" height={FLOOR - DESK - 16} fill="#8a5a2b" />
      <rect x={x + 352} y={DESK + 16} width="14" height={FLOOR - DESK - 16} fill="#8a5a2b" />
    </g>
  )
}

// A student's arm up from the bottom of the panel, hand open, a "?" above.
function Hand({ x, y, h = 120, q = true }) {
  return (
    <g>
      <line x1={x} y1={y + h} x2={x} y2={y + 18} stroke="#7fa7cf" strokeWidth="22" strokeLinecap="round" />
      <circle cx={x} cy={y + 6} r="15" fill={SKIN} stroke={INK} strokeWidth="2.5" />
      <path d={`M ${x - 9} ${y - 2} v -16 M ${x - 3} ${y - 4} v -20 M ${x + 3} ${y - 4} v -20 M ${x + 9} ${y - 2} v -16`} stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      {q && <text x={x + 20} y={y - 26} fontFamily={FONT} fontSize="30" fontWeight="900" fill={BLUE}>?</text>}
    </g>
  )
}

/* ── the four panels ── */
function MakeCoffee({ x }) {
  return (
    <g>
      <Desk x={x} />
      <Pic svg={kettle(x + 316, DESK - 27, 0.34)} />
      <MrBowen x={x + 120} y={FLOOR - 268 * 0.82} scale={0.82} handRight={[95, 48]} />
      <Pic svg={mug(x + 222, FLOOR - 196, 0.42)} />
      <Pic svg={thermometer(x + 300, TOP + 160, 0.85, 0.7)} />
      <text x={x + 322} y={TOP + 142} fontFamily={FONT} fontSize="20" fontWeight="900" fill={RED}>80 °C</text>
      <Pic svg={clock(x + 326, TOP + 56, 7)} />
    </g>
  )
}

function OneQuestion({ x }) {
  return (
    <g>
      <Desk x={x} />
      <Pic svg={mug(x + 300, DESK - 28, 0.4)} />
      <MrBowen x={x + 120} y={FLOOR - 268 * 0.82} scale={0.82} />
      <Hand x={x + 192} y={FLOOR - 112} h={112} />
      <Pic svg={clock(x + 326, TOP + 56, 8)} />
    </g>
  )
}

function ManyQuestions({ x }) {
  return (
    <g>
      <Desk x={x} />
      <Pic svg={mug(x + 300, DESK - 28, 0.4, false)} />
      <MrBowen x={x + 120} y={FLOOR - 268 * 0.82} scale={0.82} mood="dizzy" />
      {/* the students' arms come up beside him, never across him */}
      {[[26, 92], [182, 60], [222, 88], [262, 52], [302, 60], [344, 92]].map(([dx, h], i) => (
        <Hand key={i} x={x + dx} y={FLOOR - h} h={h + 30} />
      ))}
      <Pic svg={clock(x + 326, TOP + 56, 10)} />
    </g>
  )
}

function Cold({ x }) {
  return (
    <g>
      <MrBowen x={x + 120} y={FLOOR - 268 * 0.82} scale={0.82} mood="sad" handRight={[58, 34]} />
      <Pic svg={mug(x + 168, FLOOR - 220, 0.36, false)} />
      <Pic svg={thermometer(x + 300, TOP + 160, 0.15, 0.7)} />
      <text x={x + 322} y={TOP + 142} fontFamily={FONT} fontSize="20" fontWeight="900" fill={BLUE}>25 °C</text>
      <Pic svg={clock(x + 326, TOP + 56, 12)} />
    </g>
  )
}

const PANELS = [MakeCoffee, OneQuestion, ManyQuestions, Cold]

export function CoffeeStory({ lang = 'en', isDisplayMode = false }) {
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
              <clipPath key={i} id={`coffee-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
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
                  <g clipPath={`url(#coffee-p${i})`}>
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
                {t(lang, 'Where did the energy go? Can energy be kept for later?', 'Où est partie l’énergie ? Peut-on la garder pour plus tard ?')}
              </text>
              {k >= LAST && (
                <text x="820" y="586" fontFamily={FONT} fontSize="25" fontWeight="900" fill={TEAL} textAnchor="middle">
                  {t(lang, 'A clue: some energy stores last for years. Some last an hour.', 'Un indice : certaines réserves durent des années. D’autres, une heure.')}
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

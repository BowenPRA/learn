// content/y7-science/U05_1/story.jsx
// WHAT HAPPENS NEXT? — Mr Bowen's new pan. A four-panel strip, one panel per
// press (the shape of 4.5's key strip). Deadpan, never flagged as a joke.
//
//   1  Mr Bowen buys a pan. Even the handle is metal.
//   2  He cooks an egg. Three minutes.
//   3  He picks up the pan. By the handle.  (OW!)
//   4  Now he wears oven gloves. All day. Even in class.
//   then the question — why did the handle get hot? — and the clue: the heat
//   moved through the metal. Slide 10 names it: metals are conductors, and the
//   fix is a handle that is an insulator.
// Mr Bowen is the shared cartoon (src/lib/mrBowen.js).
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { MrBowen } from '../U03_coffee/dating.jsx'
import { INK, TEAL, RULE, RED, FONT, pan, egg, mitt, sparkle, burner, clock } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const BLUE = '#1a5fa8'

const PANEL_W = 380
const PANEL_H = 400
const TOP = 20
const px = (i) => 30 + i * (PANEL_W + 20)
const FLOOR = TOP + PANEL_H - 44
const BOWEN = 0.82
const BOWEN_Y = FLOOR - 268 * BOWEN
const BX = 90 // Mr Bowen's middle, from the panel's left edge
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />
const hand = (x, h) => [x + BX + h[0] * BOWEN, BOWEN_Y + h[1] * BOWEN]

// [English lines, French lines] under each panel
const CAPTIONS = [
  [['Mr Bowen buys a pan.', 'Even the handle is metal.'], ['M. Bowen a une poêle.', 'Même le manche est en métal.']],
  [['He cooks an egg.', 'Three minutes.'], ['Il fait cuire un œuf.', 'Trois minutes.']],
  [['He picks up the pan.', 'By the handle.'], ['Il prend la poêle.', 'Par le manche.']],
  [['Now he wears oven gloves.', 'All day. Even in class.'], ['Depuis, il a des gants.', 'Même en classe.']],
]
const LAST = 4 // panels 0-3, then the clue

/** The pan held by its handle at (hx, hy), the pan out to the right. */
const heldPan = (hx, hy, s, rot = 0) => `<g transform="translate(${hx} ${hy}) rotate(${rot}) scale(${-s} ${s})">${pan(-207, 40, 1)}</g>`

function Stove({ x }) {
  return (
    <g>
      <rect x={x + 168} y={FLOOR - 40} width="196" height="40" rx="6" fill="#dfe4e8" stroke={INK} strokeWidth="3" />
      <Pic svg={burner(x + 266, FLOOR - 82, 0.8)} />
    </g>
  )
}

function Floor({ x }) {
  return <line x1={x} y1={FLOOR} x2={x + PANEL_W} y2={FLOOR} stroke="#c9d3dc" strokeWidth="3" />
}

/* ── the four panels ── */
function Buys({ x }) {
  const [hx, hy] = hand(x, [70, 64])
  return (
    <g>
      <Floor x={x} />
      <MrBowen x={x + BX} y={BOWEN_Y} scale={BOWEN} handRight={[70, 64]} />
      <Pic svg={heldPan(hx, hy, 0.68, -10)} />
      <Pic svg={sparkle(x + 330, TOP + 110, 20)} />
      <Pic svg={sparkle(x + 250, TOP + 92, 13)} />
      <Pic svg={sparkle(x + 350, TOP + 210, 13)} />
    </g>
  )
}

function Cooks({ x }) {
  return (
    <g>
      <Floor x={x} />
      <MrBowen x={x + BX} y={BOWEN_Y} scale={BOWEN} />
      <Stove x={x} />
      <Pic svg={pan(x + 230, FLOOR - 98, 0.62)} />
      <Pic svg={egg(x + 226, FLOOR - 128, 0.55)} />
      <Pic svg={clock(x + 300, TOP + 100, 3, 40)} />
    </g>
  )
}

function Picks({ x }) {
  const [hx, hy] = hand(x, [76, 70])
  return (
    <g>
      <Floor x={x} />
      <Stove x={x} />
      <MrBowen x={x + BX} y={BOWEN_Y} scale={BOWEN} mood="dizzy" handRight={[76, 70]} />
      <Pic svg={heldPan(hx, hy, 0.7, 14)} />
      {[-18, 0, 18].map((dx) => (
        <path key={dx} d={`M ${hx + dx} ${hy - 24} q 8 -10 0 -20 q -8 -10 0 -20`} fill="none" stroke={RED} strokeWidth="4" strokeLinecap="round" />
      ))}
      <Pic svg={egg(x + 316, TOP + 96, 0.6)} />
      <path d={`M ${x + 290} ${TOP + 140} l -14 18 M ${x + 316} ${TOP + 146} v 22 M ${x + 342} ${TOP + 140} l 14 18`} stroke="#9aa5ae" strokeWidth="4" strokeLinecap="round" />
      <text x={x + 196} y={TOP + 84} fontFamily={FONT} fontSize="44" fontWeight="900" fill={RED} textAnchor="middle">OW!</text>
    </g>
  )
}

function Gloves({ x }) {
  const [lx, ly] = hand(x, [-58, 30])
  const [rx, ry] = hand(x, [58, 30])
  return (
    <g>
      <Floor x={x} />
      <rect x={x + 186} y={TOP + 70} width="176" height="140" rx="8" fill="#ffffff" stroke="#9aa5ae" strokeWidth="6" />
      <text x={x + 274} y={TOP + 130} fontFamily={FONT} fontSize="30" fontWeight="900" fill={BLUE} textAnchor="middle">Metals</text>
      <path d={`M ${x + 214} ${TOP + 160} h 120 M ${x + 214} ${TOP + 186} h 84`} stroke="#9aa5ae" strokeWidth="5" strokeLinecap="round" />
      <MrBowen x={x + BX} y={BOWEN_Y} scale={BOWEN} handLeft={[-58, 30]} handRight={[58, 30]} />
      <Pic svg={mitt(lx, ly - 10, 0.62, -12)} />
      <Pic svg={mitt(rx, ry - 10, 0.62, 12)} />
    </g>
  )
}

const PANELS = [Buys, Cooks, Picks, Gloves]

export function PanStory({ lang = 'en', isDisplayMode = false }) {
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
              <clipPath key={i} id={`panstory-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
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
                  <g clipPath={`url(#panstory-p${i})`}>
                    <Panel x={x} lang={lang} />
                  </g>
                ) : (
                  <text x={x + PANEL_W / 2} y={TOP + 250} fontFamily={FONT} fontSize="150" fontWeight="900" fill={RULE} textAnchor="middle">?</text>
                )}
                <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill="none" stroke={shown ? '#c9d3dc' : RULE} strokeWidth="3" strokeDasharray={shown ? undefined : '10 8'} />
                <circle cx={x + 32} cy={TOP + 32} r="24" fill={shown ? BLUE : RULE} />
                <text x={x + 32} y={TOP + 42} fontFamily={FONT} fontSize="28" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
                {shown && (
                  <g>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 40} fontFamily={FONT} fontSize="29" fontWeight="900" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[0]}</text>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 76} fontFamily={FONT} fontSize="27" fontWeight="700" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[1]}</text>
                  </g>
                )}
              </g>
            )
          })}
          {asked && (
            <g>
              <rect x="30" y="512" width="1580" height="92" rx="16" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
              <text x="820" y={k >= LAST ? 552 : 570} fontFamily={FONT} fontSize="32" fontWeight="900" fill={INK} textAnchor="middle">
                {t(lang, 'Why did the handle get hot?', 'Pourquoi le manche est-il devenu chaud ?')}
              </text>
              {k >= LAST && (
                <text x="820" y="590" fontFamily={FONT} fontSize="29" fontWeight="900" fill={TEAL} textAnchor="middle">
                  {t(lang, 'A clue: the heat moved through the metal.', 'Un indice : la chaleur a traversé le métal.')}
                </text>
              )}
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>
          {k >= LAST - 1 ? t(lang, 'A clue', 'Un indice') : t(lang, 'What happens next?', 'Et ensuite ?')}
        </Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

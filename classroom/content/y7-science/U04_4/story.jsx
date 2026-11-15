// content/y7-science/U04_4/story.jsx
// WHAT HAPPENS NEXT? — something in Mr Bowen's garden. A four-panel strip,
// one panel per press. Mr Bowen uses the key on page 139, correctly, on an
// animal that is not in it: a cat. Before each press the class reads the key
// and says what it will ask next and what he will answer. Deadpan, never
// flagged as a joke.
//
//   1  He finds an animal. He opens the key.
//   2  Legs? Yes (he counts four). More than six? No.
//   3  Four wings? He looks closely. No.
//   4  So it is a housefly. He calls it Buzz. ("Meow.")
//   then the question — what went wrong? — and the clue: which five animals
//   are in the key? The next slide answers it: a key can only name the
//   organisms that are in it.
// Mr Bowen is the shared cartoon (src/lib/mrBowen.js).
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { MrBowen } from '../U03_coffee/dating.jsx'
import { cat, keyCard, grass, magnifier, INK, KEY, FONT } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const RULE = '#d5dbe1', TEAL = '#0087a8', BLUE = '#1a5fa8'

const PANEL_W = 380
const PANEL_H = 400
const TOP = 20
const px = (i) => 30 + i * (PANEL_W + 20)
const FLOOR = TOP + PANEL_H - 44
const BOWEN = 0.82
const BOWEN_Y = FLOOR - 268 * BOWEN
const BX = 80 // Mr Bowen's middle, from the panel's left edge
const CAT_X = 266, CAT_S = 0.8 // the cat's middle and size
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />
const hand = (x, h) => [x + BX + h[0] * BOWEN, BOWEN_Y + h[1] * BOWEN] // his hand, on the panel

// [English lines, French lines] under each panel
const CAPTIONS = [
  [['He finds an animal.', 'He opens the key.'], ['Il trouve un animal.', 'Il ouvre la clé.']],
  [['Legs? Yes: 4.', 'More than six? No.'], ['Des pattes ? Oui : 4.', 'Plus de six ? Non.']],
  [['Four wings?', 'He looks closely. No.'], ['Quatre ailes ?', 'Il regarde bien : non.']],
  [['So it is a housefly.', 'He calls it Buzz.'], ['Donc : une mouche !', 'Il l’appelle Buzz.']],
]
const LAST = 4 // panels 0-3, then the clue

function Garden({ x, flower = 16 }) {
  return <Pic svg={grass(x, FLOOR, PANEL_W, TOP + PANEL_H - FLOOR, x + flower)} />
}

/* ── the four panels ── */
function Finds({ x }) {
  const [hx, hy] = hand(x, [64, 128])
  return (
    <g>
      <Garden x={x} />
      <Pic svg={cat(x + CAT_X, FLOOR + 8, CAT_S)} />
      <MrBowen x={x + BX} y={BOWEN_Y} scale={BOWEN} handRight={[64, 128]} />
      <Pic svg={keyCard(hx + 10, hy - 22, 0.7)} />
    </g>
  )
}

function Counts({ x }) {
  // the cat's four feet, counted on the grass under them
  const feet = [-63.5, -21.5, 42.5, 84.5].map((f) => x + CAT_X + f * CAT_S)
  return (
    <g>
      <Garden x={x} flower={350} />
      <Pic svg={cat(x + CAT_X, FLOOR + 8, CAT_S)} />
      <MrBowen x={x + BX} y={BOWEN_Y} scale={BOWEN} handRight={[106, 150]} elbowRight={[70, 132]} />
      {feet.map((fx, i) => (
        <g key={i}>
          <circle cx={fx} cy={FLOOR + 29} r="16" fill={KEY} />
          <text x={fx} y={FLOOR + 37} fontFamily={FONT} fontSize="23" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
        </g>
      ))}
    </g>
  )
}

function Looks({ x }) {
  const [hx, hy] = hand(x, [70, 150])
  return (
    <g>
      <Garden x={x} />
      <Pic svg={cat(x + CAT_X, FLOOR + 8, CAT_S)} />
      <MrBowen x={x + BX} y={BOWEN_Y} scale={BOWEN} handRight={[70, 150]} />
      <g transform={`translate(${hx + 46} ${hy - 46}) scale(-1 1)`}>
        <Pic svg={magnifier(0, 0, 0.9)} />
      </g>
    </g>
  )
}

function Buzz({ x }) {
  const [hx, hy] = hand(x, [64, 128])
  const nx = x + CAT_X + 66 * CAT_S, ny = FLOOR + 8 - 92 * CAT_S // under the cat's chin
  return (
    <g>
      <Garden x={x} flower={16} />
      <Pic svg={cat(x + CAT_X, FLOOR + 8, CAT_S)} />
      <line x1={nx} y1={ny} x2={nx} y2={ny + 18} stroke={INK} strokeWidth="2.5" />
      <rect x={nx - 42} y={ny + 18} width="84" height="36" rx="8" fill="#fff4e8" stroke={KEY} strokeWidth="3" />
      <text x={nx} y={ny + 44} fontFamily={FONT} fontSize="25" fontWeight="900" fill={KEY} textAnchor="middle">Buzz</text>
      <path d={`M ${x + 236} ${TOP + 60} H ${x + 352} Q ${x + 366} ${TOP + 60} ${x + 366} ${TOP + 74} V ${TOP + 112} Q ${x + 366} ${TOP + 126} ${x + 352} ${TOP + 126} H ${x + 334} L ${x + 330} ${TOP + 150} L ${x + 312} ${TOP + 126} H ${x + 236} Q ${x + 222} ${TOP + 126} ${x + 222} ${TOP + 112} V ${TOP + 74} Q ${x + 222} ${TOP + 60} ${x + 236} ${TOP + 60} Z`}
        fill="#ffffff" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <text x={x + 294} y={TOP + 104} fontFamily={FONT} fontSize="30" fontWeight="900" fill={INK} textAnchor="middle">Meow.</text>
      <MrBowen x={x + BX} y={BOWEN_Y} scale={BOWEN} handRight={[64, 128]} />
      <Pic svg={keyCard(hx + 10, hy - 22, 0.7)} />
    </g>
  )
}

const PANELS = [Finds, Counts, Looks, Buzz]

export function GardenStory({ lang = 'en', isDisplayMode = false }) {
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
              <clipPath key={i} id={`garden-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
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
                  <g clipPath={`url(#garden-p${i})`}>
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
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 40} fontFamily={FONT} fontSize="30" fontWeight="900" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[0]}</text>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 76} fontFamily={FONT} fontSize="30" fontWeight="700" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[1]}</text>
                  </g>
                )}
              </g>
            )
          })}
          {asked && (
            <g>
              <rect x="30" y="512" width="1580" height="92" rx="16" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
              <text x="820" y={k >= LAST ? 552 : 570} fontFamily={FONT} fontSize="32" fontWeight="900" fill={INK} textAnchor="middle">
                {t(lang, 'Is it really a housefly? What went wrong?', 'Est-ce vraiment une mouche ? Qu’est-ce qui n’a pas marché ?')}
              </text>
              {k >= LAST && (
                <text x="820" y="590" fontFamily={FONT} fontSize="29" fontWeight="900" fill={TEAL} textAnchor="middle">
                  {t(lang, 'A clue: which 5 animals are in the key?', 'Un indice : quels 5 animaux sont dans la clé ?')}
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

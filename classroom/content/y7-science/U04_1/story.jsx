// content/y7-science/U04_1/story.jsx
// WHAT HAPPENS NEXT? — Mr Bowen's new pet, a four-panel strip, one panel per
// press, so the class predicts each step before it is shown. Deadpan, never
// flagged as a joke. It comes after the seven, so the class can test the pet:
//
//   1  Mr Bowen buys a new pet. It is a rock.
//   2  He gives it rice every day. It does not eat.        (nutrition)
//   3  He tells it a joke. Nothing.                         (sensitivity)
//   4  One year later: the same size. No baby rocks.        (growth, reproduction)
//   then the question — is his pet alive? which of the seven can it do? —
//   and the clue: check all seven, M R S G R E N.
//
// Mr Bowen is the shared cartoon (src/lib/mrBowen.js).
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { MrBowen } from '../U03_coffee/dating.jsx'
import { rock, bowl, calendar, INK, FONT } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const RULE = '#d5dbe1', TEAL = '#0087a8', BLUE = '#1a5fa8'

const PANEL_W = 380
const PANEL_H = 400
const TOP = 20
const px = (i) => 30 + i * (PANEL_W + 20)
const FLOOR = TOP + PANEL_H - 22
const BOWEN = 0.82
const BOWEN_Y = FLOOR - 268 * BOWEN
const ROCK = 0.6
const ROCK_Y = FLOOR - 36 * ROCK // the rock's flat bottom on the floor

// [English lines, French lines] under each panel
const CAPTIONS = [
  [['Mr Bowen buys a new pet.', 'It is a rock.'], ['M. Bowen achète un animal.', 'C’est un caillou.']],
  [['He gives it rice every day.', 'It does not eat.'], ['Il lui donne du riz chaque jour.', 'Il ne mange pas.']],
  [['He tells it a joke.', 'Nothing.'], ['Il lui raconte une blague.', 'Rien.']],
  [['One year later: the same size.', 'No baby rocks.'], ['Un an plus tard : même taille.', 'Pas de bébés cailloux.']],
]
const LAST = 4 // panels 0-3, then the clue
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

/* ── the four panels ── */
const HOLD = [104, 70] // his hand, out to the side at his chest (his own frame)
function NewPet({ x }) {
  const hx = x + 140 + HOLD[0] * BOWEN, hy = BOWEN_Y + HOLD[1] * BOWEN
  return (
    <g>
      <MrBowen x={x + 140} y={BOWEN_Y} scale={BOWEN} handRight={HOLD} />
      <Pic svg={rock(hx + 22, hy - 6, 0.5)} />
    </g>
  )
}

function Rice({ x }) {
  return (
    <g>
      <MrBowen x={x + 100} y={BOWEN_Y} scale={BOWEN} />
      <Pic svg={rock(x + 240, ROCK_Y, ROCK)} />
      <Pic svg={bowl(x + 328, FLOOR - 48 * 0.6, 0.6)} />
    </g>
  )
}

function Joke({ x }) {
  return (
    <g>
      <MrBowen x={x + 100} y={BOWEN_Y} scale={BOWEN} />
      <path d={`M ${x + 176} ${TOP + 52} h 168 a 14 14 0 0 1 14 14 v 46 a 14 14 0 0 1 -14 14 h -120 l -34 26 l 6 -26 h -20 a 14 14 0 0 1 -14 -14 v -46 a 14 14 0 0 1 14 -14 z`}
        fill="#ffffff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <text x={x + 260} y={TOP + 104} fontFamily={FONT} fontSize="34" fontWeight="900" fill={INK} textAnchor="middle">
        {'Ha ha!'}
      </text>
      <Pic svg={rock(x + 290, ROCK_Y, ROCK)} />
    </g>
  )
}

function OneYear({ x }) {
  return (
    <g>
      <MrBowen x={x + 96} y={BOWEN_Y} scale={BOWEN} mood="sad" />
      <Pic svg={calendar(x + 300, TOP + 110, 0.9)} />
      <Pic svg={rock(x + 232, ROCK_Y, ROCK)} />
      <Pic svg={rock(x + 318, ROCK_Y, ROCK)} />
    </g>
  )
}

const PANELS = [NewPet, Rice, Joke, OneYear]

export function PetRock({ lang = 'en', isDisplayMode = false }) {
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
              <clipPath key={i} id={`rock-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
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
                  <g clipPath={`url(#rock-p${i})`}>
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
                {t(lang, 'Is his pet alive? Which of the seven can it do?', 'Son animal est-il vivant ? Lesquelles des sept fait-il ?')}
              </text>
              {k >= LAST && (
                <text x="820" y="586" fontFamily={FONT} fontSize="25" fontWeight="900" fill={TEAL} textAnchor="middle">
                  {t(lang, 'A clue: check all seven, M R S G R E N.', 'Un indice : vérifie les sept, M R S G R E N.')}
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

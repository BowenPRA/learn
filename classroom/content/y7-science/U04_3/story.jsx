// content/y7-science/U04_3/story.jsx
// WHAT HAPPENS NEXT? — Mr Bowen's new pets (after 4.1's rock and 4.2's
// virus): a horse and a donkey. A four-panel strip, one panel per press, so
// the class predicts each step before it is shown. Deadpan, never flagged as
// a joke.
//
//   1  Mr Bowen gets two new pets: a horse and a donkey.
//   2  They have a baby: a mule.
//   3  He wants more mules, so he buys a second mule.
//   4  Ten years later: still no baby mules.
//   then the question — why do the two mules have no baby? — and the clue:
//   can a mule have offspring?
//
// True to the science: a mule's mother is a horse and its father is a donkey;
// mules are strong and healthy and live for 30 years or more, and they are
// infertile (the next slide's key word).
// Mr Bowen is the shared cartoon (src/lib/mrBowen.js).
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { MrBowen } from '../U03_coffee/dating.jsx'
import { equid, calendar, INK, FONT } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const RULE = '#d5dbe1', TEAL = '#0087a8', BLUE = '#1a5fa8'

const PANEL_W = 380
const PANEL_H = 400
const TOP = 20
const px = (i) => 30 + i * (PANEL_W + 20)
const FLOOR = TOP + PANEL_H - 22
const BOWEN = 0.82
const BOWEN_Y = FLOOR - 268 * BOWEN

// [English lines, French lines] under each panel
const CAPTIONS = [
  [['His new pets:', 'a horse and a donkey.'], ['Ses nouveaux animaux :', 'un cheval et un âne.']],
  [['They have a baby:', 'a mule.'], ['Ils ont un petit :', 'un mulet.']],
  [['He wants more mules.', 'He buys a second mule.'], ['Il veut plus de mulets.', 'Il en achète un autre.']],
  [['Ten years later:', 'still no baby mules.'], ['Dix ans plus tard :', 'toujours pas de petit.']],
]
const LAST = 4 // panels 0-3, then the clue
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

/* ── the four panels ── */
function NewPets({ x }) {
  return (
    <g>
      <MrBowen x={x + 52} y={BOWEN_Y} scale={BOWEN} />
      <Pic svg={equid(x + 180, FLOOR, 0.62, 'horse')} />
      <Pic svg={equid(x + 298, FLOOR, 0.44, 'donkey')} />
    </g>
  )
}

function Baby({ x }) {
  return (
    <g>
      <MrBowen x={x + 96} y={BOWEN_Y} scale={BOWEN} handRight={[74, 40]} />
      <Pic svg={equid(x + 262, FLOOR, 0.42, 'mule')} />
    </g>
  )
}

function Second({ x }) {
  return (
    <g>
      <MrBowen x={x + 52} y={BOWEN_Y} scale={BOWEN} />
      <Pic svg={equid(x + 166, FLOOR, 0.5, 'mule')} />
      <Pic svg={equid(x + 296, FLOOR, 0.5, 'mule')} />
    </g>
  )
}

function TenYears({ x }) {
  return (
    <g>
      <MrBowen x={x + 52} y={BOWEN_Y} scale={BOWEN} mood="sad" />
      <Pic svg={calendar(x + 250, TOP + 104, 1.1)} />
      <Pic svg={equid(x + 166, FLOOR, 0.5, 'mule')} />
      <Pic svg={equid(x + 296, FLOOR, 0.5, 'mule')} />
    </g>
  )
}

const PANELS = [NewPets, Baby, Second, TenYears]

export function MuleStory({ lang = 'en', isDisplayMode = false }) {
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
              <clipPath key={i} id={`mule-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
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
                  <g clipPath={`url(#mule-p${i})`}>
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
                {t(lang, 'Why do the two mules have no baby?', 'Pourquoi les deux mulets n’ont-ils pas de petit ?')}
              </text>
              {k >= LAST && (
                <text x="820" y="590" fontFamily={FONT} fontSize="29" fontWeight="900" fill={TEAL} textAnchor="middle">
                  {t(lang, 'A clue: can a mule have offspring?', 'Un indice : un mulet peut-il avoir des descendants ?')}
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

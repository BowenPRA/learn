// content/y7-science/U04_2/story.jsx
// WHAT HAPPENS NEXT? — Mr Bowen's new pet (after 4.1's rock): a virus in a
// jar. A four-panel strip, one panel per press, so the class predicts each
// step before it is shown. Deadpan, never flagged as a joke.
//
//   1  Mr Bowen gets a new pet: a virus. He cannot see it.   (very small)
//   2  He gives it rice. It does not eat.                     (no nutrition)
//   3  One year later: it has not grown.                      (no growth)
//   4  He puts a plant in the jar. A week later: spots!       (replication)
//   then the question — what made the spots? — and the clue: where can a
//   virus make copies?
//
// True to the science: a plant virus such as tobacco mosaic virus lasts for
// years outside a cell, doing nothing, and a plant it gets into shows pale
// patches on its leaves within one to two weeks.
// Mr Bowen is the shared cartoon (src/lib/mrBowen.js).
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { MrBowen } from '../U03_coffee/dating.jsx'
import { jar, spottedPlant, bowl, calendar, INK, FONT } from './art.js'

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
  [['His new pet: a virus.', 'He cannot see it.'], ['Son nouvel animal :', 'un virus, invisible.']],
  [['He gives it rice.', 'The rice stays there.'], ['Il lui donne du riz.', 'Le riz reste là.']],
  [['One year later:', 'nothing has changed.'], ['Un an plus tard :', 'rien n’a changé.']],
  [['He puts in a plant.', 'A week later: spots!'], ['Il y met une plante.', '7 jours après : taches !']],
]
const LAST = 4 // panels 0-3, then the clue
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

// A jar with VIRUS on its label; (x, y) is its centre, its bottom at y + 56 s.
function VirusJar({ x, y, s }) {
  return (
    <g>
      <Pic svg={jar(x, y, s)} />
      <text x={x + 3 * s} y={y + 7 * s} fontFamily={FONT} fontSize={15 * s} fontWeight="900" fill={INK} textAnchor="middle">VIRUS</text>
    </g>
  )
}

/* ── the four panels ── */
const HOLD = [104, 70] // his hand, out to the side at his chest (his own frame)
function NewPet({ x }) {
  const hx = x + 120 + HOLD[0] * BOWEN, hy = BOWEN_Y + HOLD[1] * BOWEN
  return (
    <g>
      <MrBowen x={x + 120} y={BOWEN_Y} scale={BOWEN} handRight={HOLD} />
      <VirusJar x={hx + 44} y={hy - 18} s={0.9} />
    </g>
  )
}

function Rice({ x }) {
  return (
    <g>
      <MrBowen x={x + 96} y={BOWEN_Y} scale={BOWEN} />
      <VirusJar x={x + 236} y={FLOOR - 56 * 0.9} s={0.9} />
      <Pic svg={bowl(x + 326, FLOOR - 48 * 0.6, 0.6)} />
    </g>
  )
}

function OneYear({ x }) {
  return (
    <g>
      <MrBowen x={x + 96} y={BOWEN_Y} scale={BOWEN} mood="sad" />
      <Pic svg={calendar(x + 300, TOP + 110, 0.9)} />
      <VirusJar x={x + 270} y={FLOOR - 56 * 0.9} s={0.9} />
    </g>
  )
}

function Spots({ x }) {
  const s = 1.6
  const jy = FLOOR - 56 * s
  return (
    <g>
      <MrBowen x={x + 86} y={BOWEN_Y} scale={BOWEN} mood="dizzy" />
      <Pic svg={jar(x + 272, jy, s, false)} />
      <Pic svg={spottedPlant(x + 270, jy - 4, 1.3)} />
    </g>
  )
}

const PANELS = [NewPet, Rice, OneYear, Spots]

export function PetVirus({ lang = 'en', isDisplayMode = false }) {
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
              <clipPath key={i} id={`virus-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
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
                  <g clipPath={`url(#virus-p${i})`}>
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
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 38} fontFamily={FONT} fontSize="27" fontWeight="900" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[0]}</text>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 72} fontFamily={FONT} fontSize="27" fontWeight="700" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[1]}</text>
                  </g>
                )}
              </g>
            )
          })}
          {asked && (
            <g>
              <rect x="30" y="514" width="1580" height="88" rx="16" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
              <text x="820" y={k >= LAST ? 550 : 568} fontFamily={FONT} fontSize="28" fontWeight="900" fill={INK} textAnchor="middle">
                {t(lang, 'What made the spots on the leaves?', 'Qu’est-ce qui a fait les taches sur les feuilles ?')}
              </text>
              {k >= LAST && (
                <text x="820" y="586" fontFamily={FONT} fontSize="25" fontWeight="900" fill={TEAL} textAnchor="middle">
                  {t(lang, 'A clue: where can a virus make copies of itself?', 'Un indice : où un virus peut-il faire des copies de lui-même ?')}
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

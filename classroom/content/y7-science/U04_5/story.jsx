// content/y7-science/U04_5/story.jsx
// WHAT HAPPENS NEXT? — Mr Bowen's key. A four-panel strip, one panel per
// press (the shape of 4.4's garden strip). He writes a key whose first
// question is "Is it cute?"; three friends test it on a spider and do not
// agree; their feedback comes back. Deadpan, never flagged as a joke.
//
//   1  Mr Bowen writes a key. Question 1: Is it cute?
//   2  Three friends test it. They find a spider.
//   3  Is the spider cute? Yes. No. No.
//   4  Their feedback: "Different answers!"
//   then the question — how can he fix Question 1? — and the clue: count it,
//   measure it or see it (slide 4's panel).
// Mr Bowen is the shared cartoon (src/lib/mrBowen.js); the friends are 3.4's
// stick figures.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { MrBowen } from '../U03_coffee/dating.jsx'
import { ArmsFigure } from '../U03_4/bodies.jsx'
import { keyCard, INK, FONT, TEAL, RULE, RED } from '../U04_4/art.js'

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
const FS = 1.15 // the friends' size
const FRIENDS = [170, 252, 334] // their middles, from the panel's left edge
const FRIEND_COLOURS = ['#1a5fa8', '#3d731c', '#7a3ea0']
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />
const hand = (x, h) => [x + BX + h[0] * BOWEN, BOWEN_Y + h[1] * BOWEN]

// [English lines, French lines] under each panel
const CAPTIONS = [
  [['Mr Bowen writes a key.', 'Question 1: Is it cute?'], ['M. Bowen écrit une clé.', 'Question 1 : mignon ?']],
  [['Three friends test it.', 'They find a spider.'], ['Trois amis la testent.', 'Ils trouvent une araignée.']],
  [['Is the spider cute?', 'They do not agree.'], ['L’araignée est mignonne ?', 'Ils ne sont pas d’accord.']],
  [['Their feedback:', '“Different answers!”'], ['Leur avis :', '« Réponses différentes ! »']],
]
const LAST = 4 // panels 0-3, then the clue

/** A spider on the floor, its middle at (x, y), legs out to the sides. */
function Spider({ x, y, s = 1 }) {
  const legs = [-1, 1].flatMap((side) => [0, 1, 2, 3].map((i) => {
    const a = -30 + i * 22
    const kx = side * (26 + i * 2)
    const ky = -18 + i * 8
    const fx = side * (46 + Math.abs(a) * 0.2)
    return `M ${side * 10} ${-12 + i * 5} Q ${kx} ${ky - 18} ${fx} ${ky + 18}`
  }))
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={legs.join(' ')} fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="0" cy="-16" rx="22" ry="17" fill="#4a3b32" stroke={INK} strokeWidth="3" />
      <circle cx="0" cy="-38" r="10" fill="#4a3b32" stroke={INK} strokeWidth="3" />
      <circle cx="-4" cy="-40" r="2.6" fill="#ffffff" />
      <circle cx="4" cy="-40" r="2.6" fill="#ffffff" />
    </g>
  )
}

const Friends = ({ x }) => FRIENDS.map((fx, i) => (
  <ArmsFigure key={i} x={x + fx} y={FLOOR - 44 * FS} up={false} color={FRIEND_COLOURS[i]} s={FS} />
))

function Floor({ x }) {
  return <line x1={x} y1={FLOOR} x2={x + PANEL_W} y2={FLOOR} stroke="#c9d3dc" strokeWidth="3" />
}

/* ── the four panels ── */
function Writes({ x }) {
  const [hx, hy] = hand(x, [64, 128])
  return (
    <g>
      <Floor x={x} />
      <MrBowen x={x + BX} y={BOWEN_Y} scale={BOWEN} handRight={[64, 128]} />
      <Pic svg={keyCard(hx + 10, hy - 22, 0.7)} />
      <rect x={x + 176} y={TOP + 62} width="196" height="62" rx="12" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
      <text x={x + 274} y={TOP + 103} fontFamily={FONT} fontSize="30" fontWeight="900" fill={INK} textAnchor="middle">Is it cute?</text>
      <path d={`M ${x + 230} ${TOP + 122} L ${hx + 18} ${hy - 50}`} stroke={TEAL} strokeWidth="3" strokeDasharray="6 5" />
    </g>
  )
}

function Find({ x }) {
  return (
    <g>
      <Floor x={x} />
      <Spider x={x + 82} y={FLOOR - 4} s={1.1} />
      <Friends x={x} />
    </g>
  )
}

function Disagree({ x, lang }) {
  const said = [t(lang, 'Yes!', 'Oui !'), t(lang, 'No!', 'Non !'), t(lang, 'No!', 'Non !')]
  return (
    <g>
      <Floor x={x} />
      <Spider x={x + 82} y={FLOOR - 4} s={1.1} />
      <Friends x={x} />
      {FRIENDS.map((fx, i) => {
        const bx = x + fx
        const by = TOP + 92 + (i % 2) * 52
        return (
          <g key={i}>
            <rect x={bx - 45} y={by} width="90" height="48" rx="12" fill="#ffffff" stroke={FRIEND_COLOURS[i]} strokeWidth="3.5" />
            <path d={`M ${bx - 6} ${by + 48} L ${bx} ${by + 62} L ${bx + 6} ${by + 48}`} fill="#ffffff" stroke={FRIEND_COLOURS[i]} strokeWidth="3.5" strokeLinejoin="round" />
            <text x={bx} y={by + 35} fontFamily={FONT} fontSize="29" fontWeight="900" fill={FRIEND_COLOURS[i]} textAnchor="middle">{said[i]}</text>
          </g>
        )
      })}
    </g>
  )
}

function Feedback({ x }) {
  const [hx, hy] = hand(x, [70, 120])
  return (
    <g>
      <Floor x={x} />
      <MrBowen x={x + BX} y={BOWEN_Y} scale={BOWEN} mood="sad" handRight={[70, 120]} />
      <g transform={`rotate(-6 ${hx + 70} ${hy - 30})`}>
        <rect x={hx + 4} y={hy - 92} width="150" height="118" rx="8" fill="#fffbe8" stroke={INK} strokeWidth="3" />
        <text x={hx + 22} y={hy - 52} fontFamily={FONT} fontSize="28" fontWeight="900" fill={INK}>Q1</text>
        <circle cx={hx + 118} cy={hy - 62} r="20" fill={RED} />
        <path d={`M ${hx + 110} ${hy - 70} l 16 16 M ${hx + 126} ${hy - 70} l -16 16`} stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
        <path d={`M ${hx + 22} ${hy - 22} H ${hx + 134} M ${hx + 22} ${hy} H ${hx + 112}`} stroke="#9aa5ae" strokeWidth="6" strokeLinecap="round" />
      </g>
    </g>
  )
}

const PANELS = [Writes, Find, Disagree, Feedback]

export function KeyStory({ lang = 'en', isDisplayMode = false }) {
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
              <clipPath key={i} id={`keystory-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
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
                  <g clipPath={`url(#keystory-p${i})`}>
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
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 40} fontFamily={FONT} fontSize="30" fontWeight="900" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[0]}</text>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 76} fontFamily={FONT} fontSize="28" fontWeight="700" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[1]}</text>
                  </g>
                )}
              </g>
            )
          })}
          {asked && (
            <g>
              <rect x="30" y="512" width="1580" height="92" rx="16" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
              <text x="820" y={k >= LAST ? 552 : 570} fontFamily={FONT} fontSize="32" fontWeight="900" fill={INK} textAnchor="middle">
                {t(lang, 'How can Mr Bowen fix Question 1?', 'Comment M. Bowen peut-il corriger la question 1 ?')}
              </text>
              {k >= LAST && (
                <text x="820" y="590" fontFamily={FONT} fontSize="29" fontWeight="900" fill={TEAL} textAnchor="middle">
                  {t(lang, 'A clue: ask about something you can count, measure or see.', 'Un indice : une chose qu’on peut compter, mesurer ou voir.')}
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

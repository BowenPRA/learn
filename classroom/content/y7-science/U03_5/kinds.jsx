// content/y7-science/U03_5/kinds.jsx
// The eight kinds of energy: the models of 3.5's middle part.
//
//   NameThatEnergy  the game, everyone standing. A picture each round; on
//                   "3, 2, 1" the whole class does the action for its energy
//                   at once (the actions are the ACTIONS slide). Show the
//                   answer lights up the right action and says why; a wrong
//                   action sits down. Twelve rounds in a fixed order (the
//                   pictures the tables did not use come first), then random
//                   ones. Every picture shows ONE energy, so nobody can argue.
//   BusEnergies     the book's bus going uphill (page 107), with the eighth
//                   label the book leaves out (light, from the headlights).
//                   The next leader points at its clue (the heat, the noise,
//                   the beam…) and a "?" waits where the label will go; the
//                   class names the energy, then the press writes it. With
//                   all eight up it is the lesson's one drawing.
//
// The pictures are art.js strings, placed with dangerouslySetInnerHTML. The
// labels on the bus stay in English in both languages, like every diagram:
// they are what the class copies.
import { useState } from 'react'
import { Undo2, RotateCcw, ChevronRight, Eye } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { mulberry32 } from '../U03_models/data.js'
import { Btn } from '../U03_models/ui.jsx'
import * as art from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const { INK, KEY, MUTED, FONT, STORE, TRANSFER } = art
const RULE = '#d5dbe1', GREEN_DARK = '#3d731c'
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

/* ============================================================= *
 * 1 · NAME THAT ENERGY — the whole class, standing
 * ============================================================= */
// The eight, in the order of the ACTIONS slide; `lines` is the English name
// as it is printed on the card, `fr` the French under it.
const EIGHT = [
  { key: 'kinetic', lines: ['kinetic'], fr: 'cinétique', group: STORE },
  { key: 'chemical', lines: ['chemical'], fr: 'chimique', group: STORE },
  { key: 'thermal', lines: ['thermal'], fr: 'thermique', group: STORE },
  { key: 'elastic', lines: ['elastic', 'potential'], fr: 'élastique', group: STORE },
  { key: 'gravitational', lines: ['gravitational', 'potential'], fr: 'de pesanteur', group: STORE },
  { key: 'electrical', lines: ['electrical'], fr: 'électrique', group: TRANSFER },
  { key: 'sound', lines: ['sound'], fr: 'sonore', group: TRANSFER },
  { key: 'light', lines: ['light'], fr: 'lumineuse', group: TRANSFER },
]

// [picture, scale, its energy, why (English, French)]
const ROUNDS = [
  ['rice', 1.6, 'chemical', 'Food stores chemical energy.', 'La nourriture stocke de l’énergie chimique.'],
  ['drum', 1.55, 'sound', 'A drum vibrates: sound.', 'Un tambour vibre : du son.'],
  ['waterTower', 1.45, 'gravitational', 'Water held up high: gravitational potential.', 'De l’eau en hauteur : potentielle de pesanteur.'],
  ['torch', 1.4, 'light', 'A torch is luminous: it gives out light.', 'Une lampe de poche est lumineuse : elle éclaire.'],
  ['spring', 1.55, 'elastic', 'A squashed spring: elastic potential.', 'Un ressort écrasé : potentielle élastique.'],
  ['car', 1.35, 'kinetic', 'A moving car: kinetic energy.', 'Une voiture qui roule : énergie cinétique.'],
  ['charging', 1.3, 'electrical', 'A current in the wire: electrical.', 'Un courant dans le fil : électrique.'],
  ['mug', 1.7, 'thermal', 'A hot drink has a thermal store.', 'Une boisson chaude a une réserve thermique.'],
  ['battery', 1.55, 'chemical', 'A battery stores chemical energy.', 'Une pile stocke de l’énergie chimique.'],
  ['guitar', 1.55, 'sound', 'Vibrating strings: sound.', 'Des cordes qui vibrent : du son.'],
  ['cliffRock', 1.4, 'gravitational', 'A rock up high: gravitational potential.', 'Un rocher en hauteur : potentielle de pesanteur.'],
  ['bow', 1.55, 'elastic', 'A bent bow: elastic potential.', 'Un arc tendu : potentielle élastique.'],
  ['bulb', 1.6, 'light', 'A bulb is luminous: it gives out light.', 'Une ampoule est lumineuse : elle éclaire.'],
  ['football', 1.5, 'kinetic', 'A rolling ball: kinetic energy.', 'Un ballon qui roule : énergie cinétique.'],
]
const FIXED = 12
function roundAt(n) {
  if (n < FIXED) return ROUNDS[n]
  const rnd = mulberry32(2000 + n)
  return ROUNDS[Math.floor(rnd() * ROUNDS.length)]
}

const CARD_W = 191
const CARD_H = 240
const cardX = (i) => 676 + (i % 4) * (CARD_W + 12)
const cardY = (i) => 22 + Math.floor(i / 4) * (CARD_H + 14)

export function NameThatEnergy({ lang = 'en', isDisplayMode = false }) {
  const [n, setN] = useState(0)
  const [shown, setShown] = useState(false)
  const big = isDisplayMode
  const fr = lang === 'fr'
  const [pic, s, answer, whyEn, whyFr] = roundAt(n)
  const next = () => { setN((v) => v + 1); setShown(false) }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 540" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="540" rx="16" fill="#ffffff" />

          {/* the picture */}
          <rect x="24" y="22" width="630" height="430" rx="20" fill="#fbfdff" stroke="#c9d3dc" strokeWidth="3" />
          <text x="50" y="66" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, `Round ${n + 1}`, `Manche ${n + 1}`)}</text>
          <Pic svg={art[pic](339, 262, s)} />
          <text x="36" y="506" fontFamily={FONT} fontSize="26" fontWeight="900" fill={shown ? GREEN_DARK : INK}>
            {shown ? (fr ? whyFr : whyEn) : t(lang, 'Which energy? 3, 2, 1: do the action!', 'Quelle énergie ? 3, 2, 1 : fais le geste !')}
          </text>

          {/* the eight actions */}
          {EIGHT.map((e, i) => {
            const x = cardX(i), y = cardY(i)
            const right = shown && e.key === answer
            const fade = shown && !right
            const two = e.lines.length > 1
            return (
              <g key={e.key} opacity={fade ? 0.28 : 1}>
                <rect x={x} y={y} width={CARD_W} height={CARD_H} rx="16" fill={right ? '#eef6e6' : '#f7fafc'} stroke={right ? GREEN_DARK : RULE} strokeWidth={right ? 6 : 2.5} />
                <Pic svg={art.pose(e.key, x + CARD_W / 2, y + 134, 0.56)} />
                {e.lines.map((line, j) => (
                  <text key={j} x={x + CARD_W / 2} y={y + (two ? 190 + j * 24 : 202)} fontFamily={FONT} fontSize={two ? 21 : 24} fontWeight="900" fill={e.group} textAnchor="middle">{line}</text>
                ))}
                {fr && <text x={x + CARD_W / 2} y={y + (two ? 234 : 228)} fontFamily={FONT} fontSize="16" fontWeight="700" fill={MUTED} textAnchor="middle">{e.fr}</text>}
                {right && (
                  <g>
                    <circle cx={x + CARD_W - 26} cy={y + 26} r="20" fill={GREEN_DARK} />
                    <path d={`M ${x + CARD_W - 37} ${y + 26} l 8 8 l 14 -16`} stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="teal" icon={Eye} disabled={shown} onClick={() => setShown(true)}>{t(lang, 'Show the answer', 'Voir la réponse')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} onClick={next}>{t(lang, 'Next round', 'Manche suivante')}</Btn>
        <Btn big={big} tone="slate" icon={RotateCcw} disabled={n === 0 && !shown} onClick={() => { setN(0); setShown(false) }}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

/* ============================================================= *
 * 2 · THE BUS GOING UPHILL — eight labels, one a press
 * ============================================================= */
// The bus (art.bus, drawn about its centre) is placed at BUS with a tilt, so
// the labels' leader lines are worked out from points ON the bus.
const BUS = { x: 690, y: 296, s: 2, deg: -9 }
const onBus = (px, py) => {
  const a = (BUS.deg * Math.PI) / 180
  return [BUS.x + BUS.s * (px * Math.cos(a) - py * Math.sin(a)), BUS.y + BUS.s * (px * Math.sin(a) + py * Math.cos(a))]
}

// The extras the book's picture has, in the bus's own coordinates. BEHIND the
// bus: the headlight's beam, the noisy exhaust, the heat off the engine at the
// back, the road. IN FRONT of it (or the bus would hide them): the fuel cap
// and the two tyres squashed flat on the road.
const BEHIND = `
  <path d="M 148 16 L 270 -24 L 270 76 Z" fill="#fff3b0" opacity="0.95"/>
  <rect x="-170" y="36" width="22" height="8" rx="3" fill="#5b6770"/>
  <circle cx="-190" cy="36" r="9" fill="#d5dbe1"/><circle cx="-206" cy="30" r="12" fill="#e2e8f0"/>
  <path d="M -184 -26 q -10 12 0 24 M -198 -34 q -16 20 0 40 M -212 -42 q -22 28 0 56" fill="none" stroke="${KEY}" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M -136 -82 q -6 -8 0 -16 q 6 -8 0 -16 M -118 -82 q -6 -8 0 -16 q 6 -8 0 -16" fill="none" stroke="#d83a2e" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M -420 78 H 520" stroke="#6b7480" stroke-width="10"/>
`
const FRONT = `
  <rect x="-54" y="24" width="26" height="18" rx="4" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
  ${[-90, 92].map((wx) => `<ellipse cx="${wx}" cy="71" rx="32" ry="7" fill="#3d4650"/>
  <path d="M ${wx - 32} 71 A 32 7 0 0 0 ${wx + 32} 71" fill="none" stroke="${INK}" stroke-width="3"/>`).join('')}
`

// Each label: its lines (the energy, then why), where the first line sits,
// where its leader starts (clear of the words) and the point on the bus it
// names. In the order the class meets them: the easy ones first.
const LABELS = [
  { lines: ['kinetic'], why: 'the bus is moving', at: [560, 58], from: [640, 98], to: onBus(0, -64), group: STORE },
  { lines: ['light'], why: 'the headlights', at: [1262, 252], from: [1256, 262], to: onBus(232, 20), group: TRANSFER },
  { lines: ['sound'], why: 'the engine is noisy', at: [40, 236], from: [282, 252], to: onBus(-198, -10), group: TRANSFER },
  { lines: ['thermal'], why: 'the engine is hot', at: [40, 112], from: [262, 126], to: onBus(-128, -100), group: STORE },
  { lines: ['chemical'], why: 'fuel in the tank', at: [600, 512], from: [650, 486], to: onBus(-41, 33), group: STORE },
  { lines: ['electrical'], why: 'wires to the lights', at: [1150, 470], from: [1176, 446], to: onBus(141, 30), group: TRANSFER },
  { lines: ['elastic potential'], why: 'squashed tyres', at: [860, 506], from: [920, 482], to: onBus(92, 74), group: STORE },
  { lines: ['gravitational', 'potential'], why: 'going uphill', at: [1180, 100], from: [1172, 124], to: onBus(116, -26), group: STORE },
]
const ROAD_FILL = (() => {
  const [ax, ay] = onBus(-420, 78)
  const [bx, by] = onBus(520, 78)
  return `M ${ax.toFixed(1)} ${ay.toFixed(1)} L ${bx.toFixed(1)} ${by.toFixed(1)} L ${bx.toFixed(1)} 560 L ${ax.toFixed(1)} 560 Z`
})()

export function BusEnergies({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0) // labels shown
  const big = isDisplayMode
  const done = k >= LABELS.length
  const next = LABELS[k]

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 560" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="560" rx="16" fill="#ffffff" />
          <path d={ROAD_FILL} fill="#eef1f4" />
          <g transform={`translate(${BUS.x} ${BUS.y}) rotate(${BUS.deg}) scale(${BUS.s})`}>
            <Pic svg={BEHIND} />
            <Pic svg={art.bus(0, 0, 1)} />
            <Pic svg={FRONT} />
          </g>

          {LABELS.slice(0, k).map((l) => (
            <g key={l.lines[0]}>
              <line x1={l.from[0]} y1={l.from[1]} x2={l.to[0]} y2={l.to[1]} stroke={l.group} strokeWidth="2.5" />
              <circle cx={l.to[0]} cy={l.to[1]} r="6" fill={l.group} />
              {l.lines.map((line, j) => (
                <text key={j} x={l.at[0]} y={l.at[1] + j * 30} fontFamily={FONT} fontSize="27" fontWeight="900" fill={l.group}>{line}</text>
              ))}
              <text x={l.at[0]} y={l.at[1] + l.lines.length * 30 - 2} fontFamily={FONT} fontSize="23" fontWeight="700" fill={INK}>{l.why}</text>
            </g>
          ))}
          {/* the next one: its leader points at the clue, and a "?" waits where its label will go */}
          {next && (
            <g>
              <line x1={next.at[0] + 24} y1={next.at[1] - 9} x2={next.to[0]} y2={next.to[1]} stroke={KEY} strokeWidth="3" strokeDasharray="8 6" />
              <circle cx={next.to[0]} cy={next.to[1]} r="8" fill={KEY} />
              <rect x={next.at[0] - 4} y={next.at[1] - 34} width="56" height="50" rx="12" fill="#ffffff" stroke={KEY} strokeWidth="4" />
              <text x={next.at[0] + 24} y={next.at[1] + 4} fontFamily={FONT} fontSize="36" fontWeight="900" fill={KEY} textAnchor="middle">?</text>
            </g>
          )}
          <text x="1476" y="44" fontFamily={FONT} fontSize="24" fontWeight="900" fill={done ? GREEN_DARK : MUTED} textAnchor="end">
            {done ? t(lang, 'All 8! Now copy the bus and its labels.', 'Les 8 ! Recopie le bus et ses légendes.') : t(lang, `${k} of 8`, `${k} sur 8`)}
          </text>
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={done} onClick={() => setK((v) => Math.min(LABELS.length, v + 1))}>{t(lang, 'Show the label', 'Voir la légende')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

// content/y7-science/U03_6/fromto.jsx
// FROM… TO… — the game, everyone standing. A picture each round, named under
// it (an ESL class may not know "kettle" or "bow"). On "From!"
// the whole class does the action for the energy it starts as; on "To!" the
// action for the energy it changes into (the eight actions are 3.5's). Show
// the answer fills in the two boxes, as an energy-change diagram, and lights
// up the two actions; a wrong action sits down. Twelve rounds in a fixed
// order, then random ones. Each picture has ONE useful change.
import { useState } from 'react'
import { RotateCcw, ChevronRight, Eye } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { mulberry32 } from '../U03_models/data.js'
import { Btn } from '../U03_models/ui.jsx'
import * as art from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const { INK, KEY, MUTED, FONT, STORE, TRANSFER } = art
const RULE = '#d5dbe1', GREEN_DARK = '#3d731c'
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

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
const byKey = Object.fromEntries(EIGHT.map((e) => [e.key, e]))

// [picture, scale, from, to, what it is (English, French)]
const ROUNDS = [
  ['kettle', 1.25, 'electrical', 'thermal', 'A kettle', 'Une bouilloire'],
  ['candle', 1.35, 'chemical', 'light', 'A candle', 'Une bougie'],
  ['radio', 1.35, 'electrical', 'sound', 'A radio', 'Une radio'],
  ['bow', 1.45, 'elastic', 'kinetic', 'A bow shoots', 'Un arc tire'],
  ['appleFall', 1.3, 'gravitational', 'kinetic', 'A falling apple', 'Une pomme qui tombe'],
  ['car', 1.3, 'chemical', 'kinetic', 'A car', 'Une voiture'],
  ['solar', 1.3, 'light', 'electrical', 'A solar panel', 'Un panneau solaire'],
  ['turbine', 1.15, 'kinetic', 'electrical', 'A wind turbine', 'Une éolienne'],
  ['bulb', 1.5, 'electrical', 'light', 'A lamp', 'Une lampe'],
  ['drum', 1.45, 'kinetic', 'sound', 'A drum', 'Un tambour'],
  ['charging', 1.25, 'electrical', 'chemical', 'A phone charging', 'Un téléphone qui charge'],
  ['fire', 1.25, 'chemical', 'thermal', 'A wood fire', 'Un feu de bois'],
  ['toaster', 1.35, 'electrical', 'thermal', 'A toaster', 'Un grille-pain'],
  ['bird', 1.4, 'kinetic', 'gravitational', 'A bird flies higher', 'Un oiseau monte'],
  ['hillBall', 1.25, 'gravitational', 'kinetic', 'A ball rolls downhill', 'Une balle descend'],
]
const FIXED = 12
function roundAt(n) {
  if (n < FIXED) return ROUNDS[n]
  const rnd = mulberry32(3000 + n)
  return ROUNDS[Math.floor(rnd() * ROUNDS.length)]
}

const SLOT = { w: 300, h: 246, y: 24 }
const FROM_X = 688, TO_X = 1124
const STRIP = { x: 616, y: 322, w: 107, h: 158 }

function Slot({ x, label, e, shown, lang }) {
  const fr = lang === 'fr'
  return (
    <g>
      <rect x={x} y={SLOT.y} width={SLOT.w} height={SLOT.h} rx="18" fill={shown ? '#eef6e6' : '#f7fafc'} stroke={shown ? GREEN_DARK : RULE} strokeWidth={shown ? 5 : 3} strokeDasharray={shown ? undefined : '10 8'} />
      <text x={x + SLOT.w / 2} y={SLOT.y + 38} fontFamily={FONT} fontSize="24" fontWeight="900" fill={MUTED} textAnchor="middle">{label}</text>
      {shown ? (
        <g>
          <Pic svg={art.pose(e.key, x + SLOT.w / 2, SLOT.y + 158, 0.52)} />
          {e.lines.length > 1 ? (
            <text x={x + SLOT.w / 2} y={SLOT.y + 212} fontFamily={FONT} fontSize="23" fontWeight="900" fill={e.group} textAnchor="middle">{e.lines.join(' ')}</text>
          ) : (
            <text x={x + SLOT.w / 2} y={SLOT.y + 214} fontFamily={FONT} fontSize="30" fontWeight="900" fill={e.group} textAnchor="middle">{e.lines[0]}</text>
          )}
          {fr && <text x={x + SLOT.w / 2} y={SLOT.y + 236} fontFamily={FONT} fontSize="17" fontWeight="700" fill={MUTED} textAnchor="middle">{e.fr}</text>}
        </g>
      ) : (
        <text x={x + SLOT.w / 2} y={SLOT.y + 172} fontFamily={FONT} fontSize="96" fontWeight="900" fill={RULE} textAnchor="middle">?</text>
      )}
    </g>
  )
}

export function FromTo({ lang = 'en', isDisplayMode = false }) {
  const [n, setN] = useState(0)
  const [shown, setShown] = useState(false)
  const big = isDisplayMode
  const fr = lang === 'fr'
  const [pic, s, from, to, whatEn, whatFr] = roundAt(n)
  const next = () => { setN((v) => v + 1); setShown(false) }
  const change = `${byKey[from].lines.join(' ')} → ${byKey[to].lines.join(' ')}`
  const answerLine = fr ? `${whatFr}\u00a0: ${change}` : `${whatEn}: ${change}`

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 540" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="540" rx="16" fill="#ffffff" />

          {/* the picture */}
          <rect x="24" y="22" width="570" height="430" rx="20" fill="#fbfdff" stroke="#c9d3dc" strokeWidth="3" />
          <text x="50" y="66" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, `Round ${n + 1}`, `Manche ${n + 1}`)}</text>
          <Pic svg={art[pic](309, 262, s)} />
          <text x="36" y="506" fontFamily={FONT} fontSize={shown ? 24 : 30} fontWeight="900" fill={shown ? GREEN_DARK : INK}>
            {shown ? answerLine : (fr ? whatFr : whatEn)}
          </text>

          {/* the energy-change diagram: two boxes and an arrow */}
          <Slot x={FROM_X} label={t(lang, 'FROM', 'DE')} e={byKey[from]} shown={shown} lang={lang} />
          <Pic svg={art.arrow(FROM_X + SLOT.w + 16, SLOT.y + SLOT.h / 2, TO_X - 16, SLOT.y + SLOT.h / 2, shown ? GREEN_DARK : MUTED, 7, 26)} />
          <Slot x={TO_X} label={t(lang, 'TO', 'À')} e={byKey[to]} shown={shown} lang={lang} />

          {/* the eight actions, to look at */}
          {EIGHT.map((e, i) => {
            const x = STRIP.x + i * STRIP.w
            const used = shown && (e.key === from || e.key === to)
            return (
              <g key={e.key} opacity={shown && !used ? 0.35 : 1}>
                <rect x={x + 3} y={STRIP.y} width={STRIP.w - 6} height={STRIP.h} rx="12" fill={used ? '#eef6e6' : '#f7fafc'} stroke={used ? GREEN_DARK : RULE} strokeWidth={used ? 4 : 2} />
                <Pic svg={art.pose(e.key, x + STRIP.w / 2, STRIP.y + 96, 0.36)} />
                {e.lines.map((line, j) => (
                  <text key={j} x={x + STRIP.w / 2} y={STRIP.y + (e.lines.length > 1 ? 128 + j * 19 : 140)} fontFamily={FONT} fontSize={e.lines.length > 1 ? 15 : 17} fontWeight="900" fill={e.group} textAnchor="middle">{line}</text>
                ))}
              </g>
            )
          })}
          <text x="1476" y="512" fontFamily={FONT} fontSize="19" fontWeight="700" fill={KEY} textAnchor="end">{t(lang, 'Wrong? Sit down.', 'Faux ? Assieds-toi.')}</text>
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

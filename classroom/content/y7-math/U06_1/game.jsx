// content/y7-math/U06_1/game.jsx
// WORD, COUNT OR MEASURE? — a game for the whole class, standing (5.2's
// Equal or Not? and Tides' High Tide or Low Tide? are the pattern). One kind
// of data a round. Everyone shows a pose at once:
//
//   a word (categorical)      hands on your head
//   you count it (discrete)   hands up, fingers out
//   you measure it (continuous) arms out wide, like a fish you caught
//
// Show the answer lights the right pose and says why in one line. Wrong pose:
// sit down. Twelve rounds in a fixed order; rounds 4 and 11 are traps (a
// number that is a name), round 6 is the Workbook's "age in years", and round
// 10 is the foot whose shoe size was the vote.
//
// One SVG stage; the buttons are the house Btn. EN/FR through tr().
import { useState } from 'react'
import { Eye, ChevronRight, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../../y7-science/U03_models/ui.jsx'
import { KINDS } from './kinds.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', MUTED = '#5b6770', GREY = '#c3ccd5', KEY = '#c25e12'

const ROUNDS = [
  { en: 'your favourite sport', fr: 'ton sport préféré', kind: 'word',
    why: ['A word: football, swimming…', 'Un mot : football, natation…'] },
  { en: 'the number of goals in a match', fr: 'le nombre de buts d’un match', kind: 'count',
    why: ['You count goals: 0, 1, 2, 3…', 'On compte les buts : 0, 1, 2, 3…'] },
  { en: 'the time to run 100 m', fr: 'le temps pour courir 100 m', kind: 'measure',
    why: ['You measure time: 15.37 seconds.', 'On mesure le temps : 15.37 secondes.'] },
  { en: 'the number on a football shirt', fr: 'le numéro d’un maillot de foot', kind: 'word',
    why: ['A trap! The 7 is a name for a player.', 'Un piège ! Le 7 est un nom de joueur.'] },
  { en: 'your mass', fr: 'ta masse', kind: 'measure',
    why: ['You measure mass: 41.6 kg.', 'On mesure la masse : 41.6 kg.'] },
  { en: 'your age, in years', fr: 'ton âge, en années', kind: 'count',
    why: ['You count birthdays: 12, 13…', 'On compte les anniversaires : 12, 13…'] },
  { en: 'the colour of your eyes', fr: 'la couleur de tes yeux', kind: 'word',
    why: ['A word: brown, black…', 'Un mot : marron, noir…'] },
  { en: 'the temperature today', fr: 'la température aujourd’hui', kind: 'measure',
    why: ['You measure it: 31.5 °C.', 'On la mesure : 31.5 °C.'] },
  { en: 'the number of students in a class', fr: 'le nombre d’élèves d’une classe', kind: 'count',
    why: ['You count students: 27.', 'On compte les élèves : 27.'] },
  { en: 'the length of your foot', fr: 'la longueur de ton pied', kind: 'measure',
    why: ['You measure it: 23.7 cm. (Shoe size: discrete.)', 'On la mesure : 23.7 cm. (La pointure : discrète.)'] },
  { en: 'your phone number', fr: 'ton numéro de téléphone', kind: 'word',
    why: ['A trap! It is a name for a phone.', 'Un piège ! C’est un nom de téléphone.'] },
  { en: 'the length of a phở noodle', fr: 'la longueur d’une nouille de phở', kind: 'measure',
    why: ['You measure it: 41.2 cm.', 'On la mesure : 41.2 cm.'] },
]
const NAMES = { word: ['Categorical', 'Catégorielle'], count: ['Discrete', 'Discrète'], measure: ['Continuous', 'Continue'] }

// The three poses, standing on y = 0 (feet), head at about y = −150.
function Pose({ x, y, kind, color }) {
  const arms = {
    word: 'M -6 -96 L -40 -118 L -14 -150 M 6 -96 L 40 -118 L 14 -150',
    count: 'M -6 -96 L -34 -150 L -44 -196 M 6 -96 L 34 -150 L 44 -196',
    measure: 'M -6 -96 L -56 -100 L -104 -104 M 6 -96 L 56 -100 L 104 -104',
  }[kind]
  return (
    <g transform={`translate(${x} ${y})`} stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <circle cx="0" cy="-138" r="20" fill={color} stroke="none" />
      <line x1="0" y1="-116" x2="0" y2="-44" />
      <line x1="0" y1="-44" x2="-22" y2="0" />
      <line x1="0" y1="-44" x2="22" y2="0" />
      <path d={arms} />
      {kind === 'count' && <path d="M -52 -204 L -50 -218 M -44 -207 L -44 -222 M -36 -204 L -38 -218 M 36 -204 L 38 -218 M 44 -207 L 44 -222 M 52 -204 L 50 -218" strokeWidth="5" />}
      {kind === 'measure' && <path d="M -104 -122 L -104 -86 M 104 -122 L 104 -86" strokeWidth="5" />}
    </g>
  )
}

const POSES = [
  { kind: 'word', x: 975, lab: ['Hands on head', 'Mains sur la tête'] },
  { kind: 'count', x: 1160, lab: ['Hands up', 'Mains en l’air'] },
  { kind: 'measure', x: 1355, lab: ['Arms out wide', 'Bras écartés'] },
]

export function WordCountMeasure({ lang = 'en', isDisplayMode = false }) {
  const [n, setN] = useState(0)
  const [shown, setShown] = useState(false)
  const big = isDisplayMode
  const r = ROUNDS[n % ROUNDS.length]
  const right = KINDS[r.kind]
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])
  const next = () => { setN((v) => v + 1); setShown(false) }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />

          {/* the round */}
          <text x="40" y="62" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>
            {t(lang, `Round ${(n % ROUNDS.length) + 1} of ${ROUNDS.length}`, `Manche ${(n % ROUNDS.length) + 1} sur ${ROUNDS.length}`)}
          </text>
          <rect x="30" y="92" width="830" height="200" rx="20" fill="#fdf1e3" stroke={KEY} strokeWidth="4" />
          <text x="445" y="210" fontFamily={FONT} fontSize={r.en.length > 28 || r.fr.length > 28 ? 42 : 52} fontWeight="900" fill={INK} textAnchor="middle">
            {t(lang, r.en, r.fr)}
          </text>

          {/* the answer */}
          {shown ? (
            <g>
              <rect x="30" y="324" width="830" height="168" rx="20" fill={right.tint} stroke={right.color} strokeWidth="4" />
              <text x="445" y="396" fontFamily={FONT} fontSize="44" fontWeight="900" fill={right.color} textAnchor="middle">
                {L(NAMES[r.kind])} · {t(lang, right.en, right.fr)}
              </text>
              <text x="445" y="452" fontFamily={FONT} fontSize={L(r.why).length > 40 ? 26 : 30} fontWeight="800" fill={INK} textAnchor="middle">{L(r.why)}</text>
            </g>
          ) : (
            <text x="445" y="420" fontFamily={FONT} fontSize="40" fontWeight="900" fill={MUTED} textAnchor="middle">
              {t(lang, 'Show me… now!', 'Montre-moi… maintenant !')}
            </text>
          )}

          {/* the three poses: the right one lights up */}
          <rect x="880" y="30" width="592" height="462" rx="20" fill="#f7f9fb" />
          {POSES.map((p) => {
            const lit = !shown || p.kind === r.kind
            const color = lit ? KINDS[p.kind].color : GREY
            return (
              <g key={p.kind}>
                {shown && p.kind === r.kind && <circle cx={p.x} cy="240" r="118" fill={KINDS[p.kind].tint} stroke={KINDS[p.kind].color} strokeWidth="4" />}
                <Pose x={p.x} y={340} kind={p.kind} color={color} />
                <text x={p.x} y="404" fontFamily={FONT} fontSize="24" fontWeight="900" fill={color} textAnchor="middle">{t(lang, KINDS[p.kind].en, KINDS[p.kind].fr)}</text>
                <text x={p.x} y="446" fontFamily={FONT} fontSize="22" fontWeight="700" fill={lit ? INK : GREY} textAnchor="middle">{L(p.lab)}</text>
              </g>
            )
          })}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="teal" icon={Eye} disabled={shown} onClick={() => setShown(true)}>{t(lang, 'Show the answer', 'Montrer la réponse')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} onClick={next}>{t(lang, 'Next round', 'Manche suivante')}</Btn>
        <Btn big={big} tone="slate" icon={RotateCcw} disabled={n === 0 && !shown} onClick={() => { setN(0); setShown(false) }}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

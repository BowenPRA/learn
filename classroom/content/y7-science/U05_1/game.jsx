// content/y7-science/U05_1/game.jsx
// WHY THIS MATERIAL? — the whole class standing (the shape of 4.5's Good
// Question or Bad?). One real photograph of a thing at work and two reasons
// for its material. Which reason is right? Everyone answers at once: arms up
// for the top card's reason, arms down for the other. Wrong? Sit down. Eight
// rounds in a fixed order, four of each answer.
//
// The traps:
//   aluminium foil   It is magnetic. (arms up)  WRONG: aluminium is not
//                    magnetic (slide 13); it is malleable.
//   the wire's       It is a conductor. (arms down)  WRONG: the copper is the
//   plastic          conductor; the plastic around it is an insulator.
import { useState } from 'react'
import { ChevronRight, Eye, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { ArmsFigure } from '../U03_4/bodies.jsx'
import { INK, KEY, MUTED, FONT, RULE, TEAL } from './art.js'
import copperWire from './images/copper-wire.jpg'
import gongs from './images/gongs.jpg'
import goldRing from './images/gold-ring.jpg'
import saucepan from './images/saucepan.jpg'
import foil from './images/foil.jpg'
import dragonBridge from './images/dragon-bridge.jpg'
import balloons from './images/balloons.jpg'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const BLUE = '#1a5fa8', GREEN_DARK = '#3d731c'

// pic, [name EN, FR], [question EN, FR], the reason on each card as
// [[English lines], [French lines]], which card is right, and why.
const ROUNDS = [
  { pic: copperWire, name: ['a copper wire', 'un fil de cuivre'], q: ['Why copper?', 'Pourquoi du cuivre ?'],
    up: [['It conducts', 'electricity.'], ['Il conduit', 'l’électricité.']], down: [['It is magnetic.'], ['Il est magnétique.']], answer: 'up',
    why: ['Copper conducts electricity. It is not magnetic.', 'Le cuivre conduit l’électricité.'] },
  { pic: gongs, name: ['gongs', 'des gongs'], q: ['Why metal?', 'Pourquoi du métal ?'],
    up: [['It is brittle.'], ['Il est cassant.']], down: [['It is sonorous.'], ['Il est sonore.']], answer: 'down',
    why: ['Metal rings when you hit it.', 'Le métal sonne quand on le frappe.'] },
  { pic: goldRing, name: ['a gold ring', 'une bague en or'], q: ['Why gold?', 'Pourquoi de l’or ?'],
    up: [['It is shiny.'], ['Il est brillant.']], down: [['It conducts heat.'], ['Il conduit', 'la chaleur.']], answer: 'up',
    why: ['Gold is shiny and beautiful.', 'L’or est brillant et beau.'] },
  { pic: saucepan, name: ['a saucepan', 'une casserole'], q: ['Why metal?', 'Pourquoi du métal ?'],
    up: [['It is sonorous.'], ['Il est sonore.']], down: [['It conducts heat.'], ['Il conduit', 'la chaleur.']], answer: 'down',
    why: ['The heat moves through the metal to the food.', 'La chaleur traverse le métal.'] },
  { pic: foil, name: ['aluminium foil', 'du papier d’aluminium'], q: ['Why aluminium?', 'Pourquoi de l’aluminium ?'],
    up: [['It is magnetic.'], ['Il est magnétique.']], down: [['It is malleable.'], ['Il est malléable.']], answer: 'down',
    why: ['It takes any shape. Aluminium is not magnetic!', 'Il prend toutes les formes.'] },
  { pic: dragonBridge, name: ['the Dragon Bridge, Đà Nẵng', 'le pont du Dragon, Đà Nẵng'], q: ['Why steel?', 'Pourquoi de l’acier ?'],
    up: [['It is strong.'], ['Il est solide.']], down: [['It is shiny.'], ['Il est brillant.']], answer: 'up',
    why: ['Steel holds big weights without breaking.', 'L’acier tient de gros poids.'] },
  { pic: balloons, name: ['balloons', 'des ballons'], q: ['Why helium?', 'Pourquoi de l’hélium ?'], align: 'xMidYMin',
    up: [['It conducts', 'electricity.'], ['Il conduit', 'l’électricité.']], down: [['It is lighter', 'than air.'], ['Il est plus léger', 'que l’air.']], answer: 'down',
    why: ['Helium is a gas, lighter than air.', 'L’hélium est un gaz plus léger que l’air.'] },
  { pic: copperWire, name: ['the white plastic', 'le plastique blanc'], q: ['Why plastic around the copper?', 'Pourquoi du plastique autour ?'],
    up: [['It is an insulator.'], ['C’est un isolant.']], down: [['It is a conductor.'], ['C’est un conducteur.']], answer: 'up',
    why: ['Plastic keeps the electricity in the copper.', 'Il garde l’électricité dans le cuivre.'] },
]
const LAST = ROUNDS.length - 1

export function WhyThisMaterial({ lang = 'en', isDisplayMode = false }) {
  const [n, setN] = useState(0)
  const [shown, setShown] = useState(false)
  const big = isDisplayMode
  const fr = lang === 'fr'
  const L = (pair) => (fr ? pair[1] : pair[0])
  const round = ROUNDS[n]
  const next = () => { setN((v) => Math.min(LAST, v + 1)); setShown(false) }

  const card = (x, side) => {
    const up = side === 'up'
    const right = shown && round.answer === side
    const fade = shown && round.answer !== side
    const lines = L(round[side])
    return (
      <g opacity={fade ? 0.3 : 1}>
        <rect x={x} y="136" width="380" height="272" rx="20" fill={right ? '#eef6e6' : '#f7fafc'} stroke={right ? GREEN_DARK : RULE} strokeWidth={right ? 6 : 3} />
        <ArmsFigure x={x + 190} y={226} up={up} color={up ? BLUE : KEY} s={0.85} />
        <text x={x + 190} y="300" fontFamily={FONT} fontSize="30" fontWeight="900" fill={up ? BLUE : KEY} textAnchor="middle">{up ? t(lang, 'ARMS UP', 'BRAS EN HAUT') : t(lang, 'ARMS DOWN', 'BRAS EN BAS')}</text>
        {lines.map((line, i) => (
          <text key={i} x={x + 190} y={lines.length === 1 ? 356 : 342 + i * 38} fontFamily={FONT} fontSize="30" fontWeight="800" fill={INK} textAnchor="middle">{line}</text>
        ))}
        {right && (
          <g>
            <circle cx={x + 342} cy="174" r="22" fill={GREEN_DARK} />
            <path d={`M ${x + 330} 174 l 8 8 l 14 -16`} stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </g>
    )
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />
          <defs><clipPath id="wtm-pic"><rect x="20" y="16" width="620" height="440" rx="16" /></clipPath></defs>

          <image href={round.pic} x="20" y="16" width="620" height="440" preserveAspectRatio={`${round.align || 'xMidYMid'} slice`} clipPath="url(#wtm-pic)" />
          <rect x="20" y="16" width="620" height="440" rx="16" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          <text x="330" y="500" fontFamily={FONT} fontSize="32" fontWeight="900" fill={KEY} textAnchor="middle">{L(round.name)}</text>

          <text x="1480" y="40" fontFamily={FONT} fontSize="28" fontWeight="800" fill={MUTED} textAnchor="end">{t(lang, `Round ${n + 1} of ${ROUNDS.length}`, `Manche ${n + 1} sur ${ROUNDS.length}`)}</text>
          <rect x="680" y="56" width="790" height="66" rx="14" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
          <text x="1075" y="101" fontFamily={FONT} fontSize="34" fontWeight="900" fill={INK} textAnchor="middle">{L(round.q)}</text>

          {card(680, 'up')}
          {card(1090, 'down')}
          <text x="680" y="452" fontFamily={FONT} fontSize="30" fontWeight="900" fill={shown ? GREEN_DARK : MUTED}>
            {shown ? L(round.why) : t(lang, 'Which reason? Everyone at once.', 'Quelle raison ? Tous ensemble.')}
          </text>
          {!shown && <text x="680" y="494" fontFamily={FONT} fontSize="30" fontWeight="900" fill={MUTED}>{t(lang, 'Wrong? Sit down.', 'Faux ? Assieds-toi.')}</text>}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="teal" icon={Eye} disabled={shown} onClick={() => setShown(true)}>{t(lang, 'Show the answer', 'Voir la réponse')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={n === LAST} onClick={next}>{t(lang, 'Next round', 'Manche suivante')}</Btn>
        <Btn big={big} tone="slate" icon={RotateCcw} disabled={n === 0 && !shown} onClick={() => { setN(0); setShown(false) }}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

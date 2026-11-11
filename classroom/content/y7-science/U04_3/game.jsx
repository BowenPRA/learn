// content/y7-science/U04_3/game.jsx
// SAME SPECIES OR DIFFERENT? — the whole class standing (the shape of 3.4's
// High Tide or Low Tide?). Two organisms in real photographs; everyone
// answers at once: arms up, the same species; arms down, different species.
// Wrong? Sit down. Eight rounds in a fixed order, four of each answer.
//
// Every round can be decided with slide 15's two questions, and seven of the
// eight pairs are new to the class. The traps go both ways:
//   they look different but are ONE species   a big dog and a small dog, two
//                                             ducks (a female and a male), a
//                                             leopard and a black panther,
//                                             two chickens (a hen, a rooster)
//   they look similar but are TWO species     a horse and a donkey, a water
//                                             buffalo and a cow, a sheep and
//                                             a goat (and a lion and a tiger)
// Each organism is named under its photograph before the class answers, in
// words that do not give the answer away ("a duck", "a black panther").
import { useState } from 'react'
import { ChevronRight, Eye, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { ArmsFigure } from '../U03_4/bodies.jsx'
import { INK, KEY, MUTED, FONT } from './art.js'
import horse from './images/horse.jpg'
import donkey from './images/donkey.jpg'
import dogBig from './images/dog-big.jpg'
import dogSmall from './images/dog-small.jpg'
import buffalo from './images/buffalo.jpg'
import cow from './images/cow.jpg'
import duckFemale from './images/duck-female.jpg'
import duckMale from './images/duck-male.jpg'
import lion from './images/lion.jpg'
import tiger from './images/tiger.jpg'
import leopard from './images/leopard.jpg'
import blackLeopard from './images/black-leopard.jpg'
import sheep from './images/sheep.jpg'
import goat from './images/goat.jpg'
import hen from './images/hen.jpg'
import rooster from './images/rooster.jpg'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const RULE = '#d5dbe1', BLUE = '#1a5fa8', GREEN_DARK = '#3d731c'

// pics: the two photographs, each [file, English name, French name].
// same: are they one species? why: [English lines, French lines].
const ROUNDS = [
  { pics: [[horse, 'a horse', 'un cheval'], [donkey, 'a donkey', 'un âne']], same: false,
    why: [['Their offspring, the mule, is infertile.'], ['Leur petit, le mulet, est infertile.']] },
  { pics: [[dogBig, 'a big dog', 'un grand chien'], [dogSmall, 'a small dog', 'un petit chien']], same: true,
    why: [['All dogs are one species.', 'Their puppies are fertile.'], ['Tous les chiens sont une seule espèce.', 'Leurs chiots sont fertiles.']] },
  { pics: [[buffalo, 'a water buffalo', 'un buffle'], [cow, 'a cow', 'une vache']], same: false,
    why: [['They cannot have offspring together.'], ['Ils ne peuvent pas avoir de descendants', 'ensemble.']] },
  { pics: [[duckFemale, 'a duck', 'un canard'], [duckMale, 'a duck', 'un canard']], same: true,
    why: [['A female and a male of one species.', 'Their ducklings are fertile.'], ['Une femelle et un mâle d’une seule espèce.', 'Leurs canetons sont fertiles.']] },
  { pics: [[lion, 'a lion', 'un lion'], [tiger, 'a tiger', 'un tigre']], same: false,
    why: [['Their offspring, the liger, is infertile.'], ['Leur petit, le ligre, est infertile.']] },
  { pics: [[leopard, 'a leopard', 'un léopard'], [blackLeopard, 'a black panther', 'une panthère noire']], same: true,
    why: [['A black panther is a leopard', 'with black fur: variation.'], ['Une panthère noire est un léopard', 'au pelage noir : la variation.']] },
  { pics: [[sheep, 'a sheep', 'un mouton'], [goat, 'a goat', 'une chèvre']], same: false,
    why: [['They do not have offspring together.'], ['Ils n’ont pas de descendants ensemble.']] },
  { pics: [[hen, 'a chicken', 'une poule'], [rooster, 'a chicken', 'un coq']], same: true,
    why: [['A female and a male of one species.', 'Their chicks are fertile.'], ['Une femelle et un mâle d’une seule espèce.', 'Leurs poussins sont fertiles.']] },
]
const LAST = ROUNDS.length - 1

export function SameOrDifferent({ lang = 'en', isDisplayMode = false }) {
  const [n, setN] = useState(0)
  const [shown, setShown] = useState(false)
  const big = isDisplayMode
  const fr = lang === 'fr'
  const round = ROUNDS[n]
  const why = round.why[fr ? 1 : 0]
  const wait = fr ? ['Tout le monde répond en même temps.', 'Faux ? Assieds-toi.'] : ['Everyone answers at once.', 'Wrong? Sit down.']
  const lines = shown ? why : wait
  const next = () => { setN((v) => Math.min(LAST, v + 1)); setShown(false) }

  const card = (x, up) => {
    const right = shown && up === round.same
    const fade = shown && up !== round.same
    return (
      <g opacity={fade ? 0.3 : 1}>
        <rect x={x} y="100" width="300" height="250" rx="20" fill={right ? '#eef6e6' : '#f7fafc'} stroke={right ? GREEN_DARK : RULE} strokeWidth={right ? 6 : 3} />
        <ArmsFigure x={x + 150} y={200} up={up} color={up ? BLUE : KEY} s={0.95} />
        <text x={x + 150} y="292" fontFamily={FONT} fontSize="30" fontWeight="900" fill={up ? BLUE : KEY} textAnchor="middle">{up ? t(lang, 'ARMS UP', 'BRAS EN HAUT') : t(lang, 'ARMS DOWN', 'BRAS EN BAS')}</text>
        <text x={x + 150} y="330" fontFamily={FONT} fontSize="26" fontWeight="700" fill={INK} textAnchor="middle">{up ? t(lang, 'the same species', 'la même espèce') : t(lang, 'different species', 'espèces différentes')}</text>
        {right && (
          <g>
            <circle cx={x + 266} cy="134" r="22" fill={GREEN_DARK} />
            <path d={`M ${x + 254} 134 l 8 8 l 14 -16`} stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </g>
    )
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 540" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="540" rx="16" fill="#ffffff" />
          <defs>
            <clipPath id="same-a"><rect x="20" y="100" width="390" height="308" rx="16" /></clipPath>
            <clipPath id="same-b"><rect x="430" y="100" width="390" height="308" rx="16" /></clipPath>
          </defs>

          <text x="20" y="64" fontFamily={FONT} fontSize="32" fontWeight="900" fill={INK}>
            {t(lang, 'The same species, or different species?', 'La même espèce, ou des espèces différentes ?')}
          </text>
          <text x="1480" y="64" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED} textAnchor="end">{t(lang, `Round ${n + 1} of ${ROUNDS.length}`, `Manche ${n + 1} sur ${ROUNDS.length}`)}</text>

          {/* the two photographs, each one named */}
          <image href={round.pics[0][0]} x="20" y="100" width="390" height="308" preserveAspectRatio="xMidYMid slice" clipPath="url(#same-a)" />
          <image href={round.pics[1][0]} x="430" y="100" width="390" height="308" preserveAspectRatio="xMidYMid slice" clipPath="url(#same-b)" />
          <rect x="20" y="100" width="390" height="308" rx="16" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="430" y="100" width="390" height="308" rx="16" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          <text x="215" y="458" fontFamily={FONT} fontSize="30" fontWeight="900" fill={KEY} textAnchor="middle">{fr ? round.pics[0][2] : round.pics[0][1]}</text>
          <text x="625" y="458" fontFamily={FONT} fontSize="30" fontWeight="900" fill={KEY} textAnchor="middle">{fr ? round.pics[1][2] : round.pics[1][1]}</text>

          {/* the two answers, then the reason */}
          {card(860, true)}
          {card(1180, false)}
          <text x="860" y="404" fontFamily={FONT} fontSize="26" fontWeight="900" fill={shown ? GREEN_DARK : MUTED}>{lines[0]}</text>
          {lines[1] && <text x="860" y="442" fontFamily={FONT} fontSize="26" fontWeight="900" fill={shown ? GREEN_DARK : MUTED}>{lines[1]}</text>}
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

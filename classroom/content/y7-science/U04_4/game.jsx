// content/y7-science/U04_4/game.jsx
// YES OR NO? — the whole class standing (the shape of 3.4's High Tide or Low
// Tide? and 4.3's Same Species or Different?). One real photograph and ONE
// question from the book's key (page 139). Everyone answers at once: arms up,
// yes; arms down, no. Wrong? Sit down. Eight rounds in a fixed order, four of
// each answer, every one a question a key really asks.
//
// The traps are the ones that make people use a key wrongly: looking quickly
// instead of counting.
//   a spider       more than six legs? YES  (8: a spider is not an insect)
//   an ant         more than six legs? NO   (6, and 2 feelers in front)
//   a bee          four wings?         YES  (the two pairs hook together)
//   a hoverfly     four wings?         NO   (it looks like a bee; it is a fly)
//   a snail        legs?               NO   (it moves on one foot)
//   an earthworm   rings?              YES
//   a slug         rings?              NO
//   a ladybird     four wings?         YES  (2 hard red ones, 2 thin ones)
// Each organism is named under its photograph before the class answers.
import { useState } from 'react'
import { ChevronRight, Eye, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { ArmsFigure } from '../U03_4/bodies.jsx'
import { INK, KEY, MUTED, FONT, RULE } from './art.js'
import { BOOK } from './keys.js'
import spider from './images/spider.jpg'
import ant from './images/ant.jpg'
import bee from './images/bee.jpg'
import hoverfly from './images/hoverfly.jpg'
import snail from './images/snail.jpg'
import earthworm from './images/earthworm.jpg'
import slug from './images/slug.jpg'
import ladybird from './images/ladybird.jpg'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const BLUE = '#1a5fa8', GREEN_DARK = '#3d731c'

// pic, [English name, French name], the key's question, the answer, and why.
const ROUNDS = [
  { pic: spider, name: ['a spider', 'une araignée'], q: 'six', yes: true,
    why: ['Yes: 8 legs. A spider is not an insect.', 'Oui : 8 pattes. Ce n’est pas un insecte.'] },
  { pic: ant, name: ['an ant', 'une fourmi'], q: 'six', yes: false,
    why: ['No: 6 legs. The 2 at the front are feelers.', 'Non : 6 pattes. Devant, ce sont des antennes.'] },
  { pic: bee, name: ['a bee', 'une abeille'], q: 'wings', yes: true,
    why: ['Yes: 2 big wings and 2 small ones.', 'Oui : 2 grandes ailes et 2 petites.'] },
  { pic: hoverfly, name: ['a hoverfly', 'un syrphe'], q: 'wings', yes: false,
    why: ['No: 2 wings. It is a fly, not a bee.', 'Non : 2 ailes. Une mouche, pas une abeille.'] },
  { pic: snail, name: ['a snail', 'un escargot'], q: 'legs', yes: false,
    why: ['No: it moves on one big foot.', 'Non : il avance sur un seul grand pied.'] },
  { pic: earthworm, name: ['an earthworm', 'un ver de terre'], q: 'rings', yes: true,
    why: ['Yes: more than 80 rings.', 'Oui : plus de 80 anneaux.'] },
  { pic: slug, name: ['a slug', 'une limace'], q: 'rings', yes: false,
    why: ['No: soft skin, and no rings.', 'Non : une peau molle, sans anneaux.'] },
  { pic: ladybird, name: ['a ladybird', 'une coccinelle'], q: 'wings', yes: true,
    why: ['Yes: 2 hard red wings, 2 thin ones under.', 'Oui : 2 ailes dures, 2 fines dessous.'] },
]
const LAST = ROUNDS.length - 1

export function YesOrNo({ lang = 'en', isDisplayMode = false }) {
  const [n, setN] = useState(0)
  const [shown, setShown] = useState(false)
  const big = isDisplayMode
  const fr = lang === 'fr'
  const L = (pair) => (fr ? pair[1] : pair[0])
  const round = ROUNDS[n]
  const next = () => { setN((v) => Math.min(LAST, v + 1)); setShown(false) }

  const card = (x, up) => {
    const right = shown && up === round.yes
    const fade = shown && up !== round.yes
    return (
      <g opacity={fade ? 0.3 : 1}>
        <rect x={x} y="112" width="380" height="252" rx="20" fill={right ? '#eef6e6' : '#f7fafc'} stroke={right ? GREEN_DARK : RULE} strokeWidth={right ? 6 : 3} />
        <ArmsFigure x={x + 190} y={212} up={up} color={up ? BLUE : KEY} s={0.95} />
        <text x={x + 190} y="306" fontFamily={FONT} fontSize="32" fontWeight="900" fill={up ? BLUE : KEY} textAnchor="middle">{up ? t(lang, 'ARMS UP', 'BRAS EN HAUT') : t(lang, 'ARMS DOWN', 'BRAS EN BAS')}</text>
        <text x={x + 190} y="346" fontFamily={FONT} fontSize="30" fontWeight="800" fill={INK} textAnchor="middle">{up ? t(lang, 'yes', 'oui') : t(lang, 'no', 'non')}</text>
        {right && (
          <g>
            <circle cx={x + 342} cy="150" r="22" fill={GREEN_DARK} />
            <path d={`M ${x + 330} 150 l 8 8 l 14 -16`} stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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
          <defs><clipPath id="yesno-pic"><rect x="20" y="16" width="620" height="440" rx="16" /></clipPath></defs>

          <image href={round.pic} x="20" y="16" width="620" height="440" preserveAspectRatio="xMidYMid slice" clipPath="url(#yesno-pic)" />
          <rect x="20" y="16" width="620" height="440" rx="16" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          <text x="330" y="500" fontFamily={FONT} fontSize="34" fontWeight="900" fill={KEY} textAnchor="middle">{L(round.name)}</text>

          <text x="1480" y="46" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED} textAnchor="end">{t(lang, `Round ${n + 1} of ${ROUNDS.length}`, `Manche ${n + 1} sur ${ROUNDS.length}`)}</text>
          <text x="680" y="86" fontFamily={FONT} fontSize="36" fontWeight="900" fill={INK}>{L(BOOK.q[round.q])}</text>

          {card(680, true)}
          {card(1090, false)}
          <text x="680" y="420" fontFamily={FONT} fontSize="31" fontWeight="900" fill={shown ? GREEN_DARK : MUTED}>
            {shown ? L(round.why) : t(lang, 'Everyone answers at once.', 'Tout le monde répond en même temps.')}
          </text>
          {!shown && <text x="680" y="462" fontFamily={FONT} fontSize="31" fontWeight="900" fill={MUTED}>{t(lang, 'Wrong? Sit down.', 'Faux ? Assieds-toi.')}</text>}
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

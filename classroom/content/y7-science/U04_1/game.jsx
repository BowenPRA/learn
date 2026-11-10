// content/y7-science/U04_1/game.jsx
// ALIVE OR NOT? — the game, everyone standing. A real photograph each round,
// named under it. Arms up if it is alive, arms down if it is not, all at once;
// Show the answer marks the right card and says why. Wrong: sit down.
//
// The trap rounds are the point: a cloud, fire and crystals move or grow but
// are not alive; dry seeds, coral and the spots on old bread look dead but are
// alive; a wooden chair was alive once. Ten rounds in a fixed order, then
// random ones.
import { useState } from 'react'
import { RotateCcw, ChevronRight, Eye } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { mulberry32 } from '../U03_models/data.js'
import { Btn } from '../U03_models/ui.jsx'
import { ArmsFigure } from '../U03_4/bodies.jsx'
import { INK, MUTED, GREEN, RED, FONT } from './art.js'
import buffalo from './images/buffalo.jpg'
import cloud from './images/cloud.jpg'
import mushroom from './images/mushroom.jpg'
import fire from './images/fire.jpg'
import seeds from './images/seeds.jpg'
import crystals from './images/crystals.jpg'
import coral from './images/coral.jpg'
import chair from './images/chair.jpg'
import breadMould from './images/bread-mould.jpg'
import cactus from './images/cactus.jpg'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const RULE = '#d5dbe1', GREEN_DARK = '#3d731c'

// [photo, alive?, what EN, what FR, why EN, why FR]
const ROUNDS = [
  [buffalo, true, 'A water buffalo', 'Un buffle', 'It eats, grows and has babies.', 'Il mange, grandit et a des petits.'],
  [cloud, false, 'A cloud', 'Un nuage', 'It moves and grows, but it never eats.', 'Il bouge et grandit, mais ne mange jamais.'],
  [mushroom, true, 'Mushrooms', 'Des champignons', 'They feed on the wood, and they grow.', 'Ils se nourrissent du bois, et grandissent.'],
  [fire, false, 'Fire', 'Le feu', 'It moves and grows, but it has no cells.', 'Il bouge et grandit, mais n’a pas de cellules.'],
  [seeds, true, 'Dry beans (seeds)', 'Des haricots secs (des graines)', 'Plant them, and they grow.', 'Plante-les, et elles poussent.'],
  [crystals, false, 'Crystals', 'Des cristaux', 'They grow, but they never feed.', 'Ils grandissent, mais ne se nourrissent pas.'],
  [coral, true, 'Coral', 'Du corail', 'Coral is an animal. It feeds and grows.', 'Le corail est un animal. Il mange et grandit.'],
  [chair, false, 'A wooden chair', 'Une chaise en bois', 'It was alive once, as a tree. Now it is dead.', 'C’était un arbre. Maintenant, c’est du bois mort.'],
  [breadMould, true, 'The spots on old bread', 'Les taches sur du vieux pain', 'They are mould. It feeds on the bread and grows.', 'C’est de la moisissure. Elle mange le pain et grandit.'],
  [cactus, true, 'A cactus', 'Un cactus', 'It grows, and makes flowers and seeds.', 'Il grandit, et fait des fleurs et des graines.'],
]
const FIXED = ROUNDS.length
function roundAt(n) {
  if (n < FIXED) return ROUNDS[n]
  const rnd = mulberry32(4100 + n)
  return ROUNDS[Math.floor(rnd() * ROUNDS.length)]
}

export function AliveOrNot({ lang = 'en', isDisplayMode = false }) {
  const [n, setN] = useState(0)
  const [shown, setShown] = useState(false)
  const big = isDisplayMode
  const fr = lang === 'fr'
  const [photo, alive, whatEn, whatFr, whyEn, whyFr] = roundAt(n)
  const next = () => { setN((v) => v + 1); setShown(false) }

  const card = (x, up) => {
    const right = shown && up === alive
    const fade = shown && up !== alive
    const color = up ? GREEN : RED
    return (
      <g opacity={fade ? 0.3 : 1}>
        <rect x={x} y="140" width="380" height="270" rx="20" fill={right ? (up ? '#eef6e6' : '#fdecee') : '#f7fafc'} stroke={right ? color : RULE} strokeWidth={right ? 6 : 3} />
        <ArmsFigure x={x + 190} y={244} up={up} color={color} s={1} />
        <text x={x + 190} y="342" fontFamily={FONT} fontSize="30" fontWeight="900" fill={color} textAnchor="middle">{up ? t(lang, 'ARMS UP', 'BRAS EN HAUT') : t(lang, 'ARMS DOWN', 'BRAS EN BAS')}</text>
        <text x={x + 190} y="386" fontFamily={FONT} fontSize="30" fontWeight="800" fill={INK} textAnchor="middle">{up ? t(lang, 'alive', 'vivant') : t(lang, 'not alive', 'pas vivant')}</text>
        {right && (
          <g>
            <circle cx={x + 346} cy="174" r="22" fill={GREEN_DARK} />
            <path d={`M ${x + 334} 174 l 8 8 l 14 -16`} stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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

          {/* the photograph and its name */}
          <defs><clipPath id="alive-photo"><rect x="20" y="20" width="580" height="436" rx="18" /></clipPath></defs>
          <image key={n} href={photo} x="20" y="20" width="580" height="436" preserveAspectRatio="xMidYMid slice" clipPath="url(#alive-photo)" />
          <rect x="20" y="20" width="580" height="436" rx="18" fill="none" stroke="#c9d3dc" strokeWidth="3" />
          <rect x="34" y="34" width="150" height="44" rx="12" fill="#ffffff" fillOpacity="0.9" />
          <text x="109" y="65" fontFamily={FONT} fontSize="24" fontWeight="800" fill={MUTED} textAnchor="middle">{t(lang, `Round ${n + 1}`, `Manche ${n + 1}`)}</text>
          <text x="30" y="506" fontFamily={FONT} fontSize="30" fontWeight="900" fill={INK}>{fr ? whatFr : whatEn}</text>

          {/* the question and the two answers */}
          <text x="660" y="104" fontFamily={FONT} fontSize="34" fontWeight="900" fill={INK}>{t(lang, 'Is it alive?', 'Est-ce vivant ?')}</text>
          {card(660, true)}
          {card(1080, false)}
          <text x="660" y="462" fontFamily={FONT} fontSize="26" fontWeight="900" fill={shown ? (alive ? GREEN_DARK : RED) : MUTED}>
            {shown ? (fr ? whyFr : whyEn) : t(lang, 'Everyone answers at once. Wrong? Sit down.', 'Tous en même temps. Faux ? Assieds-toi.')}
          </text>
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

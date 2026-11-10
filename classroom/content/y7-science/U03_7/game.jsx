// content/y7-science/U03_7/game.jsx
// USEFUL OR WASTED? — the game, everyone standing. A picture each round,
// named under it, and ONE of its energies on the badge in the corner (its
// science word, with its picture: heat lines, sound arcs, light rays, an
// arrow). Arms up if that energy is useful, arms down if it is wasted, all at
// once; Show the answer marks the right card and says why. Wrong: sit down.
//
// The trap rounds are the point: heat is USEFUL in a kettle and a toaster,
// light is WASTED by a toaster and a cooking fire, sound is USEFUL from a
// radio. Useful means what we want. Twelve rounds in a fixed order, then
// random ones.
import { useState } from 'react'
import { RotateCcw, ChevronRight, Eye } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { mulberry32 } from '../U03_models/data.js'
import { Btn } from '../U03_models/ui.jsx'
import { ArmsFigure } from '../U03_4/bodies.jsx'
import * as art from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const { INK, KEY, MUTED, FONT, GOLD, BLUE, USEFUL, WASTED, f1 } = art
const RULE = '#d5dbe1', GREEN_DARK = '#3d731c'
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

// [picture, scale, energy, useful?, what EN, what FR, why EN, why FR]
const ROUNDS = [
  ['kettle', 1.15, 'thermal', true, 'A kettle: its heat', 'Une bouilloire : sa chaleur', 'We want hot water.', 'On veut de l’eau chaude.'],
  ['bulb', 1.3, 'light', true, 'A lamp: its light', 'Une lampe : sa lumière', 'We want to see.', 'On veut voir.'],
  ['bulb', 1.3, 'thermal', false, 'A lamp: its heat', 'Une lampe : sa chaleur', 'We want light, not heat.', 'On veut de la lumière, pas de chaleur.'],
  ['radio', 1.15, 'sound', true, 'A radio: its sound', 'Une radio : le son', 'We want to hear the music.', 'On veut entendre la musique.'],
  ['kettle', 1.15, 'sound', false, 'A kettle: its noise', 'Une bouilloire : son bruit', 'Nobody wants the noise.', 'Personne ne veut le bruit.'],
  ['toaster', 1.2, 'thermal', true, 'A toaster: its heat', 'Un grille-pain : sa chaleur', 'We want hot toast.', 'On veut du pain grillé.'],
  ['toaster', 1.2, 'light', false, 'A toaster: its red glow', 'Un grille-pain : sa lueur rouge', 'We want toast, not light.', 'On veut du pain grillé, pas de lumière.'],
  ['motorbike', 0.95, 'kinetic', true, 'A motorbike: it moves', 'Une moto : elle avance', 'We want to get to school.', 'On veut aller à l’école.'],
  ['motorbike', 0.95, 'sound', false, 'A motorbike: its noise', 'Une moto : son bruit', 'Nobody wants the noise.', 'Personne ne veut le bruit.'],
  ['charging', 1.1, 'thermal', false, 'A phone charging: it gets warm', 'Un téléphone qui charge : il chauffe', 'We want a full battery, not heat.', 'On veut une batterie pleine, pas de chaleur.'],
  ['candle', 1.2, 'light', true, 'A candle in a power cut: its light', 'Une bougie, courant coupé : sa lumière', 'We want to see.', 'On veut voir.'],
  ['potFire', 1.0, 'light', false, 'A fire for cooking: its light', 'Un feu pour cuisiner : sa lumière', 'We want heat to cook.', 'On veut de la chaleur pour cuisiner.'],
  ['tv', 1.05, 'light', true, 'A television: its light', 'Une télévision : sa lumière', 'We want to see the picture.', 'On veut voir l’image.'],
  ['tv', 1.05, 'thermal', false, 'A television: its heat', 'Une télévision : sa chaleur', 'We want a picture, not heat.', 'On veut une image, pas de chaleur.'],
  ['radio', 1.15, 'thermal', false, 'A radio: its heat', 'Une radio : sa chaleur', 'We want music, not heat.', 'On veut de la musique, pas de chaleur.'],
  ['potFire', 1.0, 'thermal', true, 'A fire for cooking: its heat', 'Un feu pour cuisiner : sa chaleur', 'We want hot food.', 'On veut un repas chaud.'],
]
const FIXED = 12
function roundAt(n) {
  if (n < FIXED) return ROUNDS[n]
  const rnd = mulberry32(3700 + n)
  return ROUNDS[Math.floor(rnd() * ROUNDS.length)]
}

// The badge in the picture's corner: the energy's picture and its word.
const BADGE = { x: 430, y: 36, w: 150, h: 156 }
const ENERGY = {
  thermal: { fr: 'thermique', color: WASTED, icon: (cx, cy) => art.squiggles(cx, cy + 34, 3, 24, 2, WASTED, 6) },
  sound: { fr: 'sonore', color: KEY, icon: (cx, cy) => art.noise(cx, cy + 34, KEY, 6) },
  light: {
    fr: 'lumineuse', color: '#b7770e',
    icon: (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="16" fill="#ffd45c" stroke="${INK}" stroke-width="2.5"/>${[0, 45, 90, 135, 180, 225, 270, 315].map((d) => {
      const a = (d * Math.PI) / 180
      return `<line x1="${f1(cx + 24 * Math.cos(a))}" y1="${f1(cy + 24 * Math.sin(a))}" x2="${f1(cx + 40 * Math.cos(a))}" y2="${f1(cy + 40 * Math.sin(a))}" stroke="${GOLD}" stroke-width="5" stroke-linecap="round"/>`
    }).join('')}`,
  },
  kinetic: { fr: 'cinétique', color: BLUE, icon: (cx, cy) => art.arrow(cx - 46, cy, cx + 46, cy, BLUE, 9, 30) },
}

export function UsefulOrWasted({ lang = 'en', isDisplayMode = false }) {
  const [n, setN] = useState(0)
  const [shown, setShown] = useState(false)
  const big = isDisplayMode
  const fr = lang === 'fr'
  const [pic, s, energy, useful, whatEn, whatFr, whyEn, whyFr] = roundAt(n)
  const e = ENERGY[energy]
  const next = () => { setN((v) => v + 1); setShown(false) }

  const card = (x, up) => {
    const right = shown && up === useful
    const fade = shown && up !== useful
    const color = up ? USEFUL : WASTED
    return (
      <g opacity={fade ? 0.3 : 1}>
        <rect x={x} y="140" width="380" height="270" rx="20" fill={right ? (up ? '#eef6e6' : '#fdecee') : '#f7fafc'} stroke={right ? color : RULE} strokeWidth={right ? 6 : 3} />
        <ArmsFigure x={x + 190} y={244} up={up} color={color} s={1} />
        <text x={x + 190} y="342" fontFamily={FONT} fontSize="30" fontWeight="900" fill={color} textAnchor="middle">{up ? t(lang, 'ARMS UP', 'BRAS EN HAUT') : t(lang, 'ARMS DOWN', 'BRAS EN BAS')}</text>
        <text x={x + 190} y="386" fontFamily={FONT} fontSize="30" fontWeight="800" fill={INK} textAnchor="middle">{up ? t(lang, 'useful', 'utile') : t(lang, 'wasted', 'gaspillée')}</text>
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

          {/* the picture, its name, and one energy on the badge */}
          <rect x="20" y="20" width="580" height="436" rx="20" fill="#fbfdff" stroke="#c9d3dc" strokeWidth="3" />
          <text x="44" y="64" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, `Round ${n + 1}`, `Manche ${n + 1}`)}</text>
          <Pic svg={art[pic](250, 290, s)} />
          <rect x={BADGE.x} y={BADGE.y} width={BADGE.w} height={BADGE.h} rx="16" fill="#ffffff" stroke={e.color} strokeWidth="4" />
          <Pic svg={e.icon(BADGE.x + BADGE.w / 2, BADGE.y + 62)} />
          <text x={BADGE.x + BADGE.w / 2} y={BADGE.y + 132} fontFamily={FONT} fontSize="27" fontWeight="900" fill={e.color} textAnchor="middle">{energy}</text>
          {fr && <text x={BADGE.x + BADGE.w / 2} y={BADGE.y + 152} fontFamily={FONT} fontSize="17" fontWeight="700" fill={MUTED} textAnchor="middle">{e.fr}</text>}
          <text x="30" y="506" fontFamily={FONT} fontSize="28" fontWeight="900" fill={INK}>{fr ? whatFr : whatEn}</text>

          {/* the question and the two answers */}
          <text x="660" y="104" fontFamily={FONT} fontSize="32" fontWeight="900" fill={INK}>{t(lang, 'Is it useful or wasted?', 'Est-elle utile ou gaspillée ?')}</text>
          {card(660, true)}
          {card(1080, false)}
          <text x="660" y="462" fontFamily={FONT} fontSize="27" fontWeight="900" fill={shown ? (useful ? GREEN_DARK : WASTED) : MUTED}>
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

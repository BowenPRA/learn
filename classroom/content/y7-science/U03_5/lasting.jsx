// content/y7-science/U03_5/lasting.jsx
// The real things, beside the drawings: two models with photographs and film.
//
//   LastsAYear   six photographs (rice, coal, a battery, a dam, a hot coffee, a
//                bouncing ball). For each one the class shows thumbs up (it
//                keeps its energy for a year) or thumbs down, all at once;
//                then a press on the photo says which, and which store. The
//                four that last are chemical and gravitational potential;
//                the two that do not are thermal and kinetic (pages 108–109).
//   RocketFilm   a NASA launch, 20 seconds, with its sound: how many stores
//                and transfers can you find? Show our list puts up the six.
import { useState } from 'react'
import { RotateCcw, Eye, EyeOff } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { INK, MUTED, FONT, STORE, TRANSFER } from './art.js'
import ricePhoto from './images/rice.jpg'
import coalPhoto from './images/coal.jpg'
import batteryPhoto from './images/battery.jpg'
import damPhoto from './images/dam.jpg'
import coffeePhoto from './images/coffee.jpg'
import ballPhoto from './images/ball.jpg'
import rocketFilm from './images/rocket.webm'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const GREEN_DARK = '#3d731c', RED = '#c8102e'

/* ============================================================= *
 * 1 · LASTS A YEAR? — thumbs up, thumbs down
 * ============================================================= */
const TILES = [
  { src: ricePhoto, name: ['Rice', 'Du riz'], lasts: true, store: ['chemical', 'chimique'], verdict: ['Lasts for years', 'Dure des années'] },
  { src: coalPhoto, name: ['Coal', 'Du charbon'], lasts: true, store: ['chemical', 'chimique'], verdict: ['Lasts millions of years', 'Dure des millions d’années'] },
  { src: batteryPhoto, name: ['Batteries', 'Des piles'], lasts: true, store: ['chemical', 'chimique'], verdict: ['Lasts for years', 'Dure des années'] },
  { src: damPhoto, name: ['Water behind a dam', 'L’eau d’un barrage'], lasts: true, store: ['gravitational potential', 'potentielle de pesanteur'], verdict: ['Lasts while it stays up', 'Dure si l’eau reste en haut'] },
  { src: coffeePhoto, name: ['A hot coffee', 'Un café chaud'], lasts: false, store: ['thermal', 'thermique'], verdict: ['Gone in about an hour', 'Partie en une heure environ'] },
  { src: ballPhoto, name: ['A bouncing ball', 'Une balle qui rebondit'], lasts: false, store: ['kinetic', 'cinétique'], verdict: ['Gone in a few seconds', 'Partie en quelques secondes'] },
]
const TW = 470, TH = 212
const tileX = (i) => 18 + (i % 3) * 494
const tileY = (i) => 12 + Math.floor(i / 3) * 272

export function LastsAYear({ lang = 'en', isDisplayMode = false }) {
  const [open, setOpen] = useState(() => TILES.map(() => false))
  const big = isDisplayMode
  const L = (p) => (lang === 'fr' ? p[1] : p[0])
  const flip = (i) => setOpen((o) => o.map((v, j) => (j === i ? !v : v)))
  const any = open.some(Boolean)

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 560" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="560" rx="16" fill="#ffffff" />
          <defs>
            {TILES.map((_, i) => (
              <clipPath key={i} id={`last-ph${i}`}><rect x={tileX(i)} y={tileY(i)} width={TW} height={TH} rx="14" /></clipPath>
            ))}
          </defs>
          {TILES.map((tile, i) => {
            const x = tileX(i), y = tileY(i)
            const on = open[i]
            const color = tile.lasts ? GREEN_DARK : RED
            return (
              <g key={i} onClick={() => flip(i)} style={{ cursor: 'pointer' }} role="button" aria-label={L(tile.name)}>
                <image href={tile.src} x={x} y={y} width={TW} height={TH} preserveAspectRatio="xMidYMid slice" clipPath={`url(#last-ph${i})`} />
                <rect x={x} y={y} width={TW} height={TH} rx="14" fill="none" stroke={on ? color : '#cbd5e1'} strokeWidth={on ? 6 : 2} />
                {on && (
                  <g>
                    <rect x={x + 3} y={y + TH - 80} width={TW - 6} height="77" rx="10" fill="#ffffff" opacity="0.94" />
                    <circle cx={x + 40} cy={y + TH - 41} r="23" fill={color} />
                    {tile.lasts
                      ? <path d={`M ${x + 29} ${y + TH - 41} l 8 8 l 14 -16`} stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      : <path d={`M ${x + 32} ${y + TH - 49} l 16 16 M ${x + 48} ${y + TH - 49} l -16 16`} stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />}
                    <text x={x + 76} y={y + TH - 47} fontFamily={FONT} fontSize="25" fontWeight="900" fill={color}>{L(tile.verdict)}</text>
                    <text x={x + 76} y={y + TH - 17} fontFamily={FONT} fontSize={L(tile.store).length > 20 ? 19 : 22} fontWeight="800" fill={STORE}>{t(lang, `a ${tile.store[0]} store`, `une réserve ${tile.store[1]}`)}</text>
                  </g>
                )}
                <text x={x + TW / 2} y={y + TH + 36} fontFamily={FONT} fontSize="27" fontWeight="900" fill={INK} textAnchor="middle">{L(tile.name)}</text>
              </g>
            )
          })}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="teal" icon={Eye} disabled={open.every(Boolean)} onClick={() => setOpen(TILES.map(() => true))}>{t(lang, 'Show all', 'Tout montrer')}</Btn>
        <Btn big={big} tone="slate" icon={RotateCcw} disabled={!any} onClick={() => setOpen(TILES.map(() => false))}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

/* ============================================================= *
 * 2 · A ROCKET LAUNCH — how many can you find?
 * ============================================================= */
const FOUND = [
  { name: 'chemical', why: ['the fuel', 'le carburant'], group: STORE },
  { name: 'kinetic', why: ['it moves', 'elle bouge'], group: STORE },
  { name: 'gravitational potential', why: ['it goes up', 'elle monte'], group: STORE },
  { name: 'thermal', why: ['the hot gas', 'le gaz brûlant'], group: STORE },
  { name: 'light', why: ['the flames', 'les flammes'], group: TRANSFER },
  { name: 'sound', why: ['the roar', 'le grondement'], group: TRANSFER },
]

export function RocketFilm({ lang = 'en', isDisplayMode = false }) {
  const [shown, setShown] = useState(false)
  const big = isDisplayMode
  const L = (p) => (lang === 'fr' ? p[1] : p[0])

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full flex gap-4">
        <div className="flex-[1.6] min-w-0 h-full flex items-center justify-center">
          <video
            className="w-full h-full object-contain rounded-xl bg-black"
            src={rocketFilm}
            controls
            playsInline
            preload="auto"
            aria-label={t(lang, 'A NASA rocket launch, with its sound', 'Le lancement d’une fusée de la NASA, avec le son')}
          />
        </div>
        <div className="flex-1 min-w-0 h-full">
          <svg viewBox="0 0 460 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <rect x="0" y="0" width="460" height="520" rx="16" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
            <text x="230" y="52" fontFamily={FONT} fontSize="27" fontWeight="900" fill={INK} textAnchor="middle">{t(lang, 'Our list', 'Notre liste')}</text>
            {FOUND.map((f, i) => {
              const y = 90 + i * 70
              return (
                <g key={f.name}>
                  <rect x="16" y={y} width="428" height="60" rx="12" fill={shown ? '#f7fafc' : '#f4f6f8'} stroke={shown ? f.group : '#d5dbe1'} strokeWidth="2.5" strokeDasharray={shown ? undefined : '8 6'} />
                  <circle cx="46" cy={y + 30} r="16" fill={shown ? f.group : '#d5dbe1'} />
                  <text x="46" y={y + 37} fontFamily={FONT} fontSize="19" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
                  {shown ? (
                    <g>
                      <text x="74" y={y + 28} fontFamily={FONT} fontSize={f.name.length > 12 ? 21 : 24} fontWeight="900" fill={f.group}>{f.name}</text>
                      <text x="74" y={y + 51} fontFamily={FONT} fontSize="19" fontWeight="700" fill={MUTED}>{L(f.why)}</text>
                    </g>
                  ) : (
                    <text x="74" y={y + 39} fontFamily={FONT} fontSize="26" fontWeight="900" fill="#c3c9d1">?</text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="teal" icon={shown ? EyeOff : Eye} onClick={() => setShown((v) => !v)}>{shown ? t(lang, 'Hide our list', 'Cacher notre liste') : t(lang, 'Show our list', 'Voir notre liste')}</Btn>
      </div>
    </div>
  )
}

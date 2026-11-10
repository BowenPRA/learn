// content/y7-science/U03_1/widgets.jsx
// Widgets for 3.1 Gravity, weight and mass. English and French only (the deck
// sets meta.vietnamese: false), so every string goes through t(lang, en, fr).
// Each one does a thing a still slide cannot:
//
//   VacuumClip     The BBC's bowling ball and feathers in NASA's vacuum chamber
//                  (Human Universe, 2014). YouTube only — it is BBC copyright,
//                  so it is never downloaded. Two buttons play exactly the two
//                  drops: 1 with air (82–107 s), 2 with the air pumped out
//                  (158–207 s). The class predicts between them.
//
//   Apollo15Clip   David Scott drops a hammer and a feather on the Moon, 1971.
//   MoonJumpClip   Two Apollo 16 astronauts bounding down a slope, as a silent
//                  loop. Both are public-domain NASA film, trimmed into the
//                  unit so they play on school wifi or none.
//
//   DropRace       The same 5 m drop on the Earth and on the Moon, side by side.
//                  Each lane drops a heavy thing and a light thing together, and
//                  leaves a dot every 0.2 s, so the gaps can be SEEN growing:
//                  1.0 s on Earth, 2.5 s on the Moon. Drop, or Slow motion.
//
//   PlanetScales   Tap a planet: its strength of gravity appears with
//                  "80 × g". The class works out Mr Bowen's weight, then Show.
//                  His mass sits beside it and never changes.
//
//   MassOrWeight   The book's Activity (p.81–82), played from the front: a
//                  sentence with a gap; LEFT hand mass, RIGHT hand weight;
//                  Show fills the gap. A clicker's Right arrow shows, then
//                  moves on. Full-slide `game` layout.
//
// The three stages that are drawings (DropRace, PlanetScales) are one wide SVG
// with a white plate, so their text scales with the panel and reads on a light
// or dark slide; only the buttons are HTML.
import { useState, useEffect, useCallback, useRef } from 'react'
import { Wind, Ban, ArrowDown, Turtle, RotateCcw, Eye, ArrowRight, Shuffle, Sparkles, Hand, Scale } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import apollo15 from './images/apollo15.webm'
import moonjump from './images/moonjump.webm'

const t = (lang, en, fr) => tr(lang, en, null, fr)

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const TEAL = '#0087a8'
const BLUE = '#1a5fa8'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

function Btn({ onClick, disabled, tone = 'teal', icon: Icon, children }) {
  const tones = {
    teal: 'bg-[#0087a8] border-[#00697f]',
    orange: 'bg-[#c25e12] border-[#a04a0e]',
    blue: 'bg-[#1a5fa8] border-[#134a85]',
    slate: 'bg-slate-500 border-slate-700',
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-4 py-2 text-sm lg:px-6 lg:py-2.5 lg:text-base disabled:opacity-35 disabled:pointer-events-none ${tones[tone]}`}
    >
      {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={3} />}
      {children}
    </button>
  )
}

/* ============================================================= *
 * THE FILMS
 * ============================================================= */
// No Stage and no extra frame: `showcase` already wraps the media in a padded
// panel. Each frame is sized from the HEIGHT it is given and centred.
const VACUUM = { id: 'E43-CfukEgs', air: [82, 107], vacuum: [158, 207] }

export function VacuumClip({ lang = 'en' }) {
  const [part, setPart] = useState('air')
  // Counts presses: autoplay only after the first, and a new key on every press
  // so pressing the same segment again replays it from its start.
  const [plays, setPlays] = useState(0)
  const [start, end] = VACUUM[part]
  const src = `https://www.youtube-nocookie.com/embed/${VACUUM.id}?start=${start}&end=${end}&rel=0&modestbranding=1&playsinline=1${plays ? '&autoplay=1' : ''}`
  const play = (p) => { setPart(p); setPlays((n) => n + 1) }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div className="h-full max-w-full rounded-xl overflow-hidden bg-black" style={{ aspectRatio: '16 / 9' }}>
          <iframe
            key={`${part}-${plays}`}
            className="w-full h-full"
            src={src}
            title={t(lang, 'A bowling ball and feathers in a vacuum chamber (BBC)', 'Une boule de bowling et des plumes dans une chambre à vide (BBC)')}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone={part === 'air' ? 'orange' : 'slate'} icon={Wind} onClick={() => play('air')}>{t(lang, '1 · With air', '1 · Avec de l’air')}</Btn>
        <Btn tone={part === 'vacuum' ? 'orange' : 'slate'} icon={Ban} onClick={() => play('vacuum')}>{t(lang, '2 · No air', '2 · Sans air')}</Btn>
      </div>
    </div>
  )
}

function Film({ src, ratio, label, loop = false }) {
  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <div className="h-full max-w-full rounded-xl overflow-hidden bg-black" style={{ aspectRatio: ratio }}>
        <video
          className="w-full h-full object-contain"
          src={src}
          controls
          playsInline
          preload="metadata"
          aria-label={label}
          {...(loop ? { autoPlay: true, muted: true, loop: true } : {})}
        />
      </div>
    </div>
  )
}

export function Apollo15Clip({ lang = 'en' }) {
  return <Film src={apollo15} ratio="654 / 480" label={t(lang, 'A hammer and a feather dropped on the Moon, Apollo 15', 'Un marteau et une plume lâchés sur la Lune, Apollo 15')} />
}

export function MoonJumpClip({ lang = 'en' }) {
  return <Film src={moonjump} ratio="854 / 640" loop label={t(lang, 'Two astronauts bounding on the Moon, Apollo 16', 'Deux astronautes qui bondissent sur la Lune, Apollo 16')} />
}

/* ============================================================= *
 * DROP RACE — the Earth and the Moon, 5 m, side by side
 * ============================================================= */
const DROP_H = 5 // metres
const TOP = 104 // centre of an object at the start
const BOTTOM = 352 // centre of an object on the ground
const PX = (BOTTOM - TOP) / DROP_H
const GROUND = 370
const DOT_EVERY = 0.2
const LANES = [
  { g: 10, x0: 20, en: 'Earth', fr: 'Terre' },
  { g: 1.6, x0: 570, en: 'Moon', fr: 'Lune' },
]
const landTime = (g) => Math.sqrt((2 * DROP_H) / g)
const T_END = landTime(1.6)
const fallen = (g, s) => Math.min(DROP_H, 0.5 * g * s * s)

// The heavy thing and the light thing in each lane.
function Bowling({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r="18" fill="#e2492c" stroke={INK} strokeWidth="2.5" />
      <circle cx={x - 5} cy={y - 7} r="2.6" fill={INK} /><circle cx={x + 4} cy={y - 8} r="2.6" fill={INK} /><circle cx={x} cy={y + 3} r="2.6" fill={INK} />
    </g>
  )
}
function Football({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r="18" fill="#ffffff" stroke={INK} strokeWidth="2.5" />
      <path d={`M ${x} ${y - 7} L ${x + 7} ${y - 2} L ${x + 4} ${y + 6} L ${x - 4} ${y + 6} L ${x - 7} ${y - 2} Z`} fill={INK} />
    </g>
  )
}
function Hammer({ x, y }) {
  return (
    <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round">
      <rect x={x - 4} y={y - 6} width="8" height="26" rx="2" fill="#b98a5a" />
      <rect x={x - 18} y={y - 16} width="36" height="12" rx="3" fill="#9aa5ae" />
    </g>
  )
}
function Feather({ x, y }) {
  return (
    <g stroke={INK} strokeWidth="2" strokeLinejoin="round">
      <path d={`M ${x} ${y - 20} C ${x + 12} ${y - 10} ${x + 10} ${y + 8} ${x} ${y + 18} C ${x - 10} ${y + 8} ${x - 12} ${y - 10} ${x} ${y - 20} Z`} fill="#ffffff" />
      <path d={`M ${x} ${y - 16} L ${x} ${y + 22}`} fill="none" />
    </g>
  )
}

export function DropRace({ lang = 'en' }) {
  const [s, setS] = useState(0) // simulated seconds since the drop
  const [running, setRunning] = useState(false)
  const raf = useRef(0)

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const drop = (rate) => {
    cancelAnimationFrame(raf.current)
    const t0 = performance.now()
    const tick = (now) => {
      const sim = ((now - t0) / 1000) * rate
      if (sim >= T_END) { setS(T_END); setRunning(false); return }
      setS(sim)
      raf.current = requestAnimationFrame(tick)
    }
    setS(0)
    setRunning(true)
    raf.current = requestAnimationFrame(tick)
  }
  const reset = () => { cancelAnimationFrame(raf.current); setRunning(false); setS(0) }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />
          {LANES.map((lane) => {
            const { x0, g } = lane
            const tl = landTime(g)
            const landed = s >= tl
            const y = TOP + fallen(g, s) * PX
            const dots = []
            for (let k = 1; k * DOT_EVERY <= Math.min(s, tl) + 1e-9; k++) dots.push(TOP + fallen(g, k * DOT_EVERY) * PX)
            const shown = Math.min(s, tl)
            const kmh = Math.round(g * tl * 3.6)
            const heavyX = x0 + 150
            const lightX = x0 + 240
            return (
              <g key={lane.en}>
                <rect x={x0} y="16" width="530" height="408" rx="14" fill="#f7fafc" stroke={RULE} strokeWidth="2" />
                <text x={x0 + 24} y="56" fontFamily={FONT} fontSize="30" fontWeight="bold" fill={INK}>{t(lang, lane.en, lane.fr)}</text>
                <text x={x0 + 506} y="56" fontFamily={FONT} fontSize="26" fontWeight="bold" fill={KEY} textAnchor="end">{g} N/kg</text>

                {/* height scale */}
                <line x1={x0 + 56} y1={TOP} x2={x0 + 56} y2={BOTTOM} stroke={MUTED} strokeWidth="2" />
                {[0, 1, 2, 3, 4, 5].map((m) => (
                  <g key={m}>
                    <line x1={x0 + 50} y1={TOP + m * PX} x2={x0 + 62} y2={TOP + m * PX} stroke={MUTED} strokeWidth="2" />
                    <text x={x0 + 44} y={TOP + m * PX + 6} fontFamily={FONT} fontSize="17" fill={MUTED} textAnchor="end">{m} m</text>
                  </g>
                ))}

                {/* ground */}
                <rect x={x0 + 70} y={GROUND} width="440" height="16" fill={g === 10 ? '#d9c7a5' : '#cfd2d6'} />
                <line x1={x0 + 70} y1={GROUND} x2={x0 + 510} y2={GROUND} stroke={INK} strokeWidth="3" />

                {/* a dot every 0.2 s: the gaps grow */}
                {dots.map((dy, i) => <circle key={i} cx={heavyX - 44} cy={dy} r="5" fill={KEY} />)}

                {g === 10 ? <><Bowling x={heavyX} y={y} /><Football x={lightX} y={y} /></> : <><Hammer x={heavyX} y={y} /><Feather x={lightX} y={y} /></>}

                {/* read-out */}
                <text x={x0 + 420} y="150" fontFamily={FONT} fontSize="20" fill={MUTED} textAnchor="middle">{t(lang, 'time', 'temps')}</text>
                <text x={x0 + 420} y="200" fontFamily={FONT} fontSize="46" fontWeight="bold" fill={landed ? KEY : INK} textAnchor="middle">{shown.toFixed(1)} s</text>
                {landed && (
                  <>
                    <text x={x0 + 420} y="252" fontFamily={FONT} fontSize="24" fontWeight="bold" fill={KEY} textAnchor="middle">{t(lang, 'landed!', 'au sol !')}</text>
                    <text x={x0 + 420} y="292" fontFamily={FONT} fontSize="20" fill={MUTED} textAnchor="middle">{t(lang, `at ${kmh} km/h`, `à ${kmh} km/h`)}</text>
                  </>
                )}
                <text x={x0 + 290} y="410" fontFamily={FONT} fontSize="18" fill={MUTED} textAnchor="middle">{t(lang, 'one dot every 0.2 s', 'un point toutes les 0.2 s')}</text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="orange" icon={ArrowDown} disabled={running} onClick={() => drop(1)}>{t(lang, 'Drop', 'Lâcher')}</Btn>
        <Btn tone="teal" icon={Turtle} disabled={running} onClick={() => drop(1 / 3)}>{t(lang, 'Slow motion', 'Ralenti')}</Btn>
        <Btn tone="slate" icon={RotateCcw} disabled={s === 0 && !running} onClick={reset}>{t(lang, 'Reset', 'Remettre')}</Btn>
      </div>
    </div>
  )
}

/* ============================================================= *
 * PLANET SCALES — Mr Bowen's weight across the Solar System
 * ============================================================= */
const MASS = 80
const PLANETS = [
  { en: 'Mercury', fr: 'Mercure', g: 3.7, r: 15, fill: '#b5b5b5' },
  { en: 'Venus', fr: 'Vénus', g: 8.9, r: 23, fill: '#e8c27a' },
  { en: 'Earth', fr: 'Terre', g: 10, r: 24, fill: '#4f8fbf' },
  { en: 'Moon', fr: 'Lune', g: 1.6, r: 11, fill: '#d9d9d9' },
  { en: 'Mars', fr: 'Mars', g: 3.7, r: 17, fill: '#d0643b' },
  { en: 'Jupiter', fr: 'Jupiter', g: 25, r: 44, fill: '#d9a066' },
  { en: 'Saturn', fr: 'Saturne', g: 10, r: 34, fill: '#e6cf8b', ring: true },
  { en: 'Uranus', fr: 'Uranus', g: 8.7, r: 29, fill: '#8fd3e0' },
  { en: 'Neptune', fr: 'Neptune', g: 11, r: 28, fill: '#4a6fd1' },
]
const px = (i) => 70 + i * 122.5
const weightOf = (g) => Math.round(MASS * g)

export function PlanetScales({ lang = 'en' }) {
  const [sel, setSel] = useState(null)
  const [shown, setShown] = useState(false)
  const p = sel === null ? null : PLANETS[sel]
  const pick = (i) => { setSel(i); setShown(false) }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />

          {PLANETS.map((pl, i) => {
            const on = sel === null || sel === i
            const x = px(i)
            return (
              <g key={pl.en} onClick={() => pick(i)} style={{ cursor: 'pointer' }}>
                <rect x={x - 60} y="20" width="120" height="212" rx="14" fill={sel === i ? '#fdf1e3' : '#ffffff'} stroke={sel === i ? KEY : 'none'} strokeWidth="3" />
                {pl.ring && <ellipse cx={x} cy="104" rx="56" ry="11" fill="none" stroke={on ? '#b39b55' : '#d5dbe1'} strokeWidth="4" />}
                <circle cx={x} cy="104" r={pl.r} fill={on ? pl.fill : '#e5e9ed'} stroke={on ? INK : '#cfd5db'} strokeWidth="2" />
                <text x={x} y="186" fontFamily={FONT} fontSize="20" fontWeight="bold" fill={on ? INK : '#b8c1ca'} textAnchor="middle">{t(lang, pl.en, pl.fr)}</text>
                <text x={x} y="214" fontFamily={FONT} fontSize="19" fontWeight="bold" fill={on ? KEY : '#c8d0d7'} textAnchor="middle">{pl.g} N/kg</text>
              </g>
            )
          })}

          {/* mass: the same everywhere */}
          <rect x="40" y="252" width="500" height="172" rx="16" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
          <text x="290" y="298" fontFamily={FONT} fontSize="26" fontWeight="bold" fill={INK} textAnchor="middle">{t(lang, 'Mr Bowen’s mass', 'La masse de M. Bowen')}</text>
          <text x="290" y="374" fontFamily={FONT} fontSize="62" fontWeight="bold" fill={TEAL} textAnchor="middle">{MASS} kg</text>
          <text x="290" y="408" fontFamily={FONT} fontSize="20" fill={MUTED} textAnchor="middle">{t(lang, 'the same on every planet', 'la même sur toutes les planètes')}</text>

          {/* weight: changes with the strength of gravity */}
          <rect x="580" y="252" width="500" height="172" rx="16" fill="#fdf1e3" stroke={KEY} strokeWidth="3" />
          <text x="830" y="298" fontFamily={FONT} fontSize="26" fontWeight="bold" fill={INK} textAnchor="middle">
            {p ? t(lang, `His weight on ${p.en}`, `Son poids sur ${p.fr}`) : t(lang, 'Tap a planet', 'Touche une planète')}
          </text>
          {p && (
            <>
              <text x="830" y="374" fontFamily={FONT} fontSize="62" fontWeight="bold" fill={shown ? KEY : '#c8d0d7'} textAnchor="middle">{shown ? `${weightOf(p.g)} N` : '? N'}</text>
              <text x="830" y="408" fontFamily={FONT} fontSize="20" fill={MUTED} textAnchor="middle">{MASS} × {p.g}</text>
            </>
          )}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="orange" icon={Eye} disabled={!p || shown} onClick={() => setShown(true)}>{t(lang, 'Show weight', 'Voir le poids')}</Btn>
        <Btn tone="slate" icon={RotateCcw} disabled={!p} onClick={() => { setSel(null); setShown(false) }}>{t(lang, 'Clear', 'Effacer')}</Btn>
      </div>
    </div>
  )
}

/* ============================================================= *
 * MASS OR WEIGHT? — the book's Activity as a vote
 * ============================================================= */
// `the: true` when the English sentence needs "The weight of …".
const CARDS = [
  { en: '___ is measured in newtons (N).', fr: '___ se mesure en newtons (N).', weight: true,
    why: 'Weight is a force. Forces are measured in newtons.', whyFr: 'Le poids est une force. Les forces se mesurent en newtons.' },
  { en: '___ is measured in kilograms (kg).', fr: '___ se mesure en kilogrammes (kg).', weight: false,
    why: 'Kilograms measure the amount of matter.', whyFr: 'Les kilogrammes mesurent la quantité de matière.' },
  { en: '___ is the quantity of matter in an object.', fr: '___ est la quantité de matière dans un objet.', weight: false,
    why: 'That is what mass means.', whyFr: 'C’est la définition de la masse.' },
  { en: '___ of an object changes when the strength of gravity changes.', fr: '___ d’un objet change quand la force de gravité change.', weight: true, the: true,
    why: 'On the Moon, your weight is much smaller.', whyFr: 'Sur la Lune, ton poids est bien plus petit.' },
  { en: '___ is not changed by gravity.', fr: '___ ne change pas avec la gravité.', weight: false,
    why: 'Your mass is the same on every planet.', whyFr: 'Ta masse est la même sur toutes les planètes.' },
  { en: '___ of an object gets smaller as it moves away from the Earth.', fr: '___ d’un objet diminue quand il s’éloigne de la Terre.', weight: true, the: true,
    why: 'Gravity is weaker far away.', whyFr: 'La gravité est plus faible loin de la Terre.' },
  { en: '___ can be measured in grams (g).', fr: '___ peut se mesurer en grammes (g).', weight: false,
    why: '1000 g = 1 kg. Grams measure mass too.', whyFr: '1000 g = 1 kg. Les grammes mesurent aussi la masse.' },
  { en: '___ is the force you need to lift an object.', fr: '___ est la force qu’il faut pour soulever un objet.', weight: true,
    why: 'To lift it, you pull against gravity.', whyFr: 'Pour le soulever, tu tires contre la gravité.' },
  { en: '___ equals the contact force when an object rests on a level desk.', fr: '___ est égal à la force de contact quand un objet est posé sur une table.', weight: true,
    why: 'The desk pushes up as hard as gravity pulls down.', whyFr: 'La table pousse vers le haut autant que la gravité tire vers le bas.' },
  { en: '___ is what gives a planet its gravity.', fr: '___ est ce qui donne sa gravité à une planète.', weight: false,
    why: 'Big mass, strong gravity.', whyFr: 'Grande masse, gravité forte.' },
  { en: '___ of Mr Bowen on the Moon is 128 N.', fr: '___ de M. Bowen sur la Lune est de 128 N.', weight: true, the: true,
    why: 'Newtons, so it is a weight. His mass is still 80 kg.', whyFr: 'Des newtons, donc c’est un poids. Sa masse est toujours 80 kg.' },
  { en: '___ of a bag of rice is the same on Mars.', fr: '___ d’un sac de riz est la même sur Mars.', weight: false, the: true,
    why: 'Mass does not change. The rice does not know it is on Mars.', whyFr: 'La masse ne change pas. Le riz ne sait pas qu’il est sur Mars.' },
]

function VoteSide({ side, label, active, big }) {
  const blue = side === 'left'
  return (
    <div className={`flex flex-col items-center justify-center gap-2 rounded-3xl border-4 px-4 py-5 transition-all duration-300 shrink-0 ${active === null ? 'opacity-100' : active ? 'opacity-100 scale-105' : 'opacity-25'} ${blue ? 'border-[#1a5fa8] bg-[#e9f1fa] text-[#1a5fa8]' : 'border-[#c25e12] bg-[#fdf1e3] text-[#c25e12]'}`}>
      <Hand className={`${big ? 'w-[clamp(4rem,11vh,8rem)] h-[clamp(4rem,11vh,8rem)]' : 'w-20 h-20'} ${blue ? '-scale-x-100' : ''}`} strokeWidth={2.2} />
      <div className={`font-black uppercase tracking-wide ${big ? 'text-[clamp(1.2rem,3vh,2.2rem)]' : 'text-xl'}`}>{label}</div>
    </div>
  )
}

// The sentence with its gap, or with the gap filled in once shown.
function Sentence({ text, fill, colour }) {
  const [before, after] = text.split('___')
  return (
    <>
      {before}
      {fill
        ? <span style={{ color: colour }}>{fill}</span>
        : <span className="inline-block align-baseline w-[3.2em] border-b-[6px] border-slate-400 mx-1" />}
      {after}
    </>
  )
}

export function MassOrWeight({ lang = 'en', isDisplayMode = false }) {
  const [order, setOrder] = useState(() => CARDS.map((_, i) => i))
  const [pos, setPos] = useState(0)
  const [shown, setShown] = useState(false)

  const done = pos >= order.length
  const card = done ? null : CARDS[order[pos]]
  const big = isDisplayMode

  const advance = useCallback(() => {
    if (done) return
    if (!shown) { setShown(true); return }
    setShown(false)
    setPos((p) => p + 1)
  }, [done, shown])

  const deal = () => {
    const next = CARDS.map((_, i) => i)
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[next[i], next[j]] = [next[j], next[i]]
    }
    setOrder(next)
    setPos(0)
    setShown(false)
  }

  // A presenter clicker sends arrow keys: first press shows, second moves on.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); advance() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance])

  const verdict = shown ? card.weight : null
  const colour = card?.weight ? KEY : BLUE
  const enFill = card && shown ? (card.weight ? (card.the ? 'The weight' : 'Weight') : (card.the ? 'The mass' : 'Mass')) : null
  const frFill = card && shown ? (card.weight ? 'Le poids' : 'La masse') : null

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-xl text-white bg-[#c25e12] shrink-0">
            <Scale className={big ? 'w-7 h-7' : 'w-5 h-5'} strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className={`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none ${big ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
              {t(lang, 'Mass or Weight?', 'Masse ou poids ?')}
            </div>
            <div className={`font-bold text-slate-400 dark:text-slate-500 truncate ${big ? 'text-base' : 'text-xs'}`}>
              {t(lang, 'Left hand: mass. Right hand: weight. Everyone at once.', 'Main gauche : masse. Main droite : poids. Tous ensemble.')}
            </div>
          </div>
        </div>
        {!done && (
          <div className={`font-black text-slate-400 dark:text-slate-500 tabular-nums shrink-0 ${big ? 'text-2xl' : 'text-base'}`}>
            {pos + 1} / {order.length}
          </div>
        )}
      </div>

      {/* Card */}
      <div className="flex-1 min-h-0 flex items-center justify-center gap-[clamp(1rem,3vw,3rem)] p-4">
        {done ? (
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500 text-white"><Sparkles className="w-12 h-12" strokeWidth={2} /></div>
            <div className={`font-black text-slate-800 dark:text-slate-100 ${big ? 'text-5xl' : 'text-3xl'}`}>{t(lang, 'All 12 done!', 'Les 12 sont faits !')}</div>
          </div>
        ) : (
          <>
            <VoteSide side="left" label={t(lang, 'Mass', 'Masse')} active={verdict === null ? null : !verdict} big={big} />

            <div className="flex flex-col items-center gap-[clamp(0.75rem,3vh,2rem)] min-w-0 flex-1 max-w-[56rem]">
              <div className={`w-full rounded-3xl border-[6px] bg-white flex flex-col items-center justify-center text-center font-black text-[#2b2b2b] leading-snug shadow-sm px-8 py-5 ${verdict === null ? 'border-slate-300' : verdict ? 'border-[#c25e12]' : 'border-[#1a5fa8]'} ${big ? 'min-h-[clamp(11rem,28vh,19rem)] text-[clamp(1.8rem,5.2vh,3.4rem)]' : 'min-h-[10rem] text-3xl'}`}>
                <div><Sentence text={card.en} fill={enFill} colour={colour} /></div>
                {lang === 'fr' && (
                  <div className={`mt-2 font-bold text-slate-500 ${big ? 'text-[clamp(1.1rem,2.8vh,2rem)]' : 'text-lg'}`}>
                    (<Sentence text={card.fr} fill={frFill} colour={colour} />)
                  </div>
                )}
              </div>
              <div className="min-h-[clamp(4rem,11vh,7rem)] flex flex-col items-center justify-center gap-2 text-center">
                {shown ? (
                  <div className={`font-bold text-slate-600 dark:text-slate-300 ${big ? 'text-[clamp(1.1rem,2.6vh,1.9rem)]' : 'text-lg'}`}>
                    {t(lang, card.why, card.whyFr)}
                  </div>
                ) : (
                  <div className={`font-black text-slate-300 dark:text-slate-700 ${big ? 'text-7xl' : 'text-5xl'}`}>?</div>
                )}
              </div>
            </div>

            <VoteSide side="right" label={t(lang, 'Weight', 'Poids')} active={verdict} big={big} />
          </>
        )}
      </div>

      {/* Controls */}
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap px-4 pb-4 pt-2">
        <Btn tone="teal" icon={Shuffle} onClick={deal}>{t(lang, 'Shuffle', 'Mélanger')}</Btn>
        {!done && (
          <Btn tone="orange" icon={shown ? ArrowRight : Eye} onClick={advance}>
            {shown ? t(lang, 'Next', 'Suivant') : t(lang, 'Show', 'Voir')}
          </Btn>
        )}
        {done && (
          <Btn tone="slate" icon={RotateCcw} onClick={() => { setPos(0); setShown(false) }}>{t(lang, 'Start again', 'Recommencer')}</Btn>
        )}
      </div>
    </div>
  )
}


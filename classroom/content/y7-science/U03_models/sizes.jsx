// content/y7-science/U03_models/sizes.jsx
// Two widgets about SIZE, before the class meets the moving model.
//
//   PlanetSizes   The eight planets side by side at their true sizes, with the
//                 edge of the Sun looming on the left. "Add the Sun" zooms out
//                 until the whole Sun fits; "Line up the Earths" lays 109
//                 Earths across it, one after another. Click a planet for how
//                 many Earths fit across it and inside it. The zoom is the
//                 lesson: the class sees the planets shrink to dots.
//
//   ScaleShrink   A stepper (the 2.5 HalvingWidget pattern): the Sun becomes a
//                 football, and one press at a time the Earth, the Moon,
//                 Jupiter, Neptune and the nearest star are shrunk by the SAME
//                 amount. Size and distance, side by side, for each.
import { useState, useRef, useEffect } from 'react'
import { Sun as SunIcon, Circle, Rows3, Undo2, ChevronRight, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { PLANETS, SUN, fmt, fmtSig } from './data.js'
import { Btn } from './ui.jsx'
import { smoother } from './space.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const EARTH_D = 12_756

/* ============================================================= *
 * PLANET SIZES
 * ============================================================= */
const VB_W = 1600, VB_H = 720, MID = 330
const EIGHT = PLANETS.filter((p) => !p.dwarf)

// Two layouts, blended by the zoom:
//   PLANETS  every size to one scale (Jupiter 270 px wide), but the GAPS in
//            screen px, wide enough for each name — sizes are the point here,
//            not distances.
//   SUN      the whole Sun 610 px wide, the planets beside it at the same scale.
const SUN_R = SUN.diameter / 2
const K_PLANETS = 270 / 142_984
const K_SUN = 610 / SUN.diameter
const SUN_EDGE_PLANETS = 70 // px: how much Sun shows on the left
const ROW_PX = (() => {
  let x = SUN_EDGE_PLANETS + 46
  return EIGHT.map((p) => {
    const r = (p.diameter / 2) * K_PLANETS
    const half = Math.max(p.rings ? r * 2.27 : r, 54)
    const cx = x + half
    x += 2 * half + 16
    return cx
  })
})()
const ROW_KM = (() => {
  let x = 22_000
  return EIGHT.map((p) => {
    const half = p.rings ? (p.diameter / 2) * 2.27 : p.diameter / 2
    const cx = x + half
    x += 2 * half + 14_000
    return cx
  })
})()
const SUN_EDGE_SUN = (() => {
  const width = (2 * SUN_R + ROW_KM[ROW_KM.length - 1] + 30_000) * K_SUN
  return (VB_W - width) / 2 + 2 * SUN_R * K_SUN
})()

function PlanetArt({ p, cx, cy, r, id }) {
  if (r < 0.6) return <circle cx={cx} cy={cy} r={0.8} fill={p.light} />
  const ringRx = r * 2.27, ringRy = r * 0.55
  const ringPath = (half) => {
    // half: 'back' is the top half of each ellipse, 'front' the bottom half
    const sweep = half === 'back' ? 1 : 0
    return [1.24, 1.53, 1.95, 2.03, 2.27].map((f) => `M ${cx - r * f} ${cy} A ${r * f} ${r * f * (ringRy / ringRx)} 0 0 ${sweep} ${cx + r * f} ${cy}`)
  }
  return (
    <g>
      <defs>
        <radialGradient id={`lit-${id}`} cx="0.36" cy="0.34" r="0.78">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="0.45" stopColor="#000000" stopOpacity="0" />
          <stop offset="0.85" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.7" />
        </radialGradient>
        <clipPath id={`clip-${id}`}><circle cx={cx} cy={cy} r={r} /></clipPath>
      </defs>
      {p.rings && ringPath('back').map((d, i) => (
        <path key={i} d={d} fill="none" stroke={i === 2 ? 'rgba(0,0,0,0)' : 'rgba(226,204,160,0.75)'} strokeWidth={Math.max(0.6, r * 0.18)} />
      ))}
      <g clipPath={`url(#clip-${id})`}>
        <circle cx={cx} cy={cy} r={r} fill={p.color} />
        {p.bands && r > 4 && p.bands.map((c, i) => (
          <rect key={i} x={cx - r} y={cy - r + (i * 2 * r) / p.bands.length} width={2 * r} height={(2 * r) / p.bands.length + 0.5} fill={c} />
        ))}
        {p.key === 'jupiter' && r > 8 && <ellipse cx={cx + r * 0.3} cy={cy + r * 0.32} rx={r * 0.2} ry={r * 0.11} fill="#b8603d" />}
        {p.key === 'earth' && r > 4 && (
          <>
            <path d={`M ${cx - r * 0.6} ${cy - r * 0.5} q ${r * 0.4} ${-r * 0.3} ${r * 0.7} ${r * 0.05} q ${r * 0.1} ${r * 0.5} ${-r * 0.35} ${r * 0.75} q ${-r * 0.4} ${-r * 0.2} ${-r * 0.35} ${-r * 0.8} z`} fill={p.land} />
            <path d={`M ${cx + r * 0.15} ${cy + r * 0.05} q ${r * 0.45} ${-r * 0.1} ${r * 0.55} ${r * 0.35} q ${-r * 0.1} ${r * 0.45} ${-r * 0.45} ${r * 0.35} q ${-r * 0.2} ${-r * 0.35} ${-r * 0.1} ${-r * 0.7} z`} fill={p.land} />
            <ellipse cx={cx - r * 0.1} cy={cy - r * 0.15} rx={r * 0.55} ry={r * 0.07} fill="#ffffff" opacity="0.75" />
            <ellipse cx={cx + r * 0.25} cy={cy + r * 0.6} rx={r * 0.45} ry={r * 0.06} fill="#ffffff" opacity="0.7" />
          </>
        )}
        {p.key === 'mars' && r > 4 && <ellipse cx={cx} cy={cy - r * 0.88} rx={r * 0.35} ry={r * 0.15} fill="#ffffff" opacity="0.9" />}
        {p.key === 'neptune' && r > 6 && <ellipse cx={cx - r * 0.25} cy={cy + r * 0.2} rx={r * 0.16} ry={r * 0.09} fill="#1b2a6b" />}
        <circle cx={cx} cy={cy} r={r} fill={`url(#lit-${id})`} />
      </g>
      {p.rings && ringPath('front').map((d, i) => (
        <path key={i} d={d} fill="none" stroke={i === 2 ? 'rgba(0,0,0,0)' : 'rgba(236,216,172,0.9)'} strokeWidth={Math.max(0.6, r * 0.18)} />
      ))}
    </g>
  )
}

export function PlanetSizes({ lang = 'en', isDisplayMode = false }) {
  const [mode, setMode] = useState('planets') // 'planets' | 'sun'
  const [z, setZ] = useState(0) // 0 = planets view, 1 = whole Sun
  const [earths, setEarths] = useState(0) // how many of the 109 are laid
  const [pick, setPick] = useState(null)
  const raf = useRef(0)

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const animate = (from, to, ms, set, done) => {
    cancelAnimationFrame(raf.current)
    const t0 = performance.now()
    const tick = (now) => {
      const f = Math.min(1, (now - t0) / ms)
      set(from + (to - from) * f)
      if (f < 1) raf.current = requestAnimationFrame(tick)
      else if (done) done()
    }
    raf.current = requestAnimationFrame(tick)
  }
  const goSun = () => { setMode('sun'); setEarths(0); animate(z, 1, 2600, setZ) }
  const goPlanets = () => { setMode('planets'); setEarths(0); animate(z, 0, 2000, setZ) }
  const layEarths = () => { setEarths(0); animate(0, 109, 4200, (v) => setEarths(Math.floor(v))) }

  // Log-blend the scale so the zoom feels even all the way.
  const e = smoother(z)
  const k = Math.exp(Math.log(K_PLANETS) * (1 - e) + Math.log(K_SUN) * e)
  const edgePx = SUN_EDGE_PLANETS + (SUN_EDGE_SUN - SUN_EDGE_PLANETS) * e
  const X = (km) => edgePx + km * k // for things measured from the Sun's edge
  const sunR = SUN_R * k
  const planetX = (i) => ROW_PX[i] + (X(ROW_KM[i]) - ROW_PX[i]) * e
  const sel = pick ? EIGHT.find((p) => p.key === pick) : null
  const big = isDisplayMode

  const earthR = (EARTH_D / 2) * k
  const earthRow = []
  const step = SUN.diameter / 109 // km: 109 Earths exactly fill the diameter
  for (let i = 0; i < earths; i++) earthRow.push(X(-2 * SUN_R + step * (i + 0.5)))

  return (
    <div className="w-full h-full flex flex-col gap-2 select-none">
      <div className="relative flex-1 min-h-0 w-full rounded-2xl overflow-hidden bg-[#050816]">
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="ps-sun" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#fffbe8" />
              <stop offset="0.6" stopColor="#ffd56b" />
              <stop offset="0.9" stopColor="#ffa133" />
              <stop offset="1" stopColor="#ff8a1c" />
            </radialGradient>
            <radialGradient id="ps-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0.6" stopColor="#ffb347" stopOpacity="0.35" />
              <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width={VB_W} height={VB_H} fill="#050816" />
          {/* the Sun */}
          <circle cx={X(-SUN_R)} cy={MID} r={sunR * 1.18} fill="url(#ps-glow)" />
          <circle cx={X(-SUN_R)} cy={MID} r={sunR} fill="url(#ps-sun)" onClick={() => setPick('sun')} style={{ cursor: 'pointer' }} />
          {/* 109 Earths across it */}
          {earthRow.map((x, i) => (
            <circle key={i} cx={x} cy={MID} r={Math.max(earthR, 1.2)} fill="#3b7dd8" stroke="#9fd0ff" strokeWidth="0.6" />
          ))}
          {earths > 0 && (
            <text x={X(-SUN_R)} y={MID + 46} fontFamily={FONT} fontSize="40" fontWeight="900" fill="#0b1f4a" textAnchor="middle">
              {earths} {t(lang, earths === 1 ? 'Earth' : 'Earths', earths === 1 ? 'Terre' : 'Terres')}
            </text>
          )}
          {/* the planets */}
          {EIGHT.map((p, i) => {
            const x = planetX(i), rr = (p.diameter / 2) * k
            const on = pick === p.key
            const name = t(lang, p.en, p.short || p.fr)
            const labelOpacity = mode === 'sun' ? Math.max(0, 1 - e * 1.6) : 1
            return (
              <g key={p.key} onClick={() => setPick(p.key)} style={{ cursor: 'pointer' }}>
                <rect x={x - Math.max(rr * (p.rings ? 2.27 : 1), 14)} y={MID - Math.max(rr, 14)} width={2 * Math.max(rr * (p.rings ? 2.27 : 1), 14)} height={2 * Math.max(rr, 14)} fill="transparent" />
                <PlanetArt p={p} cx={x} cy={MID} r={rr} id={p.key} />
                {on && <circle cx={x} cy={MID} r={rr + 9} fill="none" stroke="#fbbf24" strokeWidth="4" />}
                <g opacity={labelOpacity}>
                  <line x1={x} y1={MID + Math.max(rr, 6) + 8} x2={x} y2={MID + 196} stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 4" />
                  <text x={x} y={MID + 226} fontFamily={FONT} fontSize="25" fontWeight="800" fill={on ? '#fde68a' : '#f1f5f9'} textAnchor="middle">{name}</text>
                  <text x={x} y={MID + 258} fontFamily={FONT} fontSize="20" fontWeight="600" fill="#94a3b8" textAnchor="middle">{fmt(p.diameter)} km</text>
                </g>
              </g>
            )
          })}
          {mode === 'sun' && e > 0.6 && (
            <text x={planetX(4)} y={MID - 90} fontFamily={FONT} fontSize="26" fontWeight="800" fill="#e2e8f0" textAnchor="middle" opacity={(e - 0.6) / 0.4}>
              {t(lang, 'the eight planets', 'les huit planètes')}
            </text>
          )}
          {mode === 'sun' && e > 0.6 && (
            <line x1={planetX(0) - 6} y1={MID - 70} x2={planetX(7) + 6} y2={MID - 70} stroke="#94a3b8" strokeWidth="2" opacity={(e - 0.6) / 0.4} />
          )}
        </svg>

        {/* what was clicked */}
        {(sel || pick === 'sun') && (
          <div className={`absolute left-1/2 -translate-x-1/2 top-3 rounded-2xl bg-slate-950/85 border border-white/15 text-white text-center shadow-2xl ${big ? 'px-7 py-4' : 'px-5 py-3'}`}>
            {pick === 'sun' ? (
              <>
                <div className={`font-black text-amber-300 ${big ? 'text-3xl' : 'text-2xl'}`}>{t(lang, 'The Sun', 'Le Soleil')} · {fmt(SUN.diameter)} km</div>
                <div className={`font-bold text-slate-200 ${big ? 'text-xl' : 'text-base'}`}>
                  {t(lang, '109 Earths across · about 1.3 million Earths would fit inside', '109 Terres côte à côte · environ 1.3 million de Terres tiendraient dedans')}
                </div>
              </>
            ) : (
              <>
                <div className={`font-black ${big ? 'text-3xl' : 'text-2xl'}`} style={{ color: sel.light }}>{t(lang, sel.en, sel.short || sel.fr)} · {fmt(sel.diameter)} km</div>
                <div className={`font-bold text-slate-200 ${big ? 'text-xl' : 'text-base'}`}>
                  {sel.key === 'earth'
                    ? t(lang, 'Our ruler: everything here is compared with the Earth', 'Notre règle : tout ici est comparé à la Terre')
                    : sel.diameter > EARTH_D
                      ? t(lang,
                        `${fmtSig(sel.diameter / EARTH_D, 3)} Earths across · about ${fmt(sel.volEarth)} Earths would fit inside`,
                        `${fmtSig(sel.diameter / EARTH_D, 3)} Terres côte à côte · environ ${fmt(sel.volEarth)} Terres tiendraient dedans`)
                      : t(lang,
                        `${fmtSig(sel.diameter / EARTH_D, 2)} of the Earth’s width`,
                        `${fmtSig(sel.diameter / EARTH_D, 2)} de la largeur de la Terre`)}
                </div>
              </>
            )}
          </div>
        )}
        {!pick && mode === 'planets' && z < 0.05 && (
          <div className={`absolute top-3 left-1/2 -translate-x-1/2 text-slate-400 font-semibold ${big ? 'text-lg' : 'text-sm'}`}>
            {t(lang, 'Every planet is drawn to the same scale. Click one.', 'Toutes les planètes sont à la même échelle. Clique sur une planète.')}
          </div>
        )}
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="teal" icon={Circle} disabled={mode === 'planets' && z === 0} onClick={goPlanets}>{t(lang, 'The planets', 'Les planètes')}</Btn>
        <Btn big={big} tone="orange" icon={SunIcon} disabled={mode === 'sun'} onClick={goSun}>{t(lang, 'Add the Sun', 'Ajouter le Soleil')}</Btn>
        <Btn big={big} tone="blue" icon={Rows3} disabled={mode !== 'sun' || z < 1} onClick={layEarths}>{t(lang, 'Line up the Earths', 'Aligner des Terres')}</Btn>
      </div>
    </div>
  )
}

/* ============================================================= *
 * SCALE SHRINK — the Sun is a football
 * ============================================================= */
// One factor for everything: the Sun (1 391 400 km) becomes a 22 cm football,
// so every size and every distance is divided by about 6.3 billion.
//   Earth    12 756 km → 2.0 mm        150 million km → 24 m
//   Moon      3 475 km → 0.5 mm        384 400 km from Earth → 6 cm
//   Jupiter 142 984 km → 2.3 cm        778 million km → 123 m
//   Neptune  49 528 km → 7.8 mm        4.5 billion km → 711 m
//   Proxima Centauri (the nearest star), 40 trillion km → 6 400 km
const ROWS = [
  {
    key: 'earth',
    name: ['Earth', 'La Terre'],
    real: ['12 756 km wide', '12 756 km de large'],
    model: ['2 mm', '2 mm'],
    like: ['a pinhead', 'une tête d’épingle'],
    far: ['150 million km', '150 millions de km'],
    farModel: ['24 m', '24 m'],
    farLike: ['nearly a basketball court', 'presque un terrain de basket'],
    icon: 'pin',
  },
  {
    key: 'moon',
    name: ['The Moon', 'La Lune'],
    real: ['3 475 km wide', '3 475 km de large'],
    model: ['0.5 mm', '0.5 mm'],
    like: ['a grain of sand', 'un grain de sable'],
    far: ['384 400 km from the Earth', '384 400 km de la Terre'],
    farModel: ['6 cm', '6 cm'],
    farLike: ['from the pinhead', 'de la tête d’épingle'],
    icon: 'sand',
  },
  {
    key: 'jupiter',
    name: ['Jupiter', 'Jupiter'],
    real: ['142 984 km wide', '142 984 km de large'],
    model: ['2.3 cm', '2.3 cm'],
    like: ['a grape', 'un grain de raisin'],
    far: ['778 million km', '778 millions de km'],
    farModel: ['123 m', '123 m'],
    farLike: ['longer than a football pitch', 'plus long qu’un terrain de foot'],
    icon: 'grape',
  },
  {
    key: 'neptune',
    name: ['Neptune', 'Neptune'],
    real: ['49 528 km wide', '49 528 km de large'],
    model: ['8 mm', '8 mm'],
    like: ['a pea', 'un petit pois'],
    far: ['4.5 billion km', '4.5 milliards de km'],
    farModel: ['711 m', '711 m'],
    farLike: ['a 10-minute walk', '10 minutes à pied'],
    icon: 'pea',
  },
  {
    key: 'star',
    name: ['The nearest star', 'L’étoile la plus proche'],
    sub: ['Proxima Centauri', 'Proxima du Centaure'],
    model: ['3.4 cm', '3.4 cm'],
    like: ['a walnut', 'une noix'],
    far: ['40 trillion km', '40 000 milliards de km'],
    farModel: ['6 400 km', '6 400 km'],
    farLike: ['as far as the centre of the Earth', 'aussi loin que le centre de la Terre'],
    icon: 'star',
  },
]

const INK = '#2b2b2b', KEY = '#c25e12', MUTED = '#5b6770', RULE = '#d5dbe1'

function LikeIcon({ kind, x, y }) {
  switch (kind) {
    case 'pin':
      return (
        <g>
          <line x1={x} y1={y - 2} x2={x + 26} y2={y + 26} stroke="#8a96a3" strokeWidth="3" strokeLinecap="round" />
          <circle cx={x} cy={y - 2} r="5" fill="#1a5fa8" />
        </g>
      )
    case 'sand':
      return <g><circle cx={x} cy={y + 6} r="2.2" fill="#c9a86a" /><circle cx={x + 9} cy={y + 9} r="1.6" fill="#b8955a" /><circle cx={x - 7} cy={y + 10} r="1.4" fill="#d9bb80" /></g>
    case 'grape':
      return <g><circle cx={x} cy={y + 6} r="13" fill="#6d3a8c" /><circle cx={x - 4} cy={y + 1} r="4" fill="#a87cc4" opacity="0.7" /><path d={`M ${x} ${y - 7} q 2 -8 9 -10`} stroke="#4a8b23" strokeWidth="3" fill="none" /></g>
    case 'pea':
      return <g><circle cx={x} cy={y + 6} r="5" fill="#4a8b23" /><circle cx={x - 1.5} cy={y + 4} r="1.6" fill="#a6d77f" /></g>
    case 'star':
      return <path d={`M ${x} ${y - 10} l 4 9 10 1 -8 6 3 10 -9 -6 -9 6 3 -10 -8 -6 10 -1 z`} fill="#e0a21b" stroke="#a86f00" strokeWidth="1.5" />
    default:
      return null
  }
}

export function ScaleShrink({ lang = 'en' }) {
  const [n, setN] = useState(0)
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])
  const colX = { name: 40, model: 300, like: 520, far: 760, farModel: 1060, farLike: 1210 }
  const rowY = (i) => 196 + i * 62
  const done = n >= ROWS.length

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 560" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="560" rx="16" fill="#ffffff" />
          {/* the football Sun */}
          <g>
            <circle cx="92" cy="72" r="44" fill="#ffffff" stroke={INK} strokeWidth="3" />
            <path d="M 92 52 l 17 12 -6 20 -22 0 -6 -20 z" fill={INK} />
            <path d="M 52 60 l 12 -2 6 14 -10 12 -10 -6 z M 132 60 l -12 -2 -6 14 10 12 10 -6 z M 74 106 l 6 -12 24 0 6 12 -18 6 z" fill={INK} />
            <text x="160" y="62" fontFamily={FONT} fontSize="34" fontWeight="900" fill={INK}>{t(lang, 'The Sun is a football: 22 cm', 'Le Soleil est un ballon de foot : 22 cm')}</text>
            <text x="160" y="100" fontFamily={FONT} fontSize="24" fill={MUTED}>{t(lang, 'Everything is shrunk by the same amount: about 6 300 000 000 times.', 'Tout est réduit de la même façon : environ 6 300 000 000 de fois.')}</text>
          </g>
          {/* column heads */}
          <g fontFamily={FONT} fontSize="19" fontWeight="800" fill={MUTED} letterSpacing="1.5">
            <text x={colX.name} y="160">{t(lang, 'OBJECT', 'OBJET')}</text>
            <text x={colX.model} y="160">{t(lang, 'MODEL SIZE', 'TAILLE')}</text>
            <text x={colX.far} y="160">{t(lang, 'REAL DISTANCE', 'VRAIE DISTANCE')}</text>
            <text x={colX.farModel} y="160">{t(lang, 'MODEL DISTANCE', 'DANS LE MODÈLE')}</text>
          </g>
          <line x1="30" y1="172" x2="1470" y2="172" stroke={RULE} strokeWidth="2" />
          {ROWS.map((r, i) => {
            const shown = i < n
            const y = rowY(i)
            return (
              <g key={r.key}>
                <rect x="30" y={y - 26} width="1440" height="56" rx="10" fill={i % 2 ? '#f7fafc' : '#ffffff'} />
                <text x={colX.name} y={r.sub ? y : y + 8} fontFamily={FONT} fontSize="27" fontWeight="800" fill={INK}>{L(r.name)}</text>
                {r.sub && <text x={colX.name} y={y + 24} fontFamily={FONT} fontSize="17" fill={MUTED}>{L(r.sub)}</text>}
                {shown ? (
                  <>
                    {r.model[0] && <text x={colX.model} y={y + 8} fontFamily={FONT} fontSize="30" fontWeight="900" fill={KEY}>{L(r.model)}</text>}
                    {r.like[0] && <LikeIcon kind={r.icon} x={colX.like - 28} y={r.icon === 'star' ? y - 2 : y - 6} />}
                    {r.like[0] && <text x={colX.like} y={y + 8} fontFamily={FONT} fontSize="23" fill={INK}>{L(r.like)}</text>}
                    <text x={colX.far} y={y + 8} fontFamily={FONT} fontSize="23" fill={MUTED}>{L(r.far)}</text>
                    <text x={colX.farModel} y={y + 8} fontFamily={FONT} fontSize="30" fontWeight="900" fill={KEY}>{L(r.farModel)}</text>
                    <text x={colX.farModel} y={y + 30} fontFamily={FONT} fontSize="17" fill={MUTED}>{L(r.farLike)}</text>
                  </>
                ) : (
                  <text x={colX.model} y={y + 8} fontFamily={FONT} fontSize="26" fill="#b4bec8">?</text>
                )}
              </g>
            )
          })}
          {done && (
            <g>
              <rect x="30" y="508" width="1440" height="44" rx="10" fill="#fdf1e3" stroke={KEY} strokeWidth="2" />
              <text x="750" y="538" fontFamily={FONT} fontSize="24" fontWeight="900" fill={KEY} textAnchor="middle">
                {t(lang, 'The Solar System is almost all EMPTY SPACE.', 'Le système solaire est presque entièrement VIDE.')}
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={n === 0} onClick={() => setN((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn tone="orange" icon={ChevronRight} disabled={done} onClick={() => setN((v) => Math.min(ROWS.length, v + 1))}>{t(lang, 'Shrink the next one', 'Réduire le suivant')}</Btn>
        <Btn tone="teal" icon={RotateCcw} disabled={n === 0} onClick={() => setN(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

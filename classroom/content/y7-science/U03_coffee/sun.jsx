// content/y7-science/U03_coffee/sun.jsx
// THE SUN MODEL — the "stars" of Coffee, Carbon and Stars.
//
//   SunModel    HOW OLD IS THE SUN? Nobody can take a piece of it, so
//               scientists build a model Sun from physics and let it age:
//               it burns hydrogen into helium in its core, and slowly grows
//               bigger and brighter. Slide the model's age until it matches
//               what we MEASURE today — its brightness, its size, and the
//               hydrogen left in its core (from the way it vibrates). They all
//               match at one age: about 4.6 billion years, when about half of
//               the core's hydrogen is gone. Then keep going and watch it
//               become a red giant.
//
//               The track is a standard solar model, rounded: brightness 68%
//               and size 87% of today's at the start (Bahcall et al. 2001),
//               core hydrogen 71% → 34% today → 0 at about 10 billion years,
//               then the swelling into a red giant. Good to a few per cent —
//               more than enough for the point.
//
// The shared pieces (fmt, Btn, clamp, lerp) live with the Models deck.
import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { fmt } from '../U03_models/data.js'
import { Btn } from '../U03_models/ui.jsx'
import { clamp, lerp } from '../U03_models/space.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', KEY = '#c25e12', MUTED = '#5b6770', GREEN = '#4a8b23'

// [age in billions of years, brightness (× today), size (× today)]
const TRACK = [
  [0, 0.68, 0.87], [1, 0.72, 0.89], [2, 0.77, 0.91], [3, 0.84, 0.94], [4, 0.94, 0.98],
  [4.57, 1.0, 1.0], [5, 1.04, 1.02], [6, 1.11, 1.05], [7, 1.21, 1.1], [8, 1.34, 1.17],
  [9, 1.52, 1.26], [10, 1.8, 1.4], [10.8, 2.2, 1.75], [11.4, 2.7, 2.6], [11.8, 6, 6], [12, 30, 15],
]
const AGE_MAX = 12
function track(age) {
  for (let i = 1; i < TRACK.length; i++) {
    if (age <= TRACK[i][0]) {
      const [a0, l0, r0] = TRACK[i - 1], [a1, l1, r1] = TRACK[i]
      const f = (age - a0) / (a1 - a0)
      // grow in logs, so the red-giant end swells smoothly
      return { L: Math.exp(lerp(Math.log(l0), Math.log(l1), f)), R: Math.exp(lerp(Math.log(r0), Math.log(r1), f)) }
    }
  }
  return { L: 30, R: 15 }
}
const coreH = (age) => (age >= 10 ? 0 : 0.708 * (1 - Math.pow(age / 10, 0.833)))
const MEASURED = { L: 1, R: 1, H: 0.34 }

function Gauge({ lang, y, label, sub, value, target, max, unit, ok }) {
  const x0 = 640, x1 = 1440
  const px = (v) => x0 + (clamp(v, 0, max) / max) * (x1 - x0)
  return (
    <g>
      <text x={x0} y={y - 22} fontFamily={FONT} fontSize="25" fontWeight="900" fill={INK}>{label}</text>
      <text x={x1} y={y - 22} fontFamily={FONT} fontSize="18" fill={MUTED} textAnchor="end">{sub}</text>
      <rect x={x0} y={y} width={x1 - x0} height="34" rx="10" fill="#eef1f4" />
      <rect x={x0} y={y} width={Math.max(0, px(value) - x0)} height="34" rx="10" fill={ok ? GREEN : KEY} opacity="0.9" />
      <line x1={px(target)} y1={y - 8} x2={px(target)} y2={y + 42} stroke={INK} strokeWidth="3" strokeDasharray="5 4" />
      <text x={px(target)} y={y + 64} fontFamily={FONT} fontSize="16" fontWeight="800" fill={INK} textAnchor="middle">{t(lang, 'measured', 'mesuré')}</text>
      <text x={Math.min(px(value), x1) + (px(value) > x1 - 140 ? -10 : 10)} y={y + 25} fontFamily={FONT} fontSize="21" fontWeight="900"
        fill={px(value) > x1 - 140 ? '#ffffff' : INK} textAnchor={px(value) > x1 - 140 ? 'end' : 'start'}>
        {value > max ? `${fmt(value * 100)}${unit}` : `${Math.round(value * 100)}${unit}`}
      </text>
      {ok && <circle cx={x1 + 30} cy={y + 17} r="15" fill={GREEN} />}
      {ok && <path d={`M ${x1 + 22} ${y + 17} l 6 6 l 11 -12`} stroke="#ffffff" strokeWidth="4" fill="none" />}
    </g>
  )
}

export function SunModel({ lang = 'en', isDisplayMode = false }) {
  const [age, setAge] = useState(0)
  const big = isDisplayMode
  const { L, R } = track(age)
  const H = coreH(age)
  const okL = Math.abs(L - MEASURED.L) < 0.04
  const okR = Math.abs(R - MEASURED.R) < 0.025
  const okH = Math.abs(H - MEASURED.H) < 0.03
  const all = okL && okR && okH
  const giant = age > 10.5

  // the drawn Sun: today's Sun is 120 units across
  const sunR = 60 * R
  const warm = clamp((age - 10.4) / 1.4, 0, 1)
  const core = warm > 0 ? `rgb(255,${Math.round(lerp(236, 150, warm))},${Math.round(lerp(150, 90, warm))})` : '#fff3c4'
  const edge = warm > 0 ? `rgb(${Math.round(lerp(255, 220, warm))},${Math.round(lerp(150, 70, warm))},${Math.round(lerp(40, 40, warm))})` : '#ff9d2a'

  return (
    <div className="w-full h-full flex flex-col gap-2 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 560" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="560" rx="16" fill="#ffffff" />
          {/* the model Sun */}
          <defs>
            <clipPath id="sun-panel"><rect x="30" y="30" width="540" height="420" rx="20" /></clipPath>
            <radialGradient id="sun-body" cx="0.42" cy="0.4" r="0.62">
              <stop offset="0" stopColor="#fffdf0" />
              <stop offset="0.45" stopColor={core} />
              <stop offset="1" stopColor={edge} />
            </radialGradient>
            <radialGradient id="sun-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0.55" stopColor={edge} stopOpacity={clamp(0.25 + 0.2 * Math.log(L + 1), 0, 0.7)} />
              <stop offset="1" stopColor={edge} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="30" y="30" width="540" height="420" rx="20" fill="#070b1a" />
          <g clipPath="url(#sun-panel)">
            <circle cx="300" cy="240" r={sunR * (1.5 + 0.25 * Math.log(L + 1))} fill="url(#sun-glow)" />
            <circle cx="300" cy="240" r={sunR} fill="url(#sun-body)" />
            {/* today's size, for comparison */}
            <circle cx="300" cy="240" r="60" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 6" opacity="0.7" />
          </g>
          <text x="300" y="74" fontFamily={FONT} fontSize="22" fontWeight="800" fill="#e2e8f0" textAnchor="middle" stroke="#070b1a" strokeWidth="5" paintOrder="stroke">
            {t(lang, 'The model Sun', 'Le Soleil du modèle')}
          </text>
          <text x="300" y="430" fontFamily={FONT} fontSize="17" fill="#cbd5e1" textAnchor="middle">
            {t(lang, 'dashed ring = the real Sun today', 'cercle en pointillés = le vrai Soleil aujourd’hui')}
          </text>
          <text x="300" y="498" fontFamily={FONT} fontSize="24" fontWeight="700" fill={MUTED} textAnchor="middle">{t(lang, 'Age of the model', 'Âge du modèle')}</text>
          <text x="300" y="540" fontFamily={FONT} fontSize="36" fontWeight="900" fill={all ? GREEN : KEY} textAnchor="middle">
            {t(lang, `${age.toFixed(1)} billion years`, `${age.toFixed(1)} milliards d’années`)}
          </text>

          <Gauge lang={lang} y={88} label={t(lang, 'Brightness', 'Luminosité')} sub={t(lang, 'measured with telescopes', 'mesurée au télescope')} value={L} target={MEASURED.L} max={2} unit="%" ok={okL} />
          <Gauge lang={lang} y={218} label={t(lang, 'Size', 'Taille')} sub={t(lang, 'measured with telescopes', 'mesurée au télescope')} value={R} target={MEASURED.R} max={2} unit="%" ok={okR} />
          <Gauge lang={lang} y={348} label={t(lang, 'Hydrogen left in the core', 'Hydrogène restant au centre')} sub={t(lang, 'measured from how the Sun vibrates', 'mesuré grâce aux vibrations du Soleil')} value={H} target={MEASURED.H} max={1} unit="%" ok={okH} />

          {all && (
            <g>
              <rect x="640" y="462" width="830" height="78" rx="14" fill="#eef6e6" stroke={GREEN} strokeWidth="3" />
              <text x="1055" y="494" fontFamily={FONT} fontSize="25" fontWeight="900" fill="#3d731c" textAnchor="middle">
                {t(lang, 'The model matches the real Sun!', 'Le modèle correspond au vrai Soleil !')}
              </text>
              <text x="1055" y="526" fontFamily={FONT} fontSize="20" fill="#3d731c" textAnchor="middle">
                {t(lang, 'Core hydrogen: 71% at birth, 34% now. About half is gone.', 'Hydrogène au centre : 71 % au début, 34 % maintenant. Environ la moitié est partie.')}
              </text>
            </g>
          )}
          {giant && (
            <g>
              <rect x="640" y="462" width="830" height="78" rx="14" fill="#fdecee" stroke="#c8102e" strokeWidth="3" />
              <text x="1055" y="494" fontFamily={FONT} fontSize="25" fontWeight="900" fill="#c8102e" textAnchor="middle">
                {t(lang, 'No hydrogen left in the core: a RED GIANT', 'Plus d’hydrogène au centre : une GÉANTE ROUGE')}
              </text>
              <text x="1055" y="526" fontFamily={FONT} fontSize="20" fill="#c8102e" textAnchor="middle">
                {t(lang, 'This happens about 5 billion years from now.', 'Cela arrivera dans environ 5 milliards d’années.')}
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center gap-4 px-4">
        <span className={`font-black text-slate-500 dark:text-slate-400 whitespace-nowrap ${big ? 'text-lg' : 'text-sm'}`}>{t(lang, 'Born', 'Naissance')}</span>
        <input
          type="range" min="0" max={AGE_MAX} step="0.05" value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          aria-label={t(lang, 'Age of the model Sun', 'Âge du Soleil du modèle')}
          className="flex-1 h-3 accent-[#c25e12] cursor-pointer"
        />
        <span className={`font-black text-slate-500 dark:text-slate-400 whitespace-nowrap ${big ? 'text-lg' : 'text-sm'}`}>{t(lang, '12 billion years', '12 milliards d’années')}</span>
        <Btn big={big} tone="slate" icon={RotateCcw} onClick={() => setAge(0)}>{t(lang, 'Reset', 'Remettre')}</Btn>
      </div>
    </div>
  )
}

// content/y7-science/U03_earth/earthyear.jsx
// EARTH'S HISTORY IN ONE YEAR — the closing scale model of How Old Is the Earth?
//
//   EarthYear   Earth's history squeezed into ONE YEAR: the Earth forms just
//               after midnight on 1 January, and now is midnight on
//               31 December. Step through the events; the view zooms into
//               December, into the last day, into the last minute. A whole
//               human life is the last half-second.
//
// The shared pieces (fmt, Btn, clamp, lerp, smoother) live with the Models deck.
import { useState, useRef, useEffect } from 'react'
import { ChevronRight, Undo2, RotateCcw, CheckCircle2 } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { fmt } from '../U03_models/data.js'
import { Btn } from '../U03_models/ui.jsx'
import { clamp, lerp, smoother } from '../U03_models/space.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', MUTED = '#5b6770', RULE = '#d5dbe1', TEAL = '#0087a8'

/* ============================================================= *
 * EARTH'S HISTORY IN ONE YEAR
 * ============================================================= */
const EARTH_AGE = 4.54e9
const YEAR_S = 365 * 86400
// `ago` in years. Dates follow from ago / 4.54 billion of a 365-day year.
const EVENTS = [
  { ago: 4.54e9, en: 'The Earth forms', fr: 'La Terre se forme', color: '#8a5a3c' },
  { ago: 4.5e9, en: 'The Moon forms (a giant crash)', fr: 'La Lune se forme (une collision géante)', color: '#8a8f99' },
  { ago: 4.4e9, en: 'The oldest crystal we have found', fr: 'Le plus vieux cristal trouvé', color: '#b5835a' },
  { ago: 4.03e9, en: 'The oldest rocks', fr: 'Les plus vieilles roches', color: '#7a6a58' },
  { ago: 3.5e9, en: 'First life: tiny cells', fr: 'Premières vies : de minuscules cellules', color: '#4a8b23' },
  { ago: 2.4e9, en: 'Oxygen fills the air', fr: 'L’oxygène remplit l’air', color: '#0087a8' },
  { ago: 5.75e8, en: 'The first animals', fr: 'Les premiers animaux', color: '#5c2483' },
  { ago: 4.7e8, en: 'The first land plants', fr: 'Les premières plantes terrestres', color: '#3d731c' },
  { ago: 2.3e8, en: 'The first dinosaurs', fr: 'Les premiers dinosaures', color: '#c25e12' },
  { ago: 6.6e7, en: 'The dinosaurs die out', fr: 'Les dinosaures disparaissent', color: '#c8102e' },
  { ago: 3.0e5, en: 'The first humans', fr: 'Les premiers humains', color: '#1a5fa8' },
  { ago: 5300, en: 'Ötzi the Iceman', fr: 'Ötzi, l’homme des glaces', color: '#5b6770' },
  { ago: 4580, en: 'The Great Pyramid', fr: 'La Grande Pyramide', color: '#c9a227' },
  { ago: 80, en: 'A whole human life (80 years)', fr: 'Une vie humaine entière (80 ans)', color: '#c25e12' },
]
const fracOf = (ago) => 1 - ago / EARTH_AGE
const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  fr: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
  enLong: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  frLong: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
}
const MONTH_START = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365]

/** "25 March", "31 December, 11:25 p.m.", "31 December, 11:59:23 p.m." */
function calendarText(f, lang) {
  const day = f * 365
  let m = 0
  while (m < 11 && day >= MONTH_START[m + 1]) m++
  const d = Math.floor(day - MONTH_START[m]) + 1
  const monthName = lang === 'fr' ? MONTHS.frLong[m] : MONTHS.enLong[m]
  const dateTxt = lang === 'fr' ? `${d} ${monthName}` : `${d} ${monthName}`
  const secLeft = (1 - f) * YEAR_S
  if (secLeft < 3600) {
    if (secLeft < 2) return lang === 'fr' ? `31 décembre\u00a0: la dernière ${secLeft.toFixed(1)} seconde` : `31 December: the last ${secLeft.toFixed(1)} seconds`
    const s = Math.round(60 - secLeft % 60)
    const mm = 59 - Math.floor(secLeft / 60)
    return lang === 'fr' ? `31 décembre, 23 h ${mm} min ${s % 60} s` : `31 December, 11:${String(mm).padStart(2, '0')}:${String(s % 60).padStart(2, '0')} p.m.`
  }
  if (day >= 364) {
    const hours = (day - 364) * 24
    const h = Math.floor(hours), mi = Math.floor((hours - h) * 60)
    return lang === 'fr' ? `31 décembre, ${h} h ${String(mi).padStart(2, '0')}` : `31 December, ${((h + 11) % 12) + 1}:${String(mi).padStart(2, '0')} ${h < 12 ? 'a.m.' : 'p.m.'}`
  }
  return dateTxt
}

// Windows on the year: [start, end] as fractions, and how to tick them.
const WINDOWS = {
  year: { a: 0, b: 1 },
  dec: { a: 334 / 365, b: 1 },
  day: { a: 364 / 365, b: 1 },
  minute: { a: 1 - 60 / YEAR_S, b: 1 },
}
const windowFor = (ev) => {
  const f = fracOf(ev.ago)
  if (f < 334 / 365) return 'year'
  if (f < 364 / 365) return 'dec'
  if (f < 1 - 60 / YEAR_S) return 'day'
  return 'minute'
}

export function EarthYear({ lang = 'en', isDisplayMode = false }) {
  const [i, setI] = useState(0)
  const [win, setWin] = useState({ a: 0, b: 1 })
  const winRef = useRef({ a: 0, b: 1 })
  const raf = useRef(0)
  const big = isDisplayMode
  const ev = EVENTS[i]
  const want = windowFor(ev)

  // zoom smoothly (in log of the window width, so each zoom feels the same)
  useEffect(() => {
    const from = { ...winRef.current }
    const to = WINDOWS[want]
    if (from.a === to.a && from.b === to.b) return undefined
    const t0 = performance.now()
    const dur = 1600
    const tick = (now) => {
      const f = smoother(Math.min(1, (now - t0) / dur))
      const w = Math.exp(lerp(Math.log(from.b - from.a), Math.log(to.b - to.a), f))
      const next = { a: 1 - w, b: 1 }
      winRef.current = next
      setWin(next)
      if (f < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [want])

  const X0 = 70, X1 = 1430, BAR_Y = 240
  const width = win.b - win.a
  const xOf = (f) => X0 + ((f - win.a) / width) * (X1 - X0)
  const shown = EVENTS.slice(0, i + 1)
  const L = (e) => (lang === 'fr' ? e.fr : e.en)

  // ticks for the current zoom
  const ticks = []
  if (width > 0.5) {
    for (let m = 0; m < 12; m++) ticks.push({ f: MONTH_START[m] / 365, label: lang === 'fr' ? MONTHS.fr[m] : MONTHS.en[m], mid: (MONTH_START[m] + MONTH_START[m + 1]) / 730 })
  } else if (width > 2 / 365) {
    for (let d = 334; d < 365; d++) {
      const day = d - 333
      ticks.push({ f: d / 365, label: day === 1 || day % 5 === 0 ? String(day) : '', mid: (d + 0.5) / 365 })
    }
  } else if (width > 2 * 3600 / YEAR_S) {
    for (let h = 0; h < 24; h += 2) ticks.push({ f: (364 + h / 24) / 365, label: lang === 'fr' ? `${h} h` : `${((h + 11) % 12) + 1} ${h < 12 ? 'a.m.' : 'p.m.'}` })
  } else {
    for (let s = 0; s < 60; s += 10) ticks.push({ f: 1 - (60 - s) / YEAR_S, label: lang === 'fr' ? `23 h 59 min ${s} s` : `11:59:${String(s).padStart(2, '0')}` })
  }
  const zoomLabel = {
    year: t(lang, 'The whole year', 'Toute l’année'),
    dec: t(lang, 'Zoomed in: December', 'Zoom : décembre'),
    day: t(lang, 'Zoomed in: 31 December', 'Zoom : 31 décembre'),
    minute: t(lang, 'Zoomed in: the last minute of the year', 'Zoom : la dernière minute de l’année'),
  }[want]

  return (
    <div className="w-full h-full flex flex-col gap-2 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 470" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="470" rx="16" fill="#ffffff" />
          <text x="70" y="62" fontFamily={FONT} fontSize="24" fontWeight="800" fill={MUTED}>
            {t(lang, '4.5 billion years = 1 year', '4.5 milliards d’années = 1 an')}
          </text>
          <text x="1430" y="62" fontFamily={FONT} fontSize="24" fontWeight="800" fill={TEAL} textAnchor="end">{zoomLabel}</text>

          {/* the event card */}
          <rect x="70" y="86" width="1360" height="110" rx="18" fill="#f7fafc" stroke={ev.color} strokeWidth="3" />
          <circle cx="122" cy="141" r="22" fill={ev.color} />
          <text x="122" y="149" fontFamily={FONT} fontSize="22" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
          <text x="164" y="134" fontFamily={FONT} fontSize="40" fontWeight="900" fill={INK}>{calendarText(fracOf(ev.ago), lang)}</text>
          <text x="164" y="180" fontFamily={FONT} fontSize="30" fontWeight="800" fill={ev.color}>{L(ev)}</text>
          <text x="1404" y="176" fontFamily={FONT} fontSize="22" fill={MUTED} textAnchor="end">
            {ev.ago >= 1e9
              ? t(lang, `${(ev.ago / 1e9).toFixed(2).replace(/0$/, '')} billion years ago`, `il y a ${(ev.ago / 1e9).toFixed(2).replace(/0$/, '')} milliards d’années`)
              : ev.ago >= 1e6
                ? t(lang, `${fmt(ev.ago / 1e6)} million years ago`, `il y a ${fmt(ev.ago / 1e6)} millions d’années`)
                : t(lang, `${fmt(ev.ago)} years ago`, `il y a ${fmt(ev.ago)} ans`)}
          </text>

          {/* the bar of time */}
          <defs>
            <clipPath id="ey-clip"><rect x={X0} y={BAR_Y - 70} width={X1 - X0} height="320" /></clipPath>
            <linearGradient id="ey-bar" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#e9d8c4" />
              <stop offset="1" stopColor="#d6e9f2" />
            </linearGradient>
          </defs>
          <rect x={X0} y={BAR_Y} width={X1 - X0} height="50" rx="10" fill="url(#ey-bar)" stroke={RULE} strokeWidth="2" />
          <g clipPath="url(#ey-clip)">
            {ticks.map((tk, k) => (
              <g key={k}>
                <line x1={xOf(tk.f)} y1={BAR_Y} x2={xOf(tk.f)} y2={BAR_Y + 50} stroke="#ffffff" strokeWidth="2" />
                {tk.label && (
                  <text x={tk.mid != null ? xOf(tk.mid) : xOf(tk.f) + 4} y={BAR_Y + 33} fontFamily={FONT} fontSize="20" fontWeight="700" fill={MUTED} textAnchor={tk.mid != null ? 'middle' : 'start'}>{tk.label}</text>
                )}
              </g>
            ))}
            {shown.map((e, k) => {
              const f = fracOf(e.ago)
              const x = xOf(f)
              if (x < X0 - 2) return null // earlier than this zoom shows
              const on = k === i
              const level = k % 3
              const y2 = BAR_Y + 84 + level * 52
              return (
                <g key={k} opacity={on ? 1 : 0.55}>
                  <line x1={x} y1={BAR_Y - 10} x2={x} y2={y2 - 18} stroke={e.color} strokeWidth={on ? 4 : 2} />
                  <circle cx={x} cy={BAR_Y + 25} r={on ? 13 : 9} fill={e.color} stroke="#ffffff" strokeWidth="3" />
                  <text x={clamp(x, X0 + 8, X1 - 8)} y={y2} fontFamily={FONT} fontSize={on ? 25 : 20} fontWeight={on ? 900 : 700} fill={e.color}
                    textAnchor={x > X1 - 200 ? 'end' : x < X0 + 200 ? 'start' : 'middle'}>{L(e)}</text>
                </g>
              )
            })}
          </g>
          <text x={X0} y={BAR_Y - 18} fontFamily={FONT} fontSize="17" fontWeight="800" fill={MUTED}>
            {want === 'year' ? t(lang, '1 January', '1er janvier') : ''}
          </text>
          <text x={X1} y={BAR_Y - 18} fontFamily={FONT} fontSize="17" fontWeight="800" fill={MUTED} textAnchor="end">{t(lang, 'midnight: NOW', 'minuit : MAINTENANT')}</text>
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={i === 0} onClick={() => setI((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={i === EVENTS.length - 1} onClick={() => setI((v) => Math.min(EVENTS.length - 1, v + 1))}>{t(lang, 'Next event', 'Événement suivant')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={i === 0} onClick={() => setI(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
        {i === EVENTS.length - 1 && (
          <span className={`inline-flex items-center gap-2 font-black text-[#c25e12] ${big ? 'text-xl' : 'text-base'}`}>
            <CheckCircle2 className="w-6 h-6" />{t(lang, 'All of written history fits in the last 40 seconds.', 'Toute l’histoire écrite tient dans les 40 dernières secondes.')}
          </span>
        )}
      </div>
    </div>
  )
}

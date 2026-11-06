// content/y7-science/U03_tidelab/results.jsx
// The class's own data: the River Tide Lab's results, typed in by Mr Bowen and
// kept in this browser (lab.js), and the graph drawn from them.
//
//   TideTable  the results table, the same shape as the one the class draws
//              (TABLE_BLANK): days across, the four times down, the unit in
//              the heading. Every cell is a box to type a reading in cm; it
//              saves at once. Today's column is lit up. A cell that is not a
//              number turns red and stays off the graph. Enter or Esc leaves
//              the box, so the arrow keys move the deck again. Copy table puts
//              it on the clipboard for a spreadsheet; Clear all needs a second
//              press within four seconds.
//   TideGraph  the same readings as a line graph: a band for each school day
//              (a gap at each weekend), four dots a day joined left to right,
//              no line overnight (nobody measured it). The scale starts at
//              0 cm, like the pole, and grows to fit the highest reading.
//
// Both read the store when the slide opens and again if another tab changes it.
import { useState, useEffect } from 'react'
import { Copy, Check, Trash2 } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { DAYS, TIMES, TOTAL, STORE, loadReadings, saveReadings, cm, badCell, todayIso } from './lab.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', KEY = '#c25e12', MUTED = '#5b6770', RULE = '#a7b6bd', TEAL_TINT = '#e2f2f6', BLUE = '#1a5fa8'
const TODAY = '#fdf1e3', BAD = '#c8102e'

function useReadings() {
  const [cells, setCells] = useState(loadReadings)
  useEffect(() => {
    const onStorage = (e) => { if (e.key === STORE) setCells(loadReadings()) }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
  return [cells, setCells]
}

const countReadings = (cells) => DAYS.reduce((n, d) => n + cells[d.iso].filter((v) => cm(v) !== null).length, 0)

/* ============================================================= *
 * 1 · THE RESULTS TABLE
 * ============================================================= */
export function TideTable({ lang = 'en', isDisplayMode = false }) {
  const [cells, setCells] = useReadings()
  const [saved, setSaved] = useState(true)
  const [armed, setArmed] = useState(false)
  const [copied, setCopied] = useState(false)
  const big = isDisplayMode
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])
  const today = todayIso()
  const count = countReadings(cells)
  const anyBad = DAYS.some((d) => cells[d.iso].some(badCell))

  useEffect(() => {
    if (!armed) return undefined
    const id = setTimeout(() => setArmed(false), 4000)
    return () => clearTimeout(id)
  }, [armed])
  useEffect(() => {
    if (!copied) return undefined
    const id = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(id)
  }, [copied])

  const edit = (iso, i, text) => {
    const next = { ...cells, [iso]: cells[iso].map((v, k) => (k === i ? text : v)) }
    setCells(next)
    setSaved(saveReadings(next))
  }
  const clearAll = () => {
    if (!armed) { setArmed(true); return }
    const next = Object.fromEntries(DAYS.map((d) => [d.iso, TIMES.map(() => '')]))
    setCells(next)
    setSaved(saveReadings(next))
    setArmed(false)
  }
  const copy = async () => {
    const rows = [
      [t(lang, 'Time', 'Heure'), ...DAYS.map((d) => `${L(d.day)} ${L(d.date)}`)],
      ...TIMES.map((tm, i) => [L(tm), ...DAYS.map((d) => cells[d.iso][i].trim())]),
    ]
    const text = `${t(lang, 'Water level (cm)', 'Niveau de l’eau (cm)')}\n${rows.map((r) => r.join('\t')).join('\n')}\n`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch { /* no clipboard on this page */ }
  }
  // Enter or Esc leaves the box. The blur waits a tick, so the deck's own key
  // handler still sees the box focused and does not turn the slide.
  const leave = (e) => {
    if (e.key !== 'Enter' && e.key !== 'Escape') return
    e.preventDefault()
    const box = e.currentTarget
    setTimeout(() => box.blur(), 0)
  }

  const fs = big
    ? { head: 'clamp(1rem, 1.5vw, 1.8rem)', day: 'clamp(0.85rem, 1.25vw, 1.5rem)', time: 'clamp(1.05rem, 1.65vw, 2rem)', cell: 'clamp(1.4rem, 2.4vw, 2.9rem)', foot: 'clamp(0.95rem, 1.25vw, 1.4rem)' }
    : { head: 'clamp(0.85rem, 1.1vw, 1.2rem)', day: 'clamp(0.7rem, 0.9vw, 0.95rem)', time: 'clamp(0.85rem, 1.15vw, 1.2rem)', cell: 'clamp(0.95rem, 1.4vw, 1.45rem)', foot: 'clamp(0.8rem, 0.95vw, 1rem)' }
  const line = `2px solid ${RULE}`
  const weekLine = `4px solid ${INK}`

  return (
    <div className="w-full h-full flex flex-col gap-2 select-none" style={{ fontFamily: FONT }}>
      <div className="flex-1 min-h-0 w-full rounded-2xl bg-white p-2 sm:p-3 border border-slate-200 overflow-hidden" style={{ color: INK }}>
        <table className="w-full h-full table-fixed" style={{ borderCollapse: 'collapse', border: `3px solid ${INK}` }}>
          <colgroup>
            <col style={{ width: '10%' }} />
            {DAYS.map((d) => <col key={d.iso} />)}
          </colgroup>
          <thead>
            <tr style={{ background: TEAL_TINT }}>
              <th rowSpan={2} style={{ border: line, fontSize: fs.time, fontWeight: 900 }}>{t(lang, 'Time', 'Heure')}</th>
              <th colSpan={DAYS.length} style={{ border: line, fontSize: fs.head, fontWeight: 900, padding: '0.2em' }}>
                {t(lang, 'Water level (cm)', 'Niveau de l’eau (cm)')}
              </th>
            </tr>
            <tr style={{ background: TEAL_TINT }}>
              {DAYS.map((d, i) => {
                const isToday = d.iso === today
                return (
                  <th key={d.iso} style={{
                    border: line, borderLeft: i > 0 && d.week !== DAYS[i - 1].week ? weekLine : line,
                    background: isToday ? KEY : undefined, color: isToday ? '#ffffff' : INK,
                    fontSize: fs.day, lineHeight: 1.15, padding: '0.25em 0.1em',
                  }}>
                    <div style={{ fontWeight: 900 }}>{L(d.day)}</div>
                    <div style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{L(d.date)}</div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {TIMES.map((tm, i) => (
              <tr key={tm[0]}>
                <th style={{ border: line, background: TEAL_TINT, fontSize: fs.time, fontWeight: 900, whiteSpace: 'nowrap' }}>{L(tm)}</th>
                {DAYS.map((d, k) => {
                  const v = cells[d.iso][i]
                  const bad = badCell(v)
                  return (
                    <td key={d.iso} style={{
                      border: line, borderLeft: k > 0 && d.week !== DAYS[k - 1].week ? weekLine : line,
                      background: d.iso === today ? TODAY : '#ffffff', padding: 0,
                    }}>
                      <input
                        type="text"
                        inputMode="decimal"
                        autoComplete="off"
                        spellCheck={false}
                        value={v}
                        maxLength={6}
                        onChange={(e) => edit(d.iso, i, e.target.value)}
                        onKeyDown={leave}
                        aria-label={`${L(d.day)} ${L(d.date)}, ${L(tm)}`}
                        className="w-full h-full bg-transparent text-center rounded-md focus:outline-none focus:ring-4 focus:ring-amber-400"
                        style={{ fontSize: fs.cell, fontWeight: 800, color: bad ? BAD : INK, minHeight: '1.6em', fontVariantNumeric: 'tabular-nums' }}
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="shrink-0 flex items-center justify-between gap-3 flex-wrap">
        <span className={saved ? 'text-slate-600 dark:text-slate-300' : 'text-rose-600 dark:text-rose-400'} style={{ fontSize: fs.foot, fontWeight: 700 }}>
          {saved
            ? t(lang, `Saved on this computer · ${count} of ${TOTAL} readings`, `Enregistré sur cet ordinateur · ${count} mesures sur ${TOTAL}`)
            : t(lang, 'Not saved: this browser blocks storage', 'Non enregistré : ce navigateur bloque le stockage')}
          {anyBad && <span style={{ color: BAD }}>{t(lang, ' · red = not a number', ' · rouge = pas un nombre')}</span>}
        </span>
        <div className="flex items-center gap-3 flex-wrap">
          <Btn big={big} tone="teal" icon={copied ? Check : Copy} disabled={count === 0} onClick={copy}>
            {copied ? t(lang, 'Copied', 'Copié') : t(lang, 'Copy table', 'Copier le tableau')}
          </Btn>
          <Btn big={big} tone={armed ? 'orange' : 'slate'} icon={Trash2} disabled={count === 0 && !anyBad} onClick={clearAll}>
            {armed ? t(lang, 'Sure? Press again', 'Sûr ? Appuie encore') : t(lang, 'Clear all', 'Tout effacer')}
          </Btn>
        </div>
      </div>
    </div>
  )
}

/* ============================================================= *
 * 2 · THE GRAPH
 * ============================================================= */
const G = { w: 1200, h: 456, x0: 112, x1: 1180, top: 76, bottom: 372, gap: 20 }
const BAND = (G.x1 - G.x0 - 2 * G.gap) / DAYS.length
const bandX = (i) => G.x0 + i * BAND + DAYS[i].week * G.gap
const SLOTS = [0.16, 0.39, 0.61, 0.84]
const slotX = (i, k) => bandX(i) + SLOTS[k] * BAND

// The top of the scale and its step: about five to seven lines, never less than
// 100 cm (so an empty graph does not pretend to a scale of its own).
function scaleFor(max) {
  const want = Math.max(max * 1.08, 100)
  for (const step of [10, 20, 25, 50, 100, 200, 500]) {
    const n = Math.ceil(want / step)
    if (n <= 7) return { top: n * step, step }
  }
  return { top: Math.ceil(want / 1000) * 1000, step: 1000 }
}

export function TideGraph({ lang = 'en' }) {
  const [cells] = useReadings()
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])
  const today = todayIso()
  const vals = DAYS.map((d) => cells[d.iso].map(cm))
  const all = vals.flat().filter((v) => v !== null)
  const { top, step } = scaleFor(all.length ? Math.max(...all) : 0)
  const y = (v) => G.bottom - (v / top) * (G.bottom - G.top)
  const grid = []
  for (let v = 0; v <= top + 1e-9; v += step) grid.push(v)

  return (
    <div className="w-full h-full select-none">
      <svg viewBox={`0 0 ${G.w} ${G.h}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet" style={{ fontFamily: FONT }}>
        <rect x="0" y="0" width={G.w} height={G.h} rx="16" fill="#ffffff" />

        {/* today's band */}
        {DAYS.map((d, i) => d.iso === today && (
          <g key={d.iso}>
            <rect x={bandX(i)} y={G.top - 30} width={BAND} height={G.bottom - G.top + 30} fill={TODAY} />
            <text x={bandX(i) + BAND / 2} y={G.top - 10} fontSize="19" fontWeight="800" fill={KEY} textAnchor="middle">{t(lang, 'today', 'aujourd’hui')}</text>
          </g>
        ))}

        {/* the scale */}
        {grid.map((v) => (
          <g key={v}>
            <line x1={G.x0} y1={y(v)} x2={G.x1} y2={y(v)} stroke={v ? '#e8ecf0' : INK} strokeWidth={v ? 1.5 : 2.5} />
            <text x={G.x0 - 12} y={y(v) + 7} fontSize="20" fill={MUTED} textAnchor="end">{v}</text>
          </g>
        ))}
        <line x1={G.x0} y1={G.bottom} x2={G.x0} y2={G.top - 6} stroke={INK} strokeWidth="2.5" />
        <text x="20" y="40" fontSize="21" fontWeight="700" fill={MUTED}>{t(lang, 'water level (cm)', 'niveau de l’eau (cm)')}</text>
        <text x={G.x1} y="40" fontSize="20" fill={MUTED} textAnchor="end">
          {t(lang, 'Each day, left to right: 8:30, 10:30, 12:30, 2:30', 'Chaque jour, de gauche à droite : 8 h 30, 10 h 30, 12 h 30, 14 h 30')}
        </text>

        {/* the days */}
        {DAYS.map((d, i) => (
          <g key={d.iso}>
            <line x1={bandX(i)} y1={G.bottom} x2={bandX(i)} y2={G.top - 6} stroke="#eef1f4" strokeWidth="1.5" />
            <line x1={bandX(i) + BAND} y1={G.bottom} x2={bandX(i) + BAND} y2={G.top - 6} stroke="#eef1f4" strokeWidth="1.5" />
            <text x={bandX(i) + BAND / 2} y={G.bottom + 30} fontSize="20" fontWeight="800" fill={d.iso === today ? KEY : INK} textAnchor="middle">{L(d.day)}</text>
            <text x={bandX(i) + BAND / 2} y={G.bottom + 56} fontSize="19" fill={d.iso === today ? KEY : MUTED} textAnchor="middle">{L(d.date)}</text>
          </g>
        ))}

        {/* the readings: joined within a day, never across a night */}
        {vals.map((row, i) => (
          <g key={DAYS[i].iso}>
            {row.slice(1).map((v, k) => (v !== null && row[k] !== null) && (
              <line key={k} x1={slotX(i, k)} y1={y(row[k])} x2={slotX(i, k + 1)} y2={y(v)} stroke={BLUE} strokeWidth="4" strokeLinecap="round" />
            ))}
            {row.map((v, k) => v !== null && (
              <circle key={k} cx={slotX(i, k)} cy={y(v)} r="7.5" fill={KEY} stroke="#ffffff" strokeWidth="2.5" />
            ))}
          </g>
        ))}

        {all.length === 0 && (
          <text x={(G.x0 + G.x1) / 2} y={(G.top + G.bottom) / 2} fontSize="30" fontWeight="800" fill={RULE} textAnchor="middle">
            {t(lang, 'No readings yet: type them into the table.', 'Pas encore de mesures : écris-les dans le tableau.')}
          </text>
        )}
      </svg>
    </div>
  )
}

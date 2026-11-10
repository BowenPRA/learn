// content/y7-math/U06_1/survey.jsx
// OUR CLASS SURVEY — the class's own data, one question of each kind (Our
// Squares in 5.3 and Our Trials in Coffee, Carbon and Stars are the model).
//
//   1  How do you come to school?          categorical: a word
//   2  How many brothers and sisters?      discrete: you count it
//   3  What is your hand span?             continuous: you measure it, so
//                                          it goes in equal groups
//
// Mr Bowen reads out each answer; hands go up; he taps a row of the table (or
// its bar) once for each hand. The tally and the frequency fill in, and the
// bar chart grows beside them. "What kind of data?" stays hidden until he taps
// it, so the class says it first. The continuous chart has no gaps between its
// bars and numbers on the boundaries, as a grouped chart should.
//
// Anonymous: only counts are kept. The taps are kept in this browser for 12
// hours, so leaving the slide and coming back loses nothing; Clear all empties
// all three questions.
import { useState, useEffect } from 'react'
import { Undo2, Trash2 } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../../y7-science/U03_models/ui.jsx'
import { KINDS } from './kinds.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', MUTED = '#5b6770', RULE = '#d5dbe1', KEY = '#c25e12'

const STORE = 'classroom:y7-math:U06_1:survey'
const KEEP_MS = 12 * 60 * 60 * 1000

const QUESTIONS = [
  {
    q: ['How do you come to school?', 'Comment viens-tu à l’école ?'],
    kind: 'word', name: ['Categorical data', 'Données catégorielles'],
    opts: [['Walk', 'À pied'], ['Bicycle', 'Vélo'], ['Motorbike', 'Moto'], ['Car', 'Voiture'], ['School bus', 'Bus scolaire'], ['Other', 'Autre']],
  },
  {
    q: ['How many brothers and sisters do you have?', 'Combien de frères et sœurs as-tu ?'],
    kind: 'count', name: ['Discrete data', 'Données discrètes'],
    opts: [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'], ['4 or more', '4 ou plus']],
  },
  {
    q: ['What is your hand span, in cm?', 'Quel est ton empan, en cm ?'],
    kind: 'measure', name: ['Continuous data', 'Données continues'], grouped: true,
    opts: [['under 15.0', 'moins de 15.0'], ['15.0–15.9', '15.0–15.9'], ['16.0–16.9', '16.0–16.9'], ['17.0–17.9', '17.0–17.9'],
      ['18.0–18.9', '18.0–18.9'], ['19.0–19.9', '19.0–19.9'], ['20.0 or more', '20.0 ou plus']],
    edges: ['15', '16', '17', '18', '19', '20'],
  },
]

const EMPTY = () => [[], [], []]
function load() {
  try {
    const raw = JSON.parse(window.localStorage.getItem(STORE) || 'null')
    if (raw && Array.isArray(raw.taps) && raw.taps.length === 3 && Date.now() - raw.at < KEEP_MS) return raw.taps
  } catch { /* storage blocked or empty */ }
  return EMPTY()
}

// Tally marks for n, in gates of five, from (x, y), 30 tall.
function Tally({ x, y, n, color }) {
  const marks = []
  for (let g = 0; g * 5 < n; g++) {
    const gx = x + g * 42
    const inGate = Math.min(5, n - g * 5)
    for (let i = 0; i < Math.min(4, inGate); i++) {
      marks.push(<line key={`${g}-${i}`} x1={gx + i * 8} y1={y} x2={gx + i * 8} y2={y + 30} stroke={color} strokeWidth="3.5" strokeLinecap="round" />)
    }
    if (inGate === 5) marks.push(<line key={`${g}-x`} x1={gx - 5} y1={y + 25} x2={gx + 29} y2={y + 5} stroke={color} strokeWidth="3.5" strokeLinecap="round" />)
  }
  return <g>{marks}</g>
}

export function OurSurvey({ lang = 'en', isDisplayMode = false }) {
  const [taps, setTaps] = useState(load)
  const [qi, setQi] = useState(0)
  const [named, setNamed] = useState([false, false, false])
  const big = isDisplayMode
  useEffect(() => {
    try { window.localStorage.setItem(STORE, JSON.stringify({ taps, at: Date.now() })) } catch { /* best effort */ }
  }, [taps])

  const Q = QUESTIONS[qi]
  const kind = KINDS[Q.kind]
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])
  const n = Q.opts.length
  const counts = Q.opts.map((_, i) => taps[qi].filter((v) => v === i).length)
  const total = taps[qi].length
  const top = Math.max(...counts)
  const most = top > 0 ? Q.opts.filter((_, i) => counts[i] === top).map(L).join(t(lang, ' and ', ' et ')) : null
  const add = (i) => setTaps((ts) => ts.map((list, j) => (j === qi ? [...list, i] : list)))

  // the table, left
  const ROW0 = 200
  const ROW_H = n > 6 ? 46 : 52
  // the chart, right
  const C = { x0: 750, x1: 1470, y0: 466, y1: 190 }
  const step = top <= 5 ? 1 : top <= 14 ? 2 : 5
  const yMax = Math.max(5, Math.ceil((top + step / 2) / step) * step) // headroom for the number on the tallest bar
  const cy = (v) => C.y0 - (v / yMax) * (C.y0 - C.y1)
  const slot = (C.x1 - C.x0) / n
  const barW = Q.grouped ? slot : slot * 0.64

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 560" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="560" rx="16" fill="#ffffff" />

          {/* the question, and what kind of data it gives (tap to show) */}
          <text x="40" y="60" fontFamily={FONT} fontSize="38" fontWeight="900" fill={INK}>{qi + 1}. {L(Q.q)}</text>
          <g role="button" style={{ cursor: 'pointer' }} onClick={() => setNamed((v) => v.map((x, j) => (j === qi ? !x : x)))}>
            <rect x="40" y="84" width="600" height="50" rx="25" fill={named[qi] ? kind.color : '#ffffff'} stroke={named[qi] ? kind.color : MUTED} strokeWidth="2.5" strokeDasharray={named[qi] ? undefined : '8 6'} />
            <text x="340" y="118" fontFamily={FONT} fontSize="26" fontWeight="900" fill={named[qi] ? '#ffffff' : MUTED} textAnchor="middle">
              {named[qi] ? `${L(Q.name)} · ${t(lang, kind.en, kind.fr)}` : t(lang, 'What kind of data? Tap to check.', 'Quel genre de données ? Touche ici.')}
            </text>
          </g>
          <text x="1460" y="60" fontFamily={FONT} fontSize="30" fontWeight="900" fill={INK} textAnchor="end">
            {t(lang, `Total: ${total}`, `Total\u00a0: ${total}`)}
          </text>

          {/* the frequency table; tap a row once for each hand */}
          <rect x="40" y="150" width="626" height="50" fill={kind.color} />
          <text x="54" y="185" fontFamily={FONT} fontSize="24" fontWeight="900" fill="#ffffff">{Q.grouped ? t(lang, 'Hand span (cm)', 'Empan (cm)') : t(lang, 'Answer', 'Réponse')}</text>
          <text x="252" y="185" fontFamily={FONT} fontSize="24" fontWeight="900" fill="#ffffff">{t(lang, 'Tally', 'Bâtons')}</text>
          <text x="595" y="185" fontFamily={FONT} fontSize="24" fontWeight="900" fill="#ffffff" textAnchor="middle">{t(lang, 'Frequency', 'Effectif')}</text>
          {Q.opts.map((o, i) => {
            const y = ROW0 + i * ROW_H
            return (
              <g key={i} role="button" style={{ cursor: 'pointer' }} onClick={() => add(i)}>
                <rect x="40" y={y} width="626" height={ROW_H} fill={i % 2 ? '#f7f9fb' : '#ffffff'} stroke={RULE} strokeWidth="1.5" />
                <text x="54" y={y + ROW_H / 2 + 10} fontFamily={FONT} fontSize={L(o).length > 10 ? 23 : 28} fontWeight="800" fill={INK}>{L(o)}</text>
                <Tally x={258} y={y + ROW_H / 2 - 15} n={counts[i]} color={kind.color} />
                <text x="595" y={y + ROW_H / 2 + 11} fontFamily={FONT} fontSize="32" fontWeight="900" fill={counts[i] ? INK : RULE} textAnchor="middle">{counts[i]}</text>
              </g>
            )
          })}
          <line x1="236" y1="150" x2="236" y2={ROW0 + n * ROW_H} stroke={RULE} strokeWidth="1.5" />
          <line x1="524" y1="150" x2="524" y2={ROW0 + n * ROW_H} stroke={RULE} strokeWidth="1.5" />

          {/* the bar chart */}
          {Array.from({ length: yMax / step + 1 }, (_, i) => i * step).map((v) => (
            <g key={v}>
              <line x1={C.x0} y1={cy(v)} x2={C.x1} y2={cy(v)} stroke={v === 0 ? INK : '#edf0f3'} strokeWidth={v === 0 ? 2.5 : 1.5} />
              <text x={C.x0 - 10} y={cy(v) + 8} fontFamily={FONT} fontSize="22" fill={MUTED} textAnchor="end">{v}</text>
            </g>
          ))}
          <line x1={C.x0} y1={C.y0} x2={C.x0} y2={C.y1 - 10} stroke={INK} strokeWidth="2.5" />
          <text x={C.x0 - 30} y={C.y1 - 22} fontFamily={FONT} fontSize="22" fontWeight="800" fill={MUTED}>{t(lang, 'frequency', 'effectif')}</text>
          {Q.opts.map((o, i) => {
            const cx = C.x0 + slot * (i + 0.5)
            return (
              <g key={i} role="button" style={{ cursor: 'pointer' }} onClick={() => add(i)}>
                <rect x={cx - slot / 2} y={C.y1 - 10} width={slot} height={C.y0 - C.y1 + 10} fill="#ffffff" fillOpacity="0" />
                {counts[i] > 0 && (
                  <g>
                    <rect x={cx - barW / 2} y={cy(counts[i])} width={barW} height={C.y0 - cy(counts[i])} fill={kind.color} stroke="#ffffff" strokeWidth={Q.grouped ? 2 : 0} />
                    <text x={cx} y={cy(counts[i]) - 9} fontFamily={FONT} fontSize="26" fontWeight="900" fill={kind.color} textAnchor="middle">{counts[i]}</text>
                  </g>
                )}
                {!Q.grouped && (L(o).length > 9 && L(o).includes(' ')
                  ? [L(o).slice(0, L(o).indexOf(' ')), L(o).slice(L(o).indexOf(' ') + 1)]
                  : [L(o)]
                ).map((line, j) => (
                  <text key={j} x={cx} y={C.y0 + 32 + j * 26} fontFamily={FONT} fontSize={n > 5 ? 23 : 26} fontWeight="800" fill={INK} textAnchor="middle">{line}</text>
                ))}
              </g>
            )
          })}
          {Q.grouped && Q.edges.map((e, i) => (
            <text key={e} x={C.x0 + slot * (i + 1)} y={C.y0 + 32} fontFamily={FONT} fontSize="26" fontWeight="800" fill={INK} textAnchor="middle">{e}</text>
          ))}
          {Q.grouped && <text x={C.x1} y={C.y0 + 72} fontFamily={FONT} fontSize="22" fontWeight="800" fill={MUTED} textAnchor="end">{t(lang, 'hand span (cm)', 'empan (cm)')}</text>}
          {most && (
            <text x={C.x1} y="122" fontFamily={FONT} fontSize="28" fontWeight="900" fill={KEY} textAnchor="end">
              {t(lang, 'Most common: ', 'Le plus fréquent : ')}{most}
            </text>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        {QUESTIONS.map((_, i) => (
          <Btn key={i} big={big} tone={i === qi ? 'orange' : 'blue'} onClick={() => setQi(i)}>{t(lang, `Question ${i + 1}`, `Question ${i + 1}`)}</Btn>
        ))}
        <Btn big={big} tone="slate" icon={Undo2} disabled={total === 0} onClick={() => setTaps((ts) => ts.map((list, j) => (j === qi ? list.slice(0, -1) : list)))}>{t(lang, 'Undo', 'Annuler')}</Btn>
        <Btn big={big} tone="slate" icon={Trash2} disabled={taps.every((l) => l.length === 0)} onClick={() => { setTaps(EMPTY()); setNamed([false, false, false]) }}>{t(lang, 'Clear all', 'Tout effacer')}</Btn>
      </div>
    </div>
  )
}

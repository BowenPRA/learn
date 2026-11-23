// content/y7-science/U05_2/opposites.jsx
// OPPOSITES — the stepper the class says first. The table on page 158, built
// one row a press: the metal side is on the screen, the class says the
// non-metal side out loud, and the press shows it.
//
//   at room temperature   most are solid        many are gases
//   look                  shiny                 dull
//   hit it                do not shatter        brittle
//   heat                  conduct heat well     do not conduct heat well
//   electricity           conduct electricity   most do not conduct it
//   then: metals only — malleable, ductile, sonorous (the book's last three
//   rows, which have nothing opposite them).
// Wording is the book's table in shorter words; the key words came in 5.1.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { INK, KEY, MUTED, TEAL, RULE, FONT, copper, sulfur } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />
const GOLD_DARK = '#8a6a00'

// [label], [metals], [non-metals], each [English, French]
const ROWS = [
  { label: ['At room temperature', 'À température ambiante'], metal: ['most are solid', 'la plupart sont solides'], non: ['many are gases', 'beaucoup sont des gaz'] },
  { label: ['Look', 'Aspect'], metal: ['shiny', 'brillants'], non: ['dull', 'ternes'] },
  { label: ['Hit it', 'Un coup'], metal: ['do not shatter', 'ne se brisent pas'], non: ['brittle', 'cassants'] },
  { label: ['Heat', 'Chaleur'], metal: ['conduct heat well', 'conduisent bien la chaleur'], non: ['do not conduct heat well', 'conduisent mal la chaleur'] },
  { label: ['Electricity', 'Électricité'], metal: ['conduct electricity', 'conduisent l’électricité'], non: ['most do not conduct it', 'la plupart ne la conduisent pas'] },
]
const LAST = ROWS.length

// columns: the row's name, metals, non-metals
const X_LABEL = 84
const M = { x: 410, w: 520 }
const N = { x: 950, w: 530 }
const ROW_Y = (i) => 146 + i * 66 // the top of each row

export function Opposites({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0) // rows 0..k-1 show the non-metal side
  const big = isDisplayMode
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />

          {/* the two columns' heads */}
          <rect x={M.x} y="14" width={M.w} height="112" rx="14" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
          <rect x={N.x} y="14" width={N.w} height="112" rx="14" fill="#fdf6dc" stroke="#b08a12" strokeWidth="3" />
          <Pic svg={copper(M.x + 110, 70, 0.62, { shiny: true })} />
          <Pic svg={sulfur(N.x + 110, 74, 0.7)} />
          <text x={M.x + 220} y="84" fontFamily={FONT} fontSize="38" fontWeight="900" fill={TEAL}>{t(lang, 'Metals', 'Métaux')}</text>
          <text x={N.x + 220} y="84" fontFamily={FONT} fontSize="38" fontWeight="900" fill={GOLD_DARK}>{t(lang, 'Non-metals', 'Non-métaux')}</text>
          <text x="30" y="62" fontFamily={FONT} fontSize="27" fontWeight="900" fill={k === LAST ? KEY : MUTED}>
            {k === LAST ? t(lang, 'Five rows,', 'Cinq lignes,') : t(lang, 'Say the non-metal', 'Dis le côté')}
          </text>
          <text x="30" y="98" fontFamily={FONT} fontSize="27" fontWeight="900" fill={k === LAST ? KEY : MUTED}>
            {k === LAST ? t(lang, 'five opposites.', 'cinq contraires.') : t(lang, 'side, then press.', 'non-métal, puis clique.')}
          </text>

          {/* one row per property */}
          {ROWS.map((row, i) => {
            const y = ROW_Y(i)
            const done = i < k
            const now = i === k
            return (
              <g key={i}>
                <circle cx="52" cy={y + 27} r="21" fill={done ? TEAL : now ? KEY : RULE} />
                <text x="52" y={y + 36} fontFamily={FONT} fontSize="25" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
                <text x={X_LABEL} y={y + 37} fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{L(row.label)}</text>
                <rect x={M.x} y={y} width={M.w} height="54" rx="12" fill="#f4fafc" stroke={TEAL} strokeWidth="2.5" />
                <text x={M.x + M.w / 2} y={y + 37} fontFamily={FONT} fontSize="29" fontWeight="900" fill={INK} textAnchor="middle">{L(row.metal)}</text>
                <rect x={N.x} y={y} width={N.w} height="54" rx="12"
                  fill={done ? '#fdf6dc' : '#ffffff'} stroke={done ? '#b08a12' : now ? KEY : RULE}
                  strokeWidth={now ? 3.5 : 2.5} strokeDasharray={done ? undefined : '9 7'} />
                <text x={N.x + N.w / 2} y={y + 37} fontFamily={FONT} fontSize={done ? 29 : 32} fontWeight="900"
                  fill={done ? INK : now ? KEY : RULE} textAnchor="middle">{done ? L(row.non) : '?'}</text>
              </g>
            )
          })}

          {/* the rows with nothing opposite them */}
          {k === LAST && (
            <text x="750" y="506" fontFamily={FONT} fontSize="29" fontWeight="900" fill={TEAL} textAnchor="middle">
              {t(lang, 'Metals only: malleable, ductile, sonorous.', 'Seulement les métaux : malléables, ductiles, sonores.')}
            </text>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>{t(lang, 'Show it', 'Montre')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

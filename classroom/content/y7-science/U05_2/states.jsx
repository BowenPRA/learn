// content/y7-science/U05_2/states.jsx
// SOLID, LIQUID OR GAS? — a model predicted per press. Six elements with
// their melting and boiling points. The next one asks "?"; the class says
// solid, liquid or gas for a room at 25 °C, and the press shows it on the
// ladder: colder than the melting point, a solid; between the two, a liquid;
// hotter than the boiling point, a gas. The ladder is in order, not to scale.
//
//   iron      metal      1538 °C   2862 °C   solid
//   oxygen    non-metal  −218 °C   −183 °C   gas
//   mercury   metal      −39 °C    357 °C    LIQUID  (the metal that is not solid)
//   sulfur    non-metal  115 °C    445 °C    solid
//   chlorine  non-metal  −101 °C   −34 °C    gas
//   bromine   non-metal  −7 °C     59 °C     LIQUID  (the non-metal that is a liquid)
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { INK, KEY, MUTED, TEAL, BLUE, RED, RULE, FONT } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const GOLD_DARK = '#8a6a00'
const ROOM = 25

const ELEMENTS = [
  { name: ['iron', 'le fer'], metal: true, mp: 1538, bp: 2862 },
  { name: ['oxygen', 'l’oxygène'], metal: false, mp: -218, bp: -183 },
  { name: ['mercury', 'le mercure'], metal: true, mp: -39, bp: 357 },
  { name: ['sulfur', 'le soufre'], metal: false, mp: 115, bp: 445 },
  { name: ['chlorine', 'le chlore'], metal: false, mp: -101, bp: -34 },
  { name: ['bromine', 'le brome'], metal: false, mp: -7, bp: 59 },
]
const LAST = ELEMENTS.length
const STATE = (e) => (ROOM < e.mp ? 'solid' : ROOM < e.bp ? 'liquid' : 'gas')
const WORD = { solid: ['solid', 'solide'], liquid: ['liquid', 'liquide'], gas: ['gas', 'gaz'] }
const FILL = { solid: '#dde3ea', liquid: '#cfe8f7', gas: '#f1f5f9' }
const deg = (n) => `${n < 0 ? '−' : ''}${Math.abs(n)} °C`

// the table, on the left
const COL = { name: 40, mp: 455, bp: 625, state: 800 }
const rowY = (i) => 74 + i * 73
// the ladder, on the right: three zones, top to bottom
const BAR = { x: 1180, w: 150 }
const ZONES = [['gas', 92], ['liquid', 212], ['solid', 332]] // [state, top]
const ZONE_H = 120

export function SolidLiquidGas({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0) // elements 0..k-1 are answered
  const big = isDisplayMode
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])
  const last = k > 0 ? ELEMENTS[k - 1] : null
  const lastState = last ? STATE(last) : null

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />

          {/* the table */}
          <text x={COL.name} y="52" fontFamily={FONT} fontSize="26" fontWeight="900" fill={MUTED}>{t(lang, 'Element', 'Élément')}</text>
          <text x={COL.mp} y="52" fontFamily={FONT} fontSize="26" fontWeight="900" fill={MUTED} textAnchor="middle">{t(lang, 'Melts at', 'Fond à')}</text>
          <text x={COL.bp} y="52" fontFamily={FONT} fontSize="26" fontWeight="900" fill={MUTED} textAnchor="middle">{t(lang, 'Boils at', 'Bout à')}</text>
          <text x={COL.state} y="52" fontFamily={FONT} fontSize="26" fontWeight="900" fill={MUTED} textAnchor="middle">{t(lang, 'At 25 °C?', 'À 25 °C ?')}</text>
          {ELEMENTS.map((e, i) => {
            const y = rowY(i)
            const done = i < k
            const now = i === k
            const st = STATE(e)
            return (
              <g key={i}>
                <rect x="20" y={y} width="880" height="64" rx="12" fill={now ? '#e9f1fa' : done ? '#f7fafc' : '#ffffff'} stroke={now ? BLUE : RULE} strokeWidth={now ? 3 : 1.5} />
                <text x={COL.name} y={y + 29} fontFamily={FONT} fontSize="28" fontWeight="900" fill={INK}>{L(e.name)}</text>
                <text x={COL.name} y={y + 58} fontFamily={FONT} fontSize="24" fontWeight="800" fill={e.metal ? TEAL : GOLD_DARK}>{e.metal ? t(lang, 'metal', 'métal') : t(lang, 'non-metal', 'non-métal')}</text>
                <text x={COL.mp} y={y + 42} fontFamily={FONT} fontSize="29" fontWeight="900" fill={INK} textAnchor="middle">{deg(e.mp)}</text>
                <text x={COL.bp} y={y + 42} fontFamily={FONT} fontSize="29" fontWeight="900" fill={INK} textAnchor="middle">{deg(e.bp)}</text>
                <rect x={COL.state - 76} y={y + 12} width="152" height="40" rx="20" fill={done ? FILL[st] : '#ffffff'} stroke={done ? INK : now ? BLUE : RULE} strokeWidth="2.5" />
                <text x={COL.state} y={y + 41} fontFamily={FONT} fontSize="26" fontWeight="900" fill={done ? INK : now ? BLUE : RULE} textAnchor="middle">{done ? L(WORD[st]) : '?'}</text>
              </g>
            )
          })}

          {/* the ladder: hotter at the top */}
          <text x={BAR.x + BAR.w / 2} y="74" fontFamily={FONT} fontSize="24" fontWeight="900" fill={RED} textAnchor="middle">{t(lang, 'hotter', 'plus chaud')}</text>
          <text x={BAR.x + BAR.w / 2} y="482" fontFamily={FONT} fontSize="24" fontWeight="900" fill={BLUE} textAnchor="middle">{t(lang, 'colder', 'plus froid')}</text>
          {ZONES.map(([st, top]) => (
            <g key={st}>
              <rect x={BAR.x} y={top} width={BAR.w} height={ZONE_H} fill={FILL[st]} stroke={INK} strokeWidth={lastState === st ? 5 : 3} />
              <text x={BAR.x + BAR.w / 2} y={top + 70} fontFamily={FONT} fontSize="30" fontWeight="900" fill={lastState === st ? INK : MUTED} textAnchor="middle">{L(WORD[st])}</text>
            </g>
          ))}
          {/* the two boundaries */}
          <text x={BAR.x - 14} y="221" fontFamily={FONT} fontSize="24" fontWeight="900" fill={KEY} textAnchor="end">{last ? `${t(lang, 'boils at', 'bout à')} ${deg(last.bp)}` : t(lang, 'boiling point', 'point d’ébullition')}</text>
          <text x={BAR.x - 14} y="341" fontFamily={FONT} fontSize="24" fontWeight="900" fill={KEY} textAnchor="end">{last ? `${t(lang, 'melts at', 'fond à')} ${deg(last.mp)}` : t(lang, 'melting point', 'point de fusion')}</text>
          {/* this room, in its zone */}
          {last && (() => {
            const y = ZONES.find(([st]) => st === lastState)[1] + ZONE_H / 2
            return (
              <g>
                <path d={`M ${BAR.x + BAR.w + 8} ${y} l 22 -16 v 10 h 46 v 12 h -46 v 10 z`} fill={RED} />
                <text x={BAR.x + BAR.w + 82} y={y + 9} fontFamily={FONT} fontSize="26" fontWeight="900" fill={RED}>25 °C</text>
                <text x={BAR.x + BAR.w / 2} y="40" fontFamily={FONT} fontSize="28" fontWeight="900" fill={INK} textAnchor="middle">{L(last.name)}</text>
              </g>
            )
          })()}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>{t(lang, 'Show the answer', 'Voir la réponse')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

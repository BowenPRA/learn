// content/y7-science/U05_2/circuit.jsx
// MR BOWEN'S TEST CIRCUIT — a model predicted per press. The circuit of page
// 159 (cell, lamp, two crocodile clips, a gap), and eight things from a desk.
// The next thing is highlighted in the list; the class says "on" or "off" out
// loud, and the press puts it in the gap and lights the lamp, or not.
//
//   1 a paper clip     on        5 aluminium foil      on
//   2 an eraser        off       6 a pencil (the wood) off
//   3 a coin           on        7 a key               on
//   4 a plastic ruler  off       8 pencil lead         ON  (the trap)
//
// The pattern says "off" for 8, and so does the pencil. Pencil lead is
// graphite, a non-metal that conducts: the next slide's vote.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { INK, KEY, MUTED, BLUE, RULE, FONT, GOLD, circuit, GAP, paperClip, eraser, coin, ruler, foilStrip, pencil, key, pencilLead } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

const THINGS = [
  { name: ['a paper clip', 'un trombone'], draw: paperClip, on: true },
  { name: ['an eraser', 'une gomme'], draw: eraser, on: false },
  { name: ['a coin', 'une pièce'], draw: coin, on: true },
  { name: ['a plastic ruler', 'une règle en plastique'], draw: ruler, on: false },
  { name: ['aluminium foil', 'du papier d’aluminium'], draw: foilStrip, on: true },
  { name: ['a pencil (the wood)', 'un crayon (le bois)'], draw: pencil, on: false },
  { name: ['a key', 'une clé'], draw: key, on: true },
  { name: ['pencil lead', 'une mine de crayon'], draw: pencilLead, on: true },
]
const LAST = THINGS.length

// the circuit, on the left
const CX = 14, CY = 56, CS = 1.14
// the list, on the right
const LX = 776
const rowY = (i) => 46 + i * 58

export function TestCircuit({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0) // things 0..k-1 have been tested
  const big = isDisplayMode
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])
  const inGap = k > 0 ? THINGS[k - 1] : null
  const lit = !!inGap?.on

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />

          {/* the circuit, and the last thing tested in its gap */}
          <Pic svg={circuit(CX, CY, CS, { lit })} />
          {inGap && <Pic svg={inGap.draw(CX + GAP.x * CS, CY + GAP.y * CS, CS)} />}
          <text x="30" y="46" fontFamily={FONT} fontSize="30" fontWeight="900" fill={k === LAST ? KEY : MUTED}>
            {k === 0 ? t(lang, 'Lamp on or off? Say it first.', 'Allumée ou éteinte ? Dis-le d’abord.') : L(inGap.name)}
          </text>
          {inGap && (
            <text x="30" y="500" fontFamily={FONT} fontSize="32" fontWeight="900" fill={lit ? '#b07a00' : MUTED}>
              {lit ? t(lang, 'The lamp lights.', 'La lampe s’allume.') : t(lang, 'The lamp stays off.', 'La lampe reste éteinte.')}
            </text>
          )}

          {/* the list: the next one asks */}
          {THINGS.map((thing, i) => {
            const y = rowY(i)
            const done = i < k
            const now = i === k
            return (
              <g key={i}>
                <rect x={LX} y={y} width={1500 - LX - 16} height="50" rx="12"
                  fill={now ? '#e9f1fa' : done ? '#f7fafc' : '#ffffff'} stroke={now ? BLUE : RULE} strokeWidth={now ? 3 : 1.5} />
                <circle cx={LX + 28} cy={y + 25} r="19" fill={now ? BLUE : done ? MUTED : RULE} />
                <text x={LX + 28} y={y + 34} fontFamily={FONT} fontSize="25" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
                <text x={LX + 60} y={y + 35} fontFamily={FONT} fontSize="27" fontWeight="800" fill={done || now ? INK : '#9aa5ae'}>{L(thing.name)}</text>
                <rect x={1310} y={y + 7} width="158" height="36" rx="18"
                  fill={done ? (thing.on ? '#fff3b0' : '#eef1f4') : '#ffffff'} stroke={done ? (thing.on ? GOLD : MUTED) : now ? BLUE : RULE} strokeWidth="2.5" />
                <text x={1389} y={y + 34} fontFamily={FONT} fontSize="25" fontWeight="900" fill={done ? INK : now ? BLUE : RULE} textAnchor="middle">
                  {done ? (thing.on ? t(lang, 'lamp on', 'allumée') : t(lang, 'lamp off', 'éteinte')) : '?'}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>{t(lang, 'Test it', 'Teste')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

// content/y7-science/U03_7/spread.jsx
// WATCH THE HEAT — a model predicted per press. Mr Bowen's hot coffee on his
// desk; its extra heat is 40 red dots. Each press moves the clock on, and
// before it the class says where the heat will be:
//
//   0  8:00 a.m.   all the dots in the coffee            coffee 80 °C
//   1  8:10 a.m.   some are out, round the mug           coffee 65 °C
//   2  8:30 a.m.   out over the desk and into the air    coffee 45 °C
//   3  12 noon     spread through the whole room         coffee 25 °C
//   4  5 p.m.      still everywhere: they never come back
//
// The room stays at 25 °C the whole time: the coffee's heat is far too spread
// out to warm it you could feel (plan.js has the numbers). The dots move
// (one change a press, animated), which is what a static picture cannot show:
// the heat goes out from hotter to colder, and never gathers back.
import { useState } from 'react'
import { Undo2, RotateCcw, ChevronRight } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { mulberry32 } from '../U03_models/data.js'
import { Btn } from '../U03_models/ui.jsx'
import { INK, MUTED, FONT, RED, BLUE, mug, thermometer } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

const ROOM = { x: 30, y: 84, w: 1040, h: 376 }
const FLOOR = ROOM.y + ROOM.h
const DESK = { x: 440, w: 280, top: FLOOR - 104 }
const MUG = { x: 580, y: DESK.top - 30, s: 0.5 }
const N = 40

const STAGES = [
  { time: ['8:00 a.m.', '8 h'], coffee: 80, en: 'Mr Bowen’s hot coffee. Its heat is all in the mug.', fr: 'Le café chaud de M. Bowen. Sa chaleur est dans la tasse.' },
  { time: ['8:10 a.m.', '8 h 10'], coffee: 65, en: 'The heat starts to move out.', fr: 'La chaleur commence à sortir.' },
  { time: ['8:30 a.m.', '8 h 30'], coffee: 45, en: 'It spreads out into the air.', fr: 'Elle s’étale dans l’air.' },
  { time: ['12 noon', 'Midi'], coffee: 25, en: 'The heat is everywhere. The coffee is cold.', fr: 'La chaleur est partout. Le café est froid.' },
  { time: ['5 p.m.', '17 h'], coffee: 25, en: 'Still everywhere. It never comes back.', fr: 'Toujours partout. Elle ne revient jamais.' },
]
const NEXT = [
  ['10 minutes later: where will the heat be?', '10 minutes plus tard : où sera la chaleur ?'],
  ['20 minutes more: where will it be?', '20 minutes de plus : où sera-t-elle ?'],
  ['12 noon: where will it be?', 'Midi : où sera-t-elle ?'],
  ['Wait. Will the heat come back to the coffee?', 'Attends. La chaleur va-t-elle revenir dans le café ?'],
]

// Every dot's place at every stage, fixed (the same each time it is shown).
function layout() {
  const rnd = mulberry32(3707)
  // Somewhere within r of the mug, inside the room (tried again, never squashed
  // against a wall).
  const near = (r) => {
    for (;;) {
      const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * r
      const x = MUG.x + d * Math.cos(a), y = MUG.y - 20 + d * Math.sin(a) * 0.7
      if (x > ROOM.x + 16 && x < ROOM.x + ROOM.w - 16 && y > ROOM.y + 16 && y < FLOOR - 14) return [x, y]
    }
  }
  const anywhere = () => [ROOM.x + 20 + rnd() * (ROOM.w - 40), ROOM.y + 20 + rnd() * (ROOM.h - 36)]
  return Array.from({ length: N }, (_, i) => [
    [MUG.x - 16 + (i % 8) * 4.6, MUG.y - 6 + Math.floor(i / 8) * 5.5],
    i < 14 ? [MUG.x - 16 + (i % 7) * 5.5, MUG.y - 4 + Math.floor(i / 7) * 8] : near(120),
    i < 4 ? [MUG.x - 8 + i * 5.5, MUG.y + 4] : near(330),
    anywhere(),
    anywhere(),
  ])
}

const DOTS = layout()

export function HeatSpread({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0)
  const [back, setBack] = useState(false) // going back jumps: heat never gathers back on screen either
  const go = (v) => { setBack(v < k); setK(v) }
  const big = isDisplayMode
  const fr = lang === 'fr'
  const last = STAGES.length - 1
  const st = STAGES[k]

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 540" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="540" rx="16" fill="#ffffff" />

          {/* now */}
          <text x="40" y="56" fontFamily={FONT} fontSize="29" fontWeight="900" fill={INK}>{fr ? st.fr : st.en}</text>

          {/* the room: the desk, the mug */}
          <rect x={ROOM.x} y={ROOM.y} width={ROOM.w} height={ROOM.h} rx="14" fill="#f7fafc" stroke={MUTED} strokeWidth="3" />
          <rect x={DESK.x} y={DESK.top} width={DESK.w} height="16" rx="4" fill="#b5835a" stroke={INK} strokeWidth="3" />
          <rect x={DESK.x + 18} y={DESK.top + 16} width="14" height={FLOOR - DESK.top - 16} fill="#8a5a2b" />
          <rect x={DESK.x + DESK.w - 32} y={DESK.top + 16} width="14" height={FLOOR - DESK.top - 16} fill="#8a5a2b" />
          <Pic svg={mug(MUG.x, MUG.y, MUG.s, k === 0)} />

          {/* the heat */}
          {DOTS.map((stages, i) => {
            const [x, y] = stages[k]
            return (
              <circle key={i} cx="0" cy="0" r="7" fill={RED} stroke="#ffffff" strokeWidth="1.5"
                style={{ transform: `translate(${x}px, ${y}px)`, transition: back ? 'none' : 'transform 1.6s cubic-bezier(.3,0,.3,1)' }} />
            )
          })}

          {/* the clock and the two thermometers */}
          <text x="1285" y="124" fontFamily={FONT} fontSize="40" fontWeight="900" fill={INK} textAnchor="middle">{fr ? st.time[1] : st.time[0]}</text>
          <Pic svg={thermometer(1190, 266, (st.coffee - 20) / 70, 0.95)} />
          <text x="1190" y="346" fontFamily={FONT} fontSize="24" fontWeight="800" fill={INK} textAnchor="middle">{t(lang, 'coffee', 'café')}</text>
          <text x="1190" y="384" fontFamily={FONT} fontSize="30" fontWeight="900" fill={st.coffee > 30 ? RED : BLUE} textAnchor="middle">{`${st.coffee} °C`}</text>
          <Pic svg={thermometer(1380, 266, 5 / 70, 0.95)} />
          <text x="1380" y="346" fontFamily={FONT} fontSize="24" fontWeight="800" fill={INK} textAnchor="middle">{t(lang, 'room', 'pièce')}</text>
          <text x="1380" y="384" fontFamily={FONT} fontSize="30" fontWeight="900" fill={BLUE} textAnchor="middle">25 °C</text>
          <circle cx="1206" cy="432" r="9" fill={RED} stroke="#ffffff" strokeWidth="1.5" />
          <text x="1224" y="440" fontFamily={FONT} fontSize="22" fontWeight="800" fill={MUTED}>{t(lang, '= some heat', '= de la chaleur')}</text>

          {/* next */}
          {k < last ? (
            <g>
              <rect x="30" y="482" width="1440" height="48" rx="12" fill="#e9f1fa" stroke={BLUE} strokeWidth="2.5" />
              <text x="750" y="515" fontFamily={FONT} fontSize="25" fontWeight="800" fill={BLUE} textAnchor="middle">{t(lang, 'Next: ', 'Ensuite : ')}{fr ? NEXT[k][1] : NEXT[k][0]}</text>
            </g>
          ) : (
            <g>
              <rect x="30" y="482" width="1440" height="48" rx="12" fill="#fdecee" stroke={RED} strokeWidth="2.5" />
              <text x="750" y="516" fontFamily={FONT} fontSize="26" fontWeight="900" fill={RED} textAnchor="middle">{t(lang, 'Spread out, it never gathers back by itself.', 'Une fois étalée, elle ne se rassemble jamais toute seule.')}</text>
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => go(Math.max(0, k - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === last} onClick={() => go(Math.min(last, k + 1))}>{t(lang, 'Later', 'Plus tard')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => go(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

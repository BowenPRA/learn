// content/y7-science/U04_4/guess.jsx
// GUESS MR BOWEN'S ANIMAL — the stepper the class says first. Eight animals in
// real photographs, each named. Mr Bowen is thinking of one. Each press asks
// one yes-or-no question and he answers it: every animal that does not fit
// goes grey. Before the press the class says which animals answer yes.
//
//   the gecko   Does it have legs? Yes. Does it have wings? No.
//               Does it have eight legs? No.          8 → 4 → 2 → 1
//   the snail   (Another animal) Does it have legs? No. Does it have scales?
//               No. Does it have a shell? Yes.
//
// The second question depends on the first answer (legs → wings, no legs →
// scales): that is a key, the next slide's word. Three questions are enough
// for eight animals because each one splits them in half: the starter's
// million needs twenty (slide 5).
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw, Shuffle } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { MrBowen } from '../U03_coffee/dating.jsx'
import { INK, KEY, MUTED, FONT, TEAL, RULE, YES, NO } from './art.js'
import gecko from './images/gecko.jpg'
import chicken from './images/chicken.jpg'
import butterfly from './images/butterfly.jpg'
import spider from './images/spider.jpg'
import snake from './images/snake.jpg'
import fish from './images/fish.jpg'
import snail from './images/snail.jpg'
import earthworm from './images/earthworm.jpg'

const t = (lang, en, fr) => tr(lang, en, null, fr)

// In the grid's order, mixed so the first answer does not split it by rows.
const ANIMALS = [
  { id: 'chicken', pic: chicken, name: ['chicken', 'poule'], has: { legs: 1, wings: 1, feathers: 1 } },
  { id: 'snake', pic: snake, name: ['snake', 'serpent'], has: { scales: 1 } },
  { id: 'spider', pic: spider, name: ['spider', 'araignée'], has: { legs: 1, eight: 1 } },
  { id: 'snail', pic: snail, name: ['snail', 'escargot'], has: { shell: 1 }, found: ['Yes! The snail.', 'Oui ! L’escargot.'] },
  { id: 'fish', pic: fish, name: ['fish', 'poisson'], has: { scales: 1, fins: 1 } },
  { id: 'gecko', pic: gecko, name: ['gecko', 'gecko'], has: { legs: 1 }, found: ['Yes! The gecko.', 'Oui ! Le gecko.'] },
  { id: 'earthworm', pic: earthworm, name: ['earthworm', 'ver de terre'], has: {} },
  { id: 'butterfly', pic: butterfly, name: ['butterfly', 'papillon'], has: { legs: 1, wings: 1 } },
]

const QUESTIONS = {
  legs: ['Does it have legs?', 'A-t-il des pattes ?'],
  wings: ['Does it have wings?', 'A-t-il des ailes ?'],
  feathers: ['Does it have feathers?', 'A-t-il des plumes ?'],
  eight: ['Does it have eight legs?', 'A-t-il huit pattes ?'],
  scales: ['Does it have scales?', 'A-t-il des écailles ?'],
  fins: ['Does it have fins?', 'A-t-il des nageoires ?'],
  shell: ['Does it have a shell?', 'A-t-il une coquille ?'],
}
// The key behind the game: after each question, [the next if yes, the next if no].
const NEXT = { legs: ['wings', 'scales'], wings: ['feathers', 'eight'], scales: ['fins', 'shell'] }
const SECRETS = ['gecko', 'snail']
const COUNTS = [8, 4, 2, 1]

// The questions met on the way to an animal, each with its answer.
function route(id) {
  const a = ANIMALS.find((x) => x.id === id)
  const out = []
  let q = 'legs'
  while (q) {
    const yes = !!a.has[q]
    out.push([q, yes])
    q = NEXT[q] ? NEXT[q][yes ? 0 : 1] : null
  }
  return out
}

// The grid: 4 × 2 cells, a photograph 222 × 158 with its name underneath.
const CW = 222, CH = 150, PITCH_X = 236, PITCH_Y = 234, GX = 16, GY = 58
const cell = (i) => ({ x: GX + (i % 4) * PITCH_X, y: GY + Math.floor(i / 4) * PITCH_Y })
const PANEL_X = 976

export function GuessMyAnimal({ lang = 'en', isDisplayMode = false }) {
  const [round, setRound] = useState(0)
  const [k, setK] = useState(0) // questions answered so far
  const big = isDisplayMode
  const fr = lang === 'fr'
  const L = (pair) => (fr ? pair[1] : pair[0])
  const secret = SECRETS[round]
  const path = route(secret)
  const asked = path.slice(0, k)
  const done = k === path.length
  const fits = (a) => asked.every(([q, yes]) => !!a.has[q] === yes)
  const found = ANIMALS.find((a) => a.id === secret)
  const last = asked[asked.length - 1]
  const said = !k ? null : done ? L(found.found) : last[1] ? t(lang, 'Yes.', 'Oui.') : t(lang, 'No.', 'Non.')

  const forward = () => {
    if (!done) setK((v) => v + 1)
    else if (round < SECRETS.length - 1) { setRound((r) => r + 1); setK(0) }
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 530" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="530" rx="16" fill="#ffffff" />
          <defs>
            <filter id="gma-grey"><feColorMatrix type="saturate" values="0" /></filter>
            {ANIMALS.map((a, i) => {
              const c = cell(i)
              return <clipPath key={a.id} id={`gma-${a.id}`}><rect x={c.x} y={c.y} width={CW} height={CH} rx="14" /></clipPath>
            })}
          </defs>

          <text x={GX} y="38" fontFamily={FONT} fontSize="30" fontWeight="900" fill={INK}>
            {round === 0
              ? t(lang, 'Mr Bowen is thinking of one of these animals.', 'M. Bowen pense à un de ces animaux.')
              : t(lang, 'Now he is thinking of another one.', 'Maintenant, il pense à un autre.')}
          </text>

          {/* the eight animals */}
          {ANIMALS.map((a, i) => {
            const c = cell(i)
            const out = !fits(a)
            const win = done && a.id === secret
            return (
              <g key={a.id}>
                <image href={a.pic} x={c.x} y={c.y} width={CW} height={CH} preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#gma-${a.id})`} filter={out ? 'url(#gma-grey)' : undefined} />
                {out && <rect x={c.x} y={c.y} width={CW} height={CH} rx="14" fill="#ffffff" opacity="0.62" />}
                <rect x={c.x} y={c.y} width={CW} height={CH} rx="14" fill="none" stroke={win ? KEY : '#cbd5e1'} strokeWidth={win ? 9 : 2} />
                <text x={c.x + CW / 2} y={c.y + CH + 36} fontFamily={FONT} fontSize="30" fontWeight="900"
                  fill={out ? '#b8c0c7' : win ? KEY : INK} textAnchor="middle">{L(a.name)}</text>
              </g>
            )
          })}

          {/* the questions and Mr Bowen's answers */}
          <rect x={PANEL_X} y="12" width={1500 - PANEL_X - 16} height="506" rx="16" fill="#f7fafc" stroke={RULE} strokeWidth="3" />
          {path.map(([q, yes], i) => {
            if (i > k) return null
            const y = 28 + i * 76
            const now = i === k
            const chip = now ? '?' : yes ? t(lang, 'YES', 'OUI') : t(lang, 'NO', 'NON')
            const col = now ? KEY : yes ? YES : NO
            return (
              <g key={`${round}-${i}`}>
                <rect x={PANEL_X + 14} y={y} width={1500 - PANEL_X - 44} height="64" rx="12" fill={now ? '#fff4e8' : '#ffffff'} stroke={now ? KEY : RULE} strokeWidth={now ? 4 : 2} />
                <rect x={PANEL_X + 26} y={y + 13} width="82" height="38" rx="19" fill={col} />
                <text x={PANEL_X + 67} y={y + 41} fontFamily={FONT} fontSize="26" fontWeight="900" fill="#ffffff" textAnchor="middle">{chip}</text>
                <text x={PANEL_X + 122} y={y + 42} fontFamily={FONT} fontSize="27" fontWeight="800" fill={INK}>{L(QUESTIONS[q])}</text>
              </g>
            )
          })}

          {/* how many are left */}
          <text x={PANEL_X + 26} y="278" fontFamily={FONT} fontSize="26" fontWeight="900" fill={TEAL} letterSpacing="2">{t(lang, 'ANIMALS LEFT', 'ANIMAUX RESTANTS')}</text>
          {COUNTS.map((n, i) => (
            <g key={n}>
              <text x={PANEL_X + 52 + i * 118} y="346" fontFamily={FONT} fontSize="48" fontWeight="900" textAnchor="middle"
                fill={i === k ? KEY : i < k ? INK : '#c9d1d8'}>{n}</text>
              {i < 3 && <path d={`M ${PANEL_X + 86 + i * 118} 330 h 30 m -10 -9 l 10 9 l -10 9`} fill="none" stroke={i < k ? INK : '#c9d1d8'} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
            </g>
          ))}

          {/* Mr Bowen answers */}
          <MrBowen x={1432} y={512 - 268 * 0.5} scale={0.5} handRight={done ? [70, 30] : undefined} />
          {said && (
            <g>
              <path d={`M ${PANEL_X + 24} 372 H 1352 Q 1368 372 1368 388 V 398 L 1394 404 L 1366 418 Q 1362 436 1346 436 H ${PANEL_X + 40} Q ${PANEL_X + 24} 436 ${PANEL_X + 24} 420 V 388 Q ${PANEL_X + 24} 372 ${PANEL_X + 40} 372 Z`}
                fill="#ffffff" stroke={done ? KEY : INK} strokeWidth="3.5" strokeLinejoin="round" />
              <text x={(PANEL_X + 24 + 1368) / 2} y="415" fontFamily={FONT} fontSize="32" fontWeight="900" fill={done ? KEY : INK} textAnchor="middle">{said}</text>
            </g>
          )}
          {done && (
            <text x={PANEL_X + 26} y="490" fontFamily={FONT} fontSize="27" fontWeight="800" fill={MUTED}>
              {t(lang, '3 questions, 8 animals.', '3 questions, 8 animaux.')}
            </text>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={done ? Shuffle : ChevronRight} disabled={done && round === SECRETS.length - 1} onClick={forward}>
          {done ? t(lang, 'Another animal', 'Un autre animal') : t(lang, 'Ask the question', 'Poser la question')}
        </Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0 && round === 0} onClick={() => { setRound(0); setK(0) }}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

// content/y7-science/U04_4/fish.jsx
// FOUR FISH — Think like a scientist (pages 141–142), on screen. The book's
// four fish as real photographs, A to D, beside the book's key. Pairs name all
// four on a whiteboard first; then each press answers ONE question for the
// fish in the orange ring, and the branch it takes lights up, until the key
// reaches a name. The name then stays under the photograph.
//
//   A  Does it have stripes? No                                → horn shark
//   B  stripes? Yes · vertical? Yes · spines on the fins? Yes  → dragon fish
//   C  stripes? Yes · vertical? No                             → zebra fish
//   D  stripes? Yes · vertical? Yes · spines on the fins? No   → clown fish
//
// The book's "dragon fish" is a lionfish (plan.js). Its spines are long and
// venomous; the clown fish's are short and hidden in the fin, so the book's
// key, and this one, call them "no spines".
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw, SkipForward } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { INK, KEY, MUTED, FONT, TEAL } from './art.js'
import { FISH, NAMES } from './keys.js'
import hornShark from './images/fish-horn-shark.jpg'
import lionfish from './images/fish-lionfish.jpg'
import zebrafish from './images/fish-zebrafish.jpg'
import clownfish from './images/fish-clownfish.jpg'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const PICS = [hornShark, lionfish, zebrafish, clownfish]

// The photographs, 2 × 2.
const PW = 288, PH = 176
const SPOTS = [[16, 56], [318, 56], [16, 292], [318, 292]]

// The key: where each box sits (its centre) and how wide it is.
const NODE = {
  stripes: { x: 1060, y: 60, w: 360 },
  vertical: { x: 890, y: 190, w: 400 },
  hornShark: { x: 1336, y: 190, w: 260 },
  spines: { x: 840, y: 320, w: 400 },
  zebraFish: { x: 1220, y: 320, w: 260 },
  dragonFish: { x: 760, y: 450, w: 260 },
  clownFish: { x: 1040, y: 450, w: 260 },
}
const BOX_H = 58
const BAR = { stripes: 122, vertical: 252, spines: 382 }

function edge(parent, child) {
  const p = NODE[parent], c = NODE[child]
  return `M ${p.x} ${p.y + BOX_H / 2} V ${BAR[parent]} H ${c.x} V ${c.y - BOX_H / 2}`
}

export function FourFish({ lang = 'en', isDisplayMode = false }) {
  const [f, setF] = useState(0) // which fish
  const [s, setS] = useState(0) // questions answered for it
  const [named, setNamed] = useState([false, false, false, false])
  const big = isDisplayMode
  const fr = lang === 'fr'
  const L = (pair) => (fr ? pair[1] : pair[0])
  const fish = FISH.fish[f]
  const route = fish.branch
  const done = s === route.length

  // what is lit: the questions answered, each with the branch it took
  const taken = route.slice(0, s).map(([q, yes]) => ({ q, yes, to: FISH.tree[q][yes ? 0 : 1] }))
  const nowQ = done ? null : route[s][0]
  const litNodes = new Set([...taken.map((x) => x.q), ...(done ? [fish.name] : [])])

  const step = () => {
    if (done) return
    const ns = s + 1
    setS(ns)
    if (ns === route.length) setNamed((n) => n.map((v, i) => (i === f ? true : v)))
  }
  const back = () => { if (s > 0) setS(s - 1) }
  const nextFish = () => { if (f < 3) { setF(f + 1); setS(0) } }
  const restart = () => { setF(0); setS(0); setNamed([false, false, false, false]) }

  const question = (id) => {
    const n = NODE[id]
    const lit = litNodes.has(id)
    const now = nowQ === id
    return (
      <g key={id}>
        <rect x={n.x - n.w / 2} y={n.y - BOX_H / 2} width={n.w} height={BOX_H} rx="12"
          fill={now ? '#fff4e8' : '#e2f2f6'} stroke={now ? KEY : lit ? KEY : TEAL} strokeWidth={now ? 5 : lit ? 4 : 3} />
        <text x={n.x} y={n.y + 9} fontFamily={FONT} fontSize="26" fontWeight="800" fill={INK} textAnchor="middle">{L(FISH.q[id])}</text>
      </g>
    )
  }
  const leaf = (id) => {
    const n = NODE[id]
    const lit = litNodes.has(id)
    return (
      <g key={id}>
        <rect x={n.x - n.w / 2} y={n.y - BOX_H / 2} width={n.w} height={BOX_H} rx="12" fill={lit ? KEY : '#ffffff'} stroke={KEY} strokeWidth="3" />
        <text x={n.x} y={n.y + 10} fontFamily={FONT} fontSize="28" fontWeight="900" fill={lit ? '#ffffff' : KEY} textAnchor="middle">{L(NAMES[id])}</text>
      </g>
    )
  }
  const branch = (parent, i) => {
    const child = FISH.tree[parent][i]
    const on = taken.some((x) => x.q === parent && x.to === child)
    const c = NODE[child]
    const yes = i === 0
    return (
      <g key={`${parent}-${i}`}>
        <path d={edge(parent, child)} fill="none" stroke={on ? KEY : '#9aa5ae'} strokeWidth={on ? 7 : 3} strokeLinejoin="round" />
        <text x={c.x + (yes ? -14 : 14)} y={BAR[parent] + 32} fontFamily={FONT} fontSize={on ? 27 : 25} fontWeight="900"
          fill={on ? KEY : MUTED} textAnchor={yes ? 'end' : 'start'}>{yes ? t(lang, 'Yes', 'Oui') : t(lang, 'No', 'Non')}</text>
      </g>
    )
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />
          <defs>
            {SPOTS.map(([x, y], i) => <clipPath key={i} id={`fish-${i}`}><rect x={x} y={y} width={PW} height={PH} rx="14" /></clipPath>)}
          </defs>

          <text x="16" y="38" fontFamily={FONT} fontSize="30" fontWeight="900" fill={INK}>
            {done
              ? t(lang, `Fish ${fish.letter} is a ${L(NAMES[fish.name])}.`, `Le poisson ${fish.letter} est un ${L(NAMES[fish.name])}.`)
              : s === 0
                ? t(lang, `Fish ${fish.letter}: start at the top.`, `Poisson ${fish.letter}\u00a0: commence en haut.`)
                : t(lang, `Fish ${fish.letter}: the next question.`, `Poisson ${fish.letter}\u00a0: la question suivante.`)}
          </text>

          {/* the four fish */}
          {SPOTS.map(([x, y], i) => {
            const me = i === f
            const fi = FISH.fish[i]
            return (
              <g key={i}>
                <image href={PICS[i]} x={x} y={y} width={PW} height={PH} preserveAspectRatio="xMidYMid slice" clipPath={`url(#fish-${i})`} />
                <rect x={x} y={y} width={PW} height={PH} rx="14" fill="none" stroke={me ? KEY : '#cbd5e1'} strokeWidth={me ? 9 : 2} />
                <circle cx={x + 28} cy={y + 28} r="22" fill={me ? KEY : '#ffffff'} stroke={me ? '#ffffff' : INK} strokeWidth="3" />
                <text x={x + 28} y={y + 38} fontFamily={FONT} fontSize="28" fontWeight="900" fill={me ? '#ffffff' : INK} textAnchor="middle">{fi.letter}</text>
                {named[i] && (
                  <g>
                    <rect x={x} y={y + PH + 6} width={PW} height="44" rx="10" fill="#fff4e8" stroke={KEY} strokeWidth="2.5" />
                    <text x={x + PW / 2} y={y + PH + 38} fontFamily={FONT} fontSize="26" fontWeight="900" fill={KEY} textAnchor="middle">{L(NAMES[fi.name])}</text>
                  </g>
                )}
              </g>
            )
          })}

          {/* the key */}
          {Object.keys(FISH.tree).flatMap((q) => [branch(q, 0), branch(q, 1)])}
          {Object.keys(FISH.q).map(question)}
          {['hornShark', 'zebraFish', 'dragonFish', 'clownFish'].map(leaf)}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={s === 0} onClick={back}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={done} onClick={step}>{t(lang, 'Next step', 'Étape suivante')}</Btn>
        <Btn big={big} tone="blue" icon={SkipForward} disabled={f === 3} onClick={nextFish}>{t(lang, 'Next fish', 'Poisson suivant')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={f === 0 && s === 0} onClick={restart}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

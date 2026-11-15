// content/y7-science/U04_4/styles.jsx
// THE SAME KEY, ANOTHER WAY — page 140. The key from page 139 drawn twice:
// on the left as a branching key, on the right as a numbered key (pairs of
// statements, "go to" a number or a name). Choose an animal; each press takes
// ONE step, and the step lights up in both keys at once: the question and the
// branch it took on the left, the line it read on the right. The class says
// the next step (1a, 2b…) before the press.
//
//   dragonfly  1a 2a 4a   (the book's example, page 140)
//   earthworm  1b 3a      (the book's Question 1)
//   crab 1a 2b · slug 1b 3b · housefly 1a 2a 4b
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw, SkipForward } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { INK, KEY, MUTED, FONT, TEAL, RULE } from './art.js'
import { BOOK, NUMBERED, ROUTES, NAMES } from './keys.js'
import crab from './images/crab.jpg'
import dragonfly from './images/dragonfly.jpg'
import housefly from './images/housefly.jpg'
import earthworm from './images/earthworm.jpg'
import slug from './images/slug.jpg'

const t = (lang, en, fr) => tr(lang, en, null, fr)

const ORDER = [
  { id: 'dragonfly', pic: dragonfly, find: ['Find the dragonfly.', 'Trouve la libellule.'] },
  { id: 'earthworm', pic: earthworm, find: ['Find the earthworm.', 'Trouve le ver de terre.'] },
  { id: 'crab', pic: crab, find: ['Find the crab.', 'Trouve le crabe.'] },
  { id: 'slug', pic: slug, find: ['Find the slug.', 'Trouve la limace.'] },
  { id: 'housefly', pic: housefly, find: ['Find the housefly.', 'Trouve la mouche.'] },
]

// The branching key: each box's centre, width and lines [English, French].
// Drawn for a 1500 × 540 stage, the shape a showcase gives a widget, so the
// words stay at about 21 px on the projector.
const BOX = {
  legs: { x: 370, y: 152, w: 310, lines: [['Does it have legs?'], ['A-t-il des pattes ?']] },
  six: { x: 185, y: 262, w: 290, lines: [['Does it have more', 'than six legs?'], ['A-t-il plus de', 'six pattes ?']] },
  rings: { x: 555, y: 262, w: 290, lines: [['Is its body made', 'up of rings?'], ['Son corps est-il', 'fait d’anneaux ?']] },
  wings: { x: 265, y: 390, w: 230, lines: [['Does it have', 'four wings?'], ['A-t-il quatre', 'ailes ?']] },
}
const LEAF = {
  crab: { x: 70, y: 390, w: 120 },
  earthworm: { x: 495, y: 390, w: 200 },
  slug: { x: 662, y: 390, w: 110 },
  dragonfly: { x: 185, y: 512, w: 165 },
  housefly: { x: 360, y: 512, w: 150 },
}
const H1 = 52, H2 = 76 // box heights: one line, two lines
const hOf = (id) => (BOX[id] ? (BOX[id].lines[0].length > 1 ? H2 : H1) : 46)
const BAR = { legs: 196, six: 322, rings: 322, wings: 452 }
const at = (id) => BOX[id] || LEAF[id]

function edge(parent, child) {
  const p = at(parent), c = at(child)
  return `M ${p.x} ${p.y + hOf(parent) / 2} V ${BAR[parent]} H ${c.x} V ${c.y - hOf(child) / 2}`
}

// The numbered key: each line's top.
const LINE_H = 44
const lineY = (pair, b) => 122 + pair * 102 + (b ? LINE_H : 0)

export function TwoStyles({ lang = 'en', isDisplayMode = false }) {
  const [a, setA] = useState(0) // which animal
  const [s, setS] = useState(0) // steps taken
  const big = isDisplayMode
  const fr = lang === 'fr'
  const L = (pair) => (fr ? pair[1] : pair[0])
  const animal = ORDER[a]
  const route = ROUTES[animal.id]
  const done = s === route.steps.length
  const taken = route.branch.slice(0, s).map(([q, yes]) => ({ q, to: BOOK.tree[q][yes ? 0 : 1] }))
  const nowQ = done ? null : route.branch[s][0]
  const read = new Set(route.steps.slice(0, s))

  const branch = (parent, i) => {
    const child = BOOK.tree[parent][i]
    const on = taken.some((x) => x.q === parent && x.to === child)
    const yes = i === 0
    const c = at(child)
    return (
      <g key={`${parent}-${i}`}>
        <path d={edge(parent, child)} fill="none" stroke={on ? KEY : '#9aa5ae'} strokeWidth={on ? 7 : 3} strokeLinejoin="round" />
        <text x={c.x + (yes ? -10 : 10)} y={BAR[parent] + 23} fontFamily={FONT} fontSize={on ? 26 : 25} fontWeight="900"
          fill={on ? KEY : MUTED} textAnchor={yes ? 'end' : 'start'}>{yes ? t(lang, 'Yes', 'Oui') : t(lang, 'No', 'Non')}</text>
      </g>
    )
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 540" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="540" rx="16" fill="#ffffff" />
          <defs><clipPath id="styles-pic"><rect x="16" y="8" width="108" height="72" rx="10" /></clipPath></defs>

          {/* the animal to find, and the steps so far */}
          <image href={animal.pic} x="16" y="8" width="108" height="72" preserveAspectRatio="xMidYMid slice" clipPath="url(#styles-pic)" />
          <rect x="16" y="8" width="108" height="72" rx="10" fill="none" stroke={KEY} strokeWidth="3" />
          <text x="142" y="56" fontFamily={FONT} fontSize="32" fontWeight="900" fill={INK}>{L(animal.find)}</text>
          {route.steps.slice(0, s).map((st, i) => (
            <g key={st}>
              <rect x={900 + i * 130} y="18" width="86" height="46" rx="12" fill={KEY} />
              <text x={943 + i * 130} y="51" fontFamily={FONT} fontSize="28" fontWeight="900" fill="#ffffff" textAnchor="middle">{st}</text>
              {(i < s - 1 || done) && <path d={`M ${992 + i * 130} 41 h 26 m -9 -8 l 9 8 l -9 8`} fill="none" stroke={KEY} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
            </g>
          ))}
          {done && (
            <text x={900 + s * 130} y="52" fontFamily={FONT} fontSize="30" fontWeight="900" fill={KEY}>{L(NAMES[animal.id])}</text>
          )}

          {/* left: the branching key */}
          <text x="16" y="104" fontFamily={FONT} fontSize="25" fontWeight="900" fill={TEAL} letterSpacing="2">{t(lang, 'BRANCHING KEY', 'CLÉ EN ARBRE')}</text>
          {Object.keys(BOOK.tree).flatMap((q) => [branch(q, 0), branch(q, 1)])}
          {Object.entries(BOX).map(([id, b]) => {
            const lit = taken.some((x) => x.q === id)
            const now = nowQ === id
            const h = hOf(id)
            const lines = b.lines[fr ? 1 : 0]
            return (
              <g key={id}>
                <rect x={b.x - b.w / 2} y={b.y - h / 2} width={b.w} height={h} rx="12" fill={now ? '#fff4e8' : '#e2f2f6'}
                  stroke={now || lit ? KEY : TEAL} strokeWidth={now ? 5 : lit ? 4 : 3} />
                {lines.map((ln, i) => (
                  <text key={i} x={b.x} y={b.y + 9 + (lines.length > 1 ? (i ? 15 : -16) : 0)} fontFamily={FONT} fontSize="26" fontWeight="800" fill={INK} textAnchor="middle">{ln}</text>
                ))}
              </g>
            )
          })}
          {Object.entries(LEAF).map(([id, l]) => {
            const lit = done && id === animal.id
            return (
              <g key={id}>
                <rect x={l.x - l.w / 2} y={l.y - 23} width={l.w} height="46" rx="10" fill={lit ? KEY : '#ffffff'} stroke={KEY} strokeWidth="3" />
                <text x={l.x} y={l.y + 9} fontFamily={FONT} fontSize="26" fontWeight="900" fill={lit ? '#ffffff' : KEY} textAnchor="middle">{L(NAMES[id])}</text>
              </g>
            )
          })}

          {/* right: the numbered key */}
          <line x1="724" y1="84" x2="724" y2="528" stroke={RULE} strokeWidth="3" />
          <text x="752" y="104" fontFamily={FONT} fontSize="25" fontWeight="900" fill={TEAL} letterSpacing="2">{t(lang, 'NUMBERED KEY', 'CLÉ NUMÉROTÉE')}</text>
          {NUMBERED.map((pair, p) => (
            <g key={pair.n}>
              <circle cx="772" cy={lineY(p, false) + LINE_H} r="21" fill={TEAL} />
              <text x="772" y={lineY(p, false) + LINE_H + 9} fontFamily={FONT} fontSize="26" fontWeight="900" fill="#ffffff" textAnchor="middle">{pair.n}</text>
              {['a', 'b'].map((ab) => {
                const [en, frs, to] = pair[ab]
                const y = lineY(p, ab === 'b')
                const on = read.has(`${pair.n}${ab}`)
                const goes = typeof to === 'number' ? t(lang, `go to ${to}`, `va à ${to}`) : L(NAMES[to])
                return (
                  <g key={ab}>
                    {on && <rect x="804" y={y + 2} width="680" height={LINE_H - 4} rx="10" fill="#fff4e8" stroke={KEY} strokeWidth="3" />}
                    <text x="820" y={y + 31} fontFamily={FONT} fontSize="26" fontWeight="900" fill={on ? KEY : INK}>{ab}</text>
                    <text x="852" y={y + 31} fontFamily={FONT} fontSize="25" fontWeight={on ? 800 : 600} fill={INK}>{fr ? frs : en}</text>
                    <text x="1470" y={y + 31} fontFamily={FONT} fontSize="25" fontWeight="900" fill={on ? KEY : typeof to === 'number' ? MUTED : KEY} textAnchor="end">{goes}</text>
                  </g>
                )
              })}
            </g>
          ))}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={s === 0} onClick={() => setS((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={done} onClick={() => setS((v) => v + 1)}>{t(lang, 'Next step', 'Étape suivante')}</Btn>
        <Btn big={big} tone="blue" icon={SkipForward} disabled={a === ORDER.length - 1} onClick={() => { setA((v) => v + 1); setS(0) }}>{t(lang, 'Next animal', 'Animal suivant')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={a === 0 && s === 0} onClick={() => { setA(0); setS(0) }}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

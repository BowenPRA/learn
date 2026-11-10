// PROTRACTOR (Maths 5.3): measure angles with a protractor the student places.
//
// The student drags the protractor onto the angle, turns it with its handle (or the
// two turn buttons), reads the scale and types the size. The protractor clicks into
// place when its centre is near the corner and its 0 line is near an arm, so the task
// is about the decisions (centre on the corner, 0 on a line, which scale) and not
// about a steady finger. A wrong answer is named and tried once more; a second wrong
// answer, or Show me, places the protractor and shows the reading, and the angle
// counts ½.
//
// pool = { items: [{ id, v: [x, y], a: [d1, d2], reflex?, tri? }] } on an 800 x 600
// board: v is the corner, a the two arms' directions in degrees anticlockwise from
// east. `reflex` asks for the angle the long way round; `tri` closes the arms into a
// triangle ABC with the angle at B. Progress blob: { [id]: 1 | 0.5 }, score out of 10.
import { useMemo, useRef, useState } from 'react'
import { ArrowRight, Lightbulb, RotateCcw, RotateCw, Trophy, ZoomIn, ZoomOut } from 'lucide-react'
import TopBar from '../../src/components/TopBar.jsx'
import useLang from '../../src/hooks/useLang.js'
import { tr } from '../../src/utils/lang.js'
import { Protractor } from '../../src/data/Y7_MATH/U05_3/protractor.jsx'
import { at, f1, norm, sector } from '../../src/data/Y7_MATH/U05_3/lines.js'

const W = 800, H = 600, R = 220, ARM = 262
const INK = '#2b2b2b', KEY = '#1899d6', KEY_DARK = '#1378a8', GREEN = '#58cc02', AMBER = '#f59e0b'
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** Everything worked out from an item: the angle inside the arms, the answer, where the arc starts. */
function angleOf(item) {
  const [a1, a2] = item.a
  const turn = norm(a2 - a1)
  const inside = Math.min(turn, 360 - turn)
  const from = turn <= 180 ? a1 : a2 // going anticlockwise from here by `inside` reaches the other arm
  return { inside, from, to: norm(from + inside), answer: item.reflex ? 360 - inside : inside }
}

const diff = (a, b) => Math.abs(((a - b + 540) % 360) - 180)

/** Is the protractor in place: centre on the corner, a 0 line on an arm, the other arm under the scale? */
function placement(item, p) {
  const centre = Math.hypot(p.x - item.v[0], p.y - item.v[1]) < 0.5
  const { from, to } = angleOf(item)
  // The outer 0 points along `rot`; the inner 0 along rot + 180. The scale covers rot..rot+180.
  const onFrom = diff(p.rot, from) < 0.5
  const onTo = diff(p.rot + 180, to) < 0.5
  return { centre, line: onFrom || onTo, ok: centre && (onFrom || onTo) }
}

/** Click into place: the centre onto the corner, then a 0 line onto an arm. */
function snap(item, p) {
  let { x, y, rot } = p
  if (Math.hypot(x - item.v[0], y - item.v[1]) < 22) [x, y] = item.v
  if (x === item.v[0] && y === item.v[1]) {
    for (const arm of item.a) {
      for (const cand of [arm, arm + 180]) if (diff(rot, cand) < 6) rot = norm(cand)
    }
  }
  return { x, y, rot: norm(rot) }
}

/** Where the protractor waits: the corner of the board farthest from the angle. */
function home(item) {
  const spots = [[250, 270], [530, 270], [250, 570], [530, 570]]
  const far = spots.map((s) => [Math.hypot(s[0] - item.v[0], s[1] - item.v[1]), s]).sort((a, b) => b[0] - a[0])[0][1]
  return { x: far[0], y: far[1], rot: 0 }
}

const T = {
  en: {
    title: 'Protractor', ask: 'Measure this angle.', askReflex: 'Measure the marked angle.', askTri: 'Measure angle B.',
    how: 'Drag the protractor onto the angle. Turn it with the round handle.',
    check: 'Check', show: 'Show me', next: 'Next', finish: 'Finish', closer: 'Look closer', whole: 'Whole picture',
    left: 'Turn left', right: 'Turn right', size: 'Size of the angle', of: 'of',
    clean: 'Right first time.', slipped: 'Right on the second try.', helped: 'Shown to you. Look at how it sits.',
    placeCentre: 'Put the centre of the protractor on the corner of the angle.',
    placeLine: 'Turn the protractor so its 0 line lies along one arm, with the other arm under the scale.',
    scale: (x, kind) => `You read the other scale. This angle is ${kind}, so it cannot be ${x}°. Start at the 0 that sits on the arm and count up.`,
    inside: (i) => `${i}° is the angle inside. The marked angle goes the long way round: 360° − ${i}° = ?`,
    ten: 'Close: check the tens. Count 10, 20, 30… up from the 0 on the arm.',
    tick: 'Very close. Each small mark is 1°.',
    other: 'Not yet. Find the 0 on the arm, then count up to the other arm.',
    acute: 'acute (less than 90°)', obtuse: 'obtuse (more than 90°)',
    none: 'No angles yet', back: 'Back to the unit',
  },
  fr: {
    title: 'Rapporteur', ask: 'Mesure cet angle.', askReflex: 'Mesure l’angle marqué.', askTri: 'Mesure l’angle B.',
    how: 'Fais glisser le rapporteur sur l’angle. Tourne-le avec la poignée ronde.',
    check: 'Vérifier', show: 'Montre-moi', next: 'Suivant', finish: 'Terminer', closer: 'Regarde de près', whole: 'Vue d’ensemble',
    left: 'Tourner à gauche', right: 'Tourner à droite', size: 'Mesure de l’angle', of: 'sur',
    clean: 'Juste du premier coup.', slipped: 'Juste au deuxième essai.', helped: 'Montré. Regarde comment il est posé.',
    placeCentre: 'Pose le centre du rapporteur sur le sommet de l’angle.',
    placeLine: 'Tourne le rapporteur pour que sa ligne du 0 soit sur un côté, l’autre côté sous l’échelle.',
    scale: (x, kind) => `Tu as lu l’autre échelle. Cet angle est ${kind}, donc il ne peut pas mesurer ${x}°. Pars du 0 qui est sur le côté et compte.`,
    inside: (i) => `${i}° est l’angle à l’intérieur. L’angle marqué fait le grand tour : 360° − ${i}° = ?`,
    ten: 'Presque : vérifie les dizaines. Compte 10, 20, 30… à partir du 0 sur le côté.',
    tick: 'Tout près. Chaque petit trait vaut 1°.',
    other: 'Pas encore. Trouve le 0 sur le côté, puis compte jusqu’à l’autre côté.',
    acute: 'aigu (moins de 90°)', obtuse: 'obtus (plus de 90°)',
    none: 'Pas encore d’angles', back: 'Retour à l’unité',
  },
}

/** Name what went wrong with a typed answer. */
function diagnose(item, value, placed) {
  const { inside, answer } = angleOf(item)
  if (Math.abs(value - answer) <= 1) return { ok: true }
  if (item.reflex && Math.abs(value - inside) <= 1) return { slip: 'inside' }
  if (!placed.centre) return { slip: 'placeCentre' }
  if (!placed.line) return { slip: 'placeLine' }
  if (!item.reflex && Math.abs(value - (180 - inside)) <= 1) return { slip: 'scale' }
  const off = Math.abs(value - answer)
  if (Math.abs(off - 10) <= 1) return { slip: 'ten' }
  if (off <= 8) return { slip: 'tick' }
  return { slip: 'other' }
}

/** A pointer's place on the board, in the board's own units. */
function boardPoint(svg, e) {
  const pt = svg.createSVGPoint()
  pt.x = e.clientX; pt.y = e.clientY
  const p = pt.matrixTransform(svg.getScreenCTM().inverse())
  return [p.x, p.y]
}

function Board({ item, prot, setProt, done, zoom }) {
  const drag = useRef(null)
  const { inside, from, to } = angleOf(item)
  const V = item.v
  const ends = item.a.map((d) => at(V, ARM, d))
  const down = (e, mode) => {
    if (done) return
    e.preventDefault()
    const el = e.currentTarget.ownerSVGElement
    const [x, y] = boardPoint(el, e)
    drag.current = { mode, dx: prot.x - x, dy: prot.y - y }
    el.setPointerCapture(e.pointerId)
  }
  const move = (e) => {
    const d = drag.current
    if (!d) return
    const [x, y] = boardPoint(e.currentTarget, e)
    if (d.mode === 'move') {
      setProt(snap(item, { ...prot, x: Math.max(0, Math.min(W, x + d.dx)), y: Math.max(0, Math.min(H, y + d.dy)) }))
    } else {
      const rot = norm((Math.atan2(prot.y - y, x - prot.x) * 180) / Math.PI)
      setProt(snap(item, { ...prot, rot }))
    }
  }
  const up = () => { drag.current = null }
  const handle = at([prot.x, prot.y], R + 30, prot.rot)
  const mid = at(V, R * 0.5, from + inside / 2)
  const box = zoom ? [mid[0] - 210, mid[1] - 158, 420, 315] : [0, 0, W, H]
  // The reading, once shown: where the far arm crosses the scale.
  const zeroOnFrom = diff(prot.rot, from) < 0.5
  const readAt = zeroOnFrom ? to : from
  const [rx, ry] = at(V, R * 1.02, readAt)
  const [lx, ly] = at(V, R * 1.2, readAt)
  const letters = item.tri ? [['A', at(V, ARM + 26, item.a[1])], ['B', at(V, 30, from + inside / 2 + 180)], ['C', at(V, ARM + 26, item.a[0])]] : []
  return (
    <svg viewBox={box.map(f1).join(' ')} className="h-full w-full select-none" style={{ touchAction: 'none' }}
      onPointerMove={move} onPointerUp={up} onPointerCancel={up} role="img" aria-label="An angle and a protractor">
      <rect x="-400" y="-400" width={W + 800} height={H + 800} fill="#ffffff" />
      {item.reflex
        ? <path d={sector(V, 46, to, from + 360)} fill="#fde8d2" stroke="#c25e12" strokeWidth="2.5" />
        : <path d={sector(V, 52, from, from + inside)} fill="#dff1fd" stroke={KEY} strokeWidth="2.5" />}
      {letters.map(([name, p]) => (
        <text key={name} x={f1(p[0])} y={f1(p[1] + 9)} fontFamily={FONT} fontSize="26" fontWeight="800" fill={INK} textAnchor="middle">{name}</text>
      ))}
      <g transform={`rotate(${f1(-prot.rot)} ${f1(prot.x)} ${f1(prot.y)})`} onPointerDown={(e) => down(e, 'move')} style={{ cursor: done ? 'default' : 'grab' }}>
        <Protractor cx={prot.x} cy={prot.y} r={R} />
        <line x1={prot.x - R} y1={prot.y} x2={prot.x + R} y2={prot.y} stroke="#5f87ab" strokeWidth="1.6" />
        <circle cx={prot.x} cy={prot.y} r="6.5" fill="none" stroke="#c8102e" strokeWidth="2.2" />
      </g>
      {/* The angle is drawn over the protractor, as it shows through a real one. */}
      <g pointerEvents="none">
        {item.tri && <line x1={f1(ends[0][0])} y1={f1(ends[0][1])} x2={f1(ends[1][0])} y2={f1(ends[1][1])} stroke={INK} strokeWidth="3.5" strokeLinecap="round" />}
        {ends.map((p, i) => <line key={i} x1={V[0]} y1={V[1]} x2={f1(p[0])} y2={f1(p[1])} stroke={INK} strokeWidth="3.5" strokeLinecap="round" />)}
        <circle cx={V[0]} cy={V[1]} r="5" fill={INK} />
      </g>
      {!done && (
        <g onPointerDown={(e) => down(e, 'turn')} style={{ cursor: 'grab' }}>
          <circle cx={f1(handle[0])} cy={f1(handle[1])} r="30" fill="transparent" />
          <circle cx={f1(handle[0])} cy={f1(handle[1])} r="17" fill={KEY} stroke="#ffffff" strokeWidth="3" />
          <path d={`M ${f1(handle[0] - 7)} ${f1(handle[1] + 3)} a 7.5 7.5 0 1 1 5 5.6`} fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" />
        </g>
      )}
      {done && (
        <g>
          <line x1={V[0]} y1={V[1]} x2={f1(rx)} y2={f1(ry)} stroke={GREEN} strokeWidth="3.5" strokeLinecap="round" />
          <rect x={f1(lx - 40)} y={f1(ly - 20)} width="80" height="40" rx="12" fill={GREEN} />
          <text x={f1(lx)} y={f1(ly + 8)} fontFamily={FONT} fontSize="24" fontWeight="900" fill="#ffffff" textAnchor="middle">{inside}°</text>
        </g>
      )}
    </svg>
  )
}

function Item({ item, t, head, onScore, onNext, isLast }) {
  const [prot, setProt] = useState(() => home(item))
  const [value, setValue] = useState('')
  const [msg, setMsg] = useState(null)
  const [tries, setTries] = useState(0)
  const [result, setResult] = useState(null) // 'clean' | 'slipped' | 'helped'
  const [zoom, setZoom] = useState(false)
  const { inside, from, answer } = angleOf(item)
  const placed = placement(item, prot)
  const kind = inside < 90 ? t.acute : t.obtuse

  const reveal = (how) => {
    setProt({ x: item.v[0], y: item.v[1], rot: norm(from) })
    setResult(how)
    setMsg(null)
    onScore(how === 'helped' ? 0.5 : 1)
  }
  const check = () => {
    const n = Number(String(value).replace(',', '.').replace('°', '').trim())
    if (!String(value).trim() || !Number.isFinite(n)) return
    const d = diagnose(item, n, placed)
    if (d.ok) return reveal(tries ? 'slipped' : 'clean')
    if (tries >= 1) return reveal('helped')
    setTries(tries + 1)
    setMsg(d.slip === 'scale' ? t.scale(n, kind) : d.slip === 'inside' ? t.inside(inside) : t[d.slip])
  }
  const turn = (by) => setProt(snap(item, { ...prot, rot: prot.rot + by }))
  const ask = item.reflex ? t.askReflex : item.tri ? t.askTri : t.ask

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-5 lg:items-start">
      <div className="rounded-2xl border-2 bg-white shadow-sm overflow-hidden min-w-0" style={{ borderColor: KEY }}>
        {head}
        <div className="relative aspect-[4/3] w-full bg-white">
          <Board item={item} prot={prot} setProt={setProt} done={!!result} zoom={zoom} />
          <div className="absolute left-2 bottom-2 flex gap-1.5">
            {!result && [[t.left, RotateCcw, 5], [t.right, RotateCw, -5]].map(([label, Icon, by]) => (
              <button key={label} type="button" onClick={() => turn(by)} aria-label={label} title={label}
                className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-slate-200 bg-white/90 text-slate-600 active:translate-y-px">
                <Icon className="h-5 w-5" strokeWidth={2.6} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setZoom(!zoom)}
            className="absolute right-2 bottom-2 flex items-center gap-1 px-2.5 py-2 rounded-lg bg-white/90 border-2 border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600">
            {zoom ? <ZoomOut className="w-3.5 h-3.5" strokeWidth={3} /> : <ZoomIn className="w-3.5 h-3.5" strokeWidth={3} />} {zoom ? t.whole : t.closer}
          </button>
        </div>
      </div>

      <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
        {!result && (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4">
            <p className="text-xl font-black text-slate-800 dark:text-slate-100 leading-snug">{ask}</p>
            <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">{t.how}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <input value={value} onChange={(e) => { setValue(e.target.value); setMsg(null) }} onKeyDown={(e) => { if (e.key === 'Enter') check() }}
                inputMode="numeric" autoComplete="off" spellCheck={false} placeholder="?" aria-label={t.size}
                className="w-28 px-2 py-2 rounded-xl border-2 border-b-[4px] border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-mono font-black text-2xl text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#1cb0f6]" />
              <span className="text-2xl font-black text-slate-500">°</span>
              <button type="button" onClick={check} disabled={!String(value).trim()} className={`ml-auto px-5 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{t.check}</button>
            </div>
            {msg && <p role="alert" className="mt-3 rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/30 p-3 text-sm font-bold text-rose-700 dark:text-rose-200">{msg}</p>}
            <div className="mt-3 flex justify-end">
              <button type="button" onClick={() => reveal('helped')} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-amber-300 dark:border-amber-700 text-[11px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.show}
              </button>
            </div>
          </div>
        )}
        {result && (
          <div className="rounded-2xl border-2 shadow-sm overflow-hidden" style={{ borderColor: result === 'helped' ? AMBER : GREEN }}>
            <div className="px-4 py-2.5 flex items-center gap-3 text-white" style={{ backgroundColor: result === 'helped' ? AMBER : GREEN }}>
              {result === 'helped' ? <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-5 h-5 shrink-0" strokeWidth={2.5} />}
              <div className="font-black">{t[result]}</div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4">
              <div className="rounded-xl border-2 p-3 font-mono font-black text-2xl text-slate-900 dark:text-slate-100" style={{ borderColor: KEY, backgroundColor: 'rgba(28,176,246,0.08)' }}>
                {item.reflex ? `360° − ${inside}° = ${answer}°` : `${answer}°`}
              </div>
              <div className="mt-3 flex justify-end">
                <button type="button" onClick={onNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: KEY, borderColor: KEY_DARK }}>
                  {isLast ? t.finish : t.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProtractorTask({ pool, savedData = {}, onComplete, onProgress, onQuit, langs }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => it?.id && it.v && it.a), [pool])
  const { lang, toggleLang } = useLang({ langs })
  const [results, setResults] = useState(() => Object.fromEntries(Object.entries(savedData || {}).map(([k, v]) => [k, Number(v) || 0])))
  const [pos, setPos] = useState(() => Math.max(0, items.findIndex((it) => savedData?.[it.id] == null)))
  const t = T[lang] || T.en
  const item = items[pos]

  if (!item) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{t.none}</h2>
        <button type="button" onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: KEY, borderColor: KEY_DARK }}>{t.back}</button>
      </div>
    )
  }
  const report = (res) => {
    const blob = Object.fromEntries(items.filter((it) => res[it.id] != null).map((it) => [it.id, res[it.id]]))
    const raw = (10 * items.reduce((s, it) => s + (res[it.id] || 0), 0)) / items.length
    return [raw, blob]
  }
  const record = (value) => {
    // An angle done before keeps its better mark.
    const next = { ...results, [item.id]: Math.max(results[item.id] || 0, value) }
    setResults(next)
    onProgress?.(...report(next))
  }
  const finish = () => onComplete?.(...report(results))
  const isLast = pos === items.length - 1
  const earned = items.reduce((s, it) => s + (results[it.id] || 0), 0)
  const head = (
    <div className="px-4 py-2 text-white flex items-center gap-3" style={{ backgroundColor: KEY }}>
      <div className="text-[11px] font-black uppercase tracking-widest">{tr(lang, 'Angle', null, 'Angle')} {pos + 1} {t.of} {items.length}</div>
      <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-90 whitespace-nowrap">{earned % 1 === 0 ? earned : earned.toFixed(1)} / {items.length}</div>
    </div>
  )
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={onQuit} modeTitle={t.title} current={pos + 1} total={items.length}
        lang={toggleLang ? lang : undefined} onLangToggle={toggleLang} />
      <Item key={item.id} item={item} t={t} head={head} onScore={record} onNext={() => (isLast ? finish() : setPos(pos + 1))} isLast={isLast} />
    </div>
  )
}

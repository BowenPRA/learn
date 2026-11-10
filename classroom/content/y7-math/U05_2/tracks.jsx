// content/y7-math/U05_2/tracks.jsx
// A line across two parallel lines: the model and the game of 5.2.
//
//   CrossTracks  The model the class predicts before each press. Two parallel
//                lines and a line across them; the top four angles are
//                written on, the bottom four are ? until the copy lands. Turn
//                the line and say the bottom four first: they copy the top
//                four, every time. Slide it down: the top crossing
//                moves down the line and fits the bottom one exactly, which is
//                WHY corresponding angles are equal. Make them not parallel:
//                the arrows go, the bottom angles change, and the slide no
//                longer fits (the Workbook's Challenge 8 and 10).
//
//   EqualOrNot   A game for the whole class, standing. Two angles are marked:
//                one we know (orange) and one with a ? (blue). Arms up: equal.
//                Arms down: not equal. Show the answer checks it and says the
//                reason as a sentence, with the X, F or Z drawn in. Eight
//                rounds in a fixed order (round 3 is the trap: no arrows),
//                then random ones.
//
// Both draw one SVG stage (a showcase gives a short, wide box) and keep only
// the buttons as HTML: the house Btn from the Models deck, the arms figure
// from Tides. EN/FR through tr(lang, en, null, fr).
import { useState, useRef, useEffect } from 'react'
import { RotateCw, RotateCcw, ArrowDown, Slash, Eye, ChevronRight } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { mulberry32 } from '../../y7-science/U03_models/data.js'
import { Btn } from '../../y7-science/U03_models/ui.jsx'
import { ArmsFigure } from '../../y7-science/U03_4/bodies.jsx'
import { at, f1, norm, meet, sector, labelR, chevron, through } from './lines.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', KEY = '#c25e12', MUTED = '#5b6770', RULE = '#d5dbe1'
const TEAL = '#0087a8', BLUE = '#1a5fa8', PURPLE = '#5c2483', GREEN = '#4a8b23', GREEN_DARK = '#3d731c', RED = '#c8102e'
const ORANGE_T = '#fdf1e3', TEAL_T = '#e2f2f6', BLUE_T = '#e3eef9', PURPLE_T = '#f2ecf7', GREEN_T = '#eef6e6'

// The four angles where a line along `along` meets a line along `cross`
// (0 < cross − along < 180), anticlockwise from the first line's own
// direction: [start, end, size].
function fourAngles(along, cross) {
  const s = norm(cross - along)
  return [
    [along, along + s, s],
    [along + s, along + 180, 180 - s],
    [along + 180, along + 180 + s, s],
    [along + 180 + s, along + 360, 180 - s],
  ]
}

/* ============================================================= *
 * 1 · CROSS THE TRACKS — turn it, slide it, bend it
 * ============================================================= */
const TURNS = [60, 75, 90, 110, 130, 45]
const C = [935, 270] // the line across turns about this point
const TOP = [935, 165]
const BOT = [935, 375]
const BEND = -11 // degrees: the bottom line, made not parallel
const SLIDE_SECONDS = 1.3

function classColours(size) {
  if (size === 90) return [GREEN_T, GREEN]
  return size < 90 ? [ORANGE_T, KEY] : [TEAL_T, TEAL]
}

export function CrossTracks({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0)
  const [bent, setBent] = useState(false)
  const [slide, setSlide] = useState(0) // 0 → 1 as the copy moves down
  const [moving, setMoving] = useState(false)
  const live = useRef({ slide: 0, moving: false })
  useEffect(() => { Object.assign(live.current, { slide, moving }) })

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const S = live.current
      if (!S.moving) return
      let s = S.slide + dt / SLIDE_SECONDS
      if (s >= 1) {
        s = 1
        S.moving = false
        setMoving(false)
      }
      S.slide = s
      setSlide(s)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const big = isDisplayMode
  const th = TURNS[k]
  const phi = bent ? BEND : 0
  const P1 = meet(C, th, TOP, 0)
  const P2 = meet(C, th, BOT, phi)
  const top = fourAngles(0, th)
  const bottom = fourAngles(phi, th)
  const crossLen = Math.min(268, 250 / Math.abs(Math.sin((th * Math.PI) / 180)))
  const ease = slide < 0.5 ? 2 * slide * slide : 1 - 2 * (1 - slide) ** 2
  const gx = (P2[0] - P1[0]) * ease
  const gy = (P2[1] - P1[1]) * ease
  const done = slide >= 1

  const reset = (fn) => { live.current.moving = false; live.current.slide = 0; setMoving(false); setSlide(0); fn() }

  // `hide`: a grey ? until the copy lands, so the class says the number first
  const angles = (P, list, tone, hide = false) => list.map(([a1, a2, size], i) => {
    const [fill, stroke] = hide ? ['#f1f4f7', MUTED] : tone || classColours(size)
    const [lx, ly] = at(P, labelR(size, 32, 84, 118), (a1 + a2) / 2)
    return (
      <g key={i}>
        <path d={sector(P, 52, a1, a2)} fill={fill} stroke={stroke} strokeWidth="3" />
        <text x={f1(lx)} y={f1(ly + 11)} fontFamily={FONT} fontSize="31" fontWeight="900" fill={stroke} textAnchor="middle">{hide ? '?' : `${size}°`}</text>
      </g>
    )
  })

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />

          {/* what the lines are, and what the slide showed */}
          <text x="40" y="66" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, 'The two lines are', 'Les deux droites sont')}</text>
          <text x="40" y="120" fontFamily={FONT} fontSize={bent ? 36 : 44} fontWeight="900" fill={bent ? RED : GREEN_DARK}>
            {bent ? t(lang, 'NOT PARALLEL', 'PAS PARALLÈLES') : t(lang, 'PARALLEL', 'PARALLÈLES')}
          </text>
          <text x="40" y="160" fontFamily={FONT} fontSize="23" fontWeight="700" fill={MUTED}>
            {bent ? t(lang, 'No arrows on them.', 'Pas de flèches.') : t(lang, 'See the arrows?', 'Tu vois les flèches ?')}
          </text>
          {done && (
            <g>
              <rect x="40" y="208" width="330" height="128" rx="16" fill={bent ? '#fbe9ec' : GREEN_T} stroke={bent ? RED : GREEN_DARK} strokeWidth="3" />
              <text x="205" y="258" fontFamily={FONT} fontSize="32" fontWeight="900" fill={bent ? RED : GREEN_DARK} textAnchor="middle">
                {bent ? t(lang, 'It does not fit.', 'Ça ne colle pas.') : t(lang, 'It fits!', 'Ça colle !')}
              </text>
              <text x="205" y="306" fontFamily={FONT} fontSize="24" fontWeight="800" fill={INK} textAnchor="middle">
                {bent ? t(lang, 'Different angles.', 'Angles différents.') : t(lang, 'Same place, same angle.', 'Même place, même angle.')}
              </text>
            </g>
          )}

          {/* the two lines and the line across them */}
          <line {...through(TOP, 520, 0)} stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <line {...through(BOT, 520, phi)} stroke={INK} strokeWidth="5" strokeLinecap="round" />
          {!bent && <path d={chevron(1392, TOP[1], 0)} fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
          {!bent && <path d={chevron(1392, BOT[1], 0)} fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
          {angles(P1, top)}
          {angles(P2, bottom, bent ? [PURPLE_T, PURPLE] : null, !done)}
          <line {...through(C, crossLen, th)} stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <circle cx={f1(P1[0])} cy={f1(P1[1])} r="6" fill={INK} />
          <circle cx={f1(P2[0])} cy={f1(P2[1])} r="6" fill={INK} />

          {/* the copy of the top crossing, sliding down the line */}
          {(moving || done) && (
            <g transform={`translate(${f1(gx)} ${f1(gy)})`} opacity="0.9">
              <line {...through(P1, 150, 0)} stroke={BLUE} strokeWidth="6" strokeDasharray="14 10" strokeLinecap="round" />
              <line {...through(P1, 150, th)} stroke={BLUE} strokeWidth="6" strokeDasharray="14 10" strokeLinecap="round" />
              {top.map(([a1, a2], i) => (
                <path key={i} d={sector(P1, 52, a1, a2)} fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="2.5" strokeDasharray="6 5" />
              ))}
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="orange" icon={RotateCw} disabled={moving} onClick={() => reset(() => setK((v) => (v + 1) % TURNS.length))}>{t(lang, 'Turn the line', 'Tourne la droite')}</Btn>
        <Btn big={big} tone="blue" icon={ArrowDown} disabled={moving || done} onClick={() => setMoving(true)}>{t(lang, 'Slide it down', 'Fais-la glisser')}</Btn>
        <Btn big={big} tone="purple" icon={Slash} disabled={moving} onClick={() => reset(() => setBent((b) => !b))}>
          {bent ? t(lang, 'Make them parallel', 'Rends-les parallèles') : t(lang, 'Make them not parallel', 'Rends-les non parallèles')}
        </Btn>
        <Btn big={big} tone="slate" icon={RotateCcw} disabled={moving || (k === 0 && !bent && slide === 0)} onClick={() => reset(() => { setK(0); setBent(false) })}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

/* ============================================================= *
 * 2 · EQUAL OR NOT? — arms up, arms down
 * ============================================================= */
// kind 'x': two lines crossing (line A along a, line B along a + th).
// kind 'pair': two lines along a (the second turned by `bend` when they are
// not parallel) and a line across them along a + th. `g` is the angle we know
// and `q` the one asked about, each [crossing, angle] — crossing 0 is the
// first line, 1 the second; angles 0–3 run anticlockwise from the line's own
// direction, so 2 and 3 lie between the lines at crossing 0, and 0 and 1 lie
// between them at crossing 1.
// The fixed rounds draw their shape the way slides 12, 15 and 17 do: an
// upright F (angles under each arm) and a Z that is not mirrored.
const ROUNDS = [
  { kind: 'x', a: 20, th: 65, g: [0, 0], q: [0, 2] }, // opposite: equal
  { kind: 'pair', a: 0, th: 110, g: [0, 3], q: [1, 3] }, // corresponding: equal (70°)
  { kind: 'pair', a: 0, th: 110, bend: 12, g: [0, 3], q: [1, 3] }, // the trap: no arrows (82°)
  { kind: 'pair', a: 0, th: 55, g: [0, 2], q: [1, 0] }, // alternate: equal
  { kind: 'x', a: 0, th: 65, g: [0, 0], q: [0, 1] }, // next to it on a line: 180°
  { kind: 'pair', a: 0, th: 70, g: [0, 2], q: [1, 1] }, // between the lines, same side: 180°
  { kind: 'pair', a: 0, th: 60, bend: 12, g: [0, 2], q: [1, 0] }, // a Z with no arrows
  { kind: 'pair', a: 30, th: 75, g: [0, 3], q: [1, 3] }, // corresponding, turned round (105°)
]

function randomRound(n) {
  const rnd = mulberry32(5200 + n)
  const pick = (list) => list[Math.floor(rnd() * list.length)]
  const th = pick([50, 55, 60, 65, 70, 75, 105, 110, 115, 120, 125, 130])
  const a = pick([0, 0, 15, -15, 25, -25])
  const type = pick(['opp', 'adj', 'corr', 'alt', 'coint', 'corrTrap', 'altTrap'])
  const w = Math.floor(rnd() * 4)
  const flip = rnd() < 0.5
  const pair = (g, q, bend) => ({ kind: 'pair', a, th, bend, g: flip ? q : g, q: flip ? g : q })
  const alt = rnd() < 0.5 ? [[0, 2], [1, 0]] : [[0, 3], [1, 1]]
  const co = rnd() < 0.5 ? [[0, 2], [1, 1]] : [[0, 3], [1, 0]]
  const bend = rnd() < 0.5 ? 12 : -12
  switch (type) {
    case 'opp': return { kind: 'x', a, th, g: [0, w], q: [0, (w + 2) % 4] }
    case 'adj': return { kind: 'x', a, th, g: [0, w], q: [0, (w + 1) % 4] }
    case 'corr': return pair([0, w], [1, w])
    case 'alt': return pair(...alt)
    case 'coint': return pair(...co)
    case 'corrTrap': return pair([0, w], [1, w], bend)
    default: return pair(...alt, bend)
  }
}
const roundAt = (n) => (n < ROUNDS.length ? ROUNDS[n] : randomRound(n))

const MID = [350, 280] // the middle of the picture
const GAP = 112 // half the distance between the two lines

// Everything about one round: where the lines go, the eight angles, and how
// the two marked angles are related.
function layoutRound(r) {
  const beta = r.a + r.th
  if (r.kind === 'x') {
    const A = fourAngles(r.a, beta)
    return {
      lines: [{ P: MID, d: r.a, len: 270 }, { P: MID, d: beta, len: 270 }],
      arrows: [],
      at: [MID],
      angles: [A],
      rel: (r.q[1] - r.g[1] + 4) % 2 === 0 ? 'opp' : 'adj',
    }
  }
  const parallel = !r.bend
  const L1 = at(MID, GAP, r.a + 90)
  const L2 = at(MID, GAP, r.a - 90)
  const d2 = r.a + (r.bend || 0)
  const P1 = meet(MID, beta, L1, r.a)
  const P2 = meet(MID, beta, L2, d2)
  let rel
  const [gc, gw] = r.g
  const [qc, qw] = r.q
  if (gc === qc) rel = (qw - gw + 4) % 2 === 0 ? 'opp' : 'adj'
  else {
    const [w0, w1] = gc === 0 ? [gw, qw] : [qw, gw] // crossing 0's angle, crossing 1's angle
    if (w0 === w1) rel = 'corr'
    else if ((w0 === 2 && w1 === 0) || (w0 === 3 && w1 === 1)) rel = 'alt'
    else if ((w0 === 2 && w1 === 1) || (w0 === 3 && w1 === 0)) rel = 'coint'
    else rel = 'other'
    if (!parallel) rel = 'notpar'
  }
  return {
    lines: [{ P: L1, d: r.a, len: 300 }, { P: L2, d: d2, len: 300 }, { P: MID, d: beta, len: 252 }],
    arrows: parallel ? [at(L1, 238, r.a), at(L2, 238, r.a)] : [],
    arrowDir: r.a,
    at: [P1, P2],
    angles: [fourAngles(r.a, beta), fourAngles(d2, beta)],
    rel,
  }
}

const EQUAL = new Set(['opp', 'corr', 'alt'])

// The X, F or Z that shows why two angles are equal, as a list of paths.
function shapeFor(r, L) {
  const [gc, gw] = r.g
  const qw = r.q[1]
  const P = L.at
  const beta = r.a + r.th
  const seg = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'} ${f1(p[0])} ${f1(p[1])}`).join(' ')
  if (L.rel === 'opp') {
    const c = P[gc]
    const d1 = r.kind === 'x' ? r.a : (gc === 0 ? r.a : r.a + (r.bend || 0))
    return [seg([at(c, 135, d1 + 180), at(c, 135, d1)]), seg([at(c, 135, beta + 180), at(c, 135, beta)])]
  }
  // the two rays that make angle w at a crossing: [the line's ray, the ray along the line across]
  const rays = (w) => [[r.a, beta], [r.a + 180, beta], [r.a + 180, beta + 180], [r.a, beta + 180]][w]
  if (L.rel === 'corr') {
    const [v, u] = rays(gw)
    const ux = Math.cos((u * Math.PI) / 180), uy = -Math.sin((u * Math.PI) / 180)
    const along = (p) => p[0] * ux + p[1] * uy
    const [near, far] = along(P[0]) < along(P[1]) ? [P[0], P[1]] : [P[1], P[0]]
    return [seg([at(near, 140, v), near, far, at(far, 80, u)]), seg([far, at(far, 140, v)])]
  }
  if (L.rel === 'alt') {
    const w0 = gc === 0 ? gw : qw
    const v = rays(w0)[0]
    return [seg([at(P[0], 140, v), P[0], P[1], at(P[1], 140, v + 180)])]
  }
  return []
}

const REASONS = {
  opp: ['Equal, because they are vertically opposite angles.', 'Égaux, car ils sont opposés par le sommet.'],
  corr: ['Equal, because they are corresponding angles.', 'Égaux, car ce sont des angles correspondants.'],
  alt: ['Equal, because they are alternate angles.', 'Égaux, car ce sont des angles alternes-internes.'],
  adj: ['Not equal: together they make 180°.', 'Pas égaux : ensemble, ils font 180°.'],
  coint: ['Not equal: together they make 180°.', 'Pas égaux : ensemble, ils font 180°.'],
  other: ['Not equal: together they make 180°.', 'Pas égaux : ensemble, ils font 180°.'],
  notpar: ['Not equal: the lines are not parallel.', 'Pas égaux : les droites ne sont pas parallèles.'],
}

export function EqualOrNot({ lang = 'en', isDisplayMode = false }) {
  const [n, setN] = useState(0)
  const [shown, setShown] = useState(false)
  const big = isDisplayMode
  const r = roundAt(n)
  const L = layoutRound(r)
  const equal = EQUAL.has(L.rel)
  const [gStart, gEnd, gSize] = L.angles[r.g[0]][r.g[1]]
  const [qStart, qEnd, qSize] = L.angles[r.q[0]][r.q[1]]
  const gP = L.at[r.g[0]]
  const qP = L.at[r.q[0]]
  const [gx, gy] = at(gP, labelR(gSize, 30, 84, 118), (gStart + gEnd) / 2)
  const [qx, qy] = at(qP, labelR(qSize, 30, 84, 118), (qStart + qEnd) / 2)
  const verdict = equal ? GREEN_DARK : RED
  const next = () => { setN((v) => v + 1); setShown(false) }

  const card = (x, up) => {
    const right = shown && up === equal
    const fade = shown && up !== equal
    return (
      <g opacity={fade ? 0.3 : 1}>
        <rect x={x} y="150" width="350" height="250" rx="20" fill={right ? GREEN_T : '#f7fafc'} stroke={right ? GREEN_DARK : RULE} strokeWidth={right ? 6 : 3} />
        <ArmsFigure x={x + 175} y={250} up={up} color={up ? BLUE : KEY} s={0.95} />
        <text x={x + 175} y="342" fontFamily={FONT} fontSize="30" fontWeight="900" fill={up ? BLUE : KEY} textAnchor="middle">{up ? t(lang, 'ARMS UP', 'BRAS EN HAUT') : t(lang, 'ARMS DOWN', 'BRAS EN BAS')}</text>
        <text x={x + 175} y="380" fontFamily={FONT} fontSize="26" fontWeight="700" fill={INK} textAnchor="middle">{up ? t(lang, 'equal', 'égaux') : t(lang, 'not equal', 'pas égaux')}</text>
        {right && (
          <g>
            <circle cx={x + 318} cy="182" r="22" fill={GREEN_DARK} />
            <path d={`M ${x + 306} 182 l 8 8 l 14 -16`} stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </g>
    )
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 540" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="540" rx="16" fill="#ffffff" />

          {/* the picture */}
          {shown && equal && shapeFor(r, L).map((d, i) => (
            <path key={i} d={d} fill="none" stroke={GREEN} strokeWidth="16" strokeOpacity="0.32" strokeLinecap="round" strokeLinejoin="round" />
          ))}
          {L.lines.map((l, i) => <line key={i} {...through(l.P, l.len, l.d)} stroke={INK} strokeWidth="5" strokeLinecap="round" />)}
          {L.arrows.map((p, i) => (
            <path key={i} d={chevron(p[0], p[1], L.arrowDir)} fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          ))}
          <path d={sector(gP, 52, gStart, gEnd)} fill={ORANGE_T} stroke={KEY} strokeWidth="3.5" />
          <path d={sector(qP, 52, qStart, qEnd)} fill={BLUE_T} stroke={shown ? verdict : BLUE} strokeWidth={shown ? 5 : 3.5} />
          <text x={f1(gx)} y={f1(gy + 11)} fontFamily={FONT} fontSize="32" fontWeight="900" fill={KEY} textAnchor="middle">{gSize}°</text>
          <text x={f1(qx)} y={f1(qy + 12)} fontFamily={FONT} fontSize={shown ? 32 : 40} fontWeight="900" fill={shown ? verdict : BLUE} textAnchor="middle">{shown ? `${qSize}°` : '?'}</text>

          {/* the question and the two answers */}
          <text x="720" y="62" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, `Round ${n + 1}`, `Manche ${n + 1}`)}</text>
          <text x="720" y="112" fontFamily={FONT} fontSize="32" fontWeight="900" fill={INK}>
            {t(lang, 'Is ', 'Le ')}<tspan fill={BLUE}>?</tspan>{t(lang, ` equal to ${gSize}°?`, ` est-il égal à ${gSize}°\u00a0?`)}
          </text>
          {card(720, true)}
          {card(1100, false)}
          <text x="720" y="456" fontFamily={FONT} fontSize="25" fontWeight="900" fill={shown ? verdict : MUTED}>
            {shown
              ? t(lang, REASONS[L.rel][0], REASONS[L.rel][1])
              : t(lang, 'Everyone answers at once. Wrong? Sit down.', 'Tout le monde répond en même temps. Faux ? Assieds-toi.')}
          </text>
          <path d={sector([732, 500], 18, 0, 70)} fill={ORANGE_T} stroke={KEY} strokeWidth="3" />
          <text x="762" y="507" fontFamily={FONT} fontSize="21" fontWeight="700" fill={INK}>{t(lang, 'we know it', 'on le connaît')}</text>
          <path d={sector([1012, 500], 18, 0, 70)} fill={BLUE_T} stroke={BLUE} strokeWidth="3" />
          <text x="1042" y="507" fontFamily={FONT} fontSize="21" fontWeight="700" fill={INK}>{t(lang, 'is it the same?', 'est-il pareil ?')}</text>
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="teal" icon={Eye} disabled={shown} onClick={() => setShown(true)}>{t(lang, 'Show the answer', 'Montrer la réponse')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} onClick={next}>{t(lang, 'Next round', 'Manche suivante')}</Btn>
        <Btn big={big} tone="slate" icon={RotateCcw} disabled={n === 0 && !shown} onClick={() => { setN(0); setShown(false) }}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

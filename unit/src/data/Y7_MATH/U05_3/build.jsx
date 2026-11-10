// src/data/Y7_MATH/U05_3/build.jsx — ported from the classroom deck content/y7-math/U05_3/build.jsx.
// DRAW IT, ONE STEP AT A TIME — the construction steppers. In self-study: say the
// next step before each press, then press to check it.
//
//   BuildSquare  a square with sides of 5 cm: AB, a right angle at A, 5 cm up,
//                the same at B, join, check, then the diagonal AC — the one
//                the starter asked about (slide 10 gives its length).
//   BuildQuad    a quadrilateral from a sketch (the Workbook's Practice 6 and
//                Focus 3 kind): the sketch stays on the left; AB 6 cm, 80° at
//                A, AD 4 cm, 110° at B (read from the scale with 0 on BA), BC
//                5 cm, join, measure C and D, check the sum is 360°.
//
// One SVG stage, buttons in HTML. 1 cm is drawn as 52 px (square) or 60 px.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../utils/lang'
import { Btn } from './ui.jsx'
import { at, f1, sector } from './lines.js'
import { Protractor } from './protractor.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', KEY = '#c25e12', MUTED = '#5b6770', BLUE = '#1a5fa8', GREEN_DARK = '#3d731c'
const ORANGE_T = '#fdf1e3', GREEN_T = '#eef6e6'

/** A ruler lying along a line from (x, y): 'h' runs right under it, 'v' runs up beside it. */
function Ruler({ x, y, cm, s, dir = 'h' }) {
  const marks = []
  for (let mm = 0; mm <= cm * 10; mm++) {
    const d = (mm * s) / 10
    const len = mm % 10 === 0 ? 16 : mm % 5 === 0 ? 11 : 6
    if (dir === 'h') marks.push(<line key={mm} x1={x + d} y1={y + 10} x2={x + d} y2={y + 10 + len} stroke="#8a6d12" strokeWidth={mm % 10 === 0 ? 2 : 1} />)
    else marks.push(<line key={mm} x1={x - 10} y1={y - d} x2={x - 10 - len} y2={y - d} stroke="#8a6d12" strokeWidth={mm % 10 === 0 ? 2 : 1} />)
  }
  const nums = Array.from({ length: cm + 1 }, (_, k) => k)
  return dir === 'h' ? (
    <g>
      <rect x={x - 16} y={y + 8} width={cm * s + 32} height="46" rx="6" fill="#fbe7a1" fillOpacity="0.92" stroke="#c9a227" strokeWidth="2" />
      {marks}
      {nums.map((k) => <text key={k} x={x + k * s} y={y + 46} fontFamily={FONT} fontSize="15" fontWeight="700" fill="#6b5410" textAnchor="middle">{k}</text>)}
    </g>
  ) : (
    <g>
      <rect x={x - 54} y={y - cm * s - 16} width="46" height={cm * s + 32} rx="6" fill="#fbe7a1" fillOpacity="0.92" stroke="#c9a227" strokeWidth="2" />
      {marks}
      {nums.map((k) => <text key={k} x={x - 40} y={y - k * s + 5} fontFamily={FONT} fontSize="15" fontWeight="700" fill="#6b5410" textAnchor="middle">{k}</text>)}
    </g>
  )
}

const Pt = ({ p, label, dx = 0, dy = 0, color = INK }) => (
  <g>
    <circle cx={f1(p[0])} cy={f1(p[1])} r="6" fill={color} />
    <text x={f1(p[0] + dx)} y={f1(p[1] + dy)} fontFamily={FONT} fontSize="30" fontWeight="900" fill={color} textAnchor="middle">{label}</text>
  </g>
)
const Seg = ({ a, b, w = 5, color = INK, dash }) => (
  <line x1={f1(a[0])} y1={f1(a[1])} x2={f1(b[0])} y2={f1(b[1])} stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash} />
)
function Corner({ p, d, s = 22 }) {
  const [ax, ay] = at(p, s, d)
  const [bx, by] = at(p, s * Math.SQRT2, d + 45)
  const [cx, cy] = at(p, s, d + 90)
  return <path d={`M ${f1(ax)} ${f1(ay)} L ${f1(bx)} ${f1(by)} L ${f1(cx)} ${f1(cy)}`} fill="none" stroke={INK} strokeWidth="2.5" />
}

// The 0 to count up from, ringed on the protractor's edge.
function Zero({ p, side }) {
  const [x, y] = at(p, 128, side === 'right' ? 7 : 173)
  return (
    <g>
      <circle cx={f1(x)} cy={f1(y)} r="17" fill="#ffffff" stroke={KEY} strokeWidth="3.5" />
      <text x={f1(x)} y={f1(y + 8)} fontFamily={FONT} fontSize="22" fontWeight="900" fill={KEY} textAnchor="middle">0</text>
    </g>
  )
}

function Stage({ lang, k, steps, children, side }) {
  const lines = lang === 'fr' ? steps[k][1] : steps[k][0]
  return (
    <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />
      <text x="40" y="62" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, `Step ${k + 1} of ${steps.length}`, `Étape ${k + 1} sur ${steps.length}`)}</text>
      {lines.map((line, i) => (
        <text key={i} x="40" y={118 + i * 44} fontFamily={FONT} fontSize="31" fontWeight="900" fill={INK}>{line}</text>
      ))}
      {side}
      {children}
    </svg>
  )
}

function Buttons({ lang, k, setK, last }) {
  return (
    <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
      <Btn tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
      <Btn tone="orange" icon={ChevronRight} disabled={k === last} onClick={() => setK((v) => Math.min(last, v + 1))}>{t(lang, 'Next step', 'Étape suivante')}</Btn>
      <Btn tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
    </div>
  )
}

/* ============================================================= *
 * 1 · A SQUARE WITH SIDES OF 5 CM
 * ============================================================= */
const SQ = { s: 52, A: [780, 440], B: [1040, 440], C: [1040, 180], D: [780, 180] }
const SQUARE_STEPS = [
  [['Draw AB = 5 cm', 'with a ruler.'], ['Trace AB = 5 cm', 'avec une règle.']],
  [['Protractor on A:', 'the centre on A,', '0 on the line AB.'], ['Le rapporteur sur A :', 'le centre sur A,', 'le 0 sur la droite AB.']],
  [['Mark 90°.', 'Join A to the mark.'], ['Marque 90°.', 'Relie A à la marque.']],
  [['Measure 5 cm up', 'the line. Mark D.'], ['Mesure 5 cm sur', 'la droite. Marque D.']],
  [['Do the same at B:', '90°, then 5 cm.', 'Mark C.'], ['Pareil en B :', '90°, puis 5 cm.', 'Marque C.']],
  [['Join D to C. Check:', 'four sides of 5 cm,', 'four right angles.'], ['Relie D à C. Vérifie :', 'quatre côtés de 5 cm,', 'quatre angles droits.']],
  [['Measure the diagonal', 'AC. Write it down.'], ['Mesure la diagonale', 'AC. Écris-la.']],
]

export function BuildSquare({ lang = 'en' }) {
  const [k, setK] = useState(0)
  const { s, A, B, C, D } = SQ
  const mark = [A[0], A[1] - 168]
  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <Stage lang={lang} k={k} steps={SQUARE_STEPS}>
          {k === 0 && <Ruler x={A[0]} y={A[1]} cm={6} s={s} />}
          {k >= 2 && <Seg a={A} b={[A[0], 110]} w={3} color={MUTED} />}
          {k >= 4 && <Seg a={B} b={[B[0], 110]} w={3} color={MUTED} />}
          <Seg a={A} b={B} />
          {k >= 3 && <Seg a={A} b={D} />}
          {k >= 4 && <Seg a={B} b={C} />}
          {k >= 5 && <Seg a={D} b={C} />}
          {(k === 1 || k === 2) && <Protractor cx={A[0]} cy={A[1]} r={150} numbers={false} />}
          {(k === 1 || k === 2) && <Zero p={A} side="right" />}
          {k === 2 && (
            <g>
              <circle cx={mark[0]} cy={mark[1]} r="9" fill={KEY} />
              <text x={mark[0] + 18} y={mark[1] - 10} fontFamily={FONT} fontSize="30" fontWeight="900" fill={KEY}>90°</text>
            </g>
          )}
          {k === 3 && <Ruler x={A[0] - 6} y={A[1]} cm={6} s={s} dir="v" />}
          {k >= 3 && <Corner p={A} d={0} />}
          {k >= 4 && <Corner p={B} d={90} />}
          {k >= 5 && <Corner p={C} d={180} />}
          {k >= 5 && <Corner p={D} d={270} />}
          <Pt p={A} label="A" dx={-26} dy={34} />
          <Pt p={B} label="B" dx={26} dy={34} />
          {k >= 3 && <Pt p={D} label="D" dx={k === 3 ? 28 : -28} dy={-8} />}
          {k >= 4 && <Pt p={C} label="C" dx={28} dy={-8} />}
          {k !== 0 && <text x={(A[0] + B[0]) / 2} y={A[1] + 40} fontFamily={FONT} fontSize="26" fontWeight="800" fill={BLUE} textAnchor="middle">5 cm</text>}
          {/* not while the ruler stands on AD (step 4): it would sit on the ruler */}
          {k >= 4 && <text x={A[0] - 20} y={(A[1] + D[1]) / 2 + 9} fontFamily={FONT} fontSize="26" fontWeight="800" fill={BLUE} textAnchor="end">5 cm</text>}
          {k >= 4 && <text x={B[0] + 20} y={(B[1] + C[1]) / 2 + 9} fontFamily={FONT} fontSize="26" fontWeight="800" fill={BLUE}>5 cm</text>}
          {k >= 5 && <text x={(D[0] + C[0]) / 2} y={D[1] - 18} fontFamily={FONT} fontSize="26" fontWeight="800" fill={BLUE} textAnchor="middle">5 cm</text>}
          {k >= 6 && (
            <g>
              <Seg a={A} b={C} w={5} color={KEY} dash="14 10" />
              <rect x={(A[0] + C[0]) / 2 - 22} y={(A[1] + C[1]) / 2 - 64} width="118" height="44" rx="10" fill="#ffffff" stroke={KEY} strokeWidth="2" />
              <text x={(A[0] + C[0]) / 2 + 37} y={(A[1] + C[1]) / 2 - 33} fontFamily={FONT} fontSize="28" fontWeight="900" fill={KEY} textAnchor="middle">? cm</text>
            </g>
          )}
        </Stage>
      </div>
      <Buttons lang={lang} k={k} setK={setK} last={SQUARE_STEPS.length - 1} />
    </div>
  )
}

/* ============================================================= *
 * 2 · A QUADRILATERAL FROM A SKETCH
 * ============================================================= */
// A(0,0), B(6,0), D: 4 cm at 80°, C: 5 cm from B at 180° − 110° = 70°.
// Then C ≈ 64° and D ≈ 106°, and 80 + 110 + 64 + 106 = 360.
const QS = 60
const QA = [740, 452]
const QB = [QA[0] + 6 * QS, QA[1]]
const QD = at(QA, 4 * QS, 80)
const QC = at(QB, 5 * QS, 70)
const QUAD_STEPS = [
  [['Read the sketch.', 'It is not accurate:', 'draw it again, exactly.'], ['Lis le croquis.', 'Il n’est pas exact :', 'redessine-le exactement.']],
  [['Draw AB = 6 cm.'], ['Trace AB = 6 cm.']],
  [['At A, measure 80°.', 'Draw AD = 4 cm.'], ['En A, mesure 80°.', 'Trace AD = 4 cm.']],
  [['At B, measure 110°:', 'use the 0 on BA.', 'Draw BC = 5 cm.'], ['En B, mesure 110° :', 'prends le 0 sur BA.', 'Trace BC = 5 cm.']],
  [['Join D to C.'], ['Relie D à C.']],
  [['Measure angle C', 'and angle D.'], ['Mesure l’angle C', 'et l’angle D.']],
  [['Check: the four', 'angles add up', 'to 360°.'], ['Vérifie : les quatre', 'angles font', '360° en tout.']],
]

function Sketch({ lang }) {
  // deliberately not to scale, like the Workbook's
  return (
    <g>
      <rect x="40" y="262" width="440" height="232" rx="14" fill="#f7f9fb" stroke="#d5dbe1" strokeWidth="2" />
      <path d="M 100 440 L 380 440 L 420 300 L 140 322 Z" fill="none" stroke={MUTED} strokeWidth="3" strokeLinejoin="round" />
      <path d={sector([100, 440], 30, 0, 80)} fill={ORANGE_T} stroke={KEY} strokeWidth="2" />
      <path d={sector([380, 440], 30, 74, 180)} fill={ORANGE_T} stroke={KEY} strokeWidth="2" />
      <text x="150" y="420" fontFamily={FONT} fontSize="21" fontWeight="800" fill={KEY}>80°</text>
      <text x="318" y="420" fontFamily={FONT} fontSize="21" fontWeight="800" fill={KEY}>110°</text>
      <text x="240" y="470" fontFamily={FONT} fontSize="21" fontWeight="800" fill={BLUE} textAnchor="middle">6 cm</text>
      <text x="410" y="386" fontFamily={FONT} fontSize="21" fontWeight="800" fill={BLUE}>5 cm</text>
      <text x="108" y="380" fontFamily={FONT} fontSize="21" fontWeight="800" fill={BLUE} textAnchor="end">4 cm</text>
      <text x="88" y="460" fontFamily={FONT} fontSize="20" fontWeight="900" fill={INK} textAnchor="end">A</text>
      <text x="392" y="462" fontFamily={FONT} fontSize="20" fontWeight="900" fill={INK}>B</text>
      <text x="428" y="296" fontFamily={FONT} fontSize="20" fontWeight="900" fill={INK}>C</text>
      <text x="132" y="314" fontFamily={FONT} fontSize="20" fontWeight="900" fill={INK} textAnchor="end">D</text>
      <text x="260" y="292" fontFamily={FONT} fontSize="19" fontWeight="700" fill={MUTED} textAnchor="middle">{t(lang, 'sketch', 'croquis')}</text>
    </g>
  )
}

export function BuildQuad({ lang = 'en' }) {
  const [k, setK] = useState(0)
  const markA = at(QA, 168, 80)
  const markB = at(QB, 168, 70)
  const [cLx, cLy] = at(QC, 64, 218)
  const [dLx, dLy] = at(QD, 64, 313)
  // "4 cm" high up AD, clear of the protractor at A in step 3
  const four = [QA[0] + (QD[0] - QA[0]) * 0.78 - 14, QA[1] + (QD[1] - QA[1]) * 0.78 + 8]
  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <Stage lang={lang} k={k} steps={QUAD_STEPS} side={<Sketch lang={lang} />}>
          {k === 0 && (
            <text x="1080" y="270" fontFamily={FONT} fontSize="30" fontWeight="800" fill="#c9d3dc" textAnchor="middle">{t(lang, 'your accurate drawing', 'ton dessin exact')}</text>
          )}
          {k === 1 && <Ruler x={QA[0]} y={QA[1]} cm={7} s={QS} />}
          {k >= 1 && <Seg a={QA} b={QB} />}
          {k === 2 && <Protractor cx={QA[0]} cy={QA[1]} r={150} numbers={false} />}
          {k === 3 && <Protractor cx={QB[0]} cy={QB[1]} r={150} numbers={false} />}
          {k === 2 && <Zero p={QA} side="right" />}
          {k === 3 && <Zero p={QB} side="left" />}
          {k >= 2 && <Seg a={QA} b={QD} />}
          {k >= 3 && <Seg a={QB} b={QC} />}
          {k >= 4 && <Seg a={QD} b={QC} />}
          {k >= 2 && <path d={sector(QA, 44, 0, 80)} fill={ORANGE_T} stroke={KEY} strokeWidth="2.5" />}
          {k >= 3 && <path d={sector(QB, 44, 70, 180)} fill={ORANGE_T} stroke={KEY} strokeWidth="2.5" />}
          {k === 2 && <circle cx={f1(markA[0])} cy={f1(markA[1])} r="9" fill={KEY} />}
          {k === 3 && <circle cx={f1(markB[0])} cy={f1(markB[1])} r="9" fill={KEY} />}
          {k >= 2 && <text x={QA[0] + 52} y={QA[1] - 22} fontFamily={FONT} fontSize="27" fontWeight="900" fill={KEY}>80°</text>}
          {k >= 3 && <text x={QB[0] - 56} y={QB[1] - 24} fontFamily={FONT} fontSize="27" fontWeight="900" fill={KEY} textAnchor="end">110°</text>}
          {k >= 5 && (
            <g>
              <path d={sector(QC, 40, 186.2, 250)} fill={GREEN_T} stroke={GREEN_DARK} strokeWidth="2.5" />
              <path d={sector(QD, 40, 260, 366.2)} fill={GREEN_T} stroke={GREEN_DARK} strokeWidth="2.5" />
              <text x={f1(cLx)} y={f1(cLy + 10)} fontFamily={FONT} fontSize="27" fontWeight="900" fill={GREEN_DARK} textAnchor="middle">64°</text>
              <text x={f1(dLx)} y={f1(dLy + 10)} fontFamily={FONT} fontSize="27" fontWeight="900" fill={GREEN_DARK} textAnchor="middle">106°</text>
            </g>
          )}
          {k >= 1 && <Pt p={QA} label="A" dx={-26} dy={34} />}
          {k >= 1 && <Pt p={QB} label="B" dx={26} dy={34} />}
          {k >= 2 && <Pt p={QD} label="D" dx={-28} dy={-10} />}
          {k >= 3 && <Pt p={QC} label="C" dx={30} dy={-8} />}
          {k >= 1 && k !== 1 && <text x={(QA[0] + QB[0]) / 2} y={QA[1] + 40} fontFamily={FONT} fontSize="26" fontWeight="800" fill={BLUE} textAnchor="middle">6 cm</text>}
          {k >= 2 && <text x={f1(four[0])} y={f1(four[1])} fontFamily={FONT} fontSize="26" fontWeight="800" fill={BLUE} textAnchor="end">4 cm</text>}
          {k >= 3 && <text x={QB[0] + 96} y={QB[1] - 175} fontFamily={FONT} fontSize="26" fontWeight="800" fill={BLUE}>5 cm</text>}
          {k >= 6 && (
            <g>
              <rect x="600" y="16" width="860" height="58" rx="14" fill={GREEN_T} stroke={GREEN_DARK} strokeWidth="3" />
              <text x="1030" y="55" fontFamily={FONT} fontSize="30" fontWeight="900" fill={GREEN_DARK} textAnchor="middle">80° + 110° + 64° + 106° = 360° ✓</text>
            </g>
          )}
        </Stage>
      </div>
      <Buttons lang={lang} k={k} setK={setK} last={QUAD_STEPS.length - 1} />
    </div>
  )
}

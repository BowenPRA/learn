// content/y7-math/U01_1/widgets.jsx
// Interactive tools for 1.1 Adding & Subtracting Integers.
//
// Each widget does one thing a static slide cannot, and each takes the deck's
// `lang` so its own interface is bilingual like the rest of the slide. Colours
// are the Cambridge tokens used by the note cards and the diagrams.
import { useState, useEffect, useRef } from 'react'
import { DIAGRAMS } from './diagrams.js'
import { tr as pick } from '../../../src/lib/lang.js'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const RED = '#c8102e'
const BLUE = '#1a5fa8'


// Shared shells so every widget on the projector has the same silhouette.
const Stage = ({ children, className = '' }) => (
  <div className={`flex-1 min-h-[210px] w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 shadow-inner relative flex flex-col p-3 sm:p-4 overflow-hidden ${className}`}>
    {children}
  </div>
)

const Controls = ({ children }) => (
  <div className="w-full bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700 mt-2 flex-shrink-0">
    {children}
  </div>
)

/** A −/+ pair around a big readable value. Steadier than a slider on a screen. */
const Stepper = ({ label, display, onDown, onUp, colour }) => (
  <div className="flex items-center gap-2">
    <span className="w-[4.5rem] text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">{label}</span>
    <button onClick={onDown} className="w-9 h-9 rounded-lg font-black text-lg bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 active:scale-95">−</button>
    <span className="flex-1 text-center font-mono font-black text-lg tabular-nums" style={{ color: colour }}>{display}</span>
    <button onClick={onUp} className="w-9 h-9 rounded-lg font-black text-lg bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 active:scale-95">+</button>
  </div>
)

/* ============================================================= *
 * WIDGET 1 — TEAM GAME TIMER
 * A two-minute countdown big enough to read from the back of the
 * room, and — only after the teams have read their own lists out —
 * a bank of real negatives from all over the place.
 * ============================================================= */
const START_SECONDS = 120

const REAL_NEGATIVES = [
  { label: 'Empty space', labelVn: 'Không gian vũ trụ', labelFr: 'Espace vide', value: '−270 °C', note: 'between the stars', noteVn: 'giữa các vì sao', noteFr: 'entre les étoiles' },
  { label: 'Boomerang Nebula', labelVn: 'Tinh vân Boomerang', labelFr: 'Nébuleuse Boomerang', value: '−272 °C', note: 'coldest place we know of', noteVn: 'nơi lạnh nhất từng biết', noteFr: 'le lieu le plus froid connu' },
  { label: 'Antarctic record', labelVn: 'Kỷ lục Nam Cực', labelFr: 'Record polaire', value: '−89 °C', note: 'coldest day ever measured', noteVn: 'ngày lạnh nhất từng đo được', noteFr: 'jour le plus froid mesuré' },
  { label: 'Home freezer', labelVn: 'Tủ đông trong nhà', labelFr: 'Congélateur', value: '−18 °C', note: 'colder than the kitchen', noteVn: 'lạnh hơn nhà bếp', noteFr: 'plus froid que la cuisine' },
  { label: 'Dead Sea shore', labelVn: 'Bờ Biển Chết', labelFr: 'Mer Morte', value: '−430 m', note: 'the lowest land on Earth', noteVn: 'vùng đất thấp nhất Trái Đất', noteFr: 'la terre la plus basse' },
  { label: 'Much of the Netherlands', labelVn: 'Phần lớn Hà Lan', labelFr: 'Pays-Bas, en partie', value: '−7 m', note: 'farmland below sea level', noteVn: 'đồng ruộng dưới mực nước biển', noteFr: 'champs sous le niveau de la mer' },
  { label: 'Car park level', labelVn: 'Tầng hầm gửi xe', labelFr: 'Parking sous-sol', value: 'B5 = −5', note: 'five floors below the ground', noteVn: 'năm tầng dưới mặt đất', noteFr: 'cinq étages sous le sol' },
  { label: 'Golf, three under par', labelVn: 'Golf, dưới chuẩn ba gậy', labelFr: 'Golf, trois sous le par', value: '−3', note: 'in golf, lower is better', noteVn: 'trong golf, thấp hơn là giỏi hơn', noteFr: 'au golf, moins c’est mieux' },
  { label: 'Goal difference', labelVn: 'Hiệu số bàn thắng', labelFr: 'Différence de buts', value: '−7', note: 'let in more than you score', noteVn: 'thủng lưới nhiều hơn ghi được', noteFr: 'encaisser plus que marquer' },
  { label: 'Rocket launch', labelVn: 'Phóng tên lửa', labelFr: 'Décollage', value: 'T - 10', note: 'the countdown to lift-off', noteVn: 'đếm ngược tới lúc rời bệ', noteFr: 'le compte à rebours' },
  { label: 'Bank overdraft', labelVn: 'Tài khoản âm', labelFr: 'Découvert', value: '−50 dollars', note: 'money you owe the bank', noteVn: 'số tiền em nợ ngân hàng', noteFr: 'l’argent dû à la banque' },
  { label: 'One electron', labelVn: 'Một electron', labelFr: 'Un électron', value: '−1', note: 'its electric charge', noteVn: 'điện tích của nó', noteFr: 'sa charge électrique' },
]

export const TeamActivityWidget = ({ lang = 'en' }) => {
  const [seconds, setSeconds] = useState(START_SECONDS)
  const [running, setRunning] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            return 0
          }
          return s - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const mm = String(Math.floor(seconds / 60))
  const ss = String(seconds % 60).padStart(2, '0')
  const done = seconds === 0
  const low = seconds > 0 && seconds <= 15
  const reset = () => { clearInterval(intervalRef.current); setRunning(false); setSeconds(START_SECONDS) }

  return (
    <div className="w-full h-full flex flex-col select-none">
      <Stage className={revealed ? '' : 'items-center justify-center'}>
        {!revealed ? (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
              {done ? pick(lang, 'Time is up', 'Hết giờ', 'Temps écoulé') : pick(lang, 'Brainstorm time', 'Thời gian động não', 'Remue-méninges')}
            </div>
            <div
              className={`font-mono font-black tabular-nums leading-none ${low && !done ? 'animate-pulse' : ''}`}
              style={{ fontSize: 'clamp(3.5rem, 12vw, 6rem)', color: done ? RED : low ? ORANGE : TEAL }}>
              {mm}:{ss}
            </div>
            <div className="mt-2 text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 max-w-[17rem]">
              {pick(lang, 'How many negatives can your team find?', 'Đội em tìm được bao nhiêu số âm?', 'Combien de négatifs ton équipe trouve-t-elle ?')}
            </div>
          </div>
        ) : (
          <div className="w-full h-full overflow-y-auto custom-scrollbar">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-center mb-1.5" style={{ color: TEAL }}>
              {pick(lang, 'Real negatives, all over the place', 'Số âm có thật, ở khắp mọi nơi', 'De vrais négatifs, partout')}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {REAL_NEGATIVES.map((c) => (
                <div key={c.label} className="bg-slate-50 dark:bg-slate-800 rounded-lg border-2 border-slate-200 dark:border-slate-700 px-2 py-1 shadow-sm">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-black text-slate-700 dark:text-slate-200 text-[12px] truncate">{pick(lang, c.label, c.labelVn, c.labelFr)}</span>
                    <span className="font-mono font-black text-[12px] shrink-0" style={{ color: ORANGE }}>{c.value}</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 truncate">{pick(lang, c.note, c.noteVn, c.noteFr)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Stage>

      {/* One row of controls, so the reveal list has the whole panel to itself
          and never needs a scrollbar on a projector. */}
      <Controls>
        <div className="flex items-center gap-2">
          <button
            onClick={() => (done ? reset() : setRunning((r) => !r))}
            className="flex-1 py-2 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest text-white border-2 active:scale-95 transition-all"
            style={{ backgroundColor: running ? ORANGE : TEAL, borderColor: running ? ORANGE : TEAL }}>
            {done ? pick(lang, 'Reset timer', 'Đặt lại đồng hồ', 'Remettre à zéro')
              : running ? pick(lang, 'Pause', 'Tạm dừng', 'Pause')
                : pick(lang, 'Start 2:00', 'Bắt đầu 2:00', 'Lancer 2:00')}
          </button>
          <button
            onClick={reset}
            className="px-3 py-2 rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-widest bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-500 active:scale-95">
            {pick(lang, 'Reset', 'Đặt lại', 'À zéro')}
          </button>
          <button
            onClick={() => setRevealed((v) => !v)}
            className="flex-1 py-2 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest text-white border-2 active:scale-95 transition-all"
            style={{ backgroundColor: PURPLE, borderColor: PURPLE }}>
            {revealed ? pick(lang, 'Back to the timer', 'Quay lại đồng hồ', 'Retour au chrono') : pick(lang, 'More examples', 'Thêm ví dụ', 'Voir plus')}
          </button>
        </div>
      </Controls>
    </div>
  )
}

/* ============================================================= *
 * WIDGET 2 — NUMBER LINE JUMPER
 * Set a start, choose add or subtract, choose the second number,
 * and watch the jump. The rule stays HIDDEN behind a button: the
 * class works it out from the jumps first, then checks itself.
 * ============================================================= */
export const NumberLineWidget = ({ lang = 'en' }) => {
  const [start, setStart] = useState(-3)
  const [op, setOp] = useState('add')
  const [amount, setAmount] = useState(-4)
  const [showRule, setShowRule] = useState(false)

  const delta = op === 'add' ? amount : -amount
  const result = start + delta

  const lo = Math.min(start, result, 0) - 1
  const hi = Math.max(start, result, 0) + 1
  const span = Math.max(hi - lo, 4)
  const W = 620, H = 150, X0 = 45, X1 = 575, midY = 95
  const px = (v) => X0 + ((v - lo) / span) * (X1 - X0)
  const labelEvery = span > 18 ? 4 : span > 12 ? 2 : 1

  const ticks = []
  for (let v = Math.ceil(lo); v <= Math.floor(hi); v++) ticks.push(v)

  const sx = px(start), rx = px(result)
  const right = delta > 0
  const jump = delta === 0 ? '#94a3b8' : right ? GREEN : RED
  const amtStr = amount < 0 ? `(${amount})` : `${amount}`

  const rule =
    delta === 0 ? pick(lang, 'No movement — the second number is zero.', 'Không di chuyển — số thứ hai bằng không.', 'Pas de saut — le second nombre est zéro.')
      : op === 'add' && amount > 0 ? pick(lang, 'Add a positive → move RIGHT.', 'Cộng số dương → đi sang PHẢI.', 'Ajouter un positif → DROITE.')
        : op === 'add' && amount < 0 ? pick(lang, 'Add a negative → move LEFT.', 'Cộng số âm → đi sang TRÁI.', 'Ajouter un négatif → GAUCHE.')
          : op === 'subtract' && amount > 0 ? pick(lang, 'Subtract a positive → move LEFT.', 'Trừ số dương → đi sang TRÁI.', 'Retirer un positif → GAUCHE.')
            : pick(lang, 'Subtract a negative → move RIGHT.', 'Trừ số âm → đi sang PHẢI.', 'Retirer un négatif → DROITE.')

  const clampStart = (n) => Math.max(-10, Math.min(10, n))
  const clampAmt = (n) => Math.max(-9, Math.min(9, n))

  return (
    <div className="w-full h-full flex flex-col select-none">
      <Stage className="items-center justify-center">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono font-black rounded-xl px-4 py-1.5 shadow-md text-sm sm:text-lg whitespace-nowrap z-10">
          {start} {op === 'add' ? '+' : '−'} {amtStr} = <span style={{ color: right ? '#8fd14f' : '#ff8f9a' }}>{result}</span>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
          {/* White plate, like the authored diagrams: the line art then reads
              the same on a light or a dark slide. */}
          <rect x="0" y="0" width={W} height={H} rx="16" fill="#ffffff" />
          <line x1={X0} y1={midY} x2={X1} y2={midY} stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" />
          {ticks.map((v) => (
            <g key={v}>
              <line x1={px(v)} y1={midY - 6} x2={px(v)} y2={midY + 6} stroke="#94a3b8" strokeWidth="2" />
              {v % labelEvery === 0 && (
                <text x={px(v)} y={midY + 24} fontFamily="Inter, sans-serif" fontSize="14" fontWeight={v === 0 ? 900 : 'bold'} fill={v === 0 ? '#2b2b2b' : '#7c8a95'} textAnchor="middle">{v}</text>
              )}
            </g>
          ))}

          <defs>
            <marker id="nl-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill={jump} />
            </marker>
          </defs>
          {delta !== 0 && (
            <path d={`M ${sx} ${midY - 8} Q ${(sx + rx) / 2} 44 ${rx} ${midY - 8}`} fill="none" stroke={jump} strokeWidth="4" markerEnd="url(#nl-head)" />
          )}
          <text x={(sx + rx) / 2} y="36" fontFamily="Inter, sans-serif" fontSize="17" fontWeight="900" fill={jump} textAnchor="middle">
            {delta === 0 ? '' : `${right ? '+' : '−'}${Math.abs(delta)}`}
          </text>

          <circle cx={sx} cy={midY} r="7" fill={BLUE} stroke="white" strokeWidth="2" />
          <text x={sx} y={midY - 16} fontFamily="Inter, sans-serif" fontSize="16" fontWeight="900" fill={BLUE} textAnchor="middle">{start}</text>
          <circle cx={rx} cy={midY} r="8" fill={jump} stroke="white" strokeWidth="2" />
          <text x={rx} y={midY + 44} fontFamily="Inter, sans-serif" fontSize="17" fontWeight="900" fill={jump} textAnchor="middle">{result}</text>
        </svg>
      </Stage>

      <Controls>
        <div className="space-y-2">
          <Stepper
            label={pick(lang, 'Start', 'Bắt đầu', 'Départ')} display={start} colour={BLUE}
            onDown={() => setStart(clampStart(start - 1))} onUp={() => setStart(clampStart(start + 1))} />
          <div className="flex items-center gap-2">
            <span className="w-[4.5rem] text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">{pick(lang, 'Do', 'Phép', 'Faire')}</span>
            <button onClick={() => setOp('add')}
              className="flex-1 py-1.5 rounded-lg font-black text-sm border-2 transition-all"
              style={op === 'add' ? { backgroundColor: GREEN, borderColor: GREEN, color: '#fff' } : { borderColor: '#cbd5e1', color: '#64748b' }}>
              + {pick(lang, 'Add', 'Cộng', 'Ajouter')}
            </button>
            <button onClick={() => setOp('subtract')}
              className="flex-1 py-1.5 rounded-lg font-black text-sm border-2 transition-all"
              style={op === 'subtract' ? { backgroundColor: RED, borderColor: RED, color: '#fff' } : { borderColor: '#cbd5e1', color: '#64748b' }}>
              − {pick(lang, 'Subtract', 'Trừ', 'Retirer')}
            </button>
          </div>
          <Stepper
            label={pick(lang, 'Number', 'Số', 'Nombre')} display={amtStr} colour={ORANGE}
            onDown={() => setAmount(clampAmt(amount - 1))} onUp={() => setAmount(clampAmt(amount + 1))} />
        </div>

        <button
          onClick={() => setShowRule((v) => !v)}
          className="w-full mt-3 py-2 rounded-xl font-black text-xs uppercase tracking-widest border-2 active:scale-95 transition-all"
          style={showRule ? { backgroundColor: ORANGE, borderColor: ORANGE, color: '#fff' } : { borderColor: ORANGE, color: ORANGE }}>
          {showRule ? rule : pick(lang, 'Check your rule', 'Kiểm tra quy tắc của em', 'Vérifie ta règle')}
        </button>
      </Controls>
    </div>
  )
}

/* ============================================================= *
 * WIDGET 3 — SAY IT, THEN WRITE IT
 * The language drill. One sentence at a time: press once for the
 * words that carry the maths, again for the calculation, again for
 * the answer. Some items run the other way — from a calculation to
 * the English you would use to say it.
 * ============================================================= */
const DRILL = [
  {
    prompt: 'At noon it is 4 °C. By midnight the temperature has fallen by 9 degrees.',
    promptVn: 'Buổi trưa là 4 °C. Đến nửa đêm nhiệt độ đã giảm 9 độ.',
    promptFr: 'Il fait 4 °C à midi. À minuit, la température a baissé de 9 degrés.',
    signal: 'fallen by → go down → subtract',
    signalVn: 'fallen by (giảm) → đi xuống → trừ',
    signalFr: 'fallen by (baissé de) → descendre → soustraire',
    calc: '4 − 9',
    answer: '−5 °C',
  },
  {
    prompt: 'Mr Bowen owes the school canteen 12 dollars.',
    promptVn: 'Thầy Bowen nợ căng tin trường 12 đô.',
    promptFr: 'M. Bowen doit 12 dollars à la cantine.',
    signal: 'owes → a debt → a negative amount',
    signalVn: 'owes (nợ) → khoản nợ → số âm',
    signalFr: 'owes (doit) → une dette → un nombre négatif',
    calc: '−12',
    answer: '−12 dollars',
  },
  {
    prompt: 'The submarine is 30 m below sea level. It rises 12 m.',
    promptVn: 'Tàu ngầm ở 30 m dưới mực nước biển. Nó nổi lên 12 m.',
    promptFr: 'Le sous-marin est à 30 m sous le niveau de la mer. Il remonte de 12 m.',
    signal: 'below → negative · rises → go up → add',
    signalVn: 'below (dưới) → số âm · rises (nổi lên) → đi lên → cộng',
    signalFr: 'below (sous) → négatif · rises (remonte) → monter → additionner',
    calc: '−30 + 12',
    answer: '−18 m',
  },
  {
    prompt: 'Subtract 8 from 5.',
    promptVn: 'Subtract 8 from 5. (Lấy 5 trừ đi 8.)',
    promptFr: 'Subtract 8 from 5. (Soustrais 8 de 5.)',
    signal: 'subtract … from … → the numbers swap round',
    signalVn: 'subtract … from … → hai số đổi chỗ cho nhau',
    signalFr: 'subtract … from … → les deux nombres changent de place',
    calc: '5 − 8',
    answer: '−3',
    figure: DIAGRAMS.WORD_ORDER,
  },
  {
    prompt: 'Find the difference between −4 and 6.',
    promptVn: 'Tìm hiệu (khoảng cách) giữa −4 và 6.',
    promptFr: 'Trouve la différence (l’écart) entre −4 et 6.',
    signal: 'difference between → the gap → bigger − smaller',
    signalVn: 'difference between → khoảng cách → số lớn − số bé',
    signalFr: 'difference between → l’écart → le plus grand − le plus petit',
    calc: '6 − (−4)',
    answer: '10',
  },
  {
    prompt: 'Mr Bowen has −6 dollars in the bank. He deposits 20 dollars, then withdraws 9 dollars.',
    promptVn: 'Thầy Bowen có −6 đô trong ngân hàng. Thầy gửi vào 20 đô, rồi rút ra 9 đô.',
    promptFr: 'M. Bowen a −6 dollars à la banque. Il dépose 20 dollars, puis retire 9 dollars.',
    signal: 'deposits → add · withdraws → subtract',
    signalVn: 'deposits (gửi vào) → cộng · withdraws (rút ra) → trừ',
    signalFr: 'deposits (dépose) → additionner · withdraws (retire) → soustraire',
    calc: '−6 + 20 − 9',
    answer: '5 dollars',
  },
  {
    reverse: true,
    prompt: '−6 + 10',
    promptVn: '−6 + 10',
    promptFr: '−6 + 10',
    signal: 'Say it out loud in English, three different ways.',
    signalVn: 'Hãy đọc to bằng tiếng Anh, theo ba cách khác nhau.',
    signalFr: 'Dis-le à voix haute en anglais, de trois façons.',
    calc: '“negative six plus ten” · “ten more than negative six” · “start at −6 and increase by 10”',
    calcVn: '“negative six plus ten” · “ten more than negative six” · “start at −6 and increase by 10”',
    calcFr: '“negative six plus ten” · “ten more than negative six” · “start at −6 and increase by 10”',
    answer: '4',
  },
  {
    reverse: true,
    prompt: '3 − (−5)',
    promptVn: '3 − (−5)',
    promptFr: '3 − (−5)',
    signal: 'Say it out loud in English, two different ways.',
    signalVn: 'Hãy đọc to bằng tiếng Anh, theo hai cách khác nhau.',
    signalFr: 'Dis-le à voix haute en anglais, de deux façons.',
    calc: '“three subtract negative five” · “the difference between −5 and 3”',
    calcVn: '“three subtract negative five” · “the difference between −5 and 3”',
    calcFr: '“three subtract negative five” · “the difference between −5 and 3”',
    answer: '8',
  },
]

export const TranslateWidget = ({ lang = 'en' }) => {
  const [i, setI] = useState(0)
  const [step, setStep] = useState(0) // 0 prompt · 1 signal · 2 calculation · 3 answer
  const item = DRILL[i]
  const last = i === DRILL.length - 1

  const go = (n) => { setI(n); setStep(0) }

  const nextLabel = step === 0 ? pick(lang, 'Which words matter?', 'Từ nào quan trọng?', 'Mots importants ?')
    : step === 1 ? (item.reverse ? pick(lang, 'Show the English', 'Hiện câu tiếng Anh', 'Voir l’anglais') : pick(lang, 'Write the calculation', 'Viết phép tính', 'Écris le calcul'))
      : step === 2 ? pick(lang, 'Show the answer', 'Hiện đáp án', 'Voir la réponse')
        : pick(lang, 'Next sentence', 'Câu tiếp theo', 'Phrase suivante')

  return (
    <div className="w-full h-full flex flex-col select-none">
      <Stage>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {item.reverse ? pick(lang, 'Maths → English', 'Toán → Tiếng Anh', 'Maths → anglais') : pick(lang, 'English → Maths', 'Tiếng Anh → Toán', 'Anglais → maths')}
          </span>
          <span className="font-mono font-black text-xs text-slate-400 tabular-nums">{i + 1}/{DRILL.length}</span>
        </div>

        <div className="rounded-xl border-2 px-3 py-2.5 mb-2 shrink-0" style={{ borderColor: TEAL, backgroundColor: `${TEAL}0f` }}>
          <p className={`font-black text-slate-800 dark:text-slate-100 leading-snug ${item.reverse ? 'font-mono text-3xl text-center' : 'text-base sm:text-lg lg:text-xl'}`}>
            {pick(lang, item.prompt, item.promptVn, item.promptFr)}
          </p>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar space-y-2">
          {step >= 1 && (
            <div className="rounded-xl px-3 py-2 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ backgroundColor: `${ORANGE}14` }}>
              <div className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: ORANGE }}>{pick(lang, 'Signal words', 'Từ khoá', 'Mots-signaux')}</div>
              <div className="font-bold text-[15px] sm:text-base lg:text-lg text-slate-700 dark:text-slate-200">{pick(lang, item.signal, item.signalVn, item.signalFr)}</div>
            </div>
          )}
          {step >= 2 && (
            <div className="rounded-xl px-3 py-2 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ backgroundColor: `${PURPLE}12` }}>
              <div className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: PURPLE }}>
                {item.reverse ? pick(lang, 'Say it like this', 'Nói như thế này', 'Dis-le comme ça') : pick(lang, 'The calculation', 'Phép tính', 'Le calcul')}
              </div>
              <div className={`font-black text-slate-800 dark:text-slate-100 ${item.reverse ? 'text-[15px] sm:text-base leading-snug' : 'font-mono text-2xl'}`}>
                {pick(lang, item.calc, item.calcVn, item.calcFr)}
              </div>
              {item.figure && (
                <div className="mt-2 w-full rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white p-1"
                  style={{ aspectRatio: '620 / 240' }}
                  dangerouslySetInnerHTML={{ __html: item.figure }} />
              )}
            </div>
          )}
          {step >= 3 && (
            <div className="rounded-xl px-3 py-2 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300 border-2" style={{ borderColor: GREEN, backgroundColor: `${GREEN}12` }}>
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: GREEN }}>{pick(lang, 'Answer', 'Đáp án', 'Réponse')}</span>
              <span className="font-mono font-black text-2xl" style={{ color: GREEN }}>{item.answer}</span>
            </div>
          )}
        </div>
      </Stage>

      <Controls>
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(Math.max(0, i - 1))}
            disabled={i === 0}
            className="px-3 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest border-2 border-slate-200 dark:border-slate-600 text-slate-500 disabled:opacity-30 active:scale-95">
            {pick(lang, 'Back', 'Lùi', 'Retour')}
          </button>
          <button
            onClick={() => (step < 3 ? setStep(step + 1) : !last && go(i + 1))}
            disabled={step === 3 && last}
            className="flex-1 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest text-white border-2 disabled:opacity-40 active:scale-95 transition-all"
            style={{ backgroundColor: step === 3 ? PURPLE : TEAL, borderColor: step === 3 ? PURPLE : TEAL }}>
            {step === 3 && last ? pick(lang, 'That is all of them', 'Hết rồi', 'C’est tout !') : nextLabel}
          </button>
        </div>
      </Controls>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Ruler, Layers, Timer } from 'lucide-react'

// Cambridge palette, matching the deck's note cards.
const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const RED = '#c8102e'
const INK = '#2b2b2b'

// Both widgets on this slide deck talk to each other through localStorage,
// not React state, because Deck.jsx remounts a slide's widget every time the
// class navigates to it (`key={currentIndex}` in Deck.jsx). Groups are made on
// one slide and read on another; the rotation timer must also survive the
// teacher flipping back to a station slide mid-round without losing time.
const LS = {
  roster: 'y7sci-acc-lab-roster',
  groups: 'y7sci-acc-lab-groups',
  round: 'y7sci-acc-lab-round',
  status: 'y7sci-acc-lab-status', // 'idle' | 'running' | 'paused' | 'done'
  endAt: 'y7sci-acc-lab-endAt', // epoch ms — only meaningful while running
  remaining: 'y7sci-acc-lab-remaining', // ms left — meaningful while idle/paused/done
}
const readJSON = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v === null ? fallback : JSON.parse(v)
  } catch {
    return fallback
  }
}
const writeJSON = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* private browsing etc. */ }
}

const ROUND_MS = 20 * 60 * 1000
const PREDICT_MS = 2 * 60 * 1000
const EXTENSION_MS = 5 * 60 * 1000
const GROUP_LETTERS = ['A', 'B', 'C']
const GROUP_COLORS = [TEAL, PURPLE, ORANGE]

// A fresh roster invalidates whatever round the class was on.
function resetRotationState() {
  writeJSON(LS.round, 0)
  writeJSON(LS.status, 'idle')
  writeJSON(LS.remaining, ROUND_MS)
  writeJSON(LS.endAt, null)
}

/* ============================================================= *
 * WIDGET 1 — MAKE YOUR GROUPS
 * Type a roster, split it into 3 even groups by shuffling. The
 * groups are saved for the rotation-timer widget on the next slide.
 * ============================================================= */
const GM_T = {
  placeholder: ['One student name per line…', 'Mỗi dòng một tên học sinh…'],
  make: ['Make 3 Groups', 'Chia thành 3 nhóm'],
  shuffle: ['Shuffle Again', 'Xáo trộn lại'],
  need: ['Type at least 3 names first.', 'Hãy nhập ít nhất 3 tên trước.'],
  group: ['Group', 'Nhóm'],
  saved: ['Saved — the rotation slide will use these groups.', 'Đã lưu — trang vòng xoay sẽ dùng các nhóm này.'],
}
const gm = (lang, key) => GM_T[key][lang === 'vn' ? 1 : 0]

function shuffledGroupsFrom(names) {
  const shuffled = [...names]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  const groups = [[], [], []]
  shuffled.forEach((name, i) => groups[i % 3].push(name))
  return groups
}

export const GroupMakerWidget = ({ lang = 'en' }) => {
  const [text, setText] = useState(() => {
    try { return localStorage.getItem(LS.roster) || '' } catch { return '' }
  })
  const [groups, setGroups] = useState(() => readJSON(LS.groups, null))

  const names = text.split('\n').map((n) => n.trim()).filter(Boolean)
  const canMake = names.length >= 3

  const makeGroups = () => {
    if (!canMake) return
    const g = shuffledGroupsFrom(names)
    setGroups(g)
    writeJSON(LS.groups, g)
    try { localStorage.setItem(LS.roster, text) } catch { /* private browsing etc. */ }
    resetRotationState()
  }

  return (
    <div className="w-full h-full flex flex-col gap-2 select-none">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={gm(lang, 'placeholder')}
        className="flex-1 min-h-[110px] w-full resize-none rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 shadow-inner focus:outline-none focus:border-[#5c2483]"
      />
      <button
        onClick={makeGroups}
        disabled={!canMake}
        className="w-full py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white disabled:opacity-30 active:scale-95 transition-all"
        style={{ backgroundColor: PURPLE }}>
        {groups ? gm(lang, 'shuffle') : gm(lang, 'make')}
      </button>
      {!canMake && <p className="text-xs font-bold text-slate-400 text-center">{gm(lang, 'need')}</p>}

      {groups && (
        <>
          <div className="grid grid-cols-3 gap-2 flex-shrink-0">
            {groups.map((members, i) => (
              <div key={i} className="rounded-xl border-2 p-2 bg-white dark:bg-slate-900 shadow-sm" style={{ borderColor: GROUP_COLORS[i] }}>
                <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1" style={{ color: GROUP_COLORS[i] }}>
                  {gm(lang, 'group')} {GROUP_LETTERS[i]}
                </div>
                <ul className="space-y-0.5">
                  {members.map((m, j) => (
                    <li key={j} className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 truncate">{m}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-[11px] sm:text-xs font-bold text-center text-slate-400">{gm(lang, 'saved')}</p>
        </>
      )}
    </div>
  )
}

/* ============================================================= *
 * WIDGET 2 — THE ROTATION TIMER
 * One 20-minute countdown per round, 3 rounds. Groups rotate one
 * station per round (station = (group + round) mod 3), so no two
 * groups are ever assigned the same station at once. The first 2
 * minutes of every round are flagged PREDICT, the rest MEASURE.
 * ============================================================= */
const RT_T = {
  round: ['Round', 'Vòng'],
  of3: ['of 3', 'trên 3'],
  predict: ['PREDICT', 'DỰ ĐOÁN'],
  measure: ['MEASURE', 'ĐO'],
  extend: ['EXTEND', 'NÂNG CAO'],
  predictLabel: ['Predict', 'Dự đoán'],
  nowLabel: ['Now', 'Bây giờ'],
  extraLabel: ['Extra', 'Nâng cao'],
  start: ['Start', 'Bắt đầu'],
  pause: ['Pause', 'Tạm dừng'],
  resume: ['Resume', 'Tiếp tục'],
  next: ['Next Rotation', 'Vòng tiếp theo'],
  reset: ['Reset Lab', 'Đặt lại buổi thực hành'],
  timeUp: ['Time! Rotate now.', 'Hết giờ! Chuyển trạm ngay.'],
  complete: ['All three rotations are done.', 'Cả ba vòng đã xong.'],
  noGroups: ['Make groups on the previous slide first — showing placeholder groups.', 'Hãy chia nhóm ở trang trước — đây là nhóm tạm thời.'],
  group: ['Group', 'Nhóm'],
}
const rt = (lang, key) => RT_T[key][lang === 'vn' ? 1 : 0]

// Every station carries three stages, read in order as the round's clock
// runs: `predict` (first 2 minutes, no task shown yet), `task` (the base
// instruction, minutes 2–15), and `extension` (minutes 15–20, a bonus
// challenge for a group that finished early — never previewed on the station
// briefing slides, so it lands as a surprise for whoever gets there).
const STATIONS = [
  {
    name: 'Perimeter', nameVn: 'Chu vi phòng',
    predict: 'What will the final perimeter of the room be?',
    predictVn: 'Chu vi cuối cùng của phòng sẽ là bao nhiêu?',
    task: 'Measure the length of every wall.',
    taskVn: 'Đo chiều dài của từng bức tường.',
    extension: 'Add up your wall lengths by hand — decimal addition. Then check your total with a calculator.',
    extensionVn: 'Cộng các chiều dài bức tường bằng tay — cộng số thập phân. Sau đó dùng máy tính để kiểm tra lại.',
    icon: Ruler, color: TEAL,
  },
  {
    name: 'Folding Paper', nameVn: 'Gấp giấy',
    predict: 'How many times can you fold the paper, and how thick will the stack be?',
    predictVn: 'Em có thể gấp tờ giấy bao nhiêu lần, và xấp giấy sẽ dày bao nhiêu?',
    task: 'Fold the paper in half, again and again, as a group — as many times as you actually can. Then measure the width of the folded stack.',
    taskVn: 'Cùng nhóm gấp đôi tờ giấy, gấp đi gấp lại — càng nhiều lần càng tốt. Sau đó đo bề rộng của xấp giấy đã gấp.',
    extension: 'Make a table of the stack\'s thickness at your last 3 folds. Mr Bowen is 180 cm tall — how many folds until the stack is as tall as him?',
    extensionVn: 'Lập bảng ghi độ dày của xấp giấy ở 3 lần gấp cuối. Thầy Bowen cao 180 cm — cần gấp bao nhiêu lần để xấp giấy cao bằng thầy?',
    icon: Layers, color: PURPLE,
  },
  {
    name: 'Ramp Race', nameVn: 'Đua đường dốc',
    predict: 'Which ball will be faster, and by how much?',
    predictVn: 'Quả bóng nào sẽ nhanh hơn, và nhanh hơn bao nhiêu?',
    task: 'Time each ball down the 1 metre track, 10 times each. Write down all 20 times.',
    taskVn: 'Bấm giờ mỗi quả bóng chạy hết đường dốc dài 1 mét, 10 lần mỗi quả. Ghi lại cả 20 lần đo.',
    extension: 'Find the average time for each ball, then calculate the difference between them — that answers "by how much".',
    extensionVn: 'Tính thời gian trung bình của mỗi quả bóng, rồi tính hiệu giữa hai số đó — đó là câu trả lời cho "nhanh hơn bao nhiêu".',
    icon: Timer, color: ORANGE,
  },
]
const PLACEHOLDER_GROUPS = [['—'], ['—'], ['—']]

const fmt = (ms) => {
  const s = Math.max(0, Math.ceil(ms / 1000))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}

export const StationRotationWidget = ({ lang = 'en' }) => {
  const [groups] = useState(() => readJSON(LS.groups, null))
  const hasGroups = !!groups
  const displayGroups = groups || PLACEHOLDER_GROUPS

  const [round, setRound] = useState(() => readJSON(LS.round, 0))
  const [status, setStatus] = useState(() => readJSON(LS.status, 'idle'))
  const [remaining, setRemaining] = useState(() => {
    const st = readJSON(LS.status, 'idle')
    if (st === 'running') {
      const endAt = readJSON(LS.endAt, null)
      if (endAt) return Math.max(0, endAt - Date.now())
    }
    return readJSON(LS.remaining, ROUND_MS)
  })

  useEffect(() => {
    if (status !== 'running') return undefined
    const id = setInterval(() => {
      const endAt = readJSON(LS.endAt, null)
      if (!endAt) return
      const left = endAt - Date.now()
      if (left <= 0) {
        setRemaining(0)
        setStatus('done')
        writeJSON(LS.status, 'done')
        writeJSON(LS.remaining, 0)
      } else {
        setRemaining(left)
      }
    }, 250)
    return () => clearInterval(id)
  }, [status])

  const start = () => {
    const endAt = Date.now() + remaining
    writeJSON(LS.endAt, endAt)
    writeJSON(LS.status, 'running')
    setStatus('running')
  }
  const pause = () => {
    const endAt = readJSON(LS.endAt, Date.now())
    const left = Math.max(0, endAt - Date.now())
    writeJSON(LS.remaining, left)
    writeJSON(LS.status, 'paused')
    setRemaining(left)
    setStatus('paused')
  }
  const goToRound = (r) => {
    setRound(r)
    writeJSON(LS.round, r)
    writeJSON(LS.status, 'idle')
    writeJSON(LS.remaining, ROUND_MS)
    writeJSON(LS.endAt, null)
    setStatus('idle')
    setRemaining(ROUND_MS)
  }
  const nextRotation = () => goToRound(Math.min(round + 1, 2))
  const resetLab = () => goToRound(0)

  const predicting = remaining > ROUND_MS - PREDICT_MS
  const extending = !predicting && remaining <= EXTENSION_MS
  const phase = predicting ? 'predict' : extending ? 'extend' : 'measure'
  const phaseColor = predicting ? PURPLE : extending ? GREEN : TEAL

  return (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-3 select-none">
      {!hasGroups && (
        <div className="rounded-xl border-2 border-dashed p-2 text-center text-[11px] sm:text-xs font-bold flex-shrink-0" style={{ borderColor: ORANGE, color: ORANGE }}>
          {rt(lang, 'noGroups')}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 flex-shrink-0">
        <div className="font-black uppercase tracking-widest text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {rt(lang, 'round')} {round + 1} {rt(lang, 'of3')}
        </div>
        <div className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-white"
          style={{ backgroundColor: phaseColor }}>
          {rt(lang, phase)}
        </div>
      </div>

      <div className="text-center font-mono font-black tabular-nums text-4xl sm:text-5xl lg:text-6xl flex-shrink-0"
        style={{ color: status === 'done' ? RED : INK }}>
        {fmt(remaining)}
      </div>
      {status === 'done' && (
        <div className="text-center font-black text-sm sm:text-base flex-shrink-0" style={{ color: RED }}>
          {round >= 2 ? rt(lang, 'complete') : rt(lang, 'timeUp')}
        </div>
      )}

      <div className="grid grid-cols-3 grid-rows-1 gap-2 flex-1 min-h-0">
        {STATIONS.map((st, stationIndex) => {
          const groupIndex = (stationIndex - round + 3) % 3
          const members = displayGroups[groupIndex] || []
          const Icon = st.icon
          return (
            <div key={stationIndex} className="rounded-xl border-2 p-2 flex flex-col min-h-0 bg-white dark:bg-slate-900 shadow-sm overflow-hidden" style={{ borderColor: st.color }}>
              <div className="flex items-center gap-1.5 mb-1 flex-shrink-0">
                <Icon className="w-4 h-4 shrink-0" style={{ color: st.color }} strokeWidth={2.5} />
                <span className="text-[11px] sm:text-xs font-black" style={{ color: st.color }}>
                  {lang === 'vn' ? st.nameVn : st.name}
                </span>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar space-y-1 mb-1.5 pr-0.5">
                <div className="text-[9px] sm:text-[10px] font-bold italic text-slate-400 dark:text-slate-500 leading-snug">
                  {rt(lang, 'predictLabel')}: {lang === 'vn' ? st.predictVn : st.predict}
                </div>
                {!predicting && (
                  <div className="text-[10px] sm:text-[11px] font-bold leading-snug text-slate-600 dark:text-slate-300">
                    <span className="uppercase tracking-wide" style={{ color: extending ? GREEN : st.color }}>
                      {extending ? rt(lang, 'extraLabel') : rt(lang, 'nowLabel')}:{' '}
                    </span>
                    {extending ? (lang === 'vn' ? st.extensionVn : st.extension) : (lang === 'vn' ? st.taskVn : st.task)}
                  </div>
                )}
              </div>

              <div className="mt-auto rounded-lg px-2 py-1 text-center font-black text-xs sm:text-sm text-white flex-shrink-0" style={{ backgroundColor: st.color }}>
                {rt(lang, 'group')} {GROUP_LETTERS[groupIndex]}
              </div>
              {hasGroups && (
                <div className="mt-1 text-[9px] sm:text-[10px] font-bold text-slate-400 text-center truncate flex-shrink-0">
                  {members.join(', ')}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {status === 'running' ? (
          <button onClick={pause} className="flex-1 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white active:scale-95 transition-all" style={{ backgroundColor: ORANGE }}>
            {rt(lang, 'pause')}
          </button>
        ) : (
          <button onClick={start} disabled={status === 'done'} className="flex-1 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white disabled:opacity-30 active:scale-95 transition-all" style={{ backgroundColor: GREEN }}>
            {status === 'paused' ? rt(lang, 'resume') : rt(lang, 'start')}
          </button>
        )}
        <button onClick={resetLab} className="px-4 py-3 rounded-xl font-black text-sm uppercase tracking-widest border-2 border-slate-200 dark:border-slate-700 text-slate-500 active:scale-95 transition-all">
          {rt(lang, 'reset')}
        </button>
        {round < 2 && (
          <button onClick={nextRotation} className="flex-1 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white active:scale-95 transition-all" style={{ backgroundColor: PURPLE }}>
            {rt(lang, 'next')}
          </button>
        )}
      </div>
    </div>
  )
}

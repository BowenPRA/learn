// content/y7-math/T03_poster-showcase/widgets.jsx
// One widget, on a full-slide `game`: the TOPIC BOARD. It does the one thing a
// still slide cannot — it deals the ten topics out to the real class list and
// remembers who has what.
//
//   · The pool is the random-student picker's own roster (src/lib/
//     useStudentPicker.js), read from the same localStorage key. Nothing is
//     typed in here; edit the class list in the picker and the board follows.
//   · PICK works like the picker: one press, one name, no repeats. It fills the
//     next empty topic — or, if a topic is selected, that topic.
//   · Tap a topic, then tap a name, to choose by hand. A name that already has
//     a topic swaps with whoever was there, so nobody is ever on two posters.
//   · The board is saved on THIS DEVICE, like the roster, under its own key.
//     Reloading, closing the deck, or teaching from the same machine on
//     Thursday all show the same board.
import { useState, useEffect, useRef } from 'react'
import { Shuffle, Presentation, Trash2, X } from 'lucide-react'
import { loadRoster, ROSTER_EVENT } from '../../../src/lib/useStudentPicker.js'
import { TOPICS } from './topics.js'

const KEY = '#c25e12'
const STORE = 'classroom:poster-topics:y7-q1'

const tr = (lang, en, vn) => (lang === 'vn' ? vn : en)

/** Read the saved board: { topicId: name }. Never throws. */
function loadBoard() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || '{}')
    const out = {}
    for (const t of TOPICS) {
      const n = saved[t.id]
      if (typeof n === 'string' && n.trim()) out[t.id] = n
    }
    return out
  } catch {
    return {}
  }
}

/** Persist the board. Never throws. */
function saveBoard(board) {
  try {
    localStorage.setItem(STORE, JSON.stringify(board))
  } catch {
    /* private window / storage blocked — the board lasts until reload */
  }
}

function Btn({ onClick, disabled, tone = 'orange', icon: Icon, big, children }) {
  const tones = {
    orange: 'bg-[#c25e12] border-[#a04a0e]',
    slate: 'bg-slate-500 border-slate-700',
    red: 'bg-[#c8102e] border-[#9b0c24]',
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-35 disabled:pointer-events-none ${tones[tone]} ${big ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-sm lg:text-base'}`}
    >
      {Icon && <Icon className={big ? 'w-6 h-6' : 'w-4 h-4 lg:w-5 lg:h-5'} strokeWidth={3} />}
      {children}
    </button>
  )
}

export function PosterBoard({ lang = 'en', isDisplayMode = false }) {
  const [roster, setRoster] = useState(loadRoster)
  const [board, setBoard] = useState(loadBoard)
  const [selected, setSelected] = useState(null)
  const [confirmClear, setConfirmClear] = useState(false)
  const clearTimer = useRef(null)
  const big = isDisplayMode

  // Follow an edit to the class list made in the picker's modal (same tab) or
  // in another tab, without leaving the slide.
  useEffect(() => {
    const sync = () => setRoster(loadRoster())
    window.addEventListener(ROSTER_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(ROSTER_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])
  useEffect(() => () => clearTimeout(clearTimer.current), [])

  const commit = (next) => {
    setBoard(next)
    saveBoard(next)
  }

  const taken = new Set(Object.values(board))
  const free = roster.filter((n) => !taken.has(n))
  const emptyTopics = TOPICS.filter((t) => !board[t.id])
  const target = selected || emptyTopics[0]?.id || null
  const filled = TOPICS.length - emptyTopics.length
  const selTopic = TOPICS.find((t) => t.id === selected)

  // One press, one name: a random student with no topic yet goes to the
  // selected topic, or else to the next empty one.
  const pick = () => {
    if (!free.length || !target) return
    const name = free[Math.floor(Math.random() * free.length)]
    commit({ ...board, [target]: name })
    setSelected(null)
  }

  // Put `name` on the selected topic. If they already had a topic, whoever was
  // on the selected one moves there — a swap, never a duplicate.
  const assign = (name) => {
    if (!selected) return
    const from = TOPICS.find((t) => board[t.id] === name)?.id
    if (from === selected) { setSelected(null); return }
    const next = { ...board }
    const prev = next[selected]
    if (from) {
      if (prev) next[from] = prev
      else delete next[from]
    }
    next[selected] = name
    commit(next)
    setSelected(null)
  }

  const unassign = () => {
    if (!selected) return
    const next = { ...board }
    delete next[selected]
    commit(next)
    setSelected(null)
  }

  const clearAll = () => {
    clearTimeout(clearTimer.current)
    if (!confirmClear) {
      setConfirmClear(true)
      clearTimer.current = setTimeout(() => setConfirmClear(false), 3000)
      return
    }
    setConfirmClear(false)
    setSelected(null)
    commit({})
  }

  const unitOf = (name) => TOPICS.find((t) => board[t.id] === name)?.unit

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-xl text-white bg-[#c25e12] shrink-0">
            <Presentation className={big ? 'w-7 h-7' : 'w-5 h-5'} strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className={`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none ${big ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
              {tr(lang, 'Who Gets Which Topic?', 'Ai làm đề tài nào?')}
            </div>
            <div className={`font-bold text-slate-400 dark:text-slate-500 truncate ${big ? 'text-base' : 'text-xs'}`}>
              {tr(lang, 'Pick: one name, one topic. Tap a topic to change it.', 'Chọn: một tên, một đề tài. Chạm vào đề tài để đổi.')}
            </div>
          </div>
        </div>
        <div className={`font-black text-slate-400 dark:text-slate-500 tabular-nums shrink-0 ${big ? 'text-2xl' : 'text-base'}`}>
          {filled} / {TOPICS.length}
        </div>
      </div>

      {/* The ten topics */}
      <div className="flex-1 min-h-0 grid grid-cols-5 grid-rows-2 gap-[clamp(0.5rem,1.2vw,1rem)] p-[clamp(0.6rem,1.4vw,1.25rem)]">
        {TOPICS.map((t) => {
          const name = board[t.id]
          const isSel = selected === t.id
          return (
            <button
              key={t.id}
              onClick={() => setSelected(isSel ? null : t.id)}
              className={`relative min-h-0 min-w-0 flex flex-col text-left rounded-2xl bg-white dark:bg-slate-900 overflow-hidden transition-all ${isSel ? 'border-[5px] shadow-[0_0_0_6px_rgba(194,94,18,0.25)]' : 'border-[3px] hover:-translate-y-0.5'}`}
              style={{ borderColor: isSel ? KEY : t.color }}
            >
              <div className="px-[clamp(0.5rem,1vw,0.9rem)] pt-[clamp(0.4rem,1vh,0.8rem)] pb-1" style={{ backgroundColor: `${t.color}14` }}>
                <span
                  className="inline-block rounded-full text-white font-black leading-none px-2.5 py-1 text-[clamp(0.7rem,1.5vh,1.05rem)]"
                  style={{ backgroundColor: t.color }}
                >
                  {t.unit}
                </span>
                <div className="mt-1 font-black leading-tight text-slate-800 dark:text-slate-100 text-[clamp(0.8rem,min(2.5vh,1.35vw),1.6rem)]">
                  {tr(lang, t.en, t.vn)}
                </div>
                {t.sub && (
                  <div className="font-bold leading-tight text-slate-500 dark:text-slate-400 text-[clamp(0.65rem,1.8vh,1.15rem)]">
                    {tr(lang, t.sub, t.subVn)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-h-0 flex items-center justify-center px-2 text-center">
                {name ? (
                  <span
                    key={name}
                    className="font-black tracking-tight leading-tight break-words text-slate-900 dark:text-white animate-in zoom-in-50 fade-in duration-500 text-[clamp(1.1rem,min(5vh,2.6vw),3.4rem)]"
                  >
                    {name}
                  </span>
                ) : (
                  <span className="font-black text-slate-200 dark:text-slate-700 text-[clamp(1.6rem,6vh,4rem)]">?</span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Names and controls */}
      <div className="shrink-0 flex items-center gap-4 px-4 sm:px-6 py-3 border-t-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex-1 min-w-0">
          {roster.length === 0 ? (
            <div className={`font-bold text-slate-500 dark:text-slate-400 ${big ? 'text-lg' : 'text-sm'}`}>
              {tr(lang,
                'No class list on this computer yet. Add it with the list button beside Pick.',
                'Máy này chưa có danh sách lớp. Thêm bằng nút danh sách cạnh nút Chọn.')}
            </div>
          ) : (
            <>
              <div className={`font-black uppercase tracking-widest mb-1.5 ${big ? 'text-sm' : 'text-[11px]'} ${selTopic ? 'text-[#c25e12]' : 'text-slate-400 dark:text-slate-500'}`}>
                {selTopic
                  ? tr(lang, `Tap a name for ${selTopic.en}`, `Chạm vào một tên cho: ${selTopic.vn}`)
                  : free.length
                    ? tr(lang, 'No topic yet', 'Chưa có đề tài')
                    : tr(lang, 'Everyone has a topic', 'Ai cũng đã có đề tài')}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(selTopic ? roster : free).map((n) => {
                  const unit = unitOf(n)
                  const here = selTopic && board[selTopic.id] === n
                  return selTopic ? (
                    <button
                      key={n}
                      onClick={() => assign(n)}
                      className={`inline-flex items-center gap-1.5 rounded-full border-2 font-black transition-colors active:scale-95 ${big ? 'px-3.5 py-1.5 text-base' : 'px-3 py-1 text-sm'} ${here ? 'bg-[#c25e12] border-[#c25e12] text-white' : unit ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-[#c25e12]' : 'bg-white dark:bg-slate-800 border-[#c25e12] text-slate-800 dark:text-slate-100 hover:bg-[#fdf1e3] dark:hover:bg-slate-700'}`}
                    >
                      {n}
                      {unit && !here && <span className="text-[0.7em] font-bold opacity-70">{unit}</span>}
                    </button>
                  ) : (
                    <span
                      key={n}
                      className={`inline-block rounded-full border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-black text-slate-700 dark:text-slate-200 ${big ? 'px-3.5 py-1.5 text-base' : 'px-3 py-1 text-sm'}`}
                    >
                      {n}
                    </span>
                  )
                })}
                {selTopic && board[selTopic.id] && (
                  <button
                    onClick={unassign}
                    className={`inline-flex items-center gap-1 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 font-black text-slate-500 dark:text-slate-400 hover:border-[#c8102e] hover:text-[#c8102e] active:scale-95 ${big ? 'px-3.5 py-1.5 text-base' : 'px-3 py-1 text-sm'}`}
                  >
                    <X className="w-4 h-4" strokeWidth={3} />
                    {tr(lang, 'Nobody', 'Để trống')}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <Btn tone="orange" icon={Shuffle} big={big} onClick={pick} disabled={!free.length || !target}>
            {tr(lang, 'Pick', 'Chọn')}
          </Btn>
          <Btn tone={confirmClear ? 'red' : 'slate'} icon={Trash2} big={big} onClick={clearAll} disabled={!filled}>
            {confirmClear ? tr(lang, 'Sure?', 'Chắc chưa?') : tr(lang, 'Clear', 'Xoá hết')}
          </Btn>
        </div>
      </div>
    </div>
  )
}

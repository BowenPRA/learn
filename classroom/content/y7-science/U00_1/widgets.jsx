// content/y7-science/U00_1/widgets.jsx
// Interactive tools for Day One. Two of them, and both do one thing.
//
// Each takes the deck's `lang` so its own interface is bilingual like the rest
// of the slide. Colours are the Cambridge tokens used by the note cards.
import { useState } from 'react'

const TEAL = '#0087a8'
const ORANGE = '#c25e12'

const pick = (lang, en, vn) => (lang === 'vn' ? (vn ?? en) : en)

/* ============================================================= *
 * WIDGET 1 — THE WEEKLY SCHEDULE
 * The timetable as the students read it, with Mr Bowen's blocks
 * lit up and everything else left quiet. It is a table, not a
 * toy: nothing to click, nothing to fiddle with.
 * ============================================================= */
const ROWS = [
  { time: '8:00', label: 'Arrival', labelVn: 'Đến lớp', who: '', tone: 'quiet' },
  { time: '8:30', label: 'Homeroom', labelVn: 'Sinh hoạt lớp', who: 'Mr Bowen', tone: 'mine' },
  { time: '8:45', label: 'Science', labelVn: 'Khoa học', who: 'Mr Bowen', tone: 'mine' },
  { time: '9:35', label: 'English', labelVn: 'Tiếng Anh', who: 'Mr David', tone: 'other' },
  { time: '10:25', label: 'Break', labelVn: 'Giải lao', who: '', tone: 'quiet' },
  { time: '10:45', label: 'Math', labelVn: 'Toán', who: 'Mr Bowen', tone: 'mine' },
  { time: '11:35', label: 'History & Executive Function', labelVn: 'Lịch sử & Kỹ năng học tập', who: 'Ms Kiu', tone: 'other' },
  { time: '12:25', label: 'Lunch', labelVn: 'Ăn trưa', who: '', tone: 'quiet' },
  { time: '13:15', label: 'Art of Science / PE', labelVn: 'Nghệ thuật Khoa học / Thể dục', who: 'Mr Seth · Mr Caleb', tone: 'other' },
  { time: '14:05', label: 'Break', labelVn: 'Giải lao', who: '', tone: 'quiet' },
  { time: '14:25', label: 'Review / Maker Space / Well-being', labelVn: 'Ôn tập / Maker Space / Sức khoẻ', who: 'Mr David · Mr Bowen · Ms Kiu', tone: 'other' },
]

const TONE_STYLE = {
  mine: { bg: '#e6f4f8', border: TEAL, text: '#0f3f4d' },
  other: { bg: '#ffffff', border: '#cbd5e1', text: '#334155' },
  quiet: { bg: '#f8fafc', border: '#e2e8f0', text: '#94a3b8' },
}

export const ScheduleWidget = ({ lang = 'en' }) => (
  <div className="w-full h-full flex flex-col bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 shadow-inner p-2 sm:p-3">
    <div className="flex items-center justify-between px-1 pb-1.5">
      <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">
        {pick(lang, 'Mon – Fri, every week', 'T2 – T6, mỗi tuần')}
      </span>
      <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest" style={{ color: TEAL }}>
        {pick(lang, 'teal = Mr Bowen', 'xanh = thầy Bowen')}
      </span>
    </div>

    <div className="flex-1 min-h-0 flex flex-col gap-[3px]">
      {ROWS.map((r, i) => {
        const st = TONE_STYLE[r.tone]
        return (
          <div
            key={i}
            className="flex-1 min-h-0 flex items-center gap-2 sm:gap-3 rounded-lg border-2 px-2 sm:px-3"
            style={{ backgroundColor: st.bg, borderColor: st.border }}
          >
            <span className="w-12 sm:w-14 shrink-0 font-mono font-black text-[11px] sm:text-[13px] tabular-nums" style={{ color: st.text }}>
              {r.time}
            </span>
            <span className="flex-1 min-w-0 truncate font-bold text-[12px] sm:text-[14px]" style={{ color: st.text }}>
              {pick(lang, r.label, r.labelVn)}
            </span>
            {r.who && (
              <span className="shrink-0 font-semibold text-[10px] sm:text-xs" style={{ color: r.tone === 'mine' ? TEAL : '#94a3b8' }}>
                {r.who}
              </span>
            )}
          </div>
        )
      })}
    </div>
  </div>
)

/* ============================================================= *
 * WIDGET 2 — THREE THINGS ABOUT MR BOWEN
 * The teacher fills in the same three sentence stems the class
 * just filled in. Each answer is hidden behind its own button so
 * the room can guess first, one at a time.
 * ============================================================= */
const ABOUT_ME = [
  {
    stem: 'An interesting thing that happened to me when I was a kid…',
    stemVn: 'Một chuyện thú vị đã xảy ra với thầy hồi nhỏ…',
    answer: 'I broke my arm roller skating. Twice.',
    answerVn: 'Thầy bị gãy tay khi trượt patin. Hai lần.',
  },
  {
    stem: 'My favourite food or drink in the world is…',
    stemVn: 'Món ăn hoặc thức uống thầy thích nhất trên đời là…',
    answer: 'Coffee.',
    answerVn: 'Cà phê.',
  },
  {
    stem: 'If I had 10 million dollars…',
    stemVn: 'Nếu thầy có 10 triệu đô la…',
    answer: 'I would quit teaching, retire, and never be seen again.',
    answerVn: 'Thầy sẽ nghỉ dạy, về hưu, và không ai còn thấy thầy nữa.',
  },
]

export const AboutMrBowenWidget = ({ lang = 'en' }) => {
  const [shown, setShown] = useState([])
  const reveal = (i) => setShown((s) => (s.includes(i) ? s : [...s, i]))

  return (
    <div className="w-full h-full flex flex-col gap-2 sm:gap-3">
      {ABOUT_ME.map((item, i) => {
        const on = shown.includes(i)
        return (
          <div
            key={i}
            className="flex-1 min-h-0 flex flex-col justify-center rounded-2xl border-2 px-3 sm:px-5 py-2 sm:py-3 transition"
            style={{
              backgroundColor: on ? '#fdf1e3' : '#ffffff',
              borderColor: on ? ORANGE : '#cbd5e1',
            }}
          >
            <p className="font-bold text-slate-500 text-[12px] sm:text-[15px] leading-snug">
              {pick(lang, item.stem, item.stemVn)}
            </p>
            {on ? (
              <p className="mt-1 font-black leading-snug text-[15px] sm:text-xl" style={{ color: '#b4530c' }}>
                {pick(lang, item.answer, item.answerVn)}
              </p>
            ) : (
              <button
                onClick={() => reveal(i)}
                className="mt-2 self-start px-4 py-1.5 rounded-lg text-white font-black uppercase tracking-widest text-[10px] sm:text-xs shadow-sm active:scale-95"
                style={{ backgroundColor: ORANGE }}
              >
                {pick(lang, 'Guess first, then reveal', 'Đoán trước, rồi hiện đáp án')}
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Shared wording and colours for timed writing: the three parts of the mark, the mark's
// colour, dates and times, and the flags a teacher (and the student) sees.
import { tr } from '../../src/utils/lang.js'

export const TRAITS = [
  { key: 'ideas', label: 'Ideas', labelVn: 'Ý tưởng', ink: '#7C5CFF' },
  { key: 'organisation', label: 'Organisation', labelVn: 'Bố cục', ink: '#0ea5e9' },
  { key: 'language', label: 'Language', labelVn: 'Ngôn ngữ', ink: '#f97316' },
]

/** A mark's colour: green at 9 and up, amber 6 to 8, rose below. */
export function markTone(mark) {
  if (mark == null) return { face: '#94a3b8', edge: '#64748b' }
  if (mark >= 9) return { face: '#58cc02', edge: '#58a700' }
  if (mark >= 6) return { face: '#ff9600', edge: '#cc7800' }
  return { face: '#f43f5e', edge: '#be123c' }
}

export const fmtDate = (iso, lang = 'en') => {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString(lang === 'vn' ? 'vi-VN' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const fmtMinutes = (s) => `${Math.floor((s || 0) / 60)}:${String((s || 0) % 60).padStart(2, '0')}`

/** What happened while the essay was written, as lines; `warn` ones are worth a teacher's look. */
export function flagLines(essay, lang = 'en') {
  const f = essay?.flags || {}
  const r = essay?.report || {}
  const out = []
  if (f.tabAways > 0) out.push({ warn: f.tabAways >= 3, text: tr(lang, `Left the writing page ${f.tabAways} time${f.tabAways === 1 ? '' : 's'}${f.secondsAway ? ` (${fmtMinutes(f.secondsAway)} away)` : ''}.`, `Rời trang viết ${f.tabAways} lần.`) })
  if (f.pasteTries > 0) out.push({ warn: true, text: tr(lang, `Tried to paste ${f.pasteTries} time${f.pasteTries === 1 ? '' : 's'} (blocked).`, `Thử dán ${f.pasteTries} lần (bị chặn).`) })
  if (f.bigInserts > 0) out.push({ warn: true, text: tr(lang, `${f.bigInserts} large block${f.bigInserts === 1 ? '' : 's'} of text appeared at once.`, `${f.bigInserts} đoạn chữ lớn xuất hiện cùng lúc.`) })
  if (f.timedOut) out.push({ warn: false, text: tr(lang, 'Handed in when the time ran out.', 'Nộp khi hết giờ.') })
  if (f.late) out.push({ warn: true, text: tr(lang, 'The page was closed before the end; handed in as last saved.', 'Trang bị đóng trước khi xong; nộp bản lưu cuối.') })
  if (r.classmateMatch >= 0.3) out.push({ warn: true, text: tr(lang, `About ${Math.round(r.classmateMatch * 100)}% matches another student's essay. Your teacher will look at this.`, `Khoảng ${Math.round(r.classmateMatch * 100)}% giống bài của học viên khác. Giáo viên sẽ xem lại.`) })
  return out
}

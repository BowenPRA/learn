// Learning-area keys as on The Current's Teachers page ('math:Year 5'), with the
// names a child sees. Unknown keys fall back to the key in Title Case.
const NAMES = {
  math: ['Maths', 'Toán'],
  english: ['English', 'Tiếng Anh'],
  science: ['Science', 'Khoa học'],
  history: ['Social Studies', 'Xã hội'],
  technology: ['Technology', 'Công nghệ'],
  wellbeing: ['Wellbeing', 'Kỹ năng sống'],
  art_craft: ['Art and Craft', 'Mỹ thuật'],
  cooking: ['Cooking', 'Nấu ăn'],
  movement: ['Movement', 'Vận động'],
  everyday_experts: ['Everyday Experts', 'Everyday Experts'],
  executive_function: ['Executive Function', 'Kỹ năng tự quản'],
  art_of_science: ['Art of Science', 'Art of Science'],
  master_minds: ['Master Minds', 'Master Minds'],
  presentation_play: ['Presentation and Play', 'Thuyết trình và trò chơi'],
  applied_english: ['Applied English', 'Tiếng Anh ứng dụng'],
}
// One accent per subject for icons and rings (small accents only, never page colours).
const TONE = { math: '#116DFF', english: '#7C5CFF', science: '#48971D', history: '#F5A623' }

export const splitClass = (key) => {
  const i = String(key || '').indexOf(':')
  return i < 0 ? [String(key || ''), ''] : [key.slice(0, i), key.slice(i + 1)]
}
export function subjectName(subject, lang) {
  const n = NAMES[subject]
  if (n) return n[lang === 'vn' ? 1 : 0]
  return String(subject || '').split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}
export const subjectTone = (subject) => TONE[subject] || '#2F7D14'
/** 'math:Year 5' -> 'Year 5 Maths' (EN) / 'Toán Year 5' (VN). */
export function className(key, lang) {
  const [s, yg] = splitClass(key)
  return lang === 'vn' ? `${subjectName(s, lang)} ${yg}` : `${yg} ${subjectName(s, lang)}`
}

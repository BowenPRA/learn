// content/y7-math/T03_poster-showcase/topics.js
// The ten poster topics, one per student, in the order they were taught. The
// topic board (widgets.jsx) reads this list; the tiles in diagrams.js draw the
// same ten by hand, because audit:svg can only check literal <text>.
//
// Square roots and cube roots (1.6) is deliberately NOT here: it is the
// example poster, so nobody is given it.
//
// `sub` is a small second line on the board card: long division belongs to the
// rounding poster, because every rounding question there starts with one.
//
// `id` is the key the board saves under in localStorage. Renaming an id
// silently drops whoever was assigned to it on the classroom machine, so change
// the wording, never the id.
const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'
const RED = '#c8102e'

export const TOPICS = [
  { id: 'add-sub', unit: '1.1', color: TEAL, en: 'Adding and Subtracting Integers', vn: 'Cộng và trừ số nguyên' },
  { id: 'mul-div', unit: '1.2', color: PURPLE, en: 'Multiplying and Dividing Integers', vn: 'Nhân và chia số nguyên' },
  { id: 'lcm-hcf', unit: '1.3 + 1.4', color: GREEN, en: 'LCM and HCF', vn: 'BCNN và ƯCLN' },
  { id: 'divisibility', unit: '1.5', color: BLUE, en: 'Tests for Divisibility', vn: 'Dấu hiệu chia hết' },
  { id: 'formulae', unit: '2.2', color: RED, en: 'Formulae', vn: 'Công thức' },
  { id: 'brackets', unit: '2.4', color: TEAL, en: 'Expanding Brackets', vn: 'Khai triển dấu ngoặc' },
  { id: 'equations', unit: '2.5', color: PURPLE, en: 'Solving Equations', vn: 'Giải phương trình' },
  { id: 'inequalities', unit: '2.6', color: GREEN, en: 'Inequalities', vn: 'Bất đẳng thức' },
  { id: 'metric', unit: '3.1', color: BLUE, en: 'Converting Metric Units', vn: 'Đổi đơn vị đo' },
  { id: 'rounding', unit: '3.2', color: RED, en: 'Rounding to Decimal Places', vn: 'Làm tròn số thập phân', sub: '+ long division', subVn: '+ phép chia đặt tính' },
]

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

// The portal's own words, in English and Vietnamese. Lesson content carries its
// own `…Vn` twins. The language code is 'vn', as in the lesson data (classroom
// decks, Dashboard, step practice). Vietnamese: learners are "em" / "các em" /
// "học viên", never "học sinh"; PRA is never "trường".
const S = {
  appName: ['PRA Learn', 'PRA Learn'],
  imStudent: ['I\'m a student', 'Em là học viên'],
  imTeacher: ['I\'m a teacher', 'Giáo viên'],
  username: ['Username', 'Tên đăng nhập'],
  pin: ['PIN', 'Mã PIN'],
  go: ['Let\'s go', 'Vào học'],
  email: ['Email', 'Email'],
  password: ['Password', 'Mật khẩu'],
  signIn: ['Sign in', 'Đăng nhập'],
  shared: ['This is a shared computer', 'Đây là máy dùng chung'],
  cardHint: ['Your username and PIN are on your card.', 'Tên đăng nhập và mã PIN có trên thẻ của em.'],
  wrongStudent: ['That username or PIN is not right. Check your card.', 'Tên đăng nhập hoặc mã PIN chưa đúng. Em xem lại thẻ nhé.'],
  wrongStaff: ['That email or password is not right.', 'Email hoặc mật khẩu chưa đúng.'],
  offline: ['Can\'t reach PRA Learn. Check the internet.', 'Không kết nối được. Em kiểm tra mạng nhé.'],
  notStudent: ['This login is not a student login.', 'Tài khoản này không phải tài khoản học viên.'],
  demoBand: ['Demo with sample data. Nothing is saved online.', 'Bản thử với dữ liệu mẫu. Không có gì được lưu lên mạng.'],
  tryStudent: ['Try as a student', 'Thử với vai học viên'],
  tryTeacher: ['Try as Mr. David', 'Thử với vai thầy David'],
  hello: ['Hi, {name}!', 'Chào {name}!'],
  thisWeek: ['This week', 'Tuần này'],
  myClasses: ['My classes', 'Lớp của em'],
  myResults: ['My results', 'Kết quả của em'],
  nothingYet: ['Nothing here yet. Your teacher will open a lesson for you.', 'Chưa có bài nào. Thầy cô sẽ mở bài cho em.'],
  due: ['Due {date}', 'Hạn {date}'],
  review: ['Review', 'Ôn bài'],
  practice: ['Practice', 'Luyện tập'],
  reviewSub: ['Go back through the lesson', 'Xem lại bài học'],
  practiceSub: ['Problems, step by step', 'Làm bài từng bước'],
  start: ['Start', 'Bắt đầu'],
  again: ['Try again', 'Làm lại'],
  keepGoing: ['Keep going', 'Làm tiếp'],
  done: ['Done', 'Xong'],
  next: ['Next', 'Tiếp'],
  back: ['Back', 'Quay lại'],
  home: ['Home', 'Trang chính'],
  signOut: ['Sign out', 'Đăng xuất'],
  answerFirst: ['Answer the question to go on.', 'Em trả lời câu hỏi để đi tiếp nhé.'],
  right: ['Yes, that\'s right!', 'Đúng rồi!'],
  notQuite: ['Not quite. Read this, then choose again.', 'Chưa đúng. Em đọc phần này rồi chọn lại nhé.'],
  quickCheck: ['Quick check', 'Kiểm tra nhanh'],
  showMe: ['Show me', 'Cho em xem'],
  reviewDone: ['Review done!', 'Em đã ôn bài xong!'],
  practiceDone: ['Practice done!', 'Em đã luyện tập xong!'],
  rightFirst: ['{n} of {total} right the first time', 'Đúng ngay lần đầu: {n} / {total}'],
  nowPractise: ['Now practise', 'Giờ mình luyện tập'],
  preview: ['Teacher preview: nothing is saved.', 'Giáo viên xem thử: kết quả không được lưu.'],
  notSaved: ['Not saved yet. Check the internet.', 'Chưa lưu được. Em kiểm tra mạng nhé.'],
  notOpen: ['This lesson is not open.', 'Bài này chưa mở.'],
  loading: ['Loading…', 'Đang tải…'],
  notDone: ['Not done yet', 'Chưa làm'],
  stars: ['{n} of 3 stars', '{n} / 3 sao'],
  // Staff
  classes: ['Classes', 'Các lớp'],
  myClassesStaff: ['My classes', 'Lớp của tôi'],
  allClasses: ['Every class', 'Tất cả các lớp'],
  nStudents: ['{n} students', '{n} học viên'],
  nLogins: ['{n} logins', '{n} tài khoản'],
  nLessons: ['{n} lessons', '{n} bài'],
  lessons: ['Lessons', 'Bài học'],
  noLessons: ['No lessons yet. Ask for one on the Lessons page in The Current.', 'Chưa có bài nào. Thầy cô gửi yêu cầu ở trang Bài học trong The Current.'],
  whoDid: ['Who did what', 'Ai đã làm gì'],
  mostMissed: ['Most missed', 'Câu sai nhiều nhất'],
  noMisses: ['No answers yet.', 'Chưa có câu trả lời nào.'],
  openForClass: ['Open for the class', 'Mở cho lớp'],
  hide: ['Hide', 'Ẩn'],
  status_draft: ['Draft', 'Bản nháp'],
  status_published: ['Open', 'Đang mở'],
  status_hidden: ['Hidden', 'Đã ẩn'],
  dueOn: ['Due', 'Hạn nộp'],
  preview_: ['Preview', 'Xem thử'],
  makeLogins: ['Make logins', 'Tạo tài khoản'],
  makeLoginsFor: ['Make logins for {n} students', 'Tạo tài khoản cho {n} học viên'],
  printCards: ['Print login cards', 'In thẻ đăng nhập'],
  newPin: ['New PIN', 'Mã PIN mới'],
  block: ['Block', 'Khóa'],
  unblock: ['Unblock', 'Mở khóa'],
  noLogin: ['No login', 'Chưa có tài khoản'],
  blocked: ['Blocked', 'Đã khóa'],
  lastSeen: ['Last seen', 'Lần cuối vào'],
  never: ['never', 'chưa'],
  student: ['Student', 'Học viên'],
  login: ['Login', 'Tài khoản'],
  notStarted: ['Not started', 'Chưa làm'],
  started: ['Started', 'Đang làm'],
  wrongFirst: ['{n} of {asked} wrong the first time', '{n} / {asked} em sai lần đầu'],
  slipCount: ['{n} ×', '{n} ×'],
  cardsTitle: ['Login cards', 'Thẻ đăng nhập'],
  cardsNote: ['Print these now. The PINs are shown only this once.', 'Thầy cô in ngay bây giờ. Mã PIN chỉ hiện lần này.'],
  cardsEmpty: ['No new PINs to print. Make logins or give someone a new PIN first.', 'Không có mã PIN mới để in. Thầy cô tạo tài khoản hoặc cấp mã PIN mới trước.'],
  print: ['Print', 'In'],
  goTo: ['Go to', 'Vào trang'],
  everyoneHasLogin: ['Everyone in this class has a login.', 'Mọi học viên trong lớp đã có tài khoản.'],
  confirmBlock: ['Block {name}\'s login? They will be signed out.', 'Khóa tài khoản của {name}? Em ấy sẽ bị đăng xuất.'],
  failed: ['Something went wrong: {msg}', 'Có lỗi: {msg}'],
  teacher: ['Teacher', 'Giáo viên'],
  notStaff: ['This login has no classes in PRA Learn.', 'Tài khoản này chưa có lớp nào trong PRA Learn.'],
  results: ['Results', 'Kết quả'],
  firstScore: ['First try', 'Lần đầu'],
  runs: ['Tries', 'Số lần'],
}

const Ctx = createContext(null)
const KEY = 'learn-lang'
const readLang = () => { try { return localStorage.getItem(KEY) === 'vn' ? 'vn' : 'en' } catch { return 'en' } }

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(readLang)
  useEffect(() => {
    document.documentElement.lang = lang === 'vn' ? 'vi' : 'en'
  }, [lang])
  const value = useMemo(() => {
    const t = (key, vars) => {
      const pair = S[key]
      let s = pair ? pair[lang === 'vn' ? 1 : 0] : key
      if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v)
      return s
    }
    const setLang = (l) => { try { localStorage.setItem(KEY, l) } catch { /* private window */ } setLangState(l) }
    return { lang, setLang, t }
  }, [lang])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useT = () => useContext(Ctx)

/** A field of lesson data in `lang`: obj.key, obj.keyVn; English when the twin is missing. */
export const pick = (obj, key, lang) => (obj ? (lang === 'vn' ? obj[`${key}Vn`] ?? obj[key] : obj[key]) : undefined)

/** A date ('2026-11-12') as "Thu 12 Nov" / "T5 12/11". */
export function shortDate(iso, lang) {
  if (!iso) return ''
  const d = new Date(`${String(iso).slice(0, 10)}T12:00:00`)
  if (Number.isNaN(d.getTime())) return String(iso)
  if (lang === 'vn') {
    const day = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][d.getDay()]
    return `${day} ${d.getDate()}/${d.getMonth() + 1}`
  }
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}

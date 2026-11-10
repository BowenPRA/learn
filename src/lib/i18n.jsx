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
  username: ['Your name', 'Tên của em'],
  namePlaceholder: ['e.g. Bowen', 'ví dụ: Bowen'],
  pin: ['Secret code', 'Mã bí mật'],
  go: ['Let\'s go', 'Vào học'],
  email: ['Email', 'Email'],
  password: ['Password', 'Mật khẩu'],
  signIn: ['Sign in', 'Đăng nhập'],
  shared: ['This is a shared computer', 'Đây là máy dùng chung'],
  cardHint: ['Type your name and your secret code. Forgot them? Ask your teacher.', 'Em gõ tên và mã bí mật của em. Quên thì hỏi thầy cô nhé.'],
  wrongStudent: ['That name or secret code is not right. Please try again.', 'Tên hoặc mã bí mật chưa đúng. Em thử lại nhé.'],
  wrongStaff: ['That email or password is not right.', 'Email hoặc mật khẩu chưa đúng.'],
  offline: ['Can\'t reach PRA Learn. Check the internet.', 'Không kết nối được. Em kiểm tra mạng nhé.'],
  notStudent: ['This login is not a student login.', 'Tài khoản này không phải tài khoản học viên.'],
  demoBand: ['Demo with sample data. Nothing is saved online.', 'Bản thử với dữ liệu mẫu. Không có gì được lưu lên mạng.'],
  tryStudent: ['Try as a student', 'Thử với vai học viên'],
  tryTeacher: ['Try as Mr. David', 'Thử với vai thầy David'],
  hello: ['Hi, {name}!', 'Chào {name}!'],
  // Sign-in page and the home page's welcome
  welcomeTo: ['Welcome to', 'Chào mừng em đến với'],
  heroLine: ['Review your lessons, practise step by step and collect stars.', 'Ôn bài, luyện tập từng bước và nhận sao.'],
  featReview: ['Review the lesson', 'Ôn lại bài'],
  featPractice: ['Practise step by step', 'Luyện tập từng bước'],
  featStars: ['Collect stars', 'Nhận sao'],
  staffHint: ['Teachers sign in with their The Current login.', 'Thầy cô đăng nhập bằng tài khoản The Current.'],
  pipName: ['Pip the otter', 'Rái cá Pip'],
  goodMorning: ['Good morning', 'Chào buổi sáng'],
  goodAfternoon: ['Good afternoon', 'Chào buổi chiều'],
  goodEvening: ['Good evening', 'Chào buổi tối'],
  heroLate1: ['1 lesson is late. Let\'s finish it first!', 'Có 1 bài quá hạn. Mình làm bài đó trước nhé!'],
  heroLateN: ['{n} lessons are late. Let\'s finish them first!', 'Có {n} bài quá hạn. Mình làm các bài đó trước nhé!'],
  heroWeek1: ['You have 1 lesson this week.', 'Tuần này em có 1 bài.'],
  heroWeekN: ['You have {n} lessons this week.', 'Tuần này em có {n} bài.'],
  heroLater: ['Nothing is due this week. You can start the next lesson early!', 'Tuần này chưa có bài đến hạn. Em có thể làm trước bài tiếp theo!'],
  starsTotal: ['stars', 'sao'],
  partsDone: ['parts done', 'phần đã xong'],
  continuePart: ['Keep going: {part}', 'Làm tiếp: {part}'],
  startPart: ['Start: {part}', 'Bắt đầu: {part}'],
  upNext: ['Up next', 'Làm tiếp theo'],
  thisWeek: ['This week', 'Tuần này'],
  myClasses: ['My classes', 'Lớp của em'],
  classLessons: ['Lessons from class', 'Bài học trên lớp'],
  units: ['Units', 'Chủ đề'],
  arcade: ['Arcade', 'Khu trò chơi'],
  arcadeHint: ['Every XP is 1 gold. Spend your gold on games.', 'Mỗi XP là 1 đồng vàng. Dùng vàng để chơi trò chơi.'],
  unitsHint: ['Each unit has its own tasks. Every task gives XP, up to 100 XP a unit.', 'Mỗi chủ đề có các nhiệm vụ riêng. Mỗi nhiệm vụ cho XP, tối đa 100 XP một chủ đề.'],
  unitsStaffHint: ['Each unit is a list of tasks, each worth its own XP, up to 100 XP a unit. Students in the year group open them from their home page. Open one to see it as they do; nothing is saved for staff.', 'Mỗi chủ đề gồm các nhiệm vụ, mỗi nhiệm vụ có số XP riêng, tối đa 100 XP một chủ đề. Học viên khối đó mở từ trang chủ của các em. Thầy cô mở thử để xem như học viên; không lưu gì cho giáo viên.'],
  heroUnit: ['Your next unit is waiting. Every part earns XP!', 'Chủ đề tiếp theo đang chờ em. Phần nào cũng có XP!'],
  classLessonsHint: ['The slides from class, with every activity. Look back at them any time.', 'Các trang bài giảng trên lớp, đủ mọi hoạt động. Em xem lại lúc nào cũng được.'],
  heroClass: ['Your lessons from class are here. Look back at them any time.', 'Bài học trên lớp của em ở đây. Em xem lại lúc nào cũng được.'],
  openLesson: ['Open: {title}', 'Mở bài: {title}'],
  nFromClass: ['{n} from class', '{n} bài trên lớp'],
  classLessonsStaffHint: ['The classroom slides, exactly as taught. Students in the year group open them from their home page; they are always open.', 'Bài giảng trên lớp, đúng như khi dạy. Học viên khối đó mở từ trang chủ của các em; bài luôn mở.'],
  // Lessons from class, by subject and book unit (10 Nov 2026: 55 Year 7 lessons)
  classUnit: ['Unit {n}', 'Chương {n}'],
  classCount1: ['1 lesson', '1 bài'],
  classCountN: ['{n} lessons', '{n} bài'],
  classCountUnits: ['{n} lessons in {u} units', '{n} bài, {u} chương'],
  classNewest: ['Newest', 'Mới nhất'],
  classAll: ['All {n} lessons, by unit', 'Xem cả {n} bài, theo từng chương'],
  classFewer: ['Only the newest', 'Chỉ xem các bài mới nhất'],
  classPlan: ['Plan', 'Giáo án'],
  classPlanTitle: ['The teacher\'s plan for this lesson', 'Giáo án của bài này'],
  classLessonsClassHint: ['Always open to this class: students find them on their home page. Nothing to set.', 'Luôn mở cho lớp này: học viên thấy ngay ở trang chủ của các em. Thầy cô không cần làm gì.'],
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
  // Student home, read aloud, done screens
  practiceN: ['Practice {n}', 'Luyện tập {n}'],
  nOfTotal: ['{n} of {total}', '{n}/{total}'],
  late: ['Late', 'Quá hạn'],
  lateHead: ['Late: finish these first', 'Quá hạn: em làm các bài này trước nhé'],
  comingUp: ['Coming up', 'Sắp tới'],
  doneList: ['Done', 'Đã xong'],
  allCaughtUp: ['You have finished everything. Well done!', 'Em đã làm xong hết bài. Giỏi lắm!'],
  listen: ['Listen', 'Nghe'],
  stopListen: ['Stop', 'Dừng'],
  next_: ['Next: {part}', 'Tiếp theo: {part}'],
  packDone: ['You finished the whole lesson!', 'Em đã hoàn thành cả bài!'],
  packDoneSub: ['Every part is done.', 'Em đã làm xong tất cả các phần.'],
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
  makeLoginFor1: ['Make a login for 1 student', 'Tạo tài khoản cho 1 học viên'],
  cardsHow: ['Making logins opens a page of login cards to print. Each student signs in with their nickname and their student number as a 3-digit secret code.', 'Khi tạo tài khoản, trang thẻ đăng nhập sẽ mở ra để thầy cô in. Học viên đăng nhập bằng tên thường gọi và mã bí mật là số học viên (3 chữ số).'],
  resetDemo: ['Start over', 'Làm lại từ đầu'],
  printCards: ['Print login cards', 'In thẻ đăng nhập'],
  newPin: ['Reset code', 'Đặt lại mã'],
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
  cardsNote: ['Print these and give each student their card. The secret code is their student number, so a lost card can be printed again.', 'Thầy cô in thẻ và phát cho từng em. Mã bí mật là số học viên, nên mất thẻ thì in lại được.'],
  cardsEmpty: ['No cards to print. Make logins first, or press Reset code for a student.', 'Không có thẻ để in. Thầy cô tạo tài khoản trước, hoặc bấm Đặt lại mã cho một em.'],
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

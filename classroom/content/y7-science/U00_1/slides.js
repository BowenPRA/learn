// content/y7-science/U00_1/slides.js
// Year 7 · Day One — Tuesday 4 August 2026.
//
// Covers homeroom and the science period only. The Stage 6 diagnostic runs in
// the maths period at 10:45 and is taught off the paper, not off a deck.
//
// Order: the game first, while the room is still awake, then the schedule and
// the homeroom routine, then the expectation letter, then the binder.
//
// Styled after the Cambridge Lower Secondary Learner's Book: teal section
// headers, purple activity boxes, red homework, and the book's orange for
// everything a student has to copy down or do. On day one almost nothing goes
// in a notebook — so here the orange panels carry the INSTRUCTIONS, and they
// are the only place instructions live.
import { DIAGRAMS } from './diagrams.js'
import { ScheduleWidget, AboutMrBowenWidget } from './widgets.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const RED = '#c8102e'
const BLUE = '#1a5fa8'

export const slides = [
  {
    layout: 'hero',
    color: '#0087a8',
    icon: 'Sparkles',
    brand: 'Year 7 · Homeroom and Science',
    brandVn: 'Lớp 7 · Sinh hoạt lớp và Khoa học',
    eyebrow: 'Day One',
    eyebrowVn: 'Ngày đầu tiên',
    date: '4 Aug 2026',
    title: 'Welcome to Year 7',
    titleVn: 'Chào mừng đến với Lớp 7',
    subtitle: 'I am Mr Bowen. I teach your Science and your Mathematics, and I am your homeroom teacher.',
    subtitleVn: 'Thầy là thầy Bowen. Thầy dạy Khoa học và Toán, và cũng là giáo viên chủ nhiệm của em.',
  },

  // ── The game ─────────────────────────────────────────────────────────────
  {
    layout: 'stack',
    accent: PURPLE,
    icon: 'Pencil',
    columns: 1,
    eyebrow: 'Three slips of paper on your desk',
    eyebrowVn: 'Ba mảnh giấy trên bàn em',
    title: 'Finish These Three Sentences',
    titleVn: 'Hoàn thành ba câu này',
    content: 'One sentence per slip. **No names.** Fold them and put them in the bin.',
    contentVn: 'Mỗi mảnh giấy một câu. **Không ghi tên.** Gấp lại và bỏ vào hộp.',
    notes: [
      {
        tone: 'write',
        badge: 'Slip 1',
        badgeVn: 'Phiếu 1',
        text: 'An interesting thing that happened to me when I was a kid…',
        textVn: 'An interesting thing that happened to me when I was a kid…',
      },
      {
        tone: 'write',
        badge: 'Slip 2',
        badgeVn: 'Phiếu 2',
        text: 'My favourite food or drink in the world is…',
        textVn: 'My favourite food or drink in the world is…',
      },
      {
        tone: 'write',
        badge: 'Slip 3',
        badgeVn: 'Phiếu 3',
        text: 'If I had 10 million dollars…',
        textVn: 'If I had 10 million dollars…',
      },
    ],
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Users',
    title: '3 Things About Mr Bowen',
    titleVn: '3 điều về thầy Bowen',
    ratio: 40,
    side: 'left',
    widget: AboutMrBowenWidget,
    content:
      'Same three sentences, my answers.\n\n' +
      'Guess each one before I press the button.',
    contentVn:
      'Cùng ba câu đó, đây là câu trả lời của thầy.\n\n' +
      'Hãy đoán từng câu trước khi thầy bấm nút.',
  },
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Quote',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    title: 'A Sentence, Not a Word',
    titleVn: 'Một câu, không phải một từ',
    content: 'If I pull out a slip that just says "**coffee**", there is nothing to guess. This is the rule all year, in every subject I teach.',
    contentVn: 'Nếu thầy rút ra một phiếu chỉ ghi "**coffee**", thì chẳng có gì để đoán. Đây là quy tắc cả năm, trong mọi môn thầy dạy.',
    notes: [
      {
        tone: 'info',
        badge: 'Not this',
        badgeVn: 'Không viết thế này',
        text: 'Coffee. · A broken arm. · A big house.',
        textVn: 'Coffee. · A broken arm. · A big house.',
      },
      {
        tone: 'write',
        badge: 'This',
        badgeVn: 'Hãy viết thế này',
        text: '**My favourite drink in the world is** coffee, and I drink three cups before this lesson starts.',
        textVn: '**My favourite drink in the world is** coffee, and I drink three cups before this lesson starts.',
      },
    ],
  },
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'The bin game',
    eyebrowVn: 'Trò chơi bốc phiếu',
    title: 'How One Round Works',
    titleVn: 'Một lượt chơi diễn ra thế nào',
    steps: [
      { text: 'I pull one slip out of the bin. **Nobody speaks.**', textVn: 'Thầy rút một phiếu khỏi hộp. **Không ai nói gì.**' },
      { text: 'I read it out **twice**, slowly.', textVn: 'Thầy đọc to **hai lần**, thật chậm.' },
      { text: 'I count **three, two, one** — everybody **points** at who they think wrote it.', textVn: 'Thầy đếm **ba, hai, một** — mọi người **chỉ tay** vào người mình nghĩ đã viết.' },
      { text: 'The writer **stands up** and says it again out loud.', textVn: 'Người viết **đứng lên** và nói lại thành tiếng.' },
      { text: 'Most of the class right, **the class scores**. Wrong, **the writer scores**.', textVn: 'Phần lớn lớp đoán đúng thì **cả lớp ghi điểm**. Sai thì **người viết ghi điểm**.' },
    ],
  },

  // ── The week, and the morning routine ────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Layers',
    title: 'Your Week, Every Week',
    titleVn: 'Lịch học của em, mỗi tuần',
    ratio: 45,
    side: 'left',
    widget: ScheduleWidget,
    content: 'The same every day, Monday to Friday. Learn it this week and you will never have to ask which book to bring.',
    contentVn: 'Giống nhau mỗi ngày, thứ Hai đến thứ Sáu. Thuộc nó tuần này thì em sẽ không phải hỏi hôm nay mang sách gì.',
    notes: [
      {
        tone: 'write',
        badge: 'Know these four times',
        badgeVn: 'Nhớ bốn mốc giờ này',
        text: 'School **8:00** · Homeroom **8:30** · Science **8:45** · Mathematics **10:45**.',
        textVn: 'Vào trường **8:00** · Sinh hoạt lớp **8:30** · Khoa học **8:45** · Toán **10:45**.',
      },
    ],
  },
  {
    layout: 'stack',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Fifteen minutes, same four things, every day',
    eyebrowVn: 'Mười lăm phút, cùng bốn việc, mỗi ngày',
    title: 'Homeroom Every Morning',
    titleVn: 'Sinh hoạt lớp mỗi sáng',
    notes: [
      {
        tone: 'write',
        badge: 'Arrive',
        badgeVn: 'Đến lớp',
        icon: 'Home',
        text: 'Sitting down by **8:30**. Bag away, pencil out.',
        textVn: 'Ngồi vào chỗ trước **8:30**. Cất cặp, lấy bút ra.',
      },
      {
        tone: 'write',
        badge: 'Phone',
        badgeVn: 'Điện thoại',
        icon: 'AlertTriangle',
        text: 'Left at **reception** on the way in. Not in your bag, not in your pocket.',
        textVn: 'Gửi tại **lễ tân** khi vào trường. Không để trong cặp, không để trong túi.',
      },
      {
        tone: 'write',
        badge: 'Planner',
        badgeVn: 'Sổ liên lạc',
        icon: 'BookOpen',
        text: 'Open on the desk. Deadlines and my feedback go in it.',
        textVn: 'Mở sẵn trên bàn. Hạn nộp bài và nhận xét của thầy được ghi vào đó.',
      },
      {
        tone: 'write',
        badge: 'Notices',
        badgeVn: 'Thông báo',
        icon: 'MessageSquare',
        text: 'I read out what is happening today. Listen the first time.',
        textVn: 'Thầy đọc các việc trong ngày. Hãy nghe ngay lần đầu.',
      },
    ],
  },

  // ── The expectation letter, one section per slide ────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'The letter in front of you',
    eyebrowVn: 'Lá thư trước mặt em',
    title: 'Class Expectations',
    titleVn: 'Nội quy và kỳ vọng của lớp',
    label: 'Follow along',
    labelVn: 'Đọc theo',
    labelIcon: 'BookOpen',
    text: 'You each have a **copy of this letter**, and it goes home tonight.',
    textVn: 'Mỗi em có **một bản của lá thư này**, và tối nay nó sẽ được mang về nhà.',
    sub: 'If there is a word you do not know, put your hand up and stop me.',
    subVn: 'Nếu có từ nào em không hiểu, hãy giơ tay và dừng thầy lại.',
  },
  {
    layout: 'stack',
    accent: TEAL,
    icon: 'MessageSquare',
    columns: 1,
    eyebrow: 'Letter · Section 1',
    eyebrowVn: 'Lá thư · Phần 1',
    title: 'How Your Family Contacts School',
    titleVn: 'Gia đình liên lạc với trường thế nào',
    notes: [
      {
        tone: 'theory',
        badge: 'My subjects',
        badgeVn: 'Các môn của thầy',
        text: 'Science, Mathematics, homeroom, routines — email me at **bowen@pra.edu.vn**. Allow **three working days**.',
        textVn: 'Khoa học, Toán, sinh hoạt lớp, nề nếp — gửi email cho thầy: **bowen@pra.edu.vn**. Chờ tối đa **ba ngày làm việc**.',
      },
      {
        tone: 'theory',
        badge: 'Everything else',
        badgeVn: 'Những việc khác',
        text: 'Art, PE, Fashion and Textiles, anything urgent — **admin@palmriveracademy.edu.vn**.',
        textVn: 'Mỹ thuật, Thể dục, Thời trang và Dệt may, việc khẩn cấp — **admin@palmriveracademy.edu.vn**.',
      },
      {
        tone: 'info',
        badge: 'Sent to you anyway',
        badgeVn: 'Tự động gửi',
        text: 'A **weekly update** on Google Classroom, and the **school newsletter every Friday**.',
        textVn: 'Một **cập nhật hằng tuần** trên Google Classroom, và **bản tin trường mỗi thứ Sáu**.',
      },
    ],
  },
  {
    layout: 'stack',
    accent: BLUE,
    icon: 'BookOpen',
    columns: 1,
    eyebrow: 'Letter · Section 2',
    eyebrowVn: 'Lá thư · Phần 2',
    title: 'Feedback and Your Planner',
    titleVn: 'Nhận xét và sổ liên lạc',
    content: 'The planner only works if it travels between this room and your kitchen table.',
    contentVn: 'Sổ liên lạc chỉ có tác dụng nếu được mang đi mang về giữa lớp học và nhà em.',
    notes: [
      {
        tone: 'write',
        badge: 'Your job',
        badgeVn: 'Việc của em',
        text: 'Write **every deadline** in it, the day it is set. Bring it to every lesson.',
        textVn: 'Ghi **mọi hạn nộp** vào đó ngay hôm được giao. Mang theo mọi tiết học.',
      },
      {
        tone: 'theory',
        badge: 'My job',
        badgeVn: 'Việc của thầy',
        text: 'I write **feedback on your progress** in it. Your family can write back to me in the same book.',
        textVn: 'Thầy ghi **nhận xét về tiến bộ của em** vào đó. Gia đình em có thể viết phản hồi ngay trong sổ.',
      },
    ],
  },
  {
    layout: 'stack',
    accent: RED,
    icon: 'AlertTriangle',
    columns: 1,
    eyebrow: 'Letter · Section 3',
    eyebrowVn: 'Lá thư · Phần 3',
    title: 'Phones and Digital Responsibility',
    titleVn: 'Điện thoại và trách nhiệm số',
    notes: [
      {
        tone: 'homework',
        badge: 'Phone-free campus',
        badgeVn: 'Trường không điện thoại',
        icon: 'AlertTriangle',
        text: 'You may bring a phone, but it is **left at reception** and collected at the **end of the day**.',
        textVn: 'Em được mang điện thoại, nhưng phải **gửi ở lễ tân** và **nhận lại cuối ngày**.',
      },
      {
        tone: 'homework',
        badge: 'If it is not checked in',
        badgeVn: 'Nếu không gửi',
        icon: 'AlertTriangle',
        text: 'The phone **stays at home** from then on, and **your family is notified**.',
        textVn: 'Điện thoại sẽ **phải để ở nhà** từ đó về sau, và **gia đình sẽ được thông báo**.',
      },
      {
        tone: 'theory',
        badge: 'Online',
        badgeVn: 'Trên mạng',
        text: 'Follow the **age rules** of every platform — **Discord is not allowed under 15**.',
        textVn: 'Tuân thủ **quy định độ tuổi** của mọi nền tảng — **Discord không dành cho dưới 15 tuổi**.',
      },
    ],
  },
  {
    layout: 'stack',
    accent: PURPLE,
    icon: 'ShieldCheck',
    columns: 1,
    eyebrow: 'Letter · Section 4',
    eyebrowVn: 'Lá thư · Phần 4',
    title: 'The Family Handbook',
    titleVn: 'Sổ tay Gia đình',
    content: 'Your family signs up to this, and so do you.',
    contentVn: 'Gia đình em cam kết thực hiện, và em cũng vậy.',
    notes: [
      {
        tone: 'task',
        badge: 'What it covers',
        badgeVn: 'Nội dung',
        icon: 'ShieldCheck',
        text:
          '**Behaviour and conduct.**\n' +
          '**Attendance, dress and classroom guidelines.**\n' +
          '**Responsibilities** of students and families.\n' +
          '**Devices** and appropriate use of technology.',
        textVn:
          '**Hành vi và ứng xử.**\n' +
          '**Chuyên cần, đồng phục và nề nếp lớp học.**\n' +
          '**Trách nhiệm** của học sinh và gia đình.\n' +
          '**Thiết bị** và việc dùng công nghệ đúng mực.',
      },
    ],
  },
  {
    layout: 'stack',
    accent: ORANGE,
    icon: 'Pencil',
    columns: 1,
    eyebrow: 'Letter · Section 5',
    eyebrowVn: 'Lá thư · Phần 5',
    title: 'Homework and Notebooks',
    titleVn: 'Bài tập về nhà và vở ghi',
    notes: [
      {
        tone: 'write',
        badge: 'Every week',
        badgeVn: 'Hằng tuần',
        text: 'Homework **every week** — a paper packet, or questions from the **Learner’s Book or Workbook**.',
        textVn: 'Có bài về nhà **mỗi tuần** — một tập bài in, hoặc câu hỏi trong **Sách học sinh hoặc Sách bài tập**.',
      },
      {
        tone: 'write',
        badge: 'Your notebook',
        badgeVn: 'Vở của em',
        text: 'Keep a **notebook** for lecture notes and questions. Sometimes homework goes straight into it.',
        textVn: 'Giữ một quyển **vở** để chép bài giảng và câu hỏi. Đôi khi bài về nhà viết thẳng vào đó.',
      },
      {
        tone: 'homework',
        badge: 'The books are not yours',
        badgeVn: 'Sách không phải của em',
        icon: 'AlertTriangle',
        text: 'Take the books home to review, and take **excellent care** of them — no tears, no scribbles, no water.',
        textVn: 'Mang sách về nhà để ôn, và **giữ gìn thật cẩn thận** — không rách, không vẽ bậy, không để ướt.',
      },
    ],
  },
  {
    layout: 'stack',
    accent: TEAL,
    icon: 'Quote',
    columns: 1,
    eyebrow: 'Letter · Section 6',
    eyebrowVn: 'Lá thư · Phần 6',
    title: 'Literacy Is the Focus This Year',
    titleVn: 'Trọng tâm năm nay là kỹ năng ngôn ngữ',
    content: '**English writing is our main focus this year** — in Science and Mathematics, not just in English lessons.',
    contentVn: '**Viết tiếng Anh là trọng tâm chính năm nay** — trong cả Khoa học và Toán, không riêng môn tiếng Anh.',
    notes: [
      {
        tone: 'write',
        badge: 'What I will ask for',
        badgeVn: 'Điều thầy yêu cầu',
        text: 'Good **handwriting**, and **full sentences** in everything you hand in.',
        textVn: '**Chữ viết** rõ ràng, và **câu hoàn chỉnh** trong mọi bài em nộp.',
      },
      {
        tone: 'theory',
        badge: 'Why the computers stay shut',
        badgeVn: 'Vì sao máy tính sẽ đóng lại',
        text: 'We **substantially limit computer use** in Cambridge lessons. Writing by hand is how the literacy gets built.',
        textVn: 'Chúng ta **hạn chế đáng kể việc dùng máy tính** trong giờ Cambridge. Viết tay chính là cách rèn kỹ năng ngôn ngữ.',
      },
    ],
  },
  {
    layout: 'stack',
    accent: GREEN,
    icon: 'Boxes',
    columns: 2,
    eyebrow: 'Letter · Section 7',
    eyebrowVn: 'Lá thư · Phần 7',
    title: 'What You Bring Every Day',
    titleVn: 'Những thứ em mang theo mỗi ngày',
    notes: [
      {
        tone: 'write',
        badge: 'Required · daily',
        badgeVn: 'Bắt buộc · hằng ngày',
        text: '**Pencils**, a **coloured pen**, an **eraser**, a **ruler**, a **sharpener**.',
        textVn: '**Bút chì**, **bút màu**, **cục tẩy**, **thước kẻ**, **gọt bút chì**.',
      },
      {
        tone: 'info',
        badge: 'From me',
        badgeVn: 'Thầy chuẩn bị',
        text: 'I keep **spare pencils**. I do not keep spare rulers.',
        textVn: 'Thầy có **bút chì dự phòng**. Nhưng không có thước dự phòng.',
      },
      {
        tone: 'write',
        badge: 'Strongly encouraged',
        badgeVn: 'Rất nên có',
        text: 'A **maths kit** with a **protractor** and **compass** — needed from Unit 5.',
        textVn: '**Bộ dụng cụ toán** có **thước đo góc** và **compa** — cần từ Chương 5.',
      },
      {
        tone: 'plant',
        badge: 'Recommended',
        badgeVn: 'Nên có',
        icon: 'Sparkles',
        text: '**Coloured markers or pens** — there are a lot of diagrams this year.',
        textVn: '**Bút màu hoặc bút dạ** — năm nay có rất nhiều hình vẽ.',
      },
    ],
  },
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'GraduationCap',
    eyebrow: 'The last paragraph of the letter',
    eyebrowVn: 'Đoạn cuối của lá thư',
    title: 'What This Year Is For',
    titleVn: 'Năm học này để làm gì',
    content: 'A **strong, resilient foundation** in reasoning, problem-solving and literacy — built by hand, on paper, away from screens.',
    contentVn: 'Một **nền tảng vững chắc và bền bỉ** về tư duy, giải quyết vấn đề và ngôn ngữ — xây bằng tay, trên giấy, tránh xa màn hình.',
    notes: [
      {
        tone: 'homework',
        badge: 'Tonight',
        badgeVn: 'Tối nay',
        icon: 'Home',
        text: 'A parent reads this letter and **signs the bottom**. Bring it back tomorrow — it lives at the **front of your binder** all year.',
        textVn: 'Phụ huynh đọc lá thư này và **ký vào cuối thư**. Ngày mai mang lại — nó sẽ nằm ở **đầu bìa còng** của em cả năm.',
      },
    ],
  },

  // ── Setting up the binder ────────────────────────────────────────────────
  {
    layout: 'steps',
    accent: ORANGE,
    icon: 'Boxes',
    eyebrow: 'Everybody stands up · four jobs, one at a time',
    eyebrowVn: 'Tất cả đứng lên · bốn việc, làm từng việc một',
    title: 'Setting Up Your Binder',
    titleVn: 'Sắp xếp bìa còng của em',
    ratio: 45,
    inlineSvg: DIAGRAMS.BINDER_SETUP,
    steps: [
      { text: 'Collect **one binder** and **one folder**. Write your **full name** on each.', textVn: 'Lấy **một bìa còng** và **một bìa kẹp**. Viết **họ tên đầy đủ** lên cả hai.' },
      { text: 'Put **three sleeves** into the binder: **Math**, **Science**, **English**.', textVn: 'Cho **ba túi nhựa** vào bìa còng: **Toán**, **Khoa học**, **Tiếng Anh**.' },
      { text: 'Put your **expectation letter** in the **very front**, before the sleeves.', textVn: 'Đặt **lá thư nội quy** ở **ngay trang đầu**, trước ba túi nhựa.' },
      { text: 'Write your **name** on **one piece of tape** and stick it on your **Learner’s Book**.', textVn: 'Viết **tên** lên **một mẩu băng dính** và dán lên **Sách học sinh** của em.' },
    ],
  },
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Job four, close up',
    eyebrowVn: 'Việc thứ tư, nhìn gần',
    title: 'Your Name on Your Book',
    titleVn: 'Tên em trên sách của em',
    inlineSvg: DIAGRAMS.BOOK_TAPE,
    caption: 'The tape goes on the **front cover**, never on a page. Every Learner’s Book looks identical from across a room — the tape is the only reason yours comes back to you.',
    captionVn: 'Băng dính dán ở **bìa trước**, không bao giờ dán lên trang sách. Mọi quyển Sách học sinh nhìn từ xa đều giống hệt nhau — mẩu băng dính là lý do duy nhất khiến quyển của em quay về với em.',
  },
  {
    layout: 'stack',
    variant: 'checklist',
    accent: GREEN,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before the bell · hold your binder up',
    eyebrowVn: 'Trước khi hết tiết · giơ bìa còng lên',
    title: 'Hold It Up and Check',
    titleVn: 'Giơ lên và kiểm tra',
    content: '> Anything not finished, finish it now — not tonight, not tomorrow morning.',
    contentVn: '> Nếu còn thiếu gì, hãy hoàn thành ngay bây giờ — không phải tối nay, cũng không phải sáng mai.',
    items: [
      { text: 'My **name** is on the **binder**.', textVn: '**Tên** của em có trên **bìa còng**.' },
      { text: 'My **name** is on the **folder**.', textVn: '**Tên** của em có trên **bìa kẹp**.' },
      { text: '**Three sleeves**: Math, Science, English.', textVn: '**Ba túi nhựa**: Toán, Khoa học, Tiếng Anh.' },
      { text: 'The **expectation letter** is at the front.', textVn: '**Lá thư nội quy** nằm ở đầu.' },
      { text: '**Taped and named** Learner’s Book.', textVn: 'Sách học sinh đã **dán băng dính và ghi tên**.' },
      { text: 'The **letter goes home** tonight to be signed.', textVn: '**Lá thư mang về nhà** tối nay để ký.' },
    ],
  },
]

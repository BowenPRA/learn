// content/y7-math/T03_poster-showcase/slides.js
// Year 7 Mathematics · Task 3 — The Maths Poster, for the end-of-Quarter-1
// showcase on Thursday 8 October, 3:30–4:15.
//
// A TASK LAUNCH, not a lesson: it sets the poster, shows a finished one, deals
// out the topics and rehearses the one minute each student will spend in front
// of a parent. Every student makes one A3 poster on one topic; there are ten
// students and ten topics.
//
// THREE THINGS SHAPE THIS DECK.
//
// 1. THE AUDIENCE IS A PARENT, NOT THE TEACHER. A parent was not in the room
//    for 1.1 or 2.5, so the poster has to teach from nothing. Slide 2 asks the
//    class what that means before slide 3 answers it.
//
// 2. ONE EXAMPLE, ON A TOPIC NOBODY HAS. The example is square roots (1.6),
//    drawn at A3 in diagrams.js. Slide 3 shows it whole beside the checklist;
//    slides 4–6 are crops of the same drawing, two or three parts at a time,
//    because a portrait poster on a landscape projector is too small to read.
//    Its key words are the 1.6 write notes, nearly word for word: the notebook
//    is the source.
//
// 3. THE STUDENT HAS TO SAY IT, TOO. Slide 12 is Mr Bowen explaining his own
//    poster in five sentences; slide 13 is the same five sentences as a frame
//    to copy. Both follow the poster's own order, so pointing and talking line
//    up.
//
// COPY-DOWN: 3 written panels — the seven parts · the one-minute script · my
// topic.
import { DIAGRAMS } from './diagrams.js'
import { PosterBoard } from './widgets.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'

export const slides = [
  // ── 1. Hero + starter ─────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: ORANGE,
    icon: 'LayoutGrid',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    eyebrow: 'Task 3 · End of Quarter 1',
    eyebrowVn: 'Nhiệm vụ 3 · Cuối Quý 1',
    title: 'The Maths Poster',
    titleVn: 'Áp Phích Toán Học',
    subtitle: 'Showcase: **Thursday 8 October**, 3:30–4:15',
    subtitleVn: 'Triển lãm: **Thứ Năm, 8 tháng 10**, 3:30–4:15',
    card: {
      icon: 'Pencil',
      badge: 'Starter',
      badgeVn: 'Khởi động',
      text: 'Look back through your notebook. Which topic could you teach to your parents? **Tell your partner why.**',
      textVn: 'Xem lại vở của em. Em có thể dạy đề tài nào cho bố mẹ? **Nói với bạn bên cạnh vì sao.**',
    },
  },

  // ── 2. The task, as a question ────────────────────────────────────────────
  // No answer here: slide 3 is the answer.
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'The task',
    eyebrowVn: 'Nhiệm vụ',
    title: 'Your Job',
    titleVn: 'Việc của em',
    text: 'Make an **A3 poster** that teaches **one topic** to your parents.',
    textVn: 'Làm một **áp phích khổ A3** dạy **một đề tài** cho bố mẹ em.',
    sub: 'They were not in our lessons. What must the poster show them? Tell your partner **three things**.',
    subVn: 'Bố mẹ không học cùng lớp mình. Áp phích phải cho họ thấy gì? Nói với bạn bên cạnh **ba điều**.',
  },

  // ── 3. The seven parts, beside the whole example ──────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'CheckCircle2',
    eyebrow: 'What goes on it',
    eyebrowVn: 'Áp phích có gì',
    title: 'Seven Parts',
    titleVn: 'Bảy phần',
    ratio: 45,
    inlineSvg: DIAGRAMS.POSTER,
    content: 'The example is **square roots**. Nobody gets that topic.\n\nFind all seven parts on it.',
    contentVn: 'Ví dụ là **căn bậc hai**. Không ai được giao đề tài đó.\n\nTìm đủ bảy phần trên áp phích.',
    notes: [
      {
        tone: 'write',
        text:
          '**1** Title and your name\n' +
          '**2** Key words and what they mean\n' +
          '**3** A picture\n' +
          '**4** How it works\n' +
          '**5** Two examples: one easy, one harder\n' +
          '**6** A common mistake\n' +
          '**7** Try it! A question, with the answer under a flap',
        textVn:
          '**1** Tiêu đề và tên của em\n' +
          '**2** Từ khóa và nghĩa của chúng\n' +
          '**3** Một hình vẽ\n' +
          '**4** Cách làm\n' +
          '**5** Hai ví dụ: một dễ, một khó hơn\n' +
          '**6** Một lỗi hay gặp\n' +
          '**7** Try it! Một câu hỏi, đáp án giấu dưới nắp gập',
      },
    ],
  },

  // ── 4–6. The example, close up ────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'BookOpen',
    eyebrow: 'Parts 1 and 2',
    eyebrowVn: 'Phần 1 và 2',
    title: 'Title and Key Words',
    titleVn: 'Tiêu đề và từ khóa',
    inlineSvg: DIAGRAMS.POSTER_TOP,
    caption: 'Your key words are already in your notebook: the **orange panels**. Add the Vietnamese for your parents.',
    captionVn: 'Từ khóa của em đã có sẵn trong vở: các **khung màu cam**. Thêm nghĩa tiếng Việt cho bố mẹ.',
  },
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Lightbulb',
    eyebrow: 'Parts 3 and 4',
    eyebrowVn: 'Phần 3 và 4',
    title: 'A Picture and How It Works',
    titleVn: 'Hình vẽ và cách làm',
    inlineSvg: DIAGRAMS.POSTER_MID,
    caption: 'Draw the idea. Then say the rule in **one sentence**.',
    captionVn: 'Vẽ ý tưởng ra. Rồi nói quy tắc trong **một câu**.',
  },
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Sigma',
    eyebrow: 'Parts 5, 6 and 7',
    eyebrowVn: 'Phần 5, 6 và 7',
    title: 'Examples, a Mistake, a Question',
    titleVn: 'Ví dụ, một lỗi sai, một câu hỏi',
    inlineSvg: DIAGRAMS.POSTER_BOTTOM,
    caption: 'Your parents try the question first. The answer hides **under the flap**.',
    captionVn: 'Bố mẹ em thử trả lời trước. Đáp án giấu **dưới nắp gập**.',
  },

  // ── 7. Readable from across the room ──────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'ScanEye',
    columns: 2,
    eyebrow: 'From across the room',
    eyebrowVn: 'Nhìn từ cuối phòng',
    title: 'Easy to Read',
    titleVn: 'Dễ đọc',
    items: [
      { text: 'Title letters **3 cm** tall', textVn: 'Chữ tiêu đề cao **3 cm**' },
      { text: 'The maths **big**: readable from **2 metres**', textVn: 'Phần toán viết **to**: đọc được từ xa **2 mét**' },
      { text: '**Pencil** first, then pen, then colour', textVn: '**Bút chì** trước, rồi bút mực, rồi tô màu' },
      { text: 'A **ruler** for every box and line', textVn: 'Dùng **thước** cho mọi khung và đường kẻ' },
      { text: 'Every key word in the **same colour**', textVn: 'Mọi từ khóa cùng **một màu**' },
      { text: 'Leave **space**. Crowded is hard to read.', textVn: 'Chừa **khoảng trống**. Chật quá thì khó đọc.' },
    ],
  },

  // ── 8–9. The ten topics ───────────────────────────────────────────────────
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'LayoutGrid',
    eyebrow: 'Units 1 and 2',
    eyebrowVn: 'Chương 1 và 2',
    title: 'Topics 1 to 5',
    titleVn: 'Đề tài 1 đến 5',
    inlineSvg: DIAGRAMS.TOPICS_A,
    caption: 'Each topic has a **picture idea**. You can draw a different one.',
    captionVn: 'Mỗi đề tài có một **gợi ý hình vẽ**. Em có thể vẽ hình khác.',
  },
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'LayoutGrid',
    eyebrow: 'Units 2 and 3',
    eyebrowVn: 'Chương 2 và 3',
    title: 'Topics 6 to 10',
    titleVn: 'Đề tài 6 đến 10',
    inlineSvg: DIAGRAMS.TOPICS_B,
    caption: 'Square roots (1.6) is the example, so it is not on the list.',
    captionVn: 'Căn bậc hai (1.6) là ví dụ, nên không có trong danh sách.',
  },

  // ── 10. Deal the topics ───────────────────────────────────────────────────
  {
    layout: 'game',
    title: 'Who Gets Which Topic?',
    titleVn: 'Ai làm đề tài nào?',
    widget: PosterBoard,
  },

  // ── 11. The road to Thursday ──────────────────────────────────────────────
  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Timer',
    eyebrow: 'How you make it',
    eyebrowVn: 'Cách làm',
    title: 'Five Steps to Thursday',
    titleVn: 'Năm bước đến thứ Năm',
    steps: [
      { text: '**Plan** on scrap paper: seven boxes, in pencil.', textVn: '**Lên kế hoạch** trên giấy nháp: bảy khung, bằng bút chì.' },
      { text: '**Check** your maths with Mr Bowen.', textVn: '**Kiểm tra** phần toán với thầy Bowen.' },
      { text: '**Draw** on the A3 paper: pencil, then pen, then colour.', textVn: '**Vẽ** lên giấy A3: bút chì, rồi bút mực, rồi tô màu.' },
      { text: '**Practise** explaining it to a partner. One minute.', textVn: '**Tập** giải thích cho bạn bên cạnh. Một phút.' },
      { text: '**Showcase:** Thursday 8 October, 3:30–4:15.', textVn: '**Triển lãm:** Thứ Năm, 8 tháng 10, 3:30–4:15.' },
    ],
  },

  // ── 12. The minute, modelled ──────────────────────────────────────────────
  // Mr Bowen says this out loud, pointing at each part as he goes.
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Listen first',
    eyebrowVn: 'Nghe trước',
    title: 'Mr Bowen Goes First',
    titleVn: 'Thầy Bowen làm trước',
    ratio: 45,
    inlineSvg: DIAGRAMS.POSTER,
    content:
      '**My poster is about** square roots.\n\n' +
      '**The key words are** square number and square root.\n\n' +
      '**Here is an example:** √49 = 7, because 7 × 7 = 49.\n\n' +
      '**Be careful:** √16 is 4, not 8.\n\n' +
      '**Now you try:** what is √100?',
    // The script stays in English in both languages: it is the English the
    // students will say on Thursday. Slide 13 carries the Vietnamese glosses.
    contentVn:
      '**My poster is about** square roots.\n\n' +
      '**The key words are** square number and square root.\n\n' +
      '**Here is an example:** √49 = 7, because 7 × 7 = 49.\n\n' +
      '**Be careful:** √16 is 4, not 8.\n\n' +
      '**Now you try:** what is √100?',
  },

  // ── 13. The minute, as a frame to copy ────────────────────────────────────
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'For your parents',
    eyebrowVn: 'Dành cho bố mẹ',
    title: 'Explain It in One Minute',
    titleVn: 'Giải thích trong một phút',
    content: 'Point at each part of your poster as you say it.',
    contentVn: 'Chỉ vào từng phần của áp phích khi em nói.',
    notes: [
      {
        tone: 'write',
        text:
          '**My poster is about** …\n' +
          '**The key words are** …\n' +
          '**Here is an example:** …\n' +
          '**Be careful:** …\n' +
          '**Now you try!**',
        textVn:
          '**My poster is about** … (Áp phích của em nói về …)\n' +
          '**The key words are** … (Các từ khóa là …)\n' +
          '**Here is an example:** … (Đây là một ví dụ: …)\n' +
          '**Be careful:** … (Cẩn thận: …)\n' +
          '**Now you try!** (Giờ bố mẹ thử nhé!)',
      },
    ],
  },

  // ── 14. The day itself ────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'Users',
    eyebrow: 'Thursday 8 October',
    eyebrowVn: 'Thứ Năm, 8 tháng 10',
    title: 'Showcase Day',
    titleVn: 'Ngày triển lãm',
    text: 'Explain it to **every visitor**.',
    textVn: 'Giải thích cho **mọi vị khách**.',
    sub: 'Stand by your poster. Then ask your **Try it!** question.',
    subVn: 'Đứng cạnh áp phích. Rồi hỏi câu hỏi **Try it!** của em.',
    notes: [
      {
        tone: 'write',
        text: '**My topic:** ______ (Unit ___)\n**Showcase:** Thursday 8 October, 3:30–4:15',
        textVn: '**Đề tài của em:** ______ (Bài ___)\n**Triển lãm:** Thứ Năm, 8 tháng 10, 3:30–4:15',
      },
    ],
  },

  // ── 15. Close ─────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    title: 'See You on Thursday',
    titleVn: 'Hẹn gặp vào thứ Năm',
    card: {
      icon: 'Pencil',
      badge: 'Check your notebook',
      badgeVn: 'Kiểm tra vở',
      text: 'You should have **3 written panels**: the seven parts, your one-minute script and your topic.',
      textVn: 'Em cần có **3 khung ghi chép**: bảy phần, lời thuyết trình một phút và đề tài của em.',
    },
  },
]

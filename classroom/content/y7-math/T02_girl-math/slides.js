// content/y7-math/T02_girl-math/slides.js
// Year 7 Mathematics · Task 2 — Girl Math.
//
// A standalone TASK. Four teaching slides, then a ten-round timed game, then
// one closing question. It is short on purpose: the teaching is only the bar
// model, and everything else is the class playing.
//
// WHAT IT IS ACTUALLY FOR. "Carrot gets twice as many as Erica, and there are
// twelve pieces" is the equation n + 2n = 12, and a Year 7 who meets that as
// symbols has nothing to hold on to. Drawn as boxes first it is not frightening
// at all — one box, then two the same size, twelve pieces, so a box is four —
// and the letter is simply the box's name. Slides 2 to 4 name the box n and
// then write, add, solve; the game reveals every round the same way.
//
// THE ENGLISH IS THE MATHS, AGAIN. Every round turns on three phrases and
// nothing else: "twice as many as", "more than", "fewer than". A student who
// reads "Nam gets 3 more than Su" as "Nam gets 3" is not bad at arithmetic —
// they have misread a sentence, and they will write 3 where n + 3 belongs. Say
// all three out loud on slides 2 and 3, and keep saying them during the game.
//
// THE GAME'S SHAPE, so the deck and the widget agree:
//   · ten rounds, harder as they go, worth 2 rolls up to 8
//   · a generous clock — 90 seconds early, 210 by the end, and a +30 button
//   · revealed as expressions → the sum → solve for n → each girl in turn
//   · the class writes on whiteboards; the teacher says who was right and taps
//     a team to award that round's rolls. Nothing is typed in.
//
// The names are the class's own. The reasons attached to the rules are deadpan
// nonsense on purpose — this class works harder for a silly problem than a
// sensible one, and the maths underneath is identical either way.
import { DIAGRAMS } from './diagrams.js'
import { GirlMathGame } from './widgets.jsx'

const TEAL = '#0087a8'
const PINK = '#c02a6e'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const PURPLE = '#5c2483'

export const slides = [
  {
    layout: 'hero',
    color: PINK,
    icon: 'Users',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    eyebrow: 'Task 2',
    eyebrowVn: 'Nhiệm vụ 2',
    title: 'Girl Math',
    titleVn: 'Toán Của Các Bạn Nữ',
    subtitle: 'Share the rice paper. Beat the clock.',
    subtitleVn: 'Chia bánh tráng. Nhanh hơn đồng hồ.',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      text: 'There are **10 pieces** of rice paper. Lily gets **four times as many** as Ana.\n\nHow many does each girl get? Whiteboards. **60 seconds.**',
      textVn: 'Có **10 miếng** bánh tráng. Lily được **gấp bốn lần** Ana.\n\nMỗi bạn được mấy miếng? Viết ra bảng con. **60 giây.**',
    },
  },

  // ── The bar model, in two halves ──────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Boxes',
    side: 'left',
    eyebrow: 'One box. Call it n.',
    eyebrowVn: 'Một cái hộp. Gọi nó là n.',
    title: 'Twice As Many',
    titleVn: 'Gấp Đôi',
    ratio: 45,
    inlineSvg: DIAGRAMS.BAR_TWICE,
    content:
      'Draw a box for the smallest share. Call the box **n**.\n\n' +
      '**Twice as many** = **2n**. So there are **three** boxes, not two.',
    contentVn:
      'Vẽ một cái hộp cho phần nhỏ nhất. Gọi hộp đó là **n**.\n\n' +
      '**Gấp đôi** = **2n**. Vậy có **ba** hộp, không phải hai.',
    notes: [
      {
        tone: 'write',
        text:
          'Call the smallest share **n**.\n' +
          '**Twice as many** = 2n. **Three times as many** = 3n. **The same as** = n.\n' +
          'Add every share up, make it equal the total, then solve for n.',
        textVn:
          'Gọi phần nhỏ nhất là **n**.\n' +
          '**Gấp đôi** = 2n. **Gấp ba** = 3n. **Bằng nhau** = n.\n' +
          'Cộng tất cả các phần lại, cho bằng tổng, rồi tìm n.',
      },
    ],
  },
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Equal',
    eyebrow: 'n + 3, not 3',
    eyebrowVn: 'n + 3, không phải 3',
    title: 'More Than, Fewer Than',
    titleVn: 'Nhiều Hơn, Ít Hơn',
    ratio: 45,
    inlineSvg: DIAGRAMS.BAR_PLUS,
    content:
      '**3 more than** is **n + 3**. Not 3.\n\n' +
      'Add the shares up, and the loose 3 comes off the total: 2n + 3 = 15, so 2n = 12.',
    contentVn:
      '**Nhiều hơn 3** là **n + 3**. Không phải 3.\n\n' +
      'Cộng các phần lại, rồi chuyển số 3 sang: 2n + 3 = 15, nên 2n = 12.',
    notes: [
      {
        tone: 'write',
        text:
          '**3 more than** = n + 3. **3 fewer than** = n − 3.\n' +
          'The loose number moves across the = sign and changes sign.',
        textVn:
          '**Nhiều hơn 3** = n + 3. **Ít hơn 3** = n − 3.\n' +
          'Số lẻ chuyển sang bên kia dấu = và đổi dấu.',
      },
    ],
  },
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Users',
    side: 'left',
    eyebrow: 'This is every round of the game',
    eyebrowVn: 'Mọi vòng của trò chơi đều như thế này',
    title: 'Three Girls At Once',
    titleVn: 'Ba Bạn Cùng Lúc',
    ratio: 45,
    inlineSvg: DIAGRAMS.BAR_THREE,
    content:
      'Write each girl. Add them up. Solve for **n**. Put n back in.\n\n' +
      'Then **add your answers up**. If they do not make the total, a rule was read wrong.',
    contentVn:
      'Viết từng bạn. Cộng lại. Tìm **n**. Thay n trở lại.\n\n' +
      'Rồi **cộng các đáp án lại**. Nếu không ra đúng tổng thì em đã đọc sai một quy tắc.',
    notes: [
      {
        tone: 'write',
        text:
          '**Every round, four steps:**\n' +
          '**1** Write each girl in terms of n.  **2** Add them up = the total.\n' +
          '**3** Solve for n.  **4** Put n back in, then check the total.',
        textVn:
          '**Mỗi vòng, bốn bước:**\n' +
          '**1** Viết từng bạn theo n.  **2** Cộng lại = tổng.\n' +
          '**3** Tìm n.  **4** Thay n trở lại, rồi kiểm tra tổng.',
      },
    ],
  },

  // ── How the game runs ─────────────────────────────────────────────────────
  {
    layout: 'callout',
    accent: PINK,
    icon: 'Timer',
    eyebrow: 'Ten rounds',
    eyebrowVn: 'Mười vòng',
    title: 'How Girl Math Works',
    titleVn: 'Cách Chơi',
    content:
      'The screen shows the pieces and the rules. **You work it out on your whiteboard** while the clock runs. Nobody shouts.\n\n' +
      'Then we do it together on screen: the **expressions**, the **sum**, solve for **n**, then each girl.\n\n' +
      'Each round is worth a number of **rolls**. Harder round, more rolls.\n\n' +
      '> The rounds get harder. They also get sillier. Both on purpose.',
    contentVn:
      'Màn hình cho biết số miếng và các quy tắc. **Em tính ra bảng con** trong lúc đồng hồ chạy. Không ai được hô.\n\n' +
      'Rồi cả lớp cùng làm trên màn hình: các **biểu thức**, **cộng lại**, tìm **n**, rồi từng bạn.\n\n' +
      'Mỗi vòng có giá trị một số **cuốn**. Vòng khó hơn thì nhiều cuốn hơn.\n\n' +
      '> Các vòng sẽ khó dần. Và cũng ngớ ngẩn dần. Cả hai đều là cố ý.',
  },

  // ── The game ──────────────────────────────────────────────────────────────
  {
    layout: 'game',
    title: 'Girl Math',
    titleVn: 'Toán Của Các Bạn Nữ',
    widget: GirlMathGame,
  },

  {
    layout: 'hero',
    color: GREEN,
    icon: 'Target',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    // No subtitle: in project mode at 1366×768 this hero is the tightest slide
    // in the deck, and the closing line reads just as well in the eyebrow.
    eyebrow: 'Task 2 · you never solved an equation, you counted boxes',
    eyebrowVn: 'Nhiệm vụ 2 · em chưa giải phương trình nào, em chỉ đếm hộp',
    title: 'Boxes Before Numbers',
    titleVn: 'Vẽ Hộp Trước, Tính Sau',
    card: {
      icon: 'Pencil',
      badge: 'Exit Question',
      badgeVn: 'Câu hỏi ra về',
      text: 'There are **34 pieces**. Su gets **three times as many** as Ana; Tess gets **4 more** than Ana.\n\nDraw the boxes. How many does each girl get?',
      textVn: 'Có **34 miếng**. Su được **gấp ba** Ana. Tess được **nhiều hơn** Ana **4 miếng**.\n\nVẽ các hộp ra. Mỗi bạn được mấy miếng?',
    },
  },
]

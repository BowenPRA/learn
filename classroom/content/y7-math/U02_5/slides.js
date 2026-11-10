// content/y7-math/U02_5/slides.js
// Year 7 Mathematics · 2.5 Constructing and Solving Equations. Thursday 17 Sept 2026.
// Source: Workbook Unit 2, Section 2.5. Every number used in class is original,
// except the book's own flow chart (x + 5 = 12) on slide 8; the exercise is the
// homework and is not spent in advance.
//
// WRITING RULE FOR THIS DECK (the 2.5 Science density): short sentences, one
// idea each, and the body text never repeats the write note. A diagram carries
// the picture; the note carries the words to copy.
//
// THREE THINGS SHAPE THIS DECK.
//
// 1. THE CLASS HAS ALREADY SOLVED EQUATIONS. The starter is three missing-number
//    boxes, and in Girl Math the box was called n. Slide 2 just gives the box a
//    letter. Nothing today is new arithmetic.
//
// 2. THE ENGLISH IS THE BARRIER. "Reverse" (go backwards) and "inverse" (the
//    opposite operation) look almost the same and mean different things — and a
//    two-step equation needs both. "Inverse" also meant something else in Unit 1
//    (the inverse of 5 is −5). And "I think of a number" is not "I think about a
//    number": it means choose one and keep it secret. Slide 4 stops for all
//    three. Socks and shoes (slides 16–17) carry the order: last on, first off.
//
// 3. TWO MISTAKES COST THE MARKS: doing the operation you see instead of its
//    inverse (x − 4 = 6, so x = 2) and undoing the steps in the wrong order
//    (2a + 4 = 18, halve first, so a = 5). Each gets an ask-before-you-tell vote
//    (5 and 18) with no answer on it. The first is settled by CHECKING — putting
//    each answer back in — which is 2.2's substitution and the book's instruction
//    on every question. The second is settled by the widget.
//
// COPY-DOWN: 7 written panels — equation + solve · check · inverse operation ·
// reverse the flow chart · either way round · I think of a number · undo the
// last step first.
import { DIAGRAMS } from './diagrams.js'
import { ReverseOne, ReverseTwo, CheckIt } from './widgets.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'
const RED = '#c8102e'

export const slides = [
  // ── 1. Hero + starter ─────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Sigma',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 2 · 2.5',
    eyebrowVn: 'Chương 2 · 2.5',
    eyebrowFr: 'Unité 2 · 2.5',
    date: '17 Sept 2026',
    title: 'Solving Equations',
    titleVn: 'Giải phương trình',
    titleFr: 'Résoudre des équations',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      badgeFr: 'Pour commencer',
      text: 'Find each missing number.\n\n**□ + 7 = 15**, **□ × 4 = 28**, **20 − □ = 11**',
      textVn: 'Tìm mỗi số còn thiếu.\n\n**□ + 7 = 15**, **□ × 4 = 28**, **20 − □ = 11**',
      textFr: 'Trouve chaque nombre manquant.\n\n**□ + 7 = 15**, **□ × 4 = 28**, **20 − □ = 11**',
    },
  },

  // ── YOU ALREADY DO THIS ───────────────────────────────────────────────────
  // 2. The box gets a letter.
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Starter check',
    eyebrowVn: 'Kiểm tra khởi động',
    eyebrowFr: 'Correction du départ',
    title: 'The Box Has a Name',
    titleVn: 'Ô trống có tên',
    titleFr: 'La case a un nom',
    text: '**□ + 7 = 15** → **x + 7 = 15**',
    textVn: '**□ + 7 = 15** → **x + 7 = 15**',
    textFr: '**□ + 7 = 15** → **x + 7 = 15**',
    sub: 'In Girl Math, the box was **n**.',
    subVn: 'Trong Girl Math, ô trống tên là **n**.',
    subFr: 'Dans Girl Math, la case s’appelait **n**.',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**8**, **7** and **9**. You just solved three **equations**.',
      answerVn: '**8**, **7** và **9**. Em vừa giải ba **phương trình**.',
      answerFr: '**8**, **7** et **9**. Tu viens de résoudre trois **équations**.',
    },
  },

  // 3. Key words: equation + solve
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Equal',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mots clés',
    title: 'Equation',
    titleVn: 'Phương trình',
    titleFr: 'Équation',
    ratio: 40,
    inlineSvg: DIAGRAMS.KINDS,
    content: 'You know two of these already.',
    contentVn: 'Em đã biết hai loại rồi.',
    contentFr: 'Tu en connais déjà deux.',
    notes: [
      {
        tone: 'write',
        text: '**Equation:** has an = sign and an **unknown** number.\n**Solve:** find the value of the unknown.\n$x + 7 = 15$, so $x = 8$',
        textVn: '**Phương trình (equation):** có dấu = và một số **chưa biết** (unknown).\n**Giải (solve):** tìm giá trị của số chưa biết.\n$x + 7 = 15$, nên $x = 8$',
        textFr: '**Équation (equation) :** a un signe = et un nombre **inconnu** (unknown).\n**Résoudre (solve) :** trouver la valeur de l’inconnue.\n$x + 7 = 15$, donc $x = 8$',
      },
    ],
  },

  // ── THE ENGLISH ───────────────────────────────────────────────────────────
  // 4. English check: reverse / inverse / think of
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    eyebrowFr: 'Point d’anglais',
    title: 'Three Words to Watch',
    titleVn: 'Ba từ cần chú ý',
    titleFr: 'Trois mots à surveiller',
    inlineSvg: DIAGRAMS.WORDS,
    caption: '**Reverse** and **inverse** look the same. They are not.',
    captionVn: '**Reverse** = đi ngược lại. **Inverse** = phép ngược. **think of a number** = nghĩ ra một số và giữ bí mật.',
    captionFr: '**Reverse** et **inverse** se ressemblent. Ce n’est pas la même chose.',
  },

  // ── MISTAKE 1: DOING WHAT YOU SEE ─────────────────────────────────────────
  // 5. Question only. Everyone votes at once — left hand A, right hand B —
  // and nobody settles it until slide 6.
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowVn: 'Biểu quyết bằng một tay',
    eyebrowFr: 'Vote avec une main',
    title: 'Which Is Right?',
    titleVn: 'Đáp án nào đúng?',
    titleFr: 'Laquelle est juste ?',
    text: 'Solve $x − 4 = 6$',
    textVn: 'Giải $x − 4 = 6$',
    textFr: 'Résous $x − 4 = 6$',
    columns: [
      {
        heading: 'A · left hand up',
        headingVn: 'A · giơ tay trái',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_X2,
      },
      {
        heading: 'B · right hand up',
        headingVn: 'B · giơ tay phải',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_X10,
      },
    ],
  },

  // 6. Checking settles it
  {
    layout: 'split',
    accent: RED,
    icon: 'CheckCircle2',
    eyebrow: 'Do not guess',
    eyebrowVn: 'Đừng đoán',
    eyebrowFr: 'Ne devine pas',
    title: 'Check Your Answer',
    titleVn: 'Thử lại đáp án',
    titleFr: 'Vérifie ta réponse',
    ratio: 40,
    inlineSvg: DIAGRAMS.CHECK,
    content: '**x = 10 is right.** You met substitution in 2.2.',
    contentVn: '**x = 10 mới đúng.** Em đã học thay số ở bài 2.2.',
    contentFr: '**x = 10 est juste.** Tu as vu la substitution en 2.2.',
    notes: [
      {
        tone: 'write',
        text: '**Check:** substitute your answer back into the equation.\n$10 − 4 = 6$ ✓',
        textVn: '**Thử lại (check):** thay đáp án của em vào lại phương trình.\n$10 − 4 = 6$ ✓',
        textFr: '**Vérifier (check) :** remplace ta réponse dans l’équation.\n$10 − 4 = 6$ ✓',
      },
    ],
  },

  // ── UNDO IT ───────────────────────────────────────────────────────────────
  // 7. Inverse operation
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ArrowLeftRight',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Inverse Operation',
    titleVn: 'Phép toán ngược',
    titleFr: 'Opération inverse',
    ratio: 40,
    inlineSvg: DIAGRAMS.INVERSES,
    notes: [
      {
        tone: 'write',
        text: '**Inverse operation:** the operation that undoes another.\n+ and − are inverses. × and ÷ are inverses.',
        textVn: '**Phép toán ngược (inverse operation):** phép toán xóa bỏ tác dụng của một phép toán khác.\n+ và − là hai phép ngược nhau. × và ÷ là hai phép ngược nhau.',
        textFr: '**Opération inverse (inverse operation) :** l’opération qui annule une autre.\n+ et − sont inverses. × et ÷ sont inverses.',
      },
    ],
  },

  // 8. The book's flow chart
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'RotateCcw',
    eyebrow: 'The book’s method',
    eyebrowVn: 'Phương pháp trong sách',
    eyebrowFr: 'La méthode du livre',
    title: 'Reverse the Flow Chart',
    titleVn: 'Đi ngược sơ đồ',
    titleFr: 'Le schéma à l’envers',
    ratio: 40,
    inlineSvg: DIAGRAMS.FLOW,
    content: 'The same chart is in your workbook.',
    contentVn: 'Sơ đồ này cũng có trong vở bài tập.',
    contentFr: 'Le même schéma est dans ton cahier d’exercices.',
    notes: [
      {
        tone: 'write',
        text: 'To **solve**, reverse the flow chart.\nUse the **inverse** of each operation.\n$x + 5 = 12$, so $x = 12 − 5 = 7$',
        textVn: 'Để **giải**, đi ngược sơ đồ (flow chart).\nDùng phép **ngược** của mỗi phép toán.\n$x + 5 = 12$, nên $x = 12 − 5 = 7$',
        textFr: 'Pour **résoudre**, parcours le schéma (flow chart) à l’envers.\nUtilise l’**inverse** de chaque opération.\n$x + 5 = 12$, donc $x = 12 − 5 = 7$',
      },
    ],
  },

  // 9. The flow chart, one box per press
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'Say each box first',
    eyebrowVn: 'Nói từng ô trước',
    eyebrowFr: 'Dis chaque case d’abord',
    title: 'Undo It',
    titleVn: 'Làm ngược lại',
    titleFr: 'Annule-le',
    widget: ReverseOne,
    caption: 'Before each press, the class says what goes in the box.',
    captionVn: 'Trước mỗi lần bấm, cả lớp nói điều gì sẽ vào ô đó.',
    captionFr: 'Avant chaque clic, la classe dit ce qui va dans la case.',
  },

  // 10. Practice
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowVn: 'Bảng con',
    eyebrowFr: 'Ardoises',
    title: 'Solve, Then Check',
    titleVn: 'Giải, rồi thử lại',
    titleFr: 'Résous, puis vérifie',
    ratio: 50,
    content:
      '**a** $x + 8 = 20$\n' +
      '**b** $x − 7 = 9$\n' +
      '**c** $6 + x = 14$\n' +
      '**d** $6x = 42$\n' +
      '**e** $x − 15 = 20$',
    contentVn:
      '**a** $x + 8 = 20$\n' +
      '**b** $x − 7 = 9$\n' +
      '**c** $6 + x = 14$\n' +
      '**d** $6x = 42$\n' +
      '**e** $x − 15 = 20$',
    contentFr:
      '**a** $x + 8 = 20$\n' +
      '**b** $x − 7 = 9$\n' +
      '**c** $6 + x = 14$\n' +
      '**d** $6x = 42$\n' +
      '**e** $x − 15 = 20$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $x = 12$, **b** $x = 16$, **c** $x = 8$, **d** $x = 7$, **e** $x = 35$',
      answerVn: '**a** $x = 12$, **b** $x = 16$, **c** $x = 8$, **d** $x = 7$, **e** $x = 35$',
      answerFr: '**a** $x = 12$, **b** $x = 16$, **c** $x = 8$, **d** $x = 7$, **e** $x = 35$',
    },
  },

  // 11. Either way round (write) + practice
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'ArrowLeftRight',
    eyebrow: 'Look closely',
    eyebrowVn: 'Nhìn kỹ nhé',
    eyebrowFr: 'Regarde bien',
    title: 'Either Way Round',
    titleVn: 'Viết chiều nào cũng được',
    titleFr: 'Dans les deux sens',
    notes: [
      {
        tone: 'write',
        text: '$14 = x + 3$ means the same as $x + 3 = 14$.',
        textVn: '$14 = x + 3$ có nghĩa giống như $x + 3 = 14$.',
        textFr: '$14 = x + 3$ veut dire la même chose que $x + 3 = 14$.',
      },
    ],
    reveal: {
      prompt: 'Solve **a** $20 = x + 6$, **b** $35 = 5x$, **c** $9 = x − 4$.',
      promptVn: 'Giải **a** $20 = x + 6$, **b** $35 = 5x$, **c** $9 = x − 4$.',
      promptFr: 'Résous **a** $20 = x + 6$, **b** $35 = 5x$, **c** $9 = x − 4$.',
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $x = 14$, **b** $x = 7$, **c** $x = 13$',
      answerVn: '**a** $x = 14$, **b** $x = 7$, **c** $x = 13$',
      answerFr: '**a** $x = 14$, **b** $x = 7$, **c** $x = 13$',
    },
  },

  // 12. Game
  {
    layout: 'game',
    title: 'Check It!',
    titleVn: 'Thử lại nào!',
    titleFr: 'Vérifie !',
    widget: CheckIt,
  },

  // ── I THINK OF A NUMBER ───────────────────────────────────────────────────
  // 13. Question only
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Say it as an equation',
    eyebrowVn: 'Nói thành phương trình',
    eyebrowFr: 'Dis-le avec une équation',
    title: 'Mr Bowen’s Number',
    titleVn: 'Con số của thầy Bowen',
    titleFr: 'Le nombre de M. Bowen',
    text: '"I think of a number and subtract 5. My answer is 21."',
    textVn: '"Thầy nghĩ ra một số rồi trừ đi 5. Kết quả là 21."',
    textFr: '« Je pense à un nombre et je soustrais 5. Ma réponse est 21. »',
    sub: 'What number did Mr Bowen **first think of**?',
    subVn: 'Lúc đầu thầy Bowen **đã nghĩ ra** số nào?',
    subFr: 'À quel nombre M. Bowen a-t-il **pensé au départ** ?',
  },

  // 14. Sentence to equation
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'PenLine',
    eyebrow: 'Sentence to equation',
    eyebrowVn: 'Từ câu văn đến phương trình',
    eyebrowFr: 'De la phrase à l’équation',
    title: 'Call It n',
    titleVn: 'Gọi nó là n',
    titleFr: 'Appelle-le n',
    ratio: 40,
    inlineSvg: DIAGRAMS.SENTENCE,
    content: '**26.** Write the equation first. Then solve it.',
    contentVn: '**26.** Viết phương trình trước. Rồi giải nó.',
    contentFr: '**26.** Écris d’abord l’équation. Puis résous-la.',
    notes: [
      {
        tone: 'write',
        text: '**I think of a number:** call it $n$.\n$n − 5 = 21$, so $n = 21 + 5 = 26$',
        textVn: '**I think of a number** (nghĩ ra một số): gọi số đó là $n$.\n$n − 5 = 21$, nên $n = 21 + 5 = 26$',
        textFr: '**I think of a number** (je pense à un nombre) : appelle-le $n$.\n$n − 5 = 21$, donc $n = 21 + 5 = 26$',
      },
    ],
  },

  // 15. Practice
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowVn: 'Bảng con',
    eyebrowFr: 'Ardoises',
    title: 'Write It, Then Solve It',
    titleVn: 'Viết ra, rồi giải',
    titleFr: 'Écris-la, puis résous-la',
    ratio: 50,
    content:
      'I think of a number and…\n\n' +
      '**a** add 13. The answer is 30.\n' +
      '**b** subtract 8. The answer is 15.\n' +
      '**c** multiply it by 6. The answer is 54.\n' +
      '**d** divide it by 4. The answer is 5.',
    contentVn:
      'Thầy nghĩ ra một số rồi…\n\n' +
      '**a** cộng 13. Kết quả là 30.\n' +
      '**b** trừ đi 8. Kết quả là 15.\n' +
      '**c** nhân nó với 6. Kết quả là 54.\n' +
      '**d** chia nó cho 4. Kết quả là 5.',
    contentFr:
      'Je pense à un nombre et…\n\n' +
      '**a** j’ajoute 13. La réponse est 30.\n' +
      '**b** je soustrais 8. La réponse est 15.\n' +
      '**c** je le multiplie par 6. La réponse est 54.\n' +
      '**d** je le divise par 4. La réponse est 5.',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $n + 13 = 30$, $n = 17$\n**b** $n − 8 = 15$, $n = 23$\n**c** $6n = 54$, $n = 9$\n**d** $n ÷ 4 = 5$, $n = 20$',
      answerVn: '**a** $n + 13 = 30$, $n = 17$\n**b** $n − 8 = 15$, $n = 23$\n**c** $6n = 54$, $n = 9$\n**d** $n ÷ 4 = 5$, $n = 20$',
      answerFr: '**a** $n + 13 = 30$, $n = 17$\n**b** $n − 8 = 15$, $n = 23$\n**c** $6n = 54$, $n = 9$\n**d** $n ÷ 4 = 5$, $n = 20$',
    },
  },

  // ── TWO STEPS ─────────────────────────────────────────────────────────────
  // 16. Question only. The order of undoing, in everyday English.
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Say it in English',
    eyebrowVn: 'Nói bằng tiếng Anh',
    eyebrowFr: 'Dis-le en anglais',
    title: 'Getting Dressed',
    titleVn: 'Mặc đồ',
    titleFr: 'S’habiller',
    text: 'Mr Bowen puts on his **socks**. Then he puts on his **shoes**.',
    textVn: 'Thầy Bowen mang **tất**. Rồi thầy mang **giày**.',
    textFr: 'M. Bowen met ses **chaussettes**. Puis il met ses **chaussures**.',
    sub: 'How does he take them off? Say it in a sentence.',
    subVn: 'Thầy cởi chúng ra thế nào? Hãy nói thành một câu (bằng tiếng Anh).',
    subFr: 'Comment les enlève-t-il ? Dis-le en une phrase (en anglais).',
  },

  // 17. The real thing
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'RotateCcw',
    eyebrow: 'Undo in reverse order',
    eyebrowVn: 'Làm ngược theo thứ tự ngược',
    eyebrowFr: 'Annule dans l’ordre inverse',
    title: 'Last On, First Off',
    titleVn: 'Mang sau, cởi trước',
    titleFr: 'Dernier mis, premier enlevé',
    inlineSvg: DIAGRAMS.SOCKS_REAL,
    caption: 'An equation with two steps works the same way.',
    captionVn: 'Phương trình có hai bước cũng như vậy. (put on = mang vào, take off = cởi ra)',
    captionFr: 'Une équation à deux étapes marche pareil. (put on = mettre, take off = enlever)',
  },

  // 18. Question only. Left hand A, right hand B; slide 19 settles it.
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowVn: 'Biểu quyết bằng một tay',
    eyebrowFr: 'Vote avec une main',
    title: 'Two Pairs Disagree',
    titleVn: 'Hai cặp không đồng ý',
    titleFr: 'Deux binômes en désaccord',
    text: 'Solve $2a + 4 = 18$',
    textVn: 'Giải $2a + 4 = 18$',
    textFr: 'Résous $2a + 4 = 18$',
    columns: [
      {
        heading: 'A · left hand up',
        headingVn: 'A · giơ tay trái',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_A5,
      },
      {
        heading: 'B · right hand up',
        headingVn: 'B · giơ tay phải',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_A7,
      },
    ],
  },

  // 19. The widget settles it
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Target',
    eyebrow: 'Say each box first',
    eyebrowVn: 'Nói từng ô trước',
    eyebrowFr: 'Dis chaque case d’abord',
    title: 'Two Steps',
    titleVn: 'Hai bước',
    titleFr: 'Deux étapes',
    widget: ReverseTwo,
    caption: '**a = 7** is right. The **+ 4** happened last, so undo it first.',
    captionVn: '**a = 7** mới đúng. Phép **+ 4** làm sau cùng, nên làm ngược nó trước.',
    captionFr: '**a = 7** est juste. Le **+ 4** vient en dernier, donc annule-le d’abord.',
  },

  // 20. The rule
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Ruler',
    eyebrow: 'The rule',
    eyebrowVn: 'Quy tắc',
    eyebrowFr: 'La règle',
    title: 'Undo the Last Step First',
    titleVn: 'Làm ngược bước cuối trước',
    titleFr: 'Annule la dernière étape d’abord',
    ratio: 40,
    inlineSvg: DIAGRAMS.TWO_STEP,
    content: 'Socks and shoes again.',
    contentVn: 'Lại là tất và giày.',
    contentFr: 'Encore les chaussettes et les chaussures.',
    notes: [
      {
        tone: 'write',
        text: 'Two steps: undo the **last** step **first**.\n$2a + 4 = 18$\n$18 − 4 = 14$, then $14 ÷ 2 = 7$',
        textVn: 'Hai bước: làm ngược bước **cuối** **trước tiên**.\n$2a + 4 = 18$\n$18 − 4 = 14$, rồi $14 ÷ 2 = 7$',
        textFr: 'Deux étapes : annule la **dernière** étape **en premier**.\n$2a + 4 = 18$\n$18 − 4 = 14$, puis $14 ÷ 2 = 7$',
      },
    ],
  },

  // 21. Practice
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowVn: 'Bảng con',
    eyebrowFr: 'Ardoises',
    title: 'Two-Step Equations',
    titleVn: 'Phương trình hai bước',
    titleFr: 'Équations à deux étapes',
    ratio: 50,
    content:
      '**a** $3a + 5 = 26$\n' +
      '**b** $4b − 3 = 29$\n' +
      '**c** $30 = 6c + 12$\n' +
      '**d** $20 = 5d − 10$',
    contentVn:
      '**a** $3a + 5 = 26$\n' +
      '**b** $4b − 3 = 29$\n' +
      '**c** $30 = 6c + 12$\n' +
      '**d** $20 = 5d − 10$',
    contentFr:
      '**a** $3a + 5 = 26$\n' +
      '**b** $4b − 3 = 29$\n' +
      '**c** $30 = 6c + 12$\n' +
      '**d** $20 = 5d − 10$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $a = 7$, **b** $b = 8$, **c** $c = 3$, **d** $d = 6$',
      answerVn: '**a** $a = 7$, **b** $b = 8$, **c** $c = 3$, **d** $d = 6$',
      answerFr: '**a** $a = 7$, **b** $b = 8$, **c** $c = 3$, **d** $d = 6$',
    },
  },

  // ── FIND THE MISTAKE ──────────────────────────────────────────────────────
  // 22. Mr Bowen's homework
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Pencil',
    eyebrow: 'Find the mistakes',
    eyebrowVn: 'Tìm lỗi sai',
    eyebrowFr: 'Trouve les erreurs',
    title: 'Mr Bowen’s Homework',
    titleVn: 'Bài tập về nhà của thầy Bowen',
    titleFr: 'Les devoirs de M. Bowen',
    ratio: 40,
    inlineSvg: DIAGRAMS.MISTAKES,
    content: 'Mr Bowen gave himself **4 out of 4**.\n\nCheck each answer. Find his **four** mistakes.',
    contentVn: 'Thầy Bowen tự chấm **4 trên 4**.\n\nThử lại từng đáp án. Tìm **bốn** lỗi sai của thầy.',
    contentFr: 'M. Bowen s’est donné **4 sur 4**.\n\nVérifie chaque réponse. Trouve ses **quatre** erreurs.',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer:
        '**a** $x = 8$: he added 6\n' +
        '**b** $x = 9$: he subtracted 5\n' +
        '**c** $x = 25$: he subtracted 7\n' +
        '**d** $x = 7$: he undid the × 2 first',
      answerVn:
        '**a** $x = 8$: thầy đã cộng 6\n' +
        '**b** $x = 9$: thầy đã trừ 5\n' +
        '**c** $x = 25$: thầy đã trừ 7\n' +
        '**d** $x = 7$: thầy làm ngược × 2 trước',
      answerFr:
        '**a** $x = 8$ : il a ajouté 6\n' +
        '**b** $x = 9$ : il a soustrait 5\n' +
        '**c** $x = 25$ : il a soustrait 7\n' +
        '**d** $x = 7$ : il a annulé le × 2 en premier',
    },
  },

  // 23. Angles (Challenge)
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Triangle',
    eyebrow: 'Challenge · uses 2.3',
    eyebrowVn: 'Thử thách · dùng bài 2.3',
    eyebrowFr: 'Défi · utilise 2.3',
    title: 'Angles',
    titleVn: 'Góc',
    titleFr: 'Angles',
    ratio: 40,
    inlineSvg: DIAGRAMS.ANGLES,
    content: '**a** Write an equation.\n**b** Solve it.\n**c** How big is each angle?',
    contentVn: '**a** Viết một phương trình.\n**b** Giải nó.\n**c** Mỗi góc bằng bao nhiêu độ?',
    contentFr: '**a** Écris une équation.\n**b** Résous-la.\n**c** Combien mesure chaque angle ?',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $4x + 5x = 90$\n**b** $9x = 90$, so $x = 10$\n**c** 40° and 50°',
      answerVn: '**a** $4x + 5x = 90$\n**b** $9x = 90$, nên $x = 10$\n**c** 40° và 50°',
      answerFr: '**a** $4x + 5x = 90$\n**b** $9x = 90$, donc $x = 10$\n**c** 40° et 50°',
    },
  },

  // ── WORD PROBLEMS (deadpan, and they get sillier) ─────────────────────────
  // 24. Notebooks
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Write an equation, then solve it',
    eyebrowVn: 'Viết phương trình, rồi giải',
    eyebrowFr: 'Écris une équation, puis résous-la',
    title: 'Mr Bowen’s Notebooks',
    titleVn: 'Những cuốn vở của thầy Bowen',
    titleFr: 'Les cahiers de M. Bowen',
    content:
      'Mr Bowen buys 4 notebooks and one pen. The pen costs 7 thousand dong.\n\n' +
      'He pays 43 thousand dong.\n\n' +
      'How much is one notebook?',
    contentVn:
      'Thầy Bowen mua 4 cuốn vở và một cây bút. Cây bút giá 7 nghìn đồng.\n\n' +
      'Thầy trả 43 nghìn đồng.\n\n' +
      'Một cuốn vở giá bao nhiêu?',
    contentFr:
      'M. Bowen achète 4 cahiers et un stylo. Le stylo coûte 7 mille dong.\n\n' +
      'Il paie 43 mille dong.\n\n' +
      'Combien coûte un cahier ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '$4n + 7 = 43$\n\n$4n = 36$, so $n = 9$: **9 thousand dong**.',
      answerVn: '$4n + 7 = 43$\n\n$4n = 36$, nên $n = 9$: **9 nghìn đồng**.',
      answerFr: '$4n + 7 = 43$\n\n$4n = 36$, donc $n = 9$ : **9 mille dong**.',
    },
  },

  // 25. Silly one
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Write an equation, then solve it',
    eyebrowVn: 'Viết phương trình, rồi giải',
    eyebrowFr: 'Écris une équation, puis résous-la',
    title: 'Mr Bowen’s Age',
    titleVn: 'Tuổi của thầy Bowen',
    titleFr: 'L’âge de M. Bowen',
    content:
      'Mr Bowen thinks of his age.\n\n' +
      'He doubles it, then subtracts 7. The answer is 1.\n\n' +
      'How old is Mr Bowen?',
    contentVn:
      'Thầy Bowen nghĩ đến tuổi của mình.\n\n' +
      'Thầy gấp đôi nó, rồi trừ đi 7. Kết quả là 1.\n\n' +
      'Thầy Bowen bao nhiêu tuổi?',
    contentFr:
      'M. Bowen pense à son âge.\n\n' +
      'Il le double, puis soustrait 7. La réponse est 1.\n\n' +
      'Quel âge a M. Bowen ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '$2a − 7 = 1$\n\n$2a = 8$, so $a = 4$. Mr Bowen is **4 years old**.',
      answerVn: '$2a − 7 = 1$\n\n$2a = 8$, nên $a = 4$. Thầy Bowen **4 tuổi**.',
      answerFr: '$2a − 7 = 1$\n\n$2a = 8$, donc $a = 4$. M. Bowen a **4 ans**.',
    },
  },

  // 26. Sillier one
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Write an equation, then solve it',
    eyebrowVn: 'Viết phương trình, rồi giải',
    eyebrowFr: 'Écris une équation, puis résous-la',
    title: 'Mr Bowen’s Plant',
    titleVn: 'Cái cây của thầy Bowen',
    titleFr: 'La plante de M. Bowen',
    content:
      'Mr Bowen buys a plant. It grows 5 cm every week.\n\n' +
      'After 6 weeks, it is 26 cm tall.\n\n' +
      'How tall was it when he bought it?',
    contentVn:
      'Thầy Bowen mua một cái cây. Mỗi tuần nó cao thêm 5 cm.\n\n' +
      'Sau 6 tuần, nó cao 26 cm.\n\n' +
      'Lúc thầy mua, cái cây cao bao nhiêu?',
    contentFr:
      'M. Bowen achète une plante. Elle grandit de 5 cm chaque semaine.\n\n' +
      'Après 6 semaines, elle mesure 26 cm.\n\n' +
      'Combien mesurait-elle quand il l’a achetée ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '$h + 30 = 26$\n\n$h = 26 − 30 = −4$. The plant was **−4 cm** tall.',
      answerVn: '$h + 30 = 26$\n\n$h = 26 − 30 = −4$. Cái cây cao **−4 cm**.',
      answerFr: '$h + 30 = 26$\n\n$h = 26 − 30 = −4$. La plante mesurait **−4 cm**.',
    },
  },

  // ── CLOSE ─────────────────────────────────────────────────────────────────
  // 27. Checklist
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you leave',
    eyebrowVn: 'Trước khi ra về',
    eyebrowFr: 'Avant de partir',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    titleFr: 'Sais-tu faire ça ?',
    content: '> Check your notebook: **7 written panels**.',
    contentVn: '> Kiểm tra vở: **7 khung ghi chép**.',
    contentFr: '> Vérifie ton cahier : **7 encadrés recopiés**.',
    items: [
      { text: 'Say what an **equation** is and what **solve** means.', textVn: 'Nói được **phương trình** là gì và **giải** nghĩa là gì.', textFr: 'Dire ce qu’est une **équation** et ce que veut dire **résoudre**.' },
      { text: '**Check** an answer by putting it back in.', textVn: '**Thử lại** đáp án bằng cách thay nó vào lại.', textFr: '**Vérifier** une réponse en la remplaçant dans l’équation.' },
      { text: 'Undo a step with its **inverse operation**.', textVn: 'Làm ngược một bước bằng **phép toán ngược**.', textFr: 'Annuler une étape avec son **opération inverse**.' },
      { text: '**Reverse** a flow chart to solve.', textVn: '**Đi ngược** sơ đồ để giải.', textFr: 'Parcourir un schéma **à l’envers** pour résoudre.' },
      { text: 'Turn "I think of a number" into an equation.', textVn: 'Biến "I think of a number" thành phương trình.', textFr: 'Transformer « I think of a number » en équation.' },
      { text: 'Undo the **last** step **first**.', textVn: 'Làm ngược bước **cuối** **trước tiên**.', textFr: 'Annuler la **dernière** étape **en premier**.' },
    ],
  },

  // 28. Homework
  {
    layout: 'callout',
    accent: RED,
    icon: 'Home',
    eyebrow: 'Homework Assignment',
    eyebrowVn: 'Bài tập về nhà',
    eyebrowFr: 'Devoirs',
    title: 'For Next Lesson',
    titleVn: 'Cho tiết học sau',
    titleFr: 'Pour la prochaine leçon',
    content: 'Check every answer by putting it back into the equation.',
    contentVn: 'Thử lại mọi đáp án bằng cách thay nó vào lại phương trình.',
    contentFr: 'Vérifie chaque réponse en la remplaçant dans l’équation.',
    notes: [
      {
        tone: 'homework',
        badge: 'Workbook 2.5',
        badgeVn: 'Vở bài tập 2.5',
        badgeFr: 'Cahier d’exercices 2.5',
        icon: 'Pencil',
        text: '**Focus** — everybody.\n**Practice** — questions 5 to 9.\n**Challenge** — an attempt beats a blank.',
        textVn: '**Focus** — tất cả các em.\n**Practice** — câu 5 đến câu 9.\n**Challenge** — làm sai vẫn hơn bỏ trống.',
        textFr: '**Focus** — tout le monde.\n**Practice** — questions 5 à 9.\n**Challenge** — essayer vaut mieux que laisser vide.',
      },
    ],
  },

  // 29. Exit question
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    brandFr: 'Maths 7e année',
    title: 'Lesson Complete!',
    titleVn: 'Hoàn thành bài học!',
    titleFr: 'Leçon terminée !',
    subtitle: 'Exit question: solve **6x − 4 = 32**, then check.',
    subtitleVn: 'Câu hỏi ra về: giải **6x − 4 = 32**, rồi thử lại.',
    subtitleFr: 'Question de sortie : résous **6x − 4 = 32**, puis vérifie.',
  },
]

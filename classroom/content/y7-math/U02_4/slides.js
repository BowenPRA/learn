// content/y7-math/U02_4/slides.js
// Year 7 Mathematics · 2.4 Expanding Brackets. Wednesday 16 Sept 2026.
// Source: Workbook Unit 2, Section 2.4. Every number used in class is original;
// the exercise is the homework and is not spent in advance.
//
// WRITING RULE FOR THIS DECK (the 2.5 Science density): short sentences, one
// idea each, and the body text never repeats the write note. A diagram carries
// the picture; the note carries the words to copy.
//
// THREE THINGS SHAPE THIS DECK.
//
// 1. THE CLASS ALREADY DOES THIS IN THEIR HEADS. Nobody multiplies by 16; they
//    split it into 10 and 6. Slides 1–4 make them notice that, then name it.
//    The book's grid is drawn (slide 3) and then photographed (slide 4): a real
//    bar of 2 × 7 squares snapped into 2 × 5 and 2 × 2.
//
// 2. THE ENGLISH IS THE BARRIER. "Expand" outside maths means "get bigger"; here
//    the value never changes, only the writing gets longer. "Multiply out" is
//    the same instruction with different words — both appear in the exercise.
//    And the whole rule lives in one small word: EACH. Slide 5 stops for all
//    three.
//
// 3. TWO MISTAKES COST THE MARKS: multiplying only the first term
//    (5(a + 3) = 5a + 3) and carrying on past the answer
//    (4(3 − c) = 12 − 4c = 8c). Each gets an ask-before-you-tell slide (7 and
//    13) with a split vote and no answer, then a widget or diagram that settles
//    it. The second one is 2.3 coming back: 12 and 4c are not like terms.
//
// COPY-DOWN: 6 written panels — brackets · expand · take the sign · already
// finished · multiply the numbers · expand and simplify.
import { DIAGRAMS } from './diagrams.js'
import { ExpandPlus, ExpandMinus, RightOrWrong } from './widgets.jsx'

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
    eyebrow: 'Unit 2 · 2.4',
    eyebrowVn: 'Chương 2 · 2.4',
    eyebrowFr: 'Unité 2 · 2.4',
    date: '16 Sept 2026',
    title: 'Expanding Brackets',
    titleVn: 'Khai triển dấu ngoặc',
    titleFr: 'Développer des parenthèses',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      badgeFr: 'Pour commencer',
      text: 'Work out **4 × 16** in your head. Then write down **how** you did it.',
      textVn: 'Tính nhẩm **4 × 16**. Rồi viết ra em đã tính **bằng cách nào**.',
      textFr: 'Calcule **4 × 16** de tête. Puis écris **comment** tu as fait.',
    },
  },

  // ── YOU ALREADY DO THIS ───────────────────────────────────────────────────
  // 2. Question only. Their own method is the lesson.
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Starter check',
    eyebrowVn: 'Kiểm tra khởi động',
    eyebrowFr: 'Correction',
    title: 'How Did You Do It?',
    titleVn: 'Em đã tính thế nào?',
    titleFr: 'Comment as-tu fait ?',
    text: 'Nobody multiplies by **16**.',
    textVn: 'Không ai nhân với **16**.',
    textFr: 'Personne ne multiplie par **16**.',
    sub: 'You split it: **16 = 10 + 6**.',
    subVn: 'Em tách ra: **16 = 10 + 6**.',
    subFr: 'Tu le coupes en deux : **16 = 10 + 6**.',
    reveal: {
      label: 'Show the working',
      labelVn: 'Hiện cách làm',
      labelFr: 'Voir le calcul',
      answer: '$4 × 10 + 4 × 6 = 40 + 24 = 64$ — that is expanding brackets.',
      answerVn: '$4 × 10 + 4 × 6 = 40 + 24 = 64$ — đó chính là khai triển dấu ngoặc.',
      answerFr: '$4 × 10 + 4 × 6 = 40 + 24 = 64$ — c’est ça, développer des parenthèses.',
    },
  },

  // 3. The book's grid
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Grid3x3',
    eyebrow: 'The book’s method',
    eyebrowVn: 'Phương pháp trong sách',
    eyebrowFr: 'La méthode du livre',
    title: 'One Box, One Multiplication',
    titleVn: 'Một ô, một phép nhân',
    titleFr: 'Une case, une multiplication',
    inlineSvg: DIAGRAMS.BOX_NUMBER,
    caption: 'Fill every box, then add the boxes.',
    captionVn: 'Điền mọi ô, rồi cộng các ô lại. (box = ô)',
    captionFr: 'Remplis chaque case, puis additionne les cases. (box = case)',
  },

  // 4. The real thing
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'A real grid',
    eyebrowVn: 'Một lưới ô có thật',
    eyebrowFr: 'Une vraie grille',
    title: 'Snap the Chocolate',
    titleVn: 'Bẻ đôi thanh sô cô la',
    titleFr: 'Casse le chocolat',
    inlineSvg: DIAGRAMS.CHOC_REAL,
    caption: 'Two pieces, same 14 squares.',
    captionVn: 'Hai mảnh, vẫn là 14 ô. (snap = bẻ, square = ô vuông)',
    captionFr: 'Deux morceaux, toujours 14 carrés. (snap = casser, square = carré)',
  },

  // ── THE ENGLISH ───────────────────────────────────────────────────────────
  // 5. English check: expand / multiply out / each
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
    caption: 'The answer never gets bigger. Only the **writing** gets longer.',
    captionVn: 'Giá trị không hề lớn hơn. Chỉ có **cách viết** dài ra. (expand = khai triển, multiply out = nhân phá ngoặc, each = mỗi)',
    captionFr: 'La réponse ne grandit jamais. Seule l’**écriture** s’allonge. (expand = développer, multiply out = développer aussi, each = chaque)',
  },

  // 6. Key word: brackets
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Parentheses',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Brackets',
    titleVn: 'Dấu ngoặc',
    titleFr: 'Parenthèses',
    ratio: 40,
    inlineSvg: DIAGRAMS.BRACKETS,
    content: 'You met the hidden times sign in 2.2.',
    contentVn: 'Em đã gặp dấu nhân ẩn ở bài 2.2.',
    contentFr: 'Tu as vu le signe × caché en 2.2.',
    notes: [
      {
        tone: 'write',
        text: '**Brackets:** the marks **( )**.\n$4(10 + 6)$ means $4 × (10 + 6)$.',
        textVn: '**Dấu ngoặc (brackets):** các dấu **( )**.\n$4(10 + 6)$ nghĩa là $4 × (10 + 6)$.',
        textFr: '**Parenthèses (brackets) :** les signes **( )**.\n$4(10 + 6)$ veut dire $4 × (10 + 6)$.',
      },
    ],
  },

  // ── MISTAKE 1: ONLY THE FIRST TERM ────────────────────────────────────────
  // 7. Question only. Everyone votes at once — left hand A, right hand B —
  // and nobody settles it until slide 8.
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
    text: 'Expand $5(a + 3)$',
    textVn: 'Khai triển $5(a + 3)$',
    textFr: 'Développe $5(a + 3)$',
    columns: [
      {
        heading: 'A · left hand up',
        headingVn: 'A · giơ tay trái',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_5A3,
      },
      {
        heading: 'B · right hand up',
        headingVn: 'B · giơ tay phải',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_5A15,
      },
    ],
  },

  // 8. The grid settles it
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'Say each box first',
    eyebrowVn: 'Nói từng ô trước',
    eyebrowFr: 'Dis chaque case avant',
    title: 'Fill the Grid',
    titleVn: 'Điền vào lưới ô',
    titleFr: 'Remplis la grille',
    widget: ExpandPlus,
    caption: 'Before each press, the class says the multiplication.',
    captionVn: 'Trước mỗi lần bấm, cả lớp nói phép nhân đó.',
    captionFr: 'Avant chaque clic, la classe dit la multiplication.',
  },

  // 9. The rule
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Ruler',
    eyebrow: 'The rule',
    eyebrowVn: 'Quy tắc',
    eyebrowFr: 'La règle',
    title: 'Every Term, Not Just the First',
    titleVn: 'Mọi hạng tử, không chỉ hạng tử đầu',
    titleFr: 'Chaque terme, pas seulement le premier',
    ratio: 40,
    inlineSvg: DIAGRAMS.ARROWS,
    content: '**5a + 15 is right.** The 3 must be multiplied too.',
    contentVn: '**5a + 15 mới đúng.** Số 3 cũng phải được nhân.',
    contentFr: '**5a + 15 est juste.** Il faut aussi multiplier le 3.',
    notes: [
      {
        tone: 'write',
        text: '**Expand:** multiply **every** term inside the brackets by the number outside.\n$5(a + 3) = 5a + 15$',
        textVn: '**Khai triển (expand):** nhân **mọi** hạng tử bên trong ngoặc với số bên ngoài.\n$5(a + 3) = 5a + 15$',
        textFr: '**Développer (expand) :** multiplier **chaque** terme dans les parenthèses par le nombre à l’extérieur.\n$5(a + 3) = 5a + 15$',
      },
    ],
  },

  // 10. Quick practice
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowVn: 'Bảng con',
    eyebrowFr: 'Ardoises',
    title: 'Expand These',
    titleVn: 'Khai triển các biểu thức sau',
    titleFr: 'Développe',
    ratio: 50,
    content:
      '**a** $3(a + 2)$\n' +
      '**b** $5(b + 3)$\n' +
      '**c** $9(3 + y)$\n' +
      '**d** $4(2 + f)$\n' +
      '**e** $8(7 + z)$',
    contentVn:
      '**a** $3(a + 2)$\n' +
      '**b** $5(b + 3)$\n' +
      '**c** $9(3 + y)$\n' +
      '**d** $4(2 + f)$\n' +
      '**e** $8(7 + z)$',
    contentFr:
      '**a** $3(a + 2)$\n' +
      '**b** $5(b + 3)$\n' +
      '**c** $9(3 + y)$\n' +
      '**d** $4(2 + f)$\n' +
      '**e** $8(7 + z)$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $3a + 6$, **b** $5b + 15$, **c** $27 + 9y$, **d** $8 + 4f$, **e** $56 + 8z$',
      answerVn: '**a** $3a + 6$, **b** $5b + 15$, **c** $27 + 9y$, **d** $8 + 4f$, **e** $56 + 8z$',
      answerFr: '**a** $3a + 6$, **b** $5b + 15$, **c** $27 + 9y$, **d** $8 + 4f$, **e** $56 + 8z$',
    },
  },

  // ── THE MINUS SIGN ────────────────────────────────────────────────────────
  // 11. The minus goes into the box
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Move',
    eyebrow: 'Watch the minus sign',
    eyebrowVn: 'Theo dõi dấu trừ',
    eyebrowFr: 'Surveille le signe moins',
    title: 'Take the Sign With You',
    titleVn: 'Mang theo cả dấu',
    titleFr: 'Emporte le signe',
    ratio: 40,
    inlineSvg: DIAGRAMS.MINUS_BOX,
    content: 'The same rule as 2.3: the sign travels with its term.',
    contentVn: 'Vẫn là quy tắc của bài 2.3: dấu đi cùng hạng tử của nó.',
    contentFr: 'Même règle qu’en 2.3 : le signe voyage avec son terme.',
    notes: [
      {
        tone: 'write',
        text: 'The sign **in front** of a term goes into the box with it.\n$3(x − 2) = 3x − 6$',
        textVn: 'Dấu **đứng trước** hạng tử đi vào ô cùng với hạng tử đó.\n$3(x − 2) = 3x − 6$',
        textFr: 'Le signe **devant** un terme va dans la case avec lui.\n$3(x − 2) = 3x − 6$',
      },
    ],
  },

  // 12. Practise it, one box at a time
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Target',
    eyebrow: 'Say each box first',
    eyebrowVn: 'Nói từng ô trước',
    eyebrowFr: 'Dis chaque case avant',
    title: 'A Minus Inside',
    titleVn: 'Dấu trừ ở bên trong',
    titleFr: 'Un moins à l’intérieur',
    widget: ExpandMinus,
    caption: 'The last one has the letter **second**. It still works.',
    captionVn: 'Câu cuối có chữ cái đứng **sau**. Cách làm vẫn vậy.',
    captionFr: 'Dans le dernier, la lettre est **en second**. Ça marche quand même.',
  },

  // ── MISTAKE 2: CARRYING ON PAST THE ANSWER ────────────────────────────────
  // 13. Question only. Left hand A, right hand B; slide 14 settles it.
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowVn: 'Biểu quyết bằng một tay',
    eyebrowFr: 'Vote avec une main',
    title: 'Two Pairs Disagree',
    titleVn: 'Hai cặp không đồng ý',
    titleFr: 'Deux binômes pas d’accord',
    text: 'Expand $4(3 − c)$',
    textVn: 'Khai triển $4(3 − c)$',
    textFr: 'Développe $4(3 − c)$',
    columns: [
      {
        heading: 'A · left hand up',
        headingVn: 'A · giơ tay trái',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_8C,
      },
      {
        heading: 'B · right hand up',
        headingVn: 'B · giơ tay phải',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_12M4C,
      },
    ],
  },

  // 14. Stop — 2.3 comes back
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Know when to stop',
    eyebrowVn: 'Biết dừng đúng lúc',
    eyebrowFr: 'Sache t’arrêter',
    title: 'Already Finished',
    titleVn: 'Đã xong rồi',
    titleFr: 'Déjà fini',
    ratio: 40,
    inlineSvg: DIAGRAMS.STOP,
    content: 'You cannot collect a number and a **c** term.',
    contentVn: 'Em không thể gộp một con số với một hạng tử **c**.',
    contentFr: 'Tu ne peux pas réduire un nombre et un terme en **c**.',
    notes: [
      {
        tone: 'write',
        text: '$12 − 4c$ is the answer. Stop there.\n12 and $4c$ are **not like terms**.',
        textVn: '$12 − 4c$ chính là đáp án. Dừng ở đó.\n12 và $4c$ **không đồng dạng**.',
        textFr: '$12 − 4c$ est la réponse. Arrête-toi là.\n12 et $4c$ ne sont **pas des termes semblables**.',
      },
    ],
  },

  // 15. Game
  {
    layout: 'game',
    title: 'Right or Wrong?',
    titleVn: 'Đúng hay sai?',
    titleFr: 'Juste ou faux ?',
    widget: RightOrWrong,
  },

  // ── TWO NUMBERS TO MULTIPLY ───────────────────────────────────────────────
  // 16. 5 × 2p
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ScanEye',
    eyebrow: 'Look closely',
    eyebrowVn: 'Nhìn kỹ nhé',
    eyebrowFr: 'Regarde bien',
    title: 'A Number Inside Too',
    titleVn: 'Bên trong cũng có số',
    titleFr: 'Un nombre dedans aussi',
    ratio: 40,
    inlineSvg: DIAGRAMS.TWO_NUMBERS,
    content: 'A very common slip: writing $7p$ instead of $10p$.',
    contentVn: 'Một lỗi rất hay gặp: viết $7p$ thay vì $10p$.',
    contentFr: 'Une erreur très courante : écrire $7p$ au lieu de $10p$.',
    notes: [
      {
        tone: 'write',
        text: '$5 × 2p = 10p$\nMultiply the **numbers**. The letter stays.',
        textVn: '$5 × 2p = 10p$\nNhân các **con số**. Chữ cái giữ nguyên.',
        textFr: '$5 × 2p = 10p$\nMultiplie les **nombres**. La lettre reste.',
      },
    ],
  },

  // 17. Practice
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowVn: 'Bảng con',
    eyebrowFr: 'Ardoises',
    title: 'Multiply Out',
    titleVn: 'Nhân phá ngoặc',
    titleFr: 'Développe (multiply out)',
    ratio: 50,
    content:
      '**a** $7(3q + 2)$\n' +
      '**b** $4(5u − 1)$\n' +
      '**c** $6(1 + 2v)$\n' +
      '**d** $8(6 + 4w − 3g)$',
    contentVn:
      '**a** $7(3q + 2)$\n' +
      '**b** $4(5u − 1)$\n' +
      '**c** $6(1 + 2v)$\n' +
      '**d** $8(6 + 4w − 3g)$',
    contentFr:
      '**a** $7(3q + 2)$\n' +
      '**b** $4(5u − 1)$\n' +
      '**c** $6(1 + 2v)$\n' +
      '**d** $8(6 + 4w − 3g)$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $21q + 14$, **b** $20u − 4$, **c** $6 + 12v$, **d** $48 + 32w − 24g$',
      answerVn: '**a** $21q + 14$, **b** $20u − 4$, **c** $6 + 12v$, **d** $48 + 32w − 24g$',
      answerFr: '**a** $21q + 14$, **b** $20u − 4$, **c** $6 + 12v$, **d** $48 + 32w − 24g$',
    },
  },

  // ── FIND THE MISTAKE ──────────────────────────────────────────────────────
  // 18. Mr Bowen's homework
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
    content: 'Mr Bowen gave himself **4 out of 4**.\n\nFind his **four** mistakes.',
    contentVn: 'Thầy Bowen tự chấm **4 trên 4**.\n\nHãy tìm **bốn** lỗi sai của thầy.',
    contentFr: 'M. Bowen s’est mis **4 sur 4**.\n\nTrouve ses **quatre** erreurs.',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer:
        '**a** $6a + 12$: the 2 was not multiplied\n' +
        '**b** $12b − 20$: he did $4 + 5$, not $4 × 5$\n' +
        '**c** $10 − 5d$: not like terms\n' +
        '**d** $6m + 12$: he did $3 + 2$, not $3 × 2$',
      answerVn:
        '**a** $6a + 12$: số 2 chưa được nhân\n' +
        '**b** $12b − 20$: thầy lấy $4 + 5$, chứ không phải $4 × 5$\n' +
        '**c** $10 − 5d$: không đồng dạng\n' +
        '**d** $6m + 12$: thầy lấy $3 + 2$, chứ không phải $3 × 2$',
      answerFr:
        '**a** $6a + 12$ : le 2 n’a pas été multiplié\n' +
        '**b** $12b − 20$ : il a fait $4 + 5$, pas $4 × 5$\n' +
        '**c** $10 − 5d$ : pas des termes semblables\n' +
        '**d** $6m + 12$ : il a fait $3 + 2$, pas $3 × 2$',
    },
  },

  // 19. Odd one out
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'ScanEye',
    eyebrow: 'Pairs, one minute',
    eyebrowVn: 'Làm cặp, một phút',
    eyebrowFr: 'Par deux, une minute',
    title: 'Odd One Out',
    titleVn: 'Tìm biểu thức khác loại',
    titleFr: 'L’intrus',
    ratio: 40,
    inlineSvg: DIAGRAMS.ODD,
    content: 'Which one does **not** match the others?',
    contentVn: 'Biểu thức nào **không** giống ba biểu thức còn lại?',
    contentFr: 'Laquelle ne va **pas** avec les autres ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '**C.** $3(4x + 6) = 12x + 18$.\n\nA, B and D all give $12x + 20$.',
      answerVn: '**C.** $3(4x + 6) = 12x + 18$.\n\nA, B và D đều cho $12x + 20$.',
      answerFr: '**C.** $3(4x + 6) = 12x + 18$.\n\nA, B et D donnent toutes $12x + 20$.',
    },
  },

  // ── EXPAND AND SIMPLIFY ───────────────────────────────────────────────────
  // 20. Two jobs
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Layers',
    eyebrow: 'Exam words',
    eyebrowVn: 'Từ trong đề thi',
    eyebrowFr: 'Mots d’examen',
    title: 'Expand and Simplify',
    titleVn: 'Khai triển rồi rút gọn',
    titleFr: 'Développer et réduire',
    ratio: 40,
    inlineSvg: DIAGRAMS.TWO_STEPS,
    content: 'Job two is all of 2.3.',
    contentVn: 'Việc thứ hai chính là toàn bộ bài 2.3.',
    contentFr: 'La deuxième étape, c’est tout le 2.3.',
    notes: [
      {
        tone: 'write',
        text: '**Expand and simplify:** expand the brackets, then collect the like terms.\n$3(x + 2) + 4x = 7x + 6$',
        textVn: '**Khai triển rồi rút gọn:** khai triển dấu ngoặc, rồi gộp các hạng tử đồng dạng.\n$3(x + 2) + 4x = 7x + 6$',
        textFr: '**Développer et réduire :** développer les parenthèses, puis réduire les termes semblables.\n$3(x + 2) + 4x = 7x + 6$',
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
    title: 'Expand, Then Collect',
    titleVn: 'Khai triển, rồi gộp',
    titleFr: 'Développe, puis réduis',
    ratio: 50,
    content:
      '**a** $4(9 + x) − 24$\n' +
      '**b** $5(2x − 2) + x + 17$\n' +
      '**c** $4(x + 4) + 7(x + 1)$',
    contentVn:
      '**a** $4(9 + x) − 24$\n' +
      '**b** $5(2x − 2) + x + 17$\n' +
      '**c** $4(x + 4) + 7(x + 1)$',
    contentFr:
      '**a** $4(9 + x) − 24$\n' +
      '**b** $5(2x − 2) + x + 17$\n' +
      '**c** $4(x + 4) + 7(x + 1)$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $4x + 12$\n**b** $11x + 7$\n**c** $11x + 23$',
      answerVn: '**a** $4x + 12$\n**b** $11x + 7$\n**c** $11x + 23$',
      answerFr: '**a** $4x + 12$\n**b** $11x + 7$\n**c** $11x + 23$',
    },
  },

  // ── WHERE THE GRID CAME FROM ──────────────────────────────────────────────
  // 22. The rectangle IS the grid
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Square',
    eyebrow: 'The grid is a rectangle',
    eyebrowVn: 'Lưới ô chính là hình chữ nhật',
    eyebrowFr: 'La grille est un rectangle',
    title: 'Area and Perimeter',
    titleVn: 'Diện tích và chu vi',
    titleFr: 'Aire et périmètre',
    ratio: 40,
    inlineSvg: DIAGRAMS.RECT_AREA,
    content: 'Write each answer in its **simplest form**.\n\n**a** the area\n**b** the perimeter',
    contentVn: 'Viết mỗi đáp án ở **dạng gọn nhất**.\n\n**a** diện tích (area)\n**b** chu vi (perimeter)',
    contentFr: 'Écris chaque réponse sous **forme réduite**.\n\n**a** l’aire (area)\n**b** le périmètre (perimeter)',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $4(x + 3) = 4x + 12$\n**b** $2(x + 3) + 8 = 2x + 14$',
      answerVn: '**a** $4(x + 3) = 4x + 12$\n**b** $2(x + 3) + 8 = 2x + 14$',
      answerFr: '**a** $4(x + 3) = 4x + 12$\n**b** $2(x + 3) + 8 = 2x + 14$',
    },
  },

  // 23. Backwards (Challenge)
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'RotateCcw',
    eyebrow: 'Challenge',
    eyebrowVn: 'Thử thách',
    eyebrowFr: 'Défi',
    title: 'Work Backwards',
    titleVn: 'Làm ngược lại',
    titleFr: 'Calcule à l’envers',
    notes: [
      {
        tone: 'task',
        badge: 'In pairs',
        badgeVn: 'Làm cặp',
        badgeFr: 'Par deux',
        icon: 'Users',
        text: '**a** $\\square(2x + 3) = 8x + 12$\n**b** $5(2y − \\square) = 10y − 35$\n**c** $\\square(3m + \\square) = 12m + 20$',
        textVn: '**a** $\\square(2x + 3) = 8x + 12$\n**b** $5(2y − \\square) = 10y − 35$\n**c** $\\square(3m + \\square) = 12m + 20$',
        textFr: '**a** $\\square(2x + 3) = 8x + 12$\n**b** $5(2y − \\square) = 10y − 35$\n**c** $\\square(3m + \\square) = 12m + 20$',
      },
    ],
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 4 · **b** 7 · **c** 4 and 5',
      answerVn: '**a** 4 · **b** 7 · **c** 4 và 5',
      answerFr: '**a** 4 · **b** 7 · **c** 4 et 5',
    },
  },

  // ── WORD PROBLEMS (deadpan, and they get sillier) ─────────────────────────
  // 24. Shopping
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Simplest form',
    eyebrowVn: 'Dạng gọn nhất',
    eyebrowFr: 'Forme réduite',
    title: 'Mr Bowen’s Shopping',
    titleVn: 'Thầy Bowen đi chợ',
    titleFr: 'Les courses de M. Bowen',
    content:
      'Mr Bowen buys 6 bags. Each bag has $m$ mangoes and 2 dragon fruits.\n\n' +
      'On the way home he eats 4 mangoes.\n\n' +
      'How much fruit does he carry into the house?',
    contentVn:
      'Thầy Bowen mua 6 túi. Mỗi túi có $m$ quả xoài và 2 quả thanh long.\n\n' +
      'Trên đường về thầy ăn 4 quả xoài.\n\n' +
      'Thầy mang vào nhà bao nhiêu quả?',
    contentFr:
      'M. Bowen achète 6 sacs. Chaque sac contient $m$ mangues et 2 fruits du dragon.\n\n' +
      'Sur le chemin du retour, il mange 4 mangues.\n\n' +
      'Combien de fruits rapporte-t-il à la maison ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '$6(m + 2) − 4 = 6m + 12 − 4 = 6m + 8$',
      answerVn: '$6(m + 2) − 4 = 6m + 12 − 4 = 6m + 8$',
      answerFr: '$6(m + 2) − 4 = 6m + 12 − 4 = 6m + 8$',
    },
  },

  // 25. Sillier one
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Simplest form',
    eyebrowVn: 'Dạng gọn nhất',
    eyebrowFr: 'Forme réduite',
    title: 'Mr Bowen’s Drawers',
    titleVn: 'Ngăn kéo của thầy Bowen',
    titleFr: 'Les tiroirs de M. Bowen',
    content:
      'Mr Bowen has 7 drawers. Each drawer holds $s$ socks and 3 spiders.\n\n' +
      'Every spider picks up one sock and walks out.\n\n' +
      'How many things are in the drawers now?',
    contentVn:
      'Thầy Bowen có 7 ngăn kéo. Mỗi ngăn có $s$ chiếc tất và 3 con nhện.\n\n' +
      'Mỗi con nhện cầm một chiếc tất rồi bò ra ngoài.\n\n' +
      'Bây giờ trong các ngăn kéo có bao nhiêu thứ?',
    contentFr:
      'M. Bowen a 7 tiroirs. Chaque tiroir contient $s$ chaussettes et 3 araignées.\n\n' +
      'Chaque araignée prend une chaussette et s’en va.\n\n' +
      'Combien de choses y a-t-il dans les tiroirs maintenant ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: 'At the start: $7(s + 3) = 7s + 21$.\n\nNow: $7(s − 3) = 7s − 21$.',
      answerVn: 'Lúc đầu: $7(s + 3) = 7s + 21$.\n\nBây giờ: $7(s − 3) = 7s − 21$.',
      answerFr: 'Au début : $7(s + 3) = 7s + 21$.\n\nMaintenant : $7(s − 3) = 7s − 21$.',
    },
  },

  // ── CLOSE ─────────────────────────────────────────────────────────────────
  // 26. Checklist
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
    titleFr: 'Sais-tu le faire ?',
    content: '> Check your notebook: **6 written panels**.',
    contentVn: '> Kiểm tra vở: **6 khung ghi chép**.',
    contentFr: '> Vérifie ton cahier : **6 encadrés recopiés**.',
    items: [
      { text: 'Say what **brackets** and **expand** mean.', textVn: 'Nói được **dấu ngoặc** và **khai triển** là gì.', textFr: 'Dire ce que veulent dire **parenthèses** et **développer**.' },
      { text: 'Multiply **every** term inside the brackets.', textVn: 'Nhân **mọi** hạng tử bên trong ngoặc.', textFr: 'Multiplier **chaque** terme dans les parenthèses.' },
      { text: 'Take the **minus** sign in with its term.', textVn: 'Mang **dấu trừ** vào cùng hạng tử của nó.', textFr: 'Emporter le signe **moins** avec son terme.' },
      { text: 'Stop at $12 − 4c$: not like terms.', textVn: 'Dừng ở $12 − 4c$: không đồng dạng.', textFr: 'S’arrêter à $12 − 4c$ : pas des termes semblables.' },
      { text: 'Know that $5 × 2p = 10p$.', textVn: 'Biết rằng $5 × 2p = 10p$.', textFr: 'Savoir que $5 × 2p = 10p$.' },
      { text: '**Expand and simplify** in that order.', textVn: '**Khai triển rồi rút gọn**, đúng thứ tự đó.', textFr: '**Développer et réduire**, dans cet ordre.' },
    ],
  },

  // 27. Homework
  {
    layout: 'callout',
    accent: RED,
    icon: 'Home',
    eyebrow: 'Homework Assignment',
    eyebrowVn: 'Bài tập về nhà',
    eyebrowFr: 'Devoirs',
    title: 'For Next Lesson',
    titleVn: 'Cho tiết học sau',
    titleFr: 'Pour le prochain cours',
    content: 'Draw the grid for every question until you stop needing it.',
    contentVn: 'Hãy vẽ lưới ô cho mọi câu, cho đến khi em không cần nó nữa.',
    contentFr: 'Dessine la grille à chaque question, jusqu’à ne plus en avoir besoin.',
    notes: [
      {
        tone: 'homework',
        badge: 'Workbook 2.4',
        badgeVn: 'Vở bài tập 2.4',
        badgeFr: 'Cahier d’exercices 2.4',
        icon: 'Pencil',
        text: '**Focus** — everybody.\n**Practice** — up to the odd one out.\n**Challenge** — an attempt beats a blank.',
        textVn: '**Focus** — tất cả các em.\n**Practice** — đến hết câu tìm biểu thức khác loại.\n**Challenge** — làm sai vẫn hơn bỏ trống.',
        textFr: '**Focus** — tout le monde.\n**Practice** — jusqu’à l’intrus.\n**Challenge** — essayer vaut mieux que laisser vide.',
      },
    ],
  },

  // 28. Exit question
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
    subtitle: 'Exit question: expand and simplify **5(x + 2) + 3x**.',
    subtitleVn: 'Câu hỏi ra về: khai triển rồi rút gọn **5(x + 2) + 3x**.',
    subtitleFr: 'Question de sortie : développe et réduis **5(x + 2) + 3x**.',
  },
]

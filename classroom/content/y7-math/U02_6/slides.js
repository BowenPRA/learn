// content/y7-math/U02_6/slides.js
// Year 7 Mathematics · 2.6 Inequalities. Monday 21 Sept 2026.
// Source: Workbook Unit 2, Section 2.6. Every number used in class is original;
// the exercise is the homework and is not spent in advance. Slide 17 is the
// book's Zara question (Q9) with different numbers.
//
// WRITING RULE FOR THIS DECK (the 2.5 Science density): short sentences, one
// idea each, and the body text never repeats the write note. A diagram carries
// the picture; the note carries the words to copy.
//
// THREE THINGS SHAPE THIS DECK.
//
// 1. THE CLASS KNOWS THE SIGNS ALREADY. Vietnamese primary school teaches < and
//    > in Grade 1. What is new is the ENGLISH: "is less than", "is greater than",
//    read left to right, and the other words a word problem uses instead
//    (fewer, below, under, over). Slides 2–4 are all English.
//
// 2. AN INEQUALITY HAS MANY ANSWERS. After a week of equations with one answer,
//    "I have more than 3 cats" has four, five, six… — and "integer" (Unit 1's
//    word) is what stops the answer being 3.5 cats.
//
// 3. TWO MISTAKES COST THE MARKS: including the circle's own number (x > 3, so
//    the smallest integer is 3) and going the wrong way with negatives (t < −2,
//    so −1, 0, 1, …). Each gets an ask-before-you-tell vote (11 and 17) with no
//    answer on it. The first is settled by the open circle; the second by
//    "less than means left", and a real thermometer turned on its side.
//
// COPY-DOWN: 6 written panels — less than / greater than · inequality ·
// integer · open circle + arrow · the circle's number does not work · less
// than means left.
import { DIAGRAMS } from './diagrams.js'
import { ShowOne, ShowTwo, CouldItBe } from './widgets.jsx'

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
    eyebrow: 'Unit 2 · 2.6',
    eyebrowVn: 'Chương 2 · 2.6',
    eyebrowFr: 'Unité 2 · 2.6',
    date: '21 Sept 2026',
    title: 'Inequalities',
    titleVn: 'Bất đẳng thức',
    titleFr: 'Inégalités',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      badgeFr: 'Pour commencer',
      text: 'Write **<** or **>**: **7 □ 4**, **−3 □ 2**, **−8 □ −5**',
      textVn: 'Viết **<** hoặc **>**: **7 □ 4**, **−3 □ 2**, **−8 □ −5**',
      textFr: 'Écris **<** ou **>** : **7 □ 4**, **−3 □ 2**, **−8 □ −5**',
    },
  },

  // ── THE ENGLISH ───────────────────────────────────────────────────────────
  // 2. Starter check. The signs are easy; reading them aloud is the lesson.
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Starter check',
    eyebrowVn: 'Kiểm tra khởi động',
    eyebrowFr: 'Correction du départ',
    title: 'Say It in English',
    titleVn: 'Nói bằng tiếng Anh',
    titleFr: 'Dis-le en anglais',
    text: '**7 > 4**, **−3 < 2**, **−8 < −5**',
    textVn: '**7 > 4**, **−3 < 2**, **−8 < −5**',
    textFr: '**7 > 4**, **−3 < 2**, **−8 < −5**',
    sub: 'Read each one aloud, in English.',
    subVn: 'Đọc to từng câu, bằng tiếng Anh.',
    subFr: 'Lis chacune à voix haute, en anglais.',
    reveal: {
      label: 'Show me',
      labelVn: 'Cho xem',
      labelFr: 'Montre-moi',
      answer: '7 **is greater than** 4. −3 **is less than** 2. −8 **is less than** −5.',
      answerVn: '7 **is greater than** 4 (lớn hơn). −3 **is less than** 2 (nhỏ hơn). −8 **is less than** −5.',
      answerFr: '7 **is greater than** 4 (plus grand que). −3 **is less than** 2 (plus petit que). −8 **is less than** −5.',
    },
  },

  // 3. The book's Remember box
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ArrowLeftRight',
    eyebrow: 'Remember',
    eyebrowVn: 'Ghi nhớ',
    eyebrowFr: 'À retenir',
    title: 'Less Than, Greater Than',
    titleVn: 'Nhỏ hơn, lớn hơn',
    titleFr: 'Plus petit, plus grand',
    ratio: 40,
    inlineSvg: DIAGRAMS.SYMBOLS,
    content: 'Read from **left to right**.',
    contentVn: 'Đọc từ **trái sang phải**.',
    contentFr: 'Lis de **gauche à droite**.',
    notes: [
      {
        tone: 'write',
        text: '**<** means **is less than**.\n**>** means **is greater than**.',
        textVn: '**<** nghĩa là **nhỏ hơn** (is less than).\n**>** nghĩa là **lớn hơn** (is greater than).',
        textFr: '**<** veut dire **est plus petit que** (is less than).\n**>** veut dire **est plus grand que** (is greater than).',
      },
    ],
  },

  // 4. English check: the other words
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    eyebrowFr: 'Point d’anglais',
    title: 'Other Words, Same Sign',
    titleVn: 'Từ khác, cùng dấu',
    titleFr: 'Autres mots, même signe',
    inlineSvg: DIAGRAMS.WORDS,
    caption: 'Word problems use all of these.',
    captionVn: 'Bài toán có lời văn dùng tất cả các từ này. (fewer than = ít hơn, below/under = dưới, above/over = trên)',
    captionFr: 'Les problèmes utilisent tous ces mots. (fewer than = moins de, below/under = sous, above/over = au-dessus)',
  },

  // ── MANY ANSWERS ──────────────────────────────────────────────────────────
  // 5. Question only
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Say a number',
    eyebrowVn: 'Nói một số',
    eyebrowFr: 'Dis un nombre',
    title: 'Mr Bowen’s Cats',
    titleVn: 'Những con mèo của thầy Bowen',
    titleFr: 'Les chats de M. Bowen',
    text: '"I have **more than 3** cats."',
    textVn: '"Thầy có **nhiều hơn 3** con mèo."',
    textFr: '« J’ai **plus de 3** chats. »',
    sub: 'How many cats could Mr Bowen have? Is there only one answer?',
    subVn: 'Thầy Bowen có thể có bao nhiêu con mèo? Chỉ có một đáp án thôi sao?',
    subFr: 'Combien de chats M. Bowen peut-il avoir ? Y a-t-il une seule réponse ?',
  },

  // 6. Key word: inequality
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Inequality',
    titleVn: 'Bất đẳng thức',
    titleFr: 'Inégalité',
    ratio: 40,
    inlineSvg: DIAGRAMS.EQ_VS_INEQ,
    content: 'More than 3 cats: $c > 3$',
    contentVn: 'Nhiều hơn 3 con mèo: $c > 3$',
    contentFr: 'Plus de 3 chats : $c > 3$',
    notes: [
      {
        tone: 'write',
        text: '**Inequality:** uses < or > to compare.\nIt can have **many** answers.\n$c > 3$: $c$ could be 4, 5, 6, …',
        textVn: '**Bất đẳng thức (inequality):** dùng < hoặc > để so sánh.\nNó có thể có **nhiều** đáp án.\n$c > 3$: $c$ có thể là 4, 5, 6, …',
        textFr: '**Inégalité (inequality) :** utilise < ou > pour comparer.\nElle peut avoir **plusieurs** réponses.\n$c > 3$ : $c$ peut valoir 4, 5, 6, …',
      },
    ],
  },

  // 7. Key word: integer (Unit 1's word)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Boxes',
    eyebrow: 'Key word · from Unit 1',
    eyebrowVn: 'Từ khóa · từ Chương 1',
    eyebrowFr: 'Mot clé · de l’unité 1',
    title: 'Integer',
    titleVn: 'Số nguyên',
    titleFr: 'Nombre entier',
    ratio: 40,
    inlineSvg: DIAGRAMS.INTEGERS,
    content: 'Can Mr Bowen have **3.5** cats?',
    contentVn: 'Thầy Bowen có thể có **3,5** con mèo không?',
    contentFr: 'M. Bowen peut-il avoir **3.5** chats ?',
    notes: [
      {
        tone: 'write',
        text: '**Integer:** a whole number. It can be negative, zero or positive.\n−4, 0 and 7 are integers. 2.5 is not.',
        textVn: '**Số nguyên (integer):** số không có phần thập phân. Nó có thể âm, bằng 0 hoặc dương.\n−4, 0 và 7 là số nguyên. 2,5 thì không.',
        textFr: '**Nombre entier (integer) :** un nombre sans partie décimale. Il peut être négatif, nul ou positif.\n−4, 0 et 7 sont des entiers. 2.5 n’en est pas un.',
      },
    ],
  },

  // 8. Sentence to symbol
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowVn: 'Bảng con',
    eyebrowFr: 'Ardoises',
    title: 'Write It',
    titleVn: 'Viết ra',
    titleFr: 'Écris-la',
    ratio: 50,
    content:
      'Write as an inequality.\n\n' +
      '**a** $y$ is less than 10\n' +
      '**b** $m$ is greater than −4\n' +
      '**c** $t$ is below 0',
    contentVn:
      'Viết thành bất đẳng thức.\n\n' +
      '**a** $y$ is less than 10\n' +
      '**b** $m$ is greater than −4\n' +
      '**c** $t$ is below 0',
    contentFr:
      'Écris sous forme d’inégalité.\n\n' +
      '**a** $y$ is less than 10\n' +
      '**b** $m$ is greater than −4\n' +
      '**c** $t$ is below 0',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $y < 10$, **b** $m > −4$, **c** $t < 0$',
      answerVn: '**a** $y < 10$, **b** $m > −4$, **c** $t < 0$',
      answerFr: '**a** $y < 10$, **b** $m > −4$, **c** $t < 0$',
    },
  },

  // 9. Symbol to sentence, out loud
  {
    layout: 'split',
    accent: GREEN,
    icon: 'MessageSquare',
    eyebrow: 'Out loud',
    eyebrowVn: 'Nói to',
    eyebrowFr: 'À voix haute',
    title: 'Say It',
    titleVn: 'Nói ra',
    titleFr: 'Dis-le',
    ratio: 50,
    content:
      'Say it in English.\n\n' +
      '**a** $n > 7$\n' +
      '**b** $k < −1$\n' +
      '**c** $w > −10$',
    contentVn:
      'Nói bằng tiếng Anh.\n\n' +
      '**a** $n > 7$\n' +
      '**b** $k < −1$\n' +
      '**c** $w > −10$',
    contentFr:
      'Dis-le en anglais.\n\n' +
      '**a** $n > 7$\n' +
      '**b** $k < −1$\n' +
      '**c** $w > −10$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** n is greater than 7\n**b** k is less than −1\n**c** w is greater than −10',
      answerVn: '**a** n is greater than 7\n**b** k is less than −1\n**c** w is greater than −10',
      answerFr: '**a** n is greater than 7\n**b** k is less than −1\n**c** w is greater than −10',
    },
  },

  // ── ON A NUMBER LINE ──────────────────────────────────────────────────────
  // 10. The book's tip: open circle, then the arrow
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Ruler',
    eyebrow: 'The book’s tip',
    eyebrowVn: 'Mẹo trong sách',
    eyebrowFr: 'L’astuce du livre',
    title: 'On a Number Line',
    titleVn: 'Trên trục số',
    titleFr: 'Sur une droite graduée',
    ratio: 40,
    inlineSvg: DIAGRAMS.NUMBER_LINE,
    content: 'Draw the circle first. Then the arrow.',
    contentVn: 'Vẽ vòng tròn trước. Rồi vẽ mũi tên.',
    contentFr: 'Dessine d’abord le cercle. Puis la flèche.',
    notes: [
      {
        tone: 'write',
        text: 'An **open circle** ○ means the number is **not** included.\nThe **arrow** shows all the numbers that work.',
        textVn: '**Vòng tròn rỗng** ○ nghĩa là số đó **không** được tính.\n**Mũi tên** chỉ tất cả các số thỏa mãn.',
        textFr: 'Un **cercle vide** ○ veut dire que le nombre n’est **pas** inclus.\nLa **flèche** montre tous les nombres qui marchent.',
      },
    ],
  },

  // ── MISTAKE 1: THE CIRCLE'S OWN NUMBER ────────────────────────────────────
  // 11. Question only. Everyone votes at once — left hand A, right hand B —
  // and nobody settles it until slide 12.
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
    text: '$x > 3$. The smallest integer $x$ could be?',
    textVn: '$x > 3$. Số nguyên nhỏ nhất $x$ có thể là?',
    textFr: '$x > 3$. Le plus petit entier possible pour $x$ ?',
    columns: [
      {
        heading: 'A · left hand up',
        headingVn: 'A · giơ tay trái',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_3,
      },
      {
        heading: 'B · right hand up',
        headingVn: 'B · giơ tay phải',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_4,
      },
    ],
  },

  // 12. The open circle settles it
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Not included',
    eyebrowVn: 'Không được tính',
    eyebrowFr: 'Pas inclus',
    title: 'Is 3 Greater Than 3?',
    titleVn: '3 có lớn hơn 3 không?',
    titleFr: '3 est-il plus grand que 3 ?',
    ratio: 40,
    inlineSvg: DIAGRAMS.SMALLEST,
    content: '**4 is right.** 3 is the open circle.',
    contentVn: '**4 mới đúng.** 3 là vòng tròn rỗng.',
    contentFr: '**4 est juste.** 3 est le cercle vide.',
    notes: [
      {
        tone: 'write',
        text: '$x > 3$: 3 does **not** work.\nThe **smallest integer** $x$ could be is 4.',
        textVn: '$x > 3$: 3 **không** thỏa mãn.\n**Số nguyên nhỏ nhất** mà $x$ có thể là: 4.',
        textFr: '$x > 3$ : 3 ne marche **pas**.\nLe **plus petit entier** possible pour $x$ est 4.',
      },
    ],
  },

  // 13. The number line, one part per press
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'Say each step first',
    eyebrowVn: 'Nói từng bước trước',
    eyebrowFr: 'Dis chaque étape d’abord',
    title: 'Show It',
    titleVn: 'Biểu diễn nó',
    titleFr: 'Montre-la',
    widget: ShowOne,
    caption: 'Before each press, the class says what comes next.',
    captionVn: 'Trước mỗi lần bấm, cả lớp nói điều gì sẽ đến tiếp theo.',
    captionFr: 'Avant chaque clic, la classe dit ce qui vient ensuite.',
  },

  // 14. Practice: read the lines
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowVn: 'Bảng con',
    eyebrowFr: 'Ardoises',
    title: 'Read the Line',
    titleVn: 'Đọc trục số',
    titleFr: 'Lis la droite',
    ratio: 40,
    inlineSvg: DIAGRAMS.READ_LINES,
    content: 'Write the inequality. Use the letter **x**.',
    contentVn: 'Viết bất đẳng thức. Dùng chữ **x**.',
    contentFr: 'Écris l’inégalité. Utilise la lettre **x**.',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $x > 1$\n**b** $x < 4$\n**c** $x > −3$\n**d** $x < −1$',
      answerVn: '**a** $x > 1$\n**b** $x < 4$\n**c** $x > −3$\n**d** $x < −1$',
      answerFr: '**a** $x > 1$\n**b** $x < 4$\n**c** $x > −3$\n**d** $x < −1$',
    },
  },

  // 15. Practice: draw the lines
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Whiteboards',
    eyebrowVn: 'Bảng con',
    eyebrowFr: 'Ardoises',
    title: 'Draw the Line',
    titleVn: 'Vẽ trục số',
    titleFr: 'Dessine la droite',
    ratio: 50,
    content:
      'Draw a number line for each.\n\n' +
      '**a** $x > 6$\n' +
      '**b** $x < 2$\n' +
      '**c** $y > 0$',
    contentVn:
      'Vẽ một trục số cho mỗi câu.\n\n' +
      '**a** $x > 6$\n' +
      '**b** $x < 2$\n' +
      '**c** $y > 0$',
    contentFr:
      'Dessine une droite graduée pour chacune.\n\n' +
      '**a** $x > 6$\n' +
      '**b** $x < 2$\n' +
      '**c** $y > 0$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** open circle at 6, arrow right\n**b** open circle at 2, arrow left\n**c** open circle at 0, arrow right',
      answerVn: '**a** vòng tròn rỗng ở 6, mũi tên sang phải\n**b** vòng tròn rỗng ở 2, mũi tên sang trái\n**c** vòng tròn rỗng ở 0, mũi tên sang phải',
      answerFr: '**a** cercle vide en 6, flèche vers la droite\n**b** cercle vide en 2, flèche vers la gauche\n**c** cercle vide en 0, flèche vers la droite',
    },
  },

  // 16. Game
  {
    layout: 'game',
    title: 'Could It Be?',
    titleVn: 'Có thể không?',
    titleFr: 'Est-ce possible ?',
    widget: CouldItBe,
  },

  // ── MISTAKE 2: THE WRONG WAY WITH NEGATIVES ───────────────────────────────
  // 17. Question only. The book's Zara question (Q9) with new numbers.
  // Left hand A, right hand B; slide 18 settles it.
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
    text: '$t < −2$. Which integers could $t$ be?',
    textVn: '$t < −2$. $t$ có thể là những số nguyên nào?',
    textFr: '$t < −2$. Quels entiers sont possibles pour $t$ ?',
    columns: [
      {
        heading: 'A · left hand up',
        headingVn: 'A · giơ tay trái',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_UP,
      },
      {
        heading: 'B · right hand up',
        headingVn: 'B · giơ tay phải',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_DOWN,
      },
    ],
  },

  // 18. Less than means left
  {
    layout: 'split',
    accent: RED,
    icon: 'ArrowLeftRight',
    eyebrow: 'Watch the negatives',
    eyebrowVn: 'Cẩn thận với số âm',
    eyebrowFr: 'Attention aux négatifs',
    title: 'Less Than Means Left',
    titleVn: 'Nhỏ hơn nghĩa là bên trái',
    titleFr: 'Plus petit veut dire à gauche',
    ratio: 40,
    inlineSvg: DIAGRAMS.LEFT_RIGHT,
    content: '**B is right.** −1 is **greater** than −2.',
    contentVn: '**B mới đúng.** −1 **lớn hơn** −2.',
    contentFr: '**B est juste.** −1 est **plus grand** que −2.',
    notes: [
      {
        tone: 'write',
        text: '**Less than:** further **left** on the number line.\n**Greater than:** further **right**.\n$−5 < −2$',
        textVn: '**Nhỏ hơn:** nằm xa hơn về bên **trái** trên trục số.\n**Lớn hơn:** nằm xa hơn về bên **phải**.\n$−5 < −2$',
        textFr: '**Plus petit que :** plus à **gauche** sur la droite graduée.\n**Plus grand que :** plus à **droite**.\n$−5 < −2$',
      },
    ],
  },

  // 19. The real thing: a thermometer on its side
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Thermometer',
    eyebrow: 'Unit 1 · colder is less',
    eyebrowVn: 'Chương 1 · lạnh hơn là nhỏ hơn',
    eyebrowFr: 'Unité 1 · plus froid, c’est plus petit',
    title: 'A Thermometer on Its Side',
    titleVn: 'Nhiệt kế nằm ngang',
    titleFr: 'Un thermomètre couché',
    inlineSvg: DIAGRAMS.THERMO_REAL,
    caption: 'Turn it on its side: it is a number line. −5 °C is colder than −2 °C.',
    captionVn: 'Đặt nằm ngang: nó là một trục số. −5 °C lạnh hơn −2 °C. (colder = lạnh hơn, hotter = nóng hơn)',
    captionFr: 'Couche-le : c’est une droite graduée. −5 °C est plus froid que −2 °C. (colder = plus froid, hotter = plus chaud)',
  },

  // 20. The number line again, with negatives and one decimal
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Target',
    eyebrow: 'Say each step first',
    eyebrowVn: 'Nói từng bước trước',
    eyebrowFr: 'Dis chaque étape d’abord',
    title: 'Show It With Negatives',
    titleVn: 'Biểu diễn với số âm',
    titleFr: 'Montre-la avec des négatifs',
    widget: ShowTwo,
    caption: 'Less than: left. Greater than: right. Even below zero.',
    captionVn: 'Nhỏ hơn: bên trái. Lớn hơn: bên phải. Kể cả khi dưới 0.',
    captionFr: 'Plus petit : à gauche. Plus grand : à droite. Même sous zéro.',
  },

  // 21. Practice: smallest or largest
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowVn: 'Bảng con',
    eyebrowFr: 'Ardoises',
    title: 'Smallest or Largest?',
    titleVn: 'Nhỏ nhất hay lớn nhất?',
    titleFr: 'Le plus petit ou le plus grand ?',
    ratio: 50,
    content:
      'For **>**, write the **smallest** integer. For **<**, write the **largest**.\n\n' +
      '**a** $p > 6$\n' +
      '**b** $q < −4$\n' +
      '**c** $r > −1$\n' +
      '**d** $s < 0$\n' +
      '**e** $p > 2.5$',
    contentVn:
      'Với **>**, viết số nguyên **nhỏ nhất**. Với **<**, viết số nguyên **lớn nhất**.\n\n' +
      '**a** $p > 6$\n' +
      '**b** $q < −4$\n' +
      '**c** $r > −1$\n' +
      '**d** $s < 0$\n' +
      '**e** $p > 2.5$',
    contentFr:
      'Pour **>**, écris le **plus petit** entier. Pour **<**, écris le **plus grand**.\n\n' +
      '**a** $p > 6$\n' +
      '**b** $q < −4$\n' +
      '**c** $r > −1$\n' +
      '**d** $s < 0$\n' +
      '**e** $p > 2.5$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 7, **b** −5, **c** 0, **d** −1, **e** 3',
      answerVn: '**a** 7, **b** −5, **c** 0, **d** −1, **e** 3',
      answerFr: '**a** 7, **b** −5, **c** 0, **d** −1, **e** 3',
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
    content: 'Mr Bowen gave himself **4 out of 4**.\n\nFind his **four** mistakes.',
    contentVn: 'Thầy Bowen tự chấm **4 trên 4**.\n\nHãy tìm **bốn** lỗi sai của thầy.',
    contentFr: 'M. Bowen s’est donné **4 sur 4**.\n\nTrouve ses **quatre** erreurs.',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer:
        '**a** 8: 7 is not included\n' +
        '**b** −4, −5, −6, …: less than is left\n' +
        '**c** $k < 9$\n' +
        '**d** −5: −7 is less than −6',
      answerVn:
        '**a** 8: không tính 7\n' +
        '**b** −4, −5, −6, …: nhỏ hơn là bên trái\n' +
        '**c** $k < 9$\n' +
        '**d** −5: −7 nhỏ hơn −6',
      answerFr:
        '**a** 8 : 7 n’est pas inclus\n' +
        '**b** −4, −5, −6, … : plus petit, c’est à gauche\n' +
        '**c** $k < 9$\n' +
        '**d** −5 : −7 est plus petit que −6',
    },
  },

  // ── WORD PROBLEMS (deadpan, and they get sillier) ─────────────────────────
  // 23. A sensible one
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Write the inequalities first',
    eyebrowVn: 'Viết bất đẳng thức trước',
    eyebrowFr: 'Écris d’abord les inégalités',
    title: 'Mr Bowen’s Class',
    titleVn: 'Lớp học của thầy Bowen',
    titleFr: 'La classe de M. Bowen',
    content:
      'Mr Bowen’s class has **more than 20** students.\n\n' +
      'It has **fewer than 24** students.\n\n' +
      'How many students could there be?',
    contentVn:
      'Lớp của thầy Bowen có **nhiều hơn 20** học sinh.\n\n' +
      'Lớp có **ít hơn 24** học sinh.\n\n' +
      'Lớp có thể có bao nhiêu học sinh?',
    contentFr:
      'La classe de M. Bowen a **plus de 20** élèves.\n\n' +
      'Elle a **moins de 24** élèves.\n\n' +
      'Combien d’élèves peut-il y avoir ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '$s > 20$ and $s < 24$\n\n**21, 22 or 23** students.',
      answerVn: '$s > 20$ và $s < 24$\n\n**21, 22 hoặc 23** học sinh.',
      answerFr: '$s > 20$ et $s < 24$\n\n**21, 22 ou 23** élèves.',
    },
  },

  // 24. Silly one
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Write the inequalities first',
    eyebrowVn: 'Viết bất đẳng thức trước',
    eyebrowFr: 'Écris d’abord les inégalités',
    title: 'Mr Bowen’s Cats, Again',
    titleVn: 'Lại là những con mèo của thầy Bowen',
    titleFr: 'Encore les chats de M. Bowen',
    content:
      'Mr Bowen has **fewer than 1** cat.\n\n' +
      'He has **more than −1** cats.\n\n' +
      'How many cats does Mr Bowen have?',
    contentVn:
      'Thầy Bowen có **ít hơn 1** con mèo.\n\n' +
      'Thầy có **nhiều hơn −1** con mèo.\n\n' +
      'Thầy Bowen có bao nhiêu con mèo?',
    contentFr:
      'M. Bowen a **moins de 1** chat.\n\n' +
      'Il a **plus de −1** chat.\n\n' +
      'Combien de chats a M. Bowen ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '$c < 1$ and $c > −1$\n\nThe only integer is **0**. Mr Bowen has **no cats**.',
      answerVn: '$c < 1$ và $c > −1$\n\nSố nguyên duy nhất là **0**. Thầy Bowen **không có con mèo nào**.',
      answerFr: '$c < 1$ et $c > −1$\n\nLe seul entier est **0**. M. Bowen n’a **aucun chat**.',
    },
  },

  // 25. Sillier one
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Write the inequalities first',
    eyebrowVn: 'Viết bất đẳng thức trước',
    eyebrowFr: 'Écris d’abord les inégalités',
    title: 'Mr Bowen’s Number',
    titleVn: 'Con số của thầy Bowen',
    titleFr: 'Le nombre de M. Bowen',
    content:
      'Mr Bowen thinks of an **integer**.\n\n' +
      'It is greater than 7. It is less than 8.\n\n' +
      'What is Mr Bowen’s number?',
    contentVn:
      'Thầy Bowen nghĩ ra một **số nguyên**.\n\n' +
      'Nó lớn hơn 7. Nó nhỏ hơn 8.\n\n' +
      'Số của thầy Bowen là số nào?',
    contentFr:
      'M. Bowen pense à un **nombre entier**.\n\n' +
      'Il est plus grand que 7. Il est plus petit que 8.\n\n' +
      'Quel est le nombre de M. Bowen ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '$n > 7$ and $n < 8$\n\nNo integer is greater than 7 and less than 8. Mr Bowen should think again.',
      answerVn: '$n > 7$ và $n < 8$\n\nKhông có số nguyên nào lớn hơn 7 và nhỏ hơn 8. Thầy Bowen nên nghĩ lại.',
      answerFr: '$n > 7$ et $n < 8$\n\nAucun entier n’est plus grand que 7 et plus petit que 8. M. Bowen doit réfléchir encore.',
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
    titleFr: 'Sais-tu faire ça ?',
    content: '> Check your notebook: **6 written panels**.',
    contentVn: '> Kiểm tra vở: **6 khung ghi chép**.',
    contentFr: '> Vérifie ton cahier : **6 encadrés recopiés**.',
    items: [
      { text: 'Read **<** and **>** aloud in English.', textVn: 'Đọc to **<** và **>** bằng tiếng Anh.', textFr: 'Lire **<** et **>** à voix haute en anglais.' },
      { text: 'Say what an **inequality** and an **integer** are.', textVn: 'Nói được **bất đẳng thức** và **số nguyên** là gì.', textFr: 'Dire ce qu’est une **inégalité** et un **nombre entier**.' },
      { text: 'Draw an inequality on a number line.', textVn: 'Biểu diễn bất đẳng thức trên trục số.', textFr: 'Représenter une inégalité sur une droite graduée.' },
      { text: 'Write the inequality a number line shows.', textVn: 'Viết bất đẳng thức mà trục số biểu diễn.', textFr: 'Écrire l’inégalité que montre une droite graduée.' },
      { text: 'Find the **smallest** or **largest** integer.', textVn: 'Tìm số nguyên **nhỏ nhất** hoặc **lớn nhất**.', textFr: 'Trouver le **plus petit** ou le **plus grand** entier.' },
      { text: 'Remember: **less than** means **left**.', textVn: 'Nhớ: **nhỏ hơn** nghĩa là **bên trái**.', textFr: 'Retiens : **plus petit** veut dire **à gauche**.' },
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
    titleFr: 'Pour la prochaine leçon',
    content: 'On every number line: the open circle first, then the arrow.',
    contentVn: 'Trên mọi trục số: vẽ vòng tròn rỗng trước, rồi đến mũi tên.',
    contentFr: 'Sur chaque droite graduée : d’abord le cercle vide, puis la flèche.',
    notes: [
      {
        tone: 'homework',
        badge: 'Workbook 2.6',
        badgeVn: 'Vở bài tập 2.6',
        badgeFr: 'Cahier d’exercices 2.6',
        icon: 'Pencil',
        text: '**Focus** — everybody.\n**Practice** — questions 6 to 11.\n**Challenge** — an attempt beats a blank.',
        textVn: '**Focus** — tất cả các em.\n**Practice** — câu 6 đến câu 11.\n**Challenge** — làm sai vẫn hơn bỏ trống.',
        textFr: '**Focus** — tout le monde.\n**Practice** — questions 6 à 11.\n**Challenge** — essayer vaut mieux que laisser vide.',
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
    subtitle: 'Exit question: write "**y is less than −4**" as an inequality. What is the largest integer y could be?',
    subtitleVn: 'Câu hỏi ra về: viết "**y is less than −4**" thành bất đẳng thức. Số nguyên lớn nhất y có thể là số nào?',
    subtitleFr: 'Question de sortie : écris « **y is less than −4** » sous forme d’inégalité. Quel est le plus grand entier possible pour y ?',
  },
]

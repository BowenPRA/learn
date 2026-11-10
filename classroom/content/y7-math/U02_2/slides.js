// content/y7-math/U02_2/slides.js
// Year 7 Mathematics · 2.2 Using Expressions and Formulae. Thursday 10 Sept 2026.
//
// Same house style as 1.1–1.6 and 2.1: teal section headers, purple activity
// boxes, red homework, and the book's orange for every key word students copy
// down. Anything they must write goes in an orange "Write This Down" panel or
// an orange `>` bumper — never plain body text.
//
// FOUR THINGS SHAPE THIS DECK.
//
// 1. IT OPENS BY PAYING OFF 2.1. Last lesson the hardest thing to sell was that
//    c − 50 is a finished answer and they were allowed to stop. Slide 2 hands
//    them c = 320 and the row finishes. That is the whole of 2.2 in one move,
//    it uses the same cups and the same numbers as the 2.1 diagram, and it
//    means the new word arrives as a reward rather than as another rule. Do not
//    reorder these first three slides.
//
// 2. THE WALL IS SLIDE 4, AND IT IS 2.1's OWN FAULT. Last lesson taught them to
//    write 3 × n as 3n. The bill arrives here: a student who reads 3n as two
//    digits pushed together answers 34 for n = 4, and is completely confident.
//    INVISIBLE_TIMES draws the × back in before any number lands. Every year
//    this is the mistake that costs the most marks in Exercise 2.2, and it is
//    not an arithmetic failure — it is a reading failure, like everything else
//    in this unit.
//
// 3. THE VOCABULARY IS THE WORKBOOK'S. Substitute, value and formula are the
//    section's three margin key words, and the definition on slide 9 is
//    Cambridge's own: a rule connecting two or more quantities, written with
//    letters, WITH an = sign. That last clause is the whole contrast with 2.1,
//    where an expression was defined as having no = sign, so the two words are
//    put side by side rather than left two pages apart for a student to notice.
//    The verb stays REPRESENT, as it was in 2.1.
//
// 4. THE ENGLISH IS STILL THE MATHS. Slides 6–8 add no new arithmetic: 3x + 2
//    with x = 4 is 14, and the class already knows × comes before +. What they
//    do not know is that substituting does not switch that rule off. Slides
//    12–13 are the same again with a negative — the arithmetic is 5 + 6, and
//    the only difficulty is whether the minus sign travelled into the bracket.
//
// Ask-before-you-tell is used twice — slides 6 and 12 — and neither has an
// answer anywhere on it. Both are deliberately built as a disagreement between
// two answers, because a show of hands split down the middle buys more
// attention than a correct answer handed over.
//
// Source: Workbook Unit 2, Section 2.2. Every number used in class is original;
// the exercise is the homework and should not be spent in advance. The boiling
// water on slide 15 is the bridge to Science 2.2 (changes of state), which this
// class had yesterday.
import { DIAGRAMS } from './diagrams.js'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'
const RED = '#c8102e'

export const slides = [
  // ── Section 1: the row that would not finish, finishes ────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Sigma',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 2 · 2.2',
    eyebrowVn: 'Chương 2 · 2.2',
    eyebrowFr: 'Unité 2 · 2.2',
    date: '10 Sept 2026',
    title: 'Using Expressions and Formulae',
    titleVn: 'Sử dụng biểu thức và công thức',
    titleFr: 'Expressions et formules',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      badgeFr: 'Pour commencer',
      text: 'Last lesson a cup held **c ml**, Mr Bowen drank 50 ml, and I told you to stop at **c − 50**.\n\nToday I am telling you: **c = 320**. On your whiteboard, write how much is left. You have 30 seconds.',
      textVn: 'Tiết trước, một cốc chứa **c ml**, thầy Bowen uống 50 ml, và thầy bảo em dừng lại ở **c − 50**.\n\nHôm nay thầy nói cho em biết: **c = 320**. Hãy viết lên bảng con: còn lại bao nhiêu? Em có 30 giây.',
      textFr: 'Au dernier cours, une tasse avait **c ml**, M. Bowen a bu 50 ml, et on s’est arrêté à **c − 50**.\n\nAujourd’hui, **c = 320**. Sur ton ardoise, écris ce qui reste. Tu as 30 secondes.',
    },
  },
  {
    // The payoff to 2.1's wall. Everybody gets this right, and that is the
    // point — the lesson opens with the class succeeding at the thing they
    // were told last week they were not allowed to do.
    layout: 'split',
    accent: TEAL,
    icon: 'Coffee',
    side: 'left',
    eyebrow: 'Maths 2.1 — the cup we had to leave alone',
    eyebrowVn: 'Toán 2.1 — cái cốc mà ta đành để nguyên',
    eyebrowFr: 'Maths 2.1 — la tasse qu’on a dû laisser',
    title: 'The Row Finishes',
    titleVn: 'Dòng tính đã hoàn thành',
    titleFr: 'La ligne se termine',
    ratio: 50,
    inlineSvg: DIAGRAMS.CUP_FINISHES,
    content:
      'Last lesson **c − 50** was the finished answer, and stopping there was correct.\n\n' +
      'Nothing about that has changed. The only new thing is that somebody has now **told us what c is**.\n\n' +
      'So today the row goes one step further, and lands on a number: **270**.',
    contentVn:
      'Tiết trước, **c − 50** chính là đáp án hoàn chỉnh, và dừng ở đó là đúng.\n\n' +
      'Điều đó vẫn không thay đổi. Chỉ có một điều mới: bây giờ đã có người **cho ta biết c bằng bao nhiêu**.\n\n' +
      'Vậy nên hôm nay dòng tính đi thêm được một bước nữa, và ra một con số: **270**.',
    contentFr:
      'La dernière fois, **c − 50** était la réponse finale, et s’arrêter là était juste.\n\n' +
      'Ça n’a pas changé. La seule nouveauté : quelqu’un nous a enfin **dit ce que vaut c**.\n\n' +
      'Alors aujourd’hui, la ligne va une étape plus loin et donne un nombre : **270**.',
  },
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Repeat',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khoá',
    eyebrowFr: 'Mots clés',
    title: 'Substitute',
    titleVn: 'Thay số',
    titleFr: 'Remplacer',
    ratio: 50,
    inlineSvg: DIAGRAMS.SUBSTITUTE_SWAP,
    content:
      'In football, a **substitute** comes on and another player goes off. The position on the pitch does not change — only who is standing in it.\n\n' +
      'A letter works the same way.',
    contentVn:
      'Trong bóng đá, một cầu thủ **dự bị (substitute)** vào sân và một cầu thủ khác rời sân. Vị trí trên sân không đổi — chỉ đổi người đứng ở đó.\n\n' +
      'Chữ cái trong đại số cũng hoạt động đúng như vậy.',
    contentFr:
      'Au football, un **remplaçant (substitute)** entre et un autre joueur sort. Le poste sur le terrain ne change pas — seulement le joueur.\n\n' +
      'Une lettre marche pareil.',
    notes: [
      {
        tone: 'write',
        text:
          '**Substitute:** put a number in place of a letter.\n' +
          '**Value:** the number you get after substituting. When $n = 4$, the value of $3n + 2$ is 14.',
        textVn:
          '**Substitute (thay số):** đặt một con số vào chỗ của chữ cái.\n' +
          '**Value (giá trị):** con số em thu được sau khi thay. Khi $n = 4$, giá trị của $3n + 2$ là 14.',
        textFr:
          '**Substitute (remplacer) :** mettre un nombre à la place d’une lettre.\n' +
          '**Value (valeur) :** le nombre obtenu après le remplacement. Quand $n = 4$, la valeur de $3n + 2$ est 14.',
      },
    ],
  },

  // ── Section 2: the bill for last lesson's shorthand ───────────────────────
  {
    // THE WALL. 2.1 taught them to drop the times sign; this is what that costs
    // if nobody says it out loud. Say "3n is never 34" more than once.
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    side: 'left',
    eyebrow: 'This one costs the most marks every year',
    eyebrowVn: 'Chỗ này năm nào cũng mất điểm nhiều nhất',
    eyebrowFr: 'Celle-ci coûte le plus de points chaque année',
    title: 'The Times Sign Did Not Leave',
    titleVn: 'Dấu nhân vẫn còn đó',
    titleFr: 'Le signe × est toujours là',
    ratio: 50,
    inlineSvg: DIAGRAMS.INVISIBLE_TIMES,
    content:
      'Last lesson we stopped writing the **×**. We did not stop **doing** it.\n\n' +
      'So when you substitute, put the **×** back in first. Write $3 × 4$, and only then work it out.',
    contentVn:
      'Tiết trước ta ngừng **viết** dấu **×**. Nhưng ta không hề ngừng **thực hiện** phép nhân đó.\n\n' +
      'Vậy nên khi thay số, hãy **viết lại dấu ×** trước đã. Viết $3 × 4$, rồi mới tính.',
    contentFr:
      'La dernière fois, on a arrêté d’**écrire** le **×**. On n’a pas arrêté de le **faire**.\n\n' +
      'Alors quand tu remplaces, remets d’abord le **×**. Écris $3 × 4$, et seulement ensuite calcule.',
    notes: [
      {
        tone: 'write',
        text:
          '$3n$ means $3 × n$. When $n = 4$, $3n = 3 × 4 = 12$.\n' +
          '**It is never 34.** Never push the two digits together.',
        textVn:
          '$3n$ nghĩa là $3 × n$. Khi $n = 4$ thì $3n = 3 × 4 = 12$.\n' +
          '**Không bao giờ bằng 34.** Đừng bao giờ ghép hai chữ số lại với nhau.',
        textFr:
          '$3n$ veut dire $3 × n$. Quand $n = 4$, $3n = 3 × 4 = 12$.\n' +
          '**Ce n’est jamais 34.** Ne colle jamais les deux chiffres.',
      },
    ],
  },
  {
    layout: 'split',
    accent: GREEN,
    icon: 'ListChecks',
    eyebrow: 'Quick fire — thirty seconds each',
    eyebrowVn: 'Nhanh — mỗi câu ba mươi giây',
    eyebrowFr: 'Rapide — trente secondes chacune',
    title: 'Four to Substitute',
    titleVn: 'Bốn câu để thay số',
    titleFr: 'Quatre remplacements',
    ratio: 50,
    content:
      'In every one of these, **n = 5**. Work out the value.\n\n' +
      '**a** $n + 7$\n' +
      '**b** $4n$\n' +
      '**c** $n − 9$\n' +
      '**d** $\\frac{n}{5}$',
    contentVn:
      'Trong tất cả các câu sau, **n = 5**. Hãy tính giá trị.\n\n' +
      '**a** $n + 7$\n' +
      '**b** $4n$\n' +
      '**c** $n − 9$\n' +
      '**d** $\\frac{n}{5}$',
    contentFr:
      'Dans chacune, **n = 5**. Calcule la valeur.\n\n' +
      '**a** $n + 7$\n' +
      '**b** $4n$\n' +
      '**c** $n − 9$\n' +
      '**d** $\\frac{n}{5}$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer:
        '**a** 12  **b** 20  **c** −4  **d** 1\n\n' +
        'Part **b** is $4 × 5$, not 45. Part **c** goes below zero, and that is allowed — you did this in Unit 1.',
      answerVn:
        '**a** 12  **b** 20  **c** −4  **d** 1\n\n' +
        'Câu **b** là $4 × 5$, không phải 45. Câu **c** xuống dưới 0, và điều đó hoàn toàn được — em đã học ở Chương 1.',
      answerFr:
        '**a** 12  **b** 20  **c** −4  **d** 1\n\n' +
        'La **b**, c’est $4 × 5$, pas 45. La **c** passe sous zéro, et c’est permis — tu l’as vu dans l’unité 1.',
    },
  },

  // ── Section 3: the order does not switch off ──────────────────────────────
  {
    // QUESTION ONLY. Neither answer is marked. Take a show of hands and write
    // the split on the board before slide 7 settles it.
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowVn: 'Biểu quyết bằng một tay',
    eyebrowFr: 'Vote avec une main',
    title: 'Which Answer, and Why?',
    titleVn: 'Đáp án nào đúng, và vì sao?',
    titleFr: 'Quelle réponse, et pourquoi ?',
    text: 'Work out $3x + 2$ when $x = 4$',
    textVn: 'Tính $3x + 2$ khi $x = 4$',
    textFr: 'Calcule $3x + 2$ quand $x = 4$',
    columns: [
      {
        heading: 'A · left hand up',
        headingVn: 'A · giơ tay trái',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_14,
      },
      {
        heading: 'B · right hand up',
        headingVn: 'B · giơ tay phải',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_18,
      },
    ],
  },
  {
    layout: 'split',
    accent: RED,
    icon: 'ArrowDownUp',
    side: 'left',
    eyebrow: 'The rule you already know, still switched on',
    eyebrowVn: 'Quy tắc em đã biết, vẫn còn hiệu lực',
    eyebrowFr: 'La règle que tu connais, toujours valable',
    title: 'Multiply Before You Add',
    titleVn: 'Nhân trước, cộng sau',
    titleFr: 'Multiplie avant d’additionner',
    ratio: 50,
    inlineSvg: DIAGRAMS.ORDER_AFTER_SUB,
    content:
      '**14 is right.** 18 comes from reading left to right and adding first.\n\n' +
      'Substituting a number does not change the order of operations. It never did in arithmetic, and it does not here.',
    contentVn:
      '**14 mới đúng.** 18 là do đọc từ trái sang phải rồi cộng trước.\n\n' +
      'Việc thay số vào không làm thay đổi thứ tự phép tính. Trong số học đã vậy, ở đây cũng vậy.',
    contentFr:
      '**14 est juste.** 18 vient d’une lecture de gauche à droite, en additionnant d’abord.\n\n' +
      'Remplacer par un nombre ne change pas la priorité des opérations. En calcul, jamais ; ici non plus.',
    notes: [
      {
        tone: 'write',
        text:
          '**Order of operations:** do **× and ÷ first**, then + and −.\n' +
          'When $x = 4$: $3x + 2 = 3 × 4 + 2 = 12 + 2 = 14$.',
        textVn:
          '**Thứ tự phép tính:** làm **nhân và chia trước**, rồi mới cộng và trừ.\n' +
          'Khi $x = 4$: $3x + 2 = 3 × 4 + 2 = 12 + 2 = 14$.',
        textFr:
          '**Priorité des opérations :** fais **× et ÷ d’abord**, puis + et −.\n' +
          'Quand $x = 4$ : $3x + 2 = 3 × 4 + 2 = 12 + 2 = 14$.',
      },
    ],
  },
  {
    layout: 'split',
    accent: GREEN,
    icon: 'ListChecks',
    eyebrow: 'Three to try — write the middle line every time',
    eyebrowVn: 'Ba câu để thử — luôn viết dòng trung gian',
    eyebrowFr: 'Trois à essayer — écris toujours la ligne du milieu',
    title: 'Your Turn',
    titleVn: 'Đến lượt em',
    titleFr: 'À toi',
    ratio: 50,
    content:
      'Work out the value of each expression.\n\n' +
      '**a** $5n − 3$ when $n = 4$\n' +
      '**b** $20 − 3n$ when $n = 6$\n' +
      '**c** $\\frac{n}{2} + 8$ when $n = 10$',
    contentVn:
      'Hãy tính giá trị của mỗi biểu thức sau.\n\n' +
      '**a** $5n − 3$ khi $n = 4$\n' +
      '**b** $20 − 3n$ khi $n = 6$\n' +
      '**c** $\\frac{n}{2} + 8$ khi $n = 10$',
    contentFr:
      'Calcule la valeur de chaque expression.\n\n' +
      '**a** $5n − 3$ quand $n = 4$\n' +
      '**b** $20 − 3n$ quand $n = 6$\n' +
      '**c** $\\frac{n}{2} + 8$ quand $n = 10$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer:
        '**a** $20 − 3 = 17$  **b** $20 − 18 = 2$  **c** $5 + 8 = 13$\n\n' +
        'In **b** the multiplication happens first even though it is written second. $20 − 3n$ is not $17n$.',
      answerVn:
        '**a** $20 − 3 = 17$  **b** $20 − 18 = 2$  **c** $5 + 8 = 13$\n\n' +
        'Ở câu **b**, phép nhân vẫn làm trước dù nó được viết sau. $20 − 3n$ không phải là $17n$.',
      answerFr:
        '**a** $20 − 3 = 17$  **b** $20 − 18 = 2$  **c** $5 + 8 = 13$\n\n' +
        'En **b**, la multiplication se fait d’abord, même si elle est écrite après. $20 − 3n$ n’est pas $17n$.',
    },
  },

  // ── Section 4: the second key word, and the = sign ────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Equal',
    side: 'left',
    eyebrow: 'Key word — and the opposite of last lesson’s',
    eyebrowVn: 'Từ khoá — và là cái ngược lại với tiết trước',
    eyebrowFr: 'Mot clé — le contraire de celui de la dernière fois',
    title: 'Formula',
    titleVn: 'Công thức',
    titleFr: 'Formule',
    ratio: 50,
    inlineSvg: DIAGRAMS.EXPRESSION_FORMULA,
    content:
      'Last lesson you learned that an **expression** has **no = sign**.\n\n' +
      'A **formula** is the one that does. It is a rule: tell it n, and it tells you C.',
    contentVn:
      'Tiết trước em đã học rằng **biểu thức (expression)** thì **không có dấu =**.\n\n' +
      '**Công thức (formula)** thì có. Nó là một quy tắc: cho nó biết n, nó cho em biết C.',
    contentFr:
      'La dernière fois, tu as appris qu’une **expression** n’a **pas de signe =**.\n\n' +
      'Une **formule (formula)**, elle, en a un. C’est une règle : donne-lui n, elle te donne C.',
    notes: [
      {
        tone: 'write',
        text:
          '**Formula:** a rule that connects two or more quantities, written with letters, and it **has an = sign**.\n' +
          'For example $C = 3n + 2$, $A = lw$. More than one formula: **formulae**.',
        textVn:
          '**Công thức (formula):** một quy tắc liên hệ hai đại lượng trở lên, viết bằng chữ cái, và **có dấu =**.\n' +
          'Ví dụ $C = 3n + 2$, $A = lw$. Số nhiều của formula là **formulae**.',
        textFr:
          '**Formula (formule) :** une règle qui relie deux quantités ou plus, écrite avec des lettres, et qui **a un signe =**.\n' +
          'Par exemple $C = 3n + 2$, $A = lw$. Le pluriel de formula est **formulae**.',
      },
    ],
  },
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Square',
    eyebrow: 'A formula you have used since primary school',
    eyebrowVn: 'Một công thức em đã dùng từ hồi tiểu học',
    eyebrowFr: 'Une formule que tu utilises depuis l’école primaire',
    title: 'Two Letters, So Substitute Twice',
    titleVn: 'Hai chữ cái, nên phải thay hai lần',
    titleFr: 'Deux lettres, donc deux remplacements',
    ratio: 50,
    inlineSvg: DIAGRAMS.RECTANGLE_FORMULA,
    content:
      'The area of a rectangle is its length times its width. Written as a formula, that is **A = lw**.\n\n' +
      'Remember what $lw$ means: $l × w$. The times sign is still missing, and still there.',
    contentVn:
      'Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng. Viết thành công thức là **A = lw**.\n\n' +
      'Nhớ lại $lw$ nghĩa là gì: $l × w$. Dấu nhân vẫn bị lược đi, và vẫn đang ở đó.',
    contentFr:
      'L’aire d’un rectangle, c’est sa longueur fois sa largeur. En formule : **A = lw**.\n\n' +
      'Rappelle-toi ce que veut dire $lw$ : $l × w$. Le signe × est toujours caché, et toujours là.',
    notes: [
      {
        tone: 'write',
        text:
          'When a formula has **two letters**, substitute **both** before you work anything out.\n' +
          '$A = lw$, with $l = 7$ and $w = 4$: $A = 7 × 4 = 28$.',
        textVn:
          'Khi công thức có **hai chữ cái**, hãy thay **cả hai** rồi mới tính.\n' +
          '$A = lw$, với $l = 7$ và $w = 4$: $A = 7 × 4 = 28$.',
        textFr:
          'Quand une formule a **deux lettres**, remplace les **deux** avant de calculer.\n' +
          '$A = lw$, avec $l = 7$ et $w = 4$ : $A = 7 × 4 = 28$.',
      },
    ],
  },
  {
    layout: 'split',
    accent: GREEN,
    icon: 'ListChecks',
    side: 'left',
    eyebrow: 'Two formulae, four substitutions',
    eyebrowVn: 'Hai công thức, bốn lần thay số',
    eyebrowFr: 'Deux formules, quatre remplacements',
    title: 'Use the Formula',
    titleVn: 'Hãy dùng công thức',
    titleFr: 'Utilise la formule',
    ratio: 50,
    content:
      'The perimeter of a rectangle is **P = 2l + 2w**.\n\n' +
      '**a** Find P when $l = 9$ and $w = 5$.\n' +
      '**b** Find P when $l = 12$ and $w = 3$.\n\n' +
      'A different formula: **T = 5a − b**.\n\n' +
      '**c** Find T when $a = 4$ and $b = 6$.',
    contentVn:
      'Chu vi hình chữ nhật là **P = 2l + 2w**.\n\n' +
      '**a** Tìm P khi $l = 9$ và $w = 5$.\n' +
      '**b** Tìm P khi $l = 12$ và $w = 3$.\n\n' +
      'Một công thức khác: **T = 5a − b**.\n\n' +
      '**c** Tìm T khi $a = 4$ và $b = 6$.',
    contentFr:
      'Le périmètre d’un rectangle est **P = 2l + 2w**.\n\n' +
      '**a** Trouve P quand $l = 9$ et $w = 5$.\n' +
      '**b** Trouve P quand $l = 12$ et $w = 3$.\n\n' +
      'Une autre formule : **T = 5a − b**.\n\n' +
      '**c** Trouve T quand $a = 4$ et $b = 6$.',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer:
        '**a** $18 + 10 = 28$  **b** $24 + 6 = 30$  **c** $20 − 6 = 14$\n\n' +
        'Both multiplications happen before the + or the −, every time.',
      answerVn:
        '**a** $18 + 10 = 28$  **b** $24 + 6 = 30$  **c** $20 − 6 = 14$\n\n' +
        'Lần nào cũng vậy: cả hai phép nhân đều làm trước dấu + hoặc dấu −.',
      answerFr:
        '**a** $18 + 10 = 28$  **b** $24 + 6 = 30$  **c** $20 − 6 = 14$\n\n' +
        'Les deux multiplications se font avant le + ou le −, à chaque fois.',
    },
  },

  // ── Section 5: the minus sign has to travel with the number ───────────────
  {
    // QUESTION ONLY. No answer on this slide. The two candidates are the two
    // things the class will actually write, so let them argue.
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowVn: 'Biểu quyết bằng một tay',
    eyebrowFr: 'Vote avec une main',
    title: 'One of These Is Wrong',
    titleVn: 'Một trong hai cái này là sai',
    titleFr: 'L’une des deux est fausse',
    text: 'Work out $5 − 2n$ when $n = −3$',
    textVn: 'Tính $5 − 2n$ khi $n = −3$',
    textFr: 'Calcule $5 − 2n$ quand $n = −3$',
    columns: [
      {
        heading: 'A · left hand up',
        headingVn: 'A · giơ tay trái',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_NEG1,
      },
      {
        heading: 'B · right hand up',
        headingVn: 'B · giơ tay phải',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_11,
      },
    ],
  },
  {
    layout: 'split',
    accent: RED,
    icon: 'Minus',
    eyebrow: 'Unit 1 comes back, inside Unit 2',
    eyebrowVn: 'Chương 1 quay lại, nằm trong Chương 2',
    eyebrowFr: 'L’unité 1 revient, dans l’unité 2',
    title: 'The Minus Sign Travels With It',
    titleVn: 'Dấu trừ đi theo con số',
    titleFr: 'Le signe moins voyage avec le nombre',
    ratio: 50,
    inlineSvg: DIAGRAMS.NEGATIVE_SUB,
    content:
      '**11 is right.** −1 comes from substituting 3 and leaving the minus sign behind.\n\n' +
      'The arithmetic here is $5 + 6$. Nobody in this room finds that hard. The only difficulty is getting the sign into the expression in one piece.',
    contentVn:
      '**11 mới đúng.** −1 là do chỉ thay số 3 vào mà bỏ quên dấu trừ.\n\n' +
      'Phép tính ở đây là $5 + 6$. Không bạn nào trong lớp thấy khó cả. Cái khó duy nhất là đưa được dấu trừ vào biểu thức cùng với con số.',
    contentFr:
      '**11 est juste.** −1 vient de remplacer par 3 en oubliant le signe moins.\n\n' +
      'Le calcul ici, c’est $5 + 6$. Personne ici ne trouve ça dur. La seule difficulté : faire entrer le signe dans l’expression avec le nombre.',
    notes: [
      {
        tone: 'write',
        text:
          '**Put a negative number in brackets when you substitute it.**\n' +
          'If $n = −3$ then $2n = 2 × (−3) = −6$, so $5 − 2n = 5 − (−6) = 5 + 6 = 11$.',
        textVn:
          '**Khi thay một số âm, hãy đặt nó trong dấu ngoặc.**\n' +
          'Nếu $n = −3$ thì $2n = 2 × (−3) = −6$, nên $5 − 2n = 5 − (−6) = 5 + 6 = 11$.',
        textFr:
          '**Mets un nombre négatif entre parenthèses quand tu le remplaces.**\n' +
          'Si $n = −3$ alors $2n = 2 × (−3) = −6$, donc $5 − 2n = 5 − (−6) = 5 + 6 = 11$.',
      },
    ],
  },

  // ── Section 6: build your own formula, then find where it stops ───────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'PenTool',
    side: 'left',
    eyebrow: 'Write the formula first',
    eyebrowVn: 'Viết công thức trước',
    eyebrowFr: 'Écris d’abord la formule',
    title: 'Write It, Then Use It',
    titleVn: 'Viết ra, rồi dùng nó',
    titleFr: 'Écris-la, puis utilise-la',
    ratio: 50,
    content:
      'A taxi charges **15 thousand dong** to start, and then **9 thousand dong for every kilometre**.\n\n' +
      '**a** Write a formula for the cost **C** of a journey of **k** kilometres.\n' +
      '**b** Use your formula to find the cost of a journey of 6 kilometres.',
    contentVn:
      'Một chuyến taxi tính **15 nghìn đồng** tiền mở cửa, sau đó **9 nghìn đồng mỗi ki-lô-mét**.\n\n' +
      '**a** Hãy viết công thức tính chi phí **C** cho một chuyến đi dài **k** ki-lô-mét.\n' +
      '**b** Dùng công thức của em để tính chi phí của chuyến đi 6 ki-lô-mét.',
    contentFr:
      'Un taxi coûte **15 mille dongs** au départ, puis **9 mille dongs par kilomètre**.\n\n' +
      '**a** Écris une formule pour le prix **C** d’un trajet de **k** kilomètres.\n' +
      '**b** Utilise ta formule pour trouver le prix d’un trajet de 6 kilomètres.',
    notes: [
      {
        tone: 'write',
        text:
          'When you write a formula, **say what every letter represents**.\n' +
          'C is the cost in thousand dong · k is the number of kilometres.',
        textVn:
          'Khi viết một công thức, hãy **nói rõ mỗi chữ cái đại diện cho cái gì**.\n' +
          'C là chi phí tính bằng nghìn đồng · k là số ki-lô-mét.',
        textFr:
          'Quand tu écris une formule, **dis ce que représente chaque lettre**.\n' +
          'C est le prix en milliers de dongs · k est le nombre de kilomètres.',
      },
    ],
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer:
        '**a** $C = 15 + 9k$: 15 is paid once, 9 every kilometre.\n' +
        '**b** $C = 15 + 9 × 6 = 69$ thousand dong',
      answerVn:
        '**a** $C = 15 + 9k$: 15 trả một lần, 9 trả mỗi ki-lô-mét.\n' +
        '**b** $C = 15 + 9 × 6 = 69$ nghìn đồng',
      answerFr:
        '**a** $C = 15 + 9k$ : 15 payé une fois, 9 à chaque kilomètre.\n' +
        '**b** $C = 15 + 9 × 6 = 69$ mille dongs',
    },
  },
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Thermometer',
    eyebrow: 'From yesterday’s Science',
    eyebrowVn: 'Từ tiết Khoa học hôm qua',
    eyebrowFr: 'Tiré des sciences d’hier',
    title: 'The Water That Would Not Get Hotter',
    titleVn: 'Nước không thể nóng hơn được nữa',
    titleFr: 'L’eau qui ne chauffait plus',
    ratio: 50,
    inlineSvg: DIAGRAMS.BOILING_LIMIT,
    content:
      'Mr Bowen heats water. It starts at 24 °C and rises 3 °C every minute, so **T = 24 + 3m**.\n\n' +
      '**a** Find T after 12 minutes.\n' +
      '**b** Find T after 25 minutes.\n' +
      '**c** The formula says T = 144 after 40 minutes. Is that possible?',
    contentVn:
      'Thầy Bowen đun nước. Nước bắt đầu ở 24 °C và tăng 3 °C mỗi phút, nên **T = 24 + 3m**.\n\n' +
      '**a** Tìm T sau 12 phút.\n' +
      '**b** Tìm T sau 25 phút.\n' +
      '**c** Công thức cho ra T = 144 sau 40 phút. Điều đó có thể xảy ra không?',
    contentFr:
      'M. Bowen chauffe de l’eau. Elle part de 24 °C et monte de 3 °C par minute, donc **T = 24 + 3m**.\n\n' +
      '**a** Trouve T après 12 minutes.\n' +
      '**b** Trouve T après 25 minutes.\n' +
      '**c** La formule donne T = 144 après 40 minutes. Est-ce possible ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer:
        '**a** $24 + 36 = 60$ °C, **b** $24 + 75 = 99$ °C\n' +
        '**c** **No.** Water stops getting hotter at 100 °C. A formula is only true while the situation is.',
      answerVn:
        '**a** $24 + 36 = 60$ °C, **b** $24 + 75 = 99$ °C\n' +
        '**c** **Không.** Nước không nóng hơn 100 °C. Công thức chỉ đúng khi tình huống còn đúng.',
      answerFr:
        '**a** $24 + 36 = 60$ °C, **b** $24 + 75 = 99$ °C\n' +
        '**c** **Non.** L’eau ne dépasse pas 100 °C. Une formule n’est vraie que tant que la situation l’est.',
    },
  },

  // ── Section 7: recap and homework ─────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you leave',
    eyebrowVn: 'Trước khi ra về',
    eyebrowFr: 'Avant de partir',
    title: 'Can You Do All Six?',
    titleVn: 'Em làm được cả sáu điều này chứ?',
    titleFr: 'Sais-tu faire les six ?',
    content:
      '> Your notebook should now have **7 written panels**. Count them. If one is missing, copy it from your partner before you go.',
    contentVn:
      '> Trong vở của em bây giờ phải có **7 khung ghi chép**. Hãy đếm lại. Nếu thiếu khung nào, hãy chép của bạn bên cạnh trước khi ra về.',
    contentFr: '> Ton cahier doit maintenant avoir **7 encadrés recopiés**. Compte-les. S’il en manque un, recopie celui de ton voisin avant de partir.',
    items: [
      { text: '**Substitute** a number for a letter, and say what the **value** is.', textVn: '**Thay số (substitute)** vào chỗ chữ cái, và nói được **giá trị (value)** là bao nhiêu.', textFr: '**Remplacer (substitute)** une lettre par un nombre, et dire quelle est la **valeur (value)**.' },
      { text: 'Work out $3n$ when $n = 4$ and get **12**, never 34.', textVn: 'Tính $3n$ khi $n = 4$ và ra **12**, không bao giờ ra 34.', textFr: 'Calculer $3n$ quand $n = 4$ et trouver **12**, jamais 34.' },
      { text: 'Do the **× and ÷ before the + and −** after substituting.', textVn: 'Sau khi thay số, làm **nhân và chia trước cộng và trừ**.', textFr: 'Faire **× et ÷ avant + et −** après le remplacement.' },
      { text: 'Say what a **formula** is, and why it **has** an = sign.', textVn: 'Nói được **công thức** là gì, và vì sao nó **có** dấu =.', textFr: 'Dire ce qu’est une **formule**, et pourquoi elle **a** un signe =.' },
      { text: 'Substitute into a formula with **two letters**, such as $A = lw$.', textVn: 'Thay số vào công thức có **hai chữ cái**, ví dụ $A = lw$.', textFr: 'Remplacer dans une formule à **deux lettres**, comme $A = lw$.' },
      { text: 'Substitute a **negative** number in brackets: $2 × (−3) = −6$.', textVn: 'Thay một số **âm** trong dấu ngoặc: $2 × (−3) = −6$.', textFr: 'Remplacer par un nombre **négatif** entre parenthèses : $2 × (−3) = −6$.' },
    ],
  },
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
    content: 'Write the **middle line** in every question — the line where the letters have gone and the × signs are back. That line is where the marks are.',
    contentVn: 'Ở mỗi câu, hãy viết **dòng trung gian** — dòng mà chữ cái đã biến mất và dấu × đã quay lại. Điểm nằm ở dòng đó.',
    contentFr: 'Écris la **ligne du milieu** à chaque question — celle où les lettres ont disparu et où les × sont revenus. C’est là que sont les points.',
    notes: [
      {
        tone: 'homework',
        badge: 'Workbook 2.2',
        badgeVn: 'Vở bài tập 2.2',
        badgeFr: 'Cahier d’exercices 2.2',
        icon: 'Pencil',
        text:
          '**Focus** — everybody.\n' +
          '**Practice** — the formulae with two letters.\n' +
          '**Challenge** — an attempt beats a blank.\n\n' +
          'If an answer looks impossible, check the situation before you check the arithmetic.',
        textVn:
          '**Focus** — tất cả các em.\n' +
          '**Practice** — phần công thức có hai chữ cái.\n' +
          '**Challenge** — làm sai vẫn hơn bỏ trống.\n\n' +
          'Nếu một đáp án trông có vẻ vô lý, hãy kiểm tra lại tình huống trước khi kiểm tra phép tính.',
        textFr:
          '**Focus** — tout le monde.\n' +
          '**Practice** — les formules à deux lettres.\n' +
          '**Challenge** — un essai vaut mieux qu’une page blanche.\n\n' +
          'Si une réponse semble impossible, vérifie la situation avant de vérifier le calcul.',
      },
    ],
  },
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
    subtitle: 'Last lesson you were not allowed to finish. This lesson you were. Exit question: **$s = 4t + 1$. Work out s when $t = 6$.**',
    subtitleVn: 'Tiết trước em không được phép tính xong. Tiết này thì được. Câu hỏi ra về: **$s = 4t + 1$. Hãy tính s khi $t = 6$.**',
    subtitleFr: 'La dernière fois, tu n’avais pas le droit de finir. Aujourd’hui, si. Question de sortie : **$s = 4t + 1$. Calcule s quand $t = 6$.**',
  },
]

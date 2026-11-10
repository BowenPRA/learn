// content/y7-math/U02_1/slides.js
// Year 7 Mathematics · 2.1 Constructing Expressions. Monday 7 Sept 2026.
//
// Same house style as 1.1–1.6: teal section headers, purple activity boxes,
// red homework, and the book's orange for every key word students copy down.
// Anything they must write goes in an orange "Write This Down" panel or an
// orange `>` bumper — never plain body text.
//
// FOUR THINGS SHAPE THIS DECK.
//
// 1. IT IS BUILT ON THE SCIENCE UNIT. Science 2.1 (U02_1a, U02_1b) taught this
//    class that matter is made of PARTICLES, and left them holding a quantity
//    that is unarguably real and unarguably uncountable. That is the perfect
//    door into algebra, so the deck walks through it: the drop of water on
//    slide 2, salt dissolving on slide 9, beakers on slide 11, and the sealed
//    syringe from their own practical on slide 20. A letter is not a new kind
//    of object — it is the number they already met last week and could not
//    write down. Say "particle", "dissolve" and "compress" out loud; they are
//    words this class owns, and they carry the maths for free.
//
// 2. THE VOCABULARY IS THE WORKBOOK'S, NOT MINE. The definition on slide 5 is
//    Cambridge's own sentence, including the clause the Tip leaves out and the
//    2.2 intro supplies: "but has no = sign". The verb throughout is the book's
//    verb, REPRESENT — Q10 marks students on writing what their letters
//    represent, so the deck uses that word from slide 3 and never says
//    "stands for" instead. Total and difference (slide 11) are Q13's words,
//    used there without definition. The notation slide is the book's two Tips
//    ("2m means 2 × m", "w over 2 means w ÷ 2") promoted to a slide, because
//    Q11d and Q12d are unanswerable without them.
//
// 3. THE WALL IS SLIDE 4. Every year the sticking point is not "what does c
//    mean", it is that c − 50 does not equal anything, so students assume they
//    have failed and either invent a number or leave it blank. COFFEE_WALL
//    exists only to say: the last row does not go anywhere, and leaving it IS
//    the answer. If the class believes slide 4, the rest of Unit 2 is
//    bookkeeping.
//
// 4. THE ENGLISH IS THE MATHS. Slides 12–19 add no new arithmetic at all:
//    "h less than t" is written t − h with the words reversed; one preposition
//    turns 5x − 4 into 4 − 5x; and "subtract the result from 25" is 25 − 3n,
//    which needs the order of operations AND the flip at the same time. Those
//    are Exercise 2.1 Q7f, Q9 and Q11 — the questions this class loses on the
//    reading while doing the algebra correctly. Slide 19 runs the translation
//    BACKWARDS (expression to English), which is Q12 and which nothing else in
//    the deck rehearses.
//
// Ask-before-you-tell is used four times — slides 2, 8, 12 and 15 — and each is
// a question slide with NO answer anywhere on it. The guesses are the lesson.
//
// Source: Workbook Unit 2, Section 2.1, pages 20–23 (Exercise 2.1 is Q1–14:
// Focus 1–5, Practice 6–10, Challenge 11–14). Slide 16 is the picture of Q9 and
// slide 18 is the picture of Q7f, because those two questions ARE the section.
// Every other number in class is original — the exercise is the homework and
// should not be spent in advance.
import { DIAGRAMS } from './diagrams.js'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'
const RED = '#c8102e'

export const slides = [
  // ── Section 1: a real number nobody can count ─────────────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Sigma',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 2 · 2.1',
    eyebrowVn: 'Chương 2 · 2.1',
    eyebrowFr: 'Unité 2 · 2.1',
    date: '7 Sept 2026',
    title: 'Constructing Expressions',
    titleVn: 'Xây dựng biểu thức',
    titleFr: 'Construire des expressions',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      badgeFr: 'Pour commencer',
      text: 'In **Science** you learned that everything is made of **particles**. On your whiteboard, write how many particles are in one drop of water. You have 30 seconds.',
      textVn: 'Trong giờ **Khoa học**, em đã học rằng mọi vật đều được tạo nên từ các **hạt (particles)**. Hãy viết lên bảng con: một giọt nước có bao nhiêu hạt? Em có 30 giây.',
      textFr: 'En **sciences**, tu as appris que tout est fait de **particules (particles)**. Sur ton ardoise, écris combien de particules il y a dans une goutte d’eau. Tu as 30 secondes.',
    },
  },
  {
    // The hook, and the bridge from Science 2.1. QUESTION ONLY. Nobody can
    // answer, and being stuck there is the point — the letter arrives on the
    // next slide as the way out, not as a new rule to learn.
    layout: 'split',
    accent: TEAL,
    icon: 'Droplet',
    side: 'left',
    eyebrow: 'Science 2.1 — particle theory',
    eyebrowVn: 'Khoa học 2.1 — thuyết hạt',
    eyebrowFr: 'Sciences 2.1 — théorie particulaire',
    title: 'Count Them',
    titleVn: 'Hãy đếm chúng',
    titleFr: 'Compte-les',
    ratio: 50,
    inlineSvg: DIAGRAMS.PARTICLE_DROP,
    content:
      'Nobody wrote a number. That is not because you are bad at Science.\n\n' +
      'The particles are **really there**, and there is a **real number** of them.\n\n' +
      '**So how do we write about a number nobody can count?**',
    contentVn:
      'Không ai viết ra được con số nào. Đó không phải vì em học Khoa học kém.\n\n' +
      'Các hạt **thật sự có ở đó**, và số lượng của chúng là một **con số có thật**.\n\n' +
      '**Vậy làm sao để viết về một con số mà không ai đếm được?**',
    contentFr:
      'Personne n’a écrit de nombre. Ce n’est pas parce que tu es mauvais en sciences.\n\n' +
      'Les particules sont **vraiment là**, et il y en a un **vrai nombre**.\n\n' +
      '**Alors comment écrire un nombre que personne ne peut compter ?**',
  },
  {
    layout: 'statement',
    accent: ORANGE,
    eyebrow: 'The way out',
    eyebrowVn: 'Lối ra',
    eyebrowFr: 'La solution',
    title: 'Give It a Letter',
    titleVn: 'Hãy đặt cho nó một chữ cái',
    titleFr: 'Donne-lui une lettre',
    label: 'Key idea',
    labelVn: 'Ý chính',
    labelFr: 'Idée clé',
    labelIcon: 'Sparkles',
    text: '**n**',
    textVn: '**n**',
    textFr: '**n**',
    sub: 'We cannot count them, so we let **n** be that number.',
    subVn: 'Ta không đếm được, nên cho **n** là con số đó.',
    subFr: 'On ne peut pas les compter, alors **n** est ce nombre.',
    notes: [
      {
        tone: 'write',
        text:
          '**Represent:** in algebra we choose a letter to **represent** a number we do not know.\n' +
          'n represents **the number of particles**, not a particle.',
        textVn:
          '**Represent (đại diện cho):** trong đại số, ta chọn một chữ cái để **đại diện cho** một số mà ta chưa biết.\n' +
          'n đại diện cho **số lượng hạt**, không phải một cái hạt.',
        textFr:
          '**Represent (représenter) :** en algèbre, on choisit une lettre pour **représenter** un nombre inconnu.\n' +
          'n représente **le nombre de particules**, pas une particule.',
      },
    ],
  },
  {
    // THE WALL. Rows one and two finish; row three does not, and the class must
    // hear out loud that this is allowed before the word "expression" is worth
    // anything to them.
    layout: 'split',
    accent: PURPLE,
    icon: 'Coffee',
    eyebrow: 'Three cups, one rule',
    eyebrowVn: 'Ba cốc, một quy tắc',
    eyebrowFr: 'Trois tasses, une règle',
    title: 'The Row That Will Not Finish',
    titleVn: 'Dòng không thể tính xong',
    titleFr: 'La ligne qui ne finit pas',
    ratio: 50,
    inlineSvg: DIAGRAMS.COFFEE_WALL,
    content:
      'The first two rows finish neatly: **150** and **250**.\n\n' +
      'The last row will not. There is no number to write, because nobody has told us **c**.\n\n' +
      'So we stop, and we leave it as **c − 50**. That is not giving up — that is the answer.',
    contentVn:
      'Hai dòng đầu tính xong gọn gàng: **150** và **250**.\n\n' +
      'Dòng cuối thì không. Không có con số nào để viết, vì chưa ai cho ta biết **c**.\n\n' +
      'Vậy nên ta dừng lại và để nguyên **c − 50**. Đó không phải là bỏ cuộc — đó chính là đáp án.',
    contentFr:
      'Les deux premières lignes se terminent bien : **150** et **250**.\n\n' +
      'La dernière, non. Il n’y a pas de nombre à écrire, car personne ne nous a donné **c**.\n\n' +
      'Alors on s’arrête et on laisse **c − 50**. Ce n’est pas abandonner — c’est la réponse.',
  },
  {
    layout: 'statement',
    accent: TEAL,
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    eyebrowFr: 'Mot clé',
    title: 'Expression',
    titleVn: 'Biểu thức',
    titleFr: 'Expression',
    label: 'Copy this',
    labelVn: 'Chép lại',
    labelFr: 'À recopier',
    labelIcon: 'Pencil',
    text: 'c − 50',
    textVn: 'c − 50',
    textFr: 'c − 50',
    sub: 'What you are left with has a name.',
    subVn: 'Thứ còn lại đó có một cái tên.',
    subFr: 'Ce qui reste a un nom.',
    notes: [
      {
        tone: 'write',
        text:
          '**Expression:** a statement that contains letters and sometimes numbers, but has **no = sign**.\n' +
          'For example $n + 7$, $4m$, $x + 2$, $c − 50$.',
        textVn:
          '**Biểu thức (expression):** một mệnh đề chứa chữ cái và đôi khi có cả số, nhưng **không có dấu =**.\n' +
          'Ví dụ $n + 7$, $4m$, $x + 2$, $c − 50$.',
        textFr:
          '**Expression :** une écriture avec des lettres et parfois des nombres, mais **sans signe =**.\n' +
          'Par exemple $n + 7$, $4m$, $x + 2$, $c − 50$.',
      },
    ],
  },
  {
    layout: 'split',
    accent: GREEN,
    icon: 'ListChecks',
    side: 'left',
    eyebrow: 'Check you have it',
    eyebrowVn: 'Kiểm tra xem em đã hiểu chưa',
    eyebrowFr: 'Vérifie que tu as compris',
    title: 'Which Are Expressions?',
    titleVn: 'Cái nào là biểu thức?',
    titleFr: 'Lesquelles sont des expressions ?',
    ratio: 50,
    content:
      'Three of these five are expressions. Which three?\n\n' +
      '**A** $4m$      **B** $7 + 2 = 9$      **C** $x + 2$\n' +
      '**D** $n − 3$      **E** $y = 5x$',
    contentVn:
      'Ba trong năm cái này là biểu thức. Ba cái nào?\n\n' +
      '**A** $4m$      **B** $7 + 2 = 9$      **C** $x + 2$\n' +
      '**D** $n − 3$      **E** $y = 5x$',
    contentFr:
      'Trois de ces cinq sont des expressions. Lesquelles ?\n\n' +
      '**A** $4m$      **B** $7 + 2 = 9$      **C** $x + 2$\n' +
      '**D** $n − 3$      **E** $y = 5x$',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer:
        '**A, C and D.**\n\n' +
        'B and E both have an **= sign**, so neither is an expression. B has no letter either.',
      answerVn:
        '**A, C và D.**\n\n' +
        'B và E đều có **dấu =**, nên cả hai đều không phải biểu thức. B cũng không có chữ cái nào.',
      answerFr:
        '**A, C et D.**\n\n' +
        'B et E ont un **signe =**, donc ce ne sont pas des expressions. B n’a pas de lettre non plus.',
    },
  },

  // ── Section 2: how algebra writes it down ─────────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'PenTool',
    eyebrow: 'The book assumes this from page 21 onwards',
    eyebrowVn: 'Sách mặc định em biết điều này từ trang 21',
    eyebrowFr: 'Le livre le suppose dès la page 21',
    title: 'The Short Way of Writing It',
    titleVn: 'Cách viết ngắn gọn',
    titleFr: 'L’écriture courte',
    ratio: 50,
    inlineSvg: DIAGRAMS.NOTATION,
    content: 'Algebra drops the multiplication sign — and only the multiplication sign.',
    contentVn: 'Đại số lược bỏ dấu nhân — và chỉ lược bỏ dấu nhân mà thôi.',
    contentFr: 'L’algèbre enlève le signe de multiplication — et seulement celui-là.',
    notes: [
      {
        tone: 'write',
        text:
          '$3s$ means $3 × s$ · $ab$ means $a × b$ · $\\frac{s}{2}$ means $s ÷ 2$\n' +
          'The number is written **in front** of the letter: $3s$, never $s3$.',
        textVn:
          '$3s$ nghĩa là $3 × s$ · $ab$ nghĩa là $a × b$ · $\\frac{s}{2}$ nghĩa là $s ÷ 2$\n' +
          'Số được viết **đứng trước** chữ cái: $3s$, không bao giờ viết $s3$.',
        textFr:
          '$3s$ veut dire $3 × s$ · $ab$ veut dire $a × b$ · $\\frac{s}{2}$ veut dire $s ÷ 2$\n' +
          'Le nombre s’écrit **devant** la lettre : $3s$, jamais $s3$.',
      },
    ],
    reveal: {
      label: 'Try four',
      labelVn: 'Thử bốn câu',
      labelFr: 'Essaie-en quatre',
      answer:
        'Write the short way: **a** $7 × k$  **b** $m × n$  **c** $4 × a × b$  **d** $p ÷ 3$\n\n' +
        '**a** $7k$  **b** $mn$  **c** $4ab$  **d** $\\frac{p}{3}$',
      answerVn:
        'Viết theo cách ngắn: **a** $7 × k$  **b** $m × n$  **c** $4 × a × b$  **d** $p ÷ 3$\n\n' +
        '**a** $7k$  **b** $mn$  **c** $4ab$  **d** $\\frac{p}{3}$',
      answerFr:
        'Écris en version courte : **a** $7 × k$  **b** $m × n$  **c** $4 × a × b$  **d** $p ÷ 3$\n\n' +
        '**a** $7k$  **b** $mn$  **c** $4ab$  **d** $\\frac{p}{3}$',
    },
  },

  // ── Section 3: the English words that choose the operation ────────────────
  {
    // QUESTION ONLY. No expression appears on this slide.
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'On your whiteboard — no talking yet',
    eyebrowVn: 'Viết lên bảng con — chưa nói vội',
    eyebrowFr: 'Sur ton ardoise — sans parler',
    title: 'One Sentence',
    titleVn: 'Một câu văn',
    titleFr: 'Une phrase',
    label: 'Write it',
    labelVn: 'Hãy viết',
    labelFr: 'Écris-la',
    labelIcon: 'MessageSquare',
    text: 'Mr Bowen dissolves **s grams** of salt in the first beaker.',
    textVn: 'Thầy Bowen hoà tan **s gam** muối vào cốc thứ nhất.',
    textFr: 'M. Bowen dissout **s grammes** de sel dans le premier bécher.',
    sub: 'The second beaker gets **two grams more than the first**. How much salt is in it?',
    subVn: 'Cốc thứ hai được **nhiều hơn cốc thứ nhất hai gam**. Cốc đó có bao nhiêu muối?',
    subFr: 'Le deuxième bécher reçoit **deux grammes de plus que le premier**. Combien de sel contient-il ?',
    content: '> Show me your board. One expression, nothing else.',
    contentVn: '> Giơ bảng con lên. Chỉ một biểu thức.',
    contentFr: '> Montre ton ardoise. Une expression, rien d’autre.',
  },
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Languages',
    eyebrow: 'Four phrases, four operations',
    eyebrowVn: 'Bốn cụm từ, bốn phép tính',
    eyebrowFr: 'Quatre tournures, quatre opérations',
    title: 'The Words Do the Choosing',
    titleVn: 'Chính từ ngữ quyết định phép tính',
    titleFr: 'Les mots choisissent',
    ratio: 50,
    inlineSvg: DIAGRAMS.FOUR_PHRASES,
    content:
      'The salt dissolves and disappears. It is still **s grams** — you just cannot see it.\n\n' +
      'That is exactly what a letter does.',
    contentVn:
      'Muối tan ra và biến mất. Nó vẫn là **s gam** — chỉ là em không nhìn thấy nữa.\n\n' +
      'Chữ cái trong đại số cũng hoạt động đúng như vậy.',
    contentFr:
      'Le sel se dissout et disparaît. Il reste **s grammes** — tu ne le vois plus, c’est tout.\n\n' +
      'Une lettre fait exactement pareil.',
    notes: [
      {
        tone: 'write',
        text:
          '**more than** → add · **less than** / **fewer than** → subtract\n' +
          '**times as many / as much** → multiply · **half as much** → divide by 2',
        textVn:
          '**more than** (nhiều hơn) → cộng · **less than / fewer than** (ít hơn) → trừ\n' +
          '**times as many / as much** (gấp … lần) → nhân · **half as much** (bằng một nửa) → chia cho 2',
        textFr:
          '**more than** (plus que) → additionner · **less than / fewer than** (moins que) → soustraire\n' +
          '**times as many / as much** (… fois plus) → multiplier · **half as much** (la moitié) → diviser par 2',
      },
    ],
  },
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Beaker',
    side: 'left',
    eyebrow: 'Quick fire — thirty seconds each',
    eyebrowVn: 'Nhanh — mỗi câu ba mươi giây',
    eyebrowFr: 'Rapide — trente secondes chacune',
    title: 'Four Beakers',
    titleVn: 'Bốn cái cốc',
    titleFr: 'Quatre béchers',
    ratio: 50,
    content:
      'The first beaker holds **w ml** of water. Write an expression for each of the others.\n\n' +
      '**a** The second holds 30 ml more than the first.\n' +
      '**b** The third holds five times as much as the first.\n' +
      '**c** The fourth holds 40 ml less than the first.\n' +
      '**d** The fifth holds half as much as the first.',
    contentVn:
      'Cốc thứ nhất chứa **w ml** nước. Hãy viết biểu thức cho từng cốc còn lại.\n\n' +
      '**a** Cốc thứ hai chứa nhiều hơn cốc thứ nhất 30 ml.\n' +
      '**b** Cốc thứ ba chứa gấp năm lần cốc thứ nhất.\n' +
      '**c** Cốc thứ tư chứa ít hơn cốc thứ nhất 40 ml.\n' +
      '**d** Cốc thứ năm chứa bằng một nửa cốc thứ nhất.',
    contentFr:
      'Le premier bécher contient **w ml** d’eau. Écris une expression pour chacun des autres.\n\n' +
      '**a** Le deuxième contient 30 ml de plus que le premier.\n' +
      '**b** Le troisième contient cinq fois plus que le premier.\n' +
      '**c** Le quatrième contient 40 ml de moins que le premier.\n' +
      '**d** Le cinquième contient la moitié du premier.',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $w + 30$  **b** $5w$  **c** $w − 40$  **d** $\\frac{w}{2}$\n\nEvery answer starts from **w**, because every sentence did.',
      answerVn: '**a** $w + 30$  **b** $5w$  **c** $w − 40$  **d** $\\frac{w}{2}$\n\nMọi đáp án đều bắt đầu từ **w**, vì mọi câu hỏi đều bắt đầu từ đó.',
      answerFr: '**a** $w + 30$  **b** $5w$  **c** $w − 40$  **d** $\\frac{w}{2}$\n\nChaque réponse part de **w**, comme chaque phrase.',
    },
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'Two words the exercise uses without explaining',
    eyebrowVn: 'Hai từ mà bài tập dùng nhưng không giải thích',
    eyebrowFr: 'Deux mots que l’exercice n’explique pas',
    title: 'Total and Difference',
    titleVn: 'Tổng và hiệu',
    titleFr: 'Total et différence',
    ratio: 50,
    inlineSvg: DIAGRAMS.TOTAL_DIFFERENCE,
    content: 'When a question gives you **two** letters, these are the two words it will use.',
    contentVn: 'Khi một câu hỏi cho em **hai** chữ cái, đây chính là hai từ nó sẽ dùng.',
    contentFr: 'Quand une question te donne **deux** lettres, ce sont ces deux mots qu’elle utilise.',
    notes: [
      {
        tone: 'write',
        text: '**Total** → add them: $a + b$ · **Difference** → subtract them: $a − b$',
        textVn: '**Total (tổng)** → cộng lại: $a + b$ · **Difference (hiệu)** → trừ đi: $a − b$',
        textFr: '**Total** (le total) → additionne-les : $a + b$ · **Difference** (la différence) → soustrais-les : $a − b$',
      },
    ],
    reveal: {
      label: 'One more',
      labelVn: 'Thêm một câu',
      labelFr: 'Encore une',
      answer: 'Mr Bowen pours **three** large beakers and **five** small ones into a bowl. Write an expression for the total.\n\n$3a + 5b$. Two different sizes, so two different letters.',
      answerVn: 'Thầy Bowen đổ **ba** cốc lớn và **năm** cốc nhỏ vào một cái tô. Hãy viết biểu thức cho tổng lượng nước.\n\n$3a + 5b$. Hai cỡ cốc khác nhau nên phải dùng hai chữ cái khác nhau.',
      answerFr: 'M. Bowen verse **trois** grands béchers et **cinq** petits dans un bol. Écris une expression pour le total.\n\n$3a + 5b$. Deux tailles différentes, donc deux lettres différentes.',
    },
  },

  // ── Section 4: the word order flips ───────────────────────────────────────
  {
    // QUESTION ONLY. Both candidates are shown; neither is marked.
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Discuss in pairs — do not write yet',
    eyebrowVn: 'Thảo luận theo cặp — chưa viết vội',
    eyebrowFr: 'Discute à deux — n’écris pas encore',
    title: 'Which One Is Right?',
    titleVn: 'Cái nào mới đúng?',
    titleFr: 'Laquelle est juste ?',
    label: 'Discuss',
    labelVn: 'Thảo luận',
    labelFr: 'Discute',
    labelIcon: 'MessageSquare',
    text: '**h less than t**',
    textVn: '**h less than t**',
    textFr: '**h less than t**',
    sub: 'Is this written $h − t$, or is it written $t − h$? They are not the same.',
    subVn: 'Câu này viết là $h − t$, hay là $t − h$? Hai cái đó không giống nhau.',
    subFr: 'Est-ce que ça s’écrit $h − t$ ou $t − h$ ? Ce n’est pas pareil.',
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ArrowLeftRight',
    eyebrow: 'Test it with numbers first',
    eyebrowVn: 'Hãy thử bằng số trước',
    eyebrowFr: 'Teste d’abord avec des nombres',
    title: 'The Words Come Backwards',
    titleVn: 'Thứ tự từ ngữ bị đảo ngược',
    titleFr: 'Les mots sont à l’envers',
    ratio: 50,
    inlineSvg: DIAGRAMS.ORDER_FLIP,
    content:
      'You already know that **5 less than 12** is 7. Nobody says it is −7.\n\n' +
      'So you already know this rule. Putting letters in it changes nothing.',
    contentVn:
      'Em vốn đã biết **5 less than 12** (12 bớt đi 5) bằng 7. Không ai nói là −7 cả.\n\n' +
      'Vậy là em đã biết quy tắc này rồi. Thay số bằng chữ cái cũng không đổi gì.',
    contentFr:
      'Tu sais déjà que **5 less than 12** (5 de moins que 12) fait 7. Personne ne dit −7.\n\n' +
      'Donc tu connais déjà cette règle. Avec des lettres, rien ne change.',
    notes: [
      {
        tone: 'write',
        text:
          '**Watch the order.** English often says the amount **first**, but we write the starting number **first**.\n' +
          '**h less than t** is $t − h$ · **k more than g** is $g + k$.',
        textVn:
          '**Chú ý thứ tự.** Tiếng Anh thường nói phần thêm/bớt **trước**, nhưng ta lại viết số ban đầu **trước**.\n' +
          '**h less than t** là $t − h$ · **k more than g** là $g + k$.',
        textFr:
          '**Attention à l’ordre.** L’anglais dit souvent la quantité **d’abord**, mais on écrit le nombre de départ **d’abord**.\n' +
          '**h less than t** donne $t − h$ · **k more than g** donne $g + k$.',
      },
    ],
  },
  {
    layout: 'split',
    accent: GREEN,
    icon: 'ListChecks',
    side: 'left',
    eyebrow: 'Three to try',
    eyebrowVn: 'Ba câu để thử',
    eyebrowFr: 'Trois à essayer',
    title: 'Your Turn',
    titleVn: 'Đến lượt em',
    titleFr: 'À toi',
    ratio: 50,
    content:
      'Write an expression for each of these.\n\n' +
      '**a** 9 less than m\n' +
      '**b** d more than f\n' +
      '**c** p more than six times q',
    contentVn:
      'Hãy viết biểu thức cho mỗi câu sau.\n\n' +
      '**a** 9 less than m\n' +
      '**b** d more than f\n' +
      '**c** p more than six times q',
    contentFr:
      'Écris une expression pour chacune.\n\n' +
      '**a** 9 less than m\n' +
      '**b** d more than f\n' +
      '**c** p more than six times q',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $m − 9$  **b** $f + d$  **c** $6q + p$\n\nIn **c**, "six times q" is $6q$ — build that first, then add p to it.',
      answerVn: '**a** $m − 9$  **b** $f + d$  **c** $6q + p$\n\nỞ câu **c**, "six times q" là $6q$ — hãy dựng phần đó trước, rồi cộng thêm p.',
      answerFr: '**a** $m − 9$  **b** $f + d$  **c** $6q + p$\n\nEn **c**, « six times q » donne $6q$ — construis-le d’abord, puis ajoute p.',
    },
  },

  // ── Section 5: one preposition, a different answer ────────────────────────
  {
    // QUESTION ONLY. `compare` rather than `statement`, because statement runs
    // its text into one paragraph and hides the single word that differs.
    layout: 'compare',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Read both out loud — do A and B mean the same thing?',
    eyebrowVn: 'Đọc to cả hai câu — A và B có cùng nghĩa không?',
    eyebrowFr: 'Lis les deux à voix haute — A et B veulent-elles dire la même chose ?',
    title: 'Spot the Difference',
    titleVn: 'Tìm điểm khác nhau',
    titleFr: 'Trouve la différence',
    columns: [
      {
        heading: 'Sentence A',
        headingVn: 'Câu A',
        headingFr: 'Phrase A',
        accent: BLUE,
        icon: 'MessageSquare',
        content: 'Multiply x by 5 and **subtract 4**.',
        contentVn: 'Multiply x by 5 and **subtract 4**.',
        contentFr: 'Multiply x by 5 and **subtract 4**.',
        caption: 'Read it out loud.',
        captionVn: 'Hãy đọc to câu này.',
        captionFr: 'Lis-la à voix haute.',
      },
      {
        heading: 'Sentence B',
        headingVn: 'Câu B',
        headingFr: 'Phrase B',
        accent: ORANGE,
        icon: 'MessageSquare',
        content: 'Multiply x by 5 and **subtract from 4**.',
        contentVn: 'Multiply x by 5 and **subtract from 4**.',
        contentFr: 'Multiply x by 5 and **subtract from 4**.',
        caption: 'Now read this one. What changed?',
        captionVn: 'Bây giờ đọc to câu này. Có gì thay đổi?',
        captionFr: 'Maintenant, lis celle-ci. Qu’est-ce qui a changé ?',
      },
    ],
  },
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'This one costs marks every year',
    eyebrowVn: 'Chỗ này năm nào cũng bị mất điểm',
    eyebrowFr: 'Celle-ci coûte des points chaque année',
    title: 'Subtract 4, or Subtract From 4?',
    titleVn: 'Trừ đi 4, hay lấy 4 trừ đi?',
    titleFr: 'Soustraire 4, ou soustraire de 4 ?',
    ratio: 50,
    inlineSvg: DIAGRAMS.SUBTRACT_VS_FROM,
    content:
      'Same numbers. Same letter. Opposite answers — **6** and **−6**.\n\n' +
      'One word did that.',
    contentVn:
      'Cùng những con số. Cùng chữ cái. Đáp án ngược nhau — **6** và **−6**.\n\n' +
      'Chỉ một từ đã làm nên điều đó.',
    contentFr:
      'Mêmes nombres. Même lettre. Réponses opposées — **6** et **−6**.\n\n' +
      'Un seul mot a fait ça.',
    notes: [
      {
        tone: 'write',
        text:
          '**subtract 4** → take 4 away from what you have: $5x − 4$\n' +
          '**subtract from 4** → start at 4 and take away what you have: $4 − 5x$',
        textVn:
          '**subtract 4** (trừ đi 4) → lấy cái em đang có trừ đi 4: $5x − 4$\n' +
          '**subtract from 4** (lấy 4 trừ đi) → bắt đầu từ 4 rồi trừ đi cái em đang có: $4 − 5x$',
        textFr:
          '**subtract 4** (soustraire 4) → enlève 4 à ce que tu as : $5x − 4$\n' +
          '**subtract from 4** (soustraire de 4) → pars de 4 et enlève ce que tu as : $4 − 5x$',
      },
    ],
  },
  {
    layout: 'split',
    accent: RED,
    icon: 'Layers',
    side: 'left',
    eyebrow: 'Both traps in one question',
    eyebrowVn: 'Cả hai cái bẫy trong cùng một câu',
    eyebrowFr: 'Les deux pièges dans une question',
    title: 'The Result',
    titleVn: 'Kết quả',
    titleFr: 'Le résultat',
    ratio: 50,
    inlineSvg: DIAGRAMS.ORDER_OF_OPS,
    content:
      'Build the multiplication first and give it a name: **3n is "the result"**.\n\n' +
      'Then the sentence is easy: subtract that result **from 25**.',
    contentVn:
      'Hãy dựng phép nhân trước và đặt tên cho nó: **3n chính là "kết quả"**.\n\n' +
      'Rồi câu văn trở nên dễ: lấy **25** trừ đi kết quả đó.',
    contentFr:
      'Construis d’abord la multiplication et donne-lui un nom : **3n est « le résultat »**.\n\n' +
      'Ensuite, la phrase est facile : soustrais ce résultat **de 25**.',
    notes: [
      {
        tone: 'write',
        text:
          '**Order of operations:** do the **× and ÷ first**, then the + and −.\n' +
          'Multiply n by 3, then subtract the result from 25 → $25 − 3n$.',
        textVn:
          '**Thứ tự phép tính:** làm **nhân và chia trước**, rồi mới cộng và trừ.\n' +
          'Nhân n với 3, rồi lấy 25 trừ đi kết quả → $25 − 3n$.',
        textFr:
          '**Priorité des opérations :** fais **× et ÷ d’abord**, puis + et −.\n' +
          'Multiplie n par 3, puis soustrais le résultat de 25 → $25 − 3n$.',
      },
    ],
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'MessageSquare',
    eyebrow: 'Someone else’s answer',
    eyebrowVn: 'Đáp án của một bạn khác',
    eyebrowFr: 'La réponse de quelqu’un d’autre',
    title: 'Is Marcus Right?',
    titleVn: 'Bạn Marcus có đúng không?',
    titleFr: 'Marcus a-t-il raison ?',
    ratio: 50,
    content:
      'Marcus is describing the expression $5 − 5x$ in words.\n\n' +
      'He writes: **"Multiply x by 5 then subtract 5."**\n\n' +
      'Is Marcus correct? Explain your answer to your partner.',
    contentVn:
      'Bạn Marcus đang mô tả biểu thức $5 − 5x$ bằng lời.\n\n' +
      'Bạn ấy viết: **"Multiply x by 5 then subtract 5."**\n\n' +
      'Marcus có đúng không? Hãy giải thích cho bạn bên cạnh nghe.',
    contentFr:
      'Marcus décrit l’expression $5 − 5x$ avec des mots.\n\n' +
      'Il écrit : **« Multiply x by 5 then subtract 5. »**\n\n' +
      'Marcus a-t-il raison ? Explique ta réponse à ton voisin.',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer:
        '**No.** What Marcus wrote describes $5x − 5$, which starts at $5x$.\n\n' +
        'The expression $5 − 5x$ starts at 5, so it needs one more word: **subtract FROM 5**.',
      answerVn:
        '**Không.** Câu Marcus viết mô tả biểu thức $5x − 5$, tức là bắt đầu từ $5x$.\n\n' +
        'Biểu thức $5 − 5x$ bắt đầu từ 5, nên cần thêm một từ: **subtract FROM 5**.',
      answerFr:
        '**Non.** Ce que Marcus a écrit décrit $5x − 5$, qui part de $5x$.\n\n' +
        'L’expression $5 − 5x$ part de 5, donc il faut un mot de plus : **subtract FROM 5**.',
    },
  },
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'ArrowLeftRight',
    side: 'left',
    eyebrow: 'Now go the other way',
    eyebrowVn: 'Bây giờ làm ngược lại',
    eyebrowFr: 'Maintenant, dans l’autre sens',
    title: 'From Algebra Back Into English',
    titleVn: 'Từ đại số dịch ngược về tiếng Anh',
    titleFr: 'De l’algèbre vers l’anglais',
    ratio: 50,
    content:
      'So far you turned English into algebra. Now write a **description in words** for each of these.\n\n' +
      '**a** $w + 5$      **b** $6k$      **c** $8 − y$      **d** $4pq$',
    contentVn:
      'Đến giờ em đã dịch tiếng Anh sang đại số. Bây giờ hãy viết **mô tả bằng lời** cho mỗi biểu thức sau.\n\n' +
      '**a** $w + 5$      **b** $6k$      **c** $8 − y$      **d** $4pq$',
    contentFr:
      'Jusqu’ici, tu as traduit l’anglais en algèbre. Maintenant, écris une **description en mots** pour chacune.\n\n' +
      '**a** $w + 5$      **b** $6k$      **c** $8 − y$      **d** $4pq$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer:
        '**a** Add 5 to w.  **b** Multiply k by 6.\n' +
        '**c** Subtract y **from** 8 — not "8 less than y".\n' +
        '**d** Multiply p by q, then multiply by 4.',
      answerVn:
        '**a** Cộng 5 vào w.  **b** Nhân k với 6.\n' +
        '**c** Lấy 8 trừ đi y — **from** 8, không phải "8 less than y".\n' +
        '**d** Nhân p với q, rồi nhân với 4.',
      answerFr:
        '**a** Ajoute 5 à w.  **b** Multiplie k par 6.\n' +
        '**c** Soustrais y de 8 — **from** 8, pas « 8 less than y ».\n' +
        '**d** Multiplie p par q, puis multiplie par 4.',
    },
  },

  // ── Section 6: two problems from the science lab, read straight ───────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Wind',
    eyebrow: 'Problem 1 — from your own Science practical',
    eyebrowVn: 'Bài 1 — từ chính buổi thực hành Khoa học của em',
    eyebrowFr: 'Problème 1 — tiré de ton TP de sciences',
    title: 'The Sealed Syringe',
    titleVn: 'Ống tiêm bịt kín',
    titleFr: 'La seringue fermée',
    ratio: 50,
    content:
      'In Science you pushed the plunger of a sealed syringe. A gas can be **compressed**; a liquid cannot.\n\n' +
      'The syringe holds **v ml** of air.\n\n' +
      '**a** Mr Bowen pushes until only half is left. Write an expression.\n' +
      '**b** He pushes 20 ml further. Write an expression now.',
    contentVn:
      'Trong giờ Khoa học em đã đẩy pít-tông của một ống tiêm bịt kín. Chất khí có thể bị **nén (compressed)**; chất lỏng thì không.\n\n' +
      'Ống tiêm chứa **v ml** không khí.\n\n' +
      '**a** Thầy Bowen đẩy đến khi chỉ còn một nửa. Hãy viết biểu thức.\n' +
      '**b** Thầy đẩy thêm 20 ml nữa. Bây giờ hãy viết biểu thức.',
    contentFr:
      'En sciences, tu as poussé le piston d’une seringue fermée. Un gaz peut être **comprimé (compressed)** ; un liquide, non.\n\n' +
      'La seringue contient **v ml** d’air.\n\n' +
      '**a** M. Bowen pousse jusqu’à ce qu’il en reste la moitié. Écris une expression.\n' +
      '**b** Il pousse encore de 20 ml. Écris une expression maintenant.',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '**a** $\\frac{v}{2}$  **b** $\\frac{v}{2} − 20$\n\nIf the syringe held water instead, neither answer would exist — you cannot compress a liquid.',
      answerVn: '**a** $\\frac{v}{2}$  **b** $\\frac{v}{2} − 20$\n\nNếu trong ống tiêm là nước thì không có đáp án nào cả — chất lỏng không nén được.',
      answerFr: '**a** $\\frac{v}{2}$  **b** $\\frac{v}{2} − 20$\n\nAvec de l’eau dans la seringue, aucune réponse n’existerait — on ne peut pas comprimer un liquide.',
    },
  },
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Snowflake',
    side: 'left',
    eyebrow: 'Problem 2',
    eyebrowVn: 'Bài 2',
    eyebrowFr: 'Problème 2',
    title: 'The Ice Cube Incident',
    titleVn: 'Sự cố viên đá',
    titleFr: 'L’incident des glaçons',
    ratio: 50,
    content:
      'Mr Bowen puts **n ice cubes** into a glass for his lesson on melting, then goes to answer the door.\n\n' +
      '**a** A helpful student adds three more. Write an expression for the number of ice cubes.\n' +
      '**b** Mr Bowen comes back forty minutes later. Write an expression for the number of ice cubes now.',
    contentVn:
      'Thầy Bowen bỏ **n viên đá** vào một cái cốc cho bài học về sự nóng chảy, rồi đi ra mở cửa.\n\n' +
      '**a** Một bạn học sinh tốt bụng bỏ thêm ba viên nữa. Hãy viết biểu thức cho số viên đá.\n' +
      '**b** Bốn mươi phút sau thầy Bowen quay lại. Bây giờ hãy viết biểu thức cho số viên đá.',
    contentFr:
      'M. Bowen met **n glaçons** dans un verre pour sa leçon sur la fusion, puis va ouvrir la porte.\n\n' +
      '**a** Un élève serviable en ajoute trois. Écris une expression pour le nombre de glaçons.\n' +
      '**b** M. Bowen revient quarante minutes plus tard. Écris une expression pour le nombre de glaçons maintenant.',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer:
        '**a** $n + 3$.\n\n' +
        '**b** **Zero.** They melted. The water is all still there — but melted ice cubes are not ice cubes.\n\n' +
        'Mr Bowen taught the lesson without them.',
      answerVn:
        '**a** $n + 3$.\n\n' +
        '**b** **Bằng không.** Chúng đã tan hết. Nước thì vẫn còn nguyên — nhưng đá đã tan thì không còn là viên đá nữa.\n\n' +
        'Thầy Bowen đành dạy bài đó mà không có viên đá nào.',
      answerFr:
        '**a** $n + 3$.\n\n' +
        '**b** **Zéro.** Ils ont fondu. L’eau est toujours là — mais des glaçons fondus ne sont plus des glaçons.\n\n' +
        'M. Bowen a fait sa leçon sans eux.',
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
      '> Your notebook should now have **8 written panels**. Count them. If one is missing, copy it from your partner before you go.',
    contentVn:
      '> Trong vở của em bây giờ phải có **8 khung ghi chép**. Hãy đếm lại. Nếu thiếu khung nào, hãy chép của bạn bên cạnh trước khi ra về.',
    contentFr: '> Ton cahier doit maintenant avoir **8 encadrés recopiés**. Compte-les. S’il en manque un, recopie celui de ton voisin avant de partir.',
    items: [
      { text: 'Say what an **expression** is, and why it has **no = sign**.', textVn: 'Nói được **biểu thức** là gì, và vì sao nó **không có dấu =**.', textFr: 'Dire ce qu’est une **expression**, et pourquoi elle n’a **pas de signe =**.' },
      { text: 'Choose a letter to **represent** a number, and say what it represents.', textVn: 'Chọn được một chữ cái để **đại diện cho** một số, và nói rõ nó đại diện cho cái gì.', textFr: 'Choisir une lettre pour **représenter** un nombre, et dire ce qu’elle représente.' },
      { text: 'Leave $c − 50$ alone without thinking you got it wrong.', textVn: 'Để yên $c − 50$ mà không nghĩ là mình làm sai.', textFr: 'Laisser $c − 50$ tel quel sans croire que tu t’es trompé.' },
      { text: 'Write $3 × s$ as $3s$ and $a × b$ as $ab$.', textVn: 'Viết $3 × s$ thành $3s$ và $a × b$ thành $ab$.', textFr: 'Écrire $3 × s$ comme $3s$ et $a × b$ comme $ab$.' },
      { text: 'Turn **more / less / times / half**, **total** and **difference** into operations.', textVn: 'Chuyển **more / less / times / half**, **total** và **difference** thành phép tính.', textFr: 'Changer **more / less / times / half**, **total** et **difference** en opérations.' },
      { text: 'Write **h less than t** as $t − h$, and tell **subtract 4** from **subtract from 4**.', textVn: 'Viết **h less than t** thành $t − h$, và phân biệt **subtract 4** với **subtract from 4**.', textFr: 'Écrire **h less than t** comme $t − h$, et distinguer **subtract 4** de **subtract from 4**.' },
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
    content: 'Read every question **twice** before you write. In this exercise the reading is the hard part, not the maths.',
    contentVn: 'Hãy đọc mỗi câu hỏi **hai lần** trước khi viết. Trong bài tập này, phần khó là đọc hiểu, không phải phần toán.',
    contentFr: 'Lis chaque question **deux fois** avant d’écrire. Ici, le plus dur, c’est la lecture, pas les maths.',
    notes: [
      {
        tone: 'homework',
        badge: 'Workbook 2.1 · pages 20–23',
        badgeVn: 'Vở bài tập 2.1 · trang 20–23',
        badgeFr: 'Cahier d’exercices 2.1 · pages 20–23',
        icon: 'Pencil',
        text:
          '**Focus** — Q1 to 5. Everybody.\n' +
          '**Practice** — Q6 to 10. Q9 is the one from today.\n' +
          '**Challenge** — Q11 to 14. An attempt beats a blank.',
        textVn:
          '**Focus** — câu 1 đến 5. Tất cả các em.\n' +
          '**Practice** — câu 6 đến 10. Câu 9 chính là câu hôm nay đã học.\n' +
          '**Challenge** — câu 11 đến 14. Làm sai vẫn hơn bỏ trống.',
        textFr:
          '**Focus** — Q1 à 5. Tout le monde.\n' +
          '**Practice** — Q6 à 10. La Q9 est celle d’aujourd’hui.\n' +
          '**Challenge** — Q11 à 14. Un essai vaut mieux qu’une page blanche.',
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
    subtitle: 'A letter is just a number you have not been told yet. Exit question: **a beaker holds $p$ ml. Mr Bowen pours out 60 ml. Write the expression.**',
    subtitleVn: 'Chữ cái chỉ là một con số chưa ai nói cho em biết. Câu hỏi ra về: **một cốc chứa $p$ ml. Thầy Bowen rót ra 60 ml. Hãy viết biểu thức.**',
    subtitleFr: 'Une lettre, c’est juste un nombre qu’on ne t’a pas encore dit. Question de sortie : **un bécher contient $p$ ml. M. Bowen en verse 60 ml. Écris l’expression.**',
  },
]

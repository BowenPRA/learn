// content/y7-math/U02_3/slides.js
// Year 7 Mathematics · 2.3 Collecting Like Terms. Tuesday 15 Sept 2026.
// Source: Workbook Unit 2, Section 2.3. Every number used in class is original;
// the exercise is the homework and is not spent in advance.
//
// WRITING RULE FOR THIS DECK (the 2.5 Science density): short sentences, one
// idea each, and the body text never repeats the write note. A diagram carries
// the picture; the note carries the words to copy.
//
// THREE THINGS SHAPE THIS DECK.
//
// 1. THE CLASS ALREADY DOES THIS IN ENGLISH. Nobody says "3 apples and 2 bananas
//    make 5 apple-bananas". Slides 3–5 let them say the bag out loud before a
//    single letter appears, then show the letters doing the same thing — and
//    Science 2.5 this morning did it with atoms. The book's own tip (think of a
//    as an apple) is used, and slide 20 corrects it: the letter is a NUMBER, the
//    length of a brick.
//
// 2. THE ENGLISH IS THE BARRIER. "Like" here is not "I like mangoes"; "collect"
//    is not "collect the books"; "simplify" and "simplest form" are the exam's
//    instruction words. Slide 7 stops for all three.
//
// 3. TWO MISTAKES COST THE MARKS: dropping the invisible 1 (8s − s = 8) and
//    leaving a minus sign behind when terms move (7x + 5y − 3x + y = 10x + 6y).
//    Each gets an ask-before-you-tell slide (11 and 17) with a split vote and no
//    answer, then a widget or diagram that settles it.
//
// COPY-DOWN: 7 written panels — term · like terms · simplify + collecting like
// terms · x means 1x · only like terms · tricky like terms · keep the sign.
import { DIAGRAMS } from './diagrams.js'
import { CollectAdd, CollectSigns, Pyramid, LikeOrNot } from './widgets.jsx'
import stall from './images/stall.jpg'

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
    eyebrow: 'Unit 2 · 2.3',
    eyebrowVn: 'Chương 2 · 2.3',
    eyebrowFr: 'Unité 2 · 2.3',
    date: '15 Sept 2026',
    title: 'Collecting Like Terms',
    titleVn: 'Thu gọn các hạng tử đồng dạng',
    titleFr: 'Réduire les termes semblables',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      badgeFr: 'Pour commencer',
      text: 'When **a = 5**, work out **3a + 4a**. Then work out **7a**.',
      textVn: 'Khi **a = 5**, hãy tính **3a + 4a**. Rồi tính **7a**.',
      textFr: 'Si **a = 5**, calcule **3a + 4a**. Puis calcule **7a**.',
    },
  },

  // ── 2. Starter check ──────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Starter check',
    eyebrowVn: 'Kiểm tra khởi động',
    eyebrowFr: 'Correction',
    title: 'Same Answer?',
    titleVn: 'Cùng đáp án?',
    titleFr: 'Même réponse ?',
    text: 'Both answers are **35**.',
    textVn: 'Cả hai đáp án đều là **35**.',
    textFr: 'Les deux réponses font **35**.',
    sub: 'Luck? Or is **3a + 4a** always the same as **7a**?',
    subVn: 'Tình cờ? Hay **3a + 4a** luôn bằng **7a**?',
    subFr: 'Un hasard ? Ou **3a + 4a** est-il toujours égal à **7a** ?',
    reveal: {
      label: 'Try a = 10',
      labelVn: 'Thử a = 10',
      labelFr: 'Essaie a = 10',
      answer: '$3a + 4a = 30 + 40 = 70$ and $7a = 70$.\n\nAlways the same. Today you find out why.',
      answerVn: '$3a + 4a = 30 + 40 = 70$ và $7a = 70$.\n\nLuôn bằng nhau. Hôm nay em sẽ biết vì sao.',
      answerFr: '$3a + 4a = 30 + 40 = 70$ et $7a = 70$.\n\nToujours pareil. Aujourd’hui, tu vas voir pourquoi.',
    },
  },

  // ── THE ENGLISH ALREADY DOES IT ───────────────────────────────────────────
  // 3. Question only. Make them SAY the bag in English.
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Say it in English',
    eyebrowVn: 'Nói bằng tiếng Anh',
    eyebrowFr: 'Dis-le en anglais',
    title: 'What Is in the Bag?',
    titleVn: 'Trong túi có gì?',
    titleFr: 'Qu’y a-t-il dans le sac ?',
    text: 'Mr Bowen buys **3 apples** and **2 bananas**. Then he buys **4 apples** and **1 banana**.',
    textVn: 'Thầy Bowen mua **3 quả táo** và **2 quả chuối**. Sau đó thầy mua **4 quả táo** và **1 quả chuối**.',
    textFr: 'M. Bowen achète **3 pommes** et **2 bananes**. Puis il achète **4 pommes** et **1 banane**.',
    sub: 'What is in his bag? Say it in a sentence.',
    subVn: 'Trong túi của thầy có gì? Hãy nói thành một câu (bằng tiếng Anh).',
    subFr: 'Qu’y a-t-il dans son sac ? Dis-le en une phrase, en anglais.',
  },

  // 4. The answer, photographed, then in letters
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'English does this already',
    eyebrowVn: 'Tiếng Anh vốn đã làm vậy',
    eyebrowFr: 'L’anglais le fait déjà',
    title: 'Apples With Apples',
    titleVn: 'Táo đi với táo',
    titleFr: 'Les pommes avec les pommes',
    inlineSvg: DIAGRAMS.FRUIT_BAG,
    caption: 'Nobody says "10 apple-bananas". Algebra does not either.',
    captionVn: 'Không ai nói "10 quả táo-chuối". Đại số cũng vậy. (a: số táo, b: số chuối)',
    captionFr: 'Personne ne dit « 10 pommes-bananes ». L’algèbre non plus. (a : pommes, b : bananes)',
  },

  // 5. The bridge to this morning's Science 2.5
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'Science 2.5, this morning',
    eyebrowVn: 'Khoa học 2.5, sáng nay',
    eyebrowFr: 'Sciences 2.5, ce matin',
    title: 'Sorted by Kind',
    titleVn: 'Xếp theo từng loại',
    titleFr: 'Triés par sorte',
    inlineSvg: DIAGRAMS.ATOMS_SORT,
    caption: 'Carbon and oxygen are different elements. Count each kind on its own.',
    captionVn: 'Cacbon và oxi là hai nguyên tố khác nhau. Đếm riêng từng loại. (carbon = cacbon, oxygen = oxi, hydrogen = hiđro)',
    captionFr: 'Le carbone et l’oxygène sont deux éléments différents. Compte chaque sorte à part.',
  },

  // ── KEY WORDS ─────────────────────────────────────────────────────────────
  // 6. Term
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Boxes',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Term',
    titleVn: 'Hạng tử',
    titleFr: 'Terme',
    ratio: 40,
    inlineSvg: DIAGRAMS.TERMS,
    content: 'An expression is made of **terms**.',
    contentVn: 'Một biểu thức được tạo nên từ các **hạng tử (terms)**.',
    contentFr: 'Une expression est faite de **termes**.',
    notes: [
      {
        tone: 'write',
        text: '**Term:** one part of an expression.\nThe + and − signs separate the terms.',
        textVn: '**Hạng tử (term):** một phần của biểu thức.\nCác dấu + và − ngăn cách các hạng tử.',
        textFr: '**Terme (term) :** une partie d’une expression.\nLes signes + et − séparent les termes.',
      },
    ],
  },

  // 7. English check: like / collect / simplify
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    eyebrowFr: 'Point d’anglais',
    title: 'Words With Two Meanings',
    titleVn: 'Từ có hai nghĩa',
    titleFr: 'Des mots à deux sens',
    inlineSvg: DIAGRAMS.WORDS,
    caption: 'In maths, **like** means **the same kind**.',
    captionVn: 'Trong toán, **like** nghĩa là **cùng loại**, không phải "thích". **collect** = gộp lại, **simplify** = rút gọn.',
    captionFr: 'En maths, **like** veut dire **de la même sorte**, pas « aimer ». **collect** = regrouper, **simplify** = simplifier.',
  },

  // 8. Like terms
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Equal',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Like Terms',
    titleVn: 'Hạng tử đồng dạng',
    titleFr: 'Termes semblables',
    ratio: 40,
    inlineSvg: DIAGRAMS.LIKE_UNLIKE,
    content: 'Look at the **letter**, not the number.',
    contentVn: 'Nhìn vào **chữ cái**, không nhìn con số.',
    contentFr: 'Regarde la **lettre**, pas le nombre.',
    notes: [
      {
        tone: 'write',
        text: '**Like terms:** terms that contain the same letter.\n$2a$ and $3a$ are like terms. $2a$ and $3b$ are not.',
        textVn: '**Hạng tử đồng dạng (like terms):** các hạng tử có cùng chữ cái.\n$2a$ và $3a$ là hạng tử đồng dạng. $2a$ và $3b$ thì không.',
        textFr: '**Termes semblables (like terms) :** des termes qui ont la même lettre.\n$2a$ et $3a$ sont des termes semblables. $2a$ et $3b$, non.',
      },
    ],
  },

  // 9. Simplify + collecting like terms, with the real fruit stall
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Layers',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mots clés',
    title: 'Collect and Simplify',
    titleVn: 'Gộp và rút gọn',
    titleFr: 'Réduire et simplifier',
    ratio: 45,
    image: stall,
    content: 'Halong Bay: every basket holds **one kind** of fruit.',
    contentVn: 'Vịnh Hạ Long: mỗi rổ chỉ đựng **một loại** trái cây.',
    contentFr: 'Baie d’Halong : chaque panier contient **une seule sorte** de fruit.',
    notes: [
      {
        tone: 'write',
        text: '**Simplify:** write an expression in a shorter way.\n**Collecting like terms:** adding like terms together to simplify.\n$a + a = 2a$ and $2b + 3b = 5b$',
        textVn: '**Rút gọn (simplify):** viết biểu thức ngắn gọn hơn.\n**Thu gọn hạng tử đồng dạng (collecting like terms):** cộng các hạng tử đồng dạng lại để rút gọn.\n$a + a = 2a$ và $2b + 3b = 5b$',
        textFr: '**Simplifier (simplify) :** écrire une expression plus courte.\n**Réduire (collecting like terms) :** additionner les termes semblables pour simplifier.\n$a + a = 2a$ et $2b + 3b = 5b$',
      },
    ],
  },

  // 10. The method, one press at a time
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'Say each step first',
    eyebrowVn: 'Nói từng bước trước',
    eyebrowFr: 'Dis chaque étape avant',
    title: 'Find, Move, Collect',
    titleVn: 'Tìm, chuyển, gộp',
    titleFr: 'Trouve, bouge, réduis',
    widget: CollectAdd,
    caption: 'Before each press, the class says what happens next.',
    captionVn: 'Trước mỗi lần bấm, cả lớp nói điều gì sẽ xảy ra.',
    captionFr: 'Avant chaque clic, la classe dit ce qui va se passer.',
  },

  // ── THE INVISIBLE 1 ───────────────────────────────────────────────────────
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
    text: 'Simplify $8s − s$',
    textVn: 'Rút gọn $8s − s$',
    textFr: 'Simplifie $8s − s$',
    columns: [
      {
        heading: 'A · left hand up',
        headingVn: 'A · giơ tay trái',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_8,
      },
      {
        heading: 'B · right hand up',
        headingVn: 'B · giơ tay phải',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_7S,
      },
    ],
  },

  // 12. x means 1x
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'The invisible 1',
    eyebrowVn: 'Số 1 vô hình',
    eyebrowFr: 'Le 1 invisible',
    title: 'x Means 1x',
    titleVn: 'x nghĩa là 1x',
    titleFr: 'x veut dire 1x',
    ratio: 40,
    inlineSvg: DIAGRAMS.ONE_X,
    content: '**7s is right.** The letter never disappears.',
    contentVn: '**7s mới đúng.** Chữ cái không bao giờ biến mất.',
    contentFr: '**7s est juste.** La lettre ne disparaît jamais.',
    notes: [
      {
        tone: 'write',
        text: '$x$ means $1x$.\n$4x + x = 5x$ and $8s − s = 7s$',
        textVn: '$x$ nghĩa là $1x$.\n$4x + x = 5x$ và $8s − s = 7s$',
        textFr: '$x$ veut dire $1x$.\n$4x + x = 5x$ et $8s − s = 7s$',
      },
    ],
  },

  // ── ONLY LIKE TERMS ───────────────────────────────────────────────────────
  // 13. The rule
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Ruler',
    eyebrow: 'The rule',
    eyebrowVn: 'Quy tắc',
    eyebrowFr: 'La règle',
    title: 'Only Like Terms',
    titleVn: 'Chỉ gộp hạng tử đồng dạng',
    titleFr: 'Seulement les termes semblables',
    ratio: 40,
    inlineSvg: DIAGRAMS.CANT_COLLECT,
    content: 'Can you add 5 cm and 3 kg?',
    contentVn: 'Em có cộng được 5 cm với 3 kg không?',
    contentFr: 'Peux-tu additionner 5 cm et 3 kg ?',
    notes: [
      {
        tone: 'write',
        text: 'You can only collect **like terms**.\n$3a + 2b$ cannot be simplified.',
        textVn: 'Em chỉ có thể gộp các **hạng tử đồng dạng**.\n$3a + 2b$ không thể rút gọn.',
        textFr: 'Tu ne peux réduire que les **termes semblables**.\n$3a + 2b$ ne peut pas être simplifié.',
      },
    ],
  },

  // 14. Quick practice
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowVn: 'Bảng con',
    eyebrowFr: 'Ardoises',
    title: 'Tick or Cross?',
    titleVn: 'Đánh dấu ✓ hay ✗?',
    titleFr: 'Coche ou croix ?',
    ratio: 50,
    content:
      'Can it be simplified? Tick ✓ and simplify. Or cross ✗.\n\n' +
      '**a** $4k + k$\n' +
      '**b** $3k + 3$\n' +
      '**c** $7w − 2v$\n' +
      '**d** $9d − d$\n' +
      '**e** $2m + 5m + 1$',
    contentVn:
      'Có rút gọn được không? Đánh ✓ rồi rút gọn. Hoặc đánh ✗.\n\n' +
      '**a** $4k + k$\n' +
      '**b** $3k + 3$\n' +
      '**c** $7w − 2v$\n' +
      '**d** $9d − d$\n' +
      '**e** $2m + 5m + 1$',
    contentFr:
      'Peut-on simplifier ? Coche ✓ et simplifie. Sinon, mets une croix ✗.\n\n' +
      '**a** $4k + k$\n' +
      '**b** $3k + 3$\n' +
      '**c** $7w − 2v$\n' +
      '**d** $9d − d$\n' +
      '**e** $2m + 5m + 1$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** ✓ $5k$, **b** ✗, **c** ✗, **d** ✓ $8d$, **e** ✓ $7m + 1$',
      answerVn: '**a** ✓ $5k$, **b** ✗, **c** ✗, **d** ✓ $8d$, **e** ✓ $7m + 1$',
      answerFr: '**a** ✓ $5k$, **b** ✗, **c** ✗, **d** ✓ $8d$, **e** ✓ $7m + 1$',
    },
  },

  // 15. Tricky like terms
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ScanEye',
    eyebrow: 'Look closely',
    eyebrowVn: 'Nhìn kỹ nhé',
    eyebrowFr: 'Regarde bien',
    title: 'Tricky Like Terms',
    titleVn: 'Hạng tử đồng dạng dễ nhầm',
    titleFr: 'Termes semblables piégeux',
    ratio: 40,
    inlineSvg: DIAGRAMS.TRICKY,
    notes: [
      {
        tone: 'write',
        text: '**Numbers** are like terms: $7 + 2 = 9$.\n$ab$ and $ba$ are like terms, because $a × b = b × a$.\n$x$ and $x^2$ are **not** like terms.',
        textVn: '**Các số** là hạng tử đồng dạng: $7 + 2 = 9$.\n$ab$ và $ba$ là hạng tử đồng dạng, vì $a × b = b × a$.\n$x$ và $x^2$ **không** đồng dạng.',
        textFr: '**Les nombres** sont des termes semblables : $7 + 2 = 9$.\n$ab$ et $ba$ sont des termes semblables, car $a × b = b × a$.\n$x$ et $x^2$ ne sont **pas** semblables.',
      },
    ],
  },

  // 16. Game
  {
    layout: 'game',
    title: 'Like or Not?',
    titleVn: 'Đồng dạng hay không?',
    titleFr: 'Semblables ou non ?',
    widget: LikeOrNot,
  },

  // ── THE SIGN TRAVELS ──────────────────────────────────────────────────────
  // 17. Question only. Left hand A, right hand B; slide 18 settles it.
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
    text: 'Simplify $7x + 5y − 3x + y$',
    textVn: 'Rút gọn $7x + 5y − 3x + y$',
    textFr: 'Simplifie $7x + 5y − 3x + y$',
    columns: [
      {
        heading: 'A · left hand up',
        headingVn: 'A · giơ tay trái',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_4X6Y,
      },
      {
        heading: 'B · right hand up',
        headingVn: 'B · giơ tay phải',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_10X6Y,
      },
    ],
  },

  // 18. The widget settles it
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Move',
    eyebrow: 'Watch the minus sign',
    eyebrowVn: 'Theo dõi dấu trừ',
    eyebrowFr: 'Surveille le signe moins',
    title: 'The Sign Moves Too',
    titleVn: 'Dấu cũng di chuyển',
    titleFr: 'Le signe bouge aussi',
    widget: CollectSigns,
    caption: '**4x + 6y** is right. Watch where the **−** goes.',
    captionVn: '**4x + 6y** mới đúng. Hãy xem dấu **−** đi đâu.',
    captionFr: '**4x + 6y** est juste. Regarde où va le **−**.',
  },

  // 19. Keep the sign (write) + practice
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'The rule',
    eyebrowVn: 'Quy tắc',
    eyebrowFr: 'La règle',
    title: 'Keep the Sign',
    titleVn: 'Giữ nguyên dấu',
    titleFr: 'Garde le signe',
    notes: [
      {
        tone: 'write',
        text: 'The sign **in front** of a term belongs to it. Move them together.\n$7x + 5y − 3x + y = 7x − 3x + 5y + y = 4x + 6y$',
        textVn: 'Dấu **đứng trước** hạng tử thuộc về hạng tử đó. Di chuyển cùng nhau.\n$7x + 5y − 3x + y = 7x − 3x + 5y + y = 4x + 6y$',
        textFr: 'Le signe **devant** un terme lui appartient. Déplace-les ensemble.\n$7x + 5y − 3x + y = 7x − 3x + 5y + y = 4x + 6y$',
      },
    ],
    reveal: {
      prompt: 'Simplify **a** $6p + 2q − 4p + 3q$ and **b** $9 + 5t − 4 − 2t$.',
      promptVn: 'Rút gọn **a** $6p + 2q − 4p + 3q$ và **b** $9 + 5t − 4 − 2t$.',
      promptFr: 'Simplifie **a** $6p + 2q − 4p + 3q$ et **b** $9 + 5t − 4 − 2t$.',
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $2p + 5q$, **b** $3t + 5$',
      answerVn: '**a** $2p + 5q$, **b** $3t + 5$',
      answerFr: '**a** $2p + 5q$, **b** $3t + 5$',
    },
  },

  // ── LETTERS ARE NUMBERS ───────────────────────────────────────────────────
  // 20. Real bricks: correct the apple
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'Real bricks',
    eyebrowVn: 'Gạch thật',
    eyebrowFr: 'De vraies briques',
    title: 'A Letter Is a Number',
    titleVn: 'Chữ cái là một con số',
    titleFr: 'Une lettre est un nombre',
    inlineSvg: DIAGRAMS.BRICKS_REAL,
    caption: 'Here **x** is not a brick. It is the **length** of one brick.',
    captionVn: 'Ở đây **x** không phải viên gạch. Nó là **chiều dài** của một viên gạch. (length = chiều dài)',
    captionFr: 'Ici, **x** n’est pas une brique. C’est la **longueur** d’une brique. (length = longueur)',
  },

  // 21. Brick rows
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Ruler',
    eyebrow: 'Simplest form',
    eyebrowVn: 'Dạng gọn nhất',
    eyebrowFr: 'Forme réduite',
    title: 'How Long Is Each Row?',
    titleVn: 'Mỗi hàng dài bao nhiêu?',
    titleFr: 'Quelle longueur pour chaque rangée ?',
    ratio: 40,
    inlineSvg: DIAGRAMS.BRICK_ROWS,
    content: 'Write the total length of each row in **simplest form**.',
    contentVn: 'Viết tổng chiều dài của mỗi hàng ở **dạng gọn nhất**.',
    contentFr: 'Écris la longueur totale de chaque rangée sous **forme réduite**.',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $2x + y$\n**b** $x + 2y$\n**c** $3x + 2y$',
      answerVn: '**a** $2x + y$\n**b** $x + 2y$\n**c** $3x + 2y$',
      answerFr: '**a** $2x + y$\n**b** $x + 2y$\n**c** $3x + 2y$',
    },
  },

  // 22. Algebraic pyramids (widget)
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Triangle',
    eyebrow: 'Workbook puzzle',
    eyebrowVn: 'Câu đố trong vở bài tập',
    eyebrowFr: 'Énigme du cahier d’exercices',
    title: 'Algebraic Pyramids',
    titleVn: 'Kim tự tháp đại số',
    titleFr: 'Pyramides algébriques',
    ratio: 40,
    widget: Pyramid,
    content: 'Each block is the **two blocks under it**, added.\n\nSay the block **before** you press.',
    contentVn: 'Mỗi ô bằng **hai ô bên dưới** cộng lại.\n\nNói kết quả **trước** khi bấm.',
    contentFr: 'Chaque case est la somme des **deux cases en dessous**.\n\nDis la case **avant** de cliquer.',
  },

  // ── FIND THE MISTAKE ──────────────────────────────────────────────────────
  // 23. Mr Bowen's homework
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Pencil',
    eyebrow: 'Find the mistakes',
    eyebrowVn: 'Tìm lỗi sai',
    eyebrowFr: 'Trouve les erreurs',
    title: "Mr Bowen's Homework",
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
      answer: '**a** $3x + 5$: no like terms\n**b** $5y$: $y$ means $1y$\n**c** $5p + 2q$\n**d** $5ab$: $ab$ and $ba$ are like terms',
      answerVn: '**a** $3x + 5$: không có hạng tử đồng dạng\n**b** $5y$: $y$ nghĩa là $1y$\n**c** $5p + 2q$\n**d** $5ab$: $ab$ và $ba$ là hạng tử đồng dạng',
      answerFr: '**a** $3x + 5$ : pas de termes semblables\n**b** $5y$ : $y$ veut dire $1y$\n**c** $5p + 2q$\n**d** $5ab$ : $ab$ et $ba$ sont des termes semblables',
    },
  },

  // ── WORD PROBLEMS (deadpan, and they get sillier) ─────────────────────────
  // 24. Two sensible ones
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Write it, then simplify',
    eyebrowVn: 'Viết ra, rồi rút gọn',
    eyebrowFr: 'Écris-le, puis simplifie',
    title: 'Word Problems',
    titleVn: 'Bài toán có lời văn',
    titleFr: 'Problèmes',
    ratio: 50,
    inlineSvg: DIAGRAMS.RECTANGLE,
    content:
      '**1.** Mr Bowen buys $n$ pens on Monday and $3n$ pens on Tuesday. How many pens does he buy?\n\n' +
      '**2.** Find the perimeter of the rectangle.',
    contentVn:
      '**1.** Thầy Bowen mua $n$ cây bút vào thứ Hai và $3n$ cây bút vào thứ Ba. Thầy mua tất cả bao nhiêu cây bút?\n\n' +
      '**2.** Tìm chu vi hình chữ nhật.',
    contentFr:
      '**1.** M. Bowen achète $n$ stylos lundi et $3n$ stylos mardi. Combien de stylos achète-t-il ?\n\n' +
      '**2.** Trouve le périmètre du rectangle.',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**1.** $n + 3n = 4n$ pens\n**2.** $2x + 1 + x + 2x + 1 + x = 6x + 2$ cm',
      answerVn: '**1.** $n + 3n = 4n$ cây bút\n**2.** $2x + 1 + x + 2x + 1 + x = 6x + 2$ cm',
      answerFr: '**1.** $n + 3n = 4n$ stylos\n**2.** $2x + 1 + x + 2x + 1 + x = 6x + 2$ cm',
    },
  },

  // 25. Silly one
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Simplest form',
    eyebrowVn: 'Dạng gọn nhất',
    eyebrowFr: 'Forme réduite',
    title: "Mr Bowen's Animals",
    titleVn: 'Những con vật của thầy Bowen',
    titleFr: 'Les animaux de M. Bowen',
    content:
      'Mr Bowen has $4c$ cats. He buys $3c$ more cats and $2d$ dogs.\n\n' +
      'Then $5c$ cats leave. One goldfish, called x, arrives.\n\n' +
      'How many animals does Mr Bowen have now?',
    contentVn:
      'Thầy Bowen có $4c$ con mèo. Thầy mua thêm $3c$ con mèo và $2d$ con chó.\n\n' +
      'Sau đó $5c$ con mèo bỏ đi. Một con cá vàng tên là x đến.\n\n' +
      'Bây giờ thầy Bowen có bao nhiêu con vật?',
    contentFr:
      'M. Bowen a $4c$ chats. Il achète encore $3c$ chats et $2d$ chiens.\n\n' +
      'Puis $5c$ chats s’en vont. Un poisson rouge, appelé x, arrive.\n\n' +
      'Combien d’animaux M. Bowen a-t-il maintenant ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '$4c + 3c + 2d − 5c + 1 = 2c + 2d + 1$\n\nThe goldfish is **1** animal. Its name is not a number.',
      answerVn: '$4c + 3c + 2d − 5c + 1 = 2c + 2d + 1$\n\nCon cá vàng là **1** con vật. Tên của nó không phải là một con số.',
      answerFr: '$4c + 3c + 2d − 5c + 1 = 2c + 2d + 1$\n\nLe poisson rouge, c’est **1** animal. Son nom n’est pas un nombre.',
    },
  },

  // 26. Sillier one
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Simplest form',
    eyebrowVn: 'Dạng gọn nhất',
    eyebrowFr: 'Forme réduite',
    title: "Mr Bowen's Keys",
    titleVn: 'Chùm chìa khóa của thầy Bowen',
    titleFr: 'Les clés de M. Bowen',
    content:
      'Mr Bowen walks $3k$ km to school, then $3k$ km home.\n\n' +
      'He cannot find his keys. He walks to school and home again.\n\n' +
      'The keys were in his pocket. How far did he walk?',
    contentVn:
      'Thầy Bowen đi bộ $3k$ km đến trường, rồi $3k$ km về nhà.\n\n' +
      'Thầy không tìm thấy chìa khóa. Thầy lại đi bộ đến trường rồi về nhà.\n\n' +
      'Chìa khóa ở trong túi áo của thầy. Thầy đã đi bộ bao xa?',
    contentFr:
      'M. Bowen marche $3k$ km jusqu’à l’école, puis $3k$ km pour rentrer.\n\n' +
      'Il ne trouve pas ses clés. Il refait l’aller et le retour.\n\n' +
      'Les clés étaient dans sa poche. Combien de km a-t-il marché ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '$3k + 3k + 3k + 3k = 12k$ km\n\nThe keys walked $12k$ km too.',
      answerVn: '$3k + 3k + 3k + 3k = 12k$ km\n\nChùm chìa khóa cũng đã đi $12k$ km.',
      answerFr: '$3k + 3k + 3k + 3k = 12k$ km\n\nLes clés ont fait $12k$ km, elles aussi.',
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
    titleFr: 'Sais-tu le faire ?',
    content: '> Check your notebook: **7 written panels**.',
    contentVn: '> Kiểm tra vở: **7 khung ghi chép**.',
    contentFr: '> Vérifie ton cahier : **7 encadrés recopiés**.',
    items: [
      { text: 'Say what a **term** and **like terms** are.', textVn: 'Nói được **hạng tử** và **hạng tử đồng dạng** là gì.', textFr: 'Dire ce que sont un **terme** et des **termes semblables**.' },
      { text: '**Simplify** by collecting like terms.', textVn: '**Rút gọn** bằng cách gộp hạng tử đồng dạng.', textFr: '**Simplifier** en réduisant les termes semblables.' },
      { text: 'Remember that $x$ means $1x$.', textVn: 'Nhớ rằng $x$ nghĩa là $1x$.', textFr: 'Se souvenir que $x$ veut dire $1x$.' },
      { text: 'Know that $3a + 2b$ cannot be simplified.', textVn: 'Biết rằng $3a + 2b$ không thể rút gọn.', textFr: 'Savoir que $3a + 2b$ ne peut pas être simplifié.' },
      { text: 'Spot tricky like terms: $ab$ and $ba$.', textVn: 'Nhận ra hạng tử đồng dạng dễ nhầm: $ab$ và $ba$.', textFr: 'Repérer les termes semblables piégeux : $ab$ et $ba$.' },
      { text: 'Move each **sign** with its term.', textVn: 'Di chuyển **dấu** cùng với hạng tử của nó.', textFr: 'Déplacer chaque **signe** avec son terme.' },
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
    titleFr: 'Pour le prochain cours',
    content: 'Before you simplify, **find** the like terms. Circle each kind in a different colour.',
    contentVn: 'Trước khi rút gọn, hãy **tìm** các hạng tử đồng dạng. Khoanh mỗi loại bằng một màu khác nhau.',
    contentFr: 'Avant de simplifier, **trouve** les termes semblables. Entoure chaque sorte d’une couleur différente.',
    notes: [
      {
        tone: 'homework',
        badge: 'Workbook 2.3',
        badgeVn: 'Vở bài tập 2.3',
        badgeFr: 'Cahier d’exercices 2.3',
        icon: 'Pencil',
        text: '**Focus** — everybody.\n**Practice** — the bricks and the pyramids.\n**Challenge** — an attempt beats a blank.',
        textVn: '**Focus** — tất cả các em.\n**Practice** — phần viên gạch và kim tự tháp.\n**Challenge** — làm sai vẫn hơn bỏ trống.',
        textFr: '**Focus** — tout le monde.\n**Practice** — les briques et les pyramides.\n**Challenge** — essayer vaut mieux que laisser vide.',
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
    subtitle: 'Exit question: simplify **5m + 2n − m + 4n**.',
    subtitleVn: 'Câu hỏi ra về: rút gọn **5m + 2n − m + 4n**.',
    subtitleFr: 'Question de sortie : simplifie **5m + 2n − m + 4n**.',
  },
]

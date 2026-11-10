// content/y7-math/U03_1_2/slides.js
// Year 7 Mathematics · 3.1 Powers of 10 + 3.2 Rounding. Wednesday 23 Sept 2026,
// continuing Thursday. Source: Workbook Unit 3, Sections 3.1 and 3.2 (pp. 43–49).
// Every number used in class is original; the exercise is the homework and is
// not spent in advance.
//
// WRITING RULE FOR THIS DECK (the 2.5 Science density): short sentences, one
// idea each, and the body text never repeats the write note. A diagram carries
// the picture; the note carries the words to copy.
//
// WHY THE TWO SECTIONS ARE ONE DECK.
//
// The unit is called "Place value and rounding", and that is the join. ×10ⁿ
// moves a digit LEFT along the place-value table, ÷10ⁿ moves it RIGHT, and
// rounding decides where to STOP reading the columns right of the point. Slide
// 17 is the hinge that says so, and it is also the natural break between the
// two periods.
//
// THREE THINGS SHAPE THIS DECK.
//
// 1. "MULTIPLYING ADDS A ZERO" IS THE FOLK RULE, AND IT IS WRONG. It survives
//    whole numbers and dies on 7.2 × 10³. Slides 7–9 are an ask-before-you-tell
//    vote with no answer on it, then the widget that settles it: the digits
//    move, the point does not, and a zero that appears is a placeholder holding
//    a column open.
//
// 2. THE ENGLISH IS THE BARRIER, AND HERE IT IS THE INSTRUCTION WORDS.
//    "round to", "correct to" and "to 2 decimal places" are one job; "as far
//    as" is a different one; "degree of accuracy", "nearest 10" and "nearest
//    whole number" are three more phrasings again. Slides 19–21 stop for all of
//    them, and Workbook Q12d turns on exactly that distinction.
//
// 3. TWO MISTAKES COST THE MARKS: dropping the trailing zero (34.9892 to 1 d.p.
//    is 35.0, and 35 does not show one decimal place) and stopping at the place
//    you were asked for instead of looking one past it (58 ÷ 7 to 3 d.p. is
//    8.286, not 8.285). Each gets its own ask slide, and the second gets vote 2.
//
// COPY-DOWN: 12 written panels — power · the power counts the zeros ·
// multiplying moves left · dividing moves right · metric mass · round ·
// the instruction words · degree of accuracy · decimal places · the rule ·
// keep the zero · go one place further.
import { DIAGRAMS } from './diagrams.js'
import { PlaceShift, WhichWay } from './widgets.jsx'
import moon from './images/moon.jpg'
import scale from './images/scale.jpg'
import stopwatch from './images/stopwatch.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'
const RED = '#c8102e'

export const slides = [
  // ══ PART A · 3.1 MULTIPLYING AND DIVIDING BY POWERS OF 10 ═════════════════
  // 1. Hero + starter
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Sigma',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 3 · 3.1 and 3.2',
    eyebrowVn: 'Chương 3 · 3.1 và 3.2',
    eyebrowFr: 'Unité 3 · 3.1 et 3.2',
    date: '23 Sept 2026',
    title: 'Place Value and Rounding',
    titleVn: 'Giá trị theo vị trí và làm tròn',
    titleFr: 'Valeur de position et arrondis',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      badgeFr: 'Pour commencer',
      text: 'Write **10**, **100** and **1000**. How many zeros does each one have?',
      textVn: 'Viết **10**, **100** và **1000**. Mỗi số có bao nhiêu số 0?',
      textFr: 'Écris **10**, **100** et **1000**. Combien de zéros a chacun ?',
    },
  },

  // 2. Ask before you tell: counting zeros is horrible. No answer here.
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Count out loud',
    eyebrowVn: 'Đếm to lên',
    eyebrowFr: 'Compte à voix haute',
    title: 'How Many Zeros?',
    titleVn: 'Bao nhiêu số 0?',
    titleFr: 'Combien de zéros ?',
    text: '10000000000',
    textVn: '10000000000', // the same in both languages; stated so the twin check stays honest
    textFr: '10000000000',
    sub: 'Nobody gets it right the first time. There is a shorter way to write this.',
    subVn: 'Không ai đếm đúng ngay lần đầu. Có một cách viết ngắn hơn.',
    subFr: 'Personne ne trouve du premier coup. Il y a une façon plus courte de l’écrire.',
  },

  // 3. Key word: power
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Superscript',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Power',
    titleVn: 'Số mũ',
    titleFr: 'Exposant',
    ratio: 40,
    inlineSvg: DIAGRAMS.POWER_PARTS,
    content: 'The small number does the big work.',
    contentVn: 'Con số nhỏ lại làm việc lớn.',
    contentFr: 'Le petit nombre fait le gros travail.',
    notes: [
      {
        tone: 'write',
        text: '**Power:** the small raised number. It says how many to multiply together.\n$10^3 = 10 × 10 × 10 = 1000$',
        textVn: '**Số mũ (power):** con số nhỏ viết cao. Nó cho biết nhân bao nhiêu số với nhau.\n$10^3 = 10 × 10 × 10 = 1000$',
        textFr: '**Exposant (power) :** le petit nombre écrit en haut. Il dit combien de nombres on multiplie ensemble.\n$10^3 = 10 × 10 × 10 = 1000$',
      },
    ],
  },

  // 4. English check: "power", and how to say it out loud
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    eyebrowFr: 'Point d’anglais',
    title: 'Saying a Power',
    titleVn: 'Đọc số mũ',
    titleFr: 'Dire une puissance',
    inlineSvg: DIAGRAMS.POWER_WORDS,
    caption: 'In maths, **power** is not electricity.',
    captionVn: 'Trong toán, **power** không phải là điện. (squared = bình phương, cubed = lập phương)',
    captionFr: 'En maths, **power** n’est pas l’électricité. (squared = au carré, cubed = au cube)',
  },

  // 5. The zero rule — and the answer to slide 2
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ListOrdered',
    eyebrow: 'Powers of 10',
    eyebrowVn: 'Lũy thừa của 10',
    eyebrowFr: 'Puissances de 10',
    title: 'Count the Zeros',
    titleVn: 'Đếm số 0',
    titleFr: 'Compte les zéros',
    ratio: 40,
    inlineSvg: DIAGRAMS.ZERO_LADDER,
    content: 'That long number was $10^{10}$. Ten zeros.',
    contentVn: 'Số dài lúc nãy chính là $10^{10}$. Mười số 0.',
    contentFr: 'Ce long nombre était $10^{10}$. Dix zéros.',
    notes: [
      {
        tone: 'write',
        text: '**Powers of 10:** 10, 100, 1000, and so on.\nThe power tells you the number of zeros after the 1.',
        textVn: '**Lũy thừa của 10 (powers of 10):** 10, 100, 1000, ...\nSố mũ cho biết có bao nhiêu số 0 đứng sau số 1.',
        textFr: '**Puissances de 10 (powers of 10) :** 10, 100, 1000, etc.\nL’exposant te dit combien de zéros suivent le 1.',
      },
    ],
  },

  // 6. Quick practice on whiteboards
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowVn: 'Bảng con',
    eyebrowFr: 'Ardoises',
    title: 'Write It Out',
    titleVn: 'Viết ra đầy đủ',
    titleFr: 'Écris-le en entier',
    ratio: 50,
    content:
      'Write each one as an ordinary number.\n\n' +
      '**a** $10^4$\n' +
      '**b** $3 × 10^5$\n' +
      '**c** $8 × 10^2$',
    contentVn:
      'Viết mỗi số dưới dạng số thường.\n\n' +
      '**a** $10^4$\n' +
      '**b** $3 × 10^5$\n' +
      '**c** $8 × 10^2$',
    contentFr:
      'Écris chacun comme un nombre ordinaire.\n\n' +
      '**a** $10^4$\n' +
      '**b** $3 × 10^5$\n' +
      '**c** $8 × 10^2$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 10000, **b** 300000, **c** 800',
      answerVn: '**a** 10000, **b** 300000, **c** 800',
      answerFr: '**a** 10000, **b** 300000, **c** 800',
    },
  },

  // ── THE FOLK RULE DIES HERE ───────────────────────────────────────────────
  // 7. Ask before you tell. No numbers, no answer.
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Is he right?',
    eyebrowVn: 'Thầy nói đúng không?',
    eyebrowFr: 'A-t-il raison ?',
    title: 'Mr Bowen Says',
    titleVn: 'Thầy Bowen nói',
    titleFr: 'M. Bowen dit',
    text: 'To multiply by 10, just add a zero.',
    textVn: 'Muốn nhân với 10, chỉ cần thêm một số 0.',
    textFr: 'Pour multiplier par 10, il suffit d’ajouter un zéro.',
    sub: 'Talk to the person next to you.',
    subVn: 'Hãy trao đổi với bạn bên cạnh.',
    subFr: 'Parles-en avec ton voisin.',
  },

  // 8. Vote. Left hand A, right hand B, all at once. Slide 9 settles it.
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
    text: 'Work out $7.2 × 10^3$',
    textVn: 'Tính $7.2 × 10^3$',
    textFr: 'Calcule $7.2 × 10^3$',
    columns: [
      {
        heading: 'A · left hand up',
        headingVn: 'A · giơ tay trái',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_7P2000,
      },
      {
        heading: 'B · right hand up',
        headingVn: 'B · giơ tay phải',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_7200,
      },
    ],
  },

  // 9. The widget settles it: the digits move, the point does not.
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Move',
    eyebrow: 'Say each move first',
    eyebrowVn: 'Nói từng bước trước',
    eyebrowFr: 'Dis d’abord chaque déplacement',
    title: 'The Digits Move',
    titleVn: 'Các chữ số dịch chuyển',
    titleFr: 'Les chiffres bougent',
    widget: PlaceShift,
    caption: '**7200** is right. The digits move. The point never does.',
    captionVn: '**7200** mới đúng. Các chữ số dịch chuyển. Dấu thập phân thì không.',
    captionFr: '**7200** est juste. Les chiffres bougent. Le point, jamais.',
  },

  // 10. Multiplying — the rule, then practice
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ArrowLeft',
    eyebrow: 'The rule',
    eyebrowVn: 'Quy tắc',
    eyebrowFr: 'La règle',
    title: 'Multiplying Moves Left',
    titleVn: 'Nhân thì dịch sang trái',
    titleFr: 'Multiplier décale à gauche',
    ratio: 50,
    content:
      'Try these on your whiteboard.\n\n' +
      '**a** $4.3 × 10^3$\n' +
      '**b** $56 × 10^4$\n' +
      '**c** $0.9 × 10^5$',
    contentVn:
      'Thử làm trên bảng con.\n\n' +
      '**a** $4.3 × 10^3$\n' +
      '**b** $56 × 10^4$\n' +
      '**c** $0.9 × 10^5$',
    contentFr:
      'Essaie sur ton ardoise.\n\n' +
      '**a** $4.3 × 10^3$\n' +
      '**b** $56 × 10^4$\n' +
      '**c** $0.9 × 10^5$',
    notes: [
      {
        tone: 'write',
        text: 'Multiplying by $10^n$ moves every digit **n places left**.\nAdding zeros only works when there is no decimal point.',
        textVn: 'Nhân với $10^n$ làm mọi chữ số dịch **n cột sang trái**.\nThêm số 0 chỉ đúng khi số không có dấu thập phân.',
        textFr: 'Multiplier par $10^n$ décale chaque chiffre de **n rangs à gauche**.\nAjouter des zéros ne marche que s’il n’y a pas de point décimal.',
      },
    ],
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 4300, **b** 560000, **c** 90000',
      answerVn: '**a** 4300, **b** 560000, **c** 90000',
      answerFr: '**a** 4300, **b** 560000, **c** 90000',
    },
  },

  // 11. Dividing — the other direction, and where placeholder zeros come from
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ArrowRight',
    eyebrow: 'The other way',
    eyebrowVn: 'Chiều ngược lại',
    eyebrowFr: 'Dans l’autre sens',
    title: 'Dividing Moves Right',
    titleVn: 'Chia thì dịch sang phải',
    titleFr: 'Diviser décale à droite',
    ratio: 50,
    content:
      'Try these on your whiteboard.\n\n' +
      '**a** $7000 ÷ 10^2$\n' +
      '**b** $520 ÷ 10^4$\n' +
      '**c** $6 ÷ 10^3$',
    contentVn:
      'Thử làm trên bảng con.\n\n' +
      '**a** $7000 ÷ 10^2$\n' +
      '**b** $520 ÷ 10^4$\n' +
      '**c** $6 ÷ 10^3$',
    contentFr:
      'Essaie sur ton ardoise.\n\n' +
      '**a** $7000 ÷ 10^2$\n' +
      '**b** $520 ÷ 10^4$\n' +
      '**c** $6 ÷ 10^3$',
    notes: [
      {
        tone: 'write',
        text: 'Dividing by $10^n$ moves every digit **n places right**.\nA zero that appears is holding a column open. It is a placeholder.',
        textVn: 'Chia cho $10^n$ làm mọi chữ số dịch **n cột sang phải**.\nSố 0 xuất hiện là để giữ chỗ cho một cột.',
        textFr: 'Diviser par $10^n$ décale chaque chiffre de **n rangs à droite**.\nUn zéro qui apparaît garde une colonne ouverte. Il tient la place.',
      },
    ],
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 70, **b** 0.052, **c** 0.006',
      answerVn: '**a** 70, **b** 0.052, **c** 0.006',
      answerFr: '**a** 70, **b** 0.052, **c** 0.006',
    },
  },

  // 12. Quick-fire game
  {
    layout: 'game',
    title: 'Which Way?',
    titleVn: 'Đi hướng nào?',
    titleFr: 'Quel sens ?',
    widget: WhichWay,
  },

  // 13. The missing power
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Search',
    eyebrow: 'Find the power',
    eyebrowVn: 'Tìm số mũ',
    eyebrowFr: 'Trouve l’exposant',
    title: 'What Is Missing?',
    titleVn: 'Còn thiếu gì?',
    titleFr: 'Que manque-t-il ?',
    notes: [
      {
        tone: 'task',
        text: 'Count how many places the digits have moved. That is the power.',
        textVn: 'Đếm xem các chữ số đã dịch mấy cột. Đó chính là số mũ.',
        textFr: 'Compte de combien de rangs les chiffres ont bougé. C’est l’exposant.',
      },
    ],
    reveal: {
      prompt: '**a** $6.1 × 10^? = 61000$\n**b** $900 ÷ 10^? = 0.09$',
      promptVn: '**a** $6.1 × 10^? = 61000$\n**b** $900 ÷ 10^? = 0.09$',
      promptFr: '**a** $6.1 × 10^? = 61000$\n**b** $900 ÷ 10^? = 0.09$',
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $10^4$, because the digits moved 4 places left.\n**b** $10^4$, because they moved 4 places right.',
      answerVn: '**a** $10^4$, vì các chữ số dịch 4 cột sang trái.\n**b** $10^4$, vì chúng dịch 4 cột sang phải.',
      answerFr: '**a** $10^4$, car les chiffres ont bougé de 4 rangs à gauche.\n**b** $10^4$, car ils ont bougé de 4 rangs à droite.',
    },
  },

  // 14. Two moves in a row
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Repeat',
    eyebrow: 'One move after another',
    eyebrowVn: 'Dịch nhiều lần',
    eyebrowFr: 'Un déplacement après l’autre',
    title: 'Mr Bowen Keeps Going',
    titleVn: 'Thầy Bowen làm tiếp',
    titleFr: 'M. Bowen continue',
    ratio: 50,
    content:
      'Mr Bowen starts with **5**.\n\n' +
      'He multiplies by $10^4$, then divides by $10^2$, then multiplies by $10^3$.\n\n' +
      'Is that the same as multiplying by $10^5$?',
    contentVn:
      'Thầy Bowen bắt đầu với **5**.\n\n' +
      'Thầy nhân với $10^4$, rồi chia cho $10^2$, rồi nhân với $10^3$.\n\n' +
      'Như vậy có giống nhân với $10^5$ không?',
    contentFr:
      'M. Bowen part de **5**.\n\n' +
      'Il multiplie par $10^4$, puis divise par $10^2$, puis multiplie par $10^3$.\n\n' +
      'Est-ce pareil que multiplier par $10^5$ ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: 'Yes. Left 4, then right 2, then left 3. That is 5 places left.\n\n$5 × 10^5 = 500000$',
      answerVn: 'Có. Trái 4, phải 2, trái 3 là 5 cột sang trái.\n\n$5 × 10^5 = 500000$',
      answerFr: 'Oui. 4 à gauche, puis 2 à droite, puis 3 à gauche. Ça fait 5 rangs à gauche.\n\n$5 × 10^5 = 500000$',
    },
  },

  // 15. Metric mass — the real payoff for ×10³
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'Where this is used',
    eyebrowVn: 'Dùng ở đâu',
    eyebrowFr: 'À quoi ça sert',
    title: 'Milligrams to Tonnes',
    titleVn: 'Từ miligam đến tấn',
    titleFr: 'Des milligrammes aux tonnes',
    ratio: 40,
    inlineSvg: DIAGRAMS.MASS_LADDER,
    content: 'Every step on the ladder is $10^3$.',
    contentVn: 'Mỗi bậc trên thang đều là $10^3$.',
    contentFr: 'Chaque marche de l’échelle vaut $10^3$.',
    notes: [
      {
        tone: 'write',
        text: '$1 g = 1000 mg$ and $1 kg = 1000 g$ and $1 t = 1000 kg$\nEach step down is $× 10^3$. Each step up is $÷ 10^3$.',
        textVn: '$1 g = 1000 mg$ và $1 kg = 1000 g$ và $1 t = 1000 kg$\nMỗi bậc xuống là $× 10^3$. Mỗi bậc lên là $÷ 10^3$.',
        textFr: '$1 g = 1000 mg$ et $1 kg = 1000 g$ et $1 t = 1000 kg$\nChaque marche vers le bas, c’est $× 10^3$. Chaque marche vers le haut, c’est $÷ 10^3$.',
      },
    ],
    reveal: {
      label: 'How many mg in 4 kg?',
      labelVn: '4 kg bằng bao nhiêu mg?',
      labelFr: 'Combien de mg dans 4 kg ?',
      answer: 'Two steps down, so $× 10^6$.\n\n$4 kg = 4000000 mg$',
      answerVn: 'Hai bậc xuống, nên $× 10^6$.\n\n$4 kg = 4000000 mg$',
      answerFr: 'Deux marches vers le bas, donc $× 10^6$.\n\n$4 kg = 4000000 mg$',
    },
  },

  // 16. Distances from Earth — compare the power before counting digits
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Telescope',
    eyebrow: 'Real distances',
    eyebrowVn: 'Khoảng cách thật',
    eyebrowFr: 'De vraies distances',
    title: 'How Far Away?',
    titleVn: 'Xa bao nhiêu?',
    titleFr: 'À quelle distance ?',
    ratio: 45,
    image: moon,
    content:
      'The Moon is $3.844 × 10^5$ km from Earth.\n\n' +
      'Jupiter is $6.287 × 10^8$ km from Earth.\n\n' +
      'Write both as ordinary numbers.',
    contentVn:
      'Mặt Trăng cách Trái Đất $3.844 × 10^5$ km.\n\n' +
      'Sao Mộc cách Trái Đất $6.287 × 10^8$ km.\n\n' +
      'Hãy viết cả hai thành số thường.',
    contentFr:
      'La Lune est à $3.844 × 10^5$ km de la Terre.\n\n' +
      'Jupiter est à $6.287 × 10^8$ km de la Terre.\n\n' +
      'Écris les deux comme des nombres ordinaires.',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: 'Moon: 384400 km. Jupiter: 628700000 km.\n\nThe **power** told you which was further before you wrote anything.',
      answerVn: 'Mặt Trăng: 384400 km. Sao Mộc: 628700000 km.\n\n**Số mũ** đã cho biết cái nào xa hơn trước khi em viết gì cả.',
      answerFr: 'Lune : 384400 km. Jupiter : 628700000 km.\n\nL’**exposant** te disait laquelle était la plus loin avant même d’écrire.',
    },
  },

  // ══ THE HINGE · one table, used twice ═════════════════════════════════════
  // 17. End of period one, start of period two.
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Table',
    eyebrow: 'The same table, both ways',
    eyebrowVn: 'Cùng một bảng, hai chiều',
    eyebrowFr: 'Le même tableau, dans les deux sens',
    title: 'Place Value',
    titleVn: 'Giá trị theo vị trí',
    titleFr: 'Valeur de position',
    inlineSvg: DIAGRAMS.PLACE_TABLE,
    caption: 'Now we choose **where to stop** on the right.',
    captionVn: 'Bây giờ ta chọn **dừng ở đâu** về phía bên phải. (tenths = phần mười, hundredths = phần trăm, thousandths = phần nghìn)',
    captionFr: 'Maintenant, on choisit **où s’arrêter** à droite. (tenths = dixièmes, hundredths = centièmes, thousandths = millièmes)',
  },

  // 18. End of period one. Half the checklist, while half the deck is fresh.
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'End of part 1',
    eyebrowVn: 'Hết phần 1',
    eyebrowFr: 'Fin de la partie 1',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    titleFr: 'Sais-tu faire ça ?',
    content: '> Check your notebook: **5 written panels** so far.',
    contentVn: '> Kiểm tra vở: **5 khung ghi chép** cho đến giờ.',
    contentFr: '> Vérifie ton cahier : **5 encadrés recopiés** pour l’instant.',
    items: [
      { text: 'Say what a **power** is, and read $10^3$ out loud.', textVn: 'Nói được **số mũ** là gì, và đọc $10^3$ thành lời.', textFr: 'Dire ce qu’est un **exposant**, et lire $10^3$ à voix haute.' },
      { text: 'Know that the power counts the **zeros**.', textVn: 'Biết số mũ đếm số **số 0**.', textFr: 'Savoir que l’exposant compte les **zéros**.' },
      { text: 'Multiply by $10^n$: move the digits **left**.', textVn: 'Nhân với $10^n$: dịch chữ số sang **trái**.', textFr: 'Multiplier par $10^n$ : décaler les chiffres à **gauche**.' },
      { text: 'Divide by $10^n$: move the digits **right**.', textVn: 'Chia cho $10^n$: dịch chữ số sang **phải**.', textFr: 'Diviser par $10^n$ : décaler les chiffres à **droite**.' },
      { text: 'Change mg to g to kg to t.', textVn: 'Đổi mg sang g sang kg sang tấn.', textFr: 'Convertir des mg en g, en kg, en t.' },
    ],
  },

  // ══ PART B · 3.2 ROUNDING ═════════════════════════════════════════════════
  // 19. Key word: round, off a scale that is already rounding for them
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Round',
    titleVn: 'Làm tròn',
    titleFr: 'Arrondir',
    ratio: 45,
    image: scale,
    content: 'This scale says **82 g**. It is not exactly 82 g.',
    contentVn: 'Cân này ghi **82 g**. Thật ra không đúng chính xác 82 g.',
    contentFr: 'Cette balance affiche **82 g**. Ce n’est pas exactement 82 g.',
    notes: [
      {
        tone: 'write',
        text: '**Round:** write a number in a simpler form that is close to it.\nVietnamese says it well: làm tròn means "make it round".',
        textVn: '**Làm tròn (round):** viết một số ở dạng đơn giản hơn nhưng gần bằng nó.\nTiếng Anh "round" cũng có nghĩa là "tròn", giống tiếng Việt.',
        textFr: '**Arrondir (round) :** écrire un nombre sous une forme plus simple, proche de lui.\nEn français aussi, arrondir veut dire « rendre rond ».',
      },
    ],
  },

  // 20. English check — the instruction words. The most valuable slide in part B.
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    eyebrowFr: 'Point d’anglais',
    title: 'What the Question Asks',
    titleVn: 'Câu hỏi yêu cầu gì',
    titleFr: 'Ce que demande la question',
    inlineSvg: DIAGRAMS.ROUND_WORDS,
    caption: 'Three of these are one job. One is not.',
    captionVn: 'Ba dòng đầu là cùng một việc. Dòng cuối thì không.',
    captionFr: 'Trois de ces lignes font le même travail. Une, non.',
  },

  // 21. Copy the instruction words
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Exam words',
    eyebrowVn: 'Từ trong đề thi',
    eyebrowFr: 'Mots d’examen',
    title: 'Same Job, Different Words',
    titleVn: 'Cùng một việc, khác cách nói',
    titleFr: 'Même travail, mots différents',
    notes: [
      {
        tone: 'write',
        text: '**round to** 2 d.p. and **correct to** 2 d.p. and **to 2 decimal places** all mean the same job.\n**as far as** 2 d.p. does not: it means keep going, do not round.',
        textVn: '**round to** 2 d.p., **correct to** 2 d.p. và **to 2 decimal places** đều là cùng một việc.\n**as far as** 2 d.p. thì khác: nghĩa là cứ tính tiếp, chưa làm tròn.',
        textFr: '**round to** 2 d.p., **correct to** 2 d.p. et **to 2 decimal places** veulent tous dire la même chose.\n**as far as** 2 d.p., non : ça veut dire continuer, sans arrondir.',
      },
    ],
  },

  // 22. Degree of accuracy, on a watch that has chosen one
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Timer',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mots clés',
    title: 'Degree of Accuracy',
    titleVn: 'Độ chính xác',
    titleFr: 'Degré de précision',
    ratio: 45,
    image: stopwatch,
    content: 'This watch stops at **2 decimal places**. The scale stopped at **1 gram**.',
    contentVn: 'Đồng hồ này dừng ở **2 chữ số thập phân**. Cái cân thì dừng ở **1 gam**.',
    contentFr: 'Ce chrono s’arrête à **2 décimales**. La balance s’arrêtait à **1 gramme**.',
    notes: [
      {
        tone: 'write',
        text: '**Degree of accuracy:** how exact the answer has to be.\nThe question always tells you. Do not choose your own.',
        textVn: '**Độ chính xác (degree of accuracy):** đáp án cần chính xác đến mức nào.\nĐề bài luôn nói rõ. Đừng tự chọn theo ý mình.',
        textFr: '**Degré de précision (degree of accuracy) :** à quel point la réponse doit être exacte.\nLa question te le dit toujours. Ne choisis pas toi-même.',
      },
    ],
  },

  // 23. Counting decimal places
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Hash',
    eyebrow: 'Count carefully',
    eyebrowVn: 'Đếm cho kỹ',
    eyebrowFr: 'Compte bien',
    title: 'Decimal Places',
    titleVn: 'Chữ số thập phân',
    titleFr: 'Décimales',
    ratio: 40,
    inlineSvg: DIAGRAMS.DP_COUNT,
    content: 'Start counting at the point, not at the front.',
    contentVn: 'Bắt đầu đếm từ dấu thập phân, không phải từ đầu số.',
    contentFr: 'Commence à compter au point, pas au début.',
    notes: [
      {
        tone: 'write',
        text: '**Decimal places (d.p.):** the digits after the decimal point.\n$3.14159$ has 5 decimal places. $28.6$ has 1.',
        textVn: '**Chữ số thập phân (decimal places, d.p.):** các chữ số sau dấu thập phân.\n$3.14159$ có 5 chữ số thập phân. $28.6$ có 1.',
        textFr: '**Décimales (decimal places, d.p.) :** les chiffres après le point décimal.\n$3.14159$ a 5 décimales. $28.6$ en a 1.',
      },
    ],
  },

  // 24. The rule, on a number line so the 5 is honest
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Ruler',
    eyebrow: 'Which one is nearer?',
    eyebrowVn: 'Gần cái nào hơn?',
    eyebrowFr: 'Lequel est le plus proche ?',
    title: 'The Rule',
    titleVn: 'Quy tắc',
    titleFr: 'La règle',
    ratio: 40,
    inlineSvg: DIAGRAMS.ROUND_LINE,
    content: 'Rounding means picking the nearer one.',
    contentVn: 'Làm tròn là chọn số gần hơn.',
    contentFr: 'Arrondir, c’est choisir le plus proche.',
    notes: [
      {
        tone: 'write',
        text: 'Look at the **next digit** after the place you want.\n5 or more: round up. 4 or less: leave it.',
        textVn: 'Nhìn vào **chữ số ngay sau** vị trí em cần.\nTừ 5 trở lên: làm tròn lên. Từ 4 trở xuống: giữ nguyên.',
        textFr: 'Regarde le **chiffre suivant**, juste après le rang voulu.\n5 ou plus : arrondis au-dessus. 4 ou moins : ne change rien.',
      },
    ],
  },

  // 25. Practice, 1 d.p.
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowVn: 'Bảng con',
    eyebrowFr: 'Ardoises',
    title: 'Round to 1 d.p.',
    titleVn: 'Làm tròn đến 1 chữ số thập phân',
    titleFr: 'Arrondis à 1 d.p.',
    ratio: 50,
    content:
      'Round each one to **1 decimal place**.\n\n' +
      '**a** $6.31$\n' +
      '**b** $2.78$\n' +
      '**c** $14.85$\n' +
      '**d** $0.649$',
    contentVn:
      'Làm tròn mỗi số đến **1 chữ số thập phân**.\n\n' +
      '**a** $6.31$\n' +
      '**b** $2.78$\n' +
      '**c** $14.85$\n' +
      '**d** $0.649$',
    contentFr:
      'Arrondis chacun à **1 décimale**.\n\n' +
      '**a** $6.31$\n' +
      '**b** $2.78$\n' +
      '**c** $14.85$\n' +
      '**d** $0.649$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 6.3, **b** 2.8, **c** 14.9, **d** 0.6',
      answerVn: '**a** 6.3, **b** 2.8, **c** 14.9, **d** 0.6',
      answerFr: '**a** 6.3, **b** 2.8, **c** 14.9, **d** 0.6',
    },
  },

  // 26. Ask before you tell: the trailing zero
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Something is strange',
    eyebrowVn: 'Có gì đó lạ',
    eyebrowFr: 'Quelque chose cloche',
    title: 'Try This One',
    titleVn: 'Thử câu này',
    titleFr: 'Essaie celle-ci',
    text: 'Round $34.9892$ to 1 decimal place.',
    textVn: 'Làm tròn $34.9892$ đến 1 chữ số thập phân.',
    textFr: 'Arrondis $34.9892$ à 1 décimale.',
    sub: 'Write your answer. Do not say it yet.',
    subVn: 'Viết đáp án ra. Chưa nói vội.',
    subFr: 'Écris ta réponse. Ne la dis pas encore.',
  },

  // 27. Keep the zero
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'This one costs marks',
    eyebrowVn: 'Lỗi này mất điểm',
    eyebrowFr: 'Celle-ci coûte des points',
    title: 'Keep the Zero',
    titleVn: 'Giữ lại số 0',
    titleFr: 'Garde le zéro',
    ratio: 40,
    inlineSvg: DIAGRAMS.KEEP_ZERO,
    content: '**35.0** is right. The zero is doing a job.',
    contentVn: '**35.0** mới đúng. Số 0 đó có nhiệm vụ riêng.',
    contentFr: '**35.0** est juste. Le zéro a un rôle.',
    notes: [
      {
        tone: 'write',
        text: 'Never delete a zero at the end of a rounded answer.\n$34.9892$ to 1 d.p. is $35.0$, because $35$ shows no decimal place.',
        textVn: 'Không bao giờ bỏ số 0 ở cuối đáp án đã làm tròn.\n$34.9892$ đến 1 d.p. là $35.0$, vì $35$ không có chữ số thập phân nào.',
        textFr: 'Ne supprime jamais un zéro à la fin d’une réponse arrondie.\n$34.9892$ à 1 d.p. donne $35.0$, car $35$ ne montre aucune décimale.',
      },
    ],
  },

  // 28. Practice, 2 and 3 d.p.
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowVn: 'Bảng con',
    eyebrowFr: 'Ardoises',
    title: 'Two Places, Then Three',
    titleVn: 'Hai chữ số, rồi ba',
    titleFr: 'Deux décimales, puis trois',
    ratio: 50,
    content:
      'Round **a** and **b** to 2 d.p. Round **c** and **d** to 3 d.p.\n\n' +
      '**a** $5.372$\n' +
      '**b** $0.0961$\n' +
      '**c** $8.24618$\n' +
      '**d** $1.99952$',
    contentVn:
      'Làm tròn **a** và **b** đến 2 d.p. Làm tròn **c** và **d** đến 3 d.p.\n\n' +
      '**a** $5.372$\n' +
      '**b** $0.0961$\n' +
      '**c** $8.24618$\n' +
      '**d** $1.99952$',
    contentFr:
      'Arrondis **a** et **b** à 2 d.p. Arrondis **c** et **d** à 3 d.p.\n\n' +
      '**a** $5.372$\n' +
      '**b** $0.0961$\n' +
      '**c** $8.24618$\n' +
      '**d** $1.99952$',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 5.37, **b** 0.10, **c** 8.246, **d** 2.000',
      answerVn: '**a** 5.37, **b** 0.10, **c** 8.246, **d** 2.000',
      answerFr: '**a** 5.37, **b** 0.10, **c** 8.246, **d** 2.000',
    },
  },

  // ── STOPPING TOO EARLY ────────────────────────────────────────────────────
  // 29. Ask before you tell. No numbers, no answer.
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Two methods',
    eyebrowVn: 'Hai cách làm',
    eyebrowFr: 'Deux méthodes',
    title: 'Only One Works',
    titleVn: 'Chỉ một cách đúng',
    titleFr: 'Une seule marche',
    text: 'Work out $58 ÷ 7$, correct to 3 decimal places.',
    textVn: 'Tính $58 ÷ 7$, chính xác đến 3 chữ số thập phân.',
    textFr: 'Calcule $58 ÷ 7$, arrondi à 3 décimales.',
    sub: 'Where do you stop dividing?',
    subVn: 'Em dừng chia ở đâu?',
    subFr: 'Où t’arrêtes-tu de diviser ?',
  },

  // 30. Vote 2
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowVn: 'Biểu quyết bằng một tay',
    eyebrowFr: 'Vote avec une main',
    title: 'Two Pairs Disagree',
    titleVn: 'Hai cặp không đồng ý',
    titleFr: 'Deux binômes ne sont pas d’accord',
    text: '$58 ÷ 7$, correct to 3 d.p.',
    textVn: '$58 ÷ 7$, chính xác đến 3 d.p.',
    textFr: '$58 ÷ 7$, arrondi à 3 d.p.',
    columns: [
      {
        heading: 'A · left hand up',
        headingVn: 'A · giơ tay trái',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_8285,
      },
      {
        heading: 'B · right hand up',
        headingVn: 'B · giơ tay phải',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_8286,
      },
    ],
  },

  // 31. The division, settled
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Divide',
    eyebrow: 'Go one place further',
    eyebrowVn: 'Đi thêm một cột',
    eyebrowFr: 'Va un rang plus loin',
    title: 'Where to Stop',
    titleVn: 'Dừng ở đâu',
    titleFr: 'Où s’arrêter',
    inlineSvg: DIAGRAMS.DIVIDE_STEPS,
    caption: 'This is why **as far as** and **correct to** are different words.',
    captionVn: 'Đây chính là lý do **as far as** và **correct to** là hai cách nói khác nhau.',
    captionFr: 'Voilà pourquoi **as far as** et **correct to** sont des mots différents.',
  },

  // 32. Copy the rule, then use it
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'The rule',
    eyebrowVn: 'Quy tắc',
    eyebrowFr: 'La règle',
    title: 'One Place Further',
    titleVn: 'Thêm một cột nữa',
    titleFr: 'Un rang de plus',
    notes: [
      {
        tone: 'write',
        text: 'To round to $n$ places, work the answer out to $n + 1$ places first.\nThen round once, and only once.',
        textVn: 'Muốn làm tròn đến $n$ cột, hãy tính đến $n + 1$ cột trước.\nRồi làm tròn một lần duy nhất.',
        textFr: 'Pour arrondir à $n$ rangs, calcule d’abord jusqu’à $n + 1$ rangs.\nPuis arrondis une fois, une seule.',
      },
    ],
    reveal: {
      prompt: 'Work out $23 ÷ 9$, correct to 2 d.p.',
      promptVn: 'Tính $23 ÷ 9$, chính xác đến 2 d.p.',
      promptFr: 'Calcule $23 ÷ 9$, arrondi à 2 d.p.',
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '$23 ÷ 9 = 2.555...$\n\nTo 3 places that is $2.555$, so to 2 places it is **2.56**.',
      answerVn: '$23 ÷ 9 = 2.555...$\n\nĐến 3 cột là $2.555$, nên đến 2 cột là **2.56**.',
      answerFr: '$23 ÷ 9 = 2.555...$\n\nÀ 3 rangs, c’est $2.555$, donc à 2 rangs, c’est **2.56**.',
    },
  },

  // 33. One number, many degrees of accuracy
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Layers',
    eyebrow: 'Same number, five answers',
    eyebrowVn: 'Cùng một số, năm đáp án',
    eyebrowFr: 'Même nombre, cinq réponses',
    title: 'How Exact?',
    titleVn: 'Chính xác đến đâu?',
    titleFr: 'Précis à quel point ?',
    ratio: 50,
    content:
      'Write $283.4617529$ correct to:\n\n' +
      '**a** the nearest 10\n' +
      '**b** the nearest whole number\n' +
      '**c** 1 d.p.\n' +
      '**d** 2 d.p.\n' +
      '**e** 3 d.p.',
    contentVn:
      'Viết $283.4617529$ chính xác đến:\n\n' +
      '**a** hàng chục gần nhất\n' +
      '**b** số nguyên gần nhất\n' +
      '**c** 1 d.p.\n' +
      '**d** 2 d.p.\n' +
      '**e** 3 d.p.',
    contentFr:
      'Écris $283.4617529$ arrondi :\n\n' +
      '**a** à la dizaine près\n' +
      '**b** à l’unité près\n' +
      '**c** à 1 d.p.\n' +
      '**d** à 2 d.p.\n' +
      '**e** à 3 d.p.',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 280, **b** 283, **c** 283.5, **d** 283.46, **e** 283.462',
      answerVn: '**a** 280, **b** 283, **c** 283.5, **d** 283.46, **e** 283.462',
      answerFr: '**a** 280, **b** 283, **c** 283.5, **d** 283.46, **e** 283.462',
    },
  },

  // 34. Find the mistakes
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
    contentFr: 'M. Bowen s’est donné **4 sur 4**.\n\nTrouve ses **quatre** erreurs.',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer:
        '**a** 4600: the digits move, he added zeros.\n' +
        '**b** 4.8: he moved 3 places, not 4.\n' +
        '**c** 10.0: the 9 carries.\n' +
        '**d** 2.74: he rounded twice.',
      answerVn:
        '**a** 4600: chữ số dịch chuyển, thầy lại thêm số 0.\n' +
        '**b** 4.8: thầy dịch 3 cột thay vì 4.\n' +
        '**c** 10.0: số 9 phải nhớ sang.\n' +
        '**d** 2.74: thầy làm tròn hai lần.',
      answerFr:
        '**a** 4600 : les chiffres bougent, il a ajouté des zéros.\n' +
        '**b** 4.8 : il a décalé de 3 rangs, pas 4.\n' +
        '**c** 10.0 : le 9 fait une retenue.\n' +
        '**d** 2.74 : il a arrondi deux fois.',
    },
  },

  // ── WORD PROBLEMS (deadpan, and they get sillier) ─────────────────────────
  // 35. Two sensible ones
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Read it, then work',
    eyebrowVn: 'Đọc kỹ, rồi làm',
    eyebrowFr: 'Lis, puis calcule',
    title: 'Word Problems',
    titleVn: 'Bài toán có lời văn',
    titleFr: 'Problèmes',
    ratio: 50,
    content:
      '**1.** A red blood cell is $0.0065982$ mm long. Write this correct to 5 decimal places.\n\n' +
      '**2.** A bag of sugar has a mass of 2 kg. Write its mass in milligrams.',
    contentVn:
      '**1.** Một hồng cầu dài $0.0065982$ mm. Viết số này chính xác đến 5 chữ số thập phân.\n\n' +
      '**2.** Một túi đường nặng 2 kg. Viết khối lượng của nó theo miligam.',
    contentFr:
      '**1.** Un globule rouge mesure $0.0065982$ mm de long. Écris ce nombre arrondi à 5 décimales.\n\n' +
      '**2.** Un sac de sucre a une masse de 2 kg. Écris sa masse en milligrammes.',
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer: '**1.** 0.00660 mm. Keep that last zero.\n**2.** $2 × 10^6 = 2000000$ mg',
      answerVn: '**1.** 0.00660 mm. Nhớ giữ số 0 cuối cùng.\n**2.** $2 × 10^6 = 2000000$ mg',
      answerFr: '**1.** 0.00660 mm. Garde le dernier zéro.\n**2.** $2 × 10^6 = 2000000$ mg',
    },
  },

  // 36. Silly one
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Powers of 10',
    eyebrowVn: 'Lũy thừa của 10',
    eyebrowFr: 'Puissances de 10',
    title: "Mr Bowen's Rice",
    titleVn: 'Gạo của thầy Bowen',
    titleFr: 'Le riz de M. Bowen',
    content:
      'One grain of rice has a mass of 29 mg. Mr Bowen buys a 5 kg bag and offers to count the grains.\n\n' +
      'Write 5 kg in milligrams. About how many grains is that?',
    contentVn:
      'Một hạt gạo nặng 29 mg. Thầy Bowen mua một túi 5 kg và đề nghị đếm từng hạt.\n\n' +
      'Viết 5 kg theo miligam. Khoảng bao nhiêu hạt?',
    contentFr:
      'Un grain de riz a une masse de 29 mg. M. Bowen achète un sac de 5 kg et propose de compter les grains.\n\n' +
      'Écris 5 kg en milligrammes. Ça fait environ combien de grains ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '$5 kg = 5 × 10^6 = 5000000$ mg\n\n$5000000 ÷ 29 ≈ 172414$ grains.\n\nThe class said no.',
      answerVn: '$5 kg = 5 × 10^6 = 5000000$ mg\n\n$5000000 ÷ 29 ≈ 172414$ hạt.\n\nCả lớp đã từ chối.',
      answerFr: '$5 kg = 5 × 10^6 = 5000000$ mg\n\n$5000000 ÷ 29 ≈ 172414$ grains.\n\nLa classe a dit non.',
    },
  },

  // 37. Sillier one — and it shows what rounding hides
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Rounding',
    eyebrowVn: 'Làm tròn',
    eyebrowFr: 'Arrondis',
    title: "Mr Bowen's Cat",
    titleVn: 'Con mèo của thầy Bowen',
    titleFr: 'Le chat de M. Bowen',
    content:
      'Mr Bowen weighs his cat. It is exactly $4.5$ kg.\n\n' +
      'The cat then eats $0.0283$ kg of fish.\n\n' +
      'What is the cat now, correct to 1 decimal place?',
    contentVn:
      'Thầy Bowen cân con mèo. Nó nặng đúng $4.5$ kg.\n\n' +
      'Sau đó con mèo ăn $0.0283$ kg cá.\n\n' +
      'Bây giờ con mèo nặng bao nhiêu, chính xác đến 1 chữ số thập phân?',
    contentFr:
      'M. Bowen pèse son chat. Il fait exactement $4.5$ kg.\n\n' +
      'Puis le chat mange $0.0283$ kg de poisson.\n\n' +
      'Combien pèse le chat maintenant, arrondi à 1 décimale ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '$4.5 + 0.0283 = 4.5283$ kg, which is $4.5$ kg to 1 d.p.\n\nTo 1 decimal place, the cat has not changed. The fish has.',
      answerVn: '$4.5 + 0.0283 = 4.5283$ kg, làm tròn đến 1 d.p. là $4.5$ kg.\n\nĐến 1 chữ số thập phân, con mèo không đổi. Con cá thì có.',
      answerFr: '$4.5 + 0.0283 = 4.5283$ kg, soit $4.5$ kg à 1 d.p.\n\nÀ 1 décimale près, le chat n’a pas changé. Le poisson, si.',
    },
  },

  // ══ CLOSE ═════════════════════════════════════════════════════════════════
  // 38. Checklist
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
    content: '> Check your notebook: **12 written panels** in total.',
    contentVn: '> Kiểm tra vở: tổng cộng **12 khung ghi chép**.',
    contentFr: '> Vérifie ton cahier : **12 encadrés recopiés** en tout.',
    items: [
      { text: 'Count **decimal places** from the point.', textVn: 'Đếm **chữ số thập phân** từ dấu thập phân.', textFr: 'Compter les **décimales** à partir du point.' },
      { text: 'Round using the **next digit**.', textVn: 'Làm tròn dựa vào **chữ số ngay sau**.', textFr: 'Arrondir avec le **chiffre suivant**.' },
      { text: 'Write $35.0$, not $35$.', textVn: 'Viết $35.0$, không phải $35$.', textFr: 'Écrire $35.0$, pas $35$.' },
      { text: 'Know that **correct to** means round.', textVn: 'Biết **correct to** nghĩa là làm tròn.', textFr: 'Savoir que **correct to** veut dire arrondir.' },
      { text: 'Work one place further, then round once.', textVn: 'Tính thêm một cột, rồi làm tròn một lần.', textFr: 'Calculer un rang de plus, puis arrondir une fois.' },
    ],
  },

  // 39. Homework
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
    content: 'Before you answer, read the question twice. Underline the words that tell you **how exact**.',
    contentVn: 'Trước khi làm, hãy đọc đề hai lần. Gạch chân những từ cho biết **chính xác đến mức nào**.',
    contentFr: 'Avant de répondre, lis la question deux fois. Souligne les mots qui disent **à quel point être précis**.',
    notes: [
      {
        tone: 'homework',
        badge: 'Workbook 3.1 and 3.2',
        badgeVn: 'Vở bài tập 3.1 và 3.2',
        badgeFr: 'Cahier d’exercices 3.1 et 3.2',
        icon: 'Pencil',
        text: '**Focus** — everybody.\n**Practice** — everybody.\n**Challenge** — an attempt beats a blank.',
        textVn: '**Focus** — tất cả các em.\n**Practice** — tất cả các em.\n**Challenge** — làm sai vẫn hơn bỏ trống.',
        textFr: '**Focus** — tout le monde.\n**Practice** — tout le monde.\n**Challenge** — un essai vaut mieux qu’une page blanche.',
      },
    ],
  },

  // 40. Exit question — one from each half
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
    subtitle: 'Exit question: work out **6.5 × 10³**, then round **47.681** to 1 d.p.',
    subtitleVn: 'Câu hỏi ra về: tính **6.5 × 10³**, rồi làm tròn **47.681** đến 1 d.p.',
    subtitleFr: 'Question de sortie : calcule **6.5 × 10³**, puis arrondis **47.681** à 1 d.p.',
  },
]

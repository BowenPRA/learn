// content/y7-math/U01_6/slides.js
// Year 7 Mathematics · 1.6 Square Roots and Cube Roots. Monday 24 Aug 2026.
//
// Same house style as 1.1–1.5: teal section headers, purple activity boxes,
// red homework, and the book's orange for every key word students copy down.
// Anything they must write goes in an orange "Write This Down" panel or an
// orange `>` bumper — never plain body text.
//
// THREE THINGS SHAPE THIS DECK.
//
// 1. It is built THIN ON PURPOSE. 1.5 was a dense deck because the book left
//    the rules out and the deck had to supply nine of them. This section is the
//    opposite: five key words, two lists to learn, and one idea repeated twice.
//    So most slides here carry one picture, two or three lines of prose, and
//    at most one copy-down panel. If a slide felt like it wanted a fourth line,
//    the fourth line went to plan.js for the teacher to say out loud.
//
// 2. THE IDEA IS "THERE AND BACK", AND IT IS TAUGHT TWICE. Squaring goes out,
//    square rooting comes back; cubing goes out, cube rooting comes back.
//    ROOT_BOTH_WAYS and CUBE_ROOT_BOTH_WAYS are deliberately the same drawing
//    with different numbers, so the cube root arrives as a familiar idea with a
//    small 3 on the sign rather than as a second thing to memorise.
//
// 3. THE HOOK IS THE PATIO. Slide 2 puts 225 paving stones on the board and
//    asks how many run along one side — guesses only, no method, and crucially
//    the class cannot get there by squaring, because the question is already
//    pointing backwards. Everything from slide 4 to slide 8 builds the tool,
//    and slide 9 pays it off. Do not work it out early.
//
// The English beat is slide 3 and slide 15. "Square" and "cube" are shape words
// before they are number words, and this class knows the shapes — the chessboard
// and the sugar cubes are there so the maths word lands on something they can
// already see. "Consecutive" is the book's own key word and is the one piece of
// vocabulary here that will cost marks in the exercise if it is skipped.
//
// Source: Learner's Book Section 1.6, pages 17–19. Worked example 1.6 is the
// widget on slide 14. Nothing else from Exercise 1.6 is used in class, because
// that exercise is the homework — the in-class numbers are all original.
import { DIAGRAMS } from './diagrams.js'
import { WorkedExampleWidget } from './widgets.jsx'
import chessboard from './images/chessboard.jpg'
import sugarcubes from './images/sugarcubes.jpg'
import cubemelon from './images/cubemelon.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const RED = '#c8102e'

export const slides = [
  // ── Section 1: open, and pose the hook backwards ──────────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Boxes',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 1 · 1.6',
    eyebrowVn: 'Chương 1 · 1.6',
    eyebrowFr: 'Unité 1 · 1.6',
    date: '24 Aug 2026',
    title: 'Square Roots and Cube Roots',
    titleVn: 'Căn bậc hai và căn bậc ba',
    titleFr: 'Racines carrées et racines cubiques',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      badgeFr: 'Pour commencer',
      text: 'No calculators. Work out **7 × 7**, then **2 × 2 × 2**. Both answers go on your whiteboard.',
      textVn: 'Không dùng máy tính. Tính **7 × 7**, rồi **2 × 2 × 2**. Viết cả hai đáp án lên bảng con.',
      textFr: 'Sans calculatrice. Calcule **7 × 7**, puis **2 × 2 × 2**. Écris les deux réponses sur ton ardoise.',
    },
  },
  {
    // The hook. It points BACKWARDS from the start: the class is given the
    // answer to a multiplication and asked for the number that went in. That
    // is the whole lesson, four slides before the word "root" appears.
    layout: 'statement',
    accent: TEAL,
    eyebrow: 'In pairs — no calculators, two minutes',
    eyebrowVn: 'Theo cặp — không máy tính, hai phút',
    eyebrowFr: 'À deux — sans calculatrice, deux minutes',
    title: 'Mr Bowen’s Patio',
    titleVn: 'Sân gạch của thầy Bowen',
    titleFr: 'La terrasse de M. Bowen',
    label: 'Guess',
    labelVn: 'Hãy đoán',
    labelFr: 'Devine',
    labelIcon: 'MessageSquare',
    text: '**225 stones**',
    textVn: '**225 viên gạch**',
    textFr: '**225 pavés**',
    sub: 'They are laid in a **perfect square**. How many stones run along one side?',
    subVn: 'Chúng được lát thành một **hình vuông hoàn hảo**. Mỗi cạnh có bao nhiêu viên gạch?',
    subFr: 'Ils forment un **carré parfait**. Combien de pavés y a-t-il sur un côté ?',
    content: '> Write one number on your whiteboard. Guessing is fine.',
    contentVn: '> Hãy viết một con số lên bảng con. Đoán cũng được.',
    contentFr: '> Écris un nombre sur ton ardoise. Tu peux deviner.',
  },

  // ── Section 2: squares, from the shape to the notation ────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Grid3x3',
    side: 'left',
    eyebrow: 'Before any maths',
    eyebrowVn: 'Trước khi làm toán',
    eyebrowFr: 'Avant les maths',
    title: 'Count the Squares',
    titleVn: 'Đếm các ô vuông',
    titleFr: 'Compte les cases',
    ratio: 45,
    image: chessboard,
    content: 'Eight squares along the top. Eight squares down the side.\n\nHow many squares on the whole board — and how did you get there without counting them one by one?',
    contentVn: 'Tám ô dọc theo cạnh trên. Tám ô dọc theo cạnh bên.\n\nCả bàn cờ có bao nhiêu ô — và em tính ra bằng cách nào mà không phải đếm từng ô một?',
    contentFr: 'Huit cases en haut. Huit cases sur le côté.\n\nCombien de cases sur tout l’échiquier — et comment as-tu trouvé sans les compter une par une ?',
    reveal: {
      label: 'Show me',
      labelVn: 'Cho em xem',
      labelFr: 'Montre-moi',
      answer: '**64**, because $8 × 8 = 64$. You multiplied the side by itself. That is the whole idea of this lesson.',
      answerVn: '**64**, vì $8 × 8 = 64$. Em đã lấy cạnh nhân với chính nó. Đó chính là ý tưởng của cả bài học này.',
      answerFr: '**64**, car $8 × 8 = 64$. Tu as multiplié le côté par lui-même. C’est toute l’idée de cette leçon.',
    },
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    eyebrowFr: 'Mot clé',
    title: 'Square Number',
    titleVn: 'Số chính phương',
    titleFr: 'Nombre carré',
    ratio: 45,
    inlineSvg: DIAGRAMS.SQUARE_TILES,
    content: 'The word came from the picture. Multiply a number by itself and the tiles make a square.',
    contentVn: 'Tên gọi này đến từ hình vẽ. Nhân một số với chính nó, các viên gạch sẽ xếp thành hình vuông.',
    contentFr: 'Le mot vient du dessin. Multiplie un nombre par lui-même et les carreaux forment un carré.',
    notes: [
      {
        tone: 'write',
        text:
          '**Square number:** what you get when a number is multiplied by itself.\n' +
          '$5^2 = 5 × 5 = 25$ — say it as **five squared**.',
        textVn:
          '**Số chính phương (square number):** kết quả khi một số được nhân với chính nó.\n' +
          '$5^2 = 5 × 5 = 25$ — đọc là **five squared** (5 bình phương).',
        textFr:
          '**Nombre carré (square number) :** ce qu’on obtient quand on multiplie un nombre par lui-même.\n' +
          '$5^2 = 5 × 5 = 25$ — on dit **five squared** (5 au carré).',
      },
    ],
  },
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Layers',
    side: 'left',
    eyebrow: 'Learn these',
    eyebrowVn: 'Học thuộc bảng này',
    eyebrowFr: 'Apprends-les',
    title: 'The First Twelve',
    titleVn: 'Mười hai số đầu tiên',
    titleFr: 'Les douze premiers',
    ratio: 45,
    inlineSvg: DIAGRAMS.SQUARE_LIST,
    content: 'Every question in Exercise 1.6 is quicker if these are already in your head.',
    contentVn: 'Mọi câu trong Bài tập 1.6 sẽ nhanh hơn nhiều nếu em đã thuộc bảng này.',
    contentFr: 'Chaque question de l’exercice 1.6 va plus vite si tu les connais déjà par cœur.',
    notes: [
      {
        tone: 'write',
        text: 'Copy the twelve square numbers: **1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144**.',
        textVn: 'Chép lại mười hai số chính phương: **1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144**.',
        textFr: 'Recopie les douze nombres carrés : **1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144**.',
      },
    ],
  },
  {
    layout: 'split',
    accent: RED,
    icon: 'Equal',
    eyebrow: 'Quick question',
    eyebrowVn: 'Câu hỏi nhanh',
    eyebrowFr: 'Question rapide',
    title: 'Which One Is 5²?',
    titleVn: 'Cái nào là 5²?',
    titleFr: 'Lequel est 5² ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.SQUARED_NOT_DOUBLED,
    content: 'Both of these use a 5 and a 2. Only one of them is **five squared**.',
    contentVn: 'Cả hai đều dùng số 5 và số 2. Nhưng chỉ một trong hai là **năm bình phương**.',
    contentFr: 'Les deux utilisent un 5 et un 2. Un seul est **cinq au carré**.',
    reveal: {
      label: 'Say it out loud first',
      labelVn: 'Hãy nói to trước đã',
      labelFr: 'Dis-le d’abord à voix haute',
      answer: '$5^2 = 25$. The small 2 says **how many fives to multiply**, not what to multiply by.',
      answerVn: '$5^2 = 25$. Số 2 nhỏ cho biết **có bao nhiêu số 5 được nhân với nhau**, chứ không phải nhân với 2.',
      answerFr: '$5^2 = 25$. Le petit 2 dit **combien de 5 on multiplie**, pas par quoi on multiplie.',
    },
  },

  // ── Section 3: the same journey, backwards ────────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Same patio, harder question',
    eyebrowVn: 'Vẫn sân gạch đó, câu hỏi khó hơn',
    eyebrowFr: 'Même terrasse, question plus dure',
    title: 'Going Backwards',
    titleVn: 'Đi ngược lại',
    titleFr: 'En sens inverse',
    label: 'Discuss',
    labelVn: 'Thảo luận',
    labelFr: 'Discutez',
    labelIcon: 'MessageSquare',
    text: '? × ? = 225',
    textVn: '? × ? = 225',
    textFr: '? × ? = 225',
    sub: 'Squaring was easy. This is the same question **turned around** — and it needs a name.',
    subVn: 'Bình phương thì dễ. Đây vẫn là câu hỏi đó nhưng **lật ngược lại** — và nó cần một cái tên.',
    subFr: 'Mettre au carré, c’était facile. C’est la même question **à l’envers** — et elle a besoin d’un nom.',
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'RotateCcw',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    eyebrowFr: 'Mot clé',
    title: 'Square Root',
    titleVn: 'Căn bậc hai',
    titleFr: 'Racine carrée',
    ratio: 45,
    inlineSvg: DIAGRAMS.ROOT_BOTH_WAYS,
    content: 'A **root** is where something came from — the root of a plant, the root of a word. The square root of a number is the number it was squared from.',
    contentVn: '**Root** nghĩa là nơi một thứ bắt đầu — gốc của cây, gốc của một từ. Căn bậc hai của một số chính là số đã được bình phương để tạo ra nó.',
    contentFr: '**Root** (racine) veut dire d’où vient une chose — la racine d’une plante, d’un mot. La racine carrée d’un nombre est le nombre qu’on a mis au carré pour l’obtenir.',
    notes: [
      {
        tone: 'write',
        text:
          '**Square root:** the number that was multiplied by itself.\n' +
          '$\\sqrt{225} = 15$, because $15 × 15 = 225$.',
        textVn:
          '**Căn bậc hai (square root):** số đã được nhân với chính nó.\n' +
          '$\\sqrt{225} = 15$, vì $15 × 15 = 225$.',
        textFr:
          '**Racine carrée (square root) :** le nombre qui a été multiplié par lui-même.\n' +
          '$\\sqrt{225} = 15$, car $15 × 15 = 225$.',
      },
    ],
  },
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Back to the patio',
    eyebrowVn: 'Quay lại sân gạch',
    eyebrowFr: 'Retour à la terrasse',
    title: 'Fifteen Along Each Side',
    titleVn: 'Mỗi cạnh mười lăm viên',
    titleFr: 'Quinze sur chaque côté',
    inlineSvg: DIAGRAMS.PATIO_225,
    caption: 'How close was your guess? Two minutes ago this was guesswork; now it is a question you can answer.',
    captionVn: 'Em đoán gần đúng đến đâu? Hai phút trước đây còn là đoán mò; bây giờ nó là câu hỏi em trả lời được.',
    captionFr: 'Ton estimation était-elle proche ? Il y a deux minutes, tu devinais ; maintenant, tu sais répondre.',
  },

  // ── Section 4: cubes — the same idea, one dimension up ────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Box',
    side: 'left',
    eyebrow: 'Before any maths',
    eyebrowVn: 'Trước khi làm toán',
    eyebrowFr: 'Avant les maths',
    title: 'Count the Cubes',
    titleVn: 'Đếm các khối lập phương',
    titleFr: 'Compte les cubes',
    ratio: 45,
    image: sugarcubes,
    content: 'A box is packed with sugar cubes: **4 along**, **4 across**, **4 high**.\n\nHow many cubes are in the box?',
    contentVn: 'Một hộp được xếp đầy đường viên: **4 viên chiều dài**, **4 viên chiều rộng**, **4 viên chiều cao**.\n\nTrong hộp có bao nhiêu viên?',
    contentFr: 'Une boîte est remplie de sucres : **4 en longueur**, **4 en largeur**, **4 en hauteur**.\n\nCombien de cubes y a-t-il dans la boîte ?',
    reveal: {
      label: 'Show me',
      labelVn: 'Cho em xem',
      labelFr: 'Montre-moi',
      answer: '$4 × 4 × 4 = 64$. Same idea as the chessboard, with one more direction to fill.',
      answerVn: '$4 × 4 × 4 = 64$. Cùng ý tưởng với bàn cờ, chỉ thêm một chiều nữa phải lấp đầy.',
      answerFr: '$4 × 4 × 4 = 64$. Même idée que l’échiquier, avec une direction de plus à remplir.',
    },
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    eyebrowFr: 'Mot clé',
    title: 'Cube Number',
    titleVn: 'Số lập phương',
    titleFr: 'Nombre cubique',
    ratio: 45,
    inlineSvg: DIAGRAMS.CUBE_STACKS,
    content: 'Again the word came from the picture. Three of the same number, multiplied together, build a cube.',
    contentVn: 'Một lần nữa, tên gọi đến từ hình vẽ. Ba số giống nhau nhân với nhau sẽ dựng thành một khối lập phương.',
    contentFr: 'Là encore, le mot vient du dessin. Trois fois le même nombre, multipliés ensemble, forment un cube.',
    notes: [
      {
        tone: 'write',
        text:
          '**Cube number:** what you get when a number is multiplied by itself **twice**.\n' +
          '$2^3 = 2 × 2 × 2 = 8$ — say it as **two cubed**.',
        textVn:
          '**Số lập phương (cube number):** kết quả khi một số được nhân với chính nó **hai lần**.\n' +
          '$2^3 = 2 × 2 × 2 = 8$ — đọc là **two cubed** (2 lập phương).',
        textFr:
          '**Nombre cubique (cube number) :** ce qu’on obtient quand on multiplie un nombre par lui-même **deux fois**.\n' +
          '$2^3 = 2 × 2 × 2 = 8$ — on dit **two cubed** (2 au cube).',
      },
    ],
  },
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Layers',
    side: 'left',
    eyebrow: 'Learn these too',
    eyebrowVn: 'Cũng học thuộc bảng này',
    eyebrowFr: 'Apprends-les aussi',
    title: 'Only Six to Know',
    titleVn: 'Chỉ cần thuộc sáu số',
    titleFr: 'Seulement six à savoir',
    ratio: 45,
    inlineSvg: DIAGRAMS.CUBE_LIST,
    content: 'Cube numbers grow fast, so the list you need is short.',
    contentVn: 'Số lập phương tăng rất nhanh, nên bảng em cần thuộc khá ngắn.',
    contentFr: 'Les nombres cubiques grandissent vite, donc la liste est courte.',
    notes: [
      {
        tone: 'write',
        text: 'Copy the six cube numbers: **1, 8, 27, 64, 125, 216** — and **1000**, because $10 × 10 × 10 = 1000$.',
        textVn: 'Chép lại sáu số lập phương: **1, 8, 27, 64, 125, 216** — và **1000**, vì $10 × 10 × 10 = 1000$.',
        textFr: 'Recopie les six nombres cubiques : **1, 8, 27, 64, 125, 216** — et **1000**, car $10 × 10 × 10 = 1000$.',
      },
    ],
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'RotateCcw',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    eyebrowFr: 'Mot clé',
    title: 'Cube Root',
    titleVn: 'Căn bậc ba',
    titleFr: 'Racine cubique',
    ratio: 45,
    inlineSvg: DIAGRAMS.CUBE_ROOT_BOTH_WAYS,
    content: 'This is not a new idea. It is the picture you drew four slides ago, with a small **3** written on the sign.',
    contentVn: 'Đây không phải ý tưởng mới. Vẫn là hình em đã vẽ bốn trang trước, chỉ thêm số **3** nhỏ trên dấu căn.',
    contentFr: 'Ce n’est pas une idée nouvelle. C’est le dessin d’il y a quatre diapos, avec un petit **3** sur le symbole.',
    notes: [
      {
        tone: 'write',
        text:
          '**Cube root:** the number that was multiplied by itself twice.\n' +
          '$\\sqrt[3]{125} = 5$, because $5 × 5 × 5 = 125$.',
        textVn:
          '**Căn bậc ba (cube root):** số đã được nhân với chính nó hai lần.\n' +
          '$\\sqrt[3]{125} = 5$, vì $5 × 5 × 5 = 125$.',
        textFr:
          '**Racine cubique (cube root) :** le nombre qui a été multiplié par lui-même deux fois.\n' +
          '$\\sqrt[3]{125} = 5$, car $5 × 5 × 5 = 125$.',
      },
    ],
  },
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Calculator',
    side: 'left',
    eyebrow: 'Worked example 1.6, from the book',
    eyebrowVn: 'Ví dụ mẫu 1.6, trong sách',
    eyebrowFr: 'Exemple 1.6, tiré du livre',
    title: 'One Line at a Time',
    titleVn: 'Từng dòng một',
    titleFr: 'Une ligne à la fois',
    ratio: 45,
    content: 'Do each line on paper **before** Mr Bowen presses the button.',
    contentVn: 'Hãy làm từng dòng ra giấy **trước khi** thầy Bowen bấm nút.',
    contentFr: 'Fais chaque ligne sur papier **avant** que M. Bowen appuie sur le bouton.',
    notes: [
      {
        tone: 'task',
        badge: 'On your whiteboard',
        badgeVn: 'Trên bảng con',
        badgeFr: 'Sur ton ardoise',
        text: 'Roots first, subtraction last.',
        textVn: 'Tính căn trước, phép trừ sau cùng.',
        textFr: 'Les racines d’abord, la soustraction à la fin.',
      },
    ],
    widget: WorkedExampleWidget,
  },

  // ── Section 5: the book's last key word, then problems ────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Equal',
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    eyebrowFr: 'Chaque cours est un cours d’anglais',
    title: 'Consecutive',
    titleVn: 'Consecutive — Liên tiếp',
    titleFr: 'Consecutive — Consécutif',
    ratio: 45,
    inlineSvg: DIAGRAMS.CONSECUTIVE,
    content: 'The exercise uses this word without explaining it. **Consecutive square numbers** are next to each other **in the list of squares** — not one apart.',
    contentVn: 'Bài tập dùng từ này mà không giải thích. **Consecutive square numbers** là các số chính phương đứng cạnh nhau **trong bảng bình phương** — chứ không phải hơn kém nhau 1 đơn vị.',
    contentFr: 'L’exercice utilise ce mot sans l’expliquer. Les **consecutive square numbers** se suivent **dans la liste des carrés** — ils n’ont pas 1 d’écart.',
    notes: [
      {
        tone: 'write',
        text: '**Consecutive:** one after another, with nothing missed out. 25 and 36 are consecutive square numbers.',
        textVn: '**Liên tiếp (consecutive):** cái này nối tiếp cái kia, không bỏ sót cái nào. 25 và 36 là hai số chính phương liên tiếp.',
        textFr: '**Consécutifs (consecutive) :** l’un après l’autre, sans en sauter. 25 et 36 sont des nombres carrés consécutifs.',
      },
    ],
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    side: 'left',
    eyebrow: 'Problem 1',
    eyebrowVn: 'Bài 1',
    eyebrowFr: 'Problème 1',
    title: 'Trap the Root',
    titleVn: 'Kẹp căn lại',
    titleFr: 'Coince la racine',
    ratio: 45,
    inlineSvg: DIAGRAMS.BETWEEN_SQUARES,
    content: '45 is not in your list of squares, so $\\sqrt{45}$ is not a whole number.\n\nWhich **two whole numbers** is it between?',
    contentVn: '45 không nằm trong bảng số chính phương, nên $\\sqrt{45}$ không phải số nguyên.\n\nNó nằm giữa **hai số nguyên** nào?',
    contentFr: '45 n’est pas dans ta liste de carrés, donc $\\sqrt{45}$ n’est pas un nombre entier.\n\nEntre quels **deux nombres entiers** se trouve-t-il ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: 'Between **6 and 7**. 45 sits between 36 and 49, so its root sits between $\\sqrt{36}$ and $\\sqrt{49}$.',
      answerVn: 'Nằm giữa **6 và 7**. Vì 45 nằm giữa 36 và 49, nên căn của nó nằm giữa $\\sqrt{36}$ và $\\sqrt{49}$.',
      answerFr: 'Entre **6 et 7**. 45 est entre 36 et 49, donc sa racine est entre $\\sqrt{36}$ et $\\sqrt{49}$.',
    },
  },
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Sparkles',
    eyebrow: 'Problem 2',
    eyebrowVn: 'Bài 2',
    eyebrowFr: 'Problème 2',
    title: 'Mr Bowen’s Number',
    titleVn: 'Con số của thầy Bowen',
    titleFr: 'Le nombre de M. Bowen',
    ratio: 55,
    content:
      'Mr Bowen is thinking of a number.\n\n' +
      '> It is between **100 and 200**.\n' +
      '> Its **square root** is a multiple of **3**.\n\n' +
      'What is his number?',
    contentVn:
      'Thầy Bowen đang nghĩ đến một con số.\n\n' +
      '> Nó nằm giữa **100 và 200**.\n' +
      '> **Căn bậc hai** của nó là bội số của **3**.\n\n' +
      'Con số đó là bao nhiêu?',
    contentFr:
      'M. Bowen pense à un nombre.\n\n' +
      '> Il est entre **100 et 200**.\n' +
      '> Sa **racine carrée** est un multiple de **3**.\n\n' +
      'Quel est son nombre ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '**144.** The squares between 100 and 200 are 121, 144, 169 and 196. Their roots are 11, 12, 13 and 14 — and only 12 is a multiple of 3.',
      answerVn: '**144.** Các số chính phương giữa 100 và 200 là 121, 144, 169 và 196. Căn của chúng là 11, 12, 13 và 14 — và chỉ có 12 là bội số của 3.',
      answerFr: '**144.** Les carrés entre 100 et 200 sont 121, 144, 169 et 196. Leurs racines sont 11, 12, 13 et 14 — et seul 12 est un multiple de 3.',
    },
  },
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Sparkles',
    side: 'left',
    eyebrow: 'Problem 3',
    eyebrowVn: 'Bài 3',
    eyebrowFr: 'Problème 3',
    title: 'One Number, Two Names',
    titleVn: 'Một con số, hai tên gọi',
    titleFr: 'Un nombre, deux noms',
    ratio: 45,
    inlineSvg: DIAGRAMS.SIXTY_FOUR_TWICE,
    content: '**64** is on your list of squares. It is also on your list of cubes.\n\nWhich two multiplications put it on both lists?',
    contentVn: '**64** có trong bảng số chính phương của em. Nó cũng có trong bảng số lập phương.\n\nHai phép nhân nào đã đưa nó vào cả hai bảng?',
    contentFr: '**64** est dans ta liste de carrés. Il est aussi dans ta liste de cubes.\n\nQuelles deux multiplications le mettent dans les deux listes ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '$8 × 8 = 64$ and $4 × 4 × 4 = 64$. So $\\sqrt{64} = 8$ and $\\sqrt[3]{64} = 4$.',
      answerVn: '$8 × 8 = 64$ và $4 × 4 × 4 = 64$. Vậy $\\sqrt{64} = 8$ và $\\sqrt[3]{64} = 4$.',
      answerFr: '$8 × 8 = 64$ et $4 × 4 × 4 = 64$. Donc $\\sqrt{64} = 8$ et $\\sqrt[3]{64} = 4$.',
    },
  },

  // ── Section 6: two word problems, read completely straight ────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Problem 4',
    eyebrowVn: 'Bài 4',
    eyebrowFr: 'Problème 4',
    title: 'The Cube Watermelons',
    titleVn: 'Những quả dưa hấu lập phương',
    titleFr: 'Les pastèques cubiques',
    ratio: 55,
    side: 'left',
    image: cubemelon,
    content:
      'Mr Bowen grows **cube watermelons**. They stack better.\n\n' +
      'A crate holds **3 along, 3 across and 3 high**. How many watermelons fit in one crate?',
    contentVn:
      'Thầy Bowen trồng **dưa hấu hình lập phương**. Xếp chồng dễ hơn.\n\n' +
      'Một thùng chứa **3 quả chiều dài, 3 quả chiều rộng và 3 quả chiều cao**. Một thùng chứa được bao nhiêu quả dưa?',
    contentFr:
      'M. Bowen fait pousser des **pastèques cubiques**. Elles s’empilent mieux.\n\n' +
      'Une caisse en contient **3 en longueur, 3 en largeur et 3 en hauteur**. Combien de pastèques tiennent dans une caisse ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '$3 × 3 × 3 = 27$ watermelons. They are real — Japanese farmers grow them inside glass boxes.',
      answerVn: '$3 × 3 × 3 = 27$ quả dưa. Loại dưa này có thật — nông dân Nhật Bản trồng chúng trong hộp kính.',
      answerFr: '$3 × 3 × 3 = 27$ pastèques. Elles existent vraiment — des agriculteurs japonais les font pousser dans des boîtes en verre.',
    },
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Grid3x3',
    eyebrow: 'Problem 5',
    eyebrowVn: 'Bài 5',
    eyebrowFr: 'Problème 5',
    title: 'The Bathroom Wall',
    titleVn: 'Bức tường phòng tắm',
    titleFr: 'Le mur de la salle de bains',
    ratio: 55,
    content:
      'Mr Bowen tiles one bathroom wall with **576 square tiles**, in a perfect square.\n\n' +
      'How many tiles run along the bottom? Your list of squares will get you there.',
    contentVn:
      'Thầy Bowen lát một bức tường phòng tắm bằng **576 viên gạch vuông**, thành một hình vuông hoàn hảo.\n\n' +
      'Cạnh dưới có bao nhiêu viên gạch? Bảng số chính phương của em sẽ giúp em tìm ra.',
    contentFr:
      'M. Bowen carrelle un mur de la salle de bains avec **576 carreaux carrés**, en un carré parfait.\n\n' +
      'Combien de carreaux y a-t-il en bas ? Ta liste de carrés t’aidera.',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: '**24.** 576 is past the end of your list, so trap it: $20 × 20 = 400$ and $25 × 25 = 625$. The side is between 20 and 25, and $24 × 24 = 576$. Mr Bowen has three walls still to do.',
      answerVn: '**24.** 576 nằm ngoài bảng của em, nên hãy kẹp nó lại: $20 × 20 = 400$ và $25 × 25 = 625$. Cạnh nằm giữa 20 và 25, và $24 × 24 = 576$. Thầy Bowen vẫn còn ba bức tường nữa phải lát.',
      answerFr: '**24.** 576 est après la fin de ta liste, alors coince-le : $20 × 20 = 400$ et $25 × 25 = 625$. Le côté est entre 20 et 25, et $24 × 24 = 576$. M. Bowen a encore trois murs à faire.',
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
    title: 'Can You Do All Four?',
    titleVn: 'Em làm được cả bốn điều này chứ?',
    titleFr: 'Sais-tu faire les quatre ?',
    content:
      '> Your notebook should now have **5 key words** and **2 lists** — twelve square numbers and six cube numbers. Check that none is missing.',
    contentVn:
      '> Trong vở của em bây giờ phải có **5 từ khoá** và **2 bảng số** — mười hai số chính phương và sáu số lập phương. Hãy kiểm tra xem có thiếu cái nào không.',
    contentFr:
      '> Ton cahier doit maintenant avoir **5 mots clés** et **2 listes** — douze nombres carrés et six nombres cubiques. Vérifie qu’il n’en manque aucun.',
    items: [
      { text: 'Say what a **square number** and a **cube number** are, and read $7^2$ and $2^3$ out loud.', textVn: 'Nói được **số chính phương** và **số lập phương** là gì, và đọc to $7^2$ và $2^3$.', textFr: 'Dire ce qu’est un **nombre carré** et un **nombre cubique**, et lire $7^2$ et $2^3$ à voix haute.' },
      { text: 'Work out a **square root** and a **cube root** from the lists in your notebook.', textVn: 'Tính được **căn bậc hai** và **căn bậc ba** bằng hai bảng số trong vở.', textFr: 'Trouver une **racine carrée** et une **racine cubique** avec les listes de ton cahier.' },
      { text: 'Trap a root between **two whole numbers**, the way you did with $\\sqrt{45}$.', textVn: 'Kẹp một căn giữa **hai số nguyên**, như em đã làm với $\\sqrt{45}$.', textFr: 'Coincer une racine entre **deux nombres entiers**, comme avec $\\sqrt{45}$.' },
      { text: 'Use the word **consecutive** correctly about numbers.', textVn: 'Dùng đúng từ **consecutive (liên tiếp)** khi nói về các con số.', textFr: 'Utiliser correctement le mot **consecutive (consécutif)** pour des nombres.' },
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
    content: 'Your two lists are the tool. Keep the notebook open beside you — copying from your own list is not cheating.',
    contentVn: 'Hai bảng số của em chính là công cụ. Hãy để vở mở bên cạnh — nhìn vào bảng của chính mình không phải là gian lận.',
    contentFr: 'Tes deux listes sont ton outil. Garde ton cahier ouvert à côté de toi — copier ta propre liste, ce n’est pas tricher.',
    notes: [
      {
        tone: 'homework',
        badge: 'Section 1.6 · pages 17–19',
        badgeVn: 'Mục 1.6 · trang 17–19',
        badgeFr: 'Section 1.6 · pages 17–19',
        icon: 'Pencil',
        text:
          '**Focus** — Q1 to 5. Everybody.\n' +
          '**Practice** — Q6 to 11.\n' +
          '**Challenge** — Q12 to 16. An attempt beats a blank.',
        textVn:
          '**Focus** — câu 1 đến 5. Tất cả các em.\n' +
          '**Practice** — câu 6 đến 11.\n' +
          '**Challenge** — câu 12 đến 16. Làm sai vẫn hơn bỏ trống.',
        textFr:
          '**Focus** — Q1 à 5. Tout le monde.\n' +
          '**Practice** — Q6 à 11.\n' +
          '**Challenge** — Q12 à 16. Un essai vaut mieux qu’une page blanche.',
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
    subtitle: 'One idea, learned twice: squaring goes out, rooting comes back. Exit question: **what is $\\sqrt{81} + \\sqrt[3]{8}$?**',
    subtitleVn: 'Một ý tưởng, học hai lần: bình phương đi ra, khai căn đi về. Câu hỏi ra về: **$\\sqrt{81} + \\sqrt[3]{8}$ bằng bao nhiêu?**',
    subtitleFr: 'Une idée, apprise deux fois : le carré part, la racine revient. Question de sortie : **combien fait $\\sqrt{81} + \\sqrt[3]{8}$ ?**',
  },
]

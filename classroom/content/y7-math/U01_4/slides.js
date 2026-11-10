// content/y7-math/U01_4/slides.js
// Year 7 Mathematics · 1.4 Highest Common Factors. Monday 17 Aug 2026.
//
// Same house style as 1.1–1.3: teal section headers, purple activity boxes, red
// homework, and the book's orange for every key word students copy down.
// Anything they must write goes in an orange "Write This Down" panel or an
// orange `>` bumper — never plain body text.
//
// The spine is ENGLISH, not arithmetic. Most of this class already met this
// idea in Vietnamese school as "ước số chung lớn nhất" (ƯCLN); what is new is
// the English. Two language beats carry the lesson:
//
//   slide 4 — FACTOR vs MULTIPLE. Last lesson was multiples, this lesson is
//     factors, and the two words are the single most-confused pair in the unit.
//     A factor divides IN; a multiple is what you land ON.
//   slide 7 — why the book asked for the LOWEST common multiple but the
//     HIGHEST common factor. Because multiples never stop, so there is no
//     highest to ask for; factors stop, and the lowest common factor is always
//     1, which tells you nothing. This is the question every class half-asks
//     and nobody answers.
//
// The packing hook is posed on slide 2 with no method (24 pencils and 40
// stickers), and paid off on slide 9 once the class can answer it. Its HCF is
// 8, the same answer as the book's worked example on slide 8 — but a different
// pair, so nobody gets there by recognising the numbers.
//
// Source: Workbook Section 1.4, pages 14–15. The worked example (HCF of 24 and
// 80 = 8) is the book's own. Nothing from Exercise 1.4 is used in class,
// because that exercise is the homework — the in-class questions are original.
import { DIAGRAMS } from './diagrams.js'
import { HcfFinderWidget } from './widgets.jsx'
import books from './images/books.jpg'
import fruit from './images/fruit.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const RED = '#c8102e'

export const slides = [
  // ── Section 1: open, and pose the question with no method ────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Boxes',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 1 · 1.4',
    eyebrowVn: 'Chương 1 · 1.4',
    eyebrowFr: 'Unité 1 · 1.4',
    date: '17 Aug 2026',
    title: 'Highest Common Factors',
    titleVn: 'Ước số chung lớn nhất',
    titleFr: 'Plus grand diviseur commun',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      badgeFr: 'Pour commencer',
      text: 'Find **every pair** of whole numbers that multiplies to **12**. Then do the same for **18**. Keep both lists — we need them today.',
      textVn: 'Tìm **mọi cặp** số nguyên nhân với nhau bằng **12**. Rồi làm tương tự với **18**. Giữ lại cả hai danh sách — hôm nay ta sẽ cần đến chúng.',
      textFr: 'Trouve **toutes les paires** de nombres entiers dont le produit fait **12**. Puis fais pareil pour **18**. Garde les deux listes — on en a besoin aujourd’hui.',
    },
  },
  {
    layout: 'statement',
    accent: TEAL,
    eyebrow: 'In pairs — no calculators',
    eyebrowVn: 'Theo cặp — không dùng máy tính',
    eyebrowFr: 'À deux — sans calculatrice',
    title: 'How Many Packs Can He Make?',
    titleVn: 'Thầy có thể chia được bao nhiêu gói?',
    titleFr: 'Combien de paquets peut-il faire ?',
    label: 'Best guess',
    labelVn: 'Đoán thử',
    labelFr: 'Ton estimation',
    labelIcon: 'MessageSquare',
    text: 'Mr Bowen has **24 pencils** and **40 stickers**.',
    textVn: 'Thầy Bowen có **24 cây bút chì** và **40 cái sticker**.',
    textFr: 'M. Bowen a **24 crayons** et **40 autocollants**.',
    sub: 'He makes **identical packs** for the class — every pack exactly the same, and **nothing left over**. What is the **greatest number of packs** he can make? Write your best guess.',
    subVn: 'Thầy chia thành các **gói giống hệt nhau** cho lớp — mỗi gói y như nhau, và **không thừa thứ gì**. **Số gói nhiều nhất** thầy có thể chia là bao nhiêu? Hãy viết dự đoán của em.',
    subFr: 'Il fait des **paquets identiques** pour la classe — tous pareils, et **rien ne reste**. Quel est le **plus grand nombre de paquets** possible ? Écris ton estimation.',
  },

  // ── Section 2: the words, because that is where the marks go ──────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    eyebrowFr: 'Mot clé',
    title: 'Factor',
    titleVn: 'Factor — Ước số',
    titleFr: 'Factor — Diviseur',
    ratio: 45,
    inlineSvg: DIAGRAMS.FACTOR_PAIRS_12,
    content: 'A **factor** of 12 is a number that divides into 12 **exactly**, with nothing left over. You already found them in the starter by hunting for pairs.',
    contentVn: 'Một **ước số** của 12 là số mà 12 chia hết cho nó một cách **chính xác**, không dư gì cả. Em vừa tìm ra chúng trong bài khởi động khi đi tìm các cặp số.',
    contentFr: 'Un **diviseur** de 12 est un nombre qui divise 12 **exactement**, sans reste. Tu les as déjà trouvés au début, en cherchant les paires.',
    notes: [
      {
        tone: 'write',
        text: '**Factor:** a number that divides into another number exactly, with nothing left over. The factors of 12 are 1, 2, 3, 4, 6 and 12.',
        textVn: '**Ước số (factor):** số chia hết một số khác, không để lại số dư. Các ước số của 12 là 1, 2, 3, 4, 6 và 12.',
        textFr: '**Diviseur (factor) :** un nombre qui divise un autre nombre exactement, sans reste. Les diviseurs de 12 sont 1, 2, 3, 4, 6 et 12.',
      },
    ],
    reveal: {
      label: 'Is 5 a factor of 12?',
      labelVn: '5 có phải ước số của 12 không?',
      labelFr: '5 est-il un diviseur de 12 ?',
      answer:
        'No. $12 ÷ 5 = 2$ remainder 2 — something is **left over**, so 5 does not fit.\n\n' +
        'Notice that **1 and the number itself are always factors**. So 1 and 12 are on every factor list for 12.',
      answerVn:
        'Không. $12 ÷ 5 = 2$ dư 2 — vẫn **còn thừa**, nên 5 không chia hết.\n\n' +
        'Hãy để ý rằng **1 và chính số đó luôn là ước số**. Vậy 1 và 12 luôn có mặt trong danh sách ước số của 12.',
      answerFr:
        'Non. $12 ÷ 5 = 2$ reste 2 — il y a **un reste**, donc 5 ne va pas.\n\n' +
        'Remarque : **1 et le nombre lui-même sont toujours des diviseurs**. Donc 1 et 12 sont toujours dans la liste des diviseurs de 12.',
    },
  },
  {
    layout: 'compare',
    title: 'Factor or Multiple?',
    titleVn: 'Ước số hay bội số?',
    titleFr: 'Diviseur ou multiple ?',
    columns: [
      {
        heading: 'FACTOR — it divides IN',
        headingVn: 'ƯỚC SỐ — nó chia VÀO',
        headingFr: 'DIVISEUR — il entre DEDANS',
        accent: TEAL,
        icon: 'Target',
        inlineSvg: DIAGRAMS.DIVIDES_IN,
        content: 'A factor **goes into** the number. Factors are **smaller** than the number, or equal to it. The list **stops**.',
        contentVn: 'Ước số **chia vào** số đó. Ước số **nhỏ hơn** số đó, hoặc bằng chính nó. Danh sách **có điểm dừng**.',
        contentFr: 'Un diviseur **entre dans** le nombre. Les diviseurs sont **plus petits** que le nombre, ou égaux. La liste **s’arrête**.',
        notes: [
          {
            tone: 'write',
            text: '**Factors of 12:** 1, 2, 3, 4, 6, 12 — they divide in.',
            textVn: '**Ước số của 12:** 1, 2, 3, 4, 6, 12 — chúng chia vào 12.',
            textFr: '**Diviseurs de 12 :** 1, 2, 3, 4, 6, 12 — ils entrent dedans.',
          },
        ],
      },
      {
        heading: 'MULTIPLE — you land ON it',
        headingVn: 'BỘI SỐ — em đáp XUỐNG nó',
        headingFr: 'MULTIPLE — on tombe DESSUS',
        accent: PURPLE,
        icon: 'Repeat',
        inlineSvg: DIAGRAMS.LANDS_ON,
        content: 'A multiple is what you **get to** when you count up in that number. Multiples are **bigger**, or equal. The list **never stops**.',
        contentVn: 'Bội số là số em **đi tới** khi đếm lên theo số đó. Bội số **lớn hơn**, hoặc bằng. Danh sách **không bao giờ dừng**.',
        contentFr: 'Un multiple, c’est où tu **arrives** quand tu comptes de ce nombre en ce nombre. Les multiples sont **plus grands**, ou égaux. La liste **ne s’arrête jamais**.',
        notes: [
          {
            tone: 'write',
            text: '**Multiples of 12:** 12, 24, 36, 48, … — you land on them.',
            textVn: '**Bội số của 12:** 12, 24, 36, 48, … — em đáp xuống chúng.',
            textFr: '**Multiples de 12 :** 12, 24, 36, 48, … — on tombe dessus.',
          },
        ],
      },
    ],
  },

  // ── Section 3: build the definition, one word at a time ───────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Layers',
    title: 'Common Factors',
    titleVn: 'Ước số chung',
    titleFr: 'Diviseurs communs',
    ratio: 45,
    inlineSvg: DIAGRAMS.COMMON_FACTORS,
    content: 'Remember from last lesson: in maths **common** means **shared** — belonging to **both**. Write the factors of each number, then look for the ones in both lists.',
    contentVn: 'Nhớ lại bài trước: trong toán, **common** nghĩa là **chung** — thuộc về **cả hai**. Hãy viết ước số của mỗi số, rồi tìm những số có trong cả hai danh sách.',
    contentFr: 'Souviens-toi : en maths, **common** veut dire **partagé** — qui appartient **aux deux**. Écris les diviseurs de chaque nombre, puis cherche ceux qui sont dans les deux listes.',
    notes: [
      {
        tone: 'write',
        text: '**Common factor:** a number that is a factor of **both** numbers — it is in both lists. The common factors of 12 and 18 are 1, 2, 3 and 6.',
        textVn: '**Ước số chung (common factor):** một số là ước của **cả hai** số — có trong cả hai danh sách. Ước số chung của 12 và 18 là 1, 2, 3 và 6.',
        textFr: '**Diviseur commun (common factor) :** un nombre qui divise les **deux** nombres — il est dans les deux listes. Les diviseurs communs de 12 et 18 sont 1, 2, 3 et 6.',
      },
    ],
  },
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Target',
    side: 'left',
    eyebrow: 'The big word of the lesson',
    eyebrowVn: 'Từ quan trọng nhất của bài',
    eyebrowFr: 'Le grand mot de la leçon',
    title: 'Highest Common Factor (HCF)',
    titleVn: 'Ước số chung lớn nhất (ƯCLN)',
    titleFr: 'Plus grand diviseur commun (PGCD)',
    ratio: 45,
    inlineSvg: DIAGRAMS.HCF_LISTS,
    content: '**Highest** just means **biggest**. Out of all the common factors, the HCF is the biggest one.',
    contentVn: '**Highest** chỉ có nghĩa là **lớn nhất**. Trong tất cả các ước số chung, ƯCLN là số lớn nhất.',
    contentFr: '**Highest** veut juste dire **le plus grand**. Parmi tous les diviseurs communs, le PGCD est le plus grand.',
    notes: [
      {
        tone: 'write',
        text: '**Highest common factor (HCF):** the biggest number that is a factor of both numbers. The HCF of 12 and 18 is 6.',
        textVn: '**Ước số chung lớn nhất (ƯCLN):** số lớn nhất là ước của cả hai số. ƯCLN của 12 và 18 là 6.',
        textFr: '**Plus grand diviseur commun (PGCD) :** le plus grand nombre qui divise les deux nombres. Le PGCD de 12 et 18 est 6.',
      },
      {
        tone: 'info',
        badge: 'You may know this already',
        badgeVn: 'Có thể em đã biết',
        badgeFr: 'Tu le sais peut-être déjà',
        icon: 'Sparkles',
        text: 'This is the same idea as **ƯCLN** from your Vietnamese maths class. Today we are learning the **English words** for it.',
        textVn: 'Đây chính là ý tưởng **ƯCLN** trong môn Toán tiếng Việt. Hôm nay ta học **các từ tiếng Anh** cho nó.',
        textFr: 'Tu connais peut-être déjà cette idée : le **PGCD**. Aujourd’hui, on apprend les **mots anglais** pour le dire.',
      },
    ],
  },
  {
    layout: 'statement',
    accent: RED,
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    eyebrowFr: 'Chaque cours est un cours d’anglais',
    title: 'Why “Highest” This Time?',
    titleVn: 'Vì sao lần này lại là “lớn nhất”?',
    titleFr: 'Pourquoi « le plus grand » cette fois ?',
    label: 'Discuss',
    labelVn: 'Thảo luận',
    labelFr: 'Discutez',
    labelIcon: 'MessageSquare',
    text: 'Last lesson, the **lowest**. Today, the **highest**.',
    textVn: 'Bài trước là **nhỏ nhất**. Hôm nay là **lớn nhất**.',
    textFr: 'La dernière fois, le **plus petit**. Aujourd’hui, le **plus grand**.',
    sub: 'Why does the book swap ends?',
    subVn: 'Vì sao sách lại đổi đầu như vậy?',
    subFr: 'Pourquoi le livre change-t-il de côté ?',
    reveal: {
      label: 'Show me',
      labelVn: 'Cho em xem',
      labelFr: 'Montre-moi',
      answer:
        'Because one list **stops** and the other **never does**.\n\n' +
        'Multiples go on for ever, so there is **no highest** one — we ask for the lowest. Factors stop, so there **is** a highest one.',
      answerVn:
        'Vì một danh sách **có điểm dừng**, còn danh sách kia **thì không**.\n\n' +
        'Bội số kéo dài mãi mãi, nên **không có số lớn nhất** — ta hỏi số nhỏ nhất. Ước số dừng lại, nên **có** số lớn nhất.',
      answerFr:
        'Parce qu’une liste **s’arrête** et l’autre **jamais**.\n\n' +
        'Les multiples continuent sans fin, donc il n’y a **pas de plus grand** — on demande le plus petit. Les diviseurs s’arrêtent, donc il **y a** un plus grand.',
    },
  },

  // ── Section 4: the method, copied and then drilled ────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Equal',
    eyebrow: 'Copy the method',
    eyebrowVn: 'Chép lại cách làm',
    eyebrowFr: 'À recopier',
    title: 'Mr Bowen’s Method',
    titleVn: 'Cách làm của thầy Bowen',
    titleFr: 'La méthode Bowen',
    ratio: 45,
    inlineSvg: DIAGRAMS.METHOD_24_80,
    drawThis: true,
    content: 'Mr Bowen finds the HCF of 24 and 80. He lists the factors of each, then rings the **biggest** number that is in both.',
    contentVn: 'Thầy Bowen tìm ƯCLN của 24 và 80. Thầy liệt kê ước số của mỗi số, rồi khoanh **số lớn nhất** có trong cả hai.',
    contentFr: 'M. Bowen cherche le PGCD de 24 et 80. Il liste les diviseurs de chacun, puis entoure le **plus grand** nombre commun.',
    notes: [
      {
        tone: 'write',
        text:
          '**To find the HCF of two numbers:**\n' +
          '**1.** List the factors of each number.\n' +
          '**2.** Find the numbers that are in both lists.\n' +
          '**3.** The HCF is the highest of them.',
        textVn:
          '**Để tìm ƯCLN của hai số:**\n' +
          '**1.** Liệt kê ước số của mỗi số.\n' +
          '**2.** Tìm những số có trong cả hai danh sách.\n' +
          '**3.** ƯCLN là số lớn nhất trong đó.',
        textFr:
          '**Trouver le PGCD de deux nombres :**\n' +
          '**1.** Liste les diviseurs de chaque nombre.\n' +
          '**2.** Trouve les nombres des deux listes.\n' +
          '**3.** Le PGCD est le plus grand.',
      },
    ],
    exampleLabel: 'The answer',
    exampleLabelVn: 'Đáp án',
    exampleLabelFr: 'La réponse',
    example: 'The HCF of 24 and 80 is $8$.',
    exampleVn: 'ƯCLN của 24 và 80 là $8$.',
    exampleFr: 'Le PGCD de 24 et 80 est $8$.',
  },
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Boxes',
    eyebrow: 'Back to the pencils and the stickers',
    eyebrowVn: 'Quay lại chỗ bút chì và sticker',
    eyebrowFr: 'Retour aux crayons et aux autocollants',
    title: 'That Is Why He Can Make 8 Packs',
    titleVn: 'Đó là lý do thầy chia được 8 gói',
    titleFr: 'Voilà pourquoi il peut faire 8 paquets',
    inlineSvg: DIAGRAMS.PACKS_24_40,
    caption: '8 is the **HCF of 24 and 40**, so 8 is the greatest number of identical packs. Each pack gets $24 ÷ 8 = 3$ pencils and $40 ÷ 8 = 5$ stickers, with nothing left over. How close was your guess?',
    captionVn: '8 là **ƯCLN của 24 và 40**, nên 8 là số gói giống hệt nhau nhiều nhất. Mỗi gói có $24 ÷ 8 = 3$ cây bút chì và $40 ÷ 8 = 5$ cái sticker, không thừa gì. Dự đoán của em gần đến đâu?',
    captionFr: '8 est le **PGCD de 24 et 40**, donc 8 est le plus grand nombre de paquets identiques. Chaque paquet a $24 ÷ 8 = 3$ crayons et $40 ÷ 8 = 5$ autocollants, sans reste. Ton estimation était-elle proche ?',
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Repeat',
    title: 'Find the HCF',
    titleVn: 'Tìm ƯCLN',
    titleFr: 'Trouve le PGCD',
    ratio: 45,
    content: 'We will run the method on more pairs. Each time, **write the HCF on your whiteboard before it is shown**.',
    contentVn: 'Ta sẽ áp dụng cách làm cho nhiều cặp số hơn. Mỗi lần, hãy **viết ƯCLN lên bảng con trước khi nó hiện ra**.',
    contentFr: 'On applique la méthode à d’autres paires. À chaque fois, **écris le PGCD sur ton ardoise avant qu’il s’affiche**.',
    notes: [
      {
        tone: 'task',
        badge: 'On your whiteboard',
        badgeVn: 'Trên bảng con',
        badgeFr: 'Sur ton ardoise',
        text: 'Everyone writes the HCF **before** we press the button. List the factors if you need to.',
        textVn: 'Mọi người viết ƯCLN **trước khi** ta bấm nút. Cứ liệt kê ước số nếu cần.',
        textFr: 'Tout le monde écrit le PGCD **avant** qu’on appuie sur le bouton. Écris les diviseurs si besoin.',
      },
    ],
    widget: HcfFinderWidget,
  },
  {
    // Question and answer are two slides, not one with a reveal. Stacking the
    // prompt, a copy-down rule and a two-part answer in a single 55% column
    // overflowed a 768px projector by ~80px in Vietnamese, and asking first is
    // the better teaching move anyway.
    layout: 'split',
    accent: PURPLE,
    icon: 'AlertTriangle',
    eyebrow: 'Watch out',
    eyebrowVn: 'Cẩn thận',
    eyebrowFr: 'Attention',
    title: 'The HCF Is Never “None”',
    titleVn: 'ƯCLN không bao giờ là “không có”',
    titleFr: 'Le PGCD n’est jamais « aucun »',
    ratio: 55,
    content:
      'These two pairs catch people out. Work them out on your whiteboard before we turn the page.\n\n' +
      '> **A)**  the HCF of 8 and 9\n' +
      '> **B)**  the HCF of 6 and 18',
    contentVn:
      'Hai cặp này hay làm người ta mắc lỗi. Hãy làm ra bảng con trước khi ta sang trang.\n\n' +
      '> **A)**  ƯCLN của 8 và 9\n' +
      '> **B)**  ƯCLN của 6 và 18',
    contentFr:
      'Ces deux paires piègent beaucoup de monde. Fais-les sur ton ardoise avant qu’on tourne la page.\n\n' +
      '> **A)**  le PGCD de 8 et 9\n' +
      '> **B)**  le PGCD de 6 et 18',
  },
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'ShieldCheck',
    eyebrow: 'Both answers surprise people',
    eyebrowVn: 'Cả hai đáp án đều gây bất ngờ',
    eyebrowFr: 'Les deux réponses surprennent',
    title: 'One, and Six',
    titleVn: 'Một, và Sáu',
    titleFr: 'Un, et six',
    ratio: 55,
    content:
      '**A)** The HCF of 8 and 9 is $1$ — **not** “none”. Only 1 is in both lists.\n\n' +
      '**B)** The HCF of 6 and 18 is $6$, **not** 1 — 6 divides into 18.',
    contentVn:
      '**A)** ƯCLN của 8 và 9 là $1$ — **không phải** “không có”. Chỉ có 1 nằm ở cả hai danh sách.\n\n' +
      '**B)** ƯCLN của 6 và 18 là $6$, **không phải** 1 — vì 6 chia hết 18.',
    contentFr:
      '**A)** Le PGCD de 8 et 9 est $1$ — **pas** « aucun ». Seul 1 est dans les deux listes.\n\n' +
      '**B)** Le PGCD de 6 et 18 est $6$, **pas** 1 — 6 divise 18.',
    notes: [
      {
        tone: 'write',
        text: '**Careful:** **1** is a factor of every number, so two numbers **always** have a common factor. And if one number divides into the other, the HCF is the **smaller** number.',
        textVn: '**Cẩn thận:** **1** là ước số của mọi số, nên hai số **luôn** có ước số chung. Và nếu một số chia hết số kia, thì ƯCLN chính là **số nhỏ hơn**.',
        textFr: '**Attention :** **1** divise tous les nombres, donc deux nombres ont **toujours** un diviseur commun. Et si un nombre divise l’autre, le PGCD est le **plus petit** des deux.',
      },
    ],
  },

  // ── Section 5: word problems, getting steadily sillier ────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Problem 1',
    eyebrowVn: 'Bài 1',
    eyebrowFr: 'Problème 1',
    title: 'The Two Ribbons',
    titleVn: 'Hai dải ruy băng',
    titleFr: 'Les deux rubans',
    ratio: 50,
    inlineSvg: DIAGRAMS.RIBBONS_36_48,
    content:
      'Mr Bowen has two ribbons. One is **36 cm** long, the other is **48 cm** long.\n\n' +
      'He cuts both into equal pieces, **as long as possible**, with **nothing left over**.\n\n' +
      'How long is each piece?',
    contentVn:
      'Thầy Bowen có hai dải ruy băng. Một dải dài **36 cm**, dải kia dài **48 cm**.\n\n' +
      'Thầy cắt cả hai thành các đoạn bằng nhau, **dài nhất có thể**, và **không thừa mẩu nào**.\n\n' +
      'Mỗi đoạn dài bao nhiêu?',
    contentFr:
      'M. Bowen a deux rubans. L’un mesure **36 cm**, l’autre **48 cm**.\n\n' +
      'Il coupe les deux en morceaux égaux, **les plus longs possible**, **sans reste**.\n\n' +
      'Combien mesure chaque morceau ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: 'The HCF of 36 and 48 is $12$, so every piece is **12 cm**. That gives $36 ÷ 12 = 3$ pieces from the first ribbon and $48 ÷ 12 = 4$ from the second.',
      answerVn: 'ƯCLN của 36 và 48 là $12$, nên mỗi đoạn dài **12 cm**. Vậy dải thứ nhất cho $36 ÷ 12 = 3$ đoạn và dải thứ hai cho $48 ÷ 12 = 4$ đoạn.',
      answerFr: 'Le PGCD de 36 et 48 est $12$, donc chaque morceau mesure **12 cm**. Cela donne $36 ÷ 12 = 3$ morceaux pour le premier ruban et $48 ÷ 12 = 4$ pour le second.',
    },
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Problem 2',
    eyebrowVn: 'Bài 2',
    eyebrowFr: 'Problème 2',
    title: 'Mr Bowen’s Bookshelf',
    titleVn: 'Giá sách của thầy Bowen',
    titleFr: 'L’étagère de M. Bowen',
    ratio: 55,
    side: 'left',
    image: books,
    content:
      'There are **24 books** on Mr Bowen’s shelf. **18** of them are maths books.\n\n' +
      'Write the fraction of the books that are maths books, **in its simplest form**.',
    contentVn:
      'Trên giá sách của thầy Bowen có **24 quyển sách**. Trong đó **18** quyển là sách toán.\n\n' +
      'Hãy viết phân số chỉ phần sách toán, **ở dạng tối giản**.',
    contentFr:
      'Il y a **24 livres** sur l’étagère de M. Bowen. **18** sont des livres de maths.\n\n' +
      'Écris la fraction des livres qui sont des livres de maths, **sous forme irréductible**.',
    notes: [
      {
        tone: 'info',
        badge: false,
        text: '**simplest form** = written with the smallest numbers you can',
        textVn: '**simplest form** = dạng tối giản, viết bằng những số nhỏ nhất có thể',
        textFr: '**simplest form** = forme irréductible, écrite avec les plus petits nombres possibles',
      },
    ],
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: 'The fraction is $\\frac{18}{24}$. The HCF of 18 and 24 is $6$, so divide top and bottom by 6: $\\frac{18}{24} = \\frac{3}{4}$. **Three quarters** of the shelf is maths. The HCF is the shortcut that gets you there in one step.',
      answerVn: 'Phân số là $\\frac{18}{24}$. ƯCLN của 18 và 24 là $6$, nên chia cả tử và mẫu cho 6: $\\frac{18}{24} = \\frac{3}{4}$. **Ba phần tư** giá sách là sách toán. ƯCLN là lối tắt giúp em rút gọn chỉ trong một bước.',
      answerFr: 'La fraction est $\\frac{18}{24}$. Le PGCD de 18 et 24 est $6$, donc divise le haut et le bas par 6 : $\\frac{18}{24} = \\frac{3}{4}$. Les **trois quarts** de l’étagère sont des maths. Le PGCD est le raccourci qui y mène en une seule étape.',
    },
  },
  {
    // Also two slides. Splitting it puts each key word where it is earned:
    // "consecutive" is needed to read the question, "conjecture" is needed only
    // once the class has actually made one. Defining conjecture before they
    // have a pattern in front of them teaches the word and not the idea.
    layout: 'split',
    accent: PURPLE,
    icon: 'Sparkles',
    eyebrow: 'Investigate',
    eyebrowVn: 'Khám phá',
    eyebrowFr: 'Enquête',
    title: 'Numbers Next Door',
    titleVn: 'Những số nhà kề nhau',
    titleFr: 'Des nombres voisins',
    ratio: 55,
    content:
      'Find the HCF of each of these pairs.\n\n' +
      '> **A)** 9 and 10    **B)** 20 and 21    **C)** 32 and 33',
    contentVn:
      'Hãy tìm ƯCLN của từng cặp số sau.\n\n' +
      '> **A)** 9 và 10    **B)** 20 và 21    **C)** 32 và 33',
    contentFr:
      'Trouve le PGCD de chacune de ces paires.\n\n' +
      '> **A)** 9 et 10    **B)** 20 et 21    **C)** 32 et 33',
    notes: [
      {
        tone: 'write',
        text: '**Consecutive:** following one after the other when you count. 6 and 7 are consecutive; 6 and 8 are not.',
        textVn: '**Liên tiếp (consecutive):** đứng ngay sau nhau khi đếm. 6 và 7 là liên tiếp; 6 và 8 thì không.',
        textFr: '**Consécutifs (consecutive) :** qui se suivent quand on compte. 6 et 7 sont consécutifs ; 6 et 8 ne le sont pas.',
      },
    ],
  },
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Sparkles',
    eyebrow: 'You have just done what mathematicians do',
    eyebrowVn: 'Em vừa làm đúng việc các nhà toán học làm',
    eyebrowFr: 'Tu viens de faire comme les mathématiciens',
    title: 'All Three Are 1',
    titleVn: 'Cả ba đều bằng 1',
    titleFr: 'Les trois font 1',
    ratio: 55,
    content:
      'Every answer came out as **1**. Three cases is not a proof — but it is enough to make a **conjecture**.\n\n' +
      'Test it on 99 and 100. Does it still hold?',
    contentVn:
      'Mọi đáp án đều ra **1**. Ba trường hợp chưa phải là chứng minh — nhưng đủ để đưa ra một **phỏng đoán**.\n\n' +
      'Hãy thử với 99 và 100. Nó còn đúng không?',
    contentFr:
      'Chaque réponse fait **1**. Trois cas ne sont pas une preuve — mais ça suffit pour faire une **conjecture**.\n\n' +
      'Teste avec 99 et 100. Est-ce toujours vrai ?',
    notes: [
      {
        tone: 'write',
        text: '**Conjecture:** what you think is true because of a pattern you have seen, before anyone has proved it.\n**Our conjecture:** the HCF of two consecutive numbers is always 1.',
        textVn: '**Phỏng đoán (conjecture):** điều em cho là đúng dựa trên một quy luật em thấy, trước khi có ai chứng minh.\n**Phỏng đoán của lớp ta:** ƯCLN của hai số liên tiếp luôn bằng 1.',
        textFr: '**Conjecture :** ce que tu crois vrai à cause d’une régularité que tu as vue, avant que quelqu’un l’ait prouvé.\n**Notre conjecture :** le PGCD de deux nombres consécutifs est toujours 1.',
      },
    ],
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Problem 3',
    eyebrowVn: 'Bài 3',
    eyebrowFr: 'Problème 3',
    title: 'The Staff Room Fruit Baskets',
    titleVn: 'Những giỏ trái cây phòng giáo viên',
    titleFr: 'Les corbeilles de fruits de la salle des profs',
    ratio: 55,
    side: 'left',
    image: fruit,
    content:
      'Mr Bowen buys **30 bananas** and **45 oranges**. He makes **identical fruit baskets** for the staff room, using every piece of fruit, with **nothing left over**.\n\n' +
      'He wants **as many baskets as possible**. How many baskets, and what is in each one?',
    contentVn:
      'Thầy Bowen mua **30 quả chuối** và **45 quả cam**. Thầy làm những **giỏ trái cây giống hệt nhau** cho phòng giáo viên, dùng hết trái cây, **không thừa quả nào**.\n\n' +
      'Thầy muốn **càng nhiều giỏ càng tốt**. Bao nhiêu giỏ, và mỗi giỏ có gì?',
    contentFr:
      'M. Bowen achète **30 bananes** et **45 oranges**. Il fait des **corbeilles de fruits identiques** pour la salle des profs, avec tous les fruits, **sans reste**.\n\n' +
      'Il veut **le plus de corbeilles possible**. Combien de corbeilles, et que met-il dans chacune ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer:
        'The HCF of 30 and 45 is $15$, so **15 baskets**, each with $30 ÷ 15 = 2$ bananas and $45 ÷ 15 = 3$ oranges.\n\n' +
        'There are 12 teachers.',
      answerVn:
        'ƯCLN của 30 và 45 là $15$, vậy **15 giỏ**, mỗi giỏ có $30 ÷ 15 = 2$ quả chuối và $45 ÷ 15 = 3$ quả cam.\n\n' +
        'Trường có 12 giáo viên.',
      answerFr:
        'Le PGCD de 30 et 45 est $15$, donc **15 corbeilles**, chacune avec $30 ÷ 15 = 2$ bananes et $45 ÷ 15 = 3$ oranges.\n\n' +
        'Il y a 12 professeurs.',
    },
  },

  // ── Section 6: recap and homework ─────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you leave',
    eyebrowVn: 'Trước khi ra về',
    eyebrowFr: 'Avant de partir',
    title: 'Can You Do All Five?',
    titleVn: 'Em làm được cả năm điều này chứ?',
    titleFr: 'Sais-tu faire les cinq ?',
    content:
      '> Your notebook should now have **5 definitions** (factor, common factor, highest common factor, consecutive, conjecture) and **the HCF method** copied. Check.',
    contentVn:
      '> Trong vở của em bây giờ phải có **5 định nghĩa** (ước số, ước số chung, ước số chung lớn nhất, liên tiếp, phỏng đoán) và **cách tìm ƯCLN**. Hãy kiểm tra.',
    contentFr:
      '> Ton cahier doit maintenant avoir **5 définitions** (diviseur, diviseur commun, plus grand diviseur commun, consécutifs, conjecture) et **la méthode du PGCD**. Vérifie.',
    items: [
      { text: 'Say what a **factor** is — and how it differs from a **multiple**.', textVn: 'Nói được **ước số (factor)** là gì — và khác **bội số (multiple)** ra sao.', textFr: 'Dire ce qu’est un **diviseur (factor)** — et en quoi il diffère d’un **multiple**.' },
      { text: 'Find the **common factors** of two numbers.', textVn: 'Tìm được **ước số chung** của hai số.', textFr: 'Trouver les **diviseurs communs** de deux nombres.' },
      { text: 'Find the **highest common factor (HCF)**.', textVn: 'Tìm được **ước số chung lớn nhất (ƯCLN)**.', textFr: 'Trouver le **plus grand diviseur commun (PGCD)**.' },
      { text: 'Explain why we want the **highest** factor but the **lowest** multiple.', textVn: 'Giải thích được vì sao ta cần ước số **lớn nhất** nhưng bội số **nhỏ nhất**.', textFr: 'Expliquer pourquoi on veut le **plus grand** diviseur mais le **plus petit** multiple.' },
      { text: 'Use the HCF to **simplify a fraction**.', textVn: 'Dùng ƯCLN để **rút gọn một phân số**.', textFr: 'Utiliser le PGCD pour **simplifier une fraction**.' },
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
    content: 'Show the **factor lists** every time, and ring the HCF — not just the answer.',
    contentVn: 'Với mỗi câu hãy viết cả **danh sách ước số** và khoanh ƯCLN — không chỉ viết đáp án.',
    contentFr: 'Montre les **listes de diviseurs** à chaque fois, et entoure le PGCD — pas seulement la réponse.',
    notes: [
      {
        tone: 'homework',
        badge: 'Section 1.4 · pages 14–15',
        badgeVn: 'Mục 1.4 · trang 14–15',
        badgeFr: 'Section 1.4 · pages 14–15',
        icon: 'Pencil',
        text:
          '**Focus** — Q1 to 4. Everybody.\n' +
          '**Practice** — Q5 to 9.\n' +
          '**Challenge** — Q10 to 13. An attempt beats a blank.',
        textVn:
          '**Focus** — câu 1 đến 4. Tất cả các em.\n' +
          '**Practice** — câu 5 đến 9.\n' +
          '**Challenge** — câu 10 đến 13. Làm sai vẫn hơn bỏ trống.',
        textFr:
          '**Focus** — Q1 à 4. Tout le monde.\n' +
          '**Practice** — Q5 à 9.\n' +
          '**Challenge** — Q10 à 13. Un essai vaut mieux qu’une page blanche.',
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
    subtitle: 'You can find the highest common factor of two numbers, and you know that a factor divides in while a multiple is what you land on. Exit question: what is the **HCF of 7 and 14** — and why is it not 1?',
    subtitleVn: 'Em đã có thể tìm ước số chung lớn nhất của hai số, và biết rằng ước số thì chia vào, còn bội số là số em đáp xuống. Câu hỏi ra về: **ƯCLN của 7 và 14** là bao nhiêu — và vì sao không phải 1?',
    subtitleFr: 'Tu sais trouver le plus grand diviseur commun de deux nombres, et tu sais qu’un diviseur entre dedans, alors qu’on tombe sur un multiple. Question de sortie : quel est le **PGCD de 7 et 14** — et pourquoi ce n’est pas 1 ?',
  },
]

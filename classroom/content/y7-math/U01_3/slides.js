// content/y7-math/U01_3/slides.js
// Year 7 Mathematics · 1.3 Lowest Common Multiples. Thursday 13 Aug 2026.
//
// Same house style as 1.1 and 1.2: teal section headers, purple activity boxes,
// red homework, and the book's orange for every key word students copy down.
// Anything they must write goes in an orange "Write This Down" panel or an
// orange `>` bumper — never plain body text, and never game rules.
//
// The spine is ENGLISH, not arithmetic. Most of this class already met this
// idea in Vietnamese school as "bội số chung nhỏ nhất" (BCNN); what is new is
// three English words — multiple, common, lowest common multiple. So the lesson
// hangs on one language beat (slide 4): in everyday English "common" means
// ORDINARY, but in maths it means SHARED — a common multiple is one that is in
// both lists. The flashing-lights hook is posed on slide 2 with no method, and
// paid off on slide 7 once the class can answer it.
//
// Source: Workbook Section 1.3, pages 12–13. The worked example (LCM of 6 and 9
// = 18) is the book's own. Nothing from Exercise 1.3 is used in class, because
// that exercise is the homework — the in-class questions are original.
import { DIAGRAMS } from './diagrams.js'
import { LcmFinderWidget, HotDogClipWidget } from './widgets.jsx'
import bus from './images/bus.jpg'
import hotdog from './images/hotdog.jpg'
import tap from './images/tap.jpg'
import clock from './images/clock.jpg'

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
    eyebrow: 'Unit 1 · 1.3',
    eyebrowVn: 'Chương 1 · 1.3',
    eyebrowFr: 'Unité 1 · 1.3',
    date: '13 Aug 2026',
    title: 'Lowest Common Multiples',
    titleVn: 'Bội số chung nhỏ nhất',
    titleFr: 'Plus petit multiple commun',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      badgeFr: 'Pour commencer',
      text: 'Write down the first **eight multiples of 4**. Then the first **eight multiples of 6**. Keep both lists — we need them today.',
      textVn: 'Viết ra **tám bội số đầu tiên của 4**. Rồi **tám bội số đầu tiên của 6**. Giữ lại cả hai danh sách — hôm nay ta sẽ cần đến chúng.',
      textFr: 'Écris les **huit premiers multiples de 4**. Puis les **huit premiers multiples de 6**. Garde les deux listes — on en a besoin aujourd’hui.',
    },
  },
  {
    layout: 'statement',
    accent: TEAL,
    eyebrow: 'In pairs — no calculators',
    eyebrowVn: 'Theo cặp — không dùng máy tính',
    eyebrowFr: 'À deux — sans calculette',
    title: 'When Do They Meet Again?',
    titleVn: 'Khi nào chúng lại gặp nhau?',
    titleFr: 'Quand coïncident-elles ?',
    label: 'Best guess',
    labelVn: 'Đoán thử',
    labelFr: 'Devine',
    labelIcon: 'MessageSquare',
    text: 'A red light flashes every 4 seconds. A blue light flashes every 6 seconds.',
    textVn: 'Một đèn đỏ nháy mỗi 4 giây. Một đèn xanh nháy mỗi 6 giây.',
    textFr: 'Une lumière rouge clignote toutes les 4 s. Une bleue, toutes les 6 s.',
    sub: 'They have just flashed **at the same time**. After how many seconds will they **next** flash together? Write your best guess.',
    subVn: 'Chúng vừa nháy **cùng một lúc**. Sau bao nhiêu giây nữa chúng sẽ **lại** nháy cùng nhau? Hãy viết dự đoán của em.',
    subFr: 'Elles clignotent **en même temps**. Dans combien de secondes le feront-elles **de nouveau** ensemble ? Écris ton idée.',
  },

  // ── Section 2: the words, because that is where the marks go ──────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khoá',
    eyebrowFr: 'Mot clé',
    title: 'Multiple',
    titleVn: 'Multiple — Bội số',
    titleFr: 'Multiple',
    ratio: 45,
    inlineSvg: DIAGRAMS.MULTIPLES_OF_4,
    content: 'A **multiple** of 4 is what you get when you multiply 4 by 1, 2, 3, 4, … You already made two lists of multiples in the starter.',
    contentVn: 'Một **bội số** của 4 là số em nhận được khi nhân 4 với 1, 2, 3, 4, … Em vừa lập hai danh sách bội số trong bài khởi động.',
    contentFr: 'Un **multiple** de 4, c’est 4 multiplié par 1, 2, 3, 4, … Tu as déjà fait deux listes de multiples au début.',
    notes: [
      {
        tone: 'write',
        text: '**Multiple:** the answer when you multiply a number by 1, 2, 3, 4, … The multiples of 4 are 4, 8, 12, 16, 20, …',
        textVn: '**Bội số (multiple):** kết quả khi em nhân một số với 1, 2, 3, 4, … Các bội số của 4 là 4, 8, 12, 16, 20, …',
        textFr: '**Multiple :** le résultat d’un nombre × 1, 2, 3, 4, … Les multiples de 4 sont 4, 8, 12, 16, 20, …',
      },
    ],
    reveal: {
      label: 'Multiple or multiply?',
      labelVn: 'Bội số hay nhân?',
      labelFr: 'Multiple, multiplier ?',
      prompt: 'What is the difference between **multiply** and a **multiple**?',
      promptVn: 'Khác nhau giữa **multiply** (nhân) và **multiple** (bội số) là gì?',
      promptFr: 'Quelle différence entre **multiply** et un **multiple** ?',
      answer: '**Multiply** is the action — the thing you do. A **multiple** is the result — a number you land on. And do not mix it up with a **factor** (a number that divides in), which is next lesson.',
      answerVn: '**Multiply (nhân)** là hành động — việc em làm. **Multiple (bội số)** là kết quả — số em nhận được. Và đừng nhầm với **factor (ước số)** — số chia hết vào, đó là bài học sau.',
      answerFr: '**Multiply** : l’action, ce que tu fais. Un **multiple** : le résultat, le nombre obtenu. Ne confonds pas avec **factor** (diviseur) — c’est la prochaine leçon.',
    },
  },
  {
    layout: 'statement',
    accent: RED,
    eyebrow: 'Every class is an English class',
    eyebrowVn: 'Mỗi tiết học đều là tiết tiếng Anh',
    eyebrowFr: 'Chaque cours est un cours d’anglais',
    title: 'What Does “Common” Mean?',
    titleVn: 'Từ “common” nghĩa là gì?',
    titleFr: 'Que veut dire « common » ?',
    label: 'Discuss',
    labelVn: 'Thảo luận',
    labelFr: 'Discussion',
    labelIcon: 'MessageSquare',
    text: '“a common bird … a common name”',
    textVn: '“a common bird … a common name”',
    textFr: '« a common bird … a common name »',
    sub: 'In everyday English, **common** means **ordinary** — something you see a lot. Does it mean the same thing in maths?',
    subVn: 'Trong tiếng Anh hằng ngày, **common** nghĩa là **bình thường** — thứ em thấy rất nhiều. Trong toán nó có nghĩa như vậy không?',
    subFr: 'En anglais courant, **common** veut dire **ordinaire** — quelque chose qu’on voit souvent. Est-ce que ça veut dire la même chose en maths ?',
    reveal: {
      label: 'Show me',
      labelVn: 'Cho em xem',
      labelFr: 'Montre-moi',
      answer:
        'No. In maths, **common** means **shared** — belonging to **both**.\n\n' +
        'A **common multiple** is not a multiple you see often. It is a number that is in **both** lists at once.',
      answerVn:
        'Không. Trong toán, **common** nghĩa là **chung** — thuộc về **cả hai**.\n\n' +
        'Một **bội số chung** không phải là bội số em thấy thường xuyên. Đó là số có trong **cả hai** danh sách cùng lúc.',
      answerFr:
        'Non. En maths, **common** veut dire **partagé** — qui appartient **aux deux**.\n\n' +
        'Un **multiple commun** n’est pas un multiple qu’on voit souvent. C’est un nombre qui est dans les **deux** listes à la fois.',
    },
  },

  // ── Section 3: build the definition, one word at a time ───────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Layers',
    title: 'Common Multiples',
    titleVn: 'Bội số chung',
    titleFr: 'Multiples communs',
    ratio: 45,
    inlineSvg: DIAGRAMS.COMMON_MULTIPLES,
    content: 'To find them, write out the multiples of each number, then look for the ones that appear in **both** lists.',
    contentVn: 'Để tìm chúng, hãy viết ra bội số của mỗi số, rồi tìm những số xuất hiện trong **cả hai** danh sách.',
    contentFr: 'Pour les trouver, écris les multiples de chaque nombre, puis cherche ceux qui sont dans les **deux** listes.',
    notes: [
      {
        tone: 'write',
        text: '**Common multiple:** a number that is a multiple of **both** numbers — it is in both lists. The common multiples of 4 and 6 are 12, 24, 36, …',
        textVn: '**Bội số chung (common multiple):** một số là bội của **cả hai** số — có trong cả hai danh sách. Bội số chung của 4 và 6 là 12, 24, 36, …',
        textFr: '**Multiple commun (common multiple) :** un nombre qui est multiple des **deux** nombres — il est dans les deux listes. Les multiples communs de 4 et 6 sont 12, 24, 36, …',
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
    title: 'Lowest Common Multiple (LCM)',
    titleVn: 'Bội số chung nhỏ nhất (BCNN)',
    titleFr: 'Plus petit multiple commun (PPCM)',
    ratio: 45,
    inlineSvg: DIAGRAMS.LCM_LISTS,
    content: '**Lowest** just means **smallest**. Out of all the common multiples, the LCM is the smallest one.',
    contentVn: '**Lowest** chỉ có nghĩa là **nhỏ nhất**. Trong tất cả các bội số chung, BCNN là số nhỏ nhất.',
    contentFr: '**Lowest** veut juste dire **le plus petit**. Parmi tous les multiples communs, le PPCM est le plus petit.',
    notes: [
      {
        tone: 'write',
        text: '**Lowest common multiple (LCM):** the smallest number that is a multiple of both numbers. The LCM of 4 and 6 is 12.',
        textVn: '**Bội số chung nhỏ nhất (BCNN):** số nhỏ nhất là bội của cả hai số. BCNN của 4 và 6 là 12.',
        textFr: '**Plus petit multiple commun (PPCM) :** le plus petit nombre qui est multiple des deux nombres. Le PPCM de 4 et 6 est 12.',
      },
      {
        tone: 'info',
        badge: 'You may know this already',
        badgeVn: 'Có thể em đã biết',
        badgeFr: 'Tu le connais peut-être déjà',
        icon: 'Sparkles',
        text: 'This is the same idea as **BCNN** from your Vietnamese maths class. Today we are learning the **English words** for it.',
        textVn: 'Đây chính là ý tưởng **BCNN** trong môn Toán tiếng Việt. Hôm nay ta học **các từ tiếng Anh** cho nó.',
        textFr: 'Tu connais peut-être déjà cette idée : le **PPCM**. Aujourd’hui, on apprend les **mots anglais** pour le dire.',
      },
    ],
  },
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Zap',
    eyebrow: 'Back to the two lights',
    eyebrowVn: 'Quay lại hai chiếc đèn',
    eyebrowFr: 'Retour aux deux lumières',
    title: 'That Is Why They Meet at 12',
    titleVn: 'Đó là lý do chúng gặp nhau ở giây 12',
    titleFr: 'Voilà pourquoi elles se retrouvent à 12',
    inlineSvg: DIAGRAMS.LIGHTS_ALIGN,
    caption: 'The red light (every 4 s) and the blue light (every 6 s) only line up where their counts match — at 12 and 24 seconds. The first time is **12 seconds**, and 12 is the **LCM of 4 and 6**. How close was your guess?',
    captionVn: 'Đèn đỏ (mỗi 4 giây) và đèn xanh (mỗi 6 giây) chỉ trùng nhau ở chỗ số đếm khớp — tại giây 12 và 24. Lần đầu là **12 giây**, và 12 là **BCNN của 4 và 6**. Dự đoán của em gần đến đâu?',
    captionFr: 'La lumière rouge (toutes les 4 s) et la bleue (toutes les 6 s) ne coïncident que là où leurs comptes se rejoignent — à 12 et 24 secondes. La première fois, c’est à **12 secondes**, et 12 est le **PPCM de 4 et 6**. Ton idée était-elle proche ?',
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
    inlineSvg: DIAGRAMS.METHOD_69,
    drawThis: true,
    content: 'Mr Bowen finds the LCM of 6 and 9. He lists the multiples of each, then rings the **first** number that is in both.',
    contentVn: 'Thầy Bowen tìm BCNN của 6 và 9. Thầy liệt kê bội số của mỗi số, rồi khoanh **số đầu tiên** có trong cả hai.',
    contentFr: 'M. Bowen cherche le PPCM de 6 et 9. Il écrit leurs multiples, puis entoure le **premier** nombre commun aux deux.',
    notes: [
      {
        tone: 'write',
        text:
          '**To find the LCM of two numbers:**\n' +
          '**1.** List the multiples of each number.\n' +
          '**2.** Find the numbers that are in both lists.\n' +
          '**3.** The LCM is the lowest of them.',
        textVn:
          '**Để tìm BCNN của hai số:**\n' +
          '**1.** Liệt kê bội số của mỗi số.\n' +
          '**2.** Tìm những số có trong cả hai danh sách.\n' +
          '**3.** BCNN là số nhỏ nhất trong đó.',
        textFr:
          '**Trouver le PPCM de deux nombres :**\n' +
          '**1.** Écris les multiples de chacun.\n' +
          '**2.** Trouve ceux qui sont dans les deux.\n' +
          '**3.** Le PPCM est le plus petit.',
      },
    ],
    exampleLabel: 'The answer',
    exampleLabelVn: 'Đáp án',
    exampleLabelFr: 'La réponse',
    example: 'The LCM of 6 and 9 is $18$.',
    exampleVn: 'BCNN của 6 và 9 là $18$.',
    exampleFr: 'Le PPCM de 6 et 9 est $18$.',
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Repeat',
    title: 'Find the LCM',
    titleVn: 'Tìm BCNN',
    titleFr: 'Trouve le PPCM',
    ratio: 45,
    content: 'We will run the method on more pairs. Each time, **write the LCM on your whiteboard before it is shown**.',
    contentVn: 'Ta sẽ áp dụng cách làm cho nhiều cặp số hơn. Mỗi lần, hãy **viết BCNN lên bảng con trước khi nó hiện ra**.',
    contentFr: 'On va appliquer la méthode à d’autres paires. À chaque fois, **écris le PPCM sur ton tableau blanc avant qu’il s’affiche**.',
    notes: [
      {
        tone: 'task',
        badge: 'On your whiteboard',
        badgeVn: 'Trên bảng con',
        badgeFr: 'Sur ton tableau blanc',
        text: 'Everyone writes the LCM **before** we press the button. List the multiples if you need to.',
        textVn: 'Mọi người viết BCNN **trước khi** ta bấm nút. Cứ liệt kê bội số nếu cần.',
        textFr: 'Tout le monde écrit le PPCM **avant** qu’on appuie sur le bouton. Écris les multiples si tu en as besoin.',
      },
    ],
    widget: LcmFinderWidget,
  },
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'AlertTriangle',
    eyebrow: 'Watch out',
    eyebrowVn: 'Cẩn thận',
    eyebrowFr: 'Attention',
    title: 'Do Not Just Multiply Them',
    titleVn: 'Đừng vội nhân hai số với nhau',
    titleFr: 'Ne les multiplie pas tout de suite',
    ratio: 55,
    content:
      'The LCM is usually **smaller** than multiplying the two numbers together. Try these two — resist the urge to multiply.\n\n' +
      '> **A)**  the LCM of 4 and 8\n' +
      '> **B)**  the LCM of 3 and 5',
    contentVn:
      'BCNN thường **nhỏ hơn** tích của hai số. Hãy thử hai câu này — đừng vội nhân.\n\n' +
      '> **A)**  BCNN của 4 và 8\n' +
      '> **B)**  BCNN của 3 và 5',
    contentFr:
      'Le PPCM est souvent **plus petit** que le produit des deux nombres. Essaie ces deux-là — résiste à l’envie de multiplier.\n\n' +
      '> **A)**  le PPCM de 4 et 8\n' +
      '> **B)**  le PPCM de 3 et 5',
    notes: [
      {
        tone: 'write',
        text: '**Careful:** if one number divides into the other, the LCM is just the **bigger** number.',
        textVn: '**Cẩn thận:** nếu một số chia hết số kia, thì BCNN chính là **số lớn hơn**.',
        textFr: '**Attention :** si un nombre divise l’autre, le PPCM est simplement le **plus grand** des deux.',
      },
    ],
    reveal: {
      label: 'Check your answers',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie tes réponses',
      answer:
        '**A)** The LCM of 4 and 8 is $8$, **not** 32 — because 4 divides into 8.\n\n' +
        '**B)** The LCM of 3 and 5 is $15$. Here $3 × 5 = 15$ works, because their only common factor is 1. Multiplying is a lucky shortcut, not the rule — when in doubt, **list them**.',
      answerVn:
        '**A)** BCNN của 4 và 8 là $8$, **không** phải 32 — vì 4 chia hết 8.\n\n' +
        '**B)** BCNN của 3 và 5 là $15$. Ở đây $3 × 5 = 15$ đúng, vì ước số chung duy nhất của chúng là 1. Nhân chỉ là mẹo may mắn, không phải quy tắc — khi phân vân, hãy **liệt kê ra**.',
      answerFr:
        '**A)** Le PPCM de 4 et 8 est $8$, **pas** 32 — car 4 divise 8.\n\n' +
        '**B)** Le PPCM de 3 et 5 est $15$. Ici, $3 × 5 = 15$ marche, car leur seul diviseur commun est 1. Multiplier est un raccourci chanceux, pas la règle — dans le doute, **écris les listes**.',
    },
  },

  // ── Section 5: word problems, getting steadily sillier ────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Problem 1',
    eyebrowVn: 'Bài 1',
    eyebrowFr: 'Problème 1',
    title: 'The Two Buses',
    titleVn: 'Hai chuyến xe buýt',
    titleFr: 'Les deux bus',
    ratio: 55,
    image: bus,
    content:
      'Two buses leave Mr Bowen’s stop at exactly **7:00**.\n\n' +
      'Bus A leaves every **10 minutes**. Bus B leaves every **15 minutes**.\n\n' +
      'At what time do they next leave **together**?',
    contentVn:
      'Hai chuyến xe buýt rời trạm của thầy Bowen đúng lúc **7:00**.\n\n' +
      'Xe A chạy mỗi **10 phút**. Xe B chạy mỗi **15 phút**.\n\n' +
      'Lúc mấy giờ chúng lại cùng rời trạm **một lúc**?',
    contentFr:
      'Deux bus partent de l’arrêt de M. Bowen à **7:00** pile.\n\n' +
      'Le bus A part toutes les **10 minutes**. Le bus B part toutes les **15 minutes**.\n\n' +
      'À quelle heure repartent-ils **ensemble** ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: 'The LCM of 10 and 15 is $30$, so they leave together again **30 minutes** later — at **7:30**.',
      answerVn: 'BCNN của 10 và 15 là $30$, vậy chúng lại cùng rời trạm sau **30 phút** — lúc **7:30**.',
      answerFr: 'Le PPCM de 10 et 15 est $30$, donc ils repartent ensemble **30 minutes** plus tard — à **7:30**.',
    },
  },
  // The clip first, with NO numbers on the slide. George's rage is the hook;
  // the arithmetic is the next slide. Same move as the flashing lights.
  // `showcase`, not `split`: the clip is a vertical Short, and a split's media
  // panel is landscape — it squeezes the video to about 100px wide.
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Clapperboard',
    eyebrow: 'Father of the Bride (1991) · George is buying food for his daughter’s wedding',
    eyebrowVn: 'Cha của cô dâu (1991) · ông George mua đồ ăn cho đám cưới con gái',
    eyebrowFr: 'Le Père de la mariée (1991) · George achète à manger pour le mariage de sa fille',
    title: 'Why Is This Man So Angry?',
    titleVn: 'Vì sao ông ấy tức giận đến vậy?',
    titleFr: 'Pourquoi cet homme est-il si fâché ?',
    widget: HotDogClipWidget,
    caption: 'Not the price — the **packs**. Tell your partner: **what is his problem?**',
    captionVn: 'Không phải giá tiền — mà là các **gói hàng**. Nói với bạn: **vấn đề của ông ấy là gì?**',
    captionFr: 'Pas le prix — les **paquets**. Dis à ton voisin : **quel est son problème ?**',
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Problem 2',
    eyebrowVn: 'Bài 2',
    eyebrowFr: 'Problème 2',
    title: 'George’s Hot Dog Problem',
    titleVn: 'Bài toán xúc xích của ông George',
    titleFr: 'Les hot-dogs de George',
    ratio: 55,
    side: 'left',
    image: hotdog,
    content:
      'Hot dogs are sold in packs of **8**. Buns are sold in packs of **12**.\n\n' +
      'George wants the **same number** of each, with **none left over**.\n\n' +
      'What is the **smallest** number of each he can buy — and how many packs is that?',
    contentVn:
      'Xúc xích bán theo gói **8 cái**. Bánh mì bán theo gói **12 cái**.\n\n' +
      'Ông George muốn **số lượng bằng nhau**, **không thừa cái nào**.\n\n' +
      'Số **nhỏ nhất** mỗi loại ông có thể mua là bao nhiêu — và bằng mấy gói?',
    contentFr:
      'Les saucisses : paquets de **8**. Les pains : paquets de **12**.\n\n' +
      'George veut le **même nombre** de chaque, **sans reste**.\n\n' +
      'Quel est le **plus petit** nombre possible de chaque — et combien de paquets ?',
    notes: [
      {
        tone: 'info',
        badge: false,
        text: '**left over** = extra, with nothing to go with it',
        textVn: '**left over** = thừa ra, không có thứ đi kèm',
        textFr: '**left over** = en trop, sans son partenaire',
      },
    ],
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer:
        'The LCM of 8 and 12 is $24$. So **24 of each**: $24 ÷ 8 = 3$ packs of hot dogs and $24 ÷ 12 = 2$ packs of buns.\n\n' +
        'George does it the other way — he opens a pack and takes buns **out**. That is why he gets arrested.',
      answerVn:
        'BCNN của 8 và 12 là $24$. Vậy **24 cái mỗi loại**: $24 ÷ 8 = 3$ gói xúc xích và $24 ÷ 12 = 2$ gói bánh mì.\n\n' +
        'Ông George thì làm ngược lại — ông xé gói và lấy bớt bánh mì **ra**. Thế nên ông bị bắt.',
      answerFr:
        'Le PPCM de 8 et 12 est $24$. Donc **24 de chaque** : $24 ÷ 8 = 3$ paquets de saucisses, $24 ÷ 12 = 2$ de pains.\n\n' +
        'George fait l’inverse — il ouvre un paquet et **retire** des pains. Voilà pourquoi on l’arrête.',
    },
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Problem 3',
    eyebrowVn: 'Bài 3',
    eyebrowFr: 'Problème 3',
    title: 'The Two Taps',
    titleVn: 'Hai vòi nước',
    titleFr: 'Les deux robinets',
    ratio: 55,
    image: tap,
    content:
      'Mr Bowen has two dripping taps. One drips every **4 seconds**. The other drips every **12 seconds**.\n\n' +
      'They have just dripped at the same time. After how many seconds do they next drip **together**?',
    contentVn:
      'Thầy Bowen có hai vòi nước bị rỉ. Một vòi nhỏ giọt mỗi **4 giây**. Vòi kia mỗi **12 giây**.\n\n' +
      'Chúng vừa nhỏ giọt cùng lúc. Sau bao nhiêu giây nữa chúng lại nhỏ giọt **cùng nhau**?',
    contentFr:
      'M. Bowen a deux robinets qui fuient. L’un goutte toutes les **4 secondes**. L’autre toutes les **12 secondes**.\n\n' +
      'Ils viennent de goutter en même temps. Dans combien de secondes gouttent-ils de nouveau **ensemble** ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: 'The LCM of 4 and 12 is $12$, **not** 48 — 4 divides into 12. They drip together every **12 seconds**.',
      answerVn: 'BCNN của 4 và 12 là $12$, **không** phải 48 — 4 chia hết 12. Chúng nhỏ giọt cùng nhau mỗi **12 giây**.',
      answerFr: 'Le PPCM de 4 et 12 est $12$, **pas** 48 — 4 divise 12. Ils gouttent ensemble toutes les **12 secondes**.',
    },
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Problem 4',
    eyebrowVn: 'Bài 4',
    eyebrowFr: 'Problème 4',
    title: 'The Two Alarms',
    titleVn: 'Hai chiếc đồng hồ báo thức',
    titleFr: 'Les deux réveils',
    ratio: 55,
    side: 'left',
    image: clock,
    content:
      'Mr Bowen sets two alarms so he is not late. One rings every **15 minutes**. The other rings every **15 minutes**.\n\n' +
      'They have both just rung. After how many minutes will they next ring **together**?',
    contentVn:
      'Thầy Bowen đặt hai đồng hồ báo thức để khỏi trễ. Một cái reo mỗi **15 phút**. Cái kia reo mỗi **15 phút**.\n\n' +
      'Cả hai vừa reo. Sau bao nhiêu phút nữa chúng sẽ lại reo **cùng nhau**?',
    contentFr:
      'M. Bowen règle deux réveils pour ne pas être en retard. L’un sonne toutes les **15 minutes**. L’autre sonne toutes les **15 minutes**.\n\n' +
      'Ils viennent de sonner tous les deux. Dans combien de minutes vont-ils de nouveau sonner **ensemble** ?',
    reveal: {
      label: 'Check your answer',
      labelVn: 'Kiểm tra đáp án',
      labelFr: 'Vérifie ta réponse',
      answer: 'Every **15 minutes**. The LCM of 15 and 15 is 15 — the two numbers are the same, so the alarms were never apart. **Read both numbers** before you start.',
      answerVn: 'Mỗi **15 phút**. BCNN của 15 và 15 là 15 — hai số giống hệt nhau, nên hai đồng hồ chưa bao giờ lệch. **Đọc kỹ cả hai số** trước khi bắt đầu.',
      answerFr: 'Toutes les **15 minutes**. Le PPCM de 15 et 15 est 15 — les deux nombres sont identiques, donc les réveils n’ont jamais été décalés. **Lis les deux nombres** avant de commencer.',
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
      '> Your notebook should now have **3 definitions** (multiple, common multiple, lowest common multiple) and **the LCM method** copied. Check.',
    contentVn:
      '> Trong vở của em bây giờ phải có **3 định nghĩa** (bội số, bội số chung, bội số chung nhỏ nhất) và **cách tìm BCNN**. Hãy kiểm tra.',
    contentFr:
      '> Ton cahier doit maintenant contenir **3 définitions** (multiple, multiple commun, plus petit multiple commun) et **la méthode du PPCM**. Vérifie.',
    items: [
      { text: 'Say what a **multiple** is.', textVn: 'Nói được **bội số (multiple)** là gì.', textFr: 'Dire ce qu’est un **multiple**.' },
      { text: 'Say what **common** means in maths — **shared**, not ordinary.', textVn: 'Nói được **common** trong toán nghĩa là **chung**, không phải bình thường.', textFr: 'Dire ce que **common** veut dire en maths — **partagé**, pas ordinaire.' },
      { text: 'Find the **common multiples** of two numbers.', textVn: 'Tìm được **bội số chung** của hai số.', textFr: 'Trouver les **multiples communs** de deux nombres.' },
      { text: 'Find the **lowest common multiple (LCM)**.', textVn: 'Tìm được **bội số chung nhỏ nhất (BCNN)**.', textFr: 'Trouver le **plus petit multiple commun (PPCM)**.' },
      { text: 'Know **not to just multiply** the two numbers together.', textVn: 'Biết **không vội nhân** hai số với nhau.', textFr: 'Savoir qu’il ne faut **pas juste multiplier** les deux nombres.' },
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
    titleFr: 'Prochain cours',
    content: 'Show the **lists** every time, and ring the LCM — not just the answer.',
    contentVn: 'Với mỗi câu hãy viết cả **danh sách** và khoanh BCNN — không chỉ viết đáp án.',
    contentFr: 'Écris les **listes** à chaque fois, et entoure le PPCM — pas seulement la réponse.',
    notes: [
      {
        tone: 'homework',
        badge: 'Section 1.3 · pages 12–13',
        badgeVn: 'Mục 1.3 · trang 12–13',
        badgeFr: 'Section 1.3 · pages 12–13',
        icon: 'Pencil',
        text:
          '**Focus** — Q1 to 6. Everybody.\n' +
          '**Practice** — Q7 to 11.\n' +
          '**Challenge** — Q12 to 15. An attempt beats a blank.',
        textVn:
          '**Focus** — câu 1 đến 6. Tất cả các em.\n' +
          '**Practice** — câu 7 đến 11.\n' +
          '**Challenge** — câu 12 đến 15. Làm sai vẫn hơn bỏ trống.',
        textFr:
          '**Focus** — Q1 à 6. Tout le monde.\n' +
          '**Practice** — Q7 à 11.\n' +
          '**Challenge** — Q12 à 15. Essayer vaut mieux que laisser vide.',
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
    subtitle: 'You can find the lowest common multiple of two numbers, and you know that “common” means shared. Exit question: what is the **LCM of 5 and 10** — and why is it not 50?',
    subtitleVn: 'Em đã có thể tìm bội số chung nhỏ nhất của hai số, và biết rằng “common” nghĩa là chung. Câu hỏi ra về: **BCNN của 5 và 10** là bao nhiêu — và vì sao không phải 50?',
    subtitleFr: 'Tu sais trouver le plus petit multiple commun de deux nombres, et tu sais que « common » veut dire partagé. Question de sortie : quel est le **PPCM de 5 et 10** — et pourquoi ce n’est pas 50 ?',
  },
]

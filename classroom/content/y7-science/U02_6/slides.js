// content/y7-science/U02_6/slides.js
// Year 7 Science · 2.6 Compounds and formulae. Wednesday 16 September 2026.
// Source: Learner's Book pages 57–63.
//
// Built to the exemplars (Science 2.5, Maths 2.3): short sentences, one idea
// each, and no slide body that repeats its write note.
//
// THE SHAPE: yesterday the class learned what an element is. Today opens on two
// dangerous elements, a hand vote on whether you would eat them joined
// together, and the answer that they already have — salt. Then the key words,
// the naming rules (-ide, -ate, mono, di), particle diagrams and formulae, with
// the book's questions right after the section that answers them.
//
// COPY-DOWN: 8 written panels (compound · bonding · sodium chloride · new
// properties · naming -ide · naming -ate · mono and di · formula) and the Draw
// This of four particles. The book's key words are bonding, compound, formula,
// sodium chloride.

import { DIAGRAMS } from './diagrams.js'
import { NameCompound, FormulaReader, ElementOrCompound } from './widgets.jsx'
import saltfield from './images/saltfield.jpg'
import coppersulfate from './images/coppersulfate.jpg'
import halong from './images/halong.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const BLUE = '#1a5fa8'
const RED = '#c8102e'

export const slides = [
  // ── 1. Hero + starter (the book's Getting Started) ─────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'FlaskConical',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    date: '16 Sep 2026',
    eyebrow: '2.6 Compounds and formulae',
    eyebrowVn: '2.6 Hợp chất và công thức hóa học',
    eyebrowFr: '2.6 Composés et formules',
    title: 'Compounds & Formulae',
    titleVn: 'Hợp chất & Công thức',
    titleFr: 'Composés & formules',
    card: {
      icon: 'Pencil',
      badge: 'Starter · 3 minutes',
      badgeVn: 'Khởi động · 3 phút',
      badgeFr: 'Pour commencer · 3 minutes',
      text: 'Test your partner on the symbols. You say **sodium**. They say **Na**.',
      textVn: 'Kiểm tra bạn bên cạnh về kí hiệu. Em nói **sodium**. Bạn nói **Na**.',
      textFr: 'Teste ton voisin sur les symboles. Tu dis **sodium**. Il dit **Na**.',
    },
  },

  // ── ELEMENTS JOIN ──────────────────────────────────────────────────────────
  // 2. Two dangerous elements
  {
    layout: 'showcase',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Two elements',
    eyebrowVn: 'Hai nguyên tố',
    eyebrowFr: 'Deux éléments',
    title: 'Two Dangerous Elements',
    titleVn: 'Hai nguyên tố nguy hiểm',
    titleFr: 'Deux éléments dangereux',
    inlineSvg: DIAGRAMS.TWO_DANGERS,
    caption: 'Mr Bowen bonds them together.',
    captionVn: 'Thầy Bowen cho chúng liên kết với nhau. (sodium = natri, chlorine = clo)',
    captionFr: 'M. Bowen les lie ensemble. (chlorine = chlore)',
  },

  // 3. Vote. No answer on this slide.
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowVn: 'Biểu quyết bằng một tay',
    eyebrowFr: 'Vote avec une main',
    title: 'Would You Eat It?',
    titleVn: 'Em có dám ăn không?',
    titleFr: 'Tu le mangerais ?',
    text: 'Sodium + chlorine, bonded. Would you eat it?',
    textVn: 'Natri + clo, liên kết với nhau. Em có ăn không?',
    textFr: 'Sodium + chlore, liés. Tu le mangerais ?',
    columns: [
      { heading: 'A · left hand up', headingVn: 'A · giơ tay trái', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_YES },
      { heading: 'B · right hand up', headingVn: 'B · giơ tay phải', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_NO },
    ],
  },

  // 4. The answer
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Sparkles',
    eyebrow: 'Book page 58',
    eyebrowVn: 'Sách trang 58',
    eyebrowFr: 'Livre page 58',
    title: 'You Already Eat It',
    titleVn: 'Em đã ăn nó rồi',
    titleFr: 'Tu en manges déjà',
    inlineSvg: DIAGRAMS.SALT_MADE,
    caption: '**Yes!** Sodium chloride is **salt**. You probably ate some today.',
    captionVn: '**Có!** Sodium chloride là **muối ăn**. Có lẽ hôm nay em đã ăn rồi.',
    captionFr: '**Oui !** Sodium chloride, c’est le **sel**. Tu en as sûrement mangé aujourd’hui.',
  },

  // ── KEY WORDS ──────────────────────────────────────────────────────────────
  // 5. Compound
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Boxes',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Compound',
    titleVn: 'Hợp chất',
    titleFr: 'Composé',
    ratio: 40,
    inlineSvg: DIAGRAMS.ELEMENT_COMPOUND,
    content: 'Remember: an **element** has only one kind of atom.',
    contentVn: 'Nhớ lại: một **nguyên tố** chỉ có một loại nguyên tử.',
    contentFr: 'Rappel : un **élément** n’a qu’une sorte d’atome.',
    notes: [
      {
        tone: 'write',
        text: '**Compound:** a substance made of different kinds of atom bonded together.',
        textVn: '**Hợp chất (compound):** một chất gồm các loại nguyên tử khác nhau liên kết với nhau.',
        textFr: '**Composé (compound) :** une substance faite de différentes sortes d’atomes liés ensemble.',
      },
    ],
  },

  // 6. Bonding
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Atom',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Bonding',
    titleVn: 'Liên kết',
    titleFr: 'Liaison',
    ratio: 40,
    inlineSvg: DIAGRAMS.BONDING_REAL,
    content: 'A model kit shows atoms as balls.',
    contentVn: 'Bộ mô hình biểu diễn nguyên tử bằng các quả bóng.',
    contentFr: 'Un kit de modèles montre les atomes comme des boules.',
    notes: [
      {
        tone: 'write',
        text: '**Bonding:** atoms joining tightly together.',
        textVn: '**Liên kết (bonding):** các nguyên tử gắn chặt với nhau.',
        textFr: '**Liaison (bonding) :** des atomes qui s’attachent fortement.',
      },
    ],
  },

  // 7. Sodium chloride, from a Vietnamese salt field
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Droplet',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Sodium Chloride',
    titleVn: 'Natri clorua',
    titleFr: 'Chlorure de sodium',
    ratio: 45,
    image: saltfield,
    content: 'Phú Yên, Vietnam: salt from the sea.',
    contentVn: 'Phú Yên, Việt Nam: muối từ biển.',
    contentFr: 'Phú Yên, Vietnam : du sel tiré de la mer.',
    notes: [
      {
        tone: 'write',
        text: '**Sodium chloride:** the compound of sodium and chlorine. Its everyday name is **salt**.',
        textVn: '**Natri clorua (sodium chloride):** hợp chất của natri và clo. Tên thường gọi là **muối ăn**.',
        textFr: '**Chlorure de sodium (sodium chloride) :** le composé du sodium et du chlore. Son nom courant est le **sel**.',
      },
    ],
  },

  // 8. New properties
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'Compare',
    eyebrowVn: 'So sánh',
    eyebrowFr: 'Comparer',
    title: 'Totally New Properties',
    titleVn: 'Tính chất hoàn toàn mới',
    titleFr: 'Des propriétés toutes nouvelles',
    ratio: 40,
    inlineSvg: DIAGRAMS.NEW_PROPERTIES,
    notes: [
      {
        tone: 'write',
        text: 'A compound has **new properties**. It is not like the elements it is made from.',
        textVn: 'Hợp chất có **tính chất mới**. Nó không giống các nguyên tố tạo nên nó.',
        textFr: 'Un composé a de **nouvelles propriétés**. Il ne ressemble pas aux éléments qui le forment.',
      },
    ],
  },

  // 9. Book questions 1–2
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: "Learner's Book, page 59",
    eyebrowVn: 'Sách học sinh, trang 59',
    eyebrowFr: 'Livre de l’élève, page 59',
    title: 'Questions 1–2',
    titleVn: 'Câu hỏi 1–2',
    titleFr: 'Questions 1–2',
    content:
      '> Describe **two** ways sodium chloride is different from… **1.** sodium **2.** chlorine',
    contentVn:
      '> Nêu **hai** điểm sodium chloride khác với… **1.** sodium **2.** chlorine',
    contentFr:
      '> Donne **deux** différences entre sodium chloride et… **1.** sodium **2.** chlorine',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifier',
      answer: '**1.** Sodium: shiny metal, not safe to eat. Salt: white crystals, safe to eat.\n**2.** Chlorine: yellow-green gas, poisonous. Salt: white solid, safe to eat.',
      answerVn: '**1.** Natri: kim loại sáng bóng, không ăn được. Muối: tinh thể trắng, ăn được.\n**2.** Clo: khí vàng lục, độc. Muối: chất rắn trắng, ăn được.',
      answerFr: '**1.** Sodium : métal brillant, ne se mange pas. Sel : cristaux blancs, se mange.\n**2.** Chlore : gaz jaune-vert, toxique. Sel : solide blanc, se mange.',
    },
  },

  // ── NAMING ─────────────────────────────────────────────────────────────────
  // 10. Spot the change
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Look closely',
    eyebrowVn: 'Nhìn kỹ nhé',
    eyebrowFr: 'Regarde bien',
    title: 'Spot the Change',
    titleVn: 'Tìm chỗ thay đổi',
    titleFr: 'Trouve le changement',
    text: 'sodium + chlorine → sodium chloride',
    textVn: 'sodium + chlorine → sodium chloride',
    textFr: 'sodium + chlorine → sodium chloride',
    sub: 'One word changed. Which part?',
    subVn: 'Một từ đã thay đổi. Phần nào?',
    subFr: 'Un mot a changé. Quelle partie ?',
    reveal: {
      label: 'Answer',
      labelVn: 'Đáp án',
      labelFr: 'Réponse',
      answer: 'chlor**ine** became chlor**ide**. The metal, sodium, stays the same.',
      answerVn: 'chlor**ine** thành chlor**ide**. Kim loại sodium giữ nguyên.',
      answerFr: 'chlor**ine** devient chlor**ide**. Le métal, sodium, ne change pas.',
    },
  },

  // 11. The -ide rule (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'PenLine',
    eyebrow: 'Book page 59',
    eyebrowVn: 'Sách trang 59',
    eyebrowFr: 'Livre page 59',
    title: 'Naming Compounds',
    titleVn: 'Gọi tên hợp chất',
    titleFr: 'Nommer les composés',
    ratio: 40,
    inlineSvg: DIAGRAMS.NAME_RULE,
    content: 'The name tells you the elements.',
    contentVn: 'Tên cho em biết các nguyên tố.',
    contentFr: 'Le nom te dit quels sont les éléments.',
    notes: [
      {
        tone: 'write',
        text: '**Naming a compound:** the metal comes first. The non-metal ends in **‑ide**.',
        textVn: '**Gọi tên hợp chất:** kim loại đứng trước. Phi kim có đuôi **‑ide**.',
        textFr: '**Nommer un composé :** le métal vient en premier. Le non-métal finit en **‑ide**.',
      },
    ],
  },

  // 12. Book questions 3–6
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: "Learner's Book, page 59",
    eyebrowVn: 'Sách học sinh, trang 59',
    eyebrowFr: 'Livre de l’élève, page 59',
    title: 'Questions 3–6',
    titleVn: 'Câu hỏi 3–6',
    titleFr: 'Questions 3–6',
    content:
      '> Which **two** elements are combined in… **3.** sodium chloride? **4.** hydrogen sulfide? **5.** magnesium oxide?\n' +
      '> **6.** A compound of calcium and sulfur was named **sulfur calcium**. What is wrong? Write the correct name.',
    contentVn:
      '> Hai nguyên tố nào kết hợp trong… **3.** sodium chloride? **4.** hydrogen sulfide? **5.** magnesium oxide?\n' +
      '> **6.** Hợp chất của calcium và sulfur bị gọi là **sulfur calcium**. Sai ở đâu? Viết tên đúng.',
    contentFr:
      '> Quels **deux** éléments sont combinés dans… **3.** sodium chloride ? **4.** hydrogen sulfide ? **5.** magnesium oxide ?\n' +
      '> **6.** Un composé de calcium et sulfur a été nommé **sulfur calcium**. Où est l’erreur ? Écris le bon nom.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifier',
      answer: '**3.** sodium, chlorine; **4.** hydrogen, sulfur; **5.** magnesium, oxygen; **6.** metal first, ‑ide ending: **calcium sulfide**',
      answerVn: '**3.** sodium, chlorine; **4.** hydrogen, sulfur; **5.** magnesium, oxygen; **6.** kim loại trước, đuôi ‑ide: **calcium sulfide**',
      answerFr: '**3.** sodium, chlorine ; **4.** hydrogen, sulfur ; **5.** magnesium, oxygen ; **6.** métal d’abord, finale ‑ide : **calcium sulfide**',
    },
  },

  // 13. The -ate rule (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'PenLine',
    eyebrow: 'Book page 59',
    eyebrowVn: 'Sách trang 59',
    eyebrowFr: 'Livre page 59',
    title: 'Names Ending in -ate',
    titleVn: 'Tên có đuôi -ate',
    titleFr: 'Les noms en -ate',
    ratio: 45,
    image: coppersulfate,
    content: 'Copper sulfate: copper, sulfur **and oxygen**.',
    contentVn: 'Copper sulfate (đồng sunfat): đồng, lưu huỳnh **và oxi**.',
    contentFr: 'Copper sulfate (sulfate de cuivre) : cuivre, soufre **et oxygène**.',
    notes: [
      {
        tone: 'write',
        text: 'Two elements **plus oxygen**: the name often ends in **‑ate**.\ncalcium + carbon + oxygen → calcium carbonate',
        textVn: 'Hai nguyên tố **cộng với oxi**: tên thường có đuôi **‑ate**.\ncalcium + carbon + oxygen → calcium carbonate',
        textFr: 'Deux éléments **plus l’oxygène** : le nom finit souvent en **‑ate**.\ncalcium + carbon + oxygen → calcium carbonate',
      },
    ],
  },

  // 14. Naming practice (widget)
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Say it, then press Show',
    eyebrowVn: 'Nói trước, rồi bấm Hiện',
    eyebrowFr: 'Dis-le, puis appuie sur Voir',
    title: 'Name the Compound',
    titleVn: 'Gọi tên hợp chất',
    titleFr: 'Nomme le composé',
    widget: NameCompound,
    caption: 'Yellow boxes are metals. Blue boxes are non-metals.',
    captionVn: 'Ô vàng là kim loại. Ô xanh là phi kim.',
    captionFr: 'Cases jaunes : métaux. Cases bleues : non-métaux.',
  },

  // 15. Book questions 7–9, with Ha Long Bay
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: "Learner's Book, page 60",
    eyebrowVn: 'Sách học sinh, trang 60',
    eyebrowFr: 'Livre de l’élève, page 60',
    title: 'Questions 7–9',
    titleVn: 'Câu hỏi 7–9',
    titleFr: 'Questions 7–9',
    ratio: 55,
    image: halong,
    content:
      'Ha Long Bay\'s rocks are **calcium carbonate**.\n\n' +
      '> Which **three** elements are combined in… **7.** calcium nitrate? **8.** magnesium carbonate? **9.** lithium sulfate?',
    contentVn:
      'Đá ở vịnh Hạ Long là **calcium carbonate** (canxi cacbonat).\n\n' +
      '> Ba nguyên tố nào kết hợp trong… **7.** calcium nitrate? **8.** magnesium carbonate? **9.** lithium sulfate?',
    contentFr:
      'Les rochers de la baie d’Ha Long sont du **calcium carbonate** (carbonate de calcium).\n\n' +
      '> Quels **trois** éléments sont combinés dans… **7.** calcium nitrate ? **8.** magnesium carbonate ? **9.** lithium sulfate ?',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifier',
      answer: '**7.** calcium, nitrogen, oxygen; **8.** magnesium, carbon, oxygen; **9.** lithium, sulfur, oxygen',
      answerVn: '**7.** calcium, nitrogen, oxygen; **8.** magnesium, carbon, oxygen; **9.** lithium, sulfur, oxygen',
      answerFr: '**7.** calcium, nitrogen, oxygen ; **8.** magnesium, carbon, oxygen ; **9.** lithium, sulfur, oxygen',
    },
  },

  // ── HOW MANY ATOMS ─────────────────────────────────────────────────────────
  // 16. Mono and di (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    eyebrowFr: 'Point d’anglais',
    title: 'Mono and Di',
    titleVn: 'Mono và Di',
    titleFr: 'Mono et Di',
    ratio: 40,
    inlineSvg: DIAGRAMS.PREFIXES,
    content: 'Count the oxygen atoms.',
    contentVn: 'Đếm số nguyên tử oxi.',
    contentFr: 'Compte les atomes d’oxygène.',
    notes: [
      {
        tone: 'write',
        text: '**mono** = one, **di** = two\ncarbon monoxide = CO, carbon dioxide = CO₂',
        textVn: '**mono** = một, **di** = hai\ncarbon monoxide = CO, carbon dioxide = CO₂',
        textFr: '**mono** = un, **di** = deux\ncarbon monoxide = CO, carbon dioxide = CO₂',
      },
    ],
  },

  // 17. Vote. No answer on this slide.
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowVn: 'Biểu quyết bằng một tay',
    eyebrowFr: 'Vote avec une main',
    title: 'Is Oxygen a Compound?',
    titleVn: 'Oxi có phải hợp chất?',
    titleFr: 'L’oxygène est-il un composé ?',
    text: 'Oxygen, O₂, has two atoms. Element or compound?',
    textVn: 'Oxi, O₂, có hai nguyên tử. Nguyên tố hay hợp chất?',
    textFr: 'L’oxygène, O₂, a deux atomes. Élément ou composé ?',
    columns: [
      { heading: 'A · left hand up', headingVn: 'A · giơ tay trái', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_ELEMENT },
      { heading: 'B · right hand up', headingVn: 'B · giơ tay phải', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_COMPOUND },
    ],
  },

  // 18. Draw This: four particles (p. 60)
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Draw all four, with labels',
    eyebrowVn: 'Vẽ cả bốn, có ghi chú',
    eyebrowFr: 'Dessine les quatre, avec légendes',
    title: 'Four Particles',
    titleVn: 'Bốn loại hạt',
    titleFr: 'Quatre particules',
    inlineSvg: DIAGRAMS.PARTICLES,
    drawThis: true,
    caption: '**O₂ is an element**: both atoms are oxygen. The other three are compounds.',
    captionVn: '**O₂ là nguyên tố**: cả hai nguyên tử đều là oxi. Ba chất còn lại là hợp chất.',
    captionFr: '**O₂ est un élément** : les deux atomes sont de l’oxygène. Les trois autres sont des composés.',
  },

  // 19. The same four, photographed
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'The drawings, for real',
    eyebrowVn: 'Hình vẽ, ngoài đời thật',
    eyebrowFr: 'Les dessins, en vrai',
    title: 'The Particles, for Real',
    titleVn: 'Các hạt ngoài đời thật',
    titleFr: 'Les particules en vrai',
    inlineSvg: DIAGRAMS.PARTICLES_REAL,
    caption: 'Dry ice is frozen carbon dioxide. Cooking gas is mostly methane.',
    captionVn: 'Đá khô là cacbon đioxit đông lạnh. Khí gas nấu ăn chủ yếu là metan.',
    captionFr: 'La glace carbonique est du dioxyde de carbone gelé. Le gaz de cuisine est surtout du méthane.',
  },

  // 20. Formula (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'PenLine',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Formula',
    titleVn: 'Công thức hóa học',
    titleFr: 'Formule',
    ratio: 40,
    inlineSvg: DIAGRAMS.FORMULA_READ,
    content: 'Salt has a formula too: **NaCl**.',
    contentVn: 'Muối ăn cũng có công thức: **NaCl**.',
    contentFr: 'Le sel a aussi une formule : **NaCl**.',
    notes: [
      {
        tone: 'write',
        text: '**Formula:** the symbols of the elements in a compound.\nThe small number tells you how many atoms. No number means one.',
        textVn: '**Công thức (formula):** kí hiệu của các nguyên tố trong hợp chất.\nSố nhỏ cho biết có bao nhiêu nguyên tử. Không có số nghĩa là một.',
        textFr: '**Formule (formula) :** les symboles des éléments d’un composé.\nLe petit nombre dit combien d’atomes. Pas de nombre veut dire un.',
      },
    ],
  },

  // 21. Read a formula (widget)
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Count before you press',
    eyebrowVn: 'Đếm trước khi bấm',
    eyebrowFr: 'Compte avant d’appuyer',
    title: 'Read the Formula',
    titleVn: 'Đọc công thức',
    titleFr: 'Lis la formule',
    widget: FormulaReader,
    caption: 'Careful: **C** is carbon. **Ca** is calcium.',
    captionVn: 'Cẩn thận: **C** là cacbon. **Ca** là canxi.',
    captionFr: 'Attention : **C** est le carbone. **Ca** est le calcium.',
  },

  // 22. Game: left hand element, right hand compound
  {
    layout: 'game',
    title: 'Element or Compound?',
    titleVn: 'Nguyên tố hay hợp chất?',
    titleFr: 'Élément ou composé ?',
    widget: ElementOrCompound,
  },

  // ── BOOK QUESTIONS 10–17 ───────────────────────────────────────────────────
  // 23. Questions 10–11
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: "Learner's Book, page 62",
    eyebrowVn: 'Sách học sinh, trang 62',
    eyebrowFr: 'Livre de l’élève, page 62',
    title: 'Questions 10–11',
    titleVn: 'Câu hỏi 10–11',
    titleFr: 'Questions 10–11',
    content:
      '> **10.** Element or compound? Explain. K · O₂ · NaCl · Al · Ca · CaCl₂ · H₂\n' +
      '> **11.** SO₂ is sulfur dioxide. **a** How many elements? **b** How many oxygen atoms per sulfur atom?',
    contentVn:
      '> **10.** Nguyên tố hay hợp chất? Giải thích. K · O₂ · NaCl · Al · Ca · CaCl₂ · H₂\n' +
      '> **11.** SO₂ là sulfur dioxide. **a** Có bao nhiêu nguyên tố? **b** Mỗi nguyên tử lưu huỳnh có mấy nguyên tử oxi?',
    contentFr:
      '> **10.** Élément ou composé ? Explique. K · O₂ · NaCl · Al · Ca · CaCl₂ · H₂\n' +
      '> **11.** SO₂ est le sulfur dioxide. **a** Combien d’éléments ? **b** Combien d’atomes d’oxygène par atome de soufre ?',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifier',
      answer: '**10.** Elements (one kind of atom): K, O₂, Al, Ca, H₂. Compounds: NaCl, CaCl₂. **11.** **a** 2, **b** 2',
      answerVn: '**10.** Nguyên tố (một loại nguyên tử): K, O₂, Al, Ca, H₂. Hợp chất: NaCl, CaCl₂. **11.** **a** 2, **b** 2',
      answerFr: '**10.** Éléments (une sorte d’atome) : K, O₂, Al, Ca, H₂. Composés : NaCl, CaCl₂. **11.** **a** 2, **b** 2',
    },
  },

  // 24. Questions 12–13
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: "Learner's Book, page 62",
    eyebrowVn: 'Sách học sinh, trang 62',
    eyebrowFr: 'Livre de l’élève, page 62',
    title: 'Questions 12–13',
    titleVn: 'Câu hỏi 12–13',
    titleFr: 'Questions 12–13',
    content:
      '> **12.** Water is H₂O. **a** Which two elements? **b** What does the formula tell you about the numbers of atoms?\n' +
      '> **13.** CO is carbon **mon**oxide. Why not just "carbon oxide"?',
    contentVn:
      '> **12.** Nước là H₂O. **a** Hai nguyên tố nào? **b** Công thức cho biết gì về số nguyên tử?\n' +
      '> **13.** CO là carbon **mon**oxide. Vì sao không gọi là "carbon oxide"?',
    contentFr:
      '> **12.** L’eau, c’est H₂O. **a** Quels deux éléments ? **b** Que dit la formule sur le nombre d’atomes ?\n' +
      '> **13.** CO est le carbon **mon**oxide. Pourquoi pas juste « carbon oxide » ?',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifier',
      answer: '**12.** **a** hydrogen, oxygen; **b** two hydrogen atoms, one oxygen atom. **13.** Mono = one oxygen atom, unlike carbon **di**oxide.',
      answerVn: '**12.** **a** hiđro, oxi; **b** hai nguyên tử hiđro, một nguyên tử oxi. **13.** Mono = một nguyên tử oxi, khác carbon **di**oxide.',
      answerFr: '**12.** **a** hydrogène, oxygène ; **b** deux atomes d’hydrogène, un atome d’oxygène. **13.** Mono = un atome d’oxygène, pas comme carbon **di**oxide.',
    },
  },

  // 25. Questions 14–17
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: "Learner's Book, page 62",
    eyebrowVn: 'Sách học sinh, trang 62',
    eyebrowFr: 'Livre de l’élève, page 62',
    title: 'Questions 14–17',
    titleVn: 'Câu hỏi 14–17',
    titleFr: 'Questions 14–17',
    content:
      '> **14.** Name **a** MgO **b** NaCl **c** CaCl₂\n' +
      '> **15.** NaOH and KOH are hydroxides. Which two elements are in all hydroxides?\n' +
      '> **16.** Name LiOH. **17.** How many elements are in LiOH?',
    contentVn:
      '> **14.** Gọi tên **a** MgO **b** NaCl **c** CaCl₂\n' +
      '> **15.** NaOH và KOH là hydroxide. Hai nguyên tố nào có trong mọi hydroxide?\n' +
      '> **16.** LiOH tên là gì? **17.** LiOH có bao nhiêu nguyên tố?',
    contentFr:
      '> **14.** Nomme **a** MgO **b** NaCl **c** CaCl₂\n' +
      '> **15.** NaOH et KOH sont des hydroxides. Quels deux éléments sont dans tous les hydroxides ?\n' +
      '> **16.** Nomme LiOH. **17.** Combien d’éléments y a-t-il dans LiOH ?',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifier',
      answer: '**14.** magnesium oxide, sodium chloride, calcium chloride; **15.** oxygen, hydrogen; **16.** lithium hydroxide; **17.** 3',
      answerVn: '**14.** magnesium oxide, sodium chloride, calcium chloride; **15.** oxi và hiđro; **16.** lithium hydroxide; **17.** 3',
      answerFr: '**14.** magnesium oxide, sodium chloride, calcium chloride ; **15.** oxygène et hydrogène ; **16.** lithium hydroxide ; **17.** 3',
    },
  },

  // ── CLOSE ──────────────────────────────────────────────────────────────────
  // 26. Homework: the book's Activity 2.6.1
  {
    layout: 'callout',
    accent: RED,
    icon: 'Home',
    eyebrow: 'Activity 2.6.1',
    eyebrowVn: 'Hoạt động 2.6.1',
    eyebrowFr: 'Activité 2.6.1',
    title: 'Make the Models',
    titleVn: 'Làm mô hình',
    titleFr: 'Fabrique les modèles',
    content: 'Make paper models of **five** compounds from today.',
    contentVn: 'Làm mô hình giấy của **năm** hợp chất học hôm nay.',
    contentFr: 'Fabrique en papier **cinq** composés vus aujourd’hui.',
    notes: [
      {
        tone: 'homework',
        badge: 'Homework',
        badgeVn: 'Bài tập về nhà',
        badgeFr: 'Devoirs',
        icon: 'Pencil',
        text: '1. Cut out coloured circles: one colour for each element.\n2. Write the symbol on each atom.\n3. Stick them on paper to make the particle.\n4. Write the name and the formula underneath.\nAlso: finish Questions 1–17.',
        textVn: '1. Cắt các hình tròn màu: mỗi nguyên tố một màu.\n2. Viết kí hiệu lên mỗi nguyên tử.\n3. Dán lên giấy để tạo thành hạt.\n4. Viết tên và công thức bên dưới.\nVà: làm xong Câu hỏi 1–17.',
        textFr: '1. Découpe des cercles de couleur : une couleur par élément.\n2. Écris le symbole sur chaque atome.\n3. Colle-les sur du papier pour former la particule.\n4. Écris le nom et la formule en dessous.\nEt aussi : finis les questions 1–17.',
      },
    ],
  },

  // 27. Checklist (the book's summary checklist)
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
    content: '> Check your notebook: **8 written panels** and **1 drawing**.',
    contentVn: '> Kiểm tra vở: **8 khung ghi chép** và **1 hình vẽ**.',
    contentFr: '> Vérifie ton cahier : **8 encadrés écrits** et **1 dessin**.',
    items: [
      { text: 'Explain the difference between an **element** and a **compound**.', textVn: 'Giải thích sự khác nhau giữa **nguyên tố** và **hợp chất**.', textFr: 'Explique la différence entre un **élément** et un **composé**.' },
      { text: '**Name** compounds: -ide and -ate.', textVn: '**Gọi tên** hợp chất: -ide và -ate.', textFr: '**Nomme** des composés : -ide et -ate.' },
      { text: 'Say what **mono** and **di** mean.', textVn: 'Nói được **mono** và **di** nghĩa là gì.', textFr: 'Dis ce que veulent dire **mono** et **di**.' },
      { text: 'Read a **formula**: which elements, how many atoms.', textVn: 'Đọc **công thức**: nguyên tố nào, bao nhiêu nguyên tử.', textFr: 'Lis une **formule** : quels éléments, combien d’atomes.' },
    ],
  },

  // 28. Exit question
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    title: 'Lesson Complete!',
    titleVn: 'Hoàn thành bài học!',
    titleFr: 'Leçon terminée !',
    subtitle: 'Exit question: **CaCO₃**. Which elements? How many atoms?',
    subtitleVn: 'Câu hỏi ra về: **CaCO₃**. Những nguyên tố nào? Bao nhiêu nguyên tử?',
    subtitleFr: 'Question de sortie : **CaCO₃**. Quels éléments ? Combien d’atomes ?',
  },
]

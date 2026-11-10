// content/y7-science/U02_7/slides.js
// Year 7 Science · 2.7 Compounds and mixtures. Thursday 17 September 2026.
// Source: Learner's Book pages 64–69.
//
// Built to the exemplars (Science 2.5, Maths 2.3): short sentences, one idea
// each, and no slide body that repeats its write note.
//
// THE SHAPE: yesterday the class bonded elements into compounds. Today the
// same two elements, iron and sulfur, are first only STIRRED (a mixture: a
// magnet pulls the iron out) and then HEATED (a compound: the magnet does
// nothing). Each result is voted on, left hand / right hand, before it is
// shown. There is no lab kit, so the heating is a downloaded video. Then the
// book's two everyday mixtures, air and water, each with its questions.
//
// COPY-DOWN: 10 written panels (filings · mixture · mixture vs compound ×2 ·
// composition · natural emissions · pure · mineral · evaporating basin) and
// the Draw This of iron and sulfur, mixed then bonded. The book's key words
// are composition, evaporating basin, filings, mineral, mixture, natural
// emissions, pipe-clay triangle and pure; the pipe-clay triangle is never used
// in the section, so it is left to the plan.

import { DIAGRAMS } from './diagrams.js'
import { IronSulfurClip, MixtureOrCompound } from './widgets.jsx'
import filings from './images/filings.jpg'
import ijen from './images/ijen.jpg'
import magnet from './images/magnet.jpg'
import ironsulfide from './images/ironsulfide.jpg'
import basin from './images/basin.jpg'
import kettle from './images/kettle.jpg'

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
    date: '17 Sep 2026',
    eyebrow: '2.7 Compounds and mixtures',
    eyebrowVn: '2.7 Hợp chất và hỗn hợp',
    eyebrowFr: '2.7 Composés et mélanges',
    title: 'Compounds & Mixtures',
    titleVn: 'Hợp chất & Hỗn hợp',
    titleFr: 'Composés & mélanges',
    card: {
      icon: 'Pencil',
      badge: 'Starter · element or compound?',
      badgeVn: 'Khởi động · nguyên tố hay hợp chất?',
      badgeFr: 'Pour commencer · élément ou composé ?',
      text: 'nitrogen · carbon dioxide · calcium chloride · sodium · **O₂** · **CaO** · **CH₄** · **H₂O** · **K**',
      textVn: 'nitrogen · carbon dioxide · calcium chloride · sodium · **O₂** · **CaO** · **CH₄** · **H₂O** · **K**',
      textFr: 'nitrogen · carbon dioxide · calcium chloride · sodium · **O₂** · **CaO** · **CH₄** · **H₂O** · **K**',
    },
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifier',
      answer: '**Elements:** nitrogen, sodium, O₂, K\n**Compounds:** carbon dioxide, calcium chloride, CaO, CH₄, H₂O',
      answerVn: '**Nguyên tố:** nitrogen, sodium, O₂, K\n**Hợp chất:** carbon dioxide, calcium chloride, CaO, CH₄, H₂O',
      answerFr: '**Éléments :** nitrogen, sodium, O₂, K\n**Composés :** carbon dioxide, calcium chloride, CaO, CH₄, H₂O',
    },
  },

  // ── MIXED ──────────────────────────────────────────────────────────────────
  // 2. The two elements, photographed
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Book page 65',
    eyebrowVn: 'Sách trang 65',
    eyebrowFr: 'Livre page 65',
    title: 'Iron and Sulfur',
    titleVn: 'Sắt và lưu huỳnh',
    titleFr: 'Fer et soufre',
    columns: [
      {
        heading: 'Iron · magnetic',
        headingVn: 'Sắt · bị nam châm hút',
        headingFr: 'Fer · attiré par l’aimant',
        accent: BLUE,
        icon: 'Hammer',
        image: filings,
        caption: 'Iron **filings**: tiny pieces of iron.',
        captionVn: '**Mạt sắt** (iron filings): những mẩu sắt rất nhỏ.',
        captionFr: '**Limaille** de fer (iron filings) : de tout petits morceaux de fer.',
      },
      {
        heading: 'Sulfur · not magnetic',
        headingVn: 'Lưu huỳnh · không bị nam châm hút',
        headingFr: 'Soufre · pas attiré par l’aimant',
        accent: ORANGE,
        icon: 'Flame',
        image: ijen,
        caption: 'Sulfur from a volcano in Indonesia.',
        captionVn: 'Lưu huỳnh lấy từ một ngọn núi lửa ở Indonesia.',
        captionFr: 'Du soufre venant d’un volcan en Indonésie.',
      },
    ],
  },

  // 3. Vote. No answer on this slide.
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowVn: 'Biểu quyết bằng một tay',
    eyebrowFr: 'Vote avec une main',
    title: 'Stir Them Together',
    titleVn: 'Khuấy chúng lại với nhau',
    titleFr: 'Mélange-les',
    text: 'Iron + sulfur, stirred. Can a magnet pull the iron out?',
    textVn: 'Sắt + lưu huỳnh, khuấy đều. Nam châm có hút sắt ra được không?',
    textFr: 'Fer + soufre, mélangés. Un aimant peut-il retirer le fer ?',
    columns: [
      { heading: 'A · left hand up', headingVn: 'A · giơ tay trái', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_YES },
      { heading: 'B · right hand up', headingVn: 'B · giơ tay phải', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_NO },
    ],
  },

  // 4. The answer: yes. Mixture (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Boxes',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Mixture',
    titleVn: 'Hỗn hợp',
    titleFr: 'Mélange',
    ratio: 40,
    image: magnet,
    content: '**Yes!** The iron is still iron. The sulfur is still sulfur.',
    contentVn: '**Có!** Sắt vẫn là sắt. Lưu huỳnh vẫn là lưu huỳnh.',
    contentFr: '**Oui !** Le fer est toujours du fer. Le soufre est toujours du soufre.',
    notes: [
      {
        tone: 'write',
        text: '**Filings:** very small pieces of metal.',
        textVn: '**Mạt (filings):** những mẩu kim loại rất nhỏ.',
        textFr: '**Limaille (filings) :** de tout petits morceaux de métal.',
      },
      {
        tone: 'write',
        text: '**Mixture:** different substances mixed together, but **not bonded**.',
        textVn: '**Hỗn hợp (mixture):** các chất khác nhau trộn lẫn với nhau, nhưng **không liên kết**.',
        textFr: '**Mélange (mixture) :** des substances différentes mélangées, mais **pas liées**.',
      },
    ],
  },

  // ── HEATED ─────────────────────────────────────────────────────────────────
  // 5. Vote. No answer on this slide.
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowVn: 'Biểu quyết bằng một tay',
    eyebrowFr: 'Vote avec une main',
    title: 'Now Heat Them',
    titleVn: 'Bây giờ đun nóng',
    titleFr: 'Maintenant, chauffe',
    text: 'Heat the mixture. Can a magnet **still** pull the iron out?',
    textVn: 'Đun nóng hỗn hợp. Nam châm **vẫn** hút sắt ra được không?',
    textFr: 'Chauffe le mélange. Un aimant peut-il **encore** retirer le fer ?',
    columns: [
      { heading: 'A · left hand up', headingVn: 'A · giơ tay trái', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_YES },
      { heading: 'B · right hand up', headingVn: 'B · giơ tay phải', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_NO },
    ],
  },

  // 6. The video: iron and sulfur heated
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Flame',
    eyebrow: 'Book page 66 · watch closely',
    eyebrowVn: 'Sách trang 66 · xem kỹ nhé',
    eyebrowFr: 'Livre page 66 · regarde bien',
    title: 'Heating Iron and Sulfur',
    titleVn: 'Đun nóng sắt và lưu huỳnh',
    titleFr: 'On chauffe fer et soufre',
    widget: IronSulfurClip,
    caption: 'What colour is it **before**? What colour is it **after**?',
    captionVn: 'Trước khi đun nó màu gì? **Sau** khi đun nó màu gì?',
    captionFr: 'Quelle couleur **avant** ? Quelle couleur **après** ?',
  },

  // 7. The answer: no. Iron sulfide.
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sparkles',
    eyebrow: 'A new substance',
    eyebrowVn: 'Một chất mới',
    eyebrowFr: 'Une nouvelle substance',
    title: 'Iron Sulfide',
    titleVn: 'Sắt sunfua',
    titleFr: 'Sulfure de fer',
    ratio: 45,
    image: ironsulfide,
    content:
      '**No!** The magnet does nothing.\n\n' +
      'The iron and sulfur are **bonded** now. They made a compound: **iron sulfide**.',
    contentVn:
      '**Không!** Nam châm không hút được.\n\n' +
      'Sắt và lưu huỳnh bây giờ đã **liên kết** với nhau. Chúng tạo thành hợp chất: **sắt sunfua (iron sulfide)**.',
    contentFr:
      '**Non !** L’aimant ne fait rien.\n\n' +
      'Le fer et le soufre sont maintenant **liés**. Ils forment un composé : le **sulfure de fer (iron sulfide)**.',
  },

  // 8. Draw This: mixed, then bonded (p. 65)
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Draw both boxes, with labels',
    eyebrowVn: 'Vẽ cả hai khung, có ghi chú',
    eyebrowFr: 'Dessine les deux cadres, avec légendes',
    title: 'Mixed, Then Bonded',
    titleVn: 'Trộn lẫn, rồi liên kết',
    titleFr: 'Mélangés, puis liés',
    inlineSvg: DIAGRAMS.MIX_COMPOUND,
    drawThis: true,
    caption: 'Use two colours: one for iron, one for sulfur.',
    captionVn: 'Dùng hai màu: một màu cho sắt, một màu cho lưu huỳnh.',
    captionFr: 'Utilise deux couleurs : une pour le fer, une pour le soufre.',
  },

  // 9. The difference (write, one panel per column)
  {
    layout: 'compare',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'The difference',
    eyebrowVn: 'Sự khác nhau',
    eyebrowFr: 'La différence',
    title: 'Mixture vs Compound',
    titleVn: 'Hỗn hợp và hợp chất',
    titleFr: 'Mélange ou composé',
    columns: [
      {
        heading: 'Mixture',
        headingVn: 'Hỗn hợp',
        headingFr: 'Mélange',
        accent: BLUE,
        icon: 'Boxes',
        notes: [
          {
            tone: 'write',
            badge: 'Mixture',
            badgeVn: 'Hỗn hợp',
            badgeFr: 'Mélange',
            text: '**Not bonded.**\nEach substance **keeps** its properties.\n**Easy** to separate.',
            textVn: '**Không liên kết.**\nMỗi chất **giữ nguyên** tính chất.\n**Dễ** tách ra.',
            textFr: '**Pas liés.**\nChaque substance **garde** ses propriétés.\n**Facile** à séparer.',
          },
        ],
      },
      {
        heading: 'Compound',
        headingVn: 'Hợp chất',
        headingFr: 'Composé',
        accent: ORANGE,
        icon: 'Atom',
        notes: [
          {
            tone: 'write',
            badge: 'Compound',
            badgeVn: 'Hợp chất',
            badgeFr: 'Composé',
            text: '**Bonded.**\nIt has **new** properties.\n**Hard** to separate.',
            textVn: '**Liên kết.**\nNó có tính chất **mới**.\n**Khó** tách ra.',
            textFr: '**Liés.**\nIl a de **nouvelles** propriétés.\n**Difficile** à séparer.',
          },
        ],
      },
    ],
  },

  // 10. Book questions 1–2 (Think like a scientist)
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: "Learner's Book, page 67",
    eyebrowVn: 'Sách học sinh, trang 67',
    eyebrowFr: 'Livre de l’élève, page 67',
    title: 'Questions 1–2',
    titleVn: 'Câu hỏi 1–2',
    titleFr: 'Questions 1–2',
    content:
      '> **1.** Describe what it looks like: **a** the mixture of iron and sulfur **b** the iron sulfide\n' +
      '> **2.** Can a magnet remove the iron from iron sulfide? Explain.',
    contentVn:
      '> **1.** Mô tả vẻ ngoài của: **a** hỗn hợp sắt và lưu huỳnh **b** sắt sunfua\n' +
      '> **2.** Nam châm có tách được sắt ra khỏi sắt sunfua không? Giải thích.',
    contentFr:
      '> **1.** Décris l’aspect : **a** du mélange de fer et de soufre **b** du sulfure de fer\n' +
      '> **2.** Un aimant peut-il retirer le fer du sulfure de fer ? Explique.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifier',
      answer: '**1a** A yellow and grey powder. You can see bits of both. **1b** A dark grey or black solid.\n**2.** No. The iron is bonded to the sulfur. Iron sulfide is a compound, and it is not magnetic.',
      answerVn: '**1a** Bột màu vàng và xám. Nhìn thấy được cả hai chất. **1b** Chất rắn màu xám đen.\n**2.** Không. Sắt đã liên kết với lưu huỳnh. Sắt sunfua là hợp chất và không bị nam châm hút.',
      answerFr: '**1a** Une poudre jaune et grise. On voit des bouts des deux. **1b** Un solide gris foncé ou noir.\n**2.** Non. Le fer est lié au soufre. Le sulfure de fer est un composé, et l’aimant ne l’attire pas.',
    },
  },

  // ── AIR ────────────────────────────────────────────────────────────────────
  // 11. Question first
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Think',
    eyebrowVn: 'Suy nghĩ',
    eyebrowFr: 'Réfléchis',
    title: 'What Is Air?',
    titleVn: 'Không khí là gì?',
    titleFr: 'Qu’est-ce que l’air ?',
    text: 'You breathe it all day.',
    textVn: 'Em hít thở nó cả ngày.',
    textFr: 'Tu le respires toute la journée.',
    sub: 'Is air an **element**, a **compound** or a **mixture**?',
    subVn: 'Không khí là **nguyên tố**, **hợp chất** hay **hỗn hợp**?',
    subFr: 'L’air est-il un **élément**, un **composé** ou un **mélange** ?',
  },

  // 12. The particles of air, with book questions 1–3
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Wind',
    eyebrow: "Learner's Book, page 68",
    eyebrowVn: 'Sách học sinh, trang 68',
    eyebrowFr: 'Livre de l’élève, page 68',
    title: 'Air Is a Mixture',
    titleVn: 'Không khí là hỗn hợp',
    titleFr: 'L’air est un mélange',
    ratio: 40,
    inlineSvg: DIAGRAMS.AIR,
    content:
      '> **1.** Which is the most common element in air?\n' +
      '> **2.** How many different kinds of substance can you see?\n' +
      '> **3.** Which is the least common compound?',
    contentVn:
      '> **1.** Nguyên tố nào có nhiều nhất trong không khí?\n' +
      '> **2.** Em thấy có bao nhiêu loại chất khác nhau?\n' +
      '> **3.** Hợp chất nào có ít nhất?',
    contentFr:
      '> **1.** Quel élément est le plus courant dans l’air ?\n' +
      '> **2.** Combien de sortes de substances vois-tu ?\n' +
      '> **3.** Quel composé est le moins courant ?',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifier',
      answer: '**1.** nitrogen **2.** 4: nitrogen, oxygen, carbon dioxide, water **3.** carbon dioxide',
      answerVn: '**1.** nitơ **2.** 4: nitơ, oxi, cacbon đioxit, nước **3.** cacbon đioxit',
      answerFr: '**1.** azote **2.** 4 : azote, oxygène, dioxyde de carbone, eau **3.** dioxyde de carbone',
    },
  },

  // 13. Composition (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Target',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Composition',
    titleVn: 'Thành phần',
    titleFr: 'Composition',
    ratio: 40,
    inlineSvg: DIAGRAMS.AIR_PIE,
    content: 'The water in air changes with the **weather**.',
    contentVn: 'Lượng hơi nước trong không khí thay đổi theo **thời tiết**.',
    contentFr: 'L’eau dans l’air change avec la **météo**.',
    notes: [
      {
        tone: 'write',
        text: '**Composition:** what a mixture is made of, and how much of each.\nAir: 78% nitrogen, 21% oxygen, 1% other gases.',
        textVn: '**Thành phần (composition):** hỗn hợp gồm những chất gì, và mỗi chất bao nhiêu.\nKhông khí: 78% nitơ, 21% oxi, 1% các khí khác.',
        textFr: '**Composition :** de quoi est fait un mélange, et combien de chaque chose.\nAir : 78% azote, 21% oxygène, 1% autres gaz.',
      },
    ],
  },

  // 14. What changes the air (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'CloudFog',
    eyebrow: 'Book page 67',
    eyebrowVn: 'Sách trang 67',
    eyebrowFr: 'Livre page 67',
    title: 'The Air Changes',
    titleVn: 'Không khí thay đổi',
    titleFr: 'L’air change',
    ratio: 40,
    inlineSvg: DIAGRAMS.EMISSIONS,
    content: 'Burning petrol gives out carbon dioxide too.',
    contentVn: 'Đốt xăng cũng thải ra cacbon đioxit.',
    contentFr: 'Brûler de l’essence rejette aussi du dioxyde de carbone.',
    notes: [
      {
        tone: 'write',
        text: '**Natural emissions:** gases that nature gives out. Animals and plants give out carbon dioxide.',
        textVn: '**Khí thải tự nhiên (natural emissions):** các khí do tự nhiên thải ra. Động vật và thực vật thải ra cacbon đioxit.',
        textFr: '**Émissions naturelles (natural emissions) :** les gaz rejetés par la nature. Les animaux et les plantes rejettent du dioxyde de carbone.',
      },
    ],
  },

  // ── WATER ──────────────────────────────────────────────────────────────────
  // 15. Pure: the English check (write)
  {
    layout: 'statement',
    accent: ORANGE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowVn: 'Kiểm tra tiếng Anh',
    eyebrowFr: 'Point d’anglais',
    title: 'Pure',
    titleVn: 'Tinh khiết',
    titleFr: 'Pur',
    text: 'On a bottle, **pure** just means clean.',
    textVn: 'Trên chai nước, **pure** chỉ có nghĩa là sạch.',
    textFr: 'Sur une bouteille, **pure** veut juste dire propre.',
    notes: [
      {
        tone: 'write',
        text: '**Pure:** contains only one substance. Pure water is only water.',
        textVn: '**Tinh khiết (pure):** chỉ chứa một chất. Nước tinh khiết chỉ có nước.',
        textFr: '**Pur (pure) :** contient une seule substance. L’eau pure, c’est seulement de l’eau.',
      },
    ],
  },

  // 16. Mineral water (write) + book question 4
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Droplets',
    eyebrow: "Learner's Book, page 68",
    eyebrowVn: 'Sách học sinh, trang 68',
    eyebrowFr: 'Livre de l’élève, page 68',
    title: 'Mineral Water',
    titleVn: 'Nước khoáng',
    titleFr: 'Eau minérale',
    ratio: 45,
    inlineSvg: DIAGRAMS.MINERAL_LABEL,
    content: '> **4.** List the **three** most abundant minerals. (most abundant = the most)',
    contentVn: '> **4.** Kể tên **ba** khoáng chất có nhiều nhất. (most abundant = nhiều nhất)',
    contentFr: '> **4.** Nomme les **trois** minéraux les plus abondants. (most abundant = le plus)',
    notes: [
      {
        tone: 'write',
        text: '**Mineral:** a natural substance from rocks. Mineral water is a mixture: water and minerals.',
        textVn: '**Khoáng chất (mineral):** một chất tự nhiên từ đất đá. Nước khoáng là hỗn hợp: nước và khoáng chất.',
        textFr: '**Minéral (mineral) :** une substance naturelle venant des roches. L’eau minérale est un mélange : eau et minéraux.',
      },
    ],
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifier',
      answer: 'bicarbonate (248), calcium (55), chloride (37)',
      answerVn: 'bicarbonate (248), calcium (55), chloride (37)',
      answerFr: 'bicarbonate (248), calcium (55), chloride (37)',
    },
  },

  // 17. Vote. No answer on this slide.
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowVn: 'Biểu quyết bằng một tay',
    eyebrowFr: 'Vote avec une main',
    title: 'Is Tap Water Pure?',
    titleVn: 'Nước máy có tinh khiết không?',
    titleFr: 'L’eau du robinet est-elle pure ?',
    text: 'Water from the tap. Pure, or a mixture?',
    textVn: 'Nước từ vòi. Tinh khiết, hay hỗn hợp?',
    textFr: 'L’eau du robinet. Pure, ou un mélange ?',
    columns: [
      { heading: 'A · left hand up', headingVn: 'A · giơ tay trái', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_PURE },
      { heading: 'B · right hand up', headingVn: 'B · giơ tay phải', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_MIXTURE },
    ],
  },

  // 18. Evaporating basin (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Beaker',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Evaporating Basin',
    titleVn: 'Bát cô cạn',
    titleFr: 'Capsule d’évaporation',
    ratio: 40,
    image: basin,
    content: 'Boil the tap water away. Is anything **left**?',
    contentVn: 'Đun cho nước máy bay hơi hết. Có gì **còn lại** không?',
    contentFr: 'Fais bouillir l’eau du robinet jusqu’au bout. Reste-t-il **quelque chose** ?',
    notes: [
      {
        tone: 'write',
        text: '**Evaporating basin:** a dish for heating a liquid until the water evaporates.',
        textVn: '**Bát cô cạn (evaporating basin):** cái bát dùng để đun chất lỏng cho đến khi nước bay hơi hết.',
        textFr: '**Capsule d’évaporation (evaporating basin) :** un bol pour chauffer un liquide jusqu’à ce que l’eau s’évapore.',
      },
    ],
  },

  // 19. The answer: something is left behind
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'Look in your kettle at home',
    eyebrowVn: 'Nhìn vào ấm đun nước ở nhà',
    eyebrowFr: 'Regarde dans ta bouilloire à la maison',
    title: 'Something Is Left Behind',
    titleVn: 'Có thứ còn lại',
    titleFr: 'Il reste quelque chose',
    ratio: 40,
    image: kettle,
    content:
      '**A mixture!** A white solid is left.\n\n' +
      'It was **dissolved** in the water. It came from the rocks.',
    contentVn:
      '**Hỗn hợp!** Còn lại một chất rắn màu trắng.\n\n' +
      'Nó đã **hòa tan** trong nước. Nó đến từ đất đá.',
    contentFr:
      '**Un mélange !** Il reste un solide blanc.\n\n' +
      'Il était **dissous** dans l’eau. Il venait des roches.',
  },

  // 20. Book questions 1–5 (Think like a scientist, p. 69)
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: "Learner's Book, page 69",
    eyebrowVn: 'Sách học sinh, trang 69',
    eyebrowFr: 'Manuel, page 69',
    title: 'Is Water Really a Mixture?',
    titleVn: 'Nước có thật là hỗn hợp?',
    titleFr: 'L’eau, un vrai mélange ?',
    content:
      '> **1.** Use particles to explain why the water evaporated. **2.** What was left in the basin?\n' +
      '> **3.** Where did it come from? **4.** Was the water pure, or a mixture? Explain. **5.** Why wear safety glasses?',
    contentVn:
      '> **1.** Dùng kiến thức về hạt để giải thích vì sao nước bay hơi. **2.** Cái gì còn lại trong bát?\n' +
      '> **3.** Nó đến từ đâu? **4.** Nước đó tinh khiết hay là hỗn hợp? Giải thích. **5.** Vì sao phải đeo kính bảo hộ?',
    contentFr:
      '> **1.** Explique l’évaporation avec les particules. **2.** Que reste-t-il dans la capsule ?\n' +
      '> **3.** D’où vient-il ? **4.** Eau pure, ou mélange ? Explique. **5.** Pourquoi des lunettes de protection ?',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifier',
      answer: '**1.** Heat gives the particles energy. They move fast enough to escape as a gas. **2.** a white solid (minerals) **3.** dissolved in the water, from rocks **4.** A mixture: something else was in it. **5.** Hot liquid can spit.',
      answerVn: '**1.** Nhiệt cho các hạt năng lượng. Chúng chuyển động đủ nhanh để thoát ra thành khí. **2.** chất rắn màu trắng (khoáng chất) **3.** hòa tan trong nước, từ đất đá **4.** Hỗn hợp: có chất khác trong đó. **5.** Chất lỏng nóng có thể bắn ra.',
      answerFr: '**1.** Chauffées, les particules ont assez d’énergie pour s’échapper en gaz. **2.** un solide blanc (minéraux) **3.** dissous dans l’eau, des roches **4.** Un mélange : il y avait autre chose. **5.** Le liquide chaud gicle.',
    },
  },

  // 21. Game: left hand mixture, right hand compound
  {
    layout: 'game',
    title: 'Mixture or Compound?',
    titleVn: 'Hỗn hợp hay hợp chất?',
    titleFr: 'Mélange ou composé ?',
    widget: MixtureOrCompound,
  },

  // ── CLOSE ──────────────────────────────────────────────────────────────────
  // 22. Homework
  {
    layout: 'callout',
    accent: RED,
    icon: 'Home',
    eyebrow: 'At home',
    eyebrowVn: 'Ở nhà',
    eyebrowFr: 'À la maison',
    title: 'Read a Water Label',
    titleVn: 'Đọc nhãn chai nước',
    titleFr: 'Lis l’étiquette d’une eau',
    notes: [
      {
        tone: 'homework',
        badge: 'Homework',
        badgeVn: 'Bài tập về nhà',
        badgeFr: 'Devoirs',
        icon: 'Pencil',
        text: '1. Find a bottle of water at home or in a shop.\n2. Copy the minerals from its label.\n3. Circle the **three** most abundant.\nNo minerals on the label? Write that down too.',
        textVn: '1. Tìm một chai nước ở nhà hoặc ở cửa hàng.\n2. Chép các khoáng chất trên nhãn.\n3. Khoanh tròn **ba** khoáng chất nhiều nhất.\nNhãn không ghi khoáng chất? Cũng ghi lại điều đó.',
        textFr: '1. Trouve une bouteille d’eau à la maison ou dans un magasin.\n2. Recopie les minéraux de l’étiquette.\n3. Entoure les **trois** plus abondants.\nPas de minéraux sur l’étiquette ? Note-le aussi.',
      },
    ],
  },

  // 23. Checklist (the book's summary checklist)
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 1,
    eyebrow: 'Before you leave',
    eyebrowVn: 'Trước khi ra về',
    eyebrowFr: 'Avant de partir',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    titleFr: 'Sais-tu faire ça ?',
    content: '> Check your notebook: **10 written panels** and **1 drawing**.',
    contentVn: '> Kiểm tra vở: **10 khung ghi chép** và **1 hình vẽ**.',
    contentFr: '> Vérifie ton cahier : **10 encadrés écrits** et **1 dessin**.',
    items: [
      { text: 'Tell a **compound** from a **mixture**.', textVn: 'Phân biệt **hợp chất** với **hỗn hợp**.', textFr: 'Distingue un **composé** d’un **mélange**.' },
      { text: 'Explain the **difference** between a compound and a mixture.', textVn: 'Giải thích **sự khác nhau** giữa hợp chất và hỗn hợp.', textFr: 'Explique la **différence** entre un composé et un mélange.' },
      { text: 'Give **examples** of mixtures.', textVn: 'Nêu **ví dụ** về hỗn hợp.', textFr: 'Donne des **exemples** de mélanges.' },
    ],
  },

  // 24. Exit question
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
    subtitle: 'Exit question: **salt water**. Mixture or compound? Why?',
    subtitleVn: 'Câu hỏi ra về: **nước muối**. Hỗn hợp hay hợp chất? Vì sao?',
    subtitleFr: 'Question de sortie : **l’eau salée**. Mélange ou composé ? Pourquoi ?',
  },
]

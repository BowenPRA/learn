// content/y7-math/U07_1a/slides.js
// Year 7 Mathematics · 7.1 Ordering fractions, PART 1: Fractions and Mixed
// Numbers. One 50-minute period, the first of Unit 7. Part 2 (ordering
// fractions: common denominators, order of size) is the next period. Source:
// Workbook Unit 7, Section 7.1 (pp. 80–82) and the Teacher Resource's 7.1
// ideas; there is no Learner's Book for this unit. Every number used in class
// is original, so Exercise 7.1 is unspent. No homework slide.
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from Unit 4 / 15 October:
// every string has an …Fr twin and no …Vn twin. The diagrams stay in English.
//
// SLOWLY, AND IN PICTURES (Mr Bowen, 16 November: "not too fast or too
// confusing … I really like visual representations of fractions"). One picture
// language from start to finish: a bar or a pizza is one whole, cut into equal
// parts; teal is shaded; a fraction is written stacked.
//
// THE ARC (the shape of Coffee, Carbon and Stars, 3.4 Tides, 5.2, 6.2):
//   Words       3 chocolate pieces of 4 = how many of 8? (a guess, kept for
//               later). Numerator and denominator on a real pizza; equal parts
//               only; saying fractions in English; what fraction is shaded?
//   Same amount Cut every quarter again, one press at a time (3/4 → 15/20).
//               Back to the starter, and a real 12-piece bar. A vote: is 2/3
//               equal to 3/4 (add 1) or 4/6 (× 2)? Bars settle it. The fraction
//               wall, found in pairs before each line is drawn. Whiteboards.
//   Wholes      What happens next? Mr Bowen's party: nobody comes, he eats 11
//               slices. Slice by slice: 11/4 = 2¾ on pizzas and a number line.
//               Improper fraction and mixed number; both ways (divide; multiply
//               and add); whiteboards; a vote (13/4 or 3½?) settled on a number
//               line. Same Amount or Not?, standing. Draw 11/4 = 2¾. Three
//               deadpan word problems, each sillier.
//
// The goals slide (2) and the checklist (24) say the same three things; the
// starter comes back on slide 7 and the party on slide 13.
//
// COPY-DOWN: 4 written panels — numerator and denominator (3), equivalent
// fractions (9), improper fraction and mixed number (14), both ways (15) — and
// 1 drawing: 11/4 = 2¾ (20). Each panel is the fact only; a line under it is
// read, not copied.
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.
import { DIAGRAMS } from './diagrams.js'
import { CutEveryPiece } from './cut.jsx'
import { FractionWall } from './wall.jsx'
import { PartyStory } from './story.jsx'
import { SliceBySlice } from './slices.jsx'
import { SameOrNot } from './game.jsx'
import chocolate from './images/chocolate.jpg'
import banhchung from './images/banhchung.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // WORDS — what a fraction says
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter: the chocolate bar
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'LayoutGrid',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 7 · 7.1 · Part 1',
    eyebrowFr: 'Unité 7 · 7.1 · Partie 1',
    title: 'Fractions and Mixed Numbers',
    titleFr: 'Fractions et nombres mixtes',
    card: {
      icon: 'Pencil',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'A chocolate bar has **4** pieces. Mr Bowen eats **3**. Now the same bar is cut into **8** smaller pieces. How many small pieces is **the same amount**? **Guess** and write it down.',
      textFr: 'Une tablette de chocolat a **4** morceaux. M. Bowen en mange **3**. Maintenant, la même tablette est coupée en **8** petits morceaux. Combien de petits morceaux font **la même quantité**\u00a0? **Devine** et écris-le.',
    },
  },

  // 2. Today's goals (the checklist on slide 24 ticks off the same three)
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Today',
    eyebrowFr: 'Aujourd’hui',
    title: 'Today You Will…',
    titleFr: 'Aujourd’hui, tu vas…',
    text: 'Read fractions. Then write them in **new ways**.',
    textFr: 'Lire des fractions. Puis les écrire **autrement**.',
    columns: [
      {
        heading: 'Say it',
        headingFr: 'Le dire',
        accent: TEAL,
        icon: 'MessageSquare',
        inlineSvg: DIAGRAMS.PIC_SAY,
        caption: 'Say a fraction in English.',
        captionFr: 'Dire une fraction en anglais.',
      },
      {
        heading: 'The same amount',
        headingFr: 'La même quantité',
        accent: BLUE,
        icon: 'Equal',
        inlineSvg: DIAGRAMS.PIC_SAME,
        caption: 'Write the same amount two ways.',
        captionFr: 'Écrire une quantité de deux façons.',
      },
      {
        heading: 'Wholes and parts',
        headingFr: 'Entiers et parts',
        accent: ORANGE,
        icon: 'Circle',
        inlineSvg: DIAGRAMS.PIC_WHOLES,
        caption: 'Count the wholes, then the part.',
        captionFr: 'Compter les entiers, puis la part.',
      },
    ],
  },

  // 3. Numerator and denominator (write), on a real pizza
  {
    layout: 'split',
    accent: TEAL,
    icon: 'LayoutGrid',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Numerator and Denominator',
    titleFr: 'Numérateur et dénominateur',
    ratio: 45,
    inlineSvg: DIAGRAMS.NUM_DEN,
    content: 'Mr Bowen eats **3** of the **8** equal slices.',
    contentFr: 'M. Bowen mange **3** des **8** parts égales.',
    notes: [
      {
        tone: 'write',
        text: '**Numerator:** the top number. How many parts.\n**Denominator:** the bottom number. How many **equal** parts make one whole.',
        textFr: '**Numérateur (numerator)\u00a0:** le nombre du haut. Combien de parts.\n**Dénominateur (denominator)\u00a0:** le nombre du bas. Combien de parts **égales** font un entier.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'Say it: **three eighths**, or **3 out of 8**.',
        textFr: 'En anglais\u00a0: **three eighths**, ou **3 out of 8** (3 sur 8).',
      },
    ],
  },

  // 4. English check: how fractions are said
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Say It in English',
    titleFr: 'Dis-le en anglais',
    inlineSvg: DIAGRAMS.SAY_IT,
    caption: '**Half**, **third** and **quarter** are special. Then add **-th**: fifth, sixth, tenth. More than one: add **s**.',
    captionFr: '**Half**, **third**, **quarter** (demi, tiers, quart), puis **-th**\u00a0: fifth = cinquième. Plusieurs\u00a0: ajoute **s**.',
  },

  // 5. Whiteboards: what fraction is shaded? (a and d, 1/3 and 2/6, are the same
  // amount; not 2/3 and 4/6, which would answer the vote on slide 8)
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Whiteboards',
    eyebrowFr: 'Ardoises',
    title: 'What Fraction Is Shaded?',
    titleFr: 'Quelle fraction est coloriée\u00a0?',
    ratio: 40,
    inlineSvg: DIAGRAMS.WHAT_FRACTION,
    content: '**Shaded** = coloured in.\n\nWrite each fraction. Say it in English.\n\nWhich **two** show **the same amount**?',
    contentFr: '**Shaded** = colorié.\n\nÉcris chaque fraction. Dis-la en anglais.\n\nLesquelles **deux** montrent **la même quantité**\u00a0?',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $\\dfrac{1}{3}$ one third, **b** $\\dfrac{5}{6}$ five sixths\n**c** $\\dfrac{3}{8}$ three eighths, **d** $\\dfrac{2}{6}$ two sixths\n**a** and **d** are the same amount.',
      answerFr: '**a** $\\dfrac{1}{3}$ one third, **b** $\\dfrac{5}{6}$ five sixths\n**c** $\\dfrac{3}{8}$ three eighths, **d** $\\dfrac{2}{6}$ two sixths\n**a** et **d** montrent la même quantité.',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // THE SAME AMOUNT — equivalent fractions
  // ════════════════════════════════════════════════════════════════════════

  // 6. The stepper: say it first
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Grid3x3',
    eyebrow: 'Say it first',
    eyebrowFr: 'Dis-le d’abord',
    title: 'Cut Every Piece',
    titleFr: 'Coupe chaque morceau',
    widget: CutEveryPiece,
    caption: 'Before each cut: how many pieces? How many shaded? Say the fraction.',
    captionFr: 'Avant chaque coupe\u00a0: combien de morceaux\u00a0? Combien de coloriés\u00a0? Dis la fraction.',
  },

  // 7. Back to the starter, and a real bar of 12
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Target',
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au début',
    title: 'The Same Amount',
    titleFr: 'La même quantité',
    ratio: 50,
    image: chocolate,
    content: 'Mr Bowen ate **3** pieces of **4**. How many pieces of **8** is the same amount?\n\nThis real bar has **12** equal pieces. How many is the same amount?',
    contentFr: 'M. Bowen a mangé **3** morceaux sur **4**. Combien de morceaux sur **8** font la même quantité\u00a0?\n\nCette vraie tablette a **12** morceaux égaux. Combien font la même quantité\u00a0?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**6** pieces: $\\dfrac{3}{4} = \\dfrac{6}{8}$\n**9** pieces: $\\dfrac{3}{4} = \\dfrac{9}{12}$',
      answerFr: '**6** morceaux\u00a0: $\\dfrac{3}{4} = \\dfrac{6}{8}$\n**9** morceaux\u00a0: $\\dfrac{3}{4} = \\dfrac{9}{12}$',
    },
  },

  // 8. Vote: add 1, or multiply by 2?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Which Is Equal?',
    titleFr: 'Laquelle est égale\u00a0?',
    text: 'Which fraction is **equal to** $\\dfrac{2}{3}$?',
    textFr: 'Quelle fraction est **égale à** $\\dfrac{2}{3}$\u00a0?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_34 },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_46 },
    ],
  },

  // 9. Answer B: the bars settle it (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Equal',
    eyebrow: 'Answer: B',
    eyebrowFr: 'Réponse\u00a0: B',
    title: 'Equivalent Fractions',
    titleFr: 'Fractions équivalentes',
    ratio: 45,
    inlineSvg: DIAGRAMS.ADD_OR_TIMES,
    content: '**Multiply**. Never add.',
    contentFr: '**Multiplie**. N’ajoute jamais.',
    notes: [
      {
        tone: 'write',
        text: '**Equivalent fractions:** fractions that show the same amount.\nMultiply or divide the top and the bottom by the **same number**.',
        textFr: '**Fractions équivalentes (equivalent fractions)\u00a0:** des fractions qui montrent la même quantité.\nMultiplie ou divise le haut et le bas par le **même nombre**.',
      },
      {
        tone: 'info',
        badge: false,
        text: '$\\dfrac{2}{3} = \\dfrac{4}{6} = \\dfrac{6}{9} = \\dfrac{8}{12}$',
        textFr: '$\\dfrac{2}{3} = \\dfrac{4}{6} = \\dfrac{6}{9} = \\dfrac{8}{12}$',
      },
    ],
  },

  // 10. The fraction wall: find them in pairs, then draw each line
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Layers',
    eyebrow: 'Pairs · one minute',
    eyebrowFr: 'À deux · une minute',
    title: 'The Fraction Wall',
    titleFr: 'Le mur des fractions',
    widget: FractionWall,
    caption: 'Find every fraction **equal to** one half. Then press **Line at 1/2**.',
    captionFr: 'Trouve toutes les fractions **égales à** un demi. Puis appuie sur **Ligne à 1/2**.',
  },

  // 11. Whiteboards: fill the box; = or ≠
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowFr: 'Ardoises',
    title: 'Fill the Box',
    titleFr: 'Complète',
    ratio: 40,
    inlineSvg: DIAGRAMS.FILL_BOX,
    content: '**a** to **d**: write the missing number.\n\n**e** and **f**: write **=** or **≠**.',
    contentFr: '**a** à **d**\u00a0: écris le nombre qui manque.\n\n**e** et **f**\u00a0: écris **=** ou **≠**.',
    notes: [
      {
        tone: 'info',
        badge: 'Tip',
        badgeFr: 'Astuce',
        text: '**=** means **is equal to**. **≠** means **is not equal to**.',
        textFr: '**=** se dit **is equal to** (est égal à). **≠** se dit **is not equal to** (n’est pas égal à).',
      },
    ],
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 6, **b** 6, **c** 24, **d** 3 (÷ 4)\n**e** = (× 3), **f** ≠ (adding 1 does not work)',
      answerFr: '**a** 6, **b** 6, **c** 24, **d** 3 (÷ 4)\n**e** = (× 3), **f** ≠ (ajouter 1 ne marche pas)',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // WHOLES AND PARTS — improper fractions and mixed numbers
  // ════════════════════════════════════════════════════════════════════════

  // 12. What happens next? Mr Bowen's party, one panel per press (deadpan)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Sparkles',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite\u00a0?',
    title: 'Mr Bowen’s Party',
    titleFr: 'La fête de M. Bowen',
    widget: PartyStory,
    caption: 'Before each step, **predict**: what happens next?',
    captionFr: 'Avant chaque étape, **prédis**\u00a0: que se passe-t-il ensuite\u00a0?',
  },

  // 13. Slice by slice: 1/4 … 11/4, said two ways
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Circle',
    eyebrow: 'Say it two ways',
    eyebrowFr: 'Dis-le de deux façons',
    title: 'Slice by Slice',
    titleFr: 'Part après part',
    widget: SliceBySlice,
    caption: 'Put his **11** slices back together. Say each number two ways **before** the press.',
    captionFr: 'Rassemble ses **11** parts. Dis chaque nombre de deux façons **avant** le clic.',
  },

  // 14. Improper fraction and mixed number (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Circle',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Improper Fraction, Mixed Number',
    titleFr: 'Fraction impropre, nombre mixte',
    ratio: 45,
    inlineSvg: DIAGRAMS.IMPROPER_MIXED,
    content: 'Mr Bowen ate $2\\dfrac{3}{4}$ pizzas. Say it: **two and three quarters**.',
    contentFr: 'M. Bowen a mangé $2\\dfrac{3}{4}$ pizzas. En anglais\u00a0: **two and three quarters**.',
    notes: [
      {
        tone: 'write',
        text: '**Improper fraction:** the numerator is bigger than the denominator. $\\dfrac{11}{4}$\n**Mixed number:** a whole number and a fraction. $2\\dfrac{3}{4}$',
        textFr: '**Fraction impropre (improper fraction)\u00a0:** le numérateur est plus grand que le dénominateur. $\\dfrac{11}{4}$\n**Nombre mixte (mixed number)\u00a0:** un nombre entier et une fraction. $2\\dfrac{3}{4}$',
      },
      {
        tone: 'info',
        badge: false,
        text: 'An improper fraction is **more than 1** whole.',
        textFr: 'Une fraction impropre vaut **plus d’un** entier.',
      },
    ],
  },

  // 15. Both ways: divide; multiply, then add (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ArrowLeftRight',
    eyebrow: 'The method',
    eyebrowFr: 'La méthode',
    title: 'Change It Both Ways',
    titleFr: 'Dans les deux sens',
    ratio: 45,
    inlineSvg: DIAGRAMS.BOTH_WAYS,
    content: '**Remainder** = what is left over.',
    contentFr: '**Remainder** (le reste) = ce qui reste.',
    notes: [
      {
        tone: 'write',
        text: '**Improper → mixed:** divide.\n$11 ÷ 4 = 2$ remainder $3$, so $\\dfrac{11}{4} = 2\\dfrac{3}{4}$\n**Mixed → improper:** multiply, then add.\n$2 × 4 + 3 = 11$, so $2\\dfrac{3}{4} = \\dfrac{11}{4}$',
        textFr: '**Impropre → mixte\u00a0:** divise.\n$11 ÷ 4 = 2$ reste $3$, donc $\\dfrac{11}{4} = 2\\dfrac{3}{4}$\n**Mixte → impropre\u00a0:** multiplie, puis ajoute.\n$2 × 4 + 3 = 11$, donc $2\\dfrac{3}{4} = \\dfrac{11}{4}$',
      },
    ],
  },

  // 16. Whiteboards: both ways (b and f undo each other)
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowFr: 'Ardoises',
    title: 'Change These',
    titleFr: 'Transforme-les',
    ratio: 40,
    inlineSvg: DIAGRAMS.CHANGE_THESE,
    content: '**a** to **d**: write as a **mixed number**.\n\n**e** to **g**: write as an **improper fraction**.',
    contentFr: '**a** à **d**\u00a0: écris en **nombre mixte**.\n\n**e** à **g**\u00a0: écris en **fraction impropre**.',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $2\\dfrac{1}{4}$, **b** $2\\dfrac{3}{5}$, **c** $5\\dfrac{2}{3}$, **d** $2\\dfrac{3}{10}$\n**e** $\\dfrac{7}{2}$, **f** $\\dfrac{13}{5}$, **g** $\\dfrac{14}{3}$',
      answerFr: '**a** $2\\dfrac{1}{4}$, **b** $2\\dfrac{3}{5}$, **c** $5\\dfrac{2}{3}$, **d** $2\\dfrac{3}{10}$\n**e** $\\dfrac{7}{2}$, **f** $\\dfrac{13}{5}$, **g** $\\dfrac{14}{3}$',
    },
  },

  // 17. Vote: 13/4 or 3½?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Which Is Bigger?',
    titleFr: 'Lequel est le plus grand\u00a0?',
    text: 'Which is **bigger**?',
    textFr: 'Lequel est **le plus grand**\u00a0?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_134 },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_312 },
    ],
  },

  // 18. Answer B, on a number line
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'Answer: B',
    eyebrowFr: 'Réponse\u00a0: B',
    title: 'Change It First',
    titleFr: 'Transforme d’abord',
    inlineSvg: DIAGRAMS.NUMBER_LINE,
    caption: '$13 ÷ 4 = 3$ remainder $1$, so $\\dfrac{13}{4} = 3\\dfrac{1}{4}$. That is less than $3\\dfrac{1}{2}$.',
    captionFr: '$13 ÷ 4 = 3$ reste $1$, donc $\\dfrac{13}{4} = 3\\dfrac{1}{4}$. C’est moins que $3\\dfrac{1}{2}$.',
  },

  // 19. Same Amount or Not? The whole class, standing
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Trophy',
    eyebrow: 'A game · everyone stands',
    eyebrowFr: 'Un jeu · tout le monde debout',
    title: 'Same Amount or Not?',
    titleFr: 'Même quantité ou pas\u00a0?',
    widget: SameOrNot,
    caption: '**Arms up:** the same. **Arms down:** not the same. The last ones standing win a prize ticket!',
    captionFr: '**Bras en haut\u00a0:** pareil. **Bras en bas\u00a0:** pas pareil. Les derniers debout gagnent un ticket\u00a0!',
  },

  // 20. Put it together: draw 11/4 = 2¾
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Put it together · draw this',
    eyebrowFr: 'En résumé · à dessiner',
    title: 'Eleven Quarters',
    titleFr: 'Onze quarts',
    ratio: 40,
    inlineSvg: DIAGRAMS.DRAW_THIS,
    drawThis: true,
    content: 'Copy it all: the fractions, the **pizzas**, the **division** and the **number line**.',
    contentFr: 'Recopie tout\u00a0: les fractions, les **pizzas**, la **division** et la **droite graduée**.',
  },

  // ════════════════════════════════════════════════════════════════════════
  // WORD PROBLEMS — deadpan, and each one sillier
  // ════════════════════════════════════════════════════════════════════════

  // 21. Tết: 14 pieces of an 8-piece bánh chưng
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Bánh Chưng',
    titleFr: 'Le bánh chưng de M. Bowen',
    ratio: 50,
    image: banhchung,
    content: 'A bánh chưng is cut into **8** equal pieces. At Tết, Mr Bowen’s family eats **14** pieces.\n\nHow many bánh chưng is that? Write it as a **mixed number**.',
    contentFr: 'Un bánh chưng est coupé en **8** parts égales. Au Têt, la famille de M. Bowen mange **14** parts.\n\nCombien de bánh chưng cela fait-il\u00a0? Écris-le en **nombre mixte**.',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '$\\dfrac{14}{8}$, and $14 ÷ 8 = 1$ remainder $6$. So $1\\dfrac{6}{8} = 1\\dfrac{3}{4}$ bánh chưng.',
      answerFr: '$\\dfrac{14}{8}$, et $14 ÷ 8 = 1$ reste $6$. Donc $1\\dfrac{6}{8} = 1\\dfrac{3}{4}$ bánh chưng.',
    },
  },

  // 22. The cat (equivalent fractions)
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Cat',
    titleFr: 'Le chat de M. Bowen',
    content:
      'Mr Bowen cuts a cake into **12** equal slices. He eats **9**.\n\n' +
      'His cat says: “You ate $\\dfrac{3}{4}$ of the cake.”\n\n' +
      'Is the cat right?',
    contentFr:
      'M. Bowen coupe un gâteau en **12** parts égales. Il en mange **9**.\n\n' +
      'Son chat dit\u00a0: «\u00a0Tu as mangé $\\dfrac{3}{4}$ du gâteau.\u00a0»\n\n' +
      'Le chat a-t-il raison\u00a0?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: 'Yes. $\\dfrac{9}{12} = \\dfrac{3}{4}$ (÷ 3 top and bottom).\n\nThe cat is good at fractions.',
      answerFr: 'Oui. $\\dfrac{9}{12} = \\dfrac{3}{4}$ (÷ 3 en haut et en bas).\n\nLe chat est fort en fractions.',
    },
  },

  // 23. Nine quarters of one pizza
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Pizza',
    titleFr: 'La pizza de M. Bowen',
    content:
      'Mr Bowen says: “I ate $\\dfrac{9}{4}$ of my pizza.”\n\n' +
      'His doctor says that is not possible with one pizza.\n\n' +
      'How many pizzas did Mr Bowen have, **at least**?',
    contentFr:
      'M. Bowen dit\u00a0: «\u00a0J’ai mangé $\\dfrac{9}{4}$ de ma pizza.\u00a0»\n\n' +
      'Son médecin dit que c’est impossible avec une seule pizza.\n\n' +
      'Combien de pizzas M. Bowen avait-il, **au moins**\u00a0?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '$\\dfrac{9}{4} = 2\\dfrac{1}{4}$: more than 2 whole pizzas. So **3** pizzas, at least.\n\nHe has not finished the third one. Yet.',
      answerFr: '$\\dfrac{9}{4} = 2\\dfrac{1}{4}$\u00a0: plus de 2 pizzas entières. Donc **3** pizzas, au moins.\n\nIl n’a pas fini la troisième. Pas encore.',
    },
  },

  // ── CLOSE ─────────────────────────────────────────────────────────────────
  // 24. Checklist: slide 2's goals, with the key words
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you leave',
    eyebrowFr: 'Avant de partir',
    title: 'Can You Do These?',
    titleFr: 'Sais-tu faire ceci\u00a0?',
    content: '> Check your notebook: **4 written panels** and **1 drawing**.',
    contentFr: '> Vérifie ton cahier\u00a0: **4 encadrés recopiés** et **1 dessin**.',
    items: [
      { text: 'Say a fraction in English: the **numerator** over the **denominator**.', textFr: 'Dire une fraction en anglais\u00a0: le **numérateur** sur le **dénominateur**.' },
      { text: 'Make **equivalent fractions**: multiply, never add.', textFr: 'Faire des **fractions équivalentes**\u00a0: multiplier, jamais ajouter.' },
      { text: 'Change an **improper fraction** to a **mixed number**, and back.', textFr: 'Passer d’une **fraction impropre** à un **nombre mixte**, et l’inverse.' },
      { text: 'Compare them: change to a mixed number first.', textFr: 'Les comparer\u00a0: d’abord en nombre mixte.' },
    ],
  },

  // 25. Exit
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Target',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'Wholes and Parts',
    titleFr: 'Entiers et parts',
    subtitle: 'Write $\\frac{17}{5}$ as a **mixed number**. Write $2\\frac{2}{3}$ as an **improper fraction**. Is $\\frac{2}{3}$ equal to $\\frac{10}{15}$?',
    subtitleFr: 'Écris $\\frac{17}{5}$ en **nombre mixte**. Écris $2\\frac{2}{3}$ en **fraction impropre**. $\\frac{2}{3}$ est-il égal à $\\frac{10}{15}$\u00a0?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '$3\\dfrac{2}{5}$, then $\\dfrac{8}{3}$, and **yes**: $\\dfrac{2}{3} = \\dfrac{10}{15}$ (× 5).',
      answerFr: '$3\\dfrac{2}{5}$, puis $\\dfrac{8}{3}$, et **oui**\u00a0: $\\dfrac{2}{3} = \\dfrac{10}{15}$ (× 5).',
    },
  },
]

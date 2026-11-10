// content/y7-math/U04_5/slides.js
// Year 7 Mathematics · 4.5 Making decimal calculations easier. Friday 16
// October 2026, one period — the second decimal day, after the 4.1–4.4 speed
// run (U04_1_4). Source: Workbook Unit 4, Section 4.5 (pp. 62–63). Every
// number used in class is original, so the Workbook exercise is still unspent.
// No homework slide, at Mr Bowen's request (14 Oct). English and French only.
//
// WRITING RULE FOR THIS DECK (the 2.5 Science density): short sentences, one
// idea each, and the body text never repeats the write note.
//
// ONE IDEA: SAME ANSWER, LESS WORK. Every method in 4.5 swaps a hard
// calculation for an easy one:
//
//   × 0.2       is   ÷ 10, then × 2            (0.2 is two tenths)
//   × 0.5       is   ÷ 2                        (half of)
//   × 0.25      is   ÷ 4                        (a quarter of)
//   × 9, × 11   is   × 10, then one lot less or one lot more
//   4.3 × 6     is   4 × 6 + 0.3 × 6           (partitioning)
//
// THE SURPRISE THAT MAKES IT STICK: multiplying by a decimal less than 1 makes
// a number SMALLER. Slide 5 is the vote (250 × 0.2: 50 or 500?), slide 6 the
// bar that settles it.
//
// THE ENGLISH: "equivalent" (equal in value), "of" meaning × (half of, a
// quarter of, a tenth of), and "partition", which in everyday English is a
// wall that splits a room. Slides 3, 9 and 12.
//
// COPY-DOWN: 5 written panels — equivalent fraction · multiplying by a decimal
// · half, quarter, tenth · × 9 and × 11 · partitioning.
import { DIAGRAMS } from './diagrams.js'
import { MakeItEasy } from './widgets.jsx'
import pizza from './images/pizza.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'
const RED = '#c8102e'

export const slides = [
  // 1. Hero + starter: yesterday's work, then a look ahead
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Sigma',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 4 · 4.5',
    eyebrowFr: 'Unité 4 · 4.5',
    date: '16 Oct 2026',
    title: 'Making Calculations Easier',
    titleFr: 'Rendre les calculs plus faciles',
    subtitle: 'Same answer, less work.',
    subtitleFr: 'Même réponse, moins de travail.',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeFr: 'Pour commencer',
      text: 'Work out **1.4 × 3** and **9.3 ÷ 3**. Then write **0.3** and **0.07** as fractions.',
      textFr: 'Calcule **1.4 × 3** et **9.3 ÷ 3**. Puis écris **0.3** et **0.07** en fractions.',
    },
  },

  // 2. Starter check
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Starter check',
    eyebrowFr: 'Correction',
    title: 'One Old, One New',
    titleFr: 'Un ancien, un nouveau',
    text: '$1.4 × 3 = 4.2$ and $9.3 ÷ 3 = 3.1$',
    textFr: '$1.4 × 3 = 4.2$ et $9.3 ÷ 3 = 3.1$',
    sub: 'And the fractions? Which column is the last digit in?',
    subFr: 'Et les fractions ? Dans quelle colonne est le dernier chiffre ?',
    reveal: {
      label: 'Show the fractions',
      labelFr: 'Voir les fractions',
      answer: '$0.3 = \\frac{3}{10}$ and $0.07 = \\frac{7}{100}$',
      answerFr: '$0.3 = \\frac{3}{10}$ et $0.07 = \\frac{7}{100}$',
    },
  },

  // ── EQUIVALENT FRACTIONS ──────────────────────────────────────────────────
  // 3. Key word
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Equal',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Equivalent Fraction',
    titleFr: 'Fraction équivalente',
    ratio: 40,
    inlineSvg: DIAGRAMS.PV_FRACTIONS,
    content: '**Equivalent** means **equal in value**.',
    contentFr: '**Equivalent** veut dire **de même valeur**.',
    notes: [
      {
        tone: 'write',
        text: '**Equivalent fraction:** a fraction with the same value as the decimal.\n$0.3 = \\frac{3}{10}$ and $0.07 = \\frac{7}{100}$',
        textFr: '**Fraction équivalente (equivalent fraction) :** une fraction de même valeur que le décimal.\n$0.3 = \\frac{3}{10}$ et $0.07 = \\frac{7}{100}$',
      },
    ],
  },

  // 4. Practice. c and d are needed later in the lesson.
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowFr: 'Ardoises',
    title: 'Write It as a Fraction',
    titleFr: 'Écris-le en fraction',
    ratio: 50,
    content:
      'Write each one as a fraction.\n\n' +
      '**a** $0.9$ and **b** $0.04$\n' +
      '**c** $0.5$ and **d** $0.25$',
    contentFr:
      'Écris chacun en fraction.\n\n' +
      '**a** $0.9$ et **b** $0.04$\n' +
      '**c** $0.5$ et **d** $0.25$',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $\\frac{9}{10}$, **b** $\\frac{4}{100}$, **c** $\\frac{5}{10} = \\frac{1}{2}$, **d** $\\frac{25}{100} = \\frac{1}{4}$\n\nRemember **c** and **d**. You need them today.',
      answerFr: '**a** $\\frac{9}{10}$, **b** $\\frac{4}{100}$, **c** $\\frac{5}{10} = \\frac{1}{2}$, **d** $\\frac{25}{100} = \\frac{1}{4}$\n\nRetiens **c** et **d**. Tu en as besoin aujourd’hui.',
    },
  },

  // ── MULTIPLYING BY A DECIMAL ──────────────────────────────────────────────
  // 5. Vote. "Multiplying makes bigger" pulls toward 500.
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Which Is Right?',
    titleFr: 'Laquelle est juste ?',
    text: 'Work out $250 × 0.2$',
    textFr: 'Calcule $250 × 0.2$',
    columns: [
      {
        heading: 'A · left hand up',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_50,
      },
      {
        heading: 'B · right hand up',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_500,
      },
    ],
  },

  // 6. The bar settles it
  {
    layout: 'showcase',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Two tenths',
    eyebrowFr: 'Deux dixièmes',
    title: 'Smaller, Not Bigger',
    titleFr: 'Plus petit, pas plus grand',
    inlineSvg: DIAGRAMS.BAR_TENTHS,
    caption: '**50** is right. Multiplying by a number less than 1 makes it **smaller**.',
    captionFr: '**50** est juste. Multiplier par un nombre plus petit que 1 rend **plus petit**.',
  },

  // 7. The rule
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'X',
    eyebrow: 'The rule',
    eyebrowFr: 'La règle',
    title: 'Multiplying by a Decimal',
    titleFr: 'Multiplier par un décimal',
    ratio: 40,
    inlineSvg: DIAGRAMS.POINT2_RULE,
    content: '$0.2$ is the same as $\\frac{2}{10}$.',
    contentFr: '$0.2$, c’est la même chose que $\\frac{2}{10}$.',
    notes: [
      {
        tone: 'write',
        text: '$× 0.2$ means $÷ 10$, then $× 2$.\n$× 0.03$ means $÷ 100$, then $× 3$.\nMultiplying by a decimal less than 1 makes a number **smaller**.',
        textFr: '$× 0.2$ veut dire $÷ 10$, puis $× 2$.\n$× 0.03$ veut dire $÷ 100$, puis $× 3$.\nMultiplier par un décimal plus petit que 1 rend un nombre **plus petit**.',
      },
    ],
  },

  // 8. Practice
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowFr: 'Ardoises',
    title: 'Divide First, Then Multiply',
    titleFr: 'Divise d’abord, puis multiplie',
    ratio: 50,
    content:
      'No calculators.\n\n' +
      '**a** $60 × 0.4$ and **b** $350 × 0.3$\n' +
      '**c** $1500 × 0.02$ and **d** $800 × 0.07$',
    contentFr:
      'Sans calculatrice.\n\n' +
      '**a** $60 × 0.4$ et **b** $350 × 0.3$\n' +
      '**c** $1500 × 0.02$ et **d** $800 × 0.07$',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $6 × 4 = 24$, **b** $35 × 3 = 105$, **c** $15 × 2 = 30$, **d** $8 × 7 = 56$',
      answerFr: '**a** $6 × 4 = 24$, **b** $35 × 3 = 105$, **c** $15 × 2 = 30$, **d** $8 × 7 = 56$',
    },
  },

  // 9. Half of, a quarter of, a tenth of. "Of" is the English.
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Half, Quarter, Tenth',
    titleFr: 'Moitié, quart, dixième',
    ratio: 40,
    inlineSvg: DIAGRAMS.FRIENDLY,
    content: 'In English, **of** often means **×**.',
    contentFr: 'En anglais, **of** veut souvent dire **×**.',
    notes: [
      {
        tone: 'write',
        text: '$× 0.5$ = **half of** = $÷ 2$\n$× 0.25$ = **a quarter of** = $÷ 4$\n$× 0.1$ = **a tenth of** = $÷ 10$',
        textFr: '$× 0.5$ = **half of** (la moitié de) = $÷ 2$\n$× 0.25$ = **a quarter of** (le quart de) = $÷ 4$\n$× 0.1$ = **a tenth of** (le dixième de) = $÷ 10$',
      },
    ],
  },

  // ── × 9 AND × 11 ──────────────────────────────────────────────────────────
  // 10. Ask before you tell
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'In your head',
    eyebrowFr: 'De tête',
    title: 'Nine Lots',
    titleFr: 'Neuf fois',
    text: 'Work out $3.8 × 9$ in your head.',
    textFr: 'Calcule $3.8 × 9$ de tête.',
    sub: 'No columns. There is a quick way. Talk to the person next to you.',
    subFr: 'Pas de colonnes. Il y a un moyen rapide. Parles-en avec ton voisin.',
  },

  // 11. The rule
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Layers',
    eyebrow: 'The rule',
    eyebrowFr: 'La règle',
    title: 'Times 9, Times 11',
    titleFr: 'Fois 9, fois 11',
    ratio: 40,
    inlineSvg: DIAGRAMS.TEN_LOTS,
    content: '**34.2**. Ten lots is easy. Then take one away.',
    contentFr: '**34.2**. Dix fois, c’est facile. Puis enlève une fois.',
    notes: [
      {
        tone: 'write',
        text: '$× 9$: do $× 10$, then take away one lot.\n$3.8 × 9 = 3.8 × (10 − 1) = 38 − 3.8 = 34.2$\n$× 11$: do $× 10$, then add one lot.',
        textFr: '$× 9$ : fais $× 10$, puis enlève une fois le nombre.\n$3.8 × 9 = 3.8 × (10 − 1) = 38 − 3.8 = 34.2$\n$× 11$ : fais $× 10$, puis ajoute une fois le nombre.',
      },
    ],
  },

  // ── PARTITIONING ──────────────────────────────────────────────────────────
  // 12. Key word, and its everyday meaning
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Boxes',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Partitioning',
    titleFr: 'Décomposer',
    ratio: 40,
    inlineSvg: DIAGRAMS.PARTITION,
    content: 'A **partition** is a wall that splits a room.',
    contentFr: 'En anglais, une **partition** est un mur qui sépare une pièce.',
    notes: [
      {
        tone: 'write',
        text: '**Partitioning:** splitting a number into parts that are easy to work with.\n$4.3 × 6 = 4 × 6 + 0.3 × 6 = 24 + 1.8 = 25.8$',
        textFr: '**Décomposer (partitioning) :** couper un nombre en parties faciles à calculer.\n$4.3 × 6 = 4 × 6 + 0.3 × 6 = 24 + 1.8 = 25.8$',
      },
    ],
  },

  // 13. Practice: pick the quick way. d is the stretch: 0.9 is 1 − 0.1.
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowFr: 'Ardoises',
    title: 'Pick a Quick Way',
    titleFr: 'Choisis un moyen rapide',
    ratio: 50,
    content:
      'Work these out in your head.\n\n' +
      '**a** $6.2 × 9$ and **b** $1.7 × 11$\n' +
      '**c** $5.3 × 4$ and **d** $12 × 0.9$',
    contentFr:
      'Calcule de tête.\n\n' +
      '**a** $6.2 × 9$ et **b** $1.7 × 11$\n' +
      '**c** $5.3 × 4$ et **d** $12 × 0.9$',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** $62 − 6.2 = 55.8$, **b** $17 + 1.7 = 18.7$\n**c** $20 + 1.2 = 21.2$, **d** $12 − 1.2 = 10.8$',
      answerFr: '**a** $62 − 6.2 = 55.8$, **b** $17 + 1.7 = 18.7$\n**c** $20 + 1.2 = 21.2$, **d** $12 − 1.2 = 10.8$',
    },
  },

  // 14. Quick-fire: every shortcut, one card at a time
  {
    layout: 'game',
    title: 'Make It Easy',
    titleFr: 'Rends-le facile',
    widget: MakeItEasy,
  },

  // ── ALL TOGETHER ──────────────────────────────────────────────────────────
  // 15. One mistake per method
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Pencil',
    eyebrow: 'Find the mistakes',
    eyebrowFr: 'Trouve les erreurs',
    title: "Mr Bowen's Homework",
    titleFr: 'Les devoirs de M. Bowen',
    ratio: 40,
    inlineSvg: DIAGRAMS.MISTAKES,
    content: 'Mr Bowen gave himself **4 out of 4**.\n\nFind his **four** mistakes.',
    contentFr: 'M. Bowen s’est mis **4 sur 4**.\n\nTrouve ses **quatre** erreurs.',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer:
        '**a** 24: $80 ÷ 10 × 3$\n' +
        '**b** 23: $× 0.5$ is **half of**\n' +
        '**c** 30.6: take away 3.4, not 3\n' +
        '**d** 31.2: $0.2 × 6 = 1.2$',
      answerFr:
        '**a** 24 : $80 ÷ 10 × 3$\n' +
        '**b** 23 : $× 0.5$, c’est **la moitié**\n' +
        '**c** 30.6 : enlève 3.4, pas 3\n' +
        '**d** 31.2 : $0.2 × 6 = 1.2$',
    },
  },

  // ── WORD PROBLEMS (deadpan, and they get sillier) ─────────────────────────
  // 16. Two sensible ones. "0.2 of" is ×; "each" with 9 of them is ×.
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Read it, then work',
    eyebrowFr: 'Lis, puis calcule',
    title: 'Word Problems',
    titleFr: 'Problèmes',
    ratio: 50,
    content:
      '**1.** A bag of rice holds 750 g. Mr Bowen uses **0.2 of** the bag. How many grams does he use?\n\n' +
      '**2.** Mr Bowen buys 9 notebooks. **Each** one costs 2.15 dollars. How much does he pay?',
    contentFr:
      '**1.** Un sac de riz contient 750 g. M. Bowen utilise **0.2 du** sac. Combien de grammes utilise-t-il ?\n\n' +
      '**2.** M. Bowen achète 9 cahiers. **Chacun** coûte 2.15 dollars. Combien paie-t-il ?',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**1.** $750 ÷ 10 × 2 = 150$ g\n**2.** $21.50 − 2.15 = 19.35$ dollars',
      answerFr: '**1.** $750 ÷ 10 × 2 = 150$ g\n**2.** $21.50 − 2.15 = 19.35$ dollars',
    },
  },

  // 17. Silly one
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Half of',
    eyebrowFr: 'La moitié de',
    title: "Mr Bowen's Pizza",
    titleFr: 'La pizza de M. Bowen',
    ratio: 50,
    image: pizza,
    content:
      'Mr Bowen eats **half of** a pizza.\n\n' +
      'Then he eats half of what is left. Then half of what is left again.\n\n' +
      'How much of the pizza has he eaten?',
    contentFr:
      'M. Bowen mange **la moitié** d’une pizza.\n\n' +
      'Puis il mange la moitié de ce qui reste. Puis encore la moitié de ce qui reste.\n\n' +
      'Quelle part de la pizza a-t-il mangée ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '$0.5 + 0.25 + 0.125 = 0.875$ of the pizza.\n\nHe is saving the rest for later. The rest is 0.125.',
      answerFr: '$0.5 + 0.25 + 0.125 = 0.875$ de la pizza.\n\nIl garde le reste pour plus tard. Le reste, c’est 0.125.',
    },
  },

  // 18. Sillier one
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'A quarter of',
    eyebrowFr: 'Le quart de',
    title: "Mr Bowen's Shopping",
    titleFr: 'Les courses de M. Bowen',
    content:
      'Mr Bowen buys 0.5 kg of rocks.\n\n' +
      'He also buys 2 bags of feathers. Each bag is 0.25 kg.\n\n' +
      'Which is heavier, the rocks or the feathers?',
    contentFr:
      'M. Bowen achète 0.5 kg de cailloux.\n\n' +
      'Il achète aussi 2 sacs de plumes. Chaque sac fait 0.25 kg.\n\n' +
      'Qu’est-ce qui est le plus lourd, les cailloux ou les plumes ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '$2 × 0.25 = 0.5$ kg. They weigh the same.\n\nNobody knows why he bought them.',
      answerFr: '$2 × 0.25 = 0.5$ kg. Ils pèsent pareil.\n\nPersonne ne sait pourquoi il les a achetés.',
    },
  },

  // ── CLOSE ─────────────────────────────────────────────────────────────────
  // 19. Checklist
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you leave',
    eyebrowFr: 'Avant de partir',
    title: 'Can You Do These?',
    titleFr: 'Sais-tu faire ça ?',
    content: '> Check your notebook: **5 written panels**.',
    contentFr: '> Vérifie ton cahier : **5 encadrés recopiés**.',
    items: [
      { text: 'Write a decimal as an **equivalent fraction**.', textFr: 'Écrire un décimal en **fraction équivalente**.' },
      { text: 'Know that $× 0.2$ means $÷ 10$, then $× 2$.', textFr: 'Savoir que $× 0.2$ veut dire $÷ 10$, puis $× 2$.' },
      { text: 'Know that $× 0.5$ makes a number **smaller**.', textFr: 'Savoir que $× 0.5$ rend un nombre **plus petit**.' },
      { text: 'Use **half of**, **a quarter of**, **a tenth of**.', textFr: 'Utiliser **half of**, **a quarter of**, **a tenth of**.' },
      { text: 'Do $× 9$ and $× 11$ from $× 10$.', textFr: 'Faire $× 9$ et $× 11$ à partir de $× 10$.' },
      { text: 'Use **partitioning**: $4.3 = 4 + 0.3$.', textFr: 'Utiliser la **décomposition** : $4.3 = 4 + 0.3$.' },
    ],
  },

  // 20. Exit question
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    title: 'Lesson Complete!',
    titleFr: 'Leçon terminée !',
    subtitle: 'Exit question: in your head, work out **120 × 0.25** and **4.5 × 9**.',
    subtitleFr: 'Question de sortie : de tête, calcule **120 × 0.25** et **4.5 × 9**.',
  },
]

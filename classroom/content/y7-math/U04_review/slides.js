// content/y7-math/U04_review/slides.js
// Year 7 Mathematics · Unit 4 Decimals, the consolidation day. Monday 19
// October 2026, one period — the optional third decimal day, after the 4.1–4.4
// speed run (U04_1_4) and 4.5 (U04_5). Source: the Practice and Challenge
// questions of Workbook 4.3 and 4.4 (pp. 57–61), with new numbers, so the
// Workbook is still unspent. No homework slide, at Mr Bowen's request
// (14 Oct). English and French only.
//
// WRITING RULE FOR THIS DECK (the 2.5 Science density): short sentences, one
// idea each, and the body text never repeats the write note.
//
// WHAT THE SPEED RUN SKIPPED. Thursday multiplied and divided by one digit.
// The Workbook goes further, and so does today:
//
//   × a 2-digit number   take the point out, multiply, ESTIMATE to put it back
//   ÷ a 2-digit number   write its times table first, then short division
//   money                2 decimal places, always
//   mean                 total ÷ how many — and a CONJECTURE before working it
//
// Then all of Unit 4 on one quick-fire game, word problems, and two deadpan
// ones. "Conjecture" and "estimation" are 4.4's key words.
//
// COPY-DOWN: 5 written panels — multiplying by a bigger number · dividing by a
// bigger number · money · conjecture · mean.
import { DIAGRAMS } from './diagrams.js'
import { UnitQuickFire } from './widgets.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // 1. Hero + starter: Thursday and Friday, in their heads
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Sigma',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 4 · review',
    eyebrowFr: 'Unité 4 · révision',
    date: '19 Oct 2026',
    title: 'Bigger Numbers, Real Problems',
    titleFr: 'Plus grands nombres, vrais problèmes',
    subtitle: 'Estimate first. Then put the point in.',
    subtitleFr: 'Estime d’abord. Puis place le point.',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeFr: 'Pour commencer',
      text: 'In your head: **36 × 0.5**, **2.4 × 9** and **8.4 ÷ 4**.',
      textFr: 'De tête : **36 × 0.5**, **2.4 × 9** et **8.4 ÷ 4**.',
    },
  },

  // 2. Starter check
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Starter check',
    eyebrowFr: 'Correction',
    title: 'Three Quick Ones',
    titleFr: 'Trois rapides',
    text: '$18$ and $21.6$ and $2.1$',
    textFr: '$18$ et $21.6$ et $2.1$',
    sub: 'Which shortcut did you use for each one?',
    subFr: 'Quel raccourci as-tu utilisé pour chacun ?',
    reveal: {
      label: 'Show the shortcuts',
      labelFr: 'Voir les raccourcis',
      answer: '**half of** 36 · $24 − 2.4$ · the point goes straight up',
      answerFr: '**la moitié de** 36 · $24 − 2.4$ · le point monte tout droit',
    },
  },

  // ── × A BIGGER NUMBER ─────────────────────────────────────────────────────
  // 3. Vote. Both answers have the digits 1504; only the estimate decides.
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Where Does the Point Go?',
    titleFr: 'Où va le point ?',
    text: 'Work out $4.7 × 32$',
    textFr: 'Calcule $4.7 × 32$',
    columns: [
      {
        heading: 'A · left hand up',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_1504,
      },
      {
        heading: 'B · right hand up',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_1504B,
      },
    ],
  },

  // 4. The rule
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'X',
    eyebrow: 'The rule',
    eyebrowFr: 'La règle',
    title: 'Multiplying by a Bigger Number',
    titleFr: 'Multiplier par un plus grand nombre',
    ratio: 40,
    inlineSvg: DIAGRAMS.GRID_47x32,
    content: '**150.4** is right. The estimate tells you where the point goes.',
    contentFr: '**150.4** est juste. L’estimation te dit où va le point.',
    notes: [
      {
        tone: 'write',
        text: 'Take the point out and multiply: $47 × 32 = 1504$.\n**Estimate** to put it back: $4.7 × 32 ≈ 5 × 30 = 150$, so $150.4$.',
        textFr: 'Enlève le point et multiplie : $47 × 32 = 1504$.\n**Estime (estimate)** pour le remettre : $4.7 × 32 ≈ 5 × 30 = 150$, donc $150.4$.',
      },
    ],
  },

  // 5. Practice
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowFr: 'Ardoises',
    title: 'Estimate, Then Multiply',
    titleFr: 'Estime, puis multiplie',
    ratio: 50,
    content:
      'Write an estimate first.\n\n' +
      '**a** $2.6 × 14$ and **b** $5.3 × 21$\n' +
      '**c** $0.48 × 25$ and **d** $7.15 × 12$',
    contentFr:
      'Écris d’abord une estimation.\n\n' +
      '**a** $2.6 × 14$ et **b** $5.3 × 21$\n' +
      '**c** $0.48 × 25$ et **d** $7.15 × 12$',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 36.4, **b** 111.3, **c** 12, **d** 85.8',
      answerFr: '**a** 36.4, **b** 111.3, **c** 12, **d** 85.8',
    },
  },

  // ── ÷ A BIGGER NUMBER ─────────────────────────────────────────────────────
  // 6. Ask before you tell
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Think first',
    eyebrowFr: 'Réfléchis d’abord',
    title: 'Dividing by 16',
    titleFr: 'Diviser par 16',
    text: 'Work out $43.2 ÷ 16$.',
    textFr: 'Calcule $43.2 ÷ 16$.',
    sub: 'Nobody knows the 16 times table. What can you do?',
    subFr: 'Personne ne connaît la table de 16. Que peux-tu faire ?',
  },

  // 7. The method, settled
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Divide',
    eyebrow: 'Short division',
    eyebrowFr: 'Division posée',
    title: 'Write the Table First',
    titleFr: 'Écris d’abord la table',
    inlineSvg: DIAGRAMS.TABLE_DIVIDE,
    caption: '**2.7**. The table turns a hard division into reading a list.',
    captionFr: '**2.7**. Avec la table, une division difficile devient une liste à lire.',
  },

  // 8. The rule, then practice
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Divide',
    eyebrow: 'The rule',
    eyebrowFr: 'La règle',
    title: 'Dividing by a Bigger Number',
    titleFr: 'Diviser par un plus grand nombre',
    ratio: 50,
    content:
      'Try these on your whiteboard.\n\n' +
      '**a** $89.6 ÷ 14$ and **b** $38.5 ÷ 11$\n' +
      '**c** $70.2 ÷ 18$ and **d** $9.36 ÷ 12$',
    contentFr:
      'Essaie sur ton ardoise.\n\n' +
      '**a** $89.6 ÷ 14$ et **b** $38.5 ÷ 11$\n' +
      '**c** $70.2 ÷ 18$ et **d** $9.36 ÷ 12$',
    notes: [
      {
        tone: 'write',
        text: 'To divide by a 2-digit number, write its **times table** first.\nThen use short division. The point goes straight up.',
        textFr: 'Pour diviser par un nombre à 2 chiffres, écris d’abord sa **table de multiplication**.\nPuis pose une division courte. Le point monte tout droit.',
      },
    ],
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 6.4, **b** 3.5, **c** 3.9, **d** 0.78',
      answerFr: '**a** 6.4, **b** 3.5, **c** 3.9, **d** 0.78',
    },
  },

  // ── MONEY ─────────────────────────────────────────────────────────────────
  // 9. Ask before you tell: the answer never ends
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Coins',
    eyebrow: 'Something is strange',
    eyebrowFr: 'Quelque chose cloche',
    title: 'Ten Dollars, Three Friends',
    titleFr: 'Dix dollars, trois amis',
    text: 'Three friends share 10 dollars equally. How much does each get?',
    textFr: 'Trois amis partagent 10 dollars en parts égales. Combien reçoit chacun ?',
    sub: 'Write it the way a shop would.',
    subFr: 'Écris-le comme dans un magasin.',
  },

  // 10. The rule
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Coins',
    eyebrow: 'The rule',
    eyebrowFr: 'La règle',
    title: 'Money Has Two Decimal Places',
    titleFr: 'L’argent a deux décimales',
    notes: [
      {
        tone: 'write',
        text: 'Money is written to **2 decimal places**.\n$10 ÷ 3 = 3.333...$, so each friend gets **3.33** dollars, and 1 cent is left over.\n4.5 dollars is written **4.50** dollars.',
        textFr: 'L’argent s’écrit avec **2 décimales**.\n$10 ÷ 3 = 3.333...$, donc chacun reçoit **3.33** dollars, et il reste 1 cent.\n4.5 dollars s’écrit **4.50** dollars.',
      },
    ],
    reveal: {
      prompt: 'Write as money: **a** 7.5 dollars, **b** 7.256 dollars, **c** $9 ÷ 4$ dollars',
      promptFr: 'Écris comme de l’argent : **a** 7.5 dollars, **b** 7.256 dollars, **c** $9 ÷ 4$ dollars',
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 7.50, **b** 7.26, **c** 2.25 dollars',
      answerFr: '**a** 7.50, **b** 7.26, **c** 2.25 dollars',
    },
  },

  // ── CONJECTURE AND MEAN ───────────────────────────────────────────────────
  // 11. Guess first, with a vote
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Lightbulb',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Make a Conjecture',
    titleFr: 'Fais une conjecture',
    ratio: 40,
    inlineSvg: DIAGRAMS.ROUTES,
    content: 'Do not calculate yet. Left hand for **A**, right hand for **B**.',
    contentFr: 'Ne calcule pas encore. Main gauche pour **A**, main droite pour **B**.',
    notes: [
      {
        tone: 'write',
        text: '**Conjecture:** a guess that you can test.',
        textFr: '**Conjecture (conjecture) :** une supposition que l’on peut vérifier.',
      },
    ],
  },

  // 12. Test it
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Calculator',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'The Mean',
    titleFr: 'La moyenne',
    notes: [
      {
        tone: 'write',
        text: '**Mean:** add up all the values, then divide by how many there are.\nRoute A: $12.4 + 11.8 + 13.1 + 12.7 = 50.0$, and $50.0 ÷ 4 = 12.5$ minutes.',
        textFr: '**Moyenne (mean) :** additionne toutes les valeurs, puis divise par leur nombre.\nTrajet A : $12.4 + 11.8 + 13.1 + 12.7 = 50.0$, et $50.0 ÷ 4 = 12.5$ minutes.',
      },
    ],
    reveal: {
      prompt: 'Now work out the mean for Route B. Was your conjecture right?',
      promptFr: 'Calcule la moyenne de B. Ta conjecture était-elle juste ?',
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '$61.5 ÷ 5 = 12.3$ minutes. Route B is quicker on average.',
      answerFr: '$61.5 ÷ 5 = 12.3$ minutes. Le trajet B est plus rapide en moyenne.',
    },
  },

  // 13. All of Unit 4, one card at a time
  {
    layout: 'game',
    title: 'Unit 4 Quick-Fire',
    titleFr: 'Unité 4 en rafale',
    widget: UnitQuickFire,
  },

  // ── WORD PROBLEMS (deadpan, and they get sillier) ─────────────────────────
  // 14. Two sensible ones: several steps, and the words choose each one
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
      '**1.** Mr Bowen buys 12 pens at 0.85 dollars **each** and 3 notebooks at 2.40 dollars **each**. He pays with a 20-dollar note. How much **change** does he get?\n\n' +
      '**2.** Five friends **share** a bill of 47.25 dollars **equally**. How much does each pay?',
    contentFr:
      '**1.** M. Bowen achète 12 stylos à 0.85 dollar **chacun** et 3 cahiers à 2.40 dollars **chacun**. Il paie avec un billet de 20 dollars. Combien de **monnaie** (change) reçoit-il ?\n\n' +
      '**2.** Cinq amis **partagent** une addition de 47.25 dollars **en parts égales**. Combien paie chacun ?',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**1.** $10.20 + 7.20 = 17.40$, then $20.00 − 17.40 = 2.60$ dollars\n**2.** $47.25 ÷ 5 = 9.45$ dollars',
      answerFr: '**1.** $10.20 + 7.20 = 17.40$, puis $20.00 − 17.40 = 2.60$ dollars\n**2.** $47.25 ÷ 5 = 9.45$ dollars',
    },
  },

  // 15. Silly one
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Share equally',
    eyebrowFr: 'Parts égales',
    title: "Mr Bowen's Bananas",
    titleFr: 'Les bananes de M. Bowen',
    content:
      'Mr Bowen buys 12 bananas.\n\n' +
      'He shares **half of** them equally between 24 students.\n\n' +
      'How much banana does each student get?',
    contentFr:
      'M. Bowen achète 12 bananes.\n\n' +
      'Il partage **la moitié** d’entre elles en parts égales entre 24 élèves.\n\n' +
      'Combien de banane reçoit chaque élève ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '$12 × 0.5 = 6$ bananas, and $6 ÷ 24 = 0.25$ of a banana each.\n\nMr Bowen eats the other six.',
      answerFr: '$12 × 0.5 = 6$ bananes, et $6 ÷ 24 = 0.25$ de banane chacun.\n\nM. Bowen mange les six autres.',
    },
  },

  // 16. Sillier one: the mean that cannot move
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'The mean',
    eyebrowFr: 'La moyenne',
    title: "Mr Bowen's Quiz Scores",
    titleFr: 'Les notes de M. Bowen',
    content:
      'Mr Bowen scores 9.5 on four quizzes in a row.\n\n' +
      'Then he does one more quiz and scores 9.5.\n\n' +
      'What is his mean score now?',
    contentFr:
      'M. Bowen a 9.5 à quatre quiz de suite.\n\n' +
      'Puis il fait un quiz de plus et a 9.5.\n\n' +
      'Quelle est sa moyenne maintenant ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '$9.5 × 5 = 47.5$, and $47.5 ÷ 5 = 9.5$\n\nHe has asked for a sixth quiz.',
      answerFr: '$9.5 × 5 = 47.5$, et $47.5 ÷ 5 = 9.5$\n\nIl a demandé un sixième quiz.',
    },
  },

  // ── CLOSE ─────────────────────────────────────────────────────────────────
  // 17. Checklist — today, and the whole unit
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'End of Unit 4',
    eyebrowFr: 'Fin de l’unité 4',
    title: 'Can You Do These?',
    titleFr: 'Sais-tu faire ça ?',
    content: '> Check your notebook: **5 written panels** today.',
    contentFr: '> Vérifie ton cahier : **5 encadrés recopiés** aujourd’hui.',
    items: [
      { text: 'Multiply by a 2-digit number, then **estimate** to place the point.', textFr: 'Multiplier par un nombre à 2 chiffres, puis **estimer** pour placer le point.' },
      { text: 'Divide by a 2-digit number: write the **times table** first.', textFr: 'Diviser par un nombre à 2 chiffres : écrire d’abord la **table**.' },
      { text: 'Write money to **2 decimal places**.', textFr: 'Écrire l’argent avec **2 décimales**.' },
      { text: 'Make a **conjecture**, then test it.', textFr: 'Faire une **conjecture**, puis la vérifier.' },
      { text: 'Work out a **mean**.', textFr: 'Calculer une **moyenne**.' },
      { text: 'Unit 4: compare, +, −, × and ÷, and the 4.5 shortcuts.', textFr: 'Unité 4 : comparer, +, −, × et ÷, et les raccourcis de 4.5.' },
    ],
  },

  // 18. Exit question
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    title: 'Unit 4 Complete!',
    titleFr: 'Unité 4 terminée !',
    subtitle: 'Exit question: work out **3.4 × 25** and **52.5 ÷ 15**.',
    subtitleFr: 'Question de sortie : calcule **3.4 × 25** et **52.5 ÷ 15**.',
  },
]

// content/y7-math/U04_1_4/slides.js
// Year 7 Mathematics · 4.1–4.4 Decimals. Thursday 15 October 2026, one period.
// Source: Workbook Unit 4, Sections 4.1–4.4 (pp. 51–61). Every number used in
// class is original or real-world, so the Workbook exercise is still unspent.
// No homework slide, at Mr Bowen's request (14 Oct).
//
// ENGLISH AND FRENCH ONLY. From Unit 4 the Year 7 lessons are taught in
// English and French, so this deck sets meta.vietnamese: false and every string
// has an …Fr twin and no …Vn twin.
//
// WRITING RULE FOR THIS DECK (the 2.5 Science density): short sentences, one
// idea each, and the body text never repeats the write note.
//
// A SPEED RUN, SO ONE QUESTION HOLDS IT TOGETHER: WHERE DOES THE POINT GO?
// The class already did place value and rounding in Unit 3, and its arithmetic
// is strong. Four sections, each built the same way so the class learns the
// rhythm and the teacher can move fast:
//
//    vote (left hand / right hand, no answer)  →  the picture that settles it
//    →  copy the rule  →  whiteboards
//
//   compare    line the points up, fill with zeros      3.3 vs 3.25
//   + and −    line the points up; the point drops      1 − 0.72
//   ×          take the point out, put it back          0.3 × 4
//   ÷          the point goes straight up; write the 0  8.24 ÷ 4
//
// THE ENGLISH IS THE BARRIER, AND IT IS IN FOUR PLACES: reading a decimal
// aloud ("three point two five" — French says vingt-cinq, which is why 3.25
// sounds bigger than 3.3); "fastest" meaning the SMALLEST time; "mental method"
// and "written method", which are exam instructions; and "change" (the money
// you get back) and "share equally". Slides 3, 5, 9 and 19.
//
// IF TIME RUNS SHORT, stop after slide 9 (end of adding and subtracting) and
// open the next lesson at slide 10. Slides 17 and 22 are the first to skip.
//
// COPY-DOWN: 6 written panels — compare · adding and subtracting · mental and
// written method · multiplying · dividing · change and share equally.
import { DIAGRAMS } from './diagrams.js'
import { LineUp } from './widgets.jsx'
import berlin from './images/berlin.jpg'
import bolt from './images/bolt.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'
const RED = '#c8102e'

export const slides = [
  // ══ COMPARE (a quick review of 4.1) ═══════════════════════════════════════
  // 1. Hero + starter. The list hides the trap the vote is about.
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Sigma',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 4 · 4.1 to 4.4',
    eyebrowFr: 'Unité 4 · 4.1 à 4.4',
    date: '15 Oct 2026',
    title: 'Decimals',
    titleFr: 'Les nombres décimaux',
    subtitle: 'Where does the point go?',
    subtitleFr: 'Où va le point ?',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeFr: 'Pour commencer',
      text: 'Write in order of size, starting with the smallest: **3.3**, **3.25**, **3.05**, **3.252**',
      textFr: 'Range du plus petit au plus grand : **3.3**, **3.25**, **3.05**, **3.252**',
    },
  },

  // 2. Vote 1. Left hand A, right hand B, all at once. Slide 3 settles it.
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Which Is Bigger?',
    titleFr: 'Lequel est le plus grand ?',
    text: 'Which number is bigger?',
    textFr: 'Quel nombre est le plus grand ?',
    columns: [
      {
        heading: 'A · left hand up',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_325,
      },
      {
        heading: 'B · right hand up',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_33,
      },
    ],
  },

  // 3. English check: how a decimal is said, and written, in English
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Say It in English',
    titleFr: 'Dis-le en anglais',
    inlineSvg: DIAGRAMS.SAY_IT,
    caption: '**3.3 is bigger.** Say each digit after the point on its own.',
    captionFr: '**3.3 est plus grand.** En français, 3,25 se dit « vingt-cinq ». En anglais, on lit chiffre par chiffre.',
  },

  // 4. The rule
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Compare Decimals',
    titleFr: 'Comparer des décimaux',
    ratio: 40,
    inlineSvg: DIAGRAMS.ORDER_COLS,
    content: '$3.3$ and $3.30$ are the same number.',
    contentFr: '$3.3$ et $3.30$ sont le même nombre.',
    notes: [
      {
        tone: 'write',
        text: '**Compare:** find which number is bigger.\nFirst look at the **whole-number parts**. Then fill with zeros and compare the **decimal parts**.\n$3.30 > 3.25$',
        textFr: '**Comparer (compare) :** trouver le nombre le plus grand.\nRegarde d’abord la **partie entière**. Puis complète avec des zéros et compare la **partie décimale**.\n$3.30 > 3.25$',
      },
    ],
  },

  // 5. Real times from the world-record race. "Fastest" is the smallest number.
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Timer',
    eyebrow: 'Berlin, 2009 · whiteboards',
    eyebrowFr: 'Berlin, 2009 · ardoises',
    title: 'The 100 m Final',
    titleFr: 'La finale du 100 m',
    ratio: 45,
    image: berlin,
    content:
      'Their times, in seconds:\n\n' +
      '**Thompson** 9.93, **Powell** 9.84, **Gay** 9.71, **Bolt** 9.58, **Patton** 10.34\n\n' +
      'Write the times in order, starting with the **fastest**. Who came **third**?',
    contentFr:
      'Leurs temps, en secondes :\n\n' +
      '**Thompson** 9.93, **Powell** 9.84, **Gay** 9.71, **Bolt** 9.58, **Patton** 10.34\n\n' +
      'Range les temps en commençant par le plus **rapide** (fastest). Qui est **troisième** (third) ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '9.58, 9.71, 9.84, 9.93, 10.34\n\n**Fastest** means the **smallest** time. Third: **Powell**.',
      answerFr: '9.58, 9.71, 9.84, 9.93, 10.34\n\nLe plus **rapide** = le temps le plus **petit**. Troisième : **Powell**.',
    },
  },

  // ══ ADDING AND SUBTRACTING (4.2) ══════════════════════════════════════════
  // 6. Vote 2. The wrong answer comes from forgetting the exchange.
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Which Is Right?',
    titleFr: 'Laquelle est juste ?',
    text: 'Work out $1 − 0.72$',
    textFr: 'Calcule $1 − 0.72$',
    columns: [
      {
        heading: 'A · left hand up',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_028,
      },
      {
        heading: 'B · right hand up',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_038,
      },
    ],
  },

  // 7. The widget settles it, then two more
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Move',
    eyebrow: 'Say each step first',
    eyebrowFr: 'Dis chaque étape avant',
    title: 'Line Up the Points',
    titleFr: 'Aligne les points',
    widget: LineUp,
    caption: '**0.28** is right. Check by adding: 0.28 + 0.72 = 1.',
    captionFr: '**0.28** est juste. Vérifie en additionnant : 0.28 + 0.72 = 1.',
  },

  // 8. The rule, then practice
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Plus',
    eyebrow: 'The rule',
    eyebrowFr: 'La règle',
    title: 'Adding and Subtracting',
    titleFr: 'Additionner et soustraire',
    ratio: 50,
    content:
      'Try these on your whiteboard.\n\n' +
      '**a** $7.56 + 2.8$ and **b** $12.4 − 5.67$\n' +
      '**c** $20 − 8.35$ and **d** $0.9 + 0.38 + 4$',
    contentFr:
      'Essaie sur ton ardoise.\n\n' +
      '**a** $7.56 + 2.8$ et **b** $12.4 − 5.67$\n' +
      '**c** $20 − 8.35$ et **d** $0.9 + 0.38 + 4$',
    notes: [
      {
        tone: 'write',
        text: 'Line up the decimal points. Fill the gaps with zeros.\nWork from the right, like whole numbers. The point goes **straight down**.',
        textFr: 'Aligne les points décimaux. Complète les vides avec des zéros.\nCalcule à partir de la droite, comme pour les entiers. Le point descend **tout droit**.',
      },
    ],
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 10.36, **b** 6.73, **c** 11.65, **d** 5.28',
      answerFr: '**a** 10.36, **b** 6.73, **c** 11.65, **d** 5.28',
    },
  },

  // 9. Mental method vs written method — the book's key words, which are exam
  // instructions. The subtraction is the trap: take 3, then give 0.1 BACK.
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'In Your Head or on Paper',
    titleFr: 'De tête ou sur papier',
    notes: [
      {
        tone: 'write',
        text: '**Mental method:** you work it out in your head.\n**Written method:** you write it in columns.',
        textFr: '**Calcul mental (mental method) :** tu calcules dans ta tête.\n**Méthode écrite (written method) :** tu poses le calcul en colonnes.',
      },
    ],
    reveal: {
      prompt: 'Use a mental method: **a** $6.9 + 4.6$ and **b** $8.4 − 2.9$',
      promptFr: 'Utilise le calcul mental : **a** $6.9 + 4.6$ et **b** $8.4 − 2.9$',
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 6.9 is nearly 7: $7 + 4.6 = 11.6$, so **11.5**\n**b** $8.4 − 3 = 5.4$, then give back 0.1: **5.5**',
      answerFr: '**a** 6.9, c’est presque 7 : $7 + 4.6 = 11.6$, donc **11.5**\n**b** $8.4 − 3 = 5.4$, puis rends 0.1 : **5.5**',
    },
  },

  // ══ MULTIPLYING (4.3) ═════════════════════════════════════════════════════
  // 10. Vote 3. "Decimals make things smaller" pulls toward 0.12.
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Two Pairs Disagree',
    titleFr: 'Deux binômes pas d’accord',
    text: 'Work out $0.3 × 4$',
    textFr: 'Calcule $0.3 × 4$',
    columns: [
      {
        heading: 'A · left hand up',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_012,
      },
      {
        heading: 'B · right hand up',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_12,
      },
    ],
  },

  // 11. Settled with a ruler
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'Four lots of 0.3',
    eyebrowFr: 'Quatre fois 0.3',
    title: 'Bigger Than 1',
    titleFr: 'Plus grand que 1',
    inlineSvg: DIAGRAMS.RIBBON,
    caption: '**1.2** is right. Four pieces of 0.3 m go past 1 m.',
    captionFr: '**1.2** est juste. Quatre morceaux de 0.3 m dépassent 1 m.',
  },

  // 12. The rule
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'X',
    eyebrow: 'The rule',
    eyebrowFr: 'La règle',
    title: 'Multiplying a Decimal',
    titleFr: 'Multiplier un décimal',
    ratio: 40,
    inlineSvg: DIAGRAMS.POINT_OUT,
    content: 'You already know $32 × 7$.',
    contentFr: 'Tu sais déjà calculer $32 × 7$.',
    notes: [
      {
        tone: 'write',
        text: 'Take the point out and multiply: $32 × 7 = 224$.\nPut it back, with the same number of decimal places: $3.2 × 7 = 22.4$\n**Estimate** to check: $3 × 7 = 21$',
        textFr: 'Enlève le point et multiplie : $32 × 7 = 224$.\nRemets-le, avec le même nombre de décimales : $3.2 × 7 = 22.4$\n**Estime (estimate)** pour vérifier : $3 × 7 = 21$',
      },
    ],
  },

  // 13. Practice. d is exact, so its zeros can go — rounding is different.
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowFr: 'Ardoises',
    title: 'Point Out, Point Back',
    titleFr: 'Point enlevé, point remis',
    ratio: 50,
    content:
      'Estimate first. Then work it out.\n\n' +
      '**a** $0.7 × 6$\n' +
      '**b** $2.4 × 3$\n' +
      '**c** $5 × 0.08$\n' +
      '**d** $1.25 × 4$\n' +
      '**e** $3.6 × 24$',
    contentFr:
      'Estime d’abord. Puis calcule.\n\n' +
      '**a** $0.7 × 6$\n' +
      '**b** $2.4 × 3$\n' +
      '**c** $5 × 0.08$\n' +
      '**d** $1.25 × 4$\n' +
      '**e** $3.6 × 24$',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 4.2, **b** 7.2, **c** 0.4, **d** 5, **e** 86.4\n\n**d** is $5.00 = 5$. Nothing was rounded, so the zeros can go.',
      answerFr: '**a** 4.2, **b** 7.2, **c** 0.4, **d** 5, **e** 86.4\n\n**d** donne $5.00 = 5$. Rien n’est arrondi, donc les zéros peuvent partir.',
    },
  },

  // ══ DIVIDING (4.4) ════════════════════════════════════════════════════════
  // 14. Vote 4. The missing placeholder zero.
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'One More Vote',
    titleFr: 'Un dernier vote',
    text: 'Work out $8.24 ÷ 4$',
    textFr: 'Calcule $8.24 ÷ 4$',
    columns: [
      {
        heading: 'A · left hand up',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_206,
      },
      {
        heading: 'B · right hand up',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_26,
      },
    ],
  },

  // 15. Short division settles it, and the inverse checks it
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Divide',
    eyebrow: 'Short division',
    eyebrowFr: 'Division posée',
    title: 'The Point Goes Straight Up',
    titleFr: 'Le point monte tout droit',
    inlineSvg: DIAGRAMS.BUS_STOP,
    caption: '**2.06** is right. **2.6** forgot the 0.',
    captionFr: '**2.06** est juste. **2.6** a oublié le 0.',
  },

  // 16. The rule, then practice
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Divide',
    eyebrow: 'The rule',
    eyebrowFr: 'La règle',
    title: 'Dividing a Decimal',
    titleFr: 'Diviser un décimal',
    ratio: 50,
    content:
      'Try these on your whiteboard.\n\n' +
      '**a** $9.36 ÷ 3$ and **b** $7.35 ÷ 5$\n' +
      '**c** $0.84 ÷ 6$ and **d** $6.3 ÷ 4$',
    contentFr:
      'Essaie sur ton ardoise.\n\n' +
      '**a** $9.36 ÷ 3$ et **b** $7.35 ÷ 5$\n' +
      '**c** $0.84 ÷ 6$ et **d** $6.3 ÷ 4$',
    notes: [
      {
        tone: 'write',
        text: 'Use short division. The point goes **straight up**.\nIf a digit is too small to divide, write **0**.\nCheck with the **inverse calculation**: $2.06 × 4 = 8.24$',
        textFr: 'Pose une division courte. Le point monte **tout droit**.\nSi un chiffre est trop petit pour être divisé, écris **0**.\nVérifie avec le **calcul inverse (inverse calculation)** : $2.06 × 4 = 8.24$',
      },
    ],
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 3.12, **b** 1.47, **c** 0.14, **d** 1.575 (write 6.3 as 6.300 and keep going)',
      answerFr: '**a** 3.12, **b** 1.47, **c** 0.14, **d** 1.575 (écris 6.3 comme 6.300 et continue)',
    },
  },

  // 17. One fact, four answers — the point placed by estimating (Q15 in both
  // 4.3 and 4.4, with new numbers). First to skip if time is short.
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Target',
    eyebrow: 'Where does the point go?',
    eyebrowFr: 'Où va le point ?',
    title: 'One Fact, Four Answers',
    titleFr: 'Un fait, quatre réponses',
    notes: [
      {
        tone: 'task',
        badge: 'Use this fact',
        badgeFr: 'Utilise ce fait',
        icon: 'Target',
        text: '$47 × 23 = 1081$\nEstimate first. Then put the point in the right place.',
        textFr: '$47 × 23 = 1081$\nEstime d’abord. Puis place le point au bon endroit.',
      },
    ],
    reveal: {
      prompt: '**a** $4.7 × 23$, **b** $0.47 × 23$, **c** $108.1 ÷ 23$, **d** $10.81 ÷ 47$',
      promptFr: '**a** $4.7 × 23$, **b** $0.47 × 23$, **c** $108.1 ÷ 23$, **d** $10.81 ÷ 47$',
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 108.1, because $5 × 20 = 100$\n**b** 10.81, **c** 4.7, **d** 0.23',
      answerFr: '**a** 108.1, car $5 × 20 = 100$\n**b** 10.81, **c** 4.7, **d** 0.23',
    },
  },

  // ══ ALL FOUR TOGETHER ═════════════════════════════════════════════════════
  // 18. One mistake from each section
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
        '**a** $4.09 < 4.1$, because $4.1 = 4.10$\n' +
        '**b** 7.5: write 12 as 12.0\n' +
        '**c** 1.8: three lots of 0.6\n' +
        '**d** 3.06: 1 ÷ 3 does not go, so write 0',
      answerFr:
        '**a** $4.09 < 4.1$, car $4.1 = 4.10$\n' +
        '**b** 7.5 : écris 12 comme 12.0\n' +
        '**c** 1.8 : trois fois 0.6\n' +
        '**d** 3.06 : 1 ÷ 3, ça ne va pas, donc écris 0',
    },
  },

  // 19. English check: the words choose the operation
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Which Operation?',
    titleFr: 'Quelle opération ?',
    ratio: 40,
    inlineSvg: DIAGRAMS.WORDS_OPS,
    content: 'The numbers do not tell you. The **words** do.',
    contentFr: 'Les nombres ne te le disent pas. Les **mots**, si.',
    notes: [
      {
        tone: 'write',
        text: '**Change:** the money you get back when you pay too much.\n**Share equally:** give everyone the same amount, so divide.',
        textFr: '**Change :** la monnaie qu’on te rend quand tu paies trop.\n**Share equally :** donner la même part à chacun, donc diviser.',
      },
    ],
  },

  // ══ WORD PROBLEMS (deadpan, and they get sillier) ═════════════════════════
  // 20. Two sensible ones. "Mr Bowen and three friends" is four people.
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
      '**1.** Mr Bowen buys a coffee for 2.75 dollars and a sandwich for 4.6 dollars. He pays with a 10-dollar note. How much **change** does he get?\n\n' +
      '**2.** Mr Bowen and three friends **share** a 9.36-dollar pizza **equally**. How much does each person pay?',
    contentFr:
      '**1.** M. Bowen achète un café à 2.75 dollars et un sandwich à 4.6 dollars. Il paie avec un billet de 10 dollars. Combien de **monnaie** (change) reçoit-il ?\n\n' +
      '**2.** M. Bowen et trois amis **partagent** une pizza à 9.36 dollars **en parts égales**. Combien paie chaque personne ?',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**1.** $2.75 + 4.60 = 7.35$, then $10.00 − 7.35 = 2.65$ dollars\n**2.** That is **4** people: $9.36 ÷ 4 = 2.34$ dollars',
      answerFr: '**1.** $2.75 + 4.60 = 7.35$, puis $10.00 − 7.35 = 2.65$ dollars\n**2.** Ça fait **4** personnes : $9.36 ÷ 4 = 2.34$ dollars',
    },
  },

  // 21. Silly one
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Trophy',
    eyebrow: 'Times, in seconds',
    eyebrowFr: 'Temps, en secondes',
    title: 'Mr Bowen vs Usain Bolt',
    titleFr: 'M. Bowen contre Usain Bolt',
    ratio: 50,
    image: bolt,
    content:
      'Usain Bolt runs 100 m in 9.58 s. Mr Bowen runs it in 16.04 s.\n\n' +
      'Mr Bowen trains. He gets 0.38 s faster every year, for 17 years.\n\n' +
      'Who wins now?',
    contentFr:
      'Usain Bolt court le 100 m en 9.58 s. M. Bowen le court en 16.04 s.\n\n' +
      'M. Bowen s’entraîne. Il gagne 0.38 s chaque année, pendant 17 ans.\n\n' +
      'Qui gagne maintenant ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '$17 × 0.38 = 6.46$ and $16.04 − 6.46 = 9.58$\n\nIt is a draw. Usain Bolt retired in 2017.',
      answerFr: '$17 × 0.38 = 6.46$ et $16.04 − 6.46 = 9.58$\n\nÉgalité. Usain Bolt a pris sa retraite en 2017.',
    },
  },

  // 22. Sillier one — the inverse calculation, done with scissors
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Share equally',
    eyebrowFr: 'Parts égales',
    title: "Mr Bowen's Rope",
    titleFr: 'La corde de M. Bowen',
    content:
      'Mr Bowen has a rope 3.6 m long. He cuts it into 4 equal pieces.\n\n' +
      'Then he ties the 4 pieces back together.\n\n' +
      'How long is the rope now?',
    contentFr:
      'M. Bowen a une corde de 3.6 m. Il la coupe en 4 morceaux égaux.\n\n' +
      'Puis il rattache les 4 morceaux ensemble.\n\n' +
      'Quelle est la longueur de la corde maintenant ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '$3.6 ÷ 4 = 0.9$ m each, and $0.9 × 4 = 3.6$ m.\n\nA little less than 3.6 m. Knots use rope.',
      answerFr: '$3.6 ÷ 4 = 0.9$ m chacun, et $0.9 × 4 = 3.6$ m.\n\nUn peu moins de 3.6 m. Les nœuds utilisent de la corde.',
    },
  },

  // ══ CLOSE ═════════════════════════════════════════════════════════════════
  // 23. Checklist
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
    content: '> Check your notebook: **6 written panels**.',
    contentFr: '> Vérifie ton cahier : **6 encadrés recopiés**.',
    items: [
      { text: 'Say $3.25$ in English: three point two five.', textFr: 'Dire $3.25$ en anglais : three point two five.' },
      { text: '**Compare** decimals: fill with zeros first.', textFr: '**Comparer** des décimaux : compléter avec des zéros.' },
      { text: 'Add and subtract: line up the points.', textFr: 'Additionner et soustraire : aligner les points.' },
      { text: 'Multiply: point out, then point back.', textFr: 'Multiplier : enlever le point, puis le remettre.' },
      { text: 'Divide: the point goes straight up. Write the 0.', textFr: 'Diviser : le point monte tout droit. Écrire le 0.' },
      { text: 'Know what **change** and **share equally** mean.', textFr: 'Savoir ce que veulent dire **change** et **share equally**.' },
    ],
  },

  // 24. Exit question
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    title: 'Lesson Complete!',
    titleFr: 'Leçon terminée !',
    subtitle: 'Exit question: work out **5 − 1.36**, then **7.2 ÷ 6**.',
    subtitleFr: 'Question de sortie : calcule **5 − 1.36**, puis **7.2 ÷ 6**.',
  },
]

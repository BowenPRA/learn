// unit/src/data/Y7_MATH/U07_1/notes.js
// Maths 7.1 Ordering fractions — the self-study notes (Bowen, 20 November 2026: "polish
// the notes … practical and understandable notes for independent work", like Upper
// Secondary English Unit 1). From the Part 1 classroom deck (classroom/content/y7-math/
// U07_1a) plus what the Workbook's 7.1 asks next: which is bigger, a common
// denominator, fractions as decimals by bus stop division, order of size. The unit's
// other tasks practise each one.
//
// How it reads (the English Unit 1 rules):
// - One orange "Write this down" box per slide at most, numbered across the deck by
//   `numbered()` below; the title slide counts the notes and the questions.
// - A line starting ✗ or ✓ is a worked example and gets a red or green strip;
//   **bold** marks the mistake or the fix; " | tag" adds a label.
// - Watch out (homework tone) only for a real trap; a tip is the quiet blue `tip`.
// - The classroom's votes, whiteboards and standing game are questions here, each
//   answer explained. Nothing scrolls at 1366×768.
// - Bowen, 20 November 2026: "some of the slides should be questions for the students
//   to fill in the answers". Five are typed (`fill`, utils/fracFill.js): the two
//   whiteboard sets (Fill the Box, Change These), 23/6 → mixed, 3 2/5 → improper, and
//   5/6 or 7/9 over 18. The choices that are the point stay multiple choice.
// - "give instructions how to do the division towards the end": slide 14 is his five
//   steps on 3 ÷ 4 beside a numbered picture (busstopHow.js); slide 15 is the method to
//   write down and the student's own bus stop.
// English and French (meta.vietnamese: false). The diagrams are the classroom deck's
// own (one source); the two steppers are copies in this folder (cut.jsx, slices.jsx).
// Numbers: the deck's own, or new; none is a Workbook question.
import { DIAGRAMS } from '../../../../../classroom/content/y7-math/U07_1a/diagrams.js';
import { CutEveryPiece } from './cut.jsx';
import { SliceBySlice } from './slices.jsx';
import { BUSSTOP_HOW } from './busstopHow.js';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const BLUE = '#1a5fa8';

const slides = [
  // 1 ─ Title ──────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'LayoutGrid',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 7 · 7.1',
    eyebrowFr: 'Unité 7 · 7.1',
    title: 'Ordering Fractions',
    titleFr: 'Ordonner des fractions',
    compact: true,
    objective: 'Make equivalent fractions, change between improper fractions and mixed numbers, decide which fraction is bigger, and write a fraction as a decimal.',
    objectiveFr: 'Faire des fractions équivalentes, passer d’une fraction impropre à un nombre mixte et l’inverse, trouver la plus grande fraction, et écrire une fraction en nombre décimal.',
    // chips: filled in by numbered() — how many notes to write and questions to answer.
    card: {
      icon: 'Lightbulb',
      badge: 'The big idea',
      badgeFr: 'L’idée clé',
      text: 'A fraction can be written in **different ways** and still be the **same amount**. To compare two fractions, **change them first**.',
      textFr: 'Une fraction peut s’écrire de **plusieurs façons** et rester la **même quantité**. Pour comparer deux fractions, **transforme-les d’abord**.',
    },
  },

  // 2 ─ Numerator and denominator ───────────────────────────────────────────
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
    content: 'Mr Bowen eats **3** of the **8** equal slices. Say it: **three eighths**.',
    contentFr: 'M. Bowen mange **3** des **8** parts égales. En anglais : **three eighths**.',
    notes: [
      {
        tone: 'write',
        text: '**Numerator:** the top number. How many parts.\n**Denominator:** the bottom number. How many **equal** parts make one whole.',
        textFr: '**Numérateur (numerator) :** le nombre du haut. Combien de parts.\n**Dénominateur (denominator) :** le nombre du bas. Combien de parts **égales** font un entier.',
      },
    ],
    check: {
      id: 'chk_num_den',
      q: 'A cake is cut into 6 equal slices. Mr Bowen eats 5. What fraction of the cake did he eat?',
      qFr: 'Un gâteau est coupé en 6 parts égales. M. Bowen en mange 5. Quelle fraction du gâteau a-t-il mangée ?',
      options: [
        { val: 'A', text: '$\\dfrac{5}{6}$ · five sixths', textFr: '$\\dfrac{5}{6}$ · cinq sixièmes' },
        { val: 'B', text: '$\\dfrac{6}{5}$ · six fifths', textFr: '$\\dfrac{6}{5}$ · six cinquièmes' },
        { val: 'C', text: '$\\dfrac{1}{6}$ · one sixth', textFr: '$\\dfrac{1}{6}$ · un sixième' },
      ],
      correct: 'A',
      expEn: 'The **denominator** is how many equal slices make the whole cake: **6**, at the bottom. The **numerator** is how many he ate: **5**, on top. B is upside down. C is the slice that is left.',
      expFr: 'Le **dénominateur**, c’est le nombre de parts égales du gâteau entier : **6**, en bas. Le **numérateur**, c’est combien il en a mangé : **5**, en haut. B est à l’envers. C, c’est la part qui reste.',
    },
  },

  // 3 ─ Saying fractions ─────────────────────────────────────────────────────
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
    captionFr: '**Half**, **third**, **quarter** (demi, tiers, quart), puis **-th** : fifth = cinquième. Plusieurs : ajoute **s**.',
    check: {
      id: 'chk_say',
      q: 'How do you say $\\dfrac{5}{8}$ in English?',
      qFr: 'Comment dit-on $\\dfrac{5}{8}$ en anglais ?',
      options: [
        { val: 'A', text: 'five eights', textFr: 'five eights' },
        { val: 'B', text: 'five eighths', textFr: 'five eighths' },
        { val: 'C', text: 'eight fifths', textFr: 'eight fifths' },
      ],
      correct: 'B',
      expEn: 'Say the top as a number (**five**), then the bottom with **-th** (**eighth**), and an **s** because there is more than one: **five eighths**. "Five eights" is 5 × 8. C reads the fraction upside down.',
      expFr: 'Le haut se dit comme un nombre (**five**), le bas avec **-th** (**eighth**), plus un **s** car il y en a plus d’un : **five eighths**. « Five eights », c’est 5 × 8. C lit la fraction à l’envers.',
    },
  },

  // 4 ─ Cut every piece (the stepper) ────────────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Grid3x3',
    eyebrow: 'Press the button',
    eyebrowFr: 'Appuie sur le bouton',
    title: 'Cut Every Piece',
    titleFr: 'Coupe chaque morceau',
    widget: CutEveryPiece,
    caption: 'Before each press, say: how many pieces? How many shaded? The shaded amount never changes.',
    captionFr: 'Avant chaque clic, dis : combien de morceaux ? Combien de coloriés ? La partie coloriée ne change jamais.',
    check: {
      id: 'chk_cut',
      q: 'Now cut each quarter into 6. The bar has 24 pieces. How many of the 24 pieces is the same amount as 3 quarters?',
      qFr: 'Maintenant, coupe chaque quart en 6. La tablette a 24 morceaux. Combien de morceaux sur 24 font la même quantité que 3 quarts ?',
      options: [
        { val: 'A', text: '9 pieces', textFr: '9 morceaux' },
        { val: 'B', text: '18 pieces', textFr: '18 morceaux' },
        { val: 'C', text: '23 pieces', textFr: '23 morceaux' },
      ],
      correct: 'B',
      expEn: 'Each quarter is cut into **6**, so there are 6 × 4 = 24 pieces, and the 3 shaded quarters become 6 × 3 = **18** pieces: $\\dfrac{3}{4} = \\dfrac{18}{24}$. A is $\\dfrac{9}{12}$, a cut of 3. C adds 20 to the top, as the bottom went from 4 to 24: adding never works.',
      expFr: 'Chaque quart est coupé en **6** : 6 × 4 = 24 morceaux, et les 3 quarts coloriés deviennent 6 × 3 = **18** morceaux : $\\dfrac{3}{4} = \\dfrac{18}{24}$. A, c’est $\\dfrac{9}{12}$, une coupe en 3. C ajoute 20 en haut, comme le bas est passé de 4 à 24 : ajouter ne marche jamais.',
    },
  },

  // 5 ─ Equivalent fractions: multiply, never add ────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Equal',
    eyebrow: 'The same amount',
    eyebrowFr: 'La même quantité',
    title: 'Equivalent Fractions',
    titleFr: 'Fractions équivalentes',
    ratio: 42,
    inlineSvg: DIAGRAMS.ADD_OR_TIMES,
    content: '✗ $\\dfrac{2}{3} = \\dfrac{3}{4}$ | add 1\n✓ $\\dfrac{2}{3} = \\dfrac{4}{6}$ | × 2',
    contentFr: '✗ $\\dfrac{2}{3} = \\dfrac{3}{4}$ | + 1\n✓ $\\dfrac{2}{3} = \\dfrac{4}{6}$ | × 2',
    notes: [
      {
        tone: 'write',
        text: '**Equivalent fractions:** fractions that show the same amount.\nMultiply or divide the top **and** the bottom by the **same number**. Never add.',
        textFr: '**Fractions équivalentes (equivalent fractions) :** des fractions qui montrent la même quantité.\nMultiplie ou divise le haut **et** le bas par le **même nombre**. N’ajoute jamais.',
      },
    ],
    check: {
      id: 'chk_equivalent',
      q: 'Which fraction is equal to $\\dfrac{3}{5}$?',
      qFr: 'Quelle fraction est égale à $\\dfrac{3}{5}$ ?',
      options: [
        { val: 'A', text: '$\\dfrac{4}{6}$', textFr: '$\\dfrac{4}{6}$' },
        { val: 'B', text: '$\\dfrac{6}{10}$', textFr: '$\\dfrac{6}{10}$' },
        { val: 'C', text: '$\\dfrac{6}{5}$', textFr: '$\\dfrac{6}{5}$' },
      ],
      correct: 'B',
      expEn: '$\\dfrac{3}{5} = \\dfrac{6}{10}$: the top **and** the bottom × 2. A adds 1 to both, which changes the amount. C doubles only the top, so it is twice as much.',
      expFr: '$\\dfrac{3}{5} = \\dfrac{6}{10}$ : le haut **et** le bas × 2. A ajoute 1 aux deux, ce qui change la quantité. C double seulement le haut : c’est deux fois plus.',
    },
  },

  // 6 ─ Your turn: fill the box (the classroom's whiteboard set, typed) ────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Your turn',
    eyebrowFr: 'À toi',
    title: 'Fill the Box',
    titleFr: 'Complète',
    ratio: 45,
    content: '**a** to **d**: type the missing number.\n**e** and **f**: tap **=** or **≠**.',
    contentFr: '**a** à **d** : écris le nombre qui manque.\n**e** et **f** : touche **=** ou **≠**.',
    notes: [
      {
        tone: 'tip',
        badge: false,
        text: '**=** means **is equal to**. **≠** means **is not equal to**.',
        textFr: '**=** se dit **is equal to** (est égal à). **≠** se dit **is not equal to** (n’est pas égal à).',
      },
    ],
    activity: {
      id: 'act_fill_box',
      type: 'fill',
      prompt: 'Fill every box. Then press Check.',
      promptFr: 'Remplis chaque case. Puis appuie sur Vérifier.',
      lines: ['3/5 = [12]/20', '2/7 = [6]/21', '5/6 = 20/[24]', '12/16 = [3]/4', '3/4 {=} 9/12', '2/5 {≠} 3/6'],
      split: 4,
      explain: '**a** × 4, **b** × 3, **c** × 4, **d** ÷ 4: the top and the bottom by the same number. **e** is × 3 on both, so **=**. **f** adds 1 to both, so **≠**.',
      explainFr: '**a** × 4, **b** × 3, **c** × 4, **d** ÷ 4 : le haut et le bas par le même nombre. **e**, c’est × 3 aux deux, donc **=**. **f** ajoute 1 aux deux, donc **≠**.',
    },
  },

  // 7 ─ Slice by slice (the stepper) ─────────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Circle',
    eyebrow: 'Press the button',
    eyebrowFr: 'Appuie sur le bouton',
    title: 'Slice by Slice',
    titleFr: 'Part après part',
    widget: SliceBySlice,
    caption: 'Mr Bowen ate **11** quarter slices of pizza. Put them back together. Say each number two ways **before** you press.',
    captionFr: 'M. Bowen a mangé **11** quarts de pizza. Rassemble-les. Dis chaque nombre de deux façons **avant** de cliquer.',
  },

  // 8 ─ Improper fraction and mixed number ──────────────────────────────────
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
    content: 'Mr Bowen ate **11** quarters: 2 whole pizzas and 3 quarters. Say it: **two and three quarters**.',
    contentFr: 'M. Bowen a mangé **11** quarts : 2 pizzas entières et 3 quarts. En anglais : **two and three quarters**.',
    notes: [
      {
        tone: 'write',
        text: '**Improper fraction:** the top is bigger than the bottom, so it is more than 1 whole. $\\dfrac{11}{4}$\n**Mixed number:** a whole number and a fraction. $2\\dfrac{3}{4}$',
        textFr: '**Fraction impropre (improper fraction) :** le haut est plus grand que le bas, donc elle vaut plus d’un entier. $\\dfrac{11}{4}$\n**Nombre mixte (mixed number) :** un nombre entier et une fraction. $2\\dfrac{3}{4}$',
      },
    ],
    check: {
      id: 'chk_improper',
      q: 'Which one is an improper fraction?',
      qFr: 'Laquelle est une fraction impropre ?',
      options: [
        { val: 'A', text: '$\\dfrac{7}{9}$', textFr: '$\\dfrac{7}{9}$' },
        { val: 'B', text: '$\\dfrac{9}{7}$', textFr: '$\\dfrac{9}{7}$' },
        { val: 'C', text: '$1\\dfrac{2}{7}$', textFr: '$1\\dfrac{2}{7}$' },
      ],
      correct: 'B',
      expEn: 'In $\\dfrac{9}{7}$ the top (9) is bigger than the bottom (7): more than one whole. A is less than one whole. C is the same amount as B, written as a **mixed number**.',
      expFr: 'Dans $\\dfrac{9}{7}$, le haut (9) est plus grand que le bas (7) : plus d’un entier. A vaut moins d’un entier. C est la même quantité que B, écrite en **nombre mixte**.',
    },
  },

  // 9 ─ Improper → mixed: divide ─────────────────────────────────────────────
  {
    layout: 'steps',
    icon: 'ArrowLeftRight',
    accent: ORANGE,
    eyebrow: 'Improper → mixed',
    eyebrowFr: 'Impropre → mixte',
    title: 'Divide',
    titleFr: 'Divise',
    content: 'Write $\\dfrac{11}{4}$ as a mixed number.',
    contentFr: 'Écris $\\dfrac{11}{4}$ en nombre mixte.',
    dense: true,
    steps: [
      { text: '**Divide** the top by the bottom.\n$11 \\div 4 = 2$ remainder $3$', textFr: '**Divise** le haut par le bas.\n$11 \\div 4 = 2$ reste $3$' },
      { text: 'The answer is the **whole number**: $2$', textFr: 'La réponse est le **nombre entier** : $2$' },
      { text: 'The **remainder** goes on top. The bottom stays.\n$\\dfrac{11}{4} = 2\\dfrac{3}{4}$', textFr: 'Le **reste** va en haut. Le bas ne change pas.\n$\\dfrac{11}{4} = 2\\dfrac{3}{4}$' },
    ],
    notes: [
      {
        tone: 'write',
        text: '**Improper → mixed:** divide. Whole number = the answer. Top = the **remainder**. The bottom stays.',
        textFr: '**Impropre → mixte :** divise. Nombre entier = la réponse. En haut = le **reste (remainder)**. Le bas ne change pas.',
      },
    ],
    activity: {
      id: 'act_to_mixed',
      type: 'fill',
      prompt: 'Write it as a mixed number.',
      promptFr: 'Écris-la en nombre mixte.',
      lines: ['23/6 = [3] [5]/6'],
      explain: '$23 \\div 6 = 3$ remainder $5$ (3 × 6 = 18, and 23 − 18 = 5). Whole number **3**, remainder **5** on top, bottom **6**.',
      explainFr: '$23 \\div 6 = 3$ reste $5$ (3 × 6 = 18, et 23 − 18 = 5). Nombre entier **3**, reste **5** en haut, bas **6**.',
    },
  },

  // 10 ─ Mixed → improper: multiply, then add ───────────────────────────────
  {
    layout: 'steps',
    icon: 'ArrowLeftRight',
    accent: ORANGE,
    eyebrow: 'Mixed → improper',
    eyebrowFr: 'Mixte → impropre',
    title: 'Multiply, Then Add',
    titleFr: 'Multiplie, puis ajoute',
    content: 'Write $2\\dfrac{3}{4}$ as an improper fraction.',
    contentFr: 'Écris $2\\dfrac{3}{4}$ en fraction impropre.',
    dense: true,
    steps: [
      { text: '**Multiply** the whole number by the bottom.\n$2 \\times 4 = 8$ quarters', textFr: '**Multiplie** le nombre entier par le bas.\n$2 \\times 4 = 8$ quarts' },
      { text: '**Add** the top.\n$8 + 3 = 11$', textFr: '**Ajoute** le haut.\n$8 + 3 = 11$' },
      { text: 'Write it over the **same bottom**.\n$2\\dfrac{3}{4} = \\dfrac{11}{4}$', textFr: 'Écris-le sur le **même bas**.\n$2\\dfrac{3}{4} = \\dfrac{11}{4}$' },
    ],
    notes: [
      {
        tone: 'write',
        text: '**Mixed → improper:** whole number × bottom, then + top. The bottom stays.',
        textFr: '**Mixte → impropre :** nombre entier × bas, puis + haut. Le bas ne change pas.',
      },
    ],
    activity: {
      id: 'act_to_improper',
      type: 'fill',
      prompt: 'Write it as an improper fraction.',
      promptFr: 'Écris-le en fraction impropre.',
      lines: ['3 2/5 = [17]/5'],
      explain: '$3 \\times 5 = 15$ fifths, and $15 + 2 = 17$. Check: $17 \\div 5 = 3$ remainder $2$, back to $3\\dfrac{2}{5}$.',
      explainFr: '$3 \\times 5 = 15$ cinquièmes, et $15 + 2 = 17$. Vérifie : $17 \\div 5 = 3$ reste $2$, on retrouve $3\\dfrac{2}{5}$.',
    },
  },

  // 11 ─ Your turn: change these (the classroom's whiteboard set, typed) ──────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Your turn',
    eyebrowFr: 'À toi',
    title: 'Change These',
    titleFr: 'Transforme-les',
    ratio: 45,
    content: '**a** to **d**: write as a **mixed number**.\n**e** to **g**: write as an **improper fraction**.',
    contentFr: '**a** à **d** : écris en **nombre mixte**.\n**e** à **g** : écris en **fraction impropre**.',
    activity: {
      id: 'act_change_these',
      type: 'fill',
      prompt: 'Fill every box. Then press Check.',
      promptFr: 'Remplis chaque case. Puis appuie sur Vérifier.',
      lines: ['9/4 = [2] [1]/4', '13/5 = [2] [3]/5', '17/3 = [5] [2]/3', '23/10 = [2] [3]/10', '3 1/2 = [7]/2', '2 3/5 = [13]/5', '4 2/3 = [14]/3'],
      split: 4,
      explain: '**a** to **d**: divide, and the remainder goes on top. **e** to **g**: multiply, then add the top: 3 × 2 + 1 = 7, 2 × 5 + 3 = 13, 4 × 3 + 2 = 14.',
      explainFr: '**a** à **d** : divise, et le reste va en haut. **e** à **g** : multiplie, puis ajoute le haut : 3 × 2 + 1 = 7, 2 × 5 + 3 = 13, 4 × 3 + 2 = 14.',
    },
  },

  // 12 ─ Which is bigger? Change it first ─────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Scale',
    eyebrow: 'Which is bigger?',
    eyebrowFr: 'Lequel est le plus grand ?',
    title: 'Change It First',
    titleFr: 'Transforme d’abord',
    ratio: 45,
    inlineSvg: DIAGRAMS.NUMBER_LINE,
    content: '✗ $\\dfrac{13}{4}$ > $3\\dfrac{1}{2}$, because **13 is big** | guess\n✓ $\\dfrac{13}{4} = 3\\dfrac{1}{4}$, and $3\\dfrac{1}{4}$ **<** $3\\dfrac{1}{2}$ | change first',
    contentFr: '✗ $\\dfrac{13}{4}$ > $3\\dfrac{1}{2}$, car **13 est grand** | deviner\n✓ $\\dfrac{13}{4} = 3\\dfrac{1}{4}$, et $3\\dfrac{1}{4}$ **<** $3\\dfrac{1}{2}$ | transformer',
    notes: [
      {
        tone: 'write',
        text: '**<** is less than. **>** is greater than.\nChange to a **mixed number** first. The bigger **whole number** wins.',
        textFr: '**<** plus petit que. **>** plus grand que.\nTransforme d’abord en **nombre mixte**. Le plus grand **nombre entier** gagne.',
      },
    ],
    check: {
      id: 'chk_bigger',
      q: 'Which is bigger: $\\dfrac{19}{5}$ or $3\\dfrac{1}{2}$?',
      qFr: 'Lequel est le plus grand : $\\dfrac{19}{5}$ ou $3\\dfrac{1}{2}$ ?',
      options: [
        { val: 'A', text: '$\\dfrac{19}{5}$', textFr: '$\\dfrac{19}{5}$' },
        { val: 'B', text: '$3\\dfrac{1}{2}$', textFr: '$3\\dfrac{1}{2}$' },
        { val: 'C', text: 'They are the same.', textFr: 'Ils sont égaux.' },
      ],
      correct: 'A',
      expEn: '$19 \\div 5 = 3$ remainder $4$, so $\\dfrac{19}{5} = 3\\dfrac{4}{5}$. Both have 3 wholes; $\\dfrac{4}{5}$ is nearly a whole, more than a half. So $\\dfrac{19}{5} > 3\\dfrac{1}{2}$.',
      expFr: '$19 \\div 5 = 3$ reste $4$, donc $\\dfrac{19}{5} = 3\\dfrac{4}{5}$. Les deux ont 3 entiers ; $\\dfrac{4}{5}$ est presque un entier, plus qu’une moitié. Donc $\\dfrac{19}{5} > 3\\dfrac{1}{2}$.',
    },
  },

  // 13 ─ Same whole number: a common denominator ─────────────────────────────
  {
    layout: 'steps',
    icon: 'Scale',
    accent: BLUE,
    eyebrow: 'Same whole number?',
    eyebrowFr: 'Même nombre entier ?',
    title: 'Use the Same Bottom',
    titleFr: 'Prends le même bas',
    dense: true,
    content: 'Which is bigger: $\\dfrac{11}{4}$ or $2\\dfrac{2}{3}$?',
    contentFr: 'Lequel est le plus grand : $\\dfrac{11}{4}$ ou $2\\dfrac{2}{3}$ ?',
    steps: [
      { text: '**Change it first:** $\\dfrac{11}{4} = 2\\dfrac{3}{4}$. Same whole number, 2 and 2.', textFr: '**Transforme d’abord :** $\\dfrac{11}{4} = 2\\dfrac{3}{4}$. Même nombre entier, 2 et 2.' },
      { text: '**12** is in the 4 and the 3 times tables: $\\dfrac{3}{4} = \\dfrac{9}{12}$, $\\dfrac{2}{3} = \\dfrac{8}{12}$', textFr: '**12** est dans la table de 4 et de 3 : $\\dfrac{3}{4} = \\dfrac{9}{12}$, $\\dfrac{2}{3} = \\dfrac{8}{12}$' },
      { text: '**9 > 8**, so $\\dfrac{11}{4} > 2\\dfrac{2}{3}$', textFr: '**9 > 8**, donc $\\dfrac{11}{4} > 2\\dfrac{2}{3}$' },
    ],
    notes: [
      {
        tone: 'write',
        text: '**Common denominator:** the same bottom number. Find it in **both** times tables, then compare the tops.',
        textFr: '**Dénominateur commun (common denominator) :** le même nombre en bas. Trouve-le dans les **deux** tables, puis compare les hauts.',
      },
    ],
    activity: {
      id: 'act_common',
      type: 'fill',
      prompt: 'Which is bigger? Use the same bottom, **18**. Then choose <, = or >.',
      promptFr: 'Laquelle est la plus grande ? Prends le même bas, **18**. Puis choisis <, = ou >.',
      lines: [
        '5/6 = [15]/18',
        '7/9 = [14]/18',
        { q: '5/6 {>} 7/9', hint: 'Look at your answers to a and b. Same bottom, so compare the tops.', hintFr: 'Regarde tes réponses a et b. Même bas, donc compare les hauts.' },
      ],
      split: 3,
      explain: '**18** is in the 6 and the 9 times tables: × 3 and × 2. 15 > 14, so $\\dfrac{5}{6}$ is bigger. Bigger numbers in $\\dfrac{7}{9}$ do not make it bigger.',
      explainFr: '**18** est dans la table de 6 et de 9 : × 3 et × 2. 15 > 14, donc $\\dfrac{5}{6}$ est plus grande. Les grands nombres de $\\dfrac{7}{9}$ ne la rendent pas plus grande.',
    },
  },

  // 14 ─ How to divide on the bus stop (Bowen: "give instructions how to do the
  // division towards the end"): his five steps on 3 ÷ 4, the picture numbered to match.
  {
    layout: 'steps',
    icon: 'Divide',
    accent: PURPLE,
    eyebrow: 'Fraction → decimal',
    eyebrowFr: 'Fraction → décimal',
    title: 'How to Divide on the Bus Stop',
    titleFr: 'Diviser en bus stop',
    dense: true,
    inlineSvg: BUSSTOP_HOW,
    content: 'A fraction is a division: $\\dfrac{3}{4} = 3 \\div 4$.',
    contentFr: 'Une fraction est une division : $\\dfrac{3}{4} = 3 \\div 4$.',
    steps: [
      { text: '**Divide** the top by the bottom. 4 goes into 3 **0** times, 3 left.', textFr: '**Divise** le haut par le bas. En 3, 4 va **0** fois, il reste 3.' },
      { text: 'Out of digits? Write a **point** and add a **0**.', textFr: 'Plus de chiffres ? Écris un **point** et ajoute un **0**.' },
      { text: 'Write the **remainder** small, in front of the next digit: ³0 is **30**. 30 ÷ 4 = 7, 2 left.', textFr: 'Écris le **reste** en petit, devant le chiffre suivant : ³0, c’est **30**. 30 ÷ 4 = 7, il reste 2.' },
      { text: 'The **point** goes straight up into the answer.', textFr: 'Le **point** monte tout droit dans la réponse.' },
      { text: 'Stop when **nothing is left**: ²0 is 20, and 20 ÷ 4 = 5, 0 left.', textFr: 'Arrête-toi quand **il ne reste rien** : ²0, c’est 20, et 20 ÷ 4 = 5, il reste 0.' },
    ],
  },

  // 15 ─ Your turn on the bus stop, under the method to write down ───────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Divide',
    eyebrow: 'Your turn',
    eyebrowFr: 'À toi',
    title: 'Divide on the Bus Stop',
    titleFr: 'Divise en bus stop',
    ratio: 50,
    content: 'Use the five steps. Stuck? Go back one slide.',
    contentFr: 'Suis les cinq étapes. Bloqué ? Reviens à la page précédente.',
    notes: [
      {
        tone: 'write',
        text: '**Fraction → decimal:** divide the top by the bottom. Add a point and zeros until nothing is left over.\n$\\dfrac{3}{4} = 3 \\div 4 = 0.75$',
        textFr: '**Fraction → décimal :** divise le haut par le bas. Ajoute un point et des zéros jusqu’à ce qu’il ne reste rien.\n$\\dfrac{3}{4} = 3 \\div 4 = 0.75$',
      },
    ],
    activity: {
      id: 'act_busstop_9_4',
      type: 'busstop',
      prompt: 'Work out 9 ÷ 4 on the bus stop. Add zeros when you need them.',
      promptFr: 'Calcule 9 ÷ 4 en bus stop. Ajoute des zéros quand il le faut.',
      dividend: '9',
      divisor: 4,
      explain: '4 into 9 goes **2**, with 1 left: the 1 rides on a new 0 after the point, so read 10. 4 into 10 goes **2**, with 2 left: 20. 4 into 20 goes **5** exactly. So $\\dfrac{9}{4} = 2.25$.',
      explainFr: 'En 9, 4 va **2** fois, il reste 1 : le 1 va sur un nouveau 0 après le point, lis 10. En 10, 4 va **2** fois, il reste 2 : 20. En 20, 4 va **5** fois tout juste. Donc $\\dfrac{9}{4} = 2.25$.',
    },
  },

  // 16 ─ Order of size, with decimals ────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'TrendingUp',
    eyebrow: 'Order of size',
    eyebrowFr: 'Ordre de grandeur',
    title: 'Smallest to Largest',
    titleFr: 'Du plus petit au plus grand',
    ratio: 45,
    content: 'Mr Bowen wrote each fraction as a decimal:\n$\\dfrac{5}{4} = 1.25$\n$\\dfrac{13}{8} = 1.625$\n$\\dfrac{3}{2} = 1.5$\n$\\dfrac{7}{5} = 1.4$',
    contentFr: 'M. Bowen a écrit chaque fraction en nombre décimal :\n$\\dfrac{5}{4} = 1.25$\n$\\dfrac{13}{8} = 1.625$\n$\\dfrac{3}{2} = 1.5$\n$\\dfrac{7}{5} = 1.4$',
    notes: [
      {
        tone: 'tip',
        badge: false,
        text: 'Compare decimals digit by digit, from the left: **1.4** > **1.25** because 4 tenths > 2 tenths.',
        textFr: 'Compare les décimaux chiffre par chiffre, depuis la gauche : **1.4** > **1.25** car 4 dixièmes > 2 dixièmes.',
      },
    ],
    activity: {
      id: 'act_order_size',
      type: 'order',
      prompt: 'Put the fractions in order of size, starting with the smallest.',
      promptFr: 'Range les fractions par ordre de grandeur, en commençant par la plus petite.',
      steps: [
        { id: 'f54', name: '5/4 = 1.25', nameFr: '5/4 = 1.25' },
        { id: 'f75', name: '7/5 = 1.4', nameFr: '7/5 = 1.4' },
        { id: 'f32', name: '3/2 = 1.5', nameFr: '3/2 = 1.5' },
        { id: 'f138', name: '13/8 = 1.625', nameFr: '13/8 = 1.625' },
      ],
      explain: '1.25 < 1.4 < 1.5 < 1.625. Look at the tenths: 2, 4, 5, 6. So $\\dfrac{5}{4}, \\dfrac{7}{5}, \\dfrac{3}{2}, \\dfrac{13}{8}$. 1.625 has the most digits, but it is not the biggest because of that.',
      explainFr: '1.25 < 1.4 < 1.5 < 1.625. Regarde les dixièmes : 2, 4, 5, 6. Donc $\\dfrac{5}{4}, \\dfrac{7}{5}, \\dfrac{3}{2}, \\dfrac{13}{8}$. 1.625 a le plus de chiffres, mais ce n’est pas pour ça qu’il est le plus grand.',
    },
  },

  // 17 ─ Word problem: the bánh chưng ────────────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Bánh Chưng',
    titleFr: 'Le bánh chưng de M. Bowen',
    content: 'A bánh chưng is cut into **8** equal pieces. At Tết, Mr Bowen’s family eats **14** pieces.',
    contentFr: 'Un bánh chưng est coupé en **8** parts égales. Au Têt, la famille de M. Bowen mange **14** parts.',
    check: {
      id: 'chk_banhchung',
      q: 'How many bánh chưng did they eat?',
      qFr: 'Combien de bánh chưng ont-ils mangé ?',
      options: [
        { val: 'A', text: '$1\\dfrac{3}{4}$', textFr: '$1\\dfrac{3}{4}$' },
        { val: 'B', text: '1.4', textFr: '1.4' },
        { val: 'C', text: '2', textFr: '2' },
      ],
      correct: 'A',
      expEn: '14 pieces of 8 is $\\dfrac{14}{8}$. $14 \\div 8 = 1$ remainder $6$, so $1\\dfrac{6}{8} = 1\\dfrac{3}{4}$ (÷ 2). B just puts a point between 1 and 4: as a decimal, $\\dfrac{14}{8} = 1.75$. C is 16 pieces.',
      expFr: '14 parts sur 8, c’est $\\dfrac{14}{8}$. $14 \\div 8 = 1$ reste $6$, donc $1\\dfrac{6}{8} = 1\\dfrac{3}{4}$ (÷ 2). B met juste un point entre 1 et 4 : en décimal, $\\dfrac{14}{8} = 1.75$. C, c’est 16 parts.',
    },
  },

  // 18 ─ Word problem: nine quarters of one pizza ─────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Pizza',
    titleFr: 'La pizza de M. Bowen',
    content: 'Mr Bowen says: “I ate $\\dfrac{9}{4}$ of my pizza.” His doctor says that is not possible with one pizza.',
    contentFr: 'M. Bowen dit : « J’ai mangé $\\dfrac{9}{4}$ de ma pizza. » Son médecin dit que c’est impossible avec une seule pizza.',
    check: {
      id: 'chk_pizza',
      q: 'How many pizzas did Mr Bowen have, at least?',
      qFr: 'Combien de pizzas M. Bowen avait-il, au moins ?',
      options: [
        { val: 'A', text: '2', textFr: '2' },
        { val: 'B', text: '3', textFr: '3' },
        { val: 'C', text: '9', textFr: '9' },
      ],
      correct: 'B',
      expEn: '$\\dfrac{9}{4} = 2\\dfrac{1}{4}$: 2 whole pizzas and a quarter of another. That is more than 2, so he needed **3** pizzas, at least. **At least** means the smallest number that works.',
      expFr: '$\\dfrac{9}{4} = 2\\dfrac{1}{4}$ : 2 pizzas entières et un quart d’une autre. C’est plus que 2, donc il lui fallait **3** pizzas, au moins. **At least** (au moins) veut dire le plus petit nombre qui marche.',
    },
  },

  // 19 ─ Checklist ───────────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'ListChecks',
    columns: 1,
    eyebrow: 'Before you finish',
    eyebrowFr: 'Avant de finir',
    title: 'Can You Do These?',
    titleFr: 'Sais-tu faire ceci ?',
    items: [
      { text: 'Make **equivalent fractions**: multiply or divide the top and the bottom by the same number. Never add.', textFr: 'Faire des **fractions équivalentes** : multiplier ou diviser le haut et le bas par le même nombre. Jamais ajouter.' },
      { text: '**Improper → mixed**: divide. **Mixed → improper**: multiply, then add.', textFr: '**Impropre → mixte** : diviser. **Mixte → impropre** : multiplier, puis ajouter.' },
      { text: '**Which is bigger?** Change to mixed numbers first. Same whole number? Use the same bottom.', textFr: '**Lequel est le plus grand ?** D’abord en nombres mixtes. Même nombre entier ? Prends le même bas.' },
      { text: '**Fraction → decimal**: top ÷ bottom on the bus stop, then put decimals in order of size.', textFr: '**Fraction → décimal** : le haut ÷ le bas en bus stop, puis ranger les décimaux par ordre de grandeur.' },
    ],
    notes: [
      { tone: 'homework', text: 'Two traps: **adding** to the top and the bottom, and thinking a fraction is big because its **numbers** are big.', textFr: 'Deux pièges : **ajouter** au haut et au bas, et croire qu’une fraction est grande parce que ses **nombres** sont grands.' },
    ],
  },

  // 20 ─ Done ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    title: 'Lesson Complete!',
    titleFr: 'Leçon terminée !',
    subtitle: 'Now practise each one: **Mixed ↔ improper**, **Which is bigger?** and **Fractions to decimals**. Then the quiz.',
    subtitleFr: 'Maintenant, entraîne-toi : **Mixte ↔ impropre**, **Laquelle est la plus grande ?** et **Fractions en décimaux**. Puis le quiz.',
  },
];

// Number the "Write this down" boxes through the deck ("Write this down · 3 of 8") and
// put the counts on the title slide, so a student knows what the lesson asks of them
// and where they are in it. Counted here so they never drift (as English Unit 1).
function numbered(deck) {
  const writes = deck.flatMap((s) => [...(s.notes || []), ...(Array.isArray(s.columns) ? s.columns : []).flatMap((c) => c.notes || [])])
    .filter((n) => n.tone === 'write');
  writes.forEach((n, i) => {
    n.badge = `Write this down · ${i + 1} of ${writes.length}`;
    n.badgeFr = `Écris ceci · ${i + 1} sur ${writes.length}`;
  });
  const questions = deck.filter((s) => s.check || s.activity).length;
  deck[0].chips = [
    { icon: 'Pencil', text: `${writes.length} things to write down`, textFr: `${writes.length} choses à écrire` },
    { icon: 'HelpCircle', text: `${questions} questions to answer`, textFr: `${questions} questions` },
  ];
  return deck;
}

export const notes = numbered(slides);


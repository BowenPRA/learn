// content/y7-math/U05_1/slides.js
// Year 7 Mathematics · 5.1 A sum of 360°. Monday 26 October 2026, one period.
// Source: Workbook Unit 5, Section 5.1 (pp. 66–68). Every number used in class
// is original, so the Workbook exercise is still unspent. No homework slide
// (Mr Bowen, 14 Oct). English and French only. Shaped like Coffee, Carbon and
// Stars: a starter, a "Today You Will…" slide that the checklist mirrors,
// write panels that hold only the fact, and an exit question.
//
// THE SCAFFOLD, IN ORDER:
//   what they know      the four numbers (2), then how to READ an angle
//                       diagram: a number, a letter, a small square, ° (4)
//   180° on a line      the fact (5), a vote (6–7)
//   360° round a point  the pizza asks it (8), the fact (9)
//   the method          TWO STEPS: add what you know, subtract from 180° or
//                       360° (10). Every answer after this is shown that way.
//   key words           sum (11), quadrilateral (12)
//   360° in a shape     a vote (13), the class tears corners (14), the result
//                       (15), the fact (16), the two steps on it (17)
//   the Workbook        its question words (18), then practice in its words
//                       (19–22), then two deadpan word problems (23–24)
//
// COPY-DOWN: 7 written panels — straight line · round a point · two steps ·
// sum · quadrilateral · quadrilateral 360° · parallelogram.
import { DIAGRAMS } from './diagrams.js'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'
const RED = '#c8102e'

export const slides = [
  // 1. Hero + starter: the four facts from primary school
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Triangle',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 5 · 5.1',
    eyebrowFr: 'Unité 5 · 5.1',
    date: '26 Oct 2026',
    title: 'A Sum of 360°',
    titleFr: 'Une somme de 360°',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeFr: 'Pour commencer',
      text: 'How many degrees? Write four numbers: a **right angle**, a **straight line**, a **full turn**, and the three angles of a **triangle**.',
      textFr: 'Combien de degrés ? Écris quatre nombres : un **angle droit**, une **ligne droite**, un **tour complet**, et les trois angles d’un **triangle**.',
    },
  },

  // 2. Starter answers
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'CheckCircle2',
    eyebrow: 'Starter check',
    eyebrowFr: 'Correction',
    title: 'Four Numbers',
    titleFr: 'Quatre nombres',
    inlineSvg: DIAGRAMS.FACTS,
    caption: 'Today we use **180°** and **360°** again and again.',
    captionFr: 'Aujourd’hui, on utilise **180°** et **360°** encore et encore.',
  },

  // 3. Today's goals (the checklist on slide 25 ticks off the same three)
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Today',
    eyebrowFr: 'Aujourd’hui',
    title: 'Today You Will…',
    titleFr: 'Aujourd’hui, tu vas…',
    text: 'Find a **missing angle**.',
    textFr: 'Trouver un **angle qui manque**.',
    columns: [
      {
        heading: 'On a line',
        headingFr: 'Sur une ligne',
        accent: TEAL,
        icon: 'Minus',
        inlineSvg: DIAGRAMS.PIC_LINE,
        caption: 'Find a missing angle on a line.',
        captionFr: 'Trouver un angle sur une ligne.',
      },
      {
        heading: 'Round a point',
        headingFr: 'Autour d’un point',
        accent: PURPLE,
        icon: 'Circle',
        inlineSvg: DIAGRAMS.PIC_POINT,
        caption: 'Find a missing angle round a point.',
        captionFr: 'Trouver un angle autour d’un point.',
      },
      {
        heading: 'In a 4-sided shape',
        headingFr: 'Dans une figure à 4 côtés',
        accent: ORANGE,
        icon: 'Square',
        inlineSvg: DIAGRAMS.PIC_QUAD,
        caption: 'Find the last angle of a 4-sided shape.',
        captionFr: 'Trouver le dernier angle à 4 côtés.',
      },
    ],
  },

  // 4. How to read an angle diagram: number, letter, small square, degrees
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'ScanEye',
    eyebrow: 'Read the picture',
    eyebrowFr: 'Lis le dessin',
    title: 'How to Read an Angle',
    titleFr: 'Comment lire un angle',
    inlineSvg: DIAGRAMS.READ,
    caption: 'A **letter** is a missing angle. Your job is to find it.',
    captionFr: 'Une **lettre** est un angle qui manque. Ton travail : le trouver.',
  },

  // ── A STRAIGHT LINE ───────────────────────────────────────────────────────
  // 5. Angles on a straight line (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Minus',
    eyebrow: 'Angle fact',
    eyebrowFr: 'Propriété',
    title: 'On a Straight Line',
    titleFr: 'Sur une ligne droite',
    ratio: 45,
    inlineSvg: DIAGRAMS.LINE,
    content: 'Together, the two angles make the **straight line**.',
    contentFr: 'Ensemble, les deux angles font la **ligne droite**.',
    notes: [
      {
        tone: 'write',
        text: 'Angles on a **straight line** add up to **180°**.',
        textFr: 'Les angles sur une **ligne droite** font **180°** en tout.',
      },
    ],
    reveal: {
      prompt: 'Find **a**.',
      promptFr: 'Trouve **a**.',
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**a = 180° − 130° = 50°**',
      answerFr: '**a = 180° − 130° = 50°**',
    },
  },

  // 6. Vote: is it really straight?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Is It Straight?',
    titleFr: 'Est-ce droit ?',
    text: 'Two angles are **57°** and **121°**. Together, do they make a **straight line**?',
    textFr: 'Deux angles font **57°** et **121°**. Ensemble, font-ils une **ligne droite** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_YES },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_NO },
    ],
  },

  // 7. The vote settled
  {
    layout: 'statement',
    accent: RED,
    eyebrow: 'Answer: B',
    eyebrowFr: 'Réponse : B',
    title: 'Not Quite Straight',
    titleFr: 'Pas tout à fait droite',
    text: '**57° + 121° = 178°**. A straight line is **180°**.',
    textFr: '**57° + 121° = 178°**. Une ligne droite fait **180°**.',
    sub: 'So it is **not** straight. It can look straight. Always add.',
    subFr: 'Donc elle n’est **pas** droite. Elle peut sembler droite. Additionne toujours.',
  },

  // ── ROUND A POINT ─────────────────────────────────────────────────────────
  // 8. The pizza asks the question
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Circle',
    eyebrow: 'Think · a full turn',
    eyebrowFr: 'Réfléchis · un tour complet',
    title: 'Mr Bowen’s Pizza',
    titleFr: 'La pizza de M. Bowen',
    ratio: 40,
    inlineSvg: DIAGRAMS.PIZZA_Q,
    content: 'Mr Bowen cuts his pizza into **8 equal slices**.\n\nWhat angle is **one** slice?',
    contentFr: 'M. Bowen coupe sa pizza en **8 parts égales**.\n\nQuel est l’angle d’**une** part ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: 'A full turn is **360°**. **360° ÷ 8 = 45°**',
      answerFr: 'Un tour complet fait **360°**. **360° ÷ 8 = 45°**',
    },
  },

  // 9. Angles round a point (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Circle',
    eyebrow: 'Angle fact',
    eyebrowFr: 'Propriété',
    title: 'Round a Point',
    titleFr: 'Autour d’un point',
    ratio: 45,
    inlineSvg: DIAGRAMS.POINT,
    content: 'Together, the angles make a **full turn**.',
    contentFr: 'Ensemble, les angles font un **tour complet**.',
    notes: [
      {
        tone: 'write',
        text: 'Angles **around a point** add up to **360°**.',
        textFr: 'Les angles **autour d’un point** font **360°** en tout.',
      },
    ],
    reveal: {
      prompt: 'Find **b**.',
      promptFr: 'Trouve **b**.',
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**100° + 120° = 220°**\n**b = 360° − 220° = 140°**',
      answerFr: '**100° + 120° = 220°**\n**b = 360° − 220° = 140°**',
    },
  },

  // 10. The method: two steps (write)
  {
    layout: 'callout',
    accent: ORANGE,
    icon: 'ListOrdered',
    eyebrow: 'The method',
    eyebrowFr: 'La méthode',
    title: 'Two Steps',
    titleFr: 'Deux étapes',
    notes: [
      {
        tone: 'write',
        text: '**To find a missing angle:**\n**1.** Add the angles you know.\n**2.** Subtract the total from **180°** or **360°**.',
        textFr: '**Pour trouver un angle qui manque :**\n**1.** Additionne les angles que tu connais.\n**2.** Soustrais le total de **180°** ou de **360°**.',
      },
    ],
    reveal: {
      prompt: 'Three angles round a point are **90°**, **150°** and **c**. Find **c**.',
      promptFr: 'Trois angles autour d’un point font **90°**, **150°** et **c**. Trouve **c**.',
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**1.** **90° + 150° = 240°**, **2.** **c = 360° − 240° = 120°**',
      answerFr: '**1.** **90° + 150° = 240°**, **2.** **c = 360° − 240° = 120°**',
    },
  },

  // ── KEY WORDS ─────────────────────────────────────────────────────────────
  // 11. Sum (write) — it sounds like "some"
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'MessageSquare',
    eyebrow: 'Key word · English check',
    eyebrowFr: 'Mot clé · point d’anglais',
    title: 'Sum',
    titleFr: 'La somme',
    ratio: 45,
    inlineSvg: DIAGRAMS.SUM_SOME,
    notes: [
      {
        tone: 'write',
        text: '**Sum:** the total when you add numbers together.',
        textFr: '**Somme (sum) :** le total quand on additionne des nombres.',
      },
      {
        tone: 'info',
        badge: false,
        text: '**A sum of 360°** means they **add up to** 360°.',
        textFr: '**A sum of 360°** veut dire qu’ils **font 360° en tout**.',
      },
    ],
  },

  // 12. Quadrilateral (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Square',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Quadrilateral',
    titleFr: 'Le quadrilatère',
    ratio: 45,
    inlineSvg: DIAGRAMS.QUADS,
    content: '**quad** = 4 · **lateral** = side',
    contentFr: '**quad** = 4 · **lateral** = côté',
    notes: [
      {
        tone: 'write',
        text: '**Quadrilateral:** a flat shape with **four** straight sides.',
        textFr: '**Quadrilatère (quadrilateral) :** une figure plane à **quatre** côtés droits.',
      },
    ],
  },

  // ── ANGLES IN A QUADRILATERAL ─────────────────────────────────────────────
  // 13. Vote: every quadrilateral, or only some?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Every Quadrilateral?',
    titleFr: 'Tous les quadrilatères ?',
    text: 'A square’s four angles add up to **360°**. Is that true for **every** quadrilateral?',
    textFr: 'Les quatre angles d’un carré font **360°**. Est-ce vrai pour **tous** les quadrilatères ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_SOME },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_ALL },
    ],
  },

  // 14. Hands-on: the three steps, with the result hidden
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Try it · scrap paper',
    eyebrowFr: 'Essaie · papier brouillon',
    title: 'Tear Off the Corners',
    titleFr: 'Déchire les coins',
    inlineSvg: DIAGRAMS.TEAR,
    caption: 'Make your shape **strange**. What do the four corners make?',
    captionFr: 'Fais une figure **bizarre**. Que font les quatre coins ?',
  },

  // 15. What the corners made
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Circle',
    eyebrow: 'Answer: B',
    eyebrowFr: 'Réponse : B',
    title: 'Always a Full Turn',
    titleFr: 'Toujours un tour complet',
    inlineSvg: DIAGRAMS.CORNERS,
    caption: 'Every shape, every time: the corners make a **full turn**.',
    captionFr: 'Chaque figure, chaque fois : les coins font un **tour complet**.',
  },

  // 16. Angles in a quadrilateral (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Square',
    eyebrow: 'Angle fact',
    eyebrowFr: 'Propriété',
    title: 'A Sum of 360°',
    titleFr: 'Une somme de 360°',
    ratio: 45,
    inlineSvg: DIAGRAMS.QUAD_TRI,
    content: 'Another way to see it: one line makes **two triangles**.',
    contentFr: 'Une autre façon de le voir : une ligne fait **deux triangles**.',
    notes: [
      {
        tone: 'write',
        text: 'The angles in a **quadrilateral** add up to **360°**.',
        textFr: 'Les angles d’un **quadrilatère** font **360°** en tout.',
      },
    ],
  },

  // 17. Worked example: the two steps again
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ListOrdered',
    eyebrow: 'Two steps · say them first',
    eyebrowFr: 'Deux étapes · dis-les avant',
    title: 'Find the Fourth Angle',
    titleFr: 'Trouve le quatrième angle',
    ratio: 45,
    inlineSvg: DIAGRAMS.WORKED,
    content: 'Three angles of a quadrilateral are **70°**, **95°** and **120°**.',
    contentFr: 'Trois angles d’un quadrilatère font **70°**, **95°** et **120°**.',
    reveal: {
      prompt: 'Find **d**.',
      promptFr: 'Trouve **d**.',
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**1.** **70° + 95° + 120° = 285°**\n**2.** **d = 360° − 285° = 75°**',
      answerFr: '**1.** **70° + 95° + 120° = 285°**\n**2.** **d = 360° − 285° = 75°**',
    },
  },

  // ── THE WORKBOOK ──────────────────────────────────────────────────────────
  // 18. The Workbook's question words
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Read the Question',
    titleFr: 'Lis la question',
    inlineSvg: DIAGRAMS.PHRASES,
    caption: '**Calculate** and **work out** both mean **find**.',
    captionFr: '**Calculate** et **work out** veulent dire **trouve** (calcule).',
  },

  // 19. Whiteboards: one of each, in the Workbook's words
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards',
    eyebrowFr: 'Ardoises',
    title: 'One of Each',
    titleFr: 'Un de chaque',
    ratio: 40,
    inlineSvg: DIAGRAMS.PRACTICE,
    content: 'Work out the size of the angles that have a letter.\n\nFirst decide: **180°** or **360°**?',
    contentFr: 'Work out the size of the angles that have a letter : calcule les angles qui ont une lettre.\n\nDécide d’abord : **180°** ou **360°** ?',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**1** **x = 35°** (180°), **2** **y = 125°** (360°), **3** **z = 75°** (360°)',
      answerFr: '**1** **x = 35°** (180°), **2** **y = 125°** (360°), **3** **z = 75°** (360°)',
    },
  },

  // 20. One angle known, the other three equal
  {
    layout: 'statement',
    accent: GREEN,
    eyebrow: 'Whiteboards',
    eyebrowFr: 'Ardoises',
    title: 'Three the Same',
    titleFr: 'Trois pareils',
    text: 'One angle of a quadrilateral is **150°**. The other three angles are **the same size**.',
    textFr: 'Un angle d’un quadrilatère fait **150°**. Les trois autres angles sont **égaux**.',
    sub: 'Work out the size of the other angles. Start with **360° − 150°**.',
    subFr: 'Calcule la taille des autres angles. Commence par **360° − 150°**.',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**360° − 150° = 210°**, and **210° ÷ 3 = 70°** each',
      answerFr: '**360° − 150° = 210°**, et **210° ÷ 3 = 70°** chacun',
    },
  },

  // 21. Parallelogram (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Square',
    eyebrow: 'Angle fact',
    eyebrowFr: 'Propriété',
    title: 'Parallelogram',
    titleFr: 'Le parallélogramme',
    ratio: 45,
    inlineSvg: DIAGRAMS.PARA,
    content: 'One angle is **65°**. Find **q** first. Then **p** and **r**.',
    contentFr: 'Un angle fait **65°**. Trouve d’abord **q**. Puis **p** et **r**.',
    notes: [
      {
        tone: 'write',
        text: 'In a **parallelogram**, opposite angles are **equal**.',
        textFr: 'Dans un **parallélogramme**, les angles opposés sont **égaux**.',
      },
    ],
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**q = 65°**. **360° − 65° − 65° = 230°**, so **p = r = 115°**',
      answerFr: '**q = 65°**. **360° − 65° − 65° = 230°**, donc **p = r = 115°**',
    },
  },

  // 22. Challenge: squares and an equilateral triangle round a point
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Trophy',
    eyebrow: 'Challenge',
    eyebrowFr: 'Défi',
    title: 'Shapes Round a Point',
    titleFr: 'Des figures autour d’un point',
    ratio: 45,
    inlineSvg: DIAGRAMS.TILES,
    content: 'Two squares and an equilateral triangle meet at a point. Find **y**.',
    contentFr: 'Deux carrés et un triangle équilatéral se rejoignent en un point. Trouve **y**.',
    notes: [
      {
        tone: 'info',
        badge: false,
        text: 'Every angle in an **equilateral** triangle is **60°**.',
        textFr: 'Chaque angle d’un triangle **équilatéral** fait **60°**.',
      },
    ],
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**1.** **90° + 90° + 60° = 240°**\n**2.** **y = 360° − 240° = 120°**',
      answerFr: '**1.** **90° + 90° + 60° = 240°**\n**2.** **y = 360° − 240° = 120°**',
    },
  },

  // ── WORD PROBLEMS (deadpan) ───────────────────────────────────────────────
  // 23. Mr Bowen's chair
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'RotateCcw',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Chair',
    titleFr: 'La chaise de M. Bowen',
    content:
      'Mr Bowen sits on his chair, facing the board.\n\n' +
      'He spins round **2½ times**. How many degrees does he turn? What is he facing now?',
    contentFr:
      'M. Bowen est assis sur sa chaise, face au tableau.\n\n' +
      'Il tourne **2 fois et demie**. De combien de degrés tourne-t-il ? Que regarde-t-il maintenant ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**2.5 × 360° = 900°**. He is facing the **back** of the room. The lesson is behind him.',
      answerFr: '**2.5 × 360° = 900°**. Il regarde le **fond** de la classe. La leçon est derrière lui.',
    },
  },

  // 24. Mr Bowen's garden
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'Home',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Garden',
    titleFr: 'Le jardin de M. Bowen',
    content:
      'Mr Bowen’s garden is a quadrilateral. Three of its corners are **90°**.\n\n' +
      'His cat sleeps in the fourth corner. What size is the cat’s corner?',
    contentFr:
      'Le jardin de M. Bowen est un quadrilatère. Trois de ses coins font **90°**.\n\n' +
      'Son chat dort dans le quatrième coin. Quelle est la taille du coin du chat ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**360° − 90° − 90° − 90° = 90°**. The cat does not change the angle.',
      answerFr: '**360° − 90° − 90° − 90° = 90°**. Le chat ne change pas l’angle.',
    },
  },

  // ── CLOSE ─────────────────────────────────────────────────────────────────
  // 25. Checklist: slide 3's goals, with the key words
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you leave',
    eyebrowFr: 'Avant de partir',
    title: 'Can You Do These?',
    titleFr: 'Sais-tu faire ceci ?',
    content: '> Check your notebook: **7 written panels**.',
    contentFr: '> Vérifie ton cahier : **7 encadrés recopiés**.',
    items: [
      { text: 'Find a missing angle on a **straight line** (180°).', textFr: 'Trouver un angle sur une **ligne droite** (180°).' },
      { text: 'Find a missing angle **around a point** (360°).', textFr: 'Trouver un angle **autour d’un point** (360°).' },
      { text: 'Find the fourth angle of a **quadrilateral** (360°).', textFr: 'Trouver le quatrième angle d’un **quadrilatère** (360°).' },
      { text: 'Use the **two steps**: add, then subtract.', textFr: 'Utiliser les **deux étapes** : additionner, puis soustraire.' },
    ],
  },

  // 26. Exit
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Target',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'The Fourth Angle',
    titleFr: 'Le quatrième angle',
    subtitle: 'Three angles of a quadrilateral are **85°**, **100°** and **110°**. Work out the fourth angle.',
    subtitleFr: 'Trois angles d’un quadrilatère font **85°**, **100°** et **110°**. Calcule le quatrième angle.',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**1.** **85° + 100° + 110° = 295°**\n**2.** **360° − 295° = 65°**',
      answerFr: '**1.** **85° + 100° + 110° = 295°**\n**2.** **360° − 295° = 65°**',
    },
  },
]

// content/y7-math/U05_3/slides.js
// Year 7 Mathematics · 5.3 Drawing lines and quadrilaterals. One 50-minute
// period after 5.2 Intersecting lines; a practical lesson — every student needs
// a ruler, a protractor and a sharp pencil (a set square if there is one).
// Source: Workbook Unit 5, Section 5.3 (pp. 70–72); no Learner's Book for this
// unit. Every number used in class is original, so Exercise 5.3 is unspent.
// No homework slide.
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from Unit 4 / 15 October:
// every string has an …Fr twin and no …Vn twin. The diagrams stay in English.
//
// THE ARC (the shape of Coffee, Carbon and Stars, 3.4 Tides and 5.2):
//   Right angles  how long is the diagonal of Mr Bowen's 5 cm square? The
//                 tools; a vote on 40° or 140°; read the protractor (say it
//                 first: start at 0 on the line); draw an angle. What happens
//                 next? Mr Bowen's frame: four 40 cm sides, one nail a corner,
//                 and it squashes into a diamond — a square needs right angles.
//                 Draw the square, one step a press; everyone measures the
//                 diagonal and the class's answers are graphed; back to the
//                 starter (about 7.1 cm).
//   Parallel      a vote on the perpendicular from a point (the shortest way);
//                 draw one; slide the set square (the same angle each time:
//                 parallel, as 5.2 said); draw a parallel line.
//   Shapes        a quadrilateral from a sketch, one step a press; check it
//                 adds up to 360°; the Workbook's drawing words; practice in
//                 them; three deadpan word problems.
//
// The goals slide (2) and the checklist (24) say the same three things — right
// angles, parallel lines, four-sided shapes — and the starter comes back on
// slide 11, the frame on slide 8.
//
// COPY-DOWN: 5 written panels — draw an angle (6), diagonal (11), the
// perpendicular from a point (13), a parallel line (16), check with 360° (18)
// — and 5 accurate drawings: the 65° angle (6), the square and its diagonal
// (9), the perpendicular (14), the parallel line (16), the quadrilateral (17).
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.
import { DIAGRAMS } from './diagrams.js'
import { ProtractorReader } from './protractor.jsx'
import { FrameStory } from './story.jsx'
import { BuildSquare, BuildQuad } from './build.jsx'
import { OurSquares } from './squares.jsx'
import { SetSquareSlide } from './parallel.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // RIGHT ANGLES — Mr Bowen's square
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter: the diagonal of a 5 cm square
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Ruler',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 5 · 5.3',
    eyebrowFr: 'Unité 5 · 5.3',
    title: 'Drawing Lines and Quadrilaterals',
    titleFr: 'Tracer des droites et des quadrilatères',
    card: {
      icon: 'Pencil',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'Mr Bowen draws a **5 cm** square. How long is its **diagonal**? **Guess** and write it down.',
      textFr: 'M. Bowen trace un carré de **5 cm**. Longueur de sa **diagonale** ? **Devine** et écris-la.',
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
    text: '**Draw** it accurately. Then **measure** and **check**.',
    textFr: '**Tracer** avec précision. Puis **mesurer** et **vérifier**.',
    columns: [
      {
        heading: 'Right angles',
        headingFr: 'Les angles droits',
        accent: TEAL,
        icon: 'Square',
        inlineSvg: DIAGRAMS.PIC_RIGHT,
        caption: 'Draw a line at exactly 90°.',
        captionFr: 'Tracer une droite à 90° pile.',
      },
      {
        heading: 'Parallel lines',
        headingFr: 'Les parallèles',
        accent: BLUE,
        icon: 'Equal',
        inlineSvg: DIAGRAMS.PIC_PARALLEL,
        caption: 'Draw two lines that never meet.',
        captionFr: 'Tracer deux droites qui ne se coupent pas.',
      },
      {
        heading: 'Four-sided shapes',
        headingFr: 'Les figures à 4 côtés',
        accent: ORANGE,
        icon: 'PenTool',
        inlineSvg: DIAGRAMS.PIC_QUAD,
        caption: 'Draw a shape from a sketch.',
        captionFr: 'Tracer une figure d’après un croquis.',
      },
    ],
  },

  // 3. The tools, photographed
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Ruler',
    eyebrow: 'Your tools',
    eyebrowFr: 'Tes outils',
    title: 'Protractor and Set Square',
    titleFr: 'Rapporteur et équerre',
    inlineSvg: DIAGRAMS.TOOLS,
    caption: 'Also: a ruler and a **sharp** pencil. Lengths to the nearest **mm**, angles to the nearest **degree**.',
    captionFr: 'Et aussi : une règle, un crayon bien **taillé**. Les longueurs au **mm** près, les angles au **degré** près.',
  },

  // 4. Vote: the protractor shows two numbers
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Two Numbers',
    titleFr: 'Deux nombres',
    text: 'The protractor shows **40** and **140**. What size is this **angle**?',
    textFr: 'Le rapporteur montre **40** et **140**. Quelle est la taille de cet **angle** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_40 },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_140 },
    ],
  },

  // 5. Say it first: read the protractor (angle 1 settles the vote)
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Gauge',
    eyebrow: 'Say it first · answer: A',
    eyebrowFr: 'Dis-le d’abord · réponse : A',
    title: 'Read the Protractor',
    titleFr: 'Lis le rapporteur',
    widget: ProtractorReader,
    caption: 'Say each angle **before** you press. Look first: is it **less** than 90°?',
    captionFr: 'Dis chaque angle **avant** de cliquer. Regarde d’abord : moins de 90° ?',
  },

  // 6. Draw an angle (write + the first drawing)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Gauge',
    eyebrow: 'Draw it · in your book',
    eyebrowFr: 'Trace-le · dans ton cahier',
    title: 'Draw an Angle',
    titleFr: 'Trace un angle',
    ratio: 45,
    inlineSvg: DIAGRAMS.ANGLE_HOW,
    content: 'Draw a line **6 cm** long. At one end, draw an angle of **65°**.',
    contentFr: 'Trace une droite de **6 cm**. À un bout, trace un angle de **65°**.',
    notes: [
      {
        tone: 'write',
        text: '**To draw an angle:** the centre on the point, 0 on the line. Count up from 0, mark, then join.',
        textFr: '**Pour tracer un angle :** le centre sur le point, le 0 sur la droite. Compte à partir de 0, marque, puis relie.',
      },
    ],
    reveal: {
      label: 'Check',
      labelFr: 'Vérifie',
      answer: 'Is it **acute**, less than 90°? Measure it again: **65°**, not 115°.',
      answerFr: 'Est-il **aigu**, moins de 90° ? Mesure-le encore : **65°**, pas 115°.',
    },
  },

  // 7. What happens next? Mr Bowen's frame (deadpan)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Square',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Frame',
    titleFr: 'Le cadre de M. Bowen',
    widget: FrameStory,
    caption: 'Before each step, **predict**: what happens next?',
    captionFr: 'Avant chaque étape, **prédis** : que se passe-t-il ensuite ?',
  },

  // 8. The frame answered: a square needs right angles; four rulers on a desk
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Square',
    eyebrow: 'The answer · try it',
    eyebrowFr: 'La réponse · essaie',
    title: 'A Square Needs Right Angles',
    titleFr: 'Un carré a des angles droits',
    ratio: 45,
    inlineSvg: DIAGRAMS.SQUARE_RHOMBUS,
    notes: [
      {
        tone: 'info',
        badge: false,
        text: 'Equal sides are **not** enough. A square has **four right angles** too.',
        textFr: 'Des côtés égaux ne **suffisent pas**. Un carré a aussi **quatre angles droits**.',
      },
      {
        tone: 'task',
        badge: 'Try it',
        badgeFr: 'Essaie',
        text: 'In pairs: make a square with four rulers on the desk. Keep the corners touching. Push one corner sideways.',
        textFr: 'À deux : fais un carré avec quatre règles sur la table. Garde les coins collés. Pousse un coin sur le côté.',
      },
    ],
    reveal: {
      label: 'What shape is it now?',
      labelFr: 'Quelle figure, maintenant ?',
      answer: 'A **rhombus**: four equal sides, but no right angles.',
      answerFr: 'Un **losange** (rhombus) : quatre côtés égaux, mais pas d’angle droit.',
    },
  },

  // 9. Draw the square, one step a press
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'PenLine',
    eyebrow: 'Draw along · say the next step',
    eyebrowFr: 'Trace avec moi · dis l’étape suivante',
    title: 'Draw a Square',
    titleFr: 'Trace un carré',
    widget: BuildSquare,
    caption: 'Draw each step in your book: **5 cm** sides, **90°** corners.',
    captionFr: 'Trace chaque étape dans ton cahier : côtés de **5 cm**, coins à **90°**.',
  },

  // 10. Everyone's diagonal, graphed
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Users',
    eyebrow: 'Our measurements',
    eyebrowFr: 'Nos mesures',
    title: 'Our Squares',
    titleFr: 'Nos carrés',
    widget: OurSquares,
    caption: 'Call out your diagonal. Are we all the **same**? Who should **check** their square?',
    captionFr: 'Dis ta diagonale. Sommes-nous tous **pareils** ? Qui doit **vérifier** son carré ?',
  },

  // 11. Back to the starter (write: diagonal)
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au début',
    title: 'The Diagonal',
    titleFr: 'La diagonale',
    text: 'How long is the **diagonal** of a 5 cm square?',
    textFr: 'Quelle est la longueur de la **diagonale** d’un carré de 5 cm ?',
    notes: [
      {
        tone: 'write',
        text: '**Diagonal:** a line from one corner to the opposite corner.',
        textFr: '**Diagonale (diagonal) :** une droite d’un coin au coin opposé.',
      },
    ],
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'About **7.1 cm**: longer than one side, shorter than two.',
      answerFr: 'Environ **7.1 cm** : plus long qu’un côté, plus court que deux.',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // PERPENDICULAR AND PARALLEL — drawing them
  // ════════════════════════════════════════════════════════════════════════

  // 12. Vote: the perpendicular from C
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'The Shortest Way',
    titleFr: 'Le chemin le plus court',
    text: 'Which line is the **perpendicular** from **C** to **AB**?',
    textFr: 'Quelle droite est la **perpendiculaire** menée de **C** à **AB** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_PERP_A },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_PERP_B },
    ],
  },

  // 13. Answer A: from a point to a line (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ArrowDown',
    eyebrow: 'Answer: A · try it',
    eyebrowFr: 'Réponse : A · essaie',
    title: 'From a Point to a Line',
    titleFr: 'D’un point à une droite',
    ratio: 45,
    inlineSvg: DIAGRAMS.PERP_POINT,
    notes: [
      {
        tone: 'write',
        text: 'The **perpendicular** from a point to a line meets the line at **90°**. It is the **shortest** way.',
        textFr: 'La **perpendiculaire** menée d’un point à une droite la coupe à **90°**. C’est le chemin le plus **court**.',
      },
      {
        tone: 'task',
        badge: 'Try it',
        badgeFr: 'Essaie',
        text: 'From your seat, point to the nearest wall the **shortest** way.',
        textFr: 'De ta place, montre le mur le plus proche par le chemin le plus **court**.',
      },
    ],
  },

  // 14. Draw the perpendicular (a drawing)
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Draw it · in your book',
    eyebrowFr: 'Trace-le · dans ton cahier',
    title: 'Draw the Perpendicular',
    titleFr: 'Trace la perpendiculaire',
    ratio: 45,
    inlineSvg: DIAGRAMS.DRAW_PERP,
    content: 'Draw **AB = 7 cm**. At B, draw **60°** and **BC = 4 cm**.\n\nDraw the perpendicular from **C** to **AB**. It meets AB at **D**. Measure **AD**.',
    contentFr: 'Trace **AB = 7 cm**. En B, trace **60°** et **BC = 4 cm**.\n\nTrace la perpendiculaire menée de **C** à **AB**. Elle coupe AB en **D**. Mesure **AD**.',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**AD = 5.0 cm** (and CD = 3.5 cm). The angle at D is **90°**.',
      answerFr: '**AD = 5.0 cm** (et CD = 3.5 cm). L’angle en D fait **90°**.',
    },
  },

  // 15. The model: slide the set square
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Move',
    eyebrow: 'A model',
    eyebrowFr: 'Un modèle',
    title: 'Slide the Set Square',
    titleFr: 'Fais glisser l’équerre',
    widget: SetSquareSlide,
    caption: 'Before each press: will the new line be **parallel**? What **angle** will it make?',
    captionFr: 'Avant chaque clic : la nouvelle droite sera-t-elle **parallèle** ? Quel **angle** fera-t-elle ?',
  },

  // 16. Draw a parallel line (write + a drawing)
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Equal',
    eyebrow: 'Draw it · the same angle',
    eyebrowFr: 'Trace-le · le même angle',
    title: 'Draw a Parallel Line',
    titleFr: 'Trace une parallèle',
    ratio: 45,
    inlineSvg: DIAGRAMS.PARALLEL_HOW,
    content: 'Draw **AB = 8 cm** and a point **P** above it. Draw a line through **P** parallel to **AB**.',
    contentFr: 'Trace **AB = 8 cm** et un point **P** au-dessus. Trace la droite passant par **P**, parallèle à **AB**.',
    notes: [
      {
        tone: 'write',
        text: 'To draw a **parallel** line, make the **same angle** with a line across.',
        textFr: 'Pour tracer une **parallèle**, fais le **même angle** avec une droite qui coupe les deux.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'This is 5.2: **corresponding angles** are equal.',
        textFr: 'C’est la leçon 5.2 : les **angles correspondants** sont égaux.',
      },
    ],
    reveal: {
      label: 'Check',
      labelFr: 'Vérifie',
      answer: 'Measure the gap at both ends. The **same**? Then the lines are parallel.',
      answerFr: 'Mesure l’écart aux deux bouts. Le **même** ? Alors les droites sont parallèles.',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // FOUR-SIDED SHAPES — from a sketch, then check
  // ════════════════════════════════════════════════════════════════════════

  // 17. A quadrilateral from a sketch, one step a press
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'PenTool',
    eyebrow: 'Draw along · from a sketch',
    eyebrowFr: 'Trace avec moi · d’après un croquis',
    title: 'Draw a Quadrilateral',
    titleFr: 'Trace un quadrilatère',
    widget: BuildQuad,
    caption: 'Draw each step in your book. Then **measure** angles C and D.',
    captionFr: 'Trace chaque étape dans ton cahier. Puis **mesure** les angles C et D.',
  },

  // 18. Check it adds up (write)
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Check it',
    eyebrowFr: 'Vérifie',
    title: 'Does It Add Up?',
    titleFr: 'Est-ce que ça fait 360° ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.CHECK_360,
    content: 'A calculation can check a measurement.',
    contentFr: 'Un calcul peut vérifier une mesure.',
    notes: [
      {
        tone: 'write',
        text: '**Check:** the angles of a quadrilateral add up to **360°**.',
        textFr: '**Vérifie :** les angles d’un quadrilatère font **360°** en tout.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'Add **your** four angles. Close to **360°**? Then your drawing is accurate.',
        textFr: 'Additionne **tes** quatre angles. Près de **360°** ? Alors ton tracé est précis.',
      },
    ],
  },

  // 19. The Workbook's drawing words
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check · the Workbook',
    eyebrowFr: 'Point d’anglais · le cahier',
    title: 'Read the Question',
    titleFr: 'Lis la question',
    inlineSvg: DIAGRAMS.PHRASES,
    caption: 'Read each question out loud. Then say what it means.',
    captionFr: 'Lis chaque question à voix haute. Puis dis ce qu’elle veut dire.',
  },

  // 20. Practice in the Workbook's words (a drawing)
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Workbook words · in your book',
    eyebrowFr: 'Mots du cahier · dans ton cahier',
    title: 'Draw, Then Measure',
    titleFr: 'Trace, puis mesure',
    ratio: 45,
    inlineSvg: DIAGRAMS.PRACTICE_WB,
    content: 'Draw the line **PQ = 7 cm**. Mark the point **R** on PQ, **4 cm** from P.\n\nDraw the line through **R** perpendicular to **PQ**. Mark **S** on it, **3 cm** from R. Measure the length **PS**.',
    contentFr: 'Trace la droite **PQ = 7 cm**. Marque le point **R** sur PQ, à **4 cm** de P.\n\nTrace la droite passant par **R**, perpendiculaire à **PQ**. Marque **S** dessus, à **3 cm** de R. Mesure **PS**.',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**PS = 5.0 cm.** Check: the angle at R is **90°**.',
      answerFr: '**PS = 5.0 cm.** Vérifie : l’angle en R fait **90°**.',
    },
  },

  // 21. Word problem: the playground (the tape measure does not matter)
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Playground',
    titleFr: 'La cour de M. Bowen',
    content:
      'Mr Bowen paints a square on the playground. Each side is **5 m**. His tape measure is **3 m** long.\n\n' +
      'How long is the diagonal?',
    contentFr:
      'M. Bowen peint un carré dans la cour. Chaque côté fait **5 m**. Son mètre ruban fait **3 m**.\n\n' +
      'Quelle est la longueur de la diagonale ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: 'About **7.1 m**: our 5 cm square, 100 times bigger. The tape measure does not change it.',
      answerFr: 'Environ **7.1 m** : notre carré de 5 cm, 100 fois plus grand. Le mètre ruban n’y change rien.',
    },
  },

  // 22. Word problem: the table corner
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Table',
    titleFr: 'La table de M. Bowen',
    ratio: 45,
    inlineSvg: DIAGRAMS.TABLE,
    content: 'Mr Bowen measures a corner of his square table: **270°**.\n\nWhat did he measure? What is the angle of the corner?',
    contentFr: 'M. Bowen mesure un coin de sa table carrée : **270°**.\n\nQu’a-t-il mesuré ? Quel est l’angle du coin ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: 'The **outside**. 360° − 270° = **90°**: a right angle.',
      answerFr: 'L’**extérieur**. 360° − 270° = **90°** : un angle droit.',
    },
  },

  // 23. Word problem: a little bit parallel
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Parallel Lines',
    titleFr: 'Les parallèles de M. Bowen',
    content:
      'Mr Bowen draws a line through P, parallel to AB. Later, the two lines **cross**.\n\n' +
      'He says they are “a little bit parallel”. Is he right?',
    contentFr:
      'M. Bowen trace une droite passant par P, parallèle à AB. Plus loin, les deux droites se **coupent**.\n\n' +
      'Il dit qu’elles sont « un peu parallèles ». A-t-il raison ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**No.** Parallel lines **never** meet. His angle at P was not the same.',
      answerFr: '**Non.** Des parallèles ne se coupent **jamais**. Son angle en P n’était pas le même.',
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
    titleFr: 'Sais-tu faire ceci ?',
    content: '> Check your notebook: **5 written panels** and **5 accurate drawings**.',
    contentFr: '> Vérifie ton cahier : **5 encadrés recopiés** et **5 tracés précis**.',
    items: [
      { text: 'Draw and measure an angle with a **protractor**.', textFr: 'Tracer et mesurer un angle au **rapporteur**.' },
      { text: 'Draw the **perpendicular** from a point to a line.', textFr: 'Tracer la **perpendiculaire** menée d’un point à une droite.' },
      { text: 'Draw a **parallel** line: the **same angle**.', textFr: 'Tracer une **parallèle** : le **même angle**.' },
      { text: 'Draw a **quadrilateral** from a sketch, then **check** it: 360°.', textFr: 'Tracer un **quadrilatère** d’après un croquis, puis le **vérifier** : 360°.' },
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
    title: 'Is It Accurate?',
    titleFr: 'Est-ce précis ?',
    subtitle: 'Mr Bowen measures the four angles of his quadrilateral: **75°**, **100°**, **95°** and **80°**. Is his drawing accurate? How do you know?',
    subtitleFr: 'M. Bowen mesure les angles de son quadrilatère : **75°**, **100°**, **95°** et **80°**. Son tracé est-il précis ? Comment le sais-tu ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**No:** 75 + 100 + 95 + 80 = **350°**, not 360°.',
      answerFr: '**Non :** 75 + 100 + 95 + 80 = **350°**, pas 360°.',
    },
  },
]

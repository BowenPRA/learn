// src/data/Y7_MATH/U05_3/notes.js
// 5.3 Drawing lines and quadrilaterals — a self-study reduction of the
// classroom deck (content/y7-math/U05_3, 25 slides, one period). English and
// French only (meta.vietnamese: false). 21 layout slides, 14 scored items:
// 5 checks and 9 activities (estimate · predict ×3 · zeroline ×3 · hotspot ·
// sort); no activity type twice in a row. Plan: docs/y7-math/plans/U05_3.md.
//
// ONE IDEA, FROM THE CLASSROOM: START AT 0 ON THE LINE. A protractor has two
// scales, so every mark has two numbers; the one to read counts up from the 0
// that sits on the line, and an estimate (acute or obtuse?) catches the other.
// The `zeroline` activity (slides 6, 13, 17) is the unit's engine on a slide.
//
// SPINE:
//   1–6    hero; Mr Bowen's square (estimate the diagonal); the tools; two
//          numbers, 40 or 140 (predict); read the protractor (stepper); draw
//          an angle (zeroline draw 35°)
//   7–10   the frame (predict); a square needs right angles; draw a square
//          (stepper); the diagonal, a class's dot plot (check: 7.6 cm)
//   11–15  the shortest way (hotspot); the perpendicular from a point; draw
//          it (zeroline draw 60° at B); slide the set square (predict);
//          draw a parallel line (check: 55°)
//   16–21  a quadrilateral from a sketch (stepper); does it add up? (zeroline
//          read: angle D); the table (check: 270°); read the question (sort);
//          the playground (check); the checklist with the exit question (check)
//
// House notes:
//  · `check` or `activity` is always the LAST key on its slide, never both.
//  · Activity strings use name/explain, so the narration never reads them, and
//    no narrated field on a scored slide states that slide's answer.
//  · No whiteboards, pairs, votes, paper, homework, date or exit hero: the only
//    drawing on paper in the unit is the last level of Zero on the Line.
//  · The diagrams stay in English, as the classroom's do.
import { DIAGRAMS } from './diagrams.js';
import { ProtractorReader, FrameStory, SetSquareSlide } from './widgets.jsx';
import { BuildSquare, BuildQuad } from './build.jsx';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const BLUE = '#1a5fa8';

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
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
    subtitle: 'Start at 0 on the line.',
    subtitleFr: 'Pars du 0 sur la droite.',
    objective: 'Read and draw angles with a protractor; draw perpendicular and parallel lines and a quadrilateral from a sketch; check a drawing with 360°.',
    objectiveFr: 'Lire et tracer des angles au rapporteur ; tracer des perpendiculaires, des parallèles et un quadrilatère d’après un croquis ; vérifier un tracé avec 360°.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeFr: 'Dans cette leçon',
      text: 'Draw **right angles**, **parallel lines** and **four-sided shapes**, then check them. **14 things are scored**.',
      textFr: 'Trace des **angles droits**, des **parallèles** et des **figures à 4 côtés**, puis vérifie-les. **14 éléments sont notés**.',
    },
  },

  // 2 ─ Starter: Mr Bowen's square (ESTIMATE; it comes back on slide 10) ────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Square',
    eyebrow: 'Starter',
    eyebrowFr: 'Pour commencer',
    title: 'Mr Bowen’s Square',
    titleFr: 'Le carré de M. Bowen',
    ratio: 45,
    inlineSvg: DIAGRAMS.STARTER_SQUARE,
    content: 'Mr Bowen draws a square with sides of **5 cm**. A **diagonal** goes from one corner to the opposite corner.',
    contentFr: 'M. Bowen trace un carré de **5 cm** de côté. Une **diagonale** va d’un coin au coin opposé.',
    activity: {
      id: 'act_diagonal_guess',
      type: 'estimate',
      prompt: 'How long is the diagonal AC? Guess before you go on.',
      promptFr: 'Quelle est la longueur de la diagonale AC ? Devine avant de continuer.',
      min: 2,
      max: 10,
      step: 0.1,
      unit: 'cm',
      answer: 7.1,
      tolerance: 0.12,
      explain: '**About 7.1 cm.** Longer than one side (5 cm), because it goes across the square from corner to corner. Shorter than two sides (10 cm), because the straight way is the shortest. A whole class measures it on slide 10.',
      explainFr: '**Environ 7.1 cm.** Plus long qu’un côté (5 cm), parce qu’elle traverse le carré d’un coin à l’autre. Plus court que deux côtés (10 cm), parce que le chemin droit est le plus court. Une classe entière la mesure sur la diapo 10.',
    },
  },

  // 3 ─ The tools, photographed ─────────────────────────────────────────────
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
    captionFr: 'Et aussi : une règle, un crayon bien **taillé**. Les longueurs au **mm** près, les angles au **degré** près.',
  },

  // 4 ─ Two numbers (the classroom's vote → PREDICT) ─────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Decide first',
    eyebrowFr: 'Décide d’abord',
    title: 'Two Numbers',
    titleFr: 'Deux nombres',
    ratio: 45,
    inlineSvg: DIAGRAMS.TWO_NUMBERS,
    content: 'The arm crosses the protractor at **40** and at **140**. Both numbers are printed at that mark.',
    contentFr: 'Le côté traverse le rapporteur à **40** et à **140**. Les deux nombres sont écrits à cette marque.',
    activity: {
      id: 'act_two_numbers',
      type: 'predict',
      prompt: 'What size is this angle?',
      promptFr: 'Quelle est la taille de cet angle ?',
      options: [
        { val: '40', name: '40°', nameFr: '40°' },
        { val: '140', name: '140°', nameFr: '140°' },
        { val: 'either', name: 'Either: both numbers are on the protractor.', nameFr: 'Les deux : les deux nombres sont sur le rapporteur.' },
      ],
      correct: '40',
      explain: '**40°.** The first arm sits on the **0 on the right**, so count up the scale that starts there: 10, 20, 30, 40. The 140 belongs to the other scale, which starts at 180 on this arm. Check: the angle is smaller than a right angle, so it is **acute** — 40, not 140. Only one number is the angle.',
      explainFr: '**40°.** Le premier côté est sur le **0 de droite**, donc compte sur l’échelle qui part de là : 10, 20, 30, 40. Le 140 appartient à l’autre échelle, qui part de 180 sur ce côté. Vérifie : l’angle est plus petit qu’un angle droit, il est donc **aigu** — 40, pas 140. Un seul nombre est l’angle.',
    },
  },

  // 5 ─ Read the protractor (the say-it-first stepper) ───────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Gauge',
    eyebrow: 'Say it first',
    eyebrowFr: 'Dis-le d’abord',
    title: 'Read the Protractor',
    titleFr: 'Lis le rapporteur',
    widget: ProtractorReader,
    caption: 'Say each angle **before** you press Show. Look first: is it **less** than 90°?',
    captionFr: 'Dis chaque angle **avant** de cliquer sur Montrer. Regarde d’abord : moins de 90° ?',
  },

  // 6 ─ Draw an angle (ZEROLINE draw: 35° at A) ──────────────────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Gauge',
    eyebrow: 'Draw it',
    eyebrowFr: 'Trace-le',
    title: 'Draw an Angle',
    titleFr: 'Trace un angle',
    ratio: 45,
    inlineSvg: DIAGRAMS.ANGLE_HOW,
    content: 'The drawing shows how to make **65°** at a point on a line.',
    contentFr: 'Le dessin montre comment faire **65°** en un point d’une droite.',
    notes: [
      {
        tone: 'write',
        text: '**To draw an angle:** the centre on the point, 0 on the line. Count up from 0, mark, then join.',
        textFr: '**Pour tracer un angle :** le centre sur le point, le 0 sur la droite. Compte à partir de 0, marque, puis relie.',
      },
    ],
    activity: {
      id: 'act_draw_35',
      type: 'zeroline',
      kind: 'draw',
      angle: 35,
      zero: 'right',
      prompt: 'Now you: draw **35°** at A. Tap the 0 on the line, then tap the scale at 35.',
      promptFr: 'À toi : trace **35°** en A. Touche le 0 sur la droite, puis touche l’échelle à 35.',
      explain: '35° counted up from the **0 on the right**, the scale that starts on AB. On the other scale the same mark reads 145: an angle that big would be **obtuse**, and 35° is **acute**.',
      explainFr: '35° comptés à partir du **0 de droite**, l’échelle qui part sur AB. Sur l’autre échelle, la même marque indique 145 : un angle aussi grand serait **obtus**, et 35° est **aigu**.',
    },
  },

  // 7 ─ What happens next? Mr Bowen's frame (PREDICT) ───────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Square',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Frame',
    titleFr: 'Le cadre de M. Bowen',
    widget: FrameStory,
    caption: 'Press for each panel. Then decide: what happens when he picks it up?',
    captionFr: 'Clique pour chaque case. Puis décide : que se passe-t-il quand il le soulève ?',
    activity: {
      id: 'act_frame',
      type: 'predict',
      prompt: 'He picks the frame up by one corner. What happens?',
      promptFr: 'Il soulève le cadre par un coin. Que se passe-t-il ?',
      options: [
        { val: 'stays', name: 'It stays a square.', nameFr: 'Il reste carré.' },
        { val: 'squash', name: 'It squashes into a diamond shape.', nameFr: 'Il s’écrase en forme de losange.' },
        { val: 'shorter', name: 'The sides get shorter.', nameFr: 'Les côtés raccourcissent.' },
      ],
      correct: 'squash',
      explain: 'It **squashes**. One nail at each corner lets the corner turn, so the angles change, to about 60° and 120°. The sticks are still 40 cm — sides do not shrink. Four equal sides with no right angles make a **rhombus**, not a square.',
      explainFr: 'Il **s’écrase**. Un seul clou par coin laisse le coin tourner, donc les angles changent, vers 60° et 120°. Les baguettes font toujours 40 cm — les côtés ne rétrécissent pas. Quatre côtés égaux sans angle droit font un **losange**, pas un carré.',
    },
  },

  // 8 ─ The frame answered: a square needs right angles ────────────────────
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
        text: 'Make a square with four pencils on the table. Keep the corners touching. Push one corner sideways.',
        textFr: 'Fais un carré avec quatre crayons sur la table. Garde les coins collés. Pousse un coin sur le côté.',
      },
    ],
    reveal: {
      label: 'What shape is it now?',
      labelFr: 'Quelle figure, maintenant ?',
      answer: 'A **rhombus**: four equal sides, but no right angles.',
      answerFr: 'Un **losange** (rhombus) : quatre côtés égaux, mais pas d’angle droit.',
    },
  },

  // 9 ─ Draw a square, one step a press ──────────────────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'PenLine',
    eyebrow: 'Say the next step',
    eyebrowFr: 'Dis l’étape suivante',
    title: 'Draw a Square',
    titleFr: 'Trace un carré',
    widget: BuildSquare,
    caption: 'Before each press, say the next step: **5 cm** sides, **90°** corners.',
    captionFr: 'Avant chaque clic, dis l’étape suivante : côtés de **5 cm**, coins à **90°**.',
  },

  // 10 ─ The diagonal: a class's measurements (CHECK) ────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Users',
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au début',
    title: 'The Diagonal',
    titleFr: 'La diagonale',
    ratio: 45,
    inlineSvg: DIAGRAMS.CLASS_DIAGONALS,
    content: 'Mr Bowen’s class all drew a 5 cm square and measured its diagonal. Most dots sit together, at about **7.1 cm**: longer than one side, shorter than two.',
    contentFr: 'Toute la classe de M. Bowen a tracé un carré de 5 cm et mesuré sa diagonale. La plupart des points sont groupés, vers **7.1 cm** : plus long qu’un côté, plus court que deux.',
    notes: [
      {
        tone: 'write',
        text: '**Diagonal:** a line from one corner to the opposite corner.',
        textFr: '**Diagonale (diagonal) :** une droite d’un coin au coin opposé.',
      },
    ],
    check: {
      id: 'chk_bao',
      q: 'Bao’s sides are all exactly 5.0 cm, but his diagonal AC measures 7.6 cm. What went wrong?',
      qFr: 'Les côtés de Bao font tous exactement 5.0 cm, mais sa diagonale AC mesure 7.6 cm. Qu’est-ce qui ne va pas ?',
      options: [
        { val: 'A', text: 'Nothing: 7.6 cm is close enough to 7.1 cm.', textFr: 'Rien : 7.6 cm est assez proche de 7.1 cm.' },
        { val: 'B', text: 'One of his corners is not 90°.', textFr: 'Un de ses coins ne fait pas 90°.' },
        { val: 'C', text: 'He measured a side, not the diagonal.', textFr: 'Il a mesuré un côté, pas la diagonale.' },
      ],
      correct: 'B',
      expEn: 'His sides are right, so the trouble is a **corner**. Push a square out of shape, like the frame, and one diagonal grows longer while the other gets shorter. 7.6 cm is 5 mm out, and we measure to the nearest mm, so it is not accurate. A side would measure 5.0 cm, not 7.6.',
      expFr: 'Ses côtés sont justes, donc le problème vient d’un **coin**. Déforme un carré, comme le cadre, et une diagonale s’allonge pendant que l’autre raccourcit. 7.6 cm, c’est 5 mm d’écart, et on mesure au mm près : ce n’est pas précis. Un côté mesurerait 5.0 cm, pas 7.6.',
    },
  },

  // 11 ─ The shortest way (the classroom's second vote → HOTSPOT) ────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Crosshair',
    eyebrow: 'Decide first',
    eyebrowFr: 'Décide d’abord',
    title: 'The Shortest Way',
    titleFr: 'Le chemin le plus court',
    text: 'A **perpendicular** line meets another line at **90°**. You met it in 5.2. Now draw one from a point.',
    textFr: 'Une droite **perpendiculaire** en coupe une autre à **90°**. Tu l’as vue en 5.2. Maintenant, trace-la depuis un point.',
    activity: {
      id: 'act_perp_foot',
      type: 'hotspot',
      prompt: 'The perpendicular from C meets AB. Tap where.',
      promptFr: 'La perpendiculaire menée de C coupe AB. Touche l’endroit.',
      svg: DIAGRAMS.PERP_ASK,
      viewBox: '0 0 840 560',
      targets: [
        { id: 'foot', x: 590, y: 420, r: 44, name: 'Straight below C', nameFr: 'Juste en dessous de C' },
        { id: 'middle', x: 430, y: 420, r: 40, name: 'The middle of AB', nameFr: 'Le milieu de AB' },
        { id: 'a', x: 90, y: 420, r: 36, name: 'The point A', nameFr: 'Le point A' },
        { id: 'b', x: 770, y: 420, r: 36, name: 'The point B', nameFr: 'Le point B' },
      ],
      correct: 'foot',
      explain: '**Straight below C**, where a line from C meets AB at 90°. Not the middle: C is not above the middle, so a line from C to the middle leans. The perpendicular is also the **shortest** way from C to AB.',
      explainFr: '**Juste en dessous de C**, là où une droite partant de C coupe AB à 90°. Pas le milieu : C n’est pas au-dessus du milieu, donc une droite de C au milieu penche. La perpendiculaire est aussi le chemin le plus **court** de C à AB.',
    },
  },

  // 12 ─ From a point to a line ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'TriangleRight',
    eyebrow: 'The rule · try it',
    eyebrowFr: 'La règle · essaie',
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
        text: 'From where you sit, point to the nearest wall the **shortest** way.',
        textFr: 'De ta place, montre le mur le plus proche par le chemin le plus **court**.',
      },
    ],
  },

  // 13 ─ Draw the perpendicular: first, 60° at B (ZEROLINE draw, the left 0) ──
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Draw it',
    eyebrowFr: 'Trace-le',
    title: 'Draw the Perpendicular',
    titleFr: 'Trace la perpendiculaire',
    ratio: 45,
    inlineSvg: DIAGRAMS.DRAW_PERP,
    content: 'A Workbook question: **AB = 7 cm**. At B, draw **60°** and **BC = 4 cm**. Then draw the perpendicular from **C** to **AB**.',
    contentFr: 'Une question du cahier : **AB = 7 cm**. En B, trace **60°** et **BC = 4 cm**. Puis trace la perpendiculaire menée de **C** à **AB**.',
    activity: {
      id: 'act_draw_60_at_b',
      type: 'zeroline',
      kind: 'draw',
      angle: 60,
      zero: 'left',
      prompt: 'First step: at B, draw **60°**. BA runs **left** from B. Which 0 sits on it?',
      promptFr: 'Première étape : en B, trace **60°**. BA part vers la **gauche** depuis B. Quel 0 est dessus ?',
      explain: 'BA runs left, so count from the **0 on the left**, up the inside scale, to 60. The outside scale reads 120 at that mark: counting there draws an **obtuse** angle on the wrong side of the arm.',
      explainFr: 'BA part vers la gauche, donc compte à partir du **0 de gauche**, sur l’échelle intérieure, jusqu’à 60. L’échelle extérieure indique 120 à cette marque : compter là trace un angle **obtus**, du mauvais côté.',
    },
  },

  // 14 ─ The model: slide the set square (PREDICT before Turn) ──────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Move',
    eyebrow: 'A model',
    eyebrowFr: 'Un modèle',
    title: 'Slide the Set Square',
    titleFr: 'Fais glisser l’équerre',
    widget: SetSquareSlide,
    caption: 'Draw three lines first: Draw, then slide. Decide **before** you press Turn.',
    captionFr: 'Trace d’abord trois droites : Trace, puis glisse. Décide **avant** de cliquer sur Tourne.',
    activity: {
      id: 'act_set_square_turn',
      type: 'predict',
      prompt: 'He turns the set square a little, so one corner lifts off the ruler, and draws again. Is the new line parallel to the others?',
      promptFr: 'Il tourne un peu l’équerre, un coin se soulève de la règle, et il trace encore. La nouvelle droite est-elle parallèle aux autres ?',
      options: [
        { val: 'edge', name: 'Yes: it is still drawn along a straight edge.', nameFr: 'Oui : elle est toujours tracée le long d’un bord droit.' },
        { val: 'angle', name: 'No: it meets the ruler at a different angle.', nameFr: 'Non : elle coupe la règle avec un autre angle.' },
        { val: 'touch', name: 'Yes: the set square still touches the ruler.', nameFr: 'Oui : l’équerre touche toujours la règle.' },
      ],
      correct: 'angle',
      explain: '**No.** Parallel lines all make the **same angle** with the line across — here the ruler, 60° each time. Turned, the set square draws at 70°, so that line is not parallel: it would cross the others. A straight edge always draws a straight line, parallel or not.',
      explainFr: '**Non.** Des parallèles font toutes le **même angle** avec la droite qui les coupe — ici la règle, 60° à chaque fois. Tournée, l’équerre trace à 70°, donc cette droite n’est pas parallèle : elle couperait les autres. Un bord droit trace toujours une droite, parallèle ou pas.',
    },
  },

  // 15 ─ Draw a parallel line: the same angle (CHECK) ───────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Equal',
    eyebrow: 'The same angle',
    eyebrowFr: 'Le même angle',
    title: 'Draw a Parallel Line',
    titleFr: 'Trace une parallèle',
    ratio: 56,
    inlineSvg: DIAGRAMS.PARALLEL_HOW,
    content: 'No set square? A protractor does it: draw a line through **P** that crosses **AB**, then copy its angle at P.',
    contentFr: 'Pas d’équerre ? Le rapporteur suffit : trace une droite passant par **P** qui coupe **AB**, puis recopie son angle en P.',
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
        textFr: 'C’est la leçon 5.2 : les **angles correspondants** sont égaux.',
      },
    ],
    check: {
      id: 'chk_parallel_angle',
      q: 'Mr Bowen’s line across makes **55°** with AB. What angle must he draw at P, in the same place, for a parallel line?',
      qFr: 'La droite de M. Bowen fait **55°** avec AB. Quel angle doit-il tracer en P, à la même place, pour une parallèle ?',
      options: [
        { val: 'A', text: '125°', textFr: '125°' },
        { val: 'B', text: '35°', textFr: '35°' },
        { val: 'C', text: '55°', textFr: '55°' },
      ],
      correct: 'C',
      expEn: '**55°**: the same angle, in the same place, so the lines are parallel (corresponding angles). 125° is 180° − 55°, the other scale: drawn at P, that line would lean the other way and cross AB. 35° is 90° − 55°, but there is no right angle here.',
      expFr: '**55°** : le même angle, à la même place, donc les droites sont parallèles (angles correspondants). 125°, c’est 180° − 55°, l’autre échelle : tracée en P, cette droite pencherait de l’autre côté et couperait AB. 35°, c’est 90° − 55°, mais il n’y a pas d’angle droit ici.',
    },
  },

  // 16 ─ A quadrilateral from a sketch, one step a press ─────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'PenTool',
    eyebrow: 'From a sketch',
    eyebrowFr: 'D’après un croquis',
    title: 'Draw a Quadrilateral',
    titleFr: 'Trace un quadrilatère',
    widget: BuildQuad,
    caption: 'Say each step before you press. At B the angle is measured from **BA**.',
    captionFr: 'Dis chaque étape avant de cliquer. En B, l’angle se mesure à partir de **BA**.',
  },

  // 17 ─ Does it add up? (ZEROLINE read: angle D of a new quadrilateral) ─────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Check it',
    eyebrowFr: 'Vérifie',
    title: 'Does It Add Up?',
    titleFr: 'Est-ce que ça fait 360° ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.CHECK_360,
    content: 'A calculation can check a measurement.',
    contentFr: 'Un calcul peut vérifier une mesure.',
    notes: [
      {
        tone: 'write',
        text: '**Check:** the angles of a quadrilateral add up to **360°**.',
        textFr: '**Vérifie :** les angles d’un quadrilatère font **360°** en tout.',
      },
    ],
    activity: {
      id: 'act_read_d',
      type: 'zeroline',
      kind: 'shape',
      AB: 6, A: 70, AD: 4, B: 100, D: 115, at: 'D', given: ['A', 'B', 'C'],
      prompt: 'A new quadrilateral: A = 70°, B = 100°, C = 75°. Estimate, then measure angle **D**.',
      promptFr: 'Un nouveau quadrilatère : A = 70°, B = 100°, C = 75°. Estime, puis mesure l’angle **D**.',
      explain: '**115°**, an obtuse angle. Check: 70° + 100° + 75° + 115° = 360°. If you read 65°, that came from the other scale.',
      explainFr: '**115°**, un angle obtus. Vérifie : 70° + 100° + 75° + 115° = 360°. Si tu as lu 65°, ça venait de l’autre échelle.',
    },
  },

  // 18 ─ Word problem: the table corner (CHECK) ──────────────────────────────
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
    content: 'Mr Bowen measures a corner of his square table: **270°**.',
    contentFr: 'M. Bowen mesure un coin de sa table carrée : **270°**.',
    check: {
      id: 'chk_table',
      q: 'What did he measure, and what is the angle of the corner?',
      qFr: 'Qu’a-t-il mesuré, et quel est l’angle du coin ?',
      options: [
        { val: 'A', text: 'The outside of the corner: 360° − 270° = 90°.', textFr: 'L’extérieur du coin : 360° − 270° = 90°.' },
        { val: 'B', text: 'The other scale: 270° − 180° = 90°.', textFr: 'L’autre échelle : 270° − 180° = 90°.' },
        { val: 'C', text: 'The inside: his table is not square.', textFr: 'L’intérieur : sa table n’est pas carrée.' },
      ],
      correct: 'A',
      expEn: 'He measured the **outside**, the reflex angle round the corner. The angles round a point make 360°, so the corner is 360° − 270° = **90°**, a right angle. A protractor scale stops at 180°, so 270° is not a reading on either scale. The table is square: its corner is 90°.',
      expFr: 'Il a mesuré l’**extérieur**, l’angle rentrant autour du coin. Les angles autour d’un point font 360°, donc le coin fait 360° − 270° = **90°**, un angle droit. Une échelle du rapporteur s’arrête à 180°, donc 270° n’est une lecture sur aucune échelle. La table est carrée : son coin fait 90°.',
    },
  },

  // 19 ─ The Workbook's drawing words (SORT) ─────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check · the Workbook',
    eyebrowFr: 'Point d’anglais · le cahier',
    title: 'Read the Question',
    titleFr: 'Lis la question',
    ratio: 45,
    inlineSvg: DIAGRAMS.PHRASES_Q,
    content: 'The Workbook writes its drawing questions in these words. Read each one out loud.',
    contentFr: 'Le cahier écrit ses questions de tracé avec ces mots. Lis chacun à voix haute.',
    activity: {
      id: 'act_workbook_words',
      type: 'sort',
      prompt: 'What does each instruction tell you to do? Sort the four.',
      promptFr: 'Que te demande chaque consigne ? Trie les quatre.',
      bins: [
        { id: 'through', name: 'through B', nameFr: '« through B » (passant par B)' },
        { id: 'from', name: 'from C to AB', nameFr: '« from C to AB » (de C à AB)' },
        { id: 'mark', name: 'Mark the point D', nameFr: '« Mark the point D » (marque D)' },
        { id: 'length', name: 'the length of AD', nameFr: '« the length of AD » (la longueur AD)' },
      ],
      cards: [
        { id: 'c_through', name: 'The line passes B, at 90° to AB.', nameFr: 'La droite passe par B, à 90° de AB.', bin: 'through' },
        { id: 'c_from', name: 'Start at C and stop on AB, at 90°.', nameFr: 'Pars de C et arrête-toi sur AB, à 90°.', bin: 'from' },
        { id: 'c_mark', name: 'Make a small cross and write D.', nameFr: 'Fais une petite croix et écris D.', bin: 'mark' },
        { id: 'c_length', name: 'Use a ruler, to the nearest mm.', nameFr: 'Prends la règle, au mm près.', bin: 'length' },
      ],
      explain: '**Through** B: the line goes through B and can carry on past it. **From C to AB**: it starts at C and stops where it meets AB. **Mark** means a small cross with its letter. **The length** is a ruler measurement, to the nearest mm.',
      explainFr: '**Through** B (passant par B) : la droite passe par B et peut continuer après. **From C to AB** (de C à AB) : elle part de C et s’arrête sur AB. **Mark** (marque) : une petite croix avec sa lettre. **The length** (la longueur) : une mesure à la règle, au mm près.',
    },
  },

  // 20 ─ Word problem: the playground (CHECK) ────────────────────────────────
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Playground',
    titleFr: 'La cour de M. Bowen',
    content: 'Mr Bowen paints a square on the playground. Each side is **5 m**. His tape measure is **3 m** long.',
    contentFr: 'M. Bowen peint un carré dans la cour. Chaque côté fait **5 m**. Son mètre ruban fait **3 m**.',
    check: {
      id: 'chk_playground',
      q: 'How long is the diagonal of his square?',
      qFr: 'Quelle est la longueur de la diagonale de son carré ?',
      options: [
        { val: 'A', text: '10 m: two sides of 5 m.', textFr: '10 m : deux côtés de 5 m.' },
        { val: 'B', text: 'About 7.1 m.', textFr: 'Environ 7.1 m.' },
        { val: 'C', text: '3 m: his tape measure.', textFr: '3 m : son mètre ruban.' },
      ],
      correct: 'B',
      expEn: '**About 7.1 m.** It is the 5 cm square from slide 10, 100 times bigger, so 7.1 cm becomes 7.1 m. A diagonal is shorter than two sides, so not 10 m. The tape measure is only how he measures: it does not change the square.',
      expFr: '**Environ 7.1 m.** C’est le carré de 5 cm de la diapo 10, 100 fois plus grand, donc 7.1 cm devient 7.1 m. Une diagonale est plus courte que deux côtés, donc pas 10 m. Le mètre ruban sert seulement à mesurer : il ne change pas le carré.',
    },
  },

  // 21 ─ Checklist, with the classroom's exit question (CHECK) ──────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you finish',
    eyebrowFr: 'Avant de finir',
    title: 'Can You Do These?',
    titleFr: 'Sais-tu faire ceci ?',
    items: [
      { text: 'Draw and measure an angle with a **protractor**.', textFr: 'Tracer et mesurer un angle au **rapporteur**.' },
      { text: 'Draw the **perpendicular** from a point to a line.', textFr: 'Tracer la **perpendiculaire** menée d’un point à une droite.' },
      { text: 'Draw a **parallel** line: the **same angle**.', textFr: 'Tracer une **parallèle** : le **même angle**.' },
      { text: 'Draw a **quadrilateral** from a sketch, then **check** it: 360°.', textFr: 'Tracer un **quadrilatère** d’après un croquis, puis le **vérifier** : 360°.' },
    ],
    check: {
      id: 'chk_exit_350',
      q: 'Mr Bowen measures the four angles of his quadrilateral: 75°, 100°, 95° and 80°. Is his drawing accurate?',
      qFr: 'M. Bowen mesure les quatre angles de son quadrilatère : 75°, 100°, 95° et 80°. Son tracé est-il précis ?',
      options: [
        { val: 'A', text: 'No: they add up to 350°, not 360°.', textFr: 'Non : ils font 350° en tout, pas 360°.' },
        { val: 'B', text: 'Yes: every angle is a whole number.', textFr: 'Oui : chaque angle est un nombre entier.' },
        { val: 'C', text: 'Yes: 350° is close to 360°.', textFr: 'Oui : 350° est proche de 360°.' },
      ],
      correct: 'A',
      expEn: '75 + 100 + 95 + 80 = **350°**. A quadrilateral’s angles add up to **360°**, so at least one angle is 10° out. Within a degree or two would be accurate; 10° is not. Whole numbers say nothing about accuracy.',
      expFr: '75 + 100 + 95 + 80 = **350°**. Les angles d’un quadrilatère font **360°** en tout, donc au moins un angle a 10° d’écart. À un ou deux degrés près, ce serait précis ; 10°, non. Des nombres entiers ne disent rien de la précision.',
    },
  },
];

// Year 7 Maths · 5.3 Drawing lines and quadrilaterals · Workbook-style practice,
// played by the step engine (unit/src/stepPractice).
//
// Fresh problems in the question types of the Workbook's Exercise 5.3: a perpendicular
// through a point on a line, a square and its diagonal, a parallelogram and its
// diagonal, the perpendicular from a point to a line, a parallel line through a point,
// and a quadrilateral drawn from its measurements, with the check that its angles add
// up to 360°. New shapes, letters and numbers; nothing copied from the book.
//
// In the Workbook the student draws on paper and then measures. Here the accurate
// drawing is on the screen (figures.js works every drawing out from its numbers) with
// a ruler laid on the line to measure, so the measuring is real: the student reads the
// ruler. Each length in the answers is worked out from the same numbers as the drawing.
//
// ENGLISH AND FRENCH ONLY: every string the student reads has an …Fr twin.
// Levels: focus f1, f2 and p3 (every step), practice p1, p2, p4, p5 (the key steps first).
// Check: checkStepPractice(workbook, { fr: true }) from unit/src/stepPractice/check.js.
import { dist, drawing, meet, polar } from './figures.js'

const opt = (id, text, textFr) => ({ id, text, textFr })
const cm = (n) => (Math.round(n * 10) / 10).toFixed(1)
const ruler = (answer) => ({ type: 'number', after: 'cm', answer, tol: 0.1 })
const READ = 'Find the end of the line on the ruler. Each small mark is 1 mm, which is 0.1 cm.'
const READ_FR = 'Trouve le bout du segment sur la règle. Chaque petit trait vaut 1 mm, soit 0.1 cm.'

/* f1: a line ABC, the perpendicular through B, D on it. Measure DC. (3, 4.5 and 6 cm give exactly 7.5.) */
const F1 = { A: [0, 0], B: [3, 0], C: [9, 0], D: [3, 4.5] }
const F1_SVG = drawing({
  pts: F1, solid: [['A', 'C'], ['B', 'D']], dashed: [['D', 'C']],
  names: { A: 'sw', B: 's', C: 's', D: 'w' },
  lens: [['A', 'B', '3 cm', -1], ['B', 'C', '6 cm', -1], ['B', 'D', '4.5 cm', 1]],
  rights: [['B', 0]], ruler: ['D', 'C'],
  alt: 'A straight line A B C. A line goes up from B at a right angle to a point D. A ruler lies along D C.',
})

/* f2: a square of side 4.4 cm. Measure the diagonal AC. */
const F2 = { A: [0, 0], B: [4.4, 0], C: [4.4, 4.4], D: [0, 4.4] }
const F2_SVG = drawing({
  pts: F2, solid: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']], dashed: [['A', 'C']],
  names: { A: 'sw', B: 'se', C: 'ne', D: 'nw' }, lens: [['A', 'B', '4.4 cm', -1]],
  rights: [['A', 0], ['B', 90], ['C', 180], ['D', 270]], ruler: ['A', 'C'],
  alt: 'A square A B C D with sides of 4.4 cm. A ruler lies along the diagonal A C.',
})

/* p1: a parallelogram, AB = 7 cm, AD = 4 cm, angle A = 65°. Measure the diagonal DB. */
const P1 = { A: [0, 0], B: [7, 0], D: polar([0, 0], 4, 65) }
P1.C = [P1.D[0] + 7, P1.D[1]]
const P1_SVG = drawing({
  pts: P1, solid: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']], dashed: [['D', 'B']],
  names: { A: 'sw', B: 'se', C: 'ne', D: 'nw' },
  lens: [['A', 'B', '7 cm', -1], ['A', 'D', '4 cm', 1]], arcs: [['A', 0, 65, '65°']], ruler: ['D', 'B'],
  alt: 'A parallelogram A B C D. A B is 7 cm, A D is 4 cm and angle A is 65 degrees. A ruler lies along the diagonal D B.',
})

/* p2: the perpendicular from C to AB meets AB at D. Measure AD. */
const P2 = { A: [0, 0], B: [8, 0], C: [3.4, 3], D: [3.4, 0] }
const P2_SVG = drawing({
  pts: P2, solid: [['A', 'B']], dashed: [['C', 'D']],
  names: { A: 'sw', B: 'se', C: 'n', D: 'ne' }, lens: [['C', 'D', '3 cm', -1]],
  rights: [['D', 90]], ruler: ['A', 'D'],
  alt: 'A line A B with a point C above it. A dashed line goes straight down from C to meet A B at D, at a right angle. A ruler lies along A B from A.',
})

/* p3: triangle PQR, angle P = 50°, angle Q = 62°. A line through Q parallel to PR. */
const P3 = { P: [0, 0], Q: [7, 0], T: [9.4, 0] }
P3.R = meet(P3.P, 50, P3.Q, 118)
P3.S = polar(P3.Q, 3.6, 50)
const P3_SVG = drawing({
  pts: P3, solid: [['P', 'Q'], ['Q', 'R'], ['R', 'P'], ['Q', 'T']], dashed: [['Q', 'S']],
  names: { P: 'sw', Q: 's', R: 'n', S: 'ne', T: 'se' },
  lens: [['P', 'Q', '7 cm', -1]], arcs: [['P', 0, 50, '50°'], ['Q', 118, 180, '62°'], ['Q', 0, 50, '?']],
  alt: 'A triangle P Q R. Angle P is 50 degrees and angle Q is 62 degrees. The side P Q carries on to T. A dashed line from Q to S is parallel to P R.',
})

/* p4: a quadrilateral with right angles at A and C, and 110° at B. Angle D, then the side DC. */
const P4 = { A: [0, 0], B: [6, 0] }
P4.C = polar(P4.B, 4, 70)
P4.D = meet(P4.A, 90, P4.C, 160)
const P4_SVG = drawing({
  pts: P4, solid: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']],
  names: { A: 'sw', B: 'se', C: 'e', D: 'nw' },
  lens: [['A', 'B', '6 cm', -1], ['B', 'C', '4 cm', -1]],
  rights: [['A', 0], ['C', 160]], arcs: [['B', 70, 180, '110°'], ['D', 270, 340, '?']], ruler: ['D', 'C'],
  alt: 'A quadrilateral A B C D. The angles at A and C are right angles and the angle at B is 110 degrees. A B is 6 cm and B C is 4 cm. A ruler lies along D C.',
})

/* p5: an arrowhead. AB = AD = 8 cm, angle A = 44°, angles B and D = 28°. The angle at C inside the shape, then AC. */
const P5 = { A: [0, 0], B: polar([0, 0], 8, 22), D: polar([0, 0], 8, -22) }
P5.C = meet(P5.A, 0, P5.B, 22 + 180 + 28)
const P5_SVG = drawing({
  pts: P5, solid: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']], dashed: [['A', 'C']],
  names: { A: 'w', B: 'ne', C: 'e', D: 'se' },
  lens: [['A', 'B', '8 cm', 1], ['A', 'D', '8 cm', -1]],
  arcs: [['A', -22, 22, '44°'], ['B', 202, 230, '28°'], ['D', 130, 158, '28°']], ruler: ['A', 'C'],
  alt: 'A quadrilateral A B C D shaped like an arrowhead: the corner C points in towards A. Angle A is 44 degrees, angles B and D are 28 degrees, and A B and A D are 8 cm. A ruler lies along A C.',
})

const LEN = {
  f1: cm(dist(F1.D, F1.C)), f2: cm(dist(F2.A, F2.C)), p1: cm(dist(P1.D, P1.B)),
  p2: cm(dist(P2.A, P2.D)), p4: cm(dist(P4.D, P4.C)), p5: cm(dist(P5.A, P5.C)),
}

const focus = [
  {
    id: 'f1', level: 'focus', inlineSvg: F1_SVG,
    prompt: 'ABC is a straight line. The line through B is {{perpendicular}} to AC, and D is {{4.5 cm}} from B. [[Measure DC.]]',
    promptFr: 'ABC est une droite. La droite passant par B est {{perpendiculaire}} à AC, et D est à {{4.5 cm}} de B. [[Mesure DC.]]',
    steps: [
      {
        title: 'What size is the angle at B?', titleFr: 'Combien mesure l’angle en B ?',
        input: { type: 'number', after: '°', answer: '90' },
        line: 'Perpendicular lines meet at @°.', lineFr: 'Des droites perpendiculaires se coupent à @°.',
        hint: 'Perpendicular means at a right angle.', hintFr: 'Perpendiculaire veut dire à angle droit.',
        slips: [{ value: '180', key: 'straight', msg: '180° is a straight line. Perpendicular lines make a right angle.', msgFr: '180°, c’est un angle plat. Des droites perpendiculaires font un angle droit.' }],
      },
      {
        title: 'How long is DC?', titleFr: 'Combien mesure DC ?',
        sub: 'The ruler’s 0 is at D.', subFr: 'Le 0 de la règle est en D.',
        input: ruler(LEN.f1),
        line: 'DC = @ cm, to the nearest millimetre.', lineFr: 'DC = @ cm, au millimètre près.',
        hint: READ, hintFr: READ_FR,
        slips: [
          { value: '6', key: 'read-bc', msg: '6 cm is BC. Read the ruler along DC.', msgFr: '6 cm, c’est BC. Lis la règle le long de DC.' },
          { value: '4.5', key: 'read-bd', msg: '4.5 cm is BD. Read the ruler along DC.', msgFr: '4.5 cm, c’est BD. Lis la règle le long de DC.' },
        ],
      },
    ],
  },
  {
    id: 'f2', level: 'focus', inlineSvg: F2_SVG,
    prompt: 'ABCD is a {{square}} with sides of {{4.4 cm}}. [[Measure the diagonal AC.]]',
    promptFr: 'ABCD est un {{carré}} de {{4.4 cm}} de côté. [[Mesure la diagonale AC.]]',
    steps: [
      {
        title: 'What angle do you draw at A?', titleFr: 'Quel angle traces-tu en A ?',
        sub: 'To draw the square. The same at B.', subFr: 'Pour tracer le carré. Le même en B.',
        input: { type: 'number', after: '°', answer: '90' },
        line: 'A square has four angles of @°.', lineFr: 'Un carré a quatre angles de @°.',
        hint: 'Four equal sides are not enough. A square also needs four right angles.', hintFr: 'Quatre côtés égaux ne suffisent pas. Un carré a aussi quatre angles droits.',
      },
      {
        title: 'How long is AC?', titleFr: 'Combien mesure AC ?',
        sub: 'The ruler’s 0 is at A.', subFr: 'Le 0 de la règle est en A.',
        input: ruler(LEN.f2),
        line: 'AC = @ cm.', lineFr: 'AC = @ cm.',
        hint: READ, hintFr: READ_FR,
        slips: [{ value: '4.4', key: 'read-side', msg: '4.4 cm is a side. The diagonal goes from corner A to the opposite corner C.', msgFr: '4.4 cm, c’est un côté. La diagonale va du coin A au coin opposé C.' }],
      },
      {
        title: 'Is his drawing accurate?', titleFr: 'Son tracé est-il précis ?',
        sub: 'On Mr Bowen’s drawing of this square, AC = 6.2 cm and BD = 5.7 cm.',
        subFr: 'Sur le tracé de ce carré par M. Bowen, AC = 6.2 cm et BD = 5.7 cm.',
        input: {
          type: 'choice', answer: 'no',
          options: [
            opt('no', 'No. The two diagonals of a square are the same length.', 'Non. Les deux diagonales d’un carré ont la même longueur.'),
            opt('yes', 'Yes. One diagonal is right.', 'Oui. Une diagonale est juste.'),
            opt('sides', 'Yes. All four sides are 4.4 cm.', 'Oui. Les quatre côtés mesurent 4.4 cm.'),
          ],
        },
        line: 'The diagonals are not equal, so a corner is not 90°.', lineFr: 'Les diagonales ne sont pas égales, donc un coin ne fait pas 90°.',
        hint: 'In a square, AC and BD are equal.', hintFr: 'Dans un carré, AC et BD sont égales.',
        why: 'Measuring both diagonals is a quick check on a square.', whyFr: 'Mesurer les deux diagonales permet de vérifier vite un carré.',
        slips: [{ value: 'sides', key: 'sides-only', msg: 'Four equal sides can still be pushed over into a rhombus. Look at the diagonals.', msgFr: 'Quatre côtés égaux peuvent encore s’écraser en losange. Regarde les diagonales.' }],
      },
    ],
  },
]

const practice = [
  {
    id: 'p1', level: 'practice', inlineSvg: P1_SVG,
    prompt: 'ABCD is a parallelogram. {{AB = 7 cm}}, {{AD = 4 cm}} and angle A is {{65°}}. [[Measure the diagonal DB.]]',
    promptFr: 'ABCD est un parallélogramme. {{AB = 7 cm}}, {{AD = 4 cm}} et l’angle A mesure {{65°}}. [[Mesure la diagonale DB.]]',
    steps: [
      {
        title: 'Which number do you mark?', titleFr: 'Quel nombre marques-tu ?',
        sub: 'AB is drawn. The protractor is on A, with its 0 on AB.',
        subFr: 'AB est tracé. Le rapporteur est sur A, le 0 sur AB.',
        input: { type: 'number', after: '°', answer: '65' },
        line: 'At A: mark @°, then measure 4 cm along the new line to D.', lineFr: 'En A : marque @°, puis mesure 4 cm sur la nouvelle droite jusqu’à D.',
        hint: 'The angle at A is written on the sketch.', hintFr: 'L’angle en A est écrit sur le croquis.',
        slips: [{ value: '115', key: 'other-scale', msg: '115° is on the other scale. Count up from the 0 that sits on AB.', msgFr: '115° est sur l’autre échelle. Compte à partir du 0 qui est sur AB.' }],
      },
      {
        key: true,
        title: 'How long is DB?', titleFr: 'Combien mesure DB ?',
        sub: 'The ruler’s 0 is at D.', subFr: 'Le 0 de la règle est en D.',
        input: ruler(LEN.p1),
        line: 'DB = @ cm.', lineFr: 'DB = @ cm.',
        hint: READ, hintFr: READ_FR,
        slips: [{ value: '7', key: 'read-ab', msg: '7 cm is the side AB. Read the ruler along DB.', msgFr: '7 cm, c’est le côté AB. Lis la règle le long de DB.' }],
      },
    ],
  },
  {
    id: 'p2', level: 'practice', inlineSvg: P2_SVG,
    prompt: 'The {{perpendicular}} from C meets AB at D. [[Measure AD.]]',
    promptFr: 'La {{perpendiculaire}} menée de C coupe AB en D. [[Mesure AD.]]',
    steps: [
      {
        title: 'What size is angle ADC?', titleFr: 'Combien mesure l’angle ADC ?',
        input: { type: 'number', after: '°', answer: '90' },
        line: 'CD meets AB at @°.', lineFr: 'CD coupe AB à @°.',
        hint: 'The perpendicular from a point meets the line at a right angle.', hintFr: 'La perpendiculaire menée d’un point coupe la droite à angle droit.',
      },
      {
        key: true,
        title: 'How long is AD?', titleFr: 'Combien mesure AD ?',
        sub: 'The ruler’s 0 is at A.', subFr: 'Le 0 de la règle est en A.',
        input: ruler(LEN.p2),
        line: 'AD = @ cm.', lineFr: 'AD = @ cm.',
        hint: READ, hintFr: READ_FR,
        slips: [
          { value: '3', key: 'read-cd', msg: '3 cm is CD. AD is along the line AB.', msgFr: '3 cm, c’est CD. AD est le long de la droite AB.' },
          { value: '4', key: 'middle', msg: 'D is not the middle of AB. It is the point straight under C.', msgFr: 'D n’est pas le milieu de AB. C’est le point juste sous C.' },
        ],
      },
      {
        key: true,
        title: 'Which is the shortest way?', titleFr: 'Quel est le chemin le plus court ?',
        sub: 'From C to the line AB.', subFr: 'De C à la droite AB.',
        input: { type: 'choice', answer: 'cd', options: [opt('ca', 'CA', 'CA'), opt('cd', 'CD', 'CD'), opt('cb', 'CB', 'CB')] },
        line: 'The perpendicular, @, is the shortest way.', lineFr: 'La perpendiculaire, @, est le chemin le plus court.',
        hint: 'The shortest way meets the line at a right angle.', hintFr: 'Le chemin le plus court coupe la droite à angle droit.',
      },
    ],
  },
  {
    id: 'p3', level: 'focus', inlineSvg: P3_SVG,
    prompt: 'In triangle PQR, angle P is {{50°}} and angle Q is {{62°}}. PQ carries on to T. [[Draw a line QS through Q, parallel to PR.]]',
    promptFr: 'Dans le triangle PQR, l’angle P mesure {{50°}} et l’angle Q mesure {{62°}}. PQ continue jusqu’à T. [[Trace une droite QS passant par Q, parallèle à PR.]]',
    steps: [
      {
        key: true,
        title: 'What size must angle SQT be?', titleFr: 'Combien doit mesurer l’angle SQT ?',
        input: { type: 'number', after: '°', answer: '50' },
        line: 'Angle SQT = angle RPQ = @°: corresponding angles.', lineFr: 'Angle SQT = angle RPQ = @° : angles correspondants.',
        hint: 'A parallel line makes the same angle with PT as PR does.', hintFr: 'Une droite parallèle fait avec PT le même angle que PR.',
        why: 'Equal corresponding angles mean the lines are parallel.', whyFr: 'Des angles correspondants égaux : les droites sont parallèles.',
        slips: [
          { value: '130', key: 'supplement', msg: '130° is 180° − 50°. That line would lean the other way and cross PR.', msgFr: '130°, c’est 180° − 50°. Cette droite pencherait de l’autre côté et couperait PR.' },
          { value: '62', key: 'angle-q', msg: '62° is the angle inside the triangle at Q. Copy the angle that PR makes at P.', msgFr: '62°, c’est l’angle du triangle en Q. Recopie l’angle que fait PR en P.' },
        ],
      },
      {
        key: true,
        title: 'Will QS and PR ever meet?', titleFr: 'QS et PR vont-elles se couper ?',
        sub: 'They are parallel.', subFr: 'Elles sont parallèles.',
        input: { type: 'choice', answer: 'never', options: [opt('never', 'No, never', 'Non, jamais'), opt('far', 'Yes, far away', 'Oui, très loin'), opt('q', 'Yes, at Q', 'Oui, en Q')] },
        line: 'Parallel lines never meet.', lineFr: 'Des droites parallèles ne se coupent jamais.',
        hint: 'Parallel lines stay the same distance apart.', hintFr: 'Des droites parallèles restent à la même distance.',
      },
    ],
  },
  {
    id: 'p4', level: 'practice', inlineSvg: P4_SVG,
    prompt: 'In quadrilateral ABCD, the angles at A and C are {{right angles}} and angle B is {{110°}}. [[Find angle D, then measure DC.]]',
    promptFr: 'Dans le quadrilatère ABCD, les angles en A et en C sont {{droits}} et l’angle B mesure {{110°}}. [[Trouve l’angle D, puis mesure DC.]]',
    steps: [
      {
        title: 'What do the four angles add up to?', titleFr: 'Combien font les quatre angles en tout ?',
        sub: 'In any quadrilateral.', subFr: 'Dans tout quadrilatère.',
        input: { type: 'number', after: '°', answer: '360' },
        line: 'The angles of a quadrilateral add up to @°.', lineFr: 'Les angles d’un quadrilatère font @° en tout.',
        hint: 'A quadrilateral is two triangles: 2 × 180°.', hintFr: 'Un quadrilatère, c’est deux triangles : 2 × 180°.',
        slips: [{ value: '180', key: 'triangle', msg: '180° is for a triangle. A quadrilateral is two triangles.', msgFr: '180°, c’est pour un triangle. Un quadrilatère, c’est deux triangles.' }],
      },
      {
        key: true,
        title: 'What size is angle D?', titleFr: 'Combien mesure l’angle D ?',
        input: { type: 'number', after: '°', answer: '70' },
        line: 'Angle D = 360° − 90° − 110° − 90° = @°.', lineFr: 'Angle D = 360° − 90° − 110° − 90° = @°.',
        hint: 'Take the three angles you know away from 360°.', hintFr: 'Enlève de 360° les trois angles que tu connais.',
        why: 'If you measure D on your drawing and get 70°, the drawing is accurate.', whyFr: 'Si tu mesures D sur ton tracé et trouves 70°, le tracé est précis.',
        slips: [
          { value: '290', key: 'added', step: 1, msg: '290° is the three angles added up. Take that away from 360°.', msgFr: '290°, c’est la somme des trois angles. Enlève-la de 360°.' },
          { value: '160', key: 'one-right-angle', msg: 'There are two right angles: at A and at C.', msgFr: 'Il y a deux angles droits : en A et en C.' },
        ],
      },
      {
        key: true,
        title: 'How long is DC?', titleFr: 'Combien mesure DC ?',
        sub: 'The ruler’s 0 is at D.', subFr: 'Le 0 de la règle est en D.',
        input: ruler(LEN.p4),
        line: 'DC = @ cm.', lineFr: 'DC = @ cm.',
        hint: READ, hintFr: READ_FR,
      },
    ],
  },
  {
    id: 'p5', level: 'practice', inlineSvg: P5_SVG,
    prompt: 'In quadrilateral ABCD, angle A is {{44°}} and angles B and D are {{28°}}. [[Find the angle at C inside the shape, then measure AC.]]',
    promptFr: 'Dans le quadrilatère ABCD, l’angle A mesure {{44°}} et les angles B et D mesurent {{28°}}. [[Trouve l’angle en C à l’intérieur de la figure, puis mesure AC.]]',
    steps: [
      {
        title: 'Add the three angles you know.', titleFr: 'Additionne les trois angles que tu connais.',
        input: { type: 'number', before: '44° + 28° + 28° =', after: '°', answer: '100' },
        line: '44° + 28° + 28° = @°.', lineFr: '44° + 28° + 28° = @°.',
        hint: '28 + 28 = 56. Then add 44.', hintFr: '28 + 28 = 56. Puis ajoute 44.',
      },
      {
        key: true,
        title: 'What size is angle C?', titleFr: 'Combien mesure l’angle C ?',
        sub: 'The angle inside the shape.', subFr: 'L’angle à l’intérieur de la figure.',
        input: { type: 'number', after: '°', answer: '260' },
        line: 'Angle C = 360° − 100° = @°. It is a reflex angle.', lineFr: 'Angle C = 360° − 100° = @°. C’est un angle rentrant.',
        hint: 'The four angles add up to 360°.', hintFr: 'Les quatre angles font 360° en tout.',
        slips: [
          { value: '100', key: 'sum-only', step: 1, msg: '100° is the three angles together. Angle C is the rest of 360°.', msgFr: '100°, c’est la somme des trois angles. L’angle C est le reste de 360°.' },
          { value: '80', key: 'from-180', msg: 'Take the 100° away from 360°, not from 180°: this is a quadrilateral.', msgFr: 'Enlève les 100° de 360°, pas de 180° : c’est un quadrilatère.' },
        ],
      },
      {
        key: true,
        title: 'How long is AC?', titleFr: 'Combien mesure AC ?',
        sub: 'The ruler’s 0 is at A.', subFr: 'Le 0 de la règle est en A.',
        input: ruler(LEN.p5),
        line: 'AC = @ cm.', lineFr: 'AC = @ cm.',
        hint: READ, hintFr: READ_FR,
        slips: [{ value: '8', key: 'read-ab', msg: '8 cm is AB. Read the ruler along AC.', msgFr: '8 cm, c’est AB. Lis la règle le long de AC.' }],
      },
    ],
  },
]

export const workbook = {
  title: 'Workbook 5.3: draw and measure',
  titleFr: 'Cahier 5.3 : tracer et mesurer',
  roomy: true, // the drawings are measured, so they get most of the screen
  items: [...focus, ...practice],
}

// src/data/Y7_MATH/U05_3/assessment.js
// Eight questions, one sitting, ten minutes. Maths lives ONLY inside $$…$$
// here (none is needed: degrees are plain text). 1 "from C to AB", 2 "sketch"
// and "accurately", 3 a reading on the left 0 (picture), 4 a reading on the
// right 0 (picture), 5 which mark draws 70° at B, 6 the same angle for a
// parallel, 7 the fourth angle of a quadrilateral, 8 the outside of a corner.
// Every distractor is a diagnosis: the middle of AB, measuring a sketch, the
// other scale (180 − x), the wrong 0, 90 − x, one angle left out of the 360°,
// the outside read as the corner. No item copies a deck check or a Zero on the
// Line item. English and French explanations.
import { DIAGRAMS } from './diagrams.js';

export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_from_to',
      type: 'mcq',
      title: '1. The Workbook says: "Draw the perpendicular from C to AB." Which line is that?',
      options: [
        { val: 'A', text: 'A. A line from C to the middle of AB.' },
        { val: 'B', text: 'B. A line through C, parallel to AB.' },
        { val: 'C', text: 'C. A line that starts at C and meets AB at 90°.' },
        { val: 'D', text: 'D. A line from A to B that passes through C.' },
      ],
      correct: 'C',
      expEn: '**From C to AB** means start at C and stop on AB; **perpendicular** means it meets AB at 90°. It goes to the middle only if C happens to be above the middle (A). B is a parallel line, which never meets AB. D is AB itself.',
      expFr: '**From C to AB** (de C à AB) veut dire partir de C et s’arrêter sur AB ; **perpendicular** (perpendiculaire) veut dire qu’elle coupe AB à 90°. Elle va au milieu seulement si C est juste au-dessus du milieu (A). B est une parallèle, qui ne coupe jamais AB. D, c’est AB lui-même.',
    },
    {
      id: 'a2_sketch',
      type: 'mcq',
      title: '2. A question shows a sketch of a quadrilateral and says "Draw it accurately". What do you do?',
      options: [
        { val: 'A', text: 'A. Trace over the sketch carefully.' },
        { val: 'B', text: 'B. Draw it again with its lengths and angles, using a ruler and a protractor.' },
        { val: 'C', text: 'C. Copy the sketch by eye, the same size.' },
        { val: 'D', text: 'D. Measure the sketch and use those measurements.' },
      ],
      correct: 'B',
      expEn: 'A **sketch** shows the shape and its numbers but is **not accurate**, so you draw it again from its numbers, with a ruler and a protractor. Tracing or copying it (A, C) copies its mistakes, and measuring it (D) gives the wrong numbers: a sketch is not to scale.',
      expFr: 'Un **croquis** montre la figure et ses nombres mais n’est **pas précis** : tu la retraces d’après ses nombres, avec une règle et un rapporteur. Le décalquer ou le copier (A, C), c’est copier ses erreurs, et le mesurer (D) donne de faux nombres : un croquis n’est pas à l’échelle.',
    },
    {
      id: 'a3_read_left',
      type: 'mcq',
      title: '3. What size is the marked angle?',
      inlineSvg: DIAGRAMS.QUIZ_READ_50,
      options: [
        { val: 'A', text: 'A. 130°' },
        { val: 'B', text: 'B. 50°' },
        { val: 'C', text: 'C. 40°' },
        { val: 'D', text: 'D. 140°' },
      ],
      correct: 'B',
      expEn: 'The first arm runs **left**, along the **0 on the left**. Count up that scale, the inside one: 10, 20, 30, 40, 50 — so **50°**. 130 is the other scale, which starts at 180 on this arm. Check: the angle is **acute**, less than 90°, so it cannot be 130° or 140°. 40° is 90° − 50°.',
      expFr: 'Le premier côté part vers la **gauche**, sur le **0 de gauche**. Compte sur cette échelle, l’intérieure : 10, 20, 30, 40, 50 — donc **50°**. 130 est sur l’autre échelle, qui part de 180 sur ce côté. Vérifie : l’angle est **aigu**, moins de 90°, il ne peut donc pas faire 130° ni 140°. 40°, c’est 90° − 50°.',
    },
    {
      id: 'a4_read_right',
      type: 'mcq',
      title: '4. What size is the marked angle?',
      inlineSvg: DIAGRAMS.QUIZ_READ_120,
      options: [
        { val: 'A', text: 'A. 60°' },
        { val: 'B', text: 'B. 130°' },
        { val: 'C', text: 'C. 110°' },
        { val: 'D', text: 'D. 120°' },
      ],
      correct: 'D',
      expEn: 'The first arm runs **right**, along the **0 on the right**, so count up the outside scale: **120°**. 60 is the other scale. Check: the angle is **obtuse**, more than 90°, so 60° cannot be right. 130° and 110° are 10° out: read the number at the arm, not the one next to it.',
      expFr: 'Le premier côté part vers la **droite**, sur le **0 de droite** : compte sur l’échelle extérieure : **120°**. 60 est sur l’autre échelle. Vérifie : l’angle est **obtus**, plus de 90°, donc 60° ne peut pas être juste. 130° et 110° ont 10° d’écart : lis le nombre sur le côté, pas son voisin.',
    },
    {
      id: 'a5_draw_left',
      type: 'mcq',
      title: '5. You draw 70° at B. The line BA runs to the left from B. The protractor’s centre is on B and its baseline on BA. Where do you mark?',
      options: [
        { val: 'A', text: 'A. At 70 on the scale that starts at 0 on the left.' },
        { val: 'B', text: 'B. At 70 on the scale that starts at 0 on the right.' },
        { val: 'C', text: 'C. At 110 on the scale that starts at 0 on the left.' },
        { val: 'D', text: 'D. At 20, because 90 − 70 = 20.' },
      ],
      correct: 'A',
      expEn: 'BA runs left, so the 0 **on BA** is the one on the left: count up that scale to **70**. Counting 70 from the right-hand 0 (B) draws the angle from the wrong line, so it comes out as 110° from BA. C is 110°, obtuse. D mixes the angle up with a right angle.',
      expFr: 'BA part vers la gauche, donc le 0 **sur BA** est celui de gauche : compte sur cette échelle jusqu’à **70**. Compter 70 depuis le 0 de droite (B) trace l’angle depuis la mauvaise droite : il fait alors 110° avec BA. C, c’est 110°, obtus. D confond l’angle avec un angle droit.',
    },
    {
      id: 'a6_parallel',
      type: 'mcq',
      title: '6. A line across meets AB at 50°. To draw a line through P parallel to AB, what angle do you draw at P, in the same place?',
      options: [
        { val: 'A', text: 'A. 130°' },
        { val: 'B', text: 'B. 40°' },
        { val: 'C', text: 'C. 50°' },
        { val: 'D', text: 'D. 90°' },
      ],
      correct: 'C',
      expEn: 'Parallel lines make the **same angle** with a line across, in the same place (corresponding angles): **50°**. 130° is 180° − 50°, the other scale: that line would cross AB. 40° is 90° − 50°. 90° would draw a perpendicular to the line across, not a parallel to AB.',
      expFr: 'Des parallèles font le **même angle** avec une droite qui les coupe, à la même place (angles correspondants) : **50°**. 130°, c’est 180° − 50°, l’autre échelle : cette droite couperait AB. 40°, c’est 90° − 50°. 90° tracerait une perpendiculaire à la droite qui coupe, pas une parallèle à AB.',
    },
    {
      id: 'a7_fourth',
      type: 'mcq',
      title: '7. Three angles of an accurate quadrilateral measure 95°, 85° and 110°. What should the fourth angle measure?',
      options: [
        { val: 'A', text: 'A. 70°' },
        { val: 'B', text: 'B. 180°' },
        { val: 'C', text: 'C. 250°' },
        { val: 'D', text: 'D. 80°' },
      ],
      correct: 'A',
      expEn: 'The four angles add up to **360°**: 95 + 85 + 110 = 290, and 360 − 290 = **70°**. B leaves out the 110° (360 − 95 − 85). C takes away only the 110°. D comes from adding the three wrongly (280).',
      expFr: 'Les quatre angles font **360°** en tout : 95 + 85 + 110 = 290, et 360 − 290 = **70°**. B oublie le 110° (360 − 95 − 85). C n’enlève que le 110°. D vient d’une addition fausse des trois (280).',
    },
    {
      id: 'a8_outside',
      type: 'mcq',
      title: '8. Mr Bowen measures the outside of a corner of a shape: 290°. What is the angle of the corner?',
      options: [
        { val: 'A', text: 'A. 110°' },
        { val: 'B', text: 'B. 70°' },
        { val: 'C', text: 'C. 290°' },
        { val: 'D', text: 'D. 90°' },
      ],
      correct: 'B',
      expEn: 'The inside and the outside of a corner make a full turn, **360°**: 360 − 290 = **70°**. A is 290 − 180 — there is no "other scale" for 290°, which is more than a protractor’s 180°. C is the outside, not the corner. D guesses a right angle; only a square’s corner is sure to be 90°.',
      expFr: 'L’intérieur et l’extérieur d’un coin font un tour complet, **360°** : 360 − 290 = **70°**. A, c’est 290 − 180 — il n’y a pas d’« autre échelle » pour 290°, qui dépasse les 180° d’un rapporteur. C, c’est l’extérieur, pas le coin. D suppose un angle droit ; seul le coin d’un carré fait sûrement 90°.',
    },
  ],
};

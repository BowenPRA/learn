// content/y7-math/U05_3/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes, one period — 25 slides, a practical lesson: about a third of it is students drawing. If you fall behind: skip slide 20 (practice in the Workbook’s words) and one word problem, and stop the square at its diagonal without Our Squares (10) — read three diagonals aloud instead.',
  objective:
    'Students can read a protractor (count up from the 0 that sits on the line, and estimate first: acute or obtuse?); draw a given angle; draw a square from one side, knowing a square needs right angles as well as equal sides; ' +
    'draw the perpendicular from a point to a line (it meets the line at 90° and is the shortest way); draw a parallel line by making the same angle with a line across (5.2’s corresponding angles); ' +
    'draw a quadrilateral from a sketch; measure lengths to the nearest millimetre and angles to the nearest degree; and check a drawing with an angle fact: the angles of a quadrilateral add up to 360°.',
  materials: [
    'Workbook, Unit 5, Section 5.3, pages 70–72 (no Learner’s Book for this unit)',
    'Every student: a ruler, a protractor and a sharp pencil; set squares if the class has them (slides 3, 15) — a protractor can do every job instead',
    'Four rulers per pair for the square-to-rhombus push (slide 8)',
    'Projector / TV — six slides are models, a story or the class’s results (5, 7, 9, 10, 15, 17); they run offline. EN / FR switch',
    'Mini whiteboards for the starter (1), the votes’ follow-ups and the exit (25); maths notebooks for the five drawings',
  ],
  vocab: [
    { term: 'Protractor · le rapporteur', def: 'measures and draws angles; two scales, one starting at 0 on each side (slides 3–6)' },
    { term: 'Set square · l’équerre', def: 'a triangle with a right angle: draws right angles, and parallel lines when it slides along a ruler (slide 15)' },
    { term: 'Accurate / accuracy · précis / la précision', def: 'exactly right: lengths to the nearest mm, angles to the nearest degree' },
    { term: 'Diagonal · la diagonale', def: 'a line from one corner to the opposite corner (slide 11)' },
    { term: 'Perpendicular from a point · la perpendiculaire menée d’un point', def: 'the line from the point that meets the line at 90° — the shortest way (slide 13)' },
    { term: 'Parallel · parallèle', def: 'always the same distance apart; drawn by making the same angle with a line across (slide 16)' },
    { term: 'Rhombus · le losange', def: 'four equal sides, no right angles — what a loose square frame becomes (slides 7–8); spoken, not copied' },
    { term: 'Sketch · le croquis', def: 'a drawing that shows the shape but is not accurate: draw it again with the real lengths and angles (slide 17)' },
    { term: 'Through / from … to · passant par / de … à', def: '“through B” means the line passes B; “from C to AB” means start at C and stop on AB (slide 19)' },
    { term: 'Acute / obtuse · aigu / obtus', def: 'less than 90° / more than 90°: the estimate that catches a misread protractor' },
  ],
  timeline: [
    { time: '0–3 min', phase: 'Starter and goals', detail: 'Slide 1: everyone writes a guess for the diagonal; take four for the board (expect 5, 10 and 7). Leave them there. Slide 2: read the big line and the three goals, pointing at each picture.' },
    { time: '3–6 min', phase: 'Tools; the vote', detail: 'Slide 3: hold up each tool as you say its name; students hold theirs up too. Slide 4: vote, everyone at once — both numbers are on the protractor, so expect a split.' },
    { time: '6–10 min', phase: 'Read the protractor', detail: 'Slide 5: angle 1 is the vote (40°). Before each Show, the class says the angle and “acute” or “obtuse”. Angles 3, 4 and 6 open to the left: the 0 is on the other side.' },
    { time: '10–14 min', phase: 'Draw an angle', detail: 'Slide 6: copy the panel, then everyone draws the 6 cm line and the 65° angle. Walk round: the commonest error is 115° (the wrong scale). Reveal the check.' },
    { time: '14–17 min', phase: 'What happens next?', detail: 'Slide 7, completely deadpan — “One nail each” is the set-up. Take guesses before A clue. Slide 8: pairs push four rulers; reveal: a rhombus.' },
    { time: '17–23 min', phase: 'Draw the square', detail: 'Slide 9: before each press the class says the next step; everyone draws it. At step 7 everyone measures AC and writes it down.' },
    { time: '23–26 min', phase: 'Our squares; back to the starter', detail: 'Slide 10: students call out their diagonals and you tap each value. Show the exact length (7.07 cm). Ask anyone far from 7.1 to check their right angles. Slide 11: copy DIAGONAL; back to the board guesses; reveal.' },
    { time: '26–31 min', phase: 'The perpendicular from a point', detail: 'Slide 12: vote. Slide 13: copy the panel; everyone points to the wall the shortest way. Slide 14: draw it and measure AD (5.0 cm).' },
    { time: '31–36 min', phase: 'Parallel lines', detail: 'Slide 15: before each press, parallel or not? Draw three lines, then Turn the set square once. Slide 16: copy the panel, then draw the parallel through P following the four numbered steps on the drawing; check the gap at both ends.' },
    { time: '36–43 min', phase: 'A quadrilateral from a sketch', detail: 'Slide 17: the class says each step; everyone draws it. Step 4 needs the scale with 0 on BA. Slide 18: copy CHECK; everyone adds their four angles — within 2° of 360° is a good drawing.' },
    { time: '43–46 min', phase: 'The Workbook’s words', detail: 'Slide 19: read each phrase; the class reads the meaning. Slide 20 if there is time: PS should be 5.0 cm.' },
    { time: '46–48 min', phase: 'Word problems', detail: 'Slides 21–23, deadpan, never flagged as jokes.' },
    { time: '48–50 min', phase: 'Close', detail: 'Slide 24: thumbs up or down for each line; notebook count. Slide 25: exit question on whiteboards.' },
  ],
  answers: [
    { q: 'Slides 1, 9–11 — the diagonal of a 5 cm square', a: '5 × 1.414… = 7.07 cm, so a careful drawing measures 7.0–7.2 cm. Longer than a side (5 cm), shorter than two sides (10 cm). A diagonal near 7.5 cm or 6.5 cm means a corner is not 90°.' },
    { q: 'Slides 4–5 — read the protractor', a: 'Vote: A, 40° (the 0 on the line is on the outer scale; 140 is the other scale). The stepper: 40°, 120°, 65°, 150°, 90°, 25°. The trap answers are 140°, 60°, 115°, 30°, 155°.' },
    { q: 'Slide 6 — draw an angle', a: '65°: acute. 115° means the wrong scale.' },
    { q: 'Slides 7–8 — the frame', a: 'With one nail at each corner the corners can turn, so the frame squashes into a rhombus: four 40 cm sides, angles about 60° and 120°. A square needs four right angles as well as four equal sides. (A diagonal brace would stop it.)' },
    { q: 'Slides 12–14 — the perpendicular from a point', a: 'Vote: A, the line that meets AB at 90° (B goes to the middle of AB, which is not 90°). Slide 14: BD = 4 × cos 60° = 2 cm, so AD = 7 − 2 = 5.0 cm; CD = 4 × sin 60° = 3.5 cm.' },
    { q: 'Slide 15 — the model', a: 'Every line meets the ruler at 60°, so they are parallel. Turned 10° (one corner lifts off the ruler), the set square draws at 70°: not parallel.' },
    { q: 'Slides 17–18 — the quadrilateral', a: 'C ≈ 64° and D ≈ 106°; CD ≈ 7.1 cm. 80° + 110° + 64° + 106° = 360°. Student answers within a degree or two are accurate.' },
    { q: 'Slide 20 — draw, then measure', a: 'PS = 5.0 cm (PR 4 cm, RS 3 cm, a right angle at R).' },
    { q: 'Slides 21–23 — word problems', a: 'Playground: about 7.1 m (the same shape as the 5 cm square, 100 times bigger; the tape measure is irrelevant). Table: he measured the outside; 360° − 270° = 90°. Parallel lines: no — parallel lines never meet; his angle at P was not the same as at AB.' },
    { q: 'Slide 25 — exit', a: 'No: 75 + 100 + 95 + 80 = 350°, not 360°, so at least one angle is 10° out.' },
    { q: 'Workbook 5.3, Focus 1–3 (pages 70–71)', a: 'Measured answers: allow ±1 mm and ±1°. 1 CD ≈ 7.8 cm (a right angle at B, sides 5 cm and 6 cm). 2 AC ≈ 6.8 cm (a square of side 4.8 cm). 3 BD ≈ 10.2 cm.' },
    { q: 'Workbook 5.3, Practice 4–6 (page 71)', a: '4 AD ≈ 5.1 cm. 5 the two new lines meet at a fourth point, making a parallelogram with PQ as a diagonal (check: opposite angles equal). 6 angle D = 55° — check: 360° − (90° + 125° + 90°) = 55°; CD ≈ 8.7 cm.' },
    { q: 'Workbook 5.3, Challenge 7–9 (pages 71–72)', a: '7 AC = 10 cm, so AD ≈ 11.7 cm; angles A ≈ 68°, B = 90°, C ≈ 143°, D ≈ 59° — check: they add up to 360°. 8 the angle at C is reflex: 360° − (50° + 30° + 30°) = 250° (measure the 110° outside it and subtract from 360°); AC ≈ 5.5 cm. 9 AB ≈ 10.8 cm.' },
  ],
  notes:
    'NOTEBOOK COUNT (slide 24): 5 written panels — draw an angle (6), diagonal (11), the perpendicular from a point (13), a parallel line (16), check with 360° (18) — and 5 accurate drawings: the 65° angle (6), the square and its diagonal (9), the perpendicular (14), the parallel line (16), the quadrilateral (17). Slide 20 is extra.\n\n' +
    'FOR THE OBSERVER. The goal is said on slide 2 and checked on slide 24 (the same three, with their key words). Ask before you tell: the starter (1), the vote (4), say it first (5), the story (7), the rulers (8), the class’s diagonals (10), the second vote (12), the set square predictions (15), each next step (9, 17). Every student answers at once on 4 and 12; every student draws five times; the class’s own measurements are graphed (10); students act it out on 8 (rulers) and 13 (pointing). Real photographs: the tools (3).\n\n' +
    'WHERE IT SITS. After 5.2 Intersecting lines: the parallel line on slide 16 is drawn with 5.2’s corresponding angles, and the right angle is 5.2’s perpendicular. 5.1’s 360° checks the quadrilateral. Every number on the slides is new, so Exercise 5.3 is unspent: Focus 1 matches slide 20, Focus 2 slide 9, Focus 3 slide 17; Practice 4 slide 14, Practice 5 slide 16, Practice 6 slides 17–18; Challenge 7–8 slide 18 (and the table, 22, for 8’s reflex angle). Answers are above.\n\n' +
    'LANGUAGES: English and French; no Vietnamese. The French uses rapporteur, équerre, diagonale, losange, perpendiculaire menée d’un point; the Workbook phrases on slide 19 stay in English, as the class will meet them.\n\n' +
    'THE STORY (slide 7). Deadpan, never flagged as a joke. Mr Bowen is the cartoon from Coffee, Carbon and Stars. “One nail each” is the set-up: a single nail lets each corner turn, so the frame keeps its sides and loses its right angles.\n\n' +
    'OUR SQUARES (slide 10). Tap the number line once for each diagonal called out (tap 7.1 for “seven point one”). Undo removes the last dot; Clear all empties it. The dots are kept in this browser for 12 hours, so leaving the slide is safe — press Clear all if you rehearse on the classroom computer the same day.\n\n' +
    'MODEL MOVES. Slide 5: Show the answer rings the 0 to count from and gives the reading; the red line names the trap. Slides 9 and 17: one press per step; the class says the step first, then draws it. Slide 15: Draw, then slide adds a line; Turn the set square lifts one corner 10° off the ruler, and the next line is 70°: not parallel.\n\n' +
    'NOT ON THE SLIDES. Compasses and ruler-and-compass constructions (the Workbook does not ask for them here); bisectors; the word reflex beyond slide 22’s table. Pythagoras is behind 7.07 cm — say “5 times 1.414” only if a student asks.',
}

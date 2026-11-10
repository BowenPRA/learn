// content/y7-math/U05_1/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes — Monday 26 October, 26 slides. If you fall behind: skip slide 22 (the challenge) and one of the two word problems (23–24).',
  objective:
    'Students can read an angle diagram (a number is known, a letter is missing, a small square is 90°); find a missing angle on a straight line (180°), ' +
    'around a point (360°) and in a quadrilateral (360°) with two steps — add the angles you know, subtract the total from 180° or 360°; ' +
    'say what sum and quadrilateral mean; use the equal opposite angles of a parallelogram; and read the Workbook’s instruction words.',
  materials: [
    'Projector / TV for the lesson deck (EN / FR switch)',
    'Scrap paper, one sheet per student, for Tear Off the Corners (slide 14) — tearing works, no scissors needed',
    'Mini whiteboards and pens (slides 1, 5, 8, 9, 10, 17, 19, 20, 21, 26); maths notebooks',
  ],
  vocab: [
    { term: 'Sum · la somme', def: 'the total when you add numbers together; sounds exactly like “some”' },
    { term: 'Quadrilateral · le quadrilatère', def: 'a flat shape with four straight sides (quad = 4, lateral = side)' },
    { term: 'Straight line · la ligne droite', def: 'angles on it add up to 180°' },
    { term: 'Around a point · autour d’un point', def: 'angles round it add up to 360°, a full turn' },
    { term: 'Degrees (°) · les degrés', def: '60° is said “60 degrees” (slide 4)' },
    { term: 'Parallelogram · le parallélogramme', def: 'opposite angles are equal; next-door angles add up to 180°' },
    { term: 'Equilateral · équilatéral', def: 'all three sides equal, so every angle is 60° — spoken, not copied' },
    { term: 'Calculate / work out · calcule', def: 'both mean “find”; “the value of a” means “the number a”' },
  ],
  timeline: [
    { time: '0–6 min', phase: 'Starter, goals, reading a diagram', detail: 'Slide 1: four numbers on whiteboards while they settle. Slide 2: check them — 90, 180, 360, 180. Slide 3: read the big line and the three goals; each ? is the missing angle. Slide 4: point at each part — a number we know, a letter we find, a small square is 90°, ° is “degrees”. Say “sixty degrees” together.' },
    { time: '6–13 min', phase: 'A straight line', detail: 'Slide 5: trace the two angles with your arm — together they make the straight line; copy the fact; whiteboards for a. Slide 6: vote, everyone at once. Slide 7: 178°, not 180°.' },
    { time: '13–20 min', phase: 'Round a point; the two steps', detail: 'Slide 8: whiteboards, one slice; reveal. Slide 9: copy the fact; whiteboards for b — point out it took two steps. Slide 10: copy TWO STEPS; whiteboards for c. Every answer from here on is shown as 1. add, 2. subtract.' },
    { time: '20–25 min', phase: 'Key words', detail: 'Slide 11: say “some” and “sum” — the same sound; copy SUM (the line underneath is read, not copied). Slide 12: quad = 4 (a quad bike has 4 wheels); copy QUADRILATERAL. Point at “any 4 sides”: it counts too.' },
    { time: '25–34 min', phase: 'Angles in a quadrilateral', detail: 'Slide 13: vote. Slide 14: everyone draws a strange quadrilateral, marks a b c d, tears off the corners and puts the points together. Ask what they made before you go on. Slide 15: a full turn, every time — answer B. Slide 16: the diagonal is a second reason; copy the fact. Slide 17: the class says step 1 and step 2 before you reveal.' },
    { time: '34–42 min', phase: 'The Workbook’s words; practice', detail: 'Slide 18: read each Workbook phrase, the class reads the meaning. Slide 19: whiteboards, all three; decide 180° or 360° first. Slide 20: 360 − 150, then ÷ 3.' },
    { time: '42–46 min', phase: 'Parallelogram and challenge', detail: 'Slide 21: copy the fact; q = 65° first, then p and r. Slide 22: two right angles and a 60°, then the two steps.' },
    { time: '46–50 min', phase: 'Word problems and close', detail: 'Slides 23–24, deadpan. Slide 25: thumbs up or down for each item; notebook count. Slide 26: exit question on whiteboards.' },
  ],
  answers: [
    { q: 'Slides 1–2 — starter', a: 'Right angle 90°, straight line 180°, full turn 360°, triangle 180°.' },
    { q: 'Slide 5 — straight line', a: 'a = 180° − 130° = 50°.' },
    { q: 'Slides 6–7 — is it straight?', a: 'B, no: 57° + 121° = 178°, not 180°.' },
    { q: 'Slide 8 — pizza', a: '360° ÷ 8 = 45°.' },
    { q: 'Slide 9 — round a point', a: '100° + 120° = 220°; b = 360° − 220° = 140°.' },
    { q: 'Slide 10 — two steps', a: '90° + 150° = 240°; c = 360° − 240° = 120°.' },
    { q: 'Slides 13–16 — every quadrilateral?', a: 'B, every one. The torn corners always make a full turn; a diagonal splits any quadrilateral into two triangles, 180° + 180°.' },
    { q: 'Slide 17 — worked example', a: '70 + 95 + 120 = 285; d = 360 − 285 = 75°.' },
    { q: 'Slide 19 — whiteboards', a: '1: x = 180 − 145 = 35°. 2: y = 360 − (150 + 85) = 125°. 3: z = 360 − (90 + 90 + 105) = 75°.' },
    { q: 'Slide 20 — three the same', a: '360 − 150 = 210; 210 ÷ 3 = 70° each.' },
    { q: 'Slide 21 — parallelogram', a: 'q = 65° (opposite); p = r = (360 − 130) ÷ 2 = 115°. Also 180 − 65 = 115.' },
    { q: 'Slide 22 — challenge', a: '90 + 90 + 60 = 240; y = 360 − 240 = 120°.' },
    { q: 'Slide 23 — the chair', a: '2.5 × 360 = 900°. Two full turns bring him back to the board; the half turn leaves him facing the back of the room.' },
    { q: 'Slide 24 — the garden', a: '360 − 270 = 90°. The cat is irrelevant.' },
    { q: 'Slide 26 — exit', a: '85 + 100 + 110 = 295; 360 − 295 = 65°.' },
  ],
  notes:
    'NOTEBOOK COUNT (slide 25): 7 written panels — straight line 180° (5), around a point 360° (9), two steps (10), sum (11), quadrilateral (12), quadrilateral 360° (16), parallelogram (21). The lines under the panels on slides 11 and 22 are read, not copied.\n\n' +
    'THE SCAFFOLD. Slide 4 teaches how to read the Workbook’s diagrams before any are used: a number is known, a letter is the missing angle, a small square is 90°. Slide 10 gives one method for every question — add the angles you know, subtract the total from 180° or 360° — and every later answer is revealed in those two steps. Slide 19 uses the Workbook’s own wording, straight after slide 18 teaches it.\n\n' +
    'WORKBOOK 5.1. Every number in the deck is new, so Exercise 5.1 (pp. 66–68) is still unspent: Focus 1–3 match slides 5, 9 and 17–19; Practice 4 is slides 6–7 (is it straight?); Practice 5 is slide 20; Practice 7 is slide 21; Challenge 8–9 are slide 22. Question 11 (the kite) needs a kite’s line of symmetry — one pair of equal angles — which slide 12 only names.\n\n' +
    'ASK BEFORE YOU TELL. The starter (1), both votes (6, 13), the pizza (8), the torn corners (14, shown on 15) and the worked example (17).\n\n' +
    'THE WORD PROBLEMS (23–24). Deadpan, never flagged as jokes. The chair: the half turn matters. The garden: the cat is irrelevant.\n\n' +
    'LANGUAGES: English and French; no Vietnamese. Diagrams are in English, as always.',
}

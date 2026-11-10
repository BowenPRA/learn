// content/y7-math/U02_5/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective:
    'Students can say what an equation is and what solve means; check an answer by substituting it back in, so x − 4 = 6 gives x = 10 and not 2; ' +
    'say what an inverse operation is and reverse the book’s flow chart to solve one-step equations, including ones written the other way round (14 = x + 3); ' +
    'turn "I think of a number and subtract 5. My answer is 21" into n − 5 = 21 and solve it; ' +
    'and solve two-step equations by undoing the last step first, so 2a + 4 = 18 gives a = 7 and not 5.',
  materials: [
    'Projector / TV for the lesson deck',
    'Mini whiteboards + markers (one per pair)',
    'Student notebooks',
    'Workbook Unit 2, Section 2.5 for the homework',
  ],
  vocab: [
    { term: 'Equation', def: 'has an = sign and an unknown number. Contrast it with 2.1 (expression: no = sign) and 2.2 (formula: a rule that works for any value) — slide 3 puts all three side by side (Vietnamese: phương trình)' },
    { term: 'Solve', def: 'find the value of the unknown. They already know "solve a problem"; here the answer is always one number (Vietnamese: giải)' },
    { term: 'Inverse operation', def: 'the operation that undoes another: + and −, × and ÷. Say out loud that in Unit 1 "the inverse of 5" was −5 — same word, now it names an operation (Vietnamese: phép toán ngược)' },
    { term: 'Reverse', def: 'not a copy-down word, but it is the book’s tip ("Reverse the flow chart") and it looks like inverse. Reverse = go backwards (a car reverses); inverse = the opposite operation' },
    { term: 'I think of a number', def: 'choose a number and keep it secret — not "think about". "First thought of" means the number at the start. Call it n' },
  ],
  timeline: [
    { time: '0–4 min', phase: 'Starter', detail: 'Slide 1: three missing-number boxes on whiteboards (8, 7, 9). Slide 2: the box is just a letter — in Girl Math it was n. Open Check your answers.' },
    { time: '4–10 min', phase: 'Equation and the English', detail: 'Slide 3: expression, formula, equation side by side; copy EQUATION and SOLVE. Slide 4: reverse / inverse / think of. Make the class say the everyday meaning first (the car reverses; I think of my family), then the maths one.' },
    { time: '10–15 min', phase: 'Check your answer', detail: 'Slide 5: everyone votes at once — left hand up for A (x = 2), right hand up for B (x = 10). No discussion yet. Slide 6: put each answer back in; 2 − 4 = −2, so A is wrong. Copy CHECK. This is 2.2’s substitution — say so.' },
    { time: '15–23 min', phase: 'Inverse and the flow chart', detail: 'Slide 7: copy INVERSE OPERATION. Slide 8: the book’s flow chart for x + 5 = 12; copy REVERSE THE FLOW CHART. Slide 9: press Next box; the class says the box before each press. Do at least three of the four. Slide 10: five on whiteboards, then Check.' },
    { time: '23–29 min', phase: 'Either way round + game', detail: 'Slide 11: copy EITHER WAY ROUND; a, b, c on whiteboards. Slide 12: Check It! — thumbs up or down, then Show. Aim for 10 cards. Leave the game with the deck’s Continue button.' },
    { time: '29–34 min', phase: 'I think of a number', detail: 'Slide 13: read Mr Bowen’s sentence aloud twice; pairs say what he first thought of. Slide 14: phrase by phrase into n − 5 = 21; copy I THINK OF A NUMBER. Slide 15: four sentences on whiteboards — equation first, then the answer.' },
    { time: '34–42 min', phase: 'Two steps', detail: 'Slide 16: a student SAYS how Mr Bowen takes off his socks and shoes, in a full sentence. Slide 17: last on, first off. Slide 18: left hand A (a = 5), right hand B (a = 7), all at once. Slide 19: the widget settles it; stop on the first reverse box and ask why the − 4 comes first. Slide 20: copy UNDO THE LAST STEP FIRST. Slide 21: four on whiteboards.' },
    { time: '42–47 min', phase: 'Mistakes and word problems', detail: 'Slide 22: Mr Bowen’s homework, pairs check each answer and find the four mistakes. Slide 23 is Challenge; run it only if the room is ahead. Slides 24–26: word problems, read completely straight.' },
    { time: '47–50 min', phase: 'Close', detail: 'Slide 27: checklist, 7 written panels. Slide 28: homework. Slide 29: exit question on whiteboards.' },
  ],
  answers: [
    { q: 'Slide 1 — starter', a: '8 + 7 = 15 · 7 × 4 = 28 · 20 − 9 = 11.' },
    { q: 'Slide 5 — the vote', a: 'B, x = 10. Check: 10 − 4 = 6. A (x = 2) is the student who did the subtraction they could see: 2 − 4 = −2, not 6.' },
    { q: 'Slide 9 — Undo It', a: 'x − 4 = 6: 6 + 4 = 10 · x + 9 = 15: 15 − 9 = 6 · 3y = 21: 21 ÷ 3 = 7 · m − 15 = 12: 12 + 15 = 27.' },
    { q: 'Slide 10 — solve, then check', a: 'a 12 · b 16 · c 8 (6 + x is x + 6) · d 7 · e 35.' },
    { q: 'Slide 11 — either way round', a: 'a 20 − 6 = 14 · b 35 ÷ 5 = 7 · c 9 + 4 = 13.' },
    { q: 'Slide 12 — Check It! (the wrong ones)', a: 'x − 3 = 8 is 11, not 5 · x + 12 = 20 is 8, not 32 · 6x = 42 is 7, not 36 · x − 10 = 5 is 15, not −5 · 25 = x − 5 is 30, not 20 · 2x = 30 is 15, not 28 · 7x = 7 is 1, not 0. The other nine are right, including x + 8 = 8 so x = 0.' },
    { q: 'Slide 13–14 — Mr Bowen’s number', a: 'n − 5 = 21, so n = 26. Check: 26 − 5 = 21. A student who writes 5 − n has read "subtract 5" backwards.' },
    { q: 'Slide 15 — write it, then solve it', a: 'a n + 13 = 30, n = 17 · b n − 8 = 15, n = 23 · c 6n = 54, n = 9 · d n ÷ 4 = 5, n = 20.' },
    { q: 'Slide 18–19 — the second vote', a: 'B, a = 7: 18 − 4 = 14, 14 ÷ 2 = 7. Check: 2 × 7 + 4 = 18. A (a = 5) halved first: 18 ÷ 2 = 9, 9 − 4 = 5, and 2 × 5 + 4 = 14.' },
    { q: 'Slide 19 — Two Steps (all four)', a: '2a + 4 = 18: a = 7 · 3b − 5 = 25: b = 10 · 5c + 2 = 32: c = 6 · 4d − 7 = 25: d = 8.' },
    { q: 'Slide 21 — two-step equations', a: 'a 26 − 5 = 21, 21 ÷ 3 = 7 · b 29 + 3 = 32, 32 ÷ 4 = 8 · c 30 − 12 = 18, 18 ÷ 6 = 3 · d 20 + 10 = 30, 30 ÷ 5 = 6.' },
    { q: 'Slide 22 — Mr Bowen’s homework', a: 'a x = 8 (he added 6 instead of subtracting) · b x = 9 (he subtracted 5 instead of dividing) · c x = 25 (he subtracted 7 instead of adding) · d x = 7 (he divided first: 20 ÷ 2 = 10, 10 − 6 = 4; right is 20 − 6 = 14, 14 ÷ 2 = 7).' },
    { q: 'Slide 23 — angles', a: '4x + 5x = 90, so 9x = 90 and x = 10. The angles are 40° and 50°; 40 + 50 = 90. The diagram is drawn to size.' },
    { q: 'Slide 24 — notebooks', a: '4n + 7 = 43, 4n = 36, n = 9: one notebook is 9 thousand dong.' },
    { q: 'Slide 25 — Mr Bowen’s age', a: '2a − 7 = 1, 2a = 8, a = 4. Read "Mr Bowen is 4 years old" completely straight.' },
    { q: 'Slide 26 — the plant', a: '6 weeks × 5 cm = 30 cm, so h + 30 = 26 and h = −4. The plant was −4 cm tall. Do not explain it.' },
    { q: 'Exit question', a: '6x − 4 = 32: 32 + 4 = 36, 36 ÷ 6 = 6. Check: 6 × 6 − 4 = 32.' },
  ],
  notes:
    'The notebook count is 7 written panels: equation + solve; check; inverse operation; reverse the flow chart; either way round; I think of a number; undo the last step first. ' +
    'The workbook’s key words box is inverse operation and solve — both are copied. The deck adds equation, because 2.1 and 2.2 defined expression and formula and the class has never been told what the third one is. ' +
    'Checking comes early (slide 6) on purpose: every workbook question says "check your answers by substituting", and a class that checks can settle its own arguments. Keep asking "did you check?" for the rest of the lesson. ' +
    'Slide 4 and slide 16 are the two that must survive. If short of time, cut slide 23 (Challenge) and one of the word problems, not the English. ' +
    'The flow chart is the book’s method and the homework uses it (Q2–Q4), so do not replace it with "move it to the other side". Strong students will stop drawing it on the one-step equations; ask them to draw it for the two-step ones anyway. ' +
    'Check It! and the Undo It widget: a clicker’s Right arrow drives the game; the widget needs the on-screen buttons. Leave the game with the deck’s Back or Continue buttons. ' +
    'Workbook Q10 (angles on a straight line and in a triangle), Q11 (negative answers) and Q13 (rearranging w = 2x + y − 3z) were not taught; slide 23 is the gentle version of Q10 and slide 26 has one negative answer. Leave the rest for Challenge students.',
}

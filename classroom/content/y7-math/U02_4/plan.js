// content/y7-math/U02_4/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective:
    'Students can say what brackets are and what expand and multiply out mean; know that 4(10 + 6) means 4 × (10 + 6); ' +
    'use the grid to multiply every term inside the brackets by the number outside, so 5(a + 3) = 5a + 15 and not 5a + 3; ' +
    'take the sign in with its term, so 3(x − 2) = 3x − 6; multiply the numbers and keep the letter, so 5 × 2p = 10p; ' +
    'stop at 12 − 4c because 12 and 4c are not like terms; and expand and simplify in that order.',
  materials: [
    'Projector / TV for the lesson deck',
    'Mini whiteboards + markers (one per pair)',
    'Student notebooks; a ruler helps, because every grid gets drawn',
    'Workbook Unit 2, Section 2.4 for the homework',
  ],
  vocab: [
    { term: 'Brackets', def: 'the marks ( ). British English calls them brackets; American books say parentheses, and the exam says brackets (Vietnamese: dấu ngoặc)' },
    { term: 'Expand', def: 'multiply every term inside the brackets by the number outside. Say out loud that the value does not get bigger — only the writing gets longer (Vietnamese: khai triển)' },
    { term: 'Multiply out', def: 'the same instruction as expand. Both wordings appear in the exercise, so the class has to recognise each of them (Vietnamese: nhân phá ngoặc)' },
    { term: 'Each / every', def: 'not a maths word, but it carries the whole rule: EACH term inside, not just the first one' },
    { term: 'Expand and simplify', def: 'two jobs in order: expand the brackets, then collect the like terms from 2.3 (Vietnamese: khai triển rồi rút gọn)' },
  ],
  timeline: [
    { time: '0–4 min', phase: 'Starter', detail: 'Slide 1: work out 4 × 16 in your head, then write down how. Take three different methods on the board before opening slide 2. Slide 2: almost nobody multiplies by 16 — they split it. Then Show the working (40 + 24 = 64).' },
    { time: '4–9 min', phase: 'The grid', detail: 'Slide 3: the book’s grid — one box, one multiplication. Slide 4: the same grid in a real bar of chocolate, 2 × 7 snapped into 2 × 5 and 2 × 2. Thirty seconds; skip this one if short of time, not slide 5.' },
    { time: '9–15 min', phase: 'The English', detail: 'Slide 5: expand / multiply out / each. Make the class say the everyday meaning of expand first (the balloon), then the maths one. Slide 6: copy BRACKETS. Point back to 2.2 for the hidden times sign.' },
    { time: '15–23 min', phase: 'Multiply every term', detail: 'Slide 7: everyone votes at once — left hand up for A (5a + 3), right hand up for B (5a + 15). No discussion of the answer yet. Slide 8: press Next box; the class says "five times a" before each press. Do at least three of the four. Slide 9: copy EXPAND. Slide 10: five on whiteboards, then Check.' },
    { time: '23–30 min', phase: 'The minus sign', detail: 'Slide 11: copy TAKE THE SIGN WITH YOU. Slide 12: the widget with a minus inside; stop on the last one, where the letter comes second. Slide 13: left hand A (8c), right hand B (12 − 4c), all at once. Slide 14: copy ALREADY FINISHED — this is 2.3 coming back.' },
    { time: '30–35 min', phase: 'Game', detail: 'Slide 15: Right or Wrong? — thumbs up or down, then Show. Aim for 10–12 cards. Leave the game with the deck’s Continue button.' },
    { time: '35–41 min', phase: 'Numbers inside', detail: 'Slide 16: copy 5 × 2p = 10p. Slide 17: four on whiteboards; part d has three terms inside. Slide 18: Mr Bowen’s homework, pairs find the four mistakes. Slide 19: odd one out, one minute.' },
    { time: '41–47 min', phase: 'Expand and simplify', detail: 'Slide 20: copy EXPAND AND SIMPLIFY. Slide 21: three on whiteboards. Slide 22: the rectangle — the grid was a rectangle all along. Slide 23 is Challenge; run it only if the room is ahead.' },
    { time: '47–50 min', phase: 'Close', detail: 'Slides 24–25: word problems, read completely straight. Slide 26: checklist, 6 written panels. Slide 27: homework. Slide 28: exit question on whiteboards.' },
  ],
  answers: [
    { q: 'Slide 1 — starter', a: '4 × 16 = 64. The method wanted is 4 × 10 = 40, 4 × 6 = 24, 40 + 24 = 64.' },
    { q: 'Slide 4 — the chocolate', a: 'The bar is 2 × 7 = 14 squares. Snapped after five rows: 2 × 5 = 10 and 2 × 2 = 4, and 10 + 4 = 14.' },
    { q: 'Slide 8 — Fill the Grid', a: '2(x + 3) = 2x + 6 · 3(x + 4) = 3x + 12 · 5(m + 1) = 5m + 5 · 4(2n + 3) = 8n + 12.' },
    { q: 'Slide 10 — expand these', a: 'a 3a + 6 · b 5b + 15 · c 27 + 9y · d 8 + 4f · e 56 + 8z.' },
    { q: 'Slide 12 — A Minus Inside', a: '3(x − 2) = 3x − 6 · 6(k − 3) = 6k − 18 · 2(y − 4) = 2y − 8 · 7(1 − w) = 7 − 7w.' },
    { q: 'Slide 17 — multiply out', a: 'a 21q + 14 · b 20u − 4 · c 6 + 12v · d 48 + 32w − 24g.' },
    { q: 'Slide 18 — Mr Bowen’s homework', a: 'a 6a + 12 (the 2 was not multiplied) · b 12b − 20 (he did 4 + 5 instead of 4 × 5) · c 10 − 5d (10 and 5d are not like terms, so 5d is wrong) · d 6m + 12 (he did 3 + 2 instead of 3 × 2).' },
    { q: 'Slide 19 — odd one out', a: 'C. 3(4x + 6) = 12x + 18; A, B and D all give 12x + 20.' },
    { q: 'Slide 21 — expand, then collect', a: 'a 36 + 4x − 24 = 4x + 12 · b 10x − 10 + x + 17 = 11x + 7 · c 4x + 16 + 7x + 7 = 11x + 23.' },
    { q: 'Slide 22 — the rectangle', a: 'Area = 4(x + 3) = 4x + 12 square cm. Perimeter = 2(x + 3) + 2 × 4 = 2x + 6 + 8 = 2x + 14 cm.' },
    { q: 'Slide 23 — work backwards', a: 'a 4, because 4 × 2x = 8x and 4 × 3 = 12 · b 7, because 5 × 7 = 35 · c 4 and 5, because 4 × 3m = 12m and 4 × 5 = 20.' },
    { q: 'Slide 24 — the shopping', a: '6(m + 2) − 4 = 6m + 12 − 4 = 6m + 8. Students who write 6m + 8 mangoes have read "fruit" as "mangoes".' },
    { q: 'Slide 25 — the drawers', a: 'At the start 7(s + 3) = 7s + 21. Each drawer loses one sock per spider and all three spiders, so 7(s − 3) = 7s − 21.' },
    { q: 'Exit question', a: '5(x + 2) + 3x = 5x + 10 + 3x = 8x + 10.' },
  ],
  notes:
    'The notebook count is 6 written panels: brackets; expand; take the sign with you; already finished; multiply the numbers; expand and simplify. ' +
    'The workbook’s key words box is brackets and expand — both are copied, and the deck adds multiply out because the exercise switches to that wording without warning. ' +
    'Slide 4 is the only slide that can be cut for time. Slide 5 (the English) and slide 14 (knowing when to stop) are the two that must survive. ' +
    'The grid is the book’s method and the deck never drops it, but strong students will start writing 5(a + 3) = 5a + 15 straight out. That is fine — ask them to draw the grid for the three-term question on slide 17 anyway. ' +
    'Slide 14 is 2.3 arriving in a new disguise: 4(3 − c) = 12 − 4c is finished, and the class already knows why. If they cannot say why, go back to 2.3 slide 13 before the game. ' +
    'Right or Wrong?: a clicker’s Right arrow shows the answer, then moves on. Leave the game with the deck’s Back or Continue buttons. ' +
    'Workbook Q11 (show that 4(2x + 7) + 3(6x − 5) is equivalent to 13(2x + 1)) and Q13 (the number cloud) were not taught and can be left for Challenge students; slide 23 is the gentler version of Q12.',
}

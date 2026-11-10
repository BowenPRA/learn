// content/y7-math/U02_6/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective:
    'Students can read < and > aloud as "is less than" and "is greater than", and recognise fewer, below, under, more, above and over as the same signs; ' +
    'say what an inequality and an integer are, and explain why "more than 3 cats" has many answers but not 3.5; ' +
    'show an inequality on a number line with an open circle and an arrow, and write the inequality a number line shows; ' +
    'and give the smallest or largest integer that works, so x > 3 gives 4 (not 3) and t < −2 gives −3, −4, −5, … (not −1, 0, 1).',
  materials: [
    'Projector / TV for the lesson deck',
    'Mini whiteboards + markers (one per pair)',
    'Student notebooks; a ruler helps for the number lines',
    'Workbook Unit 2, Section 2.6 for the homework',
  ],
  vocab: [
    { term: 'Is less than / is greater than', def: 'the English for < and >. The class has known the signs since Grade 1 in Vietnam (nhỏ hơn / lớn hơn); what they have not done is SAY them in English, left to right. "Greater" is not "great" (very good)' },
    { term: 'Inequality', def: 'uses < or > to compare, and can have many answers. Contrast it with last week’s equation, which had one (Vietnamese: bất đẳng thức)' },
    { term: 'Integer', def: 'a whole number: negative, zero or positive. The class met the word in Unit 1. It is what the workbook means by "the smallest integer" and "a list of the integer values" (Vietnamese: số nguyên)' },
    { term: 'Open circle', def: 'not a copy-down word on its own, but the book’s tip: the circle is open (empty) because the number itself is not included. Closed circles (≤, ≥) are Stage 8 — if a strong student asks, say "next year"' },
    { term: 'Fewer, below, under, above, over', def: 'the words a word problem uses instead of less than / greater than. "Under 18" means age < 18. Slide 4 lists them; slide 23 uses "fewer than"' },
  ],
  timeline: [
    { time: '0–4 min', phase: 'Starter', detail: 'Slide 1: < or > in three boxes on whiteboards. Slide 2: the answers are on the slide — the task is to READ each aloud in English. Several students, full sentences, then Show me.' },
    { time: '4–9 min', phase: 'The English', detail: 'Slide 3: copy LESS THAN / GREATER THAN (the book’s Remember box). Slide 4: the other words. Read the left column aloud, then the right; ask "under 18 — is that less than or greater than?"' },
    { time: '9–16 min', phase: 'Inequality and integer', detail: 'Slide 5: Mr Bowen’s cats. Take several numbers — 4, 5, 10, 100 — until someone says "many answers". If someone says 3.5, keep it for slide 7. Slide 6: copy INEQUALITY. Slide 7: can he have 3.5 cats? Copy INTEGER. Slide 8: a–c written on whiteboards. Slide 9: a–c said aloud, several students each, full sentences.' },
    { time: '16–27 min', phase: 'Number lines', detail: 'Slide 10: copy OPEN CIRCLE and ARROW. Slide 11: everyone votes at once — left hand A (3), right hand B (4). No discussion. Slide 12: is 3 greater than 3? Copy the rule. Slide 13: press Next step; the class says each part first. Do at least three of the four. Slides 14–15: read four lines, then draw three.' },
    { time: '27–31 min', phase: 'Game', detail: 'Slide 16: Could It Be? — thumbs up or down, then Show. Aim for 10 cards. Leave the game with the deck’s Continue button.' },
    { time: '31–39 min', phase: 'Negatives', detail: 'Slide 17: left hand A (−1, 0, 1, …), right hand B (−3, −4, …), all at once. Slide 18: B; copy LESS THAN MEANS LEFT. Slide 19: the thermometer — colder is less (Unit 1). Slide 20: the widget with negatives and one decimal. Slide 21: a–e on whiteboards.' },
    { time: '39–46 min', phase: 'Mistakes and word problems', detail: 'Slide 22: Mr Bowen’s homework, pairs find the four mistakes. Slides 23–25: word problems. Insist on the two inequalities first. Read 24 and 25 completely straight.' },
    { time: '46–50 min', phase: 'Close', detail: 'Slide 26: checklist, 6 written panels. Slide 27: homework. Slide 28: exit question on whiteboards.' },
  ],
  answers: [
    { q: 'Slide 1 — starter', a: '7 > 4 · −3 < 2 · −8 < −5 (−8 is colder: Unit 1).' },
    { q: 'Slide 2 — say it', a: '7 is greater than 4 · −3 is less than 2 · −8 is less than −5.' },
    { q: 'Slide 5 — Mr Bowen’s cats', a: '4, 5, 6, … — any whole number greater than 3. Not 3 (that is not MORE than 3) and not 3.5 (slide 7).' },
    { q: 'Slide 8 — write it', a: 'a y < 10 · b m > −4 · c t < 0 ("below 0").' },
    { q: 'Slide 9 — say it', a: 'a "n is greater than 7" · b "k is less than −1" · c "w is greater than −10".' },
    { q: 'Slide 11–12 — the first vote', a: 'B, 4. 3 is the open circle: 3 is not greater than 3. A (3) is the student who included the circle’s own number — the book’s Q8 trap.' },
    { q: 'Slide 13 — Show It (all four)', a: 'x > 3: smallest 4 · x < 5: largest 4 · y > 0: smallest 1 · m < 8: largest 7.' },
    { q: 'Slide 14 — read the line', a: 'a x > 1 · b x < 4 · c x > −3 · d x < −1.' },
    { q: 'Slide 15 — draw the line', a: 'a open circle at 6, arrow right · b open circle at 2, arrow left · c open circle at 0, arrow right.' },
    { q: 'Slide 16 — Could It Be? (the no’s)', a: 'x > 4, x = 4 · x < 10, x = 11 · y > −2, y = −3 · t < −5, t = −4 · m < 0, m = 0 · p > 2.5, p = 2 · q < −1, q = 1. The other nine are yes, including k < 1, k = −100.' },
    { q: 'Slide 17–18 — the second vote', a: 'B, −3, −4, −5, … Less than is further left. A (−1, 0, 1, …) went right because 1 < 2 — the book’s Zara question (Q9) with new numbers.' },
    { q: 'Slide 19 — the thermometer', a: 'The photo’s scale prints the numbers below zero WITHOUT a minus sign — the "10" under the 0 is −10. Point at it; it is the same number line.' },
    { q: 'Slide 20 — Show It With Negatives (all four)', a: 't < −2: largest −3 · x > −4: smallest −3 · y < 0: largest −1 · p > 2.5: smallest 3 (the circle sits between 2 and 3).' },
    { q: 'Slide 21 — smallest or largest', a: 'a smallest 7 · b largest −5 · c smallest 0 · d largest −1 · e smallest 3.' },
    { q: 'Slide 22 — Mr Bowen’s homework', a: 'a 8, not 7 (7 is not included) · b −4, −5, −6, … (less than is left) · c k < 9 (he wrote greater) · d −5, not −7 (−7 is less than −6, so it does not work).' },
    { q: 'Slide 23 — the class', a: 's > 20 and s < 24: 21, 22 or 23 students.' },
    { q: 'Slide 24 — the cats, again', a: 'c < 1 and c > −1: the only integer is 0. Mr Bowen has no cats. (On slide 5 he had more than 3. Do not mention it.)' },
    { q: 'Slide 25 — Mr Bowen’s number', a: 'n > 7 and n < 8: no integer works (7.5 would, but it is not an integer). Mr Bowen should think again.' },
    { q: 'Exit question', a: 'y < −4; the largest integer is −5.' },
  ],
  notes:
    'The notebook count is 6 written panels: less than / greater than; inequality; integer; open circle + arrow; the circle’s number does not work; less than means left. ' +
    'The workbook’s key words box is inequality and integer — both are copied. The first panel is the book’s Remember box. ' +
    'Do not reteach the signs: Vietnamese Grade 1 covers them. The lesson is the English — slides 2 and 4 must survive. If short of time, cut slide 15 and one word problem, not the English. ' +
    'Every inequality in the workbook is strict (< or >), so every circle is open. ≤ and ≥ with closed circles are Stage 8. ' +
    'Show It and the game: a clicker’s Right arrow drives the game; the widget needs the on-screen buttons. Leave the game with the deck’s Back or Continue buttons. ' +
    'Workbook Q12 and Q13 (Challenge) put decimals such as 3.75 on number lines with tenths marked; slide 20’s p > 2.5 is the gentle version. Leave the rest for Challenge students.',
}

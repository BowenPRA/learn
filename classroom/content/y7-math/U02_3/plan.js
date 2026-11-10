// content/y7-math/U02_3/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective:
    'Students can say what a term and like terms are; simplify an expression by collecting like terms; ' +
    'know that x means 1x, so 8s − s = 7s and not 8; leave unlike terms such as 3a + 2b alone; ' +
    'recognise numbers, and ab and ba, as like terms, but not x and x²; ' +
    'and move each sign with its term, so 7x + 5y − 3x + y = 4x + 6y.',
  materials: [
    'Projector / TV for the lesson deck',
    'Mini whiteboards + markers (one per pair)',
    'Student notebooks; two or three coloured pens help for circling like terms',
    'Workbook Unit 2, Section 2.3 for the homework',
  ],
  vocab: [
    { term: 'Term', def: 'one part of an expression; the + and − signs separate the terms. A number on its own is a term too (Vietnamese: hạng tử)' },
    { term: 'Like terms', def: 'terms that contain the same letter. Say out loud that "like" here means "the same kind", not "thích" (Vietnamese: hạng tử đồng dạng)' },
    { term: 'Simplify', def: 'write an expression in a shorter way. The exam says "simplify" and "write in its simplest form" — both mean the same job (Vietnamese: rút gọn)' },
    { term: 'Collecting like terms', def: 'adding like terms together to simplify. "Collect" = put the same kind together, like the baskets on slide 9 (Vietnamese: thu gọn / gộp hạng tử đồng dạng)' },
    { term: 'Simplest form', def: 'not a copy-down word, but it is in half the workbook questions: the expression once every like term is collected' },
  ],
  timeline: [
    { time: '0–4 min', phase: 'Starter', detail: 'Slide 1: when a = 5, work out 3a + 4a, then 7a. Both are 35. Slide 2: is that luck? Take a guess, then open Try a = 10 (70 both times).' },
    { time: '4–9 min', phase: 'The bag', detail: 'Slide 3: make a student SAY the bag in a full English sentence ("7 apples and 3 bananas"). No letters yet. Slide 4: the photos, then 3a + 2b + 4a + b = 7a + 3b. Slide 5: the same idea with this morning’s atoms (9 atoms, 3 kinds) — 30 seconds, skip if short of time.' },
    { time: '9–17 min', phase: 'Key words', detail: 'Slide 6: copy TERM. Slide 7: like / collect / simplify, everyday vs maths; make the class say both meanings. Slide 8: copy LIKE TERMS. Slide 9: the Halong Bay baskets; copy SIMPLIFY and COLLECTING LIKE TERMS.' },
    { time: '17–21 min', phase: 'Find, move, collect', detail: 'Slide 10: press Next step; the class says "find", "move", "collect" before each press. Do all four expressions (the second one is 4x + x + 2x — watch for 6x).' },
    { time: '21–27 min', phase: 'The invisible 1', detail: 'Slide 11: everyone votes at once — left hand up for A (8), right hand up for B (7s). No discussion of the answer yet. Slide 12: 7s; copy x MEANS 1x. Slide 13: 5 cm + 3 kg; copy ONLY LIKE TERMS. Slide 14: five on whiteboards, then Check.' },
    { time: '27–33 min', phase: 'Tricky terms + game', detail: 'Slide 15: copy the three tricky cases. Slide 16: Like or Not? — thumbs up/down, then Show. Aim for 10–12 cards. Leave the game with the deck’s Continue button.' },
    { time: '33–38 min', phase: 'Keep the sign', detail: 'Slide 17: left hand A (4x + 6y), right hand B (10x + 6y), all at once. Slide 18: step through the first expression and stop on Move — point at the −3x travelling. Slide 19: copy KEEP THE SIGN; a and b on whiteboards.' },
    { time: '38–44 min', phase: 'Bricks and pyramids', detail: 'Slide 20: correct the apple — x is a length, a number. Slide 21: three rows on whiteboards. Slide 22: first pyramid together; second if time (the 2a + 3b block cannot be simplified — say so); the third works backwards.' },
    { time: '44–48 min', phase: 'Mistakes and word problems', detail: 'Slide 23: Mr Bowen’s homework, pairs find the four mistakes. Slides 24–26: word problems, getting sillier; read 25 and 26 completely straight.' },
    { time: '48–50 min', phase: 'Close', detail: 'Slide 27: checklist, 7 written panels. Slide 28: homework. Slide 29: exit question on whiteboards.' },
  ],
  answers: [
    { q: 'Slide 1 — starter', a: '3a + 4a = 15 + 20 = 35; 7a = 7 × 5 = 35.' },
    { q: 'Slide 10 — Find, Move, Collect', a: '2b + 3b = 5b · 4x + x + 2x = 7x · 3a + 2b + 4a + b = 7a + 3b · 5m + 2n + m + 4n = 6m + 6n.' },
    { q: 'Slide 14 — tick or cross', a: 'a ✓ 5k · b ✗ (3k and 3 are not like terms) · c ✗ (w and v) · d ✓ 8d · e ✓ 7m + 1.' },
    { q: 'Slide 18 — the sign moves', a: '7x + 5y − 3x + y = 4x + 6y · 8a − 3b + 2a − b = 10a − 4b · 6 + 5t − 1 − 2t = 3t + 5 · 9p − 4q − 5p + 7q + 2 = 4p + 3q + 2.' },
    { q: 'Slide 19 — keep the sign', a: 'a 6p − 4p + 2q + 3q = 2p + 5q · b 5t − 2t + 9 − 4 = 3t + 5.' },
    { q: 'Slide 21 — brick rows', a: 'a (x x y) 2x + y · b (y x y) x + 2y · c (x y x y x) 3x + 2y.' },
    { q: 'Slide 22 — pyramids', a: '1: 2x, 5x, x → 7x, 6x → 13x. 2: a + b, 2a, 3b → 3a + b, 2a + 3b → 5a + 4b. 3 (backwards): top 12y, middle 5y and 7y, bottom 2y, 3y, 4y.' },
    { q: 'Slide 23 — Mr Bowen’s homework', a: 'a 3x + 5 cannot be simplified (not 8x) · b 5y (not 6) · c 5p + 2q (not 6pq) · d 5ab (ab and ba are like terms).' },
    { q: 'Slide 24 — word problems', a: '1: 4n pens. 2: perimeter = 2x + 1 + x + 2x + 1 + x = 6x + 2 cm.' },
    { q: 'Slide 25 — the animals', a: '4c + 3c + 2d − 5c + 1 = 2c + 2d + 1. The goldfish is 1 animal; students who write + x have added its name.' },
    { q: 'Slide 26 — the keys', a: '3k × 4 trips = 12k km. The keys were irrelevant.' },
    { q: 'Exit question', a: '5m − m + 2n + 4n = 4m + 6n.' },
  ],
  notes:
    'The notebook count is 7 written panels: term; like terms; simplify + collecting like terms; x means 1x; only like terms; tricky like terms; keep the sign. ' +
    'The workbook’s key words box is collecting like terms, like terms, simplify, term — all four are copied. ' +
    'The book’s tip says to think of a letter as an apple or a banana. It helps on day one, and slide 20 deliberately corrects it: a letter is a number (the length of a brick), not an object. Do not skip that slide if short of time; skip slide 5 instead. ' +
    'Workbook Q7 (h², y³) and Q10 (ab, rd, jk, kj) are covered by slide 15 and the game; Q13 (fractions such as 3a/4 − a/2) was not taught and can be left for Challenge students. ' +
    'In the game, "5c and −2c" is a like pair on purpose: the sign belongs to the term but does not change its kind. ' +
    'Like or Not?: a clicker’s Right arrow shows the answer, then moves on. Leave the game with the deck’s Back or Continue buttons.',
}

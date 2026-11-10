// content/y7-math/U04_1_4/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
// A speed run of Unit 4 in one period: four sections, each built as
// vote → picture → copy the rule → whiteboards.
export const plan = {
  duration: '50 minutes — Thursday 15 October, the first of two or three decimal days',
  objective:
    'Students can read a decimal aloud digit by digit ("three point two five"); compare and order decimals ' +
    'by looking at the whole-number part first and filling with zeros; add and subtract decimals by lining ' +
    'up the points; tell a mental method from a written method; multiply a decimal by a whole number by ' +
    'taking the point out and putting it back, checking with an estimate; divide a decimal by a whole ' +
    'number with the point straight up and a 0 where a digit does not divide, checking with the inverse ' +
    'calculation; and turn "change", "how much more" and "share equally" into the right operation.',
  materials: [
    'Projector / TV for the lesson deck (EN / FR switch)',
    'Mini whiteboards + markers (one per student, or one per pair)',
    'Student notebooks',
    'No calculators — every number in the deck is built to be done by hand',
    'Workbook Unit 4, Sections 4.1–4.4 (pp. 51–61), unspent — no number in the deck comes from it',
  ],
  vocab: [
    { term: 'Compare', def: 'decide which number is bigger. Look at the whole-number parts first; if they match, fill with zeros and compare the decimal parts (French: comparer)' },
    { term: 'Whole-number part / decimal part', def: 'in 3.25, the whole-number part is 3 and the decimal part is .25 (French: partie entière / partie décimale)' },
    { term: 'Three point two five', def: 'how 3.25 is said in English: each digit after the point on its own. French says "trois virgule vingt-cinq" (and Vietnamese "ba phẩy hai mươi lăm"), which is exactly why 3.25 sounds bigger than 3.3 — slide 3' },
    { term: 'In order of size, starting with the smallest', def: 'the book’s exact instruction (4.1 Q1–Q5). "Fastest" flips it: the fastest time is the SMALLEST number (slide 5)' },
    { term: 'Third', def: 'a 4.1 key word: position 3 in an order. "Third fastest" is the third smallest time' },
    { term: 'Mental method / written method', def: 'in your head / in columns on paper. Both are exam instructions in 4.2 (Q6, Q8, Q9) (French: calcul mental / méthode écrite)' },
    { term: 'Estimate', def: 'a rough answer from rounded numbers, used to check where the point goes: 3.2 × 7 is about 3 × 7 = 21 (French: estimer)' },
    { term: 'Inverse calculation', def: 'the opposite operation, used as a check: 8.24 ÷ 4 = 2.06 because 2.06 × 4 = 8.24 (French: calcul inverse)' },
    { term: 'Change', def: 'in a shop, the money you get back. Everyday "change" means something different — stop and say so (French: la monnaie)' },
    { term: 'Share equally', def: 'give everyone the same amount, so divide. "Mr Bowen and three friends" is FOUR people (slide 20) (French: partager en parts égales)' },
  ],
  timeline: [
    { time: '0–4 min', phase: 'Starter and vote 1', detail: 'Slide 1: order 3.3, 3.25, 3.05, 3.252 on whiteboards while the class settles — do not mark it. Slide 2: everyone votes at once, left hand up for A (3.25), right hand up for B (3.3). No verdict yet.' },
    { time: '4–9 min', phase: 'Compare', detail: 'Slide 3: say "three point two five" together, then "three point three". Ask a French speaker how French says 3.25 — "vingt-cinq" is why A looked bigger. Point, not comma. Slide 4: copy COMPARE. Slide 5: the real Berlin 2009 times on whiteboards; most will start with 10.34 — "fastest" means the smallest time. Powell was third.' },
    { time: '9–19 min', phase: 'Add and subtract', detail: 'Slide 6: vote 2, left hand A (0.28), right hand B (0.38). Slide 7: Next step once per step and let the class say the step first. The first sum settles the vote — 0.38 forgets that the tenths gave 1 away. Run 23.4 + 6.78 and 15 − 3.46 quickly. Slide 8: copy the rule, then a–d on whiteboards. Slide 9: copy MENTAL / WRITTEN METHOD; b is the trap (5.3 instead of 5.5).' },
    { time: '19–27 min', phase: 'Multiply', detail: 'Slide 10: vote 3, A (0.12), B (1.2). Slide 11: thirty seconds — four pieces of 0.3 m are past the 1 m mark. Slide 12: copy MULTIPLYING. Slide 13: estimate before each one; take e (3.6 × 24) by hand on the board if it splits the room.' },
    { time: '27–35 min', phase: 'Divide', detail: 'Slide 14: vote 4, A (2.06), B (2.6). Slide 15: the point goes straight up; 2 ÷ 4 is 0 remainder 2, so the 0 must be written. Both answers estimate to about 2, so only the inverse check (×4) separates them. Slide 16: copy DIVIDING, then a–d. Slide 17 (one fact, four answers) if there is time.' },
    { time: '35–42 min', phase: 'All four together', detail: 'Slide 18: pairs find Mr Bowen’s four mistakes, one from each section. Slide 19: read each row aloud; copy CHANGE and SHARE EQUALLY. Slide 20: two word problems on whiteboards.' },
    { time: '42–47 min', phase: 'Silly ones', detail: 'Slides 21–22: read both completely straight. 21 uses ×, then −, and comes out exactly 9.58. 22 is ÷, then ×, and the answer is the rope it started with (minus the knots).' },
    { time: '47–50 min', phase: 'Close', detail: 'Slide 23: checklist, 6 written panels. Slide 24: exit question on whiteboards.' },
  ],
  answers: [
    { q: 'Slide 1 — starter', a: '3.05, 3.25, 3.252, 3.3.' },
    { q: 'Slide 2 — vote 1', a: 'B. 3.3 = 3.30, and 3 tenths beat 2 tenths. A is what you get if you read 3.25 as "three point twenty-five".' },
    { q: 'Slide 5 — the 100 m final', a: '9.58 (Bolt), 9.71 (Gay), 9.84 (Powell), 9.93 (Thompson), 10.34 (Patton). Third fastest: Powell. These are the official Berlin 2009 results; Bolt’s 9.58 is still the world record.' },
    { q: 'Slide 6 — vote 2', a: 'A. 1.00 − 0.72 = 0.28. Check: 0.28 + 0.72 = 1.00. B (0.38) does 10 − 7 in the tenths after the tenths have already given 1 to the hundredths.' },
    { q: 'Slide 7 — LineUp sets', a: '1 − 0.72 = 0.28 · 23.4 + 6.78 = 30.18 (estimate 23 + 7 = 30) · 15 − 3.46 = 11.54 (check 11.54 + 3.46 = 15.00).' },
    { q: 'Slide 8 — add and subtract', a: 'a 10.36 · b 6.73 · c 11.65 · d 5.28.' },
    { q: 'Slide 9 — mental method', a: 'a 7 + 4.6 = 11.6, take 0.1 off: 11.5 · b 8.4 − 3 = 5.4, but 0.1 too much was taken, so add it back: 5.5.' },
    { q: 'Slide 10 — vote 3', a: 'B. 0.3 × 4 = 1.2 (3 × 4 = 12, one decimal place). 0.12 has two decimal places and is smaller than one 0.3.' },
    { q: 'Slide 13 — multiply', a: 'a 4.2 · b 7.2 · c 0.4 · d 5 (5.00 — exact, so the zeros can go) · e 86.4 (36 × 24 = 864; estimate 4 × 24 = 96 or 3.6 × 20 = 72).' },
    { q: 'Slide 14 — vote 4', a: 'A. 8.24 ÷ 4 = 2.06. Check: 2.06 × 4 = 8.24, but 2.6 × 4 = 10.4.' },
    { q: 'Slide 16 — divide', a: 'a 3.12 · b 1.47 · c 0.14 · d 1.575 (6.300 ÷ 4).' },
    { q: 'Slide 17 — one fact', a: 'a 108.1 · b 10.81 · c 4.7 · d 0.23. Placing the point: 4.7 × 23 ≈ 5 × 20 = 100; 10.81 ÷ 47 ≈ 10 ÷ 50 = 0.2.' },
    { q: 'Slide 18 — Mr Bowen’s homework', a: 'a 4.09 < 4.1 (4.10) · b 12 − 4.5 = 7.5, not 8.5 · c 0.6 × 3 = 1.8, not 0.18 · d 9.18 ÷ 3 = 3.06, not 3.6 (1 ÷ 3 does not go: write 0).' },
    { q: 'Slide 20 — word problems', a: '1: 2.75 + 4.60 = 7.35; 10.00 − 7.35 = 2.65 dollars change · 2: four people, 9.36 ÷ 4 = 2.34 dollars each.' },
    { q: 'Slide 21 — Mr Bowen vs Usain Bolt', a: '17 × 0.38 = 6.46 s; 16.04 − 6.46 = 9.58 s. A draw. (Bolt retired in 2017.)' },
    { q: 'Slide 22 — the rope', a: '3.6 ÷ 4 = 0.9 m each; 0.9 × 4 = 3.6 m. A little less, because knots use rope.' },
    { q: 'Exit question', a: '5 − 1.36 = 3.64 · 7.2 ÷ 6 = 1.2.' },
  ],
  notes:
    'The notebook count is 6 written panels: compare; adding and subtracting; mental and written method; multiplying; dividing; change and share equally. ' +
    'The deck is English and French only, the first Year 7 maths deck without Vietnamese. Decimal points stay as points in the French, because the class works from the English book; slide 3 says so out loud. ' +
    'If time runs short, stop after slide 9, the end of adding and subtracting, and open the next lesson at slide 10. Skip slide 17 first, then 22. ' +
    'Every section opens with a vote and the votes alternate: the right answer is B, A, B, A. Do not settle a vote on the vote slide; the next slide does it. ' +
    'Slide 7 is the deck’s one widget. It starts with the numbers lined up on the RIGHT, the way a hurried student writes them; ask "is this lined up?" before the first press. Orange zeros are the ones the student writes in. ' +
    'Slide 13 d (1.25 × 4 = 5.00 = 5) will meet last unit’s "never delete a zero". That rule is about ROUNDED answers, where the zero shows the degree of accuracy. An exact answer can drop it. ' +
    'Workbook key words not taught: "digits" (4.2) and "fill in" (4.3) need no teaching, and "conjecture" (4.4 Q14) is Challenge work. Section 4.5 (making decimal calculations easier) is not in this deck; slide 9’s mental method is its first step.',
}

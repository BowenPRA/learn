// content/y7-math/U03_1_2/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
// This deck covers TWO sections and is taught over TWO periods. Slides 17–18
// (the place-value table, then the part-1 checklist) close 3.1; slide 19 opens
// 3.2.
export const plan = {
  duration: 'Two periods of 50 minutes — Wed 23 and Thu 24 Sept',
  objective:
    'Students can say what a power is and read 10³ aloud; know that the power counts the zeros; ' +
    'multiply and divide by powers of 10 by moving the digits left or right rather than "adding zeros"; ' +
    'convert between mg, g, kg and t; count decimal places from the point; round to a given number of ' +
    'decimal places using the next digit; keep the trailing zero, so 34.9892 to 1 d.p. is 35.0 and not 35; ' +
    'and work one place further before rounding, so 58 ÷ 7 to 3 d.p. is 8.286 and not 8.285.',
  materials: [
    'Projector / TV for the lesson deck',
    'Mini whiteboards + markers (one per pair)',
    'Student notebooks',
    'Calculators for slides 32 and 33 only — everything before that is by hand',
    'Workbook Unit 3, Sections 3.1 and 3.2 (pp. 43–49) for the homework',
  ],
  vocab: [
    { term: 'Power', def: 'the small raised number; it says how many to multiply together. Everyday English "power" means electricity or strength — stop and say so (Vietnamese: số mũ)' },
    { term: 'Powers of 10', def: '10, 100, 1000, … The power is the number of zeros after the 1 (Vietnamese: lũy thừa của 10)' },
    { term: 'Round', def: 'write a number in a simpler form that is close to it. Vietnamese làm tròn is literally "make it round", which is the same picture (Vietnamese: làm tròn)' },
    { term: 'Decimal places (d.p.)', def: 'the digits after the decimal point. Counting starts at the point, not at the front of the number (Vietnamese: chữ số thập phân)' },
    { term: 'Degree of accuracy', def: 'how exact the answer has to be. The question always states it. "Degree" here is not temperature and not an angle (Vietnamese: độ chính xác)' },
    { term: 'Correct to', def: 'not a key word in the book, but it is how the exam says "round to". Half the marks in 3.2 turn on recognising it' },
    { term: 'As far as', def: 'the opposite instruction: keep dividing, do not round yet. Workbook Q12 uses both phrases in one question' },
  ],
  timeline: [
    { time: 'P1 · 0–5 min', phase: 'Starter', detail: 'Slide 1: write 10, 100, 1000 and count the zeros. Slide 2: the ten-zero number on the board — make the class count it out loud together and get it wrong. Do not answer; slide 5 answers it.' },
    { time: 'P1 · 5–14 min', phase: 'Power', detail: 'Slide 3: copy POWER. Slide 4: "power" is not electricity; drill "ten squared", "ten cubed", "ten to the power of six" out loud — this is the English, do not rush it. Slide 5: copy POWERS OF 10; the mystery number was 10¹⁰. Slide 6: three on whiteboards.' },
    { time: 'P1 · 14–24 min', phase: 'The folk rule dies', detail: 'Slide 7: "to multiply by 10, just add a zero" — thirty seconds in pairs, no verdict yet. Slide 8: everyone votes at once, left hand up for A (7.2000), right hand up for B (7200). Slide 9: press Move one place and let the class say each move before you press. The point never moves.' },
    { time: 'P1 · 24–34 min', phase: 'Both directions', detail: 'Slide 10: copy MULTIPLYING MOVES LEFT, then a/b/c on whiteboards. Slide 11: copy DIVIDING MOVES RIGHT, then a/b/c — watch for 0.052 written as 0.52. Slide 12: Which Way? Aim for 10–12 cards; fingers for the number of places, hand for the direction. Leave with the deck’s Continue button.' },
    { time: 'P1 · 34–44 min', phase: 'Using it', detail: 'Slide 13: the missing power. Slide 14: Mr Bowen’s chain of moves (4 − 2 + 3 = 5). Slide 15: copy METRIC MASS; the ladder is three identical steps. Slide 16: the Moon and Jupiter — the point is that the power answers "which is further" before any digits are written.' },
    { time: 'P1 · 44–50 min', phase: 'Hinge and recap', detail: 'Slide 17: the place-value table. × goes left, ÷ goes right — that is everything from today, and tomorrow we choose where to stop on the right. Slide 18: the part-1 checklist, 5 written panels. End period one here.' },
    { time: 'P2 · 0–12 min', phase: 'Round, and the words', detail: 'Show slide 17 again for a minute if the two periods are not on consecutive days. Slide 19: the scale says 82 g and is already rounding; copy ROUND. Slide 20: the instruction words — the most valuable slide in the deck; make them read all four rows aloud. Slide 21: copy SAME JOB, DIFFERENT WORDS. Slide 22: copy DEGREE OF ACCURACY.' },
    { time: 'P2 · 12–22 min', phase: 'The rule', detail: 'Slide 23: copy DECIMAL PLACES. Slide 24: copy THE RULE; the second number line is why "5 rounds up" — 4.55 is exactly halfway and the convention is up. Slide 25: four on whiteboards.' },
    { time: 'P2 · 22–30 min', phase: 'Keep the zero', detail: 'Slide 26: 34.9892 to 1 d.p. — everyone writes, nobody says it. Expect a split between 35 and 35.0. Slide 27: copy KEEP THE ZERO. Slide 28: four more, and d is 2.000 — three zeros, all of them needed.' },
    { time: 'P2 · 30–40 min', phase: 'One place further', detail: 'Slide 29: where do you stop dividing? Slide 30: left hand A (8.285), right hand B (8.286), all at once. Slide 31: the two methods side by side. Slide 32: copy ONE PLACE FURTHER, then 23 ÷ 9 on whiteboards.' },
    { time: 'P2 · 40–47 min', phase: 'Mistakes and word problems', detail: 'Slide 33: one number, five degrees of accuracy (this is reading, not arithmetic). Slide 34: Mr Bowen’s homework, pairs find the four mistakes. Slides 35–37: word problems; read 36 and 37 completely straight.' },
    { time: 'P2 · 47–50 min', phase: 'Close', detail: 'Slide 38: the part-2 checklist, 12 written panels in total. Slide 39: homework. Slide 40: exit question on whiteboards.' },
  ],
  answers: [
    { q: 'Slide 1 — starter', a: '10 has 1 zero, 100 has 2, 1000 has 3.' },
    { q: 'Slide 2 — how many zeros', a: '10 zeros. The number is 10¹⁰, ten thousand million.' },
    { q: 'Slide 6 — write it out', a: 'a 10000 · b 300000 · c 800.' },
    { q: 'Slide 8 — vote 1', a: 'B. 7.2 × 10³ = 7200. A (7.2000) is what "add three zeros" gives, and 7.2000 is just 7.2.' },
    { q: 'Slide 9 — PlaceShift sets', a: '7.2 × 10³ = 7200 · 6.5 × 10⁴ = 65000 · 48600 ÷ 10³ = 48.6 · 702 ÷ 10⁴ = 0.0702.' },
    { q: 'Slide 10 — multiplying', a: 'a 4300 · b 560000 · c 90000.' },
    { q: 'Slide 11 — dividing', a: 'a 70 · b 0.052 · c 0.006.' },
    { q: 'Slide 13 — the missing power', a: 'a 10⁴ (4 places left) · b 10⁴ (4 places right).' },
    { q: 'Slide 14 — the chain', a: '4 left, 2 right, 3 left = 5 left, so yes, it is × 10⁵. 5 × 10⁵ = 500000.' },
    { q: 'Slide 15 — mass', a: '4 kg = 4 × 10⁶ mg = 4000000 mg (kg to g to mg is two steps of 10³).' },
    { q: 'Slide 16 — distances', a: 'Moon 384400 km · Jupiter 628700000 km. 10⁸ beats 10⁵, so Jupiter, without writing a digit.' },
    { q: 'Slide 25 — round to 1 d.p.', a: 'a 6.3 · b 2.8 · c 14.9 · d 0.6.' },
    { q: 'Slides 26–27 — the strange one', a: '34.9892 to 1 d.p. = 35.0. The 9 carries, and the .0 is what shows one decimal place. Writing 35 loses the mark.' },
    { q: 'Slide 28 — 2 d.p. then 3 d.p.', a: 'a 5.37 · b 0.10 (keep the zero) · c 8.246 · d 2.000 (keep all three).' },
    { q: 'Slide 30 — vote 2', a: 'B. 58 ÷ 7 = 8.285714…, so to 3 d.p. it is 8.286. A stopped at three places and never looked at the fourth.' },
    { q: 'Slide 32 — one place further', a: '23 ÷ 9 = 2.5555…, which is 2.555 to 3 places, so 2.56 to 2 places.' },
    { q: 'Slide 33 — how exact', a: 'a 280 · b 283 · c 283.5 · d 283.46 · e 283.462.' },
    { q: 'Slide 34 — Mr Bowen’s homework', a: 'a 4600, not 4.6000 — the digits move · b 4.8, not 48 — that is 3 places, not 4 · c 10.0, not 9.10 — the 9 carries · d 2.74, not 2.75 — he rounded to 3 places first, then rounded again.' },
    { q: 'Slide 35 — word problems', a: '1: 0.00660 mm (the 6th decimal is 8, so the 5th rounds 9 up to 10 — and the final zero stays). 2: 2 kg = 2 × 10⁶ = 2000000 mg.' },
    { q: 'Slide 36 — the rice', a: '5 kg = 5 × 10⁶ = 5000000 mg. 5000000 ÷ 29 = 172413.79…, so about 172414 grains.' },
    { q: 'Slide 37 — the cat', a: '4.5 + 0.0283 = 4.5283 kg, which is 4.5 kg to 1 d.p. Rounding hid the fish.' },
    { q: 'Exit question', a: '6.5 × 10³ = 6500. 47.681 to 1 d.p. = 47.7.' },
  ],
  notes:
    'The notebook count is 12 written panels: power; powers of 10; multiplying moves left; dividing moves right; metric mass (5 in period one); then round; same job different words; degree of accuracy; decimal places; the rule; keep the zero; one place further (7 in period two). ' +
    'Split the deck after slide 18. Slide 17 recaps 3.1 in one picture and sets up 3.2, and slide 18 is the part-1 checklist, so period one ends on a count the students can check. ' +
    'The workbook’s key words are power and powers of 10 (3.1), and degree of accuracy and round (3.2). All four are copied. "Correct to" and "as far as" are not in the key-words box and are the two phrases most likely to lose marks, which is why slides 20–21 exist. ' +
    'Slide 9 is the deck’s one real widget. Do not let it run on its own — the class says "left" or "right" and counts the places before each press, or it becomes a screensaver. ' +
    'On slide 11, the answer to b is 0.052. Students who write 0.52 have moved three places, not four; send them back to the table on slide 17. ' +
    'Slide 24’s second number line is deliberate. "5 rounds up" is a convention, not a fact about which is nearer, and saying so once stops the "but it is exactly in the middle" question later. ' +
    'Workbook Q16 (the diagram of boxes that all simplify to 78) and Q17 (order of operations with powers) are not taught here and are fair Challenge work. Q12d is Marcus and Arun arguing about 58 ÷ 7; slides 29–32 are that question with the names taken off. ' +
    'Which Way?: a clicker’s Right arrow shows the answer, then moves on. Leave the game with the deck’s Back or Continue buttons.',
}

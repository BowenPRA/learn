// content/y7-math/U04_5/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes — Friday 16 October, the second decimal day',
  objective:
    'Students can write a decimal as an equivalent fraction (0.3 = 3/10, 0.07 = 7/100); multiply by a ' +
    'decimal by dividing by 10 or 100 first (250 × 0.2 = 25 × 2 = 50), and say that multiplying by a decimal ' +
    'less than 1 makes a number smaller; use "half of", "a quarter of" and "a tenth of" for × 0.5, × 0.25 ' +
    'and × 0.1; work out × 9 and × 11 from × 10 (3.8 × 9 = 38 − 3.8); and partition a decimal to multiply ' +
    'it in parts (4.3 × 6 = 24 + 1.8).',
  materials: [
    'Projector / TV for the lesson deck (EN / FR switch)',
    'Mini whiteboards + markers',
    'Student notebooks',
    'No calculators — the point of the lesson is that none are needed',
    'Workbook Unit 4, Section 4.5 (pp. 62–63), unspent — no number in the deck comes from it',
  ],
  vocab: [
    { term: 'Equivalent fraction', def: 'a fraction with the same value as the decimal: 0.3 = 3/10. The column of the last digit (tenths, hundredths) is the bottom number (French: fraction équivalente)' },
    { term: 'Equivalent', def: 'equal in value, written differently. Not "the same" — 0.5 and 1/2 look different and are worth the same' },
    { term: 'Half of / a quarter of / a tenth of', def: '× 0.5 / × 0.25 / × 0.1. "Of" in these phrases means ×; it is the English of every percentage and fraction question to come (French: la moitié de / le quart de / le dixième de)' },
    { term: 'Lots of', def: '"nine lots of 3.8" is 3.8 × 9. Used on slide 11' },
    { term: 'Partitioning', def: 'splitting a number into parts that are easy to work with: 4.3 = 4 + 0.3. Everyday English "partition" is a thin wall that splits a room — say so (French: décomposer)' },
  ],
  timeline: [
    { time: '0–5 min', phase: 'Starter', detail: 'Slide 1: 1.4 × 3 and 9.3 ÷ 3 recall Thursday; writing 0.3 and 0.07 as fractions looks ahead. Slide 2: check a and b, then ask "which column is the last digit in?" before showing the fractions.' },
    { time: '5–11 min', phase: 'Equivalent fractions', detail: 'Slide 3: copy EQUIVALENT FRACTION; say each decimal aloud ("three tenths") — the words give the fraction. Slide 4: four on whiteboards. c (1/2) and d (1/4) come back on slide 9.' },
    { time: '11–22 min', phase: 'Multiplying by a decimal', detail: 'Slide 5: left hand A (50), right hand B (500), all at once. Slide 6: the bar — ten tenths of 25, two of them are 50. Stop on "smaller": until now, every multiplication they have done made the number bigger. Slide 7: copy the rule. Slide 8: four on whiteboards, divide first.' },
    { time: '22–27 min', phase: 'Half, quarter, tenth', detail: 'Slide 9: read each row aloud; copy it. "Of" means × is the English point.' },
    { time: '27–35 min', phase: '× 9, × 11, partitioning', detail: 'Slide 10: thirty seconds in pairs, no columns. Slide 11: copy × 9 AND × 11. Slide 12: "partition" is a wall; copy PARTITIONING. Slide 13: four in their heads; d (12 × 0.9) is the stretch.' },
    { time: '35–41 min', phase: 'Make It Easy', detail: 'Slide 14: whiteboards show the easy way and the answer before Show. Aim for 10–12 cards. Leave with the deck’s Continue button.' },
    { time: '41–48 min', phase: 'Mistakes and word problems', detail: 'Slide 15: pairs find the four mistakes, one per method. Slide 16: two word problems. Slides 17–18: read completely straight.' },
    { time: '48–50 min', phase: 'Close', detail: 'Slide 19: checklist, 5 written panels. Slide 20: exit question in their heads.' },
  ],
  answers: [
    { q: 'Slide 1 — starter', a: '1.4 × 3 = 4.2 · 9.3 ÷ 3 = 3.1 · 0.3 = 3/10 · 0.07 = 7/100.' },
    { q: 'Slide 4 — fractions', a: 'a 9/10 · b 4/100 (= 1/25, not needed) · c 5/10 = 1/2 · d 25/100 = 1/4.' },
    { q: 'Slide 5 — the vote', a: 'A. 250 × 0.2 = 50: one tenth of 250 is 25, two tenths is 50. B (500) is 250 × 2.' },
    { q: 'Slide 8 — multiplying by a decimal', a: 'a 60 ÷ 10 × 4 = 24 · b 350 ÷ 10 × 3 = 105 · c 1500 ÷ 100 × 2 = 30 · d 800 ÷ 100 × 7 = 56.' },
    { q: 'Slide 10 — nine lots', a: '3.8 × 9 = 38 − 3.8 = 34.2.' },
    { q: 'Slide 13 — pick a quick way', a: 'a 6.2 × 9 = 62 − 6.2 = 55.8 · b 1.7 × 11 = 17 + 1.7 = 18.7 · c 5.3 × 4 = 20 + 1.2 = 21.2 · d 12 × 0.9 = 12 − 1.2 = 10.8 (0.9 is one tenth less than 1).' },
    { q: 'Slide 14 — Make It Easy', a: '86 × 0.5 = 43 · 120 × 0.25 = 30 · 73 × 0.1 = 7.3 · 40 × 0.3 = 12 · 600 × 0.02 = 12 · 4.5 × 9 = 40.5 · 2.7 × 11 = 29.7 · 250 × 0.04 = 10 · 6.4 × 0.5 = 3.2 · 5.1 × 4 = 20.4 · 90 × 0.7 = 63 · 7.9 × 3 = 24 − 0.3 = 23.7 · 1.8 × 9 = 16.2 · 36 × 0.25 = 9.' },
    { q: 'Slide 15 — Mr Bowen’s homework', a: 'a 80 × 0.3 = 24, not 240 (forgot ÷ 10) · b 46 × 0.5 = 23, not 92 (doubled instead of halved) · c 3.4 × 9 = 34 − 3.4 = 30.6, not 31 · d 5.2 × 6 = 30 + 1.2 = 31.2, not 30.12.' },
    { q: 'Slide 16 — word problems', a: '1: 750 × 0.2 = 150 g · 2: 2.15 × 9 = 21.50 − 2.15 = 19.35 dollars.' },
    { q: 'Slide 17 — the pizza', a: '0.5 + 0.25 + 0.125 = 0.875 eaten; 0.125 (one eighth, one slice of the eight in the photo) is left.' },
    { q: 'Slide 18 — rocks and feathers', a: '2 × 0.25 = 0.5 kg. The same as the rocks.' },
    { q: 'Exit question', a: '120 × 0.25 = 120 ÷ 4 = 30 · 4.5 × 9 = 45 − 4.5 = 40.5.' },
  ],
  notes:
    'The notebook count is 5 written panels: equivalent fraction; multiplying by a decimal; half, quarter, tenth; × 9 and × 11; partitioning. ' +
    'The Workbook’s key words are equivalent fraction, partitioning and place value. Place value is not copied again — it was Unit 3 — but slide 3’s diagram is a place-value table read sideways. ' +
    'The big idea is slide 6. If only one thing survives the lesson, it should be that × 0.2 makes 250 smaller. It is also the first time the class multiplies BY a decimal rather than multiplying a decimal by a whole number. ' +
    'Slide 11 writes 3.8 × (10 − 1) with brackets because the Workbook does (4.5 Q5); the class met brackets in 2.4. ' +
    'Make It Easy: a clicker’s Right arrow shows, then moves on. Two cards (5.1 × 4 and 7.9 × 3) need partitioning or "nearly 8"; let the class argue about the easiest way — any correct easy way counts.',
}

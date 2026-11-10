// content/y7-math/U02_2/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective:
    'Students can substitute a number in place of a letter and state the value; know that 3n with n = 4 is 12 and never 34, because the multiplication sign was only ever hidden; ' +
    'keep the order of operations after substituting, so that 3x + 2 with x = 4 is 14 and not 18; ' +
    'know Cambridge\'s definition of a formula — a rule connecting two or more quantities, written with letters, and having an = sign — and can say how that differs from 2.1\'s expression; ' +
    'can substitute into a formula with two letters, such as A = lw and P = 2l + 2w; ' +
    'can carry a minus sign into an expression with the number it belongs to, writing 2 × (−3) rather than 2 × 3; ' +
    'can write a simple formula of their own from a described situation and then use it; ' +
    'and can recognise that a formula stops being true when the situation it describes stops being true.',
  materials: [
    'Projector / TV for the lesson deck',
    'Mini whiteboards + markers (one per pair)',
    'Student notebooks',
    'Workbook Unit 2, Section 2.2 for the homework',
    'Optional, for slide 15: the kettle or hotplate from yesterday\'s Science 2.2 lesson, and a thermometer',
  ],
  vocab: [
    { term: 'Substitute', def: 'the section\'s first key word, and a word this class already owns from football — a substitute comes on, a player goes off, the position is unchanged. Put a number in place of a letter (Vietnamese: thay số)' },
    { term: 'Value', def: 'the number you are left with after substituting. The book asks for "the value of the expression", and a student who does not know the word does not know what is being asked for' },
    { term: 'Formula / formulae', def: 'a rule connecting two or more quantities, written with letters, WITH an = sign. The plural is irregular and worth saying out loud twice — formulae, not formulas (Vietnamese: công thức)' },
    { term: 'Order of operations', def: 'the same rule as 2.1, now doing real damage: × and ÷ before + and −, whether or not a letter has just been replaced by a number' },
    { term: 'Length · width · area · perimeter', def: 'needed for slides 10 and 11. Area is lw, perimeter is 2l + 2w. The class knows these shapes from primary; it is only the letters that are new' },
    { term: 'Boil · thermometer · degrees Celsius', def: 'borrowed from Science 2.2, which this class had yesterday. Say them out loud; they carry the maths on slide 15 for free' },
  ],
  timeline: [
    { time: '0–4 min', phase: 'Starter', detail: 'Title slide. The cup from 2.1: c ml, drink 50, and now c = 320. Thirty seconds on whiteboards. Almost everybody gets 270, and that is the design — the lesson opens with the class succeeding at the exact thing they were told last week they could not do.' },
    { time: '4–9 min', phase: 'The row finishes', detail: 'Slide 2. Say plainly that NOTHING about last lesson was wrong: c − 50 was a finished answer then and it still is. The only new thing is that somebody has told us c. Do not let this become "so last lesson was pointless" — the whole of 2.2 depends on 2.1 having landed.' },
    { time: '9–14 min', phase: 'Name it', detail: 'Slide 3. FIRST panel — substitute and value together. Use the football substitution out loud; this class knows the word already and knowing it in English is half the section. Say the second half twice: the PLACE does not change, only what is standing in it.' },
    { time: '14–22 min', phase: 'THE WALL', detail: 'Slide 4, the invisible times sign. This is the sticking point of the whole section and it is 2.1\'s own fault: we taught them to write 3n instead of 3 × n, and now a student reads 3n with n = 4 as two digits pushed together and writes 34, completely confident. Put the × back in on the board, out loud, three times. Then slide 5 drills it on four quick ones. Watch for 45 on part b and correct it on the spot.' },
    { time: '22–30 min', phase: 'The order does not switch off', detail: 'Slide 6 is QUESTION ONLY — 14 against 18, everyone votes at once — left hand up for A, right hand up for B — and write the split on the board before anybody explains. The disagreement is worth more than the answer handed over. Slide 7 settles it, SECOND panel. Slide 8 is three to try; insist on the middle line, because that line is where the marks are and where you can see the error.' },
    { time: '30–38 min', phase: 'Formula', detail: 'Slide 9, THIRD panel — Cambridge\'s own sentence, and the explicit contrast with 2.1: an expression has NO = sign, a formula HAS one. Say "formulae" twice. Slide 10 is A = lw, FOURTH panel: two letters means substitute twice, and lw still means l × w. Slide 11 is four substitutions across two formulae.' },
    { time: '38–44 min', phase: 'The minus sign travels', detail: 'Slide 12 QUESTION ONLY: −1 against 11. Both are things this class will genuinely write. Slide 13 settles it, FIFTH panel. Point out that the arithmetic is 5 + 6 and nobody here finds that hard — the only difficulty is getting the sign into the expression in one piece, which is what the brackets are for.' },
    { time: '44–50 min', phase: 'Build one, then break one', detail: 'Slide 14, the taxi: write the formula, SIXTH and SEVENTH panels are here and on slide 13 respectively — check the count. Slide 15 is the boiling water, and it is the slide to protect if you are behind on anything else. Then the six-point checklist and the copy-count: 7 panels. Set Workbook 2.2. Exit question: s = 4t + 1, find s when t = 6.' },
  ],
  answers: [
    { q: 'Starter — the cup, with c = 320', a: '270 ml. Everybody should get this. If a student writes 320 − 50 and stops, they have not done anything wrong — praise it, then ask them for the number.' },
    { q: 'Slide 5 — four to substitute, n = 5', a: 'a: 12 · b: 20 · c: −4 · d: 1. Part b is the one to watch: 4n is 4 × 5 = 20, never 45. Part c going below zero is Unit 1 work and is allowed.' },
    { q: 'Slide 6 — 3x + 2 when x = 4', a: '14. The 18 comes from reading left to right: 4 + 2 = 6, then 6 × 3 = 18. Do not reveal this on slide 6 — take the hand vote first (left hand 14, right hand 18).' },
    { q: 'Slide 8 — three to try', a: 'a: 5 × 4 − 3 = 17 · b: 20 − 3 × 6 = 20 − 18 = 2 · c: 10 ÷ 2 + 8 = 13. Part b is the one to slow down on: the multiplication is written second and still happens first. 20 − 3n is not 17n.' },
    { q: 'Slide 10 — A = lw with l = 7, w = 4', a: '28 cm². Two letters, so two substitutions, and lw still means l × w.' },
    { q: 'Slide 11 — use the formula', a: 'a: P = 18 + 10 = 28 · b: P = 24 + 6 = 30 · c: T = 20 − 6 = 14. Every one has a multiplication that must happen before the + or −.' },
    { q: 'Slide 12 — 5 − 2n when n = −3', a: '11. The −1 comes from substituting 3 and leaving the minus sign behind: 5 − 2 × 3 = −1. Both answers will be in the room; take the hand vote before settling it (left hand −1, right hand 11).' },
    { q: 'Slide 13 — the working', a: '2n = 2 × (−3) = −6, so 5 − 2n = 5 − (−6) = 5 + 6 = 11. Insist on the brackets at the substitution step. That habit is the whole fix.' },
    { q: 'Slide 14 — the taxi', a: 'a: C = 15 + 9k · b: C = 15 + 9 × 6 = 69, so 69 thousand dong. The 15 is paid once so it carries no letter; the 9 is paid every kilometre so it is multiplied by k. Ask what C and k represent — that is the 2.1 habit and it is marked in this exercise too.' },
    { q: 'Slide 15 — the boiling water, T = 24 + 3m', a: 'a: 24 + 36 = 60 °C · b: 24 + 75 = 99 °C · c: No. Water boils at 100 °C and stops. The arithmetic in part c is perfect and the answer is still wrong, because the formula describes a situation that has ended. If a student says the water would have boiled away, agree with them — they are right and they have made the point for you.' },
    { q: 'Exit question — s = 4t + 1, find s when t = 6', a: '25. A student who writes 46 + 1 = 47 has made today\'s headline mistake, and it is worth catching on the way out of the door.' },
  ],
  notes:
    'THE DECK OPENS BY PAYING OFF 2.1, DELIBERATELY. Last lesson\'s hardest sell was that c − 50 is a finished answer and stopping there is allowed. Slide 2 hands the class c = 320 and the row finishes. Say clearly that nothing about last lesson was wrong — the only new thing is that somebody has now told us c. A class that hears "so last week was pointless" has lost both lessons. ' +
    'THE WALL IS SLIDE 4, AND WE BUILT IT OURSELVES. In 2.1 we taught them to write 3 × n as 3n. The bill arrives today: 3n with n = 4 is read as two digits pushed together and answered 34, with total confidence, by students whose arithmetic is fine. This is a reading error, not a maths error, exactly like every obstacle in Unit 2. Put the × back in on the board every single time you substitute today, and make them write the middle line. ' +
    'TWO SLIDES ARE QUESTION-ONLY — 6 and 12 — and neither has an answer anywhere on it. Both are built as a disagreement between two answers the class will genuinely produce (14 against 18; −1 against 11). Take the vote with one hand each — left for A, right for B — write the split on the board, and only then move on. A room that is split down the middle is paying attention in a way a room being told the answer is not. ' +
    'THE MIDDLE LINE IS THE WHOLE ROUTINE. Substitute, write the line with the numbers and the × signs back in, THEN work it out. Every predictable error today is invisible in a final answer and obvious in that middle line: 34 for 3n, 18 for 3x + 2, −1 for 5 − 2n. Insist on it in class and set it as the homework instruction. ' +
    'SLIDE 15 IS THE ONE TO PROTECT. A formula that gives a perfect answer to an impossible question is rare in a maths lesson, and it is the honest thing to teach: a formula is a rule about a situation, and when the situation ends the formula ends with it. It also lands the day after Science 2.2 taught this class that water boils at 100 °C and stays there, so the science is already in the room. If you are behind, cut the second and third parts of slide 11 rather than this. ' +
    'THE PREDICTABLE ERRORS, in the order they appear: writing 34 for 3n when n = 4; writing 45 for 4n when n = 5; adding before multiplying and getting 18; forgetting that 20 − 3n multiplies first; substituting only one of two letters in A = lw; and dropping the minus sign so that 5 − 2n with n = −3 comes out as −1. Every one has a slide pointed at it. ' +
    'PAGE NUMBERS ARE NOT PRINTED HERE ON PURPOSE. Section 2.1 ran to page 23 with Exercise 2.1 finishing on page 24, so 2.2 begins on 24 — but the exact span was not to hand when this deck was written. Check the book before you set the homework and write the range on the board. ' +
    'Anything students must copy is in an orange "Write This Down" panel; everything else is discussion. Seven panels, which is one fewer than 2.1 and still a lot for one period, which is why the recap asks them to count. ' +
    'This deck has no photographs — all eight figures are authored SVG in diagrams.js, so there is no images/CREDITS.json for 2.2. Substituting has no real-world object to photograph, and a decorative stock picture on a projector is one more thing between the class and the sentence.',
}

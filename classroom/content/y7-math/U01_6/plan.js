// content/y7-math/U01_6/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective:
    'Students can square and cube a number and read the notation out loud, can find a square root and a cube root from the two lists in their notebook, ' +
    'know that squaring and square rooting undo each other — and that cubing and cube rooting are the same idea one dimension up, not a second thing to memorise — ' +
    'can trap a root that is not whole between two consecutive whole numbers, and can use the word "consecutive" correctly, which Exercise 1.6 assumes without explaining.',
  materials: [
    'Projector / TV for the lesson deck',
    'Mini whiteboards + markers (one per pair)',
    'Student notebooks',
    'Learner’s Book Section 1.6 (pages 17–19) for the homework',
  ],
  vocab: [
    { term: 'Square number', def: 'a number multiplied by itself. 5 squared, written 5², is 25 (Vietnamese: số chính phương)' },
    { term: 'Square root', def: 'the number that was multiplied by itself. The square root of 225 is 15 (Vietnamese: căn bậc hai)' },
    { term: 'Cube number', def: 'a number multiplied by itself twice. 2 cubed, written 2³, is 8 (Vietnamese: số lập phương)' },
    { term: 'Cube root', def: 'the number that was multiplied by itself twice. The cube root of 125 is 5 (Vietnamese: căn bậc ba)' },
    { term: 'Consecutive', def: 'one after another with nothing missed out. The book\'s fifth key word, and the one the exercise uses without ever defining' },
    { term: 'Squared / cubed', def: 'the spoken forms. Students who only ever see the notation cannot answer a question read aloud, so drill saying them' },
  ],
  timeline: [
    { time: '0–4 min', phase: 'Starter', detail: 'Title slide. 7 × 7 and 2 × 2 × 2 on whiteboards. Both answers, 49 and 8, are on the two lists they are about to copy — point that out when the lists arrive.' },
    { time: '4–8 min', phase: 'The hook', detail: 'Slide 2, QUESTION ONLY: 225 paving stones in a perfect square, how many along one side? One number per whiteboard, guesses only. Note the guesses on the board. Do NOT work it out — the class has no tool for it yet, which is the point. It is paid off on slide 9.' },
    { time: '8–13 min', phase: 'Squares, from the shape', detail: 'Slide 3: the chessboard, 8 × 8 = 64, before the word "square number" exists. Then slide 4 defines it and slide 5 is the list of twelve. Both copied. Give them a full minute to write the twelve — it is the tool for the rest of the lesson and for the homework.' },
    { time: '13–16 min', phase: 'The one that costs marks', detail: 'Slide 6: 5² against 5 × 2. Ask for the answer out loud before opening the reveal. Every year some of the class reads the small 2 as "times two", and it is much cheaper to catch here than in the exercise.' },
    { time: '16–24 min', phase: 'Backwards — the square root', detail: 'Slide 7 turns the question round: ? × ? = 225. Slide 8 names it and draws the there-and-back picture; copied. Say the English out loud: a root is where something came from, like the root of a plant. Then slide 9 is the payoff — the patio really is 15 by 15. Ask whose guess was closest.' },
    { time: '24–33 min', phase: 'Cubes — the same journey again', detail: 'Slides 10 to 13 run in exactly the same order as slides 3 to 8: sugar cubes first, then the definition, then the short list, then the cube root. Say explicitly that this is the same idea with one more direction, so it lands as familiar rather than as a fifth thing to learn. Three copy-down panels here.' },
    { time: '33–37 min', phase: 'Worked example widget', detail: 'Slide 14, the book\'s own Worked example 1.6. Five lines, one per press. Everyone works each line on paper first. The last line, 5 − 7 = −2, is the one to slow down on — the class will not expect a root question to have a negative answer.' },
    { time: '37–40 min', phase: 'Consecutive', detail: 'Slide 15. Copied. Consecutive numbers are obvious; consecutive SQUARE numbers is the bit they get wrong, because 25 and 36 are consecutive squares while being 11 apart. Exercise questions 14 and 15 are unanswerable without this.' },
    { time: '40–47 min', phase: 'Problems', detail: 'Trap the root (√45 between 6 and 7) · Mr Bowen\'s number (144) · 64 on both lists. Then the two word problems: the cube watermelons and the bathroom wall. If you are behind, drop the bathroom wall — it is the hardest and the least necessary.' },
    { time: '47–50 min', phase: 'Recap + homework', detail: 'Four-point checklist and the copy-count: 5 key words, 2 lists. Set Section 1.6, pages 17–19. Exit question: √81 + ∛8, which is 9 + 2 = 11.' },
  ],
  answers: [
    { q: 'Starter — 7 × 7 and 2 × 2 × 2', a: '49 and 8. Both appear again on the lists the class copies later in the lesson.' },
    { q: 'Hook — 225 stones in a perfect square, how many along one side?', a: '15, because 15 × 15 = 225. Do not reveal this before slide 9.' },
    { q: 'Slide 3 — how many squares on a chessboard?', a: '64, from 8 × 8. The answer matters less than the method: they multiplied the side by itself without being told to.' },
    { q: 'Slide 6 — which one is 5²?', a: '5 × 5 = 25. The other is 5 × 2 = 10, which is five doubled. The small 2 counts the fives.' },
    { q: 'Slide 10 — sugar cubes, 4 along each edge', a: '4 × 4 × 4 = 64. Worth noticing out loud that 64 has now appeared as a square number and as a cube number — slide 18 comes back to it.' },
    { q: 'Widget — the book\'s Worked example 1.6', a: '5 × 5 × 5 = 125 so the cube root of 125 is 5. 7 × 7 = 49 so the square root of 49 is 7. Then 5 − 7 = −2.' },
    { q: 'Problem 1 — which two whole numbers is √45 between?', a: '6 and 7. 36 < 45 < 49, and the squares either side have roots 6 and 7. (√45 is about 6.7, but the class is not asked for that.)' },
    { q: 'Problem 2 — Mr Bowen\'s number', a: '144. The square numbers between 100 and 200 are 121, 144, 169 and 196; their roots are 11, 12, 13 and 14, and only 12 is a multiple of 3.' },
    { q: 'Problem 3 — why is 64 on both lists?', a: '8 × 8 = 64 and 4 × 4 × 4 = 64. So the square root of 64 is 8 and the cube root of 64 is 4. If anyone asks for another such number, it is 729 = 27² = 9³ — that is Exercise 1.6 Q16b, so do not give it away.' },
    { q: 'Problem 4 — the cube watermelons', a: '3 × 3 × 3 = 27. The melons are genuine: Japanese growers raise them inside glass boxes so they stack. Read the slide completely straight and do not explain the joke.' },
    { q: 'Problem 5 — the bathroom wall', a: '24 tiles, because 24 × 24 = 576. 576 is past the twelve they copied, so they trap it: 20² = 400 and 25² = 625, so the side is between 20 and 25, and 24² = 576.' },
    { q: 'Exit question — √81 + ∛8', a: '9 + 2 = 11.' },
  ],
  notes:
    'THIS DECK IS DELIBERATELY THIN. 1.5 had to supply nine divisibility rules the book left out, so it ran dense. This section is the opposite — five key words, two short lists, and one idea taught twice — and the deck was built to match: one picture, two or three lines, at most one copy-down panel per slide. Resist adding to it in the room; the spare minutes belong to the class writing the two lists properly. ' +
    'THE SPINE IS "THERE AND BACK". Squaring goes out, square rooting comes back. Cubing goes out, cube rooting comes back. Slides 8 and 13 are the same drawing with different numbers on purpose, so say out loud on slide 13 that they have already seen this picture. If cube roots arrive as a separate rule, the lesson has twice as much in it as it needs. ' +
    'DO NOT SOLVE THE PATIO EARLY. Slide 2 is posed before the class has any tool for it, and the gap between their guess and 15 is what makes slide 9 land. Write the guesses on the board so they can be compared afterwards. ' +
    'THE TWO LISTS ARE THE LESSON\'S REAL OUTPUT. A student who leaves with the twelve squares and the six cubes written down can do most of Exercise 1.6; a student who leaves without them cannot start it. Give real time to slides 5 and 12 and walk the room. ' +
    'THE PREDICTABLE ERROR is reading 5² as 5 × 2. Slide 6 exists only for that, and it is worth asking two or three students to say "five squared, which is five times five" out loud. The second most common error is assuming a square root question always has a whole-number answer — slide 16 and Exercise 1.6 Q8 and Q9 both push back on that. ' +
    'CONSECUTIVE is the book\'s key word that looks like the least important and is not. Exercise 1.6 Q14 and Q15 both hinge on "consecutive square numbers" and "consecutive cube numbers", and a student who reads consecutive as "one apart" will answer 325 instead of 361. ' +
    'THE NEGATIVE ANSWER in the widget connects back to 1.1. Do not rush the last line: the class will have decided that a question about roots cannot produce a negative, and 5 − 7 = −2 is a useful surprise. ' +
    'The cube watermelons on slide 19 are the deadpan one. They are real. Read it straight. ' +
    'Anything students must copy is in an orange "Write This Down" panel; everything else is discussion. ' +
    'Image sources and licences are in content/y7-math/U01_6/images/CREDITS.json — all three openly licensed (CC0, CC BY-SA 4.0 and CC BY 2.0).',
}

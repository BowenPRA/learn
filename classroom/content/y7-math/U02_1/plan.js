// content/y7-math/U02_1/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective:
    'Students can choose a letter to represent a number they do not know and say what it represents; can leave an expression such as c − 50 unfinished without believing they have made a mistake; ' +
    'know Cambridge\'s definition of an expression, including that it has no = sign; can write 3 × s as 3s, a × b as ab and s ÷ 2 as s over 2; ' +
    'can turn more than, less than, times as much, half as much, total and difference into +, −, × and ÷; ' +
    'and can handle the three pieces of English that decide the marks in Exercise 2.1 — that "h less than t" is written t − h, that "subtract 4" and "subtract from 4" give opposite answers, ' +
    'and that "subtract the result from 25" is 25 − 3n, which needs the order of operations and the flip at the same time.',
  materials: [
    'Projector / TV for the lesson deck',
    'Mini whiteboards + markers (one per pair)',
    'Student notebooks',
    'Workbook Unit 2, Section 2.1 (pages 20–23) for the homework',
    'Optional, for the opening: a glass of water, and the sealed syringe from the Science 2.1 practical',
  ],
  vocab: [
    { term: 'Expression', def: 'the section\'s only margin key word. Cambridge\'s wording: a statement that contains letters and sometimes numbers, but has no = sign. For example n + 7, 4m, x + 2 (Vietnamese: biểu thức)' },
    { term: 'Represent', def: 'the book\'s own verb, and the one Q10 marks them on — "make sure you write what your letters represent". Use it rather than "stands for", every time' },
    { term: 'Total / difference', def: 'add them / subtract them. Q13 uses both words without ever defining either, and a student who reads "difference" as "the answer" loses the mark' },
    { term: 'Times as much / half as much', def: 'multiply / divide by 2. The book alternates "as many" (things you count) with "as much" (amounts); both mean the same operation' },
    { term: 'Subtract from', def: 'the preposition that flips the order. "Subtract 4" is 5x − 4; "subtract from 4" is 4 − 5x. Exercise 2.1 Q9 is built entirely on it' },
    { term: 'The result', def: 'Q7f says "multiply the number by 3, then subtract the result from 25". "The result" means the 3n you just built — naming it out loud is what makes 25 − 3n obvious' },
    { term: 'Order of operations', def: 'the workbook flags it in two separate Tips and explains it in neither: × and ÷ happen before + and −, in algebra exactly as in arithmetic' },
    { term: 'Particle · dissolve · compress', def: 'borrowed from Science 2.1 and carrying the maths. Say them out loud — this class already owns these words, and they make the letter concrete' },
  ],
  timeline: [
    { time: '0–4 min', phase: 'Starter', detail: 'Title slide. "How many particles in one drop of water?" — 30 seconds on whiteboards. Expect blanks, shrugs and a few wild guesses. Do not correct anyone; the blank board is the point and slide 2 pays it off.' },
    { time: '4–9 min', phase: 'The hook (science bridge)', detail: 'Slide 2, QUESTION ONLY. Say plainly: nobody wrote a number, and that is not a Science failure — the particles are really there and there really is a number. Then ask the question the lesson answers: how do we write about a number nobody can count? Let pairs sit in it for two minutes. Do NOT hand them the letter.' },
    { time: '9–13 min', phase: 'Name it', detail: 'Slide 3: let n be that number. FIRST copy-down panel. Use the book\'s verb — n REPRESENTS the number of particles — and say the second half twice: n is the number of particles, not a particle. Students who read n as "a particle" write nonsense for the rest of the unit.' },
    { time: '13–20 min', phase: 'THE WALL', detail: 'Slide 4, the coffee table. The two known rows finish; the third does not. This is the sticking point of the whole section: students believe an answer must be a single number, so they either invent one or leave it blank. Say explicitly, more than once: "c − 50 is the finished answer. You are allowed to stop." Slide 5 then names it — SECOND panel, Cambridge\'s exact sentence including "no = sign" — and slide 6 checks it (A, C, D).' },
    { time: '20–25 min', phase: 'Notation', detail: 'Slide 7. THIRD panel. The workbook states this only in a Tip and then assumes it from page 21 onwards, so it gets a slide here: 3s means 3 × s, ab means a × b, s over 2 means s ÷ 2, and the number always goes in front. Open the reveal and do the four quick ones. Q11d and Q12d in the homework are unanswerable without this.' },
    { time: '25–33 min', phase: 'The four phrases', detail: 'Slide 8 is QUESTION ONLY — two grams more than Mr Bowen, on whiteboards, before any list exists. Slide 9 is the list, FOURTH panel; point at the salt as you say it, because dissolved salt is still s grams and that is exactly what a letter is. Slide 10 drills it on four beakers. Slide 11 adds total and difference, FIFTH panel. Watch for w5 instead of 5w and correct on the spot.' },
    { time: '33–39 min', phase: 'The order flips', detail: 'Slide 12 QUESTION ONLY: h − t or t − h? Take a show of hands and write the split on the board — the disagreement is worth more than the answer handed over. Slide 13 settles it with NUMBERS first ("5 less than 12 is 7", which nobody disputes) and only then with letters. SIXTH panel. Slide 14 drills three.' },
    { time: '39–46 min', phase: 'Subtract from, and the result', detail: 'Slide 15 QUESTION ONLY: read A and B aloud, ask whether one word can change the answer. Slide 16 shows 6 against −6 — SEVENTH panel. Slide 17 is Q7f, EIGHTH panel: build 3n first and name it "the result", then the sentence reads itself. Slide 18 is Marcus (Q9) and slide 19 runs the translation backwards, which nothing else in the deck rehearses. THIS IS THE SECTION TO PROTECT.' },
    { time: '46–50 min', phase: 'Problems, recap + homework', detail: 'Syringe and ice cubes if the time is there. Then the six-point checklist and the copy-count: 8 panels. Set Workbook 2.1, pages 20–23 — note that Exercise 2.1 runs to Q14, not Q12. Exit question: a beaker holds p ml, pour out 60, which is p − 60.' },
  ],
  answers: [
    { q: 'Starter / hook — how many particles in one drop of water?', a: 'Unknowable in class, and that is the correct answer. (For your own back pocket: about 1.7 × 10^21 molecules in a 0.05 ml drop. Do not put that on the board — it replaces one uncountable thing with another and kills the slide.)' },
    { q: 'Slide 4 — drink 50 ml from each cup', a: '200 − 50 = 150 · 300 − 50 = 250 · c − 50, which stays as c − 50. The third one is the whole section.' },
    { q: 'Slide 6 — which are expressions?', a: 'A (4m), C (x + 2) and D (n − 3). B is 7 + 2 = 9 — it has an = sign and no letter. E is y = 5x — it has an = sign, which makes it a formula, not an expression. (Formula is the key word of 2.2; naming it here is fine but do not dwell.)' },
    { q: 'Slide 7 reveal — write the short way', a: 'a: 7k · b: mn · c: 4ab · d: p over 3. Accept p ÷ 3 today, but show the fraction, because the workbook writes it that way.' },
    { q: 'Slide 8 — two grams more than Mr Bowen', a: 's + 2. Posed before the list of phrases exists, so expect some blanks; that is fine and intended.' },
    { q: 'Slide 10 — the four beakers', a: 'a: w + 30 · b: 5w · c: w − 40 · d: w over 2. The predictable error is w5 for part b — the number goes in front, always.' },
    { q: 'Slide 11 reveal — three large and five small beakers', a: '3a + 5b. Two sizes, two letters. A student who writes 8ab has merged two different quantities into one.' },
    { q: 'Slide 12 — h less than t', a: 't − h. Check it with numbers if anyone resists: 5 less than 12 is 12 − 5 = 7, not 5 − 12 = −7.' },
    { q: 'Slide 14 — three to try', a: 'a: m − 9 · b: f + d · c: 6q + p. Part c is the one to slow down on — build "six times q" as 6q first, then add p. It is the shape of Challenge Q11c.' },
    { q: 'Slides 15/16 — subtract 4 against subtract from 4', a: '5x − 4 and 4 − 5x. With x = 2 they give 10 − 4 = 6 and 4 − 10 = −6. Opposite signs, from one word.' },
    { q: 'Slide 17 — multiply n by 3, then subtract the result from 25', a: '25 − 3n. Two traps at once: the multiplication happens first (so it is 3n, not 3 × something later), and "from 25" means you start at 25. Not 3n − 25.' },
    { q: 'Slide 18 — is Marcus right?', a: 'No. His description, "multiply x by 5 then subtract 5", is 5x − 5. The expression 5 − 5x starts at 5, so the description needs "subtract FROM 5". This is Exercise 2.1 Q9 and is worth the time.' },
    { q: 'Slide 19 — describe these expressions in words', a: 'a: add 5 to w (or "5 more than w") · b: multiply k by 6 · c: subtract y FROM 8 — a student who writes "8 less than y" has it backwards · d: multiply p by q, then multiply by 4. Part c is the whole point of the slide.' },
    { q: 'Problem 1 — the sealed syringe', a: 'a: v over 2 · b: v over 2 − 20. Tie it back to Science 2.1: a gas compresses because its particles are far apart; a liquid does not, so with water in the syringe neither answer would exist.' },
    { q: 'Problem 2 — the ice cube incident', a: 'a: n + 3 · b: zero. They melted. Read it completely straight and do not explain the joke. If a student objects that the water is still there, agree with them warmly — that is conservation of mass from Science, and they are right about the water and wrong about the ice cubes.' },
    { q: 'Exit question — a beaker holds p ml, pour out 60', a: 'p − 60.' },
  ],
  notes:
    'THE DECK RUNS ON THE SCIENCE UNIT, DELIBERATELY. Science 2.1 left this class holding a quantity that is unarguably real and unarguably uncountable — the number of particles — which is the cleanest door into algebra they will ever be offered. Slide 2 walks through it, and salt (slide 9), beakers (slide 11) and the sealed syringe (slide 20) keep it open. Say "particle", "dissolve" and "compress" out loud: this class owns those words in English already, so they carry the maths for free. ' +
    'THE VOCABULARY IS THE WORKBOOK\'S. Slide 5 is Cambridge\'s own sentence, including the "no = sign" clause. The verb is REPRESENT throughout, because Q10 marks them on writing what their letters represent — say "represents", not "stands for". Total and difference are Q13\'s words. The notation slide is the book\'s two Tips promoted to a slide, because Q11d (three times a multiplied by b) and Q12d (7pq) cannot be answered without them. ' +
    'THE WALL IS SLIDE 4. The obstacle is never "what does c mean". It is that c − 50 does not equal anything, so students assume they have failed and either invent a number or leave it blank. A class that believes slide 4 can do the whole of Unit 2; a class that does not will fight every exercise in it. Give it the full seven minutes even if that costs you a word problem. ' +
    'FOUR SLIDES ARE QUESTION-ONLY — 2, 8, 12 and 15 — and none has an answer anywhere on it. Take the guesses, write the split on the board where it is a show of hands, and only then move on. On slide 12 the disagreement between h − t and t − h is worth more than the correct answer handed over. ' +
    'IF YOU ARE BEHIND, CUT IN THIS ORDER: the ice cubes (slide 21), then the syringe (slide 20), then total and difference (slide 11). Do NOT cut slides 15 to 19. Those five contain no new arithmetic at all and are exactly where Exercise 2.1 Q7f, Q9, Q11 and Q12 are won — this class can do the algebra and still lose those marks on the reading. ' +
    'SLIDE 19 IS THE ONE PEOPLE SKIP. Running the translation backwards — expression into English — is Challenge Q12, and it is the only slide in the deck that rehearses it. Part c (8 − y) is the payoff: a student who writes "8 less than y" has just proved they learned the pattern rather than the language. ' +
    'THE PREDICTABLE ERRORS, in the order they appear: reading n as "a particle" rather than "the number of particles"; leaving c − 50 blank; writing w5 instead of 5w; writing h − t; describing 5 − 5x as "multiply by 5 then subtract 5"; and answering 3n − 25 for Q7f. Every one is a reading error, not a maths error, and every one has a slide pointed at it. ' +
    'EXERCISE 2.1 RUNS TO Q14, NOT Q12. Q13 (two pieces of wood, total and difference) and Q14 (p + q = −2, pq = −8) are on page 24, above the 2.2 heading, and are easy to miss. Q14 needs negative-number work from Unit 1.2 and is a genuine stretch — set it, but do not expect it back from everyone. ' +
    'Anything students must copy is in an orange "Write This Down" panel; everything else is discussion. Eight panels is a lot for one period, which is why the recap asks them to count. ' +
    'This deck has no photographs — all eight figures are authored SVG in diagrams.js, so there is no images/CREDITS.json for 2.1. Expressions have no real-world object to photograph, and a decorative stock picture on a projector is one more thing between the class and the sentence.',
}

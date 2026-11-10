// content/y7-math/T02_girl-math/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective:
    'Students can read a sharing problem written in words and write every share as an expression in one letter: n for the smallest share, 2n for "twice as many", 3n for "three times as many", n + 3 for "3 more than" and n − 3 for "3 fewer than"; '
    + 'can add all the shares together and set the sum equal to the total; '
    + 'can tidy that equation, move the loose numbers across the = sign, and solve it down to n; '
    + 'can substitute n back to get every share, and check by adding the shares up to the original total; '
    + 'and can do all of this at speed, under a clock, for problems with up to eight shares and four rules.',
  materials: [
    'Projector / TV for the lesson deck',
    'Mini whiteboards + markers — one per student if possible, otherwise one per pair',
    'Student notebooks for the three orange panels',
    'A packet of rice paper on the desk, if you have one. It costs nothing and it lands.',
    'Nothing to print. The game keeps its own score.',
  ],
  vocab: [
    { term: 'Twice as many as · three times as many as', def: 'the phrase that becomes 2n, or 3n. Say it, then ask "so how many n altogether?" — the answer is always one MORE than the number in the phrase, and that is the mistake' },
    { term: 'More than · fewer than', def: 'the second phrase, and the one that costs the most. "Nam gets 3 more than Su" is n + 3, not 3. Drill the difference between "3 more than Su" and "3 times Su" out loud; in Vietnamese they are not similar and in English they are' },
    { term: 'The same as', def: 'quietly the easiest and quietly missed — it is simply another n' },
    { term: 'Share · altogether · each · left over', def: 'the four question words. "Altogether" is the total to divide up; "each" is what the question wants back' },
    { term: 'Box · n · expression · solve', def: 'we say box, not bar. n is just the name of the box, and an expression is what we already met in 2.1 and 2.2. "Solve" is new: it means work backwards until only n is left on one side' },
    { term: 'Roll (the prize) · bánh tráng', def: 'the answers are counted in PIECES and the prizes in ROLLS, deliberately, so the two numbers can never be confused on the board' },
  ],
  timeline: [
    { time: '0–5 min', phase: 'Starter', detail: 'Title slide. 10 pieces, Lily gets four times as many as Ana. Sixty seconds on whiteboards. Answer: Ana 2, Lily 8. Expect several answers of "Ana 10, Lily 40" and several of "2.5" — both are readings of the sentence, not arithmetic failures, and both are the reason for the next two slides.' },
    { time: '5–13 min', phase: 'Twice as many', detail: 'Slide 2, FIRST panel. Draw the boxes on the board yourself, THEN write n inside the first one — the letter has to arrive as the box\'s name, not as a new idea. The sentence to repeat: "twice as many means 2n, so there are THREE n altogether". Ask for "three times as many" and "the same as" before moving on.' },
    { time: '13–21 min', phase: 'More than', detail: 'Slide 3, SECOND panel, and this is the one that decides the lesson. Contrast "3 more than Su" (n + 3) with "3 times Su" (3n) on the board, out loud, twice. Then the move: add the shares up, and the loose 3 crosses the = sign as a subtraction. "Fewer than" crosses the other way and round 5 of the game needs it.' },
    { time: '21–27 min', phase: 'Both at once', detail: 'Slide 4, THIRD panel — the four steps: write each girl in n, add them up, solve for n, put n back. Insist on the check at the end. Every wrong answer in the game is caught by it, and the game prints that line on screen after every round.' },
    { time: '27–30 min', phase: 'Set the game up', detail: 'Slide 5. Split the class into 2, 3 or 4 teams and choose the same number on the game menu. Say the two rules that matter: whiteboards up together, and nobody shouts. Rolls are the prize; pieces are the answer.' },
    { time: '30–47 min', phase: 'GIRL MATH', detail: 'Slide 6. Read each round aloud in English, then let the clock run. Rounds 1–4 should take about 90 seconds each of real thinking; from round 5 give the whole clock and use +30 without hesitation. Then reveal in order: expressions, the sum, each line of the solution, then each girl. Ask WHICH RULE gave an expression before you press, and ask what changed between two lines of the solution. Expect to reach round 7 or 8; the deck is written so stopping there costs nothing.' },
    { time: '47–50 min', phase: 'Close', detail: 'Finish the round you are on, read the scores, then the last slide. Exit question: 34 pieces, Su three times Ana, Tess 4 more than Ana. They must show the expressions and the sum, not just the three numbers.' },
  ],
  answers: [
    { q: 'Starter — 10 pieces, Lily four times Ana', a: 'n + 4n = 10, so 5n = 10 and n = 2. Ana 2, Lily 8.' },
    { q: 'Round 1 — 12 pieces · Carrot twice Erica · 2 rolls', a: 'Erica n, Carrot 2n. n + 2n = 12, 3n = 12, n = 4. Erica 4, Carrot 8.' },
    { q: 'Round 2 — 15 pieces · Nam 3 more than Su · 2 rolls', a: 'Su n, Nam n + 3. n + (n + 3) = 15, 2n + 3 = 15, 2n = 12, n = 6. Su 6, Nam 9. The first round where a loose number crosses the = sign.' },
    { q: 'Round 3 — 20 pieces · Tess twice Lily · Ana same as Lily · 3 rolls', a: 'Lily n, Tess 2n, Ana n. 4n = 20, n = 5. Lily 5, Tess 10, Ana 5. "The same as" is the n people forget to write.' },
    { q: 'Round 4 — 22 pieces · Carrot twice Erica · Nam 2 more than Erica · 3 rolls', a: 'Erica n, Carrot 2n, Nam n + 2. 4n + 2 = 22, 4n = 20, n = 5. Erica 5, Carrot 10, Nam 7. Both moves in one round for the first time.' },
    { q: 'Round 5 — 36 pieces · Su three times Amada · Tess 6 fewer than Su · 4 rolls', a: 'Amada n, Su 3n, Tess 3n − 6. 7n − 6 = 36, 7n = 42, n = 6. Amada 6, Su 18, Tess 12. The first MINUS: it comes across as +6, which is the step to say out loud.' },
    { q: 'Round 6 — 30 pieces · a line of four, each 1 more than the one in front · 4 rolls', a: 'n, n + 1, n + 2, n + 3. 4n + 6 = 30, 4n = 24, n = 6. Erica 6, Tess 7, Ana 8, Lily 9.' },
    { q: 'Round 7 — 32 pieces · Nam twice Su · Carrot twice Nam · Amada same as Su · 5 rolls', a: 'Su n, Nam 2n, Carrot 4n, Amada n. 8n = 32, n = 4. Su 4, Nam 8, Carrot 16, Amada 4. Carrot is 4n, not 2n — that is the whole round, and it is a chain of two rules.' },
    { q: 'Round 8 — 43 pieces · Mr Bowen eats 4 · Su twice Tess · Lily 3 more than Tess · 6 rolls', a: 'Tess n, Su 2n, Lily n + 3, and a bare 4. 4 + n + 2n + (n + 3) = 43, so 4n + 7 = 43, 4n = 36, n = 9. Tess 9, Su 18, Lily 12, Mr Bowen 4. TWO loose numbers to move at once.' },
    { q: 'Round 9 — 45 pieces · Ana twice Erica · Su same as Erica · Nam 3 more than Ana · Tess 1 fewer than Nam · 7 rolls', a: 'Erica n, Su n, Ana 2n, Nam 2n + 3, Tess 2n + 2. 8n + 5 = 45, 8n = 40, n = 5. Erica 5, Su 5, Ana 10, Nam 13, Tess 12. Tess is measured from Nam, who is measured from Ana — work down the chain.' },
    { q: 'Round 10 — 60 pieces · all eight, each 1 more than the one before · 8 rolls', a: 'n, n + 1, … n + 7. 8n + 28 = 60, 8n = 32, n = 4. Erica 4, Nam 5, Carrot 6, Su 7, Tess 8, Lily 9, Ana 10, Amada 11. The screen elides the middle of the sum; write all eight terms on the board if you have time.' },
    { q: 'Exit question — 34 pieces, Su three times Ana, Tess 4 more than Ana', a: 'Ana n, Su 3n, Tess n + 4. 5n + 4 = 34, 5n = 30, n = 6. Ana 6, Su 18, Tess 10. Check: 6 + 18 + 10 = 34.' },
  ],
  notes:
    'THE BOX COMES FIRST, THEN THE LETTER. Every round here is a linear equation — 3n = 12, 4n + 2 = 22, 8n + 5 = 45 — and a class shown those as symbols has nothing to hold on to. Drawn as boxes first they are not frightening: one box, then two the same size, and n is simply the box\'s name. Slides 2 to 4 do it in that order and the game reveals every round the same way, so do not skip the picture to get to the algebra faster. '
    + 'THE THREE PHRASES ARE THE WHOLE DIFFICULTY. "Twice as many as", "more than", "fewer than". A student who reads "Nam gets 3 more than Su" as "Nam gets 3" has misread a sentence, not failed at maths, and it shows up as a 3 written where n + 3 belongs. Say all three phrases out loud on slides 2 and 3, and keep saying them between rounds. '
    + 'THE COUNTING ERROR TO WATCH FOR is "twice as many, so 2n altogether". It is 3n. Round 7 is the harder version of the same slip: Carrot is twice Nam and Nam is twice Su, so Carrot is 4n. Ask for the total number of n out loud before anybody divides. '
    + 'THE REVEAL IS THE TEACHING, so do not press straight through it. The order is expressions, sum, solve, then each girl. Between the sum and the tidied line, ask what was collected; between two solution lines, ask what moved across the = sign. A round revealed in four seconds has taught nothing that the class could not have copied. '
    + 'ROUND 5 IS THE FIRST MINUS. "Tess gets 6 fewer than Su" is 3n − 6, and the −6 crosses the = sign as +6: 7n − 6 = 36 becomes 7n = 42. That is the single hardest step in the task and it is worth stopping the game for. Round 8 is the other one: two loose numbers, Mr Bowen\'s 4 and Lily\'s 3, moving at once. '
    + 'THE CLOCK IS DELIBERATELY GENEROUS and there is a +30 button. Use it. A class that runs out of time on round 6 has learned that the game is unfair, not that the maths is hard, and the rest of the period is then spent arguing about the clock. '
    + 'PIECES AND ROLLS ARE DIFFERENT WORDS ON PURPOSE. The answers are counted in pieces; the prizes are counted in rolls. If both were "pieces" the board would have two unrelated numbers with the same name on it within thirty seconds. '
    + 'THE SILLINESS IS DOING WORK. The reasons attached to the rules are deadpan nonsense — Amada was on the phone, Tess ate six on the way, Mr Bowen calls it a quality check — and this class works visibly harder on a silly problem than on a sensible one. The maths underneath is identical. Read the reason out; do not skip it as decoration. '
    + 'YOU WILL NOT FINISH TEN ROUNDS, and that is fine. Rounds 8, 9 and 10 exist so that a fast class is never left waiting, not because the lesson needs them. Stop where the period stops, read the scores, and set the exit question. '
    + 'This deck has no photographs — the three figures are authored SVG in diagrams.js, so there is no images/CREDITS.json for this task.',
}

// content/y7-math/U01_5/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective:
    'Students can test a number for divisibility by 2, 3, 4, 5, 6, 8, 9, 10 and 11 without carrying out the division, ' +
    'can say which test they used rather than only the answer, know that "6 is a factor of 24", "24 is divisible by 6" and "24 is a multiple of 6" are one fact in three sentences, ' +
    'know that 7 has no easy test and that this is a fact about 7 rather than a gap in their notes, ' +
    'and can explain why shuffling the digits of a number cannot change whether it divides by 3 or 9.',
  materials: [
    'Projector / TV for the lesson deck',
    'Mini whiteboards + markers (one per pair)',
    'Student notebooks',
    'Learner’s Book Section 1.5 (pages 16–17) for the homework',
  ],
  vocab: [
    { term: 'Divisible', def: 'divides exactly, with nothing left over. 42 is divisible by 6 (Vietnamese: chia hết cho)' },
    { term: 'Tests for divisibility', def: 'quick checks that answer yes or no without doing the division — the two key words the book prints for this section' },
    { term: 'Divisible by / factor of / multiple of', def: 'three sentences for the same division fact. The single most valuable line in the lesson for this class' },
    { term: 'Digit sum', def: 'what you get when you add up all the digits of a number. 4725 → 4 + 7 + 2 + 5 = 18' },
    { term: 'Remainder', def: 'what is left over when a division does not come out exactly. 42 ÷ 5 = 8 remainder 2' },
    { term: 'Exactly', def: 'with nothing left over — the word that does all the work in every question in this section' },
  ],
  timeline: [
    { time: '0–4 min', phase: 'Starter', detail: 'Title slide. Which of 24, 35, 90, 91 divide exactly by 2? By 5? The point is not the answers, it is the follow-up: how did you decide so fast? They already own two divisibility tests without knowing the phrase.' },
    { time: '4–9 min', phase: 'The hook', detail: 'Slide 2, QUESTION ONLY: 3960, and which of 2 to 11 divide into it exactly. Everyone writes the ten numbers down the side of a page with a tick or a cross. Guesses, no method — nothing has been taught yet. Do NOT work any of it out here; the tests pay it back one group at a time from slide 5, and the full chart is slide 11.' },
    { time: '9–13 min', phase: 'Key words', detail: 'Slide 3: divisible, and tests for divisibility. Both copied. 42 ÷ 6 lands exactly; 42 ÷ 5 leaves 2. Stress the word EXACTLY — it is the word every question in Exercise 1.5 turns on.' },
    { time: '13–18 min', phase: 'The English beat', detail: 'Slide 4, and the most valuable five minutes in the lesson. "6 is a factor of 24", "24 is divisible by 6", "24 is a multiple of 6" are ONE fact. They met factor in 1.4 and multiple in 1.3, so without this slide "divisible by" becomes a third thing to memorise. Copied. Say all three sentences out loud round the room from the same division fact.' },
    { time: '18–33 min', phase: 'The nine tests', detail: 'Five slides, five copy-down panels, roughly three minutes each: last digit (2, 5, 10) · digit sum (3, 9) · end of the number (4, 8) · both tests at once (6) · the two groups (11). Every one of them ends in a reveal that applies the new test to 3960, so the class ticks off their own guess sheet as they go and no rule slide is only a rule. Keep the reveals closed until the class has tried the test themselves. Say out loud on the digit-sum slide that if the sum is still too big to judge, you add ITS digits again — that is not on the slide, because the Vietnamese ran off the bottom.' },
    { time: '33–37 min', phase: 'Where is 7, and the payoff', detail: 'Slide 10: which number between 2 and 11 has no test? Let them hunt through their notes before revealing. Answer: 7 — the tests that exist are longer than the division, so nobody uses one. Then slide 11 is the tick chart: 3960 divides by everything from 2 to 11 except 7. Ask for a show of hands on how many of the ten they guessed right.' },
    { time: '37–42 min', phase: 'Factor Hunt widget', detail: 'Three numbers: 1908, 2530, 7128. The class calls out which test to run next and you press that chip; everyone writes their own tick or cross first. Insist they say the TEST out loud, not the answer — "the digits add to 18, so it divides by 9". Use "Show the rest" if a number is running long.' },
    { time: '42–48 min', phase: 'Problems', detail: 'The missing digit (274▢ divisible by 9 → 5, and the reason there is only one answer). Then the shuffle investigation over two slides: they hunt for an arrangement of 8, 3, 6, 1 that fails, cannot find one, and only then see why — the digit sum is 18 no matter what. Then the biscuits, then the chairs. If you are behind, drop the chairs, not the investigation.' },
    { time: '48–50 min', phase: 'Recap + homework', detail: 'Five-point checklist and the copy-count: 2 key words, the three sentences, 9 tests. Set Section 1.5, pages 16–17. Exit question: is 4113 divisible by 3? They must say the test, not just yes.' },
  ],
  answers: [
    { q: 'Starter: 24, 35, 90, 91 — by 2 and by 5', a: 'By 2: 24 and 90 (they end in an even digit). By 5: 35 and 90 (they end in 5 or 0). 91 fails both. They decided by looking only at the last digit — which is the first test of the lesson.' },
    { q: 'Hook: which of 2 to 11 are factors of 3960?', a: 'All of them except 7. 3960 = 2 × 2 × 2 × 3 × 3 × 5 × 11, so 2, 3, 4, 5, 6, 8, 9, 10 and 11 all divide in. 3960 ÷ 7 = 565 remainder 5.' },
    { q: 'Slide 5 reveal — 3960 by 2, 5, 10', a: 'It ends in 0, so all three. Three ticks.' },
    { q: 'Slide 6 reveal — 3960 by 3 and 9', a: '3 + 9 + 6 + 0 = 18, a multiple of both 3 and 9. Five ticks.' },
    { q: 'Slide 7 reveal — 3960 by 4 and 8', a: 'Last two digits 60, and 60 ÷ 4 = 15. Last three digits 960, and 960 ÷ 8 = 120. Seven ticks.' },
    { q: 'Slide 8 reveal — 3960 by 6', a: 'Even, and the digits add to 18, so it passes the test for 2 and the test for 3. Eight ticks.' },
    { q: 'Slide 9 reveal — 3960 by 11', a: '3 + 6 = 9 and 9 + 0 = 9, so the difference is 0. Zero counts as a multiple of 11. 3960 ÷ 11 = 360. Nine ticks.' },
    { q: 'Slide 10 — which number has no test?', a: '7. Tests for 7 exist but are longer than dividing by 7, so nobody uses them. Divide and look at the remainder.' },
    { q: 'Widget round 1 — 1908', a: 'YES: 2, 3, 4, 6, 9.  NO: 5, 7, 8, 10, 11. Digit sum 18. Last two digits 08 → divisible by 4. Last three digits 908 ÷ 8 = 113.5, so NOT by 8 — this is the pair students get wrong. Groups for 11: 1 + 0 = 1 and 9 + 8 = 17, difference 16.' },
    { q: 'Widget round 2 — 2530', a: 'YES: 2, 5, 10, 11.  NO: 3, 4, 6, 7, 8, 9. Digit sum 10, so it fails 3 and 9 — and therefore fails 6 even though it is even. 30 is not a multiple of 4, so it fails 4 and 8. Groups for 11: 2 + 3 = 5 and 5 + 0 = 5, difference 0, and 2530 ÷ 11 = 230.' },
    { q: 'Widget round 3 — 7128', a: 'YES: 2, 3, 4, 6, 8, 9, 11.  NO: 5, 7, 10. Digit sum 18. Last two 28 ÷ 4 = 7. Last three 128 ÷ 8 = 16. Groups for 11: 7 + 2 = 9 and 1 + 8 = 9, difference 0. 7128 = 2 × 2 × 2 × 3 × 3 × 3 × 3 × 11.' },
    { q: 'Problem 1 — the missing digit in 274▢', a: '5, giving 2745. The visible digits add to 13; the next multiple of 9 is 18, and 18 − 13 = 5. It is the only answer, because the multiple after 18 is 27 and that would need a digit of 14.' },
    { q: 'Investigation — an arrangement of 8, 3, 6, 1 that is not divisible by 9', a: 'There is none. All 24 arrangements divide by 9, because 8 + 3 + 6 + 1 = 18 in every order and the test only looks at the digit sum. This is a reason, not a conjecture — worth naming the difference, since 1.4 ended on a conjecture.' },
    { q: 'Problem 2 — 5304 biscuits in bags of 8', a: 'Yes, none left over. Last three digits 304, and 304 ÷ 8 = 38. There are 5304 ÷ 8 = 663 bags.' },
    { q: 'Problem 3 — 2916 chairs in rows of 9', a: 'Yes. 2 + 9 + 1 + 6 = 18, a multiple of 9, so 2916 ÷ 9 = 324 rows. The class has 24 students. Read it straight and move on.' },
    { q: 'Exit question — is 4113 divisible by 3?', a: 'Yes. 4 + 1 + 1 + 3 = 9, a multiple of 3, so 4113 ÷ 3 = 1371. (It divides by 9 as well.)' },
  ],
  notes:
    'THE BOOK DOES NOT GIVE THE TESTS. Section 1.5 opens straight into Worked example 1.5 and uses the phrase "tests for divisibility" as though the reader already has them — but Exercise 1.5 needs tests for 4, 8, 9 and 11 inside the first three questions. Supplying the rules table is therefore this deck\'s job, and it is the copy-down spine of the lesson. If a student misses this lesson, they cannot start the homework; give them the five write-panels before they attempt it. ' +
    'THE HOOK RUNS THE WHOLE WAY THROUGH. 3960 goes up on slide 2 with no method and no answer, and every rule slide from 5 to 9 hands back a piece of it in its reveal. That is what stops the middle of the lesson being five slides of rules in a row, so do not skip the reveals or work the hook out early. 3960 = 2 × 2 × 2 × 3 × 3 × 5 × 11, which is exactly why it passes every test except 7. ' +
    'The book\'s own worked example uses 3948. It is deliberately not in this deck: on a projector 3948 and 3960 look near enough identical that a student who half-remembers one will answer with the other. Work 3948 through at the board from the book if you want a second example, but do it after slide 11, not before. ' +
    'THE ENGLISH BEAT IS SLIDE 4 and it is worth the five minutes. This class has now met "factor of" (1.4), "multiple of" (1.3) and "divisible by" (today) in three consecutive lessons. Unless you say out loud that they are three sentences describing one division, "divisible by" is filed as a fourth unrelated rule and the whole unit gets harder. Go round the room turning one fact into all three sentences. ' +
    'The test for 6 is the one students misuse: they check that the number is even, stop, and tick it. 10 is even and does not divide by 6. Say "both, not one" and make them show both ticks in their working. The other predictable error is assuming that divisible by 4 implies divisible by 8 — widget round 1 (1908) exists to kill exactly that, so run it. ' +
    'The test for 11 is written here as two alternating groups, added and then subtracted, rather than as an alternating sum. That is on purpose: the alternating-sum version produces negative numbers, and a Year 7 class meeting negatives in 1.1 does not need "−11 is a multiple of 11" in the same week. Say explicitly that a difference of 0 counts. ' +
    'SEVEN. Slide 10 is not a throwaway. Students assume a missing test means their notes are incomplete, and the honest answer — that the shortcut does not exist, so you divide — is a real mathematical point and stops them hunting for something that is not there. ' +
    'The shuffle investigation on slides 14–15 is the mathematical high point and is stronger than the one in 1.4: last lesson ended on a conjecture from three examples, this one ends on a reason that makes 24 cases certain at once. Name that difference out loud. If time is short, cut the chairs, not the investigation. ' +
    'Problem 3 (2916 chairs, 324 rows, 24 students in the class) is the deadpan one. The maths is correct. Read it completely straight and do not explain the joke. ' +
    'Anything students must copy is in an orange "Write This Down" panel; everything else is discussion. ' +
    'Image sources and licences are in content/y7-math/U01_5/images/CREDITS.json — both openly licensed (CC BY 3.0 and CC BY-SA 4.0).',
}

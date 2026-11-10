// content/y7-math/U01_1/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective:
    'Students can add and subtract positive and negative integers on a number line, including subtracting a negative, ' +
    'and can turn an English sentence into the calculation it describes.',
  materials: [
    'Projector / TV for the lesson deck',
    'Mini whiteboards + markers (one per pair)',
    'Student notebooks',
    'Workbook Section 1.1 (pages 7–8) for the homework',
  ],
  vocab: [
    { term: 'Integer', def: 'a whole number that is positive, negative or zero' },
    { term: 'Inverse', def: 'the opposite of a number; the inverse of 5 is −5' },
    { term: 'Difference', def: 'how far apart two numbers are — the gap, never negative' },
    { term: 'negative five / minus', def: 'the sign on a number vs the operation between two numbers' },
    { term: 'Up words', def: 'rise, increase, gain, deposit, climb, warmer, higher, above, more than' },
    { term: 'Down words', def: 'fall, drop, decrease, loss, withdraw, owe, colder, lower, below, less than' },
    { term: 'subtract X from Y', def: 'the English reverses the order: Y − X' },
  ],
  timeline: [
    { time: '0–5 min', phase: 'Starter', detail: 'Title slide. As they settle, students write three real-world things that can be negative, as one full English sentence.' },
    { time: '5–12 min', phase: 'Team game', detail: 'Pairs list negatives against the 2-minute timer, then read out; duplicates get crossed off both lists, most unique ideas wins. Only AFTER they have shared, press "Show more examples" for the bank of real ones (space at −270 °C, the Dead Sea, golf, overdrafts, an electron).' },
    { time: '12–22 min', phase: 'The line and the words', detail: 'Draw This: the big number line, and copy the two definitions. Then the thermometer slide for above/below, higher/lower, warmer/colder. Then "negative five" vs "minus five" — the same dash doing two jobs.' },
    { time: '22–34 min', phase: 'Moving along the line', detail: 'Adding, subtracting and two signs together, copying each write-panel. Then the jumper widget as a check: pairs predict which way the arrow will go before pressing, and the orange button only confirms it. Then the big rule (second Draw This) and the algebra-language note.' },
    { time: '34–42 min', phase: 'The language spine', detail: 'Up-words vs down-words with the sentence patterns. Then "Subtract 5 from 8" — hint first (which number do you START at?), take wrong answers seriously, then reveal. Run the translation drill: everyone writes the calculation before anyone speaks.' },
    { time: '42–47 min', phase: 'Difference', detail: '"Find the difference between −3 and 4" vs "what is −3 minus 4" — same reveal routine. Then the difference slide and the freezer/room worked example.' },
    { time: '47–50 min', phase: 'Word problems + homework', detail: 'Run as many of the four problems as time allows: car park, bank, research station, snail. Whiteboards, calculation before answer. Recap checklist, then set Workbook Section 1.1, pages 7 and 8.' },
  ],
  answers: [
    { q: 'Subtract 5 from 8', a: '8 − 5 = 3 (NOT 5 − 8). "from" marks the starting number.' },
    { q: 'Difference between −3 and 4', a: '7 — the gap. A difference is never negative.' },
    { q: 'But −3 − 4', a: '−7. Different question, different answer.' },
    { q: 'Freezer −15 °C, room 20 °C — how much warmer?', a: '20 − (−15) = 20 + 15 = 35 degrees' },
    { q: 'Problem 1, the car park', a: '−4 + 9 = 5, floor 5' },
    { q: 'Problem 2, the bank account', a: '−6 + 20 − 9 − (−4) = $9. Removing a debt adds.' },
    { q: 'Problem 3, the research station', a: '−11 + 4 − 9 = −16 °C' },
    { q: 'Problem 4, the snail', a: 'Still −12 m. +3 − 3 = 0 every day, so nine days change nothing.' },
    { q: 'Exit question: −4 °C falls by 10 degrees', a: '−14 °C' },
  ],
  notes:
    'The barrier in this class is English, not arithmetic — so the deck is built around the wording. Two slides are marked ' +
    '"Every class is an English class" (subtract-from, and difference-between): give the hint, let them get it wrong out loud, ' +
    'and only then reveal. ' +
    'Do not press the orange button on the jumper widget until pairs have said out loud which way the arrow will go. ' +
    'Watch for the classic error of flipping a single "+ (−)" into "+". Only "− (−)" becomes "+". ' +
    'The snail is a question where nothing changes — that is deliberate: the point is to read the whole thing before calculating. ' +
    'Two slides are Draw This (the big number line, and 2 − (−5) on the line) — budget real drawing time. ' +
    'Anything students must copy is in an orange "Write This Down" panel; everything else is discussion. ' +
    'Image sources and licences are in content/y7-math/U01_1/images/CREDITS.json — all openly licensed.',
}

// content/y7-math/U01_2/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective:
    'Students can multiply and divide any two integers using the four sign rules, explain why a negative times a negative is positive, ' +
    'work out a bracket before multiplying or dividing, estimate an answer by rounding, and say why "two negatives make a positive" ' +
    'is true for multiplying and dividing but false for adding.',
  materials: [
    'Projector / TV for the lesson deck',
    'Mini whiteboards + markers (one per pair)',
    'Student notebooks',
    'Workbook Sections 1.1 and 1.2 (pages 7–11) for the homework',
  ],
  vocab: [
    { term: 'Product', def: 'the answer when you multiply two numbers — the product of 2 and −9 is −18' },
    { term: 'Same signs / different signs', def: 'same → positive, different → negative. The same four rules for × and ÷' },
    { term: 'multiply X by Y / divide X by Y', def: 'X is the number you start with, and for division it is the one being shared out' },
    { term: 'times', def: 'the everyday English word for multiply' },
    { term: 'share equally between', def: 'divide' },
    { term: 'Estimate', def: 'a quick rough answer, worked out first, used to check the real one is sensible' },
  ],
  timeline: [
    { time: '0–6 min', phase: 'Starter', detail: 'Title slide. Work out −3 + −4 and −3 − (−4), writing the calculation as well as the answer. Slide 2 checks them. This is deliberate: it puts last week\'s rule back in the room right before we complicate it.' },
    { time: '6–13 min', phase: 'Multiplying', detail: 'Multiplying is repeated adding, so 3 × −4 is three jumps of four to the left. Copy the first rule. Then the pattern ladder (slide 4) — question ONLY, no answers, two minutes in pairs. They must write the last two rows before slide 5 is shown.' },
    { time: '13–20 min', phase: 'The four rules', detail: 'Slide 5 pays off the pattern: it only holds if −1 × −4 is +4. Copy the second rule. Then the sign table, which is the Draw This — budget real drawing time. Dividing shares the rules because it undoes multiplying.' },
    { time: '20–25 min', phase: 'Breaking the sentence', detail: 'Slide 7 is the heart of the lesson. Ask them to test "two negatives make a positive" on −3 × −4 AND on −3 + −4. Let them discover it fails for addition. Do not rush this; the whole lesson is this one distinction.' },
    { time: '25–32 min', phase: 'The words', detail: 'Copy "product", then the shop-versus-maths reveal. Then "divide −20 by 4" versus "4 divided into −20" — hint first, take wrong answers seriously, then reveal, with the callback to subtract-5-from-8. Then the translation drill: everyone writes the calculation before anyone speaks.' },
    { time: '32–38 min', phase: 'Brackets and estimating', detail: 'Brackets first, and the warning that the bracket holds an ADDITION so the new rule does not apply inside it. Then estimating by rounding, framed as self-checking rather than as another sum.' },
    { time: '38–44 min', phase: 'Games and practice', detail: 'Two-minute pairs game: integer pairs with a product of −24. Reveal shows there are exactly eight and WHY — four factor pairs of 24, two sign arrangements each. Then the four work-backwards questions; sign first, digits second.' },
    { time: '44–50 min', phase: 'Word problems + homework', detail: 'Run as many of the four as time allows: the bank fee, the long night, the dive, the durian. Whiteboards, calculation before answer. Recap checklist, then set Workbook Sections 1.1 and 1.2, pages 7–11.' },
  ],
  answers: [
    { q: 'Starter: −3 + −4', a: '−7. Adding a negative still sends you left.' },
    { q: 'Starter: −3 − (−4)', a: '1. Only minus a negative turns into plus.' },
    { q: 'Pattern ladder, last two rows', a: '−1 × −4 = 4 and −2 × −4 = 8. The answers climb by 4 each row, and nothing else keeps the pattern.' },
    { q: 'The four sign rules', a: '+ × + = +   ·   + × − = −   ·   − × + = −   ·   − × − = +. Identical for ÷.' },
    { q: 'Is "two negatives make a positive" true?', a: 'For × and ÷ yes: −3 × −4 = 12. For + no: −3 + −4 = −7. The sentence needs the operation attached to it.' },
    { q: 'Divide −20 by 4  /  4 divided into −20', a: 'Both −20 ÷ 4 = −5. The English swaps the order; the maths does not.' },
    { q: 'Brackets: 20 ÷ (−3 + −2)', a: '−3 + −2 = −5 (an addition!), so 20 ÷ −5 = −4.' },
    { q: 'Estimate −4.1 × 2.8', a: 'About −4 × 3 = −12.' },
    { q: 'Pairs with a product of −24', a: 'Exactly eight: 1×−24, −1×24, 2×−12, −2×12, 3×−8, −3×8, 4×−6, −4×6. Eight because 24 has four factor pairs and each takes its minus sign two ways.' },
    { q: 'Work backwards 1–4', a: '−8  ·  −42  ·  −9  ·  8' },
    { q: 'Problem 1, the empty account', a: '5 × −7 = −35. Down 35 dollars.' },
    { q: 'Problem 2, the long night', a: '6 × −3 = −18, so −18 °C.' },
    { q: 'Problem 3, the dive', a: '−48 ÷ 6 = −8, so 8 m down per minute.' },
    { q: 'Problem 4, the durian', a: 'Zero. He buys 0 durians, and anything × 0 = 0, so every other number in the question is decoration.' },
    { q: 'Exit question: −6 × −5', a: '30. Same signs give a positive.' },
  ],
  notes:
    'The whole lesson turns on one sentence: "two negatives make a positive" is TRUE for × and ÷ and FALSE for +. Slide 7 exists to break the careless version of it, and the starter exists to make sure the addition case is fresh when it does. Do not let that slide go quickly. ' +
    'Slide 4, the pattern ladder, is a question slide with no answers on it. Repeated adding cannot explain multiplying by a negative — you cannot do something "negative one times" — so the pattern is the honest way in, and it only teaches anything if they extend it themselves first. ' +
    'The sign table on slide 6 is the Draw This. It is nine boxes and it is the whole lesson; make them copy it properly. ' +
    'Nothing in this deck comes from Exercise 1.2, because that exercise is the homework. The in-class questions are original. ' +
    'Problem 4 is a trick and should be read completely deadpan. Every number in it is irrelevant because he buys zero durians. Expect someone to multiply 24 by 3 by 90 000 before they reach the last line — that is the lesson. ' +
    'Watch for the classic error of applying the new rule inside a bracket that contains an addition. ' +
    'Anything students must copy is in an orange "Write This Down" panel; everything else is discussion, and game rules are never in an orange panel. ' +
    'Image sources and licences are in content/y7-math/U01_2/images/CREDITS.json — all openly licensed.',
}

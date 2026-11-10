// content/y7-science/U02_8/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective:
    'Students can name acids and bases from everyday examples; say why tasting is not a test; use litmus and ' +
    'universal indicator to classify a liquid; read the pH scale and call a number acid, neutral or alkali; and ' +
    'explain neutralisation and give three places it is used.',
  materials: [
    'Projector / TV for the lesson deck',
    'Student science notebooks; coloured pencils are needed for the pH scale on slide 13',
    'Optional bench demo: red and blue litmus paper, dilute vinegar, soapy water, two identical glasses',
    'Optional for the homework hook: a red cabbage and a kettle',
  ],
  vocab: [
    { term: 'Acid', def: 'a substance that tastes sour; a strong one can burn skin' },
    { term: 'Base', def: 'the chemical opposite of an acid' },
    { term: 'Alkali', def: 'a base that dissolves in water — the word the exam paper uses' },
    { term: 'Corrosive', def: 'attacks skin, eyes and clothes; the hazard symbol on the lab bottles' },
    { term: 'Indicator', def: 'a substance that changes colour to show an acid or an alkali' },
    { term: 'Litmus', def: 'the simplest indicator; red paper and blue paper, two colours only' },
    { term: 'Universal indicator', def: 'an indicator that gives many colours, so it gives a number' },
    { term: 'pH scale', def: 'numbers from 1 to 14 saying how strong an acid or an alkali is' },
    { term: 'Neutral', def: 'not an acid and not a base; pH exactly 7' },
    { term: 'Neutralisation', def: 'an acid and a base cancelling each other out to make something neutral' },
  ],
  timeline: [
    { time: '0–4 min', phase: 'Starter', detail: 'Slide 1: write three sour foods. Take five answers aloud — chanh, me, khế, dứa all count. Keep the list on the board; slide 4 will hit most of it.' },
    { time: '4–7 min', phase: 'The two glasses', detail: 'Slide 2: two identical clear glasses, lemon juice and soapy water. Take guesses; accept smell, accept "put your finger in". Do NOT answer. Say the answer is coming and move on — the whole lesson is built on this question staying open.' },
    { time: '7–14 min', phase: 'Acids and bases', detail: 'Slide 3: copy ACID. Slide 4: name all six; ask which two you must never taste (stomach acid and battery acid). Slide 5: copy BASE and ALKALI — say plainly that the exam word is alkali. Slide 6: name all six.' },
    { time: '14–18 min', phase: 'Safety', detail: 'Slide 7: copy CORROSIVE and the three rules. If there is a corrosive bottle in the room, hold it up. This is the slide that makes the no-tasting ban real, so do not rush it.' },
    { time: '18–25 min', phase: 'Indicators', detail: 'Slide 8: put the two glasses back up, still unanswered. Take one more guess, then slide 9: copy INDICATOR and LITMUS. Slide 10: the real strips — point out that only the wet end changed. Slide 11: red cabbage, and say it is tonight’s optional experiment.' },
    { time: '25–32 min', phase: 'The pH scale', detail: 'Slide 12: litmus gives two colours, not a number; copy UNIVERSAL INDICATOR, then pH SCALE and NEUTRAL. Slide 13: Draw This, about 4 minutes, coloured pencils out. Walk round; the common error is starting the numbers at 0.' },
    { time: '32–37 min', phase: 'Dip the paper', detail: 'Slide 14: for each liquid the class says acid, neutral or alkali BEFORE you press Dip. Eleven liquids run about 4 minutes; six is enough if you are behind. Stop on pure water and make them say "exactly 7".' },
    { time: '37–40 min', phase: 'The vote', detail: 'Slide 15: left hand pH 1, right hand pH 13, everyone at once. Expect a big majority for pH 1. Slide 16: the answer is both — oven cleaner is pH 13 and it is in their kitchen.' },
    { time: '40–46 min', phase: 'Neutralisation', detail: 'Slide 17: take guesses, no answer. Slide 18: copy NEUTRALISATION. Slide 19: Draw This, about 3 minutes — three beakers and two arrows only. Slide 20: four everyday uses; ask which family each one adds.' },
    { time: '46–50 min', phase: 'Questions, game, exit', detail: 'Slides 21–22: Questions 1–6, start in class and finish for homework. Slide 23 Acid Snap if there is time — aim for 8 cards. Slide 24: homework. Slide 25: checklist, 7 panels and 2 diagrams. Slide 26: exit question.' },
  ],
  answers: [
    { q: 'Slide 2 / 8 — the two glasses', a: 'Neither looking nor tasting will do it. You need an indicator, which arrives on slide 9. If a student says "smell it", that is a fair answer for vinegar and worth praising — then point out it fails for the two glasses, because neither one smells.' },
    { q: 'Slide 4 — which two must you never taste', a: 'Car battery acid and the acid inside your own stomach. The other four (lemon, vinegar, fizzy drink, tamarind) are food.' },
    { q: 'Slide 14 — the eleven liquids', a: 'lemon juice 2, vinegar 3, orange juice 4, black coffee 5, milk 6, pure water 7, sea water 8, baking soda 9, soap 10, limewater 12, oven cleaner 13. Sea water usually surprises them: the sea is slightly alkaline.' },
    { q: 'Slide 15 — the vote', a: 'Both. A strong alkali burns skin exactly as a strong acid does, and oven cleaner at pH 13 is the one they actually have at home. This is the misconception of the lesson: "danger" is not the left-hand end of the scale, it is both ends.' },
    { q: 'Slide 17 — too much stomach acid', a: 'A base — an indigestion tablet. Accept "milk" and "baking soda", both of which genuinely work.' },
    { q: 'Q1', a: 'An acid. 3 is below 7.' },
    { q: 'Q2', a: 'An acid. Blue litmus only turns red in an acid.' },
    { q: 'Q3', a: 'pH 2. The smaller the number, the stronger the acid.' },
    { q: 'Q4', a: 'An alkali (a base that has dissolved in water). 10 is above 7.' },
    { q: 'Q5', a: 'Litmus has only two colours. Both pH 8 and pH 13 are alkaline, so both turn red litmus blue and litmus cannot separate them. Universal indicator can, because it gives a different colour for each number.' },
    { q: 'Q6', a: 'A base, which neutralises the acid. More acid would make it worse. Sodium hydrogencarbonate is what a school spill kit actually contains — no need to name it unless asked.' },
    { q: 'Exit question', a: 'Food leaves acid on the teeth; toothpaste at pH 9 is a base, so brushing neutralises it. Brushing before eating does not help, because the acid has not been made yet.' },
  ],
  notes:
    'There are no Learner’s Book pages for this section — Unit 2 ends at 2.7. The content is the Cambridge Lower Secondary Stage 7 chemistry strand, so nothing here is off-syllabus, but there is no page number to send students to and no book questions to set. The six questions on slides 21–22 are written for this deck. ' +
    'Base or alkali: the deck teaches both on slide 5 and then uses "alkali" for anything dissolved in water and "base" for a solid being added, which is how the exam papers use them. If a student writes "base" where the mark scheme wants "alkali", that is worth correcting now rather than later. ' +
    'The pH numbers in the widget and the questions are the classroom-standard whole numbers, not measured values. Baking soda solution is really about 8.3 and milk about 6.5; do not volunteer this, but if a keen student checks a bottle at home and gets a different number, they are right and the scale still works. ' +
    'Neutralisation at this stage is "the acid stops being an acid". Salt and water as products is Stage 8 — if a student asks what is left, "a new substance and water" is enough. ' +
    'Acid Snap: a clicker’s Right arrow shows the answer, then moves on. Leave the game with the deck’s Back or Continue buttons, not the keyboard. ' +
    'If the lab has litmus paper, the two glasses from slide 2 are worth doing for real on the bench at slide 10 — it takes ninety seconds and it closes the question with a physical object instead of a photograph.',
}

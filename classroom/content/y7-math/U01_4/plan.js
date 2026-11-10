// content/y7-math/U01_4/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective:
    'Students can list all the factors of a number, find the common factors of two numbers and pick out the highest common factor (HCF), ' +
    'tell a factor apart from a multiple (a factor divides in; a multiple is what you land on), explain why the book asks for the LOWEST common ' +
    'multiple but the HIGHEST common factor, know that the HCF is never "none" because 1 is a factor of everything, and use the HCF to simplify a fraction.',
  materials: [
    'Projector / TV for the lesson deck',
    'Mini whiteboards + markers (one per pair)',
    'Student notebooks',
    'Workbook Section 1.4 (pages 14–15) for the homework',
  ],
  vocab: [
    { term: 'Factor', def: 'a number that divides into another number exactly, with nothing left over. The factors of 12 are 1, 2, 3, 4, 6, 12 (Vietnamese: ước số)' },
    { term: 'Factor vs multiple', def: 'a factor divides IN and the list stops; a multiple is what you land ON and the list never stops. The single most-confused pair in this unit' },
    { term: 'Common factor', def: 'a number that is a factor of both numbers, i.e. it appears in both lists (ước số chung)' },
    { term: 'Highest common factor (HCF)', def: 'the biggest number that is a factor of both numbers — the same as ƯCLN in Vietnamese maths' },
    { term: 'Consecutive', def: 'following one after the other when you count: 6 and 7 are consecutive, 6 and 8 are not' },
    { term: 'Conjecture', def: 'what you believe is true because of a pattern you have seen, before anyone has proved it' },
    { term: 'Simplest form', def: 'a fraction written with the smallest numbers possible — divide top and bottom by their HCF' },
  ],
  timeline: [
    { time: '0–5 min', phase: 'Starter', detail: 'Title slide. Find every pair of whole numbers multiplying to 12, then to 18. This produces the two factor lists the whole lesson is built on — do not skip keeping them.' },
    { time: '5–9 min', phase: 'The hook', detail: 'Slide 2, QUESTION ONLY: 24 pencils and 40 stickers, identical packs, nothing left over — greatest number of packs? Guesses on the board, no method. It gets answered on slide 9. Do not solve it here.' },
    { time: '9–14 min', phase: 'Key word: factor', detail: 'Factor = divides in exactly, nothing left over, found by hunting pairs (the book\'s own method). Copy the definition. Reveal: 5 is not a factor of 12; 1 and the number itself are always factors.' },
    { time: '14–20 min', phase: 'Factor vs multiple', detail: 'Slide 4, the first language beat and the one that saves marks all year. Two columns: a factor divides IN, is smaller or equal, and the list STOPS; a multiple is what you land ON, is bigger or equal, and the list NEVER stops. Both notes get copied. Do not rush this — last lesson was multiples and they will blur.' },
    { time: '20–26 min', phase: 'Build the definition', detail: 'Common factors = numbers in both lists (copy) — reuse "common means shared" from 1.3 rather than re-teaching it. Then highest common factor = the biggest of them (copy), flagged as the same idea as ƯCLN they already know.' },
    { time: '26–30 min', phase: 'Why "highest"?', detail: 'Slide 7, the second language beat. Ask it and let them argue before revealing. Answer: multiples never stop so there is no highest to ask for; factors stop so there is a highest, and the lowest common factor is always 1, which tells you nothing. This is the question every class half-asks and nobody answers.' },
    { time: '30–37 min', phase: 'Method + drill', detail: 'Mr Bowen\'s method on the book\'s example, HCF of 24 and 80 = 8 — this is the Draw This, so budget copying time. Then slide 9 pays off the pencils and stickers: 8 packs of 3 pencils and 5 stickers. Worth saying out loud that 24 and 40 is a different pair from 24 and 80 even though both give 8 — the method is what got them there, not the numbers looking familiar. Then the HCF-finder widget: five pairs, everyone writes the HCF before the reveal.' },
    { time: '37–41 min', phase: 'The trap', detail: 'Two slides: the questions, then the answers. The HCF is never "none" — HCF(8, 9) = 1, not nothing, because 1 is a factor of every number. And HCF(6, 18) = 6, not 1, because when one number divides the other the HCF is the smaller number. Let them commit on whiteboards before you turn the page; each half catches a different careless answer.' },
    { time: '41–48 min', phase: 'Problems + investigation', detail: 'Whiteboards, HCF written before the answer: the two ribbons (36, 48 → 12 cm, so 3 pieces and 4 pieces); the bookshelf (18/24 → HCF 6 → 3/4, which is what the HCF is actually FOR); then the consecutive-numbers investigation over two slides — they compute 9&10, 20&21, 32&33, all 1, and only THEN does the word conjecture appear, naming what they have just done. Then the fruit baskets, the deadpan one. If you are behind, drop the fruit baskets, not the investigation.' },
    { time: '48–50 min', phase: 'Recap + homework', detail: 'Five-point checklist and the copy-count. Set Workbook Section 1.4, pages 14–15. Exit question: HCF of 7 and 14 is 7, not 1, because 7 divides into 14.' },
  ],
  answers: [
    { q: 'Starter: pairs multiplying to 12 and to 18', a: '12 = 1×12, 2×6, 3×4 → factors 1, 2, 3, 4, 6, 12  ·  18 = 1×18, 2×9, 3×6 → factors 1, 2, 3, 6, 9, 18' },
    { q: 'Hook: 24 pencils, 40 stickers, identical packs', a: '8 packs. HCF(24, 40) = 8, so each pack has 24 ÷ 8 = 3 pencils and 40 ÷ 8 = 5 stickers, nothing left over. (Factors of 40: 1, 2, 4, 5, 8, 10, 20, 40.)' },
    { q: 'Reveal: is 5 a factor of 12?', a: 'No — 12 ÷ 5 = 2 remainder 2. And 1 and the number itself are always factors.' },
    { q: 'Common factors of 12 and 18', a: '1, 2, 3 and 6 (the numbers in both lists)' },
    { q: 'HCF of 12 and 18', a: '6 — the highest common factor.' },
    { q: 'Why highest for factors, lowest for multiples?', a: 'Multiples never stop, so no highest exists. Factors stop, so a highest exists — and the lowest common factor is always 1 for every pair, which carries no information.' },
    { q: 'Worked example: HCF of 24 and 80', a: '8. Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Factors of 80: 1, 2, 4, 5, 8, 10, 16, 20, 40, 80. Common: 1, 2, 4, 8 — highest is 8.' },
    { q: 'Widget pairs', a: 'HCF(12,18)=6  ·  HCF(24,80)=8  ·  HCF(8,9)=1  ·  HCF(6,18)=6  ·  HCF(20,30)=10' },
    { q: 'Trap A: HCF of 8 and 9', a: '1, not "none". Factors of 8: 1, 2, 4, 8; of 9: 1, 3, 9. Only 1 is shared.' },
    { q: 'Trap B: HCF of 6 and 18', a: '6, not 1 — 6 divides into 18, so the HCF is the smaller number.' },
    { q: 'Problem 1, the two ribbons', a: 'HCF(36, 48) = 12, so each piece is 12 cm: 36 ÷ 12 = 3 pieces and 48 ÷ 12 = 4 pieces.' },
    { q: 'Problem 2, the bookshelf', a: '18/24. HCF(18, 24) = 6, so 18/24 = 3/4. Three quarters of the shelf.' },
    { q: 'Investigation, consecutive numbers', a: 'HCF(9,10) = 1, HCF(20,21) = 1, HCF(32,33) = 1. Conjecture: the HCF of two consecutive numbers is always 1. Checks out on 99 and 100.' },
    { q: 'Problem 3, the fruit baskets', a: 'HCF(30, 45) = 15, so 15 baskets of 2 bananas and 3 oranges. There are 12 teachers — read it straight and move on.' },
    { q: 'Exit question: HCF of 7 and 14', a: '7, not 1 — 7 divides into 14, so the HCF is the smaller number.' },
  ],
  notes:
    'The spine of this lesson is ENGLISH, not arithmetic. Most of the class already know this concept from Vietnamese school as ước số chung lớn nhất (ƯCLN), so the real work is attaching English words to something they can already do. ' +
    'There are two language beats and the lesson lives or dies on them. Slide 4 is FACTOR vs MULTIPLE: a factor divides IN and the list stops, a multiple is what you land ON and the list never stops. They did multiples last lesson, so the two will blur unless you separate them out loud. Slide 7 is why the book wants the LOWEST multiple but the HIGHEST factor — give it time and let them guess before the reveal, because the answer (one list is infinite, the other is not) is the only thing in the unit that explains the naming instead of just asserting it. ' +
    'Slide 2 (the pencils and stickers) is a question slide with no method on it; the guesses matter, and slide 9 is where it pays off. Do not work it out early. Its HCF is 8, the same answer as the book\'s worked example, but 24 and 40 is a different pair from 24 and 80 — so a student who gets 8 on slide 9 got there by the method, not by recognising the numbers. ' +
    'The list method on slide 8 (HCF of 24 and 80 = 8) is the Draw This and matches the book\'s worked example exactly — make them copy it properly, including all ten factors of 80. ' +
    'The recurring error is answering "none" when two numbers look unrelated. Over-teach it: 1 is a factor of every number, so every pair has a common factor, and the answer to HCF(8, 9) is ONE. The mirror-image error is answering 1 when one number divides the other — HCF(6, 18) is 6. The "never none" pair of slides catches both, and the question and the answer are deliberately on separate slides so the class has to commit first. ' +
    'The consecutive-numbers investigation is where the book\'s last two key words come from, and they arrive from real work instead of a vocabulary list. It is also split across two slides on purpose: "consecutive" is defined where it is needed to read the question, but "conjecture" only appears on the second slide, after the class has produced three 1s and actually made one. Defining conjecture first teaches the word instead of the idea. It is worth more than the last word problem — if time is short, cut the fruit baskets instead. ' +
    'Problem 3 (the fruit baskets) is the deadpan one and should be read completely straight. The maths is correct: 15 identical baskets. The staff room has 12 teachers. Do not explain the joke. ' +
    'Anything students must copy is in an orange "Write This Down" panel; everything else is discussion. ' +
    'Image sources and licences are in content/y7-math/U01_4/images/CREDITS.json — both openly licensed (CC BY-SA).',
}

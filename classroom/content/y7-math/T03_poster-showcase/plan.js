// content/y7-math/T03_poster-showcase/plan.js
// One-page teacher plan, rendered by src/pages/Plan.jsx. Shapes: vocab
// [{ term, def }], timeline [{ time, phase, detail }], answers [{ q, a }],
// print [{ label, href, note }].
import posterPdf from './print/example-poster-A3.pdf?url'

export const plan = {
  duration: '50 minutes to launch · posters due at the showcase, Thursday 8 October, 3:30–4:15',
  objective:
    'Students know that the poster teaches ONE topic to a parent who was not in the lesson; ' +
    'can name the seven parts of a maths poster — title, key words, a picture, how it works, two examples, a common mistake, and a Try it! question under a flap — and find each one on the example; ' +
    'know which topic they have and where it is in their notebook; ' +
    'and can explain a topic in one minute with five sentence frames: My poster is about… The key words are… Here is an example… Be careful… Now you try!',
  print: [
    {
      label: 'Example poster, A3',
      href: posterPdf,
      note: 'print at actual size on A3, and glue a real paper flap over the Try it! answers before you pin it up',
    },
  ],
  materials: [
    'Projector / TV for the deck',
    'The example poster printed at A3 (link under To print) — hold it up on slide 3 so they see the real size',
    'A3 poster paper, one per student plus three spares',
    'Scrap paper for the pencil plan (step 1)',
    'Rulers, pencils, black pens, coloured pens or markers',
    'Small squares of paper and glue sticks for the Try it! flaps — make one in front of them',
    'Student notebooks: the key words come from the orange panels',
    'The class list saved in the Pick button on the classroom computer. The topic board on slide 10 draws from it; nothing else needs setting up.',
  ],
  vocab: [
    { term: 'Poster · A3', def: 'A3 is two A4 pages side by side (297 × 420 mm). Portrait, like the example. Vietnamese: áp phích, khổ A3' },
    { term: 'Key word', def: 'the bold words in the orange panels. On the poster each one needs its meaning, not just the word' },
    { term: 'Example · harder example', def: 'one easy, one harder. The harder one can be a word problem with Mr Bowen in it, as on the example poster' },
    { term: 'Common mistake', def: 'the error people really make. Show it crossed out, then the right way. Vietnamese: lỗi hay gặp' },
    { term: 'Flap', def: 'a square of paper glued along ONE edge so it lifts. Nobody will know this word — show a real one. Vietnamese: nắp gập' },
    { term: 'Showcase · visitor', def: 'showcase is the event (triển lãm); a visitor is anyone who stops at your poster — parents, other classes, teachers' },
  ],
  timeline: [
    { time: '0–5 min', phase: 'Starter', detail: 'Title slide. Notebooks open; pairs say which topic they could teach at home and why. Take two or three answers — it tells you who wants which topic before the board decides.' },
    { time: '5–9 min', phase: 'Your job', detail: 'Slide 2. Pairs list three things a poster must show a parent. Collect them on the board without correcting. Expect "examples", "pictures", "the rule"; nobody will say "a common mistake" or "a question for the parent".' },
    { time: '9–17 min', phase: 'Seven parts', detail: 'Slide 3. Hold up the printed A3 example. They copy the seven parts (the first panel), then find each part on the example. Tick the board list against the seven: what did the class miss?' },
    { time: '17–23 min', phase: 'Close up', detail: 'Slides 4–6. Key words come straight from the orange panels — open a notebook at 1.6 and show the square-root panel beside the poster. The picture comes BEFORE the rule. Lift the real flap on the printed copy.' },
    { time: '23–26 min', phase: 'Easy to read', detail: 'Slide 7. Stand at the back of the room with the printed example: can they read it? Title letters 3 cm is about a thumb.' },
    { time: '26–31 min', phase: 'Topics', detail: 'Slides 8–9. Read the ten topics aloud with their units, so everyone can find theirs in the notebook. The picture ideas are suggestions, not rules.' },
    { time: '31–37 min', phase: 'Topic board', detail: 'Slide 10. Press Pick ten times: one name per press, no repeats, like the Pick button. Or tap a topic, then a name, to choose by hand — a name already placed swaps. The board saves itself on this computer. Leave with the Next button: the arrow keys are off on this slide.' },
    { time: '37–41 min', phase: 'Five steps', detail: 'Slide 11. Write your own dates beside steps 1–4 on the board (see notes). Step 2 is the one to hold them to: no pen until the maths has been checked.' },
    { time: '41–48 min', phase: 'One minute', detail: 'Slide 12: say the five sentences yourself, pointing at the printed poster. Slide 13: they copy the frame (second panel), then say it to a partner for THEIR topic, even with no poster yet. Time one pair with a stopwatch.' },
    { time: '48–50 min', phase: 'Close', detail: 'Slides 14–15. Everyone writes their topic and unit in the third panel. Check notebooks for three panels on the way out.' },
  ],
  answers: [
    { q: 'Example poster — Try it!', a: '√100 = 10, because 10 × 10 = 100 · ∛27 = 3, because 3 × 3 × 3 = 27' },
    { q: '1.1 Adding and subtracting integers', a: 'Number line. Add a positive → right; add a negative → left; subtracting a negative → right. Examples: −3 + 5 = 2 · 4 − (−2) = 6. Mistake: −3 − 4 = 7 ("two minuses make a plus"); it is −7. Try it: the temperature is −2 °C and rises by 5 → 3 °C.' },
    { q: '1.2 Multiplying and dividing integers', a: 'Table of signs: same signs → positive, different → negative, for × AND ÷. Examples: −4 × 3 = −12 · −20 ÷ −5 = 4. Mistake: −3 × −2 = −6. Try it: −6 × −7 = 42 · 18 ÷ −3 = −6.' },
    { q: '1.3 + 1.4 LCM and HCF', a: 'Two lists, circle the match. Multiples you land on; factors divide in. Examples: LCM of 4 and 6 = 12 · HCF of 12 and 18 = 6. Mistake: mixing up factors and multiples (the "HCF of 4 and 6 is 12"). Try it: LCM of 3 and 5 = 15 · HCF of 8 and 12 = 4.' },
    { q: '1.5 Tests for divisibility', a: 'Table of tests. 1.5 taught nine (2, 3, 4, 5, 6, 8, 9, 10, 11); five explained well beats nine crammed in. ÷2 even · ÷3 digit sum divides by 3 · ÷5 ends in 0 or 5 · ÷6 both 2 AND 3 · ÷9 digit sum divides by 9. Examples: 516 → 5 + 1 + 6 = 12, so ÷3 ✓ · 516 is even too, so ÷6 ✓. Mistake: calling 15 divisible by 6 because it passes the 3 test. Try it: is 2025 divisible by 9? 2 + 0 + 2 + 5 = 9, yes.' },
    { q: '2.2 Formulae', a: 'A shape with its formula, A = l × w. Substitute, then keep the order of operations. Examples: 3n when n = 4 is 12 · 3x + 2 when x = 4 is 14. Mistake: 3n = 34. Try it: P = 2l + 2w with l = 5, w = 3 → 16.' },
    { q: '2.4 Expanding brackets', a: 'Box method: multiply EVERY term inside. Examples: 5(a + 3) = 5a + 15 · 3(x + 2) + 4x = 7x + 6 (expand, then collect like terms — this is where 2.3 lives). Mistake: 5(a + 3) = 5a + 3. Try it: 4(y − 2) = 4y − 8.' },
    { q: '2.5 Solving equations', a: 'Flow chart, forwards then backwards with the inverse operations. Examples: x + 5 = 12 → x = 7 · 2a + 4 = 18 → 14 → a = 7 (undo the LAST step first). Mistake: 18 ÷ 2 first, giving 5. Try it: I think of a number, × 3, + 2, and get 20 → 6. Check by substituting.' },
    { q: '2.6 Inequalities', a: 'Number line with an open circle and an arrow. Examples: x > 3 — the smallest integer is 4 · −5 < −2. Mistake: saying 3 works in x > 3, or −5 > −2. Try it: which integers fit 1 < x < 5? 2, 3 and 4.' },
    { q: '3.1 Converting metric units', a: 'Staircase t → kg → g → mg, × 1000 each step down, ÷ 1000 each step up. Examples: 2 kg = 2000 g = 2 000 000 mg · 3500 g = 3.5 kg. Mistake: dividing on the way down (2 kg = 0.002 g). Try it: 4.5 t = 4500 kg.' },
    { q: '3.2 Rounding to decimal places + long division', a: 'A long division, then round. Look at the NEXT digit: 5 or more rounds up. Examples: 3.14159 to 2 d.p. = 3.14 · 58 ÷ 7 = 8.2857… → 8.286 to 3 d.p. (work to 4 places first). Mistake: 34.9892 to 1 d.p. = 35 — it is 35.0. Try it: 22 ÷ 7 to 2 d.p. = 3.14 (3.142…).' },
  ],
  notes:
    'THE AUDIENCE IS THE POINT. A poster written for Mr Bowen lists answers; a poster written for a parent has to teach. Every part of the checklist follows from that: the key word needs its meaning because a parent does not know it, the mistake is there because it is what the parent would do, and the Try it! flap gives the parent something to do instead of nodding. Say "your mum or dad was not in the room" whenever a draft is too short.\n\n' +
    'THE KEY WORDS ARE ALREADY WRITTEN. Every topic has its orange panels in the notebook, and the example poster uses the 1.6 panels nearly word for word. A student who says they have nothing to write has not opened the notebook at their unit. Adding the Vietnamese word is encouraged — it is for the parent, not the teacher.\n\n' +
    'THE TOPIC BOARD (slide 10) uses the same class list as the Pick button and saves on the same computer, under its own key. Consequences: a different computer shows an empty board AND an empty class list; editing the class list in the Pick button updates the board at once; and a renamed student loses their topic, so reassign them by hand. Clear needs two presses within three seconds. The rounding topic carries "+ long division" on its card, because every rounding question in 3.2 starts with one.\n\n' +
    'CHOOSING BY HAND is allowed and sometimes better. Solving equations and rounding with long division are the two heaviest topics; tap the topic, then the name, to give them to students who will cope. Pick fills whichever topic is selected, so you can also hand-place two and let Pick deal the rest.\n\n' +
    'SUGGESTED SCHEDULE (adjust to the timetable): launch with this deck; the next maths lesson is the pencil plan and the maths check (step 2 — nothing in pen until you have ticked the maths); one or two lessons drawing; Wednesday 7 October a rehearsal where every student says their minute to a partner with the finished poster; Thursday 8 October the showcase, 3:30–4:15. Write the real dates beside the steps on slide 11.\n\n' +
    'WHAT TO LOOK FOR when checking a draft or marking the final: (1) all seven parts are there; (2) the maths is right, including the mistake box, which should be a real mistake shown as wrong; (3) it can be read from 2 metres; (4) the student can say the five sentences without reading them. The first two are the ones to be strict about before the pen goes on.\n\n' +
    'LANGUAGE ON THE DAY. Posters and the one-minute script are in English. A student may switch to Vietnamese to help a parent who is lost, but should still point at and say the English key word — that word is the thing they learned.\n\n' +
    'This task has no photographs: the example poster and the topic tiles are authored SVG in diagrams.js, and the A3 print is generated from the same drawing (print/example-poster-A3.pdf). If the poster drawing changes, regenerate the PDF so the two match.',
}

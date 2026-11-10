// content/y7-math/T01_formula-machine/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective:
    'Students can take a formula they are given, substitute values into it and state the answer with the right unit, using the same three lines every time — write the formula, put the numbers in, work it out; '
    + 'can do this for the perimeter of a rectangle (P = 2l + 2w), the area of a triangle (A = b × h ÷ 2), a Celsius to Fahrenheit conversion (F = 1.8c + 32) and the distance to a storm (d = t ÷ 3); '
    + 'know that the height of a triangle is the straight-up dashed line and never the slanted side; '
    + 'know that two rectangles with very different shapes can have the same perimeter, and that converting a temperature does not change how hot it is; '
    + 'can find the volume of water in a cuboid tank as V = l × w × h and state it in cm³; '
    + 'know that pouring water into a differently shaped tank does not change its volume; '
    + 'and can find the depth the water reaches in the new tank by dividing the total number of centimetre cubes by the number of cubes in one layer of that tank.',
  materials: [
    'Projector / TV for the lesson deck',
    'Mini whiteboards + markers (one per pair) — used on every station',
    'Student notebooks',
    'Optional but worth it for Part 2: two clear plastic containers of obviously different shapes, and a jug of water. Pour it in front of them once before slide 13.',
  ],
  vocab: [
    { term: 'Formula / formulae', def: 'carried over from 2.2 — a rule connecting quantities, written with letters, WITH an = sign. The plural is irregular; say it out loud twice' },
    { term: 'Perimeter', def: 'the distance all the way around the OUTSIDE of a shape. A length, so the unit is cm. The word is not obvious to this class and is worth saying with a finger tracing the edge' },
    { term: 'Area · base · height', def: 'area is the surface a shape covers, in cm². The height of a triangle is the straight-up distance from the base to the top corner — the dashed line, never the slanted side. This is the section\'s one real trap' },
    { term: 'Celsius · Fahrenheit · convert', def: 'two scales for the same thing. "Convert" means read the other ruler; it does not mean change the weather. Both words are needed to read the question at all' },
    { term: 'Flash · bang · thunder · lightning', def: 'needed for slides 11 and 12, and none of them appears in a maths book. Say them, and let a student say what happens first' },
    { term: 'Volume · cuboid · tank · depth · pour · spill', def: 'Part 2 stands or falls on these six. "Depth" is what the question asks for and "how deep" is how it will be phrased; make sure both are in the room before slide 13' },
  ],
  timeline: [
    { time: '0–5 min', phase: 'Starter', detail: 'Title slide, then slide 2. The ant walks 8 + 3 + 8 + 3 = 22. Almost everybody gets it, and that is the design — praise it and mean it, because the case for a formula is "this is slow for forty", not "you did it wrong". FIRST panel: perimeter, formula, P = 2l + 2w.' },
    { time: '5–10 min', phase: 'The routine', detail: 'Slide 3, SECOND panel. Three moves, and the middle one is the one that gets skipped and the one that is marked. Say "2l means 2 × l" out loud three times — this class met that error in 2.2 and it comes straight back the moment a picture is on the slide.' },
    { time: '10–18 min', phase: 'Station 1 — perimeter', detail: 'Slide 4. Six rectangles. Whiteboards up before each press. Problems 2 and 4 both come to 34 cm and look nothing alike — stop there and ask why; that is the point of the whole station. Problem 3 is a square, which is still a rectangle. Problem 5 has a decimal.' },
    { time: '18–20 min', phase: 'Ask first', detail: 'Slide 5 is QUESTION ONLY. The triangle inside the rectangle, no numbers anywhere. Wait for a student to say "half". Do not move on until somebody says WHY — the dashed line splits the picture into two rectangles and the triangle halves each one.' },
    { time: '20–28 min', phase: 'Station 2 — triangles', detail: 'Slide 6, THIRD panel: A = b × h ÷ 2, and the height is the dashed line. Then slide 7, six triangles, every one drawn leaning so the slanted side is visibly not the height. Problem 5 gives 7.5 cm² — half a square centimetre is a real answer and somebody will say it cannot be.' },
    { time: '28–34 min', phase: 'THE ARGUMENT', detail: 'Slide 8 is QUESTION ONLY and is the slide to protect. 35 °C against 95 °F, and they are the SAME temperature. Take a show of hands for each and write the split on the board before anybody converts anything. Then slide 9, FOURTH panel, and slide 10 — problem 4 of that station is the 35 °C they just argued about.' },
    { time: '34–40 min', phase: 'The storm', detail: 'Slide 11, FIFTH panel: d = t ÷ 3. Ask which arrives first, the flash or the bang, before you explain anything. Slide 12 is six storms; problem 6 is 6 seconds straight after problem 5 was 45, so ask what has happened before you press.' },
    { time: '40–48 min', phase: 'PART 2 — the pour', detail: 'Slide 13 is QUESTION ONLY: deeper, shallower or the same. Pour real water between two real containers here if you have them. Slide 14 SIXTH panel (volume, and it does not change), slide 15 SEVENTH panel (the two questions and the division), then slide 16. Do problems 1–3 as a class; 4 and 5 only if the time is there.' },
    { time: '48–50 min', phase: 'Close', detail: 'Recap checklist, and make them count the seven orange panels. Exit question on the last slide: a 5 by 4 tank with water 4 cm deep, poured into a tank with base 8 by 5. Answer 2 cm, and they must show two lines.' },
  ],
  answers: [
    { q: 'Starter — the ant on an 8 cm by 3 cm rectangle', a: '22 cm. Accept 8 + 3 + 8 + 3 without the formula; that is exactly what slide 2 is built on.' },
    { q: 'Station 1 — perimeter, P = 2l + 2w', a: '1) 9 by 4 → 26 cm · 2) 12 by 5 → 34 cm · 3) 7 by 7 → 28 cm · 4) 15 by 2 → 34 cm · 5) 6.5 by 3 → 19 cm · 6) 11 by 4.5 → 31 cm. Problems 2 and 4 are equal on purpose. Watch for 2l being read as a two-digit number when l = 15.' },
    { q: 'Slide 5 — how much of the rectangle does the triangle cover?', a: 'Half. The dashed line from the top corner down to the base cuts the picture into two rectangles, and the triangle takes exactly half of each. Do not put a number on this slide.' },
    { q: 'Station 2 — area of a triangle, A = b × h ÷ 2', a: '1) 8, 5 → 20 cm² · 2) 10, 6 → 30 cm² · 3) 7, 4 → 14 cm² · 4) 9, 6 → 27 cm² · 5) 5, 3 → 7.5 cm² · 6) 12, 7 → 42 cm². The predictable error is using the slanted side for h; the second predictable error is forgetting the ÷ 2 and doubling the answer.' },
    { q: 'Slide 8 — which city is hotter, Ha Noi at 35 °C or Texas at 95 °F?', a: 'Neither. They are the same temperature. Take the show of hands FIRST and write the split on the board — the argument is worth more than the conversion.' },
    { q: 'Station 3 — Celsius to Fahrenheit, F = 1.8c + 32', a: '1) 10 → 50 °F · 2) 25 → 77 °F · 3) 0 → 32 °F · 4) 35 → 95 °F · 5) 37 → 98.6 °F · 6) 100 → 212 °F. Problem 3 catches people who think 0 must give 0. Problem 5 is body temperature and 6 is the boiling point from Science 2.2.' },
    { q: 'Station 4 — the storm, d = t ÷ 3', a: '1) 9 s → 3 km · 2) 15 s → 5 km · 3) 3 s → 1 km · 4) 24 s → 8 km · 5) 45 s → 15 km · 6) 6 s → 2 km. After 5 and 6, ask what has happened: the storm has come 13 km closer, so it is heading straight for us.' },
    { q: 'Slide 13 — deeper, shallower or the same?', a: 'Shallower, because the new tank is wider — the same water spread over a bigger base has to be less deep. All three answers are correct for SOME pair of tanks, which is why the station has one of each. Take the word and the reason; no numbers on this slide.' },
    { q: 'Station 5 — the pour', a: '1) 4×3×3 = 36 into a 6×3 base (18 a layer) → 2 cm, shallower · 2) 6×5×2 = 60 into a 4×3 base (12) → 5 cm, DEEPER · 3) 4×3×5 = 60 into a 6×2 base (12) → 5 cm, exactly the SAME depth in a differently shaped tank, because both bases hold 12 · 4) 10×4×3 = 120 into an 8×5 base (40) → 3 cm · 5) 5×4×3 = 60 into an 8×3 base (24) → 2.5 cm.' },
    { q: 'Exit question — 5 by 4 tank, water 4 cm deep, poured into a base 8 by 5', a: '2 cm. Line one: 5 × 4 × 4 = 80 cm³. Line two: 80 ÷ 40 = 2 cm. A student who writes only "2 cm" has not answered the question that was asked.' },
  ],
  notes:
    'THIS IS A TASK, NOT A SECTION. There is no exercise to set from it and no Learner\'s Book pages behind it. It exists because 2.2 introduced the word "formula" and then had about ten minutes to use one, and what this class actually needs is the same formula meeting many different sets of numbers until substituting stops being an event. '
    + 'THE PICTURE CHANGING IS THE WHOLE DESIGN. Year 7 does not fail to multiply — it fails to believe the formula still applies when the drawing looks different. That is why every station is a widget and not a printed figure: a 15 cm by 2 cm bookmark and a 12 cm by 5 cm tile have the same perimeter and look nothing alike, and the class has to see both come out of the same machine. '
    + 'THREE SLIDES ASK AND DO NOT TELL — 5, 8 and 13 — and none of them has the answer on it anywhere. Slide 8 is the one to protect if you are short of time: 35 °C and 95 °F are the same temperature, so the room splits, and a room that is arguing is paying attention in a way a room being told the answer is not. Write the count of hands on the board before you move. '
    + 'INSIST ON THE MIDDLE LINE, exactly as in 2.2. Write the formula, put the numbers in WITH the × signs back, then work it out. Every predictable error today is invisible in a final answer and obvious in the middle line: 2l read as a two-digit number, the slanted side used as the height, the ÷ 2 forgotten, 1.8 × c added before it is multiplied. '
    + 'PART 2 IS NOT REARRANGING, AND SHOULD NOT BE TAUGHT AS IF IT WERE. The question asks for the letter that was not given, and a Year 7 who is shown h = V ÷ (l × w) will remember a shape of symbols and nothing else. Counting cubes is the honest route and it survives: how many cubes of water are there, how many fit in one layer of the new tank, divide. The number of layers IS the depth in centimetres, and that sentence is the one to repeat. '
    + 'POUR REAL WATER IF YOU CAN. Two clear containers of obviously different shapes and a jug, done once in front of them before slide 13, is worth more than any animation — the widget then confirms something they have already watched happen. '
    + 'PROBLEM 3 OF THE POUR STATION IS THE ONE THAT MATTERS. The water ends up at exactly the same depth in a tank that looks completely different, because both bases hold 12 cubes a layer. "Same volume" and "same depth" are the two ideas most easily confused in this topic and that problem is the only thing in the deck that separates them. '
    + 'Anything students must copy is in an orange "Write This Down" panel; everything else is discussion. Seven panels, and the recap slide asks them to count. '
    + 'This deck has no photographs — all ten figures are authored SVG in diagrams.js, so there is no images/CREDITS.json for this task.',
}

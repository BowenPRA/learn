// content/y7-science/U03_tidelab/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes on Thursday 29 October to launch the lab; then a few minutes at each reading for two weeks (to Thursday 12 November)',
  objective:
    'Students can read the water level on our bamboo pole accurately (close, eyes level, the middle of the waves, on time, in cm); ' +
    'record it in a results table with the unit in the heading; describe the tide as coming in or going out; and use 3.4 to make ' +
    'two predictions the class data will test: high tide comes about 50 minutes later each day, and the biggest tides come near the new moon (9 November).',
  materials: [
    'Projector / TV for the lesson deck',
    'The labelled bamboo pole, already in the river',
    'At the river: a clipboard with a paper copy of the table, a pencil, a watch or phone for the time',
    'Mini whiteboards (slides 5 and 13)',
    'Student science notebooks and rulers (slide 9: the table, drawn sideways across a page)',
  ],
  vocab: [
    { term: 'Water level · le niveau de l’eau', def: 'how high the water is; we read it on the pole, in cm' },
    { term: 'Reading · une mesure', def: 'one number read from the pole at one time' },
    { term: 'Results table · le tableau de résultats', def: 'days across, times down; the unit (cm) goes in the heading, not in the boxes' },
    { term: 'Coming in / going out · la marée monte / descend', def: 'the water level is going up / going down' },
    { term: 'High tide / low tide · marée haute / basse', def: 'the highest / lowest water level (from 3.4)' },
    { term: 'Prediction · une prédiction', def: 'what we expect to happen, and why; the data will test it' },
    { term: 'Line graph · un graphique', def: 'time along the bottom, water level up the side; crosses joined with a ruler' },
  ],
  timeline: [
    { time: '0–3 min', phase: 'Starter', detail: 'Slide 1: when will the river be highest today? Everyone writes a time. Keep the guesses for slide 14 at the end of the day.' },
    { time: '3–9 min', phase: 'The river', detail: 'Slide 2: the three goals. Slide 3: the flooded street in Bến Tre — take guesses (rain?) before the reveal: the river, at a king tide (triều cường). Slide 4: copy WATER LEVEL.' },
    { time: '9–14 min', phase: 'Read the pole', detail: 'Slide 5: whiteboards, all three, then reveal. C is the one to talk about: between two marks, so 85.' },
    { time: '14–22 min', phase: 'What went wrong?', detail: 'Slide 6: one panel per press; the class names each mistake (too far, the splash, late, no unit). Answer to the question: none. Slide 7: copy READING THE POLE.' },
    { time: '22–33 min', phase: 'The table', detail: 'Slide 8: count the dots before the reveal: 44. Slide 9: draw the table sideways with a ruler (6 min). Slide 10: the river rules — say who goes at each time.' },
    { time: '33–36 min', phase: 'Our results', detail: 'Slide 11: type in the readings taken so far today; the class copies them into their tables.' },
    { time: '36–41 min', phase: 'Read a graph', detail: 'Slide 12: copy COMING IN / GOING OUT. Slide 13: whiteboards, sketch today’s guess. Slide 14: our graph so far (one or two dots today).' },
    { time: '41–47 min', phase: 'Predictions', detail: 'Slides 15 and 17: one-hand votes. Slides 16 and 18: the answers from 3.4; copy OUR PREDICTIONS.' },
    { time: '47–50 min', phase: 'Close', detail: 'Slide 19: copy LINE GRAPH (it is for 12 November; skip it today if time is short, and the count on slide 20 becomes 4 panels). Slide 20: checklist. Slide 21: exit question.' },
    { time: 'Every reading', phase: 'For two weeks', detail: 'After each reading: open the deck, go to slide 11 (ten presses), type the number, press Enter. Slide 14 is three presses on. Copy table every few days and paste it into a document as a backup.' },
  ],
  answers: [
    { q: 'Slide 3 — the flooded street', a: 'River water: a king tide (triều cường) in Bến Tre on 26 October 2011. Rivers near the sea have tides too, and October–November brings the year’s highest ones in the south of Vietnam.' },
    { q: 'Slide 5 — read the pole', a: 'A: 60 cm (on a numbered mark). B: 130 cm (an unnumbered mark between 120 and 140). C: 85 cm (halfway between the 80 and 90 marks). The drawn pole is marked every 10 cm and numbered every 20 cm; if ours is marked differently, say so.' },
    { q: 'Slide 6 — Mr Bowen’s four readings', a: '1 from his window: too far to see the marks. 2 the top of a boat’s splash: read the middle of the waves when the water is calm. 3 at 1:15, not 12:30: late. 4 “75”: no unit. We can use none of them.' },
    { q: 'Slide 8 — how many readings?', a: '11 school days (Thu 29, Fri 30 Oct; Mon 2–Fri 6 Nov; Mon 9–Thu 12 Nov) × 4 = 44.' },
    { q: 'Slides 15–16 — high tide tomorrow?', a: 'B, about 11:50. The Moon moves on round its orbit, so the Earth turns about 50 minutes more to face it again: a “lunar day” is 24 h 50 min.' },
    { q: 'Slides 17–18 — which week?', a: 'B, 9–12 November. Moon phases (worked out for Vietnam time): full moon Mon 26 Oct 11:11, half moon (last quarter) Mon 2 Nov 03:28, new moon Mon 9 Nov 14:02. The biggest tides come a day or two after full and new moon, so expect the smallest changes in a day around 3–4 Nov and the biggest around 10–11 Nov. 9 Nov is the 1st of the 10th lunar month — triều cường time.' },
    { q: 'Exit', a: 'Coming in: 120 − 85 = 35 cm higher.' },
  ],
  notes:
    'THE RESULTS TABLE (slide 11). Click a box, type the reading in cm (85, 85.5 or 85,5), press Enter. It saves at once, in THIS browser on THIS computer only (localStorage key classroom:y7-science:U03_tidelab:readings, which never expires). It does not reach other computers, the phone or a private window, and clearing the browser’s data deletes it — so press Copy table every few days and paste it into a document or spreadsheet. Today’s column is orange (it follows the computer’s clock). A box that is not a number turns red and stays off the graph. Clear all needs a second press within four seconds. A missed reading: leave the box empty; the graph leaves a gap.\n\n' +
    'THE GRAPH (slide 14) draws itself from the table: one band per school day, four dots left to right (8:30, 10:30, 12:30, 2:30), joined within a day but never across a night — nobody measured the night, and a whole high tide and low tide happen while we are at home. The scale starts at 0 cm, like the pole.\n\n' +
    'WHAT TO EXPECT. A tide takes about 12 h 25 min, so our six hours of readings see about half of one each day. High tide comes about 50 minutes later every day: the highest dot moves right by about one dot every two or three days, and after about a week the morning’s high tide has left our window and a low tide moves through it. Rivers in the south of Vietnam have mixed tides (the two high tides of a day are often different heights), and rain upstream lifts the whole day, so the data will not be perfectly tidy. If it disagrees with a prediction, that is a result: ask why.\n\n' +
    'AT THE RIVER. Two students and an adult per reading works well, with the paper copy of the table on a clipboard; type it in when they are back. Read at the time, close to the pole, eyes level with the water; if boats are passing, wait for the water to settle or read the middle.\n\n' +
    'ON 12 NOVEMBER. Each pair draws one day’s line graph by hand (slide 19), then lay the eleven graphs side by side on the wall: do the high tides come later each day? Which days have the biggest change from the lowest to the highest reading? Answer both predictions with evidence from the table.\n\n' +
    'EXTENSION. Watch the water hyacinth (lục bình) at 10:30 and at 2:30: which way is it floating? When the tide is coming in strongly, a tidal river can flow backwards, away from the sea.',
}

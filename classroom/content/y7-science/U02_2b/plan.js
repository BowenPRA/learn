// content/y7-science/U02_2b/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes',
  objective:
    'Students can read a measuring cylinder (bottom of the meniscus, eye level) and a thermometer (top of the liquid, eye level) accurately; state and follow the safety rules for heating water; set up and label the heating apparatus with the thermometer bulb in the water and off the bottom; record temperature against time, plot it, and describe it in full sentences; and explain that the temperature stays the same at the boiling point because the heat is changing the liquid to a gas.',
  materials: [
    'Projector / TV for the lesson deck',
    'Student science notebooks and RULERS — the apparatus and the results table are drawn in class',
    'Learner’s Book (Unit 2.2, pages 37–40)',
    'For the investigation (per group of 2–3): beaker, 150 cm³ measured water, thermometer, clamp stand with boss and clamp, tripod, gauze, heat-proof mat, Bunsen burner, stopwatch, safety spectacles',
    'A measuring cylinder and a thermometer to pass round at the start, so every student reads a real scale once before Questions 1 and 2',
  ],
  vocab: [
    { term: 'Volume', def: 'the amount of space a liquid takes up, measured in cm³' },
    { term: 'Measuring cylinder', def: 'the tool used to measure the volume of a liquid' },
    { term: 'Meniscus', def: 'the curved surface of a liquid; read the BOTTOM of it, at eye level' },
    { term: 'Thermometer', def: 'the tool used to measure temperature; the liquid expands and rises as it gets hotter' },
    { term: 'Eye level', def: 'looking straight at the mark, not from above or below — the fix for two people getting different readings' },
    { term: 'Axis (axes)', def: 'a line on a graph; time on the horizontal axis (across), temperature on the vertical axis (up)' },
    { term: 'Boiling point', def: 'the temperature at which a liquid boils; for water, 100 degrees C. The temperature stays here while it boils' },
  ],
  timeline: [
    { time: '0–4 min', phase: 'Starter — guess three temperatures', detail: 'Title slide. Guess, in degrees C: a cold drink, a warm bath, boiling water. Collect a few. Rough answers: cold drink ~5, warm bath ~40, boiling water 100. Hold the 100 — it comes back at the end. This also warms up "degrees C" as a unit.' },
    { time: '4–8 min', phase: 'The hook — same water, two answers', detail: 'Slide 2: two students read the same cylinder as 50 and 47. NO answer on the slide. One minute in pairs. Take ideas; steer towards "they looked from different angles" without confirming — the meniscus slide answers it.' },
    { time: '8–18 min', phase: 'Measuring volume, then Question 1', detail: 'The meniscus slide: measuring cylinder, the curve, read the bottom at eye level — this answers the hook (50 vs 47 = looking from above vs below). Copy MEASURING CYLINDER + MENISCUS. Pass a real cylinder round if you have one. Then Question 1: three cylinders, answers A 20, B 60, C 90 cm³. Insist on the units every time.' },
    { time: '18–26 min', phase: 'Measuring temperature, then Question 2', detail: 'The thermometer slide: the liquid expands and rises; read the top at eye level (same rule). Copy THERMOMETER. Then Question 2: three thermometers, answers A 25, B 15, C 40 degrees C. Again, units every time.' },
    { time: '26–30 min', phase: 'Predict, then safety', detail: 'The prediction slide: heat water and read every minute — does it get hotter forever, or does something happen at boiling? Everyone WRITES a prediction (most say "hotter forever"; that is the useful wrong answer). Then the safety slide — copy the three rules before any Bunsen is lit.' },
    { time: '30–42 min', phase: 'The investigation', detail: 'Draw the apparatus (Draw This) and label it — the one thing that matters is the bulb IN the water and OFF the bottom. Copy the results table. Then run it in groups: 150 cm³, read every minute to boiling. If time or kit is short, run ONE demonstration at the front and have the class fill the table from it. Circulate on safety: goggles on, standing up.' },
    { time: '42–48 min', phase: 'Plot, then describe and explain', detail: 'The graph slide: axis / horizontal / vertical — copy AXIS. Then the heating-curve result answers the prediction: it climbs, then goes flat at 100. Copy the finding. Then the sentence frames (comparative English — "the longer we heated, the higher…") and Questions 3–5. Insist on full sentences; this is the English of the lesson.' },
    { time: '48–50 min', phase: 'Recap and homework', detail: 'The four-point Summary checklist and the copy-count. Homework: draw a cylinder at 35 cm³ and a thermometer at 28 degrees C (the reverse skill), and finish the graph write-up. Exit question: why does the thermometer liquid rise? (It expands when heated — links back to 2.1/2.2.)' },
  ],
  answers: [
    { q: 'Starter guesses', a: 'Cold drink ~5 degrees C, warm bath ~40 degrees C, boiling water 100 degrees C. Exact numbers do not matter; the point is a feel for the scale and practice with the unit.' },
    { q: 'Hook — 50 vs 47', a: 'Neither misread the scale; they looked from different angles. Reading from ABOVE the meniscus gives a value that is too high, from BELOW too low. The fix is eye level, reading the bottom of the curve. This is the whole reason accuracy needs a rule.' },
    { q: 'Question 1 — volumes', a: 'A = 20 cm³, B = 60 cm³, C = 90 cm³. Each small line is 10 cm³. Mark down any answer missing the unit.' },
    { q: 'Question 2 — temperatures', a: 'A = 25 degrees C, B = 15 degrees C, C = 40 degrees C.' },
    { q: 'Prediction', a: 'Most predict it keeps getting hotter. It does not: it stops at 100 degrees C. Do not confirm before the graph; the gap between the guess and the flat line is the lesson.' },
    { q: 'Safety rules', a: 'Safety spectacles on; stand up so spills fall away from you; take care with the hot beaker and the flame. Discuss any extras (tie long hair back, bags under the bench) and check with the class.' },
    { q: 'Why the bulb is off the bottom (Q5)', a: 'So the thermometer measures the temperature of the WATER, not the hotter glass at the bottom of the beaker, which is right over the flame.' },
    { q: 'What happens at boiling (Q3)', a: 'The temperature stops rising and stays the same, at about 100 degrees C, even though heating continues.' },
    { q: 'Why (Q4)', a: 'The heat energy is being used to change the liquid water into a gas (steam), not to raise the temperature. Accept any answer along these lines; the formal idea (latent heat) is not required in Year 7 — "the heat is turning it into gas instead of making it hotter" is full marks.' },
    { q: 'Describe-the-graph sentences', a: '"...the temperature went up / rose." "...the higher the temperature became." "...the temperature stayed the same." The middle one is comparative English (the + comparative, the + comparative); drill it.' },
    { q: 'Exit question — why the thermometer liquid rises', a: 'The liquid EXPANDS (gets bigger) when it is heated, so it takes up more space and rises up the thin tube. This links back to "some substances get bigger when you heat them" from 2.1.' },
  ],
  notes:
    'WHERE THIS SITS. Second half of section 2.2 (pages 37–40); 2.2a (pages 35–36, the change words) comes first and this deck depends on it — the payoff is that the heated water reaches its BOILING POINT, a word from 2.2a, and stops getting hotter. ' +
    'IT IS A SKILLS LESSON. The facts are few; the skill is accurate reading and a safe, well-recorded investigation. Two rules do all the work and are the same for both instruments: read at the liquid surface (bottom of the meniscus for a cylinder, top of the liquid for a thermometer) and read at EYE LEVEL. The hook (50 vs 47) exists only to make eye level feel necessary before it is stated. ' +
    'THE INVESTIGATION, HONESTLY. Full group practicals need kit and time; if either is short, run ONE demonstration at the front and have the class fill the same table from it — the graph and its lesson survive completely. If you do run groups, the safety slide is not optional and the bulb-off-the-bottom point is the one thing to police. ' +
    'THREE SLIDES ASK BEFORE THEY TELL: the hook, the prediction ("hotter forever?"), and the describe-the-graph frames. The prediction must be WRITTEN before heating; the flat line is only surprising if they committed to "up forever" first. ' +
    'WHAT GETS COPIED: measuring cylinder + meniscus, thermometer, axis, the safety rules, and the finding (temperature stays the same at the boiling point) — plus two drawn items, the labelled apparatus and the results table. ' +
    'THE ENGLISH BEATS: "accurate" and "eye level"; the graph words axis / horizontal / vertical; and the comparative frame "the longer we heated it, the higher the temperature became", which is the sentence most worth drilling because the class can use the pattern everywhere. ' +
    'THE READINGS in Questions 1 and 2 are chosen to sit on lines so the answers are clean (20/60/90 cm³ and 25/15/40 degrees C); tell the class each small line is 10 cm³ (volume) or that the numbers are degrees C (temperature). ' +
    'No Learner’s Book scans are used; every figure — meniscus, both question sets, the apparatus, the results table and the heating curve — is redrawn in content/y7-science/U02_2b/diagrams.js. There are no photographs in this deck, and it needs none; if you want a real-apparatus photo for the set-up slide later, add it to an images/ folder with a CREDITS.json entry.',
}

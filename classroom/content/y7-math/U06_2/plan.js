// content/y7-math/U06_2/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes, one period — 23 slides. If you fall behind: skip slide 17 (dice means) and one word problem, and shorten the class sample (14) to samples A and C.',
  objective:
    'Students can name the population, the sample and the sample size in a situation; say when to ask everyone and when to take a sample (too many, too slow, or testing destroys it); ' +
    'choose a fair (representative) sample — at random, so everyone has the same chance, and from every group — and spot an unfair one (friends, the first at the gate, the basketball team); ' +
    'explain why a large sample is better than a small one (its answer jumps about less) without needing everyone; and answer the Workbook’s “Is this a good way to choose a sample?” with reasons.',
  materials: [
    'Workbook, Unit 6, Section 6.2, pages 76–79 (no Learner’s Book for this unit)',
    'Mini whiteboards for every student',
    'The class list loaded in the deck’s Class list button (bottom bar / projector dock) for slide 14 — check it before the lesson',
    'Projector / TV — three slides are models or a story (3, 7, 11); they run offline. EN / FR switch',
    'Maths notebooks for the four written panels and one drawing',
  ],
  vocab: [
    { term: 'Population · la population', def: 'everyone (or everything) you want to know about: all 200 students, all 5000 phones (slide 4)' },
    { term: 'Sample · un échantillon', def: 'the ones you ask or test; in everyday English, a free sample or a blood sample (slides 3–5)' },
    { term: 'Sample size · la taille de l’échantillon', def: 'how many are in the sample (slides 4, 6)' },
    { term: 'Fair / representative · équitable / représentatif', def: 'a sample that is like the whole population — a stirred pot (slide 8). The Workbook says representative' },
    { term: 'At random · au hasard', def: 'everyone has the same chance to be chosen: names from a hat, every 10th name on a list (slide 10)' },
    { term: 'Reliable · fiable', def: 'steady: a large sample’s answer jumps about less (slides 11–12); spoken, not copied' },
  ],
  timeline: [
    { time: '0–3 min', phase: 'Starter and goals', detail: 'Slide 1: everyone writes yes or no. Count the hands for each and leave the numbers on the board. Slide 2: read the big line and the three goals, pointing at each picture.' },
    { time: '3–7 min', phase: 'Everyone or a sample?', detail: 'Slide 3: before each press the class says “ask everyone” or “take a sample” and why. The blood and the matches are the ones that make them laugh: you cannot test all of it.' },
    { time: '7–12 min', phase: 'Key words; everyday English', detail: 'Slide 4: copy the panel (3 short lines); point at the grey dots, then the orange ones, then the 20. Slide 5: a free sample, a blood sample, a sample of students. Slide 6: whiteboards, a then b.' },
    { time: '12–17 min', phase: 'What happens next?', detail: 'Slide 7, completely deadpan — “He does not stir” is the set-up. Take predictions before each press; take answers before A clue. Slide 8: the spoon only tasted the top. Copy FAIR SAMPLE.' },
    { time: '17–21 min', phase: 'Vote; at random', detail: 'Slide 9: vote, everyone at once — expect a split. Slide 10: A. The first 30 at the gate all arrived early (often by car); every 10th name reaches every class. Copy AT RANDOM.' },
    { time: '21–28 min', phase: 'Small sample, big sample', detail: 'Slide 11: press Ask 5 students about six times, asking “close to the last one?” before each press. Then Ask 50 students about four times. Compare the two “from … to …” lines. Ask for a guess for everyone; then Ask everyone (60%).' },
    { time: '28–31 min', phase: 'How many; back to the starter', detail: 'Slide 12: copy the panel; read the info line. Slide 13: back to the board votes; read the frame; reveal.' },
    { time: '31–37 min', phase: 'Sample our class', detail: 'Slide 14: ask “Do you have a pet?”. Press Class list for 4 names; those 4 answer; write “__ out of 4” on the board. Repeat for B (4 more) and C (12). Then everyone: hands up. Which sample was closest?' },
    { time: '37–43 min', phase: 'The Workbook’s words; whiteboards', detail: 'Slide 15: read each line; the class reads the meaning. Slide 16: whiteboards, a then b then c; insist on two reasons for b. Slide 17 if there is time.' },
    { time: '43–46 min', phase: 'Put it together', detail: 'Slide 18: everyone draws the population, the sample and the two arrows.' },
    { time: '46–49 min', phase: 'Word problems', detail: 'Slides 19–21, deadpan, never flagged as jokes.' },
    { time: '49–50 min', phase: 'Close', detail: 'Slide 22: thumbs up or down for each line; notebook count. Slide 23: exit question on whiteboards.' },
  ],
  answers: [
    { q: 'Slide 1 / 13 — 4 out of 5', a: 'No, he cannot say 80%: a sample of 5 is far too small (slide 11’s samples of 5 jump between about 20% and 100%), and we do not know how the 5 were chosen. In the model, the whole school is 60%.' },
    { q: 'Slide 3 — everyone or a sample?', a: 'Our class of 27: everyone (quick). Blood: a sample. 2000 workers: a sample. 500 matches: a sample (testing burns them). 100 million people: a sample. Exam marks: everyone (each mark matters).' },
    { q: 'Slide 6 — name them', a: 'a Population: the 120 Year 7 students; sample: the 30 asked; sample size 30. b Population: the 5000 phones made that day; sample: the 50 tested; sample size 50.' },
    { q: 'Slides 7–8 — the phở', a: 'He tasted the top before stirring, where the salt sat: his spoon was not like the whole pot. Stir first, then one spoon is a fair sample. Adding 10 litres of water made the whole pot wrong.' },
    { q: 'Slides 9–10 — the vote', a: 'A, every 10th name on the school list: every student has a chance and every class is reached. B is not fair: the first 30 at the gate all arrived early, so they may all come the same way (by car or the first bus).' },
    { q: 'Slide 11 — the model', a: 'The whole school is 120 out of 200 = 60%. Samples of 5 can only give 0, 20, 40, 60, 80 or 100%, and they jump about; samples of 50 usually land between about 50% and 70%. Each lesson’s dots are different (the draws are random).' },
    { q: 'Slide 14 — our class', a: 'The class’s own numbers. Usually sample C (12) is closest to everyone, but not always: say so if it happens — a large sample is more likely to be close, not certain.' },
    { q: 'Slide 16 — the zoo', a: 'a 15. b No: 15 out of 3000 is too small; the first visitors at 10:00 are only morning, early visitors, not like everyone. c For example: every 20th visitor at the exit, all day (about 150 visitors).' },
    { q: 'Slide 17 — dice means', a: 'A: 6 + 1 + 6 + 5 = 18, 18 ÷ 4 = 4.5. B: 2 + 1 + 3 + 2 = 8, 8 ÷ 4 = 2. C: 44 ÷ 12 = 3.67 (about 3.7). C is closest to 3.5 = (1 + 2 + 3 + 4 + 5 + 6) ÷ 6.' },
    { q: 'Slides 19–21 — word problems', a: 'Matches: no — he tested the whole population and has none left; test a sample of 2 or 3. Basketball: no — not fair; players are taller than most students and not all Year 7. Phở: not a sample any more — he ate the whole population; one spoon from a stirred pot was enough.' },
    { q: 'Slide 23 — exit', a: 'For example 50–100 students (60 is 10%), chosen at random from the school list — names from a hat, 10 from each year group. Not 5 (too small), not one class or your friends (not fair).' },
    { q: 'Workbook 6.2, Focus 1–3 (pages 76–77)', a: '1 a The mean (add the five heights, divide by 5) or the median (the middle height). b Five boys could all be tall or all short: too few to be like all 13-year-old boys. c 1000 is plenty, but it takes a long time and costs a lot; a smaller sample (about 50–100) would do. 2 a Numbers are easy to tally, chart and average, and quick to answer. b 4 + 18 + 25 + 15 + 10 + 18 + 8 + 0 + 2 + 0 = 100. c A bar chart, score 1–10 across. d Mode 3, median 4, mean 407 ÷ 100 = 4.07. e No: the averages are about 3 or 4 out of 10, and only 28 of 100 scored 6 or more. 3 a Quick and cheap, and every customer gets it. b For example “Most customers are happy with the delivery time.” “Younger customers buy more sports shoes.” c No: only people who choose to reply (often very happy or very angry) are in it.' },
    { q: 'Workbook 6.2, Practice 4–6 (pages 77–78)', a: '4 a A two-way table: age (17–22) across, number of subjects down, a tally or frequency in each cell. b 10 in the cell for 18 years, four subjects. c 20 spread over 6 ages is only about 3 students per age; one unusual student changes the answer. 5 a For example every 10th adult who comes in, on different days and times; names at random from the members’ list. b 28. c Some evidence: more than 10 visits — 21–35: 1 of 9; 36–50: 4 of 8; over 50: 6 of 11. d No: about 9 in each age group is small; a bigger sample would be more reliable. 6 a For example 100–200 (5–10%). b At random from the staff list (every 10th or 20th name), from every department and shift. c A short questionnaire with tick boxes or a 1–5 scale.' },
    { q: 'Workbook 6.2, Challenge 7–9 (pages 78–79)', a: '7 a A grouped bar chart (no gaps): 20–29: 4, 30–39: 11, 40–49: 6, 50–59: 6, 60–69: 3. b From 25 to 69 years; the largest group is 30–39; mean about 42. It is only a sample of 30 out of 265, so we can say “probably”. 8 a Your friends are likely to be like you (same class, same opinions): not representative. b At random from the school list, from every class (and boys and girls). c For example “How much do you enjoy maths? 1 (not at all) to 5 (very much).” d Tally the scores, draw a bar chart, find the mode or the mean. 9 a Column means: 3.5, 3.25, 2, 3, 4.5, 2.5, 3.75, 2.75, 3, 3.75 (from 2 to 4.5). b Row means: 3, 3, 3.7, 3.1. c True: the means of the samples of 10 are much closer together (and closer to 3) than the means of 4.' },
  ],
  notes:
    'NOTEBOOK COUNT (slide 22): 4 written panels — population, sample, sample size (4), a fair sample (8), at random (10), a large sample is better (12) — and 1 drawing: population to sample (18).\n\n' +
    'FOR THE OBSERVER. The goal is said on slide 2 and checked on slide 22 (the same three, with their key words). Ask before you tell: the starter (1), every card (3), the story (7), the vote (9), every press of the model (11), the class’s own samples (14). Every student answers at once on 1, 9 and the whiteboards (6, 16, 17); the class samples itself with real random names (14). Real photographs: a free sample and a blood sample (5), a bowl of phở from Hà Nội (8).\n\n' +
    'WHERE IT SITS. The second and last section of Unit 6, after 6.1 (survey questions, the three kinds of data). It does not use 6.1’s class survey, which expires after 12 hours. Every number on the slides is new, so Exercise 6.2 is unspent: Focus 1 matches slides 11–12, Focus 3 and Practice 6 slides 8–10 and 16, Challenge 8 slides 9–10, Challenge 9 slides 11 and 17. Answers are above.\n\n' +
    'LANGUAGES: English and French; no Vietnamese. The French uses population, échantillon, taille de l’échantillon, équitable, au hasard; the Workbook’s questions (Is this a good way to choose a sample?, representative) stay in English beside their French.\n\n' +
    'THE STORY (slide 7). Deadpan, never flagged as a joke. Mr Bowen is the shared cartoon. “He does not stir” is the set-up: his spoon is a sample of the pot, but only of the salty top.\n\n' +
    'THE MODEL (slide 11). Nothing is stored: Start again clears it, and reloading the slide starts fresh. The whole school’s answers are fixed (120 of 200 like the menu); each sample is drawn at random, so the dots differ every time — that is the point. If the samples of 5 happen to land close together, press a few more times.\n\n' +
    'CLASS LIST (slide 14). The deck’s own random-name button (bottom bar, or the projector dock) draws without repeats until the round is reset. Load the roster before the lesson.\n\n' +
    'NOT ON THE SLIDES. The words bias and census (say “not fair” and “everyone”); sampling methods by name (stratified, systematic); the exact rule for how big is big enough.',
}

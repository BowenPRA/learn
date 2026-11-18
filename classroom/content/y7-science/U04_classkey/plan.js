// content/y7-science/U04_classkey/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '50 minutes, one period — 6 slides. About 25 minutes go on building the class key (slide 3) and 10 on testing it (slide 4). If you fall behind, test it on three classmates instead of five and copy the key next lesson (it stays on this computer for 12 hours).',
  objective:
    'Students can construct a dichotomous key for the people in their own class: choose questions everyone answers the same way, split each group in two until every person has their own name, test the key on a classmate, and write it as a numbered key.',
  materials: [
    'The classroom computer with the class list in Pick (the Class list button or R). The key is built from that list and saved on this computer only; the repo holds no names. Without a list the slides show eleven sample animals.',
    'Projector / TV. The keyboard and mouse at the front: you type each question and drag the names (or a student does)',
    'Mini whiteboards and pens (slides 1, 2, 6); science notebooks (slide 5)',
  ],
  vocab: [
    { term: 'Key, dichotomous key · la clé, la clé dichotomique', def: 'from 4.4: questions that identify an organism; every question has two answers. Today the organisms are us' },
    { term: 'A good key question · une bonne question', def: 'from 4.5: everyone gives the same answer. You can see it, count it or measure it' },
    { term: 'Split · couper en deux, séparer', def: 'from 4.5: divide a group into two smaller groups' },
    { term: 'Classmate · un camarade de classe', def: 'a person in your class (slide 4)' },
    { term: 'Glasses, hair, shoulders, sleeves, earrings · les lunettes, les cheveux, les épaules, les manches, les boucles d’oreilles', def: 'words the class will probably need for its questions' },
  ],
  timeline: [
    { time: '0–5 min', phase: 'Starter', detail: 'Slide 1: each student writes one yes-or-no question on a whiteboard. Hold them up. Keep two or three good ones on the board for slide 3.' },
    { time: '5–10 min', phase: 'Good for our class?', detail: 'Slide 2: read each question, count “3, 2, 1”, arms up for good, down for bad. Then open the answer. Ask C again: long next to what? D fixes it: you can look and see.' },
    { time: '10–35 min', phase: 'Build our class key', detail: 'Slide 3: click the group, ask for a question, check it is a good one (would everyone agree?), type it. Each student says “yes” or “no” for themselves; drag their name (or click it: one click Yes, again No). “The rest: No” sorts everyone left. Split. Then click a dashed group and repeat until every name stands alone. Ask for questions that split a group roughly in half.' },
    { time: '35–45 min', phase: 'Test it', detail: 'Slide 4: one student thinks of a classmate and whispers the name to you. They answer each question aloud; you press Yes or No. The class follows the path and guesses before the end. Right name: the key works. Wrong name: which question went wrong? Go back to slide 3, click that question and fix it. Then Next classmate. Three to five tests.' },
    { time: '45–50 min', phase: 'Copy and exit', detail: 'Slide 5: everyone copies the numbered key. Slide 6: exit question on whiteboards.' },
  ],
  answers: [
    { q: 'Slide 1 — starter', a: 'Any yes-or-no question that the class can answer the same way and that gives two groups, each with at least one person: Do you wear glasses? Is your hair tied up? Are you wearing a watch? Weak: Are you tall? Are you funny? Are you a boy? (it works as a split, but steer them to what they can see).' },
    { q: 'Slide 2 — good or bad for our class?', a: 'A Are you nice? BAD: people disagree, and you cannot see it. B Do you wear glasses? GOOD: look. C Is your hair long? BAD: long next to what? D Does your hair touch your shoulders? GOOD: look; it is C made good.' },
    { q: 'Slide 3 — what makes a good class question', a: 'Something you can see on the person today, so a classmate can use the key just by looking: glasses, a watch, a ponytail, earrings, long sleeves, the colour of their shoes. Avoid anything about weight, size or family, anything someone might not want to say in front of the class, and questions about names (“Does your name start with M?” splits the group, but it is not a feature). A question everyone answers the same way does not split the group: the widget will not let it.' },
    { q: 'Slide 4 — the key found the wrong name', a: 'Two usual reasons. The question is not clear (Is your bag big?): change its words. Or someone answers differently on different days (Are you wearing a jacket?): change the question; if its groups change, the widget clears the questions under it and the class splits those again.' },
    { q: 'Slide 6 — exit', a: '10 questions for 11 people. Each question splits one group into two, so each question makes one more group; 11 groups (one per person) need 10 questions. With another class size n, it is n − 1. A shorter path (fewer questions to reach a name) comes from splitting groups near the middle.' },
  ],
  notes:
    'NOTEBOOK: 1 key the class wrote, numbered (slide 5). Nothing else is copied.\n\n' +
    'WHERE IT SITS. After 4.5 Constructing keys. The class already knows good key questions, splitting in two, and the branching and numbered styles (4.4); today they use all of it on themselves.\n\n' +
    'NAMES STAY ON THIS COMPUTER. The class key widget reads the class list from Pick on this browser and saves the key here, for 12 hours. Nothing goes to the repo or the database. A student opening the deck at home sees eleven sample animals: they can build an animal key the same way. If the class list changes after the class has started splitting, a note says so; Start again uses the new list.\n\n' +
    'MODEL MOVES. Slide 3: click a group to split it; click a question to change its words or take the split away; Undo goes back one step; Start again asks for a second press. Slide 4: Yes / No follow the key, Back goes up one question, Next classmate starts at the top. Slide 5 writes itself from slide 3; an unfinished group shows as “not split yet”.\n\n' +
    'LANGUAGES: English and French; no Vietnamese. The buttons and hints follow the EN / FR switch. The key itself is in English, as the class writes it.',
}

// content/upper-english/U02/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '30 minutes — 16 slides. If you fall behind: take slide 9 as one spoken answer instead of whiteboards, and skip the answer box on slide 7.',
  objective:
    'Students find the verb in a sentence, use “be” where nothing happens (“She is tired”, not “She very tired”), put the -s on he / she / it verbs, ' +
    'use does / doesn’t and didn’t with the base verb, use the past simple for finished time, and write “there is / there are” instead of “have”.',
  materials: [
    'Projector / TV; the deck runs in English only. It is staff only: students never see it on their home page',
    'Students’ laptops open on their Unit 2 Lesson (the notes, /unit/#/UPPER_ENG/U02/lesson): they follow along there, answering its questions as you reach them. The notes slide for each part is in the timeline',
    'Mini whiteboards and pens (slides 9, 14 and 16)',
    'Notebooks: 5 written notes today, the same 5 as the notes',
  ],
  vocab: [
    { term: 'Verb', def: 'a word for an action (run, eat) or a state (be, have)' },
    { term: 'Be', def: 'am, is, are, was, were: the verb when nothing happens' },
    { term: 'Present simple', def: 'habits and facts: I walk, she walks' },
    { term: 'Past simple', def: 'finished actions: I walked, she went' },
    { term: 'Base form', def: 'the plain verb, with no ending: go, eat, be' },
    { term: 'Irregular', def: 'a verb that makes its past in its own way: go → went' },
    { term: 'Helping verb', def: 'do, does, did, is, are … working with another verb' },
  ],
  timeline: [
    { time: '0–3 min', phase: 'Starter · notes 1', detail: 'Slide 1: everyone writes the two sentences correctly while settling. Take two answers; do not say who is right. It comes back on slide 14.' },
    { time: '3–7 min', phase: 'Find the verb, be · notes 2–3', detail: 'Slide 2: read the two strips; ask for the verb in the pharmacy sentence, then open the answer. Slide 3: copy note 1; read the forms aloud together.' },
    { time: '7–10 min', phase: 'Where be goes missing · notes 4', detail: 'Slide 4: read the wrong one, then the three right ones; point at is / are each time. Slide 5: vote, everyone at once; most should choose B.' },
    { time: '10–14 min', phase: 'Present simple and the -s · notes 5–6', detail: 'Slide 6: copy note 2. Ask who “my mother”, “the bus” and “everyone” are: he / she / it. Slide 7: read the four spellings, then the uncle sentence before opening the answer.' },
    { time: '14–18 min', phase: 'Don’t, doesn’t, does · notes 7', detail: 'Slide 8: copy note 3; stress “only one -s”. Slide 9: whiteboards, two sentences each; hold them up before opening the answers.' },
    { time: '18–23 min', phase: 'Past simple and didn’t · notes 8–9', detail: 'Slide 10: copy note 4; read the ten irregular verbs aloud, then their base forms. Slide 11: vote. Slide 12: read the strips; ask hear or heard before opening.' },
    { time: '23–26 min', phase: 'There is, there are · notes 10', detail: 'Slide 13: copy note 5; ask for the hotels sentence before opening. Slide 14: back to the starter on whiteboards.' },
    { time: '26–30 min', phase: 'Checklist and exit · notes 11–12', detail: 'Slide 15: hands up for each line; check notebooks have 5 notes. Slide 16: the exit question on whiteboards; open the answer.' },
  ],
  answers: [
    { q: 'Slide 1 / 14 — In my town have a big market. It very busy on Saturdays.', a: 'There is a big market in my town. It is very busy on Saturdays. (Also right: “In my town there is a big market.”)' },
    { q: 'Slide 2 — “The pharmacy opens at eight.” The verb?', a: 'opens' },
    { q: 'Slide 5 — Which one is correct?', a: 'B, Our teacher is from Canada.' },
    { q: 'Slide 7 — Every evening my uncle ______ the dishes.', a: 'washes' },
    { q: 'Slide 9 — My cousin plays the piano: not, then a question.', a: 'My cousin doesn’t play the piano. / Does my cousin play the piano?' },
    { q: 'Slide 11 — Last summer my cousins ______ to the mountains.', a: 'B, went.' },
    { q: 'Slide 12 — We didn’t ______ the alarm.', a: 'hear' },
    { q: 'Slide 13 — ______ three hotels near the airport.', a: 'There are' },
    { q: 'Slide 16 — My sister work in a hotel. Last week she meet a famous singer.', a: 'My sister works in a hotel. Last week she met a famous singer.' },
  ],
  notes:
    'The class follows on the Unit 2 notes (12 slides): class slides 1 = notes 1, 2 = notes 2, 3 = notes 3, 4–5 = notes 4, 6 = notes 5, 7 = notes 6, 8–9 = notes 7, 10–11 = notes 8, 12 = notes 9, 13 = notes 10, 15 = notes 11, 16 = notes 12. ' +
    'The notes’ six questions are on slides 2, 5, 7, 11, 12 and 13, so students answer them on their laptops after the hands go up or the answer opens. ' +
    'Votes are left hand A, right hand B, all at once. ' +
    'The common slips to listen for when students speak: “He don’t”, “She doesn’t likes”, “I didn’t went”, and “In my town have …”. ' +
    'Unit 2’s practice mixes in Unit 1 (comma splices, fragments, and “Although …, but …”), so a quick reminder that a comma cannot join two sentences is worth a minute if time allows.',
}

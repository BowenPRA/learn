// content/upper-english/U01/plan.js
// One-page teacher lesson plan, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '30 minutes — 16 slides. If you fall behind: take one vote with hands only and skip its reveal, and do slide 13 as a single sentence on the board.',
  objective:
    'Students know what a complete sentence needs (a subject, a real verb and a complete idea), spot a fragment, a run-on and a comma splice, ' +
    'and fix a run-on or a splice four ways: a full stop, a semicolon, a comma + FANBOYS, or a subordinator chosen by meaning.',
  materials: [
    'Projector / TV; the deck runs in English only. It is staff only: students never see it on their home page',
    'Students’ laptops open on their Unit 1 Lesson (the notes, /unit/#/UPPER_ENG/U01/lesson): they follow along there, answering its checks as you reach them. The notes slide for each part is in the timeline',
    'Mini whiteboards and pens (slides 11 and 16)',
    'Notebooks: 7 written notes today, the same 7 as the notes',
  ],
  vocab: [
    { term: 'Subject', def: 'who or what the sentence is about' },
    { term: 'Verb', def: 'what the subject does or is; a real verb, not an -ing word alone' },
    { term: 'Independent clause', def: 'subject + verb + complete idea; it can stand alone' },
    { term: 'Dependent clause', def: 'subject + verb that starts with a subordinator; it cannot stand alone' },
    { term: 'Subordinator', def: 'because, although, when, while, if, since, until, after, before, unless' },
    { term: 'Fragment', def: 'part of a sentence written as if it were whole: a dependent clause alone, or no real verb' },
    { term: 'Run-on', def: 'two complete sentences with nothing between them' },
    { term: 'Comma splice', def: 'two complete sentences with only a comma between them' },
    { term: 'FANBOYS', def: 'for, and, nor, but, or, yet, so: after a comma they can join two sentences' },
  ],
  timeline: [
    { time: '0–3 min', phase: 'Starter · notes 1', detail: 'Slide 1: everyone writes yes or no and a reason while settling. Take three answers; do not say who is right. It comes back on slide 9.' },
    { time: '3–6 min', phase: 'What a sentence needs · notes 2', detail: 'Slide 2: read the big line, then the three questions on the bus sentence. Copy note 1. Slide 3: read the test aloud, then vote, everyone at once; open the answer.' },
    { time: '6–9 min', phase: 'Independent vs dependent · notes 3', detail: 'Slide 4: copy note 2. Read the subordinators aloud together. Slide 5: vote; most should choose B.' },
    { time: '9–14 min', phase: 'Two kinds of fragment · notes 4–5', detail: 'Slide 6: read the wrong one, then the two fixes; point at the comma in the second. Copy note 3. Slide 7: the same shape; copy note 4. Slide 8: vote.' },
    { time: '14–17 min', phase: 'Run-on and comma splice · notes 6', detail: 'Slide 9: back to the starter — the answer is no. Point at "we" (run-on) and the comma (splice). Copy note 5; read the watch-out.' },
    { time: '17–22 min', phase: 'The four fixes and whiteboards · notes 7–8', detail: 'Slide 10: copy the bumper (note 6), then read each fix. Slide 11: whiteboards, two fixes each; hold them up before opening the four answers. Slide 12: vote.' },
    { time: '22–26 min', phase: 'Joining ideas · notes 9–10', detail: 'Slide 13: read both columns. Slide 14: copy note 7, then the clinic sentence: ask for the joiner before opening the answer.' },
    { time: '26–30 min', phase: 'Checklist and exit · notes 11–12', detail: 'Slide 15: hands up for each line; check notebooks have 7 notes. Slide 16: the exit question on whiteboards, two different ways; open the answers.' },
  ],
  answers: [
    { q: 'Slide 1 — The bus was late, we missed the meeting.', a: 'No: a comma splice. Two complete sentences joined by a comma alone.' },
    { q: 'Slide 3 — Which one is a complete sentence?', a: 'B, The bus was late again.' },
    { q: 'Slide 5 — “Although the shop was open.”', a: 'B, a fragment: a dependent clause on its own.' },
    { q: 'Slide 8 — The best fix?', a: 'A, The nurses check every patient at midnight.' },
    { q: 'Slide 11 — The shop was closed, we went home.', a: 'Any two of: …closed, so we went home. / Because the shop was closed, we went home. / …closed; we went home. / …closed. We went home.' },
    { q: 'Slide 12 — Which version is correct?', a: 'B, It rained all day, so the match was cancelled.' },
    { q: 'Slide 14 — ______ the clinic opens at eight, the queue starts at seven.', a: 'Although (a contrast).' },
    { q: 'Slide 16 — My sister loves music, she plays the guitar every day.', a: 'Any two of: …music, so she plays… / Because my sister loves music, she plays… / …music; she plays… / …music. She plays…' },
  ],
  notes:
    'The class follows on the Unit 1 notes (12 slides): class slides 1 = notes 1, 2–3 = notes 2, 4–5 = notes 3, 6 = notes 4, 7–8 = notes 5, 9 = notes 6, 10 and 12 = notes 7, 11 = notes 8, 13 = notes 9, 14 = notes 10, 15 = notes 11, 16 = notes 12. ' +
    'The votes on slides 3, 5, 8, 12 and 14 are the notes’ own five questions, so students answer them on their laptops after the hands go up. ' +
    'The same seven notes and the same rules as the Unit 1 notes. ' +
    'Votes are left hand A, right hand B, all at once. If a student asks why the essay marker cares: it rewards varied, correctly joined sentences — ' +
    'for example, “Free buses help workers. They are expensive. The city should try them.” becomes “Although free buses are expensive, they help workers, so the city should try them.”',
}

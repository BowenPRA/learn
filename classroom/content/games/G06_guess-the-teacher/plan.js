// content/games/G06_guess-the-teacher/plan.js
// How to run Guess the Teacher at a family event, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '10–15 minutes for five teachers, with joining',
  objective:
    'Students and their parents play as teams on one phone, reading five emojis and naming the teacher they describe. '
    + 'Fast answers score more, so the room watches the clock and the leaderboard together.',
  materials: [
    'A laptop on the TV, signed in to PRA Learn as staff, with the game in Project mode (press F)',
    'Internet on the laptop and on the phones (Wi-Fi or mobile data)',
    'One phone per team: a student and a parent together',
  ],
  vocab: [
    { term: 'Who is this teacher?', def: 'the question on every round, in English on the TV and in Vietnamese on the phones.' },
    { term: 'emoji', def: 'the little pictures: each one is a clue about the teacher (what they like, what they do, what they wear).' },
  ],
  timeline: [
    { time: 'Before', phase: 'Open', detail: 'Open Classroom games, then Guess the Teacher. Press F for full screen. Turn the sound up: the clock ticks and a drumroll plays before each answer.' },
    { time: '0–3 min', phase: 'Join', detail: 'Families scan the QR code (or go to learn.pra.edu.vn/play and type the four-letter code), type a team name and pick an animal. Each team pops onto the TV. Hover over a team and press × to take out a name that is not OK.' },
    { time: 'each round', phase: 'Guess', detail: 'Press Start (Space). The five emojis flip up one every three seconds over 30 seconds. Teams type a name on the phone; a wrong guess freezes the phone for three seconds. Points fall from 1000 to 100 as the clock runs, so guessing early from fewer emojis pays. The round ends when the clock runs out or every team has it.' },
    { time: 'each round', phase: 'Reveal', detail: 'A drumroll, then the teacher\'s name, the fastest team and how many got it. Ask the teacher to wave. Press Space for the leaderboard, Space again for the next round.' },
    { time: 'end', phase: 'Podium', detail: 'After the last round (double points) the top three rise on the podium. Play again keeps the teams; New teams clears them.' },
  ],
  answers: [
    { q: 'What counts as right', a: 'The teacher\'s name with or without Mr / Ms / Thầy / Cô, in capitals or not, with or without accents, and with one small typo (two in a long name). A guess with two teachers\' names in it is wrong.' },
    { q: 'The controls', a: 'Space or Enter: next step. P: pause and carry on. M: sound. +10 s gives the round more time; End round goes straight to the reveal; End game goes back to the start screen with the same teams.' },
    { q: 'A phone lost its team', a: 'Reload the page: the phone remembers its team and comes back with its points. If the TV is reloaded, the game carries on where it was.' },
    { q: 'Adding the other teachers', a: 'Four emoji sets have no name yet. Their names go in teachers.js in this folder; until then the game leaves them out.' },
  ],
}

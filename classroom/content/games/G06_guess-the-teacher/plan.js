// content/games/G06_guess-the-teacher/plan.js
// How to run Guess the Teacher at a family event, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '10–15 minutes for five or six teachers, with joining',
  objective:
    'Students and their parents play as teams on one phone, reading a teacher\'s emojis and locking in one guess at the name. '
    + 'Nobody learns who was right until the reveal, so the whole room waits for the drumroll together.',
  materials: [
    'A laptop on the TV, signed in to PRA Learn as staff (the Office login works), with the game in full screen (press F)',
    'Internet on the laptop and on the phones (Wi-Fi or mobile data)',
    'One phone per team: a student and a parent together',
  ],
  vocab: [
    { term: 'Who is this teacher?', def: 'the question on every teacher, in English on the TV and in Vietnamese on the phones.' },
    { term: 'Lock it in', def: 'a team\'s one guess for a teacher. It cannot be changed, and right or wrong is only shown at the reveal.' },
  ],
  timeline: [
    { time: 'Before', phase: 'The list', detail: 'On the start screen press Edit teachers: each teacher has emojis, the name shown at the reveal, other names that count as right, and an On switch. Order them, or tick Shuffle. Changes save for every staff login (until the database table is set up, on that laptop only).' },
    { time: 'Before', phase: 'Open', detail: 'Classroom games, then Guess the Teacher. Press F for full screen. Turn the sound up: the clock ticks, padlocks clunk as teams lock in, and a drumroll plays before each name.' },
    { time: '0–3 min', phase: 'Join', detail: 'Families scan the QR code (or go to learn.pra.edu.vn/play and type the four-letter code), type a team name and pick an animal. The QR stays in the bottom corner all game for late joiners. Hover over a team and press × to take out a name that is not OK.' },
    { time: 'each teacher', phase: 'Guess', detail: 'Press the big yellow button (or Space, Enter, →) for each step. The emojis flip up one every three seconds over 30 seconds. Each team types a name and locks it in: one guess. A right guess is worth 1000 points at once, falling to 100 at the buzzer, so guessing early from fewer emojis pays. The round ends when the clock runs out, every team has locked in, or you press Show the answer.' },
    { time: 'each teacher', phase: 'Reveal', detail: 'A drumroll, then the name, how many teams got it, the fastest right answer, and the wrong name most teams gave. The points land on the leaderboard now. Ask the teacher to wave. Next teacher.' },
    { time: 'end', phase: 'Podium', detail: 'After the last teacher (double points): Final leaderboard, then Show the podium. Play again keeps the teams; New teams clears them.' },
  ],
  answers: [
    { q: 'What counts as right', a: 'The teacher\'s name or one of their other names, with or without Mr / Ms / Thầy / Cô, in capitals or not, with or without accents, and with one small typo (two in a long name). A guess with two teachers\' names in it is wrong.' },
    { q: 'The controls', a: 'The yellow button, Space, Enter or →: the next step. P: pause and carry on. M: sound. F: full screen. +10 s gives the round more time; Skip teacher moves on with no points; End game goes back to the start screen with the same teams.' },
    { q: 'A phone lost its team', a: 'Reload the page: the phone remembers its team, its points and a guess it locked in. If the TV is reloaded, the game carries on where it was.' },
    { q: 'Setting up the shared list', a: 'Run supabase/learn-games.sql once in the Supabase SQL editor. Until then the editor says the list is saved on this laptop only; once the table exists, the next time the game opens it sends that laptop\'s list up for every staff login.' },
  ],
}

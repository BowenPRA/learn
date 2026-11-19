// content/games/G06_guess-the-teacher/index.js
// Guess the Teacher: an emoji quiz for families on the TV, played on phones.
// Built 19 Nov 2026. One `game` slide (the TV, widgets.jsx); the phones open
// /classroom/#/play/<ROOM> (phone.jsx), with no sign-in.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'games',
    unit: 'G6',
    id: 'G06',
    title: 'Guess the Teacher',
    objective: 'Five emojis describe a teacher. Families scan the QR code, join as teams on their phones and type the teacher\'s name. The faster a right answer, the more points (1000 down to 300; the last round counts double), with a live leaderboard and a podium at the end.',
    order: 6,
    // The TV is in English; the phones carry their own Vietnamese lines for
    // parents. No language switch on the deck.
    vietnamese: false,
  },
  slides,
  plan,
}

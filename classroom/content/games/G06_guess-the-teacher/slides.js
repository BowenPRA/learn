// content/games/G06_guess-the-teacher/slides.js
// One slide: the `game` layout hands the whole slide to the TV screen, which
// carries its own title and controls. The players' phones are not the deck's
// phone remote: they open their own page (phone.jsx, #/play/<ROOM>).
import { TeacherGame } from './widgets.jsx'

export const slides = [
  {
    layout: 'game',
    title: 'Guess the Teacher',
    widget: TeacherGame,
  },
]

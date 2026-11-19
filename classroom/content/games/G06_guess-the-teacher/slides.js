// content/games/G06_guess-the-teacher/slides.js
// One slide, `bare`: classroom/main.jsx gives the TV screen the whole window
// without the deck's bars (Back, the counter, the language and class-list
// buttons), and the game carries its own Next, Full screen and Exit. The
// players' phones are not the deck's phone remote: they open their own page
// (phone.jsx, #/play/<ROOM>).
import { TeacherGame } from './widgets.jsx'

export const slides = [
  {
    layout: 'game',
    bare: true,
    title: 'Guess the Teacher',
    widget: TeacherGame,
  },
]

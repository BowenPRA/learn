// content/games/G05_guess-who/index.js
// Guess Who, discovered by the registry like a lesson. Ported on 16 Nov 2026
// from BowenPRA/classroom, where it was the Halloween carnival's own app
// (src/guess-who/, the copy there is no longer edited), and rebuilt as a
// one-slide game: the board is the widget, Mr Bowen's side is the deck's phone
// remote. Two boards: 36 animals (Science 4.4 Using keys and more), and the
// carnival's 24 monsters. The student-face boards stayed behind.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'games',
    unit: 'G5',
    id: 'G05',
    title: 'Guess Who?',
    titleFr: 'Qui est-ce ?',
    objective: 'Mr Bowen picks a secret card on his phone; the class asks yes-or-no questions, out loud or typed, puts cards down and makes one guess. Fewer questions win more Riverbucks. Two boards, each in its own scene: 36 animals in a jungle, 24 dealt each round (the 21 of Science 4.4 Using keys and 15 more; the ideas under the box are the key\'s own questions, and the reveal adds a fact about the animal), and 24 Halloween monsters under the stars.',
    order: 5,
    // Year 7 is English and French: EN / FR on the switch, no Vietnamese.
    french: true,
    vietnamese: false,
  },
  slides,
  plan,
}

// content/games/G05_guess-who/slides.js
// One slide: the `game` layout hands the whole slide to the board, which
// carries its own title and controls. `remote` is the game's screen on Mr
// Bowen's phone (remote.jsx), drawn by the phone remote while this slide is
// up; its own chunk, so only the phone loads it.
import { lazy } from 'react'
import { GuessWhoGame } from './widgets.jsx'

export const slides = [
  {
    layout: 'game',
    title: 'Guess Who?',
    titleFr: 'Qui est-ce ?',
    widget: GuessWhoGame,
    remote: lazy(() => import('./remote.jsx')),
  },
]

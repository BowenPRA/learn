// content/games/G02_jeopardy/slides.js
// A game unit is one slide: the `game` layout hands the whole slide to the
// widget. A header strip would eat the height the board needs, and the board
// already carries its own title, score strip and controls.
//
// `remote` is the game's screen on Mr Bowen's phone (remote.jsx), drawn by the
// phone remote while this slide is up. Its own chunk: only the phone loads it.
import { lazy } from 'react'
import { JeopardyGame } from './widgets.jsx'

export const slides = [
  {
    layout: 'game',
    title: 'Jeopardy',
    titleVn: 'Jeopardy',
    titleFr: 'Jeopardy',
    widget: JeopardyGame,
    remote: lazy(() => import('./remote.jsx')),
  },
]

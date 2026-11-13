// content/games/G02_jeopardy/rules.js
// The numbers both ends of Jeopardy agree on: the board on the projector
// (widgets.jsx) and the phone remote's copy of it (remote.jsx).

// Six team colours, legible as a bar or a dot on light and on dark. Handed out
// in team order, so a team keeps its colour from the scoreboard to the award
// buttons to the final table — and on the phone.
export const TEAM_COLOURS = ['#1cb0f6', '#58cc02', '#ff9600', '#ec4899', '#8b5cf6', '#14b8a6']

export const VALUES = [100, 200, 300, 400, 500]

// The clue countdown, in seconds.
export const TIMER_SECONDS = 30

export const MIN_TEAMS = 2
export const MAX_TEAMS = 6

// The steps a score can be corrected by, on the laptop's editor and the phone's.
export const SCORE_STEPS = [-500, -100, 100, 500]

export const cellKey = (c, r) => `${c}-${r}`

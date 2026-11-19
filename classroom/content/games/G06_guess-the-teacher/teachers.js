// content/games/G06_guess-the-teacher/teachers.js
// The rounds: five emojis that describe a teacher, and the teacher's name.
// Only the TV reads this file; the phones never get a name until the reveal.
//
// A set with no `name` yet is left out of the game. To add one, fill in its
// name: "Mr. Seth" is shown at the reveal, and any guess of "Seth", "mr seth",
// "Thầy Seth" or a one-letter typo of it counts. `also` lists other names the
// teacher goes by (a Vietnamese name, a nickname), each accepted the same way.
// Capitals, accents and Mr / Ms / Thầy / Cô never matter.

export const TEACHERS = [
  { emojis: ['🏠', '🖥️', '🖨️', '📞', '👖'], name: 'Ms. Hien', also: [] },
  { emojis: ['👨‍🍳', '📲', '💡', '🛍️', '🧦'], name: 'Mr. Seth', also: [] },
  { emojis: ['💻', '⌚️', '📚', '☕️', '🧠'], name: 'Mr. Bowen', also: [] },
  { emojis: ['🎮', '🏐', '🏓', '🎨', '🕺'], name: 'Mr. Caleb', also: [] },
  { emojis: ['🐥', '👓', '🔝', '👏', '🤗'], name: 'Ms. Solo', also: [] },
  // Names to come.
  { emojis: ['👩🏻‍🦱', '👀', '👀', '😇', '🤫'], name: '', also: [] },
  { emojis: ['🥚', '☀️', '🚫', '🙉', '🪑'], name: '', also: [] },
  { emojis: ['❤️', '⭐', '🤝', '⚖️', '🦉'], name: '', also: [] },
  { emojis: ['💻', '👓', '😄', '🤝', '💡'], name: '', also: [] },
]

/** The sets that can be played: the ones with a name. */
export const PLAYABLE = TEACHERS.map((t, i) => (t.name ? i : -1)).filter((i) => i >= 0)

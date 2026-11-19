// content/games/G06_guess-the-teacher/teachers.js
// The starting list: what the game plays until someone edits the list on the
// TV (Edit teachers, saved for every staff login by list.js). Once a list has
// been saved, this file is no longer read. Only the TV reads it; the phones
// never get a name until the reveal.
//
// A set with no `name` is left out of the game. "Mr. Seth" is shown at the
// reveal, and any guess of "Seth", "mr seth", "Thầy Seth" or a one-letter
// typo of it counts. `also` lists other names the teacher goes by (a
// Vietnamese name, a nickname). Capitals, accents and Mr / Ms / Thầy / Cô
// never matter.

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

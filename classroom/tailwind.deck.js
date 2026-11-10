// Tailwind for the classroom page only (deck.css picks this file with @config).
// The theme is the classroom's own (tailwind.config.js beside this file, moved from
// BowenPRA/classroom on 10 Nov 2026), so the decks keep their colours and fonts; only the
// files to scan change, to this folder. PRA Learn's tailwind.config.js never sees
// these files, and this config never sees PRA Learn's.
import classroom from './tailwind.config.js'

export default {
  ...classroom,
  content: {
    relative: true,
    files: ['./index.html', './main.jsx', './src/**/*.{js,jsx}', './content/**/*.{js,jsx}'],
  },
}

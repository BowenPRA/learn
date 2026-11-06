// Tailwind for the unit page only (unit.css picks this file with @config). The theme is
// the Dashboard's own (tailwind.config.js beside this file, copied from BowenPRA/Dashboard
// by the sync), so its tasks keep their colours; only the files to scan change, to this
// folder. PRA Learn's tailwind.config.js never sees these files.
import dashboard from './tailwind.config.js'

export default {
  ...dashboard,
  content: {
    relative: true,
    files: ['./index.html', './main.jsx', './app/**/*.{js,jsx}', './content/**/*.{js,jsx}', './src/**/*.{js,jsx}'],
  },
}

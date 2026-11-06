# The classroom page

Mr. Bowen's classroom decks (BowenPRA/classroom), shown in PRA Learn exactly as he
teaches them: every slide, layout, widget, reveal, photo and film, the EN/FR switch,
dark mode and full screen. Bowen, 6 November 2026: "the full, high quality classroom
experience", not a review pack.

It is its own page, `/classroom/#/lesson/<course>/<slug>` (`classroom/index.html`,
a second Vite input in `vite.config.js`), so the decks keep the classroom's own CSS
and Tailwind theme and never mix with PRA Learn's.

| Path | Whose | What |
|---|---|---|
| `src/`, `content/`, `tailwind.config.js` | **copied** | The classroom's deck player, the lesson folders and every file they import, byte for byte. Never edit them here: edit the classroom and sync again. |
| `SOURCE.json` | generated | The classroom commit and the files copied. |
| `index.html`, `main.jsx` | PRA Learn | The page: a PRA Learn sign-in (or demo), only the lessons listed in `src/data/classroomLessons.js`, Back goes to the PRA Learn home, no teacher's plan button or old Dashboard link. |
| `deck.css`, `tailwind.deck.js` | PRA Learn | The classroom's `index.css` built with the classroom's theme, scanning this folder only. |

Icons come from `lucide-react-classroom`, an alias pinned to the classroom's
lucide-react version (`vite.config.js` points this folder's imports at it): newer
versions draw some icons differently.

## Adding a lesson, or picking up changes

1. Add the lesson to `src/data/classroomLessons.js` (course folder, lesson folder,
   PRA Learn class, unit and title).
2. `npm run sync:classroom` copies it from `C:\Users\sbowe\code\classroom` at
   `origin/main` (`git fetch` there first to get the latest). `--repo` and `--ref`
   choose another checkout or commit. It refuses if an import is missing, a package
   is not in PRA Learn's `package.json`, or the classroom's lucide-react version changed.
3. Run the dev server and open the lesson from the home page (`/?demo` for demo mode).

The same command picks up any change Mr. Bowen makes to a deck in the classroom.
Students see it after the next deploy.

// content/y7-science/U02_1a/widgets.jsx
// One widget, and it does exactly one thing a slide cannot: it leaves the deck.
//
// The Word Wall lives in the games course, and there is no way to reach it from
// a slide — every layout renders text, pictures and diagrams, and none of them
// renders a link. So this is a button, and nothing else: no state, no score, no
// cleverness. It jumps to the games deck with `?level=solid-liquid-gas` on the
// URL, which WordWallGame reads on mount and opens straight onto that puzzle
// (see content/games/G01_word-wall/widgets.jsx). Without the query the class
// lands on a menu of thirty puzzles and the teacher hunts for the right
// one in front of thirty children.
//
// The href is a bare fragment on purpose. The app runs under HashRouter at
// /classroom/, so `#/lesson/...` replaces only the fragment and the base path
// looks after itself — hand-writing the base here would break the dev server.
//
// It takes the deck's `lang`, so every string has Vietnamese and French twins.
import { Gamepad2, ArrowRight } from 'lucide-react'
import { tr as pick } from '../../../src/lib/lang.js'

const AMBER = '#f59e0b'
const WALL_URL = '#/lesson/games/G01_word-wall?level=solid-liquid-gas'

export function WordWallLink({ lang = 'en' }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <a
        href={WALL_URL}
        className="group w-full max-w-md rounded-2xl border-2 border-b-[6px] border-amber-300 dark:border-amber-500/70 bg-amber-50 dark:bg-amber-500/10 px-6 py-8 text-center no-underline transition-all active:border-b-2 active:translate-y-[4px] hover:border-amber-400 dark:hover:border-amber-400"
      >
        <span
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ backgroundColor: AMBER }}
        >
          <Gamepad2 className="h-9 w-9 text-white" strokeWidth={2.5} />
        </span>

        <span className="block text-xs font-black uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
          {pick(lang, 'Word Wall', 'Bức Tường Từ', 'Mur de mots')}
        </span>

        <span className="mt-1 block text-2xl font-black leading-tight tracking-tight text-slate-800 dark:text-slate-100">
          {pick(lang, 'Solid, Liquid or Gas?', 'Rắn, Lỏng hay Khí?', 'Solide, liquide ou gaz ?')}
        </span>

        <span className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-base font-black text-white" style={{ backgroundColor: AMBER }}>
          {pick(lang, 'Play the puzzle', 'Chơi thử', 'Jouer')}
          <ArrowRight className="h-5 w-5" strokeWidth={3} />
        </span>

        <span className="mt-4 block text-xs font-bold text-slate-500 dark:text-slate-400">
          {pick(lang, 'Press Back in the game to return to this deck.', 'Bấm Back trong trò chơi để quay lại bài giảng.', 'Appuie sur Back dans le jeu pour revenir ici.')}
        </span>
      </a>
    </div>
  )
}

// The tasks a unit page can play that are their own screens: the lesson deck, the quiz,
// and each interactive task (`engine` in src/data/units.js). Every one is handed
// { pool, savedData, onProgress(raw, blob), onComplete(raw, blob), onQuit, langs } and
// reports its score out of `nativeMax`. A new interactive task adds one entry to ENGINES.
import { lazy } from 'react'
import { assetUrl, slideAudioUrl } from '../src/utils/assetPaths.js'

const TASKS = import.meta.glob('../src/tasks/*.jsx')
const task = (name) => lazy(TASKS[`../src/tasks/${name}.jsx`])

/** The lesson deck (Dashboard NOTES): slide audio and pictures resolved as the registry's buildPool does. */
export const NOTES = {
  nativeMax: 10,
  component: task('Notes'),
  pool: (u, { track, unitId }) =>
    (u.notes || []).map((note, i) => ({
      ...note,
      audio: slideAudioUrl(track, unitId, i + 1),
      ...(note.image ? { image: assetUrl(note.image) } : null),
      ...(Array.isArray(note.columns) && note.columns.some((c) => c?.image)
        ? { columns: note.columns.map((c) => (c?.image ? { ...c, image: assetUrl(c.image) } : c)) } : null),
      ...(Array.isArray(note.items) && note.items.some((it) => it?.image)
        ? { items: note.items.map((it) => (it?.image ? { ...it, image: assetUrl(it.image) } : it)) } : null),
    })),
  props: ({ pool, saved, onComplete, onProgress, onQuit }) => ({ slides: pool, savedData: saved || undefined, onComplete, onProgress, onQuit, bilingual: true }),
}

/** The quiz (Dashboard ASSESSMENT): reports XP out of 20. */
export const ASSESSMENT = {
  nativeMax: 20,
  component: task('Assessment'),
  pool: () => [],
  props: ({ unit, onComplete, onQuit }) => ({ unit, onComplete, onQuit, bilingual: true }),
}

const ours = (load) => lazy(load)
const usual = ({ pool, saved, onComplete, onProgress, onQuit }) => ({ pool, savedData: saved || {}, onComplete, onProgress, onQuit, bilingual: true })

/** The interactive tasks, by the name a unit's task gives in `engine` (src/data/units.js). */
export const ENGINES = {
  TideLab: {
    nativeMax: 10,
    component: task('TideLab'),
    pool: (u) => u.tideLab,
    props: usual,
  },
  // Maths 5.3: measure angles with a protractor the student places.
  Protractor: {
    nativeMax: 10,
    component: ours(() => import('./tasks/ProtractorTask.jsx')),
    pool: (u) => u.protractor,
    props: usual,
  },
  // Maths 5.3: a quadrilateral from a sketch, its fourth angle, the 360° check, then on paper.
  QuadCheck: {
    nativeMax: 10,
    component: task('ZeroLine'),
    pool: (u) => u.quads,
    props: usual,
  },
  // Bus stop (short) division (the Dashboard's Year 7 Maths 3.2 task, brought over 20
  // November 2026 and redesigned the same day): Maths 7.1's fractions as decimals, the
  // whole bus stop open from the first problem, help only on request or after a mistake.
  BusStop: {
    nativeMax: 10,
    component: task('ShortDivision'),
    pool: (u) => u.shortDiv,
    props: usual,
  },
  // Upper Secondary English: choose the right form inside a short passage.
  GrammarEdit: {
    nativeMax: 20,
    component: task('GrammarEdit'),
    pool: (u) => ({ exercises: u.grammarEdit || [] }),
    props: ({ pool, saved, onComplete, onQuit }) => ({ pool, savedData: saved || {}, onComplete, onQuit }),
  },
  // Upper Secondary English: type a new, correct version of a faulty sentence (a splice, a
  // run-on, a fragment, a missing verb). The checker is rules, not AI: app/tasks/rewrite.js.
  Rewrite: {
    nativeMax: 10,
    component: ours(() => import('./tasks/RewriteTask.jsx')),
    pool: (u) => u.rewrite || [],
    props: ({ pool, saved, onComplete, onProgress, onQuit }) => ({ pool, savedData: saved || {}, onComplete, onProgress, onQuit }),
  },
  // Upper Secondary English: find the mistakes in a passage and type the fixes.
  FindFix: {
    nativeMax: 10,
    component: task('Proofread'),
    pool: (u) => u.proofread || [],
    props: usual,
  },
}

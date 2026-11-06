// The Dashboard tasks a unit page plays, as the Dashboard's task registry describes them
// (BowenPRA/Dashboard src/tasks/taskRegistry.js): the scale each reports its score on
// (`nativeMax`) and what it is handed. Copied entry by entry, so each task gets exactly
// what it gets on the Dashboard. A new unit's main task adds one line to ENGINES.
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

/** Each unit's main interactive task, by its component's name (src/data/units.js `engine`). */
export const ENGINES = {
  TideLab: {
    nativeMax: 10,
    label: 'Tide Lab', labelFr: 'Labo des marées',
    component: task('TideLab'),
    pool: (u) => u.tideLab,
    props: ({ pool, saved, onComplete, onProgress, onQuit }) => ({ pool, savedData: saved || {}, onComplete, onProgress, onQuit, bilingual: true }),
  },
}

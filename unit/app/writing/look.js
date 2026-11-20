// Shared wording and colours for timed writing: the three parts of the mark, the mark's
// colour, dates and times, and the flags a teacher (and the student) sees.

export const TRAITS = [
  { key: 'ideas', label: 'Ideas', ink: '#7C5CFF' },
  { key: 'organisation', label: 'Organisation', ink: '#0ea5e9' },
  { key: 'language', label: 'Language', ink: '#f97316' },
]

/** A mark's colour: green at 9 and up, amber 6 to 8, rose below. */
export function markTone(mark) {
  if (mark == null) return { face: '#94a3b8', edge: '#64748b' }
  if (mark >= 9) return { face: '#58cc02', edge: '#58a700' }
  if (mark >= 6) return { face: '#ff9600', edge: '#cc7800' }
  return { face: '#f43f5e', edge: '#be123c' }
}

export const fmtDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const fmtMinutes = (s) => `${Math.floor((s || 0) / 60)}:${String((s || 0) % 60).padStart(2, '0')}`

/** What happened while the essay was written, as lines; `warn` ones are worth a teacher's look. */
export function flagLines(essay) {
  const f = essay?.flags || {}
  const r = essay?.report || {}
  const out = []
  if (f.tabAways > 0) out.push({ warn: f.tabAways >= 3, text: `Left the writing page ${f.tabAways} time${f.tabAways === 1 ? '' : 's'}${f.secondsAway ? ` (${fmtMinutes(f.secondsAway)} away)` : ''}.` })
  if (f.pasteTries > 0) out.push({ warn: true, text: `Tried to paste ${f.pasteTries} time${f.pasteTries === 1 ? '' : 's'} (blocked).` })
  if (f.bigInserts > 0) out.push({ warn: true, text: `${f.bigInserts} large block${f.bigInserts === 1 ? '' : 's'} of text appeared at once.` })
  if (f.addOns?.length) out.push({ warn: true, text: `A writing add-on was working in the box: ${f.addOns.join(', ')}.` })
  if (f.timedOut) out.push({ warn: false, text: 'Handed in when the time ran out.' })
  if (f.late) out.push({ warn: true, text: 'The page was closed before the end; handed in as last saved.' })
  if (r.classmateMatch >= 0.3) out.push({ warn: true, text: `About ${Math.round(r.classmateMatch * 100)}% matches another student's essay. Your teacher will look at this.` })
  return out
}

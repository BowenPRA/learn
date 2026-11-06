// content/y7-science/U03_tidelab/lab.js
// The River Tide Lab's calendar, and its results kept in this browser.
//
// A labelled bamboo pole stands in the river. The class reads the water on it
// four times every school day — 8:30, 10:30, 12:30 and 2:30 — from Thursday
// 29 October to Thursday 12 November 2026: 11 days, 44 readings, in cm.
//
// The readings live in localStorage under one key, and unlike the 12-hour
// class data of Our Squares (5.3) and the survey (6.1) they NEVER expire: the
// lab runs for two weeks and the table is filled in one cell at a time on the
// classroom computer. Only numbers are kept, never names. Clear all (a second
// press to confirm) is the only thing that empties it.

export const STORE = 'classroom:y7-science:U03_tidelab:readings'

// iso: the date. day / date: [English, French] for the table and the graph.
// week: 0, 1 or 2 — the table and the graph leave a gap at each weekend.
export const DAYS = [
  { iso: '2026-10-29', day: ['Thu', 'jeu.'], date: ['29 Oct', '29 oct.'], week: 0 },
  { iso: '2026-10-30', day: ['Fri', 'ven.'], date: ['30 Oct', '30 oct.'], week: 0 },
  { iso: '2026-11-02', day: ['Mon', 'lun.'], date: ['2 Nov', '2 nov.'], week: 1 },
  { iso: '2026-11-03', day: ['Tue', 'mar.'], date: ['3 Nov', '3 nov.'], week: 1 },
  { iso: '2026-11-04', day: ['Wed', 'mer.'], date: ['4 Nov', '4 nov.'], week: 1 },
  { iso: '2026-11-05', day: ['Thu', 'jeu.'], date: ['5 Nov', '5 nov.'], week: 1 },
  { iso: '2026-11-06', day: ['Fri', 'ven.'], date: ['6 Nov', '6 nov.'], week: 1 },
  { iso: '2026-11-09', day: ['Mon', 'lun.'], date: ['9 Nov', '9 nov.'], week: 2 },
  { iso: '2026-11-10', day: ['Tue', 'mar.'], date: ['10 Nov', '10 nov.'], week: 2 },
  { iso: '2026-11-11', day: ['Wed', 'mer.'], date: ['11 Nov', '11 nov.'], week: 2 },
  { iso: '2026-11-12', day: ['Thu', 'jeu.'], date: ['12 Nov', '12 nov.'], week: 2 },
]

// [English, French]: the class reads the clock as 8:30 … 2:30; French writes
// the afternoon one as 14 h 30.
export const TIMES = [['8:30', '8 h 30'], ['10:30', '10 h 30'], ['12:30', '12 h 30'], ['2:30', '14 h 30']]

export const TOTAL = DAYS.length * TIMES.length

const blank = () => Object.fromEntries(DAYS.map((d) => [d.iso, TIMES.map(() => '')]))

/** Every cell as typed, { iso: ['', '', '', ''] }; empty when nothing is saved. */
export function loadReadings() {
  const cells = blank()
  try {
    const raw = JSON.parse(window.localStorage.getItem(STORE) || 'null')
    if (raw && raw.cells) {
      for (const d of DAYS) {
        const row = raw.cells[d.iso]
        if (Array.isArray(row)) cells[d.iso] = TIMES.map((_, i) => (typeof row[i] === 'string' ? row[i] : ''))
      }
    }
  } catch { /* storage blocked or empty */ }
  return cells
}

/** Save every cell; false if the browser refused. */
export function saveReadings(cells) {
  try {
    window.localStorage.setItem(STORE, JSON.stringify({ v: 1, cells, at: Date.now() }))
    return true
  } catch {
    return false
  }
}

/** A cell's reading in cm, or null when it is empty or not a number (85, 85.5 and 85,5 all work). */
export function cm(text) {
  const s = String(text ?? '').trim().replace(',', '.')
  return /^\d{1,4}(\.\d+)?$/.test(s) ? Number(s) : null
}

/** True when a cell holds something that is not a reading. */
export const badCell = (text) => String(text ?? '').trim() !== '' && cm(text) === null

/** Today as YYYY-MM-DD on this computer's clock, to light up today's column. */
export function todayIso() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// The bridge to the Dashboard (BowenPRA/Dashboard), the self-study app.
//
// A classroom deck is the lesson as taught in the room; the Dashboard unit is
// the same section rebuilt for a student working alone — the deck reduced to
// scored check questions, plus vocabulary, practice, questions and a quiz. A
// lesson that has a self-study twin declares it in its meta:
//
//   dashboard: { track: 'Y7_MATH', unit: 'U02_1' }
//
// The course page and the deck's own toolbar turn that into a link straight
// to the unit (the Dashboard expands and scrolls to `?unit=`). The Dashboard
// carries the reverse pointer (`meta.classroom`). Pairing rules live in the
// Dashboard repo: docs/classroom-dashboard-pairing.md.
export const DASHBOARD_BASE = 'https://bowenpra.github.io/Dashboard/'

/** URL of the Dashboard unit a lesson pairs with, or null when it has none. */
export const dashboardUnitUrl = (ref) => {
  if (!ref?.track || !ref?.unit) return null
  return `${DASHBOARD_BASE}#/${encodeURIComponent(ref.track)}?unit=${encodeURIComponent(ref.unit)}`
}

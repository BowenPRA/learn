// Reading a lesson pack (docs/DESIGN.md section 7). The same rules as the
// database's learn_part_ids / learn_pack_parts, so a score worked out here in demo
// mode matches the one learn_save works out.

export const FORMAT = 'pra-learn-pack/1'

/** The parts of a pack: [{ id, kind, title, titleVn, ... }]. */
export const partsOf = (content) => (Array.isArray(content?.parts) ? content.parts : [])

export const partOf = (content, id) => partsOf(content).find((p) => p.id === id) || null

/** The ids a part is scored on: the review's check ids, or the practice items' ids. */
export function partIds(content, id) {
  const p = partOf(content, id)
  if (!p) return []
  if (p.kind === 'review') return (Array.isArray(p.slides) ? p.slides : []).map((s) => s?.check?.id).filter(Boolean)
  if (p.kind === 'practice') return (Array.isArray(p.set?.items) ? p.set.items : []).map((it) => it?.id).filter(Boolean)
  return []
}

/** [{ id, kind, total }] as learn_pack_parts returns. */
export const partSummary = (content) => partsOf(content).map((p) => ({ id: p.id, kind: p.kind, total: partIds(content, p.id).length }))

/** Right first time / items in the part, to 4 places (as learn_save). */
export function scoreOf(content, part, items) {
  const ids = partIds(content, part)
  if (!ids.length) return 0
  const right = ids.filter((id) => items?.[id]?.ok === true).length
  return Math.round((right / ids.length) * 10000) / 10000
}

/** Stars for a score: 3 from 90%, 2 from 60%, else 1 (0 when not done). */
export const starsFor = (score, done = true) => (!done || score == null ? 0 : score >= 0.9 ? 3 : score >= 0.6 ? 2 : 1)

/** Replace "asset:<file>" in an image field with its signed link (or drop it when there is none). */
export const assetSrc = (value, urls) => {
  if (typeof value !== 'string') return null
  if (value.startsWith('asset:')) return urls?.[value.slice(6)] || null
  return null // only pack assets are allowed; outside links are not drawn
}

/** Progress rows as { [pack_id]: { [part]: row } }. */
export const byPack = (progress) => {
  const out = {}
  for (const g of progress || []) (out[g.pack_id] ||= {})[g.part] = g
  return out
}

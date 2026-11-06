// What a step-practice set saves. The blob holds only items finished without
// help ({ [itemId]: 1 }), so an item that needed Show me stays to be tried
// again next time. The score (out of 10) counts a saved item as 1 and an item
// finished with help THIS sitting as ½; the host keeps its own best score.

/** The items to run: those not saved yet, in set order; all of them once every item is saved. */
export function queueOf(items, saved = {}) {
  const left = items.filter((it) => saved?.[it.id] !== 1);
  return left.length ? left : items;
}

/**
 * { score (0–10), blob, items, done, total } after this sitting's results.
 * items: one per item finished this sitting —
 *   { itemId, correct, slips: ['s2.1', …], shows: { s3: 1 }, hints, wrong }
 * slips are slip keys (model.js slipKey), shows counts Show me per step ("s<n>", from 1).
 */
export function summaryOf(items, saved = {}, results = {}) {
  const blob = {};
  let points = 0;
  for (const it of items) {
    const r = results[it.id];
    const clean = saved?.[it.id] === 1 || (r && !r.helped);   // once saved, an item stays saved
    if (clean) { blob[it.id] = 1; points += 1; } else if (r) points += 0.5;
  }
  const total = items.length;
  return {
    score: total ? Math.round((points / total) * 10) : 0,
    blob,
    items: items.filter((it) => results[it.id]).map((it) => itemReport(it.id, results[it.id])),
    done: Object.keys(blob).length + items.filter((it) => results[it.id]?.helped && !blob[it.id]).length,
    total,
  };
}

/** One finished item as the host hears it. */
function itemReport(itemId, r) {
  const shows = {};
  for (const [i, n] of Object.entries(r.shows || {})) if (n > 0) shows[`s${Number(i) + 1}`] = n;
  return { itemId, correct: !r.helped, slips: [...(r.slips || [])], shows, hints: r.hints || 0, wrong: r.wrong || 0 };
}

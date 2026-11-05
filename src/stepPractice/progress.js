// What a step-practice set saves. The blob holds only items finished without
// help ({ [itemId]: 1 }), so an item that needed Show me stays to be tried
// again next time. The score (out of 10) counts a saved item as 1 and an item
// finished with help THIS sitting as ½; the host keeps its own best score.

/** The items to run: those not saved yet, in set order; all of them once every item is saved. */
export function queueOf(items, saved = {}) {
  const left = items.filter((it) => saved?.[it.id] !== 1);
  return left.length ? left : items;
}

/** { score (0–10), blob, items: [{ itemId, correct }], done, total } after this sitting's results. */
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
    items: items.filter((it) => results[it.id]).map((it) => ({ itemId: it.id, correct: !results[it.id].helped })),
    done: Object.keys(blob).length + items.filter((it) => results[it.id]?.helped && !blob[it.id]).length,
    total,
  };
}

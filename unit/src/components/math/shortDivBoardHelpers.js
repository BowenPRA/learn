// Helpers shared by ShortDivBoard and the screens that drive it. Kept out of
// the component file so fast refresh sees a component-only module.

/** The order boxes are filled in: q0, k1, q1, k2 … then r, the remainder,
 *  when the item stops at a whole number with what is left over. */
export function boxOrder(avail, remainder = false) {
  const out = [];
  for (let c = 0; c < avail; c += 1) {
    out.push(`q${c}`);
    if (c + 1 < avail) out.push(`k${c + 1}`);
  }
  if (remainder) out.push('r');
  return out;
}

export const boxDomId = (uid, id) => `${uid}-${id}`;

/**
 * Focus a box by id. A box that is already on the page takes the cursor at
 * once (so a fast typist's next key lands in it); one that the next render
 * will draw takes it on the following frame.
 */
export function focusBox(uid, id) {
  const go = () => {
    const el = document.getElementById(boxDomId(uid, id));
    if (el && !el.readOnly && !el.disabled) { el.focus(); el.select?.(); return true; }
    return false;
  };
  if (!go()) requestAnimationFrame(() => { if (!go()) document.getElementById(boxDomId(uid, id))?.focus(); });
}

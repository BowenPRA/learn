// Geometry shared by LinePlane.jsx and the screens that drive it (the Line
// Lab task and the Notes `line` activity). Kept out of the .jsx so that file
// exports only its component (react-refresh/only-export-components).

/** The margin around the lattice, in viewBox units. */
export const PLANE_PAD = 26;

/** Line colours in the order an item's lines are named. */
export const LINE_COLORS = ['#0891b2', '#db2777', '#16a34a', '#d97706'];

/**
 * Pointer position → the nearest lattice point, through the transform the
 * browser really used (getScreenCTM), so a letterboxed or scaled svg still
 * lands the click on the square the student aimed at. Null outside the grid.
 */
export function latticeFromEvent(e, svg, grid, unit) {
  if (!svg || typeof svg.getScreenCTM !== 'function') return null;
  const ctm = svg.getScreenCTM();
  if (!ctm || typeof DOMPoint !== 'function') return null;
  const loc = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
  const gx = Math.round((loc.x - PLANE_PAD) / unit) + grid.xMin;
  const gy = grid.yMax - Math.round((loc.y - PLANE_PAD) / unit);
  if (gx < grid.xMin || gx > grid.xMax || gy < grid.yMin || gy > grid.yMax) return null;
  return [gx, gy];
}

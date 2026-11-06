import { useRef, useState } from 'react';

/**
 * Tap-to-pick and drag-to-drop on the same elements, for the Storyboard boards.
 * `handlers(from)` goes on a draggable thing; anything with a `data-drop`
 * attribute is a target. Mouse, pen and finger all use pointer events; a drag
 * starts after 10 px of movement, so a tap stays a tap. After a drag the
 * browser still fires a click — `tookDrag()` says so, once, so the click can
 * be ignored. (A finger moving up or down scrolls the page — `touch-pan-y` on
 * the element — so on a phone tapping is the sure way; sideways drags work.)
 */
export default function useTapDrag(onDrop) {
  const drag = useRef(null);
  const dragged = useRef(false);
  const [hover, setHover] = useState(null);
  const targetAt = (e) => document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-drop]')?.getAttribute('data-drop') ?? null;
  const handlers = (from) => ({
    onPointerDown: (e) => {
      if (e.button) return;
      drag.current = { from, x: e.clientX, y: e.clientY, id: e.pointerId, moving: false };
    },
    onPointerMove: (e) => {
      const d = drag.current;
      if (!d || d.id !== e.pointerId) return;
      if (!d.moving && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 10) {
        d.moving = true;
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* an old browser: the drag still works without capture */ }
      }
      if (d.moving) setHover(targetAt(e));
    },
    onPointerUp: (e) => {
      const d = drag.current;
      drag.current = null;
      if (!d?.moving) return;
      dragged.current = true;
      setHover(null);
      const to = targetAt(e);
      if (to != null && to !== String(d.from)) onDrop(d.from, to);
    },
    onPointerCancel: () => { drag.current = null; setHover(null); },
  });
  const tookDrag = () => {
    const was = dragged.current;
    dragged.current = false;
    return was;
  };
  return { handlers, hover, tookDrag };
}

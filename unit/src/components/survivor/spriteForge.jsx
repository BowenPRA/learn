// src/components/survivor/spriteForge.jsx
//
// =====================================================================
// Turns the existing Tower Defense artwork into canvas sprites.
//
// Survivor puts two hundred enemies on screen. Tower Defense draws each creep as
// a live SVG element and needed heavy memoisation to survive two hundred of them
// standing still on a grid; two hundred of them MOVING, plus projectiles, would
// not hold thirty frames a second. So Survivor renders to a canvas — and a
// canvas cannot draw a React component.
//
// Rather than redraw every blook and every insect a second time (two copies of
// the same art, guaranteed to drift apart), this module RASTERISES the real
// components once at load:
//
//   1. mount the actual <InsectVisual> and <TowerVisual> components into a
//      hidden container, so there is exactly one definition of the art;
//   2. read each one's serialised outerHTML — the browser writes the SVG
//      namespace in for us, because these elements are not in the HTML
//      namespace and the fragment serialiser has to declare it;
//   3. stamp an explicit pixel size on the root <svg> (the components size
//      themselves with Tailwind classes, which mean nothing to a standalone
//      image) and hand the markup to an <img> as a data URI;
//   4. hold the loaded images in a plain map the render loop draws from.
//
// The cost is one mount and a handful of image decodes before the first frame —
// hence the "Preparing the swarm" screen, which in practice is over before the
// student has finished picking a hero. The payoff is that changing a hedgehog's
// spikes in TowerVisual.jsx changes them in both games.
//
// What is lost in rasterisation: the CSS keyframe classes (leg wiggle, wing
// flap) and Tailwind's drop-shadow, since neither travels inside a standalone
// SVG document. The canvas replaces them with a per-entity sway and a drawn
// shadow, which read better than the originals at this size anyway.
// =====================================================================

import { useEffect, useRef } from 'react';
import TowerVisual, { InsectVisual } from '../towerdefense/TowerVisual';
import { ENEMY_SKINS, enemySkin } from '../towerdefense/gameData';
import { RECRUITABLE } from './survivorData';

/** Rendered size of each rasterised sprite, in device pixels. */
const SPRITE_PX = 128;

/** Every enemy role slot, in the order the tribes declare them. */
const SLOTS = Object.keys(ENEMY_SKINS.INSECT);

/**
 * Give a serialised <svg> an explicit size so it can stand alone as an image.
 *
 * The components size themselves with `class="w-full h-full"`, which resolves to
 * nothing outside the app's stylesheet — an <img> would fall back to the SVG
 * default of 300x150 and squash the viewBox. Injecting width/height (and the
 * namespace, on the chance a serialiser omits it) right after `<svg` leaves
 * every existing attribute, viewBox included, untouched.
 */
function sizeSvg(markup, px) {
  if (!markup.startsWith('<svg')) return markup;
  let inject = ` width="${px}" height="${px}"`;
  if (!/\sxmlns=/.test(markup.slice(0, 240))) {
    inject += ' xmlns="http://www.w3.org/2000/svg"';
  }
  return `<svg${inject}${markup.slice(4)}`;
}

/** An <img> holding one rasterised SVG. Resolves to null rather than throwing. */
function toImage(markup, px) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(sizeSvg(markup, px));
  });
}

/**
 * Bakes a loaded sprite into plain bitmap canvases — the base artwork plus the
 * two tints the games need mid-fight.
 *
 * An <img> whose source is an SVG is not a bitmap: drawn at a new size or angle
 * the browser may rasterise the vector again, and with two hundred bodies on
 * screen that is the frame budget gone. A canvas is pixels, so drawImage from it
 * is a straight blit. The tints are baked for the same reason: a hit flash or a
 * frozen enemy used to cost a per-body CSS filter (TD) or an extra circle over
 * the sprite (Survivor); now it is just a different source image.
 *
 *   atlas[key]            the artwork
 *   atlas[`${key}:flash`] whited out — one frame of "that hit landed"
 *   atlas[`${key}:frost`] iced over — chilled / frozen
 */
function bake(img, px) {
  const make = (tint) => {
    const c = document.createElement('canvas');
    c.width = px; c.height = px;
    const ctx = c.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, px, px);
    if (tint) {
      // source-atop paints only where the sprite already has pixels, so the tint
      // takes the sprite's exact silhouette.
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = tint;
      ctx.fillRect(0, 0, px, px);
    }
    return c;
  };
  return { base: make(null), flash: make('rgba(255,255,255,0.82)'), frost: make('rgba(125,211,252,0.58)'), reaper: make('rgba(76,29,149,0.82)') };
}

/**
 * Mounts every sprite the run needs, hidden, and hands back a ready atlas.
 *
 * `tribeId` decides which artwork the five role slots wear, so an ICE arena
 * forges Frostkin and a NIGHT arena forges the Nightfall — the same rule Tower
 * Defense uses, read from the same table.
 *
 * The atlas is keyed by role slot (`ANT`, `WASP`, …) and by tower id (`DART`,
 * `SNIPER`, …), so the renderer never needs to know which tribe it was handed.
 */
export default function SpriteForge({ tribeId = 'INSECT', onReady, towers = true }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    let cancelled = false;

    (async () => {
      // Child effects have already run by the time this one does, so the SVGs
      // are in the DOM and tagged — no second render pass is needed to see them.
      const nodes = Array.from(host.querySelectorAll('svg[data-sprite]'));
      const entries = await Promise.all(nodes.map(async (node) => {
        const key = node.getAttribute('data-sprite');
        return [key, await toImage(node.outerHTML, SPRITE_PX)];
      }));

      if (cancelled) return;
      const atlas = {};
      for (const [key, img] of entries) {
        if (!img) continue;
        const baked = bake(img, SPRITE_PX);
        atlas[key] = baked.base || img;
        if (baked.flash) atlas[`${key}:flash`] = baked.flash;
        if (baked.frost) atlas[`${key}:frost`] = baked.frost;
        if (baked.reaper) atlas[`${key}:reaper`] = baked.reaper;
      }
      onReady(atlas);
    })();

    return () => { cancelled = true; };
    // onReady is held stable by the caller; re-running would re-forge the atlas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tribeId]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      // Parked off-screen rather than display:none — a hidden subtree still
      // serialises, but keeping it laid out sidesteps any browser quirk around
      // measuring and serialising a zero-size SVG.
      style={{ position: 'fixed', left: -9999, top: -9999, width: 200, height: 200, opacity: 0, pointerEvents: 'none' }}
    >
      {SLOTS.map((slot) => (
        <SpriteSlot key={slot} name={slot}>
          <InsectVisual type={enemySkin(slot, tribeId).visual} />
        </SpriteSlot>
      ))}
      {/* Tower Defense keeps its towers in the DOM, so it forges enemies only. */}
      {towers && RECRUITABLE.map((typeId) => (
        <SpriteSlot key={typeId} name={typeId}>
          <TowerVisual typeId={typeId} size="xl" />
        </SpriteSlot>
      ))}
    </div>
  );
}

/**
 * Tags the <svg> its child renders so the harvester can find and name it.
 *
 * This reaches in with a ref after mount rather than wrapping or cloning, so
 * nothing about how TowerVisual and InsectVisual render has to change to be
 * reusable here — which is the whole point of forging from them.
 */
function SpriteSlot({ name, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const svg = ref.current?.querySelector('svg');
    if (svg) svg.setAttribute('data-sprite', name);
  }, [name]);
  return <div ref={ref} style={{ width: 100, height: 100 }}>{children}</div>;
}

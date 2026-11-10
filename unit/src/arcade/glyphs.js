// src/arcade/glyphs.js
//
// Emoji drawn to a canvas with fillText are slow: the browser shapes and
// rasterises the colour glyph again on every call, and the games draw dozens a
// frame (scenery, armour marks, power-ups). Each glyph is rasterised here once,
// at the size asked for, and after that it is a plain drawImage.

const cache = new Map();

/** A small canvas holding `char` drawn at `px` pixels, made once and kept. */
function glyphCanvas(char, px) {
  const key = `${char}|${px}`;
  let c = cache.get(key);
  if (c) return c;
  // Twice the size, so it stays sharp on a dense screen or a zoomed board.
  const res = 2;
  const box = Math.ceil(px * 1.5);
  c = document.createElement('canvas');
  c.width = box * res;
  c.height = box * res;
  const ctx = c.getContext('2d');
  if (ctx) {
    ctx.scale(res, res);
    ctx.font = `${px}px system-ui, "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(char, box / 2, box / 2 + px * 0.04);
  }
  c.box = box;
  cache.set(key, c);
  return c;
}

/** Draws `char`, centred on (x, y), about `px` pixels tall. */
export function drawGlyph(ctx, char, x, y, px) {
  // Sizes are rounded to a few steps so a field of scenery shares its glyphs.
  const size = Math.max(8, Math.round(px / 4) * 4);
  const c = glyphCanvas(char, size);
  const box = c.box * (px / size);
  ctx.drawImage(c, x - box / 2, y - box / 2, box, box);
}

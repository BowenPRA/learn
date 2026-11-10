// src/components/survivor/SurvivorCanvas.jsx
//
// The draw pass. Reads `gRef.current` and paints it; it never mutates the run.
//
// Everything on this canvas is Tower Defense artwork: the enemy sprites are the
// arena tribe's InsectVisual drawings and the hero and companions are the tower
// blooks, both rasterised by spriteForge. The ground is MAP_THEMES — the same
// palette and the same scatter of decoration symbols the board uses — so a
// student who walks out of the Cryo Lab tower defense and into Survivor is
// standing on the same floor.

import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { MAP_THEMES } from '../towerdefense/themeData';
import { WORLD, WEAPONS, weaponStats, DASH, PICKUPS } from './survivorData';
import { drawGlyph } from '../../arcade/glyphs';

const TAU = Math.PI * 2;

/** Deterministic scatter, so the ground does not reshuffle between frames. */
function makeDecor(count, seed) {
  let s = seed >>> 0;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const out = [];
  for (let i = 0; i < count; i++) {
    out.push({
      x: 40 + rnd() * (WORLD.width - 80),
      y: 40 + rnd() * (WORLD.height - 80),
      v: Math.floor(rnd() * 5),
      s: 0.6 + rnd() * 0.5,
      // Deliberately faint. The scenery and the swarm are both little coloured
      // glyphs on a flat field, and at equal weight a student cannot tell a bat
      // from a moon at a glance — which in a game about not being touched is the
      // only thing they need to tell. Ground dressing loses the contrast fight
      // on purpose.
      a: 0.11 + rnd() * 0.15,
    });
  }
  return out;
}

/**
 * Where the camera actually sits, clamped so it never shows past the arena wall.
 *
 * The engine's camera simply follows the hero, which is the right rule for the
 * simulation but the wrong one for the view: standing in a corner would put half
 * the screen outside the world, an empty field of background colour with a
 * dashed line through it. Clamping here rather than in the engine keeps the
 * simulation ignorant of viewport size — but it means the pointer-to-world
 * conversion has to use this same function, or a click would land somewhere the
 * player did not aim.
 */
function cameraAt(cam, w, h, scale) {
  const viewW = w / scale;
  const viewH = h / scale;
  const x = viewW >= WORLD.width
    ? WORLD.width / 2
    : Math.min(Math.max(cam.x, viewW / 2), WORLD.width - viewW / 2);
  const y = viewH >= WORLD.height
    ? WORLD.height / 2
    : Math.min(Math.max(cam.y, viewH / 2), WORLD.height - viewH / 2);
  return { x, y, viewW, viewH };
}

const PROJ_COLOR = {
  DART: '#38bdf8',
  SNIPER: '#34d399',
  SPLASH: '#fb7185',
  CHAIN: '#fbbf24',
};

// The most canvas pixels worth painting. A big, dense screen (a tablet at 2x)
// would otherwise push three million pixels a frame for no visible gain.
const MAX_PIXELS = 1.7e6;
// How far the thumb moves from where it landed before the stick is "full".
const STICK_R = 46;

function SurvivorCanvas({ gRef, drawRef, sprites, themeId = 'STANDARD', onPointer }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1, scale: 1 });
  // Lets the resize handler repaint without depending on a React commit — see
  // the note in `apply` below.
  const paintRef = useRef(null);
  // Drops the canvas resolution a step when the device cannot keep up (see the
  // frame timer in the painter). 1 = full, never raised again within a run.
  const qualityRef = useRef(1);
  const resizeRef = useRef(null);
  const slowRef = useRef({ last: 0, ema: 16, bad: 0 });
  // The touch stick: where the thumb landed and where it is now, in CSS pixels
  // inside the canvas, or null. Drawn by the painter.
  const stickRef = useRef(null);
  const heldRef = useRef(null);       // the held pointer's SCREEN position
  const reprojectRef = useRef(null);  // re-projects it into the world each frame

  const theme = MAP_THEMES[themeId] || MAP_THEMES.STANDARD;
  const decor = useMemo(() => makeDecor(190, 0x5eed + themeId.length * 977), [themeId]);

  // ---- sizing ----------------------------------------------------------
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;

    const apply = (w, h) => {
      let dpr = Math.min(window.devicePixelRatio || 1, 2) * qualityRef.current;
      if (w * h * dpr * dpr > MAX_PIXELS) dpr = Math.sqrt(MAX_PIXELS / Math.max(1, w * h));
      dpr = Math.max(0.75, dpr);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      // Zoom so a phone sees a useful slice of the arena rather than a close-up
      // of the hero's feet, without letting a wide monitor shrink the sprites.
      const scale = Math.max(0.62, Math.min(1.45, Math.min(w / 1000, h / 620)));
      sizeRef.current = { w, h, dpr, scale, cssW: w, cssH: h };
      // Assigning canvas.width WIPES the canvas, and the next repaint only comes
      // with the next React commit. While the loop is running that is a frame
      // away and invisible — but the loop stops for the level-up screen, so a
      // window resize or a tablet rotation there would leave the arena black
      // behind the modal until the student dismissed it. Repaint immediately.
      paintRef.current?.();
    };

    const obs = new ResizeObserver(entries => {
      const r = entries[0]?.contentRect;
      if (r) apply(r.width, r.height);
    });
    obs.observe(wrap);
    apply(wrap.clientWidth, wrap.clientHeight);
    resizeRef.current = () => apply(sizeRef.current.cssW, sizeRef.current.cssH);
    return () => { obs.disconnect(); resizeRef.current = null; };
  }, []);

  // ---- pointer ---------------------------------------------------------
  // A mouse steers by pointing: its position is reported in WORLD coordinates,
  // so the engine never has to know about the camera, and the hero walks to it.
  // A finger steers with a floating stick: it would otherwise sit on top of the
  // hero, and a thumb resting in a corner of a phone could only ever walk one
  // way. The stick reports a direction instead.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const toWorld = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const { w, h, scale } = sizeRef.current;
      const g = gRef.current;
      const cam = cameraAt(g ? g.cam : { x: 0, y: 0 }, w, h, scale);
      return {
        wx: (clientX - rect.left - w / 2) / scale + cam.x,
        wy: (clientY - rect.top - h / 2) / scale + cam.y,
      };
    };

    // A finger held perfectly still sends no events, but the camera keeps
    // scrolling under it — so the world point it means keeps changing. The
    // screen point is remembered and re-projected every frame (see below);
    // otherwise the hero walks to where the finger USED to point and stops, and
    // a tablet player has to wiggle their thumb to keep moving.
    heldRef.current = null;
    reprojectRef.current = () => {
      const held = heldRef.current;
      if (held) onPointer(toWorld(held.x, held.y));
    };

    // One pointer steers at a time. Its id is kept so that a second finger (on
    // the Dash button, say) lifting does not stop the hero.
    let steerId = null;

    const stickTo = (e) => {
      const rect = canvas.getBoundingClientRect();
      const st = stickRef.current;
      if (!st) return;
      st.x = e.clientX - rect.left; st.y = e.clientY - rect.top;
      const dx = st.x - st.ox, dy = st.y - st.oy;
      const d = Math.hypot(dx, dy);
      // A small dead zone, so a resting thumb does not creep.
      if (d < 8) onPointer({ stick: true, sx: 0, sy: 0 });
      else onPointer({ stick: true, sx: dx / d, sy: dy / d });
      // The base follows a thumb that drags past its edge, so reversing
      // direction never needs a long swipe back across the screen.
      if (d > STICK_R * 1.6) {
        const k = (d - STICK_R * 1.6) / d;
        st.ox += dx * k; st.oy += dy * k;
      }
    };

    const down = (e) => {
      e.preventDefault();
      if (steerId != null) return;
      steerId = e.pointerId;
      canvas.setPointerCapture?.(e.pointerId);
      if (e.pointerType === 'touch') {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        stickRef.current = { ox: x, oy: y, x, y };
        onPointer({ pointerDown: true, stick: true, sx: 0, sy: 0 });
        return;
      }
      heldRef.current = { x: e.clientX, y: e.clientY };
      onPointer({ pointerDown: true, stick: false, ...toWorld(e.clientX, e.clientY) });
    };
    const move = (e) => {
      if (e.pointerId !== steerId) return;
      if (stickRef.current) { stickTo(e); return; }
      if (heldRef.current) heldRef.current = { x: e.clientX, y: e.clientY };
      onPointer({ ...toWorld(e.clientX, e.clientY) });
    };
    const up = (e) => {
      if (e.pointerId !== steerId) return;
      steerId = null;
      heldRef.current = null;
      stickRef.current = null;
      onPointer({ pointerDown: false, stick: false, sx: 0, sy: 0 });
    };

    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      reprojectRef.current = null;
    };
  }, [gRef, onPointer]);

  // ---- draw ------------------------------------------------------------
  //
  // Called by the ENGINE once per display frame (it is registered on `drawRef`),
  // not by React. `alpha` is how far the display is between the last two
  // simulation steps; every moving thing is drawn at lerp(previous, current,
  // alpha), which is what turns a 30Hz simulation into 60fps motion.
  const draw = useCallback((alpha = 1) => {
    const canvas = canvasRef.current;
    const g = gRef.current;
    if (!canvas || !g) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { w, h, dpr, scale } = sizeRef.current;
    if (!w || !h) return;

    // A device that cannot hold ~40 frames a second for a while gets a smaller
    // canvas: fewer pixels to fill is the one saving that never changes play.
    if (g.state === 'PLAYING') {
      const S = slowRef.current;
      const t = performance.now();
      const gap = t - S.last;
      S.last = t;
      if (gap > 0 && gap < 250) {
        S.ema += (gap - S.ema) * 0.05;
        S.bad = S.ema > 26 ? S.bad + 1 : 0;
        if (S.bad > 150 && qualityRef.current > 0.55) {
          qualityRef.current = Math.max(0.5, qualityRef.current - 0.25);
          S.bad = 0; S.ema = 16;
          resizeRef.current?.();
          return;
        }
      }
    }

    const A = alpha;
    const lx = (o) => o.px + (o.x - o.px) * A;
    const ly = (o) => o.py + (o.y - o.py) * A;
    const now = g.t + A * 33;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // --- ground ---------------------------------------------------------
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, w, h);

    const shake = g.shake > 0 ? g.shake : 0;
    const sx = shake ? (Math.random() - 0.5) * shake : 0;
    const sy = shake ? (Math.random() - 0.5) * shake : 0;

    const cam = cameraAt({ x: lx(g.cam), y: ly(g.cam) }, w, h, scale);

    // World -> screen, written straight into the transform: k is the zoom, and
    // (ox, oy) is where the world's origin lands. Sprites set their own
    // transform from these rather than paying for save()/restore() per body.
    const k = dpr * scale;
    const ox = dpr * (w / 2 + sx) - cam.x * k;
    const oy = dpr * (h / 2 + sy) - cam.y * k;
    const world = () => ctx.setTransform(k, 0, 0, k, ox, oy);
    const sprite = (x, y, ang, fx = 1, fy = 1) => {
      const c = Math.cos(ang), s = Math.sin(ang);
      ctx.setTransform(k * c * fx, k * s * fx, -k * s * fy, k * c * fy, ox + x * k, oy + y * k);
    };
    world();

    const { viewW, viewH } = cam;
    const left = cam.x - viewW / 2 - 80;
    const right = cam.x + viewW / 2 + 80;
    const top = cam.y - viewH / 2 - 80;
    const bottom = cam.y + viewH / 2 + 80;
    const visible = (x, y, pad = 0) => x > left - pad && x < right + pad && y > top - pad && y < bottom + pad;

    // Grid, clipped to what the camera can see.
    ctx.strokeStyle = theme.gridStr;
    ctx.lineWidth = 1;
    ctx.beginPath();
    const G = 96;
    for (let x = Math.floor(left / G) * G; x < right; x += G) {
      ctx.moveTo(x, Math.max(0, top)); ctx.lineTo(x, Math.min(WORLD.height, bottom));
    }
    for (let y = Math.floor(top / G) * G; y < bottom; y += G) {
      ctx.moveTo(Math.max(0, left), y); ctx.lineTo(Math.min(WORLD.width, right), y);
    }
    ctx.stroke();

    // The theme's scenery — the same emoji the TD board scatters beside its road.
    for (const d of decor) {
      if (!visible(d.x, d.y)) continue;
      ctx.globalAlpha = d.a;
      drawGlyph(ctx, theme.decoSymbols[d.v] || '·', d.x, d.y, 30 * d.s);
    }
    ctx.globalAlpha = 1;

    // The arena wall. Running out of room is the point, so it is drawn loudly.
    ctx.strokeStyle = theme.pathOutline;
    ctx.lineWidth = 10;
    ctx.setLineDash([26, 18]);
    ctx.strokeRect(0, 0, WORLD.width, WORLD.height);
    ctx.setLineDash([]);

    // The Blight: everything outside the ring is darkened and the ring's edge
    // pulses, so where it is safe to stand is never in doubt.
    if (g.blightR != null) {
      const cx = WORLD.width / 2, cy = WORLD.height / 2;
      ctx.beginPath();
      ctx.rect(left - 200, top - 200, right - left + 400, bottom - top + 400);
      ctx.arc(cx, cy, g.blightR, 0, TAU, true);
      ctx.fillStyle = g.outside ? 'rgba(127,29,29,0.5)' : 'rgba(76,5,25,0.42)';
      ctx.fill('evenodd');
      ctx.beginPath(); ctx.arc(cx, cy, g.blightR, 0, TAU);
      ctx.lineWidth = 6 + Math.sin(now / 160) * 2;
      ctx.strokeStyle = `rgba(244,63,94,${0.55 + Math.sin(now / 160) * 0.2})`;
      ctx.stroke();
    }

    // --- a Broodmother's slam: get OUT of the ring before it fills ----------
    for (const s of g.slams) {
      const p = 1 - Math.max(0, s.life - A * 33) / s.max;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, TAU);
      ctx.fillStyle = 'rgba(239,68,68,0.10)'; ctx.fill();
      ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(239,68,68,0.85)';
      ctx.setLineDash([14, 10]); ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r * p, 0, TAU);
      ctx.fillStyle = `rgba(239,68,68,${0.18 + p * 0.3})`; ctx.fill();
    }

    // --- gems, batched by colour so two hundred of them are three fills --------
    const pulse = 1 + Math.sin(now / 170) * 0.12;
    const drawGems = (pick, r, halo, core) => {
      ctx.fillStyle = halo; ctx.beginPath();
      for (const gem of g.gems) {
        if (!pick(gem)) continue;
        const x = lx(gem), y = ly(gem);
        if (!visible(x, y, 20)) continue;
        ctx.moveTo(x + (r + 4) * pulse, y); ctx.arc(x, y, (r + 4) * pulse, 0, TAU);
      }
      ctx.fill();
      ctx.fillStyle = core; ctx.beginPath();
      for (const gem of g.gems) {
        if (!pick(gem)) continue;
        const x = lx(gem), y = ly(gem);
        if (!visible(x, y, 20)) continue;
        // A diamond reads as treasure; a circle reads as a bullet.
        ctx.moveTo(x, y - r); ctx.lineTo(x + r * 0.8, y); ctx.lineTo(x, y + r); ctx.lineTo(x - r * 0.8, y); ctx.closePath();
      }
      ctx.fill();
    };
    drawGems((m) => !m.heal && !m.power && !m.big, 7, 'rgba(96,165,250,0.25)', '#60a5fa');
    drawGems((m) => !m.heal && !m.power && m.big, 10, 'rgba(244,114,182,0.28)', '#f472b6');
    for (const gem of g.gems) {
      if (!gem.heal && !gem.power) continue;
      const x = lx(gem), y = ly(gem);
      if (!visible(x, y, 30)) continue;
      const P = gem.power ? PICKUPS[gem.power] : null;
      const bob = Math.sin(now / 240 + gem.id) * 3;
      ctx.beginPath(); ctx.arc(x, y + bob, 19 * pulse, 0, TAU);
      ctx.fillStyle = gem.heal ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.22)'; ctx.fill();
      ctx.beginPath(); ctx.arc(x, y + bob, 14, 0, TAU);
      ctx.fillStyle = gem.heal ? '#34d399' : (P?.color || '#fff'); ctx.fill();
      ctx.lineWidth = 2.5; ctx.strokeStyle = '#fff'; ctx.stroke();
      drawGlyph(ctx, gem.heal ? '💚' : (P?.icon || '⭐'), x, y + bob + 1, 16);
    }

    // --- ground effects --------------------------------------------------
    for (const f of g.fx) {
      const t = f.life / f.max;
      if (f.kind === 'nova') {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * (1.05 - t * 0.35), 0, TAU);
        ctx.strokeStyle = f.color;
        ctx.globalAlpha = t * 0.8;
        ctx.lineWidth = 5;
        ctx.stroke();
      } else if (f.kind === 'boom') {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * (1.15 - t * 0.5), 0, TAU);
        ctx.fillStyle = f.color;
        ctx.globalAlpha = t * 0.45;
        ctx.fill();
      } else if (f.kind === 'burst') {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * (1.4 - t), 0, TAU);
        ctx.fillStyle = f.color;
        ctx.globalAlpha = t * 0.5;
        ctx.fill();
      } else if (f.kind === 'arc') {
        // Lightning: jagged, re-rolled every few frames so it crackles.
        const tick = Math.floor(now / 45);
        const dx = f.x2 - f.x, dy = f.y2 - f.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len, ny = dx / len;
        ctx.beginPath(); ctx.moveTo(f.x, f.y);
        for (let s = 1; s < 5; s++) {
          const j = (jitter((f.seed || 0) + tick * 7.3 + s) - 0.5) * 26;
          ctx.lineTo(f.x + dx * (s / 5) + nx * j, f.y + dy * (s / 5) + ny * j);
        }
        ctx.lineTo(f.x2, f.y2);
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.globalAlpha = t * 0.5; ctx.strokeStyle = f.color; ctx.lineWidth = 9; ctx.stroke();
        ctx.globalAlpha = t; ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.stroke();
      } else if (f.kind === 'ghost') {
        const img = sprites[g.hero.typeId];
        if (img) {
          ctx.globalAlpha = t * 0.35;
          sprite(f.x, f.y, 0, f.facing < 0 ? -1 : 1, 1);
          ctx.drawImage(img, -32, -32, 64, 64);
          world();
        }
      }
      ctx.globalAlpha = 1;
    }

    // --- the rainbow lance ------------------------------------------------
    const hx = lx(g.hero), hy = ly(g.hero);
    for (const wpn of g.weapons) {
      if (wpn.id !== 'UNICORN' || wpn.sweep < 0) continue;
      const s = weaponStats('UNICORN', wpn.level);
      const a = wpn.sweepFrom + ((wpn.sweep + A * 33) / s.sweepMs) * TAU;
      const len = 1400;
      sprite(hx, hy, a);
      const grad = ctx.createLinearGradient(0, 0, len, 0);
      grad.addColorStop(0, 'rgba(255,255,255,0.95)');
      grad.addColorStop(0.25, 'rgba(244,114,182,0.85)');
      grad.addColorStop(0.55, 'rgba(129,140,248,0.7)');
      grad.addColorStop(1, 'rgba(45,212,191,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, -s.width / 2, len, s.width);
      world();
    }

    // --- attack telegraphs: drawn UNDER the bodies, read before the move ------
    for (const e of g.enemies) {
      if (e.mode !== 'wind' || e.boss) continue;
      const x = lx(e), y = ly(e);
      if (!visible(x, y, 400)) continue;
      const Acfg = e.attack;
      const reach = e.speed * Acfg.speedMul * (Acfg.goMs / 1000);
      const p = 1 - e.modeT / Acfg.windMs;
      ctx.lineCap = 'round';
      ctx.strokeStyle = `rgba(239,68,68,${0.25 + p * 0.5})`;
      ctx.lineWidth = e.r * 1.5;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + e.ax * reach * p, y + e.ay * reach * p); ctx.stroke();
    }

    // --- enemies ----------------------------------------------------------
    // Shadows first, as one path.
    ctx.fillStyle = 'rgba(0,0,0,0.26)';
    ctx.beginPath();
    for (const e of g.enemies) {
      const x = lx(e), y = ly(e);
      if (!visible(x, y, e.r * 2)) continue;
      ctx.moveTo(x + e.r * 0.8, y + e.r * 0.72);
      ctx.ellipse(x, y + e.r * 0.72, e.r * 0.8, e.r * 0.3, 0, 0, TAU);
    }
    ctx.fill();

    for (const e of g.enemies) {
      const x = lx(e), y = ly(e);
      if (!visible(x, y, e.r * 2)) continue;
      // The pre-tinted sprite does the hit flash and the chill — no overlay pass.
      const key = e.reaper ? `${e.slot}:reaper` : e.flash > 0 ? `${e.slot}:flash` : e.slowT > 0 ? `${e.slot}:frost` : e.slot;
      const img = sprites[key] || sprites[e.slot];
      // Drawn a little larger than the body radius: the artwork has transparent
      // margins, and a forgiving hitbox is the right way round for students.
      const grow = e.age < 200 ? 0.4 + 0.6 * (e.age / 200) : 1;
      const size = e.r * 2.9 * grow;

      // Face the player — or, mid-charge, the way it committed to.
      const face = e.mode === 'seek' ? Math.atan2(hy - y, hx - x) : Math.atan2(e.ay, e.ax);
      // The rasterised sprite lost its CSS leg animation; a scuttle puts the life
      // back. A body winding up shudders instead — that IS the warning.
      const gait = e.mode === 'wind' ? Math.sin(now / 22) * 0.16 : Math.sin(now / 90 + e.phase) * 0.09;
      const squash = e.mode === 'go' ? 1.18 : 1 + Math.sin(now / 90 + e.phase) * 0.04;
      sprite(x, y, face + Math.PI / 2 + gait, 2 - squash, squash);
      if (img) ctx.drawImage(img, -size / 2, -size / 2, size, size);
      else {
        ctx.beginPath();
        ctx.arc(0, 0, e.r, 0, TAU);
        ctx.fillStyle = '#7f1d1d';
        ctx.fill();
      }
    }
    world();

    // Only the things worth tracking carry a bar; two hundred ant health bars
    // would be the loudest thing on screen and say nothing.
    for (const e of g.enemies) {
      if (!(e.boss || e.elite) || e.hp >= e.maxHp) continue;
      const x = lx(e), y = ly(e);
      const bw = e.r * 2.6;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(x - bw / 2, y - e.r - 16, bw, 7);
      ctx.fillStyle = e.boss ? '#ef4444' : '#a855f7';
      ctx.fillRect(x - bw / 2, y - e.r - 16, bw * Math.max(0, e.hp / e.maxHp), 7);
    }

    // Reapers wear a dark halo — the one body a student must never touch.
    for (const e of g.enemies) {
      if (!e.reaper) continue;
      const x = lx(e), y = ly(e);
      const glow = ctx.createRadialGradient(x, y, e.r * 0.4, x, y, e.r * 2.2);
      glow.addColorStop(0, 'rgba(192,132,252,0.35)');
      glow.addColorStop(1, 'rgba(76,29,149,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(x, y, e.r * 2.2, 0, TAU); ctx.fill();
    }

    // --- bits of what used to be enemies ------------------------------------
    for (const s of g.shards) {
      const t = s.life / s.max;
      ctx.globalAlpha = Math.min(1, t * 1.6);
      ctx.fillStyle = s.color;
      const sz = s.size * (0.4 + t * 0.6);
      ctx.fillRect(s.x - sz / 2, s.y - sz / 2, sz, sz);
    }
    ctx.globalAlpha = 1;

    // --- bullets ----------------------------------------------------------
    for (const b of g.bullets) {
      const x = lx(b), y = ly(b);
      if (!visible(x, y, 24)) continue;
      const color = PROJ_COLOR[b.kind] || '#e2e8f0';
      if (b.splash) {
        // Where it will land, then the shell riding an arc above its shadow.
        if (b.tx != null) {
          ctx.beginPath(); ctx.arc(b.tx, b.ty, b.splash * 0.5, 0, TAU);
          ctx.strokeStyle = 'rgba(251,113,133,0.4)'; ctx.lineWidth = 2;
          ctx.setLineDash([6, 6]); ctx.stroke(); ctx.setLineDash([]);
        }
        const t = b.arc ? (b.arcT + A * 33) / b.arc : 0;
        const lift = Math.sin(Math.min(1, t) * Math.PI) * 46;
        ctx.beginPath();
        ctx.ellipse(x, y, 7, 3, 0, 0, TAU);
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y - lift, b.r, 0, TAU);
        ctx.fillStyle = color;
        ctx.fill();
      } else {
        sprite(x, y, Math.atan2(b.vy, b.vx));
        // The tail is two flat strips, faint then solid: it reads the same as
        // a gradient at this size and costs nothing to make.
        const len = b.kind === 'SNIPER' ? 34 : 18;
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.35;
        ctx.fillRect(-len, -b.r / 2, len * 0.55, b.r);
        ctx.globalAlpha = 1;
        ctx.fillRect(-len * 0.45, -b.r / 2, len * 0.45, b.r);
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(0, 0, b.r / 1.8, 0, TAU);
        ctx.fill();
        world();
      }
    }

    // --- companions --------------------------------------------------------
    const compCount = Math.max(1, g.weapons.length - 1);
    for (let i = 1; i < g.weapons.length; i++) {
      const wpn = g.weapons[i];
      const a = (now / 2600) * TAU + ((i - 1) / compCount) * TAU;
      const cx = hx + Math.cos(a) * 64;
      const cy = hy + Math.sin(a) * 64;
      const img = sprites[wpn.id];
      // Companions sit a step smaller than the hero and orbit a little wider, so
      // a full squad of five never buries the thing the student is steering.
      const size = 38 + wpn.level * 2.5;

      ctx.beginPath();
      ctx.ellipse(cx, cy + size * 0.36, size * 0.3, size * 0.12, 0, 0, TAU);
      ctx.fillStyle = 'rgba(0,0,0,0.28)';
      ctx.fill();

      if (img) {
        const bob = Math.sin(now / 220 + i) * 3;
        ctx.drawImage(img, cx - size / 2, cy - size / 2 + bob, size, size);
      }
      // A ring of pips for the weapon's level — readable at a glance mid-fight.
      if (wpn.level > 1) {
        ctx.fillStyle = '#fbbf24';
        for (let p = 0; p < wpn.level - 1; p++) {
          ctx.beginPath();
          ctx.arc(cx - 8 + p * 5, cy + size * 0.46, 2, 0, TAU);
          ctx.fill();
        }
      }
    }

    // --- hero --------------------------------------------------------------
    {
      const hero = g.hero;
      const size = 64;
      const bob = Math.sin(hero.walkPhase) * 3.5;

      ctx.beginPath();
      ctx.ellipse(hx, hy + size * 0.4, size * 0.34, size * 0.14, 0, 0, TAU);
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fill();

      // The dash gauge: an arc at the hero's feet that refills, so "is it back
      // yet?" is answered where the student is already looking.
      const ready = hero.dashCd <= 0;
      const fill = ready ? 1 : 1 - hero.dashCd / DASH.cooldownMs;
      ctx.lineCap = 'round';
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'rgba(15,23,42,0.45)';
      ctx.beginPath(); ctx.arc(hx, hy + 4, 42, Math.PI * 0.2, Math.PI * 0.8); ctx.stroke();
      ctx.strokeStyle = ready ? '#7dd3fc' : 'rgba(125,211,252,0.55)';
      ctx.beginPath(); ctx.arc(hx, hy + 4, 42, Math.PI * 0.8 - Math.PI * 0.6 * fill, Math.PI * 0.8); ctx.stroke();

      // Cryo's chill radius is the one weapon whose range you have to stand in,
      // so it is the one that gets drawn.
      const nova = g.weapons.find(x => WEAPONS[x.id]?.kind === 'NOVA');
      if (nova) {
        const s = weaponStats(nova.id, nova.level);
        ctx.beginPath();
        ctx.arc(hx, hy, s.radius, 0, TAU);
        ctx.strokeStyle = 'rgba(103,232,249,0.35)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      const dashing = hero.dashT > 0;
      const img = sprites[hero.hurtFlash > 0 ? `${hero.typeId}:flash` : hero.typeId] || sprites[hero.typeId];
      // Blink while invulnerable, stretch while dashing.
      const blink = hero.iframe > 0 && !dashing && Math.floor(now / 70) % 2 === 0;
      ctx.globalAlpha = blink ? 0.45 : 1;
      sprite(hx, hy + bob, 0, (hero.facing < 0 ? -1 : 1) * (dashing ? 1.25 : 1), dashing ? 0.85 : 1);
      if (img) ctx.drawImage(img, -size / 2, -size / 2, size, size);
      world();
      ctx.globalAlpha = 1;
    }

    // --- floating text ------------------------------------------------------
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(15,23,42,0.85)';
    ctx.lineWidth = 3;
    // Small numbers, then big ones: the font is set twice a frame, not once a
    // number.
    for (let pass = 0; pass < 2; pass++) {
      const big = pass === 1;
      let fontSet = false;
      for (const n of g.nums) {
        if (!!n.big !== big) continue;
        if (!fontSet) { ctx.font = `900 ${big ? 20 : 14}px system-ui, sans-serif`; ctx.fillStyle = big ? '#fde047' : '#ffffff'; fontSet = true; }
        const t = n.life / n.max;
        ctx.globalAlpha = Math.min(1, t * 2);
        ctx.strokeText(n.text, n.x, n.y);
        ctx.fillText(n.text, n.x, n.y);
      }
    }
    if (g.pops.length) {
      ctx.font = '900 19px system-ui, sans-serif';
      ctx.lineWidth = 4;
      for (const p of g.pops) {
        const t = p.life / p.max;
        // A pop lands with a little overshoot, then settles.
        const age = 1 - t;
        const punch = age < 0.12 ? 1 + (0.12 - age) * 3 : 1;
        ctx.globalAlpha = Math.min(1, t * 1.6);
        if (punch !== 1) { ctx.save(); ctx.translate(p.x, p.y); ctx.scale(punch, punch); ctx.translate(-p.x, -p.y); }
        ctx.strokeText(p.text, p.x, p.y);
        ctx.fillStyle = p.color;
        ctx.fillText(p.text, p.x, p.y);
        if (punch !== 1) ctx.restore();
      }
    }
    ctx.globalAlpha = 1;

    // ---- screen space from here ----------------------------------------------
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Low health closes in from the edges and pulses with a heartbeat.
    const hpPct = g.hero.hp / g.hero.maxHp;
    if (hpPct < 0.35 && g.state !== 'DEAD') {
      const beat = 0.55 + 0.45 * Math.abs(Math.sin(now / 320));
      const v = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.32, w / 2, h / 2, Math.max(w, h) * 0.75);
      v.addColorStop(0, 'rgba(220,38,38,0)');
      v.addColorStop(1, `rgba(220,38,38,${(0.35 - hpPct) * 1.6 * beat})`);
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, w, h);
    }

    // --- the XP bar, along the top edge -----------------------------------------
    // The header's own bar is hidden on a phone; this one is always there, so
    // every gem visibly moves the student toward the next level (and the next
    // question).
    {
      const hero = g.hero;
      const pct = Math.max(0, Math.min(1, hero.xp / hero.xpNext));
      ctx.fillStyle = 'rgba(15,23,42,0.6)';
      ctx.fillRect(0, 0, w, 6);
      ctx.fillStyle = '#1CB0F6';
      ctx.fillRect(0, 0, w * pct, 6);
      ctx.textBaseline = 'top';
      ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(15,23,42,0.85)';
      // On a narrow screen the header has no room for the level, so it goes here.
      if (w < 640) {
        ctx.font = '900 11px system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.strokeText(`LEVEL ${hero.level}`, 8, 10);
        ctx.fillStyle = '#e0f2fe';
        ctx.fillText(`LEVEL ${hero.level}`, 8, 10);
      }

      // The kill chain, big and central, swelling a little with each kill.
      if (g.combo >= 5) {
        const fresh = Math.max(0, (g.comboT - 2300) / 300);
        const size = Math.round(22 + Math.min(14, g.combo / 6) + fresh * 6);
        ctx.font = `900 ${size}px system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.globalAlpha = Math.min(1, g.comboT / 600);
        ctx.lineWidth = 4;
        ctx.strokeText(`×${g.combo}`, w / 2, 14);
        ctx.fillStyle = g.combo >= 50 ? '#fb923c' : '#fbbf24';
        ctx.fillText(`×${g.combo}`, w / 2, 14);
        ctx.globalAlpha = 1;
      }
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    }

    // --- the touch stick ----------------------------------------------------------
    const st = stickRef.current;
    if (st) {
      const dx = st.x - st.ox, dy = st.y - st.oy;
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, STICK_R / d);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.fillStyle = 'rgba(15,23,42,0.25)';
      ctx.beginPath(); ctx.arc(st.ox, st.oy, STICK_R, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.beginPath(); ctx.arc(st.ox + dx * k, st.oy + dy * k, 20, 0, TAU); ctx.fill();
    }

    // --- off-screen threat markers -------------------------------------------
    // The boss, the elites and any power-up can be outside the view while they
    // matter most, so an arrow on the rim keeps them findable.
    const rim = (x, y, color, glyph) => {
      if (visible(x, y, 0)) return;
      const a = Math.atan2(y - cam.y, x - cam.x);
      const rx = w / 2 + Math.cos(a) * (Math.min(w, h) / 2 - 34);
      const ry = h / 2 + Math.sin(a) * (Math.min(w, h) / 2 - 34);
      const c = Math.cos(a), s = Math.sin(a);
      ctx.setTransform(dpr * c, dpr * s, -dpr * s, dpr * c, dpr * rx, dpr * ry);
      ctx.beginPath();
      ctx.moveTo(14, 0); ctx.lineTo(-10, -9); ctx.lineTo(-10, 9);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (glyph) drawGlyph(ctx, glyph, rx - c * 24, ry - s * 24, 14);
    };
    for (const e of g.enemies) if (e.boss || e.elite || e.reaper) rim(e.x, e.y, e.reaper ? '#c084fc' : e.boss ? '#ef4444' : '#a855f7', e.reaper ? '\u2620\ufe0f' : null);
    if (g.outside) rim(WORLD.width / 2, WORLD.height / 2, '#f43f5e', '\u2b06\ufe0f');
    for (const gem of g.gems) if (gem.power) rim(gem.x, gem.y, PICKUPS[gem.power].color, PICKUPS[gem.power].icon);
  }, [gRef, sprites, theme, decor]);

  // Hand the painter to the engine; it calls it once per display frame, after
  // re-projecting a held finger (the camera scrolls under a finger held still).
  useEffect(() => {
    drawRef.current = (alpha) => { reprojectRef.current?.(); draw(alpha); };
    paintRef.current = draw;
    return () => { drawRef.current = null; };
  }, [draw, drawRef]);

  return (
    <div ref={wrapRef} className="relative flex-1 min-h-0 w-full overflow-hidden">
      <canvas ref={canvasRef} className="block touch-none select-none cursor-crosshair" />
    </div>
  );
}

// Memoised: its props never change during a run, and the HUD above it
// re-renders ten times a second.
export default memo(SurvivorCanvas);

/** A repeatable 0..1 from a number — lightning jitter that does not strobe. */
function jitter(n) {
  const s = Math.sin(n * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}

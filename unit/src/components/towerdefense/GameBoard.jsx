// src/components/towerdefense/GameBoard.jsx
//
// The board is two things stacked:
//
//   DOM     what stands still — the ground, the road, the scenery, the towers,
//           the range ring and the build ghost. React renders these, and only
//           when the player does something.
//   CANVAS  what moves — every enemy, shot, spark, number and beam. The engine
//           calls the painter registered on `drawRef` once per display frame and
//           React is not involved at all.
//
// It used to be all DOM: each enemy was a live animated <svg> pushed around by
// style writes at a capped 30fps, a frozen enemy wore a four-stage CSS filter,
// and every projectile, particle and damage number was a React element
// reconciled thirty times a second. A heavy wave was several hundred nodes.
import { useMemo, useRef, useState, useCallback, useEffect, useSyncExternalStore, memo } from 'react';
import { ENEMIES, TOWERS, getEffectiveStats, getNitroBuff } from './gameData';
import { MAP_THEMES } from './themeData';
import TowerVisual, { DonutBase } from './TowerVisual';
import UpgradeBadges from './UpgradeBadges';
import { drawGlyph } from '../../arcade/glyphs';

export const CELL_SIZE = 48;
const HALF = CELL_SIZE / 2;
const TAU = Math.PI * 2;

const X = (col) => col * CELL_SIZE + HALF;
const Y = (row) => row * CELL_SIZE + HALF;

const StaticEnvironment = memo(({ width, height, theme, pathPoints, decorations }) => {
  const fallbackDecos = ['🌳', '🌲', '🍄', '🌿', '🪨'];
  const symbols = theme.decoSymbols || fallbackDecos;

  return (
    <>
      <svg className="absolute inset-0 pointer-events-none" width={width} height={height}>
        <defs>
          <pattern id="td-grid" width={CELL_SIZE} height={CELL_SIZE} patternUnits="userSpaceOnUse">
            <path d={`M ${CELL_SIZE} 0 L 0 0 0 ${CELL_SIZE}`} fill="none" stroke={theme.gridStr} strokeWidth="2" />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#td-grid)" />
      </svg>

      {decorations.map(d => (
        <div
          key={`dec_${d.id}`}
          className="absolute pointer-events-none select-none drop-shadow-md z-10"
          style={{
            transform: `translate(${d.col * CELL_SIZE + CELL_SIZE / 2}px, ${d.row * CELL_SIZE + CELL_SIZE / 2}px) translate(-50%, -50%)`,
            fontSize: d.variant === 0 || d.variant === 1 ? 28 : 20,
            opacity: d.variant === 4 ? 0.7 : 0.95
          }}
        >
          {symbols[d.variant % symbols.length]}
        </div>
      ))}

      <svg className="absolute inset-0 pointer-events-none z-0 transition-colors duration-500" width={width} height={height}>
        <polyline points={pathPoints} fill="none" stroke={theme.pathOutline} strokeWidth={CELL_SIZE - 4} strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={pathPoints} fill="none" stroke={theme.pathCore} strokeWidth={CELL_SIZE - 12} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </>
  );
});

function GameBoard({
  layout, gRef, drawRef, sprites, boardScale = 1,
  towers, decorations,
  // The run and its tick store, for the one thing on the board that follows a
  // live number: the exit's health (see LiveExit).
  run, store,
  selectedTowerId, hoveredTowerId, activeBuilder, hoverCell,
  onCellClick, onCellHover, onCellLeave, onTowerClick, themeId = 'STANDARD',
  // The placed unicorn tower (or null) and whether the player is aiming a beam.
  // Its charge ring and aim line are painted on the canvas from `g` directly.
  unicorn = null, aiming = false,
  // Bumped whenever a tower is built, sold or upgraded. The engine mutates
  // towers in place, so array identity alone cannot tell the memoised tower
  // layer that an upgrade needs repainting.
  towersVersion = 0
}) {
  const { rows, cols, path } = layout;
  const width = cols * CELL_SIZE;
  const height = rows * CELL_SIZE;
  const theme = MAP_THEMES[themeId] || MAP_THEMES.STANDARD;
  const boardRef = useRef(null);
  const canvasRef = useRef(null);

  // id -> the tower's DOM node, so the painter can give it a recoil kick when
  // the engine reports it fired. useState, not useRef: the identity must be
  // stable for the whole mount and is read during render by the tower layer.
  const [towerNodes] = useState(() => new Map());

  // What the painter needs from React, without making the painter depend on it.
  const liveRef = useRef(null);
  useEffect(() => {
    liveRef.current = { sprites, boardScale, unicorn, aiming, hoverCell };
  });

  const pathCellSet = useMemo(() => {
    const s = new Set();
    for (let i = 0; i < path.length - 1; i++) {
      const [r1, c1] = path[i];
      const [r2, c2] = path[i + 1];
      const minR = Math.min(r1, r2), maxR = Math.max(r1, r2);
      const minC = Math.min(c1, c2), maxC = Math.max(c1, c2);
      for (let r = minR; r <= maxR; r++) {
        for (let c = minC; c <= maxC; c++) s.add(`${r}_${c}`);
      }
    }
    return s;
  }, [path]);

  const pathPoints = useMemo(() =>
    path.map(([r, c]) => `${c * CELL_SIZE + CELL_SIZE / 2},${r * CELL_SIZE + CELL_SIZE / 2}`).join(' ')
  , [path]);

  // ---- the painter --------------------------------------------------------
  useEffect(() => {
    if (!drawRef) return undefined;
    drawRef.current = (alpha) => {
      const canvas = canvasRef.current;
      const g = gRef.current;
      const live = liveRef.current;
      if (!canvas || !g || !live) return;
      paint(canvas, g, live, alpha, width, height);

      // A tower that fired gets a quick squash — the one bit of motion the DOM
      // towers have, and what makes a quiet board read as "working".
      if (g.fired.length) {
        const nowMs = performance.now();
        for (const id of g.fired) {
          const node = towerNodes.get(id);
          // One kick at a time: a fast tower fires again before the last kick
          // has finished, and stacking animations costs more than it shows.
          if (node?.animate && nowMs - (node.kickAt || 0) > 140) {
            node.kickAt = nowMs;
            node.animate(
              [{ transform: 'scale(1)' }, { transform: 'scale(1.16)' }, { transform: 'scale(1)' }],
              { duration: 130, easing: 'ease-out' }
            );
          }
        }
        g.fired.length = 0;
      }

      // The whole board shakes together, so towers never slide against the road.
      const board = boardRef.current;
      if (board) {
        const s = g.shake > 0.3 ? g.shake : 0;
        const next = s ? `translate(${((Math.random() - 0.5) * s).toFixed(1)}px, ${((Math.random() - 0.5) * s).toFixed(1)}px)` : '';
        if (board.style.transform !== next) board.style.transform = next;
      }
    };
    return () => { drawRef.current = null; };
  }, [drawRef, gRef, width, height, towerNodes]);

  const handlePointerInteraction = (e, isClick) => {
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const scaleX = rect.width / width;
    const scaleY = rect.height / height;

    const x = (e.clientX - rect.left) / scaleX;
    const y = (e.clientY - rect.top) / scaleY;

    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);

    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      const isPath = pathCellSet.has(`${row}_${col}`);
      if (isClick) {
        onCellClick(row, col, isPath);
      } else if (hoverCell.row !== row || hoverCell.col !== col) {
        onCellHover(row, col, isPath);
      }
    }
  };

  const rangeTower = towers.find(t => t.id === selectedTowerId) || towers.find(t => t.id === hoveredTowerId);
  const rangeStats = rangeTower ? getEffectiveStats(rangeTower, towers) : null;
  // The unicorn's "range" is the whole map along a line, not a circle — no ring.
  const rangeVal = (rangeStats && rangeTower.typeId !== 'UNICORN') ? (rangeStats.range || rangeStats.auraRange) : 0;

  return (
    <div
      ref={boardRef}
      onPointerMove={(e) => handlePointerInteraction(e, false)}
      onClick={(e) => handlePointerInteraction(e, true)}
      onPointerLeave={onCellLeave}
      className="relative w-full h-full overflow-hidden shadow-2xl cursor-pointer transition-colors duration-500 touch-none select-none"
      style={{ width, height, backgroundColor: theme.bg }}
    >
      <style>{`
        @keyframes td-pop-in {
          0% { transform: scale(0) translateY(-12px); }
          70% { transform: scale(1.12) translateY(0); }
          100% { transform: scale(1) translateY(0); }
        }
        .td-pop-in { animation: td-pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>

      <StaticEnvironment
        width={width} height={height}
        theme={theme} pathPoints={pathPoints}
        decorations={decorations}
      />

      <PortalMarker row={path[0][0]} col={path[0][1]} kind="in" />
      <LiveExit run={run} store={store} row={path[path.length - 1][0]} col={path[path.length - 1][1]} />

      {rangeTower && rangeStats && rangeVal > 0 && (
        <div
          className="absolute pointer-events-none rounded-full border-[3px] border-white z-10 transition-all duration-300"
          style={{
            transform: `translate(${rangeTower.col * CELL_SIZE + CELL_SIZE / 2 - rangeVal * CELL_SIZE}px, ${rangeTower.row * CELL_SIZE + CELL_SIZE / 2 - rangeVal * CELL_SIZE}px)`,
            width: rangeVal * 2 * CELL_SIZE, height: rangeVal * 2 * CELL_SIZE,
            background: 'rgba(255,255,255,0.15)', borderStyle: 'dashed'
          }}
        />
      )}

      {activeBuilder && hoverCell.row >= 0 && (() => {
        const tConf = TOWERS[activeBuilder.typeId];
        if (!tConf) return null;
        const fakeTower = { id: 'temp_builder', typeId: activeBuilder.typeId, row: hoverCell.row, col: hoverCell.col, upgrades: {} };
        const ghostStats = getEffectiveStats(fakeTower, towers);
        // The unicorn covers the whole board on a line — its range isn't a circle.
        const range = activeBuilder.typeId === 'UNICORN' ? 0 : (ghostStats.range || ghostStats.auraRange || 0);
        return (
          <>
            {range > 0 && (
              <div
                className="absolute pointer-events-none rounded-full border-[3px] z-10 transition-all duration-75"
                style={{
                  transform: `translate(${hoverCell.col * CELL_SIZE + CELL_SIZE / 2 - range * CELL_SIZE}px, ${hoverCell.row * CELL_SIZE + CELL_SIZE / 2 - range * CELL_SIZE}px)`,
                  width: range * 2 * CELL_SIZE, height: range * 2 * CELL_SIZE,
                  borderStyle: 'dashed',
                  borderColor: hoverCell.valid ? 'rgba(255,255,255,0.9)' : 'rgba(234,43,43,0.9)',
                  background: hoverCell.valid ? 'rgba(255,255,255,0.15)' : 'rgba(234,43,43,0.2)'
                }}
              />
            )}
            <div
              className="absolute pointer-events-none flex items-center justify-center z-10 transition-all duration-75"
              style={{
                transform: `translate(${hoverCell.col * CELL_SIZE}px, ${hoverCell.row * CELL_SIZE}px)`,
                width: CELL_SIZE, height: CELL_SIZE, opacity: hoverCell.valid ? 0.9 : 0.4
              }}
            >
              <TowerVisual typeId={activeBuilder.typeId} size="md" dimmed={!hoverCell.valid} />
            </div>
          </>
        );
      })()}

      <TowerLayer
        towers={towers} towersVersion={towersVersion}
        selectedTowerId={selectedTowerId}
        hoveredTowerId={hoveredTowerId} onTowerClick={onTowerClick}
        registry={towerNodes}
      />

      {/* Everything that moves. Above the towers so a shot is never hidden by
          the tower that fired it; pointer-events off so taps reach the board. */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-30"
        style={{ width, height }}
      />
    </div>
  );
}

// =====================================================================
// The painter. Plain functions over a 2D context — nothing here is React.
// =====================================================================

const FLOATER_STYLE = {
  dmg:  { color: '#ffffff', size: 13 },
  gold: { color: '#FFC800', size: 15 },
  bolt: { color: '#FFC800', size: 20 },
  bad:  { color: '#fb7185', size: 20 },
};

const BANNER_TONE = {
  good:  ['#58A700', '#ffffff'],
  plain: ['rgba(15,23,42,0.88)', '#ffffff'],
  warn:  ['#EA2B2B', '#ffffff'],
  boss:  ['#7f1d1d', '#fecaca'],
};

const lerp = (a, b, t) => a + (b - a) * t;

/** A repeatable 0..1 from a number — for lightning jitter that must not strobe. */
const hash = (n) => {
  const s = Math.sin(n * 12.9898) * 43758.5453;
  return s - Math.floor(s);
};

function paint(canvas, g, live, alpha, width, height) {
  // Match the backing store to how big the board is actually shown. The board is
  // CSS-scaled to fit the screen, and a canvas at 1x under a 2x scale is mush.
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const res = Math.max(1, Math.min(3, (live.boardScale || 1) * dpr));
  const bw = Math.round(width * res), bh = Math.round(height * res);
  if (canvas.width !== bw || canvas.height !== bh) { canvas.width = bw; canvas.height = bh; }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(res, 0, 0, res, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const sprites = live.sprites || {};
  const time = (g.time || 0) + alpha * 33;

  // --- napalm on the ground -----------------------------------------------
  for (const z of g.burnZones) {
    const k = z.life / z.maxLife;
    const r = z.radius * CELL_SIZE;
    const grad = ctx.createRadialGradient(X(z.col), Y(z.row), r * 0.15, X(z.col), Y(z.row), r);
    grad.addColorStop(0, `rgba(251,146,60,${0.42 * Math.min(1, k * 2)})`);
    grad.addColorStop(1, 'rgba(244,63,94,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(X(z.col), Y(z.row), r * (0.94 + 0.06 * Math.sin(time / 130 + z.id)), 0, TAU);
    ctx.fill();
  }

  // --- enemies ---------------------------------------------------------------
  for (const c of g.creeps) {
    if (c.hp <= 0) continue;
    const x = X(lerp(c.pc, c.col, alpha));
    const y = Y(lerp(c.pr, c.row, alpha));
    const eConf = ENEMIES[c.typeKey];
    const radius = c.radius || eConf?.radius || 14;
    // A fresh spawn pops in rather than appearing.
    const grow = c.age < 220 ? 0.35 + 0.65 * (c.age / 220) : 1;
    const size = radius * 2.5 * grow;
    const frozen = c.freezeTimer > 0;

    // Ground shadow — bodies, not stickers.
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.beginPath();
    ctx.ellipse(x, y + size * 0.3, size * 0.32, size * 0.13, 0, 0, TAU);
    ctx.fill();

    const key = c.flash > 0 ? `${c.typeKey}:flash` : frozen ? `${c.typeKey}:frost` : c.typeKey;
    const img = sprites[key] || sprites[c.typeKey];
    // The rasterised sprite lost its CSS leg animation; a scuttle (a sway plus a
    // tiny squash, stilled when frozen) puts the life back for almost nothing.
    const gait = frozen ? 0 : Math.sin(time / 85 + c.phase);
    const ang = ((c.angle || 0) + 90) * (Math.PI / 180) + gait * 0.09;
    const cos = Math.cos(ang), sin = Math.sin(ang);
    const sx = 1 + gait * 0.04, sy = 1 - gait * 0.04;
    ctx.setTransform(res * cos * sx, res * sin * sx, -res * sin * sy, res * cos * sy, res * x, res * y);
    if (img) ctx.drawImage(img, -size / 2, -size / 2, size, size);
    else {
      ctx.fillStyle = '#7f1d1d';
      ctx.beginPath(); ctx.arc(0, 0, radius, 0, TAU); ctx.fill();
    }
    ctx.setTransform(res, 0, 0, res, 0, 0);

    // A health bar only once something has been done to it: a road of full green
    // bars says nothing and hides the bodies.
    if (c.hp < c.maxHp) {
      const pct = Math.max(0, c.hp / c.maxHp);
      const w = Math.max(26, radius * 1.9);
      const by = y - size / 2 - 8;
      ctx.fillStyle = 'rgba(15,23,42,0.85)';
      ctx.fillRect(x - w / 2 - 1, by - 1, w + 2, 6);
      ctx.fillStyle = pct > 0.5 ? '#58A700' : pct > 0.25 ? '#FFC800' : '#EA2B2B';
      ctx.fillRect(x - w / 2, by, w * pct, 4);
    }

    if (c.burning > 0 || (c.burnStacks && c.burnStacks.length > 0)) {
      drawGlyph(ctx, '🔥', x + size * 0.34, y - size * 0.34, 12);
    }
    // Armour is a balance stat the player has to plan around, so it is marked.
    if (eConf?.damageReduction > 0) {
      drawGlyph(ctx, '🛡️', x, y + size * 0.5 + 5, 10);
    }
  }

  // --- shots ---------------------------------------------------------------------
  for (const p of g.projectiles) {
    const fade = Math.max(0, p.life / p.maxLife);

    if (p.kind === 'CHAIN') {
      // Lightning, jagged and re-rolled every few frames so it crackles.
      const tick = Math.floor(time / 45);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      for (let pass = 0; pass < 2; pass++) {
        ctx.beginPath();
        ctx.moveTo(X(p.col), Y(p.row));
        let fx = X(p.col), fy = Y(p.row);
        (p.lines || []).forEach((ln, li) => {
          const tx = X(ln.col), ty = Y(ln.row);
          const dx = tx - fx, dy = ty - fy;
          const len = Math.hypot(dx, dy) || 1;
          const nx = -dy / len, ny = dx / len;
          for (let s = 1; s < 4; s++) {
            const j = (hash(p.seed + tick * 7.3 + li * 31 + s) - 0.5) * 16;
            ctx.lineTo(fx + dx * (s / 4) + nx * j, fy + dy * (s / 4) + ny * j);
          }
          ctx.lineTo(tx, ty);
          fx = tx; fy = ty;
        });
        ctx.strokeStyle = pass === 0 ? `rgba(251,191,36,${0.45 * fade})` : `rgba(255,255,255,${0.95 * fade})`;
        ctx.lineWidth = pass === 0 ? 7 : 2.5;
        ctx.stroke();
      }
      continue;
    }

    if (p.kind === 'LANCE' || p.kind === 'RAINBOW_BEAM') {
      const rainbow = p.kind === 'RAINBOW_BEAM';
      const len = (p.length || 20) * CELL_SIZE;
      const thick = rainbow ? Math.max(14, (p.width || 0.75) * 2 * CELL_SIZE) : 12;
      const cos = Math.cos(p.angle), sin = Math.sin(p.angle);
      ctx.setTransform(res * cos, res * sin, -res * sin, res * cos, res * X(p.col), res * Y(p.row));
      const grad = ctx.createLinearGradient(0, 0, len, 0);
      if (rainbow) {
        ['#f43f5e', '#f59e0b', '#facc15', '#22c55e', '#38bdf8', '#6366f1', '#a855f7']
          .forEach((col, i, arr) => grad.addColorStop(i / (arr.length - 1), col));
      } else {
        grad.addColorStop(0, 'rgba(245,158,11,0.2)');
        grad.addColorStop(0.4, 'rgba(245,158,11,0.85)');
        grad.addColorStop(1, 'rgba(239,68,68,1)');
      }
      // The beam swells in, then thins away — it reads as a discharge, not a bar.
      const swell = rainbow ? (fade > 0.75 ? (1 - fade) / 0.25 : 1) : 1;
      ctx.globalAlpha = fade * (rainbow ? 0.35 : 0);
      if (rainbow) { ctx.fillStyle = grad; ctx.fillRect(0, -thick * 0.9 * swell, len, thick * 1.8 * swell); }
      ctx.globalAlpha = fade;
      ctx.fillStyle = grad;
      ctx.fillRect(0, (-thick / 2) * swell, len, thick * swell);
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.fillRect(0, -Math.max(1.5, thick * 0.11), len, Math.max(3, thick * 0.22));
      ctx.globalAlpha = 1;
      ctx.setTransform(res, 0, 0, res, 0, 0);
      continue;
    }

    const px = X(lerp(p.pc ?? p.col, p.col, alpha));
    const py = Y(lerp(p.pr ?? p.row, p.row, alpha));
    const ang = Math.atan2(p.targetRow - p.row, p.targetCol - p.col);

    if (p.kind === 'SPLASH') {
      // A lobbed shell: its shadow runs along the ground while the shell rides an
      // arc above it, so the player can see where it is going to land.
      const total = p.dist0 || 1;
      const left = Math.hypot(p.targetRow - lerp(p.pr, p.row, alpha), p.targetCol - lerp(p.pc, p.col, alpha));
      const k = Math.max(0, Math.min(1, 1 - left / total));
      const lift = Math.sin(k * Math.PI) * (14 + total * 9);
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.beginPath(); ctx.ellipse(px, py, 6, 3, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = p.color || '#f43f5e';
      ctx.beginPath(); ctx.arc(px, py - lift, 7, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1.5; ctx.stroke();
      continue;
    }

    const cos = Math.cos(ang), sin = Math.sin(ang);
    ctx.setTransform(res * cos, res * sin, -res * sin, res * cos, res * px, res * py);
    if (p.kind === 'DART_PROJ') {
      const L = p.passive ? 12 : 8;
      ctx.fillStyle = p.passive ? '#ef4444' : '#a855f7';
      ctx.strokeStyle = p.passive ? '#7f1d1d' : '#4c1d95';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(L, 0); ctx.lineTo(-L, -L * 0.5); ctx.lineTo(-L * 0.55, 0); ctx.lineTo(-L, L * 0.5);
      ctx.closePath(); ctx.fill(); ctx.stroke();
    } else if (p.kind === 'SNIPER_PROJ') {
      const L = p.passive ? 30 : 22, T = p.passive ? 7 : 4;
      const trail = ctx.createLinearGradient(-L, 0, L * 0.4, 0);
      trail.addColorStop(0, 'rgba(16,185,129,0)');
      trail.addColorStop(1, p.passive ? '#f59e0b' : '#10b981');
      ctx.fillStyle = trail;
      ctx.fillRect(-L, -T / 2, L * 1.4, T);
    } else {
      // A plain bullet, with a short tail so its direction reads at speed.
      ctx.fillStyle = p.color || '#fff';
      ctx.globalAlpha = 0.35;
      ctx.fillRect(-12, -2, 12, 4);
      ctx.globalAlpha = 1;
      ctx.beginPath(); ctx.arc(0, 0, 4, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1; ctx.stroke();
    }
    ctx.setTransform(res, 0, 0, res, 0, 0);
  }

  // --- blasts and bits -------------------------------------------------------------
  for (const p of g.particles) {
    const k = p.life / p.maxLife;
    ctx.globalAlpha = k;
    ctx.fillStyle = p.color || 'rgba(255,255,255,0.5)';
    ctx.beginPath();
    ctx.arc(X(p.col), Y(p.row), p.radius * CELL_SIZE * (1 - k * 0.3), 0, TAU);
    ctx.fill();
  }
  for (const s of g.shards) {
    const k = s.life / s.maxLife;
    ctx.globalAlpha = Math.min(1, k * 1.5);
    ctx.fillStyle = s.color;
    const sz = s.size * (0.5 + k * 0.5);
    ctx.fillRect(X(s.col) - sz / 2, Y(s.row) - sz / 2, sz, sz);
  }
  ctx.globalAlpha = 1;

  // --- the unicorn's charge ring and aim line -------------------------------------------
  const uni = live.unicorn;
  if (uni) {
    const stats = getEffectiveStats(uni, g.towers);
    const pct = Math.max(0, Math.min(1, (g.unicornCharge || 0) / (stats?.chargeTime || 1)));
    const cx = X(uni.col), cy = Y(uni.row);
    const ready = pct >= 1;

    if (ready && live.aiming && live.hoverCell && live.hoverCell.row >= 0) {
      const dx = X(live.hoverCell.col) - cx, dy = Y(live.hoverCell.row) - cy;
      const d = Math.hypot(dx, dy) || 1;
      const far = width + height;
      const ex = cx + (dx / d) * far, ey = cy + (dy / d) * far;
      const grad = ctx.createLinearGradient(cx, cy, ex, ey);
      grad.addColorStop(0, '#f43f5e'); grad.addColorStop(0.35, '#facc15');
      grad.addColorStop(0.65, '#22c55e'); grad.addColorStop(1, '#6366f1');
      ctx.lineCap = 'round';
      ctx.globalAlpha = 0.45; ctx.strokeStyle = grad; ctx.lineWidth = 7;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
      ctx.globalAlpha = 0.9; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
      ctx.setLineDash([2, 12]); ctx.lineDashOffset = -time / 30;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha = 1;
    }

    if (ready) {
      const pulse = 0.5 + 0.5 * Math.sin(time / 160);
      const glow = ctx.createRadialGradient(cx, cy, 6, cx, cy, 34 + pulse * 8);
      glow.addColorStop(0, 'rgba(250,204,21,0.45)');
      glow.addColorStop(0.6, 'rgba(236,72,153,0.18)');
      glow.addColorStop(1, 'rgba(236,72,153,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(cx, cy, 44, 0, TAU); ctx.fill();
    }
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(15,23,42,0.55)'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(cx, cy, 25, 0, TAU); ctx.stroke();
    const ringGrad = ctx.createLinearGradient(cx - 25, cy - 25, cx + 25, cy + 25);
    ['#f43f5e', '#f59e0b', '#facc15', '#22c55e', '#38bdf8', '#a855f7']
      .forEach((col, i, arr) => ringGrad.addColorStop(i / (arr.length - 1), col));
    ctx.strokeStyle = ringGrad;
    ctx.beginPath(); ctx.arc(cx, cy, 25, -Math.PI / 2, -Math.PI / 2 + TAU * pct); ctx.stroke();
    if (ready) {
      drawGlyph(ctx, '✨', cx, cy - 36 - Math.abs(Math.sin(time / 220)) * 5, 16);
    }
  }

  // --- numbers ------------------------------------------------------------------------------
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  for (const f of g.floaters) {
    const k = f.life / f.maxLife;
    const st = FLOATER_STYLE[f.kind] || FLOATER_STYLE.dmg;
    ctx.globalAlpha = Math.min(1, k * 1.8);
    ctx.font = `900 ${st.size}px system-ui, sans-serif`;
    const fy = Y(f.row) - (1 - k) * 34;
    ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,0.8)';
    ctx.strokeText(f.text, X(f.col), fy);
    ctx.fillStyle = st.color;
    ctx.fillText(f.text, X(f.col), fy);
  }
  ctx.globalAlpha = 1;

  // --- a life lost: the edges of the board flash red -----------------------------------------
  if (g.hurt > 0) {
    const k = Math.min(1, g.hurt / 500);
    const v = ctx.createRadialGradient(width / 2, height / 2, Math.min(width, height) * 0.3, width / 2, height / 2, Math.max(width, height) * 0.72);
    v.addColorStop(0, 'rgba(234,43,43,0)');
    v.addColorStop(1, `rgba(234,43,43,${0.5 * k})`);
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, width, height);
  }

  // --- the announcement banner ------------------------------------------------------------------
  const b = g.banner;
  if (b) {
    const k = b.life / b.maxLife;
    const inT = Math.min(1, (1 - k) / 0.12), outT = Math.min(1, k / 0.18);
    const a = Math.min(inT, outT);
    const [bg, fg] = BANNER_TONE[b.tone] || BANNER_TONE.plain;
    ctx.font = '900 22px system-ui, sans-serif';
    const tw = ctx.measureText(b.text.toUpperCase()).width;
    const bwid = Math.max(tw + 56, 220), bht = b.sub ? 62 : 46;
    const bx = width / 2 - bwid / 2, by = height * 0.2 - bht / 2 + (1 - inT) * -14;
    ctx.globalAlpha = a;
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    roundRect(ctx, bx, by + 5, bwid, bht, 16); ctx.fill();
    ctx.fillStyle = bg;
    roundRect(ctx, bx, by, bwid, bht, 16); ctx.fill();
    ctx.fillStyle = fg;
    ctx.fillText(b.text.toUpperCase(), width / 2, by + (b.sub ? 22 : bht / 2 + 1));
    if (b.sub) {
      ctx.font = '800 12px system-ui, sans-serif';
      ctx.globalAlpha = a * 0.85;
      ctx.fillText(b.sub.toUpperCase(), width / 2, by + 45);
    }
    ctx.globalAlpha = 1;
  }
}

// Memoised: the screen re-renders a few times a second for the credits and the
// score, and none of that changes anything the board shows.
export default memo(GameBoard);

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Towers, isolated behind memo.
 *
 * Towers do not move — they change only when one is built, sold, upgraded,
 * selected or hovered. The array identity is stable between those events (the
 * engine mutates in place), so a plain memo skips the whole layer otherwise.
 * Each registers its node so the painter can kick it when it fires.
 */
// eslint-disable-next-line no-unused-vars -- towersVersion is a memo cache key
const TowerLayer = memo(function TowerLayer({ towers, towersVersion, selectedTowerId, hoveredTowerId, onTowerClick, registry }) {
  return towers.map(t => (
    <TowerNode
      key={t.id} tower={t} towers={towers} registry={registry}
      isSelected={selectedTowerId === t.id} isHovered={hoveredTowerId === t.id}
      onTowerClick={onTowerClick}
    />
  ));
});

function TowerNode({ tower: t, towers, registry, isSelected, isHovered, onTowerClick }) {
  const isBuffed = t.typeId !== 'NITRO' && getNitroBuff(t, towers).rateMul < 1;
  const kickRef = useCallback((el) => {
    if (el) registry.set(t.id, el); else registry.delete(t.id);
  }, [registry, t.id]);

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onTowerClick(t.id); }}
      className="absolute cursor-pointer z-20"
      style={{
        transform: `translate(${t.col * CELL_SIZE}px, ${t.row * CELL_SIZE}px)`,
        width: CELL_SIZE, height: CELL_SIZE
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center td-pop-in">
        {isBuffed && <div className="absolute inset-0 scale-125 bg-yellow-400/20 border-2 border-yellow-400/40 rounded-full animate-pulse z-0 pointer-events-none" />}
        <UpgradeBadges upgrades={t.upgrades} />
        <div ref={kickRef} className="relative z-10 w-full h-full flex items-center justify-center">
          <TowerVisual typeId={t.typeId} size="md" selected={isSelected} hovered={isHovered} upgrades={t.upgrades} />
        </div>
      </div>
    </div>
  );
}

/**
 * The exit, showing how many lives are left. It listens for the engine's ticks
 * itself, so a life lost redraws this one marker and not the whole board.
 */
function LiveExit({ run, store, row, col }) {
  useSyncExternalStore(store.subscribe, store.get);
  return <PortalMarker row={row} col={col} kind="out" healthPct={run.lives / run.maxLives} />;
}

function PortalMarker({ row, col, kind, healthPct }) {
  const isIn = kind === 'in';
  return (
    <div
      className="absolute pointer-events-none flex items-center justify-center z-10"
      style={{ transform: `translate(${col * CELL_SIZE}px, ${row * CELL_SIZE}px)`, width: CELL_SIZE, height: CELL_SIZE }}
    >
      {isIn ? (
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-blue-500 fill-current drop-shadow-md animate-pulse" style={{ transform: 'translateX(20%)' }}>
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" stroke="white" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      ) : (
        <DonutBase healthPct={healthPct} />
      )}
    </div>
  );
}

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Power, Moon, LogOut, RotateCw, LayoutGrid, Palette, Globe, Folder, Calculator, FileText,
  Minus, Square, Copy, X, Save, ArrowRight, Search, Hourglass, UserRound, Trash2, CornerUpLeft,
  Image as ImageIcon,
} from 'lucide-react';
import { APPS, CONTEXT_CHOICES } from '../../../utils/appSim/desktop';

/* ------------------------------------------------------------------ *
 * DESKTOP SKIN — the machine itself: the power button on the case, the login
 * screen, windows, the taskbar, the menu and the four ways to stop. Renders
 * `state` from src/utils/appSim/desktop.js and turns every gesture into an
 * ACTION; it holds no model state of its own, so the session stays replayable.
 *
 * FIXED ASPECT, SCALED. Unlike the files skin, a desktop has geometry that IS
 * the lesson — the close button is the one at the top right, the taskbar runs
 * along the bottom, the menu opens from the bottom left — so the whole machine
 * is drawn at 720×486 and scaled to the space (docs/digital-skills-course.md
 * §5.5).
 *
 * THE POWER BUTTON is a real press-or-hold control. A tap is a press (sleep /
 * wake / start up); holding it for HOLD_MS fills a ring and forces the machine
 * off — deliberately slow and visible, because that is the emergency brake.
 *
 * TWO WAYS TO EVERYTHING: Save is a button AND Ctrl+S; sleep is the menu AND a
 * short press of the power button; a hidden window comes back from the taskbar
 * or from the menu. The engine grades the state, so all of them pass.
 *
 * English only on the machine, like every skin: the words on it are the words
 * the unit teaches. The brief and the feedback around it are bilingual.
 * ------------------------------------------------------------------ */

const W = 720;
const H = 486;
const SCREEN = { x: 10, y: 10, w: 700, h: 420 };
const TASKBAR_H = 40;
const HOLD_MS = 1600;

const APP_ICON = { notes: FileText, paint: Palette, browser: Globe, files: Folder, calculator: Calculator };
const DOC_APPS = new Set(['notes', 'paint']);
const DESKTOP_ICONS = [
  { app: 'files', label: 'My Work' },
  { app: 'notes', label: 'Notes' },
  { app: 'paint', label: 'Paint' },
  { app: 'browser', label: 'Browser' },
];
const STOP_ITEMS = [
  { type: 'sleep', label: 'Sleep', icon: Moon, tone: '#3b82f6' },
  { type: 'logout', label: 'Log out', icon: LogOut, tone: '#f59e0b' },
  { type: 'restart', label: 'Restart', icon: RotateCw, tone: '#a855f7' },
  { type: 'shutdown', label: 'Shut down', icon: Power, tone: '#ef4444' },
];

/** The glow a stuck student is shown. */
const glow = (on) => (on ? 'ring-4 ring-amber-300 animate-pulse z-50' : '');

/**
 * How big to draw the machine. It has to fit the WIDTH it is given and — on
 * the 1280×720 laptop window this app is mostly used in — the HEIGHT too, or
 * the power button and the feedback under it drop below the fold. In the Try
 * It task the height budget is a share of the window; inside a notes slide
 * (`fit="parent"`) it is the box the demo widget gives it.
 */
function useScale(ref, fit) {
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return undefined;
    const measure = () => {
      const byWidth = (box.clientWidth || W) / W;
      // From lg the Try It screen puts the machine in its own column, so it may
      // use the window's height less the top bar; stacked, it shares it.
      const inTask = window.innerWidth >= 1024 ? window.innerHeight - 120 : window.innerHeight * 0.56;
      const room = fit === 'parent' ? box.clientHeight : inTask;
      const byHeight = room > 0 ? room / H : byWidth;
      setScale(Math.max(0.3, Math.min(1.25, byWidth, byHeight)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [ref, fit]);
  return scale;
}

/**
 * Where a window sits: cascaded when normal, the whole screen above the taskbar
 * when maximised. The cascade step is the window's `slot` (given when it opened),
 * not its place in the stack — so bringing a window to the front raises it
 * without making it jump across the screen.
 */
function frameOf(state, slot) {
  if (state === 'max') return { left: 0, top: 0, width: SCREEN.w, height: SCREEN.h - TASKBAR_H };
  return { left: 150 + (slot % 5) * 34, top: 26 + (slot % 5) * 28, width: 400, height: 250 };
}

export default function DesktopSkin({ state, onAction, hint = null, disabled = false, fit = 'viewport' }) {
  const outer = useRef(null);
  const scale = useScale(outer, fit);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [nudgeFrozen, setNudgeFrozen] = useState(0);

  const act = (action) => { if (!disabled) onAction(action); };
  const on = state.power === 'on';

  // Keyboard routes, skipped while typing in the password box (except its Enter).
  useEffect(() => {
    const onKey = (e) => {
      if (disabled) return;
      if (state.power === 'sleep') { act({ type: 'wake' }); return; }
      const typing = ['INPUT', 'TEXTAREA'].includes(e.target?.tagName);
      if (on && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        const top = state.windows.find((w) => w.title === state.focus);
        if (top && DOC_APPS.has(top.app)) { e.preventDefault(); act({ type: 'save', title: top.title }); }
        return;
      }
      if (typing) return;
      if (e.key === 'Escape' && state.context) { act({ type: 'closeContext' }); return; }
      if (e.key === 'Escape' && state.menu) act({ type: 'closeMenu' });
      // Delete puts the selected file or folder in the Recycle Bin — the key
      // route to the same place as dragging it there or right-click ▸ Delete.
      if (e.key === 'Delete' && String(selectedIcon).startsWith('item:')) {
        e.preventDefault();
        act({ type: 'deleteItem', name: String(selectedIcon).slice(5) });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // A frozen machine ignores clicks (the engine does); the skin shows that it
  // noticed nothing, so a student knows the click landed and was ignored.
  const frozenClick = () => { if (state.frozen) setNudgeFrozen((n) => n + 1); };

  return (
    <div ref={outer} className="mx-auto select-none" style={{ width: W * scale, height: H * scale }}>
      <div
        className="relative origin-top-left"
        style={{ width: W, height: H, transform: `scale(${scale})` }}
        onClickCapture={frozenClick}>
        {/* the monitor */}
        <div className="absolute rounded-[18px] bg-slate-800 shadow-xl" style={{ left: 0, top: 0, width: W, height: SCREEN.h + 20 }} />
        <div
          className={`absolute overflow-hidden rounded-md ${state.frozen ? 'cursor-wait' : ''} ${glow(hint === 'screen')}`}
          style={{ left: SCREEN.x, top: SCREEN.y, width: SCREEN.w, height: SCREEN.h }}>
          {state.power === 'off' && <OffScreen />}
          {state.power === 'sleep' && <SleepScreen onWake={() => act({ type: 'wake' })} />}
          {state.power === 'login' && <LoginScreen state={state} act={act} hint={hint} />}
          {on && (
            <OnScreen
              state={state} act={act} hint={hint} scale={scale} disabled={disabled}
              selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon}
              frozenPing={nudgeFrozen} />
          )}
        </div>

        {/* the case: power light and power button */}
        <CaseStrip state={state} act={act} hint={hint} disabled={disabled} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function OffScreen() {
  return (
    <div className="absolute inset-0 bg-[#050608]">
      <div className="absolute inset-0 opacity-[0.07] bg-gradient-to-br from-white via-transparent to-transparent" />
    </div>
  );
}

function SleepScreen({ onWake }) {
  return (
    <button type="button" onClick={onWake} aria-label="wake the computer"
      className="absolute inset-0 bg-[#050608] flex items-end justify-center pb-6">
      <span className="text-[11px] font-bold tracking-widest uppercase text-slate-600 animate-pulse">
        Sleeping · tap the screen or press a key to wake
      </span>
    </button>
  );
}

function LoginScreen({ state, act, hint }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
      style={{ background: 'linear-gradient(160deg,#1f3a5f 0%,#2c5a8a 60%,#3b76ad 100%)' }}>
      <div className="w-20 h-20 rounded-full bg-slate-300 flex items-center justify-center shadow-inner">
        <UserRound className="w-12 h-12 text-slate-500" strokeWidth={2} />
      </div>
      <div className="text-xl font-black text-white">{state.account}</div>
      <form
        className={`flex items-center gap-2 rounded-full bg-white pl-4 pr-1 py-1 shadow-lg ${glow(hint === 'password')}`}
        onSubmit={(e) => { e.preventDefault(); act({ type: 'submitLogin' }); }}>
        <input
          type="password"
          value={state.typed}
          onChange={(e) => act({ type: 'typePassword', text: e.target.value })}
          // Enter handled here, not left to the form: implicit submission is not
          // fired by every keyboard (or test driver), and preventing it stops a
          // real Enter from submitting twice.
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); act({ type: 'submitLogin' }); } }}
          placeholder="Password"
          aria-label="password"
          autoComplete="off"
          spellCheck={false}
          className="w-48 bg-transparent outline-none text-base font-bold text-slate-800 placeholder:text-slate-400" />
        <button type="submit" aria-label="log in"
          className="w-8 h-8 rounded-full bg-[#0ea5e9] text-white flex items-center justify-center">
          <ArrowRight className="w-4 h-4" strokeWidth={3} />
        </button>
      </form>
      <div className="h-5 text-sm font-bold text-rose-200">
        {state.loginError ? 'That password is not right. Try again.' : ''}
      </div>
      <div className="text-xs font-bold text-sky-100/80">Type your password to log in</div>
    </div>
  );
}

/* ---- icons on the desktop: apps, files, folders, the Recycle Bin ------- */

const ICON_STEP = 86;
/** Where an icon sits: app shortcuts in the first column, files and folders in the next two, the bin top right. */
function iconPos(kind, index) {
  if (kind === 'bin') return { left: SCREEN.w - 92, top: 12 };
  if (kind === 'app') return { left: 12, top: 12 + index * ICON_STEP };
  return { left: 96 + Math.floor(index / 4) * 84, top: 12 + (index % 4) * ICON_STEP };
}

const ITEM_ICON = { folder: Folder, image: ImageIcon, pdf: FileText, doc: FileText, audio: FileText, video: FileText };
const CONTEXT_LABEL = { newFolder: 'New folder', open: 'Open', rename: 'Rename', delete: 'Delete', close: 'Close window' };

/**
 * One icon, however the student gets at it: a click selects, a double-click
 * (or one tap on a touch screen) opens, a right-click (or press-and-hold)
 * opens its menu, and pressing and moving drags it. Everything that moves the
 * machine is an engine action; selection and the drag in flight are the only
 * things the skin keeps.
 */
function DeskIcon({ id, label, Icon, tint = '#475569', selected, onSelect, onOpen, onMenu, drag, glowOn, dropId, children, disabled }) {
  const press = useRef(null);
  const onPointerDown = (e) => {
    if (disabled || e.button === 2) return;
    press.current = { x: e.clientX, y: e.clientY, moved: false, long: false, touch: e.pointerType === 'touch', timer: null };
    if (e.pointerType === 'touch' && onMenu) {
      // Press-and-hold is a tablet's right-click.
      press.current.timer = setTimeout(() => {
        if (press.current && !press.current.moved) { press.current.long = true; onMenu(); }
      }, 550);
    }
  };
  const onPointerMove = (e) => {
    const p = press.current;
    if (!p || !drag) return;
    if (!p.moved && Math.hypot(e.clientX - p.x, e.clientY - p.y) > 6) {
      p.moved = true;
      clearTimeout(p.timer);
      // Keep the moves coming once the pointer leaves the icon. A pointer the
      // browser cannot capture (a synthetic one) must not break the drag.
      try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch { /* not capturable */ }
      drag.start(id, label, Icon, tint);
    }
    if (p.moved) drag.move(e.clientX, e.clientY);
  };
  const onPointerUp = (e) => {
    const p = press.current;
    press.current = null;
    if (!p) return;
    clearTimeout(p.timer);
    if (p.moved) { drag.drop(e.clientX, e.clientY); return; }
    if (p.touch && !p.long) onOpen();
  };
  return (
    <button
      type="button"
      data-drop={dropId || undefined}
      aria-label={label}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      onDoubleClick={(e) => { e.stopPropagation(); onOpen(); }}
      onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); onSelect(); onMenu?.(); }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => { clearTimeout(press.current?.timer); press.current = null; drag?.cancel(); }}
      className={`w-[76px] flex flex-col items-center gap-1 rounded-xl p-1.5 touch-none ${selected ? 'bg-sky-200/70 ring-2 ring-sky-400' : 'hover:bg-white/50'} ${glow(glowOn)}`}>
      <span className="w-11 h-11 rounded-xl bg-white shadow flex items-center justify-center pointer-events-none">
        <Icon className="w-6 h-6" style={{ color: tint }} strokeWidth={2.2} fill={Icon === Folder ? '#fde68a' : 'none'} />
      </span>
      {children || <span className="text-[12px] font-bold text-slate-700 leading-tight text-center break-words w-full pointer-events-none">{label}</span>}
    </button>
  );
}

/** The name box under an icon while it is being renamed (a new folder arrives with one). */
function RenameBox({ state, act, hint, disabled = false }) {
  const r = state.renaming;
  return (
    <span className="flex flex-col items-center w-full" onClick={(e) => e.stopPropagation()}>
      <input
        // Not in a demo: a focused box there swallows the deck's arrow keys.
        autoFocus={!disabled}
        readOnly={disabled}
        tabIndex={disabled ? -1 : 0}
        value={r.text}
        aria-label="new name"
        onFocus={(e) => e.target.select()}
        onChange={(e) => act({ type: 'typeName', text: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === 'Enter') { e.preventDefault(); act({ type: 'commitName' }); }
          if (e.key === 'Escape') { e.preventDefault(); act({ type: 'cancelName' }); }
        }}
        onBlur={() => { if (!disabled) act({ type: 'commitName' }); }}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        className={`w-[92px] -mx-2 rounded border-2 border-sky-500 bg-white px-1 text-[12px] font-bold text-slate-800 text-center outline-none ${glow(hint === 'rename')}`} />
      {r.error && (
        <span className="mt-0.5 text-[10px] font-bold text-rose-600 leading-tight text-center">
          {r.error === 'taken' ? 'That name is used.' : 'Type a name.'}
        </span>
      )}
    </span>
  );
}

/** The right-click menu, beside the thing that was right-clicked. */
function ContextMenu({ state, act, hint, at }) {
  const kind = String(state.context).split(':')[0];
  const choices = CONTEXT_CHOICES[kind] || [];
  return (
    <div onClick={(e) => e.stopPropagation()} onContextMenu={(e) => e.preventDefault()}
      className="absolute z-30 w-40 rounded-xl bg-white border border-slate-300 shadow-2xl p-1"
      style={{ left: Math.min(at.x, SCREEN.w - 170), top: Math.min(at.y, SCREEN.h - TASKBAR_H - 16 - choices.length * 36) }}>
      {choices.map((c) => (
        <button key={c} type="button" onClick={() => act({ type: 'contextChoose', choice: c })}
          className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-bold ${c === 'delete' ? 'text-rose-600 hover:bg-rose-50' : 'text-slate-700 hover:bg-slate-100'} ${glow(hint === `context:${c}`)}`}>
          {CONTEXT_LABEL[c] || c}
        </button>
      ))}
    </div>
  );
}

/** Where a right-click menu opens when no pointer placed it (a demo, or a keyboard). */
function contextAnchor(state) {
  const [kind, ...rest] = String(state.context || '').split(':');
  const name = rest.join(':');
  if (kind === 'app') {
    const i = DESKTOP_ICONS.findIndex((d) => d.app === name);
    const p = iconPos('app', Math.max(0, i));
    return { x: p.left + 70, y: p.top + 20 };
  }
  if (kind === 'item') {
    const onDesk = state.items.filter((it) => it.in === 'desktop');
    const i = onDesk.findIndex((it) => it.name === name);
    if (i >= 0) { const p = iconPos('item', i); return { x: p.left + 70, y: p.top + 20 }; }
    return { x: 300, y: 140 };
  }
  if (kind === 'bin') { const p = iconPos('bin'); return { x: p.left - 150, y: p.top + 30 }; }
  if (kind === 'taskbar') {
    const i = state.windows.findIndex((w) => w.title === name);
    return { x: 190 + Math.max(0, i) * 120, y: SCREEN.h - TASKBAR_H - 50 };
  }
  return { x: 330, y: 150 };
}

function OnScreen({ state, act, hint, selectedIcon, setSelectedIcon, frozenPing, scale, disabled }) {
  const screenRef = useRef(null);
  const [ghost, setGhost] = useState(null);     // the icon being dragged: { name, label, Icon, tint, x, y }
  const [menuAt, setMenuAt] = useState(null);   // where the pointer right-clicked, in screen units

  const local = (cx, cy) => {
    const r = screenRef.current?.getBoundingClientRect();
    return r ? { x: (cx - r.left) / scale, y: (cy - r.top) / scale } : { x: 0, y: 0 };
  };
  // Drag and drop, by pointer — the same on a mouse and a finger. The drop
  // target is whatever carries `data-drop` under the pointer when it lets go.
  const drag = {
    start: (name, label, Icon, tint) => setGhost({ name, label, Icon, tint, x: -999, y: -999 }),
    move: (cx, cy) => setGhost((g) => (g ? { ...g, ...local(cx, cy) } : g)),
    cancel: () => setGhost(null),
    drop: (cx, cy) => {
      const g = ghost;
      setGhost(null);
      if (!g) return;
      const hit = document.elementsFromPoint(cx, cy)
        .map((el) => el.closest?.('[data-drop]')?.getAttribute('data-drop'))
        .find((d) => d && d !== `folder:${g.name}`);
      if (!hit) return;
      const to = hit === 'bin' ? 'bin' : hit === 'desktop' ? 'desktop' : hit.replace(/^folder:/, '');
      act({ type: 'drag', name: g.name, to });
    },
  };

  const background = () => {
    setSelectedIcon(null);
    if (state.menu) act({ type: 'closeMenu' });
    if (state.context) act({ type: 'closeContext' });
  };
  const menuFor = (target, e) => {
    if (e) setMenuAt(local(e.clientX, e.clientY)); else setMenuAt(null);
    act({ type: 'openContext', target });
  };
  const onDesk = state.items.filter((it) => it.in === 'desktop');

  return (
    <div ref={screenRef} className={`absolute inset-0 ${hint === 'desktop' ? 'ring-8 ring-inset ring-amber-300 animate-pulse' : ''}`} data-drop="desktop"
      style={{ background: 'linear-gradient(170deg,#dbeafe 0%,#eef6ff 55%,#e0f2fe 100%)' }}
      onClick={background}
      onContextMenu={(e) => { e.preventDefault(); if (!disabled) menuFor('desktop', e); }}>
      {/* the app shortcuts */}
      {DESKTOP_ICONS.map(({ app, label }, i) => (
        <div key={app} className="absolute" style={iconPos('app', i)}>
          <DeskIcon id={`app:${app}`} label={label} Icon={APP_ICON[app]} disabled={disabled}
            selected={selectedIcon === `app:${app}`} onSelect={() => setSelectedIcon(`app:${app}`)}
            onOpen={() => act({ type: 'openApp', app })}
            onMenu={() => act({ type: 'openContext', target: `app:${app}` })}
            glowOn={hint === `app:${app}`} />
        </div>
      ))}

      {/* files and folders on the desktop */}
      {onDesk.map((it, i) => (
        <div key={it.name} className="absolute" style={iconPos('item', i)}>
          <DeskIcon id={it.name} label={it.name} Icon={ITEM_ICON[it.kind] || FileText} disabled={disabled}
            tint={it.kind === 'folder' ? '#d97706' : it.kind === 'image' ? '#0ea5e9' : '#475569'}
            dropId={it.kind === 'folder' ? `folder:${it.name}` : null}
            selected={selectedIcon === `item:${it.name}`} onSelect={() => setSelectedIcon(`item:${it.name}`)}
            onOpen={() => act({ type: 'openItem', name: it.name })}
            onMenu={() => act({ type: 'openContext', target: `item:${it.name}` })}
            drag={drag}
            glowOn={hint === `item:${it.name}`}>
            {state.renaming?.name === it.name ? <RenameBox state={state} act={act} hint={hint} disabled={disabled} /> : null}
          </DeskIcon>
        </div>
      ))}

      {/* the Recycle Bin, always there */}
      <div className="absolute" style={iconPos('bin')}>
        <DeskIcon id="bin" label="Recycle Bin" Icon={Trash2} disabled={disabled} dropId="bin"
          tint={state.items.some((it) => it.in === 'bin') ? '#0f766e' : '#64748b'}
          selected={selectedIcon === 'bin'} onSelect={() => setSelectedIcon('bin')}
          onOpen={() => act({ type: 'openBin' })}
          onMenu={() => act({ type: 'openContext', target: 'bin' })}
          glowOn={hint === 'bin'} />
      </div>

      {/* windows: list order is stacking order, the last is on top */}
      <div className="absolute left-0 top-0 pointer-events-none" style={{ width: SCREEN.w, height: SCREEN.h - TASKBAR_H }}>
        {state.windows.map((w, i) => (w.state === 'min' ? null : (
          <AppWindow key={w.title} w={w} i={i} focused={state.focus === w.title} frozen={state.frozen}
            state={state} act={act} hint={hint} frozenPing={frozenPing} drag={drag} disabled={disabled}
            selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
        )))}
      </div>

      {ghost && (
        <div className="absolute z-40 pointer-events-none opacity-80 -translate-x-1/2 -translate-y-1/2" style={{ left: ghost.x, top: ghost.y }}>
          <span className="w-11 h-11 rounded-xl bg-white shadow-xl ring-2 ring-sky-400 flex items-center justify-center">
            <ghost.Icon className="w-6 h-6" style={{ color: ghost.tint }} strokeWidth={2.2} />
          </span>
        </div>
      )}

      {state.menu && <StartMenu state={state} act={act} hint={hint} />}
      {state.context && <ContextMenu state={state} act={act} hint={hint} at={menuAt && String(state.context) === 'desktop' ? menuAt : contextAnchor(state)} />}
      <Taskbar state={state} act={act} hint={hint} onMenu={(title, e) => menuFor(`taskbar:${title}`, e)} />
      {state.dialog && <DesktopDialog state={state} act={act} hint={hint} />}
    </div>
  );
}

function AppWindow({ w, i, focused, frozen, state, act, hint, frozenPing, drag, disabled, selectedIcon, setSelectedIcon }) {
  const f = frameOf(w.state, w.slot ?? i);
  const Icon = APP_ICON[w.app] || FileText;
  const btn = 'w-7 h-[22px] rounded-md flex items-center justify-center transition-colors';
  const stop = (e) => e.stopPropagation();
  return (
    <div
      className={`absolute pointer-events-auto flex flex-col rounded-lg overflow-hidden border-2 bg-white shadow-lg ${focused ? 'border-slate-500' : 'border-slate-300'} ${glow(hint === `win:${w.title}`)}`}
      style={f}
      // A folder window takes drops, so a file can be dragged INTO an open folder.
      data-drop={w.folder && w.folder !== 'bin' ? `folder:${w.folder}` : w.folder === 'bin' ? 'bin' : undefined}
      onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onClick={(e) => { stop(e); if (!focused) act({ type: 'restore', title: w.title }); }}>
      {/* title bar */}
      <div className={`h-8 shrink-0 flex items-center gap-2 pl-3 pr-1.5 ${focused ? 'bg-slate-200' : 'bg-slate-100'}`}>
        <Icon className="w-4 h-4 text-slate-500 shrink-0" strokeWidth={2.4} />
        <span className="text-[13px] font-black text-slate-700 truncate">
          {w.title}{!w.saved && <span className="text-rose-500"> •</span>}
          {frozen && <span className="font-bold text-slate-500"> (Not responding)</span>}
        </span>
        <div className="ml-auto flex gap-1">
          <button type="button" aria-label={`minimise ${w.title}`} onClick={(e) => { stop(e); act({ type: 'minimise', title: w.title }); }}
            className={`${btn} bg-slate-300/70 hover:bg-slate-300 ${glow(hint === `min:${w.title}`)}`}>
            <Minus className="w-3.5 h-3.5 text-slate-700" strokeWidth={3} />
          </button>
          <button type="button" aria-label={`maximise ${w.title}`} onClick={(e) => { stop(e); act({ type: 'maximise', title: w.title }); }}
            className={`${btn} bg-slate-300/70 hover:bg-slate-300 ${glow(hint === `max:${w.title}`)}`}>
            {w.state === 'max'
              ? <Copy className="w-3 h-3 text-slate-700" strokeWidth={3} />
              : <Square className="w-3 h-3 text-slate-700" strokeWidth={3} />}
          </button>
          <button type="button" aria-label={`close ${w.title}`} onClick={(e) => { stop(e); act({ type: 'close', title: w.title }); }}
            className={`${btn} bg-rose-500 hover:bg-rose-600 ${glow(hint === `close:${w.title}`)}`}>
            <X className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* a document program has a Save button in its toolbar */}
      {DOC_APPS.has(w.app) && (
        <div className="h-8 shrink-0 flex items-center gap-3 px-2 border-b border-slate-200 bg-white text-[12px] font-bold text-slate-500">
          <button type="button" aria-label={`save ${w.title}`} onClick={(e) => { stop(e); act({ type: 'save', title: w.title }); }}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-md border border-slate-300 hover:bg-slate-100 text-slate-700 ${glow(hint === `save:${w.title}`)}`}>
            <Save className="w-3.5 h-3.5" strokeWidth={2.6} /> Save
          </button>
          <span>File</span><span>Edit</span><span>View</span>
          <span className="ml-auto text-[10px] uppercase tracking-widest">{w.saved ? 'saved' : 'not saved'}</span>
        </div>
      )}

      <div className="relative flex-1 min-h-0 overflow-hidden">
        <WindowBody w={w} state={state} act={act} hint={hint} drag={drag} disabled={disabled}
          selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
        {frozen && (
          <div key={frozenPing} className="absolute inset-0 bg-white/55 flex items-center justify-center">
            <Hourglass className="w-8 h-8 text-slate-500 animate-spin" style={{ animationDuration: '2.4s' }} strokeWidth={2} />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * What is inside a window. For a program it is decoration — the job is on the
 * frame, not in here. A folder window (T2) shows what is in that folder, and
 * those icons work like the ones on the desktop; the Recycle Bin window lists
 * what was deleted, with "Put it back".
 */
function WindowBody({ w, state, act, hint, drag, disabled, selectedIcon, setSelectedIcon }) {
  if (w.folder === 'bin') {
    const binned = state.items.filter((it) => it.in === 'bin');
    return (
      <div className="p-2 space-y-1 h-full overflow-y-auto">
        {binned.length === 0 && <div className="p-4 text-center text-[12px] font-bold text-slate-400">The Recycle Bin is empty.</div>}
        {binned.map((it) => {
          const I = ITEM_ICON[it.kind] || FileText;
          return (
            <div key={it.name} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50">
              <I className="w-4 h-4 text-slate-500 shrink-0" strokeWidth={2.4} />
              <span className="flex-1 min-w-0 truncate text-[13px] font-bold text-slate-700">{it.name}</span>
              <button type="button" onClick={(e) => { e.stopPropagation(); act({ type: 'restoreItem', name: it.name }); }}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-md border border-slate-300 text-[11px] font-black text-slate-600 hover:bg-slate-100 ${glow(hint === `restore:${it.name}`)}`}>
                <CornerUpLeft className="w-3 h-3" strokeWidth={3} /> Put it back
              </button>
            </div>
          );
        })}
      </div>
    );
  }
  if (w.folder) {
    const inside = state.items.filter((it) => it.in === w.folder);
    return (
      <div className="p-2 h-full overflow-y-auto">
        {inside.length === 0 && <div className="p-4 text-center text-[12px] font-bold text-slate-400">This folder is empty.</div>}
        <div className="flex flex-wrap gap-1">
          {inside.map((it) => (
            <DeskIcon key={it.name} id={it.name} label={it.name} Icon={ITEM_ICON[it.kind] || FileText} disabled={disabled}
              tint={it.kind === 'folder' ? '#d97706' : it.kind === 'image' ? '#0ea5e9' : '#475569'}
              dropId={it.kind === 'folder' ? `folder:${it.name}` : null}
              selected={selectedIcon === `item:${it.name}`} onSelect={() => setSelectedIcon(`item:${it.name}`)}
              onOpen={() => act({ type: 'openItem', name: it.name })}
              onMenu={() => act({ type: 'openContext', target: `item:${it.name}` })}
              drag={drag} glowOn={hint === `item:${it.name}`}>
              {state.renaming?.name === it.name ? <RenameBox state={state} act={act} hint={hint} disabled={disabled} /> : null}
            </DeskIcon>
          ))}
        </div>
      </div>
    );
  }
  if (w.app === 'notes') {
    return (
      <div className="p-4 space-y-2">
        <div className="text-[15px] font-black text-slate-700">{w.title}</div>
        {[92, 84, 96, 60].map((pct, k) => <div key={k} className="h-2.5 rounded bg-slate-200" style={{ width: `${pct}%` }} />)}
      </div>
    );
  }
  if (w.app === 'paint') {
    return (
      <svg viewBox="0 0 400 180" className="w-full h-full" aria-hidden="true">
        <rect width="400" height="180" fill="#ffffff" />
        <circle cx="320" cy="48" r="26" fill="#fde047" />
        <rect x="120" y="86" width="110" height="74" fill="#fca5a5" />
        <path d="M110 90 L175 44 L240 90 Z" fill="#b91c1c" />
        <rect x="160" y="118" width="26" height="42" fill="#7c2d12" />
        <path d="M0 160 H400" stroke="#86efac" strokeWidth="14" />
      </svg>
    );
  }
  if (w.app === 'browser') {
    return (
      <div className="p-3 space-y-2">
        <div className="h-6 rounded-full bg-slate-100 border border-slate-200 px-3 text-[11px] font-bold text-slate-500 flex items-center">www.schoolsite.org</div>
        <div className="h-16 rounded-lg bg-sky-100" />
        <div className="h-2.5 w-4/5 rounded bg-slate-200" /><div className="h-2.5 w-3/5 rounded bg-slate-200" />
      </div>
    );
  }
  if (w.app === 'files') {
    return (
      <div className="p-3 grid grid-cols-4 gap-3">
        {['Documents', 'Downloads', 'Desktop', 'Pictures'].map((f) => (
          <div key={f} className="flex flex-col items-center gap-1">
            <Folder className="w-8 h-8 text-amber-400" strokeWidth={2} fill="#fde68a" />
            <span className="text-[10px] font-bold text-slate-600">{f}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="p-3 grid grid-cols-4 gap-1.5">
      <div className="col-span-4 h-8 rounded bg-slate-100 text-right pr-2 text-lg font-black text-slate-700">42</div>
      {'789÷456×123−0.=+'.split('').map((c, k) => (
        <div key={k} className="h-7 rounded bg-slate-200 flex items-center justify-center text-[13px] font-black text-slate-600">{c}</div>
      ))}
    </div>
  );
}

function StartMenu({ state, act, hint }) {
  const stop = (e) => e.stopPropagation();
  return (
    <div onClick={stop}
      className="absolute left-2 w-[250px] rounded-xl bg-white/95 border border-slate-300 shadow-2xl overflow-hidden"
      style={{ bottom: TASKBAR_H + 6 }}>
      {state.menu === 'apps' && (
        <div className="p-2">
          <div className="px-2 pb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Apps</div>
          {Object.entries(APPS).map(([app, label]) => {
            const Icon = APP_ICON[app];
            return (
              <button key={app} type="button" onClick={() => act({ type: 'openApp', app })}
                className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-left text-[14px] font-bold text-slate-700 hover:bg-sky-50 ${glow(hint === `app:${app}`)}`}>
                <Icon className="w-4 h-4 text-slate-500" strokeWidth={2.4} /> {label}
              </button>
            );
          })}
        </div>
      )}
      {state.menu === 'power' && (
        <div className="p-2">
          <div className="px-2 pb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Power</div>
          {STOP_ITEMS.map(({ type, label, icon: Icon, tone }) => (
            <button key={type} type="button" onClick={() => act({ type })}
              className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left text-[14px] font-black text-slate-700 hover:bg-slate-100 ${glow(hint === `stop:${type}`)}`}>
              <Icon className="w-4 h-4" style={{ color: tone }} strokeWidth={2.6} /> {label}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 px-3 py-2 border-t border-slate-200 bg-slate-50">
        <UserRound className="w-5 h-5 text-slate-500" strokeWidth={2.4} />
        <span className="text-[13px] font-bold text-slate-600 truncate">{state.user}</span>
        <button type="button" aria-label="power options" onClick={() => act({ type: 'openPowerMenu' })}
          className={`ml-auto w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 ${state.menu === 'power' ? 'bg-slate-200' : ''} ${glow(hint === 'powerMenu')}`}>
          <Power className="w-4 h-4 text-slate-700" strokeWidth={2.8} />
        </button>
      </div>
    </div>
  );
}

function Taskbar({ state, act, hint, onMenu }) {
  return (
    <div onClick={(e) => e.stopPropagation()} onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
      className={`absolute left-0 right-0 bottom-0 flex items-center gap-1.5 px-2 bg-slate-800 ${glow(hint === 'taskbar')}`}
      style={{ height: TASKBAR_H }}>
      <button type="button" aria-label="menu" onClick={() => act({ type: 'openMenu' })}
        className={`w-9 h-8 rounded-lg flex items-center justify-center ${state.menu ? 'bg-sky-400' : 'bg-sky-500 hover:bg-sky-400'} ${glow(hint === 'menu')}`}>
        <LayoutGrid className="w-4 h-4 text-white" strokeWidth={2.6} />
      </button>
      <div className="h-7 w-32 rounded-full bg-slate-700 flex items-center gap-1.5 px-2.5 text-[12px] font-bold text-slate-400">
        <Search className="w-3.5 h-3.5" strokeWidth={2.6} /> Search
      </div>
      <div className="flex-1 min-w-0 flex gap-1 overflow-hidden">
        {state.windows.map((w) => {
          const Icon = APP_ICON[w.app] || FileText;
          const active = state.focus === w.title && w.state !== 'min';
          return (
            <button key={w.title} type="button" aria-label={`taskbar ${w.title}`}
              onClick={() => act({ type: 'restore', title: w.title })}
              onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); onMenu?.(w.title, e); }}
              className={`h-8 max-w-[130px] flex items-center gap-1.5 px-2 rounded-lg text-[12px] font-bold border-b-2
                ${active ? 'bg-slate-600 text-white border-sky-400' : 'bg-slate-700/60 text-slate-300 border-transparent hover:bg-slate-600'}
                ${w.state === 'min' ? 'opacity-70' : ''} ${glow(hint === `taskbar:${w.title}`)}`}>
              <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2.6} />
              <span className="truncate">{w.title}</span>
            </button>
          );
        })}
      </div>
      <div className="text-right leading-tight pr-1">
        <div className="text-[13px] font-black text-slate-100">14:05</div>
        <div className="text-[10px] font-bold text-slate-400">Mon</div>
      </div>
    </div>
  );
}

function DesktopDialog({ state, act, hint }) {
  const d = state.dialog;
  const btn = 'px-3.5 py-1.5 rounded-lg text-[13px] font-black border-2';
  const verb = { shutdown: 'Shut down', restart: 'Restart', logout: 'Log out' }[d.then] || 'Stop';
  return (
    <div className="absolute inset-0 z-40 bg-slate-900/40 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
      <div className={`w-[340px] rounded-xl bg-white shadow-2xl border border-slate-300 overflow-hidden ${glow(hint === 'dialog')}`}>
        <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 text-[13px] font-black text-slate-700">
          {d.kind === 'close' ? 'Notes' : verb}
        </div>
        <div className="px-4 py-3 text-[14px] font-bold text-slate-700 leading-snug">
          {d.kind === 'close'
            ? <>Do you want to save the changes to <b>{d.title}</b>?</>
            : <><b>{d.titles.join(', ')}</b> {d.titles.length === 1 ? 'has' : 'have'} not been saved. If you {verb.toLowerCase()} now, the changes will be lost.</>}
        </div>
        <div className="flex justify-end gap-2 px-4 pb-3">
          {d.kind === 'close' ? (
            <>
              <button type="button" onClick={() => act({ type: 'dialogSave' })} className={`${btn} bg-[#58cc02] border-[#3e7500] text-white`}>Save</button>
              <button type="button" onClick={() => act({ type: 'dialogDiscard' })} className={`${btn} bg-white border-slate-300 text-slate-700`}>Don’t save</button>
              <button type="button" onClick={() => act({ type: 'dialogCancel' })} className={`${btn} bg-white border-slate-300 text-slate-700`}>Cancel</button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => act({ type: 'dialogCancel' })} className={`${btn} bg-[#0ea5e9] border-[#0369a1] text-white`}>Cancel</button>
              <button type="button" onClick={() => act({ type: 'dialogAnyway' })} className={`${btn} bg-white border-rose-300 text-rose-600`}>{verb} anyway</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * The case under the screen: the power light and the power button. A tap
 * presses it; holding it for HOLD_MS fills the ring and forces the machine off.
 */
function CaseStrip({ state, act, hint, disabled }) {
  const [holding, setHolding] = useState(false);
  const timer = useRef(null);
  const fired = useRef(false);

  const down = (e) => {
    if (disabled) return;
    e.preventDefault();
    fired.current = false;
    setHolding(true);
    timer.current = setTimeout(() => {
      fired.current = true;
      setHolding(false);
      act({ type: 'holdPower' });
    }, HOLD_MS);
  };
  const up = () => {
    if (!holding) return;
    clearTimeout(timer.current);
    setHolding(false);
    if (!fired.current) act({ type: 'pressPower' });
  };
  const cancel = () => { clearTimeout(timer.current); setHolding(false); };
  useEffect(() => () => clearTimeout(timer.current), []);

  const light = state.power === 'off' ? '#334155' : state.power === 'sleep' ? '#f59e0b' : '#22c55e';
  const r = 20;
  const c = 2 * Math.PI * r;

  return (
    <div className="absolute rounded-xl bg-slate-300 border-b-4 border-slate-400 flex items-center justify-end gap-4 pr-6"
      style={{ left: 40, top: SCREEN.h + 26, width: W - 80, height: H - SCREEN.h - 28 }}>
      <div className="mr-auto pl-5 flex items-center gap-2">
        {[0, 1, 2, 3].map((k) => <div key={k} className="w-14 h-3 rounded-full bg-slate-400/60" />)}
      </div>
      <span
        aria-label={`power light ${state.power === 'off' ? 'off' : state.power === 'sleep' ? 'sleeping' : 'on'}`}
        className={`w-3 h-3 rounded-full ${state.power === 'sleep' ? 'animate-pulse' : ''}`}
        style={{ background: light, boxShadow: state.power === 'off' ? 'none' : `0 0 8px ${light}` }} />
      <button
        type="button"
        aria-label="power button"
        onPointerDown={down}
        onPointerUp={up}
        onPointerLeave={cancel}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act({ type: 'pressPower' }); } }}
        onContextMenu={(e) => e.preventDefault()}
        className={`relative w-11 h-11 rounded-full bg-slate-600 active:bg-slate-700 flex items-center justify-center touch-none ${glow(hint === 'power')}`}>
        <Power className="w-5 h-5 text-white" strokeWidth={2.8} />
        <svg className="absolute -inset-1 w-[52px] h-[52px] -rotate-90 pointer-events-none" viewBox="0 0 52 52" aria-hidden="true">
          <circle cx="26" cy="26" r={r} fill="none" stroke="#f59e0b" strokeWidth="4"
            strokeDasharray={c}
            strokeDashoffset={holding ? 0 : c}
            style={{ transition: holding ? `stroke-dashoffset ${HOLD_MS}ms linear` : 'none' }} />
        </svg>
      </button>
    </div>
  );
}

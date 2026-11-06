// src/utils/appSim/desktop.js
//
// The `desktop` skin of the simulator: the machine itself. Power, the login
// screen, windows, the menu, and the four ways to stop — the job at the centre
// of T1 · Starting and Stopping (docs/primary-tech/UPGRADE-PLAN.md §3.1).
//
// PURE, NO REACT, like the rest of the engine: the skin renders it and the
// validator replays it. Every rule below is a rule of real machines, simplified
// but never falsified — because the student is rehearsing for a real one:
//
//   · A short press of the power button is not "off". Off → it starts up; on → it
//     sleeps; asleep → it wakes.
//   · HOLDING the button is the emergency brake. It works from anything, even a
//     frozen machine, and it throws away every unsaved piece of work. The view
//     counts it (`forced`), so an ordinary "shut it down" job can refuse it.
//   · Log out, Restart and Shut down close every window. A window with unsaved
//     work stops them and asks — "Shut down anyway" is there, and it loses the
//     work, which the view reports (`lost`). Save first is not a rule we invented.
//   · A frozen machine answers nothing but the held button.

/** The programs on the menu, and the title a fresh window of each gets. */
export const APPS = {
  notes: 'Notes',
  paint: 'Paint',
  browser: 'Browser',
  files: 'Files',
  calculator: 'Calculator',
};

export const POWER = ['off', 'login', 'on', 'sleep'];
export const WINDOW_STATES = ['normal', 'max', 'min'];
export const STOPS = ['sleep', 'logout', 'restart', 'shutdown'];

export const ACTIONS = [
  'pressPower', 'holdPower', 'wake', 'typePassword', 'submitLogin',
  'openMenu', 'openPowerMenu', 'closeMenu', 'openApp',
  'minimise', 'maximise', 'restore', 'close', 'edit', 'save',
  'sleep', 'logout', 'restart', 'shutdown',
  'dialogSave', 'dialogDiscard', 'dialogAnyway', 'dialogCancel',
  // T2 · Mouse, Keys and Windows: things on the desktop, right-click, drag.
  'openItem', 'openContext', 'closeContext', 'contextChoose', 'drag', 'deleteItem',
  'typeName', 'commitName', 'cancelName', 'restoreItem', 'openBin',
];

/** Actions that carry what is typed so far; consecutive ones are one move. */
export const TEXT_ACTIONS = ['typePassword', 'typeName'];

/** Where the Recycle Bin keeps things, as an item's `in`. */
export const BIN = 'bin';

/** What a right-click on each kind of target offers (UPGRADE-PLAN §8.2). */
export const CONTEXT_CHOICES = {
  desktop: ['newFolder'],
  item: ['open', 'rename', 'delete'],
  app: ['open'],
  bin: ['open'],
  taskbar: ['close'],
};

/** An item's kind from its name, unless the author said (a folder has no extension). */
export function itemKind(name = '', kind = null) {
  if (kind) return kind;
  const ext = String(name).toLowerCase().includes('.') ? String(name).toLowerCase().split('.').pop() : '';
  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return 'image';
  if (ext === 'pdf') return 'pdf';
  if (['mp3', 'wav'].includes(ext)) return 'audio';
  if (['mp4', 'mov'].includes(ext)) return 'video';
  return ext ? 'doc' : 'folder';
}

/** The program an item opens in: a folder in Files, a picture in Paint, anything else in Notes. */
const APP_FOR_KIND = { folder: 'files', image: 'paint' };

const DEFAULT_USER = 'Ha Vi';
const DEFAULT_PASSWORD = 'sunflower';

export function initial(item) {
  const i = item?.initial || {};
  const power = POWER.includes(i.power) ? i.power : 'on';
  const running = power === 'on' || power === 'sleep';
  const account = i.user || DEFAULT_USER;
  const windows = running
    ? (i.windows || []).map((w, slot) => ({
      // Where it cascades on screen, fixed for the window's life (see the skin).
      slot,
      app: APPS[w.app] ? w.app : 'notes',
      title: w.title || APPS[w.app] || 'Notes',
      state: WINDOW_STATES.includes(w.state) ? w.state : 'normal',
      // What a minimised window returns to. A maximised window that is hidden
      // comes back maximised, as it does on a real machine.
      was: w.state === 'max' ? 'max' : 'normal',
      saved: w.saved !== false,
      ...(w.folder ? { folder: w.folder } : {}),
    }))
    : [];
  // Things on the desktop are files on the machine: unlike windows, they are
  // there whether or not anyone is logged in, and stopping never touches them.
  const items = (i.items || []).map((it) => ({
    name: it.name,
    kind: itemKind(it.name, it.kind),
    in: it.in || 'desktop',
    from: null,
  }));
  return {
    skin: 'desktop',
    power,
    sleptFrom: power === 'sleep' ? 'on' : null,
    account,
    password: i.password ?? DEFAULT_PASSWORD,
    user: running ? account : null,
    typed: '',
    loginError: false,
    frozen: running && !!i.frozen,
    menu: false,
    windows,
    nextSlot: windows.length,
    focus: topTitle(windows),
    dialog: null,
    lost: [],
    counts: { forced: 0, shutdowns: 0, restarts: 0, logouts: 0, sleeps: 0 },
    lastStop: null,
    items,
    context: null,        // the target of the open right-click menu
    renaming: null,       // { name, text, error } while a name box is open
  };
}

/** The window on top: the last one in the list that is not minimised. */
function topTitle(windows) {
  const shown = windows.filter((w) => w.state !== 'min');
  return shown.length ? shown[shown.length - 1].title : null;
}

const findWin = (s, title) => s.windows.find((w) => w.title === title);

/** Bring a window to the top of the pile (the end of the list) and focus it. */
function raise(s, title) {
  const w = findWin(s, title);
  if (!w) return s;
  const windows = [...s.windows.filter((x) => x.title !== title), w];
  return { ...s, windows, focus: title };
}

function withWin(s, title, patch) {
  const windows = s.windows.map((w) => (w.title === title ? { ...w, ...patch } : w));
  return { ...s, windows, focus: topTitle(windows) };
}

/** Everything unsaved on screen, thrown away — the price of stopping anyway. */
const loseUnsaved = (s) => [...s.lost, ...s.windows.filter((w) => !w.saved).map((w) => w.title)];

/** Log out / restart / shut down with nothing unsaved in the way. */
function stop(s, how) {
  const base = {
    ...s,
    windows: [],
    focus: null,
    user: null,
    menu: false,
    dialog: null,
    typed: '',
    loginError: false,
    lastStop: how,
    context: null,
    renaming: null,
  };
  if (how === 'shutdown') return { ...base, power: 'off', counts: { ...s.counts, shutdowns: s.counts.shutdowns + 1 } };
  if (how === 'restart') return { ...base, power: 'login', counts: { ...s.counts, restarts: s.counts.restarts + 1 } };
  return { ...base, power: 'login', counts: { ...s.counts, logouts: s.counts.logouts + 1 } };
}

function goToSleep(s, from) {
  return {
    ...s,
    power: 'sleep',
    sleptFrom: from,
    menu: false,
    context: null,
    lastStop: 'sleep',
    counts: { ...s.counts, sleeps: s.counts.sleeps + 1 },
  };
}

/* ------------------------------------------------------------------ *
 * Things on the desktop (T2): files and folders, the Recycle Bin, right-click
 * menus, dragging and renaming. An item is a file on the machine; `in` is
 * 'desktop', 'bin' or the name of a desktop folder.
 * ------------------------------------------------------------------ */

const findItem = (s, name) => s.items.find((it) => it.name === name);
const isFolder = (s, name) => findItem(s, name)?.kind === 'folder' && findItem(s, name).in !== BIN;

/** Where an item may be dragged: the bin, the desktop, or a folder that is not itself. */
function canDrop(s, name, to) {
  const it = findItem(s, name);
  if (!it || it.in === BIN) return false;
  if (to === BIN || to === 'desktop') return it.in !== to;
  return isFolder(s, to) && to !== name && it.in !== to;
}

function moveItem(s, name, to) {
  return {
    ...s,
    context: null,
    items: s.items.map((it) => (it.name === name
      ? { ...it, in: to, from: to === BIN ? it.in : null }
      : it)),
  };
}

/** Open an item the way double-clicking it does: a folder in Files, a picture in Paint, the rest in Notes. */
function openItem(s, name) {
  const it = findItem(s, name);
  if (!it || it.in === BIN) return s;
  const existing = findWin(s, name);
  const base = { ...s, context: null, menu: false };
  if (existing) {
    const back = existing.state === 'min' ? { state: existing.was || 'normal' } : {};
    return raise(withWin(base, name, back), name);
  }
  const app = APP_FOR_KIND[it.kind] || 'notes';
  const win = { app, title: name, state: 'normal', was: 'normal', saved: true, slot: s.nextSlot, ...(it.kind === 'folder' ? { folder: name } : {}) };
  return { ...base, windows: [...s.windows, win], nextSlot: s.nextSlot + 1, focus: name };
}

function openBin(s) {
  const title = 'Recycle Bin';
  const existing = findWin(s, title);
  const base = { ...s, context: null, menu: false };
  if (existing) return raise(withWin(base, title, existing.state === 'min' ? { state: existing.was || 'normal' } : {}), title);
  return { ...base, windows: [...s.windows, { app: 'files', title, state: 'normal', was: 'normal', saved: true, folder: BIN, slot: s.nextSlot }], nextSlot: s.nextSlot + 1, focus: title };
}

/** Is `target` something a right-click can land on right now? */
function targetExists(s, target = '') {
  const [kind, ...rest] = String(target).split(':');
  const name = rest.join(':');
  if (target === 'desktop' || target === 'bin') return true;
  if (kind === 'item') return !!findItem(s, name) && findItem(s, name).in !== BIN;
  if (kind === 'app') return !!APPS[name];
  if (kind === 'taskbar') return !!findWin(s, name);
  return false;
}

/** A renamed file keeps its extension when the student types a bare name, as a real one does. */
function keepExt(newName, oldName) {
  if (newName.includes('.')) return newName;
  const dot = oldName.lastIndexOf('.');
  return dot > 0 ? `${newName}${oldName.slice(dot)}` : newName;
}

function commitRename(s) {
  const r = s.renaming;
  if (!r) return s;
  const typed = String(r.text || '').trim();
  if (!typed) return { ...s, renaming: { ...r, error: 'empty' } };
  const to = keepExt(typed, r.name);
  if (to === r.name) return { ...s, renaming: null };
  const it = findItem(s, r.name);
  if (!it) return { ...s, renaming: null };
  // Two things cannot share a name — the machine refuses, and says so. (A real
  // one only refuses within one folder; here an item is addressed by its name,
  // so the rule is machine-wide, which a student never meets in a six-item job.)
  if (s.items.some((x) => x.name === to)) return { ...s, renaming: { ...r, error: 'taken' } };
  return {
    ...s,
    renaming: null,
    items: s.items.map((x) => {
      if (x.name === r.name) return { ...x, name: to };
      if (x.in === r.name) return { ...x, in: to };   // a renamed folder keeps what is in it
      return x;
    }),
    windows: s.windows.map((w) => (w.title === r.name ? { ...w, title: to, ...(w.folder ? { folder: to } : {}) } : w)),
    focus: s.focus === r.name ? to : s.focus,
  };
}

/**
 * The reducer. Total: an action that makes no sense in the current state leaves
 * it unchanged, because a mis-tap must never break the machine (rule 2).
 */
export function apply(s, a) {
  // A frozen machine answers one thing. That is the lesson of the held button.
  if (s.frozen && a.type !== 'holdPower') return s;
  // A dialog is modal: until it is answered, only the dialog (and the power
  // button — you can always pull the emergency brake) does anything.
  if (s.dialog && !String(a.type).startsWith('dialog') && a.type !== 'holdPower') return s;

  switch (a.type) {
    case 'pressPower':
      if (s.power === 'off') return { ...s, power: 'login', typed: '', loginError: false };
      if (s.power === 'sleep') return { ...s, power: s.sleptFrom || 'on', sleptFrom: null };
      if (s.power === 'on') return goToSleep(s, 'on');
      if (s.power === 'login') return goToSleep(s, 'login');
      return s;

    case 'holdPower':
      return {
        ...s,
        power: 'off',
        sleptFrom: null,
        user: null,
        typed: '',
        loginError: false,
        frozen: false,
        menu: false,
        dialog: null,
        lost: loseUnsaved(s),
        windows: [],
        focus: null,
        lastStop: 'forced',
        counts: { ...s.counts, forced: s.counts.forced + 1 },
        context: null,
        renaming: null,
      };

    case 'wake':
      return s.power === 'sleep' ? { ...s, power: s.sleptFrom || 'on', sleptFrom: null } : s;

    case 'typePassword':
      return s.power === 'login' ? { ...s, typed: String(a.text ?? ''), loginError: false } : s;

    case 'submitLogin':
      if (s.power !== 'login') return s;
      if (s.typed === s.password) {
        return { ...s, power: 'on', user: s.account, typed: '', loginError: false };
      }
      return { ...s, typed: '', loginError: true };

    case 'openMenu':
      return s.power === 'on' ? { ...s, menu: s.menu ? false : 'apps' } : s;

    case 'openPowerMenu':
      return s.power === 'on' ? { ...s, menu: 'power' } : s;

    case 'closeMenu':
      return s.menu ? { ...s, menu: false } : s;

    case 'openApp': {
      if (s.power !== 'on' || !APPS[a.app]) return s;
      const existing = s.windows.find((w) => w.app === a.app);
      if (existing) {
        const back = existing.state === 'min' ? { state: existing.was || 'normal' } : {};
        return raise({ ...withWin(s, existing.title, back), menu: false }, existing.title);
      }
      const title = uniqueTitle(s, APPS[a.app]);
      return {
        ...s,
        menu: false,
        windows: [...s.windows, { app: a.app, title, state: 'normal', was: 'normal', saved: true, slot: s.nextSlot }],
        nextSlot: s.nextSlot + 1,
        focus: title,
      };
    }

    case 'minimise': {
      const w = s.power === 'on' && findWin(s, a.title);
      if (!w || w.state === 'min') return s;
      return withWin(s, a.title, { state: 'min', was: w.state });
    }

    case 'maximise': {
      const w = s.power === 'on' && findWin(s, a.title);
      if (!w) return s;
      return raise(withWin(s, a.title, { state: w.state === 'max' ? 'normal' : 'max' }), a.title);
    }

    case 'restore': {
      const w = s.power === 'on' && findWin(s, a.title);
      if (!w) return s;
      if (w.state === 'min') return raise(withWin(s, a.title, { state: w.was || 'normal' }), a.title);
      return raise(s, a.title);
    }

    case 'close': {
      const w = s.power === 'on' && findWin(s, a.title);
      if (!w) return s;
      if (!w.saved) return { ...s, dialog: { kind: 'close', title: a.title }, menu: false };
      const windows = s.windows.filter((x) => x.title !== a.title);
      return { ...s, windows, focus: topTitle(windows) };
    }

    case 'edit': {
      const w = s.power === 'on' && findWin(s, a.title);
      return w ? withWin(s, a.title, { saved: false }) : s;
    }

    case 'save': {
      const w = s.power === 'on' && findWin(s, a.title);
      return w ? withWin(s, a.title, { saved: true }) : s;
    }

    case 'sleep':
      return s.power === 'on' ? goToSleep(s, 'on') : s;

    case 'logout':
    case 'restart':
    case 'shutdown': {
      if (s.power !== 'on') return s;
      const unsaved = s.windows.filter((w) => !w.saved);
      if (unsaved.length) return { ...s, menu: false, dialog: { kind: 'stop', then: a.type, titles: unsaved.map((w) => w.title) } };
      return stop(s, a.type);
    }

    case 'dialogSave': {
      if (s.dialog?.kind !== 'close') return s;
      const windows = s.windows.filter((w) => w.title !== s.dialog.title);
      return { ...s, windows, focus: topTitle(windows), dialog: null };
    }

    case 'dialogDiscard': {
      if (s.dialog?.kind !== 'close') return s;
      const windows = s.windows.filter((w) => w.title !== s.dialog.title);
      return { ...s, windows, focus: topTitle(windows), lost: [...s.lost, s.dialog.title], dialog: null };
    }

    case 'dialogAnyway':
      if (s.dialog?.kind !== 'stop') return s;
      return stop({ ...s, lost: loseUnsaved(s) }, s.dialog.then);

    case 'dialogCancel':
      return s.dialog ? { ...s, dialog: null } : s;

    // ---- things on the desktop (T2) ----------------------------------------

    case 'openItem':
      return s.power === 'on' ? openItem(s, a.name) : s;

    case 'openBin':
      // Double-clicking the Recycle Bin — the same window right-click ▸ Open gives.
      return s.power === 'on' ? openBin(s) : s;

    case 'openContext':
      // A right-click (press-and-hold on a tablet) opens the menu for the thing
      // under the pointer — and only that thing. It also closes the start menu.
      return s.power === 'on' && targetExists(s, a.target) && s.context !== a.target
        ? { ...s, context: a.target, menu: false }
        : s;

    case 'closeContext':
      return s.context ? { ...s, context: null } : s;

    case 'contextChoose': {
      if (s.power !== 'on' || !s.context) return s;
      const [kind, ...rest] = s.context.split(':');
      const name = rest.join(':');
      const offered = CONTEXT_CHOICES[kind] || [];
      if (!offered.includes(a.choice)) return s;
      const closed = { ...s, context: null };
      if (kind === 'desktop' && a.choice === 'newFolder') {
        let folder = 'New folder';
        // Names are unique across the machine here (an item is addressed by its name).
        for (let n = 2; closed.items.some((x) => x.name === folder); n += 1) folder = `New folder ${n}`;
        return {
          ...closed,
          items: [...closed.items, { name: folder, kind: 'folder', in: 'desktop', from: null }],
          // A new folder arrives with its name box open, as it does on a real machine.
          renaming: { name: folder, text: folder, error: null },
        };
      }
      if (kind === 'item') {
        if (a.choice === 'open') return openItem(closed, name);
        if (a.choice === 'rename') return { ...closed, renaming: { name, text: name, error: null } };
        if (a.choice === 'delete') return moveItem(closed, name, BIN);
      }
      if (kind === 'app') return apply(closed, { type: 'openApp', app: name });
      if (kind === 'bin') return openBin(closed);
      if (kind === 'taskbar') return apply(closed, { type: 'close', title: name });
      return s;
    }

    case 'drag':
      return s.power === 'on' && canDrop(s, a.name, a.to) ? moveItem(s, a.name, a.to) : s;

    case 'deleteItem':
      return s.power === 'on' && canDrop(s, a.name, BIN) ? moveItem(s, a.name, BIN) : s;

    case 'typeName':
      return s.renaming ? { ...s, renaming: { ...s.renaming, text: String(a.text ?? ''), error: null } } : s;

    case 'commitName':
      return commitRename(s);

    case 'cancelName':
      return s.renaming ? { ...s, renaming: null } : s;

    case 'restoreItem': {
      const it = findItem(s, a.name);
      if (s.power !== 'on' || !it || it.in !== BIN) return s;
      // Back to where it was deleted from, if that folder still exists.
      const back = it.from && (it.from === 'desktop' || isFolder(s, it.from)) ? it.from : 'desktop';
      return { ...s, items: s.items.map((x) => (x.name === a.name ? { ...x, in: back, from: null } : x)) };
    }

    default:
      return s;
  }
}

function uniqueTitle(s, base) {
  if (!findWin(s, base)) return base;
  let n = 2;
  while (findWin(s, `${base} ${n}`)) n += 1;
  return `${base} ${n}`;
}

/** The read model goals are written against (UPGRADE-PLAN §3.1). */
export function view(s) {
  const titles = (pred) => s.windows.filter(pred).map((w) => w.title);
  return {
    ...s,
    loggedIn: s.power === 'on' && !!s.user,
    open: titles(() => true),
    minimised: titles((w) => w.state === 'min'),
    maximised: titles((w) => w.state === 'max'),
    unsaved: titles((w) => !w.saved),
    lostCount: s.lost.length,
    forced: s.counts.forced,
    shutdowns: s.counts.shutdowns,
    restarts: s.counts.restarts,
    logouts: s.counts.logouts,
    sleeps: s.counts.sleeps,
    // Things on the desktop, by where they are: at.desktop, at.bin, at.<folder>.
    at: s.items.reduce((acc, it) => ({ ...acc, [it.in]: [...(acc[it.in] || []), it.name] }), { desktop: [], [BIN]: [] }),
    folders: s.items.filter((it) => it.kind === 'folder' && it.in !== BIN).map((it) => it.name),
    renaming: s.renaming ? s.renaming.name : null,
  };
}

/**
 * Where the default nudge points for a failing clause. Items usually author
 * their own hints; this is the fallback, and it reads the machine's STATE, not
 * just the clause — because the wrong glow teaches the wrong thing. Glowing the
 * power button on a working machine would invite a student to hold it.
 */
export function regionFor(path = '', s = null) {
  if (s?.dialog) return 'dialog';
  if (s?.renaming) return 'rename';
  if (path.startsWith('at.bin')) return 'bin';
  const folder = /^at\.([^.[]+)/.exec(path)?.[1];
  if (folder && folder !== 'desktop') return `item:${folder}`;
  if (path === 'at.desktop' || path === 'folders') return 'desktop';
  if (path === 'focus') return 'taskbar';
  if (s?.frozen) return 'power';
  if (s?.power === 'off') return 'power';
  if (s?.power === 'sleep') return 'screen';
  if (s?.power === 'login') return 'password';
  const unsaved = s?.windows?.find((w) => !w.saved);
  const stopping = ['power', 'shutdowns', 'restarts', 'logouts', 'sleeps', 'lastStop', 'lostCount', 'lost', 'unsaved'];
  if (stopping.includes(path)) {
    if (unsaved) return `save:${unsaved.title}`;
    return s?.menu === 'apps' ? 'powerMenu' : 'menu';
  }
  if (path === 'loggedIn') return 'password';
  if (['open', 'minimised', 'maximised'].includes(path)) return 'taskbar';
  return 'screen';
}

/** Problems with an item's authored starting state. */
export function checkInitial(item) {
  const id = item?.id || '(no id)';
  const i = item?.initial || {};
  const out = [];
  if (i.power !== undefined && !POWER.includes(i.power)) out.push(`${id}: power "${i.power}" is not one of ${POWER.join(', ')}`);
  if (i.password !== undefined && (typeof i.password !== 'string' || !i.password)) out.push(`${id}: password must be a non-empty string`);
  const running = !i.power || i.power === 'on' || i.power === 'sleep';
  if (i.frozen && (i.power && i.power !== 'on')) out.push(`${id}: only a machine that is on can be frozen`);
  if (!running && (i.windows || []).length) out.push(`${id}: windows are open on a machine whose power is "${i.power}"`);
  const seen = new Set();
  for (const w of i.windows || []) {
    if (!APPS[w.app]) out.push(`${id}: window app "${w.app}" is not one of ${Object.keys(APPS).join(', ')}`);
    const t = w.title || APPS[w.app];
    if (seen.has(t)) out.push(`${id}: two windows are titled "${t}" — titles address windows, so they must differ`);
    seen.add(t);
    if (w.state !== undefined && !WINDOW_STATES.includes(w.state)) out.push(`${id}: window "${t}" state "${w.state}"`);
  }
  // Desktop items are addressed by name, so names must be unique, and an item
  // can only be inside the desktop, the bin, or a folder that exists.
  const names = new Set();
  const items = i.items || [];
  for (const it of items) {
    if (!it?.name) { out.push(`${id}: a desktop item has no name`); continue; }
    if (names.has(it.name)) out.push(`${id}: two desktop items are called "${it.name}"`);
    names.add(it.name);
  }
  const folders = new Set(items.filter((it) => itemKind(it.name, it.kind) === 'folder').map((it) => it.name));
  for (const it of items) {
    const where = it.in || 'desktop';
    if (where !== 'desktop' && where !== BIN && !folders.has(where)) out.push(`${id}: item "${it.name}" is in "${where}", which is not the desktop, the bin or a folder`);
    if (where === it.name) out.push(`${id}: item "${it.name}" is inside itself`);
  }
  return out;
}

// src/utils/appSim.js
//
// The simulator behind the SIM task ("Try It") and the AppSim notes widget. A
// fake computer the student operates, and an assertion about the state it ends
// up in — which is the only way to assess "can use a computer" honestly. A
// student who can pick "the address bar" out of four options on Monday will
// still type an address into a search box on Tuesday
// (docs/digital-skills-course.md §1).
//
// PURE, NO REACT. The skins render it and the validator replays it, so nothing
// here may touch the DOM, the clock or randomness.
//
// THE FOUR RULES this module exists to enforce (§4.1 of the course doc):
//
//   1. ASSERT ON STATE, NEVER ON CLICKS. A goal is a list of predicates over the
//      fake machine's state, so right-click ▸ Save, Ctrl+S and File ▸ Save all
//      pass. Multiple correct routes passing IS the skill — a student who learns
//      one path has not learned to use a computer.
//   2. NO DEAD ENDS. Every session is an append-only action log, so undo is
//      "drop the last action and replay". Nothing is unrecoverable, including
//      deletion, which goes to the Recycle Bin and comes back.
//   3. NUDGE, DON'T FAIL. Nothing in here ends a task. Scoring belongs to the
//      screen; this module only ever reports what is true of the state.
//   4. PAR MOVES ARE A BONUS. The action log gives the move count for free.
//
// THE ACTION LOG is the whole design. Replay, undo and the solvability
// self-check all fall out of "state is a fold of actions over an initial state",
// which is why every gesture becomes an action rather than a setState.
//
// SKINS. `files` lives in this file (it was the first); `desktop` and `browser`
// live in ./appSim/ and export the same five things — initial, apply, view,
// regionFor, checkInitial — plus their ACTIONS and TEXT_ACTIONS. Everything
// below dispatches on `state.skin`, so a new skin is one module and one line in
// SKIN_MODULES (docs/primary-tech/UPGRADE-PLAN.md §3.1).
import * as desktopSkin from './appSim/desktop.js';
import * as browserSkin from './appSim/browser.js';

/** The folders the `files` skin models. Order is the order they are drawn. */
export const FOLDERS = ['Documents', 'Downloads', 'Desktop', 'Recycle Bin'];
export const BIN = 'Recycle Bin';

/* ------------------------------------------------------------------ *
 * State
 * ------------------------------------------------------------------ */

/**
 * Build the starting state for an item.
 *
 * `item.initial` is deliberately terse for the author — `{ files: [{ name, in }],
 * editor: { name } }` — and is expanded here into the full shape the reducer
 * works with, so unit data never has to spell out fields it does not care about.
 */
export function initialState(item) {
  const mod = SKIN_MODULES[item?.skin];
  if (mod) return mod.initial(item);
  const init = item?.initial || {};
  return {
    skin: item?.skin || 'files',
    cwd: init.cwd || 'Documents',
    files: (init.files || []).map((f) => ({
      name: f.name,
      folder: f.in || 'Documents',
      kind: f.kind || kindOf(f.name),
      // Where a file came from, so the bin can put it back. Only set on delete.
      from: null,
    })),
    selected: null,
    // The document open in the editor. `folder: null` means it has never been
    // saved anywhere — which is why Save has to become Save As the first time,
    // exactly as it does on a real machine. That IS the lesson of T4.
    // `ext` is what the program the student is "in" saves as, so typing a bare
    // "volcano" produces volcano.docx the way a real editor would. Without it a
    // saved file would have no extension at all, which is a lie about computers
    // and breaks the file-types unit later.
    editor: init.editor
      ? {
        name: init.editor.name || 'Untitled',
        ext: init.editor.ext || '',
        folder: init.editor.in || null,
        saved: false,
      }
      : null,
    dialog: null,
    search: '',
    // Files written over since the start. The simulator has no file CONTENTS,
    // so this is how a goal can tell "kept the first draft" from "saved over it
    // and then made a copy" — which looks identical in the folder listing.
    overwritten: [],
  };
}

/** File kind from the extension, so authors never have to write it out. */
export function kindOf(name = '') {
  const ext = String(name).toLowerCase().split('.').pop();
  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return 'image';
  if (['pdf'].includes(ext)) return 'pdf';
  if (['mp4', 'mov', 'avi'].includes(ext)) return 'video';
  if (['mp3', 'wav'].includes(ext)) return 'audio';
  return 'doc';
}

/* ------------------------------------------------------------------ *
 * Actions
 * ------------------------------------------------------------------ */

/** Every action type the `files` skin can produce. */
export const FILE_ACTIONS = [
  'openFolder', 'select', 'save', 'saveAs',
  'dialogName', 'dialogFolder', 'dialogConfirm', 'dialogCancel',
  'rename', 'move', 'remove', 'restore', 'search',
];

/** The skins that live in their own module. `files` is the fallback in here. */
const SKIN_MODULES = { desktop: desktopSkin, browser: browserSkin };

/** Skins the engine knows how to build a state for. */
export const SKINS = ['files', ...Object.keys(SKIN_MODULES)];

/** Every action type each skin can produce. */
export const ACTIONS_BY_SKIN = {
  files: FILE_ACTIONS,
  desktop: desktopSkin.ACTIONS,
  browser: browserSkin.ACTIONS,
};

/** @deprecated the `files` list, kept for older imports — use ACTIONS_BY_SKIN. */
export const ACTIONS = FILE_ACTIONS;

/**
 * Actions that carry "what is typed so far" rather than a gesture. Two in a row
 * of the same type are ONE move: the second replaces the first in the log.
 *
 * Without this every keystroke was a move. A student typing "volcano report"
 * into Save As had spent fourteen moves against a par of four, and — since a
 * keystroke brings no goal clause closer — was "stuck" after three letters and
 * nudged, which capped a job they were doing perfectly at 6/10.
 */
export const TEXT_ACTIONS = ['dialogName', 'search', ...desktopSkin.TEXT_ACTIONS, ...browserSkin.TEXT_ACTIONS];

/**
 * Append an action to a session log, folding consecutive typing into one move.
 * Returns `{ log, appended }` — `appended` is false when the action replaced
 * the last one, so a screen can tell a new move from more of the same typing.
 */
export function record(log = [], action) {
  const last = log[log.length - 1];
  if (action && TEXT_ACTIONS.includes(action.type) && last?.type === action.type) {
    return { log: [...log.slice(0, -1), action], appended: false };
  }
  return { log: [...log, action], appended: true };
}

/** Where the default nudge should point for a failing goal clause, given the state now. */
export function regionFor(skin, path = '', state = null) {
  const mod = SKIN_MODULES[skin];
  if (mod) return mod.regionFor(path, state);
  if (path.startsWith('saved')) return 'save';
  if (path.startsWith('bin') || path.includes('Recycle')) return 'folder:Recycle Bin';
  const folder = /^at\.([^.[]+)/.exec(path)?.[1];
  if (folder) return `folder:${folder}`;
  return 'list';
}

const withFile = (state, name, fn) => ({
  ...state,
  files: state.files.map((f) => (f.name === name ? { ...f, ...fn(f) } : f)),
});

const has = (state, name) => state.files.some((f) => f.name === name);

/**
 * The reducer. `apply(state, action) -> state`, immutable, and total: an action
 * that makes no sense in the current state returns the state unchanged rather
 * than throwing, because a student mis-tapping must never break the machine
 * (rule 2). `applyStrict` is the authoring-time version that does complain.
 */
export function apply(state, action) {
  if (!state || !action) return state;
  const mod = SKIN_MODULES[state.skin];
  return mod ? mod.apply(state, action) : applyFiles(state, action);
}

function applyFiles(state, a) {
  switch (a.type) {
    // Opening a folder ends a search: search spans every folder (the skin lists
    // matches from all of them), and a folder click means "show me this one".
    case 'openFolder':
      return FOLDERS.includes(a.folder) ? { ...state, cwd: a.folder, selected: null, search: '' } : state;

    case 'select':
      return has(state, a.name) ? { ...state, selected: a.name } : state;

    case 'search':
      return { ...state, search: String(a.query ?? '') };

    // Save on a document that has never been saved cannot silently pick a name
    // and a folder for the student — so it opens the same dialog Save As does.
    case 'save': {
      if (!state.editor) return state;
      if (!state.editor.folder) return apply(state, { type: 'saveAs' });
      // Save on a file that already exists writes over it — the whole point of
      // Save As is the one time you do not want that.
      const over = state.files.some((f) => f.name === state.editor.name && f.folder === state.editor.folder);
      return {
        ...state,
        editor: { ...state.editor, saved: true },
        overwritten: over ? addOnce(state.overwritten, state.editor.name) : state.overwritten,
      };
    }

    case 'saveAs':
      if (!state.editor) return state;
      return {
        ...state,
        dialog: {
          kind: 'saveAs',
          // The name without its extension, as a real Save As box shows it: a
          // student adding " 2" must get "report 2.docx", not "report.docx 2".
          name: state.editor.name === 'Untitled' ? '' : baseName(state.editor.name),
          folder: state.editor.folder || state.cwd,
        },
      };

    case 'dialogName':
      return state.dialog ? { ...state, dialog: { ...state.dialog, name: String(a.name ?? ''), replacing: null } } : state;

    // `picked` records that the student CHOSE a folder, even the one already
    // highlighted — "choose Documents" is a real step when Documents is where
    // the box happened to open, and not a step the engine ignored.
    case 'dialogFolder':
      return state.dialog && FOLDERS.includes(a.folder)
        ? { ...state, dialog: { ...state.dialog, folder: a.folder, picked: true, replacing: null } }
        : state;

    // Cancel on "Replace it?" goes back to the Save As box, as a real "No" does;
    // anywhere else it closes the box and saves nothing.
    case 'dialogCancel':
      if (state.dialog?.replacing) return { ...state, dialog: { ...state.dialog, replacing: null } };
      return { ...state, dialog: null };

    case 'dialogConfirm': {
      const d = state.dialog;
      // A nameless save is refused by the dialog itself, not by silence.
      if (!d || !d.name.trim()) return state;
      const name = ensureExt(d.name.trim(), state.editor?.name, state.editor?.ext);
      const exists = state.files.some((f) => f.name === name && f.folder === d.folder);
      // A name that is already taken in that folder is not saved over silently:
      // the box asks first, and only a second Save (the "Replace" button) does it.
      if (exists && d.replacing !== name) return { ...state, dialog: { ...d, replacing: name } };
      const rest = state.files.filter((f) => !(f.name === name && f.folder === d.folder));
      return {
        ...state,
        overwritten: exists ? addOnce(state.overwritten, name) : state.overwritten,
        files: [...rest, { name, folder: d.folder, kind: kindOf(name), from: null }],
        // Spread rather than rebuild: the editor's `ext` has to survive a save,
        // or a second Save As would produce a file with no extension.
        editor: { ...state.editor, name, folder: d.folder, saved: true },
        dialog: null,
        cwd: d.folder,
        selected: name,
      };
    }

    case 'rename': {
      if (!has(state, a.name) || !String(a.to || '').trim()) return state;
      const to = ensureExt(String(a.to).trim(), a.name);
      return {
        ...withFile(state, a.name, () => ({ name: to, kind: kindOf(to) })),
        selected: state.selected === a.name ? to : state.selected,
        editor: state.editor?.name === a.name ? { ...state.editor, name: to } : state.editor,
      };
    }

    case 'move':
      if (!has(state, a.name) || !FOLDERS.includes(a.to)) return state;
      return withFile(state, a.name, () => ({ folder: a.to, from: null }));

    // Deleting is a MOVE to the bin, never a removal. "You can almost always
    // undo it" is one of the most valuable things this course teaches, and the
    // simulator should teach it by being true (§4.1).
    case 'remove':
      if (!has(state, a.name)) return state;
      return withFile(state, a.name, (f) => (f.folder === BIN ? {} : { folder: BIN, from: f.folder }));

    case 'restore':
      if (!has(state, a.name)) return state;
      return withFile(state, a.name, (f) => (f.folder === BIN ? { folder: f.from || 'Documents', from: null } : {}));

    default:
      return state;
  }
}

/**
 * Keep the extension the document already had when the student types a bare
 * name. A nine-year-old asked to "name it so you will know it next week" types
 * "volcano", not "volcano.docx", and failing them for that would be testing
 * typing rather than filing.
 */
function ensureExt(name, modelName = '', fallbackExt = '') {
  if (name.includes('.')) return name;
  const ext = String(modelName).includes('.') ? modelName.split('.').pop() : fallbackExt;
  return ext ? `${name}.${ext}` : name;
}

const addOnce = (list = [], x) => (list.includes(x) ? list : [...list, x]);

/** A file name without its extension: "volcano report.docx" → "volcano report". */
function baseName(name = '') {
  const dot = String(name).lastIndexOf('.');
  return dot > 0 ? String(name).slice(0, dot) : String(name);
}

/** Fold a list of actions over a starting state. Replay, undo and solve all use this. */
export function replay(state, actions = []) {
  return actions.reduce((s, a) => apply(s, a), state);
}

/** Undo = drop the last action and replay from the beginning. No dead ends. */
export function undo(item, actions = []) {
  return { actions: actions.slice(0, -1), state: replay(initialState(item), actions.slice(0, -1)) };
}

/* ------------------------------------------------------------------ *
 * Goals
 * ------------------------------------------------------------------ */

/**
 * The read model a goal is written against.
 *
 * Goals path into THIS, not into the raw state, so an author writes what they
 * mean — "there is a file called volcano.docx in Documents" — instead of
 * `files[3].folder`, which depends on an ordering nothing guarantees.
 */
export function view(state) {
  const mod = SKIN_MODULES[state?.skin];
  if (mod) return mod.view(state);
  const at = Object.fromEntries(
    FOLDERS.map((f) => [f, state.files.filter((x) => x.folder === f).map((x) => x.name)])
  );
  return {
    ...state,
    at,
    names: state.files.map((f) => f.name),
    count: state.files.length,
    bin: at[BIN],
    // `editor.saved` is the answer to "did they actually save it", and
    // `editor.folder` to "did they know where it went".
    savedName: state.editor?.saved ? state.editor.name : null,
    savedIn: state.editor?.saved ? state.editor.folder : null,
  };
}

/** `a.b[0].c` -> value, or undefined. Bracket and dot forms both work. */
export function resolvePath(obj, path) {
  return String(path)
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean)
    .reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

/** The operators a goal clause may use. Exactly one per clause. */
export const OPERATORS = ['equals', 'matches', 'gte', 'contains', 'excludes', 'someMatches'];

function testClause(v, clause) {
  if ('equals' in clause) return v === clause.equals;
  if ('gte' in clause) return Number(v) >= Number(clause.gte);
  if ('matches' in clause) return typeof v === 'string' && new RegExp(clause.matches).test(v);
  if ('contains' in clause) return Array.isArray(v) ? v.includes(clause.contains) : String(v ?? '').includes(clause.contains);
  if ('excludes' in clause) return Array.isArray(v) ? !v.includes(clause.excludes) : !String(v ?? '').includes(clause.excludes);
  if ('someMatches' in clause) {
    const re = new RegExp(clause.someMatches);
    return Array.isArray(v) && v.some((x) => re.test(String(x)));
  }
  return false;
}

/**
 * Is the job done? Returns every clause that is not yet satisfied, so the screen
 * can nudge toward the specific thing still missing rather than saying "no".
 */
export function evaluate(state, goal = []) {
  const v = view(state);
  const failed = goal.filter((c) => !testClause(resolvePath(v, c.path), c));
  return { met: goal.length > 0 && failed.length === 0, failed };
}

/* ------------------------------------------------------------------ *
 * Author-time checks
 * ------------------------------------------------------------------ */

/**
 * Run an item's authored solution and report what happened. This is the whole
 * point of step 3d: an unsolvable sim item is this track's version of a wrong
 * answer key, and it is invisible from reading the data.
 */
export function solve(item) {
  const start = initialState(item);
  const end = replay(start, item?.solution || []);
  return {
    start,
    end,
    // Counted the way the screen counts them: consecutive typing is one move.
    moves: (item?.solution || []).reduce((log, a) => record(log, a).log, []).length,
    before: evaluate(start, item?.goal || []),
    after: evaluate(end, item?.goal || []),
  };
}

/**
 * Validate one authored SIM item. Returns problem strings (empty = OK).
 *
 * Two of these catch bugs nothing else can:
 *   · the solution does not reach the goal — the item cannot be completed;
 *   · the goal is ALREADY met before the student touches anything — the item
 *     pays full marks for doing nothing, which reads as fine in the data.
 */
export function checkItem(item) {
  const problems = [];
  const id = item?.id || '(no id)';
  if (!item?.id) problems.push(`${id}: item has no id`);
  if (!SKINS.includes(item?.skin)) problems.push(`${id}: skin "${item?.skin}" is not one of ${SKINS.join(', ')}`);
  if (!item?.brief) problems.push(`${id}: no brief — the student is not told what the job is`);
  if (!item?.briefVn) problems.push(`${id}: no Vietnamese brief (briefVn)`);

  const mod = SKIN_MODULES[item?.skin];
  if (mod) problems.push(...mod.checkInitial(item));
  for (const f of mod ? [] : item?.initial?.files || []) {
    if (!f.name) problems.push(`${id}: a starting file has no name`);
    if (f.in && !FOLDERS.includes(f.in)) problems.push(`${id}: file "${f.name}" starts in "${f.in}", which is not a folder`);
  }

  const goal = item?.goal || [];
  if (!goal.length) problems.push(`${id}: no goal — nothing decides whether the job got done`);
  for (const c of goal) {
    if (!c?.path) problems.push(`${id}: a goal clause has no path`);
    const ops = OPERATORS.filter((o) => o in (c || {}));
    if (ops.length !== 1) {
      problems.push(`${id}: goal clause "${c?.path}" has ${ops.length} operators (${ops.join(', ') || 'none'}) — needs exactly one of ${OPERATORS.join('/')}`);
    }
  }

  // A hint's `when` is a goal clause about the state now (AppSim.jsx picks the
  // hint by it); a malformed one would silently never show its hint.
  for (const h of item?.hints || []) {
    for (const c of h?.when ? [h.when].flat() : []) {
      const ops = OPERATORS.filter((o) => o in (c || {}));
      if (!c?.path || ops.length !== 1) problems.push(`${id}: hint "${h.say || h.region}" has a malformed \`when\` clause`);
    }
    if (!h?.say || !h?.sayVn) problems.push(`${id}: hint for "${h?.region}" needs say and sayVn`);
  }

  const solution = item?.solution || [];
  if (!solution.length) problems.push(`${id}: no solution — nothing proves the job can be done`);
  const known = ACTIONS_BY_SKIN[item?.skin] || [];
  for (const a of solution) {
    if (!known.includes(a?.type)) problems.push(`${id}: solution step "${a?.type}" is not a ${item?.skin} action (${known.join(', ')})`);
  }

  // Everything below needs a well-formed item to say anything useful about.
  if (problems.length) return problems;

  // A step the engine ignores is an authoring slip that the goal may not catch —
  // a link that is not on the page, a window title spelt differently — and it
  // quietly inflates the move count the par is measured against.
  problems.push(...deadSteps(item, solution).map((p) => `${id}: solution ${p}`));

  const run = solve(item);
  if (run.before.met) {
    problems.push(`${id}: the goal is already met before the student does anything — the item awards full marks for nothing`);
  }
  if (!run.after.met) {
    problems.push(
      `${id}: the authored solution does not reach the goal. Still failing: ` +
      run.after.failed.map((c) => c.path).join(', ')
    );
  }
  const par = Number(item.parMoves);
  if (Number.isFinite(par) && par < run.moves) {
    problems.push(`${id}: parMoves ${par} is below the ${run.moves}-step solution, so the bonus can never be earned`);
  }
  if (item.hintAfter !== undefined && !(item.hintAfter > 0)) {
    problems.push(`${id}: hintAfter must be a positive number of wrong moves`);
  }

  return problems;
}

/** Every problem across a unit's `sim` array. */
export function checkAll(items) {
  return (items || []).flatMap(checkItem);
}

/** Steps in an action list that leave the state exactly as it was — the engine ignored them. */
function deadSteps(item, actions) {
  const out = [];
  let state = initialState(item);
  actions.forEach((a, i) => {
    const next = apply(state, a);
    if (next === state || JSON.stringify(next) === JSON.stringify(state)) {
      out.push(`step ${i + 1} (${a?.type}${a?.title ? ` "${a.title}"` : ''}${a?.to ? ` → ${a.to}` : ''}${a?.file ? ` ${a.file}` : ''}${a?.app ? ` ${a.app}` : ''}) changes nothing — the engine ignored it`);
    }
    state = next;
  });
  return out;
}

/**
 * Check an AppSim DEMO (a notes slide's `widget: { type: 'AppSim', params }`).
 * A demo is never graded, so nothing else would notice a script whose steps the
 * engine ignores: the narration would describe a click and the window would sit
 * there. Every step must change something, and every step should say what it does.
 */
export function checkScript(params = {}) {
  const out = [];
  const skin = params.skin || 'files';
  if (!SKINS.includes(skin)) return [`demo skin "${skin}" is not one of ${SKINS.join(', ')}`];
  const script = params.script || [];
  if (!script.length) out.push('demo has no script');
  const known = ACTIONS_BY_SKIN[skin];
  for (const a of script) {
    if (!known.includes(a?.type)) out.push(`demo step "${a?.type}" is not a ${skin} action`);
    if (!a?.say || !a?.sayVn) out.push(`demo step "${a?.type}" needs say and sayVn (the caption that explains it)`);
  }
  if (out.length) return out;
  const item = { skin, initial: params.initial || {} };
  const mod = SKIN_MODULES[skin];
  if (mod) out.push(...mod.checkInitial({ ...item, id: 'demo' }));
  out.push(...deadSteps(item, script).map((p) => `demo ${p}`));
  return out;
}

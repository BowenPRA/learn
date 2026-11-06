import { useEffect, useRef, useState } from 'react';
import {
  Folder, FolderOpen, Trash2, FileText, Image as ImageIcon, FileType2, Film, Music,
  Save, Pencil, MoreVertical, CornerUpLeft, Search, X,
} from 'lucide-react';
import { FOLDERS, BIN } from '../../../utils/appSim';

/* ------------------------------------------------------------------ *
 * FILES SKIN — the fake file manager the student operates.
 *
 * Renders `state` from src/utils/appSim.js and turns every gesture into an
 * ACTION passed to `onAction`. It holds no model state of its own beyond which
 * menu is open and what is half-typed, so the engine stays the single source of
 * truth and the whole session remains replayable.
 *
 * MORE THAN ONE ROUTE TO EVERYTHING, on purpose. Save is a button AND Ctrl+S.
 * Delete is a button, a row menu item AND the Delete key. Moving a file is a
 * drag onto a folder AND a "Move to" menu. The engine asserts on the state that
 * results, never on which control was used, so all of them pass — and a student
 * who only ever learns one path has not learned to use a computer
 * (docs/digital-skills-course.md §4.1, rule 1).
 *
 * TOUCH. Every row carries a visible ⋮ button that opens the same menu as
 * right-click, because long-press is not discoverable for a nine-year-old and a
 * fake desktop that needs a mouse is useless on the tablet they actually have
 * (§5.5). Drag still works where there is a mouse.
 *
 * ONE DELIBERATE DEVIATION from §5.5: the course doc asks for a fixed aspect
 * ratio scaled to fit. This is a responsive DOM layout instead. Scaling live DOM
 * with a transform blurs text and breaks focus and zoom on the tablets this is
 * aimed at; the point of the rule — that it behaves the same on a laptop and a
 * tablet — is met by laying out for both, and text stays crisp.
 *
 * ENGLISH ONLY, on purpose. The words on this window are the interface words
 * the course is teaching (§5.3): Documents, Downloads, Recycle Bin, Save As.
 * Translating the buttons would remove the thing being learnt. The brief and the
 * feedback around the window are bilingual — those are the teaching, not the
 * interface.
 * ------------------------------------------------------------------ */

const KIND_ICON = { image: ImageIcon, pdf: FileType2, video: Film, audio: Music, doc: FileText };
const FOLDER_ICON = (f, active) => (f === BIN ? Trash2 : active ? FolderOpen : Folder);

/** A region the task can make glow when the student is stuck. */
const glow = (on) => (on ? 'ring-4 ring-amber-300 ring-offset-2 dark:ring-offset-slate-900 animate-pulse' : '');

export default function FilesSkin({ state, onAction, hint = null, disabled = false }) {
  const [menuFor, setMenuFor] = useState(null);   // file name whose ⋮ menu is open
  const [renaming, setRenaming] = useState(null); // { name, value }
  const [dragging, setDragging] = useState(null);
  const rootRef = useRef(null);

  const act = (action) => { if (!disabled) onAction(action); };

  // Search looks in EVERY folder, the way a real file manager's does — "I saved
  // it but I don't know where" is exactly the problem search exists to solve,
  // and a box that only searched the folder you are already in would not.
  const query = state.search.trim().toLowerCase();
  const visible = query
    ? state.files.filter((f) => f.name.toLowerCase().includes(query))
    : state.files.filter((f) => f.folder === state.cwd);
  const inBin = (name) => state.files.find((f) => f.name === name)?.folder === BIN;

  // Keyboard routes. Skipped whenever the student is typing, so Ctrl+S in the
  // Save As name box still saves but a plain Delete does not eat their text.
  useEffect(() => {
    const onKey = (e) => {
      if (disabled) return;
      const typing = ['INPUT', 'TEXTAREA'].includes(e.target?.tagName);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        act({ type: 'save' });
        return;
      }
      if (typing) return;
      if (e.key === 'Delete' && state.selected) {
        e.preventDefault();
        act({ type: inBin(state.selected) ? 'restore' : 'remove', name: state.selected });
      }
      if (e.key === 'F2' && state.selected) {
        e.preventDefault();
        setRenaming({ name: state.selected, value: state.selected });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // A click anywhere else closes an open row menu.
  useEffect(() => {
    const close = () => setMenuFor(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  const commitRename = () => {
    if (renaming && renaming.value.trim() && renaming.value !== renaming.name) {
      act({ type: 'rename', name: renaming.name, to: renaming.value });
    }
    setRenaming(null);
  };

  return (
    <div
      ref={rootRef}
      // `relative` anchors the Save As dialog, which covers the window rather
      // than the page: the dialog belongs to this fake machine, not to the app.
      className="relative w-full rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-sm select-none">

      {/* the program the document is open in — only when there is one */}
      {state.editor && (
        <div className={`flex flex-wrap items-center gap-2 px-3 py-2.5 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700 ${glow(hint === 'editor')}`}>
          <FileText className="w-4 h-4 text-slate-500 shrink-0" strokeWidth={2.5} />
          <span className="font-black text-sm text-slate-700 dark:text-slate-200 truncate">
            {state.editor.name}
            {!state.editor.saved && <span className="text-rose-500"> •</span>}
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {state.editor.saved ? `saved in ${state.editor.folder}` : 'not saved'}
          </span>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => act({ type: 'save' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest text-white bg-[#0ea5e9] border-b-[3px] border-[#0369a1] active:border-b-0 active:translate-y-[3px] flex items-center gap-1.5 ${glow(hint === 'save')}`}>
              <Save className="w-3.5 h-3.5" strokeWidth={3} /> Save
            </button>
            <button
              onClick={() => act({ type: 'saveAs' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border-2 border-b-[3px] border-slate-300 dark:border-slate-600 active:border-b-2 active:translate-y-[1px] ${glow(hint === 'saveAs')}`}>
              Save As
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row min-h-[19rem]">
        {/* folder tree */}
        <div className={`sm:w-44 shrink-0 bg-slate-50 dark:bg-slate-800/60 border-b-2 sm:border-b-0 sm:border-r-2 border-slate-200 dark:border-slate-700 p-2 flex sm:flex-col gap-1 overflow-x-auto ${glow(hint === 'tree')}`}>
          {FOLDERS.map((f) => {
            const active = state.cwd === f;
            const Icon = FOLDER_ICON(f, active);
            return (
              <button
                key={f}
                onClick={() => act({ type: 'openFolder', folder: f })}
                onDragOver={(e) => { if (dragging) e.preventDefault(); }}
                onDrop={() => { if (dragging) { act({ type: f === BIN ? 'remove' : 'move', name: dragging, to: f }); setDragging(null); } }}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-left font-bold text-sm whitespace-nowrap transition-colors shrink-0
                  ${active
                    ? 'bg-[#0ea5e9] text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700'}
                  ${glow(hint === `folder:${f}`)}`}>
                <Icon className="w-4 h-4 shrink-0" strokeWidth={2.5} />
                <span className="truncate">{f}</span>
              </button>
            );
          })}
        </div>

        {/* file list */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-slate-100 dark:border-slate-800">
            <span className="font-black text-sm text-slate-700 dark:text-slate-200">{query ? 'Search results' : state.cwd}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {visible.length} item{visible.length === 1 ? '' : 's'}
            </span>
            <div className={`ml-auto flex items-center gap-1.5 rounded-lg border-2 border-slate-200 dark:border-slate-700 px-2 py-1 ${glow(hint === 'search')}`}>
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={3} />
              <input
                value={state.search}
                onChange={(e) => act({ type: 'search', query: e.target.value })}
                placeholder="Search"
                spellCheck={false}
                className="w-20 sm:w-28 bg-transparent text-xs font-bold outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400" />
              {state.search && (
                <button onClick={() => act({ type: 'search', query: '' })} aria-label="clear search">
                  <X className="w-3.5 h-3.5 text-slate-400" strokeWidth={3} />
                </button>
              )}
            </div>
          </div>

          <div className={`flex-1 p-2 space-y-1 overflow-y-auto ${glow(hint === 'list')}`}>
            {visible.length === 0 && (
              <div className="h-full min-h-[8rem] flex items-center justify-center text-slate-400 font-bold text-sm">
                {state.search ? 'Nothing matches that.' : 'This folder is empty.'}
              </div>
            )}
            {visible.map((f) => {
              const Icon = KIND_ICON[f.kind] || FileText;
              const isSel = state.selected === f.name;
              return (
                <div
                  key={f.name}
                  draggable={!disabled && f.folder !== BIN}
                  onDragStart={() => setDragging(f.name)}
                  onDragEnd={() => setDragging(null)}
                  onClick={() => act({ type: 'select', name: f.name })}
                  onContextMenu={(e) => { e.preventDefault(); act({ type: 'select', name: f.name }); setMenuFor(f.name); }}
                  className={`relative flex items-center gap-2.5 px-2.5 py-2 rounded-xl border-2 cursor-pointer transition-colors
                    ${isSel
                      ? 'border-[#0ea5e9] bg-sky-50 dark:bg-sky-950/40'
                      : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'}
                    ${glow(hint === `file:${f.name}`)}`}>
                  <Icon className="w-5 h-5 text-slate-500 shrink-0" strokeWidth={2.5} />
                  {renaming?.name === f.name ? (
                    <input
                      autoFocus
                      value={renaming.value}
                      onChange={(e) => setRenaming({ ...renaming, value: e.target.value })}
                      onBlur={commitRename}
                      onKeyDown={(e) => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenaming(null); }}
                      onClick={(e) => e.stopPropagation()}
                      spellCheck={false}
                      className="flex-1 min-w-0 bg-white dark:bg-slate-900 border-2 border-[#0ea5e9] rounded-lg px-2 py-0.5 text-sm font-bold outline-none text-slate-800 dark:text-slate-100" />
                  ) : (
                    <span className="flex-1 min-w-0 truncate font-bold text-sm text-slate-700 dark:text-slate-200">
                      {f.name}
                      {query && <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">in {f.folder}</span>}
                    </span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); act({ type: 'select', name: f.name }); setMenuFor(menuFor === f.name ? null : f.name); }}
                    aria-label={`actions for ${f.name}`}
                    className="p-1 rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 shrink-0">
                    <MoreVertical className="w-4 h-4" strokeWidth={3} />
                  </button>

                  {menuFor === f.name && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-2 top-full mt-1 z-30 w-44 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl p-1">
                      {f.folder === BIN ? (
                        <MenuItem icon={CornerUpLeft} label="Put it back"
                          onClick={() => { act({ type: 'restore', name: f.name }); setMenuFor(null); }} />
                      ) : (
                        <>
                          <MenuItem icon={Pencil} label="Rename"
                            onClick={() => { setRenaming({ name: f.name, value: f.name }); setMenuFor(null); }} />
                          <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Move to</div>
                          {FOLDERS.filter((x) => x !== BIN && x !== f.folder).map((x) => (
                            <MenuItem key={x} icon={Folder} label={x}
                              onClick={() => { act({ type: 'move', name: f.name, to: x }); setMenuFor(null); }} />
                          ))}
                          <MenuItem icon={Trash2} label="Delete" danger
                            onClick={() => { act({ type: 'remove', name: f.name }); setMenuFor(null); }} />
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* "Replace it?" — a Save As onto a name already in that folder asks first */}
      {state.dialog?.kind === 'saveAs' && state.dialog.replacing && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-sm rounded-2xl border-2 border-amber-300 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
            <div className="px-4 py-2.5 bg-amber-50 dark:bg-amber-950/40 border-b-2 border-amber-200 font-black text-sm text-slate-700 dark:text-slate-200">
              Confirm Save As
            </div>
            <div className="p-4 text-sm font-bold text-slate-700 dark:text-slate-200 leading-snug">
              <b>{state.dialog.replacing}</b> already exists in {state.dialog.folder}. Do you want to replace it?
            </div>
            <div className="flex justify-end gap-2 px-4 pb-4">
              <button onClick={() => act({ type: 'dialogCancel' })}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-white bg-[#0ea5e9] border-b-[3px] border-[#0369a1] ${glow(hint === 'dialogCancel')}`}>
                No
              </button>
              <button onClick={() => act({ type: 'dialogConfirm' })}
                className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-rose-600 bg-white dark:bg-slate-800 border-2 border-rose-300">
                Yes, replace it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save As dialog */}
      {state.dialog?.kind === 'saveAs' && !state.dialog.replacing && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-sm rounded-2xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700 font-black text-sm text-slate-700 dark:text-slate-200">
              Save As
            </div>
            <div className="p-4 space-y-3">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">File name</div>
                <input
                  autoFocus
                  value={state.dialog.name}
                  onChange={(e) => act({ type: 'dialogName', name: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') act({ type: 'dialogConfirm' }); }}
                  placeholder="Type a name"
                  spellCheck={false}
                  className={`w-full rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-[#0ea5e9] ${glow(hint === 'dialogName')}`} />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Save it in</div>
                <div className={`flex flex-wrap gap-1.5 ${glow(hint === 'dialogFolder')}`}>
                  {FOLDERS.filter((f) => f !== BIN).map((f) => (
                    <button
                      key={f}
                      onClick={() => act({ type: 'dialogFolder', folder: f })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black border-2 border-b-[3px]
                        ${state.dialog.folder === f
                          ? 'bg-[#0ea5e9] border-[#0369a1] text-white'
                          : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-4 pb-4">
              <button
                onClick={() => act({ type: 'dialogCancel' })}
                className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border-2 border-b-[3px] border-slate-300 dark:border-slate-600">
                Cancel
              </button>
              <button
                onClick={() => act({ type: 'dialogConfirm' })}
                disabled={!state.dialog.name.trim()}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-white flex items-center gap-1.5
                  ${state.dialog.name.trim()
                    ? 'bg-[#58cc02] border-b-[3px] border-[#3e7500] active:border-b-0 active:translate-y-[3px]'
                    : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'}
                  ${glow(hint === 'dialogSave')}`}>
                <Save className="w-3.5 h-3.5" strokeWidth={3} /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon: Icon, label, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-sm font-bold transition-colors
        ${danger
          ? 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
      <Icon className="w-4 h-4 shrink-0" strokeWidth={2.5} /> {label}
    </button>
  );
}

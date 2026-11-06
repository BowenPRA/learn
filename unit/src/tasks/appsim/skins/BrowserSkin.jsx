import { useEffect, useRef } from 'react';
import {
  ArrowLeft, ArrowRight, RotateCw, Star, Plus, X, Search, Download, FileText, Folder, Globe, ImageOff, Lock,
} from 'lucide-react';
import {
  describe, displayOf, titleOf, linksOf, searchResults, looksLikeAddress, WEB, hasSiteSearch,
} from '../../../utils/appSim/browser';

/* ------------------------------------------------------------------ *
 * BROWSER SKIN — a generic browser on a small fake web
 * (src/utils/appSim/browser.js). Renders `state` and turns every gesture into
 * an ACTION; the only thing it keeps itself is which input has focus.
 *
 * The two boxes are drawn to be CONFUSABLE, on purpose: the address bar at the
 * top of the browser and the "Search this site" box inside the page are the
 * same shape. What tells them apart is where they live and how far they reach,
 * which is the lesson of T7 — so the skin must not make it easy by styling.
 *
 * Responsive DOM like the files skin, not a scaled picture: a browser is text,
 * and text has to stay crisp on a tablet. English only on the browser, the way
 * a real one is; the brief and feedback around it are bilingual.
 *
 * NO KEYBOARD SHORTCUTS beyond Enter. Ctrl+T, Ctrl+W, F5 and Alt+← belong to
 * the REAL browser this app runs in — binding them risks closing or reloading
 * the student's actual tab and losing their work.
 * ------------------------------------------------------------------ */

const glow = (on) => (on ? 'ring-4 ring-amber-300 ring-offset-1 animate-pulse' : '');

export default function BrowserSkin({ state, onAction, hint = null, disabled = false }) {
  const act = (action) => { if (!disabled) onAction(action); };
  const addressRef = useRef(null);

  const tab = state.tabs[state.active];
  const loc = state.closed ? null : tab?.history[tab.at];
  const shown = state.draft !== null && state.draft !== undefined ? state.draft : displayOf(loc);
  const canBack = !!tab && tab.at > 0;
  const canForward = !!tab && tab.at < tab.history.length - 1;
  const starred = state.bookmarks.includes(loc);

  // A new tab puts the cursor in the address bar, as a real one does.
  useEffect(() => {
    if (!disabled && loc === 'newtab' && state.draft === '') addressRef.current?.focus();
  }, [loc, state.draft, disabled, state.active]);

  if (state.closed) {
    return (
      <div className="w-full rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-sky-50 dark:bg-slate-900 min-h-[20rem] flex flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="text-sm font-black text-slate-500">The browser is closed.</div>
        <button type="button" onClick={() => act({ type: 'openBrowser' })}
          className={`flex flex-col items-center gap-1.5 rounded-2xl p-3 hover:bg-white/70 ${glow(hint === 'openBrowser')}`}>
          <span className="w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center"><Globe className="w-8 h-8 text-sky-600" strokeWidth={2.2} /></span>
          <span className="text-xs font-black text-slate-600">Browser</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
      {/* tab strip */}
      <div className="flex items-end gap-1 px-2 pt-2 bg-slate-200 dark:bg-slate-800 overflow-x-auto">
        {state.tabs.map((t, i) => {
          const tl = t.history[t.at];
          const active = i === state.active;
          return (
            <div key={i}
              className={`group flex items-center gap-1.5 min-w-0 max-w-[11rem] pl-3 pr-1 py-1.5 rounded-t-xl text-xs font-bold cursor-pointer
                ${active ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100' : 'bg-slate-300/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-300'}
                ${glow(hint === `tab:${i}`)}`}
              onClick={() => { if (!active) act({ type: 'switchTab', index: i }); }}>
              <Globe className="w-3.5 h-3.5 shrink-0 text-slate-400" strokeWidth={2.6} />
              <span className="truncate">{titleOf(tl)}</span>
              <button type="button" aria-label={`close tab ${i + 1}`}
                onClick={(e) => { e.stopPropagation(); act({ type: 'closeTab', index: i }); }}
                className="ml-1 p-0.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400">
                <X className="w-3 h-3" strokeWidth={3} />
              </button>
            </div>
          );
        })}
        <button type="button" aria-label="new tab" onClick={() => act({ type: 'newTab' })}
          className={`mb-1 ml-0.5 p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 ${glow(hint === 'newtab')}`}>
          <Plus className="w-4 h-4" strokeWidth={3} />
        </button>
      </div>

      {/* toolbar: arrows, the address bar, the star */}
      <div className="flex items-center gap-1.5 px-2 py-2 border-b-2 border-slate-100 dark:border-slate-800">
        <ToolButton label="back" disabled={!canBack} onClick={() => act({ type: 'back' })} glowOn={hint === 'back'}><ArrowLeft className="w-4 h-4" strokeWidth={3} /></ToolButton>
        <ToolButton label="forward" disabled={!canForward} onClick={() => act({ type: 'forward' })} glowOn={hint === 'forward'}><ArrowRight className="w-4 h-4" strokeWidth={3} /></ToolButton>
        <ToolButton label="reload" onClick={() => act({ type: 'reload' })} glowOn={hint === 'reload'}><RotateCw className="w-4 h-4" strokeWidth={3} /></ToolButton>
        <form
          className={`flex-1 min-w-0 flex items-center gap-2 rounded-full border-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-within:border-sky-400 focus-within:bg-white dark:focus-within:bg-slate-900 ${glow(hint === 'address')}`}
          onSubmit={(e) => { e.preventDefault(); act({ type: 'go' }); addressRef.current?.blur(); }}>
          {describe(loc).kind === 'page' ? <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={3} /> : <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={3} />}
          <input
            ref={addressRef}
            aria-label="address bar"
            value={shown}
            onFocus={(e) => e.target.select()}
            onChange={(e) => act({ type: 'typeAddress', text: e.target.value })}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); act({ type: 'go' }); e.currentTarget.blur(); } }}
            placeholder="Type an address, or words to search"
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            className="flex-1 min-w-0 bg-transparent outline-none text-sm font-bold text-slate-700 dark:text-slate-200 placeholder:text-slate-400" />
        </form>
        <ToolButton label={starred ? 'remove bookmark' : 'bookmark this page'} onClick={() => act({ type: 'bookmark' })} glowOn={hint === 'star'}>
          <Star className={`w-4 h-4 ${starred ? 'text-amber-400 fill-amber-400' : ''}`} strokeWidth={2.8} />
        </ToolButton>
      </div>

      {/* bookmarks bar, once there is something on it */}
      {state.bookmarks.length > 0 && (
        <div className={`flex items-center gap-1 px-3 py-1 border-b-2 border-slate-100 dark:border-slate-800 overflow-x-auto ${glow(hint === 'bookmarks')}`}>
          {state.bookmarks.map((b) => (
            <button key={b} type="button" onClick={() => act({ type: 'openBookmark', url: b })}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" strokeWidth={2.6} /> {WEB[b]?.title || b}
            </button>
          ))}
        </div>
      )}

      {/* the page */}
      <div key={`${state.active}:${state.loads}`} className={`min-h-[17rem] animate-in fade-in duration-300 ${glow(hint === 'page')}`}>
        <Page loc={loc} state={state} act={act} hint={hint} />
      </div>

      {/* the download bar */}
      {state.bar && (
        <div className="flex flex-wrap items-center gap-2 px-3 py-2 border-t-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <span className="flex items-center gap-2 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-2.5 py-1 text-xs font-black text-slate-700 dark:text-slate-200">
            <FileText className="w-4 h-4 text-rose-500" strokeWidth={2.6} /> {state.bar}
          </span>
          <button type="button" onClick={() => act({ type: 'showInFolder' })}
            className={`px-3 py-1 rounded-lg text-xs font-black text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/40 ${glow(hint === 'showInFolder')}`}>
            Show in folder
          </button>
          <button type="button" onClick={() => act({ type: 'allDownloads' })}
            className="px-3 py-1 rounded-lg text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
            All downloads
          </button>
        </div>
      )}

      {/* the Downloads folder, opened by Show in folder */}
      {state.folder && (
        <div className="absolute inset-0 z-30 bg-slate-900/40 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700">
              <Folder className="w-4 h-4 text-amber-500" strokeWidth={2.6} />
              <span className="font-black text-sm text-slate-700 dark:text-slate-200">Downloads</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{state.downloads.length} item{state.downloads.length === 1 ? '' : 's'}</span>
              <button type="button" aria-label="close folder" onClick={() => act({ type: 'closeFolder' })} className="ml-auto p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500">
                <X className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
            <div className="p-2 space-y-1">
              {state.downloads.map((f) => (
                <div key={f} className={`flex items-center gap-2 px-2.5 py-2 rounded-xl border-2 text-sm font-bold ${f === state.bar ? 'border-[#0ea5e9] bg-sky-50 dark:bg-sky-950/40 text-slate-800 dark:text-slate-100' : 'border-transparent text-slate-600 dark:text-slate-300'}`}>
                  <FileText className="w-4 h-4 text-rose-500" strokeWidth={2.6} /> {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolButton({ label, onClick, disabled = false, glowOn = false, children }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} disabled={disabled}
      className={`p-1.5 rounded-lg shrink-0 ${disabled ? 'text-slate-300 dark:text-slate-600' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'} ${glow(glowOn)}`}>
      {children}
    </button>
  );
}

/** The inside of the window — whatever the location is. */
function Page({ loc, state, act, hint }) {
  const d = describe(loc);

  if (d.kind === 'newtab') {
    return (
      <div className="h-[17rem] flex flex-col items-center justify-center gap-2 text-center p-6">
        <Globe className="w-10 h-10 text-slate-300" strokeWidth={2} />
        <div className="text-sm font-black text-slate-500">New tab</div>
        <div className="text-xs font-bold text-slate-400">Type an address in the bar at the top — or words to search.</div>
      </div>
    );
  }

  if (d.kind === 'notfound') {
    return (
      <div className="p-6 space-y-2">
        <div className="text-lg font-black text-slate-700 dark:text-slate-200">Hmm. We can’t find this site.</div>
        <div className="text-sm font-bold text-slate-500">There is no website at <span className="font-mono text-slate-700 dark:text-slate-200">{d.typed}</span>.</div>
        <div className="text-sm font-bold text-slate-500">Check the address for spelling mistakes — one wrong letter is a different address.</div>
      </div>
    );
  }

  if (d.kind === 'downloads') {
    return (
      <div className="p-5">
        <div className="text-lg font-black text-slate-700 dark:text-slate-200 mb-2">Downloads</div>
        {state.downloads.length === 0 && <div className="text-sm font-bold text-slate-400">Nothing downloaded yet.</div>}
        {state.downloads.map((f) => (
          <div key={f} className="flex items-center gap-2 py-1.5 text-sm font-bold text-slate-600 dark:text-slate-300">
            <FileText className="w-4 h-4 text-rose-500" strokeWidth={2.6} /> {f}
          </div>
        ))}
      </div>
    );
  }

  if (d.kind === 'search') {
    const results = linksOf(loc);
    return (
      <div className="p-5 space-y-3">
        <div className="text-xs font-black uppercase tracking-widest text-slate-400">Search results for “{d.query}”</div>
        {results.length === 0 && <div className="text-sm font-bold text-slate-500">No results. Try different words.</div>}
        {results.map((addr) => (
          <div key={addr}>
            <button type="button" onClick={() => act({ type: 'clickLink', to: addr })}
              className={`text-left text-base font-black text-[#1a56db] underline underline-offset-2 hover:text-[#1e40af] ${glow(hint === `link:${addr}`)}`}>
              {WEB[addr].title}
            </button>
            <div className="text-xs font-bold text-emerald-700">{addr}</div>
            <div className="text-xs font-bold text-slate-500">{WEB[addr].body[0]}</div>
          </div>
        ))}
      </div>
    );
  }

  if (d.kind === 'siteSearch' || d.kind === 'page') {
    const page = d.page;
    return (
      <div>
        <div className="flex items-center gap-2 px-5 py-2.5 text-white font-black text-sm" style={{ background: page.color }}>
          <span className="w-6 h-6 rounded-md bg-white/25 flex items-center justify-center text-xs">{page.site[0]}</span>
          {page.site}
        </div>
        <div className="p-5 space-y-3">
          {hasSiteSearch(loc) && <SiteSearch state={state} act={act} hint={hint} site={page.site} />}
          {d.kind === 'siteSearch'
            ? <SiteResults loc={loc} d={d} act={act} hint={hint} />
            : <PageBody page={page} state={state} act={act} hint={hint} />}
        </div>
      </div>
    );
  }

  return <div className="p-6 text-sm font-bold text-slate-400">This page cannot be shown.</div>;
}

/** The page's OWN search box — the same shape as the address bar, on purpose. */
function SiteSearch({ state, act, hint, site }) {
  return (
    <form
      className={`flex items-center gap-2 rounded-full border-2 px-3 py-1.5 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 ${glow(hint === 'siteSearch')}`}
      onSubmit={(e) => { e.preventDefault(); act({ type: 'siteSearch' }); }}>
      <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={3} />
      <input
        aria-label={`search ${site}`}
        value={state.siteQuery}
        onChange={(e) => act({ type: 'typeSiteSearch', text: e.target.value })}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); act({ type: 'siteSearch' }); } }}
        placeholder="Search this site"
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        className="flex-1 min-w-0 bg-transparent outline-none text-sm font-bold text-slate-700 dark:text-slate-200 placeholder:text-slate-400" />
      <button type="submit" className="px-3 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-black text-slate-700 dark:text-slate-200">Search</button>
    </form>
  );
}

function SiteResults({ loc, d, act, hint }) {
  const results = linksOf(loc);
  const address = looksLikeAddress(d.query);
  return (
    <div className="space-y-2">
      <div className="text-xs font-black uppercase tracking-widest text-slate-400">Results on {d.page.site} for “{d.query}”</div>
      {results.length === 0 && (
        <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 p-3 text-sm font-bold text-slate-600 dark:text-slate-300">
          No results.{' '}
          {address
            ? <>This box only searches <b>{d.page.site}</b>. To go to a different website, type its address in the address bar at the very top.</>
            : <>Nothing on {d.page.site} matches those words.</>}
        </div>
      )}
      {results.map((addr) => (
        <div key={addr}>
          <button type="button" onClick={() => act({ type: 'clickLink', to: addr })}
            className={`text-left text-base font-black text-[#1a56db] underline underline-offset-2 hover:text-[#1e40af] ${glow(hint === `link:${addr}`)}`}>
            {WEB[addr].title}
          </button>
          <div className="text-xs font-bold text-slate-500">{WEB[addr].body[0]}</div>
        </div>
      ))}
      {!address && searchResults(d.query).length > results.length && (
        <div className="text-[11px] font-bold text-slate-400">Only pages on {d.page.site} are searched here.</div>
      )}
    </div>
  );
}

function PageBody({ page, state, act, hint }) {
  if (state.broken) {
    return (
      <div className="space-y-3">
        <div className="text-xl font-black text-slate-800 dark:text-slate-100">{page.heading}</div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((k) => (
            <div key={k} className="h-16 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-300">
              <ImageOff className="w-5 h-5" strokeWidth={2.4} />
            </div>
          ))}
        </div>
        <div className="text-sm font-bold text-slate-400">Some of this page did not load.</div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <div className="text-xl font-black text-slate-800 dark:text-slate-100">{page.heading}</div>
      {page.body.map((line) => <p key={line} className="text-sm font-bold text-slate-600 dark:text-slate-300">{line}</p>)}
      {page.links.length > 0 && (
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {page.links.map((l) => (
            <button key={l.to} type="button" onClick={() => act({ type: 'clickLink', to: l.to })}
              className={`text-sm font-black text-[#1a56db] underline underline-offset-2 hover:text-[#1e40af] ${glow(hint === `link:${l.to}`)}`}>
              {l.label}
            </button>
          ))}
        </div>
      )}
      {(page.downloads || []).map((x) => (
        <button key={x.file} type="button" onClick={() => act({ type: 'download', file: x.file })}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black text-white bg-[#1a56db] border-b-[3px] border-[#1e3a8a] active:border-b-0 active:translate-y-[3px] ${glow(hint === `download:${x.file}`)}`}>
          <Download className="w-4 h-4" strokeWidth={3} /> {x.label}
        </button>
      ))}
    </div>
  );
}

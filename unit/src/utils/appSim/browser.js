// src/utils/appSim/browser.js
//
// The `browser` skin of the simulator, and the small fake web it browses — the
// job at the centre of T7 · Inside a Browser (docs/primary-tech/UPGRADE-PLAN.md
// §3.1). PURE, NO REACT: the skin renders it and the validator replays it.
//
// The web lives HERE, not in unit data, so the deck's demo, the Try It job and
// the validator all see exactly the same pages, and an item cannot quietly
// point at a page that does not exist.
//
// The rules that make it teach, each one true of a real browser:
//
//   · ADDRESSES ARE EXACT. One wrong letter is a different website — here, the
//     "can't find this site" page — and the browser never guesses.
//   · THE ADDRESS BAR AND A PAGE'S SEARCH BOX ARE DIFFERENT THINGS. The address
//     bar goes anywhere; words typed into it go to the search engine. A page's
//     own box searches that one site and nothing else, so an address typed into
//     it finds "No results" — and never changes where you are (`url`). That is
//     the confusion this unit exists to fix, and the goal can see it.
//   · A download is a real file in the Downloads folder. Closing the browser
//     does not touch it.
//   · Closing the last tab closes the browser.

/** Every page on the fake web, by address. */
export const WEB = {
  'www.schoolsite.org': {
    site: 'Riverside School', color: '#0ea5e9',
    title: 'Riverside School',
    heading: 'Welcome to Riverside School',
    body: ['Sports Day is on Friday. Bring a hat and a water bottle.', 'The library is open every lunchtime.'],
    links: [
      { label: 'Library', to: 'www.schoolsite.org/library' },
      { label: 'Homework', to: 'www.schoolsite.org/homework' },
      { label: 'News', to: 'www.schoolsite.org/news' },
    ],
    search: true,
    keywords: ['school', 'riverside', 'sports', 'welcome'],
  },
  'www.schoolsite.org/library': {
    site: 'Riverside School', color: '#0ea5e9',
    title: 'School Library',
    heading: 'School Library',
    body: ['Every class has a reading list for this term.', 'Books go back on Fridays.'],
    links: [{ label: 'Back to the school home page', to: 'www.schoolsite.org' }],
    downloads: [{ label: 'Download the reading list', file: 'reading-list.pdf' }],
    search: true,
    keywords: ['library', 'books', 'reading', 'list'],
  },
  'www.schoolsite.org/homework': {
    site: 'Riverside School', color: '#0ea5e9',
    title: 'Homework',
    heading: 'This week’s homework',
    body: ['Maths: the times-table sheet. Hand it in on Monday.'],
    links: [{ label: 'Back to the school home page', to: 'www.schoolsite.org' }],
    downloads: [{ label: 'Download the maths sheet', file: 'maths-sheet.pdf' }],
    search: true,
    keywords: ['homework', 'maths', 'sheet', 'times'],
  },
  'www.schoolsite.org/news': {
    site: 'Riverside School', color: '#0ea5e9',
    title: 'School News',
    heading: 'Sports Day is on Friday',
    body: ['Every class will run, jump and throw. Parents are welcome.'],
    links: [{ label: 'Back to the school home page', to: 'www.schoolsite.org' }],
    search: true,
    keywords: ['news', 'sports', 'day', 'friday'],
  },
  'www.citylibrary.org': {
    site: 'City Library', color: '#16a34a',
    title: 'City Library',
    heading: 'City Library',
    body: ['Open every day from 9:00 to 17:00.', 'Borrow up to six books at a time.'],
    links: [{ label: 'Kids’ books', to: 'www.citylibrary.org/kids' }],
    search: true,
    keywords: ['library', 'city', 'books', 'opening', 'times', 'borrow'],
  },
  'www.citylibrary.org/kids': {
    site: 'City Library', color: '#16a34a',
    title: 'Kids’ Books',
    heading: 'Kids’ Books',
    body: ['New this month: stories about space, dragons and football.'],
    links: [{ label: 'Back to City Library', to: 'www.citylibrary.org' }],
    downloads: [{ label: 'Download the summer reading list', file: 'summer-reading.pdf' }],
    search: true,
    keywords: ['kids', 'books', 'stories', 'summer', 'reading'],
  },
  'www.weathernow.org': {
    site: 'Weather Now', color: '#f59e0b',
    title: 'Weather Now',
    heading: 'Today: sunny, 31°',
    body: ['Tomorrow: rain in the afternoon. Take an umbrella.'],
    links: [],
    keywords: ['weather', 'rain', 'sunny', 'today', 'tomorrow'],
  },
  'www.kidsmaths.org': {
    site: 'Kids Maths', color: '#a855f7',
    title: 'Kids Maths',
    heading: 'Times-table games',
    body: ['Pick a table and beat your best time.'],
    links: [],
    keywords: ['maths', 'times', 'table', 'games'],
  },
};

export const ACTIONS = [
  'typeAddress', 'go', 'typeSiteSearch', 'siteSearch', 'clickLink',
  'back', 'forward', 'reload', 'newTab', 'switchTab', 'closeTab', 'openBrowser',
  'bookmark', 'openBookmark', 'download', 'showInFolder', 'allDownloads', 'closeFolder',
];

/** Actions that carry what is typed so far; consecutive ones are one move. */
export const TEXT_ACTIONS = ['typeAddress', 'typeSiteSearch'];

/** The host part of an address: `www.schoolsite.org/library` → `www.schoolsite.org`. */
export const hostOf = (addr = '') => String(addr).split('/')[0];

/**
 * What a location IS. Locations are strings so goals can compare them:
 *   a web address · `newtab` · `downloads` · `search:<words>` (the address
 *   bar's search engine) · `<host>/search:<words>` (a site's own box) ·
 *   `notfound:<typed>`.
 */
export function describe(loc) {
  const s = String(loc || '');
  if (WEB[s]) return { kind: 'page', page: WEB[s], host: hostOf(s) };
  if (s === 'newtab') return { kind: 'newtab' };
  if (s === 'downloads') return { kind: 'downloads' };
  if (s.startsWith('search:')) return { kind: 'search', query: s.slice(7) };
  if (s.startsWith('notfound:')) return { kind: 'notfound', typed: s.slice(9) };
  const m = /^([^/]+)\/search:(.*)$/.exec(s);
  if (m && WEB[m[1]]) return { kind: 'siteSearch', host: m[1], query: m[2], page: WEB[m[1]] };
  return { kind: 'unknown' };
}

/** Is this string an address (one "word" with a dot and an ending), or words to search? */
export const looksLikeAddress = (text) => {
  const t = String(text || '').trim().toLowerCase().replace(/^https?:\/\//, '');
  return !/\s/.test(t) && /^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}(\/\S*)?$/.test(t);
};

/**
 * Where typing `text` into the ADDRESS BAR and pressing Enter goes. Trimmed,
 * lower-cased, `https://` and a trailing slash dropped, a missing `www.` added
 * when that is the page that exists — the forgiveness a real browser has.
 * Anything else about an address must be exactly right.
 */
export function resolveTyped(text) {
  const raw = String(text || '').trim();
  if (!raw) return null;
  if (!looksLikeAddress(raw)) return `search:${raw}`;
  const t = raw.toLowerCase().replace(/^https?:\/\//, '').replace(/\/+$/, '');
  if (WEB[t]) return t;
  if (!t.startsWith('www.') && WEB[`www.${t}`]) return `www.${t}`;
  return `notfound:${t}`;
}

const words = (q) => String(q || '').toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 1);

/** Pages the search engine returns for some words: any keyword or title word matches. */
export function searchResults(query, host = null) {
  const ws = words(query);
  if (!ws.length) return [];
  return Object.entries(WEB)
    .filter(([addr]) => !host || hostOf(addr) === host)
    .filter(([, p]) => {
      const hay = new Set([...p.keywords, ...words(p.title), ...words(p.heading)]);
      return ws.some((w) => hay.has(w));
    })
    .map(([addr]) => addr);
}

/** The links a location offers, as locations — a link is only followable if it is ON the page. */
export function linksOf(loc) {
  const d = describe(loc);
  if (d.kind === 'page') return d.page.links.map((l) => l.to);
  if (d.kind === 'search') return searchResults(d.query);
  if (d.kind === 'siteSearch') return looksLikeAddress(d.query) ? [] : searchResults(d.query, d.host);
  return [];
}

/** Does this location have its OWN search box (a site's box, not the address bar)? */
export const hasSiteSearch = (loc) => {
  const d = describe(loc);
  return (d.kind === 'page' && !!d.page.search) || d.kind === 'siteSearch';
};

/** A tab written in unit data: a location string, or `{ history, at? }`. */
function tabOf(t) {
  if (typeof t === 'string') return { history: [t], at: 0 };
  const history = Array.isArray(t?.history) && t.history.length ? [...t.history] : ['newtab'];
  const at = Number.isInteger(t?.at) ? Math.max(0, Math.min(t.at, history.length - 1)) : history.length - 1;
  return { history, at };
}

export function initial(item) {
  const i = item?.initial || {};
  const tabs = (i.tabs && i.tabs.length ? i.tabs : ['www.schoolsite.org']).map(tabOf);
  const active = Number.isInteger(i.active) ? Math.max(0, Math.min(i.active, tabs.length - 1)) : 0;
  return {
    skin: 'browser',
    closed: false,
    tabs,
    active,
    draft: null,
    siteQuery: '',
    bookmarks: [...(i.bookmarks || [])],
    downloads: [...(i.downloads || [])],
    bar: null,
    folder: false,
    shown: false,
    broken: !!i.broken,
    // Page loads so far. A reload changes nothing else a goal could read, but it
    // is still a real event: the skin keys its fade-in on this, and a demo step
    // that reloads is not "a step the engine ignored".
    loads: 0,
    searches: [],
    siteSearches: [],
  };
}

const current = (s) => (s.closed ? null : s.tabs[s.active]?.history[s.tabs[s.active].at] ?? null);

/** Go somewhere in the active tab: history after this point is dropped, as in a real browser. */
function navigate(s, loc) {
  const tab = s.tabs[s.active];
  if (!tab) return s;
  const history = [...tab.history.slice(0, tab.at + 1), loc];
  const tabs = s.tabs.map((t, i) => (i === s.active ? { history, at: history.length - 1 } : t));
  return { ...s, tabs, draft: null, siteQuery: '', broken: false, loads: s.loads + 1 };
}

function step(s, by) {
  const tab = s.tabs[s.active];
  if (!tab) return s;
  const at = tab.at + by;
  if (at < 0 || at >= tab.history.length) return s;
  const tabs = s.tabs.map((t, i) => (i === s.active ? { ...t, at } : t));
  return { ...s, tabs, draft: null, siteQuery: '', broken: false, loads: s.loads + 1 };
}

export function apply(s, a) {
  if (s.closed && a.type !== 'openBrowser') return s;
  const here = current(s);
  switch (a.type) {
    case 'typeAddress':
      return { ...s, draft: String(a.text ?? '') };

    case 'go': {
      if (s.draft == null) return s;
      const loc = resolveTyped(s.draft);
      if (!loc) return { ...s, draft: null };
      const next = navigate(s, loc);
      return loc.startsWith('search:') ? { ...next, searches: [...s.searches, loc.slice(7)] } : next;
    }

    case 'typeSiteSearch':
      return hasSiteSearch(here) ? { ...s, siteQuery: String(a.text ?? '') } : s;

    case 'siteSearch': {
      const q = s.siteQuery.trim();
      if (!hasSiteSearch(here) || !q) return s;
      const d = describe(here);
      const next = navigate(s, `${d.host}/search:${q}`);
      return { ...next, siteSearches: [...s.siteSearches, q] };
    }

    case 'clickLink':
      return linksOf(here).includes(a.to) ? navigate(s, a.to) : s;

    case 'back':
      return step(s, -1);

    case 'forward':
      return step(s, 1);

    case 'reload':
      return { ...s, broken: false, draft: null, loads: s.loads + 1 };

    case 'newTab':
      return { ...s, tabs: [...s.tabs, { history: ['newtab'], at: 0 }], active: s.tabs.length, draft: '', siteQuery: '', broken: false };

    case 'switchTab':
      return Number.isInteger(a.index) && s.tabs[a.index] && a.index !== s.active
        ? { ...s, active: a.index, draft: null, siteQuery: '', broken: false }
        : s;

    case 'closeTab': {
      if (!Number.isInteger(a.index) || !s.tabs[a.index]) return s;
      const tabs = s.tabs.filter((_, i) => i !== a.index);
      // The last tab takes the whole browser with it.
      if (!tabs.length) return { ...s, tabs: [], active: 0, closed: true, draft: null, siteQuery: '', bar: null, folder: false, broken: false };
      let active = s.active;
      if (a.index < s.active) active -= 1;
      else if (a.index === s.active) active = Math.min(s.active, tabs.length - 1);
      const changed = a.index === s.active;
      return { ...s, tabs, active, ...(changed ? { draft: null, siteQuery: '', broken: false } : {}) };
    }

    case 'openBrowser':
      return s.closed ? { ...s, closed: false, tabs: [{ history: ['newtab'], at: 0 }], active: 0, draft: '' } : s;

    case 'bookmark':
      if (!WEB[here]) return s;
      return {
        ...s,
        bookmarks: s.bookmarks.includes(here) ? s.bookmarks.filter((b) => b !== here) : [...s.bookmarks, here],
      };

    case 'openBookmark':
      return s.bookmarks.includes(a.url) ? navigate(s, a.url) : s;

    case 'download': {
      const d = describe(here);
      const offered = d.kind === 'page' && (d.page.downloads || []).some((x) => x.file === a.file);
      if (!offered || s.broken) return s;
      return {
        ...s,
        downloads: s.downloads.includes(a.file) ? s.downloads : [...s.downloads, a.file],
        bar: a.file,
      };
    }

    case 'showInFolder':
      return s.bar ? { ...s, folder: true, shown: true } : s;

    case 'allDownloads':
      return s.bar
        ? { ...s, tabs: [...s.tabs, { history: ['downloads'], at: 0 }], active: s.tabs.length, draft: null, siteQuery: '', broken: false }
        : s;

    case 'closeFolder':
      return s.folder ? { ...s, folder: false } : s;

    default:
      return s;
  }
}

/** A location as a person reads it in the address bar. */
export function displayOf(loc) {
  const d = describe(loc);
  if (d.kind === 'page') return loc;
  if (d.kind === 'search') return `search.example/?q=${d.query}`;
  if (d.kind === 'siteSearch') return `${d.host}/search?q=${d.query}`;
  if (d.kind === 'notfound') return d.typed;
  if (d.kind === 'downloads') return 'Downloads';
  return '';
}

/** The page title shown on a tab. */
export function titleOf(loc) {
  const d = describe(loc);
  if (d.kind === 'page') return d.page.title;
  if (d.kind === 'search') return `${d.query} - Search`;
  if (d.kind === 'siteSearch') return `Search: ${d.query}`;
  if (d.kind === 'notfound') return 'Can’t find this site';
  if (d.kind === 'downloads') return 'Downloads';
  return 'New tab';
}

export function view(s) {
  const url = current(s);
  const d = describe(url);
  return {
    ...s,
    url,
    site: d.host || null,
    title: url ? titleOf(url) : null,
    urls: s.tabs.map((t) => t.history[t.at]),
    tabCount: s.tabs.length,
    history: s.tabs[s.active]?.history || [],
    at: { Downloads: s.downloads },
    shownInFolder: s.shown,
  };
}

export function regionFor(path = '', s = null) {
  if (s?.closed) return 'openBrowser';
  if (path === 'url' || path === 'site' || path === 'title' || path === 'searches') return 'address';
  if (path === 'tabCount' || path === 'urls') return 'newtab';
  if (path === 'bookmarks') return 'star';
  if (path === 'shownInFolder') return 'showInFolder';
  if (path === 'broken') return 'reload';
  if (path === 'siteSearches') return 'siteSearch';
  if (path === 'history') return 'back';
  return 'page';
}

const KNOWN = (loc) => describe(loc).kind !== 'unknown';

export function checkInitial(item) {
  const id = item?.id || '(no id)';
  const i = item?.initial || {};
  const out = [];
  const tabs = i.tabs || [];
  if (i.tabs !== undefined && !tabs.length) out.push(`${id}: tabs is empty — a browser opens with at least one tab`);
  for (const t of tabs) {
    for (const loc of typeof t === 'string' ? [t] : (t?.history || [])) {
      if (!KNOWN(loc)) out.push(`${id}: tab location "${loc}" is not a page on the fake web (UPGRADE-PLAN §3.1)`);
    }
  }
  if (i.active !== undefined && !(Number.isInteger(i.active) && i.active >= 0 && i.active < (tabs.length || 1))) out.push(`${id}: active ${i.active} is not a tab`);
  for (const b of i.bookmarks || []) if (!WEB[b]) out.push(`${id}: bookmark "${b}" is not a page`);
  return out;
}

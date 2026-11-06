// Single source of truth for public/ asset URLs.
//
// Vocabulary like "Acute Angle" generates files named "word_acute angle.mp3".
// The space is legal on disk but must be percent-encoded in a URL, so every
// filename goes through encodeURIComponent — never interpolate one directly.

/** Base path with no trailing slash. '' at the domain root, '/Dashboard' on gh-pages. */
export const basePath = (() => {
  const raw = import.meta.env.BASE_URL || '/';
  return raw === '/' ? '' : raw.replace(/\/$/, '');
})();

/**
 * URL for a public/ asset given a path that may or may not start with a slash.
 * Idempotent: a path that already carries the base (a Vite `import`ed image, or
 * a note that was mapped once already) is returned untouched rather than
 * becoming `/Dashboard//Dashboard/...`.
 */
export const assetUrl = (p) => {
  if (!p) return p;
  const s = String(p);
  if (/^(https?:)?\/\//.test(s) || s.startsWith('data:')) return s;
  if (basePath && (s === basePath || s.startsWith(`${basePath}/`))) return s;
  return `${basePath}/${s.replace(/^\/+/, '')}`;
};

/**
 * URL for a vocabulary audio clip.
 * @param {'word'|'def'|'sentence'|'dictation'} kind
 */
export const audioUrl = (track, unitId, kind, word) =>
  `${basePath}/audio/${track}/${unitId}/${encodeURIComponent(`${kind}_${String(word).toLowerCase()}.mp3`)}`;

/**
 * URL for a unit's source image — the chart, map, cartoon, document or
 * photograph a Source Analysis item is about.
 *
 * Mirrors the audio convention: public/images/<TRACK>/<UNIT>/<file>. Diagrams
 * used to build this itself as `images/<unitId>/<file>`, a folder that exists
 * for no unit in the repo, so every `imageFile:` reference 404'd inside the one
 * task whose whole point is looking at the picture.
 */
export const unitImageUrl = (track, unitId, file) =>
  `${basePath}/images/${track}/${unitId}/${encodeURIComponent(String(file).replace(/^.*[\\/]/, ''))}`;

/** URL for a reading-passage audio clip (1-indexed). */
export const passageAudioUrl = (track, unitId, index) =>
  `${basePath}/audio/${track}/${unitId}/${encodeURIComponent(`passage_${unitId}_${index}.mp3`)}`;

/**
 * URL for a lesson slide's narration, keyed by the slide's 1-indexed position.
 *
 * This is the single source of truth for slide audio. generate_all_audio.py
 * names every slide's file slide_<unitId>_<position>.mp3 (position counts ALL
 * slides, intro first), so deriving the path from position here keeps the app
 * and the generator in lockstep. Never hardcode slide audio in notes.js — a
 * hand-typed number drifts out of sync the moment a slide is added or removed,
 * which is exactly how the intro fell silent and every slide played the previous
 * slide's narration.
 */
export const slideAudioUrl = (track, unitId, position) =>
  `${basePath}/audio/${track}/${unitId}/slide_${unitId}_${position}.mp3`;

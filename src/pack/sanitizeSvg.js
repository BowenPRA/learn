// Inline SVG from a lesson pack is drawn with innerHTML, so it is cleaned first:
// only drawing elements and attributes survive. No <script>, <foreignObject>,
// <style> blocks, event handlers, or links outside the drawing itself. Packs are
// written by the operator and staff, never by students, but a mistake must still
// not be able to run code in a child's browser.

const ELEMENTS = new Set([
  'svg', 'g', 'defs', 'symbol', 'use', 'title', 'desc', 'marker', 'clippath', 'mask', 'pattern',
  'lineargradient', 'radialgradient', 'stop', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline',
  'polygon', 'text', 'tspan', 'textpath',
])
const ATTRS = new Set([
  'xmlns', 'viewbox', 'width', 'height', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'rx', 'ry',
  'd', 'points', 'fill', 'fill-opacity', 'fill-rule', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin',
  'stroke-dasharray', 'stroke-dashoffset', 'stroke-opacity', 'stroke-miterlimit', 'opacity', 'transform',
  'font-family', 'font-size', 'font-weight', 'font-style', 'text-anchor', 'dominant-baseline', 'alignment-baseline',
  'letter-spacing', 'dx', 'dy', 'id', 'class', 'role', 'aria-label', 'aria-hidden', 'preserveaspectratio',
  'marker-end', 'marker-start', 'marker-mid', 'markerwidth', 'markerheight', 'markerunits', 'refx', 'refy', 'orient',
  'offset', 'stop-color', 'stop-opacity', 'gradientunits', 'gradienttransform', 'patternunits', 'clip-path', 'clip-rule',
  'mask', 'href', 'xlink:href', 'startoffset', 'paint-order', 'vector-effect', 'textlength', 'lengthadjust',
])
const URL_ATTRS = new Set(['href', 'xlink:href'])
const cache = new Map()

/** A cleaned copy of an SVG string, or '' if it is not an SVG. */
export function sanitizeSvg(svg) {
  if (typeof svg !== 'string' || !/^\s*<svg[\s>]/i.test(svg)) return ''
  if (cache.has(svg)) return cache.get(svg)
  if (typeof DOMParser === 'undefined') return ''
  const doc = new DOMParser().parseFromString(svg, 'image/svg+xml')
  const root = doc.documentElement
  if (!root || root.nodeName.toLowerCase() !== 'svg' || doc.getElementsByTagName('parsererror').length) { cache.set(svg, ''); return '' }
  const walk = (el) => {
    for (const child of [...el.children]) {
      if (!ELEMENTS.has(child.nodeName.toLowerCase())) { child.remove(); continue }
      walk(child)
    }
    for (const a of [...el.attributes]) {
      const name = a.name.toLowerCase()
      const value = a.value.trim()
      const bad = !ATTRS.has(name)
        || (URL_ATTRS.has(name) && !value.startsWith('#'))
        || /url\(\s*['"]?\s*(?!#)/i.test(value)
        || /javascript:|data:/i.test(value)
      if (bad) el.removeAttribute(a.name)
    }
  }
  walk(root)
  const out = new XMLSerializer().serializeToString(root)
  cache.set(svg, out)
  return out
}

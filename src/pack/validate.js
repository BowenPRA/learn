// Checks a lesson pack before it is published (scripts/check-pack.mjs) and before
// the portal draws it. Errors stop a pack; warnings are worth a look.
// The practice parts are checked with the step engine's own authoring rules.
import { checkStepPractice } from '../stepPractice/check.js'
import { FORMAT } from './model.js'

export const LAYOUTS = ['hero', 'statement', 'split', 'showcase', 'compare', 'stack', 'steps', 'callout', 'gallery']
const MAX_BYTES = 1500000
const SLUG_RE = /^[a-z0-9][a-z0-9-]{2,79}$/
const CLASS_RE = /^[a-z_]+:[A-Za-z0-9 ]+$/
const PART_RE = /^[A-Za-z0-9_-]{1,40}$/
const RISKY_SVG = /<script|<foreignObject|\son[a-z]+\s*=|javascript:/i

function strings(obj, out = []) {
  if (typeof obj === 'string') out.push(obj)
  else if (Array.isArray(obj)) obj.forEach((x) => strings(x, out))
  else if (obj && typeof obj === 'object') Object.values(obj).forEach((x) => strings(x, out))
  return out
}

function checkReview(part, at, vn, assets, errors, warnings) {
  const slides = Array.isArray(part.slides) ? part.slides : []
  if (!slides.length) errors.push(`${at}: no slides`)
  const checkIds = new Set()
  slides.forEach((s, i) => {
    const sat = `${at} slide ${i + 1}`
    if (!LAYOUTS.includes(s?.layout)) errors.push(`${sat}: layout must be one of ${LAYOUTS.join(', ')}`)
    if (s?.widget) errors.push(`${sat}: a widget cannot be published; replace it with an image or a check`)
    for (const k of ['inlineSvg', 'inlineSvgVn']) {
      if (s?.[k] != null && !/^\s*<svg[\s>]/i.test(s[k])) errors.push(`${sat}: ${k} must start with <svg`)
      if (s?.[k] && RISKY_SVG.test(s[k])) warnings.push(`${sat}: ${k} has script or event parts; they will be removed`)
    }
    const nested = [...(Array.isArray(s?.items) ? s.items : []), ...(Array.isArray(s?.columns) ? s.columns : [])]
    const images = [s?.image, ...nested.map((x) => x?.image)].filter(Boolean)
    for (const img of images) {
      if (typeof img !== 'string' || !img.startsWith('asset:')) errors.push(`${sat}: an image must be "asset:<file>" (uploaded with the pack)`)
      else if (!assets[img.slice(6)]) errors.push(`${sat}: ${img} is not listed in assets`)
      else if (!assets[img.slice(6)].alt) errors.push(`${sat}: ${img} needs alt text in assets`)
    }
    const c = s?.check
    if (!c) return
    if (!c.id || checkIds.has(c.id)) errors.push(`${sat}: check id missing or repeated`)
    checkIds.add(c.id)
    if (!c.q) errors.push(`${sat}: check needs q`)
    if (vn && c.q && !c.qVn) warnings.push(`${sat}: check q has no qVn`)
    const opts = Array.isArray(c.options) ? c.options : []
    if (opts.length < 2 || opts.some((o) => !o?.val || o.text == null)) errors.push(`${sat}: check needs 2 or more options, each with val and text`)
    if (!opts.some((o) => o?.val === c.correct)) errors.push(`${sat}: check's correct answer is not one of its options`)
    if (new Set(opts.map((o) => o?.val)).size !== opts.length) errors.push(`${sat}: check option vals repeated`)
    if (!(c.exp || c.expEn)) warnings.push(`${sat}: check has no explanation (exp)`)
  })
  if (checkIds.size < 3) warnings.push(`${at}: only ${checkIds.size} check question(s); a review should ask at least 3`)
}

function checkPractice(part, at, vn, errors, warnings) {
  const set = part.set
  if (!set || typeof set !== 'object') { errors.push(`${at}: needs a set (the step-practice schema)`); return }
  for (const it of set.items || []) {
    for (const k of ['inlineSvg', 'inlineSvgVn']) if (it?.[k] && typeof it[k] !== 'string') errors.push(`${at} item ${it.id}: ${k} must be an SVG string, not code`)
    if (it?.image && (typeof it.image !== 'string' || !it.image.startsWith('asset:'))) errors.push(`${at} item ${it.id}: an image must be "asset:<file>"`)
  }
  for (const msg of checkStepPractice({ title: part.title || set.title, titleVn: part.titleVn || set.titleVn, ...set }, { vn })) {
    if (msg.startsWith('warning:')) warnings.push(`${at}: ${msg.slice(8).trim()}`)
    else errors.push(`${at}: ${msg}`)
  }
}

export function validatePack(pack) {
  const errors = []
  const warnings = []
  if (!pack || typeof pack !== 'object') return { errors: ['the pack is not an object'], warnings }
  if (pack.format !== FORMAT) errors.push(`format must be "${FORMAT}"`)
  if (!SLUG_RE.test(pack.slug || '')) errors.push('slug: lower case letters, digits and hyphens, 3 to 80 long')
  if (!CLASS_RE.test(pack.class_key || '')) errors.push('class_key must look like "math:Year 5"')
  if (!pack.title) errors.push('needs a title')
  const vn = (pack.langs || ['en', 'vn']).includes('vn')
  if (vn && !pack.titleVn) warnings.push('title has no titleVn')
  const bytes = new TextEncoder().encode(JSON.stringify(pack)).length
  if (bytes > MAX_BYTES) errors.push(`the pack is ${Math.round(bytes / 1000)} kB; at most ${MAX_BYTES / 1000} kB`)
  if (strings(pack).some((s) => s.includes('$$'))) warnings.push('$$…$$ maths: only single $…$ is drawn')

  const parts = Array.isArray(pack.parts) ? pack.parts : null
  if (!parts || !parts.length) { errors.push('needs at least one part'); return { errors, warnings } }
  const seen = new Set()
  const assets = pack.assets && typeof pack.assets === 'object' ? pack.assets : {}
  parts.forEach((part, pi) => {
    const at = `part ${part?.id || pi + 1}`
    if (!PART_RE.test(part?.id || '') || seen.has(part.id)) errors.push(`${at}: id missing, repeated or not letters, digits, - or _`)
    seen.add(part?.id)
    if (part?.kind === 'review') checkReview(part, at, vn, assets, errors, warnings)
    else if (part?.kind === 'practice') checkPractice(part, at, vn, errors, warnings)
    else errors.push(`${at}: kind must be review or practice`)
  })
  return { errors, warnings }
}

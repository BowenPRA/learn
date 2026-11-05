import { useEffect, useState } from 'react'
import { api } from './api.js'
import { validatePack } from '../pack/validate.js'

const EMPTY = { pack: null, progress: [], assets: {} }

async function fetchPack(slug) {
  const got = await api.pack(slug)
  if (!got) return { ...EMPTY, error: 'notOpen' }
  const { errors } = validatePack(got.pack.content)
  if (errors.length) {
    console.warn('Pack not drawn:', errors)
    return { ...EMPTY, error: 'notOpen' }
  }
  const assets = await api.assetUrls(got.pack.id, Object.keys(got.pack.content.assets || {}))
  return { pack: got.pack, progress: got.progress || [], assets, error: '' }
}

/**
 * One pack by its link, with the student's own progress and signed links for its
 * pictures. `error` is 'notOpen' when the pack is missing, not open, or not in
 * the right shape (a broken pack is never drawn), 'offline' when it could not be asked for.
 */
export function usePack(slug) {
  const [state, setState] = useState({ slug: null, ...EMPTY, error: '' })
  useEffect(() => {
    let alive = true
    fetchPack(slug)
      .then((s) => alive && setState({ slug, ...s }))
      .catch((e) => alive && setState({ slug, ...EMPTY, error: e.code === 'offline' ? 'offline' : 'notOpen' }))
    return () => { alive = false }
  }, [slug])
  return { ...state, loading: state.slug !== slug }
}

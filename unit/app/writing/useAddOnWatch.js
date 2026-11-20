// Watches a writing box for an add-on that works in it despite NO_ADDONS (noAddOns.js),
// and returns every add-on seen so far, by name. It checks when the box's attributes
// change, when elements are added beside it, and every few seconds.
import { useEffect, useState } from 'react'
import { addNames, addOnsOn } from './noAddOns.js'

const EVERY_MS = 4000

export function useAddOnWatch(ref, on = true) {
  const [seen, setSeen] = useState([])
  useEffect(() => {
    const el = ref.current
    if (!on || !el) return undefined
    const check = () => setSeen((known) => addNames(known, addOnsOn(el)))
    check()
    const boxWatch = new MutationObserver(check)
    boxWatch.observe(el, { attributes: true })
    const pageWatch = new MutationObserver(check)
    pageWatch.observe(document.body, { childList: true })
    const timer = setInterval(check, EVERY_MS)
    return () => { boxWatch.disconnect(); pageWatch.disconnect(); clearInterval(timer) }
  }, [ref, on])
  return seen
}

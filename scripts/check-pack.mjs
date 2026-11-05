// Check a lesson pack before publishing it:  npm run check:pack <pack.json>
// Exit code 1 when it has errors. Warnings are printed but do not stop it.
import { readFileSync } from 'node:fs'
import process from 'node:process'
import { validatePack } from '../src/pack/validate.js'

const file = process.argv[2]
if (!file) { console.error('Usage: npm run check:pack <pack.json>'); process.exit(2) }
let pack
try { pack = JSON.parse(readFileSync(file, 'utf8')) } catch (e) { console.error(`Could not read ${file}: ${e.message}`); process.exit(2) }
const { errors, warnings } = validatePack(pack)
for (const w of warnings) console.log(`warning: ${w}`)
for (const e of errors) console.log(`ERROR: ${e}`)
console.log(errors.length
  ? `${errors.length} error(s): fix them before publishing.`
  : `OK: ${pack.slug} can be published${warnings.length ? ` (${warnings.length} warning(s))` : ''}.`)
process.exit(errors.length ? 1 : 0)

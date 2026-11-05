// Run before `npm run deploy`: refuses to build the live site without The Current's
// Supabase settings, so learn.pra.edu.vn never ends up in demo mode. Checks the
// variable names only; never prints a value.
import { existsSync, readFileSync } from 'node:fs'
import process from 'node:process'

const file = new URL('../.env', import.meta.url)
const text = existsSync(file) ? readFileSync(file, 'utf8') : ''
const has = (name) => new RegExp(`^${name}=\\S+`, 'm').test(text)
const missing = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_PUBLISHABLE_KEY'].filter((n) => !has(n))
if (missing.length) {
  console.error(`No ${missing.join(' / ')} in C:/Users/sbowe/learn/.env: the live site would run in demo mode.`)
  console.error("Copy .env.example to .env and fill it in from The Current's Supabase project > Project Settings > API.")
  process.exit(1)
}
console.log('.env has the Supabase settings.')

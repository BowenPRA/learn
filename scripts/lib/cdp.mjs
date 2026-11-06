// Headless Chrome through the DevTools protocol (Node 24's built-in WebSocket), for
// the pack scripts: its own throwaway profile, one page, closed with close().
// Port: CDP_PORT (default 9497). Chrome: CHROME (default the usual Windows path).
import { spawn } from 'node:child_process'
import { mkdtempSync, openSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import process from 'node:process'

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export async function openChrome({ port = Number(process.env.CDP_PORT || 9497) } = {}) {
  const exe = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  const profile = mkdtempSync(join(tmpdir(), 'learn-pack-'))
  const log = openSync(join(profile, 'chrome.log'), 'w')
  const chrome = spawn(exe, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--no-first-run', '--hide-scrollbars', '--force-color-profile=srgb', 'about:blank'], { stdio: ['ignore', log, log] })

  let url = null
  for (let i = 0; i < 60 && !url; i += 1) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json()
      url = list.find((t) => t.type === 'page')?.webSocketDebuggerUrl
    } catch { /* not up yet */ }
    if (!url) await sleep(200)
  }
  if (!url) { chrome.kill(); throw new Error(`Chrome did not start on port ${port}`) }

  const ws = new WebSocket(url)
  await new Promise((r, j) => { ws.addEventListener('open', r, { once: true }); ws.addEventListener('error', j, { once: true }) })
  let seq = 0
  const waiting = new Map()
  const errors = []
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.id && waiting.has(msg.id)) { waiting.get(msg.id)(msg); waiting.delete(msg.id) }
    if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails?.exception?.description || msg.params.exceptionDetails?.text)
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') errors.push(msg.params.args.map((a) => a.value ?? a.description).join(' '))
  })
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++seq
    waiting.set(id, (m) => (m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result)))
    ws.send(JSON.stringify({ id, method, params }))
  })
  const js = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
    if (r.exceptionDetails) throw new Error(`${expression.slice(0, 80)}: ${r.exceptionDetails.exception?.description || r.exceptionDetails.text}`)
    return r.result.value
  }
  await send('Page.enable')
  await send('Runtime.enable')

  const size = (width, height, scale = 1, mobile = false) => send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: scale, mobile })
  const key = async (k, code = k, keyCode = 0) => {
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code, windowsVirtualKeyCode: keyCode })
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: keyCode })
  }
  const close = () => {
    try { ws.close() } catch { /* gone */ }
    chrome.kill()
    setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch { /* Chrome still holds it */ } }, 1500)
  }
  return { send, js, size, key, close, errors }
}

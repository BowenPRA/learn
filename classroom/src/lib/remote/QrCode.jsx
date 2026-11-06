// src/lib/remote/QrCode.jsx
// The QR code that brings a phone in, drawn as one SVG path. Shared by the
// Guess Who board and a deck's pairing panel; both load it lazily, so `uqr`
// rides in the remote-vendor chunk that lessons never fetch.
import { useMemo } from 'react'
import { encode } from 'uqr'

export function QrCode({ text, className = '', ink = '#140a24' }) {
  const d = useMemo(() => {
    const { data, size } = encode(text, { ecc: 'M', border: 0 })
    let path = ''
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (data[y][x]) path += `M${x} ${y}h1v1h-1z`
    return { path, size }
  }, [text])
  return (
    <svg viewBox={`-3 -3 ${d.size + 6} ${d.size + 6}`} className={className} shapeRendering="crispEdges" role="img" aria-label="QR code for the remote">
      <rect x="-3" y="-3" width={d.size + 6} height={d.size + 6} fill="#fff" rx="2" />
      <path d={d.path} fill={ink} />
    </svg>
  )
}

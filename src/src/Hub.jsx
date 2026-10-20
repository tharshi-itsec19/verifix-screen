import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import Icon from './Icons.jsx'
import { REGULATORS } from './data.js'

// Pentagon layout around the core: top, upper right, lower right, lower left, upper left
const ANGLES = [-90, -18, 54, 126, 198]
const CX = 50
const CY = 46
const RX = 34
const RY = 31

const pos = (i) => {
  const a = (ANGLES[i] * Math.PI) / 180
  return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) }
}

// distance from the centre of a rounded square to its edge along direction (ux, uy)
function edgeDistance(half, radius, ux, uy) {
  const sdf = (px, py) => {
    const qx = Math.abs(px) - (half - radius)
    const qy = Math.abs(py) - (half - radius)
    return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - radius
  }
  let lo = 0
  let hi = half * 2
  for (let k = 0; k < 24; k++) {
    const mid = (lo + hi) / 2
    if (sdf(ux * mid, uy * mid) < 0) lo = mid
    else hi = mid
  }
  return lo
}

export default function Hub({ logo, zoom, onPick }) {
  const sceneRef = useRef(null)
  const nodeRefs = useRef([])
  const [geo, setGeo] = useState(null)

  // Measure the real boxes, then put each dot exactly where its line meets the box,
  // on the side that faces the core.
  const measure = useCallback(() => {
    const sc = sceneRef.current
    if (!sc) return
    const W = sc.offsetWidth
    const H = sc.offsetHeight
    const core = { x: (CX / 100) * W, y: (CY / 100) * H }
    const items = REGULATORS.map((r, i) => {
      const node = nodeRefs.current[i]
      const tile = node.querySelector('.tile')
      const half = tile.offsetWidth / 2
      const radius = parseFloat(getComputedStyle(tile).borderRadius) || 24
      // node is centred on its left/top point by translate(-50%, -50%)
      const cx = node.offsetLeft - node.offsetWidth / 2 + tile.offsetLeft + half
      const cy = node.offsetTop - node.offsetHeight / 2 + tile.offsetTop + tile.offsetHeight / 2
      const dx = core.x - cx
      const dy = core.y - cy
      const len = Math.hypot(dx, dy) || 1
      const ux = dx / len
      const uy = dy / len
      const t = edgeDistance(half, radius, ux, uy)
      return { x: cx + ux * t, y: cy + uy * t, below: uy > 0.5 }
    })
    setGeo({ W, H, core, items })
  }, [])

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(sceneRef.current)
    nodeRefs.current.forEach((n) => n && ro.observe(n))
    window.addEventListener('resize', measure)
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  return (
    <section className="hub" aria-label="Regulator journeys">
      <header className="hub-head">
        <img src={logo} alt="VerifiX" />
      </header>

      <div className="scene" ref={sceneRef} style={{ '--zoom': zoom }}>
        {geo && (
          <svg className="links" width={geo.W} height={geo.H} viewBox={`0 0 ${geo.W} ${geo.H}`} aria-hidden="true">
            {geo.items.map((p, i) => (
              <line
                key={REGULATORS[i].id}
                x1={geo.core.x}
                y1={geo.core.y}
                x2={p.x}
                y2={p.y}
                className={i % 2 ? 'ln orange' : 'ln blue'}
              />
            ))}
          </svg>
        )}

        <div className="core core-md static" style={{ left: CX + '%', top: CY + '%' }} aria-hidden="true">
          <span className="ring r1" />
          <span className="ring r2" />
          <span className="core-face">
            <Icon name="shield" size={30} />
            <b>CORE</b>
          </span>
        </div>

        {REGULATORS.map((r, i) => {
          const p = pos(i)
          return (
            <button
              key={r.id}
              ref={(el) => (nodeRefs.current[i] = el)}
              className={'node ' + (i % 2 ? 'orange' : 'blue') + (geo && geo.items[i].below ? ' lab-bg' : '')}
              style={{ left: p.x + '%', top: p.y + '%', '--d': i * 90 + 'ms' }}
              onClick={() => onPick(r.id)}
            >
              <span className="tile">
                <Icon name={r.icon} size={38} />
              </span>
              <b>{r.short}</b>
              <small>{r.audience}</small>
            </button>
          )
        })}

        {geo && (
          <svg className="dots" width={geo.W} height={geo.H} viewBox={`0 0 ${geo.W} ${geo.H}`} aria-hidden="true">
            {geo.items.map((p, i) => (
              <g key={REGULATORS[i].id} className={i % 2 ? 'dt orange' : 'dt blue'}>
                <circle className="halo" cx={p.x} cy={p.y} r="11" />
                <circle className="pt" cx={p.x} cy={p.y} r="6" />
              </g>
            ))}
          </svg>
        )}
      </div>
    </section>
  )
}

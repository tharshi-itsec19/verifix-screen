import React from 'react'
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

export default function Hub({ logo, zoom, onPick }) {
  return (
    <section className="hub" aria-label="Regulator journeys">
      <header className="hub-head">
        <img src={logo} alt="VerifiX" />
      </header>

      <div className="scene" style={{ '--zoom': zoom }}>
        <svg className="links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {REGULATORS.map((r, i) => {
            const p = pos(i)
            return (
              <line
                key={r.id}
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
                className={i % 2 ? 'ln orange' : 'ln blue'}
                vectorEffect="non-scaling-stroke"
              />
            )
          })}
        </svg>

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
              className={'node ' + (i % 2 ? 'orange' : 'blue')}
              style={{ left: p.x + '%', top: p.y + '%', '--d': i * 90 + 'ms' }}
              onClick={() => onPick(r.id)}
            >
              <span className="tile">
                <Icon name={r.icon} size={38} />
                <i className="dot" />
              </span>
              <b>{r.short}</b>
              <small>{r.audience}</small>
            </button>
          )
        })}
      </div>
    </section>
  )
}

import React from 'react'
import Icon from './Icons.jsx'

export default function Cover({ logo, onOpen }) {
  return (
    <section className="cover" aria-label="Cover">
      <div className="cover-copy">
        <img className="cover-logo" src={logo} alt="VerifiX" />
        <h1>Run compliance in one place, and defend every decision</h1>
        <p>
          Identity, business, screening and transaction monitoring in one UAE-hosted platform for
          regulated entities.
        </p>
      </div>

      <div className="core-wrap">
        <button className="core core-lg" onClick={onOpen} aria-label="Open regulator journeys">
          <span className="ring r1" />
          <span className="ring r2" />
          <span className="ring r3" />
          <span className="core-face">
            <Icon name="shield" size={40} />
            <b>OPEN</b>
          </span>
        </button>
      </div>
    </section>
  )
}

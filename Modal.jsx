import React, { useEffect, useRef, useState } from 'react'
import Icon from './Icons.jsx'
import { REGULATORS, EXAMPLE_FLOW, CHECKS, EVIDENCE } from './data.js'

const SLIDE_TITLES = ['Overview', 'What is configured', 'Evidence and audit']

function Overview({ r }) {
  return (
    <div className="slide-in">
      <p className="lead">
        VerifiX ships this journey pre-configured for {r.audience.toLowerCase()}. Start from it, then
        adjust thresholds to your own risk appetite.
      </p>
      <div className="facts">
        <div className="fact">
          <small>Journey</small>
          <b className="mono">{r.journey}</b>
        </div>
        <div className="fact">
          <small>Status</small>
          <b><span className="tag green">Ready</span></b>
        </div>
        <div className="fact">
          <small>Built for</small>
          <b>{r.audience}</b>
        </div>
        <div className="fact">
          <small>Hosting</small>
          <b>UAE regions on AWS and Azure</b>
        </div>
      </div>
      <p className="legal">
        Regulator names describe the journeys and frameworks VerifiX supports. They do not imply
        endorsement, approval, or affiliation.
      </p>
    </div>
  )
}

function Configured() {
  const [i, setI] = useState(0)
  const s = EXAMPLE_FLOW[i]
  return (
    <div className="slide-in">
      <h4>Example flow, tap a step</h4>
      <ol className="flow">
        {EXAMPLE_FLOW.map((st, k) => (
          <li key={st.title}>
            <button aria-pressed={k === i} onClick={() => setI(k)}>
              <span className="n">{k + 1}</span>
              <b>{st.title}</b>
            </button>
          </li>
        ))}
      </ol>
      <div className="flow-detail" key={i}>
        <time className="mono">{s.time}</time>
        <span>{s.text}</span>
      </div>
      <h4>Checks you can include</h4>
      <div className="chips">
        {CHECKS.map((c) => (
          <span className="chip" key={c}>{c}</span>
        ))}
        <span className="chip more">+ 27 more modules</span>
      </div>
    </div>
  )
}

function Evidence() {
  return (
    <div className="slide-in">
      <div className="ev">
        {EVIDENCE.map((e, k) => (
          <div className="ev-card" key={e.title}>
            <span className="ev-n"><Icon name="check" size={20} stroke={2.4} /></span>
            <b>{e.title}</b>
            <p>{e.text}</p>
          </div>
        ))}
      </div>
      <p className="legal">
        VerifiX supports your own compliance program. It is not a regulator, and it does not confer a
        license or an approval.
      </p>
    </div>
  )
}

export default function Modal({ regulator: r, onClose, onSwitch }) {
  const [slide, setSlide] = useState(0)
  const startX = useRef(null)
  const closeRef = useRef(null)
  const last = SLIDE_TITLES.length - 1

  // reset to first slide when switching regulator
  useEffect(() => setSlide(0), [r.id])

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setSlide((s) => Math.min(last, s + 1))
      if (e.key === 'ArrowLeft') setSlide((s) => Math.max(0, s - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, last])

  const onDown = (e) => { startX.current = e.clientX }
  const onUp = (e) => {
    if (startX.current === null) return
    const dx = e.clientX - startX.current
    startX.current = null
    if (Math.abs(dx) > 70) setSlide((s) => (dx < 0 ? Math.min(last, s + 1) : Math.max(0, s - 1)))
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={r.short + ' journey'}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="m-head">
          <span className="m-icon"><Icon name={r.icon} size={34} /></span>
          <div className="m-title">
            <small>Regulator journey</small>
            <h3>{r.short}</h3>
            <span>{r.full}</span>
          </div>
          <button ref={closeRef} className="x" onClick={onClose} aria-label="Close">
            <Icon name="close" size={26} />
          </button>
        </header>

        <div className="tabs" role="tablist">
          {SLIDE_TITLES.map((t, k) => (
            <button key={t} role="tab" aria-selected={slide === k} onClick={() => setSlide(k)}>
              {t}
            </button>
          ))}
        </div>

        <div className="m-body" onPointerDown={onDown} onPointerUp={onUp}>
          {slide === 0 && <Overview r={r} />}
          {slide === 1 && <Configured key={r.id} />}
          {slide === 2 && <Evidence />}
        </div>

        <footer className="m-foot">
          <div className="pager">
            <button className="rnd" onClick={() => setSlide((s) => Math.max(0, s - 1))} disabled={slide === 0} aria-label="Previous slide">
              <Icon name="left" size={22} />
            </button>
            <div className="dots">
              {SLIDE_TITLES.map((t, k) => (
                <button key={t} aria-label={'Slide ' + (k + 1)} aria-current={slide === k} onClick={() => setSlide(k)} />
              ))}
            </div>
            <button className="rnd" onClick={() => setSlide((s) => Math.min(last, s + 1))} disabled={slide === last} aria-label="Next slide">
              <Icon name="right" size={22} />
            </button>
          </div>
          <div className="switch" role="group" aria-label="Switch regulator">
            {REGULATORS.map((x) => (
              <button key={x.id} aria-pressed={x.id === r.id} onClick={() => onSwitch(x.id)}>
                {x.short}
              </button>
            ))}
          </div>
        </footer>
      </div>
    </div>
  )
}

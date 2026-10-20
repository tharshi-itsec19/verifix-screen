import React, { useEffect, useRef } from 'react'
import Icon from './Icons.jsx'

export default function Search({ query, setQuery, results, onClose, kbOpen, onToggleKb }) {
  const input = useRef(null)

  useEffect(() => {
    input.current?.focus()
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])

  return (
    <div className="overlay top" onClick={onClose}>
      <div className="modal search" role="dialog" aria-modal="true" aria-label="Search" onClick={(e) => e.stopPropagation()}>
        <div className="s-bar">
          <Icon name="search" size={26} />
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && results[0]?.run()}
            inputMode={kbOpen ? 'none' : 'search'}
            placeholder="Search regulators, screens, controls..."
            aria-label="Search"
            autoComplete="off"
          />
          <button className="x sm" onClick={onToggleKb} aria-pressed={kbOpen} aria-label="Toggle on-screen keyboard">
            <Icon name="keyboard" size={22} />
          </button>
          <button className="x sm" onClick={onClose} aria-label="Close search"><Icon name="close" size={22} /></button>
        </div>
        <ul className="s-list">
          {results.length === 0 && <li className="s-empty">No results. Try VARA, theme, or sound.</li>}
          {results.map((r) => (
            <li key={r.id}>
              <button className={'s-item ' + (r.kind === 'control' ? 'orange' : 'blue')} onClick={r.run}>
                <span className="s-ic"><Icon name={r.icon} size={26} /></span>
                <span>
                  <b>{r.title}</b>
                  <small>{r.sub}</small>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

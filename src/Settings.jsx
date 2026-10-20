import React, { useEffect } from 'react'
import Icon from './Icons.jsx'

function Toggle({ on, onChange, label }) {
  return (
    <button className="sw" role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)}>
      <i />
    </button>
  )
}

function Row({ icon, label, on, onChange }) {
  return (
    <div className="row">
      <span className="row-i"><Icon name={icon} size={22} /></span>
      <span className="row-l">{label}</span>
      <Toggle on={on} onChange={onChange} label={label} />
    </div>
  )
}

export default function Settings({ settings, set, full, onFull, onClose, onView }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])

  const dark = settings.theme === 'dark'
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal small" role="dialog" aria-modal="true" aria-label="Settings" onClick={(e) => e.stopPropagation()}>
        <header className="m-head">
          <span className="m-icon sm"><Icon name="settings" size={28} /></span>
          <div className="m-title"><h3 className="plain">Settings</h3></div>
          <button className="x" onClick={onClose} aria-label="Close"><Icon name="close" size={26} /></button>
        </header>

        <div className="set-body">
          <h5>Theme</h5>
          <div className="themes">
            <button aria-pressed={!dark} onClick={() => set({ theme: 'light' })}>
              <i className="sw-white" /> White {!dark && <Icon name="check" size={18} stroke={2.4} />}
            </button>
            <button aria-pressed={dark} onClick={() => set({ theme: 'dark' })}>
              <i className="sw-dark" /> Dark {dark && <Icon name="check" size={18} stroke={2.4} />}
            </button>
          </div>

          <h5>Display</h5>
          <div className="rows">
            <Row icon={dark ? 'moon' : 'sun'} label="Dark mode" on={dark} onChange={(v) => set({ theme: v ? 'dark' : 'light' })} />
            <Row icon="image" label="Background image" on={settings.bg} onChange={(v) => set({ bg: v })} />
            <Row icon="sound" label="Sound effects" on={settings.sound} onChange={(v) => set({ sound: v })} />
            <Row icon="full" label="Full screen" on={full} onChange={onFull} />
          </div>

          <h5>Views</h5>
          <div className="views">
            <button onClick={() => onView('cover')}><Icon name="home" size={22} /> Cover</button>
            <button onClick={() => onView('hub')}><Icon name="grid" size={22} /> Regulator hub</button>
          </div>
        </div>
      </div>
    </div>
  )
}

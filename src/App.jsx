import React, { useCallback, useEffect, useRef, useState } from 'react'
import Cover from './Cover.jsx'
import Hub from './Hub.jsx'
import Modal from './Modal.jsx'
import Settings from './Settings.jsx'
import Search from './Search.jsx'
import Keyboard from './Keyboard.jsx'
import Icon from './Icons.jsx'
import logoLight from './assets/logo-mark.png'
import logoDark from './assets/logo-dark.png'
import { REGULATORS } from './data.js'
import { sfx } from './sfx.js'

const KIOSK = new URLSearchParams(window.location.search).has('kiosk')
const KEY = 'vx-settings'
const DEFAULTS = { theme: 'light', bg: true, sound: true }

function loadSettings() {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') }
  } catch (e) {
    return DEFAULTS
  }
}

export default function App() {
  const [screen, setScreen] = useState('cover') // 'cover' | 'hub'
  const [openId, setOpenId] = useState(null) // regulator popup
  const [panel, setPanel] = useState(null) // 'settings' | 'search' | null
  const [kb, setKb] = useState(false)
  const [query, setQuery] = useState('')
  const [zoom, setZoom] = useState(1)
  const [full, setFull] = useState(false)
  const [settings, setSettings] = useState(loadSettings)
  const idle = useRef(null)
  const soundRef = useRef(settings.sound)
  soundRef.current = settings.sound
  const dark = settings.theme === 'dark'

  const set = useCallback((patch) => {
    setSettings((s) => {
      const n = { ...s, ...patch }
      try { localStorage.setItem(KEY, JSON.stringify(n)) } catch (e) { /* storage unavailable */ }
      if ('sound' in patch && patch.sound) sfx('on', true)
      return n
    })
  }, [])

  // theme on <html> so the whole page, including the background, switches
  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme
    const m = document.querySelector('meta[name="theme-color"]')
    if (m) m.setAttribute('content', dark ? '#050f1f' : '#ffffff')
  }, [settings.theme, dark])

  // click sound on every button press
  useEffect(() => {
    const down = (e) => { if (e.target.closest && e.target.closest('button')) sfx('tick', soundRef.current) }
    document.addEventListener('pointerdown', down, true)
    return () => document.removeEventListener('pointerdown', down, true)
  }, [])

  // open / close sounds
  const anyOpen = !!(openId || panel)
  const was = useRef(false)
  useEffect(() => {
    if (anyOpen !== was.current) sfx(anyOpen ? 'open' : 'close', soundRef.current)
    was.current = anyOpen
  }, [anyOpen])

  // kiosk reset
  useEffect(() => {
    if (!KIOSK) return
    const reset = () => {
      clearTimeout(idle.current)
      idle.current = setTimeout(() => {
        setOpenId(null); setPanel(null); setKb(false); setQuery(''); setScreen('cover'); setZoom(1)
      }, 90000)
    }
    reset()
    window.addEventListener('pointerdown', reset)
    window.addEventListener('keydown', reset)
    return () => {
      clearTimeout(idle.current)
      window.removeEventListener('pointerdown', reset)
      window.removeEventListener('keydown', reset)
    }
  }, [])

  useEffect(() => {
    const onFs = () => setFull(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  const toggleFull = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.()
  }
  const toggleTheme = () => set({ theme: dark ? 'light' : 'dark' })

  const openPanel = (p) => { setOpenId(null); setPanel(p); if (p !== 'search') setKb(false) }
  const goScreen = (s) => { setOpenId(null); setPanel(null); setKb(false); setScreen(s) }
  const openSearch = () => { setQuery(''); openPanel('search') }

  // ---- search results ----
  const closeSearch = () => { setPanel(null); setQuery(''); setKb(false) }
  const ALL = [
    ...REGULATORS.map((r) => ({
      id: 'r-' + r.id, kind: 'regulator', icon: r.icon, title: r.short + ' journey', sub: r.full,
      run: () => { setPanel(null); setQuery(''); setKb(false); setScreen('hub'); setOpenId(r.id) },
    })),
    { id: 'home', kind: 'screen', icon: 'home', title: 'Home', sub: 'Cover screen', run: () => { goScreen('cover'); setQuery('') } },
    { id: 'hub', kind: 'screen', icon: 'grid', title: 'Regulators', sub: 'Regulator hub', run: () => { goScreen('hub'); setQuery('') } },
    { id: 'settings', kind: 'control', icon: 'settings', title: 'Settings', sub: 'Theme, background, sound, full screen', run: () => openPanel('settings') },
    { id: 'theme', kind: 'control', icon: dark ? 'sun' : 'moon', title: dark ? 'Switch to white theme' : 'Switch to dark theme', sub: 'Theme', run: toggleTheme },
    { id: 'sound', kind: 'control', icon: 'sound', title: settings.sound ? 'Turn sound effects off' : 'Turn sound effects on', sub: 'Sound', run: () => set({ sound: !settings.sound }) },
    { id: 'bg', kind: 'control', icon: 'image', title: settings.bg ? 'Hide background image' : 'Show background image', sub: 'Background', run: () => set({ bg: !settings.bg }) },
    { id: 'full', kind: 'control', icon: 'full', title: full ? 'Exit full screen' : 'Enter full screen', sub: 'Display', run: toggleFull },
    { id: 'kb', kind: 'control', icon: 'keyboard', title: kb ? 'Hide on-screen keyboard' : 'Show on-screen keyboard', sub: 'Keyboard', run: () => setKb((v) => !v) },
  ]
  const q = query.trim().toLowerCase()
  const results = q ? ALL.filter((i) => (i.title + ' ' + i.sub + ' ' + i.kind).toLowerCase().includes(q)) : ALL
  const resultsRef = useRef(results)
  resultsRef.current = results

  // ---- on-screen keyboard typing goes to the search field ----
  const onVKey = (k) => {
    if (panel !== 'search') { setOpenId(null); setPanel('search'); setQuery(k.length === 1 ? k : '') ; return }
    if (k === 'Backspace') setQuery((v) => v.slice(0, -1))
    else if (k === 'Enter') resultsRef.current[0]?.run()
    else setQuery((v) => v + k)
  }

  const open = REGULATORS.find((r) => r.id === openId) || null
  const logo = dark ? logoDark : logoLight

  return (
    <div className="app" data-bg={settings.bg ? 'on' : 'off'}>
      <div className="bg" aria-hidden="true" />

      {screen === 'cover' ? (
        <Cover logo={logo} onOpen={() => setScreen('hub')} />
      ) : (
        <Hub logo={logo} zoom={zoom} onPick={(id) => { setKb(false); setOpenId(id) }} />
      )}

      <button className="fab fab-top" onClick={toggleFull} aria-label={full ? 'Exit full screen' : 'Full screen'}>
        <Icon name="full" size={22} />
        <span>{full ? 'Exit' : 'Full'}</span>
      </button>

      {screen === 'hub' && (
        <div className="zoom" role="group" aria-label="Zoom">
          <button onClick={() => setZoom((z) => Math.max(0.7, +(z - 0.1).toFixed(1)))} aria-label="Zoom out">
            <Icon name="minus" size={20} />
          </button>
          <div className="zoom-v">
            <Icon name="zoom" size={16} />
            <b>{Math.round(zoom * 100)}%</b>
          </div>
          <button onClick={() => setZoom((z) => Math.min(1.4, +(z + 0.1).toFixed(1)))} aria-label="Zoom in">
            <Icon name="plus" size={20} />
          </button>
        </div>
      )}

      <nav className="dock" aria-label="Controls">
        <button aria-current={screen === 'cover' && !panel} onClick={() => goScreen('cover')}>
          <Icon name="home" size={24} /><span>Home</span>
        </button>
        <button aria-current={screen === 'hub' && !panel} onClick={() => goScreen('hub')}>
          <Icon name="grid" size={24} /><span>Regulators</span>
        </button>
        <button onClick={toggleTheme} aria-label={dark ? 'Switch to white theme' : 'Switch to dark theme'}>
          <Icon name={dark ? 'sun' : 'moon'} size={24} /><span>{dark ? 'White' : 'Dark'}</span>
        </button>
        <button aria-current={panel === 'settings'} onClick={() => openPanel('settings')}>
          <Icon name="settings" size={24} /><span>Settings</span>
        </button>
        <button aria-current={kb} onClick={() => setKb((v) => !v)}>
          <Icon name="keyboard" size={24} /><span>Keyboard</span>
        </button>
        <button aria-current={panel === 'search'} onClick={openSearch}>
          <Icon name="search" size={24} /><span>Search</span>
        </button>
      </nav>

      {open && <Modal regulator={open} onClose={() => setOpenId(null)} onSwitch={(id) => setOpenId(id)} />}

      {panel === 'settings' && (
        <Settings
          settings={settings}
          set={set}
          full={full}
          onFull={toggleFull}
          onClose={() => setPanel(null)}
          onView={(v) => goScreen(v)}
        />
      )}

      {panel === 'search' && (
        <Search
          query={query}
          setQuery={setQuery}
          results={results}
          onClose={closeSearch}
          kbOpen={kb}
          onToggleKb={() => setKb((v) => !v)}
        />
      )}

      {kb && <Keyboard onKey={onVKey} onHide={() => setKb(false)} />}
    </div>
  )
}

import React, { useState } from 'react'
import Icon from './Icons.jsx'

const ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', '-'],
]

export default function Keyboard({ onKey, onHide }) {
  const [shift, setShift] = useState(false)
  // pointerdown + preventDefault keeps focus in the search field
  const press = (k) => (e) => {
    e.preventDefault()
    if (k === 'Shift') return setShift((s) => !s)
    onKey(shift && k.length === 1 ? k.toUpperCase() : k)
    if (shift) setShift(false)
  }
  const label = (k) => (shift ? k.toUpperCase() : k)

  return (
    <div className="vk" role="group" aria-label="On-screen keyboard">
      {ROWS.map((row, i) => (
        <div className="vk-row" key={i}>
          {i === 3 && (
            <button className="vk-k wide" aria-pressed={shift} onPointerDown={press('Shift')} aria-label="Shift">
              <Icon name="shift" size={22} />
            </button>
          )}
          {row.map((k) => (
            <button className="vk-k" key={k} onPointerDown={press(k)}>{label(k)}</button>
          ))}
          {i === 0 && (
            <button className="vk-k wide" onPointerDown={press('Backspace')} aria-label="Backspace">
              <Icon name="backspace" size={24} />
            </button>
          )}
        </div>
      ))}
      <div className="vk-row">
        <button className="vk-k hide" onPointerDown={(e) => { e.preventDefault(); onHide() }}>Hide</button>
        <button className="vk-k space" onPointerDown={press(' ')} aria-label="Space">space</button>
        <button className="vk-k go" onPointerDown={press('Enter')}>
          <Icon name="enter" size={22} /> Go
        </button>
      </div>
    </div>
  )
}

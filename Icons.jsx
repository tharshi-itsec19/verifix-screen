import React from 'react'

const PATHS = {
  shield: ['M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z', 'M9 12l2 2 4-4'],
  coin: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4', 'M12 7.5V9M12 15v1.5'],
  bank: ['M3 10l9-6 9 6', 'M5 10v8M9.5 10v8M14.5 10v8M19 10v8', 'M3 20h18'],
  chart: ['M3 3v18h18', 'M7 15l4-5 3 3 5-7'],
  scale: ['M12 3v18', 'M5 7h14', 'M5 7l-3 7a3 3 0 0 0 6 0L5 7z', 'M19 7l-3 7a3 3 0 0 0 6 0l-3-7z', 'M8 21h8'],
  building: ['M4 21V5l8-3 8 3v16', 'M2 21h20', 'M9 9h2M13 9h2M9 13h2M13 13h2', 'M10 21v-4h4v4'],
  close: ['M6 6l12 12M18 6L6 18'],
  left: ['M15 5l-7 7 7 7'],
  right: ['M9 5l7 7-7 7'],
  home: ['M3 11l9-8 9 8', 'M5 10v10h5v-6h4v6h5V10'],
  grid: ['M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z'],
  full: ['M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5'],
  plus: ['M12 5v14M5 12h14'],
  minus: ['M5 12h14'],
  check: ['M5 12l4 4 10-10'],
  search: ['M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z', 'M20 20l-4-4'],
  keyboard: ['M3 6h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z', 'M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01', 'M9 14.5h6'],
  settings: ['M4 7h9M17 7h3M4 17h3M11 17h9', 'M15 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z', 'M9 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'],
  sun: ['M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', 'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'],
  moon: ['M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z'],
  sound: ['M4 9v6h4l5 4V5L8 9H4z', 'M16 9a4 4 0 0 1 0 6', 'M18.5 6.5a8 8 0 0 1 0 11'],
  image: ['M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z', 'M3 16l5-5 4 4 3-3 6 6', 'M15 9h.01'],
  backspace: ['M21 5H9l-6 7 6 7h12V5z', 'M13 9l4 6M17 9l-4 6'],
  shift: ['M12 4l8 9h-5v7H9v-7H4l8-9z'],
  enter: ['M20 6v6a2 2 0 0 1-2 2H5', 'M9 10l-4 4 4 4'],
  zoom: ['M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z', 'M20 20l-4-4'],
}

export default function Icon({ name, size = 24, stroke = 1.8 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {(PATHS[name] || []).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}

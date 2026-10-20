// Tiny synthesized UI sounds (no audio files needed)
let ctx = null
const TONES = {
  tick: [[880, 0, 0.05]],
  open: [[523, 0, 0.08], [784, 0.07, 0.12]],
  close: [[784, 0, 0.07], [523, 0.06, 0.1]],
  on: [[660, 0, 0.06], [990, 0.06, 0.08]],
  off: [[660, 0, 0.06], [440, 0.06, 0.08]],
}

export function sfx(kind, enabled = true) {
  if (!enabled) return
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)()
    if (ctx.state === 'suspended') ctx.resume()
    const t = ctx.currentTime
    TONES[kind].forEach(([f, d, l]) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.value = f
      g.gain.setValueAtTime(0.0001, t + d)
      g.gain.exponentialRampToValueAtTime(0.12, t + d + 0.01)
      g.gain.exponentialRampToValueAtTime(0.0001, t + d + l)
      o.connect(g)
      g.connect(ctx.destination)
      o.start(t + d)
      o.stop(t + d + l + 0.02)
    })
  } catch (e) {
    /* audio not available */
  }
}

// 8-bit Sound Effect Generator using Web Audio API
// No audio files needed — pure synthesized retro tones

let audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export function playBlip(freq = 440, duration = 0.08, type = "square", volume = 0.1) {
  try {
    const ctx = getCtx();
    if (ctx.state === "suspended") ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // silent fail
  }
}

// === Specific Game Sounds ===

export const sfx = {
  hover: () => playBlip(660, 0.04, "square", 0.06),
  click: () => {
    playBlip(220, 0.05, "square", 0.08);
    setTimeout(() => playBlip(440, 0.06, "square", 0.08), 40);
  },
  start: () => {
    const notes = [262, 330, 392, 523];
    notes.forEach((n, i) => setTimeout(() => playBlip(n, 0.12, "square", 0.1), i * 80));
  },
  success: () => {
    const notes = [523, 659, 784, 1046];
    notes.forEach((n, i) => setTimeout(() => playBlip(n, 0.15, "triangle", 0.12), i * 100));
  },
  coin: () => {
    playBlip(988, 0.05, "square", 0.1);
    setTimeout(() => playBlip(1319, 0.1, "square", 0.1), 50);
  },
  error: () => {
    playBlip(200, 0.15, "sawtooth", 0.08);
    setTimeout(() => playBlip(150, 0.2, "sawtooth", 0.08), 100);
  },
  select: () => playBlip(880, 0.06, "square", 0.08),
  appear: () => playBlip(440, 0.1, "triangle", 0.08),
};
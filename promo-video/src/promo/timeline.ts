export const FPS = 30;

// Boundaries are nudged to nearby beats in house-vibez.mp3 (122 BPM).
// The largest adjustment from the approved content cut is 9 frames.
export const SHOTS = {
  brand: {from: 0, duration: 183},
  positioning: {from: 183, duration: 147},
  dora: {from: 330, duration: 175},
  doraLanguages: {from: 505, duration: 147},
  doraAgent: {from: 652, duration: 147},
  doraBuild: {from: 799, duration: 236},
  doraResult: {from: 1035, duration: 118},
  dsgoBrand: {from: 1153, duration: 118},
  discover: {from: 1271, duration: 177},
  detail: {from: 1448, duration: 118},
  play: {from: 1566, duration: 236},
  handheld: {from: 1802, duration: 207},
  create: {from: 2009, duration: 177},
  community: {from: 2186, duration: 177},
  events: {from: 2363, duration: 268},
  ecosystem: {from: 2631, duration: 295},
  outro: {from: 2926, duration: 210},
} as const;

export const TOTAL_FRAMES = SHOTS.outro.from + SHOTS.outro.duration;

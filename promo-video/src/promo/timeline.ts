export const FPS = 30;

// Boundaries are nudged to nearby beats in house-vibez.mp3 (122 BPM).
// The largest adjustment from the approved content cut is 9 frames.
export const SHOTS = {
  brand: {from: 0, duration: 183},
  positioning: {from: 183, duration: 147},
  dora: {from: 330, duration: 175},
  discover: {from: 505, duration: 180},
  play: {from: 685, duration: 339},
  community: {from: 1024, duration: 265},
  create: {from: 1289, duration: 207},
  events: {from: 1496, duration: 428},
  ecosystem: {from: 1924, duration: 265},
  outro: {from: 2189, duration: 210},
} as const;

export const TOTAL_FRAMES = SHOTS.outro.from + SHOTS.outro.duration;

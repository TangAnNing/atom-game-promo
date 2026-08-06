export const FPS = 30;

// house-vibez.mp3: BPM 122.0017, fitted beat interval 0.491796s.
// The audio is trimmed to its first stable downbeat at 7.937832s.
export const MUSIC_TRIM_FRAMES = 238;
export const BEAT_ZERO_SECONDS = 7.937832 - MUSIC_TRIM_FRAMES / FPS;
export const BEAT_INTERVAL_SECONDS = 0.491796;

export const beatF = (beat: number) =>
  Math.round((BEAT_ZERO_SECONDS + beat * BEAT_INTERVAL_SECONDS) * FPS);

const range = (fromBeat: number, toBeat: number) => ({
  from: beatF(fromBeat),
  duration: beatF(toBeat) - beatF(fromBeat),
});

export const SHOTS = {
  brand: range(0, 8),
  discover: range(8, 20),
  detail: range(20, 28),
  play: range(28, 44),
  community: range(44, 56),
  bridge: range(56, 64),
  dora: range(64, 80),
  result: range(80, 88),
  outro: range(88, 96),
} as const;

export const TOTAL_FRAMES = beatF(96);


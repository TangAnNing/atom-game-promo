import {Easing, interpolate} from 'remotion';

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

export const enter = (frame: number, start = 0, duration = 24) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

export const enterOvershoot = (frame: number, start = 0, duration = 24) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.34, 1.4, 0.44, 1),
  });

export const sceneOpacity = (frame: number, duration: number, fade = 12) => {
  const transitionFrames = Math.min(fade, 5);
  const fadeIn = interpolate(frame, [0, transitionFrames], [0.08, 1], clamp);
  const fadeOut = interpolate(
    frame,
    [duration - transitionFrames, duration],
    [1, 0.08],
    clamp,
  );
  return Math.min(fadeIn, fadeOut);
};

export const map = (
  value: number,
  input: [number, number],
  output: [number, number],
) => interpolate(value, input, output, clamp);

import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {
  HandheldControlCue,
  HandheldJoystickCue,
  HandheldStudioPlayer,
} from './components/HandheldStudioPlayer';

const SOURCE_START_SECONDS = 5;

// Timings are relative to the preview, which starts at source video 00:05.
const CONTROL_CUES: HandheldControlCue[] = [
  {control: 'b', start: 1.14, end: 1.28},
  {control: 'a', start: 2, end: 4.53},
];

const JOYSTICK_CUES: HandheldJoystickCue[] = [
  {start: 0.28, end: 1.02, x: -1, y: 0},
  {start: 1.08, end: 1.34, x: 0.82, y: -0.58},
  {start: 1.36, end: 2.06, x: 1, y: 0},
  {start: 4.55, end: 4.9, x: 0.78, y: -0.48},
  {start: 4.82, end: 6.12, x: 1, y: 0},
  {start: 6.18, end: 6.95, x: -1, y: 0},
];

export const HandheldScreenPreview: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: '#f5f5f3',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          opacity: enter,
          transform: `translateY(${(1 - enter) * 36}px) scale(${0.975 + enter * 0.025})`,
        }}
      >
        <HandheldStudioPlayer
          video="游戏视频1.mp4"
          width={680}
          trimBefore={SOURCE_START_SECONDS * 30}
          objectFit="cover"
          controlCues={CONTROL_CUES}
          joystickCues={JOYSTICK_CUES}
        />
      </div>
    </AbsoluteFill>
  );
};

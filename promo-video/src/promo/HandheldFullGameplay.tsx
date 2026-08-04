import React from 'react';
import {AbsoluteFill} from 'remotion';
import {FPS} from './timeline';
import {
  HandheldControlCue,
  HandheldJoystickCue,
  HandheldStudioPlayer,
} from './components/HandheldStudioPlayer';

export const FULL_GAMEPLAY_DURATION_IN_FRAMES = Math.ceil(14.31 * FPS);

const CONTROL_CUES: HandheldControlCue[] = [
  {control: 'b', start: 3.3, end: 3.47},
  {control: 'b', start: 6.14, end: 6.28},
  {control: 'a', start: 7, end: 9.53},
];

const JOYSTICK_CUES: HandheldJoystickCue[] = [
  {start: 1.15, end: 1.55, x: 0.78, y: -0.48},
  {start: 1.48, end: 3.27, x: 1, y: 0},
  {start: 3.27, end: 3.52, x: 0.9, y: -0.3},
  {start: 3.45, end: 5.2, x: 1, y: 0},
  {start: 5.28, end: 6.02, x: -1, y: 0},
  {start: 6.08, end: 6.34, x: 0.82, y: -0.58},
  {start: 6.36, end: 7.06, x: 1, y: 0},
  {start: 9.55, end: 9.9, x: 0.78, y: -0.48},
  {start: 9.82, end: 11.12, x: 1, y: 0},
  {start: 11.18, end: 11.95, x: -1, y: 0},
];

export const HandheldFullGameplay: React.FC = () => (
  <AbsoluteFill
    style={{
      background: '#f5f5f3',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}
  >
    <HandheldStudioPlayer
      video="游戏视频1.mp4"
      width={680}
      objectFit="cover"
      controlCues={CONTROL_CUES}
      joystickCues={JOYSTICK_CUES}
      loop={false}
    />
  </AbsoluteFill>
);

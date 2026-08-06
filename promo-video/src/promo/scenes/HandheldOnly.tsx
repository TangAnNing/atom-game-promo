import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  HandheldControlCue,
  HandheldJoystickCue,
  HandheldStudioPlayer,
} from '../components/HandheldStudioPlayer';
import {GridBackground} from '../components/SceneBase';
import {COLORS, FONT, MONO} from '../theme';
import {SHOTS} from '../timeline';

const GAMEPLAY_TRIM_SECONDS = 5.1;
const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};
const shifted = (seconds: number) => seconds - GAMEPLAY_TRIM_SECONDS;

const controlCues: HandheldControlCue[] = [
  {control: 'b', start: shifted(6.14), end: shifted(6.28)},
  {control: 'a', start: shifted(7), end: shifted(9.53)},
];

const joystickCues: HandheldJoystickCue[] = [
  {start: shifted(5.28), end: shifted(6.02), x: -1, y: 0},
  {start: shifted(6.08), end: shifted(6.34), x: 0.82, y: -0.58},
  {start: shifted(6.36), end: shifted(7.06), x: 1, y: 0},
  {start: shifted(9.55), end: shifted(9.9), x: 0.78, y: -0.48},
  {start: shifted(9.82), end: shifted(11.12), x: 1, y: 0},
  {start: shifted(11.38), end: shifted(12), x: -1, y: 0},
];

export const HANDHELD_ONLY_AUDIO_CUES = {
  enter: 4,
  bDash: Math.round(shifted(6.14) * 30),
  aHold: Math.round(shifted(7) * 30),
} as const;

export const HandheldOnly: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const duration = SHOTS.handheld.duration;
  const enter = interpolate(frame, [0, 28], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const copy = interpolate(frame, [10, 34], [0, 1], clamp);
  const exit = interpolate(frame, [duration - 12, duration], [1, 0], clamp);
  const push = interpolate(frame, [0, duration], [1, 1.045], clamp);

  return (
    <GridBackground accent="cyan">
      <AbsoluteFill style={{fontFamily: FONT, opacity: exit}}>
        <div
          style={{
            position: 'absolute',
            left: 138,
            top: 312,
            width: 720,
            opacity: copy,
            transform: `translateX(${(1 - copy) * -30}px)`,
          }}
        >
          <div style={{color: COLORS.cyan, fontFamily: MONO, fontSize: 21, fontWeight: 800}}>
            DSGO / HANDHELD
          </div>
          <div style={{marginTop: 22, fontSize: 94, lineHeight: 1.12, fontWeight: 900}}>
            掌机
            <span style={{color: COLORS.cyan}}>也能玩</span>
          </div>
          <div style={{marginTop: 34, color: 'rgba(255,255,255,0.62)', fontSize: 31, fontWeight: 700}}>
            支持实体按键，操作反馈更直接
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            right: 110,
            top: 75,
            width: 620,
            height: 930,
            opacity: enter,
            transform: `translateY(${(1 - enter) * 46}px) scale(${(0.98 + enter * 0.1) * push})`,
            transformOrigin: '50% 30%',
            filter: 'drop-shadow(0 38px 48px rgba(0,0,0,0.62)) drop-shadow(0 0 24px rgba(85,216,208,0.12))',
          }}
        >
          <HandheldStudioPlayer
            video="游戏视频1.mp4"
            width={620}
            trimBefore={Math.round(GAMEPLAY_TRIM_SECONDS * fps)}
            objectFit="cover"
            controlCues={controlCues}
            joystickCues={joystickCues}
            loop={false}
          />
        </div>
      </AbsoluteFill>
    </GridBackground>
  );
};

import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {GridBackground} from '../components/SceneBase';
import {PhoneShell} from '../components/PhoneShell';
import {enter, sceneOpacity} from '../motion';
import {COLORS, FONT} from '../theme';
import {SHOTS} from '../timeline';

export const Play: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const duration = SHOTS.play.duration;
  const opacity = sceneOpacity(frame, duration, 12);
  const phoneIn = enter(frame, 6, 26);
  const gameSwitch = interpolate(frame, [158, 176], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const playPulse = interpolate(frame, [170, 186, 205], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <GridBackground accent="cyan">
      <AbsoluteFill style={{opacity}}>
        <div style={{position: 'absolute', left: 152, top: 338, width: 880, fontFamily: FONT}}>
          <div style={{fontSize: 104, lineHeight: 1.13, fontWeight: 900}}>
            点开作品<br />
            <span style={{color: COLORS.cyan}}>立即开玩</span>
          </div>
        </div>

        <div style={{position: 'absolute', right: 176, top: 66, width: 420, height: 938, opacity: phoneIn, transform: `translateX(${(1 - phoneIn) * 260}px) scale(${0.95 + phoneIn * 0.05})`}}>
          <Sequence durationInFrames={duration} premountFor={fps}>
            <div style={{position: 'absolute', opacity: 1 - gameSwitch}}>
              <PhoneShell video="刷游戏点击进入游戏视频.mp4" trimBefore={10 * fps} />
            </div>
          </Sequence>
          <Sequence from={150} durationInFrames={duration - 150} premountFor={fps}>
            <div style={{position: 'absolute', opacity: gameSwitch}}>
              <PhoneShell video="游戏视频.mp4" trimBefore={2 * fps} borderColor={COLORS.cyan} />
            </div>
          </Sequence>
          <div style={{position: 'absolute', left: '50%', top: '45%', width: 150 + playPulse * 80, height: 150 + playPulse * 80, borderRadius: '50%', border: `3px solid ${COLORS.yellow}`, opacity: playPulse * 0.75, transform: 'translate(-50%,-50%)'}} />
        </div>
      </AbsoluteFill>
    </GridBackground>
  );
};

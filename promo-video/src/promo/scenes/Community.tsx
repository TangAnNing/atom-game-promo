import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {GridBackground} from '../components/SceneBase';
import {PhoneShell} from '../components/PhoneShell';
import {enter} from '../motion';
import {COLORS, FONT} from '../theme';
import {SHOTS} from '../timeline';

export const Community: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const duration = SHOTS.community.duration;
  const opacity = interpolate(frame, [0, 5], [0.08, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const phoneIn = enter(frame, 6, 28);
  const second = interpolate(frame, [146, 162], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <GridBackground accent="coral">
      <AbsoluteFill style={{opacity}}>
        <Img
          src={staticFile('media/社区页面.jpg')}
          style={{position: 'absolute', left: 36, top: 104, width: 900, height: 900, objectFit: 'cover', opacity: 0.12, filter: 'saturate(0.65)'}}
        />
        <div style={{position: 'absolute', left: 174, top: 76, width: 420, height: 938, opacity: phoneIn, transform: `translateX(${(1 - phoneIn) * -220}px)`}}>
          <Sequence durationInFrames={duration} premountFor={fps}>
            <div style={{position: 'absolute', opacity: 1 - second}}>
              <PhoneShell video="查看评论.mp4" borderColor={COLORS.coral} />
            </div>
          </Sequence>
          <Sequence from={138} durationInFrames={duration - 138} premountFor={fps}>
            <div style={{position: 'absolute', opacity: second}}>
              <PhoneShell video="消息页面.mp4" borderColor={COLORS.coral} />
            </div>
          </Sequence>
        </div>
        <div style={{position: 'absolute', left: 860, top: 300, width: 880, fontFamily: FONT}}>
          <div style={{fontSize: 87, lineHeight: 1.16, fontWeight: 900}}>
            每一次反馈<br />
            <span style={{color: COLORS.yellow}}>都让作品继续生长</span>
          </div>
          <div style={{marginTop: 48, color: 'rgba(255,255,255,0.62)', fontSize: 30, fontWeight: 700}}>
            评论、消息与持续反馈，连接作者和玩家
          </div>
        </div>
      </AbsoluteFill>
    </GridBackground>
  );
};

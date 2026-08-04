import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {GridBackground} from '../components/SceneBase';
import {FeedGhost, PhoneShell} from '../components/PhoneShell';
import {enter} from '../motion';
import {COLORS, FONT} from '../theme';
import {SHOTS} from '../timeline';

export const Discover: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SHOTS.discover.duration;
  const phoneIn = enter(frame, 0, 22);
  const copyIn = enter(frame, 3, 24);
  const floatY = Math.sin(Math.max(0, frame - 38) / 34) * 4;
  const railProgress = interpolate(frame, [38, 168], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const handoff = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const exit = interpolate(frame, [duration - 8, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <GridBackground accent="yellow">
      <AbsoluteFill style={{opacity: 1 - exit * 0.92}}>
        <div
          style={{
            position: 'absolute',
            left: 144,
            top: 290,
            width: 930,
            opacity: copyIn,
            transform: `translateY(${(1 - copyIn) * 38}px)`,
            fontFamily: FONT,
          }}
        >
          <div style={{fontSize: 104, lineHeight: 1.12, fontWeight: 900}}>
            像刷视频一样<br />
            <span style={{color: COLORS.yellow}}>发现游戏</span>
          </div>
          <div
            style={{
              marginTop: 44,
              color: 'rgba(255,255,255,0.64)',
              fontSize: 31,
              fontWeight: 700,
            }}
          >
            在内容流中发现，无需下载即可体验
          </div>
        </div>

        <div style={{position: 'absolute', right: 104, top: 74, width: 690, height: 930, border: `1px solid ${COLORS.yellow}2e`, borderRadius: '50%', transform: 'rotate(-8deg)', background: `radial-gradient(ellipse at center, ${COLORS.yellow}20, ${COLORS.yellow}06 52%, transparent 74%)`}} />
        <div style={{position: 'absolute', right: 326, top: 154, transform: 'rotate(-8deg) scale(0.92)', transformOrigin: 'center'}}>
          <FeedGhost image="刷游戏2.jpg" opacity={0.34 * phoneIn} />
        </div>
        <div style={{position: 'absolute', right: 48, top: 140, transform: 'rotate(9deg) scale(0.9)', transformOrigin: 'center'}}>
          <FeedGhost image="刷游戏3.jpg" opacity={0.27 * phoneIn} />
        </div>
        <div
          style={{
            position: 'absolute',
            right: 166,
            top: 62,
            transform: `translateX(${(1 - phoneIn) * 330}px) translateY(${floatY}px) scale(${0.93 + phoneIn * 0.07})`,
            opacity: phoneIn,
          }}
        >
          <PhoneShell video="首页连续刷游戏-流畅1.2x.mp4" />
        </div>

        <div
          style={{
            position: 'absolute',
            left: 1540,
            top: 520,
            zIndex: 20,
            width: interpolate(handoff, [0, 1], [14, 470]),
            height: interpolate(handoff, [0, 1], [14, 470]),
            border: `${interpolate(handoff, [0, 1], [0, 3])}px solid rgba(245,187,25,${1 - handoff})`,
            borderRadius: '50%',
            background: `rgba(245,187,25,${interpolate(handoff, [0, 0.18, 1], [1, 0.16, 0])})`,
            boxShadow: `0 0 ${interpolate(handoff, [0, 1], [38, 72])}px rgba(245,187,25,${(1 - handoff) * 0.52})`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        <div style={{position: 'absolute', right: 654, top: 196}}>
          <div style={{width: 1, height: 270, background: 'rgba(255,255,255,0.08)', overflow: 'hidden'}}>
            <div style={{width: 1, height: 100, background: `linear-gradient(transparent, ${COLORS.yellow}, transparent)`, transform: `translateY(${railProgress * 260 - 90}px)`}} />
          </div>
        </div>
      </AbsoluteFill>
    </GridBackground>
  );
};

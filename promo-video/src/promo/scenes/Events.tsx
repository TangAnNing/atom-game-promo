import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import {GridBackground} from '../components/SceneBase';
import {MirroredEventShowcase} from '../components/MirroredEventShowcase';
import {PageWaterfallWall} from '../components/PageWaterfallWall';
import {enter} from '../motion';
import {COLORS, FONT} from '../theme';
import {SHOTS} from '../timeline';

export const Events: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SHOTS.events.duration;
  const copyIn = enter(frame, 2, 24);
  const panelIn = enter(frame, 14, 32);
  const wallStart = 118;
  const transition = interpolate(frame, [94, 138], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const wallFrame = Math.max(0, frame - wallStart);
  const wallMotionDuration = duration - wallStart - 38;
  const wallCopy = interpolate(wallFrame, [0, 20, 86, 116], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const exit = interpolate(frame, [duration - 8, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <GridBackground accent="coral">
      <AbsoluteFill style={{opacity: 1 - exit * 0.9}}>
        <AbsoluteFill
          style={{
            opacity: 1 - transition,
            transform: `translateX(${-transition * 90}px) scale(${1 - transition * 0.035})`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 108,
              top: 252,
              width: 650,
              fontFamily: FONT,
              opacity: copyIn,
              transform: `translateY(${(1 - copyIn) * 28}px)`,
            }}
          >
            <div style={{color: COLORS.coral, fontSize: 23, fontWeight: 900}}>赛事与社区</div>
            <div style={{marginTop: 20, fontSize: 80, lineHeight: 1.18, fontWeight: 900}}>
              以赛事连接<br />
              <span style={{color: COLORS.yellow}}>创作者与社区</span>
            </div>
            <div style={{marginTop: 36, color: 'rgba(255,255,255,0.66)', fontSize: 28, fontWeight: 700}}>
              展示、交流与反馈，让作品走向更多玩家
            </div>
          </div>

          <MirroredEventShowcase progress={panelIn} />
        </AbsoluteFill>

        <AbsoluteFill
          style={{
            opacity: interpolate(transition, [0.42, 1], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `scale(${1.035 - transition * 0.035})`,
          }}
        >
          <PageWaterfallWall frame={wallFrame} durationInFrames={wallMotionDuration} />
        </AbsoluteFill>

        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 820,
            height: 1080,
            opacity: wallCopy,
            background:
              'linear-gradient(90deg, rgba(16,16,20,0.9) 0%, rgba(16,16,20,0.7) 52%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 72,
            top: 350,
            width: 700,
            fontFamily: FONT,
            opacity: wallCopy,
            transform: `translateY(${(1 - wallCopy) * 18}px)`,
            textShadow: '0 6px 24px rgba(0,0,0,0.72)',
            pointerEvents: 'none',
          }}
        >
          <div style={{fontSize: 62, lineHeight: 1.15, fontWeight: 900}}>
            <span style={{color: COLORS.white}}>更多作品</span>
            <span style={{color: COLORS.yellow}}>持续涌现</span>
          </div>
          <div
            style={{
              marginTop: 24,
              color: 'rgba(255,255,255,0.68)',
              fontSize: 27,
              fontWeight: 700,
            }}
          >
            从赛事展示，走向持续交流与连接
          </div>
        </div>
      </AbsoluteFill>
    </GridBackground>
  );
};

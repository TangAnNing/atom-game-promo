import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {enter} from '../motion';
import {COLORS, FONT} from '../theme';
import {SHOTS} from '../timeline';

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const curvePoint = (progress: number) => {
  const start = {x: 960, y: 860};
  const control = {x: 1010, y: 505};
  const end = {x: 1172, y: 307};
  const inverse = 1 - progress;

  return {
    x: inverse * inverse * start.x + 2 * inverse * progress * control.x + progress * progress * end.x,
    y: inverse * inverse * start.y + 2 * inverse * progress * control.y + progress * progress * end.y,
  };
};

export const DoraCore: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SHOTS.dora.duration;
  const travel = interpolate(frame, [0, 23], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
  const point = curvePoint(travel);
  const reveal = interpolate(frame, [18, 43], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.2, 0.82, 0.24, 1),
  });
  const ring = interpolate(frame, [20, 42], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const arrivalDotOut = interpolate(frame, [23, 37], [0, 1], clamp);
  const copyIn = enter(frame, 38, 22);
  const titleIn = enter(frame, 43, 20);
  const descriptionIn = enter(frame, 64, 18);
  const sweep = interpolate(frame, [55, 73], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.quad),
  });
  const sweepPercent = sweep * 100;
  const sweepHead = interpolate(frame, [72, 82], [1, 0], clamp);
  const sweepGlow = interpolate(frame, [55, 66, 82], [0, 0.6, 0], clamp);
  const ruleIn = enter(frame, 73, 18);
  const exit = interpolate(frame, [142, duration], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const exitPoint = {
    x: interpolate(exit, [0, 1], [1172, 1700]),
    y: interpolate(exit, [0, 1], [307, 676]),
  };
  const haloIn = interpolate(frame, [15, 46], [0, 1], clamp);
  const handoffLine = interpolate(exit, [0, 0.35, 1], [0, 1, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        background: COLORS.ink,
        color: COLORS.white,
        fontFamily: FONT,
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '58px 58px',
          maskImage: 'radial-gradient(circle at 50% 62%, #000, transparent 78%)',
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 69% 42%, ${COLORS.yellow}22, transparent 31%)`,
          opacity: haloIn * (1 - exit * 0.55),
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 150,
          top: 282,
          width: 790,
          opacity: 1 - exit,
          transform: `translateX(${(1 - copyIn) * -34 - exit * 46}px)`,
        }}
      >
        <div style={{color: COLORS.yellow, fontSize: 27, fontWeight: 900, opacity: copyIn}}>
          原子游创的创作引擎
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 118,
            lineHeight: 1,
            fontWeight: 900,
            opacity: titleIn,
            transform: `translateY(${(1 - titleIn) * 18}px) scale(${0.95 + titleIn * 0.05})`,
            transformOrigin: 'left bottom',
            filter: `blur(${(1 - titleIn) * 5}px)`,
          }}
        >
          Dora{' '}
          <span
            style={{
              position: 'relative',
              display: 'inline-block',
              color: 'rgba(245,187,25,0.24)',
            }}
          >
            SSR
            <span
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(96deg, ${COLORS.yellow} 0%, #ffd95b 48%, ${COLORS.coral} 100%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                clipPath: `inset(-18% ${100 - sweepPercent}% -18% 0)`,
              }}
            >
              SSR
            </span>
            <span
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(96deg, ${COLORS.yellow}, #fff4bb 52%, ${COLORS.coral})`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                clipPath: `inset(-24% ${Math.max(0, 100 - sweepPercent)}% -24% ${Math.max(0, sweepPercent - 13)}%)`,
                filter: 'blur(2px) brightness(1.35)',
                opacity: sweepHead,
                textShadow: `0 0 18px rgba(255,222,115,${sweepGlow})`,
              }}
            >
              SSR
            </span>
            <span
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(96deg, ${COLORS.yellow}, ${COLORS.coral})`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                clipPath: `inset(-22% ${100 - sweepPercent}% -22% 0)`,
                filter: 'blur(15px)',
                opacity: sweepGlow,
              }}
            >
              SSR
            </span>
          </span>
        </div>
        <div
          style={{
            marginTop: 38,
            color: 'rgba(255,255,255,0.64)',
            fontSize: 29,
            fontWeight: 700,
            opacity: descriptionIn,
            transform: `translateY(${(1 - descriptionIn) * 12}px)`,
          }}
        >
          多语言编码智能体，驱动游戏创作与开源协作
        </div>
        <div
          style={{
            width: 230,
            height: 6,
            marginTop: 42,
            background: `linear-gradient(90deg, ${COLORS.yellow}, ${COLORS.coral})`,
            transform: `scaleX(${ruleIn})`,
            transformOrigin: 'left center',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 1060,
          top: 176,
          width: 520,
          height: 520,
          opacity: reveal * (1 - exit),
          transform: `translateY(${(1 - reveal) * 34}px) scale(${0.88 + reveal * 0.12 - exit * 0.045})`,
          filter: `blur(${(1 - reveal) * 8}px) drop-shadow(0 40px 72px rgba(0,0,0,0.55)) drop-shadow(0 0 34px rgba(245,187,25,0.18))`,
        }}
      >
        <Img
          src={staticFile('media/dorassr-logo.png')}
          style={{width: '100%', height: '100%', objectFit: 'contain'}}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 1172,
          top: 307,
          width: interpolate(ring, [0, 1], [28, 290]),
          height: interpolate(ring, [0, 1], [28, 290]),
          border: `2px solid rgba(245,187,25,${(1 - ring) * 0.78})`,
          borderRadius: '50%',
          boxShadow: `0 0 ${interpolate(ring, [0, 1], [22, 54])}px rgba(245,187,25,${(1 - ring) * 0.34})`,
          opacity: frame >= 19 && frame <= 44 ? 1 : 0,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {frame < 40 ? (
        <div
          style={{
            position: 'absolute',
            left: point.x,
            top: point.y,
            width: interpolate(travel, [0, 1], [24, 16]),
            height: interpolate(travel, [0, 1], [24, 16]),
            borderRadius: '50%',
            background: COLORS.yellow,
            boxShadow: `0 0 0 ${interpolate(travel, [0, 1], [12, 5])}px ${COLORS.yellow}18, 0 0 46px ${COLORS.yellow}cc`,
            opacity: 1 - arrivalDotOut,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : null}

      {exit > 0 ? (
        <div
          style={{
            position: 'absolute',
            left: exitPoint.x,
            top: exitPoint.y,
            width: interpolate(exit, [0, 1], [16, 14]),
            height: interpolate(exit, [0, 1], [16, 14]),
            borderRadius: '50%',
            background: COLORS.yellow,
            boxShadow: `0 0 ${interpolate(exit, [0, 1], [34, 46])}px ${COLORS.yellow}cc`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : null}

      <div
        style={{
          position: 'absolute',
          left: 150,
          top: 674,
          width: 1620,
          height: 4,
          background: `linear-gradient(90deg, ${COLORS.yellow}, ${COLORS.coral} 45%, ${COLORS.cyan})`,
          opacity: handoffLine,
          transform: `scaleX(${exit})`,
          transformOrigin: 'right center',
          boxShadow: `0 0 24px rgba(85,216,208,${handoffLine * 0.28})`,
        }}
      />
    </AbsoluteFill>
  );
};

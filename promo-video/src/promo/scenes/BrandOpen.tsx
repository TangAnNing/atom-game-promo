import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {enter, sceneOpacity} from '../motion';
import {COLORS, FONT} from '../theme';
import {SHOTS} from '../timeline';

const WORDMARK = '原子游创'.split('');

export const BrandOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SHOTS.brand.duration;
  const orbitIn = enter(frame, 6, 34);
  const logoIn = enter(frame, 20, 28);
  const copyIn = enter(frame, 34, 26);
  const rule = enter(frame, 68, 20);
  const fade = sceneOpacity(frame, duration, 10);
  const orbitRotation = interpolate(frame, [0, duration], [-8, 11]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        color: COLORS.white,
        fontFamily: FONT,
        opacity: fade,
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '58px 58px',
          maskImage: 'linear-gradient(90deg, #000, transparent 78%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 160,
          top: 286,
          width: 940,
          transform: `translateY(${(1 - copyIn) * 36}px)`,
          opacity: copyIn,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            fontSize: 144,
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          {WORDMARK.map((char, index) => {
            const charIn = interpolate(frame, [24 + index * 5, 42 + index * 5], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.75, 0.3, 1),
            });
            return (
              <span
                key={char}
                style={{
                  display: 'inline-block',
                  opacity: charIn,
                  transform: `scale(${1.55 - charIn * 0.55})`,
                  transformOrigin: 'center bottom',
                  filter: `blur(${(1 - charIn) * 7}px)`,
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
        <div style={{marginTop: 38, fontSize: 46, fontWeight: 800, color: 'rgba(255,255,255,0.82)'}}>
          <span style={{color: COLORS.cyan}}>AI</span>{' '}
          <span style={{color: COLORS.coral}}>开源</span>{' '}
          <span style={{color: COLORS.yellow}}>游戏</span>{' '}
          <span>共创平台</span>
        </div>
        <div
          style={{
            width: 166,
            height: 8,
            marginTop: 42,
            background: `linear-gradient(90deg, ${COLORS.yellow}, ${COLORS.cyan})`,
            transform: `scaleX(${rule})`,
            transformOrigin: 'left center',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          right: 100,
          top: 150,
          width: 760,
          height: 760,
          opacity: orbitIn,
          transform: `rotate(${orbitRotation}deg) scale(${0.92 + orbitIn * 0.08})`,
        }}
      >
        {[{w: 690, h: 250, r: 16, c: COLORS.yellow}, {w: 640, h: 280, r: 72, c: COLORS.coral}, {w: 620, h: 270, r: -48, c: COLORS.cyan}].map((o, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: o.w,
              height: o.h,
              border: `2px solid ${o.c}44`,
              borderRadius: '50%',
              transform: `translate(-50%,-50%) rotate(${o.r}deg)`,
            }}
          />
        ))}
        <Img
          src={staticFile('media/atom-game-logo-original.png')}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 320,
            height: 320,
            objectFit: 'contain',
            opacity: logoIn,
            transform: `translate(-50%,-50%) scale(${0.78 + logoIn * 0.22})`,
            filter: 'drop-shadow(0 30px 46px rgba(0,0,0,0.46))',
          }}
        />
        {[
          {left: 642, top: 205, color: COLORS.yellow},
          {left: 125, top: 600, color: COLORS.cyan},
          {left: 282, top: 92, color: COLORS.coral},
        ].map((dot, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: dot.left,
              top: dot.top,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: dot.color,
              boxShadow: `0 0 30px ${dot.color}cc`,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

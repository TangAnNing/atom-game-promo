import {Video} from '@remotion/media';
import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
} from 'remotion';
import {FPS} from './timeline';
import {COLORS, DISPLAY_FONT, FONT, MONO} from './theme';

export const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

export const enter = (frame: number, from: number, duration = 20) =>
  interpolate(frame, [from, from + duration], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

export const fadeOut = (frame: number, duration: number, frames = 10) =>
  interpolate(frame, [duration - frames, duration], [1, 0], clamp);

export const Stage: React.FC<{
  children: React.ReactNode;
  accent?: 'yellow' | 'cyan';
  style?: React.CSSProperties;
}> = ({children, accent = 'yellow', style}) => {
  const color = accent === 'yellow' ? COLORS.yellow : COLORS.cyan;
  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        backgroundColor: COLORS.ink,
        backgroundImage: [
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          `radial-gradient(circle at 76% 48%, ${color}22, transparent 31%)`,
        ].join(','),
        backgroundSize: '58px 58px, 58px 58px, auto',
        color: COLORS.white,
        fontFamily: FONT,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const DsgoIcon: React.FC<{size: number; style?: React.CSSProperties}> = ({
  size,
  style,
}) => (
  <Img
    src={staticFile('media/dsgo-segment/dsgo-icon.jpg')}
    style={{
      width: size,
      height: size,
      borderRadius: Math.round(size * 0.2),
      objectFit: 'cover',
      boxShadow: '0 30px 80px rgba(0,0,0,0.42)',
      ...style,
    }}
  />
);

export const DsgoWordmark: React.FC<{
  frame: number;
  from?: number;
  size?: number;
  align?: 'left' | 'center';
}> = ({frame, from = 0, size = 154, align = 'left'}) => (
  <div
    style={{
      display: 'flex',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      alignItems: 'flex-end',
      fontFamily: DISPLAY_FONT,
      fontSize: size,
      lineHeight: 0.88,
      letterSpacing: 6,
      fontStyle: 'italic',
      color: COLORS.yellow,
      WebkitTextStroke: '3px #0d0f0e',
      filter: 'drop-shadow(8px 10px 0 rgba(85,216,208,0.55))',
    }}
  >
    {'DSGO'.split('').map((character, index) => {
      const progress = interpolate(
        frame,
        [from + index * 5, from + index * 5 + 14],
        [0, 1],
        {
          ...clamp,
          easing: Easing.bezier(0.2, 0.78, 0.24, 1),
        },
      );
      return (
        <span
          key={character}
          style={{
            display: 'inline-block',
            opacity: progress,
            transform: `scale(${1.65 - progress * 0.65}) translateY(${(1 - progress) * -18}px)`,
            filter: `blur(${(1 - progress) * 10}px)`,
          }}
        >
          {character}
        </span>
      );
    })}
  </div>
);

export const Eyebrow: React.FC<{children: React.ReactNode; color?: string}> = ({
  children,
  color = COLORS.yellow,
}) => (
  <div
    style={{
      color,
      fontFamily: MONO,
      fontSize: 20,
      fontWeight: 800,
      letterSpacing: 0,
    }}
  >
    {children}
  </div>
);

export const PhoneDevice: React.FC<{
  trimBeforeSeconds: number;
  playbackRate?: number;
  width?: number;
  accent?: string;
  style?: React.CSSProperties;
}> = ({
  trimBeforeSeconds,
  playbackRate = 1,
  width = 430,
  accent = COLORS.yellow,
  style,
}) => {
  const height = width / 0.45;
  return (
    <div
      style={{
        position: 'absolute',
        width,
        height,
        padding: 12,
        boxSizing: 'border-box',
        borderRadius: 60,
        background: '#090a09',
        border: `2px solid ${accent}99`,
        boxShadow: `0 38px 92px rgba(0,0,0,0.6), 0 0 44px ${accent}1f`,
        overflow: 'hidden',
        ...style,
      }}
    >
      <Video
        src={staticFile('media/dsgo-segment/phone-feed.mp4')}
        trimBefore={Math.round(trimBeforeSeconds * FPS)}
        playbackRate={playbackRate}
        muted
        objectFit="cover"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 48,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 18,
          width: 116,
          height: 28,
          borderRadius: 20,
          background: '#080908',
          transform: 'translateX(-50%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.28)',
        }}
      />
    </div>
  );
};

export const PixelField: React.FC<{progress: number}> = ({progress}) => {
  const pixels = [
    {x: 245, y: 220, size: 24, color: COLORS.yellow},
    {x: 1540, y: 250, size: 18, color: COLORS.cyan},
    {x: 1750, y: 730, size: 30, color: COLORS.coral},
    {x: 280, y: 820, size: 16, color: COLORS.cyan},
    {x: 1450, y: 860, size: 20, color: COLORS.yellow},
    {x: 520, y: 175, size: 12, color: COLORS.coral},
  ];
  return (
    <>
      {pixels.map((pixel, index) => (
        <div
          key={`${pixel.x}-${pixel.y}`}
          style={{
            position: 'absolute',
            left: pixel.x,
            top: pixel.y,
            width: pixel.size,
            height: pixel.size,
            background: pixel.color,
            opacity: progress * (0.32 + index * 0.06),
            transform: `translateY(${(1 - progress) * (index % 2 === 0 ? 80 : -80)}px) rotate(${index * 12}deg)`,
            boxShadow: `0 0 24px ${pixel.color}55`,
          }}
        />
      ))}
    </>
  );
};

export const DoraVideo: React.FC<{
  trimBeforeSeconds: number;
  playbackRate?: number;
  style?: React.CSSProperties;
}> = ({trimBeforeSeconds, playbackRate = 1, style}) => (
  <Video
    src={staticFile('media/dsgo-segment/dora-create-1080p.mp4')}
    trimBefore={Math.round(trimBeforeSeconds * FPS)}
    playbackRate={playbackRate}
    muted
    objectFit="cover"
    style={{width: '100%', height: '100%', ...style}}
  />
);

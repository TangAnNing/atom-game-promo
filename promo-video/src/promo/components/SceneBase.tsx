import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS, FONT, MONO} from '../theme';

export const GridBackground: React.FC<{
  accent?: 'yellow' | 'cyan' | 'coral';
  children?: React.ReactNode;
}> = ({accent = 'yellow', children}) => {
  const accentColor = COLORS[accent];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        backgroundImage: [
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          `radial-gradient(circle at 76% 48%, ${accentColor}22, transparent 31%)`,
        ].join(','),
        backgroundSize: '58px 58px, 58px 58px, auto',
        color: COLORS.white,
        fontFamily: FONT,
        overflow: 'hidden',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const CornerLabel: React.FC<{
  children: React.ReactNode;
  accent?: string;
}> = ({children, accent = COLORS.yellow}) => (
  <div
    style={{
      position: 'absolute',
      top: 62,
      left: 76,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      color: 'rgba(255,255,255,0.7)',
      fontSize: 18,
      fontWeight: 800,
      fontFamily: FONT,
    }}
  >
    <span
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: accent,
        boxShadow: `0 0 0 7px ${accent}22`,
      }}
    />
    {children}
  </div>
);

export const ShotIndex: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div
    style={{
      position: 'absolute',
      right: 74,
      bottom: 58,
      color: 'rgba(255,255,255,0.45)',
      fontFamily: MONO,
      fontSize: 17,
      fontWeight: 700,
    }}
  >
    {children}
  </div>
);

export const Kicker: React.FC<{
  children: React.ReactNode;
  color?: string;
}> = ({children, color = COLORS.cyan}) => (
  <div
    style={{
      marginBottom: 24,
      color,
      fontSize: 25,
      fontWeight: 900,
      fontFamily: FONT,
    }}
  >
    {children}
  </div>
);

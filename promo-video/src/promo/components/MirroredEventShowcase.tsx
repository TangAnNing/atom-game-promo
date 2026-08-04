import React from 'react';
import {Easing, Img, interpolate, staticFile} from 'remotion';
import {COLORS} from '../theme';

const EventCard: React.FC<{
  file: string;
  width: number;
  height: number;
  dim?: number;
}> = ({file, width, height, dim = 0}) => (
  <div
    style={{
      position: 'relative',
      width,
      height,
      overflow: 'hidden',
      border: `3px solid ${COLORS.coral}77`,
      borderRadius: 8,
      background: '#101211',
      boxShadow: '0 34px 76px rgba(0,0,0,0.55)',
      backfaceVisibility: 'hidden',
    }}
  >
    <Img
      src={staticFile(`media/${file}`)}
      style={{width: '100%', height: '100%', objectFit: 'cover'}}
    />
    {dim > 0 ? (
      <div style={{position: 'absolute', inset: 0, background: `rgba(10,12,12,${dim})`}} />
    ) : null}
  </div>
);

export const MirroredEventShowcase: React.FC<{progress: number}> = ({progress}) => {
  const sideIn = Easing.out(Easing.cubic)(progress);
  const centerIn = interpolate(progress, [0.18, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: 'absolute',
        right: 28,
        top: 130,
        width: 1120,
        height: 640,
        perspective: '1400px',
        transformStyle: 'preserve-3d',
        opacity: sideIn,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 190,
          zIndex: 1,
          transform: `translateX(${150 * (1 - sideIn)}px) translateZ(-120px) rotateY(${18 * sideIn}deg) scale(${0.94 + sideIn * 0.06})`,
          transformOrigin: '100% 50%',
        }}
      >
        <EventCard file="赛事日历.png" width={650} height={354} dim={0.34} />
      </div>

      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 190,
          zIndex: 1,
          transform: `translateX(${-150 * (1 - sideIn)}px) translateZ(-120px) rotateY(${-18 * sideIn}deg) scale(${0.94 + sideIn * 0.06})`,
          transformOrigin: '0% 50%',
        }}
      >
        <EventCard file="赛事奖励.png" width={650} height={354} dim={0.34} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 200,
          top: 150,
          zIndex: 3,
          transform: `translateY(${24 * (1 - centerIn)}px) translateZ(36px) scale(${0.95 + centerIn * 0.05})`,
          opacity: centerIn,
        }}
      >
        <EventCard file="大赛介绍.png" width={720} height={390} />
      </div>
    </div>
  );
};

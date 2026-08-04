import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';

export type TickerColumn = {
  items: React.ReactNode[];
  durationInSeconds: number;
  direction: -1 | 1;
};

type VerticalTickerProps = {
  columns: TickerColumn[];
  backgroundColor?: string;
  maskHeight?: number;
  tiltDeg?: number;
  perspective?: number;
  scale?: number;
  columnWidth?: number;
  gap?: number;
  frameOverride?: number;
};

export const VerticalTicker: React.FC<VerticalTickerProps> = ({
  columns,
  backgroundColor = '#000',
  maskHeight = 200,
  tiltDeg = 20,
  perspective = 1000,
  scale = 1.2,
  columnWidth = 400,
  gap = 30,
  frameOverride,
}) => (
  <AbsoluteFill style={{backgroundColor, overflow: 'hidden'}}>
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap,
        transform: `perspective(${perspective}px) rotateX(${tiltDeg}deg) scale(${scale})`,
        transformOrigin: 'center center',
      }}
    >
      {columns.map((column, index) => (
        <Column
          key={index}
          {...column}
          width={columnWidth}
          gap={gap}
          frameOverride={frameOverride}
        />
      ))}
    </div>
    <div
      style={{
        position: 'absolute',
        inset: `0 0 auto 0`,
        height: maskHeight,
        background: `linear-gradient(to bottom, ${backgroundColor}, transparent)`,
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: `auto 0 0 0`,
        height: maskHeight,
        background: `linear-gradient(to top, ${backgroundColor}, transparent)`,
      }}
    />
  </AbsoluteFill>
);

const Column: React.FC<
  TickerColumn & {width: number; gap: number; frameOverride?: number}
> = ({
  items,
  durationInSeconds,
  direction,
  width,
  gap,
  frameOverride,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const loopFrames = durationInSeconds * fps;
  const motionFrame = frameOverride ?? frame;
  const progress = (motionFrame % loopFrames) / loopFrames;
  const translateY = direction === -1 ? progress * -50 : -50 + progress * 50;

  return (
    <div style={{width, height: '100%', display: 'flex', flexDirection: 'column'}}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          transform: `translateY(${translateY}%)`,
          willChange: 'transform',
        }}
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} style={{marginBottom: gap}}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

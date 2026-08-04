import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile} from 'remotion';
import {TickerColumn, VerticalTicker} from './VerticalTicker';

const BG = '#101014';

const shot = (file: string) => (
  <div
    style={{
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
      background: '#fff',
    }}
  >
    <Img
      src={staticFile(`media/${file}`)}
      style={{width: '100%', display: 'block'}}
    />
  </div>
);

const buildColumns = (): TickerColumn[] => [
  {
    items: ['展示1.jpg', '展示5.jpg', '展示9.jpg', '展示3.jpg', '展示11.jpg'].map(shot),
    durationInSeconds: 12,
    direction: -1,
  },
  {
    items: ['陈列2.png', '陈列6.png', '陈列3.png', '陈列5.png', '陈列1.png'].map(shot),
    durationInSeconds: 9,
    direction: 1,
  },
  {
    items: ['展示4.jpg', '展示8.jpg', '展示12.jpg', '展示6.jpg', '展示2.jpg'].map(shot),
    durationInSeconds: 14,
    direction: -1,
  },
];

export const PageWaterfallWall: React.FC<{
  frame: number;
  durationInFrames: number;
}> = ({frame, durationInFrames}) => {
  const push = interpolate(frame, [0, durationInFrames], [1, 1.06], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: BG}}>
      <AbsoluteFill style={{transform: `scale(${push})`}}>
        <VerticalTicker
          columns={buildColumns()}
          backgroundColor={BG}
          columnWidth={560}
          gap={30}
          frameOverride={frame}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

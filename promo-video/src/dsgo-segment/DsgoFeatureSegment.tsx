import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SegmentAudio} from './audio';
import {
  BrandScene,
  BridgeScene,
  CommunityScene,
  DetailScene,
  DiscoverScene,
  DoraBuildScene,
  DoraResultScene,
  OutroScene,
  PlayScene,
} from './scenes';
import {FPS, SHOTS} from './timeline';
import {COLORS} from './theme';

const scenes = [
  {shot: SHOTS.brand, component: BrandScene},
  {shot: SHOTS.discover, component: DiscoverScene},
  {shot: SHOTS.detail, component: DetailScene},
  {shot: SHOTS.play, component: PlayScene},
  {shot: SHOTS.community, component: CommunityScene},
  {shot: SHOTS.bridge, component: BridgeScene},
  {shot: SHOTS.dora, component: DoraBuildScene},
  {shot: SHOTS.result, component: DoraResultScene},
  {shot: SHOTS.outro, component: OutroScene},
] as const;

export const DsgoFeatureSegment: React.FC = () => (
  <AbsoluteFill style={{background: COLORS.ink}}>
    <SegmentAudio />
    {scenes.map(({shot, component: Scene}) => (
      <Sequence
        key={shot.from}
        from={shot.from}
        durationInFrames={shot.duration}
        premountFor={FPS}
      >
        <Scene />
      </Sequence>
    ))}
  </AbsoluteFill>
);

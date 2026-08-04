import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {BrandMorphOutroPreview} from './BrandMorphOutroPreview';
import {BrandOpen} from './scenes/BrandOpen';
import {Community} from './scenes/Community';
import {CreateEntry} from './scenes/CreateEntry';
import {Discover} from './scenes/Discover';
import {DoraCore} from './scenes/DoraCore';
import {Ecosystem} from './scenes/Ecosystem';
import {Events} from './scenes/Events';
import {HandheldPromoInsert} from './HandheldPromoInsert';
import {Positioning} from './scenes/Positioning';
import {PromoAudio} from './audio';
import {COLORS} from './theme';
import {FPS, SHOTS} from './timeline';

const scenes = [
  {shot: SHOTS.brand, component: BrandOpen},
  {shot: SHOTS.positioning, component: Positioning},
  {shot: SHOTS.dora, component: DoraCore},
  {shot: SHOTS.discover, component: Discover},
  {
    shot: SHOTS.play,
    component: () => <HandheldPromoInsert includeAudio={false} fadeScene />,
  },
  {shot: SHOTS.community, component: Community},
  {shot: SHOTS.create, component: CreateEntry},
  {shot: SHOTS.events, component: Events},
  {shot: SHOTS.ecosystem, component: Ecosystem},
  {
    shot: SHOTS.outro,
    component: () => <BrandMorphOutroPreview withAudio={false} />,
  },
] as const;

export const AtomGamePromo: React.FC = () => (
  <AbsoluteFill style={{background: COLORS.ink}}>
    <PromoAudio />
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

import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {
  BrandScene as DsgoBrandScene,
  CommunityScene,
  DetailScene,
  DiscoverScene,
  DoraBuildScene,
  DoraResultScene,
  PlayScene,
} from '../dsgo-segment/scenes';
import {BrandMorphOutroPreview} from './BrandMorphOutroPreview';
import {BrandOpen} from './scenes/BrandOpen';
import {CreateEntry} from './scenes/CreateEntry';
import {DoraAgent, DoraLanguages} from './scenes/DoraCapabilities';
import {DoraCore} from './scenes/DoraCore';
import {Ecosystem} from './scenes/Ecosystem';
import {Events} from './scenes/Events';
import {HandheldOnly} from './scenes/HandheldOnly';
import {Positioning} from './scenes/Positioning';
import {PromoAudio} from './audio';
import {COLORS} from './theme';
import {FPS, SHOTS} from './timeline';

const scenes = [
  {shot: SHOTS.brand, component: BrandOpen},
  {shot: SHOTS.positioning, component: Positioning},
  {shot: SHOTS.dora, component: DoraCore},
  {shot: SHOTS.doraLanguages, component: DoraLanguages},
  {shot: SHOTS.doraAgent, component: DoraAgent},
  {shot: SHOTS.doraBuild, component: () => <DoraBuildScene seamless />},
  {shot: SHOTS.doraResult, component: DoraResultScene},
  {shot: SHOTS.dsgoBrand, component: () => <DsgoBrandScene seamlessIcon />},
  {shot: SHOTS.discover, component: DiscoverScene},
  {shot: SHOTS.detail, component: DetailScene},
  {shot: SHOTS.play, component: PlayScene},
  {shot: SHOTS.handheld, component: HandheldOnly},
  {shot: SHOTS.create, component: CreateEntry},
  {shot: SHOTS.community, component: CommunityScene},
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

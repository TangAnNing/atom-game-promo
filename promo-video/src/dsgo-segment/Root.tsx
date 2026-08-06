import React from 'react';
import {Composition} from 'remotion';
import {DsgoFeatureSegment} from './DsgoFeatureSegment';
import {FPS, TOTAL_FRAMES} from './timeline';

export const DsgoSegmentRoot: React.FC = () => (
  <Composition
    id="DsgoFeatureSegment"
    component={DsgoFeatureSegment}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1920}
    height={1080}
  />
);


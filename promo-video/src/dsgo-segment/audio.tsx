import {Audio} from '@remotion/media';
import React from 'react';
import {Sequence, interpolate, staticFile} from 'remotion';
import {MUSIC_TRIM_FRAMES, SHOTS, TOTAL_FRAMES} from './timeline';

type Cue = {
  from: number;
  src: string;
  volume: number;
  durationInFrames?: number;
};

const CUES: Cue[] = [
  {from: SHOTS.brand.from + 8, src: 'transition-soft.mp3', volume: 0.24},
  {from: SHOTS.discover.from + 12, src: 'whoosh-big.mp3', volume: 0.26},
  {from: SHOTS.detail.from + 16, src: 'transition-snap.mp3', volume: 0.18},
  {from: SHOTS.play.from + 20, src: 'whoosh-fast.mp3', volume: 0.24},
  {from: SHOTS.community.from + 12, src: 'transition-soft.mp3', volume: 0.22},
  {from: SHOTS.bridge.from, src: 'transition-snap.mp3', volume: 0.3},
  {from: SHOTS.dora.from + 24, src: 'keyboard.mp3', volume: 0.15, durationInFrames: 64},
  {from: SHOTS.dora.from + 62, src: 'whoosh-fast.mp3', volume: 0.16},
  {from: SHOTS.result.from + 8, src: 'impact-cine.mp3', volume: 0.22},
  {from: SHOTS.result.from + 26, src: 'sparkle.mp3', volume: 0.12},
  {from: SHOTS.outro.from, src: 'riser-cine.mp3', volume: 0.22},
  {from: SHOTS.outro.from + 24, src: 'impact-cine.mp3', volume: 0.3},
  {from: SHOTS.outro.from + 62, src: 'sparkle.mp3', volume: 0.18},
];

export const SegmentAudio: React.FC = () => (
  <>
    <Audio
      src={staticFile('audio/house-vibez.mp3')}
      trimBefore={MUSIC_TRIM_FRAMES}
      volume={(frame) =>
        interpolate(
          frame,
          [0, 24, TOTAL_FRAMES - 42, TOTAL_FRAMES],
          [0, 0.31, 0.31, 0],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
        )
      }
    />
    {CUES.map((cue, index) => (
      <Sequence
        key={`${cue.src}-${cue.from}-${index}`}
        from={cue.from}
        durationInFrames={cue.durationInFrames}
        premountFor={30}
      >
        <Audio src={staticFile(`audio/${cue.src}`)} volume={cue.volume} />
      </Sequence>
    ))}
  </>
);


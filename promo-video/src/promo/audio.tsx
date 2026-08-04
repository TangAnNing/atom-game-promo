import {Audio} from '@remotion/media';
import React from 'react';
import {Sequence, interpolate, staticFile} from 'remotion';
import {HANDHELD_PROMO_AUDIO_CUES} from './HandheldPromoInsert';
import {SHOTS, TOTAL_FRAMES} from './timeline';

const BGM_TRIM_FRAMES = 11;

type SoundCue = {
  from: number;
  src: string;
  volume: number;
  durationInFrames?: number;
};

// All cues are relative to their scene so later timeline edits remain local.
const SFX: SoundCue[] = [
  {from: SHOTS.brand.from + 20, src: 'transition-soft.mp3', volume: 0.28},
  {from: SHOTS.positioning.from, src: 'whoosh-fast.mp3', volume: 0.24},
  {from: SHOTS.dora.from, src: 'transition-soft.mp3', volume: 0.26},
  {from: SHOTS.dora.from + 24, src: 'sparkle.mp3', volume: 0.12},
  {from: SHOTS.discover.from, src: 'whoosh-big.mp3', volume: 0.3},
  {from: SHOTS.play.from + HANDHELD_PROMO_AUDIO_CUES.phoneEnter, src: 'whoosh-fast.mp3', volume: 0.24},
  {from: SHOTS.play.from + HANDHELD_PROMO_AUDIO_CUES.deviceSwitch, src: 'whoosh-big.mp3', volume: 0.3},
  {from: SHOTS.play.from + HANDHELD_PROMO_AUDIO_CUES.bDash, src: 'transition-snap.mp3', volume: 0.16},
  {from: SHOTS.play.from + HANDHELD_PROMO_AUDIO_CUES.aHold, src: 'click-camera.mp3', volume: 0.18},
  {from: SHOTS.community.from + 6, src: 'transition-soft.mp3', volume: 0.24},
  {from: SHOTS.community.from + 146, src: 'whoosh-fast.mp3', volume: 0.22},
  {from: SHOTS.create.from + 8, src: 'transition-soft.mp3', volume: 0.24},
  {
    from: SHOTS.create.from + 46,
    src: 'keyboard.mp3',
    volume: 0.22,
    durationInFrames: 99,
  },
  {from: SHOTS.create.from + 140, src: 'sparkle.mp3', volume: 0.1},
  {from: SHOTS.events.from + 10, src: 'whoosh-big.mp3', volume: 0.28},
  {from: SHOTS.events.from + 104, src: 'whoosh-fast.mp3', volume: 0.28},
  {from: SHOTS.ecosystem.from + 10, src: 'transition-soft.mp3', volume: 0.24},
  {from: SHOTS.ecosystem.from + 86, src: 'swoosh-quick.mp3', volume: 0.18},
  {from: SHOTS.ecosystem.from + 174, src: 'swoosh-quick.mp3', volume: 0.18},
  {from: SHOTS.outro.from + 28, src: 'whoosh-big.mp3', volume: 0.26},
  {from: SHOTS.outro.from + 76, src: 'whoosh-fast.mp3', volume: 0.24},
  {from: SHOTS.outro.from + 96, src: 'transition-snap.mp3', volume: 0.34},
  {from: SHOTS.outro.from + 108, src: 'impact-cine.mp3', volume: 0.3},
  {from: SHOTS.outro.from + 120, src: 'sparkle.mp3', volume: 0.2},
];

export const PromoAudio: React.FC = () => (
  <>
    <Audio
      src={staticFile('audio/house-vibez.mp3')}
      trimBefore={BGM_TRIM_FRAMES}
      volume={(frame) =>
        interpolate(
          frame,
          [0, 30, TOTAL_FRAMES - 50, TOTAL_FRAMES],
          [0, 0.34, 0.34, 0],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
        )
      }
    />
    {SFX.map((cue, index) => (
      <Sequence
        key={`${cue.src}-${cue.from}-${index}`}
        from={cue.from}
        durationInFrames={cue.durationInFrames}
      >
        <Audio src={staticFile(`audio/${cue.src}`)} volume={cue.volume} />
      </Sequence>
    ))}
  </>
);

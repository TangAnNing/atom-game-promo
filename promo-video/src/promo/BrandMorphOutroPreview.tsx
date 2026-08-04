import {Audio, Video} from '@remotion/media';
import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {HandheldStudioPlayer} from './components/HandheldStudioPlayer';
import {COLORS, FONT} from './theme';
import {FPS} from './timeline';

export const BRAND_MORPH_OUTRO_DURATION_IN_FRAMES = 7 * FPS;

const WORDMARK = '原子游创'.split('');
const BRAND_REVEAL = 96;
const WORD_START = 120;

type SoundCue = {
  from: number;
  src: string;
  volume: number;
};

const SFX: SoundCue[] = [
  {from: 28, src: 'whoosh-big.mp3', volume: 0.26},
  {from: 76, src: 'whoosh-fast.mp3', volume: 0.24},
  {from: BRAND_REVEAL, src: 'transition-snap.mp3', volume: 0.34},
  {from: 108, src: 'impact-cine.mp3', volume: 0.3},
  {from: WORD_START, src: 'sparkle.mp3', volume: 0.2},
];

const PreviewAudio: React.FC = () => {
  const duration = BRAND_MORPH_OUTRO_DURATION_IN_FRAMES;

  return (
    <>
      <Audio
        src={staticFile('audio/house-vibez.mp3')}
        trimBefore={11}
        volume={(frame) =>
          interpolate(frame, [0, 20, duration - 28, duration], [0, 0.18, 0.18, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        }
      />
      {SFX.map((cue) => (
        <Sequence key={`${cue.src}-${cue.from}`} from={cue.from}>
          <Audio src={staticFile(`audio/${cue.src}`)} volume={cue.volume} />
        </Sequence>
      ))}
    </>
  );
};

type BrandMorphOutroPreviewProps = {
  withAudio?: boolean;
};

export const BrandMorphOutroPreview: React.FC<BrandMorphOutroPreviewProps> = ({
  withAudio = true,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const deviceIn = spring({
    frame,
    fps,
    config: {damping: 15, stiffness: 120, mass: 0.9},
  });
  const pushIn = interpolate(frame, [28, 58], [0, 1], {
    easing: Easing.bezier(0.35, 0, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const deviceOpacity = interpolate(frame, [47, 61], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const gameOpacity = interpolate(frame, [46, 60, 90, 100], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const windowMorph = interpolate(frame, [76, BRAND_REVEAL], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const gameWidth = interpolate(windowMorph, [0, 1], [1920, 300]);
  const gameHeight = interpolate(windowMorph, [0, 1], [1080, 170]);
  const screenBorder = interpolate(frame, [74, 82, 94, 103], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const flash = interpolate(frame, [91, 97, 105], [0, 0.7, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const markIn = interpolate(frame, [BRAND_REVEAL, 113], [0, 1], {
    easing: Easing.bezier(0.2, 0.72, 0.24, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const markShift = interpolate(frame, [112, 132], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const markX = interpolate(markShift, [0, 1], [960, 650]);
  const markSize = interpolate(markShift, [0, 1], [370, 280]);
  const taglineIn = interpolate(frame, [148, 162], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ruleIn = interpolate(frame, [152, 168], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const crossDrawV = interpolate(frame, [94, 102], [100, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const crossDrawH = interpolate(frame, [99, 108], [100, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const crossOpacity = interpolate(frame, [109, 121], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const brandLight = interpolate(frame, [88, 118], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.ink,
        color: COLORS.white,
        fontFamily: FONT,
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '58px 58px',
          opacity: 0.7,
          maskImage: 'radial-gradient(circle at 50% 50%, #000, transparent 80%)',
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(760px 480px at 50% 50%, rgba(245,187,25,${
            0.045 + brandLight * 0.08
          }), transparent 73%), radial-gradient(680px 420px at 58% 53%, rgba(85,216,208,${
            brandLight * 0.045
          }), transparent 76%)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 655,
          top: 80,
          width: 610,
          opacity: deviceIn * deviceOpacity,
          transform: `translateY(${pushIn * 201}px) scale(${0.94 + deviceIn * 0.06 + pushIn * 2})`,
          transformOrigin: '50% 28.3%',
          filter: `blur(${pushIn * 0.8}px)`,
          zIndex: 2,
        }}
      >
        <HandheldStudioPlayer
          video="游戏视频1.mp4"
          width={610}
          trimBefore={0}
          objectFit="cover"
          loop
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: gameWidth,
          height: gameHeight,
          opacity: gameOpacity,
          transform: 'translate(-50%, -50%)',
          overflow: 'hidden',
          borderRadius: 22 * windowMorph,
          boxShadow: `0 0 ${54 * screenBorder}px rgba(245,187,25,${0.3 * screenBorder})`,
          zIndex: 1,
        }}
      >
        <Video
          src={staticFile('media/游戏视频1.mp4')}
          muted
          loop
          objectFit="cover"
          style={{width: '100%', height: '100%'}}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            border: `4px solid rgba(245,187,25,${screenBorder})`,
            borderRadius: 22 * windowMorph,
            boxShadow: `inset 0 0 0 1px rgba(255,255,255,${0.28 * screenBorder})`,
          }}
        />
      </div>

      <AbsoluteFill
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,240,170,0.9), rgba(245,187,25,0.36) 20%, transparent 58%)',
          opacity: flash,
          zIndex: 3,
        }}
      />

      {frame >= 94 && frame <= 121 ? (
        <svg
          width="92"
          height="92"
          viewBox="0 0 92 92"
          style={{
            position: 'absolute',
            left: 914,
            top: 494,
            opacity: crossOpacity,
            zIndex: 4,
          }}
        >
          <line
            x1="46"
            y1="3"
            x2="46"
            y2="89"
            stroke={COLORS.yellow}
            strokeWidth="5"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={crossDrawV}
          />
          <line
            x1="3"
            y1="46"
            x2="89"
            y2="46"
            stroke={COLORS.yellow}
            strokeWidth="5"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={crossDrawH}
          />
        </svg>
      ) : null}

      {frame >= BRAND_REVEAL ? (
        <div
          style={{
            position: 'absolute',
            left: markX,
            top: 510,
            width: markSize,
            height: markSize,
            opacity: markIn,
            transform: `translate(-50%, -50%) scale(${1.14 - markIn * 0.14})`,
            clipPath: `circle(${markIn * 72}% at 50% 50%)`,
            filter: `blur(${(1 - markIn) * 6}px) drop-shadow(0 26px 40px rgba(0,0,0,0.5))`,
            zIndex: 5,
          }}
        >
          <Img
            src={staticFile('media/atom-game-logo-original.png')}
            style={{width: '100%', height: '100%', objectFit: 'contain'}}
          />
        </div>
      ) : null}

      <div
        style={{
          position: 'absolute',
          left: 810,
          top: 402,
          height: 152,
          display: 'flex',
          alignItems: 'flex-end',
          fontSize: 126,
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: 0,
          zIndex: 5,
        }}
      >
        {WORDMARK.map((char, index) => {
          const delay = WORD_START + index * 6;
          const charIn = interpolate(frame, [delay, delay + 14], [0, 1], {
            easing: Easing.bezier(0.2, 0.72, 0.24, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const glint = interpolate(frame, [delay + 8, delay + 13, delay + 18], [0, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <span
              key={`${char}-${index}`}
              style={{
                position: 'relative',
                display: 'inline-block',
                opacity: charIn,
                transform: `scale(${1.55 - charIn * 0.55})`,
                transformOrigin: '50% 84%',
                filter: `blur(${(1 - charIn) * 8}px)`,
              }}
            >
              {char}
              <span
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: -8,
                  width: `${glint * 78}%`,
                  height: 3,
                  background: COLORS.yellow,
                  borderRadius: 2,
                  opacity: glint,
                  transform: 'translateX(-50%)',
                }}
              />
            </span>
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 817,
          top: 573,
          fontSize: 31,
          fontWeight: 800,
          color: 'rgba(255,255,255,0.76)',
          opacity: taglineIn,
          transform: `translateY(${(1 - taglineIn) * 10}px)`,
          letterSpacing: 0,
          zIndex: 5,
        }}
      >
        开源游戏，共创共享
      </div>

      <div
        style={{
          position: 'absolute',
          left: 817,
          top: 636,
          width: 280,
          height: 6,
          background: `linear-gradient(90deg, ${COLORS.yellow}, ${COLORS.cyan})`,
          borderRadius: 3,
          transform: `scaleX(${ruleIn})`,
          transformOrigin: 'left center',
          zIndex: 5,
        }}
      />

      {withAudio ? <PreviewAudio /> : null}
    </AbsoluteFill>
  );
};

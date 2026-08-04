import {Video} from '@remotion/media';
import React from 'react';
import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const CANVAS = {width: 1024, height: 1536};
const SCREEN = {x: 205, y: 188, width: 612, height: 493, radius: 5};

export type HandheldControl = 'up' | 'down' | 'left' | 'right' | 'a' | 'b';

export type HandheldControlCue = {
  control: HandheldControl;
  start: number;
  end: number;
};

export type HandheldJoystickCue = {
  start: number;
  end: number;
  x: number;
  y: number;
};

type ControlMask = {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  clipPath?: string;
};

const CONTROL_MASKS: Record<HandheldControl, ControlMask> = {
  up: {
    x: 238,
    y: 790,
    width: 76,
    height: 104,
    radius: 12,
    clipPath: 'polygon(22% 4%, 78% 4%, 88% 13%, 88% 82%, 50% 100%, 12% 82%, 12% 13%)',
  },
  down: {
    x: 238,
    y: 858,
    width: 76,
    height: 110,
    radius: 12,
    clipPath: 'polygon(12% 18%, 50% 0, 88% 18%, 88% 87%, 78% 96%, 22% 96%, 12% 87%)',
  },
  left: {
    x: 184,
    y: 838,
    width: 112,
    height: 78,
    radius: 12,
    clipPath: 'polygon(4% 28%, 13% 18%, 87% 18%, 100% 50%, 87% 82%, 13% 82%, 4% 72%)',
  },
  right: {
    x: 258,
    y: 838,
    width: 112,
    height: 78,
    radius: 12,
    clipPath: 'polygon(13% 18%, 87% 18%, 96% 28%, 96% 72%, 87% 82%, 13% 82%, 0 50%)',
  },
  a: {x: 784, y: 832, width: 74, height: 74, radius: 37},
  b: {x: 714, y: 902, width: 76, height: 76, radius: 38},
};

type HandheldStudioPlayerProps = {
  video: string;
  width?: number;
  trimBefore?: number;
  objectFit?: 'cover' | 'contain';
  controlCues?: HandheldControlCue[];
  joystickCues?: HandheldJoystickCue[];
  loop?: boolean;
};

const getIntervalProgress = (
  frame: number,
  fps: number,
  startSeconds: number,
  endSeconds: number,
) => {
  const start = startSeconds * fps;
  const end = endSeconds * fps;
  const edgeFrames = Math.min(2, Math.max(1, (end - start) / 3));
  const pressIn = interpolate(frame, [start, start + edgeFrames], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const release = interpolate(frame, [end - edgeFrames, end], [1, 0], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return Math.min(pressIn, release);
};

const AnalogStick: React.FC<{
  x: number;
  y: number;
  scale: number;
  frameSrc: string;
}> = ({x, y, scale, frameSrc}) => {
  const center = {x: 284, y: 1180};
  const radius = 74;
  const travel = 18;
  const offsetX = x * travel * scale;
  const offsetY = y * travel * scale;
  const size = radius * 2 * scale;
  const left = (center.x - radius) * scale;
  const top = (center.y - radius) * scale;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left,
          top,
          width: size,
          height: size,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 48%, #1a2028 0%, #0d1219 66%, #05080d 100%)',
          boxShadow: `inset 0 ${5 * scale}px ${12 * scale}px rgba(0, 0, 0, 0.88)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left,
          top,
          width: size,
          height: size,
          overflow: 'hidden',
          borderRadius: '50%',
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${1 - Math.hypot(x, y) * 0.018})`,
          transformOrigin: 'center',
          filter: `brightness(${1 - Math.hypot(x, y) * 0.07}) contrast(1.04)`,
          boxShadow: `0 ${6 * scale}px ${10 * scale}px rgba(0, 0, 0, 0.62)`,
        }}
      >
        <Img
          src={frameSrc}
          style={{
            position: 'absolute',
            left: -left,
            top: -top,
            width: CANVAS.width * scale,
            height: CANVAS.height * scale,
          }}
        />
      </div>
    </>
  );
};

const PressedControl: React.FC<{
  control: HandheldControl;
  progress: number;
  scale: number;
  frameSrc: string;
}> = ({control, progress, scale, frameSrc}) => {
  const mask = CONTROL_MASKS[control];
  const x = mask.x * scale;
  const y = mask.y * scale;
  const width = mask.width * scale;
  const height = mask.height * scale;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        overflow: 'hidden',
        borderRadius: mask.radius * scale,
        clipPath: mask.clipPath,
        opacity: progress,
        transform: `translateY(${progress * 6 * scale}px) scale(${1 - progress * 0.016})`,
        transformOrigin: 'center bottom',
        filter: `brightness(${1 - progress * 0.32}) contrast(${1 + progress * 0.1})`,
      }}
    >
      <Img
        src={frameSrc}
        style={{
          position: 'absolute',
          left: -x,
          top: -y,
          width: CANVAS.width * scale,
          height: CANVAS.height * scale,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `rgba(0, 18, 42, ${progress * 0.16})`,
          boxShadow: `inset 0 ${progress * 3 * scale}px ${progress * 7 * scale}px rgba(0, 0, 0, 0.72)`,
        }}
      />
    </div>
  );
};

export const HandheldStudioPlayer: React.FC<HandheldStudioPlayerProps> = ({
  video,
  width = 640,
  trimBefore = 0,
  objectFit = 'cover',
  controlCues = [],
  joystickCues = [],
  loop = true,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scale = width / CANVAS.width;
  const height = CANVAS.height * scale;
  const frameSrc = staticFile(
    'media/handheld-front-studio-frame-transparent.png',
  );
  const joystick = joystickCues.reduce(
    (active, cue) => {
      const progress = getIntervalProgress(frame, fps, cue.start, cue.end);
      return progress > active.progress
        ? {x: cue.x * progress, y: cue.y * progress, progress}
        : active;
    },
    {x: 0, y: 0, progress: 0},
  );
  const screenStyle: React.CSSProperties = {
    position: 'absolute',
    left: SCREEN.x * scale,
    top: SCREEN.y * scale,
    width: SCREEN.width * scale,
    height: SCREEN.height * scale,
    borderRadius: SCREEN.radius * scale,
    overflow: 'hidden',
  };

  return (
    <div style={{position: 'relative', width, height}}>
      <div style={{...screenStyle, background: '#050607'}}>
        <Video
          src={staticFile(`media/${video}`)}
          trimBefore={trimBefore}
          muted
          loop={loop}
          objectFit={objectFit}
          style={{width: '100%', height: '100%'}}
        />
      </div>
      <Img
        src={frameSrc}
        style={{position: 'absolute', inset: 0, width, height}}
      />
      {(
        ['up', 'down', 'left', 'right', 'a', 'b'] as HandheldControl[]
      ).map((control) => {
        const progress = controlCues
          .filter((cue) => cue.control === control)
          .reduce(
            (maximum, cue) =>
              Math.max(
                maximum,
                getIntervalProgress(frame, fps, cue.start, cue.end),
              ),
            0,
          );

        return progress > 0 ? (
          <PressedControl
            key={control}
            control={control}
            progress={progress}
            scale={scale}
            frameSrc={frameSrc}
          />
        ) : null;
      })}
      {joystick.progress > 0 ? (
        <AnalogStick
          x={joystick.x}
          y={joystick.y}
          scale={scale}
          frameSrc={frameSrc}
        />
      ) : null}
      <div
        style={{
          ...screenStyle,
          background:
            'linear-gradient(132deg, rgba(255,255,255,0.12), transparent 22%, transparent 72%, rgba(255,255,255,0.04))',
          boxShadow: 'inset 0 0 18px rgba(0,0,0,0.28)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

import {Audio} from '@remotion/media';
import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  HandheldControlCue,
  HandheldJoystickCue,
  HandheldStudioPlayer,
} from './components/HandheldStudioPlayer';
import {GridBackground} from './components/SceneBase';
import {PhoneShell} from './components/PhoneShell';
import {sceneOpacity} from './motion';
import {COLORS, FONT} from './theme';
import {FPS} from './timeline';

export const HANDHELD_PROMO_INSERT_DURATION_IN_FRAMES = 339;

const PHONE_ENTER_FRAME = 6;
const PHONE_EXIT_FRAME = 114;
const HANDHELD_START_FRAME = 132;
const HANDHELD_ENTER_DURATION = 30;
const GAMEPLAY_TRIM_SECONDS = 5.1;
const BGM_TRIM_FRAMES = 11 + 685;

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const shifted = (seconds: number) => seconds - GAMEPLAY_TRIM_SECONDS;

export const HANDHELD_PROMO_AUDIO_CUES = {
  phoneEnter: PHONE_ENTER_FRAME,
  deviceSwitch: PHONE_EXIT_FRAME + 3,
  bDash: HANDHELD_START_FRAME + Math.round(shifted(6.14) * FPS),
  aHold: HANDHELD_START_FRAME + Math.round(shifted(7) * FPS),
} as const;

const CONTROL_CUES: HandheldControlCue[] = [
  {control: 'b', start: shifted(6.14), end: shifted(6.28)},
  {control: 'a', start: shifted(7), end: shifted(9.53)},
];

const JOYSTICK_CUES: HandheldJoystickCue[] = [
  {start: shifted(5.28), end: shifted(6.02), x: -1, y: 0},
  {start: shifted(6.08), end: shifted(6.34), x: 0.82, y: -0.58},
  {start: shifted(6.36), end: shifted(7.06), x: 1, y: 0},
  {start: shifted(9.55), end: shifted(9.9), x: 0.78, y: -0.48},
  {start: shifted(9.82), end: shifted(11.12), x: 1, y: 0},
  {start: shifted(11.38), end: shifted(12), x: -1, y: 0},
];

const ease = (frame: number, from: number, duration: number) =>
  interpolate(frame, [from, from + duration], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

const TransitionFlash: React.FC<{frame: number}> = ({frame}) => {
  const sweep = interpolate(frame, [PHONE_EXIT_FRAME, HANDHELD_START_FRAME + 7], [-1, 1], clamp);
  const opacity = interpolate(
    frame,
    [PHONE_EXIT_FRAME, PHONE_EXIT_FRAME + 5, HANDHELD_START_FRAME + 3, HANDHELD_START_FRAME + 8],
    [0, 0.92, 0.72, 0],
    clamp,
  );

  return (
    <AbsoluteFill style={{pointerEvents: 'none', opacity}}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '-18%',
          width: 390,
          height: '136%',
          background: `linear-gradient(90deg, transparent, ${COLORS.cyan}55 22%, rgba(255,255,255,0.72) 50%, ${COLORS.cyan}88 61%, transparent)`,
          filter: 'blur(2px)',
          transform: `translateX(${sweep * 1500}px) skewX(-12deg)`,
        }}
      />
    </AbsoluteFill>
  );
};

const InsertAudio: React.FC = () => {
  return (
    <>
      <Audio
        src={staticFile('audio/house-vibez.mp3')}
        trimBefore={BGM_TRIM_FRAMES}
        volume={(audioFrame) =>
          interpolate(
            audioFrame,
            [
              0,
              12,
              HANDHELD_PROMO_INSERT_DURATION_IN_FRAMES - 18,
              HANDHELD_PROMO_INSERT_DURATION_IN_FRAMES,
            ],
            [0, 0.34, 0.34, 0],
            clamp,
          )
        }
      />
      <Sequence from={HANDHELD_PROMO_AUDIO_CUES.phoneEnter} premountFor={FPS}>
        <Audio src={staticFile('audio/whoosh-fast.mp3')} volume={0.24} />
      </Sequence>
      <Sequence from={HANDHELD_PROMO_AUDIO_CUES.deviceSwitch} premountFor={FPS}>
        <Audio src={staticFile('audio/whoosh-big.mp3')} volume={0.3} />
      </Sequence>
      <Sequence from={HANDHELD_PROMO_AUDIO_CUES.bDash} premountFor={FPS}>
        <Audio src={staticFile('audio/transition-snap.mp3')} volume={0.16} />
      </Sequence>
      <Sequence from={HANDHELD_PROMO_AUDIO_CUES.aHold} premountFor={FPS}>
        <Audio src={staticFile('audio/click-camera.mp3')} volume={0.18} />
      </Sequence>
    </>
  );
};

type HandheldPromoInsertProps = {
  includeAudio?: boolean;
  fadeScene?: boolean;
};

export const HandheldPromoInsert: React.FC<HandheldPromoInsertProps> = ({
  includeAudio = true,
  fadeScene = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const titleIn = ease(frame, 0, 24);
  const phoneIn = ease(frame, PHONE_ENTER_FRAME, 26);
  const phoneOut = ease(frame, PHONE_EXIT_FRAME, 14);
  const phoneCopyOut = 1 - ease(frame, PHONE_EXIT_FRAME - 4, 8);
  const handheldCopyIn = ease(frame, PHONE_EXIT_FRAME + 4, 12);
  const sceneFade = fadeScene
    ? sceneOpacity(frame, HANDHELD_PROMO_INSERT_DURATION_IN_FRAMES, 12)
    : 1;
  const handheldIn = ease(frame, HANDHELD_START_FRAME, HANDHELD_ENTER_DURATION);
  const handheldFrame = frame - HANDHELD_START_FRAME;
  const phonePush = interpolate(
    frame,
    [PHONE_ENTER_FRAME + 26, PHONE_EXIT_FRAME],
    [1, 1.035],
    clamp,
  );
  const handheldPush = interpolate(
    handheldFrame,
    [0, HANDHELD_PROMO_INSERT_DURATION_IN_FRAMES - HANDHELD_START_FRAME],
    [1, 1.04],
    clamp,
  );
  const handheldPullBack = interpolate(handheldFrame, [12, 48], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  const handheldIntroZoom = interpolate(handheldPullBack, [0, 1], [1.28, 1], clamp);
  const tapPulse = interpolate(frame, [56, 63, 72], [0, 1, 0], clamp);
  const tapScale = interpolate(frame, [56, 72], [0.62, 1.48], clamp);
  const bDashFrame = Math.round(shifted(6.14) * fps);
  const bRecoil = interpolate(
    handheldFrame,
    [bDashFrame, bDashFrame + 2, bDashFrame + 4, bDashFrame + 7],
    [0, -7, 3, 0],
    clamp,
  );
  const aStartFrame = Math.round(shifted(7) * fps);
  const aEndFrame = Math.round(shifted(9.53) * fps);
  const aPush = interpolate(
    handheldFrame,
    [aStartFrame, aEndFrame, aEndFrame + 14],
    [1, 1.03, 1],
    clamp,
  );

  return (
    <GridBackground accent="cyan">
      <AbsoluteFill style={{opacity: sceneFade}}>
        <div
          style={{
            position: 'absolute',
            left: 152,
            top: 340,
            width: 880,
            fontFamily: FONT,
            opacity: titleIn,
            transform: `translateX(${(1 - titleIn) * -32}px)`,
          }}
        >
          <div
            style={{
              opacity: phoneCopyOut,
              transform: `translateY(${(1 - phoneCopyOut) * -18}px)`,
            }}
          >
            <div style={{fontSize: 108, lineHeight: 1.12, fontWeight: 900}}>
              手机<span style={{color: COLORS.cyan}}>随时玩</span>
            </div>
            <div
              style={{
                marginTop: 38,
                color: 'rgba(255,255,255,0.62)',
                fontSize: 40,
                fontWeight: 700,
              }}
            >
              从发现到游玩，体验自然衔接
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              opacity: handheldCopyIn,
              transform: `translateY(${(1 - handheldCopyIn) * 18}px)`,
            }}
          >
            <div style={{fontSize: 100, lineHeight: 1.13, fontWeight: 900}}>
              掌机<span style={{color: COLORS.cyan}}>也能玩</span>
            </div>
            <div
              style={{
                marginTop: 34,
                color: 'rgba(255,255,255,0.62)',
                fontSize: 40,
                fontWeight: 700,
              }}
            >
              支持实体按键，操作反馈更直接
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            right: 210,
            top: 66,
            width: 420,
            height: 938,
            opacity: phoneIn * (1 - phoneOut),
            transform: `translateX(${(1 - phoneIn) * 260 + phoneOut * 120}px) scale(${(1.01 + phoneIn * 0.07 - phoneOut * 0.03) * phonePush})`,
            transformOrigin: '50% 50%',
          }}
        >
          <PhoneShell
            video="游戏画面2-手机精选.mp4"
            trimBefore={0}
            borderColor={COLORS.cyan}
          />
          <div
            style={{
              position: 'absolute',
              left: '60%',
              top: '69%',
              width: 96,
              height: 96,
              border: `4px solid ${COLORS.yellow}`,
              borderRadius: '50%',
              opacity: tapPulse,
              transform: `translate(-50%, -50%) scale(${tapScale})`,
              boxShadow: `0 0 30px ${COLORS.yellow}55`,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: COLORS.yellow,
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>
        </div>

        <Sequence
          from={HANDHELD_START_FRAME}
          durationInFrames={HANDHELD_PROMO_INSERT_DURATION_IN_FRAMES - HANDHELD_START_FRAME}
          premountFor={fps}
        >
          <div
            style={{
              position: 'absolute',
              right: 110,
              top: 75,
              width: 620,
              height: 930,
              opacity: handheldIn,
              transform: `translate(${bRecoil}px, ${(1 - handheldIn) * 42}px) scale(${(0.98 + handheldIn * 0.1) * aPush * handheldPush * handheldIntroZoom})`,
              transformOrigin: '50% 30%',
              filter:
                'drop-shadow(0 38px 48px rgba(0,0,0,0.62)) drop-shadow(0 0 24px rgba(85,216,208,0.12))',
            }}
          >
            <HandheldStudioPlayer
              video="游戏视频1.mp4"
              width={620}
              trimBefore={Math.round(GAMEPLAY_TRIM_SECONDS * fps)}
              objectFit="cover"
              controlCues={CONTROL_CUES}
              joystickCues={JOYSTICK_CUES}
              loop={false}
            />
          </div>
        </Sequence>

        <TransitionFlash frame={frame} />
        {includeAudio ? <InsertAudio /> : null}
      </AbsoluteFill>
    </GridBackground>
  );
};

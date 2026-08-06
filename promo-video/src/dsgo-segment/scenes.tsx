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
import {
  DoraVideo,
  DsgoIcon,
  DsgoWordmark,
  Eyebrow,
  PhoneDevice,
  PixelField,
  Stage,
  clamp,
  enter,
  fadeOut,
} from './components';
import {FPS, SHOTS} from './timeline';
import {COLORS, DISPLAY_FONT, FONT, MONO} from './theme';

export const BrandScene: React.FC<{seamlessIcon?: boolean}> = ({seamlessIcon = false}) => {
  const frame = useCurrentFrame();
  const duration = SHOTS.brand.duration;
  const iconSpring = spring({
    frame,
    fps: FPS,
    config: {damping: 13, stiffness: 130, mass: 0.9},
  });
  const iconIn = seamlessIcon ? 1 : iconSpring;
  const subtitle = enter(frame, 43, 16);
  const description = enter(frame, 58, 16);
  const exit = fadeOut(frame, duration, 8);
  return (
    <Stage style={{opacity: exit}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 88,
        }}
      >
        <div
          style={{
            opacity: iconIn,
            transform: `scale(${0.72 + iconIn * 0.28}) rotate(${(1 - iconIn) * -8}deg)`,
          }}
        >
          <DsgoIcon size={270} />
        </div>
        <div style={{width: 760}}>
          <DsgoWordmark frame={frame} from={14} size={182} />
          <div
            style={{
              marginTop: 38,
              fontSize: 34,
              fontWeight: 800,
              color: 'rgba(255,255,255,0.78)',
              opacity: subtitle,
              transform: `translateY(${(1 - subtitle) * 18}px)`,
            }}
          >
            Dora SSR 驱动的游戏产品
          </div>
          <div
            style={{
              width: 260,
              height: 7,
              marginTop: 24,
              background: `linear-gradient(90deg, ${COLORS.yellow}, ${COLORS.cyan})`,
              transform: `scaleX(${subtitle})`,
              transformOrigin: 'left center',
            }}
          />
          <div
            style={{
              marginTop: 22,
              fontSize: 23,
              lineHeight: 1.45,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.58)',
              opacity: description,
              transform: `translateY(${(1 - description) * 12}px)`,
            }}
          >
            发现、创作、游玩、交流，在同一个游戏社区中发生
          </div>
        </div>
      </div>
    </Stage>
  );
};

export const DiscoverScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const duration = SHOTS.discover.duration;
  const drop = spring({
    frame: frame - 8,
    fps,
    config: {damping: 16, stiffness: 110, mass: 1},
  });
  const copy = enter(frame, 20, 22);
  const lock = interpolate(frame, [34, 64], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const settle = interpolate(frame, [duration - 24, duration - 6], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  return (
    <Stage>
      <div
        style={{
          position: 'absolute',
          left: 132,
          top: 286,
          width: 760,
          opacity: copy,
          transform: `translateY(${(1 - copy) * 28}px)`,
        }}
      >
        <Eyebrow>DISCOVER / 01</Eyebrow>
        <div style={{marginTop: 22, fontSize: 86, lineHeight: 1.12, fontWeight: 900}}>
          像刷视频一样<br />
          <span style={{color: COLORS.yellow}}>发现游戏</span>
        </div>
        <div
          style={{
            marginTop: 34,
            color: 'rgba(255,255,255,0.6)',
            fontSize: 27,
            fontWeight: 700,
          }}
        >
          每一次滑动，都可能遇见新的可玩世界
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1260,
          top: 540,
          width: 430,
          height: 956,
          transform: `translate(-50%, -50%) translateY(${(1 - drop) * 560}px) scale(${0.82 + drop * 0.18 - settle * 0.015})`,
          opacity: interpolate(drop, [0, 0.22], [0, 1], clamp),
        }}
      >
        <PhoneDevice trimBeforeSeconds={0} style={{left: 0, top: 0}} />
      </div>
      <AbsoluteFill
        style={{
          background: `radial-gradient(430px 520px at ${64 + lock * 2}% ${50 - lock * 3}%, rgba(245,187,25,${0.08 + lock * 0.12}), transparent 72%)`,
          pointerEvents: 'none',
        }}
      />
    </Stage>
  );
};

export const DetailScene: React.FC = () => {
  const frame = useCurrentFrame();
  const copy = enter(frame, 8, 18);
  return (
    <Stage>
      <div style={{position: 'absolute', left: 1260, top: 62}}>
        <PhoneDevice trimBeforeSeconds={4.6} style={{left: -215, top: 0}} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 132,
          top: 290,
          width: 760,
          opacity: copy,
          transform: `translateY(${(1 - copy) * 24}px)`,
        }}
      >
        <Eyebrow>DETAIL / 02</Eyebrow>
        <div style={{marginTop: 22, fontSize: 82, lineHeight: 1.13, fontWeight: 900}}>
          右滑，展开<br />
          <span style={{color: COLORS.yellow}}>作品世界</span>
        </div>
        <div
          style={{
            marginTop: 34,
            color: 'rgba(255,255,255,0.6)',
            fontSize: 27,
            fontWeight: 700,
          }}
        >
          从一眼心动，到了解玩法与创作者
        </div>
      </div>
    </Stage>
  );
};

export const PlayScene: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SHOTS.play.duration;
  const move = interpolate(frame, [0, 28], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const copy = enter(frame, 30, 22);
  const pixels = enter(frame, 46, 24);
  const exit = fadeOut(frame, duration, 8);
  return (
    <Stage style={{opacity: exit}}>
      <PixelField progress={pixels} />
      <div
        style={{
          position: 'absolute',
          left: interpolate(move, [0, 1], [1260, 960]),
          top: 540,
          width: 430,
          height: 956,
          transform: `translate(-50%, -50%) scale(${1 + move * 0.055})`,
        }}
      >
        <PhoneDevice
          trimBeforeSeconds={8.7}
          playbackRate={1.75}
          style={{left: 0, top: 0}}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 128,
          top: 190,
          width: 560,
          opacity: copy,
          transform: `translateX(${(1 - copy) * -24}px)`,
        }}
      >
        <Eyebrow>PLAY / 03</Eyebrow>
        <div style={{marginTop: 20, fontSize: 76, lineHeight: 1.12, fontWeight: 900}}>
          无需下载<br />
          <span style={{color: COLORS.cyan}}>即刻开玩</span>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 118,
          bottom: 154,
          width: 470,
          textAlign: 'right',
          opacity: copy,
          color: 'rgba(255,255,255,0.65)',
          fontSize: 25,
          fontWeight: 700,
        }}
      >
        左滑释放，直接进入真实游玩体验
      </div>
    </Stage>
  );
};

export const CommunityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SHOTS.community.duration;
  const move = interpolate(frame, [0, 24], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const first = interpolate(frame, [10, 26, 74, 88], [0, 1, 1, 0], clamp);
  const second = enter(frame, 82, 20);
  const exit = fadeOut(frame, duration, 8);
  return (
    <Stage style={{opacity: exit}}>
      <div
        style={{
          position: 'absolute',
          left: interpolate(move, [0, 1], [960, 480]),
          top: 540,
          width: 430,
          height: 956,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <PhoneDevice
          trimBeforeSeconds={23.8}
          playbackRate={2.05}
          accent={COLORS.coral}
          style={{left: 0, top: 0}}
        />
      </div>
      <div style={{position: 'absolute', left: 880, top: 282, width: 830}}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: first,
            transform: `translateY(${(1 - first) * 22}px)`,
          }}
        >
          <Eyebrow color={COLORS.coral}>COMMUNITY / 04</Eyebrow>
          <div style={{marginTop: 22, fontSize: 84, lineHeight: 1.12, fontWeight: 900}}>
            进入论坛<br />
            <span style={{color: COLORS.coral}}>继续交流</span>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: second,
            transform: `translateY(${(1 - second) * 22}px)`,
          }}
        >
          <Eyebrow color={COLORS.coral}>ONE GAME / ONE SPACE</Eyebrow>
          <div style={{marginTop: 22, fontSize: 75, lineHeight: 1.14, fontWeight: 900}}>
            每个游戏<br />
            <span style={{color: COLORS.yellow}}>都有独立讨论空间</span>
          </div>
          <div
            style={{
              marginTop: 34,
              color: 'rgba(255,255,255,0.6)',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            交流游玩体验，也分享开发心得
          </div>
        </div>
      </div>
    </Stage>
  );
};

export const BridgeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SHOTS.bridge.duration;
  const left = enter(frame, 4, 18);
  const right = enter(frame, 20, 18);
  const line = enter(frame, 36, 24);
  const title = enter(frame, 50, 18);
  const exit = fadeOut(frame, duration, 8);
  return (
    <Stage accent="cyan" style={{opacity: exit}}>
      <div
        style={{
          position: 'absolute',
          left: 385,
          top: 348,
          opacity: left,
          transform: `translateX(${(1 - left) * -80}px) scale(${0.9 + left * 0.1})`,
        }}
      >
        <DsgoIcon size={220} />
        <div
          style={{
            marginTop: 22,
            textAlign: 'center',
            color: COLORS.yellow,
            fontFamily: DISPLAY_FONT,
            fontSize: 50,
            fontStyle: 'italic',
            letterSpacing: 4,
          }}
        >
          DSGO
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1315,
          top: 365,
          width: 260,
          height: 260,
          opacity: right,
          transform: `translateX(${(1 - right) * 80}px) scale(${0.9 + right * 0.1})`,
        }}
      >
        <Img
          src={staticFile('media/dorassr-logo.png')}
          style={{width: '100%', height: '100%', objectFit: 'contain'}}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 650,
          top: 500,
          width: 610,
          height: 4,
          background: `linear-gradient(90deg, ${COLORS.yellow}, ${COLORS.cyan})`,
          transform: `scaleX(${line})`,
          transformOrigin: 'left center',
          boxShadow: `0 0 28px ${COLORS.cyan}55`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 762,
          textAlign: 'center',
          fontSize: 68,
          fontWeight: 900,
          opacity: title,
          transform: `translateY(${(1 - title) * 20}px)`,
        }}
      >
        从<span style={{color: COLORS.yellow}}>游玩</span>，走向
        <span style={{color: COLORS.cyan}}>创作</span>
      </div>
    </Stage>
  );
};

const DoraWindow: React.FC<{children: React.ReactNode; progress: number}> = ({
  children,
  progress,
}) => (
  <div
    style={{
      position: 'absolute',
      left: 160,
      top: 108,
      width: 1600,
      height: 900,
      overflow: 'hidden',
      borderRadius: 8,
      border: `2px solid rgba(85,216,208,${0.34 + progress * 0.4})`,
      background: '#0d0f0e',
      boxShadow: '0 42px 100px rgba(0,0,0,0.56)',
      opacity: progress,
      transform: `translateY(${(1 - progress) * 36}px) scale(${0.97 + progress * 0.03})`,
    }}
  >
    {children}
  </div>
);

const phaseFlash = (frame: number, cue: number) =>
  interpolate(frame, [cue - 2, cue, cue + 3], [0, 0.38, 0], clamp);

export const DoraBuildScene: React.FC<{seamless?: boolean}> = ({seamless = false}) => {
  const frame = useCurrentFrame();
  const duration = SHOTS.dora.duration;
  const panel = seamless ? 1 : enter(frame, 0, 18);
  const phase1 = interpolate(frame, [8, 20, 54, 60], [0, 1, 1, 0], clamp);
  const phase2 = interpolate(frame, [62, 72, 158, 166], [0, 1, 1, 0], clamp);
  const phase3 = enter(frame, 168, 16);
  const exit = fadeOut(frame, duration, 7);
  const flash = Math.max(phaseFlash(frame, 60), phaseFlash(frame, 168));
  return (
    <Stage accent="cyan" style={{opacity: exit}}>
      <DoraWindow progress={panel}>
        <Sequence from={0} durationInFrames={60} premountFor={FPS}>
          <DoraVideo trimBeforeSeconds={4} playbackRate={2} />
        </Sequence>
        <Sequence from={60} durationInFrames={108} premountFor={FPS}>
          <DoraVideo trimBeforeSeconds={12} playbackRate={5.5} />
        </Sequence>
        <Sequence from={168} durationInFrames={duration - 168} premountFor={FPS}>
          <DoraVideo trimBeforeSeconds={68} playbackRate={3} />
        </Sequence>
        <AbsoluteFill
          style={{
            background: 'linear-gradient(180deg, rgba(10,12,11,0.08), rgba(10,12,11,0.2))',
            pointerEvents: 'none',
          }}
        />
      </DoraWindow>
      <div
        style={{
          position: 'absolute',
          left: 180,
          top: 52,
          width: 1200,
          fontFamily: FONT,
          textShadow: '0 4px 18px rgba(0,0,0,0.62)',
        }}
      >
        <div style={{position: 'absolute', top: 0, display: 'flex', alignItems: 'center', gap: 18, opacity: phase1}}>
          <Eyebrow color={COLORS.cyan}>PROMPT</Eyebrow>
          <div style={{fontSize: 30, fontWeight: 900}}>一句话描述游戏需求</div>
        </div>
        <div style={{position: 'absolute', top: 0, display: 'flex', alignItems: 'center', gap: 18, opacity: phase2}}>
          <Eyebrow color={COLORS.cyan}>BUILDING</Eyebrow>
          <div style={{fontSize: 30, fontWeight: 900}}>理解、编写、调试持续推进</div>
        </div>
        <div style={{position: 'absolute', top: 0, display: 'flex', alignItems: 'center', gap: 18, opacity: phase3}}>
          <Eyebrow color={COLORS.cyan}>COMPLETE</Eyebrow>
          <div style={{fontSize: 30, fontWeight: 900}}>创作任务完成</div>
        </div>
      </div>
      {flash > 0 ? (
        <div
          style={{
            position: 'absolute',
            left: 160,
            top: 108,
            width: 1600,
            height: 900,
            boxSizing: 'border-box',
            border: `2px solid ${COLORS.cyan}`,
            borderRadius: 8,
            opacity: flash * 1.5,
            boxShadow: `0 0 ${24 + flash * 90}px ${COLORS.cyan}88`,
            pointerEvents: 'none',
          }}
        />
      ) : null}
    </Stage>
  );
};

export const DoraResultScene: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SHOTS.result.duration;
  const inProgress = enter(frame, 0, 18);
  const copy = enter(frame, 18, 18);
  const camera = interpolate(frame, [0, duration - 18], [1.18, 1.46], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const morph = interpolate(frame, [duration - 26, duration], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const baseOut = interpolate(morph, [0.08, 0.55], [0, 1], clamp);
  const tileIn = interpolate(morph, [0.24, 0.5], [0, 1], clamp);
  const logoMix = interpolate(morph, [0.62, 1], [0, 1], clamp);
  const tileLeft = interpolate(morph, [0, 1], [820, 401]);
  const tileTop = interpolate(morph, [0, 1], [140, 405]);
  const tileSize = interpolate(morph, [0, 1], [520, 270]);
  return (
    <Stage accent="cyan">
      <AbsoluteFill
        style={{
          opacity: inProgress * (1 - baseOut),
          transform: `scale(${camera}) translateX(120px)`,
          transformOrigin: '56% 60%',
        }}
      >
        <DoraVideo trimBeforeSeconds={80} playbackRate={2} />
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: 98,
          top: 0,
          bottom: 0,
          width: 650,
          background: 'linear-gradient(90deg, rgba(21,24,23,0.98) 0%, rgba(21,24,23,0.88) 70%, transparent 100%)',
          opacity: 1 - baseOut,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 142,
          top: 318,
          width: 650,
          opacity: copy * (1 - baseOut),
          transform: `translateY(${(1 - copy) * 22}px)`,
        }}
      >
        <Eyebrow color={COLORS.cyan}>PLAYABLE RESULT</Eyebrow>
        <div style={{marginTop: 22, fontSize: 76, lineHeight: 1.12, fontWeight: 900}}>
          从一句话<br />
          <span style={{color: COLORS.cyan}}>到可玩的游戏</span>
        </div>
        <div
          style={{
            marginTop: 32,
            color: 'rgba(255,255,255,0.62)',
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          创作结果不止能看，更能立即运行验证
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: tileLeft,
          top: tileTop,
          width: tileSize,
          height: tileSize,
          overflow: 'hidden',
          borderRadius: interpolate(morph, [0, 1], [8, 54]),
          opacity: tileIn,
          boxShadow: `0 34px 84px rgba(0,0,0,${0.28 + morph * 0.24})`,
        }}
      >
        <AbsoluteFill style={{opacity: 1 - logoMix}}>
          <DoraVideo
            trimBeforeSeconds={80}
            playbackRate={2}
            style={{transform: 'scale(3.7)', transformOrigin: '50% 50%'}}
          />
        </AbsoluteFill>
        <AbsoluteFill style={{opacity: logoMix}}>
          <DsgoIcon size={tileSize} style={{boxShadow: 'none'}} />
        </AbsoluteFill>
      </div>
    </Stage>
  );
};

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SHOTS.outro.duration;
  const flip = interpolate(frame, [6, 22], [0, 1], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });
  const iconIn = spring({
    frame: frame - 22,
    fps: FPS,
    config: {damping: 11, stiffness: 130, mass: 0.9},
  });
  const shift = interpolate(frame, [38, 56], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const tagline = enter(frame, 56, 14);
  const exit = interpolate(frame, [duration - 18, duration], [1, 0], clamp);
  return (
    <Stage style={{opacity: exit}}>
      <div
        style={{
          position: 'absolute',
          left: 960 - shift * 430,
          top: 510,
          width: 286,
          height: 286,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {frame < 22 ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 24,
              overflow: 'hidden',
              transform: `scaleX(${1 - flip * 0.96})`,
              filter: `blur(${flip * 6}px)`,
            }}
          >
            <DoraVideo trimBeforeSeconds={91} playbackRate={1.4} />
          </div>
        ) : (
          <div
            style={{
              transform: `scaleX(${0.04 + iconIn * 0.96}) scale(${0.8 + iconIn * 0.2})`,
              filter: `blur(${Math.max(0, 1 - iconIn) * 6}px)`,
            }}
          >
            <DsgoIcon size={286} />
          </div>
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 800,
          top: 382,
          width: 900,
          opacity: shift,
        }}
      >
        <DsgoWordmark frame={frame} from={42} size={176} />
        <div
          style={{
            marginTop: 38,
            fontSize: 31,
            fontWeight: 800,
            color: 'rgba(255,255,255,0.76)',
            opacity: tagline,
            transform: `translateY(${(1 - tagline) * 14}px)`,
          }}
        >
          发现 · 游玩 · 创作 · 分享
        </div>
      </div>
    </Stage>
  );
};

import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {GridBackground} from '../components/SceneBase';
import {COLORS, FONT} from '../theme';
import {SHOTS} from '../timeline';

const stages = [
  {
    from: 0,
    to: 95,
    file: '总体奖项.png',
    width: 1080,
    height: 590,
    eyebrow: '多维奖项',
    line: '让创意获得认可',
    color: COLORS.yellow,
  },
  {
    from: 86,
    to: 184,
    file: '承办单位协办单位.png',
    width: 1120,
    height: 435,
    eyebrow: '共同参与',
    line: '汇聚承办与协办力量',
    color: COLORS.cyan,
  },
  {
    from: 174,
    to: 265,
    file: '合作伙伴与社区.png',
    width: 1120,
    height: 503,
    eyebrow: '开放连接',
    line: '连接伙伴与开源社区',
    color: COLORS.coral,
  },
] as const;

const stageProgress = (frame: number, from: number, to: number) => {
  const fadeIn = interpolate(frame, [from, from + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const fadeOut = interpolate(frame, [to - 13, to], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });
  return Math.min(fadeIn, fadeOut);
};

export const Ecosystem: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SHOTS.ecosystem.duration;
  const exit = interpolate(frame, [duration - 6, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <GridBackground accent="yellow">
      <AbsoluteFill style={{fontFamily: FONT, opacity: 1 - exit * 0.92}}>
        <div style={{position: 'absolute', left: 92, top: 212, width: 560}}>
          <div style={{fontSize: 74, lineHeight: 1.18, fontWeight: 900}}>
            让好作品<br />
            <span style={{color: COLORS.cyan}}>走得更远</span>
          </div>

          <div style={{position: 'relative', height: 140, marginTop: 50}}>
            {stages.map((stage) => {
              const p = stageProgress(frame, stage.from, stage.to);
              return (
                <div
                  key={stage.file}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: p,
                    transform: `translateY(${(1 - p) * 22}px)`,
                  }}
                >
                  <div style={{color: stage.color, fontSize: 20, fontWeight: 900}}>{stage.eyebrow}</div>
                  <div style={{marginTop: 13, fontSize: 30, lineHeight: 1.4, fontWeight: 800}}>{stage.line}</div>
                </div>
              );
            })}
          </div>
        </div>

        {stages.map((stage) => {
          const p = stageProgress(frame, stage.from, stage.to);
          const travel = interpolate(frame, [stage.from, stage.to], [18, -18], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={stage.file}
              style={{
                position: 'absolute',
                left: 720,
                top: (1080 - stage.height) / 2,
                width: stage.width,
                height: stage.height,
                overflow: 'hidden',
                border: `3px solid ${stage.color}88`,
                borderRadius: 8,
                background: '#101211',
                boxShadow: '0 36px 82px rgba(0,0,0,0.52)',
                opacity: p,
                transform: `translateX(${(1 - p) * 120 + travel}px) scale(${0.97 + p * 0.03})`,
              }}
            >
              <Img
                src={staticFile(`media/${stage.file}`)}
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
            </div>
          );
        })}
      </AbsoluteFill>
    </GridBackground>
  );
};

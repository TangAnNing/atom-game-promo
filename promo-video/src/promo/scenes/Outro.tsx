import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {COLORS, FONT} from '../theme';
import {SHOTS} from '../timeline';

type FlyItem = {
  file: string;
  width: number;
  height: number;
  cx: number;
  cy: number;
  dx: number;
  dy: number;
  rotation: number;
  cue: number;
};

const FLY_EASE = Easing.bezier(0.34, 1.4, 0.44, 1);

const items: FlyItem[] = [
  {file: '刷游戏2.jpg', width: 230, height: 510, cx: 270, cy: 330, dx: -420, dy: -180, rotation: -4, cue: 8},
  {file: '创作页面.jpg', width: 250, height: 555, cx: 1650, cy: 330, dx: 440, dy: -180, rotation: 4, cue: 12},
  {file: '社区页面.jpg', width: 330, height: 650, cx: 330, cy: 800, dx: -460, dy: 260, rotation: 3, cue: 16},
  {file: '作品展示1.png', width: 610, height: 350, cx: 1470, cy: 780, dx: 480, dy: 280, rotation: -3, cue: 20},
  {file: '赛事奖励.png', width: 510, height: 290, cx: 740, cy: 880, dx: -120, dy: 330, rotation: 2, cue: 24},
  {file: '合作伙伴与社区.png', width: 500, height: 300, cx: 1200, cy: 160, dx: 160, dy: -330, rotation: -2, cue: 28},
];

const dust = Array.from({length: 20}, (_, index) => ({
  x: (index * 439 + 137) % 1920,
  y: (index * 613 + 271) % 1080,
  rise: 0.3 + (index % 5) * 0.11,
  sway: 9 + (index % 4) * 5,
  frequency: 0.022 + (index % 3) * 0.008,
  phase: (index * 0.83) % (Math.PI * 2),
  size: 2 + (index % 3) * 0.5,
  opacity: 0.15 + ((index * 7) % 5) * 0.05,
}));

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SHOTS.outro.duration;
  const recede = interpolate(frame, [66, 84], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const logoIn = interpolate(frame, [66, 92], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.75, 0.3, 1),
  });
  const rule = interpolate(frame, [98, 116], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tagline = interpolate(frame, [112, 130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [duration - 12, duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const crane = interpolate(frame, [0, 70], [1.06, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.3, 0, 0.2, 1),
  });

  return (
    <AbsoluteFill style={{background: COLORS.ink, color: COLORS.white, fontFamily: FONT, opacity: fadeOut, overflow: 'hidden'}}>
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '58px 58px'}} />
      <AbsoluteFill style={{transform: `perspective(1400px) rotateX(${4 * (1 - Math.min(1, frame / 70))}deg) scale(${crane})`, transformOrigin: '50% 45%'}}>
        {items.map((item) => {
          const p = interpolate(frame, [item.cue, item.cue + 20], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: FLY_EASE,
          });
          const opacity = interpolate(frame, [item.cue, item.cue + 5], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={item.file}
              style={{
                position: 'absolute',
                left: item.cx - item.width / 2,
                top: item.cy - item.height / 2,
                width: item.width,
                height: item.height,
                overflow: 'hidden',
                border: '2px solid rgba(255,255,255,0.16)',
                borderRadius: 8,
                boxShadow: '0 24px 64px rgba(0,0,0,0.48)',
                opacity: opacity * (1 - recede * 0.45),
                filter: `saturate(${1 - recede * 0.35}) blur(${recede * 2}px)`,
                transform: `translate(${item.dx * (1 - p)}px, ${item.dy * (1 - p)}px) rotate(${item.rotation * (2 - p)}deg) scale(${1.08 - p * 0.08})`,
              }}
            >
              <Img src={staticFile(`media/${item.file}`)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center'}} />
            </div>
          );
        })}
      </AbsoluteFill>

      <AbsoluteFill style={{background: `radial-gradient(700px 380px at 50% 48%, ${COLORS.yellow}2e, transparent 74%)`, opacity: logoIn}} />
      {dust.map((particle, index) => {
        const y = (((particle.y - frame * particle.rise) % 1080) + 1080) % 1080;
        const x = particle.x + Math.sin(frame * particle.frequency + particle.phase) * particle.sway;
        return <div key={index} style={{position: 'absolute', left: x, top: y, width: particle.size, height: particle.size, borderRadius: '50%', background: COLORS.yellow, opacity: particle.opacity}} />;
      })}

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{textAlign: 'center', opacity: logoIn, transform: `translateY(${(1 - logoIn) * 34}px) scale(${0.88 + logoIn * 0.12})`}}>
          <Img src={staticFile('media/atom-game-logo-original.png')} style={{width: 250, height: 250, objectFit: 'contain', margin: '0 auto 20px', filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.55))'}} />
          <div style={{fontSize: 112, lineHeight: 1, fontWeight: 900}}>原子游创</div>
          <div style={{width: 260, height: 6, margin: '30px auto 0', background: `linear-gradient(90deg, ${COLORS.yellow}, ${COLORS.cyan})`, transform: `scaleX(${rule})`}} />
          <div style={{marginTop: 24, fontSize: 29, fontWeight: 800, color: 'rgba(255,255,255,0.78)', opacity: tagline}}>开源游戏，共创共享</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

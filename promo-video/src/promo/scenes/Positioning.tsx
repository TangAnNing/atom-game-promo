import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {enter} from '../motion';
import {COLORS, FONT} from '../theme';
import {SHOTS} from '../timeline';

const items = [
  {label: '游戏', note: '发现与体验', color: COLORS.yellow, fromX: -120, fromY: 28},
  {label: 'AI', note: '智能创作', color: COLORS.cyan, fromX: 0, fromY: -90},
  {label: '开源', note: '开放共创', color: COLORS.coral, fromX: 120, fromY: 28},
] as const;

const points = [410, 960, 1510];

export const Positioning: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SHOTS.positioning.duration;
  const opacity = interpolate(frame, [0, 5], [0.08, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const handoff = interpolate(frame, [duration - 18, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const titleIn = enter(frame, 2, 24);
  const traceHead = interpolate(frame, [62, 108], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const nodeIn = enter(frame, 100, 20);

  return (
    <AbsoluteFill
      style={{
        background: COLORS.ink,
        color: COLORS.white,
        fontFamily: FONT,
        opacity,
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '58px 58px',
          maskImage: 'radial-gradient(circle at 50% 62%, #000, transparent 78%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 150,
          top: 132,
          opacity: titleIn * (1 - handoff),
          transform: `translateY(${(1 - titleIn) * 26 - handoff * 18}px)`,
        }}
      >
        <div style={{fontSize: 29, color: 'rgba(255,255,255,0.58)', fontWeight: 800}}>
          三种力量
        </div>
        <div style={{marginTop: 12, fontSize: 78, lineHeight: 1.08, fontWeight: 900}}>
          在这里汇合
        </div>
      </div>

      <div style={{position: 'absolute', left: 150, right: 150, top: 388, display: 'flex', gap: 50, opacity: 1 - handoff}}>
        {items.map((item, index) => {
          const p = enter(frame, 18 + index * 13, 30);
          return (
            <div
              key={item.label}
              style={{
                width: 500,
                textAlign: 'center',
                opacity: p,
                transform: `translate(${(1 - p) * item.fromX}px, ${(1 - p) * item.fromY}px)`,
              }}
            >
              <div
                style={{
                  color: item.color,
                  fontSize: 124,
                  lineHeight: 1,
                  fontWeight: 900,
                  textShadow: `0 18px 42px ${item.color}18`,
                }}
              >
                {item.label}
              </div>
              <div style={{marginTop: 28, color: 'rgba(255,255,255,0.62)', fontSize: 27, fontWeight: 700}}>
                {item.note}
              </div>
            </div>
          );
        })}
      </div>

      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 1 - handoff}}>
        {items.map((item, index) => {
          const x = points[index];
          const y = 660;
          const pathLength = Math.hypot(960 - x, 860 - y);
          const traceLength = 150;
          const tail = Math.max(0, traceHead - traceLength / pathLength);
          const x1 = x + (960 - x) * tail;
          const y1 = y + (860 - y) * tail;
          const x2 = x + (960 - x) * traceHead;
          const y2 = y + (860 - y) * traceHead;
          return (
            <line
              key={item.label}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={item.color}
              strokeWidth={3}
              strokeLinecap="round"
              opacity={0.62}
              style={{filter: `drop-shadow(0 0 7px ${item.color}88)`}}
            />
          );
        })}
      </svg>

      <div
        style={{
          position: 'absolute',
          left: 960,
          top: 860,
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: COLORS.yellow,
          boxShadow: `0 0 0 ${12 + handoff * 8}px ${COLORS.yellow}18, 0 0 ${50 + handoff * 30}px ${COLORS.yellow}aa`,
          opacity: nodeIn,
          transform: `translate(-50%, -50%) scale(${0.65 + nodeIn * 0.35 + handoff * 0.18})`,
        }}
      />
    </AbsoluteFill>
  );
};

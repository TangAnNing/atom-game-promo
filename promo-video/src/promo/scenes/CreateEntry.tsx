import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {GridBackground} from '../components/SceneBase';
import {PhoneShell} from '../components/PhoneShell';
import {enter} from '../motion';
import {COLORS, FONT} from '../theme';
import {SHOTS} from '../timeline';

export const CreateEntry: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SHOTS.create.duration;
  const copyIn = enter(frame, 12, 28);
  const typeStart = 46;
  const typeEnd = 145;
  const prompt = '一个 2D 像素风格的太空冒险游戏，玩家可以探索不同星球、收集资源并建造基地。';
  const typedLength = Math.floor(
    interpolate(frame, [typeStart, typeEnd], [0, prompt.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const typed = prompt.slice(0, typedLength);
  const typing = frame >= typeStart && frame < typeEnd;
  const caretVisible =
    frame >= typeStart &&
    (typing || (frame < typeEnd + 24 && frame % 12 < 6));
  const typeFocus = interpolate(frame, [30, 58, 150, 174], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const camera = interpolate(frame, [0, duration - 28], [1.025, 0.99], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const exit = interpolate(frame, [duration - 18, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <GridBackground accent="cyan">
      <AbsoluteFill>
        <div
          style={{
            position: 'absolute',
            left: 174,
            top: 76,
            opacity: 1 - exit * 0.55,
            transform: `translateX(${-exit * 62}px) scale(${camera + typeFocus * 0.085 - exit * 0.025})`,
            transformOrigin: '50% 50%',
          }}
        >
          <PhoneShell image="创作页面-无示例.png" borderColor={COLORS.cyan}>
            <div
              style={{
                position: 'absolute',
                left: 37,
                top: 248,
                zIndex: 3,
                width: 330,
                height: 112,
                boxSizing: 'border-box',
                overflow: 'hidden',
                color: '#665d58',
                fontFamily: FONT,
                fontSize: 19,
                lineHeight: 1.48,
                fontWeight: 700,
                whiteSpace: 'pre-wrap',
                overflowWrap: 'anywhere',
              }}
            >
              {typed}
              <span style={{opacity: caretVisible ? 1 : 0, color: '#302927'}}>|</span>
            </div>
            <div
              style={{
                position: 'absolute',
                left: 27,
                top: 641,
                zIndex: 3,
                width: 366,
                height: 57,
                borderRadius: 31,
                border: `2px solid rgba(245,187,25,${0.15 + typeFocus * 0.75})`,
                boxShadow: `0 0 ${12 + typeFocus * 24}px rgba(245,187,25,${typeFocus * 0.36})`,
                opacity: interpolate(frame, [typeEnd - 5, typeEnd + 16], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            />
          </PhoneShell>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 820,
            top: 300,
            width: 880,
            fontFamily: FONT,
            opacity: copyIn * (1 - exit * 0.72),
            transform: `translateY(${(1 - copyIn) * 30 - exit * 18}px)`,
          }}
        >
          <div style={{fontSize: 92, lineHeight: 1.16, fontWeight: 900}}>
            从这里<br />
            <span style={{color: COLORS.yellow}}>开始创作</span>
          </div>
          <div style={{marginTop: 42, color: 'rgba(255,255,255,0.56)', fontSize: 26, fontWeight: 700}}>
            一句话描述，让灵感成为可玩的起点
          </div>
        </div>

      </AbsoluteFill>
    </GridBackground>
  );
};

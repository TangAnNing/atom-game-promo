import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {GridBackground} from '../components/SceneBase';
import {enter} from '../motion';
import {COLORS, FONT, MONO} from '../theme';
import {SHOTS} from '../timeline';

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const languages = [
  {name: 'Lua', file: 'Lua.png'},
  {name: 'TypeScript', file: 'TypeScript.png'},
  {name: 'Teal', file: 'Teal.png'},
  {name: 'YueScript', file: 'YueScript.png'},
  {name: 'Wa', file: 'wa.svg'},
  {name: 'Rust', file: 'RUST.png'},
  {name: 'C#', file: 'csharp.svg'},
] as const;

export const DoraLanguages: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SHOTS.doraLanguages.duration;
  const title = enter(frame, 4, 22);
  const copy = enter(frame, 18, 24);
  const collapse = interpolate(frame, [duration - 26, duration], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const lineOut = interpolate(frame, [0, 10, 30], [1, 0.86, 0], clamp);

  return (
    <GridBackground accent="cyan">
      <AbsoluteFill style={{fontFamily: FONT}}>
        <div
          style={{
            position: 'absolute',
            left: 150,
            top: 674,
            width: 1620,
            height: 4,
            background: `linear-gradient(90deg, ${COLORS.yellow}, ${COLORS.coral} 45%, ${COLORS.cyan})`,
            opacity: lineOut,
            transform: `scaleX(${1 - collapse * 0.08})`,
            transformOrigin: 'right center',
            boxShadow: `0 0 24px rgba(85,216,208,${lineOut * 0.28})`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 150,
            top: 142,
            width: 1620,
            opacity: title * (1 - collapse),
            transform: `translateY(${(1 - title) * 24}px)`,
          }}
        >
          <div style={{color: COLORS.cyan, fontFamily: MONO, fontSize: 21, fontWeight: 800}}>
            DORA SSR / MULTI-LANGUAGE
          </div>
          <div style={{marginTop: 18, fontSize: 78, lineHeight: 1.1, fontWeight: 900}}>
            选择适合项目的语言
          </div>
          <div
            style={{
              marginTop: 24,
              color: 'rgba(255,255,255,0.62)',
              fontSize: 27,
              fontWeight: 700,
              opacity: copy * (1 - collapse),
            }}
          >
            Lua、TypeScript、Teal、YueScript、Wa、Rust、C#，都可以留在同一个 Dora 生态中。
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 150,
            right: 150,
            top: 530,
            display: 'grid',
            gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
            gap: 32,
            alignItems: 'center',
          }}
        >
          {languages.map((language, index) => {
            const p = enter(frame, 24 + index * 6, 20);
            const centerX = 252 + index * 236;
            const targetX = 1115 + index * 82;
            return (
              <div
                key={language.name}
                style={{
                  height: 290,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: p * (1 - collapse * 0.18),
                  transform: `translate(${collapse * (targetX - centerX)}px, ${(1 - p) * 34 - collapse * 400}px) scale(${0.9 + p * 0.1 - collapse * 0.72})`,
                }}
              >
                <div
                  style={{
                    width: 142,
                    height: 142,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Img
                    src={staticFile(`media/languages/${language.file}`)}
                    style={{
                      width: 122,
                      height: 122,
                      objectFit: 'contain',
                      filter: `drop-shadow(0 18px 24px rgba(0,0,0,0.42)) drop-shadow(0 0 14px ${COLORS.cyan}22)`,
                    }}
                  />
                </div>
                <div style={{marginTop: 25, fontSize: 24, fontWeight: 900}}>{language.name}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </GridBackground>
  );
};

const tasks = [
  {label: 'READ', text: '理解项目上下文', color: COLORS.cyan},
  {label: 'CODE', text: '持续编写与调试', color: COLORS.yellow},
  {label: 'RUN', text: '构建并运行验证', color: COLORS.coral},
] as const;

export const DoraAgent: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SHOTS.doraAgent.duration;
  const title = enter(frame, 4, 22);
  const panel = enter(frame, 20, 24);
  const handoff = interpolate(frame, [duration - 26, duration], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const panelLeft = interpolate(handoff, [0, 1], [1040, 160]);
  const panelTop = interpolate(handoff, [0, 1], [210, 108]);
  const panelWidth = interpolate(handoff, [0, 1], [700, 1600]);
  const panelHeight = interpolate(handoff, [0, 1], [480, 900]);
  const borderR = Math.round(interpolate(handoff, [0, 1], [245, 85]));
  const borderG = Math.round(interpolate(handoff, [0, 1], [187, 216]));
  const borderB = Math.round(interpolate(handoff, [0, 1], [25, 208]));

  return (
    <GridBackground accent="yellow">
      <AbsoluteFill style={{fontFamily: FONT}}>
        <div
          style={{
            position: 'absolute',
            left: 150,
            top: 260,
            width: 740,
            opacity: title * (1 - handoff),
            transform: `translateX(${(1 - title) * -28 - handoff * 54}px)`,
          }}
        >
          <div style={{color: COLORS.yellow, fontFamily: MONO, fontSize: 21, fontWeight: 800}}>
            DORA SSR / CODING AGENT
          </div>
          <div style={{marginTop: 22, fontSize: 88, lineHeight: 1.12, fontWeight: 900}}>
            理解项目
            <br />
            <span style={{color: COLORS.yellow}}>持续推进</span>
          </div>
          <div
            style={{
              marginTop: 34,
              width: 690,
              color: 'rgba(255,255,255,0.62)',
              fontSize: 27,
              lineHeight: 1.55,
              fontWeight: 700,
            }}
          >
            基于 LLM，理解项目上下文，持续完成编写、构建与运行验证。
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: panelLeft,
            top: panelTop,
            width: panelWidth,
            height: panelHeight,
            padding: `${interpolate(handoff, [0, 1], [48, 0])}px ${interpolate(handoff, [0, 1], [54, 0])}px`,
            boxSizing: 'border-box',
            border: `2px solid rgba(${borderR},${borderG},${borderB},${0.42 + handoff * 0.32})`,
            borderRadius: 8,
            background: 'rgba(12,14,13,0.76)',
            boxShadow: '0 38px 90px rgba(0,0,0,0.48)',
            opacity: Math.max(panel, handoff),
            overflow: 'hidden',
            transform: `translateY(${(1 - panel) * 32 * (1 - handoff)}px)`,
          }}
        >
          <div style={{opacity: 1 - handoff}}>
            <div style={{fontFamily: MONO, fontSize: 18, color: 'rgba(255,255,255,0.42)'}}>
              agent.run / project-aware
            </div>
            <div style={{marginTop: 34, display: 'flex', flexDirection: 'column', gap: 26}}>
              {tasks.map((task, index) => {
                const p = enter(frame, 38 + index * 18, 18);
                return (
                  <div
                    key={task.label}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '112px 1fr 28px',
                      alignItems: 'center',
                      minHeight: 92,
                      padding: '0 26px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 6,
                      background: 'rgba(255,255,255,0.035)',
                      opacity: p,
                      transform: `translateX(${(1 - p) * 28}px)`,
                    }}
                  >
                    <div style={{fontFamily: MONO, fontSize: 19, fontWeight: 900, color: task.color}}>
                      {task.label}
                    </div>
                    <div style={{fontSize: 27, fontWeight: 800}}>{task.text}</div>
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: task.color,
                        boxShadow: `0 0 22px ${task.color}aa`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </GridBackground>
  );
};

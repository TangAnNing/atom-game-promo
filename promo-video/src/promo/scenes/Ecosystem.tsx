import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {GridBackground} from '../components/SceneBase';
import {COLORS, FONT} from '../theme';
import {SHOTS} from '../timeline';

const stages = [
  {
    from: 0,
    to: 90,
    file: '总体奖项.png',
    width: 1080,
    height: 590,
    eyebrow: '多维奖项',
    headline: '让好作品',
    headlineAccent: '走得更远',
    title: '让创意获得认可',
    description: '从作品表达、技术实现到社区价值，记录每一种创造力。',
    color: COLORS.yellow,
  },
  {
    from: 90,
    to: 174,
    file: '承办单位协办单位.png',
    width: 1120,
    height: 435,
    eyebrow: '共同参与',
    headline: '汇聚多方力量',
    headlineAccent: '共创赛事舞台',
    title: '汇聚承办与协办力量',
    description: '让赛事、创作与交流在更完整的生态中持续发生。',
    color: COLORS.cyan,
  },
] as const;

const partners = [
  {
    name: '龙湾开源信创技术研究院',
    file: 'longwan.png',
    imageWidth: 178,
    imageHeight: 178,
  },
  {
    name: '浙江卡赢科技股份有限公司',
    file: 'card-winner.png',
    imageWidth: 300,
    imageHeight: 128,
  },
  {
    name: 'AtomGit',
    file: 'AtomGit.png',
    imageWidth: 300,
    imageHeight: 73,
  },
] as const;

const stageProgress = (frame: number, from: number, to: number) => {
  if (frame < from) {
    return 0;
  }

  const fadeInDuration = from === 0 ? 8 : 12;
  const handoffOpacity = from === 0 ? 0.14 : 0.2;
  const fadeIn = interpolate(frame, [from, from + fadeInDuration], [handoffOpacity, 1], {
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
  const partnerProgress = stageProgress(frame, 174, duration);
  const exit = interpolate(frame, [duration - 6, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <GridBackground accent="yellow">
      <AbsoluteFill style={{fontFamily: FONT, opacity: 1 - exit * 0.92}}>
        <div style={{position: 'absolute', left: 92, top: 212, width: 560}}>
          <div style={{position: 'relative', height: 430}}>
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
                  <div style={{fontSize: 74, lineHeight: 1.18, fontWeight: 900}}>
                    {stage.headline}<br />
                    <span style={{color: stage.color}}>{stage.headlineAccent}</span>
                  </div>
                  <div style={{marginTop: 48, color: stage.color, fontSize: 20, fontWeight: 900}}>
                    {stage.eyebrow}
                  </div>
                  <div style={{marginTop: 13, fontSize: 30, lineHeight: 1.4, fontWeight: 800}}>
                    {stage.title}
                  </div>
                  <div style={{marginTop: 18, color: 'rgba(255,255,255,0.55)', fontSize: 22, lineHeight: 1.55, fontWeight: 700}}>
                    {stage.description}
                  </div>
                </div>
              );
            })}

            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: partnerProgress,
                transform: `translateY(${(1 - partnerProgress) * 22}px)`,
              }}
            >
              <div style={{color: COLORS.coral, fontSize: 21, fontWeight: 900}}>合作机构</div>
              <div style={{marginTop: 18, fontSize: 68, lineHeight: 1.18, fontWeight: 900}}>
                与伙伴共建<br />
                <span style={{color: COLORS.coral}}>开放创作生态</span>
              </div>
              <div style={{marginTop: 30, color: 'rgba(255,255,255,0.58)', fontSize: 24, lineHeight: 1.55, fontWeight: 700}}>
                连接技术、平台与创作者，
                <br />
                让创作连接更广阔的舞台。
              </div>
            </div>
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
              <Img src={staticFile(`media/${stage.file}`)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
          );
        })}

        <div
          style={{
            position: 'absolute',
            left: 700,
            top: 292,
            width: 1140,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 22,
            opacity: partnerProgress,
          }}
        >
          {partners.map((partner, index) => {
            const itemProgress = interpolate(frame, [178 + index * 5, 196 + index * 5], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            });
            return (
              <div
                key={partner.name}
                style={{
                  height: 470,
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: itemProgress,
                  transform: `translateY(${(1 - itemProgress) * 28}px)`,
                }}
              >
                <div
                  style={{
                    height: 270,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {partner.name === 'AtomGit' ? (
                    <div style={{position: 'relative', width: partner.imageWidth, height: partner.imageHeight}}>
                      <Img
                        src={staticFile(`media/partners/${partner.file}`)}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          filter: 'brightness(0) invert(1) drop-shadow(0 16px 20px rgba(0,0,0,0.38))',
                        }}
                      />
                      <Img
                        src={staticFile(`media/partners/${partner.file}`)}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          clipPath: 'inset(0 75% 0 0)',
                        }}
                      />
                    </div>
                  ) : (
                    <Img
                      src={staticFile(`media/partners/${partner.file}`)}
                      style={{
                        width: partner.imageWidth,
                        height: partner.imageHeight,
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 16px 20px rgba(0,0,0,0.38))',
                      }}
                    />
                  )}
                </div>
                <div
                  style={{
                    minHeight: 92,
                    marginTop: 12,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontSize: 22,
                    lineHeight: 1.45,
                    fontWeight: 800,
                  }}
                >
                  {partner.name}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </GridBackground>
  );
};

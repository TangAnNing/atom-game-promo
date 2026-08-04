import React from 'react';
import {Img, staticFile} from 'remotion';
import {Video} from '@remotion/media';
import {COLORS} from '../theme';

type PhoneShellProps = {
  video?: string;
  image?: string;
  trimBefore?: number;
  loop?: boolean;
  width?: number;
  height?: number;
  borderColor?: string;
  children?: React.ReactNode;
};

export const PhoneShell: React.FC<PhoneShellProps> = ({
  video,
  image,
  trimBefore,
  loop = false,
  width = 420,
  height = 938,
  borderColor = COLORS.yellow,
  children,
}) => (
  <div
    style={{
      position: 'relative',
      width,
      height,
      overflow: 'hidden',
      border: '11px solid #0d0f0e',
      borderRadius: 46,
      background: '#0b0d0c',
      boxShadow: `0 0 0 2px ${borderColor}b8, 0 42px 90px rgba(0,0,0,0.62), 0 0 80px ${borderColor}18`,
    }}
  >
    {video ? (
      <Video
        src={staticFile(`media/${video}`)}
        muted
        loop={loop}
        trimBefore={trimBefore}
        objectFit="cover"
        style={{width: '100%', height: '100%'}}
      />
    ) : null}
    {image ? (
      <Img
        src={staticFile(`media/${image}`)}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
    ) : null}
    {children}
    <div
      style={{
        position: 'absolute',
        top: 13,
        left: '50%',
        width: 110,
        height: 22,
        borderRadius: 20,
        background: '#141615',
        transform: 'translateX(-50%)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(112deg, rgba(255,255,255,0.13), transparent 18% 80%, rgba(245,187,25,0.07))',
        pointerEvents: 'none',
      }}
    />
  </div>
);

export const FeedGhost: React.FC<{
  image: string;
  width?: number;
  height?: number;
  opacity: number;
}> = ({image, width = 368, height = 818, opacity}) => (
  <div
    style={{
      position: 'relative',
      width,
      height,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.16)',
      borderRadius: 42,
      background: '#0b0d0c',
      boxShadow: '0 38px 80px rgba(0,0,0,0.36)',
      opacity,
    }}
  >
    <Img
      src={staticFile(`media/${image}`)}
      style={{width: '100%', height: '100%', objectFit: 'cover'}}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(110deg, rgba(21,24,23,0.72), rgba(21,24,23,0.16))',
      }}
    />
  </div>
);

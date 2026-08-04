import React from 'react';
import {Img, staticFile} from 'remotion';

export const ImagePanel: React.FC<{
  file: string;
  width: number;
  height: number;
  objectPosition?: string;
  radius?: number;
  borderColor?: string;
}> = ({
  file,
  width,
  height,
  objectPosition = 'top center',
  radius = 8,
  borderColor = 'rgba(255,255,255,0.16)',
}) => (
  <div
    style={{
      position: 'relative',
      width,
      height,
      overflow: 'hidden',
      border: `2px solid ${borderColor}`,
      borderRadius: radius,
      background: '#101211',
      boxShadow: '0 32px 70px rgba(0,0,0,0.44)',
    }}
  >
    <Img
      src={staticFile(`media/${file}`)}
      style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition}}
    />
  </div>
);

import React, { useState } from 'react';
import { Picture } from '@/shared/api/picturesApi';

type Props = {
  picture: Picture;
};

const cardStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  paddingBottom: '100%',
  backgroundColor: '#0a0a0a',
  overflow: 'hidden',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.08)'
};

const infoStyleBase: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: 'white',
  background: 'rgba(0,0,0,0.86)',
  padding: 16,
  transition: 'opacity 200ms ease',
};

export const PicturePreview: React.FC<Props> = ({ picture }) => {
  const [hovered, setHovered] = useState(false);

  const infoStyle = { ...infoStyleBase, opacity: hovered ? 1 : 0 } as React.CSSProperties;

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {picture.imgUrl && (
        <img
          src={picture.imgUrl}
          alt={picture.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
      <div style={infoStyle}>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{picture.name}</div>
        <div style={{ opacity: 0.9 }}>{`${picture.width}×${picture.height} см`}</div>
        <div style={{ opacity: 0.9, marginTop: 2 }}>{picture.material}</div>
        <div style={{ opacity: 0.8, marginTop: 2 }}>{picture.year}</div>
        {picture.available && (
          <button
            style={{
              marginTop: 14,
              background: '#b7092b',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Доступна для покупки
          </button>
        )}
      </div>
    </div>
  );
};

export default PicturePreview;



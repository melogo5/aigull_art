import React from 'react';

type ExhibitionCardProps = {
  title: string;
  place: string;
  dates: string;
  year: string;
  variant?: 'upcoming' | 'archive';
};

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({ title, place, dates, year, variant = 'archive' }) => {
  const isUpcoming = variant === 'upcoming';

  return (
    <div
      style={{
        backgroundColor: isUpcoming ? 'rgba(154, 3, 30, 0.06)' : 'var(--color-gray-50)',
        borderLeft: `3.6px solid ${isUpcoming ? 'var(--color-accent)' : 'var(--color-gray-200)'}`,
        padding: '24px 24px 24px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div>
        <div style={{
          color: isUpcoming ? 'var(--color-accent)' : '#1e2939',
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          lineHeight: '24px',
          marginBottom: 8
        }}>{title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ color: 'var(--color-text-muted)', fontSize: 16, lineHeight: '24px' }}>{place}</div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: 16, lineHeight: '24px' }}>{dates}</div>
        </div>
      </div>
      <div style={{
        color: isUpcoming ? 'var(--color-accent)' : 'var(--color-subtext)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 24,
        lineHeight: '32px'
      }}>
        {year}
      </div>
    </div>
  );
};

export default ExhibitionCard;



import React from 'react';

type HeadingTitleProps = {
  title: string;
  className?: string;
};

const HeadingTitle: React.FC<HeadingTitleProps> = ({ title, className }) => {
  return (
    <div className={className}>
      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '3rem',
        lineHeight: 1.2,
        textAlign: 'center',
        color: 'var(--color-text)'
      }}>{title}</h1>
      <div style={{
        height: 4,
        width: 96,
        backgroundColor: 'var(--color-accent)',
        margin: '12px auto 0 auto'
      }} />
    </div>
  );
};

export default HeadingTitle;



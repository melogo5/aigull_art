import React from 'react';

export const Summary: React.FC = () => {
  return (
    <section className="container" style={{ padding: '56px 0' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
            fontSize: 16,
            lineHeight: '24px',
            color: 'var(--color-text)', // #333333
          }}
        >
          Искусство в каждом мазке
        </p>
        <p
          style={{
            marginTop: 24,
            marginLeft: 'auto',
            marginRight: 'auto',
            color: 'var(--color-text)', // #333333 per Figma paragraph
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
            fontSize: 16,
            lineHeight: '24px',
            maxWidth: 760,
          }}
        >
          Более десяти лет я исследую мир через призму цвета и формы. Мои работы — это диалог между классическими техниками и современным видением, где каждая картина рассказывает свою уникальную историю.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 32,
          marginTop: 40,
          maxWidth: 864,
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
        }}
      >
        <Stat number="150+" label="Работ создано" />
        <Stat number="25" label="Выставок" />
        <Stat number="8" label="Лет опыта" />
      </div>
    </section>
  );
};

type StatProps = { number: string; label: string };

const Stat: React.FC<StatProps> = ({ number, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
    <span
      style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 30,
        lineHeight: '36px',
        color: 'var(--color-accent)', // #9a031e
      }}
    >
      {number}
    </span>
    <span
      style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '24px',
        color: 'var(--color-text-muted)', // #4a5565
      }}
    >
      {label}
    </span>
  </div>
);

export default Summary;



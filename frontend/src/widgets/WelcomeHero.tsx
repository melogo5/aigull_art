import React from 'react';
import { Link } from 'react-router-dom';
import videoSrc from '@/shared/assets/video/welcome.mp4';

export const WelcomeHero: React.FC = () => {
  return (
    <section style={{ position: 'relative', width: '100%', height: '72vh', minHeight: 480, borderRadius: 12, overflow: 'hidden' }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={''}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      <div
        className="container"
        style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{ color: '#fff', maxWidth: 760, textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '3.25rem', lineHeight: 1.1 }}>Добро пожаловать</h1>
          <p style={{ marginTop: 20, fontSize: '1.125rem', opacity: 0.92 }}>
            Мир живописи Айгуль Утляковой — вдохновение, цвет и форма. Исследуйте коллекцию работ и выставок.
          </p>
          <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link to="/gallery" className="btn btn-accent">
              Смотреть работы
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeHero;



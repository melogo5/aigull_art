import React from 'react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Welcome to Aigull Art</h1>
          <p>Create and share your AI-generated artwork with the world</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn">Get Started</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

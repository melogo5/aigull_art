import React from 'react';

export const FeatureList: React.FC = () => {
  const features = [
    {
      title: 'AI Art Generation',
      description: 'Create stunning artwork using advanced AI algorithms',
    },
    {
      title: 'Community Sharing',
      description: 'Share your creations and discover amazing art from others',
    },
    {
      title: 'User Profiles',
      description: 'Build your portfolio and showcase your artistic journey',
    },
  ];

  return (
    <section className="features">
      <div className="container">
        <h2 className="text-center mb-5">Features</h2>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

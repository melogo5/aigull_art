import React from 'react';
import { Hero } from '@/widgets/Hero';
import { FeatureList } from '@/widgets/FeatureList';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Hero />
      <FeatureList />
    </div>
  );
};

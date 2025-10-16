import React from 'react';
import WelcomeHero from '@/widgets/WelcomeHero';
import Summary from '@/features/summary/Summary';
import ContactInfo from '@/widgets/ContactInfo';

export const HomePage: React.FC = () => {
  return (
    <div>
      <WelcomeHero />
      <div style={{ marginTop: 32 }}>
        <Summary />
      </div>
      <div style={{ marginTop: 16 }}>
        <ContactInfo />
      </div>
    </div>
  );
};

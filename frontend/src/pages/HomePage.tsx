import React from 'react'
import { Helmet } from 'react-helmet-async'
import WelcomeHero from '@/widgets/WelcomeHero'
import Summary from '@/features/summary/Summary'
import ContactInfo from '@/widgets/ContactInfo'

export const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Айгуль Утлякова - Художник пастелист | Галерея картин</title>
        <meta name="description" content="Официальный сайт художника Айгуль Утляковой. Галерея оригинальных пастельных картин. Покупка произведений искусства." />
        <meta property="og:title" content="Айгуль Утлякова - Художник пастелист" />
        <meta property="og:description" content="Галерея оригинальных пастельных картин" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div>
      <WelcomeHero />
      <div style={{ marginTop: 32 }}>
        <Summary />
      </div>
      <div style={{ marginTop: 16 }}>
        <ContactInfo />
      </div>
    </div>
    </>
  )
}

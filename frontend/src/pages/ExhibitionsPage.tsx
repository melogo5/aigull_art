import React from 'react';
import HeadingTitle from '@/shared/ui/HeadingTitle';
import ExhibitionCard from '@/features/exhibitions/ExhibitionCard';

export const ExhibitionsPage: React.FC = () => {
  return (
    <div className="container">
      <div className="mt-5 mb-5">
        <HeadingTitle title="Выставки" />
      </div>

      <section className="mb-4">
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          lineHeight: '24px',
          color: 'var(--color-accent)'
        }}>Предстоящие</h2>
        <div className="mt-3" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <ExhibitionCard
            variant="upcoming"
            title="Современные течения в изобразительном искусстве"
            place={`Галерея "Арт-Центр", Санкт-Петербург`}
            dates="15 марта — 30 апреля 2025"
            year="2025"
          />
          <ExhibitionCard
            variant="upcoming"
            title="Пастельные истории"
            place={`Культурный центр "Эрмитаж-Выборгский", Санкт-Петербург`}
            dates="10 мая — 15 июня 2025"
            year="2025"
          />
        </div>
      </section>

      <section className="mb-5">
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          lineHeight: '24px',
          color: '#364153'
        }}>Архив</h2>
        <div className="mt-3" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <ExhibitionCard
            title="Персональная выставка"
            place={`Галерея "Борей", Санкт-Петербург`}
            dates="12 октября — 8 ноября 2024"
            year="2024"
          />
          <ExhibitionCard
            title={`Групповая выставка "Молодые художники Петербурга"`}
            place={`Центральный выставочный зал "Манеж", Санкт-Петербург`}
            dates="3 июня — 25 июля 2024"
            year="2024"
          />
          <ExhibitionCard
            title="Искусство портрета"
            place={`Галерея "Модерн", Москва`}
            dates="15 февраля — 20 марта 2024"
            year="2024"
          />
          <ExhibitionCard
            title="Выставка-продажа произведений изобразительного искусства"
            place={`ЦВЗ "Манеж", Санкт-Петербург`}
            dates="10 сентября — 15 октября 2023"
            year="2023"
          />
          <ExhibitionCard
            title="Дебют. Новые имена в искусстве"
            place={`Галерея "Артефакт", Санкт-Петербург`}
            dates="22 апреля — 15 мая 2023"
            year="2023"
          />
        </div>
      </section>
    </div>
  );
};

export default ExhibitionsPage;



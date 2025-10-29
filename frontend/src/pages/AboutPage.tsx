import React from 'react'
import HeadingTitle from '@/shared/ui/HeadingTitle'

export const AboutPage: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        minHeight: '100vh',
        paddingBottom: '4rem',
      }}
    >
      {/* Page Header */}
      <HeadingTitle title="Биография" className="container" style={{ paddingTop: '80px' }} />

      {/* Main Content - Two Column Layout */}
      <div className="container" style={{ marginTop: '125px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            maxWidth: '1216px',
            margin: '0 auto',
          }}
        >
          {/* Left Column - Image */}
          <div>
            <div
              style={{
                backgroundColor: 'var(--color-gray-100)',
                width: '100%',
                height: '768px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {/* Placeholder for image - replace with actual image */}
              <div
                style={{
                  width: '88px',
                  height: '88px',
                  backgroundColor: 'var(--color-gray-200)',
                }}
              />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                lineHeight: '20px',
                color: 'var(--color-subtext)',
                textAlign: 'center',
                marginTop: '24px',
              }}
            >
              Айгуль Утлякова в своей мастерской, 2024
            </p>
          </div>

          {/* Right Column - Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Section 1: Творческий путь */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '32px',
                  fontWeight: 300,
                  lineHeight: '41.6px',
                  letterSpacing: '-0.32px',
                  color: 'var(--color-text)',
                }}
              >
                Творческий путь
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '17.6px',
                  lineHeight: '29.92px',
                  color: '#333333',
                }}
              >
                Родилась в 1985 году в Санкт-Петербурге. С детства увлекалась изобразительным
                искусством, посещала художественную школу им. Б.В. Иогансона. Этот ранний опыт
                заложил основу для будущего профессионального развития и понимания классических
                традиций живописи.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '17.6px',
                  lineHeight: '29.92px',
                  color: '#333333',
                }}
              >
                В 2007 году окончила Санкт-Петербургскую государственную художественно-промышленную
                академию им. А.Л. Штиглица по специальности «Живопись». Дипломная работа была
                посвящена исследованию современных интерпретаций импрессионистических техник.
              </p>
            </section>

            {/* Section 2: Художественная философия */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '32px',
                  fontWeight: 300,
                  lineHeight: '41.6px',
                  letterSpacing: '-0.32px',
                  color: 'var(--color-text)',
                }}
              >
                Художественная философия
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '17.6px',
                  lineHeight: '29.92px',
                  color: '#333333',
                }}
              >
                Мое творчество — это постоянный диалог между внутренним миром и окружающей
                реальностью. Я работаю преимущественно с пастелью и маслом, находя в этих материалах
                особую выразительность и возможность передать тончайшие нюансы света и тени.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '17.6px',
                  lineHeight: '29.92px',
                  color: '#333333',
                }}
              >
                Основные темы моих работ — портретная живопись, натюрморты и городские пейзажи.
                Меня вдохновляет способность искусства останавливать время и фиксировать мгновения,
                которые иначе были бы утеряны навсегда.
              </p>
            </section>

            {/* Section 3: Техники и материалы */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '32px',
                  fontWeight: 300,
                  lineHeight: '41.6px',
                  letterSpacing: '-0.32px',
                  color: 'var(--color-text)',
                }}
              >
                Техники и материалы
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '17.6px',
                  lineHeight: '29.92px',
                  color: '#333333',
                }}
              >
                В своей работе я использую как традиционные, так и экспериментальные техники.
                Масляная живопись позволяет создавать глубокие, насыщенные образы, в то время как
                пастель дает возможность работать с более деликатными, воздушными композициями.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '17.6px',
                  lineHeight: '29.92px',
                  color: '#333333',
                }}
              >
                Каждая картина — это результат долгого наблюдения и осмысления. Я предпочитаю
                работать с натуры, считая, что только прямое взаимодействие с объектом позволяет
                передать его истинную сущность.
              </p>
            </section>

            {/* Section 4: Образование */}
            <section
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                borderTop: '1px solid var(--color-gray-200)',
                paddingTop: '25px',
                marginTop: '8px',
              }}
            >
              <h4
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '24px',
                  fontWeight: 400,
                  lineHeight: '33.6px',
                  color: 'var(--color-text)',
                }}
              >
                Образование
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    lineHeight: '24px',
                  }}
                >
                  <span style={{ color: '#333333' }}>
                    Магистратура по направлению «Изобразительное искусство»
                  </span>
                  <span style={{ color: 'var(--color-subtext)' }}>2009</span>
                </li>
                <li
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    lineHeight: '24px',
                  }}
                >
                  <span style={{ color: '#333333' }}>
                    СПб ГХПА им. А.Л. Штиглица, факультет живописи
                  </span>
                  <span style={{ color: 'var(--color-subtext)' }}>2007</span>
                </li>
                <li
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    lineHeight: '24px',
                  }}
                >
                  <span style={{ color: '#333333' }}>Художественная школа им. Б.В. Иогансона</span>
                  <span style={{ color: 'var(--color-subtext)' }}>1999</span>
                </li>
              </ul>
            </section>

            {/* Section 5: Член творческих объединений */}
            <section
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                borderTop: '1px solid var(--color-gray-200)',
                paddingTop: '25px',
              }}
            >
              <h4
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '24px',
                  fontWeight: 400,
                  lineHeight: '33.6px',
                  color: 'var(--color-text)',
                }}
              >
                Член творческих объединений
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#333333',
                  }}
                >
                  Союз художников Санкт-Петербурга
                </li>
                <li
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#333333',
                  }}
                >
                  Творческое объединение «Новая волна»
                </li>
                <li
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#333333',
                  }}
                >
                  Международная ассоциация пастелистов
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage


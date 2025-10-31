import React from 'react'
import HeadingTitle from '@/shared/ui/HeadingTitle'
import bioImage from '@/shared/assets/images/bio.jpg'

export const AboutPage: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        minHeight: '100vh',
        paddingBottom: '4rem',
      }}
    >
      <HeadingTitle title="Биография" className="container" />

      {/* Main Content - Two Column Layout */}
      <div className="container" style={{ marginTop: '80px' }}>
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
              <img
                src={bioImage}
                alt="Биография художника"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
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
              Художник-пастелист, Уфа, Россия
            </p>
          </div>

          {/* Right Column - Content */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          >
            {/* Section 1: Творческий путь */}
            <section
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
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
                Я училась в художественной гимназии им. Давлеткильдеева. Там я
                получила базовые знания и навыки, которые стали основой для
                дальнейшего развития. Дипломная работа в художке была выполнена
                сухой пастелью. После этого я продолжила обучение в Нефтяном
                университете на специальности «Архитектура», где углубила свои
                знания в области дизайна и архитектуры.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '17.6px',
                  lineHeight: '29.92px',
                  color: '#333333',
                }}
              >
                По окончанию университета моя карьера художника была отложена на
                некоторое время. Я работала в различных сферах, связанных с
                творчеством, включая архитектуру, графический дизайн и
                веб-дизайн. Но в 2013 году я вновь вернулась к своему давнему
                увлечению и обнаружила, что мой материал — это снова сухая
                пастель.
              </p>
            </section>

            {/* Section 2: Художественная философия */}
            <section
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
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
                Про вдохновение
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '17.6px',
                  lineHeight: '29.92px',
                  color: '#333333',
                }}
              >
                В моем творчестве основным источником вдохновения служат пейзажи
                и натюрморты. Природа всегда была для меня бесконечным
                источником красоты и гармонии, а цветы – символом этой природной
                грации, Мои работы пастелью в жанре пейзажа отражают очарование
                башкирской природы, которую я так люблю запечатлевать на
                пленэре. Пленэрные этюды дают возможность почувствовать живое
                дыхание природы, уловить момент, когда свет и тени играют на
                поверхности земли, создавая уникальные узоры.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '17.6px',
                  lineHeight: '29.92px',
                  color: '#333333',
                }}
              >
                Я стремлюсь передать через пастель богатство красок и оттенков:
                глубокие зелёные леса, золотистые поля, кристально чистые реки и
                величественные горы. Каждая работа – это частичка моей души,
                соединённая с красотой Башкирии.
              </p>
            </section>

            {/* Section 3: Техники и материалы */}
            <section
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '17.6px',
                  lineHeight: '29.92px',
                  color: '#333333',
                }}
              >
                Когда я рисую цветы, я чувствую себя частью этого прекрасного
                мира. А пастель позволяют мне передать всю нежность лепестков и
                их тонкие переходы цвета
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '17.6px',
                  lineHeight: '29.92px',
                  color: '#333333',
                }}
              >
                Стараюсь рисовать сериями, одни их последних серий: «Состояния
                природы», «Белая река», «Дорога домой», «Уфа любимая»,
                «Вспоминая детство».
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '17.6px',
                  lineHeight: '29.92px',
                  color: '#333333',
                }}
              >
                Рисование приносит мне радость и умиротворение, помогает
                отвлечься от суеты повседневной жизни и погрузиться в мир
                творчества
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '17.6px',
                  lineHeight: '29.92px',
                  color: '#333333',
                }}
              >
                Работы находятся в частных коллекциях России, США, Канады,
                Турции.
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
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
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
                    Художественная гимназия им. Давлеткильдеева
                  </span>
                  <span style={{ color: 'var(--color-subtext)' }}>1989</span>
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
                    УГНТУ, специальность «Архитектура»
                  </span>
                  <span style={{ color: 'var(--color-subtext)' }}>2005</span>
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
                Член национального союза пастелистов России с 2013 года
              </h4>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

import React, { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Spin, Button } from 'antd'
import { Helmet } from 'react-helmet-async'
import { picturesApi } from '@/shared/api/pictures'
import { Picture } from '@/shared/api/pictures'
import { getFullImageUrl } from '@/shared/utils/urlUtils'

export const PictureDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [picture, setPicture] = React.useState<Picture | null>(null)
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    if (!id) {
      navigate('/gallery')
      return
    }

    const fetchPicture = async () => {
      try {
        setLoading(true)
        const data = await picturesApi.getById(id)
        setPicture(data)
      } catch (error) {
        console.error('Failed to fetch picture:', error)
        navigate('/gallery')
      } finally {
        setLoading(false)
      }
    }

    fetchPicture()
  }, [id, navigate])

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 50 }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!picture) {
    return null
  }

  const imageUrl = picture.imgUrl ? getFullImageUrl(picture.imgUrl) : ''
  const baseUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://aigull-art.com'
  const pageUrl = `${baseUrl}/gallery/${picture._id}`
  const fullTitle = `${picture.name} (${picture.year}) - Айгуль Утлякова`
  const metaDescription = `${picture.description || picture.name} - Original ${picture.material} painting by Айгуль Утлякова, ${picture.year}. Dimensions: ${picture.width}×${picture.height} cm.${picture.available ? ' Available for purchase.' : ''}`

  // Generate structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: picture.name,
    dateCreated: picture.year.toString(),
    creator: {
      '@type': 'Person',
      name: 'Айгуль Утлякова',
    },
    image: imageUrl,
    width: {
      '@type': 'QuantitativeValue',
      value: picture.width,
      unitCode: 'CMT',
    },
    height: {
      '@type': 'QuantitativeValue',
      value: picture.height,
      unitCode: 'CMT',
    },
    artMedium: picture.material,
    description: picture.description || `${picture.name} by Айгуль Утлякова`,
    ...(picture.available && {
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
      },
    }),
  }

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={metaDescription} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={metaDescription} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta property="og:url" content={pageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {imageUrl && <meta name="twitter:image" content={imageUrl} />}

        {/* Image SEO */}
        {imageUrl && <link rel="image_src" href={imageUrl} />}

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        {/* Breadcrumbs */}
        <nav style={{ marginBottom: 24, fontSize: 14 }}>
          <Link to="/" style={{ color: '#666', textDecoration: 'none' }}>
            Главная
          </Link>
          {' / '}
          <Link to="/gallery" style={{ color: '#666', textDecoration: 'none' }}>
            Галерея
          </Link>
          {' / '}
          <span style={{ color: '#333' }}>{picture.name}</span>
        </nav>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Image */}
          <figure style={{ margin: 0 }}>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={`Айгуль Утлякова. "${picture.name}" ${picture.year}, ${picture.material}, ${picture.width}×${picture.height} cm`}
                title={`Айгуль Утлякова. "${picture.name}"`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 8,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
            )}
            <figcaption
              style={{
                marginTop: 16,
                fontSize: 14,
                color: '#666',
                textAlign: 'center',
              }}
            >
              {picture.name} ({picture.year})
            </figcaption>
          </figure>

          {/* Details */}
          <article>
            <h1 style={{ fontSize: 32, marginBottom: 16, fontWeight: 700 }}>
              {picture.name}
            </h1>

            <div style={{ marginBottom: 24, fontSize: 18, color: '#666' }}>
              {picture.year}
            </div>

            {picture.description && (
              <section style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: '#333' }}>
                  {picture.description}
                </p>
              </section>
            )}

            <dl style={{ marginBottom: 24 }}>
              <dt style={{ fontWeight: 600, marginBottom: 8 }}>Размеры:</dt>
              <dd style={{ marginLeft: 0, marginBottom: 16 }}>
                {picture.width} × {picture.height} см
              </dd>

              <dt style={{ fontWeight: 600, marginBottom: 8 }}>Материал:</dt>
              <dd style={{ marginLeft: 0, marginBottom: 16 }}>
                {picture.material}
              </dd>

              <dt style={{ fontWeight: 600, marginBottom: 8 }}>Художник:</dt>
              <dd style={{ marginLeft: 0, marginBottom: 16 }}>
                Айгуль Утлякова
              </dd>
            </dl>

            {picture.available && (
              <div style={{ marginTop: 32 }}>
                <Button
                  type="primary"
                  size="large"
                  style={{ background: '#b7092b', borderColor: '#b7092b' }}
                  onClick={() => {
                    navigate('/contacts')
                  }}
                >
                  Связаться для покупки
                </Button>
              </div>
            )}
          </article>
        </div>
      </div>
    </>
  )
}

export default PictureDetailPage

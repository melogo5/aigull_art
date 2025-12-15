# SEO Implementation Guide - Step by Step

This guide provides concrete code examples for implementing SEO improvements.

## Step 1: Install Required Dependencies

```bash
cd frontend
npm install react-helmet-async
```

## Step 2: Create Picture Detail Page

### 2.1 Create the Page Component

File: `frontend/src/pages/PictureDetailPage.tsx`

```tsx
import React, { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useUnit } from 'effector-react'
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
  const fullTitle = `${picture.name} (${picture.year}) - Айгуль Утлякова`
  const metaDescription = `${picture.description || picture.name} - Original ${picture.material} painting by Айгуль Утлякова, ${picture.year}. Dimensions: ${picture.width}×${picture.height} cm.${picture.available ? ' Available for purchase.' : ''}`

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "name": picture.name,
    "dateCreated": picture.year.toString(),
    "creator": {
      "@type": "Person",
      "name": "Айгуль Утлякова"
    },
    "image": imageUrl,
    "width": {
      "@type": "QuantitativeValue",
      "value": picture.width,
      "unitCode": "CMT"
    },
    "height": {
      "@type": "QuantitativeValue",
      "value": picture.height,
      "unitCode": "CMT"
    },
    "artMedium": picture.material,
    "description": picture.description || `${picture.name} by Айгуль Утлякова`,
    "offers": picture.available ? {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    } : undefined
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
        <meta property="og:url" content={`https://aigull-art.com/gallery/${picture._id}`} />
        
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
          <Link to="/" style={{ color: '#666', textDecoration: 'none' }}>Главная</Link>
          {' / '}
          <Link to="/gallery" style={{ color: '#666', textDecoration: 'none' }}>Галерея</Link>
          {' / '}
          <span style={{ color: '#333' }}>{picture.name}</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 48 }}>
          {/* Image */}
          <figure style={{ margin: 0 }}>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={`${picture.name} (Winter Forest) by Айгуль Утлякова, ${picture.year}, ${picture.material}, ${picture.width}×${picture.height} cm`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 8,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
            )}
            <figcaption style={{ marginTop: 16, fontSize: 14, color: '#666', textAlign: 'center' }}>
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
                    // Add contact logic or link to contacts page
                    window.location.href = '/contacts'
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
```

### 2.2 Update Routing

File: `frontend/src/app/Routing.tsx`

Add the new route and import:

```tsx
import { PictureDetailPage } from '@/pages/PictureDetailPage'

// In Routes:
<Route path="/gallery/:id" element={<PictureDetailPage />} />
```

### 2.3 Update PicturePreview to Link to Detail Page

File: `frontend/src/features/pictures/preview/ui/PicturePreview.tsx`

Add Link import and wrap the card:

```tsx
import { Link } from 'react-router-dom'

// Wrap the card div with Link:
<Link to={`/gallery/${picture._id}`} style={{ textDecoration: 'none' }}>
  <div style={cardStyle} ...>
    {/* existing content */}
  </div>
</Link>
```

## Step 3: Set Up Helmet Provider

### 3.1 Update App.tsx

File: `frontend/src/app/App.tsx`

```tsx
import { HelmetProvider } from 'react-helmet-async'

function App() {
  return (
    <HelmetProvider>
      <Routing />
    </HelmetProvider>
  )
}
```

## Step 4: Add API Method for Single Picture

### 4.1 Add Backend Service Method

File: `backend/src/services/pictureService.ts`

Add method to PictureService class:

```typescript
static async getPictureById(id: string): Promise<IPicture | null> {
  return await Picture.findById(id);
}
```

### 4.2 Add Backend Controller Method

File: `backend/src/controllers/pictureController.ts`

Add method to pictureController:

```typescript
getPictureById: async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const picture = await PictureService.getPictureById(id);
    if (!picture) {
      res.status(404).json({ success: false, message: 'Picture not found' });
      return;
    }
    res.status(200).json({ success: true, data: picture });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
},
```

### 4.3 Add Backend Route

File: `backend/src/routes/pictureRoutes.ts`

Add route (before the auth-protected routes):

```typescript
router.get('/:id', pictureController.getPictureById);
```

### 4.4 Update Frontend API

File: `frontend/src/shared/api/pictures/index.ts`

Add method:

```tsx
getById: async (id: string): Promise<Picture> => {
  const { data } = await api.get(`/pictures/${id}`)
  return data.data as Picture
}
```

## Step 5: Enhance Image Sitemap

### 5.1 Update Sitemap Controller

File: `backend/src/controllers/sitemapController.ts`

Add image sitemap support:

```typescript
// Add image namespace
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

// In pictures loop, add image tags:
pictures.forEach(picture => {
  // ... existing code ...
  
  // Add image sitemap if image exists
  if (picture.imgUrl) {
    const imageUrl = `${baseUrl}${picture.imgUrl.startsWith('/') ? '' : '/'}${picture.imgUrl}`;
    sitemap += '    <image:image>\n';
    sitemap += `      <image:loc>${imageUrl}</image:loc>\n`;
    sitemap += `      <image:title>${escapeXml(picture.name)} (${picture.year})</image:title>\n`;
    sitemap += `      <image:caption>${escapeXml(picture.description || picture.name)} by Айгуль Утлякова, ${picture.year}. ${picture.material}, ${picture.width}×${picture.height} cm.</image:caption>\n`;
    sitemap += '    </image:image>\n';
  }
  
  // ... rest of existing code ...
});

// Add escape function
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
```

## Step 6: Update All Pages with Meta Tags

### 6.1 HomePage Meta Tags

File: `frontend/src/pages/HomePage.tsx`

```tsx
import { Helmet } from 'react-helmet-async'

export const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Айгуль Утлякова - Художник пастелист | Галерея картин</title>
        <meta name="description" content="Официальный сайт художника Айгуль Утляковой. Галерея оригинальных пастельных картин. Покупка произведений искусства." />
        <meta property="og:title" content="Айгуль Утлякова - Художник пастелист" />
        <meta property="og:description" content="Галерея оригинальных пастельных картин" />
      </Helmet>
      {/* existing content */}
    </>
  )
}
```

### 6.2 GalleryPage Meta Tags

File: `frontend/src/pages/GalleryPage.tsx`

```tsx
import { Helmet } from 'react-helmet-async'

export const GalleryPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Галерея картин - Айгуль Утлякова</title>
        <meta name="description" content="Галерея оригинальных пастельных картин Айгуль Утляковой. Просмотр и покупка произведений искусства." />
      </Helmet>
      {/* existing content */}
    </>
  )
}
```

## Step 7: Optimize Image Alt Text

Update all image components to use descriptive alt text:

```tsx
// Instead of:
alt={picture.name}

// Use:
alt={`${picture.name} (${picture.year}) by Айгуль Утлякова, ${picture.material}, ${picture.width}×${picture.height} cm`}
```

## Step 8: Update robots.txt

File: `frontend/public/robots.txt`

Ensure picture pages are allowed:

```
Allow: /gallery
Allow: /gallery/
```

## Step 9: Testing Checklist

- [ ] Individual picture pages load correctly
- [ ] Meta tags appear in page source
- [ ] Structured data validates (use [Google Rich Results Test](https://search.google.com/test/rich-results))
- [ ] Images have descriptive alt text
- [ ] Sitemap includes image tags
- [ ] Open Graph tags work (test with [Facebook Debugger](https://developers.facebook.com/tools/debug/))
- [ ] Pages are crawlable (test with [Google Search Console](https://search.google.com/search-console))

## Step 10: Submit to Search Engines

1. **Google Search Console:**
   - Submit sitemap: `https://aigull-art.com/api/sitemap.xml`
   - Request indexing for key pages

2. **Yandex Webmaster:**
   - Submit sitemap
   - Verify ownership

3. **Bing Webmaster Tools:**
   - Submit sitemap
   - Verify ownership

## Expected Timeline

- **Week 1:** Implement picture detail pages and basic meta tags
- **Week 2:** Add structured data and image sitemap
- **Week 3:** Testing and optimization
- **Week 4+:** Monitor Google Search Console for indexing

## Next Steps After Implementation

1. Monitor Google Search Console for indexing status
2. Track which pictures appear in search results
3. Optimize based on search analytics
4. Consider Next.js migration for even better SEO


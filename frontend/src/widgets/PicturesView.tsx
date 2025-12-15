import React, { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import { Spin } from 'antd'
import {
  $pictures,
  $picturesLoading,
  fetchPictures,
} from '@/entities/picture/model/picturesStore'
import { PicturePreview } from '@/features/pictures/preview/ui/PicturePreview'
import { ImageGallery } from '@/features/pictures/gallery'

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 24,
}

export const PicturesView: React.FC = () => {
  const [pictures, loading, load] = useUnit([
    $pictures,
    $picturesLoading,
    fetchPictures,
  ])
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    load()
  }, [])

  const handleCardClick = (index: number) => {
    setCurrentImageIndex(index)
    setGalleryOpen(true)
  }

  const handleCloseGallery = () => {
    setGalleryOpen(false)
  }

  return (
    <>
      <Spin spinning={loading}>
        <div style={gridStyle}>
          {pictures.map((p, index) => (
            <PicturePreview
              key={p._id}
              picture={p}
              onCardClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </Spin>
      <ImageGallery
        pictures={pictures}
        currentIndex={currentImageIndex}
        open={galleryOpen}
        onClose={handleCloseGallery}
      />
    </>
  )
}

export default PicturesView

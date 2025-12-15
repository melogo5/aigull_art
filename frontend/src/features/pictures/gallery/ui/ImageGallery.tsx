import React from 'react'
import { Modal, Carousel } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { Picture } from '@/shared/api/pictures'
import { getFullImageUrl } from '@/shared/utils/urlUtils'

type Props = {
  pictures: Picture[]
  currentIndex: number
  open: boolean
  onClose: () => void
}

export const ImageGallery: React.FC<Props> = ({ pictures, open, onClose }) => {
  if (pictures.length === 0) return null

  return (
    <Modal
      open={open}
      onCancel={onClose}
      style={{
        padding: 0,
      }}
      footer={null}
      closeIcon={
        <CloseOutlined style={{ color: 'white', fontSize: 24, zIndex: 1001 }} />
      }
    >
      <Carousel
        dots={true}
        infinite={false}
        arrows={true}
        dotPosition="bottom"
        afterChange={() => {
          // Optional: можно добавить логику при смене слайда
        }}
      >
        {pictures.map(picture => {
          const imageUrl = picture.imgUrl ? getFullImageUrl(picture.imgUrl) : ''

          const slideStyle: React.CSSProperties = {
            margin: 0,
            height: '90vh',
            color: '#fff',
            textAlign: 'center',
            background: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }

          return (
            <div key={picture._id}>
              <div style={slideStyle}>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={`Айгуль Утлякова. ${picture.name} ${picture.year}, ${picture.material}, ${picture.width}×${picture.height} cm`}
                    title={`Айгуль Утлякова. "${picture.name}"`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '70vh',
                      objectFit: 'contain',
                    }}
                  />
                )}

                {/* Picture Info */}
                <div
                  style={{
                    marginTop: 24,
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  <h2 style={{ color: 'white', marginBottom: 8, fontSize: 24 }}>
                    {picture.name}
                  </h2>
                  <p
                    style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      marginBottom: 4,
                    }}
                  >
                    {picture.year} • {picture.material}
                  </p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {picture.width} × {picture.height} см
                  </p>
                  {picture.description && (
                    <p
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginTop: 12,
                        maxWidth: 600,
                        margin: '12px auto 0',
                      }}
                    >
                      {picture.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </Carousel>
    </Modal>
  )
}

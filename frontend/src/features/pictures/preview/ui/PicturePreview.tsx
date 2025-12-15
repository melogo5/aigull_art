import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Picture } from '@/shared/api/pictures'
import { getFullImageUrl } from '@/shared/utils/urlUtils'
import { Button, Popconfirm, message } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { useUnit } from 'effector-react'
import { fetchPicturesFx } from '@/entities/picture/model/picturesStore'
import { picturesApi } from '@/shared/api/pictures'
import { modalController } from '../../create/model/modal'
import { $user } from '@/shared/model/auth'

type Props = {
  picture: Picture
  onCardClick?: () => void
}

const cardStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  paddingBottom: '100%',
  backgroundColor: '#0a0a0a',
  overflow: 'hidden',
  borderRadius: 8,
}

const infoStyleBase: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: 'white',
  background: 'rgba(0,0,0,0.86)',
  padding: 16,
  transition: 'opacity 200ms ease',
}

const { setTitle, setValues, open } = modalController

export const PicturePreview: React.FC<Props> = ({ picture, onCardClick }) => {
  const [hovered, setHovered] = useState(false)
  const user = useUnit($user)
  const navigate = useNavigate()

  const infoStyle = {
    ...infoStyleBase,
    opacity: hovered ? 1 : 0,
  } as React.CSSProperties

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on buttons or admin controls
    const target = e.target as HTMLElement
    if (
      target.closest('button') ||
      target.closest('.ant-btn') ||
      target.closest('.ant-popconfirm')
    ) {
      return
    }
    if (onCardClick) {
      onCardClick()
    }
  }

  const onViewClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/gallery/${picture._id}`)
  }

  const onEditClick = () => {
    setTitle('Редактировать картину')
    setValues({
      values: {
        name: picture.name,
        description: picture.description,
        year: picture.year,
        available: picture.available,
        width: picture.width,
        height: picture.height,
        material: picture.material,
        imgUrl: picture.imgUrl,
        _id: picture._id,
      },
      mode: 'EDIT',
    })
    open()
  }

  const onDelete = async () => {
    try {
      await picturesApi.remove(picture._id)
      message.success('Картина удалена')
      fetchPicturesFx()
    } catch (e) {
      message.error('Не удалось удалить')
    }
  }

  return (
    <div
      style={{ ...cardStyle, cursor: onCardClick ? 'pointer' : 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleCardClick}
    >
      {picture.imgUrl && (
        <img
          src={getFullImageUrl(picture.imgUrl)}
          alt={`${picture.name} by Айгуль Утлякова, ${picture.year}, ${picture.material}, ${picture.width}×${picture.height} cm`}
          title={`Айгуль Утлякова. "${picture.name}"`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
      <div style={infoStyle}>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
          {picture.name}
        </div>
        <div>{`${picture.width}×${picture.height} см`}</div>
        <div style={{ marginTop: 2 }}>{picture.material}</div>
        <div style={{ marginTop: 2 }}>{picture.year}</div>
        {picture.available && (
          <button
            style={{
              marginTop: 14,
              background: '#b7092b',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Доступна для покупки
          </button>
        )}
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={onViewClick}
          style={{
            marginTop: 14,
            background: 'rgba(255, 255, 255, 0.2)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            color: 'white',
          }}
        >
          Просмотр
        </Button>
        {user && (
          <div
            style={{ display: 'flex', gap: 8, marginTop: 12 }}
            onClick={e => e.stopPropagation()}
          >
            <Button
              size="small"
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                onEditClick()
              }}
            >
              Редактировать
            </Button>
            <Popconfirm
              title="Удалить картину?"
              okText="Удалить"
              cancelText="Отмена"
              onConfirm={e => {
                if (e) {
                  e.stopPropagation()
                }
                onDelete()
              }}
            >
              <Button
                size="small"
                danger
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                Удалить
              </Button>
            </Popconfirm>
          </div>
        )}
      </div>
    </div>
  )
}

export default PicturePreview

import React, { useState } from 'react'
import { Picture } from '@/shared/api/pictures'
import { getFullImageUrl } from '@/shared/utils/urlUtils'
import { Button, Popconfirm, message } from 'antd'
import { useUnit } from 'effector-react'
import { fetchPicturesFx } from '@/entities/picture/model/picturesStore'
import { picturesApi } from '@/shared/api/pictures'
import { modalController } from '../../create/model/modal'
import { $user } from '@/shared/model/auth'

type Props = {
  picture: Picture
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

export const PicturePreview: React.FC<Props> = ({ picture }) => {
  const [hovered, setHovered] = useState(false)
  const user = useUnit($user)

  const infoStyle = {
    ...infoStyleBase,
    opacity: hovered ? 1 : 0,
  } as React.CSSProperties

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
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {picture.imgUrl && (
        <img
          src={getFullImageUrl(picture.imgUrl)}
          alt={picture.name}
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
        <div
          style={{ opacity: 0.9 }}
        >{`${picture.width}×${picture.height} см`}</div>
        <div style={{ opacity: 0.9, marginTop: 2 }}>{picture.material}</div>
        <div style={{ opacity: 0.8, marginTop: 2 }}>{picture.year}</div>
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
        {user && (
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <Button size="small" onClick={onEditClick}>
              Редактировать
            </Button>
            <Popconfirm
              title="Удалить картину?"
              okText="Удалить"
              cancelText="Отмена"
              onConfirm={onDelete}
            >
              <Button size="small" danger>
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

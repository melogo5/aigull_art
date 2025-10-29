import React from 'react'
import HeadingTitle from '@/shared/ui/HeadingTitle'
import { PicturesView } from '@/widgets/PicturesView'
import { Button } from 'antd'
import { useUnit } from 'effector-react'
import { $user } from '@/shared/model/auth'
import { modalController, CreatePictureModal } from '@/features/pictures/create'

const { setTitle, setValues, open } = modalController

export const GalleryPage: React.FC = () => {
  const user = useUnit($user)
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <HeadingTitle title="Галерея" />
      {user && (
        <div
          style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}
        >
          <Button
            type="primary"
            onClick={() => {
              setTitle('Создание картины')
              setValues({
                mode: 'CREATE',
                values: {},
              })
              open()
            }}
          >
            Добавить картину
          </Button>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <PicturesView />
      </div>
      <CreatePictureModal />
    </div>
  )
}

export default GalleryPage

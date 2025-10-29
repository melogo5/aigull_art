import { createModalController } from '@/shared/utils/createModalController'
import { sample } from 'effector'
import { editPicture, fetchPicturesFx } from '@/entities/picture/model/picturesStore'
import { createPictureFx } from './create'

export type FormValues = {
  name: string
  description: string
  year: number | string
  available: boolean
  width: number | string
  height: number | string
  material: string
  imageFile?: File
}

export const modalController = createModalController<{
  values: Partial<FormValues>
  mode: 'CREATE' | 'EDIT'
}>({
  values: {},
  mode: 'CREATE',
})

sample({
  clock: [createPictureFx.done, editPicture],
  target: [modalController.close, modalController.resetValues],
})

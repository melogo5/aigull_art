import { createModalController } from '@/shared/utils/createModalController'

export type FormValues = {
  name: string
  description: string
  year: number | string
  available: boolean
  width: number | string
  height: number | string
  material: string
  imageFile?: File
  imgUrl?: string
  _id?: string
}

export const modalController = createModalController<{
  values: Partial<FormValues>
  mode: 'CREATE' | 'EDIT'
}>({
  values: {},
  mode: 'CREATE',
})

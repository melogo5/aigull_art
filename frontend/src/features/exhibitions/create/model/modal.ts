import { createModalController } from '@/shared/utils/createModalController'

export type FormValues = {
  name: string
  description: string
  startDate: string
  endDate: string
  location: string
  _id?: string
}

export const modalController = createModalController<{
  values: Partial<FormValues>
  mode: 'CREATE' | 'EDIT'
}>({
  values: {},
  mode: 'CREATE',
})


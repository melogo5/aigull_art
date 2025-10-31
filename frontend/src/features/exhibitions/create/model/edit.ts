import { EditExhibitionBody, exhibitionsApi } from '@/shared/api/exhibitions'
import { createEvent, createEffect, sample, createStore } from 'effector'
import { showErrorMessage } from '@/shared/utils/showErrorMessage'
import { $formValues } from './form'
import { fetchExhibitions } from '@/entities/exhibition/model/fetch'
import { modalController } from './modal'

export const editExhibition = createEvent<EditExhibitionBody & { id: string }>()

const $editExhibitionData = createStore<{
  id: string
} | null>(null).on(editExhibition, (_, exhibition) => ({
  id: exhibition.id,
}))

export const editExhibitionFx = createEffect(
  async ({
    id,
    payload,
  }: {
    id: string
    payload: Partial<EditExhibitionBody>
  }) => {
    return await exhibitionsApi.update(id, payload)
  }
)

sample({
  clock: editExhibition,
  source: { formValues: $formValues, editData: $editExhibitionData },
  filter: ({ formValues, editData }) =>
    formValues !== null && editData !== null,
  fn: ({ formValues, editData }) => ({
    id: editData!.id,
    payload: {
      name: formValues!.name,
      description: formValues!.description || '',
      startDate: formValues!.startDate,
      endDate: formValues!.endDate,
      location: formValues!.location,
    },
  }),
  target: editExhibitionFx,
})

sample({
  clock: editExhibitionFx.done,
  target: [fetchExhibitions, modalController.close, modalController.resetValues],
})

editExhibitionFx.failData.watch(showErrorMessage)


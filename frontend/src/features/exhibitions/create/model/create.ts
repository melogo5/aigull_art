import { exhibitionsApi } from '@/shared/api/exhibitions'
import { CreateExhibitionForm } from '@/shared/api/exhibitions'
import { createEffect, createEvent, sample } from 'effector'
import { showErrorMessage } from '@/shared/utils/showErrorMessage'
import { $formValues } from './form'
import { fetchExhibitions } from '@/entities/exhibition/model/fetch'
import { modalController } from './modal'

export const createExhibition = createEvent<CreateExhibitionForm>()

export const createExhibitionFx = createEffect(exhibitionsApi.create)

sample({
  clock: createExhibition,
  source: $formValues,
  filter: formValues => formValues !== null,
  fn: formValues => ({
    name: formValues!.name,
    description: formValues!.description || '',
    startDate: formValues!.startDate,
    endDate: formValues!.endDate,
    location: formValues!.location,
  }),
  target: createExhibitionFx,
})

sample({
  clock: createExhibitionFx.done,
  target: [fetchExhibitions, modalController.close, modalController.resetValues],
})

createExhibitionFx.failData.watch(showErrorMessage)


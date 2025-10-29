import { picturesApi } from '@/shared/api/pictures'
import { CreatePictureForm } from '@/shared/api/pictures'
import { createEffect, createEvent, sample } from 'effector'
import { uploadImageFx } from '@/entities/picture/model/picturesStore'
import { showErrorMessage } from '@/shared/utils/showErrorMessage'
import { $formValues } from './form'
import { fetchPictures } from '@/entities/picture/model/fetch'
import { modalController } from './modal'

export const createPicture = createEvent<CreatePictureForm>()

export const createPictureFx = createEffect(picturesApi.create)

sample({
  clock: createPicture,
  fn: picture => picture.imageFile,
  target: uploadImageFx,
})

sample({
  clock: uploadImageFx.doneData,
  source: $formValues,
  filter: formValues => formValues !== null,
  fn: (formValues, fileUrl) => ({
    name: formValues.name,
    description: formValues.description,
    year: formValues.year,
    available: formValues.available,
    width: formValues.width,
    height: formValues.height,
    material: formValues.material,
    imgUrl: fileUrl,
  }),
  target: createPictureFx,
})

sample({
  clock: createPictureFx.done,
  target: [fetchPictures, modalController.close, modalController.resetValues],
})

createPictureFx.failData.watch(showErrorMessage)

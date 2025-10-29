import { picturesApi } from '@/shared/api/pictures'
import { CreatePictureForm } from '@/shared/api/pictures'
import { createEffect, createEvent, sample } from 'effector'
import { showErrorMessage } from '@/shared/utils/showErrorMessage'
import { $formValues } from './form'
import { fetchPictures } from '@/entities/picture/model/fetch'
import { modalController } from './modal'

export const createPicture = createEvent<CreatePictureForm>()

export const uploadCreateImageFx = createEffect(picturesApi.uploadImage)

export const createPictureFx = createEffect(picturesApi.create)

sample({
  clock: createPicture,
  filter: picture =>
    picture.imageFile !== undefined && picture.imageFile !== null,
  fn: picture => picture.imageFile!,
  target: uploadCreateImageFx,
})

sample({
  clock: uploadCreateImageFx.doneData,
  source: $formValues,
  filter: formValues => formValues !== null,
  fn: (formValues, fileUrl) => ({
    name: formValues!.name,
    description: formValues!.description,
    year: Number(formValues!.year),
    available: formValues!.available,
    width: Number(formValues!.width),
    height: Number(formValues!.height),
    material: formValues!.material,
    imgUrl: fileUrl,
  }),
  target: createPictureFx,
})

sample({
  clock: createPictureFx.done,
  target: [fetchPictures, modalController.close, modalController.resetValues],
})

createPictureFx.failData.watch(showErrorMessage)
uploadCreateImageFx.failData.watch(showErrorMessage)

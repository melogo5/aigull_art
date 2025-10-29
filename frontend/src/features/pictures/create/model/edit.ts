import { EditPictureBody, picturesApi } from '@/shared/api/pictures'
import { createEvent, createEffect, sample } from 'effector'
import { showErrorMessage } from '@/shared/utils/showErrorMessage'
import { $formValues } from './form'
import { fetchPictures } from '@/entities/picture/model/fetch'
import { modalController } from './modal'

export const editPicture = createEvent<EditPictureBody>()

export const editPictureFx = createEffect(picturesApi.update)

// FIXME Подумать что делать если во время изменения обновили картинку на новую
// sample({
//     clock: editPicture,
//     fn: picture => picture.imageFile,
//     target: uploadImageFx,
//   })

sample({
  clock: editPicture,
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
  target: editPictureFx,
})

sample({
  clock: editPictureFx.done,
  target: [fetchPictures, modalController.close, modalController.resetValues],
})
editPictureFx.failData.watch(showErrorMessage)

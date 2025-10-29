import { EditPictureBody, picturesApi } from '@/shared/api/pictures'
import { createEvent, createEffect, sample, createStore } from 'effector'
import { showErrorMessage } from '@/shared/utils/showErrorMessage'
import { $formValues } from './form'
import { fetchPictures } from '@/entities/picture/model/fetch'
import { modalController } from './modal'

export const editPicture = createEvent<EditPictureBody>()
export const uploadEditImageFx = createEffect(picturesApi.uploadImage)

const $editPictureData = createStore<{
  id: string
  existingImgUrl?: string
} | null>(null).on(editPicture, (_, picture) => ({
  id: picture.id,
  existingImgUrl: modalController.$values.getState().values?.imgUrl as
    | string
    | undefined,
}))

export const editPictureFx = createEffect(
  async ({
    id,
    payload,
  }: {
    id: string
    payload: Partial<EditPictureBody>
  }) => {
    return await picturesApi.update(id, payload)
  }
)

sample({
  clock: editPicture,
  filter: picture =>
    picture.imageFile !== undefined && picture.imageFile !== null,
  fn: picture => picture.imageFile!,
  target: uploadEditImageFx,
})

sample({
  clock: uploadEditImageFx.doneData,
  source: { formValues: $formValues, editData: $editPictureData },
  filter: ({ formValues, editData }) =>
    formValues !== null && editData !== null,
  fn: ({ formValues, editData }, newImgUrl) => ({
    id: editData!.id,
    payload: {
      name: formValues!.name,
      description: formValues!.description,
      year: Number(formValues!.year),
      available: formValues!.available,
      width: Number(formValues!.width),
      height: Number(formValues!.height),
      material: formValues!.material,
      imgUrl: newImgUrl,
    },
  }),
  target: editPictureFx,
})

sample({
  clock: editPicture,
  source: { formValues: $formValues, editData: $editPictureData },
  filter: ({ formValues, editData }, picture) =>
    formValues !== null &&
    editData !== null &&
    (!picture.imageFile || picture.imageFile === null),
  fn: ({ formValues, editData }) => ({
    id: editData!.id,
    payload: {
      name: formValues!.name,
      description: formValues!.description,
      year: Number(formValues!.year),
      available: formValues!.available,
      width: Number(formValues!.width),
      height: Number(formValues!.height),
      material: formValues!.material,
      imgUrl: editData!.existingImgUrl,
    },
  }),
  target: editPictureFx,
})

sample({
  clock: editPictureFx.done,
  target: [fetchPictures, modalController.close, modalController.resetValues],
})

editPictureFx.failData.watch(showErrorMessage)

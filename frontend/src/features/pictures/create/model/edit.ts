import { EditPictureBody, picturesApi } from '@/shared/api/pictures'
import { createEvent, createEffect, sample, createStore } from 'effector'
import { showErrorMessage } from '@/shared/utils/showErrorMessage'
import { $formValues } from './form'
import { fetchPictures } from '@/entities/picture/model/fetch'
import { modalController } from './modal'

export const editPicture = createEvent<EditPictureBody>()
export const uploadEditImageFx = createEffect(picturesApi.uploadImage)

// Store to keep picture ID and existing image URL for edit mode
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

// If user uploads a new image during edit, upload it first
sample({
  clock: editPicture,
  filter: picture =>
    picture.imageFile !== undefined && picture.imageFile !== null,
  fn: picture => picture.imageFile!,
  target: uploadEditImageFx,
})

// Case 1: User uploaded a new image - use the new URL
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

// Case 2: User didn't upload a new image - use existing URL
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

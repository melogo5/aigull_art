import { createEvent, createStore, createEffect, sample } from 'effector';
import { picturesApi, Picture } from '@/shared/api/pictures';
import { EditPictureBody } from '@/shared/api/pictures';
import { modalController } from '@/features/pictures/create';

export const fetchPictures = createEvent();

export const fetchPicturesFx = createEffect(async (): Promise<Picture[]> => {
  return await picturesApi.list();
});

export const $pictures = createStore<Picture[]>([]) // list of pictures
  .on(fetchPicturesFx.doneData, (_, pictures) => pictures);

export const $picturesLoading = fetchPicturesFx.pending;
export const $picturesError = createStore<string | null>(null)
  .on(fetchPicturesFx.failData, (_, err) =>
    err instanceof Error ? err.message : 'Failed to load'
  )
  .reset(fetchPicturesFx.done);

sample({ clock: fetchPictures, target: fetchPicturesFx });

export type CreatePictureForm = {
  name: string;
  description?: string;
  year: number | string;
  available: boolean;
  width: number | string;
  height: number | string;
  material: string;
  imageFile: File | null;
};

export const submitCreate = createEvent<CreatePictureForm>();

export const uploadImageFx = createEffect(
  async (file: File): Promise<string> => {
    try {
      return await picturesApi.uploadImage(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
);

export const createPictureFx = createEffect(
  async (
    payload: Omit<Picture, '_id' | 'createdAt' | 'updatedAt'>
  ): Promise<Picture> => {
    try {
      return await picturesApi.create(payload);
    } catch (error) {
      console.error('Error creating picture:', error);
      throw error;
    }
  }
);

export const updatePictureFx = createEffect(
  async (
    params: { id: string } & Partial<
      Omit<Picture, '_id' | 'createdAt' | 'updatedAt'>
    >
  ): Promise<Picture> => {
    return await picturesApi.update(params.id, {
      name: params.name,
      description: params.description,
      year: params.year,
      available: params.available,
      width: params.width,
      height: params.height,
      material: params.material,
      imgUrl: params.imgUrl,
    });
  }
);

// Orchestrate: upload image -> then create (изображение обязательно)
sample({
  clock: submitCreate,
  fn: f => f.imageFile as File,
  target: uploadImageFx,
});

// Store the form data when submitCreate is called
const $submitFormData = createStore<CreatePictureForm | null>(null).on(
  submitCreate,
  (_, form) => form
);

// When upload done, call create with imgUrl
sample({
  clock: uploadImageFx.doneData,
  source: $submitFormData,
  filter: form => form !== null,
  fn: (form, fileUrl) => ({
    name: form!.name,
    description: form!.description ?? '',
    year: Number(form!.year),
    available: form!.available,
    width: Number(form!.width),
    height: Number(form!.height),
    material: form!.material,
    imgUrl: fileUrl,
  }),
  target: createPictureFx,
});

// Путь без изображения удалён: создаём только после успешной загрузки

// After create, refresh list and close modal
sample({
  clock: createPictureFx.done,
  target: [fetchPicturesFx],
});

// Clear form data after successful creation
sample({
  clock: createPictureFx.done,
  fn: () => null,
  target: $submitFormData,
});

// Edit flow
export const submitEdit = createEvent<EditPictureBody>();

// If image provided on edit -> upload first
const $submitEditForm = createStore<EditPictureBody | null>(null).on(
  submitEdit,
  (_, form) => form
);

sample({
  clock: submitEdit,
  filter: f => Boolean(f.imageFile),
  fn: f => f.imageFile as File,
  target: uploadImageFx,
});

// When upload done on edit, call update with new imgUrl
sample({
  clock: uploadImageFx.doneData,
  source: $submitEditForm,
  filter: form => form !== null,
  fn: (form, fileUrl) => ({
    id: form!.id,
    name: form!.name,
    description: form!.description ?? '',
    year: Number(form!.year),
    available: form!.available,
    width: Number(form!.width),
    height: Number(form!.height),
    material: form!.material,
    imgUrl: fileUrl,
  }),
  target: updatePictureFx,
});

// If no image on edit, update directly
sample({
  clock: submitEdit,
  filter: f => !f.imageFile,
  fn: form => ({
    id: form.id,
    name: form.name,
    description: form.description ?? '',
    year: Number(form.year),
    available: form.available,
    width: Number(form.width),
    height: Number(form.height),
    material: form.material,
  }),
  target: updatePictureFx,
});

// After update, refresh list and close edit modal
sample({
  clock: updatePictureFx.done,
  target: [fetchPicturesFx],
});

// Clear stored edit form
sample({
  clock: updatePictureFx.done,
  fn: () => null,
  target: $submitEditForm,
});

import { createEvent, createStore, createEffect, sample } from 'effector';
import { picturesApi, Picture } from '@/shared/api/picturesApi';

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

// Create Picture modal and flow
export const openCreateModal = createEvent();
export const closeCreateModal = createEvent();
export const $isCreateModalOpen = createStore(false)
  .on(openCreateModal, () => true)
  .on(closeCreateModal, () => false);

export type CreatePictureForm = {
  name: string;
  description?: string;
  year: number | string;
  available: boolean;
  width: number | string;
  height: number | string;
  material: string;
  imageFile?: File | null;
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

// Orchestrate: if image provided -> upload -> then create
sample({
  clock: submitCreate,
  filter: f => Boolean(f.imageFile),
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

// If no image, create directly
sample({
  clock: submitCreate,
  filter: f => !f.imageFile,
  fn: form => ({
    name: form.name,
    description: form.description ?? '',
    year: Number(form.year),
    available: form.available,
    width: Number(form.width),
    height: Number(form.height),
    material: form.material,
    imgUrl: '',
  }),
  target: createPictureFx,
});

// After create, refresh list and close modal
sample({
  clock: createPictureFx.done,
  target: [fetchPicturesFx, closeCreateModal],
});

// Clear form data after successful creation
sample({
  clock: createPictureFx.done,
  fn: () => null,
  target: $submitFormData,
});

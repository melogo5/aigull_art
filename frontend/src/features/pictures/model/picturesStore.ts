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
  .on(fetchPicturesFx.failData, (_, err) => (err instanceof Error ? err.message : 'Failed to load'))
  .reset(fetchPicturesFx.done);

sample({ clock: fetchPictures, target: fetchPicturesFx });



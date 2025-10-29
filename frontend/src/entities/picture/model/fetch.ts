import { Picture, picturesApi } from '@/shared/api/pictures';
import { createEffect, createEvent, createStore, sample } from 'effector';

export const fetchPictures = createEvent();

export const fetchPicturesFx = createEffect(async (): Promise<Picture[]> => {
  return await picturesApi.list();
});

export const $pictures = createStore<Picture[]>([]).on(
  fetchPicturesFx.doneData,
  (_, pictures) => pictures
);

export const $picturesLoading = fetchPicturesFx.pending;

sample({ clock: fetchPictures, target: fetchPicturesFx });

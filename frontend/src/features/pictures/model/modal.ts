import { createModalController } from '@/shared/utils/createModalController';
import { sample } from 'effector';
import { fetchPicturesFx } from './picturesStore';

export const modalController = createModalController();

sample({
  clock: fetchPicturesFx.done,
  target: [modalController.close, modalController.resetValues],
});

import { createModalController } from '@/shared/utils/createModalController';
import { sample } from 'effector';
import { fetchPicturesFx } from '@/entities/picture/model/picturesStore';
import { EditPictureBody } from '@/shared/api/pictures';

export const modalController = createModalController<{
  values: EditPictureBody | {};
  mode: 'CREATE' | 'EDIT';
}>({
  values: {},
  mode: 'CREATE',
});

sample({
  clock: fetchPicturesFx.done,
  target: [modalController.close, modalController.resetValues],
});

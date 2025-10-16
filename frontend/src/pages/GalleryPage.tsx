import React from 'react';
import HeadingTitle from '@/shared/ui/HeadingTitle';
import { PicturesView } from '@/widgets/PicturesView';
import { Button } from 'antd';
import { useUnit } from 'effector-react';
import { openCreateModal } from '@/features/pictures/model/picturesStore';
import CreatePictureModal from '@/features/pictures/CreatePictureModal';

export const GalleryPage: React.FC = () => {
  const open = useUnit(openCreateModal);
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
      <HeadingTitle title="Галерея" />
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
        <Button type="primary" onClick={() => open()}>Добавить картину</Button>
      </div>
      <div style={{ marginTop: 24 }}>
        <PicturesView />
      </div>
      <CreatePictureModal />
    </div>
  );
};

export default GalleryPage;



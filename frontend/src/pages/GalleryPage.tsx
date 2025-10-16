import React from 'react';
import HeadingTitle from '@/shared/ui/HeadingTitle';
import { PicturesView } from '@/widgets/PicturesView';

export const GalleryPage: React.FC = () => {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
      <HeadingTitle title="Галерея" />
      <div style={{ marginTop: 32 }}>
        <PicturesView />
      </div>
    </div>
  );
};

export default GalleryPage;



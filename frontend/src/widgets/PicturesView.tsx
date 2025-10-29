import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import {
  $pictures,
  $picturesLoading,
  fetchPictures,
} from '@/entities/picture/model/picturesStore';
import { PicturePreview } from '@/features/pictures/preview/ui/PicturePreview';

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 24,
};

export const PicturesView: React.FC = () => {
  const [pictures, loading, load] = useUnit([
    $pictures,
    $picturesLoading,
    fetchPictures,
  ]);

  useEffect(() => {
    load();
  }, []);

  if (loading)
    return <div style={{ textAlign: 'center', padding: 24 }}>Загрузка...</div>;

  return (
    <div style={gridStyle}>
      {pictures.map(p => (
        <PicturePreview key={p._id} picture={p} />
      ))}
    </div>
  );
};

export default PicturesView;

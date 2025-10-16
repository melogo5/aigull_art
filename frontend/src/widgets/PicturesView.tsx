import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { $pictures, $picturesLoading, $picturesError, fetchPictures } from '@/features/pictures/model/picturesStore';
import { PicturePreview } from '@/features/pictures/PicturePreview';

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 24,
};

export const PicturesView: React.FC = () => {
  const [pictures, loading, error, load] = useUnit([$pictures, $picturesLoading, $picturesError, fetchPictures]);

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: 24 }}>Loading...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: 24 }}>{error}</div>;

  return (
    <div style={gridStyle}>
      {pictures.map((p) => (
        <PicturePreview key={p._id} picture={p} />)
      )}
    </div>
  );
};

export default PicturesView;



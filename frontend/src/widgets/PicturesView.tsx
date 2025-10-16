import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { $pictures, $picturesLoading, $picturesError, fetchPictures } from '@/features/pictures/model/picturesStore';
import { PicturePreview } from '@/features/pictures/PicturePreview';

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 24,
};
const pictures = [
  {
    id: '123',
    name: 'Пейзаж в пастели',
    description: 'Мягкие тона и спокойствие природы',
    year: 2024,
    available: true,
    width: 50,
    height: 70,
    material: 'Пастель на бумаге',
    imgUrl: '',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '124',
    name: 'Городской вечер',
    description: 'Огни большого города',
    year: 2023,
    available: false,
    width: 60,
    height: 60,
    material: 'Масло на холсте',
    imgUrl: '',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '125',
    name: 'Морской бриз',
    description: 'Свежесть волн и неба',
    year: 2022,
    available: true,
    width: 80,
    height: 60,
    material: 'Акрил на холсте',
    imgUrl: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
export const PicturesView: React.FC = () => {
  const [loading, error, load] = useUnit([$picturesLoading, $picturesError, fetchPictures]);

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



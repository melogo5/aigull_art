export type Picture = {
    _id: string;
    name: string;
    description?: string;
    year: number;
    available: boolean;
    width: number;
    height: number;
    material: string;
    imgUrl?: string;
    createdAt: string;
    updatedAt: string;
  };

  export type EditPictureBody = {
    id: string;
    name: string;
    description?: string;
    year: number | string;
    available: boolean;
    width: number | string;
    height: number | string;
    material: string;
    imageFile?: File | null; // изображение опционально при редактировании
  };
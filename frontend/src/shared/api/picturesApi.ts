import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: `${API_BASE_URL}/pictures` });

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

export const picturesApi = {
  async list(): Promise<Picture[]> {
    const { data } = await api.get('/');
    return data.data as Picture[];
  },
  async uploadImage(file: File): Promise<string> {
    const form = new FormData();
    form.append('image', file);
    const { data } = await api.post('/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
    return data.fileUrl as string;
  },
  async create(payload: Omit<Picture, '_id' | 'createdAt' | 'updatedAt'>): Promise<Picture> {
    const { data } = await api.post('/addPicture', payload, { headers: { 'Content-Type': 'application/json' } });
    return data.data as Picture;
  },
};



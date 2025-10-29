import axios from 'axios';
import { Picture } from './types';

import { getApiBaseUrl } from '@/shared/utils/urlUtils';

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({ baseURL: `${API_BASE_URL}/pictures` });

export const picturesApi = {
  async list(): Promise<Picture[]> {
    const { data } = await api.get('/');
    return data.data as Picture[];
  },
  async uploadImage(file: File): Promise<string> {
    const form = new FormData();
    form.append('image', file);
    const { data } = await api.post('/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.fileUrl as string;
  },
  async create(
    payload: Omit<Picture, '_id' | 'createdAt' | 'updatedAt'>
  ): Promise<Picture> {
    const { data } = await api.post('/addPicture', payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return data.data as Picture;
  },
  async update(
    id: string,
    payload: Partial<Omit<Picture, '_id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Picture> {
    const { data } = await api.put(`/editPicture/${id}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return data.data as Picture;
  },
  async remove(id: string): Promise<void> {
    await api.delete(`/deletePicture/${id}`);
  },
};

export * from './types';

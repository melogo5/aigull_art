import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: `${API_BASE_URL}/pictures`,
  headers: { 'Content-Type': 'application/json' },
});

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
};



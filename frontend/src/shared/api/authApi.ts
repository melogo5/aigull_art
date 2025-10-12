import axios from 'axios';
import { User } from '@/entities/User';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password });
    return response.data.data;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/users/register', { name, email, password });
    return response.data.data;
  },

  getMe: async (): Promise<User> => {
    const response = await api.get('/users/me');
    return response.data.data.user;
  },

  updateProfile: async (userData: Partial<User>) => {
    const response = await api.put(`/users/${userData.id}`, userData);
    return response.data.data;
  },
};

export default api;

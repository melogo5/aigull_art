import axios from 'axios';
import { User } from '@/entities/User';

import { getApiBaseUrl } from '@/shared/utils/urlUtils';

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable cookies
});

export const authApi = {
  login: async (body: { email: string; password: string }) => {
    const response = await api.post('/users/login', body);
    return response.data.data;
  },

  logout: async () => {
    const response = await api.post('/users/logout');
    return response.data;
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

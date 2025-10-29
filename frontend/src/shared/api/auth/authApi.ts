import { User } from '@/entities/user/types'
import { api } from '../axiosConfig'

const BASE_URL = '/users'

export const authApi = {
  login: async (body: { email: string; password: string }) => {
    const response = await api.post(`${BASE_URL}/login`, body)
    return response.data.data
  },

  logout: async () => {
    const response = await api.post(`${BASE_URL}/logout`)
    return response.data
  },

  getMe: async (): Promise<User> => {
    const response = await api.get(`${BASE_URL}/me`)
    return response.data.data.user
  },

  updateProfile: async (userData: Partial<User>) => {
    const response = await api.put(`${BASE_URL}/${userData.id}`, userData)
    return response.data.data
  },
}

export default api

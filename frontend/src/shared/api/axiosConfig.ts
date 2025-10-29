import axios from 'axios'
import { getApiBaseUrl } from '@/shared/utils/urlUtils'

const API_BASE_URL = getApiBaseUrl()

export const api = axios.create({
  baseURL: `${API_BASE_URL}/pictures`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

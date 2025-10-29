import axios from 'axios'
import { getApiBaseUrl } from '@/shared/utils/urlUtils'

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

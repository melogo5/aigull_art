import { CreateExhibitionBody, EditExhibitionBody, Exhibition } from './types'
import { api } from '@/shared/api/axiosConfig'

export const exhibitionsApi = {
  async list(): Promise<Exhibition[]> {
    const { data } = await api.get('/exhibitions')
    return data.data as Exhibition[]
  },
  async create(payload: CreateExhibitionBody): Promise<Exhibition> {
    const { data } = await api.post('/exhibitions/addExhibition', payload, {
      headers: { 'Content-Type': 'application/json' },
    })
    return data.data as Exhibition
  },
  async update(
    id: string,
    payload: Partial<EditExhibitionBody>
  ): Promise<Exhibition> {
    const { data } = await api.put(`/exhibitions/editExhibition/${id}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    })
    return data.data as Exhibition
  },
  async remove(id: string): Promise<void> {
    await api.delete(`/exhibitions/deleteExhibition/${id}`)
  },
}

export * from './types'


import { EditPictureBody, CreatePictureBody, Picture } from './types'
import { api } from '@/shared/api/axiosConfig'

export const picturesApi = {
  async list(): Promise<Picture[]> {
    const { data } = await api.get('/pictures')
    return data.data as Picture[]
  },
  async uploadImage(file: File): Promise<string> {
    const form = new FormData()
    form.append('image', file)
    const { data } = await api.post('/pictures/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data.fileUrl as string
  },
  async create(payload: CreatePictureBody): Promise<Picture> {
    const { data } = await api.post('/pictures/addPicture', payload, {
      headers: { 'Content-Type': 'application/json' },
    })
    return data.data as Picture
  },
  async update(
    id: string,
    payload: Partial<EditPictureBody>
  ): Promise<Picture> {
    const { data } = await api.put(`/pictures/editPicture/${id}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    })
    return data.data as Picture
  },
  async remove(id: string): Promise<void> {
    await api.delete(`/pictures/deletePicture/${id}`)
  },
}

export * from './types'

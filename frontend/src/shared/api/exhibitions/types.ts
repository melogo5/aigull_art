export type Exhibition = {
  _id: string
  name: string
  description?: string
  startDate: string
  endDate: string
  location: string
  pictures?: string[]
  passed?: boolean
  createdAt: string
  updatedAt: string
}

export type CreateExhibitionBody = {
  name: string
  description?: string
  startDate: string
  endDate: string
  location: string
}

export type EditExhibitionBody = {
  name: string
  description?: string
  startDate: string
  endDate: string
  location: string
}

export type CreateExhibitionForm = CreateExhibitionBody


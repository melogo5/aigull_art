import { Exhibition, exhibitionsApi } from '@/shared/api/exhibitions'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { showErrorMessage } from '@/shared/utils/showErrorMessage'

export const fetchExhibitions = createEvent()

export const fetchExhibitionsFx = createEffect(async (): Promise<Exhibition[]> => {
  return await exhibitionsApi.list()
})

export const $exhibitions = createStore<Exhibition[]>([]).on(
  fetchExhibitionsFx.doneData,
  (_, exhibitions) => exhibitions
)

export const $exhibitionsLoading = fetchExhibitionsFx.pending

sample({ clock: fetchExhibitions, target: fetchExhibitionsFx })

fetchExhibitionsFx.failData.watch(showErrorMessage)


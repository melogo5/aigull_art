import { createEvent, createStore } from 'effector'
import { FormValues } from './modal'

export const setFormValues = createEvent<FormValues>()
export const resetFormValues = createEvent()

export const $formValues = createStore<null | FormValues>(null)
  .on(setFormValues, (_, values) => values)
  .reset(resetFormValues)

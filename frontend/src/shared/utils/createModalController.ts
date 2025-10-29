import { createEvent, createStore } from 'effector'

export const createVisibilityToggler = (isOpen = false) => {
  const open = createEvent<void>()
  const close = createEvent<void>()
  const toggle = createEvent<void>()
  const $isOpen = createStore<boolean>(isOpen)
    .on(open, () => true)
    .on(close, () => false)
    .on(toggle, value => !value)

  return {
    $isOpen,
    open,
    close,
    toggle,
  }
}

export const createModalController = <T>(initialValues: T, title = '') => {
  const { $isOpen, close, open, toggle } = createVisibilityToggler()

  const setTitle = createEvent<string>()
  const setValues = createEvent<T>()
  const resetValues = createEvent<void>()

  const $title = createStore<string>(title).on(
    setTitle,
    (_, newTitle) => newTitle
  )
  const $values = createStore<T>(initialValues)
    .on(setValues, (_, newValues) => newValues)
    .reset(resetValues)

  return {
    $isOpen,
    close,
    open,
    toggle,
    setTitle,
    setValues,
    resetValues,
    $title,
    $values,
  }
}

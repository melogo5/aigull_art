import { message } from 'antd'
import { AxiosError } from 'axios'

interface ErrorResponse {
  error?: string
  message?: string
}

export const showErrorMessage = (error: unknown): void => {
  let errorMessage = 'Произошла ошибка'

  if (error instanceof AxiosError) {
    const responseData = error.response?.data as ErrorResponse | undefined

    if (responseData?.error) {
      errorMessage = responseData.error
    } else if (responseData?.message) {
      errorMessage = responseData.message
    } else if (error.message) {
      errorMessage = error.message
    }

    // Дополнительная обработка для специфичных HTTP кодов
    if (error.response?.status === 401) {
      errorMessage = 'Не авторизован. Пожалуйста, войдите снова.'
    } else if (error.response?.status === 403) {
      errorMessage = 'Доступ запрещён'
    } else if (error.response?.status === 404) {
      errorMessage = 'Ресурс не найден'
    } else if (error.response?.status === 500) {
      errorMessage = 'Ошибка сервера. Попробуйте позже.'
    }
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

  message.error(errorMessage)
}

import { AxiosError } from 'axios'

export const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

const FETCH_ERROR_MESSAGE =
  'An unexpected error occurred while processing your request.'

export const errorInterceptor = (err: AxiosError) => {
  if (err.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão'))
  }

  if (err instanceof Error) {
    const { cause, message, stack } = err
    console.error(err)

    if (process.env.NODE_ENV === 'development' && 'response' in err) {
      console.groupCollapsed('Show details error')
      console.info(FETCH_ERROR_MESSAGE, { cause, message, stack })
      console.info(err.response?.data)
      console.groupEnd()
    }
  }

  if (isString(err)) Promise.reject(new Error(err))

  return Promise.reject(err)
}

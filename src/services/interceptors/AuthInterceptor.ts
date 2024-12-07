import { getCookie } from '@/app/actions'
import { InternalAxiosRequestConfig } from 'axios'

export const authInterceptor = async (config: InternalAxiosRequestConfig) => {
  const res = await getCookie('authToken')

  if (process.env.NODE_ENV !== 'development' && !res?.token) {
    window.location.href = '/'
  }

  if (res?.token && config.headers) {
    config.headers.Authorization = `Bearer ${res?.token}`
  }
  return config
}

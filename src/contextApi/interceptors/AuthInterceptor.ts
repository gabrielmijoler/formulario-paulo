import { useAppData } from '@/context'
import { InternalAxiosRequestConfig } from 'axios'

export const authInterceptor = (config: InternalAxiosRequestConfig) => {
  let token = null
  try {
    token = localStorage.getItem('authToken')
  } catch (error) {}
  if (process.env.NODE_ENV !== 'development' && !token) {
    window.location.href = '/'
  }

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

import { InternalAxiosRequestConfig } from 'axios'

export const authInterceptor = (config: InternalAxiosRequestConfig) => {
  let token = null
  try {
    token = localStorage.getItem('token')
  } catch (error) {
    console.log(error)
  }
  if (process.env.NODE_ENV !== 'development' && !token) {
    window.location.href = '/login'
  }

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

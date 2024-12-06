'use client'

import { getCookie } from '@/app/actions'
import { InternalAxiosRequestConfig } from 'axios'

export const authInterceptor = async (config: InternalAxiosRequestConfig) => {
  const { token } = await getCookie('authToken')

  if (process.env.NODE_ENV !== 'development' && !token) {
    window.location.href = '/'
  }

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

'use client'

import { getToken } from '@/helpers/tokenManager'
import { InternalAxiosRequestConfig } from 'axios'

export const authInterceptor = async (config: InternalAxiosRequestConfig) => {
  const token = await getToken()

  if (process.env.NODE_ENV !== 'development' && !token) {
    window.location.href = '/'
  }

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

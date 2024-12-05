'use client'

import { useAppData } from '@/context'
import { InternalAxiosRequestConfig } from 'axios'

export const authInterceptor = async (config: InternalAxiosRequestConfig) => {
  let token = null
  try {
    const { getToken } = useAppData()
    token = await getToken()
  } catch (error) {}
  if (process.env.NODE_ENV !== 'development' && !token) {
    window.location.href = '/'
  }

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

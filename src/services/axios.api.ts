import axios, { AxiosInstance } from 'axios'

import {
  authInterceptor,
  errorInterceptor,
  responseInterceptor,
} from './interceptors'

export function createAxiosApiInstance(baseURL?: string): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  axiosInstance.interceptors.response.use(
    (res) => responseInterceptor(res),
    (err) => errorInterceptor(err),
  )

  axiosInstance.interceptors.request.use((config) => authInterceptor(config))

  return axiosInstance
}

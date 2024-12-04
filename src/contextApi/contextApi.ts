import axios, { AxiosInstance } from 'axios'

import {
  authInterceptor,
  errorInterceptor,
  responseInterceptor,
} from './interceptors'

export function createAxiosApiInstance(baseURL?: string): AxiosInstance {
  const Api = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  Api.interceptors.response.use(
    (res) => responseInterceptor(res),
    (err) => errorInterceptor(err),
  )

  Api.interceptors.request.use((config) => authInterceptor(config))

  return Api
}

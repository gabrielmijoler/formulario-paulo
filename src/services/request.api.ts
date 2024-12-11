// "use server"
import { Toast } from './../components/Toast/index';
import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { createAxiosApiInstance } from './axios.api'

const CLINICAL_BASE_URL = process.env.CLINICAL_BASE_URL

const clientApi = createAxiosApiInstance(CLINICAL_BASE_URL)

export async function requestApi<T>(config: AxiosRequestConfig): Promise<T | any> {
  try {
    const response: AxiosResponse<T> = await clientApi.request<T>(config)
    return response.data
  } catch (error) {
    console.log(error)
    return Toast({item:{message: 'error', type: 'error'}})

  }
}

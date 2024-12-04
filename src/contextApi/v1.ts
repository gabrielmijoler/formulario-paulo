import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { createAxiosApiInstance } from './contextApi'

const CLINICAL_BASE_URL = process.env.CLINICAL_BASE_URL

const clientApi = createAxiosApiInstance(CLINICAL_BASE_URL)

export async function callApi<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response: AxiosResponse<T> = await clientApi.request<T>(config)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

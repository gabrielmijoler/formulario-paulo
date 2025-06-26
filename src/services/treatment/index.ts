'use server'
import { requestApi } from '../request.api'
import { ITreatmentRequest } from './types'

export async function postTreatment(params: ITreatmentRequest): Promise<any> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/treatment`,
    method: 'POST',
    data: params,
  })
}

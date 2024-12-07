import { requestApi } from '../request.api'
import { ITreatmentRequest } from './types'

export async function postTreatment(params: ITreatmentRequest): Promise<any> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/treatment',
    method: 'POST',
    data: params,
  })
}

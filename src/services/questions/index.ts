import { requestApi } from '../request.api'
import { IQuestion } from './types'

export async function postQuestion(params: IQuestion): Promise<any> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/questions',
    method: 'POST',
    data: params,
  })
}

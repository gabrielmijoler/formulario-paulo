import { callApi } from '../v1'
import { IQuestion } from './types'

export async function QuestionsPost(params: IQuestion): Promise<any> {
  return callApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/questions',
    method: 'POST',
    data: params,
  })
}

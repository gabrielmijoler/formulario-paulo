"use server"

import { requestApi } from '../request.api'
import { IFeedback } from './type'

export async function postUser(params: IFeedback): Promise<IFeedback> {
  return requestApi({
    url: `https://clinical-backend-ae40133038af.herokuapp.com/v1/feedback`,
    method: 'post',
    data: params,
  })
}

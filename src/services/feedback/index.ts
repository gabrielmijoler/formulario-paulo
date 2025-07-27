'use server'

import { requestApi } from '../request.api'
import { IFeedback } from './type'

export async function postUser(params: IFeedback): Promise<IFeedback> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/feedback`,
    method: 'post',
    data: params,
  })
}

import { requestApi } from '../request.api'
import { IPathologiesRequest, IPathologiesResponse } from './types'

export async function postPathologies(
  params: IPathologiesRequest,
): Promise<IPathologiesResponse> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/medical-record',
    method: 'POST',
    data: params,
  })
}

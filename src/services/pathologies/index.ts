"use server"

import { requestApi } from '../request.api'
import { IGetPathologiesRequest, IPathologiesRequest, IPathologiesResponse } from './types'

export async function postPathologies(
  params: IPathologiesRequest,
): Promise<IPathologiesResponse> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/pathologies',
    method: 'POST',
    data: params,
  })
}

export async function getPathologies(params: IGetPathologiesRequest): Promise<IPathologiesResponse> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/pathologies',
    method: 'GET',
    params
  })
}
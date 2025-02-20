'use server'

import { IGetClient, IGetPagination } from '../clients/types'
import { requestApi } from '../request.api'
import { IPathologiesRequest, IPathologiesResponse } from './types'

export async function postPathologies(
  params: IPathologiesRequest,
): Promise<IPathologiesResponse> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/pathologies',
    method: 'POST',
    data: params,
  })
}

export async function getPathologies(
  params: IGetPagination,
): Promise<IGetClient<IPathologiesResponse[]>> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/pathologies',
    method: 'GET',
    params,
  })
}
export async function getPathologiesByID(
  id: string,
): Promise<IPathologiesResponse> {
  return requestApi({
    url: `https://clinical-backend-ae40133038af.herokuapp.com/v1/pathologies/${id}`,
    method: 'GET',
  })
}
export async function putPathologies(
  params: IPathologiesResponse,
): Promise<IPathologiesResponse> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/pathologies',
    method: 'PUT',
    data: params,
  })
}

'use server'

import { IGetResponse, IGetPagination } from '../clients/types'
import { requestApi } from '../request.api'
import { IPathologiesRequest, IPathologiesResponse } from './types'

export async function postPathologies(
  params: IPathologiesRequest,
): Promise<IPathologiesResponse> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/pathologies`,
    method: 'POST',
    data: params,
  })
}

export async function getPathologies(
  params: IGetPagination,
): Promise<IGetResponse<IPathologiesResponse[]>> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/pathologies`,
    method: 'GET',
    params,
  })
}
export async function getPathologiesByID(
  id: string,
): Promise<IPathologiesResponse> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/pathologies/${id}`,
    method: 'GET',
  })
}
export async function putPathologies(
  params: IPathologiesResponse,
): Promise<IPathologiesResponse> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/pathologies`,
    method: 'PUT',
    data: params,
  })
}

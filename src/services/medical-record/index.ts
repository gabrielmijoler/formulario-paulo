'use server'
import { IGetPagination, IGetResponse } from '../clients/types'
import { requestApi } from '../request.api'
import { IMedicalRecordRequest, IMedicalRecordResponse } from './types'

export async function postMedicalRecord(
  params: IMedicalRecordRequest,
): Promise<IMedicalRecordResponse> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}medical-record`,
    method: 'POST',
    data: params,
  })
}
export async function getMedicalRecord(
  params: IGetPagination,
): Promise<IGetResponse<IMedicalRecordResponse[]>> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}medical-record`,
    method: 'GET',
    params,
  })
}

'use server'
import { IGetPagination, IGetResponse } from '../clients/types'
import { requestApi } from '../request.api'
import { IMedicalRecordRequest, IMedicalRecordResponse } from './types'

export async function postMedicalRecord(
  params: IMedicalRecordRequest,
): Promise<IMedicalRecordResponse> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/medical-record',
    method: 'POST',
    data: params,
  })
}
export async function getMedicalRecord(
  params: IGetPagination,
): Promise<IGetResponse<IMedicalRecordResponse[]>> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/medical-record',
    method: 'GET',
    params,
  })
}

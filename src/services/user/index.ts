'use server'
import { requestApi } from '../request.api'
import { IUser } from './type'

export async function getUserById(id: number): Promise<IUser[]> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/user/${id}`,
    method: 'GET',
  })
}
export async function postUser(params: IUser): Promise<IUser[]> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/user`,
    method: 'post',
    data: params,
  })
}

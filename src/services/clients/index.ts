'use server'
import { requestApi } from '../request.api'
import {
  IAuthUser,
  IClient,
  IGetResponse,
  IGetPagination,
  ILogin,
} from './types'

// export async function postLogin(params: ILogin): Promise<any> {
//   await fetch(
//     'https://clinical-backend-ae40133038af.herokuapp.com/v1/auth/login',
//     {
//       method: 'POST',
//       body: JSON.stringify(params),
//     },
//   )
// }
// const BASE_URL = https://clinical-backend-ae40133038af.herokuapp.com
const BASE_URL = 'http://localhost:3001'

export async function postLogin(params: ILogin): Promise<any> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/auth/login`,
    method: 'POST',
    data: params,
  })
}

export async function getUserByName(name: string): Promise<IAuthUser> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/user`,
    method: 'GET',
    params: name,
  })
}

export async function getClient(
  params: IGetPagination,
): Promise<IGetResponse<IClient>> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/clients`,
    method: 'GET',
    params,
  })
}
export async function getClientByID(id: string): Promise<IClient> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/clients/${id}`,
    method: 'GET',
  })
}

export async function postClient(params: IClient): Promise<IClient> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/clients`,
    method: 'POST',
    data: params,
  })
}
export async function putClient(params: IClient): Promise<IClient> {
  return requestApi({
    url: `${process.env.NEXT_PUBLIC_CLINICAL_BASE_URL}/clients`,
    method: 'PUT',
    data: params,
  })
}

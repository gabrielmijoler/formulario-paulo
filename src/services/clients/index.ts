'use server'
import { requestApi } from '../request.api'
import { IAuthUser, IClient, IGetParams, ILogin } from './types'

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
    url: `${BASE_URL}/v1/auth/login`,
    method: 'POST',
    data: params,
  })
}

export async function getClient(params: IGetParams): Promise<IClient[]> {
  return requestApi({
    url: `${BASE_URL}/v1/clients`,
    method: 'GET',
    params,
  })
}
export async function getClientByID(id: string): Promise<IAuthUser> {
  return requestApi({
    url: `${BASE_URL}/v1/clients/${id}`,
    method: 'GET',
  })
}

export async function postClient(params: IClient): Promise<IAuthUser> {
  return requestApi({
    url: `${BASE_URL}/v1/clients`,
    method: 'GET',
    data: params,
  })
}

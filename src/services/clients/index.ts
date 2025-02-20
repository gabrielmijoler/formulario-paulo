'use server'
import { requestApi } from '../request.api'
import { IAuthUser, IClient, IGetClient, IGetPagination, ILogin } from './types'

export async function postLogin(params: ILogin): Promise<IAuthUser> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/auth/login',
    method: 'POST',
    data: params,
  })
}

export async function getUserByName(name: string): Promise<IAuthUser> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/user',
    method: 'GET',
    params: name,
  })
}

export async function getClient(
  params: IGetPagination,
): Promise<IGetClient<IClient>> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/clients',
    method: 'GET',
    params,
  })
}
export async function getClientByID(id: string): Promise<IClient> {
  return requestApi({
    url: `https://clinical-backend-ae40133038af.herokuapp.com/v1/clients/${id}`,
    method: 'GET',
  })
}

export async function postClient(params: IClient): Promise<IAuthUser> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/clients',
    method: 'POST',
    data: params,
  })
}
export async function putClient(params: IClient): Promise<IClient> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/clients',
    method: 'PUT',
    data: params,
  })
}

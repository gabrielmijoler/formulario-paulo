"use server"
import { requestApi } from '../request.api'
import { IAuthUser, IClient, IGetParams, ILogin } from './types'

export async function postLogin(params: ILogin): Promise<any> {
  await fetch('https://clinical-backend-ae40133038af.herokuapp.com/v1/auth/login',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  })
}
export async function getClient(params: IGetParams ): Promise<IClient[]> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/clients',
    method: 'GET',
    params
  })
}
export async function getClientByID(id: string): Promise<IAuthUser> {
  return requestApi({
    url: `https://clinical-backend-ae40133038af.herokuapp.com/v1/clients/${id}`,
    method: 'GET',
  })
}

export async function postClient(params: IClient): Promise<IAuthUser> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/clients',
    method: 'GET',
    data: params
  })
}
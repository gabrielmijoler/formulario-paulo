import { requestApi } from '../request.api'
import { IAuthUser, ILogin } from './types'

export async function postLogin(params: ILogin): Promise<IAuthUser> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/auth/login',
    method: 'POST',
    data: params,
  })
}
export async function getClient(): Promise<IAuthUser> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/clients?paginate=true',
    method: 'GET',
  })
}
export async function getClientByID(id: string): Promise<IAuthUser> {
  return requestApi({
    url: `https://clinical-backend-ae40133038af.herokuapp.com/v1/clients/${id}`,
    method: 'GET',
  })
}

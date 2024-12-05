import { requestApi } from '../request.api'
import { IAuthUser, ILogin } from './types'

export async function postLogin(params: ILogin): Promise<IAuthUser> {
  return requestApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/auth/login',
    method: 'POST',
    data: params, // data post, put
  })
}

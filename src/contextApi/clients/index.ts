import { callApi } from '../v1'
import { IAuthUser, ILogin } from './types'

export async function postLogin(params: ILogin): Promise<IAuthUser> {
  return callApi({
    url: 'https://clinical-backend-ae40133038af.herokuapp.com/v1/auth/login',
    method: 'POST',
    data: params, // data post, put
  })
}

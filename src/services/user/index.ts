import { requestApi } from '../request.api'
import { IUser } from './type'

export async function getUserById(id: number): Promise<IUser> {
  return requestApi({
    url: `https://clinical-backend-ae40133038af.herokuapp.com/v1/user/${id}`,
    method: 'GET',
  })
}
export async function postUser(params: IUser): Promise<IUser> {
  return requestApi({
    url: `https://clinical-backend-ae40133038af.herokuapp.com/v1/user`,
    method: 'post',
    data: params,
  })
}

import { requestApi } from '../request.api'
import { IUser } from './type'

export async function getUserById(id: number, token: string): Promise<IUser> {
  return requestApi({
    url: `https://clinical-backend-ae40133038af.herokuapp.com/v1/user/${id}`,
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
}

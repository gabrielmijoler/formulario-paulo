export type ILogin = {
  username: string
  password: string
}

export type IAuthUser = {
  id: number
  name: string
  password: string
  type: string
  document: string
  email: string
  status: string
  credentials?: Record<string, any>
  calendarId?: string
  whatsAppToken?: string
  whatsAppId?: string
  telephone: string
  token: string
}
export interface IClientAddress {
  zipCode: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
}
export interface IClient {
  id: number
  name: string
  document: string
  clientAddress: IClientAddress
  ieRg: string
  email: string
  telephone: string
  isOpen?: boolean
}

export type IGetResponse<T> = {
  data: T[] | undefined
  pagination?: Pagination
}

export type IGetPagination = {
  paginate: boolean
  per_page: number | undefined
  current_page: number | undefined
  total: number | undefined
  filter: FilterParams
  relations?: string
}

export type Pagination = {
  per_page: number | undefined
  current_page: number | undefined
  total: number | undefined
}

export type FilterParams = {
  [key: string]: string
}

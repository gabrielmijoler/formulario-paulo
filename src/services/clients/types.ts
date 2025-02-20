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

export type IClient = {
  id: number
  name: string
  document: string
  address: string
  ieRg: string
  email: string
  telephone: string
  isOpen?: boolean
}

export type IGetClient<T> = {
  data: T[]
  pagination?: Pagination
}

export type IGetPagination = {
  paginate: boolean
  per_page: number
  current_page: number
  total: number
  filter: FilterParams
}

export type Pagination = {
  per_page: number
  current_page: number
  total: number
}

export type FilterParams = {
  [key: string]: string
}

export type ILogin = {
  username: string
  password: string
}

export type IAuthUser = {
  name: string
  password: string
  type: string
  document: string
  email: string
  status: string
  credentials: Record<string, any>
  calendarId: string
  whatsAppToken: string
  whatsAppId: string
  telephone: string
  token: string
}

export type IClient = {
  name: string,
  document: string,
  address: string,
  ieRg: string,
  email: string,
  telephone: string
}
export type IGetClient = {
  id: number
  name: string,
  document: string,
  address: string,
  ieRg: string,
  email: string,
  telephone: string
}

export type IGetParams = {
  paginate: boolean
  per_page: number
  current_page: number
}

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

export interface IUser {
  password: string
  type: string
  status: string
  credentials?: Record<string, any> | null
  calendarId?: string | null
  whatsAppToken?: string | null
  whatsAppId?: string | null
  token?: string | null
}

// Tipo para o request (POST)
export interface IUserRequest {
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

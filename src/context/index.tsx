'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUserByName, postLogin } from '@/services/clients'
import { getCookie, removeCookie, setCookie } from '@/app/actions'
import { IAuthUser } from '@/services/clients/types'

interface AppContextProps {
  theme?: string
  changeTheme?: () => void
  Logout: () => void
  Login: (username: string, password: string) => Promise<string>
  fetchAndSetUser: (username: string) => Promise<IAuthUser>
  setUser: (user: IAuthUser) => void
  user: IAuthUser
}

const AppContext = createContext<AppContextProps>({
  Logout: () => { },
  Login: async () => '',
  fetchAndSetUser: async () => ({
    id: 0,
    document: '',
    email: '',
    name: '',
    password: '',
    status: '',
    telephone: '',
    token: '',
    type: '',
  }),
  setUser: () => { },
  user: {
    id: 0,
    document: '',
    email: '',
    name: '',
    password: '',
    status: '',
    telephone: '',
    token: '',
    type: '',
  },
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('dark')
  const [user, setUser] = useState<IAuthUser>({
    id: 0,
    document: '',
    email: '',
    name: '',
    password: '',
    status: '',
    telephone: '',
    token: '',
    type: '',
  })

  const router = useRouter()

  function changeTheme() {
    const newTheme = theme === '' ? 'dark' : ''
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  async function setAuthToken(auth: IAuthUser) {
    await setCookie('authToken', JSON.stringify(auth.token))
  }

  const Login = async (username: string, password: string) => {
    try {
      const response = await postLogin({ username, password })
      setAuthToken(response)
      return response.name
    } catch (error: any) {
      throw error.response?.data?.message ?? 'Usuário ou senha inválida'
    }
  }

  const Logout = () => {
    removeCookie('authToken').then(() => {
      getCookie('authToken').then((user) => {
        if (!user) {
          router.push('/')
        }
      })
    })
  }

  const fetchAndSetUser = async (username: string) => {
    try {
      const response = await getUserByName(username)
      setUser(response)
      return response
    } catch (error: any) {
      throw error.response?.data?.message ?? 'Usuário ou senha inválida'
    }
  }

  const contextValue = useMemo(
    () => ({
      theme,
      changeTheme,
      Login,
      Logout,
      fetchAndSetUser,
      setUser,
      user,
    }),
    [theme, user]
  )

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export const useAppData = () => useContext(AppContext)
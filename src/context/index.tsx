'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { getUserByName, postLogin } from '@/services/clients'
import { getCookie, removeCookie, setCookie } from '@/app/actions'
import { IAuthUser } from '@/services/clients/types'

interface AppContextProps {
  theme?: string
  changeTheme?: () => void
  Logout: () => void

  user: IAuthUser
}

const AppContext = createContext<AppContextProps>({
  Logout: () => { },
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
  const [user, setUser] = useState<IAuthUser>({} as IAuthUser)

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
      const response = await postLogin({
        username,
        password,
      })

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

  const fetchAndSetUser = async (user: string) => {
    try {
      const response = await getUserByName(user)

      setUser(response)
      return response
    } catch (error: any) {
      throw error.response?.data?.message ?? 'Usuário ou senha inválida'
    }
  }

  useEffect(() => {
    const saveTheme = localStorage.getItem('theme')
    if (saveTheme) {
      setTheme(saveTheme)
    }
    fetchAndSetUser(user.name)
  }, [user.name])

  const contextValue = useMemo(
    () => ({
      theme,
      changeTheme,
      Login,
      Logout,
      user,
    }),
    [theme, changeTheme, Login, Logout, user],
  )

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export const useAppData = () => useContext(AppContext)

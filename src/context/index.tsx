'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { postLogin } from '@/services/clients'
import { getCookie, removeCookie, setCookie } from '@/app/actions'
import { IAuthUser } from '@/services/clients/types'

interface AppContextProps {
  theme?: string
  Login: (username: string, password: string) => Promise<string | undefined>
  changeTheme?: () => void
  Logout: () => void
  errorMessage: {
    message: string
    type: string
  }
}

const AppContext = createContext<AppContextProps>({
  Login: async () => '',
  errorMessage: { message: '', type: '' },
  Logout: () => {},
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('dark')

  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState({ message: '', type: '' })

  function changeTheme() {
    const newTheme = theme === '' ? 'dark' : ''
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  async function setAuthToken(auth: IAuthUser) {
    await setCookie('authToken', JSON.stringify(auth))
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

  const Logout = async () => {
    await removeCookie('authToken')
    const user = await getCookie('authToken')
    if (!user) {
      router.push('/')
    }
  }

  useEffect(() => {
    const saveTheme = localStorage.getItem('theme')
    setTheme(saveTheme as string)
  }, [theme])

  return (
    <AppContext.Provider
      value={{
        theme,
        changeTheme,
        Login,
        Logout,
        errorMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppData = () => useContext(AppContext)

'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { postLogin } from '@/services/clients'
import { getCookie, removeCookie, setCookie } from '@/app/actions'
import { NextResponse } from 'next/server'
import { IAuthUser } from '@/services/clients/types'

interface AppContextProps {
  tema?: string
  Login: (username: string, password: string) => Promise<string | undefined>
  alternarTema?: () => void
  Logout: () => void
  errorMessage: {
    message: string
    type: string
  }
  getToken: () => Promise<string>
}

const AppContext = createContext<AppContextProps>({
  Login: async () => '',
  errorMessage: { message: '', type: '' },
  Logout: () => {},
  getToken: async () => '',
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [tema, setTema] = useState('dark')

  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState({ message: '', type: '' })

  const handleErrorMessage = (message: string, type: string) => {
    setErrorMessage({ message, type })
  }

  function alternarTema() {
    const novoTema = tema === '' ? 'dark' : ''
    setTema(novoTema)
    localStorage.setItem('tema', novoTema)
  }

  const getToken = async () => {
    const auth = (await getCookie('authToken')) as IAuthUser
    return `Bearer ${auth.token}`
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
    const temaSalvo = localStorage.getItem('tema')
    setTema(temaSalvo as string)
  }, [tema])

  return (
    <AppContext.Provider
      value={{
        tema,
        alternarTema,
        Login,
        Logout,
        errorMessage,
        getToken,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppData = () => useContext(AppContext)

'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { postLogin } from '@/contextApi/clients'
interface AppContextProps {
  tema?: string
  Login: (
    username: string,
    password: string,
    { errorMessage }: { errorMessage: { message: string; type: string } },
  ) => Promise<string>
  alternarTema?: () => void
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
  const [tema, setTema] = useState('dark')
  const [user, setUser] = useState(null)
  const [auth, setAuth] = useState(false)

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

  const Login = async (username: string, password: string) => {
    try {
      const response = await postLogin({
        username,
        password,
      })
      setAuth(true)
      console.log(response)
      if (response.token) {
        handleErrorMessage('Login feito com sucesso', 'success')
      }

      const token = response.token
      localStorage.setItem('token', token)
      localStorage.setItem('auth', JSON.stringify(response))
      setUser(response)
      return response.token
    } catch (error: any) {
      handleErrorMessage(
        error.response.data?.message ?? 'Usuário ou senha inválida',
        'error',
      )
      console.log('error', error.response.data?.message)
    }
  }

  const Logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    router.push('/login')
    setAuth(false)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuth(true)
    }
    const temaSalvo = localStorage.getItem('tema')
    setTema(temaSalvo as string)
  }, [auth, user])

  return (
    <AppContext.Provider
      value={{
        tema,
        alternarTema,
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

'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { postLogin } from '@/services/clients'
import { getCookie, removeCookie, setCookie } from '@/app/actions'
import { IAuthUser } from '@/services/clients/types'

interface AppContextProps {
  theme?: string
  changeTheme?: () => void
}

const AppContext = createContext<AppContextProps>({})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('dark')

  function changeTheme() {
    const newTheme = theme === '' ? 'dark' : ''
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppData = () => useContext(AppContext)

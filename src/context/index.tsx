'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface AppContextProps {
  theme?: string
  changeTheme?: () => void
  toast?: { message: string; type: string }
  showToast?: (message: string, type: string) => void
}

const AppContext = createContext<AppContextProps>({})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('dark')
  const [toast, setToast] = useState<{ message: string; type: string }>({
    message: '',
    type: '',
  })

  function changeTheme() {
    const newTheme = theme === '' ? 'dark' : ''
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  function showToast(message: string, type: string) {
    setToast({ message, type })
    setTimeout(() => {
      setToast({ message: '', type: '' })
    }, 3000)
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
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppData = () => useContext(AppContext)

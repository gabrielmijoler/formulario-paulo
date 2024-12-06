'use client'

import { useAppData } from '@/context'

import Content from './Content'
import { Header } from './Header'
import { useState } from 'react'

interface LayoutProps {
  titulo: string
  subtitulo?: string
  children?: any
  className?: string
}

export default function Layout(props: LayoutProps) {
  const { theme } = useAppData()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleToggleSidebar = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen)
  }

  return (
    <div className={`${theme} flex h-auto min-h-dvh`}>
      <div
        className={`
            flex flex-col p-2 w-full
            bg-gray-300 dark:bg-gradient-to-r from-indigo-500 to-blue-600
        `}
      >
        <Header onToggleSidebar={handleToggleSidebar} />
        <Content isSidebarOpen={isSidebarOpen}>{props.children}</Content>
      </div>
    </div>
  )
}

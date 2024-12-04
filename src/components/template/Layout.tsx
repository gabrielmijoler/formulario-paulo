'use client'

import { useAppData } from '@/context'

import Content from './Content'
import { Header } from './Header'

interface LayoutProps {
  titulo: string
  subtitulo?: string
  children?: any
}

export default function Layout(props: LayoutProps) {
  const { tema } = useAppData()
  return (
    <div className={`${tema} flex h-auto min-h-dvh`}>
      <div
        className={`
            flex flex-col p-2 w-full
            bg-gray-300 dark:bg-gradient-to-r from-indigo-500 to-blue-600
        `}
      >
        <Header />
        <Content>{props.children}</Content>
      </div>
    </div>
  )
}

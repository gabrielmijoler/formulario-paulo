import { Toast } from '@/components/Toast'
import './globals.css'
import { AppProvider } from '@/context'
import { Metadata } from 'next'
import localFont from 'next/font/local'
import ToastClient from '@/useClient/toast'
// import { useState } from 'react'

const metadata: Metadata = {
  title: 'Medoc',
}

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang="pt" className="bg-white">
        <AppProvider>
          <ToastClient />
          <body className={`${geistSans.variable}`}>{children}</body>
        </AppProvider>
      </html>
    </>
  )
}

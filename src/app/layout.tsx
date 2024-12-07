'use client'
import './globals.css'
import { AppProvider } from '@/context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Metadata } from 'next'
import localFont from 'next/font/local'
import { useState } from 'react'

const metadata: Metadata = {
  title: 'Medoc',
}

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <html lang="pt" className="bg-white">
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              {children}
            </body>
          </AppProvider>
        </QueryClientProvider>
      </html >
    </>
  )
}

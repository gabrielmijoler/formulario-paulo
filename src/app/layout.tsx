import { ReactQueryProvider } from '@/providers/react-query-providers'
import './globals.css'
import { AppProvider } from '@/context'
import { Metadata } from 'next'
import localFont from 'next/font/local'

const metadata: Metadata = {
  title: 'Medoc',
}

const gestSans = localFont({
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
    <html lang="pt" className="bg-white">
      <AppProvider>
        <ReactQueryProvider>
          <body className={`${gestSans.variable}`}>{children}</body>
        </ReactQueryProvider>
      </AppProvider>
    </html>
  )
}

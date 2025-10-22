import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/providers'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/shared/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'moviememoirs',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`relative w-screen bg-[#111827] text-text-50 ${inter.className} flex flex-col justify-center antialiased`}
      >
        <Providers>
          <Header />
          <main>{children}</main>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              className: '',
              duration: 5000,
              removeDelay: 1000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}

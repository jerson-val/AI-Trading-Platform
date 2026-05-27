import AuthProvider from '../providers/auth-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Smart Money AI Trading Platform',
  description: 'AI Powered Trading Platform',
}

const inter = Inter({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}

          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#111827',
                color: '#fff',
                border: '1px solid #1f2937',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
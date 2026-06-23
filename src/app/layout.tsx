import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { Inter } from 'next/font/google'
import TokenRefreshProvider from '../providers/auth/token-refresh-provider'
import AuthBootstrap from '../components/auth/auth-bootstrap'
import FullscreenLoader from '../components/ui/fullscreen-loader'

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

        <AuthBootstrap />
        
        <TokenRefreshProvider />

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

          <FullscreenLoader />

      </body>
    </html>
  )
}
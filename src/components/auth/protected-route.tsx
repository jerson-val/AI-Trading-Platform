'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/src/store/auth.store'
import { useSessionStore } from '@/src/store/session.store'

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const isAuthenticated =
    useAuthStore(
      (state) => state.accessToken
    )

  const isModalExpireOpen = useSessionStore.getState().isExpiredModalOpen

  useEffect(() => {
    if (!isAuthenticated && !isModalExpireOpen) {
      router.replace('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
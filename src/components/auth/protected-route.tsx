'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/src/store/auth.store'
import { useSessionStore } from '@/src/store/session.store'
import FullscreenLoader from '../ui/fullscreen-loader'

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

  const isAuthLoading =
    useAuthStore(
      state =>
        state.isAuthLoading
    )

  const isModalExpireOpen = useSessionStore.getState().isExpiredModalOpen

  useEffect(() => {

    if (isAuthLoading) {
      return
    }

    if (!isAuthenticated && !isModalExpireOpen) {
      router.replace('/login')
    }
  }, [isAuthenticated, router, isAuthLoading, isModalExpireOpen])

  if (!isAuthenticated) {
    return null
  }

   if (isAuthLoading) {
    return <FullscreenLoader />
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
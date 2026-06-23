'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/src/store/auth.store'
import { useSessionStore } from '@/src/store/session.store'
import { useLoaderStore } from '@/src/store/loader.store'

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

  const showLoader = useLoaderStore(
      (state) => state.show
    )
  
  const hideLoader = useLoaderStore(
    (state) => state.hide
  )

  const isModalExpireOpen = useSessionStore.getState().isExpiredModalOpen

  useEffect(() => {

    if (isAuthLoading) {
      showLoader()
      return
    } else {
      hideLoader()
    }
 
    if (!isAuthenticated && !isModalExpireOpen) {
      router.replace('/login')
    }
  }, [isAuthenticated, router, isAuthLoading, isModalExpireOpen])

  if (!isAuthenticated) {
    return null
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
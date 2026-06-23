'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/src/store/auth.store'
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

  useEffect(() => {

    if (isAuthLoading) {
      showLoader()
      return
    } else {
      hideLoader()
    }
 
    if (!isAuthenticated ) {
      router.replace('/login')
    }
  }, [isAuthenticated, router, isAuthLoading])

  if (!isAuthenticated) {
    return null
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuthStore }
  from '@/src/store/auth.store'

import FullscreenLoader
  from '@/src/components/ui/fullscreen-loader'

export default function GuestRoute({
  children,
}: {
  children: React.ReactNode
}) {

  const router =
    useRouter()

  const accessToken =
    useAuthStore(
      state =>
        state.accessToken
    )

  const isAuthLoading =
    useAuthStore(
      state =>
        state.isAuthLoading
    )

  useEffect(() => {

    if (isAuthLoading) {
      return
    }

    if (accessToken) {
      router.replace(
        '/dashboard'
      )
    }

  }, [
    accessToken,
    isAuthLoading,
    router
  ])

  if (isAuthLoading) {
    return <FullscreenLoader />
  }

  if (accessToken) {
    return null
  }

  return <>{children}</>
}
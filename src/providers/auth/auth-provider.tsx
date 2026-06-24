'use client'

import { ReactNode, useEffect } from 'react'
import { useAuthController } from '@/src/hooks/use-auth-controller'
import { useLoaderStore } from '@/src/store/loader.store'

export default function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  useAuthController()

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        useLoaderStore.getState().reset()
      }
    }

    window.addEventListener('pageshow', handlePageShow)

    return () =>
      window.removeEventListener('pageshow', handlePageShow)
  }, [])

  return <>{children}</>
}
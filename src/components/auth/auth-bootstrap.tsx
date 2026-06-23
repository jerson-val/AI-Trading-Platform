'use client'

import { useEffect } from 'react'
import { refreshToken } from '@/src/services/auth/auth.service'
import { useAuthStore } from '@/src/store/auth.store'
import toast from 'react-hot-toast'
import { usePathname } from 'next/navigation'

export default function AuthBootstrap() {

  const router = usePathname()

  const setLogin =
    useAuthStore(
      state =>
        state.login
    )

  const setAuthLoading =
    useAuthStore(
      state =>
        state.setAuthLoading
    )

  useEffect(() => {

    const initialize =
      async () => {

        try {

          const response = await refreshToken()

          setLogin(response);

        } catch {

          if(!router?.includes("/login")){
            toast.error('Your session has expired, Please sign in again to continue.')
          }
          // User is not authenticated

        } finally {

          setAuthLoading(false)
        }
      }

    initialize()

  }, [])

  return null
}
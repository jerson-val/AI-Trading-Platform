'use client'

import { useEffect } from 'react'

import { refreshToken }
  from '@/src/services/auth/auth.service'

import { useAuthStore }
  from '@/src/store/auth.store'

export default function
AuthBootstrap() {

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

          const response =
            await refreshToken()

          setLogin(response);

        } catch {

          // User is not authenticated

        } finally {

          setAuthLoading(
            false
          )
        }
      }

    initialize()

  }, [])

  return null
}
'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/src/store/auth.store'
import { refreshToken } from '@/src/services/auth/auth.service'
import toast from 'react-hot-toast'

const GUEST_ROUTES = ['/login', '/register']

export const useAuthController = () => {
  const router = useRouter()
  const pathname = usePathname()

  const {
    accessToken,
    accessTokenExpiresAt,
    authStatus,
    login,
    logout,
    setAuthStatus,
  } = useAuthStore()

  const isGuestRoute = GUEST_ROUTES.some((r) =>
    pathname.startsWith(r)
  )

  const isAuthenticated = authStatus === 'authenticated'

  /* =========================
     BOOTSTRAP
  ========================= */
  useEffect(() => {
    const init = async () => {
      try {
        const res = await refreshToken()
        login(res)
      } catch {
        setAuthStatus('guest')
      }
    }

    init()
  }, [])

  /* =========================
     AUTO REFRESH
  ========================= */
  useEffect(() => {
    if (!accessToken || !accessTokenExpiresAt) return

    const expiresAt = new Date(accessTokenExpiresAt).getTime()
    const refreshIn = expiresAt - Date.now() - 60000

    if (refreshIn <= 0) return

    const timeout = setTimeout(async () => {
      try {
        const res = await refreshToken()
        login(res)
      } catch {
        setAuthStatus('expired')

        setTimeout(() => logout(), 0)
      }
    }, refreshIn)

    return () => clearTimeout(timeout)
  }, [accessToken, accessTokenExpiresAt])

  /* =========================
     TOAST (100% reliable)
  ========================= */
  useEffect(() => {
    if (authStatus !== 'expired') return

    toast.error('Your session expired. Please login again.')
  }, [authStatus])

  /* =========================
     ROUTING (ONLY PLACE THAT CONTROLS NAVIGATION)
  ========================= */
  useEffect(() => {
    if (authStatus === 'booting') return

    if (authStatus === 'guest' || authStatus === 'expired') {
      router.replace('/login')
      return
    }

    if (authStatus === 'authenticated' && isGuestRoute) {
      router.replace('/dashboard')
      return
    }
  }, [authStatus, pathname])
}
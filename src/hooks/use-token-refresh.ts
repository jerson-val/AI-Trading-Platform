import { useEffect } from 'react'
import { useAuthStore } from '@/src/store/auth.store'
import { refreshToken    } from '@/src/services/auth/auth.service'
import toast from 'react-hot-toast'

export const useTokenRefresh = () => {

  const accessToken = useAuthStore( state => state.accessToken )

  const accessTokenExpiresAt = useAuthStore( state => state.accessTokenExpiresAt )

  const setAccessToken = useAuthStore( state => state.setAccessToken )

  useEffect(() => {

    if (
      !accessToken ||
      !accessTokenExpiresAt
    ) {
      return
    }

    const expiresAt =
      new Date(
        accessTokenExpiresAt
      ).getTime()

    const refreshIn = expiresAt - Date.now() - 60000

    if (refreshIn <= 0) {
      return
    }

    const timeout =
      setTimeout(
        async () => {

          try {

            const response = await refreshToken()

            setAccessToken(
              response.accessToken,
              response.accessTokenExpiresAt
            )

          } catch {

            useAuthStore.getState().logout();

            toast.error("Your session has expired, Please sign in again to continue.");
          }

        },
        refreshIn
      )

    return () => clearTimeout(timeout)

  }, [
    accessToken,
    accessTokenExpiresAt,
    setAccessToken
  ])
}
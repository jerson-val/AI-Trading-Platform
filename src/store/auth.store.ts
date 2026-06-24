import { create } from 'zustand'
import { LoginResponse } from '../types/auth/login-response'
import { useLoaderStore } from './loader.store'

type AuthStatus =
  | 'booting'
  | 'authenticated'
  | 'guest'
  | 'expired'

interface AuthState {
  name: string | null
  accessToken: string | null
  accessTokenExpiresAt: Date | null

  authStatus: AuthStatus

  login: (data: LoginResponse) => void
  logout: () => void
  setAuthStatus: (status: AuthStatus) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  name: null,
  accessToken: null,
  accessTokenExpiresAt: null,

  authStatus: 'booting',

  setAuthStatus: (status) =>
    set({ authStatus: status }),

  login: ({ name, accessToken, accessTokenExpiresAt }) => {
    set({
      name,
      accessToken,
      accessTokenExpiresAt,
      authStatus: 'authenticated',
    })
  },

  logout: () => {
    set({
      name: null,
      accessToken: null,
      accessTokenExpiresAt: null,
      authStatus: 'guest',
    })

    useLoaderStore.getState().reset()
  },
}))
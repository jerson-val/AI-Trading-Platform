import { create } from 'zustand'
import { LoginResponse } from '../types/auth/login-response'

/*interface User {
  id: string
  email: string
  fullName: string
}*/

interface AuthState {
  name: string | null

  accessToken: string | null

  accessTokenExpiresAt: Date | null

  isAuthLoading: boolean

  login: (loginResponse: LoginResponse) => void

  setAccessToken: (
    token: string,
    accessTokenExpiresAt: Date
  ) => void

  logout: () => void

  setAuthLoading: (
    value: boolean
  ) => void
}

export const useAuthStore =
  create<AuthState>((set) => ({
    name: null,

    accessToken: null,

    accessTokenExpiresAt: null,

    isAuthLoading: true,

    login: ({ name, accessToken, accessTokenExpiresAt }: LoginResponse) =>
      set({
        name,
        accessToken,
        accessTokenExpiresAt
      }),

    setAccessToken: (
      token,
      accessTokenExpiresAt
    ) =>
      set({
        accessToken: token,
        accessTokenExpiresAt,
      }),

    logout: () =>
      set({
        name: null,
        accessToken: null,
        accessTokenExpiresAt: null,
      }),

    setAuthLoading: (
      value
    ) =>
      set({
        isAuthLoading: value,
      }),
  }))
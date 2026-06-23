import { useAuthStore } from '@/src/store/auth.store'
import axios from 'axios'
import { refreshToken } from '../auth/auth.service'
import toast from 'react-hot-toast'

const accessToken =
  useAuthStore.getState().accessToken

const publicRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/refresh-token'
]

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const token =
      useAuthStore
        .getState()
        .accessToken

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`
    }

    return config
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      accessToken &&
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !publicRoutes.some(route => originalRequest.url?.includes(route))
    ) {
      originalRequest._retry = true

      try {
        const refreshResponse = await refreshToken()

        useAuthStore
          .getState()
          .setAccessToken(
            refreshResponse.accessToken,
            refreshResponse.accessTokenExpiresAt
          )

        return api(originalRequest)
      } catch {

        toast.error('Your session has expired, Please sign in again to continue.')

        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)
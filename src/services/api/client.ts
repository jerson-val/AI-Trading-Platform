import axios from 'axios'
import { refreshToken } from '../auth/auth.service'
import { useAuthStore } from '@/src/store/auth.store'

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const publicRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/refresh-token',
]

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

/* =========================
   REQUEST INTERCEPTOR
========================= */
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

/* =========================
   RESPONSE INTERCEPTOR
========================= */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const token = useAuthStore.getState().accessToken

    if (
      token &&
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !publicRoutes.some((route) =>
        originalRequest.url?.includes(route)
      )
    ) {
      // 🔁 If already refreshing → queue request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (newToken: string) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`
              resolve(api(originalRequest))
            },
            reject,
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const res = await refreshToken()

        // ✅ update global state
        useAuthStore.getState().login(res);

        processQueue(null, res.accessToken)

        originalRequest.headers.Authorization = `Bearer ${res.accessToken}`

        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)

        // 🔥 IMPORTANT: delegate logout to controller/store ONLY
        useAuthStore.getState().logout()

        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)
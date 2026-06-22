'use client'

import { useTokenRefresh } from '@/src/hooks/use-token-refresh'

export default function
TokenRefreshProvider() {

  useTokenRefresh()

  return null
}
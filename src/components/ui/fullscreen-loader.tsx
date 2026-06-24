'use client'

import { useAuthStore } from '@/src/store/auth.store'
import { useLoaderStore } from '@/src/store/loader.store'

export default function FullscreenLoader() {
  const authStatus = useAuthStore((s) => s.authStatus)
  const count = useLoaderStore((s) => s.count)

  const isLoading = authStatus === 'booting' || count > 0

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </div>
  )
}
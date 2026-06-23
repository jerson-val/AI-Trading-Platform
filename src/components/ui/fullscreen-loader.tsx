'use client'

import { useLoaderStore } from '@/src/store/loader.store'

export default function FullscreenLoader() {
  const isLoading =
    useLoaderStore(
      (state) => state.count > 0
    )

  if (!isLoading) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </div>
  )
}
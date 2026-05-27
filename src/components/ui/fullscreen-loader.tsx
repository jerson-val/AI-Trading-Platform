'use client'

export default function FullscreenLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </div>
  )
}
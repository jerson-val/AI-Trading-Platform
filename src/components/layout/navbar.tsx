'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/src/store/auth.store'

export default function Navbar() {

  const router = useRouter()

  const logout = useAuthStore(
    (state) => state.logout
  )

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-[#111827] px-6">
      <div>
        <h1 className="text-lg font-semibold">
          Smart Money AI Trading Platform
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-[#1f2937] px-4 py-2 text-sm">
          BTCUSDT
        </div>

        <div className="rounded-lg bg-green-500/20 px-4 py-2 text-sm text-green-400">
          Connected
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-400 transition-all duration-200 hover:bg-red-500 hover:text-white"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
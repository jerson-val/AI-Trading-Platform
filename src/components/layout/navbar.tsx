'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/src/store/auth.store'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import FullscreenLoader from '../ui/fullscreen-loader'
import { settingsStrategyRegistry } from '@/src/strategies/settings-strategy.registry'
import { useUnsavedChanges } from '@/src/hooks/use-unsaved-changes'
import { logout as logoutCall } from '@/src/services/auth/auth.service'

export default function Navbar() {
  const [isLoading, setIsLoading] =
    useState(false)

  const pathname = usePathname()

  const router = useRouter()

  const logout = useAuthStore(
    (state) => state.logout
  )

  const strategy =
    settingsStrategyRegistry[
      pathname
    ]

  const canSave =
    !!strategy

  const hasUnsavedChanges =
    useUnsavedChanges()

  const handleLogout = async () => {
    try { 

      setIsLoading(true);

      await logoutCall();

      logout();

      router.push('/login');

      toast.success(
        'Successfully logged out'
      )

    }catch (error) {
      
      setIsLoading(false);

      toast.error(
        'Failed to logout'
      )
    }
    
  }

  const handleSave =
    async () => {
      if (!strategy) return

      if (
        strategy.validate &&
        !strategy.validate()
      ) {
        toast.error(
          'Please fix validation errors'
        )

        return
      }

      try {
        setIsLoading(true)

        await strategy.save()

        strategy.markAsSaved()

        toast.success(
          'Settings saved successfully'
        )
      } catch (error) {
        console.error(error)

        toast.error(
          'Failed to save settings'
        )
      } finally {
        setIsLoading(false)
      }
    }

  if (isLoading) {
    return <FullscreenLoader />
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-[#111827] px-6">
      <div>
        <h1 className="text-lg font-semibold">
          Smart Money AI Trading Platform
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {canSave && (
          <button
            onClick={handleSave}
            disabled={
              !hasUnsavedChanges
            }
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              hasUnsavedChanges
                ? 'cursor-pointer bg-blue-600 hover:bg-blue-500'
                : 'cursor-not-allowed bg-gray-700 text-gray-400'
            }`}
          >
            {hasUnsavedChanges
              ? 'Save Settings' 
              : 'Saved'}
          </button>
        )}

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
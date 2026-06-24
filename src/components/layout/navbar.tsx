'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/src/store/auth.store'
import { toast } from 'react-hot-toast'
import { settingsStrategyRegistry } from '@/src/strategies/settings-strategy.registry'
import { useUnsavedChanges } from '@/src/hooks/use-unsaved-changes'
import { logout as logoutCall } from '@/src/services/auth/auth.service'
import { useLoaderStore } from '@/src/store/loader.store'

export default function Navbar() {

  const pathname = usePathname()

  const router = useRouter()

  const showLoader = useLoaderStore(
          (state) => state.show
        )
      
  const hideLoader = useLoaderStore(
    (state) => state.hide
  )

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

      showLoader();

      await logoutCall();

      hideLoader();

      logout();

      router.push('/login');

      toast.success(
        'Successfully logged out'
      )

    }catch (error) {
      
      hideLoader();

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
        showLoader();

        await strategy.save()

        strategy.markAsSaved()

        hideLoader();

        toast.success(
          'Settings saved successfully'
        )
      } catch (error) {
        
        hideLoader();

        console.error(error)

        toast.error(
          'Failed to save settings'
        )
      } 
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
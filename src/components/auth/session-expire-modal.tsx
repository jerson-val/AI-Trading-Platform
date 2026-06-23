'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/src/store/auth.store'
import { useSessionStore } from '@/src/store/session.store'

export default function
SessionExpiredModal() {

  const router =
    useRouter()

  const isOpen =
    useSessionStore(
      state =>
        state.isExpiredModalOpen
    )

  const closeModal =
    useSessionStore(
      state =>
        state.closeExpiredModal
    )

  if (!isOpen) {
    return null
  }

  const handleRedirect = () => {

    useAuthStore.getState().logout()

    closeModal()

    router.replace('/login')

  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">

      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="w-full max-w-md rounded-xl border border-gray-800 bg-[#111827] p-6 shadow-xl"
      >

        <div className="mb-4 flex items-start justify-between">

          <h2 className="text-lg font-semibold text-white">
            Session Expired
          </h2>

          <button
            onClick={
              handleRedirect
            }
            className="text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>

        </div>

        <p className="mb-6 text-sm text-gray-400">
          Your session has expired.
          Please sign in again to continue.
        </p>

        <button
          onClick={
            handleRedirect
          }
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500"
        >
          Go to Login
        </button>

      </div>
    </div>
  )
}
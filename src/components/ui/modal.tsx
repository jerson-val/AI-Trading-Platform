'use client'

import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-xl border border-gray-800 bg-[#111827] shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-gray-800 p-5">
          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg p-2 text-gray-400 transition hover:bg-[#1f2937] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="max-h-[80vh] overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>
  )
}
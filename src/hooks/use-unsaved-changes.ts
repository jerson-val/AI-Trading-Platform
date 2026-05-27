'use client'

import { usePathname } from 'next/navigation'

import { useAISettingsStore } from '@/src/store/ai-settings.store'
import { useSettingsStore } from '@/src/store/settings.store'

export const useUnsavedChanges =
  () => {
    const pathname =
      usePathname()

    const aiUnsavedChanges =
      useAISettingsStore(
        (state) =>
          state.hasUnsavedChanges
      )

    const settingsUnsavedChanges =
      useSettingsStore(
        (state) =>
          state.hasUnsavedChanges
      )

    switch (pathname) {
      case '/ai-engine':
        return aiUnsavedChanges

      case '/settings':
        return settingsUnsavedChanges

      default:
        return false
    }
  }
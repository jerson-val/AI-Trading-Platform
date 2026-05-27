import { create } from 'zustand'

import { AISettings } from '@/src/types/ai-engine/ai-settings'

interface AISettingsStore {
  settings: AISettings

  hasUnsavedChanges: boolean

  setSettings: (
    updater:
      | Partial<AISettings>
      | ((
          prev: AISettings
        ) => AISettings)
  ) => void

  markAsSaved: () => void
}

export const useAISettingsStore =
  create<AISettingsStore>(
    (set) => ({
      settings: {
        strategies: [
          {
            id: 'smc',
            label: 'Smart Money Concepts',
            isChecked: true,
          },

          {
            id: 'liquidity-sweeps',
            label: 'Liquidity Sweeps',
            isChecked: true,
          },

          {
            id: 'order-blocks',
            label: 'Order Blocks',
            isChecked: false,
          },

          {
            id: 'fair-value-gaps',
            label: 'Fair Value Gaps',
            isChecked: true,
          },

          {
            id: 'market-structure',
            label: 'Market Structure',
            isChecked: false,
          },

          {
            id: 'momentum-analysis',
            label: 'Momentum Analysis',
            isChecked: true,
          },
        ],

        timeframes: [
          {
            id: '4h',
            label: '4H',
            isChecked: true,
          },

          {
            id: '1h',
            label: '1H',
            isChecked: true,
          },

          {
            id: '15m',
            label: '15M',
            isChecked: true,
          },

          {
            id: '5m',
            label: '5M',
            isChecked: false,
          },
        ],

        marketConditions: [
          { isChecked: false, label: 'Trending', id: 'trending', }, 
          { isChecked: true, label: 'Ranging', id: 'ranging', }, 
          { id: 'high-volatility', isChecked: false, label: 'High Volatility', }, 
          { id: 'low-liquidity', isChecked: false, label: 'Low Liquidity', }, 
          { id: 'news-events', isChecked: true, label: 'News Events', },
        ],

        minConfidence: 80,

        riskPercent: 1,
      },

      hasUnsavedChanges: false,

      setSettings: (
        updater
      ) =>
        set((state) => ({
          settings:
            typeof updater ===
            'function'
              ? updater(
                  state.settings
                )
              : {
                  ...state.settings,
                  ...updater,
                },

          hasUnsavedChanges: true,
        })),

      markAsSaved: () =>
        set({
          hasUnsavedChanges: false,
        }),
    })
  )
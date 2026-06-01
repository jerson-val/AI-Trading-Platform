import { create } from 'zustand'
import { Settings } from '../types/settings/settings'
import { TradingSettings } from '../types/settings/trading-settings'

interface SettingsStore {
  settings: Settings

  hasUnsavedChanges: boolean

  setSettings: (
    updater:
      | Partial<Settings>
      | ((
          prev: Settings
        ) => Settings)
  ) => void

  markAsSaved: () => void

  updateTradingSettings: (
    tradingSettings: Partial<TradingSettings>
  ) => void
}

export const useSettingsStore =
  create<SettingsStore>(
    (set) => ({
      settings: {
        profile: {
          name: 'John Doe store',
          email: 'test@gmail.com',
          timeZone: 'UTC-5',
          userName: 'johntrader',
        },
        tradingSettings: {
            autoRisk: true,
            leverage: '15',
            preferedPair: 'BTC/USD',
            risk: '2',
        },
        notifications: {
            email: true,
            aiWarnings: true,
            signalAlerts: false,
            telegramAlerts: false,
            tradeExecutions: true,
        },
        appearance: {
            chartTheme: 'dark',
            theme: 'dark',
        },
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
      updateTradingSettings: (
        tradingSettings
      ) =>
        set((state) => ({
          settings: {
            ...state.settings,
            tradingSettings: {
              ...state.settings.tradingSettings,
              ...tradingSettings,
            },
          },
          hasUnsavedChanges: true,
        }))
    }),
    
  )
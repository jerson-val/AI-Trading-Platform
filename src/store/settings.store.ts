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

  toggleNotification: (
    key: keyof Settings['notifications']
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
            leverage: '20',
            preferedPair: 'BTC/USD',
            risk: '2',
        },
        notifications: {
            email: {
              label: 'Email Notifications',
              value: true,
            },
            aiWarnings: {
              label: 'AI Warnings',
              value: true,
            },
            signalAlerts: {
              label: 'Signal Alerts',
              value: false,
            },
            telegramAlerts: {
              label: 'Telegram Alerts',
              value: false,
            },
            tradeExecutions: {
              label: 'Trade Executions',
              value: true,
            },
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
        })),

        toggleNotification: (key) =>
          set((state) => ({
            settings: {
              ...state.settings,
              notifications: {
                ...state.settings.notifications,
                [key]: {
                  ...state.settings.notifications[key],
                  value:
                    !state.settings.notifications[key]
                      .value,
                },
              },
            },
            hasUnsavedChanges: true,
          })),
    }),
  )
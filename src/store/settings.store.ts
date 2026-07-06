import { create } from 'zustand'
import { Settings } from '../types/settings/settings'
import { TradingSettings } from '../types/settings/trading-settings'
import { ProfileSettings } from '../types/settings/profile-settings'
import { NotificationSettings } from '../types/settings/notification-settings'

interface SettingsStore {
  settings: Settings

  hasUnsavedChanges: boolean

  markAsSaved: () => void

  updateTradingSettings: (
    tradingSettings: Partial<TradingSettings>
  ) => void

  setTradingSettings: (
    tradingSettings: Partial<TradingSettings>
  ) => void

  updateProfileSettings: (
    profileSettings: Partial<ProfileSettings>
  ) => void

  setProfileSettings: (
    profileSettings: Partial<ProfileSettings>
  ) => void

  setNotificationsSettings: (
    notifications: Partial<NotificationSettings>
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
          name: '',
          email: '',
          timeZone: ''
        },
        tradingSettings: {
            autoRisk: '',
            leverage: '',
            preferedPair: '',
            risk: '',
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
            chartTheme: '',
            theme: '',
        },
      },

      hasUnsavedChanges: false,

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

        setTradingSettings: (
          tradingSettings
        ) => set((state) => ({
          settings: {
            ...state.settings,
            tradingSettings: {
              ...state.settings.tradingSettings,
              ...tradingSettings,
            },
          }
        })),

        updateProfileSettings: (
          profileSettings
        ) => set((state) => ({
          settings: {
            ...state.settings,
            profile: {
              ...state.settings.profile,
              ...profileSettings,
            },
          },
          hasUnsavedChanges: true,
        })),

        setProfileSettings: (
          profileSettings
        ) => set((state) => ({
          settings: {
            ...state.settings,
            profile: {
              ...state.settings.profile,
              ...profileSettings,
            },
          }
        })),

        setNotificationsSettings: (
          notifications
        ) => set((state) => ({
          settings: {
            ...state.settings,
            notifications: {
              ...state.settings.notifications,
              ...notifications,
            },
          }
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
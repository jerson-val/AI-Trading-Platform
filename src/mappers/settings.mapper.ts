import { NotificationSettings } from "../types/settings/notification-settings"
import { NotificationSettingsDto } from "../types/settings/notification-settings-dto"

export const mapNotificationSettings = (
  dto: NotificationSettingsDto
) => ({
  email: {
    label: 'Email Notifications',
    value: dto.email,
  },
  aiWarnings: {
    label: 'AI Warnings',
    value: dto.aiWarnings,
  },
  signalAlerts: {
    label: 'Signal Alerts',
    value: dto.signalAlerts,
  },
  telegramAlerts: {
    label: 'Telegram Alerts',
    value: dto.telegramAlerts,
  },
  tradeExecutions: {
    label: 'Trade Executions',
    value: dto.tradeExecutions,
  },
})

export const mapNotificationSettingsToDto = (notifications: NotificationSettings) : NotificationSettingsDto => {
  return {
    email: notifications.email.value,
    aiWarnings: notifications.aiWarnings.value,
    signalAlerts: notifications.signalAlerts.value,
    telegramAlerts: notifications.telegramAlerts.value,
    tradeExecutions: notifications.tradeExecutions.value,
  }
}
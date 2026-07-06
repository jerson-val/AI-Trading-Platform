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
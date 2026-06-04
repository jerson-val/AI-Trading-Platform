export interface NotificationSettings {
  email: Notification
  tradeExecutions: Notification
  aiWarnings: Notification
  signalAlerts: Notification
  telegramAlerts: Notification
}

interface Notification {
  label: string
  value: boolean
}
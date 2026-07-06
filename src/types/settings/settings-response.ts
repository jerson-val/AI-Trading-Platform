import { AppearanceSettings } from "./appearance-settings"
import { NotificationSettingsDto } from "./notification-settings-dto"
import { ProfileSettings } from "./profile-settings"
import { TradingSettings } from "./trading-settings"

export interface UserSettingsResponse {
  profile: ProfileSettings
  tradingSettings: TradingSettings
  notifications: NotificationSettingsDto
  appearance: AppearanceSettings
}
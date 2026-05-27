import { AppearanceSettings } from "./appearance-settings"
import { NotificationSettings } from "./notification-settings"
import { ProfileSettings } from "./profile-settings"
import { TradingSettings } from "./trading-settings"

export interface Settings {
  profile: ProfileSettings
  tradingSettings: TradingSettings
  notifications: NotificationSettings
  appearance: AppearanceSettings
}
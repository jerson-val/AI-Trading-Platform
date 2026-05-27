import { aiSettingsStrategy } from './ai-settings/ai-settings.strategy'
import { appSettingsStrategy } from './settings/app-settings.strategy'

export interface SettingsStrategy {
  markAsSaved: () => void
  save: () => Promise<void>
}

export const settingsStrategyRegistry: Record<
  string,
  SettingsStrategy
> = {
  '/ai-engine':
    aiSettingsStrategy,

  '/settings':
    appSettingsStrategy,
}
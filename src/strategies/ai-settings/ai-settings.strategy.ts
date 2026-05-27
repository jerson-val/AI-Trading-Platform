import { useAISettingsStore } from '@/src/store/ai-settings.store'
import { saveAISettings } from '@/src/services/ai-settings.service'

export const aiSettingsStrategy = {
  save: async () => {
    const settings =
      useAISettingsStore.getState()
        .settings

    await saveAISettings(
      settings
    )
  },

  markAsSaved: () => {
    useAISettingsStore
      .getState()
      .markAsSaved()
  },
}
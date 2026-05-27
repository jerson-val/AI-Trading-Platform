import { useSettingsStore } from '@/src/store/settings.store'
import { saveSettings } from '@/src/services/settings.service'

export const appSettingsStrategy = {
  save: async () => {
    const settings =
      useSettingsStore.getState()
        .settings

    await saveSettings(
      settings
    )
  },

  markAsSaved: () => {
    useSettingsStore
      .getState()
      .markAsSaved()
  },
}
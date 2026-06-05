import { useSettingsStore } from '@/src/store/settings.store'
import { saveSettings } from '@/src/services/settings.service'
import { validateEmail, validateFullName } from '@/src/utils/validators/input.validators'

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

  validate: () => {
    const settings =
      useSettingsStore.getState()
        .settings

    const profileErrors = {
      name: validateFullName(
        settings.profile.name
      ),
      email: validateEmail(
        settings.profile.email
      ),
    }

    return !Object.values(
      profileErrors
    ).some(Boolean)
  },

}
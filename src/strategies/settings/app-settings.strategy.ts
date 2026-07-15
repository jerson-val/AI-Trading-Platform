import { useSettingsStore } from '@/src/store/settings.store'
import { saveSettings } from '@/src/services/settings/settings.service'
import { validateEmail, validateFullName } from '@/src/utils/validators/input.validators'
import { mapNotificationSettingsToDto } from '@/src/mappers/settings.mapper'

export const appSettingsStrategy = {
  save: async () => {
    const settings =
      useSettingsStore.getState()
        .settings

    const settingsRequest = {
      ...settings,
      notifications: mapNotificationSettingsToDto(
        settings.notifications
      )
    };

    await saveSettings(
      settingsRequest
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
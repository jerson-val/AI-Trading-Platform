import { UserSettingsResponse } from '../types/settings/settings-response'

export const saveSettings =
  async (
    settings: UserSettingsResponse
  ) => {
    // MOCK API DELAY
    //get the data form the store to do 
    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    )

    console.log(
      'Saved settings:',
      settings
    )

    return {
      success: true,
    }
  }
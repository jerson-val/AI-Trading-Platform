import { api } from "../api/client"
import { UserSettingsResponse } from "@/src/types/settings/settings-response"

export const getUserSettings = async () => {
  const response = await api.get<UserSettingsResponse>('/user-settings')

  return response.data
}

export const saveSettings = async (settings: UserSettingsResponse) => {
  const response = await api.put('/user-settings', settings)
  return response
}
import { PreferredPairDto } from "@/src/types/settings/preferred-pair-dto"
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

export const getPreferredSymbol = async () => {
  const response = await api.get<PreferredPairDto>('/user-settings/preferred-pair')

  return response.data
}
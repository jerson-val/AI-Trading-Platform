import { api } from "../api/client"
import { UserSettingsResponse } from "@/src/types/settings/settings-response"

export const getUserSettings = async () => {
  const response = await api.get<UserSettingsResponse>('/user-settings')

  return response.data
}
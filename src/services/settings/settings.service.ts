import { Settings } from "@/src/types/settings/settings"
import { api } from "../api/client"

export const getUserSettings = async () => {
  const response = await api.get<Settings>('/user-settings')

  return response.data
}
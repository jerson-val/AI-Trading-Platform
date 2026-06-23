import { LoginResponse } from "@/src/types/auth/login-response";
import { api } from "../api/client"

export const refreshToken = async () => {
    const response = await api.post<LoginResponse>('/auth/refresh-token')
    return response.data
};

export const login = async (email: string, password: string) => {
  const response = await api.post<LoginResponse>('/auth/login', { email, password })
  return response.data
};

export const register = async (
    fullName: string,
    email: string, 
    password: string) => {
  const response = await api.post<LoginResponse>('/auth/register', { fullName, email, password })
  return response.data
};

export const logout = async () => {
  const response = await api.post('/auth/logout')
  return response.data
}
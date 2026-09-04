import axios, { type AxiosInstance } from 'axios'

export const useApi = (): AxiosInstance => {
  const config = useRuntimeConfig()
  const api = axios.create({ baseURL: config.public.apiBase })
  if (import.meta.client) {
    const token = localStorage.getItem('portal_token')
    if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`
  }
  return api
}

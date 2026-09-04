interface Admin {
  id: number
  nama: string
  email: string
  avatar?: string | null
}

interface LoginResponse {
  success: boolean
  data: { token: string; admin: Admin }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const admin = ref<Admin | null>(null)
  const api = useApi()

  function hydrate(): void {
    if (import.meta.client) token.value = localStorage.getItem('portal_token')
  }

  async function login(credentials: { email: string; password: string }): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', credentials)
    token.value = data.data.token
    admin.value = data.data.admin
    if (import.meta.client) localStorage.setItem('portal_token', token.value)
    return data
  }

  function logout(): void {
    token.value = null
    admin.value = null
    if (import.meta.client) localStorage.removeItem('portal_token')
    navigateTo('/admin/login')
  }

  return { token, admin, hydrate, login, logout }
})

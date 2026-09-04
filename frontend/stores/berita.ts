export interface Berita {
  id: number
  judul: string
  slug: string
  kategori_id?: number | null
  kategori_nama?: string | null
  kategori_slug?: string | null
  admin_id?: number | null
  penulis?: string | null
  thumbnail?: string | null
  ringkasan: string
  isi: string
  status: 'draft' | 'published'
  views: number
  created_at: string
  updated_at?: string
}

interface Pagination { page: number; limit: number; total: number; totalPages: number }
interface BeritaResponse { success: boolean; data: Berita[]; pagination: Pagination }

export const useBeritaStore = defineStore('berita', () => {
  const list = ref<Berita[]>([])
  const detail = ref<Berita | null>(null)
  const pagination = ref<Partial<Pagination>>({})
  const loading = ref(false)
  const api = useApi()

  async function fetchAll(params: Record<string, string | number> = {}): Promise<BeritaResponse> {
    loading.value = true
    try {
      const response = await api.get<BeritaResponse>('/berita', { params })
      list.value = Array.isArray(response.data?.data) ? response.data.data : []
      pagination.value = response.data?.pagination || {}
      return response.data
    } finally { loading.value = false }
  }
  async function fetchBySlug(slug: string): Promise<Berita> {
    const response = await api.get<{ data: Berita }>(`/berita/${slug}`)
    detail.value = response.data.data
    return response.data.data
  }
  async function create(formData: FormData): Promise<Berita> { return (await api.post<{ data: Berita }>('/berita', formData)).data.data }
  async function update(id: string | number, formData: FormData): Promise<Berita> { return (await api.put<{ data: Berita }>(`/berita/${id}`, formData)).data.data }
  async function remove(id: string | number): Promise<void> { await api.delete(`/berita/${id}`) }
  return { list, detail, pagination, loading, fetchAll, fetchBySlug, create, update, remove }
})

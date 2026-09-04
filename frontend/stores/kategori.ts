export interface Kategori { id: number; nama: string; slug: string; created_at?: string }

export const useKategoriStore = defineStore('kategori', () => {
  const list = ref<Kategori[]>([])
  const api = useApi()
  async function fetchAll(): Promise<Kategori[]> { list.value = (await api.get<{ data: Kategori[] }>('/kategori')).data.data; return list.value }
  async function create(payload: { nama: string; slug?: string }): Promise<Kategori[]> { await api.post('/kategori', payload); return fetchAll() }
  async function update(id: string | number, payload: { nama: string; slug?: string }): Promise<Kategori[]> { await api.put(`/kategori/${id}`, payload); return fetchAll() }
  async function remove(id: string | number): Promise<Kategori[]> { await api.delete(`/kategori/${id}`); return fetchAll() }
  return { list, fetchAll, create, update, remove }
})

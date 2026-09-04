<template>
	<section class="form-page container">
		<div class="eyebrow">Perbarui konten</div>
		<h1>Edit berita</h1>

		<div v-if="item" class="edit-layout">
			<BeritaForm
				:initial="item"
				:kategori="kategori.list"
				submit-label="Simpan perubahan"
				@submit="submit"
			/>

			<aside class="preview-panel">
				<div class="eyebrow">Preview</div>
				<img
					v-if="item.thumbnail"
					class="preview-image"
					:src="imageUrl(item.thumbnail)"
					:alt="item.judul"
				>
				<div v-else class="preview-placeholder">Belum ada thumbnail</div>
				<strong>{{ item.judul }}</strong>
				<span class="meta">{{ item.status }}</span>
			</aside>
		</div>

		<div v-else class="empty">Berita tidak ditemukan.</div>
	</section>
</template>

<script setup lang="ts">
import type { Berita } from '~/stores/berita'

definePageMeta({ middleware: 'admin' })

const route = useRoute()
const kategori = useKategoriStore()
const store = useBeritaStore()
const api = useApi()
const toast = useToast()
const config = useRuntimeConfig()

await kategori.fetchAll()

const item = ref<Berita | null>(null)
const response = await api.get<{ data: Berita }>(`/berita/id/${route.params.id}`)
item.value = response.data.data

const imageUrl = (path: string) => `${config.public.uploadsBase}${path}`

async function submit(data: FormData) {
	await store.update(String(route.params.id), data)
	toast.show('Berita berhasil diperbarui', 'success')
	await navigateTo('/admin/berita')
}
</script>

<style scoped>
.edit-layout {
	display: grid;
	grid-template-columns: minmax(0, 760px) 280px;
	gap: 22px;
}

.preview-panel {
	display: grid;
	align-content: start;
	gap: 10px;
	padding: 18px;
	background: var(--paper);
	border: 1px solid var(--line);
	border-radius: 9px;
}

.preview-image,
.preview-placeholder {
	width: 100%;
	aspect-ratio: 16 / 10;
	object-fit: cover;
	border-radius: 7px;
	background: #dcece8;
}

.preview-placeholder {
	display: grid;
	place-items: center;
	color: var(--muted);
	font-size: .85rem;
}

@media (max-width: 800px) {
	.edit-layout {
		grid-template-columns: 1fr;
	}
}
</style>

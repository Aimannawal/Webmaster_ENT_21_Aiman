<template>
    <section class="section container">
        <div class="eyebrow">Struktur konten</div>
        <h1>Kategori</h1>
        <form class="toolbar" @submit.prevent="save"><input v-model="name" placeholder="Nama kategori baru"
                required><button class="btn btn-primary">Tambah kategori</button></form>
        <div class="table-wrap">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Slug</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in store.list" :key="item.id">
                        <td>{{ item.nama }}</td>
                        <td>{{ item.slug }}</td>
                        <td><button class="btn btn-danger" @click="remove(item.id, item.nama)">Hapus</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
<script setup lang="ts">
definePageMeta({ middleware: 'admin' })

const store = useKategoriStore()
const berita = useBeritaStore()
const name = ref('')

await store.fetchAll()

async function save() {
    await store.create({ nama: name.value })
    name.value = ''
}

async function remove(id: number, nama: string) {
    if (!confirm(`Hapus kategori "${nama}"?`)) return

    try {
        const response = await berita.fetchAll({ kategori: id, page: 1, limit: 1 })
        const beritaCount = response.pagination?.total || 0
        if (beritaCount > 0) {
            window.alert(
                `Kategori "${nama}" tidak dapat dihapus. Masih ada ${beritaCount} berita yang menggunakan kategori ini. Ubah kategori berita tersebut terlebih dahulu.`
            )
            return
        }

        await store.remove(id)
    } catch (error: any) {
        if (error.response?.status === 409) {
            const count = error.response.data?.data?.beritaCount || 0
            window.alert(
                `Kategori "${nama}" tidak dapat dihapus. Masih ada ${count} berita yang menggunakan kategori ini. Ubah kategori berita tersebut terlebih dahulu.`
            )
        } else {
            window.alert(error.response?.data?.message || 'Kategori gagal dihapus.')
        }
    }
}
</script>

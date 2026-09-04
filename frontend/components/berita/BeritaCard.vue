<template><article class="card"><NuxtLink :to="`/berita/${berita.slug}`"><img v-if="berita.thumbnail" class="thumb" :src="imageUrl(berita.thumbnail)" :alt="berita.judul"><div v-else class="thumb image-placeholder"><Icon name="heroicons:photo" /></div><div class="card-body"><div class="badge">{{ berita.kategori_nama || 'Umum' }}</div><h3>{{ berita.judul }}</h3><p class="muted">{{ berita.ringkasan }}</p><div class="meta">{{ formatDate(berita.created_at) }} · {{ berita.views || 0 }} views</div></div></NuxtLink></article></template>
<script setup lang="ts">
import type { Berita } from '~/stores/berita'
defineProps<{ berita: Berita }>()
const config = useRuntimeConfig()
const imageUrl = (path?: string | null) => path?.startsWith('http') ? path : `${config.public.uploadsBase}${path || ''}`
const formatDate = (date?: string) => date ? new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'
</script>

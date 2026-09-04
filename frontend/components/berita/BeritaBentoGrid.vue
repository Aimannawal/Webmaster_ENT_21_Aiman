<template><div class="bento"><NuxtLink v-for="(item, index) in berita.slice(0, 5)" :key="item.id" class="bento-card" :class="{ featured: index === 0 }" :to="`/berita/${item.slug}`"><img v-if="item.thumbnail" :src="imageUrl(item.thumbnail)" :alt="item.judul"><div class="bento-copy"><div class="badge">{{ item.kategori_nama || 'Pilihan editor' }}</div><h3>{{ item.judul }}</h3></div></NuxtLink><div v-if="!berita.length" class="empty">Belum ada berita pilihan.</div></div></template>
<script setup lang="ts">
import type { Berita } from '~/stores/berita'
defineProps<{ berita: Berita[] }>()
const config = useRuntimeConfig()
const imageUrl = (path?: string | null) => path?.startsWith('http') ? path : `${config.public.uploadsBase}${path || ''}`
</script>

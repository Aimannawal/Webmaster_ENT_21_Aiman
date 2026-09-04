<template>
  <section class="section container">
    <div class="category-banner">
      <img :src="category.image" :alt="`Banner kategori ${category.name}`">
      <div class="category-banner-copy">
        <div class="eyebrow">Kanal BeritaSurabaya</div>
        <h1>{{ category.name }}</h1>
        <p>{{ category.description }}</p>
      </div>
    </div>

    <div class="section-head category-results-head">
      <div>
        <div class="eyebrow">Cerita terbaru</div>
        <h2>Berita {{ category.name }}</h2>
      </div>
      <span class="meta">{{ store.pagination.total || 0 }} berita</span>
    </div>

    <div v-if="store.list.length" class="grid news-grid">
      <BeritaCard v-for="item in store.list" :key="item.id" :berita="item" />
    </div>
    <div v-else class="empty">Belum ada berita di kategori ini.</div>
  </section>
</template>

<script setup lang="ts">
import ekonomiImage from '~/assets/image/ekonomi.png'
import olahragaImage from '~/assets/image/olahraga.jpg'
import politikImage from '~/assets/image/politik.jpg'
import seniImage from '~/assets/image/seni.jpeg'

const route = useRoute()
const store = useBeritaStore()

const categoryMap: Record<string, { name: string; image: string; description: string }> = {
  ekonomi: { name: 'Ekonomi', image: ekonomiImage, description: 'Pergerakan usaha, pasar, dan peluang yang membentuk Surabaya.' },
  politik: { name: 'Politik', image: politikImage, description: 'Kebijakan dan keputusan publik yang berdampak pada warga.' },
  olahraga: { name: 'Olahraga', image: olahragaImage, description: 'Semangat kompetisi, komunitas, dan prestasi dari kota.' },
  hiburan: { name: 'Seni', image: seniImage, description: 'Ragam karya, panggung, dan kreativitas dari Surabaya.' }
}

const category = categoryMap[String(route.params.slug)] || {
  name: String(route.params.slug).replaceAll('-', ' '),
  image: seniImage,
  description: 'Kumpulan cerita pilihan dari BeritaSurabaya.'
}

await store.fetchAll({ kategori: route.params.slug, limit: 50 })
</script>

<style scoped>
.category-banner { position: relative; min-height: 290px; overflow: hidden; border-radius: 10px; background: var(--ink); color: white; }
.category-banner img { width: 100%; height: 290px; object-fit: cover; opacity: .72; }
.category-banner-copy { position: absolute; right: 28px; bottom: 26px; left: 28px; max-width: 620px; }
.category-banner-copy h1 { margin: 6px 0; font-size: clamp(2.3rem, 6vw, 4.5rem); line-height: .95; text-transform: capitalize; }
.category-banner-copy p { max-width: 480px; margin: 12px 0 0; color: #e5efec; }
.category-results-head { margin-top: 48px; }
@media (max-width: 760px) { .category-banner, .category-banner img { min-height: 250px; height: 250px; } .category-banner-copy { right: 18px; bottom: 18px; left: 18px; } }
</style>

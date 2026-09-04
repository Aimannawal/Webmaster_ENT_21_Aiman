<template><section class="hero"><div class="container hero-inner"><div class="hero-copy"><div class="eyebrow">BeritaSurabaya / Edisi hari ini</div><h1>Berita yang membuat kota terasa dekat.</h1><p class="muted">Cerita pilihan, laporan mendalam, dan kabar terbaru dari berbagai sudut Surabaya.</p></div><div class="hero-landmark"><img :src="heroImage" alt="Ikon kota Surabaya"><span>Surabaya, Jawa Timur</span></div></div></section><section class="section container"><div class="section-head"><div><div class="eyebrow">Pilihan redaksi</div><h2>Yang sedang dibicarakan</h2></div><NuxtLink class="btn btn-quiet" to="/berita">Lihat semua <Icon name="heroicons:arrow-right" /></NuxtLink></div><BeritaBentoGrid :berita="featured" /></section><section class="section container"><div class="section-head"><div><div class="eyebrow">Terbaru</div><h2>Kabar terkini</h2></div></div><div class="grid news-grid"><BeritaCard v-for="item in latest" :key="item.id" :berita="item" /></div></section><section class="section container location-section"><div><div class="eyebrow">Datang dan kenali kotanya</div><h2>Berita dari Surabaya, untuk Surabaya</h2><p class="muted">Berbasis di jantung Jawa Timur, kami mengikuti cerita yang tumbuh di setiap sudut kota.</p></div><iframe title="Peta lokasi Surabaya" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126646.20750916582!2d112.71268375!3d-7.275619450000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf8381ac47f%3A0x3027a76e352be40!2sSurabaya%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1788507063006!5m2!1sid!2sid" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></section></template>
<script setup lang="ts">
import heroImage from '~/assets/image/hero.jpg'

const store = useBeritaStore()
let items = []
try {
	const response = await store.fetchAll({ limit: 6 })
	items = Array.isArray(response?.data) ? response.data : []
} catch {
	items = []
}
const featured = items.slice(0, 5)
const latest = items.slice(0, 6)
</script>

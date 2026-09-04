<template><header class="site-header"><nav class="container nav"><NuxtLink class="brand" to="/">BERITA<span>SURABAYA</span></NuxtLink><div class="nav-links"><NuxtLink to="/berita">Berita</NuxtLink><NuxtLink v-for="item in primaryCategories" :key="item.slug" :to="`/kategori/${item.slug}`">{{ item.nama }}</NuxtLink></div><NuxtLink class="btn btn-dark" to="/admin">Dashboard <Icon name="heroicons:arrow-up-right" /></NuxtLink></nav></header></template>
<script setup lang="ts">
const primaryCategories = [
	{ nama: 'Ekonomi', slug: 'ekonomi' },
	{ nama: 'Politik', slug: 'politik' },
	{ nama: 'Seni', slug: 'hiburan' },
	{ nama: 'Olahraga', slug: 'olahraga' }
]
</script>

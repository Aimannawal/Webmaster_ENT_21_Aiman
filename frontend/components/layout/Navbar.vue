<template>
	<header class="site-header">
		<nav class="container nav">
			<NuxtLink class="brand" to="/">BERITA<span>SURABAYA</span></NuxtLink>
			<button class="menu-toggle" type="button" aria-label="Buka menu" :aria-expanded="isOpen" @click="isOpen = !isOpen">
				<Icon :name="isOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" />
			</button>
			<div class="nav-links" :class="{ 'nav-links-open': isOpen }">
				<NuxtLink to="/berita" @click="isOpen = false">Berita</NuxtLink>
				<NuxtLink v-for="item in primaryCategories" :key="item.slug" :to="`/kategori/${item.slug}`" @click="isOpen = false">{{ item.nama }}</NuxtLink>
			</div>
		</nav>
	</header>
</template>
<script setup lang="ts">
const isOpen = ref(false)

const primaryCategories = [
	{ nama: 'Ekonomi', slug: 'ekonomi' },
	{ nama: 'Politik', slug: 'politik' },
	{ nama: 'Seni', slug: 'hiburan' },
	{ nama: 'Olahraga', slug: 'olahraga' }
]
</script>

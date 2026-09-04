<template>
	<footer class="site-footer">
		<div class="container footer-grid">
			<div class="footer-brand">
				<strong>BERITA<span>SURABAYA</span></strong>
				<p>Suara kota, cerita kita.</p>
			</div>
			<div class="footer-contact">
				<p>Surabaya, Jawa Timur<br>Indonesia 60272</p>
				<a href="tel:+623112345678">(031) 1234-5678</a>
				<a href="mailto:hello@beritasurabaya.id">hello@beritasurabaya.id</a>
			</div>
			<nav class="footer-links" aria-label="Navigasi footer">
				<div class="footer-label">Jelajahi</div>
				<NuxtLink to="/">Beranda</NuxtLink>
				<NuxtLink to="/berita">Berita terbaru</NuxtLink>
				<NuxtLink to="/admin/login">Ruang redaksi</NuxtLink>
			</nav>
			<div class="footer-links">
				<div class="footer-label">Ikuti kami</div>
				<a href="#">Instagram</a>
				<a href="#">Facebook</a>
				<a href="#">Twitter</a>
			</div>
			<button class="back-to-top" type="button" aria-label="Kembali ke atas" @click="scrollToTop">
				<Icon name="heroicons:arrow-up" />
			</button>
			<div class="footer-copyright">© {{ new Date().getFullYear() }} BeritaSurabaya. Semua hak dilindungi.</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
function scrollToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

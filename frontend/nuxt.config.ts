export default defineNuxtConfig({
  srcDir: '.',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxt/icon'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
        apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api',
        uploadsBase: process.env.NUXT_PUBLIC_UPLOADS_BASE || 'http://localhost:3000'
    }
  },
  typescript: { strict: false }
})
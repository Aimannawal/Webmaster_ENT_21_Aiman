export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore()
  if (import.meta.client) auth.hydrate()
  if (!auth.token) return navigateTo('/admin/login')
})

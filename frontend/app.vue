<template>
  <div class="site-shell">
    <LayoutNavbar />
    <main><NuxtPage /></main>
    <LayoutFooter />
    <ClientOnly><UiToast /></ClientOnly>
  </div>
</template>

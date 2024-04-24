// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['nuxt-primevue', '@nuxtjs/tailwindcss'],
  css: [
    'primevue/resources/themes/aura-light-green/theme.css',
    'primeicons/primeicons.css',
    '@/assets/main.css',
  ],

  tailwindcss: {
    config: {
      theme: {
        extend: {
          minHeight: {
            body: 'calc(100vh - 130px)',
          },
        },
      },
    },
  },
});

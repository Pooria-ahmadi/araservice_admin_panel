// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: 'fa',
                dir: 'rtl',
            },
        },
    },
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: [
        '@primevue/nuxt-module',
        '@nuxtjs/tailwindcss',
    ],
    primevue: {
        options: {
            theme: {
                preset: Aura
            }
        }
    }
})

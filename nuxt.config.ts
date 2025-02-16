import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
    css: [
        '~/assets/css/global.css'
    ],

    modules: [
        '@primevue/nuxt-module',
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@nuxtjs/i18n',
        '@nuxt/icon',
    ],
    icon: {
        collections: ['uil'],
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'fa',
                dir: 'rtl',
            },
        },
    },
    runtimeConfig: {
        public: {
            mapIrApiKey: process.env.MAP_IR_API_KEY,
            apiBaseUrlAcc: process.env.API_BASE_URL_ACC,
            apiBaseUrlServ: process.env.API_BASE_URL_SERV
        }
    },
    i18n: {
        locales: [
            { code: 'fa', iso: 'fa-IR', dir: 'rtl', name: 'فارسی' },
            { code: 'en', iso: 'en-US', dir: 'ltr', name: 'English' }
        ],
        defaultLocale: 'fa',
        strategy: 'no_prefix',
        detectBrowserLanguage: false,
        vueI18n: './i18n.config.ts',
    },
    primevue: {
        options: {
            ripple: true,
            inputVariant: 'filled',
            theme: {
                preset: Aura,
                options: {
                    prefix: 'p',
                    darkModeSelector: false,
                    cssLayer: false,
                }
            }
        }
    },

    compatibilityDate: '2025-02-06'
})
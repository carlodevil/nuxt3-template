// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    typescript: {
        shim: false
    },
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    build: {
        transpile: ["@headlessui/vue", "@heroicons/vue",]
    },
})

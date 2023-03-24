// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    typescript: {
        shim: false
    },
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    build: {
        transpile: ["@headlessui/vue", "@heroicons/vue",],
        extend(config, ctx) {
            if (ctx.isDev) {
              config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
            }
          }
    },
})

# Nuxt 3 Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.

[Nuxt Config File](/guide/directory-structure/nuxt.config#nuxt-config-file)
===========================================================================

Nuxt can be easily configured with a single `nuxt.config` file, which can have either a `.js`, `.ts` or `.mjs` extension.

    export default defineNuxtConfig({  // My Nuxt config})

`defineNuxtConfig` helper is globally available without import.

You can explicitly import `defineNuxtConfig` from `nuxt/config` if you prefer:

    import { defineNuxtConfig } from 'nuxt/config'export default defineNuxtConfig({  // My Nuxt config})

To ensure your configuration is up to date, Nuxt will make a full restart when detecting changes in the main configuration file, the `.env`, `.nuxtignore` and `.nuxtrc` dotfiles.

Read more in [API > Configuration > Nuxt Config](/api/configuration/nuxt-config).

## Components

Nuxt automatically imports any components in your components/ directory (along with components that are registered by any modules you may be using).

### Component Names

If you have a component in nested directories such as:

` components/
--| base/
----| foo/
------| Button.vue`

... then the component's name will be based on its own path directory and filename, with duplicate segments being removed. Therefore, the component's name will be:

    <BaseFooButton />
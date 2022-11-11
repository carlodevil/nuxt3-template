## Components

[View the official docs here](https://v3.nuxtjs.org/guide/directory-structure/components)

Nuxt automatically imports any components in your components/ directory (along with components that are registered by any modules you may be using).

### Component Names

If you have a component in nested directories such as:

    components/
    --| base/
    ----| foo/
    ------| Button.vue

... then the component's name will be based on its own path directory and filename, with duplicate segments being removed. Therefore, the component's name will be:

    <BaseFooButton />

### Dynamic Components

If you want to use the Vue `<component :is="someComputedComponent">` syntax, then you will need to use the resolveComponent helper provided by Vue.
For example:

    <template>
    <component :is="clickable ? MyButton : 'div'" />
    </template>

    <script setup>
    const MyButton = resolveComponent('MyButton')
    </script>

*If you are using resolveComponent to handle dynamic components, make sure not to insert anything but the name of the component, which must be a string and not a variable.*

Alternatively, though not recommended, you can register all your components globally, which will create async chunks for all your components and make them available throughout your application.

    export default defineNuxtConfig({
        components: {
    +     global: true,
    +     dirs: ['~/components']
        },
    })

You can also selectively register some components globally by placing them in a ~/components/global directory.

*The global option can also be set per component directory.*

## Dynamic Imports

To dynamically import a component (also known as lazy-loading a component) all you need to do is add the Lazy prefix to the component's name.

    <template>
    <div>
        <TheHeader />
            <slot />
        <LazyTheFooter />
    </div>
    </template>

This is particularly useful if the component is not always needed. By using the Lazy prefix you can delay loading the component code until the right moment, which can be helpful for optimizing your JavaScript bundle size.

    <template>
        <div>
            <h1>Mountains</h1>
            <LazyMountainsList v-if="show" />
            <button v-if="!show" @click="show = true">Show List</button>
        </div>
    </template>

    <script>
    export default {
        data() {
            return {
                show: false
            }
        }
    }
    </script>

## Direct Imports

You can also explicitly import components from #components if you want or need to bypass Nuxt's auto-importing functionality.

    <template>
        <div>
            <h1>Mountains</h1>
            <LazyMountainsList v-if="show" />
            <button v-if="!show" @click="show = true">Show List</button>
            <NuxtLink to="/">Home</NuxtLink>
        </div>
    </template>

    <script setup>
    import { NuxtLink, LazyMountainsList } from '#components'
    const show = ref(false)
    </script>

### `<ClientOnly>` Component

Nuxt provides the `<ClientOnly>` component for purposely rendering a component only on client side. To import a component only on the client, register the component in a client-side only plugin.

    <template>
        <div>
            <Sidebar />
            <ClientOnly>
                <!-- this component will only be rendered on client-side -->
                <Comments />
            </ClientOnly>
        </div>
    </template>

Use a slot as fallback until `<ClientOnly>` is mounted on client side.

    <template>
        <div>
            <Sidebar />
            <!-- This renders the "span" element on the server side -->
            <ClientOnly fallbackTag="span">
                <!-- this component will only be rendered on client side -->
                <Comments />
                <template #fallback>
                    <!-- this will be rendered on server side -->
                    <p>Loading comments...</p>
                </template>
            </ClientOnly>
        </div>
    </template>

### .client Components

If a component is meant to be rendered only client-side, you can add the .client suffix to your component.

    | components/
    --| Comments.client.vue

    <template>
    <div>
        <!-- this component will only be rendered on client side -->
        <Comments />
    </div>
    </template>

*This feature only works with Nuxt auto-imports and #components imports. Explicitly importing these components from their real paths does not convert them into client-only components.*

### .server Components

.server components are fallback components of .client components.

    | components/
    --| Comments.client.vue
    --| Comments.server.vue

    <template>
        <div>
            <!-- this component will render Comments.server server-side then Comments.client once mounted in client-side -->
            <Comments />
        </div>
    </template>

### `<DevOnly>` Component

Nuxt provides the `<DevOnly>` component to render a component only during development.
The content will not be included in production builds and tree-shaken.

    <template>
        <div>
            <Sidebar />
            <DevOnly>
                <!-- this component will only be rendered during development -->
                <LazyDebugBar />
            </DevOnly>
        </div>
    </template>

### Library Authors

Making Vue component libraries with automatic tree-shaking and component registration is super easy ✨

You can use the components:dirs hook to extend the directory list without requiring user configuration in your Nuxt module.

Imagine a directory structure like this:

    | node_modules/
    ---| awesome-ui/
    ------| components/
    ---------| Alert.vue
    ---------| Button.vue
    ------| nuxt.js
    | pages/
    ---| index.vue
    | nuxt.config.js

Then in awesome-ui/nuxt.js you can use the components:dirs hook:

    import { defineNuxtModule } from '@nuxt/kit'
    import { fileURLToPath } from 'node:url'

    export default defineNuxtModule({
    hooks: {
        'components:dirs'(dirs) {
        // Add ./components dir to the list
        dirs.push({
            path: fileURLToPath(new URL('./components', import.meta.url)),
            prefix: 'awesome'
        })
        }
    }
    })

That's it! Now in your project, you can import your UI library as a Nuxt module in your nuxt.config file:

    export default {
    modules: ['awesome-ui/nuxt']
    }

... and directly use the module components (prefixed with awesome-) in our pages/index.vue:

    <template>
    <div>
        My <AwesomeButton>UI button</AwesomeButton>!
        <awesome-alert>Here's an alert!</awesome-alert>
    </div>
    </template>

It will automatically import the components only if used and also support HMR when updating your components in node_modules/awesome-ui/components/.
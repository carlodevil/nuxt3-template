## Middleware Directory

[View the official docs here](https://v3.nuxtjs.org/guide/directory-structure/middleware)

**Nuxt provides a customizable route middleware framework you can use throughout your application, ideal for extracting code that you want to run before navigating to a particular route.**

*Route middleware run within the Vue part of your Nuxt app. Despite the similar name, they are completely different from server middleware, which are run in the Nitro server part of your app.*

There are three kinds of route middleware:

1. Anonymous (or inline) route middleware, which are defined directly in the pages where they are used.
2. Named route middleware, which are placed in the middleware/ directory and will be automatically loaded via asynchronous import when used on a page. (Note: The route middleware name is normalized to kebab-case, so `someMiddleware` becomes `some-middleware`.)
3. Global route middleware, which are placed in the middleware/ directory (with a .global suffix) and will be automatically run on every route change.
T
e first two kinds of route middleware can be defined in `definePageMeta`.

### Format

Route middleware are navigation guards that receive the current route and the next route as arguments.

    export default defineNuxtRouteMiddleware((to, from) => {
        if (to.params.id === '1') {
            return abortNavigation()
        }
        return navigateTo('/')
    })

Nuxt provides two globally available helpers that can be returned directly from the middleware:

1. `navigateTo (to: RouteLocationRaw | undefined | null, options: { replace: boolean, redirectCode: number, external: boolean )` - Redirects to the given route, within plugins or middleware. It can also be called directly to perform page navigation.

2. `abortNavigation (err?: string | Error)` - Aborts the navigation, with an optional error message.

Unlike navigation guards in the vue-router docs, a third `next()` argument is not passed, and redirects or route cancellation is handled by returning a value from the middleware. Possible return values are:

- nothing - does not block navigation and will move to the next middleware function, if any, or complete the route navigation

- `return navigateTo('/')` or `return navigateTo({ path: '/' })` - redirects to the given path and will set the redirect code to 302 Found if the redirect happens on the server side

- `return navigateTo('/', { redirectCode: 301 })` - redirects to the given path and will set the redirect code to 301 Moved Permanently if the redirect happens on the server side

    `return abortNavigation()` - stops the current navigation
    `return abortNavigation(error)` - rejects the current navigation with an error

### Adding Middleware Dynamically

It is possible to add global or named route middleware manually using the addRouteMiddleware() helper function, such as from within a plugin.

    export default defineNuxtPlugin(() => {
        addRouteMiddleware('global-test', () => {
            console.log('this global middleware was added in a plugin and will be run on every route change')
    }, { global: true })

    addRouteMiddleware('named-test', () => {
        console.log('this named middleware was added in a plugin and would override any existing middleware of the same name')
        })
    })

### Example: A Named Route Middleware

    -| middleware/
    ---| auth.ts

In your page file, you can reference this route middleware

    <script setup>
        definePageMeta({
            middleware: ["auth"]
            // or middleware: 'auth'
        })
    </script>

Now, before navigation to that page can complete, the auth route middleware will be run.
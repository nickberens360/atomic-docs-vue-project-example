/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router/index'
import componentDocs from '@/plugins/component-documentation'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(router)
    .use(pinia)
    .use(componentDocs as any)
    .use(vuetify)
}

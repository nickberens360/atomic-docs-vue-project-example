/**
 * router/index.js
 */

import { createRouter, createWebHistory } from 'vue-router/auto'
import componentDocRoutes from '@/plugins/component-documentation/routes'
// import { setupAuthGuard } from '@/services/authGuard'
// import usePermissionsGuard from '@/services/permissionsGuard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'login',
    //   component: () => import('@/views/LoginPage.vue'),
    //   meta: {
    //     pageTitle: 'Login'
    //   },
    // },
    // {
    //   path: '/request-password-reset',
    //   name: 'requestPasswordReset',
    //   component: () => import('@/views/RequestPasswordReset.vue'),
    //   meta: {
    //     pageTitle: 'Request Password Reset',
    //     authNotRequired: true,
    //   }
    // },
    // {
    //   path: '/forgot-password',
    //   name: 'forgotPassword',
    //   component: () => import ('@/views/ForgotPassword.vue'),
    //   meta: {
    //     pageTitle: 'Forgot Password',
    //     authNotRequired: true
    //   }
    // },
    ...(import.meta.env.VITE_ENABLE_COMPONENT_DOCS !== 'true' ? [] : [
      {
        path: '',
        children: componentDocRoutes,
        meta: {
          pageTitle: 'Foxy Docs'
        }
      }
    ]),
  ],
})

// Setup authentication guard
// setupAuthGuard(router);
// usePermissionsGuard(router);

// Error handling for dynamic imports
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router

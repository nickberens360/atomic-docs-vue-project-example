// router/guards/auth.js
import { useUserStore } from '@/stores/user'

export const setupAuthGuard = (router) => {
  router.beforeEach((to, from) => {
    const userStore = useUserStore()

    // If route is login page, allow access
    if (to.name === 'login') {
      return true
    }

    // If user is not authenticated, redirect to login
    // if (!userStore.isAuthenticated) {
    //   return {
    //     name: 'login',
    //     query: { redirect: to.fullPath }
    //   }
    // }

    // Allow access to authenticated users
    return true
  })
}
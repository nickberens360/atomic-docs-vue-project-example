import { useUserStore } from '@/stores/user';

export default function usePermissionsGuard(router) {
  router.beforeEach(async function (to) {
    const userStore = useUserStore(); // Ensure userStore is accessed here
    const requiredPermissions = to.meta?.permissions || [];

    if (requiredPermissions.length === 0) {
      return; // No permissions required for this route
    }

    // Use the checkUserPermissions getter directly
    const userHasRouteViewPermission = userStore.checkUserPermissions(requiredPermissions);

    if (!userHasRouteViewPermission) {
      // Redirect to access denied page if the user lacks permissions
      return {
        name: 'accessDenied',
        query: {
          requestedPath: to.fullPath,
          requiredPermissions: requiredPermissions,
        },
      };
    }
  });
}

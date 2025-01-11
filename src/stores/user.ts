// Utilities
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: '',
      email: '',
      name: '',
      role: '',
    },
    isAuthenticated: false,
    permissions: ['ViewCustomers'],
  }),

  actions: {
    login(username: string) {
      // Mock user data
      this.user = {
        id: '1',
        email: username,
        name: username,
        role: 'user'
      }
      this.isAuthenticated = true
    },

    logout() {
      this.user = {
        id: '',
        email: '',
        name: '',
        role: '',
      }
      this.isAuthenticated = false
    }
  },
  getters: {
    // Checks if the user has the necessary permissions
    checkUserPermissions() {
      return (neededPermissions, checkType = 'all') => {
        let hasPermissions = false;

        if (typeof neededPermissions === 'string') {
          hasPermissions = this.permissions.includes(neededPermissions);
        } else if (Array.isArray(neededPermissions)) {
          if (checkType === 'all') {
            hasPermissions = neededPermissions.every((permission) => this.permissions.includes(permission));
          } else if (checkType === 'any') {
            hasPermissions = neededPermissions.some((permission) => this.permissions.includes(permission));
          }
        }

        return hasPermissions;
      };
    },
  },

})
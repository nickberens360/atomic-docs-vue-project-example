// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: {
      isDark: false,
    },
    snackbar: {
      isShown: false,
      message: '',
      color: '',
      timeout: 3000,
      location: '',
    },
    isAppRailOpen: true,
    isAppNavDrawerOpen: true,
  }),
  actions: {
    setSnackbar({
        isShown = true,
        message = '',
        color = 'success',
        timeout = 3000,
        location = 'end top'
      }) {
      this.snackbar.isShown = isShown;
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.timeout = timeout;
      this.snackbar.location = location;
    }
  }
})
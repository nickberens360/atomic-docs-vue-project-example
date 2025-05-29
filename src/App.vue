<template>
  <VApp>
    <VSnackbar
      v-model="appStore.snackbar.isShown"
      :timeout="appStore.snackbar.timeout"
      :location="appStore.snackbar.location"
      transition="slide-x-reverse-transition"
      color="surface"
    >
      <span
        :class="'text-' + appStore.snackbar.color"
        class="text-body-4"
      >
        {{ appStore.snackbar.message }}
      </span>
      <template #actions>
        <VBtn
          prepend-icon="mdi-close-circle"
          :color="appStore.snackbar.color"
          variant="flat"
          rounded
          size="24"
          class="ma-0"
          :absolute="false"
          @click="dismissSnackbar"
        />
      </template>
    </VSnackbar>
    <RouterView />
  </VApp>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app' // adjust the path as needed


const appStore = useAppStore()

const dismissSnackbar = () => {
  appStore.setSnackbar({
    isShown: false,
    message: '',
  })
}
</script>
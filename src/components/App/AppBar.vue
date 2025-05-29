<template>
  <v-app-bar
    elevation="0"
    class="app-bar"
    color="background"
  >
    <template #title>
      <v-toolbar-title>
        <v-app-bar-nav-icon
          variant="text"
          class="ml-1"
          @click="appStore.isAppRailOpen = !appStore.isAppRailOpen"
        />
        Welcome
      </v-toolbar-title>
    </template>
    <template #append>
      <v-btn
        variant="text"
        class="mr-4"
        href="http://localhost:5173/"
        target="_blank"
      >
        DOCS
      </v-btn>
      <v-switch
        v-model="appStore.theme.isDark"
        inset
        hide-details
        class="mr-4"
        @update:model-value="toggleTheme"
      >
        <template #prepend>
          <v-icon>
            {{ appStore.theme.isDark ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny' }}
          </v-icon>
        </template>
      </v-switch>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { watch } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const theme = useTheme()

// Function to toggle the theme
function toggleTheme(value: boolean) {
  // Sync isDark state in the Pinia store and Vuetify theme
  appStore.theme.isDark = value
  theme.global.name.value = value ? 'darkBlueGreyTheme' : 'blueGreyTheme'
}

// Watch for Vuetify theme changes to keep the store synchronized
watch(
  () => theme.global.current.value.dark,
  (newValue) => {
    appStore.theme.isDark = newValue
  }
)
</script>

<style scoped lang="scss">
//.app-bar {
//  background-color: transparent !important;
//}
:deep(.v-toolbar-title) {
  margin-inline-start: 0 !important;
}
</style>

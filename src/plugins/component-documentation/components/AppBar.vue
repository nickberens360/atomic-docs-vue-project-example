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
          @click="toggleDrawer"
        />
        Welcome {{ userStore.user.name || 'User' }}
      </v-toolbar-title>
    </template>
    <template #append>
      <div
        v-if="$route.name !== 'componentDocs'"
        class="mr-4"
      >
        <VTextField
          v-model="filterText"
          name="filter-list"
          placeholder="Search Components"
          variant="solo"
          prepend-inner-icon="mdi-magnify"
          hide-details
          autocomplete="one-time-code"
          width="300"
          density="compact"
        >
          <template #append-inner>
            <VIcon
              v-if="filterText"
              icon="fal fa-times"
              size="18"
              @click="filterText = ''"
            />
          </template>
        </VTextField>
        <v-menu
          :model-value="$route.name === 'componentDocs'"
          activator="parent"
          open-on-hover
          open-on-focus
        >
          <ComponentNavigation
            :filter-text="filterText"
            :on-nav-click="handleNavClick"
            bg-color="surface"
          />
        </v-menu>
      </div>
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
import {ref, watch} from 'vue'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import {useRouter} from "vue-router";
import ComponentNavigation from "./ComponentNavigation.vue";

const router = useRouter();
const filterText = ref('');

interface NavigationItem {
  exampleComponent: string;
  relativePath: string;
}

function handleNavClick(arg: NavigationItem) {
  router.push({
    name: 'componentDoc',
    params: { componentName: arg.exampleComponent },
    query: { relativePath: arg.relativePath }
  });
}

const userStore = useUserStore()
const appStore = useAppStore()
const theme = useTheme()

// Function to toggle the drawer and rail
function toggleDrawer() {
  appStore.isAppRailOpen = !appStore.isAppRailOpen
  appStore.isAppNavDrawerOpen = !appStore.isAppNavDrawerOpen
}

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

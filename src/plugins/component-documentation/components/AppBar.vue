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
        Welcome
      </v-toolbar-title>
    </template>
    <template #append>
      <div
        v-if="!isComponentDocsRoute"
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
              icon="mdi-close"
              size="18"
              @click="filterText = ''"
            />
          </template>
        </VTextField>
        <v-menu
          :model-value="isComponentDocsRoute"
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
import {ref, watch, computed} from 'vue'
import { useAppStore } from '@/stores/app'
import {useRouter, useRoute} from "vue-router";
import ComponentNavigation from "./ComponentNavigation.vue";

// Import the ComponentItem interface from the types used in ComponentNavigation
interface ComponentItem {
  type: 'component';
  label: string;
  relativePath: string;
  exampleComponent: string;
}

const router = useRouter();
const route = useRoute();
const filterText = ref('');

// Computed property to check if the current route is 'componentDocs'
const isComponentDocsRoute = computed(() => {
  return (route.name as any) === 'componentDocs';
});

function handleNavClick(arg: ComponentItem): void {
  router.push({
    name: 'componentDoc' as any,
    params: { componentName: arg.exampleComponent },
    query: { relativePath: arg.relativePath }
  });
}

const appStore = useAppStore()
const theme = useTheme()

// Function to toggle the drawer and rail
function toggleDrawer() {
  appStore.isAppRailOpen = !appStore.isAppRailOpen
  appStore.isAppNavDrawerOpen = !appStore.isAppNavDrawerOpen
}

// Function to toggle the theme
function toggleTheme(value: boolean | null) {
  // If value is null, default to false or keep the current value
  const isDark = value !== null ? value : false;

  // Sync isDark state in the Pinia store and Vuetify theme
  appStore.theme.isDark = isDark
  theme.global.name.value = isDark ? 'darkBlueGreyTheme' : 'blueGreyTheme'
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

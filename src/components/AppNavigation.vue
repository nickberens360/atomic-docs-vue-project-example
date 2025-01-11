<template>
  <VNavigationDrawer
    v-model="appStore.isAppNavDrawerOpen"
    :rail="appStore.isAppRailOpen"
    app
    floating
    clipped
    expand-on-hover
    class="bg-background"
  >
    <v-card
      elevation="0"
      :rounded="false"
      color="background"
    >
      <v-list
        density="compact"
        nav
        bg-color="background"
      >
        <v-list-item
          prepend-icon="mdi-package-variant-closed"
          title="Component Docs"
          value="componentDocs"
          :to="{ name: 'componentDocs' }"
        />
      </v-list>
    </v-card>
    <template #append>
      <VList bg-color="background">
        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          :to="{ name: 'login' }"
        />
      </VList>
    </template>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
const appStore = useAppStore();
</script>

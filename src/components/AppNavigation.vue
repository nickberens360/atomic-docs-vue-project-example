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
      <!--      <v-list
        nav
        class="py-1 app-navigation__header"
        color="red"
        bg-color="background"
      >
        <v-list-item
          prepend-avatar="@/assets/fractured-labs-logo.png"
          title="Fractured Labs"
          nav
          @click.stop="rail = !rail"
        >
          <template #append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              color="black"
              @click.stop="rail = !rail"
            />
          </template>
        </v-list-item>
      </v-list>-->

      <v-list
        density="compact"
        nav
        bg-color="background"
      >
        <!--        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          value="home"
          :to="{ name: 'dashboard' }"
        />
        <v-list-group
          prepend-icon="mdi-account"
          title="Customers"
          value="customers"
        >
          <template #activator="{props}">
            <v-list-item
              title="Customers"
              value="account"
              v-bind="props"
              :to="{ name: 'customerIndex' }"
            />
          </template>
          <v-list-item
            title="Customer Details"
          />
          <v-list-item
            title="Customer Analytics"
          />
          <v-list-item
            title="Customer Support"
          />
        </v-list-group>-->
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
import { useUserStore } from "@/stores/user";
import { useAppStore } from "@/stores/app";
const userStore = useUserStore();
const appStore = useAppStore();
const drawer = ref(true);
const rail = ref(true);
</script>

<style scoped lang="scss">
//.app-navigation__header {
//  background-color: #fff !important;
//  color: #000 !important;
//}
</style>

<template>
  <AppBar />
  <AppNavigationDrawer />
  <VMain>
    <v-container fluid>
      <VRow
        class="h-100"
        :justify="isComponentDocsRoute ? 'center' : 'end'"
      >
        <VCol
          cols="12"
          md="5"
          sm="6"
          class="px-6"
        >
          <div>
            <div v-if="isComponentDocsRoute">
              <p
                class="text-uppercase font-weight-bold text-center"
                style="line-height: .80; letter-spacing: -4px;"
              >
                <span style="font-size: 10vw;">Atomic</span>
                <span
                  class="d-block"
                  style="font-size: 17vw; letter-spacing: -9px;"
                >Docs</span>
              </p>
              <div
                style="height: 4px;"
                class="bg-primary my-4"
              />
            </div>
            <VTextField
              v-if="isComponentDocsRoute"
              v-model="filterText"
              name="filter-list"
              placeholder="Search Components"
              variant="solo"
              prepend-inner-icon="mdi-magnify"
              hide-details
              autocomplete="one-time-code"
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
              />
            </v-menu>
          </div>
        </VCol>
        <VCol cols="12">
          <div class="content">
            <Suspense>
              <RouterView :key="$route.path" />
              <template #fallback>
                Loading...
              </template>
            </Suspense>
          </div>
        </VCol>
      </VRow>
    </v-container>
  </VMain>
</template>

<script setup lang="ts">

import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AppBar from '../components/AppBar.vue';
import AppNavigationDrawer from '../components/AppNavigationDrawer.vue';
import ComponentNavigation from '../components/ComponentNavigation.vue';

// Import the ComponentItem interface from the types used in ComponentNavigation
interface ComponentItem {
  type: 'component';
  label: string;
  relativePath: string;
  exampleComponent: string;
}

const router = useRouter();
const route = useRoute();
const filterText = ref<string>('');

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
</script>

<style scoped lang="scss">
@keyframes bounce-right {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}

.bounce-right {
  display: inline-block;
  animation: bounce-right 1s ease-in-out infinite;
}
</style>

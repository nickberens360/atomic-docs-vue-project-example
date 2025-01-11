<template>
  <AppBar />
  <AppNavigationDrawer />
  <VMain>
    <v-container fluid>
      <VRow
        class="h-100"
        :justify="$route.name === 'componentDocs' ? 'center' : 'end'"
      >
        <VCol
          cols="12"
          md="5"
          sm="6"
          class="px-6"
        >
          <div>
            <div v-if="$route.name === 'componentDocs'">
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
              v-if="$route.name === 'componentDocs'"
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

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppBar from '../components/AppBar.vue';
import AppNavigationDrawer from '../components/AppNavigationDrawer.vue';
import ComponentNavigation from '../components/ComponentNavigation.vue';

const router = useRouter();
const filterText = ref('');

function handleNavClick(arg) {
  router.push({
    name: 'componentDoc',
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
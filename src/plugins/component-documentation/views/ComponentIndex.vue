<template>
  <DefaultLayout>
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
            <div
              v-if="$route.name === 'componentDocs'"
            >
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
              <v-list>
                <template
                  v-for="(item, key) in filteredDirectoryStructure"
                  :key="key"
                >
                  <!-- If item is a component -->
                  <v-list-item
                    v-if="item.type === 'component'"
                    prepend-icon="mdi-file-document"
                    link
                    @click="handleNavClick(item)"
                  >
                    <v-list-item-title>{{ item.label }}</v-list-item-title>
                  </v-list-item>

                  <!-- If item is a directory -->
                  <v-list-item
                    v-else-if="item.type === 'directory'"
                    prepend-icon="mdi-folder"
                    link
                  >
                    <v-list-item-title>{{ item.label }}</v-list-item-title>
                    <template #append>
                      <v-icon
                        icon="mdi-menu-right"
                        size="x-small"
                      />
                    </template>

                    <!-- Recursive Menu for Directories -->
                    <v-menu
                      activator="parent"
                      open-on-hover
                      submenu
                    >
                      <v-list>
                        <template
                          v-for="(child, childKey) in item.children"
                          :key="childKey"
                        >
                          <!-- If child is a component -->
                          <v-list-item
                            v-if="child.type === 'component'"
                            link
                            @click="handleNavClick(child)"
                          >
                            <v-list-item-title>{{ child.label }}</v-list-item-title>
                          </v-list-item>

                          <!-- If child is a directory -->
                          <v-list-item
                            v-else-if="child.type === 'directory'"
                            link
                          >
                            <v-list-item-title>{{ child.label }}</v-list-item-title>
                            <template #append>
                              <v-icon
                                icon="mdi-menu-right"
                                size="x-small"
                              />
                            </template>

                            <!-- Further Recursive Submenu -->
                            <v-menu
                              activator="parent"
                              open-on-hover
                              submenu
                            >
                              <v-list>
                                <!-- Repeat same structure for deeper levels -->
                                <template
                                  v-for="(grandChild, grandChildKey) in child.children"
                                  :key="grandChildKey"
                                >
                                  <v-list-item
                                    v-if="grandChild.type === 'component'"
                                    link
                                    @click="handleNavClick(grandChild)"
                                  >
                                    <v-list-item-title>{{ grandChild.label }}</v-list-item-title>
                                  </v-list-item>
                                  <v-list-item
                                    v-else-if="grandChild.type === 'directory'"
                                    link
                                  >
                                    <v-list-item-title>{{ grandChild.label }}</v-list-item-title>
                                  </v-list-item>
                                </template>
                              </v-list>
                            </v-menu>
                          </v-list-item>
                        </template>
                      </v-list>
                    </v-menu>
                  </v-list-item>
                </template>
              </v-list>
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
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';

const componentDocPlugin = inject('componentDocPlugin');
const router = useRouter();
const filterText = ref('');
const directoryStructure = Object.keys(import.meta.glob('@/components/**/*.vue')).reduce((accumulator, filePath) => {
  const relativePath = filePath.split('components/').slice(1).join('');
  const exampleComponent = componentDocPlugin.convertPathToExampleName(relativePath);
  const pathSegments = relativePath.split('/');
  let lastRef = accumulator;
  pathSegments.forEach((pathSegment) => {
    if (pathSegment.endsWith('.vue')) {
      lastRef[pathSegment] = { type: 'component', label: pathSegment, relativePath, exampleComponent };
    } else if (!lastRef[pathSegment]) {
      lastRef[pathSegment] = { type: 'directory', label: pathSegment, relativePath, children: {} };
      lastRef = lastRef[pathSegment].children;
    } else {
      lastRef = lastRef[pathSegment].children;
    }
  });
  return accumulator;
}, {});

function filterNestedStructure(structure, filterText) {
  return Object.entries(structure).reduce((accumulator, [key, value]) => {
    if (value.type === 'directory' && Object.keys(value.children).length > 0) {
      const filteredChildren = filterNestedStructure(value.children, filterText);

      if (Object.keys(filteredChildren).length > 0) {
        accumulator[key] = { ...value, children: filteredChildren };
      }
    } else if (value.type === 'component' && value.label.toLowerCase().includes(filterText.toLowerCase())) {
      accumulator[key] = value;
    }

    return accumulator;
  }, {});
}

const filteredDirectoryStructure = computed(() => {
  return filterNestedStructure(directoryStructure, filterText.value);
});

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

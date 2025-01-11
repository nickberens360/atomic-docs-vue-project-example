<template>
  <v-list :bg-color="bgColor">
    <template
      v-for="(item, key) in finalStructure"
      :key="key"
    >
      <!-- If item is a component -->
      <v-list-item
        v-if="item.type === 'component'"
        prepend-icon="mdi-file-document"
        link
        color="primary"
        @click="handleNavClick(item)"
      >
        <v-list-item-title>{{ item.label }}</v-list-item-title>
      </v-list-item>

      <!-- If item is a directory -->
      <v-list-item
        v-else-if="item.type === 'directory'"
        prepend-icon="mdi-folder"
        link
        color="primary"
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
</template>

<script setup>
import { computed, inject } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  filterText: {
    type: String,
    required: false,
    default: ''
  },
  onNavClick: {
    type: Function,
    default: null,
    required: false
  },
  bgColor: {
    type: String,
    default: 'background',
    required: false
  }
});

const componentDocPlugin = inject('componentDocPlugin');
const router = useRouter();

const directoryStructure = computed(() => {
  return Object.keys(import.meta.glob('@/components/**/*.vue')).reduce((accumulator, filePath) => {
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
});

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

const finalStructure = computed(() => {
  return filterNestedStructure(directoryStructure.value, props.filterText);
});

function handleNavClick(arg) {
  if (props.onNavClick) {
    props.onNavClick(arg);
    return;
  }

  router.push({
    name: 'componentDoc',
    params: { componentName: arg.exampleComponent },
    query: { relativePath: arg.relativePath }
  });
}
</script>
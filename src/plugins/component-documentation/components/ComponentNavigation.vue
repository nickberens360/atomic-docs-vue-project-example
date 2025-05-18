<template>
  <v-list :bg-color="bgColor">
    <template
      v-for="(item, key) in finalStructure"
      :key="key"
    >
      <RecursiveNavItem
        :nav-items="item"
        @nav-click="handleNavClick"
      />
    </template>
  </v-list>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useRouter } from 'vue-router';
import RecursiveNavItem from './RecursiveNavItem.vue';
import { ComponentDocPlugin, ComponentNavItem, NavItem } from '@/plugins/component-documentation/utils/types';

interface Props {
  filterText?: string;
  onNavClick?: ((arg: ComponentNavItem) => void) | null;
  bgColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  filterText: '',
  onNavClick: null,
  bgColor: 'background'
});

const componentDocPlugin = inject('componentDocPlugin') as ComponentDocPlugin;
const router = useRouter();

const directoryStructure = computed<Record<string, NavItem>>(() => {
  return Object.keys(import.meta.glob('@/components/**/*.vue')).reduce<Record<string, NavItem>>((accumulator, filePath) => {
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

function filterNestedStructure(
  structure: Record<string, NavItem>,
  filterText: string
): Record<string, NavItem> {
  return Object.entries(structure).reduce<Record<string, NavItem>>((accumulator, [key, value]) => {
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

const finalStructure = computed<Record<string, NavItem>>(() => {
  return filterNestedStructure(directoryStructure.value, props.filterText);
});

function handleNavClick(arg: NavItem): void {
  // Only process component items for navigation
  if (arg.type !== 'component') return;

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

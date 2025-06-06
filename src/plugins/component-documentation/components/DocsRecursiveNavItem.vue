<template>
  <div v-if="navItems.type === 'directory'" class="docs-recursive-list-group">
    <div 
      class="docs-recursive-list-header" 
      @click="toggleExpanded($event)"
    >
      <span class="docs-icon docs-folder-icon">📁</span>
      <span class="docs-title">{{ navItems.label }}</span>
      <span class="docs-expand-icon">{{ expanded ? '▲' : '▼' }}</span>
    </div>
    <div v-if="expanded" class="docs-recursive-list-children">
      <template
        v-for="(child, i) in sortedChildren"
        :key="i"
      >
        <DocsRecursiveNavItem
          v-if="child.type === 'directory'"
          :nav-items="child"
          @nav-click="emit('nav-click', $event)"
        />

        <div
          v-else
          class="docs-recursive-list-item"
          @click="emit('nav-click', child)"
        >
          <span class="docs-icon docs-file-icon">📄</span>
          <span class="docs-title">{{ child.label }}</span>
        </div>
      </template>
    </div>
  </div>
  <div
    v-else
    class="docs-recursive-list-item"
    @click="emit('nav-click', navItems)"
  >
    <span class="docs-icon docs-file-icon">📄</span>
    <span class="docs-title">{{ navItems.label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import DocsRecursiveNavItem from './DocsRecursiveNavItem.vue';
import { ComponentNavItem, DirectoryNavItem, NavItem } from '../types';

// Define props
interface Props {
  navItems: NavItem;
}

const props = defineProps<Props>();

// Define emits
const emit = defineEmits<{
  (e: 'nav-click', item: NavItem): void;
}>();

// State
const expanded = ref(true);

// Methods
const toggleExpanded = (event: Event) => {
  event.stopPropagation();
  expanded.value = !expanded.value;
};

// Computed properties
const sortedChildren = computed<NavItem[]>(() => {
  if (props.navItems.type !== 'directory') return [];
  return Object.values(props.navItems.children || {}).sort((a) => a.type === 'directory' ? -1 : 1);
});
</script>

<style lang="scss" scoped>
.docs-recursive-list-group {
  margin-bottom: 4px;
}

.docs-recursive-list-header {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
}

.docs-recursive-list-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
}

.docs-recursive-list-children {
  padding-left: 16px;
}

.docs-icon {
  font-size: 16px;
  margin-right: 8px;
}

.docs-title {
  flex: 1;
}

.docs-expand-icon {
  font-size: 12px;
}
</style>

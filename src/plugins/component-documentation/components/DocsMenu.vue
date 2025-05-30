<template>
  <div 
    class="docs-menu-container"
    ref="menuContainer"
  >
    <div 
      class="docs-menu-activator"
      @mouseenter="openOnHover && (isOpen = true)"
      @focus="openOnFocus && (isOpen = true)"
      @click="activator === 'click' && (isOpen = !isOpen)"
      ref="activatorEl"
    >
      <slot name="activator"></slot>
    </div>
    
    <div 
      v-show="isMenuVisible"
      class="docs-menu-content"
      @mouseleave="openOnHover && (isOpen = false)"
      @blur="openOnFocus && (isOpen = false)"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

interface Props {
  modelValue?: boolean;
  activator?: 'parent' | 'click';
  openOnHover?: boolean;
  openOnFocus?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  activator: 'parent',
  openOnHover: false,
  openOnFocus: false
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(props.modelValue || false);
const menuContainer = ref<HTMLElement | null>(null);
const activatorEl = ref<HTMLElement | null>(null);

// Watch for changes to modelValue prop
watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    isOpen.value = newValue;
  }
});

// Watch for changes to isOpen and emit update:modelValue event
watch(isOpen, (newValue) => {
  emit('update:modelValue', newValue);
});

// Computed property to determine if menu should be visible
const isMenuVisible = computed(() => {
  return isOpen.value;
});

// Close menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (menuContainer.value && !menuContainer.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

// Add event listeners when component is mounted
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  
  // If activator is 'parent', find the parent element and use it as the activator
  if (props.activator === 'parent' && menuContainer.value) {
    const parentEl = menuContainer.value.parentElement;
    if (parentEl) {
      parentEl.addEventListener('mouseenter', () => props.openOnHover && (isOpen.value = true));
      parentEl.addEventListener('focus', () => props.openOnFocus && (isOpen.value = true));
      parentEl.addEventListener('click', () => isOpen.value = !isOpen.value);
    }
  }
});

// Remove event listeners when component is unmounted
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  
  // Remove event listeners from parent element
  if (props.activator === 'parent' && menuContainer.value) {
    const parentEl = menuContainer.value.parentElement;
    if (parentEl) {
      parentEl.removeEventListener('mouseenter', () => props.openOnHover && (isOpen.value = true));
      parentEl.removeEventListener('focus', () => props.openOnFocus && (isOpen.value = true));
      parentEl.removeEventListener('click', () => isOpen.value = !isOpen.value);
    }
  }
});
</script>

<style scoped lang="scss">
.docs-menu-container {
  position: relative;
  display: inline-block;
}

.docs-menu-activator {
  cursor: pointer;
}

.docs-menu-content {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 4px;
  overflow: hidden;
}
</style>
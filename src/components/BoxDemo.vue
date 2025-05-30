<template>
  <div
    :style="boxStyle"
    class="custom-box"
    @click="handleClick"
  >
    {{ title }}
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Define props with default values
const props = withDefaults(defineProps<{
  title?: string;
  height: string;
  width: string;
  bgColor: string;
  borderRadius?: string;
}>(), {
  title: 'Box',
  height: '150px',
  width: '150px',
  bgColor: '#ff0000',
  borderRadius: '8px',
});

// Define the emit event
const emit = defineEmits<{
  (e: 'box-clicked'): void;
}>();

// Handle the click event
const handleClick = () => {
  emit('box-clicked');
};

// Computed style for the box
const boxStyle = computed(() => ({
  width: props.width,
  height: props.height,
  backgroundColor: props.bgColor,
  borderRadius: props.borderRadius,
}));
</script>

<style scoped>
.custom-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

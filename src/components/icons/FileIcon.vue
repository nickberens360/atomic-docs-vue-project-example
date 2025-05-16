<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    :fill="color"
    :class="customClass"
  >
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M8,13.91C8,13.36 8.27,12.97 8.82,12.74L10.41,12.13L11.99,11.53C12.29,11.39 12.44,11.14 12.44,10.79C12.44,10.31 12.08,10.07 11.36,10.07C10.8,10.07 10.34,10.28 9.97,10.7L8.83,9.82C9.45,9.11 10.31,8.75 11.4,8.75C12.16,8.75 12.79,8.95 13.27,9.34C13.76,9.74 14,10.28 14,10.97C14,11.83 13.58,12.45 12.72,12.84L11.33,13.39L9.94,13.95C9.7,14.05 9.5,14.19 9.32,14.38H14V15.69H8V13.91Z" />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: [Number, String],
    default: 24
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  customClass: {
    type: String,
    default: ''
  }
});
</script>
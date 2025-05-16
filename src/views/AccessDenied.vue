<template>
  <DefaultLayout>
    <div class="text-center">
      <p class="text-h1">
        403
      </p>
      <h1>🚫 Access Denied</h1>
      <p class="mb-6">
        You do not have the necessary permissions to view this page.
      </p>
      <h3>Requested Path:</h3>
      <p class="mb-6">
        <span class="bg-surface-light px-4 d-inline-block">{{ requestedPath }}</span>
      </p>
      <h3>Missing Permissions:</h3>
      <p
        v-for="permission in permissions"
        :key="permission"
      >
        {{ permission }}
      </p>
    </div>
  </DefaultLayout>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

interface Props {
  requiredPermissions?: string[] | string;
  requestedPath?: string;
}

const props = withDefaults(defineProps<Props>(), {
  requiredPermissions: () => [],
  requestedPath: ''
});

const permissions = computed<string[]>(() => {
  return Array.isArray(props.requiredPermissions) ? props.requiredPermissions : [props.requiredPermissions];
});
</script>

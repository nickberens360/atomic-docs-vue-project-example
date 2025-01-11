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
<script>

import DefaultLayout from '@/layouts/DefaultLayout.vue';

export default {
  components: { DefaultLayout },
  props: {
    requiredPermissions: {
      type: [Array, String],
      default: () => []
    },
    requestedPath: {
      type: String,
      default: ''
    }
  },
  computed: {
    permissions() {
      return Array.isArray(this.requiredPermissions) ? this.requiredPermissions : [this.requiredPermissions];
    }
  }
};
</script>

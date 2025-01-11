<template>
  <VListGroup
    v-if="navItems.type === 'directory'"
    :value="navItems.label"
    collapse-icon="$solidChevronUp"
    expand-icon="$chevronDown"
    bg-color="transparent"
  >
    <template #activator="{ props }">
      <VListItem
        v-bind="props"
        :title="navItems.label"
        bg-color="transparent"
      />
    </template>
    <template
      v-for="(child, i) in sortedChildren"
      :key="i"
    >
      <RecursiveNavItem
        v-if="child.type === 'directory'"
        :nav-items="child"
        @nav-click="$emit('nav-click', $event)"
      />

      <VListItem
        v-else
        :title="child.label"
        :value="child.label"
        bg-color="transparent"
        @click="$emit('nav-click', child)"
      />
    </template>
  </VListGroup>
  <VListItem
    v-else
    :title="navItems.label"
    :value="navItems.label"
    @click="$emit('nav-click', navItems)"
  />
</template>
<script>
export default {
  name: 'RecursiveNavItem',
  props: {
    navItems: {
      type: [Array, Object],
      required: true,
      default: () => []
    },
  },
  emits: ['nav-click'],
  computed: {
    sortedChildren() {
      return Object.values(this.navItems.children || {}).sort((a) => a.type === 'directory' ? -1 : 1);
    },
  }
};
</script>
<style lang="scss" scoped>
:deep(.v-icon){
  font-size: 16px;
}
</style>

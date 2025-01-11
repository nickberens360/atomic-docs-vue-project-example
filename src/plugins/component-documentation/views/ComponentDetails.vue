<template>
  <VContainer
    class="component-details"
  >
    <div class="d-flex align-center mb-4">
      <h2 class="mr-2">
        {{ componentName }}
      </h2>
      <VChip
        v-if="props.relativePath"
        size="small"
      >
        {{ props.relativePath }}
      </VChip>
    </div>
    <Suspense>
      <Component :is="currentComponent" />

      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </VContainer>
</template>

<script setup>
import { computed, inject } from 'vue';
import ComponentNotDocumented from '../components/ComponentNotDocumented';
const componentDocPlugin = inject('componentDocPlugin');
const exampleComponents = {};
const importComponentPromises = Object.entries(componentDocPlugin.exampleModules)
  .map(async ([path, moduleImport]) => {
    const relativePath = path.split('component-examples/').slice(1).join('');
    const componentName = componentDocPlugin.convertPathToExampleName(relativePath);
    if (exampleComponents[componentName]) {
      throw new Error(`Component already registered with name: ${componentName}`);
    } else {
      exampleComponents[componentName] = await moduleImport();
    }
    return exampleComponents[componentName];
  });
await Promise.all(importComponentPromises);

const props = defineProps({
  relativePath: {
    type: String,
    required: true
  },
  componentName: {
    type: String,
    required: true
  },
});

const componentName = computed(() => props.relativePath.split('/').pop().replace('.vue', ''));

const currentComponent = computed(() => {
  if (exampleComponents[props.componentName]) {
    return exampleComponents[props.componentName].default;
  } else {
    return ComponentNotDocumented;
  }
});
</script>

<style lang="scss" scoped>
:deep(.example-component code) {
  background-color: #e3e3e3;
  color: red;
  font-size: 0.8em;
  padding: 2px;
  border-radius: 1px;
}
:deep(.example-component mark) {
  background-color: transparent;
  color: #9E9E9E;
}
</style>

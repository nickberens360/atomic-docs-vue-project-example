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

<script setup lang="ts">
import { computed, inject } from 'vue';
import ComponentNotDocumented from '../components/ComponentNotDocumented.vue';

// Define a custom type for component definitions
type ComponentType = any;

// Define the interface for the component documentation plugin
interface ComponentDocPlugin {
  convertPathToExampleName: (path: string) => string;
  componentModules: Record<string, () => Promise<any>>;
  exampleModules: Record<string, () => Promise<any>>;
}

// Define the interface for the example components
interface ExampleComponent {
  default: ComponentType;
}

// Define the interface for the props
interface Props {
  relativePath: string;
  componentName: string;
}

const componentDocPlugin = inject('componentDocPlugin') as ComponentDocPlugin;
const exampleComponents: Record<string, ExampleComponent> = {};
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

const props = defineProps<Props>();

const componentName = computed<string>(() => props.relativePath.split('/').pop()?.replace('.vue', '') || '');

const currentComponent = computed<ComponentType>(() => {
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

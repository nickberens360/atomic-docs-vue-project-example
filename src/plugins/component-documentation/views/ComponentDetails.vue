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

import { Component as ComponentType, ComponentDocPlugin, VueComponent } from '@/plugins/component-documentation/utils/types';

// Define a type for Vue component constructors
// Using more specific types for constructor arguments
type ComponentConstructorArgs = Record<string, unknown>;
type ComponentConstructor = new (props: ComponentConstructorArgs, context?: unknown) => ComponentType;

// Define the interface for the props
interface Props {
  relativePath: string;
  componentName: string;
}

const componentDocPlugin = inject('componentDocPlugin') as ComponentDocPlugin;
const exampleComponents: Record<string, VueComponent> = {};
const importComponentPromises = Object.entries(componentDocPlugin.exampleModules)
  .map(async ([path, moduleImport]) => {
    const relativePath = path.split('component-examples/').slice(1).join('');
    const componentName = componentDocPlugin.convertPathToExampleName(relativePath);
    if (exampleComponents[componentName]) {
      throw new Error(`Component already registered with name: ${componentName}`);
    } else {
      exampleComponents[componentName] = await moduleImport() as VueComponent;
    }
    return exampleComponents[componentName];
  });
await Promise.all(importComponentPromises);

const props = defineProps<Props>();

const componentName = computed<string>(() => props.relativePath.split('/').pop()?.replace('.vue', '') || '');

// Type guard to check if a component is a valid ComponentConstructor
function isComponentConstructor(component: unknown): component is ComponentConstructor {
  return typeof component === 'function';
}

// Type guard to check if a component is a valid Vue component object
function isVueComponentObject(component: unknown): boolean {
  return typeof component === 'object' && component !== null &&
    // Check for render function (Vue 3 object components)
    ('render' in component ||
     // Check for setup function (Vue 3 script setup components)
     'setup' in component ||
     // Check for template (Vue SFC with template)
     'template' in component);
}

// Debug function to log component structure
function debugComponent(component: unknown, name: string): void {
  console.log(`Component ${name} structure:`, {
    type: typeof component,
    isNull: component === null,
    keys: component && typeof component === 'object' ? Object.keys(component) : [],
    hasRender: component && typeof component === 'object' && 'render' in component,
    hasSetup: component && typeof component === 'object' && 'setup' in component,
    hasTemplate: component && typeof component === 'object' && 'template' in component
  });
}

const currentComponent = computed<ComponentConstructor | typeof ComponentNotDocumented>(() => {
  if (exampleComponents[props.componentName]) {
    const component = exampleComponents[props.componentName].default;

    // Debug the component structure to help diagnose issues
    debugComponent(component, props.componentName);

    // Use the type guard to safely cast the component
    if (isComponentConstructor(component)) {
      console.log(`Component ${props.componentName} is a valid constructor function`);
      return component;
    }

    // Check if it's a Vue component object
    if (isVueComponentObject(component)) {
      console.log(`Component ${props.componentName} is a valid Vue component object`);
      // For Vue component objects, we can return them directly as they're compatible with the Component interface
      return component as unknown as ComponentConstructor;
    }

    // If the component doesn't match our expected types, log a warning and return the fallback
    console.warn(`Component ${props.componentName} is not a valid component constructor or object`);
  } else {
    console.warn(`No example component found with name: ${props.componentName}`);
  }
  return ComponentNotDocumented;
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

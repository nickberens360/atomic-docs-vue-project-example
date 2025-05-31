import { App } from 'vue';
import ExampleComponent from './components/DocsExampleComponent.vue';

export default {
  install(app: App) {
    const componentModules = import.meta.glob('@/components/**/*.vue');
    const exampleModules = import.meta.glob('@/component-examples/**/*.vue');
    const enableDocs = import.meta.env.VITE_ENABLE_COMPONENT_DOCS === 'true';

    if (enableDocs) {
      app.provide('componentDocPlugin', {
        convertPathToExampleName,
        componentModules,
        exampleModules
      });
      app.component('ExampleComponentUsage', ExampleComponent);
    }
  }
};

function convertPathToExampleName(path: string): string {
  return 'Example' + path.replace(/ /g, '-')
    .replace(/\.vue/g, '')
    .split('/')
    .map((part) => {
      return part.split('-')
        .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join('')
        .trim();
    }).join('')
    .trim();
}

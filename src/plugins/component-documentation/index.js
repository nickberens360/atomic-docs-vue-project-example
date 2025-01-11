import ExampleComponent from './components/ExampleComponent.vue';

export default {
  install(app) {
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

function convertPathToExampleName(path) {
  return 'Example' + path.replaceAll(' ', '-')
    .replaceAll('.vue', '')
    .split('/')
    .map((part) => {
      return part.split('-')
        .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join('')
        .trim();
    }).join('')
    .trim();
}

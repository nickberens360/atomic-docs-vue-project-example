import { App, Plugin, Component } from 'vue';
import ExampleComponent from './components/DocsExampleComponent.vue';
import { ComponentDocPlugin, ComponentDocOptions } from './types';

const componentDocs: Plugin<[ComponentDocOptions]> = {
  install(app: App, options: ComponentDocOptions = {}) {
    const componentModules = options?.componentModules || import.meta.glob('@/components/**/*.vue');
    const exampleModules = options?.exampleModules || import.meta.glob('@/component-examples/**/*.vue');
    const enableDocs = import.meta.env.VITE_ENABLE_COMPONENT_DOCS === 'true';

    const componentPath = Object.keys(componentModules)[0]?.split('/').slice(1, -1).join('/');
    console.log('componentPath', componentPath);
    const componentsDirName =componentPath.split('/')[1] || 'components';
    const examplePath = Object.keys(exampleModules)[0]?.split('/').slice(1, -1).join('/');
    const examplesDirName = examplePath.split('/')[1] || 'component-examples';

    if (enableDocs) {
      const plugin: ComponentDocPlugin = {
        convertPathToExampleName,
        componentModules,
        componentsDirName,
        examplesDirName,
        exampleModules,
        options
      };
      app.provide('componentDocPlugin', plugin);
      app.component('ExampleComponentUsage', ExampleComponent as unknown as Component);
    }
  }
};

export default componentDocs;

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

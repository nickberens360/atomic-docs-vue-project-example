module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'brace-style': ['error', '1tbs'],
    curly: 'error',
    indent: ['error', 2, { 'SwitchCase': 1 }],
    'no-trailing-spaces': 'error',
    quotes: ['error', 'single'],
    semi: ['error'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
  },
  ignorePatterns: ['dist/**', 'node_modules/**']
};

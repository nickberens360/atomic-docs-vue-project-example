export default [
  {
    path: '/component-docs',
    name: 'componentDocs',
    component: () => import('./views/ComponentIndex'),
    children: [
      {
        path: ':componentName',
        name: 'componentDoc',
        component:  () => import('./views/ComponentDetails'),
        props: route => ({
          relativePath: route.query.relativePath,
          componentName: route.params.componentName
        })
      }
    ]
  }
];

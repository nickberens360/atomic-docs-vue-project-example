import { RouteRecordRaw } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/component-docs',
    name: 'componentDocs',
    component: () => import('./views/ComponentIndex.vue'),
    children: [
      {
        path: ':componentName',
        name: 'componentDoc',
        component: () => import('./views/ComponentDetails.vue'),
        props: (route: RouteLocationNormalized) => ({
          relativePath: route.query.relativePath as string | undefined,
          componentName: route.params.componentName as string
        })
      }
    ]
  }
];

export default routes;

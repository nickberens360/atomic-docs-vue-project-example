import { RouteRecordRaw } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';

// Define interface for route parameters
interface ComponentDocRouteParams {
  componentName: string;
}

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
          componentName: (route.params as ComponentDocRouteParams).componentName
        })
      }
    ]
  }
];

export default routes;

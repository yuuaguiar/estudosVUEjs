import type { RouteRecordRaw } from 'vue-router'

export const catalogRoutes: RouteRecordRaw[] = [
  {
    path: 'catalogo',
    name: 'catalogo',
    component: () => import('@/modules/catalog/pages/IndexPage.vue'),
  },
]

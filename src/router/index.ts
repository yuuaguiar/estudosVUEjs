import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import { catalogRoutes } from '@/modules/catalog/routes/catalog.routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          redirect: { name: 'catalogo' },
        },
        ...catalogRoutes,
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'catalogo' },
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import { catalogRoutes } from '@/modules/catalog/routes/catalog.routes'
import TelaEmBranco from '@/views/TelaEmBranco.vue'

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
        {
          path: 'dashboard',
          name: 'dashboard',
          component: TelaEmBranco,
        },
        {
          path: 'agenda',
          name: 'agenda',
          component: TelaEmBranco,
        },
        {
          path: 'clientes',
          name: 'clientes',
          component: TelaEmBranco,
        },
        {
          path: 'atendentes',
          name: 'atendentes',
          component: TelaEmBranco,
        },
        ...catalogRoutes,
        {
          path: 'comissoes',
          name: 'comissoes',
          component: TelaEmBranco,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'catalogo' },
    },
  ],
})

export default router

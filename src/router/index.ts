import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import { catalogRoutes } from '@/modules/catalog/routes/catalog.routes'
import EmConstrucaoPage from '@/modules/main/pages/EmConstrucaoPage.vue'

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
          component: EmConstrucaoPage,
        },
        {
          path: 'agenda',
          name: 'agenda',
          component: EmConstrucaoPage,
        },
        {
          path: 'clientes',
          name: 'clientes',
          component: EmConstrucaoPage,
        },
        {
          path: 'atendentes',
          name: 'atendentes',
          component: EmConstrucaoPage,
        },
        ...catalogRoutes,
        {
          path: 'comissoes',
          name: 'comissoes',
          component: EmConstrucaoPage,
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

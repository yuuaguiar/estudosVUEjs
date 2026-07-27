import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: 'agenda',
          name: 'agenda',
          component: () => import('@/views/AgendaView.vue'),
        },
        {
          path: 'clientes',
          name: 'clientes',
          component: () => import('@/views/ClientsView.vue'),
        },
        {
          path: 'atendentes',
          name: 'atendentes',
          component: () => import('@/views/SectionView.vue'),
          props: {
            title: 'Atendentes',
            description: 'Gerencie a equipe e os horários de trabalho.',
          },
        },
        {
          path: 'catalogo',
          name: 'catalogo',
          component: () => import('@/views/SectionView.vue'),
          props: { title: 'Catálogo', description: 'Organize serviços, produtos e categorias.' },
        },
        {
          path: 'comissoes',
          name: 'comissoes',
          component: () => import('@/views/SectionView.vue'),
          props: { title: 'Comissões', description: 'Acompanhe valores e regras de comissão.' },
        },
      ],
    },
  ],
})

export default router

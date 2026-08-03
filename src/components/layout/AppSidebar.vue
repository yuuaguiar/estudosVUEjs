<script setup lang="ts">
defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()

import logoSgAgenda from '@/assets/sg-agenda-logo.svg'

const items = [
  { label: 'Dashboard', icon: 'pi pi-th-large', to: '/dashboard' },
  { label: 'Agenda', icon: 'pi pi-calendar', to: '/agenda' },
  { label: 'Clientes', icon: 'pi pi-users', to: '/clientes' },
  { label: 'Atendentes', icon: 'pi pi-user-plus', to: '/atendentes' },
  { label: 'Catálogo', icon: 'pi pi-box', to: '/catalogo' },
  { label: 'Comissões', icon: 'pi pi-dollar', to: '/comissoes' },
]
</script>

<template>
  <aside class="sidebar" :class="{ 'sidebar--open': open }">
    <div class="brand">
      <img :src="logoSgAgenda" class="tw-h-auto tw-w-[190px]" alt="SG Agenda">
    </div>

    <nav class="sidebar-nav" aria-label="Navegação principal">
      <RouterLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="nav-item"
        @click="$emit('close')"
      >
        <i :class="item.icon" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="sidebar-help">
      <i class="pi pi-question-circle" />
      <div>
        <strong>Precisa de ajuda?</strong>
        <small>Consulte o guia do projeto</small>
      </div>
    </div>
  </aside>
</template>

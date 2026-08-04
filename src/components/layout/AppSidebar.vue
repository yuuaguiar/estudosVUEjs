<script setup lang="ts">
defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()

import logoSgAgenda from '@/assets/sg-agenda-logo.svg'

const items = [
  { label: 'Catálogo', icon: 'pi pi-box', to: '/catalogo' },
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
  </aside>
</template>

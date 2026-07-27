<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const menuOpen = ref(false)
</script>

<template>
  <div class="app-shell">
    <AppSidebar :open="menuOpen" @close="menuOpen = false" />

    <main class="app-main">
      <AppHeader @toggle-menu="menuOpen = !menuOpen" />
      <div class="page-content">
        <RouterView />
      </div>
    </main>

    <button
      v-if="menuOpen"
      class="sidebar-backdrop"
      aria-label="Fechar menu"
      @click="menuOpen = false"
    />
  </div>
</template>

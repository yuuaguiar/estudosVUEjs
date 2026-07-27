<script setup lang="ts">
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'

defineEmits<{ 'toggle-menu': [] }>()
</script>

<template>
  <header class="app-header">
    <Button
      class="mobile-menu-button"
      icon="pi pi-bars"
      severity="secondary"
      text
      rounded
      aria-label="Abrir menu"
      @click="$emit('toggle-menu')"
    />

    <div class="header-actions">
      <button class="share-button">
        <i class="pi pi-link" />
        Compartilhar
      </button>
      <Button icon="pi pi-bell" severity="secondary" outlined rounded aria-label="Notificações" />
      <span class="flag" aria-label="Português do Brasil">🇧🇷</span>
      <div class="profile">
        <Avatar label="JS" shape="circle" />
        <div>
          <strong>João Silva</strong>
          <small>Barbeiro</small>
        </div>
        <i class="pi pi-angle-down" />
      </div>
    </div>
  </header>
</template>

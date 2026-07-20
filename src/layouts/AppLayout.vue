<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
</script>

<template>
  <div class="min-h-screen bg-[#f0f2f6]">
    <AppHeader />
    <AppSidebar />

    <main class="min-h-screen pt-[42px] pl-[147px]">
      <div class="p-6">
        <slot />
      </div>
    </main>
  </div>
</template>
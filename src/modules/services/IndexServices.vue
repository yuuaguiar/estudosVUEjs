<script setup lang="ts">
import Button from 'primevue/button'

const pageTitle: string = 'Serviços'
</script>

<template>
  <section>
    <div class="page-heading">
      <div>
        <h1>{{ pageTitle }}</h1>
        <p>Cadastre e gerencia os serviços disponíveis para agendamento.</p>
      </div>

    <Button label="Cadastrar serviços" icon="pi pi-plus" />
    </div>

    <div class="services-card card">
      <h2>Lista de serviçoes</h2>
      <p>Os serviços cadastrados aparecerão aqui.</p>
    </div>
  </section>
</template>

<style scoped>
.services-card {
  padding: 18px;
}

.services-card h2 {
  margin: 0;
  font-size: 14px;
}

.services-card p {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 12px;
}
</style>

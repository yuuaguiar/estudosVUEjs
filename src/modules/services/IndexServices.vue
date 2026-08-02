<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'

interface Service {
  id: number;
  name: string;
  duration: number;
  price: number;
  active: boolean
}

const pageTitle: string = 'Serviços'

const services = ref<Service[]>([
  {
    id: 1,
    name: 'Corte de cabelo',
    duration: 45,
    price: 50,
    active: true,
  },
  {
    id: 2,
    name: 'Barba',
    duration: 30,
    price: 35,
    active: true,
  },
  {
    id: 3,
    name: 'Corte e barba',
    duration: 60,
    price: 75,
    active: false,
  },
])

function formatPrice(price: number): string{
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function toggleServiceStatus(serviceId: number): void {
  const service = services.value.find(
    (currentService) => currentService.id === serviceId,
  )

  if (service) {
    service.active = !service.active
  }
}
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

      <div class="services-list">
        <article
          v-for="service in services"
          :key="service.id"
          class="service-item">

          <div class="service-information">
            <strong>{{ service.name }}</strong>
            <span>{{ service.duration }} minutos</span>
          </div>

          <div class="service-details">
            <strong>{{ formatPrice(service.price) }}</strong>

            <span
              class="service-status"
              :class="{ 'service-status--inactive': !service.active}">

              {{ service.active ? 'Ativo' : 'Inativo' }}
            </span>
            <Button
              :label="service.active ? 'Desativar' : 'Ativar'"
              :severity="service.active ? 'danger' : 'success'"
              size="small"
              outlined
              @click="toggleServiceStatus(service.id)"
            />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-card {
  padding: 18px;
}

.services-card h2 {
  margin: 0 0 16px;
  font-size: 14px;
}

.services-list {
  display: grid;
  gap: 10px;
}

.service-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
}

.service-information > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.service-item span {
  color: var(--muted);
  font-size: 11px;
}

.service-details {
  display: flex;
  align-items: center;
  gap: 14px;
}

.service-status {
  min-width: 42px;
  color: var(--success) !important;
  font-weight: 600;
}

.service-status--inactive {
  color: var(--danger) !important;
}

@media (max-width: 640px) {
  .service-item {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }

  .service-details {
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
  }
}


</style>

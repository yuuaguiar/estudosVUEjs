<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'

const search = ref('')

const clients = [
  {
    id: 1,
    name: 'Cauã Silva',
    phone: '(11) 99812-2040',
    visits: 18,
    lastVisit: '02/06/2026',
    spent: 'R$ 1.480',
    status: 'Ativo',
  },
  {
    id: 2,
    name: 'Lucas Abrão',
    phone: '(11) 98842-1123',
    visits: 12,
    lastVisit: '30/05/2026',
    spent: 'R$ 920',
    status: 'Ativo',
  },
  {
    id: 3,
    name: 'Junior Costa',
    phone: '(11) 97721-0045',
    visits: 9,
    lastVisit: '27/05/2026',
    spent: 'R$ 715',
    status: 'Ativo',
  },
  {
    id: 4,
    name: 'Mateus Lima',
    phone: '(11) 96554-7781',
    visits: 4,
    lastVisit: '12/04/2026',
    spent: 'R$ 310',
    status: 'Inativo',
  },
  {
    id: 5,
    name: 'Ana Souza',
    phone: '(11) 95512-6608',
    visits: 7,
    lastVisit: '01/06/2026',
    spent: 'R$ 640',
    status: 'Ativo',
  },
]

const filteredClients = computed(() => {
  const term = search.value.trim().toLocaleLowerCase('pt-BR')
  if (!term) return clients
  return clients.filter((client) =>
    [client.name, client.phone, client.status].some((value) =>
      value.toLocaleLowerCase('pt-BR').includes(term),
    ),
  )
})
</script>

<template>
  <section>
    <div class="page-heading">
      <div>
        <h1>Clientes</h1>
        <p>Cadastre pessoas e acompanhe o histórico de atendimento.</p>
      </div>
      <Button label="Novo cliente" icon="pi pi-plus" />
    </div>

    <div class="clients-card card">
      <div class="table-toolbar">
        <span class="search-field">
          <i class="pi pi-search" />
          <InputText v-model="search" placeholder="Buscar por nome ou telefone" />
        </span>
        <div>
          <Button label="Filtros" icon="pi pi-filter" severity="secondary" outlined />
          <Button label="Exportar" icon="pi pi-download" severity="secondary" outlined />
        </div>
      </div>

      <DataTable :value="filteredClients" paginator :rows="5" responsive-layout="scroll">
        <Column field="name" header="Cliente">
          <template #body="{ data }">
            <div class="client-cell">
              <span>{{
                data.name
                  .split(' ')
                  .map((part: string) => part[0])
                  .join('')
                  .slice(0, 2)
              }}</span>
              <strong>{{ data.name }}</strong>
            </div>
          </template>
        </Column>
        <Column field="phone" header="Telefone" />
        <Column field="visits" header="Visitas" />
        <Column field="lastVisit" header="Última visita" />
        <Column field="spent" header="Total gasto" />
        <Column field="status" header="Status">
          <template #body="{ data }">
            <Tag
              :value="data.status"
              :severity="data.status === 'Ativo' ? 'success' : 'secondary'"
            />
          </template>
        </Column>
        <Column>
          <template #body>
            <Button icon="pi pi-ellipsis-v" severity="secondary" text rounded aria-label="Ações" />
          </template>
        </Column>
      </DataTable>
    </div>
  </section>
</template>

<style scoped>
.clients-card {
  overflow: hidden;
  padding: 18px;
}

.table-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.search-field {
  position: relative;
  display: flex;
  width: min(100%, 380px);
  align-items: center;
}

.search-field i {
  position: absolute;
  z-index: 1;
  left: 14px;
  color: #98a2b3;
}

.search-field .p-inputtext {
  width: 100%;
  padding-left: 40px;
}

.table-toolbar > div {
  display: flex;
  gap: 9px;
}

.client-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.client-cell > span {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 50%;
  color: white;
  background: linear-gradient(135deg, var(--navy), var(--blue));
  font-size: 9px;
}

.client-cell strong {
  font-size: 12px;
}

:deep(.p-datatable-header-cell) {
  color: #667085;
  background: #f8fafc;
  font-size: 10px;
}

:deep(.p-datatable-tbody > tr > td) {
  border-color: #eef2f6;
  font-size: 11px;
}

@media (max-width: 700px) {
  .table-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .table-toolbar > div {
    justify-content: flex-end;
  }
}
</style>

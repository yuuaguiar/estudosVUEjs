<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import Tag from 'primevue/tag'

const selectedDate = ref(new Date())
const selectedProfessional = ref('Todos')
const professionals = ['Todos', 'Marcos Guedes', 'Junior Ferreira', 'Luiz Magner']

const appointments = ref([
  {
    time: '08:00',
    client: 'Ana Souza',
    service: 'Corte feminino',
    professional: 'Marcos Guedes',
    status: 'Confirmado',
  },
  {
    time: '09:30',
    client: 'Cauã Silva',
    service: 'Corte masculino',
    professional: 'Marcos Guedes',
    status: 'Confirmado',
  },
  {
    time: '11:00',
    client: 'Lucas Abrão',
    service: 'Combo + sobrancelha',
    professional: 'Junior Ferreira',
    status: 'Pendente',
  },
  {
    time: '14:30',
    client: 'Junior Costa',
    service: 'Barba completa',
    professional: 'Luiz Magner',
    status: 'Confirmado',
  },
  {
    time: '16:00',
    client: 'Mateus Lima',
    service: 'Corte raspado',
    professional: 'Junior Ferreira',
    status: 'Cancelado',
  },
])

const visibleAppointments = computed(() =>
  selectedProfessional.value === 'Todos'
    ? appointments.value
    : appointments.value.filter((item) => item.professional === selectedProfessional.value),
)

function statusSeverity(status: string) {
  if (status === 'Confirmado') return 'success'
  if (status === 'Cancelado') return 'danger'
  return 'warn'
}
</script>

<template>
  <section>
    <div class="page-heading">
      <div>
        <h1>Agenda</h1>
        <p>Acompanhe os horários e o atendimento da equipe.</p>
      </div>
      <Button label="Novo agendamento" icon="pi pi-plus" />
    </div>

    <div class="agenda-toolbar card">
      <div>
        <label for="agenda-date">Data</label>
        <DatePicker id="agenda-date" v-model="selectedDate" date-format="dd/mm/yy" show-icon />
      </div>
      <div>
        <label for="professional">Profissional</label>
        <Select id="professional" v-model="selectedProfessional" :options="professionals" />
      </div>
      <div class="agenda-summary">
        <span
          ><b>{{ visibleAppointments.length }}</b> horários</span
        >
        <span><b>3</b> confirmados</span>
        <span><b>1</b> pendente</span>
      </div>
    </div>

    <div class="schedule card">
      <article v-for="item in visibleAppointments" :key="`${item.time}-${item.client}`">
        <time>{{ item.time }}</time>
        <div class="schedule-line"><i /></div>
        <div class="schedule-details">
          <span class="client-avatar">{{
            item.client
              .split(' ')
              .map((part) => part[0])
              .join('')
              .slice(0, 2)
          }}</span>
          <div>
            <strong>{{ item.client }}</strong>
            <small>{{ item.service }}</small>
          </div>
          <span class="professional"><i class="pi pi-user" />{{ item.professional }}</span>
          <Tag :value="item.status" :severity="statusSeverity(item.status)" />
          <Button icon="pi pi-ellipsis-v" severity="secondary" text rounded aria-label="Ações" />
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.agenda-toolbar {
  display: grid;
  grid-template-columns: 220px 240px 1fr;
  align-items: end;
  gap: 18px;
  margin-bottom: 16px;
  padding: 18px;
}

.agenda-toolbar > div:not(.agenda-summary) {
  display: grid;
  gap: 7px;
}

label {
  color: var(--muted);
  font-size: 11px;
}

.agenda-summary {
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  padding-bottom: 9px;
  color: var(--muted);
  font-size: 10px;
}

.agenda-summary b {
  margin-right: 4px;
  color: var(--ink);
  font-size: 15px;
}

.schedule {
  padding: 12px 20px;
}

.schedule article {
  display: grid;
  grid-template-columns: 55px 18px 1fr;
  min-height: 92px;
  align-items: center;
}

.schedule time {
  font-weight: 600;
  font-size: 12px;
}

.schedule-line {
  align-self: stretch;
  position: relative;
  border-left: 1px solid #dce7f5;
}

.schedule-line i {
  position: absolute;
  top: calc(50% - 5px);
  left: -5px;
  width: 9px;
  height: 9px;
  border: 2px solid white;
  border-radius: 50%;
  background: var(--blue);
  box-shadow: 0 0 0 2px #b9dcff;
}

.schedule-details {
  display: grid;
  grid-template-columns: 42px minmax(150px, 1fr) minmax(160px, 0.8fr) auto 42px;
  align-items: center;
  gap: 13px;
  padding: 15px;
  border: 1px solid var(--line);
  border-radius: 13px;
  background: white;
}

.client-avatar {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 50%;
  color: white;
  background: linear-gradient(135deg, var(--navy), var(--blue));
  font-size: 10px;
}

.schedule-details > div {
  display: flex;
  flex-direction: column;
}

.schedule-details strong {
  font-size: 12px;
}

.schedule-details small,
.professional {
  color: var(--muted);
  font-size: 9px;
}

.professional i {
  margin-right: 7px;
  color: var(--blue);
}

@media (max-width: 900px) {
  .agenda-toolbar {
    grid-template-columns: 1fr 1fr;
  }

  .agenda-summary {
    grid-column: 1 / -1;
    justify-content: flex-start;
  }

  .schedule-details {
    grid-template-columns: 42px 1fr auto;
  }

  .professional {
    display: none;
  }
}

@media (max-width: 600px) {
  .agenda-toolbar {
    grid-template-columns: 1fr;
  }

  .agenda-summary {
    grid-column: auto;
    flex-wrap: wrap;
  }

  .schedule {
    padding: 8px;
  }

  .schedule article {
    grid-template-columns: 42px 12px 1fr;
  }

  .schedule-details {
    grid-template-columns: 34px 1fr;
  }

  .schedule-details .p-tag,
  .schedule-details .p-button {
    display: none;
  }
}
</style>

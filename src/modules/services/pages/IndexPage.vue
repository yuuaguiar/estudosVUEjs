<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import ToggleSwitch from 'primevue/toggleswitch'
import type { FormularioServico, Servico } from '@/modules/services/types/service'

const termoBusca = ref('')
const dialogCadastroAberto = ref(false)

const formularioServico = reactive<FormularioServico>({
  nome: '',
  duracao: null,
  preco: null,
  ativo: true,
})

const servicos = ref<Servico[]>([
  {
    id: 1,
    nome: 'Corte de cabelo',
    duracao: 45,
    preco: 50,
    ativo: true,
  },
  {
    id: 2,
    nome: 'Barba',
    duracao: 30,
    preco: 35,
    ativo: true,
  },
  {
    id: 3,
    nome: 'Corte e barba',
    duracao: 60,
    preco: 75,
    ativo: false,
  },
])

const servicosFiltrados = computed(() => {
  const termoNormalizado = termoBusca.value
    .trim()
    .toLocaleLowerCase('pt-BR')

  if (!termoNormalizado) {
    return servicos.value
  }

  return servicos.value.filter((servico) =>
    servico.nome
      .toLocaleLowerCase('pt-BR')
      .includes(termoNormalizado),
  )
})

function formatarPreco(preco: number): string {
  return preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function alternarStatusServico(idServico: number): void {
  const servico = servicos.value.find(
    (servicoAtual) => servicoAtual.id === idServico,
  )

  if (servico) {
    servico.ativo = !servico.ativo
  }
}
</script>

<template>
  <div class="cartao-servicos card">
    <div
      class="tw-mb-5 tw-flex tw-flex-col tw-gap-3 sm:tw-flex-row sm:tw-items-center sm:tw-justify-between"
    >
      <IconField class="tw-w-full sm:tw-max-w-[390px]">
        <InputIcon class="pi pi-search" />

        <InputText
          v-model="termoBusca"
          placeholder="Buscar serviço..."
          class="tw-w-full"
        />
      </IconField>

      <Button
        label="Cadastrar serviço"
        icon="pi pi-plus"
        @click="dialogCadastroAberto = true"
      />
    </div>

    <Message
      v-if="servicosFiltrados.length === 0"
      severity="info"
      :closable="false"
      class="tw-w-full"
    >
      Nenhum serviço encontrado para "{{ termoBusca }}"
    </Message>

    <div v-else class="lista-servicos">
      <h2>Lista de serviços</h2>

      <article
        v-for="servico in servicosFiltrados"
        :key="servico.id"
        class="item-servico"
      >
        <div class="informacoes-servico">
          <strong>{{ servico.nome }}</strong>
          <span>{{ servico.duracao }} minutos</span>
        </div>

        <div class="detalhes-servico">
          <strong>{{ formatarPreco(servico.preco) }}</strong>

          <span
            class="status-servico"
            :class="{ 'status-servico--inativo': !servico.ativo }"
          >
            {{ servico.ativo ? 'Ativo' : 'Inativo' }}
          </span>

          <Button
            :label="servico.ativo ? 'Desativar' : 'Ativar'"
            :severity="servico.ativo ? 'danger' : 'success'"
            size="small"
            outlined
            @click="alternarStatusServico(servico.id)"
          />
        </div>
      </article>
    </div>
  </div>

  <Dialog
    v-model:visible="dialogCadastroAberto"
    modal
    header="Cadastrar serviço"
    :style="{ width: 'min(90vw, 520px)' }"
  >
    <div class="tw-flex tw-flex-col tw-gap-5">
      <div class="tw-flex tw-flex-col tw-gap-2">
        <label for="nome-servico">Nome do serviço</label>

        <InputText
          id="nome-servico"
          v-model="formularioServico.nome"
          placeholder="Ex.: Corte masculino"
        />
      </div>

      <div class="tw-grid tw-grid-cols-1 tw-gap-5 sm:tw-grid-cols-2">
        <div class="tw-flex tw-flex-col tw-gap-2">
          <label for="duracao-servico">Duração</label>

          <InputNumber
            id="duracao-servico"
            v-model="formularioServico.duracao"
            suffix=" min"
            :min="1"
            placeholder="Ex.: 45"
          />
        </div>

        <div class="tw-flex tw-flex-col tw-gap-2">
          <label for="preco-servico">Preço</label>

          <InputNumber
            id="preco-servico"
            v-model="formularioServico.preco"
            mode="currency"
            currency="BRL"
            locale="pt-BR"
            :min="0"
            placeholder="R$ 0,00"
          />
        </div>
      </div>

      <div class="tw-flex tw-items-center tw-gap-3">
        <ToggleSwitch
          input-id="servico-ativo"
          v-model="formularioServico.ativo"
        />

        <label for="servico-ativo">Serviço ativo</label>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.cartao-servicos {
  padding: 18px;
}

.cartao-servicos h2 {
  margin: 0 0 16px;
  font-size: 14px;
}

.lista-servicos {
  display: grid;
  gap: 10px;
}

.item-servico {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
}

.informacoes-servico {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-servico span {
  color: var(--muted);
  font-size: 11px;
}

.detalhes-servico {
  display: flex;
  align-items: center;
  gap: 14px;
}

.status-servico {
  min-width: 42px;
  color: var(--success) !important;
  font-weight: 600;
}

.status-servico--inativo {
  color: var(--danger) !important;
}

@media (max-width: 640px) {
  .item-servico {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }

  .detalhes-servico {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
}
</style>

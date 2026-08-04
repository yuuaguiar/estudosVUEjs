<script setup lang="ts">
import { ref } from 'vue'
import SelectButton from 'primevue/selectbutton'
import CategoriesIndexPage from '@/modules/categories/pages/IndexPage.vue'
import ProductsIndexPage from '@/modules/products/pages/IndexPage.vue'
import ServicesIndexPage from '@/modules/services/pages/IndexPage.vue'

type AbaCatalogo = 'servicos' | 'produtos' | 'categorias'

const abaSelecionada = ref<AbaCatalogo>('servicos')

interface OpcaoCatalogo {
  label: string
  value: AbaCatalogo
  icon: string
}

const opcoesCatalogo: OpcaoCatalogo[] = [
  {
    label: 'Serviços',
    value: 'servicos',
    icon: 'pi pi-list-check',
  },
  {
    label: 'Produtos',
    value: 'produtos',
    icon: 'pi pi-box',
  },
  {
    label: 'Categorias',
    value: 'categorias',
    icon: 'pi pi-tag',
  },
]
</script>

<template>
  <section>
    <div class="page-heading">
      <div>
        <h1>Catálogo</h1>
        <p>Gerencie serviços, produtos e categorias usadas no seu negócio.</p>
      </div>
    </div>

    <SelectButton
      v-model="abaSelecionada"
      :options="opcoesCatalogo"
      option-label="label"
      option-value="value"
      :allow-empty="false"
    >
      <template #option="{ option }">
        <span class="tw-flex tw-items-center tw-gap-2">
          <i :class="option.icon" />
          <span>{{ option.label }}</span>
        </span>
      </template>
    </SelectButton>

    <div class="tw-mt-7">
      <ServicesIndexPage v-if="abaSelecionada === 'servicos'" />
      <ProductsIndexPage v-else-if="abaSelecionada === 'produtos'" />
      <CategoriesIndexPage v-else />
    </div>
  </section>
</template>

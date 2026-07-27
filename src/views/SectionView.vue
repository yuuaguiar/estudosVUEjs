<script setup lang="ts">
import Button from 'primevue/button'

defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <section>
    <div class="page-heading">
      <div>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
      </div>
      <Button label="Adicionar" icon="pi pi-plus" />
    </div>

    <div class="learning-card card">
      <span><i class="pi pi-code" /></span>
      <h2>Próxima etapa do aprendizado</h2>
      <p>
        Esta rota já está conectada ao menu e ao Vue Router. Aqui você poderá praticar formulários,
        componentes PrimeVue, validação e operações de cadastro.
      </p>
      <code>src/views/SectionView.vue</code>
    </div>
  </section>
</template>

<style scoped>
.learning-card {
  display: flex;
  min-height: 430px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  text-align: center;
}

.learning-card > span {
  display: grid;
  width: 74px;
  height: 74px;
  place-items: center;
  border-radius: 22px;
  color: white;
  background: linear-gradient(135deg, var(--navy), var(--blue));
  font-size: 26px;
  box-shadow: 0 14px 28px rgb(8 124 240 / 20%);
}

.learning-card h2 {
  margin: 25px 0 8px;
  font-size: 20px;
}

.learning-card p {
  max-width: 620px;
  margin: 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.8;
}

.learning-card code {
  margin-top: 22px;
  padding: 8px 12px;
  border-radius: 7px;
  color: var(--blue-dark);
  background: #eaf4ff;
  font-size: 11px;
}
</style>

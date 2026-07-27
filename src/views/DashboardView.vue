<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'

type Period = 'Hoje' | '7 dias' | '30 dias' | 'Este mês'

const periods: Period[] = ['Hoje', '7 dias', '30 dias', 'Este mês']
const selectedPeriod = ref<Period>('30 dias')

const periodMultiplier = computed(() => {
  const values: Record<Period, number> = {
    Hoje: 0.12,
    '7 dias': 0.42,
    '30 dias': 1,
    'Este mês': 1.18,
  }
  return values[selectedPeriod.value]
})

const money = computed(() =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(48920 * periodMultiplier.value),
)

const metrics = computed(() => [
  {
    label: 'Agendamentos',
    value: Math.round(386 * periodMultiplier.value),
    delta: '+8,2%',
    good: true,
  },
  {
    label: 'Cancelamentos',
    value: Math.round(24 * periodMultiplier.value),
    delta: '-3,1%',
    good: false,
  },
  { label: 'Ticket médio', value: 'R$ 126,74', delta: '+4,6%', good: true },
  { label: 'Comissões', value: 'R$ 8.430', delta: '+9,8%', good: true },
  { label: 'Crescimento', value: '+12,4%', delta: '+2,1pp', good: true },
])

const agenda = [
  {
    time: '09:00',
    initials: 'CS',
    name: 'Cauã Silva',
    service: 'Corte Masculino',
    professional: 'Marcos Guedes',
  },
  {
    time: '11:30',
    initials: 'LA',
    name: 'Lucas Abrão',
    service: 'Combo Masculino + sobrancelha',
    professional: 'Junior Ferreira',
  },
  {
    time: '15:00',
    initials: 'JC',
    name: 'Junior Costa',
    service: 'Corte Masculino',
    professional: 'Luiz Magner',
  },
]

const ranking = [
  { name: 'Corte + Barba + Sobrancelha', value: 95, count: 96 },
  { name: 'Corte Raspado', value: 72, count: 74 },
  { name: 'Barba completa', value: 56, count: 59 },
]

const heatmap = [
  [13, 24, 34, 132, 13, 24, 132],
  [34, 67, 13, 24, 34, 67, 13],
  [89, 13, 57, 34, 57, 13, 132],
  [13, 132, 13, 24, 34, 89, 13],
  [132, 13, 89, 132, 24, 57, 89],
  [89, 13, 34, 24, 67, 89, 13],
]

function heatClass(value: number) {
  if (value >= 100) return 'heat--dark'
  if (value >= 80) return 'heat--strong'
  if (value >= 50) return 'heat--medium'
  if (value >= 30) return 'heat--light'
  return 'heat--soft'
}
</script>

<template>
  <section>
    <div class="page-heading dashboard-heading">
      <div>
        <h1>Dashboard</h1>
        <p>Visão geral do desempenho da sua empresa.</p>
      </div>
      <div class="period-control">
        <span>Período</span>
        <SelectButton v-model="selectedPeriod" :options="periods" :allow-empty="false" />
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="dashboard-main">
        <section class="metrics-card card">
          <article class="revenue-card">
            <span>Faturamento no período</span>
            <strong>{{ money }}</strong>
            <div>
              <b>+12,4%</b>
              <small>vs. período anterior</small>
            </div>
            <div class="spark-bars" aria-hidden="true">
              <i
                v-for="height in [18, 28, 36, 48, 34, 52, 68, 57, 78]"
                :key="height"
                :style="{ height: `${height}%` }"
              />
            </div>
          </article>

          <article v-for="metric in metrics" :key="metric.label" class="metric">
            <span>{{ metric.label }}</span>
            <strong>{{ metric.value }}</strong>
            <b :class="{ negative: !metric.good }">{{ metric.delta }}</b>
          </article>
        </section>

        <div class="analytics-row">
          <section class="chart-card card">
            <div class="card-title">
              <div>
                <h2>Faturamento e agendamentos</h2>
                <p>Evolução diária no período selecionado</p>
              </div>
              <b>+12,4%</b>
            </div>
            <strong class="chart-total">R$ 47,9 mil</strong>
            <svg
              class="line-chart"
              viewBox="0 0 640 180"
              role="img"
              aria-label="Gráfico de faturamento"
            >
              <defs>
                <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#1687ef" stop-opacity=".22" />
                  <stop offset="100%" stop-color="#1687ef" stop-opacity="0" />
                </linearGradient>
              </defs>
              <g class="grid-lines">
                <line v-for="y in [35, 75, 115, 155]" :key="y" x1="10" :y1="y" x2="630" :y2="y" />
              </g>
              <path
                class="area"
                d="M10 145 L45 137 L80 140 L115 126 L150 132 L185 117 L220 105 L255 120 L290 88 L325 101 L360 62 L395 18 L430 92 L465 111 L500 79 L535 105 L570 70 L610 83 L630 52 L630 170 L10 170 Z"
              />
              <polyline
                points="10,145 45,137 80,140 115,126 150,132 185,117 220,105 255,120 290,88 325,101 360,62 395,18 430,92 465,111 500,79 535,105 570,70 610,83 630,52"
              />
              <circle cx="395" cy="18" r="5" />
            </svg>
            <div class="chart-labels">
              <span>29 mai</span><span>02 jun</span><span>05 jun</span><span>08 jun</span
              ><span>11 jun</span><span>14 jun</span><span>17 jun</span>
            </div>
          </section>

          <section class="heatmap-card card">
            <div class="card-title">
              <div>
                <h2>Horários mais movimentados</h2>
                <p>Quantidade por dia e horário</p>
              </div>
            </div>
            <div class="heatmap-head">
              <span />
              <span v-for="day in ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']" :key="day">{{
                day
              }}</span>
            </div>
            <div class="heatmap">
              <template v-for="(row, rowIndex) in heatmap" :key="rowIndex">
                <span class="heat-time">{{
                  ['08h', '11h', '14h', '16h', '18h', '20h'][rowIndex]
                }}</span>
                <span v-for="(value, colIndex) in row" :key="colIndex" :class="heatClass(value)">{{
                  value
                }}</span>
              </template>
            </div>
            <Button label="Exportar" icon="pi pi-download" size="small" />
          </section>
        </div>

        <section class="ranking-card card">
          <div class="card-title">
            <div>
              <h2>Rankings de performance</h2>
              <p>Serviços com melhor resultado</p>
            </div>
            <button>Quantidade <i class="pi pi-angle-down" /></button>
          </div>
          <div v-for="(item, index) in ranking" :key="item.name" class="ranking-row">
            <span class="rank-number">{{ index + 1 }}</span>
            <div class="rank-name">
              <strong>{{ item.name }}</strong>
              <small>R$ {{ [4.8, 4.5, 4.2][index] }}k em receita</small>
            </div>
            <div class="progress"><i :style="{ width: `${item.value}%` }" /></div>
            <small>{{ item.count }} agendamentos</small>
          </div>
          <RouterLink to="/catalogo">Ver relatório completo</RouterLink>
        </section>
      </div>

      <aside class="dashboard-side">
        <section class="agenda-card card">
          <div class="card-title">
            <div>
              <h2>Agendamentos</h2>
              <p>Hoje</p>
            </div>
            <span>Junho, 02</span>
          </div>
          <div class="week">
            <span
              v-for="(day, index) in [13, 14, 15, 16, 17, 18]"
              :key="day"
              :class="{ active: index === 2 }"
            >
              <b>{{ day }}</b>
              <small>{{ ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][index] }}</small>
            </span>
          </div>
          <div class="appointments">
            <article v-for="item in agenda" :key="item.time">
              <time>{{ item.time }}</time>
              <span class="mini-avatar">{{ item.initials }}</span>
              <div>
                <strong>{{ item.name }}</strong>
                <small>{{ item.service }}</small>
                <small
                  >Profissional: <b>{{ item.professional }}</b></small
                >
              </div>
            </article>
          </div>
          <RouterLink to="/agenda">Ver agenda completa</RouterLink>
        </section>

        <section class="summary-card card">
          <div>
            <h2>Resumo da agenda</h2>
            <div class="donut">
              <strong>87%<small>OCUPAÇÃO</small></strong>
            </div>
          </div>
          <dl>
            <div>
              <dt>Agendamentos</dt>
              <dd>18</dd>
            </div>
            <div>
              <dt>Confirmados</dt>
              <dd>12</dd>
            </div>
            <div>
              <dt>Pendentes</dt>
              <dd>3</dd>
            </div>
            <div>
              <dt>Faltas</dt>
              <dd>2</dd>
            </div>
          </dl>
          <footer><span>Taxa de ocupação</span><strong>87%</strong></footer>
        </section>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.dashboard-heading {
  align-items: center;
}

.period-control {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--muted);
  font-size: 11px;
}

.period-control :deep(.p-togglebutton) {
  padding: 0.55rem 0.9rem;
  font-size: 10px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: minmax(0, 2.15fr) minmax(290px, 0.95fr);
  gap: 14px;
}

.dashboard-main,
.dashboard-side {
  display: grid;
  align-content: start;
  gap: 14px;
}

.metrics-card {
  display: grid;
  grid-template-columns: 1.7fr repeat(5, 0.78fr);
  min-height: 174px;
  padding: 18px;
}

.revenue-card {
  position: relative;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border-radius: 12px;
  color: white;
  background: var(--navy);
  box-shadow: 0 9px 16px rgb(0 10 36 / 22%);
}

.revenue-card > span {
  color: #edf7ff;
  font-size: 11px;
}

.revenue-card > strong {
  margin: 4px 0 13px;
  font-size: clamp(21px, 2vw, 28px);
}

.revenue-card > div:not(.spark-bars) {
  display: flex;
  align-items: center;
  gap: 8px;
}

.revenue-card b {
  padding: 5px 8px;
  border-radius: 12px;
  color: var(--blue);
  background: white;
  font-size: 9px;
}

.revenue-card small {
  color: #c8d3e2;
  font-size: 8px;
}

.spark-bars {
  position: absolute;
  right: 14px;
  bottom: 26px;
  display: flex;
  width: 74px;
  height: 62px;
  align-items: flex-end;
  gap: 3px;
}

.spark-bars i {
  width: 5px;
  min-height: 7px;
  border-radius: 3px;
  background: linear-gradient(#64b7ff, #1687ef);
}

.metric {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 14px;
  border-left: 1px solid var(--line);
}

.metric span {
  color: #4a566c;
  font-size: 9px;
}

.metric strong {
  margin: 10px 0;
  font-size: 17px;
}

.metric b {
  align-self: flex-start;
  padding: 4px 7px;
  border-radius: 10px;
  color: var(--success);
  background: #d8f7e8;
  font-size: 9px;
}

.metric b.negative {
  color: var(--danger);
  background: #fde8ed;
}

.analytics-row {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 14px;
}

.chart-card,
.heatmap-card,
.ranking-card,
.agenda-card,
.summary-card {
  padding: 18px;
}

.card-title {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.card-title h2,
.summary-card h2 {
  margin: 0;
  font-size: 14px;
}

.card-title p {
  margin: 3px 0 0;
  color: #8b95a7;
  font-size: 8px;
}

.card-title > b {
  padding: 5px 8px;
  border-radius: 11px;
  color: var(--success);
  background: #d8f7e8;
  font-size: 9px;
}

.chart-total {
  display: block;
  margin: 18px 0 6px;
  font-size: 22px;
}

.line-chart {
  width: 100%;
  height: 170px;
  overflow: visible;
}

.grid-lines line {
  stroke: #e8eef6;
  stroke-width: 1;
}

.line-chart polyline {
  fill: none;
  stroke: #1687ef;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3;
}

.line-chart .area {
  fill: url(#chart-fill);
}

.line-chart circle {
  fill: white;
  stroke: #1687ef;
  stroke-width: 3;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  color: #98a2b3;
  font-size: 8px;
}

.heatmap-card {
  display: flex;
  flex-direction: column;
}

.heatmap-head,
.heatmap {
  display: grid;
  grid-template-columns: 28px repeat(7, 1fr);
  gap: 5px;
  margin-top: 17px;
}

.heatmap-head span {
  color: #475467;
  font-size: 8px;
  text-align: center;
}

.heatmap {
  margin-top: 5px;
}

.heatmap > span:not(.heat-time) {
  display: grid;
  min-height: 29px;
  place-items: center;
  border-radius: 4px;
  color: white;
  font-size: 8px;
}

.heat-time {
  align-self: center;
  color: #667085;
  font-size: 8px;
}

.heat--soft {
  background: #d7eaf9;
  color: #21405a !important;
}
.heat--light {
  background: #6db9ec;
}
.heat--medium {
  background: #2b96e5;
}
.heat--strong {
  background: #0668b6;
}
.heat--dark {
  background: #001d32;
}

.heatmap-card .p-button {
  align-self: flex-end;
  margin-top: 12px;
  font-size: 9px;
}

.ranking-card .card-title button {
  padding: 6px 8px;
  border: 1px solid var(--line);
  border-radius: 6px;
  color: #667085;
  background: white;
  font-size: 8px;
}

.ranking-row {
  display: grid;
  grid-template-columns: 28px 1.15fr 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 11px 0;
  border-bottom: 1px solid #f0f3f7;
}

.rank-number {
  color: var(--blue);
  font-weight: 600;
  font-size: 13px;
  text-align: center;
}

.rank-name {
  display: flex;
  flex-direction: column;
}

.rank-name strong {
  font-size: 9px;
}

.rank-name small,
.ranking-row > small {
  color: #8b95a7;
  font-size: 7px;
}

.progress {
  height: 5px;
  overflow: hidden;
  border-radius: 5px;
  background: #e7edf5;
}

.progress i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--blue);
}

.ranking-card > a,
.agenda-card > a {
  display: block;
  margin-top: 10px;
  color: var(--blue);
  font-size: 9px;
  text-align: center;
  text-decoration: none;
}

.agenda-card .card-title > span {
  font-size: 9px;
}

.week {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin: 18px 0;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--line);
}

.week > span {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 7px;
  color: #98a2b3;
}

.week b {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border-radius: 50%;
  background: #f1f3f5;
  font-size: 10px;
}

.week small {
  font-size: 8px;
}

.week .active {
  color: var(--blue);
}

.week .active b {
  color: white;
  background: var(--blue);
}

.appointments {
  display: grid;
  gap: 14px;
}

.appointments article {
  display: grid;
  grid-template-columns: 38px 36px 1fr;
  align-items: center;
  gap: 9px;
  padding-left: 8px;
  border-left: 2px solid var(--blue);
}

.appointments time {
  color: #98a2b3;
  font-size: 8px;
}

.mini-avatar {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 50%;
  color: white;
  background: linear-gradient(135deg, #192d53, #1687ef);
  font-size: 9px;
}

.appointments article > div {
  display: flex;
  flex-direction: column;
}

.appointments strong {
  font-size: 10px;
}

.appointments small {
  color: #667085;
  font-size: 7px;
}

.appointments small b {
  color: var(--blue);
}

.summary-card {
  display: grid;
  grid-template-columns: 1fr 0.7fr;
  gap: 22px;
}

.donut {
  display: grid;
  width: 132px;
  height: 132px;
  margin: 18px auto 0;
  place-items: center;
  border-radius: 50%;
  background: conic-gradient(var(--blue) 0 87%, #e7edf5 87%);
}

.donut::before {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: white;
  content: '';
}

.donut strong {
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 22px;
}

.donut small {
  color: var(--blue);
  font-size: 7px;
}

.summary-card dl {
  display: grid;
  align-content: center;
  gap: 9px;
  margin: 0;
}

.summary-card dl div {
  display: flex;
  flex-direction: column-reverse;
}

.summary-card dt {
  color: #868686;
  font-size: 8px;
}

.summary-card dd {
  margin: 0;
  font-weight: 600;
  font-size: 12px;
}

.summary-card footer {
  display: flex;
  grid-column: 1 / -1;
  align-items: center;
  justify-content: space-between;
  padding-top: 13px;
  border-top: 1px solid var(--line);
  font-size: 11px;
}

.summary-card footer strong {
  color: var(--blue);
  font-size: 17px;
}

@media (max-width: 1440px) {
  .metrics-card {
    grid-template-columns: 1.5fr repeat(3, 1fr);
  }

  .metric:nth-last-child(-n + 2) {
    display: none;
  }
}

@media (max-width: 1280px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-side {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 850px) {
  .analytics-row,
  .dashboard-side {
    grid-template-columns: 1fr;
  }

  .metrics-card {
    grid-template-columns: 1.5fr 1fr 1fr;
  }

  .metric:nth-last-child(-n + 3) {
    display: none;
  }
}

@media (max-width: 640px) {
  .dashboard-heading {
    align-items: stretch;
  }

  .period-control {
    overflow-x: auto;
    align-items: flex-start;
    flex-direction: column;
  }

  .metrics-card {
    grid-template-columns: 1fr 1fr;
  }

  .revenue-card {
    grid-column: 1 / -1;
    min-height: 142px;
  }

  .metric {
    border-top: 1px solid var(--line);
    border-left: 0;
  }

  .ranking-row {
    grid-template-columns: 24px 1fr auto;
  }

  .ranking-row .progress {
    display: none;
  }
}
</style>

# Plano de aprendizado — SG Agenda

Este guia foi criado para aprender front-end construindo o projeto, sem ficar
preso em cursos longos antes de escrever código.

## Método mais rápido

Para cada assunto:

1. Leia somente a explicação necessária.
2. Encontre um exemplo existente no SG Agenda.
3. Faça uma alteração pequena sem copiar uma solução pronta.
4. Teste no navegador.
5. Execute `npm run build`.
6. Explique com suas palavras o que o código faz.
7. Faça um commit antes de iniciar o próximo assunto.

Use aproximadamente 20% do tempo lendo e 80% praticando.

## Como pedir ajuda ao Codex

Use uma mensagem como:

> Estou estudando o exercício X de APRENDIZADO.md. Não faça a alteração por mim.
> Explique o conceito, dê uma pista por vez e revise o código que eu escrever.

Se estiver completamente bloqueado:

> Mostre um exemplo pequeno e diferente do meu exercício. Depois me deixe
> adaptar a ideia ao SG Agenda.

Isso evita receber a solução pronta sem aprender.

## Etapa 1 — JavaScript necessário para Vue

### Conceitos

- `const` e `let`
- strings, números e booleanos
- objetos e arrays
- funções e arrow functions
- `map`, `filter` e `find`
- destructuring e spread
- módulos com `import` e `export`

### Onde observar

- `src/views/DashboardView.vue`: arrays de métricas, agenda e ranking
- `src/views/ClientsView.vue`: pesquisa com `filter` e `some`
- `src/views/AgendaView.vue`: filtro de profissionais

### Exercícios

1. Adicione um novo cliente ao array `clients`.
2. Adicione um novo profissional e um agendamento para ele.
3. Ordene os clientes alfabeticamente sem modificar o array original.
4. Crie uma função que calcule o total de visitas dos clientes.

## Etapa 2 — Reatividade do Vue

### Conceitos

- `<script setup>`
- `ref`
- `computed`
- `v-model`
- interpolação com `{{ }}`
- `v-for`, `v-if` e `:class`
- eventos com `@click`

### Onde observar

- O período selecionado do dashboard usa `ref`.
- O faturamento usa `computed`.
- Os períodos usam `v-for`.
- A seleção do período usa `v-model`.

### Exercícios

1. Adicione o período `90 dias` com multiplicador `2.7`.
2. Crie um botão que mostra ou esconde o ranking.
3. Mostre na tela quantos agendamentos estão confirmados.
4. Faça o resumo da agenda ser calculado a partir do array, sem números fixos.

## Etapa 3 — Componentes

### Conceitos

- props
- emits
- slots
- componentes reutilizáveis
- responsabilidade única

### Onde observar

- `src/components/layout/AppSidebar.vue`
- `src/components/layout/AppHeader.vue`
- `src/layouts/AppLayout.vue`
- `src/views/SectionView.vue`

### Exercícios

1. Extraia o card de métrica para `MetricCard.vue`.
2. Passe título, valor e variação usando props.
3. Emita um evento quando o card for clicado.
4. Extraia o avatar do cliente para um componente reutilizável.

## Etapa 4 — Rotas e navegação

### Conceitos

- rotas filhas
- `RouterLink`
- `RouterView`
- carregamento dinâmico
- parâmetros de rota

### Onde observar

- `src/router/index.ts`
- `src/layouts/AppLayout.vue`

### Exercícios

1. Crie a rota `/configuracoes`.
2. Acrescente o item ao menu lateral.
3. Crie a rota `/clientes/:id`.
4. Abra uma página de detalhes ao clicar em um cliente.

## Etapa 5 — PrimeVue e formulários

### Conceitos

- componentes de interface
- `v-model` em campos
- validação
- diálogos
- formulários controlados

### Exercícios

1. Abra um `Dialog` ao clicar em “Novo cliente”.
2. Adicione nome, telefone e status.
3. Valide campos obrigatórios.
4. Insira o novo cliente na tabela sem recarregar a página.
5. Crie o formulário de novo agendamento.

## Etapa 6 — Dados e CRUD

Comece com `localStorage`; depois substitua por uma API.

### Exercícios

1. Salve os clientes no `localStorage`.
2. Carregue os dados ao abrir o sistema.
3. Implemente criar, editar e excluir.
4. Extraia a lógica para um composable `useClients`.
5. Substitua os dados locais por uma API REST.

## Etapa 7 — Funcionalidades do Figma

Implemente nesta ordem:

1. Login
2. Seleção de empresa
3. Cadastro e detalhes de clientes
4. Cadastro e jornada de atendentes
5. Serviços, produtos e categorias
6. Comissões
7. Planos
8. Configurações

Faça uma tela por vez. Evite criar várias telas incompletas ao mesmo tempo.

## Rotina recomendada

Uma sessão de 60 minutos:

- 5 min: revisar o que foi feito
- 10 min: aprender um conceito
- 35 min: implementar um exercício
- 5 min: testar e executar o build
- 5 min: escrever o que aprendeu e criar o commit

## Fluxo Git de estudo

Antes de começar:

```bash
git pull
git switch -c estudo/nome-do-assunto
```

Depois do exercício:

```bash
npm run build
git status
git add caminho/do/arquivo
git commit -m "estuda nome do assunto"
git push -u origin estudo/nome-do-assunto
```

Não use `git add .` automaticamente. Revise os arquivos modificados antes de
adicioná-los.

## Primeiro exercício

Comece pela Etapa 2:

1. Abra `src/views/DashboardView.vue`.
2. Adicione `90 dias` ao tipo `Period`.
3. Adicione a opção ao array `periods`.
4. Defina `2.7` no objeto de multiplicadores.
5. Teste no navegador.
6. Execute `npm run build`.
7. Explique por que `money` muda sem chamar uma função manualmente.

Quando conseguir explicar a relação entre `ref`, `computed` e `v-model`, passe
para o exercício de mostrar e esconder o ranking.

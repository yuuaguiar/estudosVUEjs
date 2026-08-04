export interface Servico {
  id: number
  nome: string
  duracao: number
  preco: number
  ativo: boolean
}

export interface FormularioServico {
  nome: string
  duracao: number | null
  preco: number | null
  ativo: boolean
}

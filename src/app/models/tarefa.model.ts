// src/app/models/tarefa.model.ts

export interface Tarefa {
  id: number;
  descricao: string;
  concluida: boolean;
  prazoDeConclusao: Date;
}
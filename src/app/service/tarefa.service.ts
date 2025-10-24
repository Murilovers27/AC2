// src/app/services/tarefa.service.ts

import { Injectable } from '@angular/core';
import { Tarefa } from '../models/tarefa.model'; // Importamos nossa Interface

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  // Nosso "banco de dados" em memória.
  // É 'private' pois só o serviço pode mexer diretamente nesta lista.
  private tarefas: Tarefa[] = [];

  // Usado para gerar IDs únicos para as novas tarefas
  private proximoId = 1;

  constructor() {
    // Vamos adicionar algumas tarefas de exemplo para testes
    this.adicionar("Estudar Angular", new Date("2025-10-30T10:00:00"));
    this.adicionar("Fazer o projeto", new Date("2025-10-25T15:00:00"));
    this.adicionar("Ir à academia", new Date("2025-10-24T19:00:00"));
    this.marcarConcluida(3); // Já marcamos a "academia" como concluída
  }

  /**
   * Método 1: listar
   * Retorna a lista completa de tarefas.
   */
  listar(): Tarefa[] {
    // Retornamos uma cópia da array para evitar modificações externas
    return [...this.tarefas];
  }

  /**
   * Método 2: adicionar
   * Cria e adiciona uma nova tarefa à lista.
   */
  adicionar(descricao: string, prazo: Date): void {
    const novaTarefa: Tarefa = {
      id: this.proximoId,
      descricao: descricao,
      concluida: false, // Toda nova tarefa começa como "não concluída"
      prazoDeConclusao: prazo
    };

    this.tarefas.push(novaTarefa);
    this.proximoId++; // Incrementa o ID para a próxima
  }

  /**
   * Método 3: remover
   * Remove uma tarefa da lista com base no seu ID.
   */
  remover(id: number): void {
    // O filter cria uma nova array com todas as tarefas,
    // exceto aquela que tem o ID que queremos remover.
    this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id);
  }

  /**
   * Método 4: marcarConcluida
   * Encontra uma tarefa pelo ID e altera seu status para 'concluida'.
   */
  marcarConcluida(id: number): void {
    const tarefa = this.encontrarTarefaPorId(id);
    if (tarefa) {
      tarefa.concluida = true;
    }
  }

  /**
   * Método 5: prazo de conclusão (Interpretado como ATUALIZAR o prazo)
   * A especificação pedia um método "prazo de conclusão".
   * Como o prazo já é uma propriedade, estou interpretando este método
   * como uma ação para ATUALIZAR o prazo de uma tarefa existente.
   */
  atualizarPrazo(id: number, novoPrazo: Date): void {
    const tarefa = this.encontrarTarefaPorId(id);
    if (tarefa) {
      tarefa.prazoDeConclusao = novoPrazo;
    }
  }

  // --- Métodos Auxiliares ---

  /**
   * Um método privado para ajudar a encontrar uma tarefa.
   * Não faz parte dos requisitos, mas ajuda a organizar o código.
   */
  private encontrarTarefaPorId(id: number): Tarefa | undefined {
    return this.tarefas.find(tarefa => tarefa.id === id);
  }
}
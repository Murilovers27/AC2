// src/app/services/tarefa.service.ts

import { Injectable } from '@angular/core';
import { Tarefa } from '../models/tarefa.model'; // Importamos nossa Interface

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private tarefas: Tarefa[] = [];

  
  private proximoId = 1;

  constructor() {
    this.adicionar("Estudar Angular", new Date("2025-10-30T10:00:00"));
    this.adicionar("Fazer o projeto", new Date("2025-10-25T15:00:00"));
    this.adicionar("Ir à academia", new Date("2025-10-24T19:00:00"));
    this.marcarConcluida(3);
  }


  listar(): Tarefa[] {
    
    return [...this.tarefas];
  }

  
   
  adicionar(descricao: string, prazo: Date): void {
    const novaTarefa: Tarefa = {
      id: this.proximoId,
      descricao: descricao,
      concluida: false, 
      prazoDeConclusao: prazo
    };

    this.tarefas.push(novaTarefa);
    this.proximoId++;
  }

 
  remover(id: number): void {
  
    this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id);
  }

 
  marcarConcluida(id: number): void {
    const tarefa = this.encontrarTarefaPorId(id);
    if (tarefa) {
      tarefa.concluida = true;
    }
  }


  atualizarPrazo(id: number, novoPrazo: Date): void {
    const tarefa = this.encontrarTarefaPorId(id);
    if (tarefa) {
      tarefa.prazoDeConclusao = novoPrazo;
    }
  }


  private encontrarTarefaPorId(id: number): Tarefa | undefined {
    return this.tarefas.find(tarefa => tarefa.id === id);
  }
}
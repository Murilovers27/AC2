import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';


import { TarefaService } from '../../service/tarefa.service'; 
import { Tarefa } from '../../models/tarefa.model';

@Component({
  selector: 'app-lista-tarefas',
  standalone: true,
  
  imports: [CommonModule, RouterLink], 
  templateUrl: './lista-tarefas.html', 
  styleUrl: './lista-tarefas.css' 
})

export class ListaTarefas implements OnInit { 

  tarefas: Tarefa[] = [];

  constructor(private tarefaService: TarefaService) {}

  
  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.tarefas = this.tarefaService.listar();
  }

  
  remover(id: number): void {
    this.tarefaService.remover(id);
    
    this.carregarTarefas();
  }

  
  concluir(id: number): void {
    this.tarefaService.marcarConcluida(id);
    
    this.carregarTarefas();
  }

 

  get totalTarefas(): number {
    return this.tarefas.length;
  }

  get tarefasConcluidas(): number {
    return this.tarefas.filter(t => t.concluida).length;
  }

  get tarefasPendentes(): number {

    return this.tarefas.filter(t => !t.concluida).length;
  }
}


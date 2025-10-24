import { Component, OnInit } from '@angular/core';
// CommonModule é necessário para *ngFor, *ngIf, e o pipe 'date'
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';

// Importando o service e a interface
// (Note o caminho para 'service' no singular)
import { TarefaService } from '../../service/tarefa.service'; 
import { Tarefa } from '../../models/tarefa.model';

@Component({
  selector: 'app-lista-tarefas',
  standalone: true,
  // Adicione CommonModule e RouterLink
  imports: [CommonModule, RouterLink], 
  templateUrl: './lista-tarefas.html', // Usando seu nome de arquivo
  styleUrl: './lista-tarefas.css' // Usando seu nome de arquivo
})
// (Note o nome da classe 'ListaTarefas' sem o 'Component')
export class ListaTarefas implements OnInit { 

  // A lista de tarefas que será exibida no HTML
  tarefas: Tarefa[] = [];

  // Injetamos o Service
  constructor(private tarefaService: TarefaService) {}

  // ngOnInit é um "gancho" do Angular que roda
  // automaticamente quando o componente é iniciado.
  ngOnInit(): void {
    // Carregamos as tarefas assim que o componente é exibido
    this.carregarTarefas();
  }

  // Método para buscar as tarefas do service e atualizar a lista local
  carregarTarefas(): void {
    this.tarefas = this.tarefaService.listar();
  }

  /**
   * Método chamado pelo botão "Remover"
   * Requisito: "Ao clicar em 'Remover', a tarefa desaparece."
   */
  remover(id: number): void {
    this.tarefaService.remover(id);
    
    // Após remover, recarregamos a lista para atualizar a tela
    this.carregarTarefas();
  }

  /**
   * Método chamado pelo botão "Concluir"
   * Requisito: "Ao clicar em 'Concluir', o status muda..."
   */
  concluir(id: number): void {
    this.tarefaService.marcarConcluida(id);
    
    // Recarregamos a lista para aplicar o estilo de "concluída"
    this.carregarTarefas();
  }

  // --- Contadores (Getters) ---
  // Requisito: "Adicione um contador de tarefas, total, concluídas e pendentes."

  // Um "getter" se comporta como uma propriedade que é recalculada
  // toda vez que o Angular verifica por mudanças.

  get totalTarefas(): number {
    return this.tarefas.length;
  }

  get tarefasConcluidas(): number {
    // Filtra a lista e conta quantos têm 'concluida === true'
    return this.tarefas.filter(t => t.concluida).length;
  }

  get tarefasPendentes(): number {
    // Filtra a lista e conta quantos têm 'concluida === false'
    return this.tarefas.filter(t => !t.concluida).length;
  }
}


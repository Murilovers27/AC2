import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // Importe Router e RouterLink
import { FormsModule } from '@angular/forms'; // Importe FormsModule para o ngModel

// Importando o service da SUA pasta (service no singular)
import { TarefaService } from '../../service/tarefa.service';

@Component({
  selector: 'app-cadastrar-tarefa',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, // Adicione RouterLink aqui
    FormsModule // Adicione FormsModule aqui
  ],
  templateUrl: './cadastrar-tarefa.html', // Usando seu nome de arquivo
  styleUrl: './cadastrar-tarefa.css' // Usando seu nome de arquivo
})
export class CadastrarTarefa { // Usando seu nome de classe

  // Propriedades para ligar (bind) com o formulário HTML
  descricao: string = "";
  // O input 'datetime-local' retorna uma string, vamos armazená-la
  prazoString: string = ""; 

  // Injetamos o Service (para adicionar) e o Router (para navegar)
  constructor(
    private tarefaService: TarefaService,
    private router: Router // Injetamos o Router
  ) {}

  /**
   * Método chamado pelo botão (click) do formulário
   */
  cadastrar(): void {
    // 1. Validação simples
    if (this.descricao.trim() === "" || this.prazoString === "") {
      // (Não podemos usar alert, então avisamos no console)
      console.error("Por favor, preencha a descrição e o prazo.");
      // Em um app real, mostraríamos uma mensagem de erro na tela
      return;
    }

    // 2. Converter a string do input para um objeto Date
    const prazo = new Date(this.prazoString);

    // 3. Chamar o método adicionar() do service
    this.tarefaService.adicionar(this.descricao, prazo);

    // 4. (Opcional, mas bom) Limpar os campos após cadastrar
    this.descricao = "";
    this.prazoString = "";

    // 5. Navegar o usuário de volta para a lista
    this.router.navigate(['/lista']);
  }
}


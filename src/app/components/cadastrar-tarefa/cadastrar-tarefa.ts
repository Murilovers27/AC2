import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 


import { TarefaService } from '../../service/tarefa.service';

@Component({
  selector: 'app-cadastrar-tarefa',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    FormsModule 
  ],
  templateUrl: './cadastrar-tarefa.html', 
  styleUrl: './cadastrar-tarefa.css' 
})
export class CadastrarTarefa { 


  descricao: string = "";
 
  prazoString: string = ""; 


  constructor(
    private tarefaService: TarefaService,
    private router: Router
  ) {}

  cadastrar(): void {
    
    if (this.descricao.trim() === "" || this.prazoString === "") {
      
      console.error("Por favor, preencha a descrição e o prazo.");
   
      return;
    }

    const prazo = new Date(this.prazoString);

   
    this.tarefaService.adicionar(this.descricao, prazo);

   
    this.descricao = "";
    this.prazoString = "";

    this.router.navigate(['/lista']);
  }
}


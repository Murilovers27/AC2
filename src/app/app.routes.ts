import { Routes } from '@angular/router';
import { ListaTarefas } from './components/lista-tarefas/lista-tarefas';
import { CadastrarTarefa } from './components/cadastrar-tarefa/cadastrar-tarefa';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/lista',
    pathMatch: 'full'
  },
  {
    path: 'lista',
    component: ListaTarefas
  },
  {
    path: 'cadastrar',
    component: CadastrarTarefa
  }
];


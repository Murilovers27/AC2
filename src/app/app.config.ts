import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Importe nossas rotas

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes) // Adicione as rotas aqui
  ]
};

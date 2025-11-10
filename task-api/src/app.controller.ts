import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Controlador principal da aplicação.
 * 
 * Este controller lida com as rotas de nível raiz ("/").
 * Ele é responsável por responder à rota GET padrão com uma mensagem simples.
 */
@Controller()
export class AppController {
  // Injeção de dependência do serviço principal
  constructor(private readonly appService: AppService) {}

  /**
   * Rota GET padrão da aplicação.
   * Retorna uma mensagem simples definida no AppService.
   * 
   * @returns {string} Mensagem de boas-vindas ou status da API
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

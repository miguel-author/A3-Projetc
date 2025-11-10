import { Injectable } from '@nestjs/common';

/**
 * Serviço principal da aplicação.
 * 
 * Responsável por conter a lógica básica usada pelo AppController.
 * Neste caso, apenas retorna uma mensagem padrão de status da API.
 */
@Injectable()
export class AppService {

  /**
   * Retorna uma mensagem simples de boas-vindas.
   * 
   * @returns {string} Mensagem de status da API.
   */
  getHello(): string {
    return 'API funcionando corretamente! 🚀';
  }
}

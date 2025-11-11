import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

/**
 * AuthGuard
 *
 * Guard responsável por proteger rotas autenticadas via JWT.
 * Ele utiliza a estratégia 'jwt' configurada em JwtStrategy.
 */
@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  /**
   * Método opcional que permite personalizar o comportamento da autenticação.
   * Aqui poderíamos, por exemplo, adicionar logs, validações extras ou tratar erros.
   */
  canActivate(context: ExecutionContext) {
    // Mantém o comportamento padrão do Passport
    return super.canActivate(context);
  }

  /**
   * Método opcional para manipular a requisição após a validação do token.
   * Pode ser usado, por exemplo, para anexar dados adicionais ao request.
   */
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      // Caso o token seja inválido ou ausente
      // Aqui poderíamos lançar um UnauthorizedException customizado, se necessário.
      return null;
    }
    return user;
  }
}

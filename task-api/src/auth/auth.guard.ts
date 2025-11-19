import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

/**
 * Guard responsável por proteger rotas utilizando autenticação JWT.
 * Caso o token seja inválido ou ausente, o acesso será negado.
 */
@Injectable()
export class JwtAuthGuard extends NestAuthGuard('jwt') {

  /**
   * Método responsável por lidar com o resultado da validação do token.
   * Se o usuário não for encontrado ou houver erro, lança 401 (Unauthorized).
   */
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new UnauthorizedException('Token inválido ou ausente.');
    }
    return user;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

/**
 * JwtStrategy
 *
 * Estratégia responsável por validar o token JWT e garantir que o usuário
 * autenticado tenha acesso às rotas protegidas do sistema.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      // Extrai o token do header Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,

      // Boa prática: usa variável de ambiente
      secretOrKey: process.env.JWT_SECRET || 'seusegredoaqui',
    });
  }

  /**
   * 🔍 Método chamado automaticamente após a validação do token JWT.
   * Aqui podemos buscar o usuário no banco ou simplesmente retornar os dados do payload.
   *
   * @param payload Dados do token (sub, username, etc)
   * @returns Dados do usuário validados
   */
  async validate(payload: any) {
    // (Opcional) Pode validar se o usuário ainda existe no banco:
    // const user = await this.authService.validateUserById(payload.sub);
    // if (!user) throw new UnauthorizedException('Usuário não encontrado ou inválido');

    // Retorna os dados básicos do usuário autenticado
    return { userId: payload.sub, username: payload.username };
  }
}

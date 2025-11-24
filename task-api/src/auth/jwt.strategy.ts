import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';

/**
 * Estratégia JWT
 *
 * Responsável por validar o token JWT e carregar o usuário autenticado
 * nas requisições protegidas.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'seusegredoaqui',
    });
  }

  /**
   * Executado automaticamente após o token ser validado.
   * Aqui buscamos o usuário real no banco.
   */
  async validate(payload: any) {
    const user = await this.userModel
      .findById(payload.sub)
      .select('-password') // remove a senha por segurança
      .exec();

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    // O que retornar aqui vira req.user
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}

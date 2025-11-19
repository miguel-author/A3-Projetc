import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { User, UserSchema } from 'src/users/schemas/user.schema';

/**
 * Módulo de Autenticação
 *
 * Responsável por registrar serviços, estratégias e rotas relacionadas
 * ao processo de autenticação por JWT.
 */
@Module({
  imports: [
    // Registra o schema User para consultas no login
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    // JWT configurado com variáveis de ambiente
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET || 'chavesegura',
        signOptions: {
          expiresIn: String(process.env.JWT_EXPIRES || '1h'),
        },
      }),
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

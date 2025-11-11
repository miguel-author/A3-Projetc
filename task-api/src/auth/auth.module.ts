import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/users/entity/user.entity';
import { JwtStrategy } from './jwt.strategy';

/**
 * Módulo de Autenticação
 *
 * Responsável por registrar todos os componentes relacionados à autenticação,
 * como serviços, controladores, entidades e estratégias de segurança.
 */
@Module({
  imports: [
    // Registra a entidade User para uso com o TypeORM
    TypeOrmModule.forFeature([User]),

    // Configura o módulo JWT com chave secreta e tempo de expiração do token
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'seusegredoaqui', // ✅ Usa variável de ambiente se disponível
      signOptions: { expiresIn: '1h' },
    }),
  ],

  // Controlador responsável pelas rotas de autenticação (/auth)
  controllers: [AuthController],

  // Serviços disponíveis neste módulo
  providers: [AuthService, JwtStrategy],

  // Exporta o AuthService para ser usado em outros módulos (ex: guard)
  exports: [AuthService],
})
export class AuthModule {}

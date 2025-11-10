import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entity/user.entity';
import { Tasks } from './users/entity/task.entity';

@Module({
  imports: [
    // Módulo de banco de dados customizado (configurações extras podem estar nele)
    DatabaseModule,

    // Módulo de usuários (responsável por user.entity, controller, service)
    UserModule,

    // Módulo de autenticação (JWT, Guards e estratégias)
    AuthModule,

    // Configuração do TypeORM
    // Aqui conectamos o banco SQLite local e registramos as entidades
    TypeOrmModule.forRoot({
      type: 'sqlite', // tipo de banco de dados
      database: 'database.sqlite', // arquivo do banco local
      entities: [User, Tasks], // entidades que serão mapeadas
      synchronize: true, // cria/atualiza tabelas automaticamente (não usar em produção)
      autoLoadEntities: true, // carrega entidades de módulos automaticamente
    }),
  ],
  // Controladores principais da aplicação
  controllers: [AppController],

  // Serviços globais injetáveis
  providers: [AppService],
})
export class AppModule {}

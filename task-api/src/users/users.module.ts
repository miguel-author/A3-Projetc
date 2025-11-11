import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { User } from './entity/user.entity';
import { Tasks } from './entity/task.entity';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { TaskService } from './service/task.service';
import { TaskController } from './controller/task.controller';

/**
 * Módulo responsável pelo gerenciamento de usuários e tarefas.
 * 
 * Este módulo centraliza todos os serviços, controladores e entidades
 * relacionados a usuários e suas respectivas tarefas.
 */
@Module({
  imports: [
    // Importa o módulo de banco de dados e registra as entidades User e Tasks
    DatabaseModule,
    TypeOrmModule.forFeature([User, Tasks]),
  ],

  // Controladores responsáveis por lidar com as rotas HTTP
  controllers: [UsersController, TaskController],

  // Serviços que contêm a lógica de negócio da aplicação
  providers: [UsersService, TaskService],

  // Exporta serviços que poderão ser usados em outros módulos (ex: AuthModule)
  exports: [UsersService, TaskService],
})
export class UserModule {}

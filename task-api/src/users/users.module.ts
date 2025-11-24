import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Schemas Mongoose
import { User, UserSchema } from './schemas/user.schema';
import { Task, TaskSchema } from './schemas/task.schema';
import { Counter, CounterSchema } from './schemas/counter.schema';

// Controllers
import { UsersController } from './controller/users.controller';
import { TaskController } from './controller/task.controller';

// Services
import { UsersService } from './service/users.service';
import { TaskService } from './service/task.service';

/**
 * Módulo responsável pelas funcionalidades de Usuários e Tarefas.
 * 
 * - Registra Schemas do MongoDB usando MongooseModule.
 * - Expõe Controllers para rotas HTTP.
 * - Expõe Services para lógica de negócio e acesso ao banco.
 */
@Module({
  imports: [
    // Registra os modelos User e Task no Mongoose
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Task.name, schema: TaskSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  controllers: [
    UsersController,
    TaskController,
  ],
  providers: [
    UsersService,
    TaskService,
  ],
  exports: [
    UsersService,
    TaskService,
  ],
})
export class UserModule {}

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
 * - Registra modelos (schemas) para o MongoDB usando MongooseModule.
 * - Expõe controllers que recebem as requisições HTTP.
 * - Expõe services onde estão as regras de negócio e manipulação dos dados.
 */
@Module({
  imports: [
    // Registra os modelos no NestJS/Mongoose permitindo injeção via InjectModel()
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },      // Model para usuários
      { name: Task.name, schema: TaskSchema },      // Model para tarefas
      { name: Counter.name, schema: CounterSchema }, // Model para auto-incremento
    ]),
  ],

  // Controladores responsáveis pelas rotas HTTP
  controllers: [
    UsersController,
    TaskController,
  ],

  // Serviços acessados pelos controllers e aplicam regra de negócio
  providers: [
    UsersService,
    TaskService,
  ],

  // Exporta serviços para outros módulos do projeto (caso necessário)
  exports: [
    UsersService,
    TaskService,
  ],
})
export class UserModule {}

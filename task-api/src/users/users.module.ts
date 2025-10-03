import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { DatabaseModule } from '../database/database.module';
import { User } from './entity/user.entity';
import { Tasks } from './entity/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { TaskService } from './service/task.service';
import { TaskController } from './controller/task.controller';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, Tasks]),
  ],
  controllers: [AppController, UsersController, TaskController],
  providers: [AppService, UsersService, TaskService],
  exports: [TaskService],
})
export class UserModule {}
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import {  TaskDTO, UpdateTaskDTO } from '../DTO/task.DTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from '../entity/task.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/service/users.service';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Tasks)
        private taskRepository: Repository<Tasks>,
        private userService: UsersService
    ){}

    // async create(newTask: TaskDTO): Promise<Tasks> {
    //     const task = new Tasks();
    //     task.title = newTask.title;
    //     task.description = newTask.description;
    //     task.expirationDate = newTask.expirationDate;
    //     task.status = 'TO_DO';  // Defina o status padrão aqui

    //     return this.taskRepository.save(task);
    // }
    async create(newTask: TaskDTO): Promise<Tasks> {
        const user = await this.userService.findById(newTask.id);
        if (!user) {
          throw new NotFoundException(`Usuário não encontrado.`);
        }
        const createTask = this.taskRepository.create({
          ...newTask,
          user: user, 
        });
        return await this.taskRepository.save(createTask);
    }

    async findById(id: number): Promise<Tasks> {
        const foundTask = await this.taskRepository.findOne({
            where: {id: id},
            relations: ['user'],
        });

        if (!foundTask){
            throw new NotFoundException(`Task não encontrada.`)
        }
        return foundTask
    }

    async findAll(): Promise<Tasks[]> {
        return await this.taskRepository.find();
    }
  
    async update(
        id: number,
        task: Partial<Tasks>
    ): Promise<Tasks> {

        await this.taskRepository.update(id, task)
        return this.taskRepository.findOneBy({id})
        //const task = await this.findById(id);
        //delete updateTask.id;
        //const update = this.taskRepository.merge(task, updateTask);
        //await this.taskRepository.save(update);
        
    }

    async deleteTask(id: number): Promise<void>{
        await this.taskRepository.delete(id);
    }
}

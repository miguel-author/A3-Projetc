import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from '../entity/task.entity';
import { TaskDTO } from '../DTO/task.DTO';

/**
 * Serviço responsável pela lógica de negócios relacionada às Tasks.
 * 
 * Este serviço interage com o banco de dados via TypeORM, realizando operações
 * de CRUD (criação, leitura, atualização e exclusão).
 */
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Tasks)
    private readonly taskRepository: Repository<Tasks>,
  ) {}

  /**
   * Cria uma nova task.
   * @param task Dados recebidos do DTO.
   * @returns Task criada e persistida no banco de dados.
   */
  async create(task: TaskDTO): Promise<Tasks> {
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  /**
   * Retorna todas as tasks cadastradas.
   * @returns Lista de tasks.
   */
  async findAll(): Promise<Tasks[]> {
    return this.taskRepository.find();
  }

  /**
   * Busca uma task específica pelo ID.
   * 
   * @param id Identificador numérico da task.
   * @returns A task encontrada, ou lança NotFoundException.
   */
  async findById(id: number): Promise<Tasks> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task não encontrada.');
    }
    return task;
  }

  /**
   * Atualiza uma task existente.
   * 
   * @param id ID da task que será atualizada.
   * @param updatedTask Campos a serem atualizados.
   * @returns Task atualizada.
   */
  async update(id: number, updatedTask: Partial<Tasks>): Promise<Tasks> {
    const task = await this.findById(id);
    Object.assign(task, updatedTask); // Atualiza somente os campos enviados
    return this.taskRepository.save(task);
  }

  /**
   * Exclui uma task pelo ID.
   * 
   * @param id ID da task a ser excluída.
   * @throws NotFoundException se o ID não existir.
   */
  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Task não encontrada.');
    }
  }
}

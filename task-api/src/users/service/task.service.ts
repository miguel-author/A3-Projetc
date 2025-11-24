import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { TaskDTO } from '../DTO/task.DTO';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Cria uma nova tarefa associada ao usuário autenticado.
   */
  async create(userId: string, dto: TaskDTO) {
  // valida se userId é um ObjectId válido
  if (!Types.ObjectId.isValid(userId)) {
    throw new BadRequestException('ID de usuário inválido.');
  }

  // verifica se o usuário existe
  const user = await this.userModel.findById(userId);
  if (!user) throw new NotFoundException('Usuário não encontrado.');

  // cria a task vinculada ao usuário pelo ObjectId
  const task = new this.taskModel({
    ...dto,
    userId,
  });

  const saved = await task.save();

  // registrar referência
  await this.userModel.updateOne(
    { _id: userId },
    { $push: { tasksIds: saved._id.toString() } }
  );

  // 🔥 AGORA RETORNA RESPOSTA JSON CORRETA
  return saved.toObject({ versionKey: false });
}

  /**
   * Lista todas as tarefas do usuário logado
   */
  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel
      .find({ userId })
      .lean()
      .exec();
  }

  /**
   * Busca uma tarefa específica pelo ID
   */
  async findById(id: string, userId: string): Promise<Task> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID inválido.');
    }

    const task = await this.taskModel.findById(id).lean().exec();
    if (!task) throw new NotFoundException('Tarefa não encontrada.');

    // impede acessar tarefa de outro usuário
    if (task.userId?.toString() !== userId) {
      throw new ForbiddenException('Você não tem permissão para acessar esta tarefa.');
    }

    return task;
  }

  /**
   * Atualiza uma tarefa somente se pertence ao usuário corretamente
   */
  async update(id: string, userId: string, dto: Partial<TaskDTO>): Promise<Task> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID inválido.');
    }

    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Tarefa não encontrada.');

    if (task.userId.toString() !== userId) {
      throw new ForbiddenException('Você não pode editar esta tarefa.');
    }

    Object.assign(task, dto);

    const updated = await task.save();
    return updated.toObject({ versionKey: false });
  }

  /**
   * Remove uma tarefa e valida se pertence ao usuário
   */
  async remove(id: string, userId: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID inválido.');
    }

    const removed = await this.taskModel.findOneAndDelete({ _id: id, userId }).exec();

    if (!removed) throw new NotFoundException('Tarefa não encontrada ou não pertence ao usuário.');
  }
}

import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { TaskDTO } from '../DTO/task.DTO';

@Injectable()
// Serviço responsável pela regra de negócio das tarefas
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>, 
    // Model responsável pela collection de tarefas

    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    // Model responsável pela collection de usuários (para vinculação)
  ) {}

  /**
   * Cria uma nova tarefa associada ao usuário autenticado.
   */
  async create(userId: string, dto: TaskDTO) {
    
    // Valida se o userId possui formato válido de ObjectId
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('ID de usuário inválido.');
    }

    // Verifica se o usuário existe no banco
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    // Cria a nova task vinculada ao usuário
    const task = new this.taskModel({
      ...dto,
      userId, // Associação da tarefa ao usuário dono
    });

    const saved = await task.save();

    // Registra referência da tarefa dentro do documento do usuário (relacionamento manual)
    await this.userModel.updateOne(
      { _id: userId },
      { $push: { tasksIds: saved._id.toString() } }
    );

    // Retorna o objeto limpo (sem __v)
    return saved.toObject({ versionKey: false });
  }

  /**
   * Lista todas as tarefas do usuário logado
   */
  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel
      .find({ userId }) // filtra somente tarefas do dono
      .lean() // retorna objetos simples em vez de documentos mongoose
      .exec();
  }

  /**
   * Busca uma tarefa específica pelo ID
   */
  async findById(id: string, userId: string): Promise<Task> {
    
    // valida se o ID é válido
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID inválido.');
    }

    const task = await this.taskModel.findById(id).lean().exec();
    if (!task) throw new NotFoundException('Tarefa não encontrada.');

    // Impede o acesso à tarefa de outro usuário
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

    // Bloqueia edição caso a tarefa não pertença ao usuário
    if (task.userId.toString() !== userId) {
      throw new ForbiddenException('Você não pode editar esta tarefa.');
    }

    // Atualiza apenas os campos enviados (merge do DTO)
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

    // Remove a tarefa apenas se for do usuário
    const removed = await this.taskModel.findOneAndDelete({ _id: id, userId }).exec();

    if (!removed) throw new NotFoundException('Tarefa não encontrada ou não pertence ao usuário.');
  }
}

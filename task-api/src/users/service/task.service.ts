import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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

  async create(dto: TaskDTO): Promise<Task> {
    if (!Types.ObjectId.isValid(dto.userId)) {
      throw new BadRequestException('ID de usuário inválido.');
    }

    const user = await this.userModel.findById(dto.userId);
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    const task = new this.taskModel(dto);
    const saved = await task.save();

    // opcional: registrar referência
    await this.userModel.updateOne(
      { _id: dto.userId },
      { $push: { tasksIds: saved._id.toString() } },
    );

    return saved.toObject({ versionKey: false });
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().lean().exec();
  }

  async findById(id: string): Promise<Task> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido.');

    const task = await this.taskModel.findById(id).lean().exec();
    if (!task) throw new NotFoundException('Tarefa não encontrada.');

    return task;
  }

  async update(id: string, dto: Partial<Task>): Promise<Task> {
    const updated = await this.taskModel
      .findByIdAndUpdate(id, dto, { new: true })
      .lean()
      .exec();

    if (!updated) throw new NotFoundException('Tarefa não encontrada.');

    return updated;
  }

  async remove(id: string): Promise<void> {
    const removed = await this.taskModel.findByIdAndDelete(id).exec();
    if (!removed) throw new NotFoundException('Tarefa não encontrada.');

    // limpa referência em usuários
    await this.userModel.updateMany({}, { $pull: { tasksIds: id } });
  }
}

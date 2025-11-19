import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Task, TaskDocument } from '../schemas/task.schema';
import { UserDTO } from '../DTO/user.DTO';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(dto: UserDTO): Promise<User> {
    const exists = await this.userModel.findOne({ email: dto.email });

    if (exists) {
      throw new BadRequestException('Este email já está registrado.');
    }

    const user = new this.userModel(dto);
    const saved = await user.save();
    return saved.toObject({ versionKey: false });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').lean().exec();
  }

  async findById(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID inválido.');
    }

    const user = await this.userModel.findById(id).select('-password').lean().exec();
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    return user;
  }

  async update(id: string, dto: Partial<User>): Promise<User> {
    const updated = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .select('-password')
      .exec();

    if (!updated) throw new NotFoundException('Usuário não encontrado.');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.userModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Usuário não encontrado.');
  }
}

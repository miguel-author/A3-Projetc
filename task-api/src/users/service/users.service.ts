import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Task, TaskDocument } from '../schemas/task.schema';
import { UserDTO } from '../DTO/user.DTO';
import { Counter } from '../schemas/counter.schema';
import { getNextSequence } from 'src/utils/getNextSequence';

@Injectable()
// Serviço responsável pela lógica de CRUD para usuários
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    // Model da coleção "users"

    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    // Model de tarefas (caso sejam usadas em algum relacionamento futuro)

    @InjectModel(Counter.name) private readonly counterModel: Model<Counter>,
    // Model utilizado pelo mecanismo de contador sequencial (auto increment)
  ) {}

  /**
   * Cria um novo usuário, gerando ID sequencial via Counter (Auto Increment)
   */
  async create(dto: UserDTO): Promise<User> {

    // Verifica se já existe usuário com o email informado
    const exists = await this.userModel.findOne({ email: dto.email });

    if (exists) {
      throw new BadRequestException('Este email já está registrado.');
    }

    // Busca o próximo ID sequencial usando o schema Counter
    const nextId = await getNextSequence(this.counterModel, 'userId');

    // Cria novo usuário com ID incremental
    const user = new this.userModel({
      ...dto,
      id: nextId, // <-- ID numérico incremental armazenado junto do ObjectId padrão
    });

    console.log("📦 Objeto enviado ao Mongoose:", user); // DEBUG opcional

    const saved = await user.save();

    // remove "__v" antes de retornar
    return saved.toObject({ versionKey: false });
  }

  /**
   * Lista todos os usuários sem retornar o campo password por segurança
   */
  async findAll(): Promise<User[]> {
    return this.userModel
      .find()
      .select('-password') // remove senha da resposta
      .lean()
      .exec();
  }

  /**
   * Busca um usuário específico pelo ID
   */
  async findById(id: string): Promise<User> {
    
    // valida ID antes de consultar
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID inválido.');
    }

    const user = await this.userModel
      .findById(id)
      .select('-password') // nunca expõe senha
      .lean()
      .exec();

    if (!user) throw new NotFoundException('Usuário não encontrado.');

    return user;
  }

  /**
   * Atualiza um usuário parcial ou completamente
   */
  async update(id: string, dto: Partial<User>): Promise<User> {
    const updated = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true }) // new:true → retorna valor atualizado
      .select('-password')
      .exec();

    if (!updated) throw new NotFoundException('Usuário não encontrado.');
    return updated;
  }

  /**
   * Remove um usuário pelo ID
   */
  async remove(id: string): Promise<void> {
    const deleted = await this.userModel.findByIdAndDelete(id).exec();

    if (!deleted) throw new NotFoundException('Usuário não encontrado.');
  }
}

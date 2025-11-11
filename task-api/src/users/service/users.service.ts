import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserDTO } from '../DTO/user.DTO';

/**
 * Serviço responsável pela lógica de negócios dos usuários.
 * 
 * Este serviço utiliza o TypeORM para realizar operações CRUD (criar, listar e buscar usuários).
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Cria um novo usuário no banco de dados.
   * 
   * @param user Dados do usuário (DTO).
   * @returns Usuário criado.
   */
  async create(user: UserDTO): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  /**
   * Retorna todos os usuários cadastrados.
   * 
   * @returns Lista de usuários.
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Busca um usuário específico pelo ID.
   * 
   * @param id Identificador do usuário.
   * @returns Usuário encontrado.
   * @throws NotFoundException se o usuário não existir.
   */
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return user;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/**
 * Serviço responsável pela autenticação e gerenciamento de tokens JWT.
 * 
 * Contém métodos para validação de usuários, geração de tokens e registro de novos usuários.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Valida as credenciais de um usuário.
   * 
   * @param username Nome de usuário.
   * @param password Senha informada.
   * @returns O usuário autenticado, se as credenciais forem válidas.
   * @throws UnauthorizedException se as credenciais forem inválidas.
   */
  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    const passwordIsValid = user && (await bcrypt.compare(password, user.password));

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    return user;
  }

  /**
   * Gera um token JWT para um usuário autenticado.
   * 
   * @param user Usuário autenticado.
   * @returns Objeto contendo o token de acesso.
   */
  async login(user: User): Promise<{ access_token: string }> {
    const payload = { username: user.nome, sub: user.id_user };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  /**
   * Registra um novo usuário no sistema.
   * 
   * A senha é criptografada antes de salvar no banco.
   * 
   * @param user Dados do novo usuário.
   * @returns Usuário criado.
   */
  async register(user: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }
}

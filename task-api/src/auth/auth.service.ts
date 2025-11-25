import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable() // <-- Indica que esta classe pode ser injetada como serviço
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, // Serviço do NestJS responsável por gerar tokens JWT

    @InjectModel(User.name) // Injeta o Model do Mongoose referente ao schema User
    private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Valida usuário via email e senha
   * Esse método é usado no processo de login
   */
  async validateUser(email: string, password: string): Promise<UserDocument> {
    // Busca o usuário no banco pelo email
    const user = await this.userModel.findOne({ email }).exec();

    // Se não existir, lança erro 401 (não autorizado)
    if (!user) {
      throw new UnauthorizedException('Usuário ou senha incorretos.');
    }

    // Compara a senha enviada com o hash armazenado
    const passwordIsValid = await bcrypt.compare(password, user.password);

    // Se não coincidir, também lança erro 401
    if (!passwordIsValid) {
      throw new UnauthorizedException('Usuário ou senha incorretos.');
    }

    // Se passou nas validações, retorna o usuário
    return user;
  }

  /**
   * Gera token JWT contendo userId e email
   * Esse token será usado para autenticação nas rotas protegidas
   */
  async login(user: UserDocument): Promise<{ access_token: string }> {
    // Payload é o conteúdo criptografado no token
    const payload = {
      sub: user._id.toString(), // "sub" é uma convenção JWT que representa o ID principal
      email: user.email,
    };

    return {
      // Gera e devolve o token JWT assinado
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Registra um novo usuário criptografando a senha antes de salvar
   */
  async register(userData: Partial<User>): Promise<User> {

    // Validações básicas para garantir informações obrigatórias
    if (!userData.password) {
      throw new BadRequestException('Senha é obrigatória.');
    }

    if (!userData.email) {
      throw new BadRequestException('Email obrigatório.');
    }

    // Verifica se já existe usuário com o mesmo email
    const exists = await this.userModel.findOne({ email: userData.email }).exec();

    if (exists) {
      throw new UnauthorizedException('Este email já está registrado.');
    }

    // Criptografa a senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Cria um novo documento no MongoDB
    const newUser = new this.userModel({
      ...userData,
      password: hashedPassword, // substitui senha plaintext por hash
    });

    // Salva no banco e retorna
    const saved = await newUser.save();

    // Remove "__v" (versionKey) antes de retornar o objeto
    return saved.toObject({ versionKey: false });
  }
}

import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Valida usuário via email e senha
   */
  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha incorretos.');
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Usuário ou senha incorretos.');
    }

    return user;
  }

  /**
   * Gera token JWT contendo userId e email
   */
  async login(user: UserDocument): Promise<{ access_token: string }> {
    const payload = {
      sub: user._id.toString(), // 🔥 padrão correto JWT
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Registra novo usuário criptografando senha
   */
  async register(userData: Partial<User>): Promise<User> {
    if (!userData.password) {
      throw new BadRequestException('Senha é obrigatória.');
    }

    if (!userData.email) {
      throw new BadRequestException('Email obrigatório.');
    }

    const exists = await this.userModel.findOne({ email: userData.email }).exec();

    if (exists) {
      throw new UnauthorizedException('Este email já está registrado.');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new this.userModel({
      ...userData,
      password: hashedPassword,
    });

    const saved = await newUser.save();

    return saved.toObject({ versionKey: false });
  }
}

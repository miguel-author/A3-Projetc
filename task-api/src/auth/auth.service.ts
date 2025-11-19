import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    // Agora usando modelo do Mongoose em vez de TypeORM Repository
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Valida usuário pelo email e senha.
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
   * Gera token JWT para usuário autenticado.
   */
  async login(user: UserDocument): Promise<{ access_token: string }> {
    const payload = {
      sub: user._id.toString(), // identifica o usuário no token
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Registra novo usuário (criptografando senha).
   */
  async register(userData: Partial<User>): Promise<User> {
    const exists = await this.userModel.findOne({ email: userData.email }).exec();

    if (exists) {
      throw new UnauthorizedException('Este email já está registrado.');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new this.userModel({
      ...userData,
      password: hashedPassword,
    });

    return newUser.save();
  }
}

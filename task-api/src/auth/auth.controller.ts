import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from '../users/DTO/login.DTO';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User,  UserDocument } from 'src/users/schemas/user.schema';

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@Post('login')
@ApiOperation({ summary: 'Realizar login e gerar token JWT' })
@ApiResponse({ status: 200, description: 'Login bem-sucedido.' })
@ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
async login(@Body() credentials: LoginDTO): Promise<{ access_token: string }> {
  const user = await this.authService.validateUser(
    credentials.email,
    credentials.password,
  );

  return this.authService.login(user);
}
}
